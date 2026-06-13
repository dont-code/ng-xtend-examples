# ![ng-xtend logo](public/logo.png) Advanced Type Example

This example shows how ng-xtend handles **relationships between types** — specifically a MANY-TO-ONE reference from books to authors. When editing a book, the author field becomes a dropdown populated from a separate author list.

---

## Step 1: Define TypeScript types for clarity

In [`src/model/types.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/advanced-type/src/model/types.ts), define interfaces that mirror your ng-xtend type descriptors:

```typescript
import {ManagedData} from 'xt-type';

export type Book = ManagedData & {
  bookName: string;
  author?: Author;
  nationality?: string;
  bought?: Buy;
  read?: boolean;
};

export type Author = ManagedData & {
  name: string;
  born?: Date;
  nationality?: string;
};

export type Buy = ManagedData & {
  on: Date;
  at: string;
  price: number;
};
```

**Why TypeScript types?** They give you editor autocompletion and compile-time safety when accessing entity properties in your component. They don't affect ng-xtend's runtime behaviour — the framework still reads the registered type descriptors — but they make the developer experience much smoother.

---

## Step 2: Register types with a relationship

In [`src/app/app.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/advanced-type/src/app/app.ts), register both types and declare the reference:

```typescript
this.resolverService.registerTypes({
  'Example Author': {
    displayTemplate: '<%=it.name%> <%if (it.born!=null) {%>(<%=it.born.getFullYear()%>)<%}%>',
    children: {
      name: 'string',
      born: 'date',
      nationality: 'country',
    }
  },
  'Example Book': {
    children: {
      bookName: 'string',
      author: {
        toType: 'Example Author',
        field: 'name',
        referenceType: 'MANY-TO-ONE'
      },
      nationality: 'country',
      bought: 'buyType',
      read: 'boolean'
    }
  }
});

this.resolverService.resolvePendingReferences();
```

**Key new concepts:**

| Setting | Purpose |
|---------|---------|
| `displayTemplate` | A template string that controls how each author appears in the dropdown. `<%=it.name%>` renders the author's name; the birth year is shown in parentheses. |
| `children` | Wraps the field map. Both types use this syntax here, but it is optional for flat types (you can also pass fields directly). |
| `toType`, `field`, `referenceType` | Defines a **MANY-TO-ONE** relationship: the `author` field in `Example Book` points to an entity of type `Example Author`, displayed by its `name` field. |
| `resolvePendingReferences()` | Must be called after all types are registered so that cross-type references (book → author) are wired up correctly. |

**Why `displayTemplate`?** Without it, the author dropdown would show `[object Object]`. The template tells ng-xtend how to produce a human-readable label for each author entity.

**Why `resolvePendingReferences`?** Type A (book) references type B (author) which may not be fully registered at the moment A is registered. Calling `resolvePendingReferences` finalises all cross-type links.

---

## Step 3: Manage two stores

In [`src/advanced-type-display/advanced-type-display.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/advanced-type/src/advanced-type-display/advanced-type-display.ts), create separate stores for authors and books:

```typescript
this.authorStore = this.storeMgr.getStoreFor("Example Author", this.resolver.typeResolver);
this.bookStore = this.storeMgr.getStoreFor("Example Book", this.resolver.typeResolver);
```

Both stores are loaded on init:

```typescript
async initStores(): Promise<void> {
  await this.authorStore?.fetchEntities();
  await this.bookStore?.fetchEntities();
}
```

---

## Step 4: Render author list and book list side by side

The template ([`src/advanced-type-display/advanced-type-display.html`](https://github.com/dont-code/ng-xtend-examples/blob/main/advanced-type/src/advanced-type-display/advanced-type-display.html)) renders two independent sections:

```html
<!-- Authors section -->
<xt-render displayMode="LIST_VIEW" valueType="Example Author"
           [value]="authorStore?.entities()"
           (outputs)="authorOutputChanged($event)">
</xt-render>

<!-- Author edit form -->
<xt-render displayMode="FULL_EDITABLE" valueType="Example Author"
           [formGroup]="authorForm()"> </xt-render>

<!-- Books section -->
<xt-render displayMode="LIST_VIEW" valueType="Example Book"
           [value]="bookStore?.entities()"
           (outputs)="bookOutputChanged($event)">
</xt-render>

<!-- Book edit form -->
<xt-render displayMode="FULL_EDITABLE" valueType="Example Book"
           [formGroup]="bookForm()"> </xt-render>
```

Each section has its own list, selection handler, and edit form — all driven by the same `<xt-render>` component, just with different `valueType` values.

When editing a book's `author` field, ng-xtend sees the MANY-TO-ONE reference, queries the author store for all available authors, and renders a dropdown. Selecting an author assigns the full author entity to the book's `author` field.

---

## Summary

| Concept | What changes |
|---------|-------------|
| **TypeScript model types** | Optional but recommended for autocompletion and safety |
| **`displayTemplate`** | Controls how referenced entities are displayed in dropdowns |
| **MANY-TO-ONE reference** | `{toType, field, referenceType}` declares a cross-type relationship |
| **`resolvePendingReferences`** | Finalises cross-type links after all types are registered |
| **Multiple stores** | One store per entity type, loaded independently |
| **Shared author pool** | All books reference the same author entities — update an author and every book referencing them sees the change |

### What's next?

| Example | What it adds |
|---------|-------------|
| [Dynamic Plugin Example](dynamic.html) | Load plugins at runtime from a remote server instead of bundling them |
