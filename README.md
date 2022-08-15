# @stealify/stealify
Stealify a Operating System Agnostic Implementation of a Fuchsia Compatible Operating System. Designed to build Applications and Services that run Everywhere. From Mobile to Embedded till Desktop PC's as any maybe already installed Operating System. 

It aims 100% Fuchsia OS Compatability on Any Kernel or OS via a ECMAScript written Zircon Kernel Implementation Exposing the same Interfaces.

This allows to directly run Fuchsia Components on Linux, MacOS, Windows.

Understand the core principles behind Stealify and explore how Stealify creates a foundation for developers to create long-lasting products and experiences across a broad range of devices and Operating Systems.

## Architecture
The following architectural principles guide Stealify's design and development:

Simple: Stealify makes it easy to create, maintain, and integrate software and hardware across a wide range of devices.

Secure: Stealify has a software model designed for modern computing.

Updatable: As a modular operating system, Stealify allows the kernel, drivers, and software components to be independently updatable.

Performant: Stealify is designed for real world product requirements and optimized for performance.

The core of the system is a collection of libraries for handling system startup and bootstrapping. 
All other system components are implemented in user space and isolated, reinforcing the principle of least privilege. 
This includes:

- Device drivers (driver_manager.cm)
- Filesystems (fshost.cm)
- Network stacks (netsvc.cm)

this architecture enables Stealify to reduce the amount of trusted code running in the system to a few core functions:

- Memory management
- Scheduling
- Inter-process communication
- process management

Software may or may not run within the confines of a single process. Jobs allow "applications" that are composed of more than one process to be controlled as a single entity. Even Running a Desktop Application is a Job in Stealify Terminologie. the Interface Language Definition Makes
Scheduling and Inter-process communication audit and predict able.

```
TASK                     PSS PRIVATE  SHARED   STATE NAME
j: 1027               507.8M  507.4M                 root
  p: 1061             564.4k    564k     36k         bin/bootsvc
  p: 1150            4264.4k   4264k     36k         bin/component_manager
  j: 1479             228.4k    228k
    p: 1583           228.4k    228k     36k         pwrbtn-monitor.cm
  j: 1484             532.4k    532k
    p: 1599           532.4k    532k     36k         svchost.cm
  j: 1544             402.4k    304k
    p: 1633           402.4k    304k    232k         netsvc.cm
  j: 1681             296.4k    296k
    p: 1733           296.4k    296k     36k         console-launcher.cm
  j: 1799            7232.4k   7232k
    p: 1825          7232.4k   7232k     36k         archivist.cm
  j: 1927             660.4k    660k
    p: 1955           660.4k    660k     36k         base-resolver.cm
  j: 2072            1016.4k   1016k
    p: 2088          1016.4k   1016k     36k         driver_manager.cm
  j: 2239             348.4k    348k
    p: 2252           348.4k    348k     36k         device-name-provider.cm
  j: 2364             275.3M  275.3M
    p: 2380          1012.4k   1012k     36k         fshost.cm
    p: 6544           252.1M  252.1M     36k         /pkg/bin/blobfs
    p: 10205         9744.4k   9744k     36k         /pkg/bin/minfs
    p: 10475           12.8M   12.8M     36k         pkgfs
```
Let's focus on two columns in the output for now:

TASK: This tells you whether each entry is a job (j) or process (p) followed by their unique id.
NAME: This provides a little more detail about what piece of the system is running there.
Let's break down some interesting things here based on what we've discussed so far:

Every process is connected to a parent job. Some jobs have multiple processes.
All jobs trace back to the root job as the ultimate parent, forming a tree.
During startup, the system launches a few processes directly into the root job. Most other processes are launched under their own parent jobs.
After the initial startup work, many of the entries have a .cm extension. These refer to components, and you will learn more about them later on.
Some of these components are core services like filesystems (fshost.cm) and drivers (driver_manager.cm) that live in user space separate from the kernel.

## Software Isolation Model
As everything runs as Component it runs isolated.

/stealify/children/core/children/network/children/http-client
```
client
children
component_type
debug
exec
id
moniker
resolved
url
```

./exec/in/svc contains services provided to the component.
```
logger.LogSink
net.name.Lookup
posix.socket.Provider
```

Components provide system services through their outgoing directory, which is mapped to the exec/out path inside stealify. 

./exec/out/svc 
```
http.Loader
```
Each service is accsesible over a well-known protocol defined by any Stealify Suported IDL Interface Definition Language defined Interface that
can optional generate clients for diffrent coding languages for faster integration;

## Current Goals
Support all ECMAScript Engines on All Platforms. And Offer a Universal platform indipendent Fuchsia OS Compatible Component System that byPasses OS Vendor Stores and lock-ins in a secure way. Short Version Create Interface Definitions for Common Software that allows writting Platform and Arch Agnostic Source that offers a pre compiled binary client that you can use in your software this way your Main Code does never need to change when the Platform or Arch changes where it gets build and runned reduces Testing and Development time.
- [ ] Implementation of a Uinversal ABI based Build System for ECMAScript Engines
- [ ] Implementation of a ECMAScript written XMake Compatible Build System
  - [ ] (lua) parser sbffi calls 
- [ ] get Fuchsia OS Feature Pairity Written in ECMAScript. 
  - [ ] Evaluate sharedBuffer struct ffi calls 
  - [ ] Implementation of libnode.so usign FIDL 
  - [ ] Implementation of libv8.so usign FIDL
  - [ ] Implementation of libnode.so usign FIDL should also Compile with graal-node
  - [ ] Implementation of FIDL and the Component Manager
    - [ ] Implementation of a Zircon Kernel using the same Interfaces.
