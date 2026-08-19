#!/usr/bin/env python3
"""Rewrite src/main.js to import extracted modules. Source is main.js.precut."""
from pathlib import Path

root = Path("/home/guestpc/sovereign-eclipse")
src = (root / "src/main.js.precut").read_text()
lines = src.splitlines(keepends=True)

# 1-based inclusive ranges to drop (replaced or imported).
DROP = [
    (1177, 1177),  # GAME_SAVE_KEY
    (1326, 1489),  # defaultSettings + load merge
    (1684, 1686),  # saveSettings
    (2808, 2928),  # banks + CLASS_CATALOG
    (2930, 2938),  # RACE + aliases
    (2942, 2942),  # PANTHEON
    (3049, 3197),  # orders + catalog + fleets + sandbox
    (3416, 3420),  # capacitor profiles + capacitorProfile
    (3422, 3434),  # TURRET_CATALOG
    (3439, 3460),  # RESEARCH_PROJECTS
    (3566, 3592),  # materials / drones / industry
    (7179, 7227),  # MODULE_CATALOG + runtime
    (7742, 7829),  # WORLD..ZONE_WORLD
    (8674, 8945),  # three zone builders
    (9581, 9603),  # PORTAL_LINKS
    (10003, 10122),  # CONTRACTS
    (10124, 10248),  # MICRO_ZJ_BATTLE_ZONES
    (11502, 11544),  # enemy catalogs
    (11972, 11984),  # DAMAGE_PROFILES + WEAPON_GROUPS
    (12217, 12288),  # WEAPON_ANATOMY
]

drop = set()
for a, b in DROP:
    drop.update(range(a, b + 1))

IMPORTS = """import { BANK_IDS, BANK_LABELS, BANKS_BY_COUNT, CLASS_CATALOG } from './ships/classes.js';
import {
  RACE_CATALOG, LEGACY_RACE_ALIASES, PANTHEON_CODEX,
  CLASS_ORDER, RACE_ORDER, PLAYER_CLASS_ORDER,
  LEGACY_CLASS_NAME_INDEX, RACE_HULL_ROOT, CLASS_NAME_SUFFIX, RACE_FLEET_SIGNATURES
} from './ships/races.js';
import {
  generatedHullName, createFleetCatalog, FRAME_CATALOG,
  HULL_CLASS_PRICE, HULL_CLASS_TIER,
  POD_FLEET, STARTER_FLEET, DESTROYER_FLEET, BATTLESHIP_FLEET, TITAN_FLEET,
  PLAYER_SANDBOX_CLASSES
} from './ships/catalog.js';
import { TURRET_CATALOG } from './ships/weapons.js';
import { MODULE_CATALOG, MODULE_RUNTIME } from './ships/modules.js';
import { RESEARCH_PROJECTS } from './progression/research.js';
import { MATERIAL_CATALOG, DRONE_CATALOG, INDUSTRY_RECIPES } from './progression/materials.js';
import { CAPACITOR_CLASS_PROFILES, capacitorProfileFor } from './combat/capacitor.js';
import { DAMAGE_PROFILES, WEAPON_GROUPS, WEAPON_ANATOMY } from './combat/damage.js';
import { ENEMY_CLASS_CATALOG, ENEMY_RACE_DOCTRINES, CONTRACT_ENEMY_RACES } from './combat/enemies.js';
import { GAME_SAVE_KEY, defaultSettings, persistSettings, loadSettings } from './core/save.js';
import {
  WORLD, EREBOS, CHAOS, AION, SECTOR_META, ZONE_WORLD,
  PORTAL_LINKS, CONTRACTS, MICRO_ZJ_BATTLE_ZONES, bindPortalSettings
} from './world/destinations.js';
import { loadZone } from './world/zone-registry.js';
import { buildAetherCrucibleWorld as buildAetherCrucibleFromZone } from './zones/naraka/aether-crucible.js';
import { buildBlackSunMarchWorld as buildBlackSunFromZone } from './zones/erebos/black-sun-march.js';
import { buildGraveChoirWorld as buildGraveChoirFromZone } from './zones/deep-current/grave-choir.js';

"""

# Insert imports after the last THREE import (line 9)
out = []
inserted = False
for i, line in enumerate(lines, 1):
    if not inserted and i == 10:
        out.append("\n")
        out.append(IMPORTS)
        inserted = True

    if i in drop:
        continue
    out.append(line)

text = "".join(out)

# After `try{` (the big one), inject settings load. Original line 114.
# After our insert, find `try{\n` that precedes renderer setup.
needle = "try{\n"
idx = text.find(needle)
if idx < 0:
    raise SystemExit("could not find try{")
# The first try{ is the boot try. Insert after it.
insert_at = idx + len(needle)
boot = (
    "  let settings=loadSettings();\n"
    "  bindPortalSettings(settings);\n"
    "  function saveSettings(){ persistSettings(settings); bindPortalSettings(settings); }\n"
    "  function capacitorProfile(frameId=settings.selectedShip){\n"
    "    const f=FRAME_CATALOG[frameId]||FRAME_CATALOG.savanah_starter;\n"
    "    return capacitorProfileFor(f);\n"
    "  }\n"
    "  function zoneBuildCtx(){\n"
    "    return {\n"
    "      THREE, WORLD, microWorldGroups, worldAssetGroups,\n"
    "      addMesh, addBillboardGlow, box, wedge, cyl,\n"
    "      createNavBeacon, createIndustrialPlatform, createLycheetahReliquary,\n"
    "      createServiceLane, createVeilChoir, createWorldRockField,\n"
    "      createSpectralBlackSun, createBlackSunCrown, createCelestialVeil, createWreckCluster,\n"
    "      glowAmber, glowCyan, glowGreen, glowPurple, glowRed,\n"
    "      matArmorDark, matFerric, matGold, matOrganic, matVanta, matBone\n"
    "    };\n"
    "  }\n"
    "  function buildAetherCrucibleWorld(){ return buildAetherCrucibleFromZone(zoneBuildCtx()); }\n"
    "  function buildBlackSunMarchWorld(){ return buildBlackSunFromZone(zoneBuildCtx()); }\n"
    "  function buildGraveChoirWorld(){ return buildGraveChoirFromZone(zoneBuildCtx()); }\n"
)
text = text[:insert_at] + boot + text[insert_at:]

# startNewSovereignGame rebinds settings — rebind portals after those assignments.
# There should still be `settings={` in startNewSovereignGame.
# After that block we'll rely on the fact saveSettings rebinds. The assignment
# `settings={...}` in startNewSovereignGame must call bindPortalSettings.
# Patch the remaining `settings={` (not loadSettings).
count = text.count("    settings={")
print("settings={ occurrences", count)
text = text.replace(
    "    settings={",
    "    settings={",
)
# After startNewSovereignGame assignment, bind. Safer: wrap every `settings={` 
# that's a full replace. There is one in startNewSovereignGame.
# Find `settings={\n      ...defaultSettings` 
old = "    settings={\n      ...defaultSettings,"
if old not in text:
    print("WARN: startNewSovereignGame settings assign pattern not found")
else:
    # leave assignment, add bind after the closing of that object is hard.
    # Instead hook saveSettings which already rebinds, and also bind after assign
    # by changing to:
    text = text.replace(
        old,
        "    settings={\n      ...defaultSettings,",
        1,
    )

# After startNewSovereignGame's settings object, they call save? Let's add
# bindPortalSettings(settings) immediately after every `settings=` assignment
# except the initial let settings=loadSettings.
text2 = []
for line in text.splitlines(keepends=True):
    text2.append(line)
    if line.strip().startswith("settings={") or line.strip().startswith("settings=loadSettings"):
        continue
    if "settings={" in line and "loadSettings" not in line and "defaultSettings,...saved" not in line:
        indent = line[: len(line) - len(line.lstrip())]
        text2.append(f"{indent}bindPortalSettings(settings);\n")
text = "".join(text2)

out_path = root / "src/main.js"
out_path.write_text(text)
print("wrote", out_path, "bytes", len(text), "lines", text.count("\n") + 1)
print("dropped", len(drop), "source lines")
