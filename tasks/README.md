# Contains Tasks
Tasks are defined as Scheduled Modules that can get created via function invocation

```ts
import CreateTask from 'module:Tasks';
CreateTask({
  run() {
    // your code 
  }
})

CreateTask(() => { /** ... your code */})
```

they get used with components like this 

```ts
const OutputTask = (tasks) => 
  tap(console.log, 
      combine((task)=> task?.run() | task(), // creates combinedTask
      ...tasks);

// eq OutputTask( CreateTask(() => { /** ... your code */}), CreateTask(() => { /** ... your code */}) )
const outputTask = tap(console.log, 
                       combine((task)=> task?.run() | task(), // creates combinedTask
                               CreateTask(() => { /** ... your code */}),
                               CreateTask(() => { /** ... your code */})))

// Run the tasks and remember this is the low level implementation of a component-manager 
// do not use that outside that usecase always use runTasks from your component-manager!
runTasks(outputTask, DefaultScheduler())
```
