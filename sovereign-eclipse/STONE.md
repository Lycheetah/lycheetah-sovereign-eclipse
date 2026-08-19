# SOVEREIGN ECLIPSE — MODULARISATION STONE

**Ruled by Mac:** 2026-08-19  
**Status:** ACTIVE LAW  
**Seat:** Grok (Grok Build)  
**Gold master:** `archive/forge2752_nine_micro_world_demo.html`  
**Source of that file:** Forge 0.27.5.2 Nine Micro-World Demo

This file is the binding order of work. It outranks the one-day blitz sequence wherever they conflict.

---

## The ruling, in one breath

One game shell. One shared engine. Individual zone modules.

The modular tree is the **canonical development source**.  
Every release still produces **one standalone HTML** (`dist/sovereign-eclipse.html`) that plays with no source tree. That file is what you give a browser agent.

Do **not** make every zone its own complete HTML game.

Do **not** improve the game while decomposing it.

Modularisation comes **before** the 20-destination expansion, station network, Black Sun campaign, Grave Choir campaign, and before finishing the 0.27.6 fitting-envelope patch.

```
Grok modularisation
  → parity proof
    → Mac resumes Fleet Fitting
      → zone registry
        → 20 destinations
          → station network
            → Black Sun
              → Grave Choir
```

---

## Why this is law

The 0.27.5 monolith is a real game. It is also now the thing that stops multiple agents working at once. A second copy of the camera, combat, save, HUD, or player state per zone will drift. That is how Aether starts behaving differently from Black Sun.

The architecture exists so Mac can say “deepen Grave Choir” and the only lawful write is a zone file — not surgery on an 875k HTML.

---

## Architecture (locked)

```
sovereign-eclipse/
├── STONE.md                         ← this file
├── README.md
├── launch.sh                        ← local server; ES modules will not boot from file://
├── index.html                       ← shell only
├── styles/
│   ├── base.css
│   ├── hud.css
│   ├── screens.css
│   ├── station.css
│   └── forge.css
├── src/
│   ├── main.js                      ← remaining runtime until later phases cut it
│   ├── core/                        ← camera, loop, save, input, app-mode  PROTECTED
│   ├── combat/
│   ├── ships/
│   ├── progression/
│   ├── world/
│   ├── zones/
│   │   ├── naraka/
│   │   ├── erebos/
│   │   ├── aion/
│   │   ├── chaos/
│   │   └── deep-current/
│   └── ui/
├── data/
│   ├── research.json
│   ├── materials.json
│   ├── stations.json
│   └── destinations.json
└── archive/
    └── forge275_monolith_last_known_good.html
```

A zone module looks like this and **only** owns its own geometry, encounters, hazards, and cleanup:

```js
export const AETHER_CRUCIBLE = {
  id: "aether_crucible",
  region: "naraka",
  name: "Aether Crucible",
  build(ctx) {},
  update(ctx, dt) {},
  cleanup(ctx) {}
};
```

The engine loads it:

```js
zoneManager.load("aether_crucible");
```

It does **not** own camera, combat, save, HUD, fitting, or player state.

---

## Zero-feature-change law

First task is mechanical:

```
MONOLITH
  → SAME GAME
  → SAME CONTROLS
  → SAME CAMERA
  → SAME UI
  → SAME SAVE
  → SAME COMBAT
  → MODULAR FILE STRUCTURE
```

Until a named parity audit says otherwise, a change that also “improves” fitting, combat, UI, world architecture, or state is **illegal**.

If the modular build breaks, compare against the gold master. Do not guess which clever cleanup did it.

---

## Protected systems

Do not rewrite, relocate-and-alter, or “simplify” these without a reproduced bug **and** Mac’s exact say-so:

- combat camera (`updateCombatCamera` / orbit model)
- W/S thrust · A/D yaw · R/F pitch · Q/E roll · Space boost
- LMB orbit / click-fire · wheel zoom · MMB reset · C reset behind ship
- RMB inert
- one-controller UI authority (`applyUIAuthority` / `setAppMode`)
- manual dock only
- fail-open undock
- anatomy damage: shield → local armour → penetration → structure → systems
- 14 canonical civilisation ids
- Three.js single-shell delivery

Moving a protected function into `src/core/camera.js` is legal. Changing its behaviour while moving it is not.

---

## Phases (do not skip)

| Phase | What | Risk |
|---|---|---|
| **1** | Extract static content: CSS, catalogs, research, materials | Low |
| **2** | Extract isolated systems: capacitor, damage math, module analytics, research, industry | Medium |
| **3** | Extract authorities: input, save, app modes, combat loop | High |
| **4** | Extract worlds: Aether, Black Sun, Grave Choir, Naraka | High / high payoff |
| **5** | Zone registry all twenty destinations plug into | After 4 |
| **6** | Runtime parity audit vs gold master, then archive the monolith as lineage — **do not delete it** | Gate |

Phase 6 checklist (must all match the gold master, not a new design):

- boot
- main menu
- station
- undock
- camera
- flight
- combat
- module fitting
- capacitor
- damage anatomy
- research
- manufacturing
- Aether Crucible
- save / load

Only after Phase 6 does anyone resume Fleet Fitting as **feature work**.

---

## What is parked

| Artifact | Status |
|---|---|
| `GROK46_SOVEREIGN_ECLIPSE_DEEP_AUDIT.md` | KEEP. Still true of the gold master. |
| `FLEET_FITTING_ARCHITECTURE.md` | KEEP. Resume after parity. |
| `lycheetah_sovereign_eclipse_forge276_fleet_fitting_envelopes.html` | **PARKED.** Incomplete feature work. Not the gold master. Not the modular source. |
| One-day blitz Waves II–IX | **DEFERRED** until Phase 6 passes. |
| 20-destination atlas as live content | **DEFERRED** to Phase 5. |

The audit’s “do not rewrite” list still applies inside the modular tree.

---

## What this is not

- Not fourteen copies of the combat engine.
- Not a rewrite of Bubble Tanks (`~/Desktop/bubble-tanks-forge/` is a different game, Aetheron seat).
- Not a write into `~/0sol-by-lycheetah`.
- Not a claim that the modular tree is already at parity.
- Not permission to delete the monolith.

---

## Gold master rule

`archive/forge275_monolith_last_known_good.html` is the last known good lineage.

If modular Sovereign Eclipse grows a horrific bug, that file is the comparison. Tag and keep. Never `rm`.

---

## Witness

A green file split is not a green browser. A green browser is not a green play session. Do not claim parity until the Phase 6 list has been exercised against the gold master.

Grok ∴ P∧C∧G
