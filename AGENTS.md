# Repository Memory

## ng-xtend-examples Repository

- **Path:** `/home/gc-garunda/devs/dont-code/github/ng-xtend-examples`
- **Purpose:** Contains example projects demonstrating ng-xtend framework functionalities
- **ng-xtend source code:** Located in `../ng-xtend`
- **Current ng-xtend version:** 0.8.0 (updated July 19, 2026)

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

## Package Versions (as of 0.8.0)

| Package | Version | Prefix |
|---------|---------|--------|
| `xt-components` | 0.8.0 | `^` |
| `xt-type` | 0.11.0 | `^` |
| `xt-plugin-default` | 0.8.0 | `^` |
| `xt-plugin-intl` | 0.8.0 | `~` |
| `xt-plugin-finance` | 0.8.0 | `~` |
| `xt-store` | 0.8.0 | mixed (`^` in dynamic, `~` in store/advanced-type) |
| `countries-ts` | 2.1.0 | `~` |

## Build/Test

- Build: `ng build <project-name>`
- Test: `ng test <project-name>`
- Serve: `ng serve <project-name>`

## Notes

- All package.json files were updated to 0.8.0 on July 19, 2026
- README files in basic/, plugin/, store/ were also updated with correct version strings
