# ![ng-xtend logo](public/logo.png) Dynamic Plugin Example

This example shows how to **load plugins at runtime** from a remote server using [Native Federation](https://github.com/angular-architects/module-federation-plugin/tree/main/libs/native-federation). Instead of bundling `xt-plugin-intl` and `xt-plugin-finance` with the application, they are fetched from a remote URL on startup.

---

## Step 1: Remove static plugin dependencies

Open [`package.json`](https://github.com/dont-code/ng-xtend-examples/blob/main/dynamic/package.json) and compare with the [store example](store.html) — the `xt-plugin-intl`, `xt-plugin-finance`, and `world-countries` packages are **not** listed here. They will be loaded dynamically instead.

The dynamic example adds:

```json
"dependencies": {
  "@softarc/native-federation-runtime": "^3.5.6",
  "es-module-shims": "^2.8.0"
},
"devDependencies": {
  "@angular-architects/native-federation": "22.2.5",
  "@softarc/native-federation": "^4.10.0",
  "@softarc/native-federation-orchestrator": "^4.10.0"
}
```

These packages enable Module Federation at the application level, allowing the Angular build to import remote modules that were not present at compile time.

---

## Step 2: Configure Native Federation

[`federation.config.js`](https://github.com/dont-code/ng-xtend-examples/blob/main/dynamic/federation.config.js) tells the build system which libraries to share between the host and remote plugins:

```javascript
const { withNativeFederation, fromPackageJson } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'dynamic-example',
  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto' })
    .patch(['@angular/animations', '@angular/common', '@angular/core', '@angular/forms', '@angular/platform-browser', '@angular/router', '@openng/optimus-ui'], { includeSecondaries: { keepAll: true } }),
  features: {
    ignoreUnusedDeps: true,
    denseExternals: true
  },
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    /^@openng\/optimus-ui-/,
    'chart.js/auto',
    '@openng/optimus-ui/chart',
    '@openng/optimus-ui/editor',
    'primeicons'
  ]
});
```

`fromPackageJson(...).patch(...)` shares the declared runtime dependencies as **singletons** — the host and plugins share the same Angular, ng-xtend, and Optimus UI instances rather than each bundling their own copy. `denseExternals` keeps the generated import map compact. This is required for plugins to seamlessly integrate into the host's rendering pipeline.

---

## Step 3: Use `bootstrap.ts` for async initialisation

Native Federation requires asynchronous bootstrapping because the remote plugin manifests must be fetched before Angular starts. The flow in [`src/main.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/dynamic/src/main.ts):

```typescript
import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
```

`initFederation()` fetches the remote federation manifests, then `bootstrap.ts` kicks off the regular Angular bootstrapping. This is the **only** structural change required — the rest of the application code is identical to the store example.

---

## Step 4: Load plugins dynamically

In [`src/app/app.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/dynamic/src/app/app.ts), the default plugin is still registered statically (primitives must always be available), but the international and finance plugins are loaded at runtime:

```typescript
import {ConfigManagerService} from '../config-manager/config-manager.service';

export class App {
  protected readonly configService = inject(ConfigManagerService);

  constructor() {
    registerDefaultPlugin(this.resolverService);

    this.configService.loadConfig(
      [{
        plugin: 'International Plugin',
        url: 'https://test.dont-code.net/apps/latest/intl-plugin/remoteEntry.json'
      }, {
        plugin: 'Finance Plugin',
        url: 'https://test.dont-code.net/apps/latest/finance-plugin/remoteEntry.json'
      }],
      {
        buyType: { on: 'date', at: 'string', price: 'money-amount' },
        'Example Book': {
          bookName: 'string', author: 'string',
          nationality: 'country', bought: 'buyType', read: 'boolean'
        }
      }
    );
  }
}
```

**Why a `ConfigManagerService`?** The [`ConfigManagerService`](https://github.com/dont-code/ng-xtend-examples/blob/main/dynamic/src/config-manager/config-manager.service.ts) orchestrates loading order — plugins must be registered *before* types are declared, because type registration references plugin-provided type names like `'country'` and `'money-amount'`. If types were registered first, the resolver would fail to find components for those types.

```typescript
// Inside ConfigManagerService
loadConfig(pluginConfig, types) {
  this.loadPlugins(pluginConfig).then(() => {
    this.resolverService.registerTypes(types);
    this.configLoaded.set(true);
  }).catch((err) => {
    this.errorMsg.set(err.toString());
  });
}
```

---

## Step 5: Handle loading state in the template

Since plugins arrive asynchronously, the template ([`src/dynamic-display/dynamic-display.html`](https://github.com/dont-code/ng-xtend-examples/blob/main/dynamic/src/dynamic-display/dynamic-display.html)) has three states:

```html
@if (config.configLoaded()) {
  <!-- Plugins loaded — render normally -->
  <xt-render displayMode="LIST_VIEW" valueType="Example Book" ...>
} @else if (config.errorMsg() != null) {
  <!-- Plugin loading failed -->
  <h2>Error loading plugins</h2>
  <span>{{config.errorMsg()}}</span>
} @else {
  <!-- Still loading -->
  <h2>Loading plugins...</h2>
}
```

The `DynamicDisplay` component also uses `linkedSignal` for the form, so it only builds the form group once `configLoaded` is true.

---

## Summary

| Concept | What changes |
|---------|-------------|
| **Native Federation** | Enables loading Angular modules (plugins) from remote URLs at runtime |
| **`federation.config.js`** | Declares shared singleton dependencies between host and plugins |
| **`initFederation()` + `bootstrap.ts`** | Async bootstrap required before Angular can start |
| **`ConfigManagerService`** | Orchestrates plugin loading → type registration → UI readiness |
| **Loading/error states** | Template handles the async lifecycle — loading, ready, or error |
| **Plugin independence** | Remote plugins can be updated and deployed without rebuilding the host application |
