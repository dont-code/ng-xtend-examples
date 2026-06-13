# ![ng-xtend logo](public/logo.png) Basic Example

This example shows how to use ng-xtend in an Angular application to display and edit **any** object without knowing its structure at compile time. It demonstrates the core philosophy of ng-xtend: *generic rendering driven by data, not by hand-crafted templates.*

---

## Step 1: Add the dependencies

Open [`package.json`](https://github.com/dont-code/ng-xtend-examples/blob/main/basic/package.json) and add:

| Package | Role |
|---------|------|
| `xt-components` | The core rendering engine: `XtRenderComponent`, `XtResolverService`, etc. |
| `xt-type` | Type system — describes the shape of data so the renderer knows what fields to show |
| `xt-plugin-default` | The default plugin that knows how to render primitives (strings, numbers, booleans, dates) and plain objects |

```json
"dependencies": {
  "xt-components": "^0.6.4",
  "xt-type": "^0.10.4",
  "xt-plugin-default": "^0.6.4"
}
```

**Why these?** `xt-components` provides the `<xt-render>` tag and the resolver that matches data to UI components. The default plugin gives you ready-made rendering for basic JavaScript types — without it, `<xt-render>` wouldn't know how to draw anything.

---

## Step 2: Register the default plugin

In [`src/app/app.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/basic/src/app/app.ts), inject `XtResolverService` and call `registerDefaultPlugin`:

```typescript
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';

export class App {
  resolverService = inject(XtResolverService);

  constructor() {
    registerDefaultPlugin(this.resolverService);
  }
}
```

**Why?** The `XtResolverService` is a registry of "renderers". Each plugin registers itself with the resolver and says *"I know how to display type X in mode Y."* Calling `registerDefaultPlugin` populates the resolver with handlers for `string`, `number`, `boolean`, `Date`, `object`, and arrays — so `<xt-render>` can display any plain value you throw at it.

> **Note:** A "plugin" in ng-xtend is just a set of UI components + a registration function. The default plugin is included statically here; later examples show how to add domain-specific plugins (international, finance, etc.) or even load them dynamically at runtime.

---

## Step 3: Create a component with data

In [`src/basic-display/basic-display.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/basic/src/basic-display/basic-display.ts), define the data you want to render:

```typescript
export class BasicDisplay implements OnInit {
  elementToDisplay = signal<any>({
    bookName: 'The Lord of the Rings',
    author: 'J. R. R. Tolkien',
    nationality: 'UK',
    bought: {
      on: new Date('2005, 2, 1'),
      at: 'Library',
      price: 34
    },
    read: true
  });
}
```

The object can have nested properties, mixed types, and any shape — ng-xtend will discover its structure at runtime.

**Why a raw object (no type descriptor)?** In this first example we don't describe the type yet. The default plugin introspects the object (`typeof`, `instanceof`, etc.) and picks appropriate renderers. This works for exploration and simple cases. The [typed example](typed.html) shows how registering a type gives you better control.

---

## Step 4: Render as a list

In [`src/basic-display/basic-display.html`](https://github.com/dont-code/ng-xtend-examples/blob/main/basic/src/basic-display/basic-display.html), use `<xt-render>` with `displayMode="LIST_VIEW"`:

```html
<xt-render displayMode="LIST_VIEW" [value]="elementToDisplay()"> </xt-render>
```

**What happens:** The resolver sees no explicit type and falls back to the default plugin's object handler. Since the mode is `LIST_VIEW`, it renders a **table** — one row per property, with key in the left column and value in the right. Nested objects (like `bought`) are rendered inline as sub-tables.

**Why LIST_VIEW?** Choose `LIST_VIEW` when you want a compact summary. It's the equivalent of a "list" or "table" display.

---

## Step 5: Render as a full card

Keep the same value but switch to `displayMode="FULL_VIEW"`:

```html
<p-card [style]="{width: '50em'}">
  <xt-render displayMode="FULL_VIEW" [value]="elementToDisplay()"> </xt-render>
</p-card>
```

**What happens:** The resolver picks the same object renderer but uses a different layout — each property is displayed in a **labeled row**, one per line, suitable for a detail view. Wrapping it in `<p-card>` (from PrimeNG) adds a visual container.

**Why FULL_VIEW over LIST_VIEW?** `FULL_VIEW` is meant for reading the full object. It's more spacious, labels are more prominent, and nested objects are expanded rather than tiled.

---

## Step 6: Edit the object with a form

To make the data editable, switch to `displayMode="FULL_EDITABLE"` and bind a reactive `formGroup`:

```typescript
// In the component class
bookForm = this.formBuilder.group({});

ngOnInit(): void {
  updateFormGroupWithValue(this.bookForm, this.elementToDisplay());
}
```

```html
<form [formGroup]="bookForm">
  <p-card [style]="{width: '50em'}">
    <xt-render displayMode="FULL_EDITABLE" [formGroup]="bookForm"> </xt-render>
  </p-card>
</form>
```

**Why `updateFormGroupWithValue`?** ng-xtend needs the form group to mirror the shape of your data so it can bind each field to the correct form control. `updateFormGroupWithValue` recursively walks the object, adds `FormControl` entries for each leaf value, and populates them with the current data. Once set up, any edits the user makes in the UI automatically update the form group.

**Note** that we don't pass `[value]` when using `[formGroup]` — the form group *is* the value. The `xt-render` component reads each control's value and display name from the form group structure.

---

## Step 7: Wire it up in the router

In [`src/app/app.routes.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/basic/src/app/app.routes.ts):

```typescript
export const routes: Routes = [{
  path: '', component: BasicDisplay
}];
```

The app component renders `<router-outlet />` which loads `BasicDisplay` at the root path.

---

## Summary

| Concept | What ng-xtend does for you |
|---------|---------------------------|
| **No type info** | Introspects the object at runtime, renders each field with a default widget |
| **Same data, 3 views** | Swap `displayMode` to get a table (`LIST_VIEW`), a detail card (`FULL_VIEW`), or a form (`FULL_EDITABLE`) |
| **Nested objects** | Automatically recursed — the `bought` sub-object gets its own table/fields |
| **Editing** | `updateFormGroupWithValue` creates a matching form group; edits flow back automatically |

This is the simplest way to use ng-xtend. The next examples build on this foundation:

| Example | What it adds |
|---------|-------------|
| [Typed Example](typed.html) | Register a type descriptor so ng-xtend knows field names, types, and can create new objects |
| [Plugin Example](plugin.html) | Add country and currency plugins for richer field rendering |
| [In-Out Example](inout.html) | Connect list selection to an editor via inputs/outputs |
| [Store Example](store.html) | Persist data with xt-store via an API |
| [Advanced Type Example](advanced-type.html) | Handle relations (many-to-one, one-to-many) |
| [Dynamic Plugin Example](dynamic.html) | Load plugins at runtime from a remote server |

---

## Development server

```bash
ng serve basic
```

Open `http://localhost:4200/`. Try changing the `elementToDisplay` signal — add, remove, or rename fields. You'll see ng-xtend adapt the rendered output without any template changes.
