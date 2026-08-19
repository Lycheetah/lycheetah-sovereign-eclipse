# Phase board

Law: `STONE.md`. Knife order: `BUILD_PATH.md`.

| Cut | Work | Status |
|---|---|---|
| A | Data as JS modules | **DONE** — classes, races, catalog (252), weapons, modules, research, materials |
| B | `core/save.js` | **DONE** — key, defaults, load, persist |
| C | `core/app-mode.js` | STILL IN `main.js` (one-controller cluster, unmoved) |
| D | camera + input | STILL IN `main.js` (protected, unmoved) |
| E | combat math | **PARTIAL** — tables extracted (`capacitor`, `damage`, `enemies`). Live functions still in `main.js` |
| F | UI screens | STILL IN `main.js` |
| G | zone modules | **DONE** — all 9 Micro-ZJ worlds from 0.27.5.2 live in zone files |
| H | zone registry | **DONE** — 9 war worlds + 4 sectors. Unknown id throws |
| I | browser parity vs gold master | **UNVERIFIED** |
| J | single-file release build | **DONE** — `node build.js` → `dist/sovereign-eclipse.html` |

## MEASURED after extract

- `FRAME_CATALOG` keys = **252** (14 × 18)
- 14 pantheon entries, 11 turrets, 31 modules, 7 materials, 6 drone wings
- `node --check` clean on every JS module including `main.js`
- HTTP 200 on shell + modules

## What an agent can now edit without touching combat

- `src/zones/naraka/aether-crucible.js`
- `src/zones/erebos/black-sun-march.js`
- `src/zones/deep-current/grave-choir.js`
- `src/ships/races.js` / `classes.js` / `weapons.js` / `modules.js`
- `src/progression/research.js` / `materials.js`
- `src/world/destinations.js` / `zone-registry.js`

Camera, undock, UI authority, and `applyDamage` remain in `src/main.js` until Cuts C–E finish.
