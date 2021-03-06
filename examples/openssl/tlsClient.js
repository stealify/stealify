const { net, sys } = stealify
const { tls } = stealify.library('tls', 'openssl.so')
const { AF_INET, SOCK_STREAM, SOCK_NONBLOCK, SOL_SOCKET, SO_REUSEADDR, SO_REUSEPORT, IPPROTO_TCP, TCP_NODELAY, SO_KEEPALIVE, EAGAIN } = net
const { loop } = stealify.factory
const { EPOLLERR, EPOLLHUP, EPOLLIN, EPOLLOUT } = stealify.loop

function closeSocket (socket) {
  const { fd, buf, closed } = socket
  if (closed) return
  loop.remove(fd)
  delete sockets[fd]
  tls.shutdown(buf)
  tls.free(buf)
  net.close(fd)
  socket.closed = true
}

function onSocketEvent (fd, event) {
  const socket = sockets[fd]
  const { buf, secured, handshake } = socket
  if (event & EPOLLERR || event & EPOLLHUP) {
    closeSocket(socket)
    return
  }
  if (!handshake) {
    let r
    if (!secured) {
      net.setsockopt(fd, IPPROTO_TCP, TCP_NODELAY, 1)
      net.setsockopt(fd, SOL_SOCKET, SO_KEEPALIVE, 1)
      r = tls.connectSocket(fd, context, buf)
      socket.secured = true
    } else {
      r = tls.handshake(buf)
      tls.write(buf, buf.writeString('GET / HTTP/1.1\r\nConnection: close\r\nHost: github.com\r\n\r\n'))
    }
    if (r === 1) {
      socket.handshake = true
      return
    }
    const err = tls.error(buf, r)
    if (err === tls.SSL_ERROR_WANT_WRITE) {
      loop.update(fd, EPOLLOUT)
    } else if (err === tls.SSL_ERROR_WANT_READ) {
      loop.update(fd, EPOLLIN)
    } else {
      stealify.print('socket handshake error')
      net.shutdown(fd)
    }
    return
  }
  if (event & EPOLLOUT) {
    loop.update(fd, EPOLLIN)
  }
  if (event & EPOLLIN) {
    const bytes = tls.read(buf)
    if (bytes === 0) {
      closeSocket(socket)
      return
    }
    if (bytes > 0) {
      stealify.print(buf.readString(bytes))
      return
    }
    if (bytes < 0) {
      const err = tls.error(buf, bytes)
      if (err === tls.SSL_ERROR_WANT_READ) {
        const errno = sys.errno()
        if (errno !== EAGAIN) {
          stealify.print(`tls read error: ${sys.errno()}: ${sys.strerror(sys.errno())}`)
          net.shutdown(fd)
        }
      }
      return
    }
    const err = tls.error(buf, bytes)
    if (err === tls.SSL_ERROR_ZERO_RETURN) {
      stealify.print('tls read error: ssl has been shut down')
    } else {
      stealify.print('tls read error: connection has been aborted')
    }
    net.shutdown(fd)
  }
}

const context = tls.clientContext(new ArrayBuffer(0))
const sockets = {}
const BUFSIZE = 16384
const client = net.socket(AF_INET, SOCK_STREAM | SOCK_NONBLOCK, 0)
net.setsockopt(client, SOL_SOCKET, SO_REUSEADDR, 1)
net.setsockopt(client, SOL_SOCKET, SO_REUSEPORT, 1)
net.connect(client, '140.82.121.3', 443)
const buf = new ArrayBuffer(BUFSIZE)
sockets[client] = { fd: client, buf, secured: false, handshake: false, closed: false }
loop.add(client, onSocketEvent, EPOLLIN | EPOLLOUT)
