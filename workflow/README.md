# ![ng-xtend logo](public/logo.png) Workflow Example

This example shows how to develop a **new workflow component** and use it in an application. The workflow is a regular Angular component: it is imported, registered and rendered statically. It is **not** remotely loaded and does not use Native Federation.

The workflow is backed by **storage**: `xt-store` loads, adds and deletes `Example Book` entities through `XtApiStoreProvider`.

---

## Step 1: Add the workflow packages

Open [`package.json`](https://github.com/dont-code/ng-xtend-examples/blob/main/workflow/package.json). In addition to the usual ng-xtend packages, add:

```json
"dependencies": {
  "dc-workflow": "^1.5.0",
  "xt-store": "~1.5.0",
  "@ngrx/signals": "22.0.1"
}
```

`dc-workflow` provides `AbstractDcWorkflow`, `DcWorkflowModel` and `WfwRender`. `xt-store` provides the signal store and the storage providers.

Because the API provider performs HTTP requests, keep `provideHttpClient()` in [`src/app/app.config.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/workflow/src/app/app.config.ts).

---

## Step 2: Define the stored entity

[`src/custom-workflow/book.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/workflow/src/custom-workflow/book.ts) extends `ManagedData`, which adds the `_id` used by the store:

```typescript
import {ManagedData} from 'xt-type';

export type Book = ManagedData & {
  bookName: string;
  author: string;
  read: boolean;
};
```

The entity type is registered with `XtResolverService.registerTypes()` using the runtime name `Example Book`. That same name is the store collection and the `valueType` used by `<xt-render>`.

---

## Step 3: Write the workflow component

[`src/custom-workflow/book-cards-workflow.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/workflow/src/custom-workflow/book-cards-workflow.ts) extends `AbstractDcWorkflow<Book>` because it needs storage:

```typescript
@Component({
  selector: 'wfw-book-cards',
  imports: [XtRenderComponent, Card, Button],
  templateUrl: './book-cards-workflow.html',
  styleUrl: './book-cards-workflow.css'
})
export class BookCardsWorkflow extends AbstractDcWorkflow<Book> implements OnInit {

  override ngOnInit(): void {
    super.ngOnInit();
    this.fetchFromStore();
  }

  protected addSample(): void {
    this.safeFindStore().storeEntity({
      bookName: `Sample Book ${new Date().toISOString()}`,
      author: 'ng-xtend',
      read: false
    });
  }
}
```

The base class supplies everything a workflow needs:

| Member | Purpose |
|--------|---------|
| `config` | Required `DcWorkflowModel` input provided by `<wfw-render>` |
| `entityName` | `config.entity`, used as the store collection name |
| `search`, `searchedElements` | Inherited search box state and filtering |
| `updating` | Loading flag for async store operations |
| `safeFindStore()` | Returns the `XtSignalStore` for the configured entity |
| `fetchFromStore()` | Loads entities from the configured storage provider |

The template uses `xt-render` to display each stored book, so the workflow stays independent of the concrete field renderers.

Use `AbstractDcWorkflowBase` instead if a workflow does not need storage.

---

## Step 4: Register the workflow statically

[`src/custom-workflow/register.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/workflow/src/custom-workflow/register.ts) adds the component to the same registry used by the other ng-xtend plugins:

```typescript
export const BOOK_CARDS_WORKFLOW = 'book-cards';

export function registerBookCardsWorkflow(resolver: XtResolverService): boolean {
  resolver.registerPlugin({
    name: 'bookCardsWorkflowPlugin',
    workflows: [
      {
        name: 'wfwBookCards',
        class: BookCardsWorkflow,
        workflowsHandled: [BOOK_CARDS_WORKFLOW]
      }
    ]
  });
  return true;
}
```

This is a plain `registerPlugin(...)` call. There is no `registerPluginModule(...)`, no `remoteEntry.json`, no `exposes` map and no federation config.

Registration happens in the root [`src/app/app.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/workflow/src/app/app.ts) constructor, before the routed page creates `<wfw-render>`:

```typescript
registerDefaultPlugin(this.resolverService);
registerBookCardsWorkflow(this.resolverService);
```

---

## Step 5: Configure storage

The same root component configures the storage backend:

```typescript
this.apiProvider.apiUrl = 'https://test.dont-code.net/demo/data';
this.storeMgr.setDefaultStoreProvider(this.apiProvider);
```

`XtSignalStore` is created lazily by `AbstractDcWorkflow` when the workflow first needs it. `fetchEntities()`, `storeEntity()` and `deleteEntity()` then all go through the configured provider.

---

## Step 6: Render the workflow

[`src/workflow-display/workflow-display.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/workflow/src/workflow-display/workflow-display.ts) only declares a `DcWorkflowModel`:

```typescript
protected readonly workflowConfig: DcWorkflowModel = {
  entity: 'Example Book',
  workflow: BOOK_CARDS_WORKFLOW,
  data: {
    sort: {
      bookName: 'ascending'
    }
  }
};
```

The template renders it:

```html
<wfw-render [workflowConfig]="workflowConfig" />
```

`WfwRender` asks the registry for a workflow handling `'book-cards'` and creates `BookCardsWorkflow` with the config input. You can also bypass the registry with `[workflowType]="BookCardsWorkflow"` when explicit component selection is preferred.

---

## Summary

| Concept | What this example shows |
|---------|-------------------------|
| **Custom workflow** | Extend `AbstractDcWorkflow<T>` and provide your own template |
| **Static registration** | `resolver.registerPlugin({workflows: [...]})` with a statically imported class |
| **No remote loading** | No Native Federation, no `federation.config.js`, no remote manifest |
| **Storage** | `XtStoreManagerService` + `XtApiStoreProvider` + `XtSignalStore` |
| **Rendering** | `<wfw-render [workflowConfig]="config" />` resolves the registered workflow |
| **Field renderers** | `<xt-render>` inside the workflow displays each stored entity |
