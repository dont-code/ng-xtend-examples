# ![ng-xtend logo](public/logo.png) Typed Example

Shows how to use leverage the type system of ng-xtend to better support creating, editing and displaying objects.

## What's included
Same as the [basic example](../basic), with the addition of:
- The object type is described (see registerType in `src/app.ts` and valueType in `src/typed-display/typed-display.html`)
- New, empty objects conformed to their type can be created (see `src/typed-display/typed-display.component.html`)

## Development server

To start a local development server, run:

```bash
ng serve typed
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
