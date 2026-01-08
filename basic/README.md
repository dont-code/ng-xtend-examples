# ![ng-xtend logo](public/logo.png) Basic Example

Shows how to use ng-xtend in a basic Angular application to display / edit any kind of data.

## What's included
- Inclusion of ng-xtend in the project (see `package.json`)
- Static inclusion of ng-xtend default plugin (see `src/app/app.ts`)
- Rendering of any object in a table using xt-render (see `src/basic-display/basic-display.component.html`)
- Rendering of any object in a card using xt-render (see `src/basic-display/basic-display.component.html`)
- Editing of any object using xt-render (see `src/basic-display/basic-display.component.html`)

## Development server

To start a local development server, run:

```bash
ng serve basic
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
