# @stealify/stealify 

- [@stealify/lang](https://github.com/stealify/lang) - Universal Lanaguage Framework and Tooling integrations for GraalVM/LLVM/GCC
- @stealify/os - Operating System that allows you to define and run Confined Desktop Environments using Stealify Lang.
- @stealify/hardware - LowLevel (Interupt Based) Hardware abstraction layer for @stealify/os/kernel
- @stealify/b8g - A Small Runtime and Runtime Builder for Stealify Lang, Typescript, ECMAScript.
- @stealify/browser - Everything related to existing browsers as also Stealify Lang instructions to build own Web-interoperable Runtimes
- @stealify/desktop - Integrations for diffrent Desktop Implementations running on diffrent Operating Systems and Platforms.
- @stealify/platform - Integrations for diffrent Platforms like Clouds and Containers OS Services Init handlers
- @stealify/ide - Integrations for diffrent IDE's as also Stealify Lang instructions to build own IDE's.

## Usage
Download the stealify-package-manager for your Current Operating System. It will help you to Configure and deploy a stealify-component-manager.
The Component Manager is the Heart of the System it takes your Configurations and Packages and turns them into Components that do run as desired on the target Machine or your local one. The Component Manager routes the hardware Capabilitys to the Components so every Component runs fully Isolated.

use it to create a stealify deployment for your needs read the user and developer guides. As a User or Developer it is importent to understand the Fundamentals. For Example Stealify is 100% Component based and favors Composition over Inharitance. Every Component should do only one thing. While there can be Components composed out of many Components that do one Thing! You can always define rules for sharing Data between components think about it like the share this button on Webpages or in Android.

## Differences between Stealify Lang running on StealifyVM and GraalVM
- GraalVM is Mainly built using the JVM Platform Stealify uses v8 and the Chromium Project.
- Both got InterOp via Multiple Interfaces.
- Stealify as it uses an ECMAScript / TypeScript Compatible Syntax often works without Refactoring or even compiling the code again in different Environments.
- Stealify Not Only Includes what GraalVM Includes:
  - Offers Advanced Packaging / Maintainance / Development and other LifeCycle Systems that are GraalVM Compatible. 
  - It is designed to write your Application Once and then minimize the need for changes.
  - It can produce GraalVM Powered Native Images as also can run GraalVM it self as it also includes a own Kernel/HAL/DBUS implementations so we can Produce Native Binarys with or without graalvm out of Any Code Modular Shared.
  - Offers tools to build binary compatible components that interact via well-known and defined Protocols to eliminate Security Risks.
  - It defines a Dynamic Language that can change behavior on Runtime or Build time so your code can run on any Architecture or Platform
  - It defines a Universal Secure Isolated: Hardware / Software / Component Model.
  - Includes own Universal Kernel that does not even need to be Cross Platform Binary Compatible so can get Used as its own Linux/Fuchsia/Android/Windows Kernel Abstraction that can build Custom Kernels and even Unikernels that you can directly deploy to your hardware
  - Includes universal Deployment/CI to automate the above-described Creation of Software that Includes its Kernel and is Fully isolated and Secure by Design!
  - In general GraalVM even when it is the most feature Complet Compitor is still only a additional target that you can turn into Stealify Components.
    - Importent to say while you could also run Stealifys Core Components on GraalVM it only adds overhaead but when you run GraalVM with Stealify you get the best out of both worlds. 

## Differences between Stealify and ECMAScript tc39 and TypeScript
Not all Design Fundamentals of tc39 are relevant for us and they are also not useful for developers that's why we only introduce a subset of the ECMAScript Specification, in general, the main difference is ECMAScript Specification Designs an Other Language Execution Environment then Stealify does
ECMAScript gets executed in a so-called ECMAScript Engine and Stealify does get executed on ECMAScript and Stealify Language Execution Environments so-called Runtimes. A Stealify Runtime by Specification is simply something built out of the v8 Source Implementing, at last, a SubSet of the v8 Source and using a Subset of the v8 Build tools Combined with the Stealify Source and Build tools.

## Feature Comparison
|Feature Name | Feature Description | GraalVM Supports | GraalVM Details | Stealify VM Supports | Stealify VM Details |
|------------| ------------------- | ---------------   | --------------- | -------------------- | -------- | 
| Supports Polyglot Languages | What Languages can run on the VM | x | All Languages that got a Implementation using the Java Written Truffle Framework and all Java Bytecode based Languages | x | All Languages as working with raw ASM on the Lowest Level
| Hardware Support | arch platform support  | x86, x64, arm (experimental) many more named a few | depends on if there exists a GraalVM Enabled OpenJDK Build that Supports the Targeted Hardware or Not | all known even embedded | Supports Building a Component Based Kernel that is Adjustable for diffrent hardware |
| 


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

