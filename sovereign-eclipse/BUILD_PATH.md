# BUILD PATH — what Mac set, and how Grok actually cuts it

**Date:** 2026-08-19  
**Law:** `STONE.md` (unchanged)  
**This file:** executable cut order. Not a second constitution.

I do not need more documents. The gold master, the audit, the stone, and the 0.27.5 runtime are enough to build.

---

## 1. The plan you set (still the destination)

From your brief + the architecture you locked:

```
One shell + one shared engine + zone modules.
Never a complete HTML game per zone.
Zero feature change until parity.
Keep the monolith forever as gold master.
```

After parity:

```
Mac resumes Fleet Fitting
  → zone registry
    → 20 destinations
      → station network
        → Black Sun March (distinct mechanics)
          → Grave Choir (distinct mechanics)
```

Folder shape you named is already scaffolded under `/home/guestpc/sovereign-eclipse/`.

That destination is correct. I would not replace it.

---

## 2. The one change I would make to the *cut order*

Your original modularisation phases were:

1. static content (CSS, catalogs, research, materials)
2. isolated systems (capacitor, damage, analytics)
3. authorities (input, save, app-mode, loop)
4. worlds
5. zone registry
6. parity

**Phase 2 before Phase 3 will fight this file.**

In 0.27.5, capacitor / damage / fitting are **not isolated**. They close over `player`, `settings`, `FRAME_CATALOG`, `MODULE_CATALOG`, DOM ids, and the combat camera clock. If I yank `applyDamage` into `combat/damage.js` first, I either:

- smuggle a dozen globals (fake module), or
- rewrite call signatures (feature-adjacent, high break risk).

Authorities are the *actually* isolated clusters:

| Cluster | Why it can move first |
|---|---|
| CSS | already moved, cascade preserved |
| Pure data objects | no functions, mutations are `Object.assign` on the same reference |
| `settings` + `saveSettings` + save-key chain | one object, one writer |
| `setAppMode` / `applyUIAuthority` / `navigateMenu` | already a one-controller island |
| camera | already a closed orbit model; move the functions, pass `{player, camera, combatCamera}` |

So the build path I would run is your plan with **2 and 3 swapped**, and JSON delayed until the objects are no longer mutated in JS.

```
YOUR DESTINATION
     ▲
     │
MY CUT ORDER ──►  data JS  →  state/save  →  app-mode  →  camera/input
                    →  combat math  →  UI screens  →  zones  →  registry  →  parity
```

Stone goals stay. Only the knife order changes.

---

## 3. What is already true on disk

| Item | Path | Status |
|---|---|---|
| Stone | `STONE.md` | ACTIVE |
| Gold master | `archive/forge275_monolith_last_known_good.html` | SHA = Downloads 0.27.5 |
| CSS split | `styles/{base,hud,screens,station,forge}.css` | byte-identical, wired |
| Runtime | `src/main.js` | still the whole game |
| 0.27.6 fitting | Downloads, parked | do not merge |
| Catalogs as files | — | not cut yet (one truth still in `main.js`) |
| Browser parity | — | UNVERIFIED |

---

## 4. The cuts, in the order I would fire them

Each cut is: **move → import → boot → one named check → stop.**  
If the check fails, revert the cut. Do not stack cuts.

### Cut A — data as JS modules (finish Phase 1)

Not JSON yet. These objects get aliased / `Object.assign`'d after creation. JSON would freeze the wrong snapshot.

| File | Pulls from `main.js` |
|---|---|
| `src/ships/classes.js` | `CLASS_CATALOG`, `CLASS_ORDER`, `BANK_IDS`, `BANKS_BY_COUNT` |
| `src/ships/races.js` | `RACE_CATALOG`, `RACE_ORDER`, `LEGACY_RACE_ALIASES`, `PANTHEON_CODEX` |
| `src/ships/catalog.js` | `createFleetCatalog`, `FRAME_CATALOG`, price/tier tables |
| `src/ships/weapons.js` | `TURRET_CATALOG` |
| `src/ships/modules.js` | `MODULE_CATALOG` + the two `Object.assign` blocks |
| `src/progression/research.js` | `RESEARCH_PROJECTS` + gate helpers that only read those tables |
| `src/progression/materials.js` | `MATERIAL_CATALOG`, `INDUSTRY_RECIPES`, `DRONE_CATALOG` |

**Check:** hangar still lists 252, Codex still has 14 gods, research grid still renders.

`data/*.json` is generated *from* these modules later, or written when we stop mutating them. Not first.

### Cut B — state + save (`src/core/state.js`, `src/core/save.js`)

Move `GAME_SAVE_KEY`, `defaultSettings`, the 60-key migrate chain, `settings`, `saveSettings`.  
Same merge rules. Same gift-unions. No schema version yet (that is a feature).

**Check:** refresh keeps salvage, owned hulls, selected ship.

### Cut C — app-mode (`src/core/app-mode.js`)

Move `setScreen`, `applyUIAuthority`, `setAppMode`, `navigateMenu`, `MENU_MODES`.  
One owner stays one owner.

**Check:** main → station → hangar → undock → HUD appears, menu gone. Dock returns to station, HUD gone.

### Cut D — camera + input (`src/core/camera.js`, `src/core/input.js`)

Move only. Bindings stay W/S A/D R/F Q/E Space, LMB orbit/click-fire, wheel, MMB, C, RMB inert.

**Check:** fly a starter, orbit, fire, reset behind ship. Compare feel to gold master in the same session.

### Cut E — combat math (`src/combat/*`)

Now legal, because they can take `{player, settings, frame}` instead of pretending they were isolated.

- `capacitor.js`
- `damage.js`
- `weapons.js` / projectiles / targeting
- `modules.js` (runtime + analytics)
- `drones.js`
- `damage-control.js`

**Check:** shoot a shield, breach a plate, cap dries on boost+guns, wreck salvage still scales with intact systems.

### Cut F — UI screens (`src/ui/*`)

Hangar, hardpoints, modules, station, research, HUD. DOM stays in `index.html`. These files only render.

**Check:** no HUD leak on menu. Station scroll still works. Codex scroll still works.

### Cut G — worlds (`src/zones/**`, `src/world/world-manager.js`)

This is the payoff. Existing functions already look like modules:

- `buildAetherCrucibleWorld`
- `buildBlackSunMarchWorld`
- `buildGraveChoirWorld`
- Naraka base world construction

Wrap each as `{ id, region, build, update, cleanup }`. Engine calls `zoneManager.load(id)`.  
No new destinations. No new mechanics. Same four sectors + three Micro-ZJ pockets.

**Check:** Aether five-site route still advances. Black Sun / Grave Choir still load. Portal Naraka ↔ Erebos ↔ Aion ↔ Chaos still works.

### Cut H — zone registry (`src/world/zone-registry.js`)

Register **what already exists**. Twenty *names* may appear as data, but only the live nodes are loadable. Do not author the missing sixteen as empty arenas.

**Check:** loading an unknown id fails visibly. Loading `aether_crucible` matches gold master.

### Cut I — parity (Phase 6)

Hostile comparison vs gold master, same machine, same save:

boot · main · station · undock · camera · flight · combat · fitting · capacitor · anatomy · research · manufacture · Aether · save/load

Only then:

- `FLEET_FITTING_ARCHITECTURE.md` may be implemented
- 20-destination atlas may become real nodes
- stations may grow service flags
- Black Sun / Grave Choir may become distinct campaigns

---

## 5. What I would not do, even though I can

- Finish 0.27.6 envelopes inside the monolith. Parked for a reason.
- Hand-author 252 hull files.
- Write `black-sun-march.js` as a new campaign while the engine is still `main.js`.
- Convert catalogs to JSON on day one.
- Start a second Three.js bootstrap in any zone file.
- “Clean up” camera, undock, or UI authority while moving them.
- Delete the gold master after parity. Archive stays.

---

## 6. Cadence

One cut per session if the session is tired. Two cuts if A+B (data + save) land clean. Never C+D+E in one sitting — that is how we lose the cause of a break.

Every cut ends with: paths changed, check named, gold master untouched, no leftover server.

---

## 7. What I need from you

Nothing to start Cut A.

Say **fire A** (or **fire the build path**) and I pull the catalogs next.

If you want the original 2-then-3 order anyway, say so — I can do it, it will just be a messier first combat extract.
