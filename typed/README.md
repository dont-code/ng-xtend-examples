# ![ng-xtend logo](public/logo.png) Typed Example

This example builds on the [basic example](basic.html) by introducing ng-xtend's **type system**. Instead of letting the framework guess the shape of your data at runtime, you describe it explicitly — which unlocks better rendering, validation, and the ability to create new objects.

---

## Step 1: Register a type descriptor

In [`src/app/app.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/typed/src/app/app.ts), call `resolverService.registerTypes` with a type map:

```typescript
this.resolverService.registerTypes({
  buyType: {
    on: 'date',
    at: 'string',
    price: 'number'
  },
  bookType: {
    bookName: 'string',
    author: 'string',
    nationality: 'string',
    bought: 'buyType',
    read: 'boolean'
  }
});
```

Each key is a type name (`bookType`, `buyType`). Each value maps field names to their types — either a primitive (`'string'`, `'number'`, `'boolean'`, `'date'`) or another registered type (`'buyType'`).

**Why register types?** Without type info, `<xt-render>` can only display existing values. With a type descriptor, it knows:
- **What fields exist** — even on an empty object
- **What widget to use** — dates get a date picker, booleans a toggle, numbers a numeric input
- **The field order** — fields render in the order you declare them, not the arbitrary order of `Object.keys`

---

## Step 2: Bind `valueType` to `<xt-render>`

In the template ([`src/typed-display/typed-display.html`](https://github.com/dont-code/ng-xtend-examples/blob/main/typed/src/typed-display/typed-display.html)), pass `valueType="bookType"`:

```html
<xt-render displayMode="FULL_EDITABLE" valueType="bookType" [formGroup]="bookForm"> </xt-render>
<xt-render displayMode="LIST_VIEW" valueType="bookType" [value]="elementsToDisplay()"> </xt-render>
```

**Why `valueType`?** It tells the resolver *"treat this data as `bookType`"*. Fields are rendered in declaration order. Nested types are resolved automatically — `bought: 'buyType'` will render the sub-fields `on`, `at`, `price` using their own declared types.

---

## Step 3: Create new objects

With a type registered, you can create an empty object conforming to that type:

```typescript
// In the component class
updateFormGroupWithValue(this.bookForm, {}, 'bookType', this.resolver.typeResolver);
```

Passing an empty object `{}` together with `'bookType'` lets `updateFormGroupWithValue` know the intended shape: it will create form controls for every field declared in the type, even though the source value is empty.

The template provides a create form with submit/reset buttons:

```html
<form [formGroup]="bookForm" (ngSubmit)="createBook()">
  <xt-render displayMode="FULL_EDITABLE" valueType="bookType" [formGroup]="bookForm"> </xt-render>
  <p-button label="Create" type="submit" />
  <p-button label="Reset" (onClick)="cancelBook()" />
</form>
```

Each created book is appended to a list rendered below the form.

**Why is this new?** In the basic example, you could only display and edit a *hardcoded* object. Here, because the type is known, you can create arbitrarily many books from scratch — the form is generated from the type, not from a pre-existing value.

---

## Summary

| Concept | What changes |
|---------|-------------|
| **Type registration** | Declare field names, types, and nesting via `registerTypes` |
| **`valueType` input** | Tell `<xt-render>` which type descriptor to use |
| **Empty object creation** | `updateFormGroupWithValue` with `{}` builds a full form from the type |
| **No introspection** | The resolver no longer needs to guess — it reads the type descriptor instead |

### What's next?

| Example | What it adds |
|---------|-------------|
| [Plugin Example](plugin.html) | Register country/currency plugins that make `country` and `money-amount` fields render with rich dropdowns and formatted displays |
| [In-Out Example](inout.html) | Connect the list selection to the editor via `(outputs)` — clicking a book fills the form |
| [Store Example](store.html) | Persist books via an API using `xt-store` |
| [Advanced Type Example](advanced-type.html) | Reference authors from books with a MANY-TO-ONE relation |
| [Dynamic Plugin Example](dynamic.html) | Load plugins at runtime from a remote server instead of bundling them |
