/**
 * Ultra Fast Nativ Streams 
 */
function tryEvent(t, a, sink) {
  try {
      sink.event(t, a);
  }
  catch (e) {
      sink.error(t, e);
  }
}


const broadcast = (sinks, a) => sinks.slice().forEach(({ sink, scheduler }) => tryEvent(scheduler.currentTime(), a, sink));

const createAdapter = () => {
  const sinks = [];
  return [a => broadcast(sinks, a), new FanoutPortStream(sinks)];
};


class RemovePortDisposable {
  constructor(sink, sinks) {
      this.sink = sink;
      this.sinks = sinks;
  }
  dispose() {
      const i = this.sinks.indexOf(this.sink);
      if (i >= 0) {
          this.sinks.splice(i, 1);
      }
  }
}

class FanoutPortStream {
  constructor(sinks) {
      this.sinks = sinks;
  }
  run(sink, scheduler) {
      const s = { sink, scheduler };
      this.sinks.push(s);
      return new RemovePortDisposable(s, this.sinks);
  }
}

export class Stream {
  constructor(source) {
    this.source = source;
  }
  run(sink, scheduler) {
    this.source.run(sink, scheduler);
  }
}
// Functional Stream Implementation 
export const createStream = (source) => ({
  run(sink, scheduler) {
    const sourceStream = source;
    sourceStream.run(sink, scheduler);
  }
})

// Non-mutating array operations

/**
 * a with x prepended
 * @type {<A>(x: A, a: ArrayLike<A>): A[]}
 */
const cons = (x, a) => {
  const l = a.length
  const b = new Array(l + 1)
  b[0] = x
  for (let i = 0; i < l; ++i) {
    b[i + 1] = a[i]
  }
  return b
}

/** @type {<A>(x: A, a: ArrayLike<A>): A[]} */
const append = (x, a) => {
  const l = a.length
  const nA = new Array(l + 1)
  for (let i = 0; i < l; ++i) {
    nA[i] = a[i]
  }

  nA[l] = x
  return nA
}

/**
 * Concats two `ArrayLike`s
 * @type {<A>(a: ArrayLike<A>, b: ArrayLike<A>): A[]}
 */
const concat = (a, b) => {
  const al = a.length
  const bl = b.length
  const r = new Array(al + bl)
  let i = 0
  for (i = 0; i < al; i++) {
    r[i] = a[i]
  }
  for (let j = 0; j < bl; j++) {
    r[i++] = b[j]
  }
  return r
}


/** @type {<A>(n: number, a: A[]): A[]} */
const drop = (n, a) => {
  if (n < 0) {
    throw new TypeError('n must be >= 0')
  }

  const l = a.length
  if (n === 0 || l === 0) {
    return a
  }

  if (n >= l) {
    return []
  }

  return unsafeDrop(n, a, l - n)
}

const dropFirstElements = drop;

/** @type {<A>(n: number, a: ArrayLike<A>, l: number): A[]} */
const unsafeDrop = (n, a, l) => {
  const b = new Array(l)
  for (let i = 0; i < l; ++i) {
    b[i] = a[n + i]
  }
  return b
}

/** @type {<A>(a: A[]): A[]}  */
const tail = (a) => drop(1, a);
const dropHeadElement = tail;

/** @type {<A>(a: ArrayLike<A>): A[]} */
const shallowCopy = (a) => {
  const l = a.length
  const b = new Array(l)
  for (let i = 0; i < l; ++i) {
    b[i] = a[i]
  }
  return b
}

const copy = shallowCopy

/** @type {<A, B>(f: (a: A) => B, a: ArrayLike<A>): B[]} */
export const map = (f, a) => {
  const l = a.length
  const b = new Array(l)
  for (let i = 0; i < l; ++i) {
    b[i] = f(a[i])
  }
  return b
}

/**
 * accumulate via left-fold
 * @type {<A, B>(f: (a: A, b: B, i: number) => A, z: A, a: ArrayLike<B>): A}
 */
export const reduce = (f, z, a) => {
  let r = z
  for (let i = 0, l = a.length; i < l; ++i) {
    r = f(r, a[i], i)
  }
  return r
}

/**
 * replace element at index
 * @type {<A>(x: A, i: number, a: ArrayLike<A>): A[]}
 */
export const replace = (x, i, a) => {
  if (i < 0) {
    throw new TypeError('i must be >= 0')
  }

  const l = a.length
  const b = new Array(l)
  for (let j = 0; j < l; ++j) {
    b[j] = i === j ? x : a[j]
  }
  return b
}

/**
 * remove element at index
 * @throws
 * @type {<A>(i: number, a: A[]): A[]}
 */
export const remove = (i, a) => {
  if (i < 0) {
    throw new TypeError('i must be >= 0')
  }

  const l = a.length
  if (l === 0 || i >= l) { // exit early if index beyond end of array
    return a
  }

  if (l === 1) { // exit early if index in bounds and length === 1
    return []
  }

  return unsafeRemove(i, a, l - 1)
}

/**
 * Internal helper to remove element at index
 * @type {<A>(i: number, a: ArrayLike<A>, l: number): A[]} 
 */
const unsafeRemove = (i, a, l) => {
  const b = new Array(l)
  let j
  for (j = 0; j < i; ++j) {
    b[j] = a[j]
  }
  for (j = i; j < l; ++j) {
    b[j] = a[j + 1]
  }

  return b
}

/**
 * remove all elements matching a predicate
 * @deprecated
 * @type {<A>(f: (a: A) => boolean, a: ArrayLike<A>): A[] }
 */
const removeAll = (f, a) => {
  const l = a.length
  const b = new Array(l)
  let j = 0
  for (let x, i = 0; i < l; ++i) {
    x = a[i]
    if (!f(x)) {
      b[j] = x
      ++j
    }
  }

  b.length = j
  return b
}

/**
 * find index of x in a, from the left
 * @type {<A>(x: A, a: ArrayLike<A>): number}
 */
  const findIndex = (x, a) => {
  for (let i = 0, l = a.length; i < l; ++i) {
    if (x === a[i]) {
      return i
    }
  }
  return -1
}

/**
 * Return true iff x is array-like
 * @type {e(x: any): x is ArrayLike<unknown>}
 */
const isArrayLike = (x) => {
  return x != null && typeof x.length === 'number' && typeof x !== 'function'
}


// Functional Composition

/** @type {<A>(x: A): A => x} */
export const id = (x) => x
/** @type {<A, B, C>(f: (b: B) => C, g: (a: A) => B) => (x: A) => C} */
export const compose = (f, g) => (x) => f(g(x));
/** @type {<A, B>(f: (a: A) => B, x: A): B => f(x)} */
export const apply = (f, x) => f(x);

/** @type {<A, B, C>(f: (a: A, b: B) => C): Curried2<A, B, C>} */ 
export const curry2 = (f) => {
  const curried2 = (/** @type {A} */ a, /** @type {B} */ b) => 
      arguments.length === 0 ? curried2
    : arguments.length === 1 ? (/** @type {B} */ b) => f(a, b)
    : f(a, b);
  return curried2 //  as any
}

/** @type {<A, B, C, D>(f: (a: A, b: B, c: C) => D): curry3<A, B, C, D>} */
export const curry3 = (f) =>  {
  /** @type {(a: A, b: B, c: C): any} */
  const curried3 = (a, b, c) => 
      arguments.length === 0 ? curried3
    : arguments.length === 1 ? curry2((/** @type {B} */ b, /** @type {C} */ c) => f(a, b, c))
    : arguments.length === 2 ? (/** @type {C} */ c) => f(a, b, c)
    : f(a, b, c);
  return curried3
}

/** @type {<A, B, C, D, E>(f: (a: A, b: B, c: C, d: D) => E): curry4<A, B, C, D, E>} */
export const curry4 = (f) => {
  /** @type {(a: A, b: B, c: C, d: D): any} */
  const curried4 = (a, b, c, d) =>
    //   case 0: return curried4  
    arguments.length === 0 ? curried4
    //   case 1: return curry3((b: B, c: C, d: D) => f(a, b, c, d))
    : arguments.length === 1 ? curry3((/** @type {B} */ b, /** @type {C} */ c, /** @type {D} */ d) => f(a, b, c, d))
    //   case 2: return curry2((c: C, d: D) => f(a, b, c, d))
    : arguments.length === 2 ? curry2((/** @type {C} */ C, /** @type {D} */ d) => f(a, b, c, d))
    //   case 3: return (d: D) => f(a, b, c, d)
    : arguments.length === 3 ? (/** @type {D} */ D) => f(a, b, c, d)
    //   default:return f(a, b, c, d)
    : f(a, b, c, d);
  return curried4
}
