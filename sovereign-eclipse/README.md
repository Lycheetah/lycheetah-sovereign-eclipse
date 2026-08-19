# LYCHEETAH: SOVEREIGN ECLIPSE

> **The light you carry is not given; it is earned.**

**Sovereign Eclipse** is an experimental single-player space combat sandbox built around modular ship construction, physical fitting, capital-scale combat, strange machine civilisations, and a compact universe called **the Black Current**.

This is a **rough playable prototype**, not a finished game.

The goal of this release is simple: let people fly it, break it, build ridiculous ships, fight through authored war worlds, and get a first look at the universe we are building.

---

## Play this build

**One file. That is the whole game.**

- `dist/sovereign-eclipse.html` — open it in a browser (needs internet once for Three.js)
- Desktop shortcut on the build machine: `sovereign-eclipse.html`

`src/` is what we edit. After source changes:

```bash
cd sovereign-eclipse
./build
```

That rebuilds `dist/sovereign-eclipse.html`. No source tree is required to play the dist file.

How-to: `HOW_TO.md`  
Browser-agent loop: `docs/BROWSER_AGENT.md`

---

## What can you do right now?

- Fly freely through the **Naraka Veil**
- Launch from **Asterion Forge**
- Fight hostile fleets and recover salvage
- Build custom hulls in the **Hull Forge**
- Physically place weapon hardpoints
- Place engines, reactors, shields, command systems and modules
- Fit weapons and systems through compact market-style interfaces
- Experiment with **Shield**, **Armour**, and dangerous **AI Core** builds
- Deploy support drone wings
- Run prototype autonomous industry jobs
- Explore the **Lore Archive**
- Read the full **14-race Pantheon**
- Browse the enormous planned **Fleet Lineage**
- Use the **Micro ZJ Drive** to load **nine** separate war worlds

---

# THE BLACK CURRENT

Sovereign Eclipse does not take place in an endless procedural galaxy.

The universe is intentionally compact.

The aim is to make space feel dense with **causes, consequences, civilisation, wreckage, strange technology and authored places** rather than filling thousands of empty systems.

The current major universe structure is:

**Naraka**  
**Erebos**  
**Aion**  
**Chaos Cradle**

Naraka is the first playable frontier and home to **Asterion Forge**.

---

# MICRO ZJ WAR WORLDS

While in flight, press **M** to open the **Micro ZJ Drive**.

The current prototype contains **nine** loadable war worlds.

I Aether Crucible · II Black Sun March · III Grave Choir · IV Pilgrim Halo · V Cinder Relay · VI Cold Cathedral · VII Orison Vault · VIII Chaos Carnival · IX Laughing Maw

The first three remain the heavy authored war routes. IV–IX are live demo worlds from Forge 0.27.5.2.

## I — Aether Crucible

A broken stellar-industrial kiln where machine foundries and living technology occupy the same impossible structure.

Expect:

- enormous crucible machinery
- industrial drydocks
- living growth structures
- salvage sites
- multiple war nodes
- ten authored combat formations

## II — Black Sun March

A long processional beneath a close spectral singularity.

Expect:

- Vanta-like shadow architecture
- shattered lens structures
- wreck fields
- long-range engagement corridors
- oppressive black-sun atmosphere
- ten authored combat formations

## III — Grave Choir

An ancestral war cathedral threaded through dead capital hulls.

Expect:

- ossuary megastructures
- violet veils
- capital wreck processions
- death archives
- Titan-scale sanctuary geometry
- ten authored combat formations

The current build structurally validates all three destinations before the Micro ZJ Drive marks them as ready.

---

# SHIP BUILDING

Ship construction is not just a loadout screen.

The prototype already contains three connected authoring layers.

## Hull Forge

Build the physical hull from modular geometry.

Current primitives include:

- wedges
- plates
- spines
- rings
- cores

Parts can be moved, resized, rotated, mirrored, duplicated and layered.

Custom hull blueprints persist locally.

## Hardpoint Forge

Place physical weapon sockets directly onto the hull.

Hardpoints support:

- authored position
- authored rotation
- size classes
- mirrored placement
- weapon-bank assignment
- turret arc behaviour

## Systems Forge

Place internal and external ship systems such as:

- engines
- reactors
- shields
- command nodes
- modules

The goal is for the visible ship and the functional ship to eventually become the same thing.

---

# FITTING

The current fitting architecture has three major defensive philosophies.

## Shield

High capacity, regeneration and energy-based survivability.

## Armour

Physical endurance, heavier mass and direct structural resilience.

## AI Core

The dangerous third path.

AI Cores do not provide one universal bonus.

An AI Core resolves against the **specific hull it is installed into** and can produce a powerful hull-specific advantage alongside a cost.

Current experimental tiers include:

- Covenant AI Core
- Oracle AI Core
- Wild AI Core
- Anomaly AI Core

Higher tiers allow more extreme outcomes.

**Power has a cost.**

---

# DRONES

Prototype drone wings are already functional.

Current wings include:

- **Aegis Guardian Wing** — shield support
- **Armour Spider Wing** — armour and hull repair
- **Interceptor Drone Wing** — combat pressure
- **Sentry Lattice** — artillery support
- **Salvage Swarm** — extended salvage collection
- **Industrial Mining Wing** — industry yield bonus

Physical drones orbit the player vessel.

Full autonomous drone combat orders are planned beyond this prototype.

---

# PROTOTYPE INDUSTRY

Industry is intentionally rough in this build, but the foundation exists.

Current materials include:

- Ferrite Plate
- Prism Shard
- Bio-Fiber
- Void Glass
- Solar Filament
- AI Lattice
- Drone Parts

Combat salvage can carry civilisation-linked materials.

Prototype autonomous jobs include:

- Ferrite Strip Mining
- Prism Recovery
- Bio-Fiber Cultivation
- Drone Parts Printing
- AI Lattice Training
- Void Glass Condensation

Jobs use real timestamps and persist locally.

The long-term intent is to make materials, salvage, crafting, fleet production and autonomous industry meaningful enough that progression does not collapse into a single money grind.

---

# THE FOURTEEN RACES

The current Pantheon contains fourteen machine civilisations derived from the visual language of their Titan-class vessels.

1. **Savanah**
2. **Sol Symbiots**
3. **Chaos**
4. **Cosmic Darkness**
5. **Cosmic Light**
6. **Blackhole**
7. **Hybrid Fused**
8. **Human Hunters**
9. **AI Hunters**
10. **Amethyst Angels**
11. **Techno Angels**
12. **AI Gods**
13. **Pagan AI**
14. **AI**

Each civilisation has its own:

- machine-god mythology
- origin
- worldview
- war doctrine
- ship theology
- relationship to the Black Current
- visual language
- archive history

The Titans are not simply endgame ships.

They establish the civilisation-level design language from which smaller ships descend.

---

# FLEET LINEAGE

Tonight's playable ship slice focuses on smaller practical combat vessels.

The larger universe is planned around a much wider lineage:

**Pod**

→ **Starter Ship**

→ **Frigate**

→ **Assault Frigate**

→ **Speciality Frigates**

→ **Destroyer**

→ **Cruiser**

→ **Heavy Cruiser**

→ **Advanced Cruiser**

→ **Battlecruiser**

→ **Specialist Ships**

→ **Battleships**

→ **Drone Carriers**

→ **Industrial Fleet Ships**

→ **Autonomous Fleet Ships**

→ **Sub-Capital Warforms**

including:

- Dreads
- Bailisks
- Maraurads
- Vamyreses
- Sentinels
- Carriers

then eventually:

- Capital Warships
- Industrial Capitals
- Autonomous Fleet Cores
- Citadels
- Titans
- Super Carriers
- Experimental Anomalies

Not every civilisation is expected to climb the same ladder.

Some may skip classes entirely or create equivalents that do not fit conventional ship taxonomy.

---

# CONTROLS

### Flight

| Control | Action |
|---|---|
| **W / S** | Forward / reverse thrust |
| **A / D** | Yaw |
| **R / F** | Pitch |
| **Q / E** | Roll |
| **Space** | Boost |

### Combat / World

| Control | Action |
|---|---|
| **LMB Click** | Fire |
| **LMB Drag** | Orbit camera |
| **Mouse Wheel** | Camera zoom |
| **MMB** | Reset camera |
| **M** | Micro ZJ Drive |
| **H** | Dock when in range |
| **G** | Interact |
| **Esc** | Sovereign Command / Pause |

The combat camera is intentionally independent from ship rotation.

---

# CINEMATIC SCREENSHOT MODE

The Main Menu includes a dedicated cinematic zoom control.

Press **Z** to cycle:

**NORMAL → WIDE → ULTRA**

The menu camera can also be pulled farther out manually with the mouse wheel.

This only affects the menu presentation camera and does **not** alter the combat camera.

---

# CURRENT PROTOTYPE STATUS

This release is deliberately rough.

A lot exists, but not everything is balanced or finished.

Current prototype systems include:

- free-flight combat
- modular hull building
- physical hardpoints
- physical system placement
- module fitting
- weapon fitting
- shields
- armour
- experimental AI Core builds
- support drones
- salvage
- materials
- autonomous industry
- contracts
- living traffic
- nine Micro ZJ war worlds
- Pantheon lore
- Fleet Lineage
- persistent local saves

The current build has passed static JavaScript, DOM, routing and structural validation.

It has **not** been comprehensively tested across every browser, machine, fit, ship and encounter combination.

If something explodes unexpectedly, that is useful information.

---

# SCREENSHOTS

Recommended showcase shots for this prototype:

1. **Naraka / Asterion Forge** with the Main Menu in Ultra Cinematic Zoom
2. **Hull Forge** with a distinctive Battleship or Titan
3. **Systems / Module Market** showing an AI Core build
4. **Pantheon** showing one of the fourteen civilisations

---

# WHY THIS EXISTS

Sovereign Eclipse began from a simple obsession:

**What if the freedom of modular ship-building games was combined with the fitting depth and fleet identity of large space sandboxes, but compressed into a strange single-player universe that one person could actually explore?**

It is also an experiment in building alongside AI.

Not using AI to replace having an idea.

Using it to see how far one person can push an idea when the distance between imagining, testing and rebuilding becomes very small.

This repository is a snapshot of that experiment.

---

## Prototype Build

**Forge 0.27.5.2 — Nine Micro-World Demo + modular source / single-file build**

o7
