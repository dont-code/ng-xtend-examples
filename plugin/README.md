# ![ng-xtend logo](public/logo.png) Plugin Example

This example shows how **plugins** transparently enhance the rendering of specific data types. By adding international and finance plugins, the `country` and `money-amount` fields automatically get rich dropdowns and formatted displays — all without changing the display component.

---

## Step 1: Add plugin dependencies

Open [`package.json`](https://github.com/dont-code/ng-xtend-examples/blob/main/plugin/package.json) and add:

```json
"dependencies": {
  "xt-plugin-intl": "~0.6.4",
  "countries-ts": "~2.1.0",
  "xt-plugin-finance": "~0.6.4"
}
```

| Package | Provides |
|---------|----------|
| `xt-plugin-intl` | A plugin that renders `country` fields with a flag+name dropdown |
| `countries-ts` | Country data used by the intl plugin |
| `xt-plugin-finance` | A plugin that renders `money-amount` fields with currency symbol, formatted number, and a currency selector |

---

## Step 2: Register the plugins

In [`src/app/app.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/plugin/src/app/app.ts), import and register them alongside the default plugin:

```typescript
import {registerInternationalPlugin} from 'xt-plugin-intl';
import {registerFinancePlugin} from 'xt-plugin-finance';

registerDefaultPlugin(this.resolverService);
registerInternationalPlugin(this.resolverService);
registerFinancePlugin(this.resolverService);
```

**Why is registration all you need?** Each plugin calls `resolverService.register(...)` internally, telling the resolver: *"I know how to render type X in mode Y."* The international plugin registers a component for `'country'`. The finance plugin registers a component for `'money-amount'`. From that point on, whenever `<xt-render>` encounters a field with one of these type names, it automatically picks the plugin's component — no imports, no conditionals, no changes to your templates.

---

## Step 3: Refine the type descriptor

Still in [`src/app/app.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/plugin/src/app/app.ts), update the type registration to use the new type names:

```typescript
this.resolverService.registerTypes({
  buyType: {
    on: 'date',
    at: 'string',
    price: 'money-amount'    // Was 'number', now handled by finance plugin
  },
  bookType: {
    bookName: 'string',
    author: 'string',
    nationality: 'country',  // Was 'string', now handled by intl plugin
    bought: 'buyType',
    read: 'boolean'
  }
});
```

The only change is swapping two type strings:
- `nationality: 'string'` → `nationality: 'country'`
- `price: 'number'` → `price: 'money-amount'`

**Why does this work seamlessly?** The display component ([`src/plugin-display/plugin-display.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/plugin/src/plugin-display/plugin-display.ts) and [`.html`](https://github.com/dont-code/ng-xtend-examples/blob/main/plugin/src/plugin-display/plugin-display.html)) is identical to the typed example. It still uses `<xt-render displayMode="FULL_EDITABLE" valueType="bookType">`. The resolver looks up each field's type, finds `'country'` and `'money-amount'`, and delegates to the matching plugin component. The country field becomes a searchable dropdown of all countries. The price field gains a currency prefix and formatted decimals.

---

## Summary

| Concept | What changes |
|---------|-------------|
| **Plugin registration** | Additional `register*Plugin` calls in `App` constructor |
| **Type refinement** | Swap generic types (`'string'`, `'number'`) for domain-specific ones (`'country'`, `'money-amount'`) |
| **Transparent enhancement** | No template changes — plugins are resolved automatically |
| **Separation of concerns** | Domain logic (country lists, currency formatting) lives in plugins, not in the application |

### What's next?

| Example | What it adds |
|---------|-------------|
| [In-Out Example](inout.html) | Connect list selection to the editor — clicking a book in the list fills the edit form |
| [Store Example](store.html) | Persist books via an API using `xt-store` |
| [Advanced Type Example](advanced-type.html) | Reference authors from books with a MANY-TO-ONE relation |
| [Dynamic Plugin Example](dynamic.html) | Load plugins at runtime from a remote server instead of bundling them |
