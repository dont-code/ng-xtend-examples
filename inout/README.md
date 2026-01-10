# ![ng-xtend logo](public/logo.png) In-Out Example

Shows how to connect two ng-xtend components together, without knowing them.
It listens to the selected element in the list component, and push the selection to the editor component.

## What's included
Same as the [plugin example](../plugin), with the addition of:
- A function that registers out events of whatver component is displaying the list (see `src/inout/inout.component.ts`)

## Development server

To start a local development server, run:

```bash
ng serve inout
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
