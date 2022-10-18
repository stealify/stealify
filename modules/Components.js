/**
 * Generic components like runEffects sink exposed as runTasks
 * Created to make it more easy to understand the concept of 
 * Tasks and Components as also modules to create them. 
 * a component is a sink that takes Tasks as input.
 * ((tasks)=>tasks.map(t=>t()))([()=>`task1`,()=>`task2`]) // executing tasks serial
 * in general as components are a nested concept components get created via higher level components.
 */
