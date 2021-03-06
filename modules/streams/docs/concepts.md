Concepts
========

Events
------

An *event* is a value that *occurs* at a particular instant in time. For
example, a mouse click is an event.

Conceptually, you can think of an event as a (time, value) pair, where
the event's time is just as important as its value. You can't know the
value of a mouse click until the mouse button actually is clicked.

Event Streams
-------------

An *event stream* is a time-ordered sequence of events. For example, all
the mouse clicks in a document can be represented as an event stream.

Conceptually, you can think of an event stream as an array of (time,
value) pairs. However, whereas an array is ordered by index, an event
stream is ordered by its events' occurrence times. You can't observe the
second mouse click until after you've observed the first one.

Event streams may be *infinite*, *finite*, or may *fail*.

### Infinite Event Streams

An event stream may be infinite. For example, periodic creates an
infinite stream of events that occur at a regular period. Limiting
operations, such as take or until, are helpful in turning an infinite
event stream into a finite one.

### Finite Event Streams

An event stream may be finite. A finite event stream will produce an
*end signal* to indicate that it will never produce another event. When
an event stream ends, it will free underlying resources.

### Failed Event Streams

An event stream may fail. For example, when an event stream represents a
resource, such as a WebSocket, and the resource fails or closes
unexpectedly, the event stream *cannot* produce more events. When an
event stream fails, it will produce an *error signal* to indicate that
it cannot produce more events. The error signal includes a *reason* (an
`Error` object) describing the failure.

A failed event stream will attempt to free any underlying resources.

The recoverWith operation allows you to handle an event stream failure.

#### Stream Failure vs. Application Errors

Stream failures are different from *application errors*. A stream
failure indicates that an event stream *cannot* produce more events. An
application error may or may not indicate an event stream failure.

For example, an event stream of messages from a WebSocket *fails* if the
WebSocket is disconnected unexpectedly because of a dropped network
connection.

In contrast, an application error may occur in the application logic
when it receives a WebSocket message that it can't process because the
application state has changed. The application must deal with this
particular state conflict in an application-specific way, but the
WebSocket event stream has *not* failed.

Application error handling is outside the scope of these docs, as it is
application-specific. However, there are some general strategies for
dealing with application errors with event streams:

-   Use try/catch or [Promise
    catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
    to handle the application error and transform it into:
    -   a useful event value
    -   a sentinel event value that can be filtered \<filter\>
    -   an
        [Either](https://github.com/sanctuary-js/sanctuary#either-type)
        value, or other equivalent structure for representing a value or
        an error as an event value
-   Use throwError to transform the application error into a stream
    failure

Streams and Sinks
-----------------

Applying an operation to a stream derives a *new stream* with *new
events*. There is *no alteration* to the original stream (*the origin*).
Multiple operations compose a *chain of streams*. When a stream is
observed, a run \<Stream\> message is sent ???backwards??? through the chain
to the origin.

As the message travels, it composes a Sink chain analogous to the stream
chain. Finally, the origin begins to produce its events when the message
reaches it. With the exception of a few combinators (such as delay),
events propagate *synchronously* ???forward??? through the sink chain.

### Always async

> **warning**
>
> a Stream must not *begin* producing events synchronously. It must
> schedule the *start* of its production by using the Scheduler passed
> to its run \<Stream\> method. Once it has started, it may then produce
> events synchronously.

Most's architecture requires that all Streams \<Stream\> must never
propagate an event (i.e. call any method on the sink they were given)
before their run \<Stream\> method returns.

The reason for this guarantee is that some kinds of events must always
be async, such example DOM events. If some other kinds of events were
allowed to be synchronous, it would create a serious problem: if some
library returned a Streams \<Stream\> to your code, you could not know
whether it will produce events synchronously or asynchronously, and
whether its side effects will occur before or after run \<Stream\>
returns.

That "maybe sync, maybe async" behavior leads to race conditions and
hard-to-debug problems that may only appear under very specific
conditions which are hard to reproduce.

It would mean that developers always have to think about the possibility
of both sync and async events when writing any code that uses a Stream,
and would make mostjs internals much more difficult to reason about.

For those reasons, mostjs requires run \<Stream\> never to propagate an
event synchronously.

Event propagation
-----------------

Each event propagation is synchronous by default. One sink calls the
event \<Sink\> method of the next, forming a synchronous call stack.

Some combinators, like delay, introduce asynchrony into the sink chain.

Error propagation
-----------------

> **attention**
>
> Uncaught exceptions in a sink chain are considered to be
> failures \<Failed Event Streams\>, and not *application errors*. See
> Stream Failure vs. Application Errors \<Application Errors\> for more
> information.

If an exception is thrown during event propagation, it will stop the
propagation and travel "backwards" through the sink chain, by unwinding
the call stack. If that exception is not caught, it will reach the
producer, and finally, the scheduler. The scheduler will catch it and
send the error "forward" again synchronously, using the error channel of
the sink chain.
