# ![ng-xtend logo](public/logo.png) Store Example

Show usage of xt-store framework to load / save edited data with the help of an API.

## What's included
Same as the [inout example](../inout), with the addition of:
- The xt-store library is added to the project (see `package.json`)
- The StoreManager is configured to use the API (see `src/app/app.ts`)
- The list of book is loaded / saved using the signalStore (see `src/store/store.component.ts`)

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
