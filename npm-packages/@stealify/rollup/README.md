# @stealify/rollup component as npm package

## Why? 
There are many existing NodeJS Users that will maybe like to npm install this as starting point into the Stealify Ecosystem.
Is also at present used as entrypoint for TypeScript as also integration into the Gulp Task Runner which all are also 
npm packages so it makes sense until we got own components to handle them to integrate them via the component:rollup
and this offers a npm compatible entrypoint to use and build component-rollup with it self and @stealify/build
the result is a npm wrapped component-rollup that offers a v8 + rollup static binary 
and additional debug symbols stripped to a extra file if u build with debug else debug stripped away.
