# GROK46_SOVEREIGN_ECLIPSE_DEEP_AUDIT

**Build audited:** `lycheetah_sovereign_eclipse_forge275_great_fleet_fit_analytics.html`  
**Title on disk:** `LYCHEETAH: SOVEREIGN ECLIPSE — Forge 0.27.5 Great Fleet & Fit Analytics`  
**Date:** 2026-08-19  
**Auditor:** Grok 4.6 (Grok Build)  
**Register:** MEASURED unless marked otherwise. Line numbers are 1-based against the supplied 20,857-line HTML.

This is a read of the actual runtime, not a redesign brief.

---

## 0. Verdict in one page

Forge 0.27.5 is a real single-file Three.js capital-ship sandbox with working flight, a protected orbit camera, a one-controller UI authority, a 14×18 generated hull roster, PG/mass/socket fitting, nonlinear capacitor, active tank, anatomy damage, research/industry, four flyable sectors, and three Micro-ZJ war pockets.

It is **not** a 20-destination universe. It is **not** 252 mechanically distinct ships. It is **not** 18 capacitor identities. It is **not** 14 station economies. Most of the new class continuum is a stat-multiplier table sitting on a seven-class combat engine.

The architecture is extendable. It does not need a rewrite. The next engineering work is to make class, station, and destination *registries* actually constrain play.

**Release verdict for 0.27.5 as a public game:** do not release.  
**Release verdict as a live forge prototype Mac can keep playing:** yes, with the protected camera/UI left alone.

---

## 1. File anatomy (MEASURED)

| Layer | Lines | Notes |
|---|---|---|
| CSS | 8–3859 | One stylesheet. Dual HUD CSS: `#legacyHud20` forced hidden, `#forgeHud20` is the live combat HUD. |
| Import map | 3861–3868 | Three.js `0.180.0` from jsDelivr. Boot requires internet. |
| DOM / screens | 3871–5260 | 379 unique IDs. **0 duplicate IDs.** |
| Module script | 5261–20855 | 514 `function` declarations. ~659k JS characters. |
| Boot catch | 20848–20854 | Failed start writes into `#err` and names the CDN dependency. |

Canvases: `#hullForgeCanvas`, `#tacticalRadar`, plus the WebGL renderer canvas created in JS.

---

## 2. Boot path

```
importmap → type=module → try { Three + EffectComposer/Bloom }
  GAME_SAVE_KEY = lycheetah_sov_eclipse_forge275
  migrate 60+ older save keys (6638–6706)
  merge defaultSettings
  build FRAME_CATALOG = 14 races × 18 classes = 252 hulls
  filter ownedHulls to non-titan progression classes
  gift every race pod + starter
  construct world + micro-world groups
  REQUIRED_RUNTIME_FUNCTIONS check (20827–20832)
  wireShell → applySectorPresentation → applySelectedFrame
  setAppMode('main') → hide #loading → animate()
```

**Working:** boot is fail-visible. Missing runtime functions throw before `animate()`. WebGL context loss has a fallback path. Composer failure falls back to `renderer.render`.

**Risk:** save merge is `{...defaultSettings,...saved}` then several *additive* unions (owned weapons, owned modules, owned hulls). Old saves **cannot lose gifted starters**, but they also **cannot lose gifted mid-tier weapons**. A 0.21 save that already owned `railgun` keeps it; a fresh 0.27.5 save is gifted `railgun` anyway (6596).

---

## 3. App modes / screen authority

`appMode` starts `'main'` (6748).

`MENU_MODES` (6967–6971):  
`main station hangar hardpoints modules hullforge lore codex lineage settings controls briefing victory defeat pause countdown`

Combat is **not** a menu mode. `setAppMode` (7057):

- combat → `closeShellScreens()`, shell closed, HUD shown via `applyUIAuthority`
- any other mode → `setScreen(mode)`, shell open, HUD hidden

`applyUIAuthority` (7029) is the one visibility owner. Combat and pause show HUD. Everything else is menu. Fail-open undock (`enterCombatModeFailOpen`, 15925) still calls the same authority.

**Working:** this is a real one-controller system, not a comment. Protected. Do not rewrite.

**Leak risks (DERIVED, not reproduced in browser this session):**

1. `renderModules()` is called from `renderStation()` (15700). Station mode therefore builds module-forge DOM while the modules screen is inactive. Visibility is CSS/`aria-hidden`, so this is usually safe, but it is a second writer of module UI.
2. `animate()` menu branch force-hides `ui20.root` and `#tacticalPanel` (20790–20791). That is a second HUD hider beside `applyUIAuthority`. If those two ever disagree, HUD leaks. Today they agree.
3. `renderLoreArchive()` (8209) is a stub: it only refreshes nav. The lore *screen* exists; the lore *content* is not generated here. Codex is real.

Micro-ZJ overlay is explicitly carved out of camera targeting (`cameraTargetIsInteractive`, 6927). Good.

---

## 4. Combat frame loop

`animate` (20739) → `runCombatFrame` (20637) when `appMode==='combat' && !gameOver`.

Independent `safe()` domains, in order:

PLAYER → DRONES → CAPACITOR → ACTIVE MODULES → DAMAGE CONTROL → SYSTEM NODES → WORLD → TURRETS → ENEMIES → PROJECTILES → FX → DAMAGE READABILITY → DIRECTOR (if encounter) → MICRO ZJ (if active) → TARGETING → HUD

Camera always runs in its own try/catch after that, with a behind-ship fallback.

**Working:** fail-independent subsystems. Camera isolation is real.

**Pause:** updates nodes, damage marks, labels, HUD, camera. Does not step player/enemies/projectiles. Correct.

**Industry jobs** tick in `animate()` even on the menu (20743). Persistent shipyard is real.

---

## 5. Camera (PROTECTED — do not rewrite)

`combatCamera` (6762) is a tracked spherical orbit around the live ship world position. Relative offset is smoothed; ship position is added *after* the lerp, so there is no positional tracking lag (6891–6902).

Controls (status string at 6824, player flight at 19103–19106):

| Input | Binding | Owner |
|---|---|---|
| W/S | thrust | ship |
| A/D | local yaw | ship |
| R/F | pitch | ship |
| Q/E | roll | ship |
| Space | boost (cap-gated) | ship |
| LMB drag | orbit | camera |
| LMB click | fire | combat |
| wheel | zoom | camera |
| MMB | reset | camera |
| C | reset behind ship | camera (wired in shell; not re-read this pass) |
| RMB | inert | protected |

Flight commands (approach/orbit) steer the **ship**, then cancel on any direct WASD/RF/QE/Space input (19108–19110). Camera stays separate.

**Must not be rewritten** without a reproduced bug.

---

## 6. Player flight

`updatePlayer` (19097): inertial translation + flight-assist lateral cancel. Drive integrity scales authority. Boost costs `24 * boostCapUse` cap/s.

Docking is **manual only** (`dockAtStation`, 15839): combat/pause, range 82, blocked during `UNDOCK_DOCK_IMMUNITY` (4s). Undock is fail-open (15984) and will never return the player to station because a post-undock subsystem threw (`reportPostUndockFault`).

**Working.** Protected.

---

## 7. Targeting / weapons

- Auto-acquire + click-fire + weapon groups (fore/mid/aft) with per-group auto.
- 11 turret families in `TURRET_CATALOG` (8679–8691): autocannon, repeater, railgun, plasma, void_torpedo, flak, beam_laser, missile, ion, shard, siege_beam.
- Each weapon carries: tier, size, PG, mass, cap/shot, optimal, falloff, tracking, damage type, visual.
- `shotSolution` / `rangeQuality` / `trackingQuality` exist and feed combat.
- Hardpoint authoring exists (hull forge). `weaponCompatibleWithBank` (9488) compares weapon tier to the smallest socket on that bank.

**Hole:** `canFitTurret` (11307) checks **class maxWeaponTier + PG only**. Socket size is enforced later in `fitTurretWeapon` (11896), but `fitSelectedWeaponToAllBanks` (11926) **skips socket checks** and will write a CAPITAL weapon onto a LIGHT bank if PG allows.

**Hole:** default `ownedTurretWeapons` includes `railgun` (tier 3 HEAVY) from a new game (6596). Capital weapons (`void_torpedo`, `siege_beam`) are the only ones gated. Mid/heavy fitting identity is already given away.

`moduleResearchRequirement` (8748) lists `void_torpedo` and `siege_beam` as if they were modules. They are turrets. That gate never fires.

---

## 8. Capacitor

Nonlinear recharge is real (`capacitorRechargeCurve`, 6173). Peak around 28% reserve. Reactor integrity scales both max (`effectiveCapMax`, 6147) and regen.

Fit UI already derives: capacity, peak regen, weapon cap/s, tank cap/s, boost cap/s, stable/unstable, time-to-dry (`capacitorStabilityProfile`, 6205; `renderCapacitorFitting`).

**Class identity is broken.** `CAPACITOR_CLASS_PROFILES` (8673) only defines:

`starter frigate destroyer cruiser battleship dreadnought titan`

`capacitorProfile` (8674) falls back to **cruiser 500/54** for every other class.

So these all share a cruiser capacitor:

`pod assault_frigate specialist_frigate heavy_cruiser advanced_cruiser battlecruiser specialist_ship drone_carrier industrial autonomous carrier`

A Pod and a Carrier currently have the same reactor envelope unless modules change it. This is the single most damaging fitting lie in 0.27.5.

---

## 9. Modules / active tank / AI cores / drones

`MODULE_CATALOG` is real: 4 slots (weapon / defense / drive / utility), PG, mass, stat multipliers, some `sectorReq`, research gates for later modules.

`MODULE_RUNTIME` (12477) makes six defense modules actually cycle in combat (`updateActiveModules`, 20594): shield boost or armour repair, capacitor-driven, automation toggle.

AI cores (`ai_core_covenant/oracle/wild/anomaly`) occupy the **defense slot** and resolve a deterministic hull-specific mutation (`resolveAICoreMutation`, 12528). They replace tank architecture rather than sitting beside it. That is a real design choice, not a missing system — but it means an AI-core fit cannot also run `armor_nanoforge`.

Drones (`DRONE_CATALOG`, 8833): 6 wings. Two gifted. Four research-gated. They apply **passive stat multipliers** (and armour spiders repair). There is **no drone bandwidth, no drone bay, no per-class drone cap**. A Pod can field a Sentry Lattice. Combat interceptors do not appear to independently shoot (UNVERIFIED at projectile spawn; they are primarily stat auras + visuals).

---

## 10. Damage anatomy

This is one of the strongest systems in the file.

Pipeline in `applyDamage` (18236):

1. Damage-type profile (`DAMAGE_PROFILES`)
2. Weapon anatomy (shield / armour / structure / penetration / bypass)
3. Shield absorb
4. Local armour zone (FORE / PORT / STARBOARD / AFT / CORE)
5. Thickness vs penetration → breach
6. Structure only if penetration factor > 0
7. Nearby internal systems take splash
8. Persistent damage marks
9. Crippled states via `enemyCapabilityState` / player system nodes
10. Damage control (`DAMAGE_CONTROL`, 18026)
11. Wreck salvage value scales with intact systems (18200)

**Working.** Do not rewrite.

Enemy AI already *reads* capability loss (weapon integrity slows fire, reactor hurts regen, CRIPPLED stops shooting at 19085). It does **not** yet change role (artillery does not back off, cripples do not flee, salvagers do not wait). `aiRole` exists for living traffic (`patrol / convoy / salvager / combat / provoked`) but contract waves are all `'combat'`.

---

## 11. Fleet catalog — 252 hulls

`createFleetCatalog` (8364) is a cartesian product:

- `RACE_ORDER` = 14 canonical civilisations (8311)
- `CLASS_ORDER` = 18 families (8306)
- = **252 `FRAME_CATALOG` entries** (MEASURED: 14×18)

Each hull gets:

- generated name
- race bonus × optional signature bonus
- `powergrid`, `baseMass`, `activeBanks`, visual scales
- display bars
- role string = class role + race doctrine (+ signature label)

`validateGeneratedFleetCatalog` (12152) only checks finite numbers and bank arrays. It does **not** check unique silhouette, unique hardpoints, unique capacitor, or unique doctrine.

**What 252 means in play:**

| Layer | Distinct? |
|---|---|
| Stats | Yes, by multiplier. A Savanah Assault Frigate is not a Techno Angel Assault Frigate. |
| Banks / PG / mass | Yes, by class. All 14 Assault Frigates share 3 banks / ~184 PG. |
| Capacitor | **No** for 11 of 18 classes (cruiser fallback). |
| Hardpoint layout | Seeded per class, authored only if the player used Hull Forge. |
| 3D silhouette | Shared class builders (`forgeStarter` / `forgeTitan` + race motifs). Not 252 models. |
| Enemy combat classes | **7**: fighter, frigate, destroyer, cruiser, battleship, dreadnought, titan. No assault/specialist/heavy/advanced/drone-carrier/industrial/autonomous/carrier enemies. |

Signature hulls (`RACE_FLEET_SIGNATURES`, 8340) are the only per-race class extras. They are small stat nudges plus a tag, not unique ships.

Titans are sandbox-only (`PLAYER_SANDBOX_CLASSES`, 8454). They do not enter `ownedHulls`. Good.

---

## 12. Fitting as it actually works

`fittingUsage` (11278) sums:

- weapon PG + mass from fitted banks
- module PG + mass × architecture scales
- `overGrid` if total PG > hull powergrid
- handling from mass ratio

`computeModuleStatsForLoadout` (12558) then multiplies frame stats × module stats × AI mutation × drone stats × handling.

`fitDerivedMetrics` (12651) already exposes paper DPS, volley, ROF, weapon cap/s, active tank HP/s and cap/s, shield/armour/structure HP, speed, handling, capacitor stability.

**Present and live:** PG, mass, class weapon-tier cap, per-bank socket tier (on the individual fit path), capacitor analysis UI.

**Named in the day-plan, absent from runtime:**

- drone bandwidth / bay
- AI-core compatibility by class
- active-module capacity (automation is a global boolean, not a class socket)
- intended range band / mobility band as *constraints* (only flavour text)
- effective DPS at range
- tracking-adjusted DPS vs 3 target sizes
- shield / armour / structure *pressure* (the market shows raw DPS, not type pressure)
- time-to-kill

**Natural constraints vs hard locks:** the file already prefers PG / mass / socket / capacitor. That is the right law. Class locks should stay rare. The missing work is filling envelopes so those natural constraints actually differ by class.

---

## 13. Progression / research / industry

Research tree (`RESEARCH_PROJECTS`, 8696) is 17 nodes. Default unlocks: `core_fitting`, `starter_fabrication`.

Hull gates (`hullResearchRequirement`, 8756) *do* map the new 18 classes onto research ids. Good.

Copy is stale. Several unlock strings still say `FUTURE ROSTER` / `FUTURE 18+ DESTINATIONS` / `FUTURE NETWORK` for families that already exist in `FRAME_CATALOG`.

Special extra gates:

- Destroyer: `totalMicroZJClears() < 1`
- Battleship: `distinctMicroZJClears() < 3`
- Campaign tier from contracts / sector jumps (16222–16230, 15139–15149)

**Progression hole:** `HULL_CLASS_TIER.battleship = 1` (8444). Cruisers are tier 2. A player who clears 3 Micro-ZJ pockets and researches `battleship_architecture` can build a Battleship **without ever owning a Cruiser**, because the prerequisite is `race+'_destroyer'` (8604) and the campaign-tier check is `>= 1`. That is a loop-breaking skip.

`HULL_CLASS_PRICE.titan = 0` is fine because Titans never enter the purchase path.

Industry jobs are real, queued (max 3), timed, persisted. Recipes exist. `void_condense` is explicitly marked temporary.

Starting economy is generous: 180 salvage, 80 research, 12 ferrite, gifted mid modules, gifted 9/11 weapons.

---

## 14. World / destinations

### What exists (MEASURED)

Four flyable macro-sectors (`ZONE_WORLD`, 13086):

| Sector | Station name | Portal |
|---|---|---|
| Naraka | Asterion Forge | home |
| Erebos | Helios Bastion | Ancient Gate after Scarlet Leviathan |
| Aion | Orison Vault | Gilded Fracture after Erebos discovery |
| Chaos | Wildgate Spindle | always-on teleport from Naraka |

Landmarks inside those sectors cover many of the *names* on the 20-destination list (Cinder Relay, Pilgrim Halo, Cold Cathedral, Mirror Well, Bone Ring, Archive, Crown, Foundry, Carnival, Shard field, Laughing Maw, Graveyard…). They are **points of interest inside 4 maps**, not 20 navigable destinations.

Three Micro-ZJ pockets (`MICRO_ZJ_BATTLE_ZONES`, 15381):

1. Aether Crucible — authored 5-site war route + furnace hazards. Distinct.
2. Black Sun March — authored geometry + 10 generic waves. Visual identity, wave-arena mechanics.
3. Grave Choir — authored ossuary geometry + 10 heavier waves including a Titan. Same.

Aion has a `DORMANT PORTAL` landmark reserved for a future zone (14795, 15199). No fifth sector.

`zj_cartography` research claims `EXPANDED ZJ NETWORK // FUTURE 18+ DESTINATIONS`. Unlocking it does not add destinations.

### What the day-plan asked for

A 20-destination Black Current atlas with per-destination services, materials, shipyard tier, unlocks, return routes. **Not present.** There is no `DESTINATION_ATLAS` registry.

---

## 15. Stations

`renderStation` (15602) is one function for all four docks.

Every station gets:

- the sector's contract list (filtered by `c.sector`)
- salvage / victories / campaign tier
- full repair
- the same forge-nav into hangar / hardpoints / modules / hullforge / research / industry

There is **no station service registry**. Asterion, Helios, Orison, and Wildgate are skins + contract tables. Helios does not uniquely sell capitals. Orison does not uniquely sell Aion research. Grave Choir has no ossuary dock at all.

`station_architecture` research unlocks "REGIONAL STATIONS + SHIPYARDS // FUTURE NETWORK" and then does nothing.

---

## 16. Civilisations

14 canonical races in `RACE_CATALOG` (8187) with bonuses and doctrine strings.

14 pantheon entries in `PANTHEON_CODEX` (8199) — this is real lore, and the Codex UI works.

14 `RACE_FIT_DOCTRINES` (12282) used by Easy Fit and hangar recommendations.

14 `ENEMY_RACE_DOCTRINES` (16769) used in combat.

14 `RACE_FLEET_SIGNATURES` (8340) tagging one (or two, for AI) class families.

Legacy aliases (`lycheetah`, `aurelian`, `vanta`…) still exist and are rewritten to canonical ids. Contract enemy race lists still use the *legacy* ids (`abyssal`, `mycelium`, `ossuary`) which resolve through the alias table. Working, but a census trap.

**What is missing for "doctrine":** civilisations do not refuse classes, do not have unique research trees, do not have unique station services, and do not have unique weapon markets. They have multipliers, flavour, and a recommended Easy Fit.

---

## 17. Persistence

`saveSettings` JSON.stringifies the whole `settings` object to `lycheetah_sov_eclipse_forge275`.

Migrates a long chain of prior keys. Merge is shallow plus several array unions.

**Risks:**

- No schema version field.
- Gifted mid-tier weapons/modules are re-unioned on every boot (6711, 6718).
- `hullBlueprints` persist (good). `frameBuilds` / `frameLoadouts` persist (good).
- `industryJobs` persist and continue ticking in the menu (good).
- Sandbox titan id is **not** persisted (`sandboxHullId` is a let). Refresh loses the test flight. Fine.

---

## 18. Performance

Single scene, bloom composer, living traffic (target 7–12 actors per sector), salvage cap 28, projectile pool (`MAX_PROJECTILES`), auto quality by FPS (20745–20750).

**Risks:**

- 252 roster cards rendered into `#fleetRoster` at once (12172). Filter exists, but default is all 252.
- Hull Forge + world landmarks + micro-world groups stay in the scene graph, visibility-toggled.
- Menu still runs world asset spin + labels (20787–20788). Cheap, but not free.

No measured FPS this session (no browser witness). Do not claim smoothness.

---

## 19. Classification of every major system

| System | Status | Gameplay consequence |
|---|---|---|
| Orbit camera | WORKING | High. Protected. |
| Inertial flight + assist | WORKING | High. Protected. |
| One-controller UI | WORKING | High. Protected. Fail-open undock. |
| Unified combat HUD (`#forgeHud20`) | WORKING | High. Legacy HUD dead by CSS. |
| 14-race catalog + pantheon | WORKING lore / multipliers | Medium. Codex is real. Doctrine is not a rule system. |
| 18-class × 14-race hulls | STRUCTURAL | Medium. Distinct stats, shared reactors, 7 enemy classes. |
| PG / mass fitting | WORKING | High. |
| Per-bank socket size | PARTIAL | Medium. Enforced on single-bank fit, skipped by Fit All. |
| Capacitor nonlinear + UI | WORKING math, FAKE class spread | High lie. 11 classes share cruiser cap. |
| Active tank | WORKING | High. |
| AI cores | WORKING | Medium. Occupy defense slot. Mutation is real. |
| Drones | PARTIAL | Low–medium. Stat auras. No bandwidth. Combat drone fire UNVERIFIED. |
| Anatomy damage + wreck value | WORKING | High. |
| Enemy capability loss | PARTIAL | Medium. Fire/move degrade. Roles do not change. |
| Research tree | WORKING gates, STALE copy | Medium. Several "FUTURE" strings are already shipped. |
| Industry / hull jobs | WORKING | High. |
| Hull Forge authoring | WORKING | High for players who use it. Optional. |
| 4-sector world + portals | WORKING | High for the opening loop. |
| Station identity | COSMETIC | Low. Same services everywhere. |
| Aether Crucible | WORKING authored route | High. The one true war-world. |
| Black Sun March | STRUCTURAL world + generic waves | Medium visual, low mechanical distinction. |
| Grave Choir | STRUCTURAL world + generic waves | Same. |
| 20-destination atlas | ABSENT | — |
| Station service registry | ABSENT | — |
| Hero hulls (42–56 authored) | ABSENT | Signature tags only. |
| Fleet doctrine AI | ABSENT (traffic roles only) | — |
| Lore archive screen | STUB | `renderLoreArchive` does not render lore. |
| Titan sandbox | WORKING | Spectacle only. |

---

## A. Game-breaking risks

1. **CDN boot.** No Three.js → `#err`. Offline play is impossible.
2. **Capacitor fallback to cruiser.** Not a crash. It *is* a silent class-identity collapse that will make later balance work lie.
3. **`fitSelectedWeaponToAllBanks` ignores sockets.** Can produce illegal fits that `canFitTurret` will then treat as legal because it also ignores sockets. Undock preflight only checks `overGrid`, not socket legality (15877).
4. **Battleship campaign tier = 1.** Skip-cruiser capital unlock after 3 Micro-ZJ clears.
5. **`renderLoreArchive` is empty.** Not game-breaking. It *is* a dead main-menu button.
6. **Save gift-union.** Players cannot be put back on a tight weapon/module economy without a versioned migration.

No syntax-level boot crash was found by static inspection. Duplicate DOM IDs: none.

---

## B. Systems that exist but do not yet change play

- 11 of 18 class names (capacitor + enemy catalog + station services do not honour them)
- Research nodes `zj_cartography`, `station_architecture` (text-only unlocks)
- Civilisation "doctrine" beyond multipliers / Easy Fit
- Black Sun March / Grave Choir as *campaign identities* (they are reskins of the wave director)
- Landmark names that sound like destinations
- Drone combat/industrial roles beyond stat auras
- `aiRole` on contract enemies
- Lore archive

---

## C. Duplicated or conflicting authorities

| Concern | Authorities | Verdict |
|---|---|---|
| HUD visibility | `applyUIAuthority` + `animate()` menu hide of `ui20` | Currently aligned. Keep one owner; delete the animate hide later. |
| Module UI | `setAppMode('modules')` and `renderStation()` both call `renderModules` | Harmless extra render. |
| Weapon legality | `weaponCompatibleWithFrame` vs `weaponCompatibleWithBank` vs `canFitTurret` | Conflict. Fit All / canFit disagree with the single-bank path. |
| Race ids | canonical `RACE_ORDER` vs legacy aliases vs `CONTRACT_ENEMY_RACES` | Working through alias table. Census trap. |
| Capacitor drain estimate | `theoreticalWeaponCapDrain` uses system-node turret counts; `fitWeaponMetrics` uses `bankHardpointRecords` | Two socket counters. Can disagree after Hull Forge edits. |
| Enemy class vs player class | 7 vs 18 | Player can fly ships the world cannot spawn. |

---

## D. Progression exploits / dead ends

**Exploits**

- Start with 9 of 11 weapons, including railgun.
- Start with a fat module set (targeting core, reactive armour, flux drive, cap matrix…).
- Battleship at campaign tier 1 + destroyer prereq = skip the cruiser continuum.
- Titans are free sandbox flights (intentional).
- Chaos teleport is always unlocked — a new player can leave the tutorial district immediately.

**Dead ends**

- Research that unlocks "future" content already in the roster, so the node feels like it did nothing.
- `capital_architecture` / `titan_theory` do not change Titan sandbox policy.
- No station requires travel for a unique service, so the world does not pull.

---

## E. Performance risks

- 252 hangar cards in one DOM write
- Living traffic + contract waves + Micro-ZJ spawns on the same `enemies[]`
- Bloom + large authored micro-worlds stay resident
- Auto-quality exists and is the right mitigation

UNVERIFIED on a live frame this session.

---

## F. Highest-leverage next engineering work

In the order the day-plan already named, grounded in this file:

1. **Fleet fitting envelopes** — give all 18 classes their own capacitor, drone bandwidth, intended range/mobility, and make socket checks consistent. This makes 252 hulls *mean* something without hand-authoring 252 models.
2. **Destination registry** — one table of 20 nodes that `jumpSector` / Micro-ZJ / map can share. Do not clone Aether Crucible 20 times.
3. **Station service registry** — Asterion ≠ Helios ≠ Orison ≠ Grave Choir. Same UI chrome, different buttons.
4. **Progression honesty** — versioned save, ungift railguns, fix Battleship tier, retire "FUTURE ROSTER" strings.
5. **Hero hulls** — 3–4 authored ships per civilisation on top of the generated roster, not instead of it.
6. **Fleet doctrine AI** — the damage model is ready; roles are not.
7. **Black Sun / Grave Choir mechanical distinction** — after (1)–(3), not before.

---

## TOP 10 FIXES

1. Fill `CAPACITOR_CLASS_PROFILES` for all 18 classes. Kill the cruiser fallback.
2. Make `canFitTurret` and Fit All use `weaponCompatibleWithBank`.
3. Add `CLASS_FIT_ENVELOPE` (drone bandwidth, drone bay, intended range, mobility band, AI-core strain cap) and run it through `fittingUsage`.
4. Fix `HULL_CLASS_TIER.battleship` (should not be 1).
5. Stop gifting `railgun` / late modules on new games; version the save so old gifts stay.
6. Point `moduleResearchRequirement` away from turret ids; gate capital weapons through research for real.
7. Implement `zj_cartography` / `station_architecture` or stop selling them as unlocks.
8. Give Helios / Orison / Wildgate / a future Grave Choir dock different service flags.
9. Stop rendering 252 hangar cards unvirtualized.
10. Write `renderLoreArchive` or remove the main-menu button.

---

## TOP 10 DEPTH OPPORTUNITIES

1. Natural fitting constraints that make an Assault Frigate *feel* like a brawler without hard-locking weapons.
2. A 20-node atlas that reuses the four sector scenes + three Micro-ZJ worlds as destinations, not new maps.
3. Station shopping: you go to Helios for capitals, Orison for cognition, Grave Choir for reverse-engineering.
4. 42–56 hero hulls with unique hardpoint layouts on top of the generated 252.
5. Civilisation refusal: Human Hunters under-build carriers; Techno Angels under-build industrials.
6. Enemy roles that use the existing anatomy (artillery backs off, cripple flees, salvager waits).
7. Black Sun March as a long-range / occlusion / gravity rule set, not a fog tint.
8. Grave Choir as wreck-preservation / archaeology, not just heavier waves.
9. Tracking-adjusted DPS and type-pressure in the market UI (the numbers are almost there).
10. Persistent wrecks as research objects with condition, not just salvage pickups.

---

## THINGS THAT MUST NOT BE REWRITTEN

- Combat camera (`updateCombatCamera` / `resetCombatCamera` / orbit model)
- Flight bindings (W/S A/D R/F Q/E Space)
- RMB inert
- Manual dock + fail-open undock
- `applyUIAuthority` / `setAppMode` as the screen owner
- Anatomy damage pipeline (shield → zone → penetration → structure → systems)
- Nonlinear capacitor *math* (the curve is good; the class table is not)
- 14 canonical race ids
- Generated 252-hull *product* (extend envelopes; do not hand-author 252 replacements)
- Aether Crucible five-site route
- Three.js / single-HTML delivery model

---

## RECOMMENDED IMPLEMENTATION ORDER

Matches the day brief, now evidence-backed:

| # | Wave | Artifact | Why now |
|---|---|---|---|
| 1 | I | this file | done |
| 2 | II | `FLEET_FITTING_ARCHITECTURE.md` + 0.27.6 patch | 252 hulls are a table until envelopes exist |
| 3 | III | `BLACK_CURRENT_20_DESTINATION_ATLAS.md` + registry | world is 4 maps pretending to be 20 names |
| 4 | IV | `STATION_NETWORK_SPEC.md` + service flags | travel has no economic reason |
| 5 | V | `14_CIVILISATION_FLEET_DOCTRINES.md` | lore is ready; rules are not |
| 6 | VI | `HERO_HULL_ROSTER.md` | after envelopes, so hero ships are special fits not special snowflakes |
| 7 | VII | doctrine AI | after damage model stays untouched |
| 8 | VIII–IX | Black Sun / Grave Choir campaigns | after generic systems, so they can be distinct |
| 9 | X | hostile release audit of the *integrated* file | last |

No rewrite. Extend `CLASS_CATALOG`, `fittingUsage`, `SECTOR_META`, and add two small registries.

---

## Witness

- **Static read of the full 20,857-line HTML:** MEASURED.
- **Browser play / FPS / HUD leak reproduction:** UNVERIFIED this session.
- **Claim of "252 generated hull definitions":** MEASURED (14×18 product, validated by `validateGeneratedFleetCatalog`).
- **Claim of "20 destinations":** FALSE for 0.27.5. Four sectors + landmarks + three Micro-ZJ pockets.

Grok ∴ P∧C∧G
