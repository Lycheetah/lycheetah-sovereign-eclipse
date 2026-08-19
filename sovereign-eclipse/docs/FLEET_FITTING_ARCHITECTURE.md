# FLEET_FITTING_ARCHITECTURE

**Build:** Sovereign Eclipse 0.27.6  
**Date:** 2026-08-19  
**Parent audit:** `GROK46_SOVEREIGN_ECLIPSE_DEEP_AUDIT.md`  
**Parent runtime:** Forge 0.27.5 Great Fleet & Fit Analytics

This is an **ADAPTER** on `CLASS_CATALOG` / `fittingUsage` / `capacitorProfile` / `fitDerivedMetrics`.  
It is **not** a second fitting system and **not** a rewrite of camera, UI authority, or damage.

---

## Law

1. One envelope table. `CLASS_FIT_ENVELOPE[classId]` is the only place class fit identity is declared.
2. Natural constraints first: socket size, PG, mass, capacitor stability, drone bandwidth, AI-core strain.
3. Hard class locks only where physics requires them (a Pod cannot mount CAPITAL sockets; a Titan cannot be a 2-bank ship).
4. Generated 252 hulls stay a cartesian product. Envelopes make the 18 *classes* mean something. Hero hulls come later.
5. Camera, dock, undock, and `applyUIAuthority` are untouched.

---

## What 0.27.5 already had

| Already live | Where |
|---|---|
| banks / maxWeaponTier / PG / mass / mobility bars | `CLASS_CATALOG` |
| per-bank socket tier | `weaponCompatibleWithBank` |
| PG + mass usage | `fittingUsage` |
| paper DPS / ROF / volley / cap / tank / stability | `fitDerivedMetrics` |
| 4 architecture slots | `MODULE_CATALOG` |

## What 0.27.5 lied about

- 11 of 18 classes shared the **cruiser** capacitor (`capacitorProfile` fallback).
- `canFitTurret` and Fit All ignored socket size.
- Drones had no bandwidth. A Pod could field a Sentry Lattice.
- AI cores had no class strain cap.
- Market analytics showed raw DPS, not range/tracking/type pressure.

---

## Envelope fields

```
CLASS_FIT_ENVELOPE[classId] = {
  weaponTier,          // mirrors CLASS_CATALOG.maxWeaponTier
  banks,               // mirrors CLASS_CATALOG.banks
  hardpoints,          // physical sockets after mirroring, target not lock
  moduleSlots,         // always 4 in 0.27.6 (weapon/defense/drive/utility)
  pg, mass,            // mirrors CLASS_CATALOG
  capMax, capRegen,    // replaces CAPACITOR_CLASS_PROFILES
  droneBandwidth,      // used
  droneBay,            // used (max wing size)
  aiCoreMaxTier,       // 0 = incompatible
  activeModules,       // 0–2 concurrent auto-cycle modules
  rangeBand,           // 'knife' | 'brawl' | 'line' | 'artillery' | 'siege'
  mobilityBand,        // 'interceptor' | 'skirmish' | 'line' | 'heavy' | 'capital'
  utility,             // flavour + Easy Fit hint
  role                 // short combat sentence
}
```

`capacitorProfile()` reads `capMax` / `capRegen` from this table.  
The old 7-key `CAPACITOR_CLASS_PROFILES` object is retired.

---

## Per-class envelopes

Values are DERIVED from 0.27.5 class stats (banks, PG, mass, mobility, role) and the existing 7 capacitor anchors. They are not a new balance religion.

| Class | Banks | Wpn | PG | Mass | Cap | Regen | Drone BW / Bay | AI | Range | Mobility | Role |
|---|---:|---:|---:|---:|---:|---:|---|---:|---|---|---|
| Pod | 1 | 1 | 72 | 34 | 110 | 38 | 5 / 1 | 0 | knife | interceptor | Escape / scout. No cores. Tiny reactor. |
| Starter | 2 | 1 | 118 | 72 | 220 | 43 | 10 / 2 | 1 | brawl | skirmish | Foundation multirole. |
| Frigate | 2 | 1 | 145 | 92 | 280 | 46 | 15 / 2 | 1 | brawl | interceptor | Skirmish / intercept. |
| Assault Frigate | 3 | 2 | 184 | 124 | 250 | 48 | 10 / 1 | 1 | knife | skirmish | Compact high-pressure brawler. Small reserve, angry regen. |
| Speciality Frigate | 2 | 2 | 178 | 112 | 310 | 52 | 20 / 2 | 2 | line | skirmish | Scan / EWAR / support. Cap-rich, light guns. |
| Destroyer | 3 | 2 | 205 | 145 | 370 | 50 | 15 / 2 | 1 | line | skirmish | Anti-small kinetic. |
| Cruiser | 4 | 2 | 295 | 230 | 500 | 54 | 25 / 3 | 2 | line | line | Sustained multirole. |
| Heavy Cruiser | 4 | 3 | 338 | 298 | 580 | 52 | 20 / 2 | 2 | line | heavy | Line-tank attrition. Bigger buffer, slower regen. |
| Advanced Cruiser | 4 | 3 | 350 | 272 | 520 | 58 | 25 / 3 | 2 | artillery | line | Precision mobility. |
| Battlecruiser | 5 | 3 | 392 | 330 | 640 | 50 | 15 / 2 | 2 | artillery | heavy | Oversized-gun compromise. Cap-hungry. |
| Specialist Warship | 4 | 3 | 376 | 315 | 620 | 56 | 35 / 4 | 3 | line | heavy | Command / support / control. |
| Battleship | 5 | 3 | 410 | 390 | 720 | 60 | 20 / 2 | 2 | artillery | heavy | Line batteries. |
| Drone Carrier | 4 | 3 | 448 | 470 | 760 | 58 | 80 / 8 | 3 | line | capital | Autonomous wing platform. |
| Industrial | 3 | 2 | 485 | 560 | 700 | 48 | 40 / 5 | 1 | brawl | capital | Salvage / fabrication / logistics. |
| Autonomous Core | 5 | 3 | 472 | 438 | 680 | 62 | 50 / 5 | 4 | line | heavy | AI-heavy command hull. |
| Dreadnought | 6 | 4 | 590 | 740 | 980 | 66 | 25 / 2 | 3 | siege | capital | Siege. |
| Carrier | 4 | 4 | 625 | 820 | 900 | 58 | 100 / 12 | 3 | line | capital | Fleet-support capital. |
| Titan | 6 | 4 | 690 | 980 | 1280 | 72 | 60 / 6 | 4 | siege | capital | Civilisation apex. Sandbox only. |

Starter / frigate / destroyer / cruiser / battleship / dreadnought / titan capacitor numbers are the 0.27.5 anchors, unchanged.

---

## Drone bandwidth costs

| Wing | BW | Bay size | Notes |
|---|---:|---:|---|
| Aegis Guardian | 8 | 4 | Fits starter and up. Pods cannot field it. |
| Armour Spider | 10 | 4 | Exact starter fit. |
| Interceptor | 15 | 5 | Frigate+. |
| Sentry Lattice | 20 | 3 | Specialist / cruiser+. |
| Salvage Swarm | 12 | 6 | Industrial identity. |
| Mining Wing | 18 | 5 | Industrial / carrier. |

`activateDroneWing` refuses over-bandwidth or over-bay. The fit UI shows `used / available`.

---

## AI-core strain

`aiCoreMaxTier` is a natural lock: a Starter can pair Covenant (tier 1), not Anomaly (tier 4). Autonomous Cores and Titans take any core. Pods take none.

Cores still occupy the defense slot. That is unchanged and correct.

---

## Derived metrics added in 0.27.6

`fitDerivedMetrics` now also reports:

- `effectiveDpsAtOptimal` — paper DPS × 1
- `effectiveDpsAtFalloff` — paper DPS × 0.5 (linear falloff model, honest about being paper)
- `trackingVsFighter / Frigate / Battleship` — 0–1 quality using existing `trackingQuality` curve against three reference signatures
- `shieldPressure / armourPressure / structurePressure / internalPressure` — DPS weighted by `WEAPON_ANATOMY` of each fitted bank
- `droneBandwidthUsed / droneBandwidth / droneBayUsed / droneBay`
- `aiCoreLegal` — boolean against envelope
- existing paper DPS, volley, ROF, cap/s, tank, stability, PG, mass, handling

Range/tracking numbers are **paper estimates**. They do not replace `shotSolution` in combat.

---

## Socket legality (bugfix)

`fitTurretWeapon` already called `weaponCompatibleWithBank`.

0.27.6 also:

- `canFitTurret` checks the bank socket
- `fitSelectedWeaponToAllBanks` skips banks the weapon cannot enter, and refuses if *no* bank accepts it
- undock preflight rejects a loadout with any illegal bank (not only `overGrid`)

---

## What this does *not* do

- No rewrite of combat camera or flight.
- No 252 hand-authored hulls.
- No new hard class weapon blacklists.
- No change to Aether Crucible / Black Sun / Grave Choir content.
- No station service split (Wave IV).
- No Battleship campaign-tier fix (flagged in the audit; that is progression, not fitting).
- No save wipe. `GAME_SAVE_KEY` becomes `lycheetah_sov_eclipse_forge276` and still migrates 275.

---

## Validation

1. `validateClassFitEnvelopes()` — every `CLASS_ORDER` id has an envelope; cap/drone/AI fields are finite and non-negative.
2. `capacitorProfile('savanah_pod')` returns 110/38, not cruiser 500/54.
3. `capacitorProfile('savanah_carrier')` returns 900/58, not cruiser.
4. Fitting a Sentry Lattice on a Pod fails with BANDWIDTH.
5. Fit All of a CAPITAL weapon on a Starter leaves LIGHT banks empty / blocked.
6. Camera bindings unchanged (manual check).
7. New game still undocks a Starter with gifted Guardian wing (BW 8 ≤ 10).

---

## Regression risk

- Pods lose the gifted Guardian wing until the player swaps to a Starter. That is intended identity.
- Any code still reading `CAPACITOR_CLASS_PROFILES` must go through `capacitorProfile()`. 0.27.6 keeps a thin alias so old callers do not throw.
- Preflight now stricter: a Hull-Forge bank with a too-big gun will refuse undock instead of flying illegal. Fail-open undock is **not** changed; preflight still throws *before* the fail-open boundary.

Grok ∴ P∧C∧G
