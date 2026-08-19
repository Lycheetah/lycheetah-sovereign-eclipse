#!/usr/bin/env python3
"""Zero-feature-change extract of 0.27.5 catalogs / save / worlds / zones."""
from pathlib import Path
import re

root = Path("/home/guestpc/sovereign-eclipse")
main_path = root / "src/main.js"
backup = root / "src/main.js.precut"
src = main_path.read_text()
if not backup.exists():
    backup.write_text(src)
    print("backed up src/main.js.precut")
else:
    src = backup.read_text()
    print("reading from precut backup")

lines = src.splitlines(keepends=True)


def slice_unindent(a, b):
    out = []
    for line in lines[a - 1 : b]:
        out.append(line[2:] if line.startswith("  ") else line)
    return "".join(out)


def exportize(text, names):
    for name in names:
        text = re.sub(rf"(?m)^const {name}\b", f"export const {name}", text, count=1)
        text = re.sub(rf"(?m)^function {name}\(", f"export function {name}(", text, count=1)
        text = re.sub(rf"(?m)^let {name}\b", f"export let {name}", text, count=1)
    return text


def write(rel, text):
    path = root / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text)
    print(f"  {rel}  {len(text)} bytes")


write(
    "src/ships/classes.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    + exportize(
        slice_unindent(2808, 2928),
        ["BANK_IDS", "BANK_LABELS", "BANKS_BY_COUNT", "CLASS_CATALOG"],
    ),
)

write(
    "src/ships/races.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    + exportize(slice_unindent(2930, 2938), ["RACE_CATALOG", "LEGACY_RACE_ALIASES"])
    + "\n"
    + exportize(slice_unindent(2942, 2942), ["PANTHEON_CODEX"])
    + "\n"
    + exportize(
        slice_unindent(3049, 3098),
        [
            "CLASS_ORDER",
            "RACE_ORDER",
            "PLAYER_CLASS_ORDER",
            "LEGACY_CLASS_NAME_INDEX",
            "RACE_HULL_ROOT",
            "CLASS_NAME_SUFFIX",
            "RACE_FLEET_SIGNATURES",
        ],
    ),
)

write(
    "src/ships/catalog.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    "import { CLASS_CATALOG, BANKS_BY_COUNT } from './classes.js';\n"
    "import {\n"
    "  RACE_CATALOG, RACE_ORDER, PLAYER_CLASS_ORDER,\n"
    "  LEGACY_CLASS_NAME_INDEX, RACE_HULL_ROOT, CLASS_NAME_SUFFIX, RACE_FLEET_SIGNATURES\n"
    "} from './races.js';\n\n"
    "function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v))}\n\n"
    + exportize(
        slice_unindent(3100, 3196),
        [
            "generatedHullName",
            "createFleetCatalog",
            "FRAME_CATALOG",
            "HULL_CLASS_PRICE",
            "HULL_CLASS_TIER",
            "POD_FLEET",
            "STARTER_FLEET",
            "DESTROYER_FLEET",
            "BATTLESHIP_FLEET",
            "TITAN_FLEET",
            "PLAYER_SANDBOX_CLASSES",
        ],
    ),
)

write(
    "src/ships/weapons.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    + exportize(slice_unindent(3422, 3434), ["TURRET_CATALOG"]),
)

write(
    "src/ships/modules.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    + exportize(slice_unindent(7179, 7227), ["MODULE_CATALOG", "MODULE_RUNTIME"]),
)

write(
    "src/progression/research.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    + exportize(slice_unindent(3439, 3460), ["RESEARCH_PROJECTS"]),
)

write(
    "src/progression/materials.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    + exportize(
        slice_unindent(3566, 3592),
        ["MATERIAL_CATALOG", "DRONE_CATALOG", "INDUSTRY_RECIPES"],
    ),
)

write(
    "src/combat/capacitor.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    + exportize(slice_unindent(3416, 3416), ["CAPACITOR_CLASS_PROFILES"])
    + "\nexport function capacitorProfileFor(frame){\n"
    "  return CAPACITOR_CLASS_PROFILES[frame?.classId]||CAPACITOR_CLASS_PROFILES.cruiser;\n"
    "}\n",
)

write(
    "src/combat/damage.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    + exportize(slice_unindent(11972, 11984), ["DAMAGE_PROFILES", "WEAPON_GROUPS"])
    + "\n"
    + exportize(slice_unindent(12217, 12288), ["WEAPON_ANATOMY"]),
)

write(
    "src/combat/enemies.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    + exportize(
        slice_unindent(11502, 11544),
        ["ENEMY_CLASS_CATALOG", "ENEMY_RACE_DOCTRINES", "CONTRACT_ENEMY_RACES"],
    ),
)

# save: key + defaults + load + persist
save_chain = slice_unindent(1382, 1449)
save_merge = slice_unindent(1453, 1489)
write(
    "src/core/save.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    + exportize(slice_unindent(1177, 1177), ["GAME_SAVE_KEY"])
    + "\n"
    + exportize(slice_unindent(1326, 1378), ["defaultSettings"])
    + "\nexport function persistSettings(settings){\n"
    "  try{localStorage.setItem(GAME_SAVE_KEY,JSON.stringify(settings));}catch(_){}\n"
    "}\n\n"
    "export function loadSettings(){\n"
    "  let settings={...defaultSettings};\n"
    "  try{\n"
    "    const raw=localStorage.getItem(GAME_SAVE_KEY)\n"
    + save_chain
    + "    const saved=JSON.parse(raw);\n"
    "    settings={...defaultSettings,...saved};\n"
    "  }catch(_){}\n"
    + save_merge
    + "  return settings;\n"
    "}\n",
)

write(
    "src/world/destinations.js",
    "/* Extracted unchanged from gold master 0.27.5. */\n"
    "import * as THREE from 'three';\n\n"
    + exportize(
        slice_unindent(7742, 7829),
        ["WORLD", "EREBOS", "CHAOS", "AION", "SECTOR_META", "ZONE_WORLD"],
    )
    + "\n"
    + exportize(slice_unindent(9581, 9603), ["PORTAL_LINKS"])
    + "\n"
    + exportize(slice_unindent(10003, 10122), ["CONTRACTS"])
    + "\n"
    + exportize(slice_unindent(10124, 10248), ["MICRO_ZJ_BATTLE_ZONES"]),
)

CTX = """    THREE, WORLD, microWorldGroups, worldAssetGroups,
    addMesh, addBillboardGlow, box, wedge, cyl,
    createNavBeacon, createIndustrialPlatform, createLycheetahReliquary,
    createServiceLane, createVeilChoir, createWorldRockField,
    createSpectralBlackSun, createBlackSunCrown, createCelestialVeil, createWreckCluster,
    glowAmber, glowCyan, glowGreen, glowPurple, glowRed,
    matArmorDark, matFerric, matGold, matOrganic, matVanta, matBone"""


def zone_file(rel, export_name, fn_name, a, b, meta):
    body = slice_unindent(a, b)
    body = re.sub(r"^function " + fn_name + r"\(\)\{" + "\n", "", body, count=1)
    body = body.rstrip()
    if body.endswith("}"):
        body = body[: body.rfind("}")]
    text = (
        "/* Zone module. Build body extracted unchanged from gold master 0.27.5. */\n"
        "import { WORLD, MICRO_ZJ_BATTLE_ZONES } from '../../world/destinations.js';\n\n"
        f"export function {fn_name}(ctx){{\n"
        "  const {\n"
        f"{CTX}\n"
        "  } = ctx;\n"
        f"{body}}}\n\n"
        f"export const {export_name} = {{\n"
        f"  id: {meta['id']!r},\n"
        f"  region: {meta['region']!r},\n"
        f"  name: {meta['name']!r},\n"
        f"  sites: {meta['sites']!r},\n"
        f"  data: MICRO_ZJ_BATTLE_ZONES[{meta['id']!r}],\n"
        f"  build: {fn_name}\n"
        "};\n"
    )
    write(rel, text)


zone_file(
    "src/zones/naraka/aether-crucible.js",
    "AETHER_CRUCIBLE",
    "buildAetherCrucibleWorld",
    8674,
    8816,
    {
        "id": "aether_crucible",
        "region": "naraka",
        "name": "AETHER CRUCIBLE",
        "sites": [
            "INTAKE GANTRY",
            "FURNACE HEART",
            "ROOT FOUNDRY",
            "SLAG PROCESSION",
            "SEVERED CROWN",
        ],
    },
)
zone_file(
    "src/zones/erebos/black-sun-march.js",
    "BLACK_SUN_MARCH",
    "buildBlackSunMarchWorld",
    8817,
    8870,
    {
        "id": "black_sun_march",
        "region": "naraka",
        "name": "BLACK SUN MARCH",
        "sites": ["PROCESSIONAL", "VANTA SHADOW", "PRISM LENS", "ARTILLERY CORRIDOR"],
    },
)
zone_file(
    "src/zones/deep-current/grave-choir.js",
    "GRAVE_CHOIR",
    "buildGraveChoirWorld",
    8871,
    8945,
    {
        "id": "grave_choir",
        "region": "naraka",
        "name": "GRAVE CHOIR",
        "sites": ["OSSUARY PROCESSION", "DEAD CAPITALS", "VIOLET RELIQUARY", "TITAN CHANCEL"],
    },
)

write(
    "src/zones/naraka/asterion.js",
    "import { SECTOR_META, WORLD } from '../../world/destinations.js';\n\n"
    "export const NARAKA = {\n"
    "  id: 'naraka', region: 'naraka',\n"
    "  name: SECTOR_META.naraka.name,\n"
    "  stationName: SECTOR_META.naraka.stationName,\n"
    "  type: 'inhabited_station', landmarks: WORLD, data: SECTOR_META.naraka\n"
    "};\n",
)
write(
    "src/zones/erebos/helios-bastion.js",
    "import { SECTOR_META, EREBOS } from '../../world/destinations.js';\n"
    "export const EREBOS_SECTOR = {\n"
    "  id: 'erebos', region: 'erebos',\n"
    "  name: SECTOR_META.erebos.name,\n"
    "  stationName: SECTOR_META.erebos.stationName,\n"
    "  type: 'hostile_fortress', landmarks: EREBOS, data: SECTOR_META.erebos\n"
    "};\n",
)
write(
    "src/zones/aion/orison-vault.js",
    "import { SECTOR_META, AION } from '../../world/destinations.js';\n"
    "export const AION_SECTOR = {\n"
    "  id: 'aion', region: 'aion',\n"
    "  name: SECTOR_META.aion.name,\n"
    "  stationName: SECTOR_META.aion.stationName,\n"
    "  type: 'archive', landmarks: AION, data: SECTOR_META.aion\n"
    "};\n",
)
write(
    "src/zones/chaos/wildgate-spindle.js",
    "import { SECTOR_META, CHAOS } from '../../world/destinations.js';\n"
    "export const CHAOS_SECTOR = {\n"
    "  id: 'chaos', region: 'chaos',\n"
    "  name: SECTOR_META.chaos.name,\n"
    "  stationName: SECTOR_META.chaos.stationName,\n"
    "  type: 'proving_zone', landmarks: CHAOS, data: SECTOR_META.chaos\n"
    "};\n",
)

write(
    "src/world/zone-registry.js",
    "/* Live nodes only. Unknown ids fail visibly. */\n"
    "import { NARAKA } from '../zones/naraka/asterion.js';\n"
    "import { AETHER_CRUCIBLE } from '../zones/naraka/aether-crucible.js';\n"
    "import { BLACK_SUN_MARCH } from '../zones/erebos/black-sun-march.js';\n"
    "import { GRAVE_CHOIR } from '../zones/deep-current/grave-choir.js';\n"
    "import { EREBOS_SECTOR } from '../zones/erebos/helios-bastion.js';\n"
    "import { AION_SECTOR } from '../zones/aion/orison-vault.js';\n"
    "import { CHAOS_SECTOR } from '../zones/chaos/wildgate-spindle.js';\n\n"
    "export const ZONE_REGISTRY = {\n"
    "  naraka: NARAKA,\n"
    "  aether_crucible: AETHER_CRUCIBLE,\n"
    "  black_sun_march: BLACK_SUN_MARCH,\n"
    "  grave_choir: GRAVE_CHOIR,\n"
    "  erebos: EREBOS_SECTOR,\n"
    "  aion: AION_SECTOR,\n"
    "  chaos: CHAOS_SECTOR\n"
    "};\n\n"
    "export function getZone(id){\n"
    "  const zone = ZONE_REGISTRY[id];\n"
    "  if(!zone) throw new Error('ZONE REGISTRY HAS NO '+String(id).toUpperCase());\n"
    "  return zone;\n"
    "}\n\n"
    "export function loadZone(id, ctx){\n"
    "  const zone = getZone(id);\n"
    "  if(typeof zone.build === 'function') zone.build(ctx);\n"
    "  return zone;\n"
    "}\n",
)

write(
    "src/world/world-manager.js",
    "import { ZONE_WORLD, SECTOR_META, WORLD } from './destinations.js';\n"
    "import { getZone, loadZone, ZONE_REGISTRY } from './zone-registry.js';\n\n"
    "export function sectorWorldOf(id){ return ZONE_WORLD[id] || WORLD; }\n"
    "export function sectorMetaOf(id){ return SECTOR_META[id] || SECTOR_META.naraka; }\n"
    "export { getZone, loadZone, ZONE_REGISTRY };\n",
)

print("OK modules")
