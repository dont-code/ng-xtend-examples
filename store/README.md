# ![ng-xtend logo](public/logo.png) Store Example

This example replaces the in-memory array from the [inout example](inout.html) with **persistent storage** via `xt-store`. Data is loaded from and saved to a REST API, survives page reloads, and synchronises seamlessly with the rendered list.

---

## Step 1: Add xt-store dependencies

Open [`package.json`](https://github.com/dont-code/ng-xtend-examples/blob/main/store/package.json) and add:

```json
"dependencies": {
  "xt-store": "~0.6.4",
  "@ngrx/signals": "^20.1.0"
}
```

`xt-store` provides `XtSignalStore` (a reactive store backed by signals), `XtStoreManagerService`, and `XtApiStoreProvider`. `@ngrx/signals` is the signal-based state management foundation that `XtSignalStore` builds on.

Also add `provideHttpClient()` to [`src/app/app.config.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/store/src/app/app.config.ts):

```typescript
import {provideHttpClient} from '@angular/common/http';
// ...
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // ... other providers
  ]
};
```

---

## Step 2: Configure the API provider

In [`src/app/app.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/store/src/app/app.ts), inject the store services and configure the API endpoint:

```typescript
import {XtApiStoreProvider, XtStoreManagerService} from 'xt-store';

export class App {
  protected readonly storeMgr = inject(XtStoreManagerService);
  protected readonly apiProvider = inject(XtApiStoreProvider);

  constructor() {
    // ... register plugins ...

    this.apiProvider.apiUrl = 'https://test.dont-code.net/demo/data';
    this.storeMgr.setDefaultStoreProvider(this.apiProvider);
  }
}
```

**Why two services?** `XtStoreManagerService` is the registry that hands back a store for a given type name. `XtApiStoreProvider` is the actual storage backend that talks to the REST API. Separating them lets you swap backends (memory, local storage, custom API) without changing the rest of your code.

Also note that the book type is now registered with a display-friendly name `'Example Book'` instead of `'bookType'`. This name is used as the entity collection name on the API.

---

## Step 3: Use `XtSignalStore` in the component

In [`src/store-display/store-display.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/store/src/store-display/store-display.ts):

```typescript
import {XtSignalStore, XtStoreManagerService} from 'xt-store';

export class StoreDisplay implements OnInit, AfterViewInit {
  storeMgr = inject(XtStoreManagerService);
  store: XtSignalStore<ManagedData> | null = null;

  elementsToDisplay = computed(() => this.store?.entities() ?? []);

  ngOnInit(): void {
    this.store = this.storeMgr.getStoreFor("Example Book");
    this.updateBookForm();
  }

  ngAfterViewInit(): void {
    this.store!.fetchEntities().catch((error) => {
      this.errorHandler.errorOccurred(error, "Error loading Example Books ");
    });
  }
}
```

**Key differences from the inout example:**

| In-memory (inout) | Store (this example) |
|---|---|
| `elementsToDisplay = signal<any[]>([])` | `elementsToDisplay = computed(() => this.store?.entities() ?? [])` |
| Manual push to array | Data loaded from API via `store.fetchEntities()` |
| Create/save only updates local array | `store.storeEntity()` sends data to the API |
| No reload button | Reload button calls `store.fetchEntities()` again |

`getStoreFor("Example Book")` returns an `XtSignalStore` that manages CRUD operations for the `Example Book` entity collection. The store's `.entities()` signal is always up-to-date after any operation.

---

## Step 4: Save through the API

Saving now goes through the store:

```typescript
protected saveBook() {
  this.selectedEntity.set(this.bookForm().value);
  this.store?.storeEntity(this.bookForm().value).then((saved) => {
    if (saved?._id != null) {
      this.selectedEntityID = saved._id;
    }
  }).catch((error) => {
    this.errorHandler.errorOccurred(error, "Error saving Example Book ");
  });
}
```

`storeEntity` creates or updates depending on whether the entity already has an `_id`. It returns a promise with the saved entity (including the server-assigned `_id`). The store's internal entities list is automatically refreshed after the save.

---

## Summary

| Concept | What changes |
|---------|-------------|
| **`xt-store`** | Adds a reactive store layer over a REST API |
| **`XtSignalStore`** | Signal-based CRUD store with `entities()`, `fetchEntities()`, `storeEntity()` |
| **`provideHttpClient`** | Required for HTTP communication with the API |
| **`apiUrl` configuration** | Point the provider at your backend endpoint |
| **Entity naming** | Type names like `'Example Book'` double as collection names on the API |

### What's next?

| Example | What it adds |
|---------|-------------|
| [Advanced Type Example](advanced-type.html) | Reference authors from books with a MANY-TO-ONE relation — two stores, one form referencing the other |
| [Dynamic Plugin Example](dynamic.html) | Load plugins at runtime from a remote server instead of bundling them |
