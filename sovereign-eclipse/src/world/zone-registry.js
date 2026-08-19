/* Live nodes only. Unknown ids fail visibly. Gold: 0.27.5.2 nine-world demo. */
import { NARAKA } from '../zones/naraka/asterion.js';
import { AETHER_CRUCIBLE } from '../zones/naraka/aether-crucible.js';
import { PILGRIM_HALO } from '../zones/naraka/pilgrim-halo.js';
import { CINDER_RELAY } from '../zones/naraka/cinder-relay.js';
import { BLACK_SUN_MARCH } from '../zones/erebos/black-sun-march.js';
import { COLD_CATHEDRAL } from '../zones/erebos/cold-cathedral.js';
import { GRAVE_CHOIR } from '../zones/deep-current/grave-choir.js';
import { EREBOS_SECTOR } from '../zones/erebos/helios-bastion.js';
import { AION_SECTOR } from '../zones/aion/orison-vault.js';
import { ORISON_VAULT } from '../zones/aion/orison-vault-world.js';
import { CHAOS_SECTOR } from '../zones/chaos/wildgate-spindle.js';
import { CHAOS_CARNIVAL } from '../zones/chaos/chaos-carnival.js';
import { LAUGHING_MAW } from '../zones/chaos/laughing-maw.js';

export const ZONE_REGISTRY = {
  naraka: NARAKA,
  aether_crucible: AETHER_CRUCIBLE,
  pilgrim_halo: PILGRIM_HALO,
  cinder_relay: CINDER_RELAY,
  black_sun_march: BLACK_SUN_MARCH,
  cold_cathedral: COLD_CATHEDRAL,
  grave_choir: GRAVE_CHOIR,
  erebos: EREBOS_SECTOR,
  aion: AION_SECTOR,
  orison_vault: ORISON_VAULT,
  chaos: CHAOS_SECTOR,
  chaos_carnival: CHAOS_CARNIVAL,
  laughing_maw: LAUGHING_MAW
};

export function getZone(id){
  const zone = ZONE_REGISTRY[id];
  if(!zone) throw new Error('ZONE REGISTRY HAS NO '+String(id).toUpperCase());
  return zone;
}

export function loadZone(id, ctx){
  const zone = getZone(id);
  if(typeof zone.build === 'function') zone.build(ctx);
  return zone;
}
