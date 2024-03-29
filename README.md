# @stealify/stealify 
Stealify is a ECMAScript Runtime or VM as also it acts as its own Runtime or VM Builder using its own Opinionated Concepts and Fundamentals

which is a Modular Event Stream Task Driven Component System where a Component gets defined out of Modules and Functions that get combined with a Scheduler into a Task that gets executed inside a component and a component can pass partial capabilitys and handels via creating additional Tasks a Task is by definition a Stream so it can Interact and also be combined with other Tasks. 


## Modlet Workflow
The most successfull efficent important, development strategie was the introduction of the "modlet structure" workflow. It's a very simple concept - every module should be developed as its own application. In practice, this means that instead of a folder structure where files are grouped by type like:

```
project/
  js/
    moduleA.js
    moduleB.js
  templates/
    moduleA.handlebars
    moduleB.handlebars
  css/
    moduleA.css
    moduleB.less
  test/
    moduleA_test.js
    moduleB_test.js
  docs/
    moduleA.markdown
    moduleB.markdown
```

A "modlet" groups files by the module they belong to:
```
project/
  moduleA/
    moduleA.js
    moduleA.handlebars
    moduleA.css
    moduleA.test.js
    moduleA.markdown
    moduleA.html // Client side JS Gets shipped also here!
    moduleA.cpp
    moduleA.h
    moduleA.build.js
    test.html
 moduleB/
    moduleB.js
    moduleB.handlebars
    moduleB.css
    moduleB.test.js
    moduleB.markdown
    moduleB.html // Client side JS Gets shipped also here!
    moduleB.cpp
    moduleB.h
    moduleB.build.js
    test.html
```
Each module has a folder with all of its supporting files, tests, and documentation. Additionally, we add:

- A demo page (moduleA.html) that shows off the modules functionality if the module has a visual representation.
- A test page (test.html) that runs just the module's tests.

This workflow / folder structure provides the following benefits:

- enforces good API design and separation of concerns. By writing a demo page, you might discover that it's difficult to setup your module without a lot of bootstrapping. This might be an indication that something is wrong.
- Developers are more likely to update tests and documentation if they are sitting right next to the module they are editing. The test is not hidden away in some tests folder that is more easily ignored.
- It is easy to identify missing tests or documentation. If the test or documentation file is missing altogether, it's very easy to identify when they are in the same folder.
- You can develop the application without having to load the entire application and all of its tests on every change.

## Example How to Compose C++
Look into our linux modules in general you will write a buildScript with gulp or rollup or maybe even from scratch if it is a smaller project
then you will include the module via gulp rollup or a Makefile anything existing that you got that you will configure to build shared with debug symbols
create some js glue code and or typescript and build it

Rule of thumb when you run stealify compile you will always get what we call a Component no matter what is included into that. 
When you compile something with a buildScript that does not at the end invoces stealify compile you created a Module no matter if you used any stealify code inside that when you create something that is a Valid ECMAScript Module you created a Stealify Module, When that contains Stealify Code eg: uses Stealify Schedulers your created a Task no matter if it is in a ECMAScript Module. 
And last rule if you run a Module Inside a Component that also gets a Task because it gets a Scheduler Attached from the Component that Encapsulates the Component. Module + Scheduler = Task. Running Executing Code = Task. Who can execute Tasks? Right a Component!.

```
stealify compile static your_new_module_based_component.js
```

- web-components: module =>  element => task defineComponent => component that runs when element comes into the dom custom-element
- stealify-component: module => task => component that runs based on its Scheduler when the component gets loaded by a other component


## Concepts
a module can consist out of any code and can be build via any build tool while we created rollup-stealify to use rollup and ECMAScript or stealify lang as also Typescript to build modules out of C, C++ , Rust, WASM Source this Modules can then be directly build via rollup-stealify again into Runtimes or stealify fifo fdo builds depending on the amount of interfaces that you need also capn is supported with http3 and webrtc support as also http2

The Main Diffrence between a Component and a Module is that a Component is a Sink and Runner While a Module contains only out of src code to create components or Tasks for Components. Modules are Language Agnostic as a Concept of Stealify while Components always offer Binary Interfaces as they need to execute Code. Components mostly get triggered by events that get created by the Tasks that compose the Component

you can think about a component as indipendent runtime that can use multiple CPU cores but can also use only a single one dependening on your need on the high level everything is a component you software gets composed out of many components that are linked via the Tasks that they run and That are able to talk cross boundary. A Task holds all its internal links and is able to own parts of the component that creates the Task

a Task can be defined in a Module but can only get Created by a Component while a Component can run Tasks that are Composed out of one or many Modules. 

Tasks are simply scheduled functions they are default scheduled to get executed directly but you can implement flow control via diffrent schedulers. The Component that then gets the Task can define Tasks that should happen on diffrent conditions or events of the Tasks reminder they are Streams so you can do Transforms or you can write and read them.

Support for Managed Key Infrastructure is WiP you can use existing solutions. 

- [@stealify/VSStudio](https://github.com/stealify/vsstudio) - VSStudio Visual Stealify Studio - A New Way to Create Applications and Operating Systems as also Virtual Machines.
- [@stealify/VSStream](https://github.com/stealify/vsstudio) - A Visual Studio Code and Visual Stealify Studio Compatible Image / Audio processing and Streaming Integration and Multimedia Studio Implementation. VS handels the Text Processing while VSStream Handels the Image and Audio Processing it includes bindings for gstreamer and ffmpeg as also OS Platform dependent Modules to create Multimedia Components.
- [@stealify/lang](https://github.com/stealify/lang) - Universal Lanaguage Framework and Tooling integrations for GraalVM/LLVM/GCC
- @stealify/os - Operating System that allows you to define and run Confined Desktop Environments using Stealify Lang.
- @stealify/hardware - LowLevel (Interupt Based) Hardware abstraction layer for @stealify/os/kernel components, tasks, modules
- @stealify/webplatform 
- @stealify/image-processing - low level driver implementation modules and tasks to implement graphics drivers for AMD, INTEL, NVIDIA a Mesa3D Successor. integrating also a x11 and wayland, mir successor called AsteriskGL
- @stealify/display-manager - component:display-manager the display manager component of stealify.
- @stealify/b8g - Big Engine - a component to run mksnapshot binarys as also later a replacement for v8.
- @stealify/browser - Everything related to existing browsers as also Stealify Lang instructions to build own Web-interoperable Runtimes
- @stealify/desktop - Integrations for diffrent Desktop Implementations running on diffrent Operating Systems and Platforms.
- @stealify/platform - Integrations for diffrent Platforms like Clouds and Containers OS Services Init handlers
- @stealify/ide - Integrations for diffrent IDE's as also Stealify Lang instructions to build own IDE's.

## Usage
Download the stealify binary or boot/start a stealify component-manager for your Current Operating System.
The Component Manager is the Heart of the System it takes your Configurations and Packages and turns them into Components that do run as desired on the target Machine or your local one. The Component Manager routes the hardware Capabilitys to the Components so every Component runs fully Isolated.
the main module that the core component-manager exposes is runTasks 

# Understand the Fundamentals. 
Stealify is 100% Component based and favors Composition over Inharitance. Every Component should do only one thing. While there can be Components composed out of many Components that do one Thing! You can always define rules for sharing Data between components think about it like the share this button on Webpages or in Android.

## Differences between Stealify Lang and ECMAScript tc39 and TypeScript
Not all Design Fundamentals of tc39 are relevant for us and they are also not useful for developers that's why we only introduce a subset of the ECMAScript Specification, in general, the main difference is ECMAScript Specification Designs an Other Language Execution Environment then Stealify does
ECMAScript gets executed in a so-called ECMAScript Engine and Stealify does get executed on ECMAScript and Stealify Language Execution Environments so-called Runtimes. A Stealify Runtime by Specification is simply something built out of the v8 Source Implementing, at last, a SubSet of the v8 Source and using a Subset of the v8 Build tools Combined with the Stealify Source and Build tools.

## But can it run Minecraft? 
Yes it can Stealify supports all guess able JVM Interfaces as also can Act as JVM so it can run Java Bytecode.

## Developer Features
Code faster and execute that code in Multiple Environments running on diffrent Platform and Arch without Recoding.
Implement Your Own Isolated Secure Platforms and Environments for Desktop and Embedded no limits out of the Best Open Source Tools. While Not Blocking your from using Closed Source.

## Repository Design
- https://github.com/stealify-backports === stakeholders
- https://github.com/stealify/* === Maintained by Stealify Contributors
- Collections
  - platform_libs/ - A Collection of currated cross platform libs including build instructions and WiP Build Unified Build Tool.
    - stealify_libs - Wrappers around Common Platform dependent libs to expose them with a Standard API.
  - arch_libs/ - A Collection of CPU Architecture Related Libs mostly used by compiler infrastructure. overlapps by design with platform_libs.
  - platform specific has overlapp with platform_libs by design
    - windows_libs
    - macos_libs
    - ios_libs
    - android_libs
    - fuchsia

## What is Stealify?
This open-source, multi-language (Polyglot) build tool saves developers time with faster, reproducible builds & tests. As also adds a Universal Polyglot Capability Based RPC ABI that is transport Agnostic and so works on all Platforms and Architectures think about it as Platform Agnostic Typed IPC that gets generated out of a Component Interface Definition. Overall it Combines the best of all Build Tools while using it self as Interface Definition Language. Something like the concept of SelfExplaining Code. 

Expressing Intent, not Implementation
Guessing Intent from existing Implementation
Type Safety(ish) 
Increase spec -> implementation speed
More natural framework for analysis and correctness
Abstraction for external contributors
Simple Semantics - Operations map simply to any Kind of Function even Polyglot or the CodeStubAssembler. 
Always correct write barrier elimination
Load elimination
Bounds check verification/elimination
static_assert -> compilation-type errors
Capability based offers Pre/post conditions for invocation/call protocol think about it like RPC GRPC Something to Call Functions.

### So how does it work?
Stealify analyzes, caches and distributes builds, as also offers you advanced code generation out of existing Source Code and or Artifacts.

Stealify is proud to be part of the community of passionate developers who contribute to Chromium and all its Related Projects like: Android, Fuchsia, v8, TuruboFan, LLVM, CodeStubAssembler, Bazel, GN, Ninja, CMake

Our Mission is to Reduce the Overlapp between all that Projects and allow it to cross platform build and use the Projects. We do so by moving Project
indipendent Parts into a Isolated Typed Callable State and in that step we evaluate rules for build tools to get code Generated to Automate that process.
As it is essential to speed up development. We reduce the Technical Debt During the planning or execution of a software project, decisions are made to defer necessary work. For example:
- It's too late in the LifeCycle to upgrade to the new release of the compiler. We'll do it next time around.
- We're not completely conforming to the UserInterface guidelines. We'll get to it next time.
- We don't have time to uncruft (refactor, see RefactorMercilessly) the hyper-widget code. Punt until next time.

The list can grow quite long, with some items surviving across multiple development cycles. A big pile of deferred work can gum up a project, yet many of the items on the list don't appear on a project team's radar, especially if the focus is primarily on new product features. Yet removing accumulated sludge needs to be accounted for in planning!
Therefore: Make the debt visible. Keep an explicit TechnicalDebtList. Group deferred tasks into workable units, note the consequences of leaving each unit unattended. Keep the list visible. Make sure that Marketing knows that the list exists, and repeat the mantra "If we don't schedule time to pay off TechnicalDebt, you might not get all of the new features that you want." Allow time on the schedule for EntropyReduction, and keep the debt manageable. --DaveSmith

## Clarifications (driven from the discussion in FirstLawOfProgramming):
Technical Debt includes those internal things that you choose not to do now, but which will impede future development if left undone. This includes deferred refactoring.
Technical Debt doesn't include deferred functionality, except possibly in edge cases where delivered functionality is "good enough" for the customer, but doesn't satisfy some standard (e.g., a UI element that isn't fully compliant with some UI standard).
TechnicalDebt is a measure of how untidy or out-of-date the development work area for a product is. --DaveSmith


## Current Goals
Support all ECMAScript Engines on All Platforms. And Offer a Universal platform indipendent Fuchsia OS Compatible Component System that byPasses OS Vendor Stores and lock-ins in a secure way. Short Version Create Interface Definitions for Common Software that allows writting Platform and Arch Agnostic Source that offers a pre compiled binary client that you can use in your software this way your Main Code does never need to change when the Platform or Arch changes where it gets build and runned reduces Testing and Development time.
- [ ] Adjust the TC39 Processes and Create a Stealify Process.
- [ ] Implementation of a Uinversal ABI based Build System for ECMAScript Engines
  - [ ] Generator for GraalVM generates .d.ts files as also .js files containing Java.type('java.io.File')
  - [ ] Bazel (Java) interOp (Android Build)
    - [ ] Replace Bazel Methods with GraalVM Once
    - [ ] Create Bazel native image including Capability based invocation/call api
  - [ ] Generate Java.type() to Torque or other code gen
  - [ ] Generate and consume GN interOp
  - [ ] Implementation of a ECMAScript written XMake Compatible Build System
  - [ ] (lua) parser sbffi calls 
  - [ ] get Fuchsia OS Feature Pairity Written in ECMAScript. Mainly Scheduling and Channels as also syscalls via asm if needed
  - [ ] Evaluate sharedBuffer struct ffi calls 
  - [ ] Implementation of a FIDL Wire Compatible Export for CapNProto
  - [ ] Implementation of a Zircon Kernel API using the same Interfaces.
  - [ ] Adjustable NodeJS Compatible cross Platform v8::Isolate based builds.


## WiP
- [ ] - Getting The GitHub Orgs Cleaned eg: stealify-backports, stealify in shape and automated as also clean up and automate.

## Current Repos!
- [ ] @stealify/rollup
- [ ] @stealify/create 
- [ ] @stealify/electron - @stealify/gui-electron wrapper designed as drop in replacement.
- [ ] @stealify/nwjs - @stealify/gui-nwjs wrapper designed as drop in replacement.
- [ ] @stealify/gui - like Electron & NWJS but decoupled NodeJS from Chromium also offers a hugh collection of Tooling for other gui kits.
- [ ] @stealify/puppeteer
- [ ] @stealify/npm
- [ ] @stealify/nodejs
- [ ] @stealify/get - Helps to get files downloaded 
- [ ] @stealify/devtools-protocol - @stealify/gui-electron wrapper designed as drop in replacement.
- [ ] @stealify/graalvm - Toolchain for GraalVM
- [ ] @stealify/browser - Toolchains for diffrent Browsers and Test Frameworks uses @stealify/puppeteer @stealify/playwright
- [ ] @stealify/vscode - Toolchains and Frameworks uses @stealify/theia @stealify/codium 
- [ ] @stealify/linux - Source code to build diffrent linux distributions in a custom way like windriver but more maintainable.
- [ ] @stealify/chromium - Source code to stealify chromium
- [ ] @stealify/fuchsia - Source code to stealify fuchsia
- [ ] @stealify/android - Source code to stealify fuchsia
- [ ] @stealify/vm - v8 stealify tooling. as also
- [ ] @stealify/component-manager - Everything to Manage Stealify components (packages)

