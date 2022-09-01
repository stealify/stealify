# Quick Start for NodeJS
If you got NodeJS Installed we can use that as source Platform to bootstrap the stealify stack and run it directly with your current NodeJS Deployment/Installation.

## Usage with PNPM / NPM / YARN
Put it into your stack of Available modules

```
npm i stealify
```

```
const { runEffects, map, tap, createAdapter, scheduler: newDefaultScheduler } = import("stealify");

// returns push function and target stream
// takes events from from any event source or stream.
const [ onMessage, messageStream ] = createAdapter();

// Create a logging abstraction.  Could also be graylog, logstash, etc.
const { log, error, warn } = console;
const logValue = tap(value => log('received value =', value));
const fromMessage = map(message => JSON.parse(message).value);

const operation = { fromMessage, logValue }

// Compose the stream from the operations.
const receiveNewValues = operation.fromMessage(
  operation.logValue(messageStream)
);

// Start the stream.
runEffects(receiveNewValues, newDefaultScheduler());

// Start the stream source. 
let i = 0;
setInterval(() => onMessage({ value: i++}), 5000);
```
