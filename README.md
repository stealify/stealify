# @stealify/stealify
Stealify Lang - Is an ECMAScript Inspired Polyglot Language

can create cross-platform desktop applications using any Language even Polyglot with any Browser that implements: Devtools Protocol, ECMAScript / JavaScript, WASM, HTML and CSS. For Example, Opera, Safari, Firefox, Chromium. So it is a DropIn Replacement for NWJS or Electron while it also works
with existing Electron and NWJS Projects and can be applyed Incremental. See: Incremental Convert a Electron App to Stealify.

Its main difference is that it does Compile down to whole Unikernels/CloudImages/Containers/AppImages/Platform Specific Binary Builds and other virtual machines it does also provides a Unified Compiler Feedback Interface to gather Metrics and Profiling as also Other Compiler Feedback while Running and While Building this allows you to KI Optimize your Already Deployed Applications while you code on them. Our default algo is bayesian. Because Fast Feedback while coding leads to faster Working Software! See: Stealify Compiler Feedback Interface and look into the Implementations to learn more. 

The Project is Created by Frank Lemanschik after more than 15 years of research. All Self Financed because of my own needs while Freelancing as IT Consultant it Resulted most out of frustration with the existing Solutions to code Cross-Platform Web Driven Applications with Java, Electron and or NWJS. As also the removal of Browser API's like nacl and others that allow to integrate native code into the browser platform while it was never optimal to compile or install extensions directly with a new browser as that leads to the need to maintain that platform also. 

It's main goal is to transport a hugh amount of knowleg into something that Stays longer then my Human Body. It is part of my "Web Driven Applications Standard" Project aka WDA. Web Driven Apps are Native Apps that take advantage of Browser features and so use at last Partial<code> that would run in a Browser or Interact with code that runs in a Browser or other devtools protocol enabled runtimes.

## Why?
Original Text: Frank Lemanschik 01.04.2022 - I was confident in coding since I was 10 years old but then I got the first customers and learned how hard it is to maintain code that is deployed elsewhere. I needed to address issues that I simply never got on my system or systems. With more and more years of experience, I found out where the Problem root is in the Whole Industrie I spoke to a lot of engineers of Organisations of all Sizes. From Google to Cloudflare to Microsoft over Oracle, I got them all. I followed Carefully everything they are doing and tried to see the why and how it is useful. I started to See my Self as a Stakeholder in some bigger Projects and tried to successfully influence them. As I did that I found out that I got Communication issues and I started to work on that.

As I got all covered I thought it is clever to teach others what I learned then I found out that does not Scale then I remembered IDE Tooling and Intellisense and Finally got the Final Vision I Put it together with what I learned from Projects like Oracle GraalVM, Rust Lang, As also many other Projects and throw all my old Concepts away! So the King is Dead (Stealify Patterns and tools) long live the King @stealify/stealify The Coding Lang that inheres most other coding langs + gives them new on build/runtime debug abilities. 

## How?
As said in the why? section it is the Feedback that teaches the Coder and Users at the same time when you get fast feedback you get a nice fast learning curve over the last years that teaching system got improved more and more and is de facto the most efficient and fast one. You learn only what you need to learn while u are using and doing it. Fun Fact the Amount of Coders Doubels every 7 years(Calculated 2020) was 5 years https://blog.cleancoder.com/uncle-bob/2014/06/20/MyLawn.html please read that carefully to even understand the Problem!

The Stealify Lang Language Agnostic Language creation Framework (equal to Project Truffle from Oracle) gives Developers an OpenSource Solution to cover the Problem it allows them to provide feedback and work on that feedback as the community at last that's the Idea behind that the time will show if they accept it but since we base on for example Java Language Tooling and Typescript as also ESLint and many other Big Projects with Millions of users already and Algin all that it should get Accepted by the Community as soon as it is aware of all that. I Predict that not many Engineers will see and understand this Project right but when that time should happen I am 100% Confident that this is the final solution after that it is only a matter of time. I am sure that Stealify has the Potential to be the last Coding Language as I designed it to be Syntax Agnostic there are no excuses but sure as always you can reimplement all that in your favorit language like truffle did it in Java but truffle is missing the Bigger Picture as it only targets language conversation and has no bigger context like Stealify which targets a whole System and not a single Component. The Stealify Lang Project offers a framework for ECMAScript / JavaScript to Code Cross Platform Desktop and headless Apps reusing a lot of existing Mostly ECMAScript based Open Source Projects.

## Tribute to the Clean Code Project in general
It is a good project and we enforce many patterns that get teached there please support it as long as the creator is Alive he is a good Person. His Main Contribution to this Project is that we enforce and enable TDD by Default while we did design the Tests and Interfaces Carefully so decoupled that we can extend anything anywhere in the Coding Language World and Run Test as soon as we Write to reduce failures even before the code is fully written. I hope you like that! We catch up with the best and combine the knowleg of all existing Oldschool Coders in One Gigant Project to Replace and Scale Code Teachers.

## Tribute to DJ Ware on Youtube
He Identifyed the same Problems and issues but out of a total diffrent viewpoint so Invest into a Section only to Answer his Proposals
see: Issues Don Ware - *

## Getting started
You need a Desktop PC Running any OS That Supports NodeJS or @stealify/engine install @stealify/engine-arch-os@latest or NodeJS@current + @stealify/engine

```
@stealify/engine-arch-os@latest or NodeJS@current + @stealify/engine are Equal on all systems
```

@stealify/engine-desktop installs the correct chromium version for the current system and arch and is a addtional package for @stealify/engine-arch-os@latest or NodeJS@current

## Design
Stealify is designed to run in ECMAScript Engines that Implement at last the current ECMAScript Standard. It offers a framework to create and expose Stealifys API's via Host Objects inside any ECMAScript Compatible Engine (Deno, NodeJS, GraalJS, V8, SpiderMonkey, ...any other).

The Stealify Compiler tools are language agnostic and offer a Framework to integrate any language and expose it inside the ECMAScript Engine.

