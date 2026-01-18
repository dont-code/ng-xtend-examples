# ![ng-xtend logo](public/logo.png) Dynamic plugin Example

Same as store example, however the plugins are loaded dynamically from the web, instead of being bundled with the application.
This allows to update the plugins without rebuilding the application.

## What's included
Same as the [store example](../store), with the addition of:
- We remove the Finance and International plugins from the package (see `package.json`)
- Native federation framework is added (see `package.json`)
- Finance and International Plugins are loaded from internet (see `src/app/app.ts`)

## Development server

To start a local development server, run:

```bash
ng serve store
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
