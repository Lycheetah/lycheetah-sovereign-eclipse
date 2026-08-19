import { ZONE_WORLD, SECTOR_META, WORLD } from './destinations.js';
import { getZone, loadZone, ZONE_REGISTRY } from './zone-registry.js';

export function sectorWorldOf(id){ return ZONE_WORLD[id] || WORLD; }
export function sectorMetaOf(id){ return SECTOR_META[id] || SECTOR_META.naraka; }
export { getZone, loadZone, ZONE_REGISTRY };
