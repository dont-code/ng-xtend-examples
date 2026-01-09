# ![ng-xtend logo](public/logo.png) Plugin Example

Shows how additional plugins transparently provide functionality to the application.
By adding international and finance plugins, we'll see the application managing country and currency information in a much nicer way.

## What's included
Same as the [typed example](../typed), with the addition of:
- International and Finance plugins are added to the project (see `package.json`)
- The object type description is refined to reference country and currencies (see registerType in `src/app.ts`)

## Development server

To start a local development server, run:

```bash
ng serve plugin
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
