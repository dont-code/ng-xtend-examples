# ![ng-xtend logo](public/logo.png) Advanced Type Example

Show how ng-xtend framework supports complex types, like many-to-one, one-to-many or many-to-many relations.

## What's included
Same as the [store example](../store), with the addition of:
- The authors are now linked to books with a many to one relation (see `src/app/app.ts`)
- We create two signal Store, one to manage the authors and one to manage the books (see `src/advanced-type-display/advanced-type-display.ts`)
- To ease the development, we create the typescript types for book and authors ( see `src/model/types.ts`)
- You can edit both the author list and select one for each book (see `src/advanced-type-display/advanced-type-display.html`)

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
