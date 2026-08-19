
Skip to content

    Lycheetah
    lycheetah-sovereign-eclipse

Repository navigation

    Code
    Issues
    Pull requests
    Agents
    Actions
    Projects
    Security and quality
    Insights
    Settings

    lycheetah-sovereign-eclipse

/README(20260819-120959).md
tT
Lycheetah
Lycheetah
Add files via upload
1298102
 · 
now

    lycheetah-sovereign-eclipse

/README(20260819-120959).md

571 lines (360 loc) · 13.4 KB
Sovereign Eclipse

    The light you carry is not given; it is earned.

Sovereign Eclipse is an experimental single-player capital-ship sandbox built around exploration, modular fitting, physical hardpoints, research, manufacturing, living civilisations and authored regional progression.

The goal is simple:

Bubble Tanks-style build freedom + EVE-style fitting and ship classes + heavyweight capital combat + a compact explorable universe.

This is not an MMO.

It is a small, dense, browser-playable sovereign starship sandbox being forged system by system.
Current Release
Forge 0.29.1a — Helios Bastion War-Forge + Startup Fix

The current build contains a complete first-region gameplay loop in Naraka Veil and the beginning of the second major region, Erebos Reach.

The latest forge adds:

    Helios Bastion War-Forge
    specialist heavy-hull and capital-ship support
    new Erebos research branches
    manufacture-first far-side hardware
    phase-resistant fittings
    capital armour and siege systems
    Helios-specific fabrication requirements
    capital drydock architecture
    structural startup fixes for JavaScript lexical TDZ issues

The game remains a prototype, but it is now much closer to a compact playable world than a collection of isolated systems.
What Is In The Game
Naraka Veil — First Complete Region

Naraka now has a full 7 / 7 regional progression structure.

The major roles are:

    Asterion Forge — home city / command / fitting / manufacturing
    Aether Crucible — repeatable combat / PvE blitz
    Cinder Relay — infrastructure quest
    Naraka Resource Belt — expedition resource geography
    Pilgrim Halo — research / exploration
    Black-Sun Threshold — hostile edge environment
    Aether Pillar Gate — interconnector into the deeper galaxy

Completion now requires actually completing each role rather than simply visiting it.
Cinder Relay

The first persistent authored infrastructure quest.

The chain is:

Restore Relay → Recover Log Core → Scan Convoy 03A → Recover Telemetry → Reveal Ash Route → Calibrate Anchor → Synchronise Relay

Finishing the route permanently changes Naraka.

The restored Ash Route becomes physically visible, freight returns, patrol traffic appears and Cinder Relay becomes a functioning piece of the world rather than a disposable quest marker.
Aether Crucible

The Naraka destination for players who simply want to fight.

Three selectable difficulties:

    Skirmish
    Crucible
    Sovereign

Five distinct battlefield sites:

    Intake Gantry
    Furnace Heart
    Root Foundry
    Slag Procession
    Severed Crown

Ten escalating formations use different combat behaviours rather than only different names.

Interceptors close aggressively. Plate formations carry reinforced armour. Shield pressure, regeneration, kinetic range pressure and capital formations each behave differently.

Difficulty scales enemy pressure, formation density, furnace hazards and payout.
Pilgrim Halo

Pilgrim Halo is deliberately not another wave arena.

It is a four-part research pilgrimage:

    Golden Approach
    Sol Concordance Reliquary
    Glass Choir Correction Array
    Ascension Halo

The space is inhabited by neutral and friendly pilgrim traffic from the Sol Symbiots, Cosmic Light and Techno Angels.

Combat exists as an optional Covenant Test, but combat is never required to complete the exploration route.
Asterion Living Civilisations

All 15 civilisations now physically inhabit Asterion space.

The central rule is:

    Race ≠ Alignment

A civilisation determines why a vessel is present.

Its actual local role determines whether it is friendly, neutral or hostile.

Current Asterion presences include:

    Savanah — Verdant Scouts
    Sol Symbiots — Concordance Envoys
    Chaos — Adapter Brokers
    Cosmic Darkness — Noctis Astronomers
    Cosmic Light — Radiant Pilgrims
    Blackhole — Horizon Engineers
    Hybrid Fused — Wreck Surgeons
    Human Hunters — Frontier Freighters
    AI Hunters — Red Auditors
    Amethyst Angels — Violet Archivists
    Techno Angels — Glass Choir Engineers
    AI Gods — Oath Stewards
    Pagan AI — Ancestor Wreck Crews
    Pure AI — Consensus Logistics
    AI Human Gods — Embodied Envoy

Asterion also contains shared trade, pilgrimage, audit, salvage and edge-survey traffic corridors.
Erebos Reach

Erebos begins after Naraka.

It is not simply a harder version of the first region.

Its core rule is:

    Unanchored space cannot be trusted.

Phase Stability

Ships travelling through Erebos maintain a Phase Stability value based on distance from trusted spatial anchors.

Current bands:

    Anchored
    Drift
    Echo
    Far-Side Shear

Low stability does not directly destroy the hull.

Instead, severe instability taxes capacitor systems and forces the player to decide whether to push deeper, return to an anchor or refit the ship.

Existing fitting axes matter here:

    AI Integrity
    Environment Tolerance

Both improve resistance to phase drift.

There is no hard equipment gate.
Erebos First Descent

The first authored Erebos chain is:

    Dock at Helios Bastion
    Synchronise Violet Observatory
    Read the Shattered Procession
    Align the Phase Beacon
    Lock the Cold Cathedral into a stable reference frame

Completing the chain establishes the Far-Side Spine and stabilises access toward the next interconnector.

One of the first recovered Erebos truths:

    The convoy did not lose its route. The route lost consensus around the convoy.

Helios Bastion War-Forge

Helios is not Asterion with different lighting.

Its doctrine is:

    Helios does not make every ship better. It makes heavy ships cheaper to keep alive.

Heavy hull classes receive specialist Helios support:

    battlecruisers
    battleships
    drone carriers
    dreadnoughts
    carriers
    titans

Helios can reduce heavy-hull manufacturing time and repair cost as deeper far-side knowledge is earned.
Helios Research

Current specialist theories:

    Far-Side Anchor Engineering
    Helios Bastion Doctrine
    Far-Side Siege Systems

These require Erebos provenance and cannot simply be researched safely from Asterion.
Helios Hardware

Current manufacture-first systems:

Far-Side Anchor Lattice

    improves phase-drift resistance
    improves Environment Tolerance
    improves capacitor recharge
    slightly reduces maximum velocity

Helios Bastion Laminate

    major armour increase
    structure increase
    improved damage control
    extremely heavy

Far-Side Siege Bus

    increased turret damage
    reduced weapon capacitor pressure
    reduced firing cadence
    designed for deliberate capital volleys

These are physical industrial products.

Research unlocks the blueprint.

Industry builds the thing.
Fleet

The current generated fleet architecture contains:

15 civilisations × 18 ship classes = 270 generated hull definitions

Current class ladder:

    Pod
    Starter
    Frigate
    Assault Frigate
    Specialist Frigate
    Destroyer
    Cruiser
    Heavy Cruiser
    Advanced Cruiser
    Battlecruiser
    Specialist Ship
    Battleship
    Drone Carrier
    Industrial
    Autonomous
    Dreadnought
    Carrier
    Titan

The Titan is not intended to mean merely "largest ship".

Within Sovereign Eclipse:

    A Titan is a civilisation made mobile.

Fitting

The fitting philosophy is physical.

    NODE = HARDPOINT = GUN

A hardpoint is not an abstract inventory slot.

It owns:

    its physical socket
    transform
    fire-control identity
    fitted weapon
    powergrid requirement
    mass contribution

The current interface follows:

    SELECT → INSPECT → COMPARE → COMMIT

The same principle is used across fleet selection, weapons, modules, research and industry.
Expedition Economy

The current economic loop is:

Scan → Discover → Extract → Expedition Hold → Dock → Offload → Research → Manufacture → Refit → Return

Ships have different expedition cargo capacities.

Resource-specialist hulls and support systems can improve extraction or carrying capacity.

Current Naraka resource geography includes:

    Ferric Seam
    Veilglass Scar
    Solar Filament Eddy

Materials feed actual industrial recipes rather than only increasing a generic currency counter.
Sovereign Scanner

The scanner uses a persistent information-state model.

A signal moves through:

Undetected → Detected → Known → Scanned → Understood → Resolved

The game attempts to respect a simple epistemic rule:

    The player knows what the player has actually learned.

Unknown signals are not automatically displayed as exact coordinates simply because the game engine internally knows where they are.
Research + Industry

Core doctrine:

    Knowledge unlocks the blueprint. Industry builds the thing.

Research can require:

    prior theories
    Research Data
    regional evidence
    station provenance
    actual exploration progress

Manufacturing can require:

    materials
    specialist stations
    physical build queues
    prior research
    real elapsed build time

The industry queue persists by timestamp.
Damage + Combat Philosophy

The intended combat rule is:

    Damage should remove capability before it removes existence.

Ships contain internal combat anatomy and critical systems.

The larger goal is for damage to increasingly affect:

    weapons
    propulsion
    reactor performance
    AI systems
    defensive capability

before a ship simply becomes an exploding health bar.
Controls
Flight
Input 	Action
W / S 	Forward / reverse thrust
A / D 	Yaw
R / F 	Pitch
Q / E 	Roll
Space 	Boost
LMB 	Fire
LMB drag 	Orbit camera
Mouse wheel 	Camera zoom
MMB 	Camera reset
C 	Camera behind ship
Tab 	Cycle target
H 	Dock
M 	Black Current Atlas
N 	Sovereign Scanner
G 	Context interaction / analysis / recovery
Esc 	Pause

Camera and flight have been treated as protected systems after reaching the current handling model.
How To Run

The current release is a standalone HTML build.

Open the latest .html release in a modern desktop browser.
Internet connection currently required

The standalone build loads Three.js from jsDelivr, so the HTML requires internet access when opened.

If the game fails immediately, make sure the browser can reach the CDN.

No installation or account is required for the standalone prototype itself.
Save Data

Progress is stored locally in the browser.

Current persistent systems include:

    fleet ownership
    fittings
    research
    manufacturing jobs
    expedition materials
    scanner discoveries
    region progression
    Cinder Relay restoration
    Pilgrim Halo archives
    Aether Crucible clear counts
    Asterion power
    Erebos First Descent
    Helios research and hardware

Prototype saves may occasionally require migration as systems are still changing.
Current Development Direction

Naraka is now considered structurally complete enough to stop feature-spamming it.

Current focus:

    deepen Erebos Reach
    make Helios a true capital war-forge
    build Erebos-native combat / exploration / resource geography
    continue toward Aion and the wider Ancient Route network
    keep regional mechanics meaningfully different
    improve capability damage and capital combat
    continue ruthless usability and progression QA

The aim is not to make every region contain the same checklist with different colours.

Each region should change what the player must understand, build or survive.
Galactic Structure

Current long-term macro regions include:

    Naraka Veil
    Erebos Reach
    Aion
    Chaos Cradle
    Deep Current

The oldest reliable objects in the setting are not governments or civilisations.

    The oldest reliable objects in the galaxy are roads.

Ancient gates, gravitational tunnels, route pillars and dead navigation infrastructure form the skeleton of the larger world.
Pantheon

The 15 civilisations each carry a different relationship to sovereignty, technology, embodiment, identity and power.

Their god-forms are not intended to be literal commands every citizen obeys.

    The god-form is not a command every citizen obeys. It is the question the civilisation has spent centuries learning how to ask.

Development Status

Experimental / actively forged / not finished.

Expect:

    incomplete balancing
    missing polish
    changing systems
    prototype UI edges
    browser-specific bugs
    save migrations
    occasional spectacular failure

The project is being built in public because watching the systems become coherent is part of the point.
Philosophy

Sovereign Eclipse is built around a broader idea of sovereignty:

Sovereignty is not dominion.

It is the integrity of a boundary strong enough to enter relationship without becoming extraction.

In gameplay terms that becomes:

    ships with physical architecture
    information that must be earned
    fitting choices with consequences
    worlds that remember what the player changes
    civilisations with roles rather than alignment stereotypes
    research tied to evidence
    progression tied to actual experience

And ultimately:

    The light you carry is not given; it is earned.

Lycheetah

Built under Lycheetah.

LYCHEETAH → ∞

Sovereign Eclipse is an independent experimental game project currently under active development.
