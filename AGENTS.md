# Repository Memory

## ng-xtend-examples Repository

- **Path:** `/home/papou/devs/ng-xtend-examples`
- **Purpose:** Contains example projects demonstrating ng-xtend framework functionalities
- **ng-xtend source code:** Located in `../ng-xtend`
- **Current ng-xtend version:** 1.5.0 published / 1.5.1-next in source (Angular 22 + Optimus UI, upgraded November 21, 2026)

## Example Projects

| Directory | Description |
|-----------|-------------|
| `basic/` | Basic rendering with no type info (xt-components, xt-type, xt-plugin-default) |
| `typed/` | Type descriptors for better control |
| `plugin/` | Country and currency plugins (xt-plugin-intl, xt-plugin-finance) |
| `inout/` | List selection connected to editor via inputs/outputs |
| `store/` | Persistent storage with xt-store via REST API |
| `advanced-type/` | Relations (many-to-one, one-to-many) with stores |
| `dynamic/` | Dynamic plugin loading at runtime from remote server |

## Package Versions (Angular 22 / Optimus UI)

| Package | Version | Prefix |
|---------|---------|--------|
| `@angular/*` | 22.2.6 | pinned |
| `@angular/build`, `@angular/cli` | 22.2.7 | pinned |
| `@angular/cdk` | 22.2.7 | pinned |
| `typescript` | 6.0.3 | pinned (Angular 22 requires >=6.0 <6.1) |
| `@openng/optimus-ui` | 2.0.2 | pinned |
| `@openng/optimus-ui-themes` | 2.0.2 | pinned |
| `primeicons` | 7.0.0 | pinned |
| `xt-components` | 1.5.0 | `^` |
| `xt-type` | 0.13.0 | `^` |
| `xt-plugin-default` | 1.5.0 | `^` |
| `xt-plugin-intl` | 1.5.0 | `~` |
| `xt-plugin-finance` | 1.5.0 | `~` |
| `xt-store` | 1.5.0 | mixed (`^` in dynamic, `~` in store/advanced-type) |
| `world-countries` | 5.0.0 | pinned (needed by `xt-plugin-intl` 1.5.0) |

## Build/Test

- Build: `ng build <project-name>` (or `rush build`)
- Test: `ng test <project-name>`
- Serve: `ng serve <project-name>`

## Notes

- PrimeNG was replaced by `@openng/optimus-ui`; imports now use `@openng/optimus-ui/*` and `@openng/optimus-ui-themes/aura`.
- `providePrimeNG` was replaced by `provideOptimus` from `@openng/optimus-ui/config`.
- `provideAnimations` was replaced by `provideAnimationsAsync` from `@angular/platform-browser/animations/async`.
- Native Federation configs now use `fromPackageJson(...).patch(...)` with `denseExternals: true`.
- Production bundle budgets were raised to 2 MB warning / 3 MB error for the larger Optimus UI bundles.
- Stale per-project `package-lock.json` files were removed; Rush/pnpm lockfiles under `common/config` are authoritative.
- README files in basic/, plugin/, store/, and dynamic/ were updated with the new versions and skip list.
