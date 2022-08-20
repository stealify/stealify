# @stealify/stealify

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
Capability based offers Pre/post conditions for invocation/call protocol

### So how does it work?
Stealify analyzes, caches and distributes builds, as also offers you advanced code generation out of existing Source Code and or Artifacts.

Stealify is proud to be part of the community of passionate developers who contribute to Chromium and all its Related Projects like: Android, Fuchsia, v8, TuruboFan, LLVM, CodeStubAssembler, Bazel, GN, Ninja, CMake, npm

Our Mission is to Reduce the Overlapp between all that Projects and allow it to cross platform build and use the Projects. We do so by moving Project
indipendent Parts into a Isolated Typed Callable State and in that step we evaluate rules for build tools to get code Generated to Automate that process.
As it is essential to speed up development. We reduce the Technical Debt During the planning or execution of a software project, decisions are made to defer necessary work. For example:
- It's too late in the LifeCycle to upgrade to the new release of the compiler. We'll do it next time around.
- We're not completely conforming to the UserInterface guidelines. We'll get to it next time.
- We don't have time to uncruft (refactor, see RefactorMercilessly) the hyper-widget code. Punt until next time.
The list can grow quite long, with some items surviving across multiple development cycles. A big pile of deferred work can gum up a project, yet many of the items on the list don't appear on a project team's radar, especially if the focus is primarily on new product features. Yet removing accumulated sludge needs to be accounted for in planning!
Therefore: Make the debt visible. Keep an explicit TechnicalDebtList. Group deferred tasks into workable units, note the consequences of leaving each unit unattended. Keep the list visible. Make sure that Marketing knows that the list exists, and repeat the mantra "If we don't schedule time to pay off TechnicalDebt, you might not get all of the new features that you want." Allow time on the schedule for EntropyReduction, and keep the debt manageable. --DaveSmith
Clarifications (driven from the discussion in FirstLawOfProgramming):
Technical Debt includes those internal things that you choose not to do now, but which will impede future development if left undone. This includes deferred refactoring.
Technical Debt doesn't include deferred functionality, except possibly in edge cases where delivered functionality is "good enough" for the customer, but doesn't satisfy some standard (e.g., a UI element that isn't fully compliant with some UI standard).
TechnicalDebt is a measure of how untidy or out-of-date the development work area for a product is. --DaveSmith


## Current Goals
Support all ECMAScript Engines on All Platforms. And Offer a Universal platform indipendent Fuchsia OS Compatible Component System that byPasses OS Vendor Stores and lock-ins in a secure way. Short Version Create Interface Definitions for Common Software that allows writting Platform and Arch Agnostic Source that offers a pre compiled binary client that you can use in your software this way your Main Code does never need to change when the Platform or Arch changes where it gets build and runned reduces Testing and Development time.
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
