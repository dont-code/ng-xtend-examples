# ![ng-xtend logo](basic/public/logo.png) Examples

This mono-repository provides multiple examples of usage of ng-xtend framework.
Each example is a separate package containing an Angular application, adding a specific use case over the previous one.

## Description
The table below describes the different examples:

| Example                | Description                                            | Plugin type | Plugin Loading | Typing system |
|------------------------|--------------------------------------------------------|---------|--------|---------------|
| [basic-example](basic) | Displays any object in various format in a generic way | Generic | Static | No |


## Build
It is managed by [rush](https://rushjs.io), so you need to install rush globally,
then run `rush install` to install dependencies.

- The `rush build` command will build all packages.

Each package being an angular application, you can run `ng serve` to run them locally.
