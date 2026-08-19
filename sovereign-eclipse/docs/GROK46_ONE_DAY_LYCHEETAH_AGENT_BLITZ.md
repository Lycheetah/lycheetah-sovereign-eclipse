# GROK 4.6 — ONE-DAY LYCHEETAH / SOVEREIGN ECLIPSE AGENT BLITZ

**Date:** 2026-08-19  
**Mission:** Extract the maximum engineering, architecture, QA, worldbuilding, balance, and documentation value from one day of Grok 4.6 access.

---

# 0. PRIME DIRECTIVE

Do **not** spend the day asking Grok isolated questions.

Use Grok as a **high-context senior agent** that receives large coherent packets, produces concrete artifacts, audits them, and then hands back patches/specifications.

The day is successful if it produces things that still matter after Grok 4.6 access is gone:

- working code patches
- validated architecture
- gameplay systems
- world definitions
- fleet doctrine tables
- balance models
- QA findings
- reusable prompts/specs
- Markdown design documents
- regression checklists

Conversation itself has zero value unless it produces one of those.

---

# 1. CURRENT SOVEREIGN ECLIPSE STATE TO GIVE GROK

Current browser game direction:

> Bubble Tanks build freedom + EVE-style fitting/ship classes + heavyweight dreadnought combat + compact explorable universe.  
> Not an MMO. A small but deep single-player capital-ship sandbox.

Current major systems:

- unified combat HUD
- protected free-flight camera
- inertia-based movement
- modular hull / hardpoint / systems authoring
- 14 canonical AI civilisations
- 252 generated hull definitions across 18 class families
- per-race fleet signatures
- powergrid and mass fitting
- weapon market
- real DPS / ROF / volley / capacitor analytics
- nonlinear capacitor recharge
- active shield and armour modules
- damage-control system
- shield → armour zone → penetration → structure → internal systems damage
- crippled states
- persistent wrecks
- salvage condition value
- research tree
- blueprint unlocks
- material manufacturing
- persistent shipyard jobs
- drones
- AI cores
- Aether Crucible authored Micro-ZJ mini-campaign
- Black Sun March / Grave Choir structural worlds
- Naraka / Erebos / Aion / Chaos macro-zone canon

Protected camera controls:

- W/S thrust
- A/D local yaw
- R/F pitch
- Q/E roll
- Space boost
- LMB orbit / click-fire behavior
- wheel zoom
- MMB reset
- C reset behind ship
- RMB intentionally inert

**Do not rewrite combat camera architecture.**

Protected UI principle:

> One controller owns screen / HUD visibility.  
> Main menu, station, codex, fleet lineage, combat and Micro-ZJ overlays must never leak into each other.

---

# 2. THE ONE-DAY STRATEGY

## WAVE I — INGEST + RUTHLESS AUDIT
**Goal:** Make Grok understand the actual game rather than hallucinating a new one.

Upload:

1. latest HTML build
2. current handoff / design notes
3. optional screenshots showing UI / ship visuals

Prompt Grok to:

- read the whole HTML before proposing changes
- map runtime architecture
- identify highest-risk regressions
- identify fake/dead systems
- identify systems that exist but do not meaningfully affect gameplay
- identify duplicated authorities
- identify progression dead ends
- identify balance exploits
- identify performance risks
- identify UI states likely to leak
- rank issues by:
  1. game-breaking
  2. loop-breaking
  3. depth-breaking
  4. polish

**Artifact required:** `GROK46_SOVEREIGN_ECLIPSE_DEEP_AUDIT.md`

Do not let Grok begin a rewrite until this audit is complete.

---

# 3. WAVE II — FLEET FITTING ARCHITECTURE

This is the immediate engineering priority.

## Objective

Make 252 hull definitions mechanically meaningful rather than merely existing in a registry.

Grok should design and/or implement:

### A. Per-class fitting envelopes

For every class:

- allowed weapon tier
- number of banks
- physical hardpoint count
- module architecture capacity
- powergrid
- base mass
- capacitor reserve
- capacitor recharge
- drone bandwidth
- drone bay capacity
- AI-core compatibility
- active module capacity
- utility specialization
- intended range band
- intended mobility band

Classes:

1. Pod
2. Starter
3. Frigate
4. Assault Frigate
5. Speciality Frigate
6. Destroyer
7. Cruiser
8. Heavy Cruiser
9. Advanced Cruiser
10. Battlecruiser
11. Specialist Warship
12. Battleship
13. Drone Carrier
14. Industrial Fleet Ship
15. Autonomous Fleet Core
16. Dreadnought
17. Carrier
18. Titan

### B. Role restrictions without arbitrary hard-lock spam

Prefer natural constraints:

- insufficient socket size
- insufficient PG
- mass penalty
- poor capacitor stability
- limited drone bandwidth
- AI-core strain
- tracking limitations
- range doctrine

Use explicit class locks only where physically required.

### C. Build identity

Examples:

- Assault Frigate: compact high-pressure brawler
- Specialist Frigate: scan / EWAR / support
- Destroyer: anti-small kinetic warship
- Heavy Cruiser: line-tank attrition ship
- Advanced Cruiser: precision mobility
- Battlecruiser: oversized-gun compromise
- Drone Carrier: autonomous wing platform
- Industrial: salvage / fabrication / logistics
- Autonomous Core: AI-heavy command hull
- Dreadnought: siege
- Carrier: fleet-support capital
- Titan: civilisation-scale apex hull

### D. Fitting metrics

Module / weapon UI should derive:

- paper DPS
- effective DPS at range
- volley
- fire rate
- tracking
- optimal
- falloff
- penetration
- shield pressure
- armour pressure
- structure pressure
- internal damage
- weapon cap/s
- active tank HP/s
- active tank cap/s
- passive regeneration
- capacitor equilibrium
- time-to-dry if unstable
- speed
- acceleration
- turn authority
- total PG
- PG remaining
- total mass
- handling penalty
- drone bandwidth used / available

**Artifact required:** code patch + `FLEET_FITTING_ARCHITECTURE.md`

---

# 4. WAVE III — THE 20-DESTINATION BLACK CURRENT

Do **not** build twenty copies of a wave arena.

Create one coherent navigable network.

Minimum target:

## NARAKA
1. Asterion Forge
2. Aether Crucible
3. Pilgrim Halo
4. Cinder Relay
5. Black-Sun Threshold

## EREBOS
6. Helios Bastion
7. Black Sun March
8. Cold Cathedral
9. Mirror Well
10. Bone Ring

## AION
11. Orison Vault
12. Archive Echo
13. Crown Fracture
14. Luminous Foundry

## CHAOS
15. Wildgate Spindle
16. Chaos Carnival
17. Shard Spiral
18. Laughing Maw

## DEEP BLACK CURRENT
19. Grave Choir
20. Experimental Anomaly

Each destination must declare:

- macro region
- coordinates / navigation node
- destination type
- visual identity
- controlling civilisation/faction
- hostility level
- station availability
- services
- research evidence
- materials
- shipyard tier
- contracts
- encounters
- discoveries
- unlock condition
- return route
- unique reason to visit

Destination types should vary:

- inhabited station
- fleet shipyard
- battlefront
- industrial field
- graveyard
- archive
- anomaly
- resource field
- pilgrimage site
- hostile fortress
- boss arena
- research installation

**Artifact required:** `BLACK_CURRENT_20_DESTINATION_ATLAS.md`

If implementation time allows, create registry + navigation/map code rather than hand-authoring all world geometry.

---

# 5. WAVE IV — STATION NETWORK

Make stations economically meaningful.

Define station service capabilities rather than giving every station every button.

Possible services:

- docking
- repair
- fitting
- general market
- weapon market
- module market
- hull shipyard
- frigate manufacturing
- cruiser manufacturing
- capital manufacturing
- drone fabrication
- research
- AI-core analysis
- wreck reverse engineering
- material refinery
- black-current material processing
- contract board
- storage
- fleet command

Example identity:

### ASTERION FORGE
General starter hub.
Broad low/mid-tier services.

### HELIOS BASTION
Military armour shipyard.
Heavy hulls and capital ordnance.

### ORISON VAULT
Ancient research archive.
Aion technology and advanced cognition.

### BLACK-SUN FACILITY
Singularity systems / stealth / siege research.

### GRAVE CHOIR OSSUARY
Reverse engineering dead capital systems.

Station selection should matter to progression.

**Artifact required:** station registry + `STATION_NETWORK_SPEC.md`

---

# 6. WAVE V — CIVILISATION DOCTRINE

Use the fourteen canonical races.

1. Savanah
2. Sol Symbiots
3. Chaos
4. Cosmic Darkness
5. Cosmic Light
6. Blackhole
7. Hybrid Fused
8. Human Hunters
9. AI Hunters
10. Amethyst Angels
11. Techno Angels
12. AI Gods
13. Pagan AI
14. AI

For every civilisation define:

- combat philosophy
- preferred range
- defence philosophy
- preferred weapon families
- preferred module architecture
- preferred ship classes
- classes they deliberately under-invest in
- drone philosophy
- AI-core philosophy
- industry philosophy
- signature technology
- signature hero hulls
- station architecture
- salvage/material identity
- battlefield AI behavior

Do **not** make fourteen symmetrical tech trees.

A civilisation becomes interesting partly through what it **cannot or does not choose to do**.

**Artifact required:** `14_CIVILISATION_FLEET_DOCTRINES.md`

---

# 7. WAVE VI — HERO HULL SELECTION

Do not handcraft all 252 hulls.

Select approximately 42–56 hero hulls.

Target ~3–4 priority ships per civilisation.

Each hero hull gets:

- unique name
- class
- lore
- intended fit
- physical silhouette concept
- hardpoint layout
- internal systems layout
- racial bonus
- meaningful weakness
- signature module or weapon relationship
- manufacturing recipe
- research requirement

Generated hulls remain valid background roster.

Hero hulls become the actual authored progression landmarks.

**Artifact required:** `HERO_HULL_ROSTER.md`

---

# 8. WAVE VII — ENEMY FLEET DOCTRINE AI

Current damage model already supports capability loss.

Exploit it.

Roles:

- interceptor
- brawler
- artillery
- skirmisher
- repair/support
- sentinel
- carrier
- command
- siege
- hunter
- retreating cripple
- salvage opportunist

Fleet logic should consider:

- ideal range
- current armour facing
- breached zones
- disabled engines
- reactor health
- weapon health
- allied support
- target speed
- player fitting profile

Examples:

- artillery backs away
- brawler closes
- crippled ships disengage
- support vessels protect damaged capitals
- carriers remain behind screens
- interceptors attack drive systems
- siege ships attack armour zones
- salvagers enter after combat

**Artifact required:** implementation plan/code + `FLEET_DOCTRINE_AI.md`

---

# 9. WAVE VIII — BLACK SUN MARCH

Only after the generic systems are solved.

Make it mechanically distinct from Aether Crucible.

Identity:

- long-range warfare
- spectral singularity overhead
- shadow geometry
- wrecked pilgrimage megastructures
- artillery lanes
- sensor loss / occlusion
- sniper / siege fleets
- low-cover open engagements
- gravitational danger

Use current damage / fitting system:

- punish slow brick fits
- reward long-range counters
- make capacitor and mobility choices matter
- rare Blackhole research evidence

**Artifact required:** implementation patch + `BLACK_SUN_MARCH_CAMPAIGN.md`

---

# 10. WAVE IX — GRAVE CHOIR

Identity:

- dead capital graveyard
- ossuary megastructures
- violet fog
- battleship / dread escalation
- dead Titan at deepest point
- wreck archaeology
- Pagan AI / Amethyst / ancient machine technologies

Gameplay:

- slower and heavier
- preserve wrecks for research
- ambushes between dead capitals
- rare subsystem salvage
- boss or dormant Titan-core encounter

**Artifact required:** implementation patch + `GRAVE_CHOIR_CAMPAIGN.md`

---

# 11. WAVE X — RELEASE QA

This should be one of the final Grok sessions of the day.

Give Grok the newest HTML produced after all earlier work.

Tell it to behave as a hostile release engineer.

Required checks:

## BOOT
- module syntax
- duplicate IDs
- missing DOM refs
- initialization ordering
- save migration

## UI
- menu contains only menu
- station contains only station
- lore scroll works
- pantheon scroll works
- fleet screen scroll works
- combat HUD appears only in combat
- Micro-ZJ overlay does not steal background input incorrectly

## FLIGHT
- movement controls preserved
- camera preserved
- docking only manual
- undock fail-open
- no auto docking on exceptions

## COMBAT
- target acquisition
- firing
- capacitor drain
- active tanking
- module bonuses
- armour facing
- penetration
- subsystem damage
- crippled states
- damage control
- wreck creation
- salvage

## PROGRESSION
- research data
- research unlock
- blueprint gates
- material cost
- hull manufacture
- ship ownership
- save/reload persistence

## WORLD
- Naraka
- Aether Crucible
- Black Sun
- Grave Choir
- destination travel
- return route

Required output:

1. blocker list
2. exact code locations
3. patch
4. regression checklist
5. “release / do not release” verdict

**Artifact required:** `GROK46_FINAL_RELEASE_AUDIT.md`

---

# 12. CALL-EFFICIENCY RULES

Because access is precious:

## DO

- upload the latest full HTML rather than paste fragments
- make each prompt demand multiple related outputs
- ask Grok to inspect before editing
- request exact patches
- request complete changed functions
- request machine-readable tables where useful
- request Markdown handoff files
- request a validation checklist with every code change
- maintain one primary engineering thread with full context
- use separate specialist threads only for independent architecture / balance / QA

## DO NOT

- ask “what should we do next?” repeatedly
- request motivational feedback
- spend calls debating names
- regenerate plans Grok already wrote
- use Grok for basic copy editing
- let it rewrite protected camera/UI architecture without a reproduced bug
- accept “implemented” unless it shows exact changed code or returns a complete artifact

---

# 13. THREAD STRUCTURE

Use roughly five persistent Grok threads.

## THREAD A — LEAD ENGINEER
Latest HTML always lives here.

Purpose:
- code
- patches
- runtime architecture
- integration

## THREAD B — GAME SYSTEMS ARCHITECT
Purpose:
- fitting
- progression
- economy
- research
- ship roles
- station rules

## THREAD C — WORLD / CIVILISATION DIRECTOR
Purpose:
- destinations
- stations
- civilisations
- hero hulls
- campaigns
- lore tied to mechanics

## THREAD D — BALANCE / MATH
Purpose:
- DPS
- TTK
- capacitor
- active tank
- penetration
- PG
- mass
- progression prices
- economy simulation

## THREAD E — RUTHLESS QA
Purpose:
- regression hunt
- exploit hunt
- UI state leakage
- runtime failure modes
- release verdict

Do not make ten shallow threads.

---

# 14. ORDER OF ATTACK FOR TODAY

If time / usage is limited, prioritize in this order:

1. Deep audit of latest HTML.
2. Fleet Fitting Architecture.
3. 20-destination registry / navigation architecture.
4. Station registry and service rules.
5. Civilisation doctrine.
6. Hero hull roster.
7. Fleet doctrine AI.
8. Black Sun March.
9. Grave Choir.
10. Final QA of whatever was actually integrated.

The first four create infrastructure.
The next three create identity.
The final three create playable content and reliability.

---

# 15. MASTER GROK 4.6 PROMPT

Copy this into the **primary engineering thread**, attach the latest HTML, and attach this plan.

---

You are joining an existing browser game as a senior game-engine / systems engineer.

The project is **Sovereign Eclipse**, part of the Lycheetah ecosystem.

Your job is NOT to redesign the project from scratch. Your job is to understand the existing single-file HTML runtime deeply, preserve proven systems, identify weak architecture honestly, and increase playable depth without regression.

TARGET GAME:

Bubble Tanks build freedom + EVE-style fitting/ship classes + heavyweight dreadnought combat + a compact explorable universe.

This is a single-player browser capital-ship sandbox, not an MMO.

CURRENT PROTECTED SYSTEMS:

- combat camera is considered solved and must not be rewritten without a reproduced bug
- W/S thrust
- A/D local yaw
- R/F pitch
- Q/E roll
- Space boost
- one-controller UI visibility authority
- manual docking only
- fail-open undock
- unified combat HUD
- 14 canonical civilisations
- authored hull/hardpoint/system blueprint systems
- damage anatomy:
  shield → local armour → penetration → structure → physical subsystem damage
- research / blueprint / manufacturing progression
- fitting PG / mass / capacitor
- Aether Crucible authored war world

CURRENT SCALE:

- 14 civilisations
- 18 ship classes
- 252 generated hull definitions
- module / weapon market
- nonlinear capacitor
- active tank modules
- AI cores
- drones
- persistent industry
- research tree
- Micro-ZJ world loading

OPERATING RULES:

1. Read the entire supplied HTML before proposing structural changes.
2. Do not fabricate systems that are not present.
3. Distinguish:
   - working runtime behavior
   - structurally present but unverified behavior
   - dead / fake / cosmetic behavior
4. Preserve proven camera and UI authority.
5. Prefer extending existing registries and functions over parallel replacement systems.
6. Every new mechanic should answer at least one:
   - does this improve combat?
   - does this make exploration matter?
   - does this make a civilisation feel different?
7. No giant rewrite unless you can prove the existing architecture requires it.
8. If changing code:
   - identify exact existing function
   - explain failure / limitation
   - provide complete replacement function or precise patch
   - state regression risk
   - provide validation tests
9. Do not claim runtime testing unless you actually executed it.
10. Be ruthless. If something is structurally bad, say so.

FIRST TASK:

Perform a deep architecture and gameplay audit of the attached latest HTML.

Map:

- boot path
- app modes/screens
- combat frame loop
- camera
- player flight
- targeting
- weapons
- capacitor
- modules
- damage anatomy
- drones
- AI cores
- enemies
- world actors
- Micro-ZJ worlds
- research
- industry
- fleet catalog
- persistence/save migration
- station/hangar/module/hardpoint/hull/system UI

Then identify:

A. game-breaking risks  
B. systems that exist but do not yet have meaningful gameplay consequences  
C. duplicated or conflicting authorities  
D. likely progression exploits/dead ends  
E. performance risks  
F. highest-leverage next engineering work

Do not implement anything yet.

Return one rigorous artifact titled:

`GROK46_SOVEREIGN_ECLIPSE_DEEP_AUDIT.md`

End it with:

- TOP 10 FIXES
- TOP 10 DEPTH OPPORTUNITIES
- THINGS THAT MUST NOT BE REWRITTEN
- RECOMMENDED IMPLEMENTATION ORDER

Once that audit is accepted, you will be used as one of several coordinated engineering agents for the remainder of the day.

---

# 16. SPECIALIST PROMPT — BALANCE / MATHEMATICS

Attach current HTML and ask:

> Build a mathematical balance model from the actual constants in this file. Do not invent abstract values before extracting the runtime values.

Require:

- per-class base durability
- effective durability by tank type
- DPS per weapon family
- ideal-range DPS
- tracking-adjusted DPS against 3 target sizes
- cap/s
- capacitor equilibrium
- active tank HP/s
- active tank cap efficiency
- TTK matrix
- PG efficiency
- mass efficiency
- salvage/hour implications
- manufacturing progression pressure
- outliers
- dominant strategies
- useless modules

Output:
`SOVEREIGN_ECLIPSE_BALANCE_MODEL.md`

---

# 17. SPECIALIST PROMPT — QA

Attach the **latest integrated build**, not an old one.

Prompt:

> Assume another engineer claims this file is ready to publish. Prove them wrong.

Demand:

- syntax audit
- DOM audit
- initialization audit
- screen-authority audit
- save migration audit
- state machine audit
- fitting exploit audit
- damage exploit audit
- world transition audit
- industry exploit audit
- progression soft-lock audit
- exact patches for confirmed defects only

Never let QA invent speculative redesign work.

---

# 18. DEFINITION OF SUCCESS

At the end of Grok day, Sovereign Eclipse should have:

- a stronger fitting architecture
- a validated 252-hull registry
- a real 20-destination universe registry
- distinct stations
- coherent research provenance
- meaningful civilisation doctrine
- selected hero hulls
- improved enemy fleet roles
- at least one additional authored war world OR a ready implementation spec
- one hostile release audit
- multiple Markdown handoff artifacts preserving all knowledge

Even if only half gets integrated, the day is successful if Grok leaves behind architecture and implementation work that can be continued by GPT / Claude / local agents afterward.

---

# FINAL RULE

**Do not spend premium intelligence generating disposable conversation.  
Make it leave fossils.**

Every major Grok session ends with:
- code
- a patch
- a table
- a spec
- a test
- or a Markdown artifact.

If none exists, the session was wasted.
