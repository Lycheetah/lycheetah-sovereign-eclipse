# Data

Authoritative catalogs are **JS modules**, not JSON, because several objects are mutated after creation (`RACE_CATALOG` aliases, `MODULE_CATALOG` assigns).

| Truth | Path |
|---|---|
| Classes / banks | `src/ships/classes.js` |
| Races / pantheon | `src/ships/races.js` |
| 252 hulls | `src/ships/catalog.js` |
| Weapons | `src/ships/weapons.js` |
| Modules | `src/ships/modules.js` |
| Research | `src/progression/research.js` |
| Materials / drones / industry | `src/progression/materials.js` |
| Destinations / contracts / Micro-ZJ | `src/world/destinations.js` |

Do not invent a second JSON copy. Generate JSON later from these modules if a tool needs it.
