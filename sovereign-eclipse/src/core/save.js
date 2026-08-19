/* Extracted unchanged from gold master 0.27.5. */
export const GAME_SAVE_KEY='lycheetah_sov_eclipse_forge275';

export const defaultSettings={
  quality:1,
  autoQuality:true,
  bloom:true,
  volume:.70,
  shake:.75,
  selectedShip:'savanah_starter',
  ownedHulls:[
    'savanah_starter','sol_symbiots_starter','chaos_starter','cosmic_darkness_starter',
    'cosmic_light_starter','blackhole_starter','hybrid_fused_starter','human_hunters_starter',
    'ai_hunters_starter','amethyst_angels_starter','techno_angels_starter','ai_gods_starter',
    'pagan_ai_starter','ai_starter'
  ],
  ownedTurretWeapons:['autocannon','repeater','railgun','plasma','flak','beam_laser','missile','ion','shard'],
  frameBuilds:{},
  frameLoadouts:{},
  hullBlueprints:{},
  hasRun:false,
  victories:0,
  salvage:180,
  loadout:{
    weapon:'earned_battery',
    defense:'aegis_projector',
    drive:'earned_drive',
    utility:'pd_mesh'
  },
  ownedModules:['earned_battery','cheetah_repeater','aegis_projector','sovereign_plating','earned_drive','vector_thrusters','pd_mesh','reactor_channel','targeting_core','reactive_armor','flux_drive','cap_matrix'],
  activeContract:'breach_purge',
  contractCompletions:{},
  derelictRecovered:false,
  gateUnlocked:false,
  currentSector:'naraka',
  campaignTier:1,
  erebosDiscovered:false,
  aionDiscovered:false,
  chaosDiscovered:false,
  mirrorRecovered:false,
  worldRecoveries:{},
  worldDiscoveries:{},
  zoneEventStats:{patrols:0,salvage:0,distress:0,elite:0},
  microZJCompletions:{},
  activeDroneWing:'shield_guardians',
  ownedDrones:['shield_guardians','armor_spiders'],
  materials:{
    ferrite:12,prism_shard:2,biofiber:2,void_glass:0,
    solar_filament:1,ai_lattice:0,drone_parts:4
  },
  industryJobs:[],
  moduleAutomation:{defense:true},
  researchData:80,
  researchUnlocked:['core_fitting','starter_fabrication'],
  researchDiscoveries:{}
};

export function persistSettings(settings){
  try{localStorage.setItem(GAME_SAVE_KEY,JSON.stringify(settings));}catch(_){}
}

export function loadSettings(){
  let settings={...defaultSettings};
  try{
    const raw=localStorage.getItem(GAME_SAVE_KEY)
    ||localStorage.getItem('lycheetah_sov_eclipse_forge274')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge273')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge272')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge271')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge270')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge269')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge268')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge2672')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge2671')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge2662')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge2661')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge266')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge2652')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge2651')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge265')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge264')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge263')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge262')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge261')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge260')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge259')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge258')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge257')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge256')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge255')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge254')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge253')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge252')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge251')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge25')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge24')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge23')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge22')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge217')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge216')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge215')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge214')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge213')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge212')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge211')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge21')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge201')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge20')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge191')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge19')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge181')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge18')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge03')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge17')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge16')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge154')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge153')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge152')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge151')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge15')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge141')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge14')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge131')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge13')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge12')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge11')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge10')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge09')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge08')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge07')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge06')
    ||localStorage.getItem('lycheetah_sov_eclipse_forge05')
    ||'{}';
    const saved=JSON.parse(raw);
    settings={...defaultSettings,...saved};
  }catch(_){}
settings.loadout={...defaultSettings.loadout,...(settings.loadout||{})};
settings.ownedTurretWeapons=Array.from(new Set([...(defaultSettings.ownedTurretWeapons||[]),...(settings.ownedTurretWeapons||[])]));
settings.frameBuilds=settings.frameBuilds||{};
settings.frameLoadouts=settings.frameLoadouts||{};
settings.hullBlueprints=settings.hullBlueprints||{};
for(const [fid,build] of Object.entries(defaultSettings.frameBuilds)){
  settings.frameBuilds[fid]={...build,...(settings.frameBuilds[fid]||{})};
}
settings.ownedModules=Array.from(new Set([...(defaultSettings.ownedModules||[]),...(settings.ownedModules||[])]));
settings.ownedHulls=Array.from(new Set([
  ...(defaultSettings.ownedHulls||[]),
  ...(settings.ownedHulls||[]),
  settings.selectedShip||'savanah_starter'
]));
settings.worldRecoveries=settings.worldRecoveries||{};
settings.worldDiscoveries=settings.worldDiscoveries||{};
settings.microZJCompletions=settings.microZJCompletions||{};
settings.activeDroneWing=settings.activeDroneWing||'shield_guardians';
settings.ownedDrones=Array.from(new Set([...(settings.ownedDrones||[]),'shield_guardians']));
settings.materials={
  ferrite:0,prism_shard:0,biofiber:0,void_glass:0,
  solar_filament:0,ai_lattice:0,drone_parts:0,
  ...(settings.materials||{})
};
settings.industryJobs=Array.isArray(settings.industryJobs)?settings.industryJobs:[];
settings.moduleAutomation={defense:true,...(settings.moduleAutomation||{})};
settings.researchData=Number.isFinite(Number(settings.researchData))?Math.max(0,Number(settings.researchData)):80;
settings.researchUnlocked=Array.from(new Set(['core_fitting','starter_fabrication',...(settings.researchUnlocked||[])]));
settings.researchDiscoveries={...(settings.researchDiscoveries||{})};
if((settings.ownedHulls||[]).some(id=>String(id).endsWith('_destroyer')))settings.researchUnlocked.push('destroyer_architecture');
if((settings.ownedHulls||[]).some(id=>String(id).endsWith('_battleship')))settings.researchUnlocked.push('battleship_architecture');
settings.researchUnlocked=Array.from(new Set(settings.researchUnlocked));
settings.zoneEventStats={
  patrols:0,salvage:0,distress:0,elite:0,
  ...(settings.zoneEventStats||{})
};
settings.contractCompletions={...(settings.contractCompletions||{})};
  return settings;
}
