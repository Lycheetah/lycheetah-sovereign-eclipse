/* Extracted unchanged from gold master 0.27.5. */
import * as THREE from 'three';

export const WORLD={
  station:new THREE.Vector3(190,18,155),
  breach:new THREE.Vector3(0,28,-355),
  wreck:new THREE.Vector3(-255,-15,-125),
  gate:new THREE.Vector3(330,20,-470),
  rift:new THREE.Vector3(-430,60,-430),
  cinderRelay:new THREE.Vector3(-115,42,190),
  convoy:new THREE.Vector3(-355,-32,62),
  observatory:new THREE.Vector3(105,72,-118),
  refinery:new THREE.Vector3(365,-28,-72),
  graveyard:new THREE.Vector3(-395,-42,10),
  teleport:new THREE.Vector3(-118,20,172),
  blackSun:new THREE.Vector3(-65,146,-1040),
  dockSpine:new THREE.Vector3(278,10,246),
  haloYard:new THREE.Vector3(118,36,286),
  nursery:new THREE.Vector3(-198,-22,118),
  pilgrimArch:new THREE.Vector3(22,64,286),
  pillarGate:new THREE.Vector3(58,52,-158),
  veilSanctum:new THREE.Vector3(-88,84,228),
  microCrucible:new THREE.Vector3(96,34,-356),
  microBlackSun:new THREE.Vector3(-72,74,-650),
  microGraveChoir:new THREE.Vector3(-535,-18,-182),
  microPilgrimHalo:new THREE.Vector3(40,72,-930),
  microCinderRelay:new THREE.Vector3(-355,18,-760),
  microColdCathedral:new THREE.Vector3(365,55,-805),
  microOrisonVault:new THREE.Vector3(5,94,-1180),
  microChaosCarnival:new THREE.Vector3(435,8,-1110),
  microLaughingMaw:new THREE.Vector3(-455,-32,-1160)
};

export const EREBOS={
  station:new THREE.Vector3(-165,32,170),
  gate:new THREE.Vector3(315,24,355),
  cathedral:new THREE.Vector3(-320,78,-390),
  well:new THREE.Vector3(110,-35,-365),
  bone:new THREE.Vector3(425,18,-220),
  violetObservatory:new THREE.Vector3(-52,68,318),
  procession:new THREE.Vector3(-420,4,92),
  phaseBeacon:new THREE.Vector3(232,72,-58),
  sanctuary:new THREE.Vector3(-68,-62,-208),
  nullFoundry:new THREE.Vector3(355,-42,-12),
  aionGate:new THREE.Vector3(-462,48,-22)
};

export const CHAOS={
  station:new THREE.Vector3(22,18,165),
  returnTeleporter:new THREE.Vector3(-214,26,292),
  carnival:new THREE.Vector3(165,42,-96),
  spiral:new THREE.Vector3(-145,68,-188),
  breach:new THREE.Vector3(252,-22,182),
  shardfield:new THREE.Vector3(-302,24,34),
  roulette:new THREE.Vector3(104,86,-272),
  maw:new THREE.Vector3(-356,-36,-218)
};

export const AION={
  station:new THREE.Vector3(72,34,205),
  gate:new THREE.Vector3(-340,26,330),
  archive:new THREE.Vector3(-250,78,-178),
  crown:new THREE.Vector3(335,50,-310),
  foundry:new THREE.Vector3(385,-28,42),
  drift:new THREE.Vector3(-360,-44,-295),
  beacon:new THREE.Vector3(118,92,-122),
  futureGate:new THREE.Vector3(452,58,-420)
};

export const SECTOR_META={
  naraka:{
    id:'naraka',name:'NARAKA VEIL',stationName:'ASTERION FORGE',
    eyebrow:'Naraka Veil // Sovereign Anchorage',
    desc:'The first real sovereign district in the Black Current: Asterion Forge, orbital service traffic, salvage pockets, ancient Lycheetah structures, a central pillar warp gate and a spectral black-sun horizon all feed the opening game loop.',
    stationDesc:'Capital dock, early contracts, module market, repair infrastructure and launch access into a polished first world with a clearer skyline and stronger mystical identity.'
  },
  erebos:{
    id:'erebos',name:'EREBOS REACH',stationName:'HELIOS BASTION',
    eyebrow:'Erebos Reach // Far-Side Bastion',
    desc:'A surviving fortress beyond the Ancient Gate. Its forges understand technologies absent from Naraka Veil, but the surrounding void is substantially more hostile.',
    stationDesc:'Far-side contracts, Erebos technology market and sovereign restoration dock.'
  },
  aion:{
    id:'aion',name:'AION SCAR',stationName:'ORISON VAULT',
    eyebrow:'Aion Scar // Gilded Fracture',
    desc:'A fractured stellar grave beyond Erebos where luminous machine ruins orbit a wounded gold star. The region is currently exploration-first: salvage, service sites and portal infrastructure.',
    stationDesc:'Exploration anchorage, field repair, salvage appraisal and future campaign expansion point.'
  },
  chaos:{
    id:'chaos',name:'CHAOS CRADLE',stationName:'WILDGATE SPINDLE',
    eyebrow:'Chaos Cradle // Starter Proving Zone',
    desc:'A dense, playful and dangerous proving zone built for immediate action: teleport lattices, wreck spirals, salvage showers, colourful hazards and compact combat flow.',
    stationDesc:'A chaotic jump-platform for early roaming, rapid undocks and high-density test combat.'
  }
};

export const ZONE_WORLD={naraka:WORLD,erebos:EREBOS,aion:AION,chaos:CHAOS};

const portalSettings={current:null};
export function bindPortalSettings(settings){portalSettings.current=settings;}

export const PORTAL_LINKS=[
  {
    id:'naraka_erebos',
    a:{sector:'naraka',pos:WORLD.gate,name:'ANCIENT GATE'},
    b:{sector:'erebos',pos:EREBOS.gate,name:'RETURN GATE'},
    unlocked:()=>!!portalSettings.current?.gateUnlocked,
    lockedMessage:'CLEAR THE SCARLET LEVIATHAN CONTRACT'
  },
  {
    id:'erebos_aion',
    a:{sector:'erebos',pos:EREBOS.aionGate,name:'GILDED FRACTURE'},
    b:{sector:'aion',pos:AION.gate,name:'EREBOS FRACTURE'},
    unlocked:()=>!!portalSettings.current?.erebosDiscovered,
    lockedMessage:'REACH EREBOS BEFORE CROSSING THE FRACTURE'
  },
  {
    id:'naraka_chaos_teleport',
    a:{sector:'naraka',pos:WORLD.teleport,name:'TELEPORT STATION'},
    b:{sector:'chaos',pos:CHAOS.returnTeleporter,name:'RETURN SPINDLE'},
    unlocked:()=>true,
    lockedMessage:'TELEPORT ARRAY OFFLINE'
  }
];

export const CONTRACTS={
  breach_purge:{
    id:'breach_purge',name:'Break the Current',type:'Purge Operation',
    desc:'Enter the Black Current breach and destroy a layered hostile fleet before the anomaly can stabilise.',
    sector:'naraka',target:'breach',reward:260,difficulty:'STANDARD',enemyMult:1.0,
    waves:[
      {fighter:6,frigate:2},
      {frigate:3,destroyer:2},
      {destroyer:2,cruiser:1},
      {cruiser:2,battleship:1}
    ],boss:true
  },
  derelict_recovery:{
    id:'derelict_recovery',name:'Ghost of the Titan',type:'Recovery Operation',
    desc:'Reach the derelict Titan, extract its intact sovereign core and survive the scavenger fleet drawn to the signal.',
    sector:'naraka',target:'wreck',reward:210,difficulty:'TACTICAL',enemyMult:1.05,
    interaction:true,
    waves:[
      {fighter:4,frigate:2},
      {frigate:3,destroyer:1},
      {destroyer:2,cruiser:1}
    ],boss:false
  },
  leviathan_hunt:{
    id:'leviathan_hunt',name:'Scarlet Leviathan',type:'Capital Hunt',
    desc:'Cross the Scarlet Rift and challenge a capital formation built around a Nocturnal Leviathan.',
    sector:'naraka',target:'rift',reward:520,difficulty:'SEVERE',enemyMult:1.16,
    waves:[
      {frigate:4,destroyer:2},
      {destroyer:2,cruiser:2},
      {cruiser:2,battleship:1},
      {battleship:2,dreadnought:1}
    ],boss:true
  },

  cold_cathedral:{
    id:'cold_cathedral',name:'Choir in the Dark',type:'Erebos Suppression',
    desc:'Trace the signal inside the Cold Cathedral and silence the fleet nesting around its singularity choir.',
    sector:'erebos',target:'cathedral',reward:650,difficulty:'EXTREME',enemyMult:1.32,
    waves:[
      {fighter:7,frigate:3},
      {frigate:4,destroyer:3},
      {destroyer:3,cruiser:2,battleship:1}
    ],boss:true
  },
  mirror_extraction:{
    id:'mirror_extraction',name:'The Mirror Well',type:'Far-Side Recovery',
    desc:'Reach the Mirror Well and extract a phase-memory lattice before Erebos hunters collapse on the site.',
    sector:'erebos',target:'well',reward:470,difficulty:'HIGH',enemyMult:1.28,
    interaction:true,interactionPrompt:'G // EXTRACT PHASE-MEMORY LATTICE',
    waves:[
      {fighter:6,frigate:3},
      {frigate:4,destroyer:2},
      {destroyer:2,cruiser:2}
    ],boss:false
  },
  bone_ring_siege:{
    id:'bone_ring_siege',name:'Crown of Bones',type:'Erebos Capital Siege',
    desc:'Enter the Bone Ring kill-zone and destroy the capital formation guarding the far-side corridor.',
    sector:'erebos',target:'bone',reward:840,difficulty:'MYTHIC',enemyMult:1.48,
    waves:[
      {frigate:5,destroyer:3},
      {destroyer:3,cruiser:3},
      {cruiser:2,battleship:2,dreadnought:1}
    ],boss:true
  },

  aion_archive_echo:{
    id:'aion_archive_echo',name:'Echoes of the Archive',type:'Aion Recovery',
    desc:'Enter the Sundered Archive, recover a sealed navigation kernel and survive the precision fleet drawn to its activation.',
    sector:'aion',target:'archive',reward:760,difficulty:'ASCENDANT',enemyMult:1.46,
    interaction:true,interactionPrompt:'G // EXTRACT SUNDERED NAVIGATION KERNEL',
    waves:[
      {fighter:5,frigate:4},
      {frigate:3,destroyer:3},
      {destroyer:2,cruiser:2,battleship:1}
    ],boss:false
  },
  aion_warden_intercept:{
    id:'aion_warden_intercept',name:'Warden Intercept',type:'Aion Fleet Intercept',
    desc:'A hostile Warden formation is triangulating Orison Vault. Break its escort line around the deep-zone beacon before it can complete the lock.',
    sector:'aion',target:'beacon',reward:890,difficulty:'ASCENDANT+',enemyMult:1.54,
    waves:[
      {frigate:4,destroyer:3},
      {destroyer:3,cruiser:2},
      {cruiser:2,battleship:2},
      {battleship:1,dreadnought:1}
    ],boss:false
  },
  aion_crown_breaker:{
    id:'aion_crown_breaker',name:'Breaker of the Gilded Crown',type:'Aion Capital Hunt',
    desc:'Challenge the capital host nesting inside the Gilded Crown wreck field and destroy the flagship commanding the Aion corridor.',
    sector:'aion',target:'crown',reward:1320,difficulty:'TRANSCENDENT',enemyMult:1.68,
    waves:[
      {destroyer:4,cruiser:2},
      {cruiser:3,battleship:2},
      {battleship:2,dreadnought:1}
    ],boss:true
  },

  chaos_carnival_run:{
    id:'chaos_carnival_run',name:'Carnival Run',type:'Chaos Recovery',
    desc:'A fast salvage strike through the Carnival of Wrecks. Recover value quickly and survive the swarming ships drawn to the signal bloom.',
    sector:'chaos',target:'carnival',reward:310,difficulty:'VIVID',enemyMult:1.08,
    waves:[
      {fighter:6,frigate:2},
      {fighter:4,frigate:3,destroyer:1}
    ],boss:false
  },
  chaos_laughing_maw:{
    id:'chaos_laughing_maw',name:'Laughing Maw',type:'Chaos Hotspot',
    desc:'Enter the Laughing Maw and break the pack controlling the anomaly before the whole pocket collapses into violence.',
    sector:'chaos',target:'maw',reward:420,difficulty:'WILD',enemyMult:1.18,
    waves:[
      {fighter:5,frigate:3},
      {frigate:4,destroyer:2},
      {destroyer:2,cruiser:1}
    ],boss:false
  }
};

export const MICRO_ZJ_BATTLE_ZONES={
  aether_crucible:{
    id:'aether_crucible',
    index:'I',
    name:'AETHER CRUCIBLE',
    subtitle:'A broken stellar kiln fought across five industrial war sites: intake gantries, the furnace heart, a living foundry, the slag procession and the severed crown.',
    anchor:WORLD.microCrucible,
    entry:WORLD.microCrucible.clone().add(new THREE.Vector3(30,22,255)),
    estimated:'AUTHORED WAR ROUTE',
    threat:'TACTICAL // INDUSTRIAL',
    reward:380,
    interWave:2.2,
    power:.74,
    requiresAdvance:true,
    advanceRadius:112,
    clearColor:0x0c0905,
    fogColor:0x171008,
    fogDensity:.00120,
    key:0xffbd66,
    rim:0x78ecff,
    races:['human_hunters','hybrid_fused','savanah'],
    route:[
      WORLD.microCrucible.clone().add(new THREE.Vector3(20,5,155)),       // Intake Gantry
      WORLD.microCrucible.clone().add(new THREE.Vector3(0,0,35)),         // Furnace Heart
      WORLD.microCrucible.clone().add(new THREE.Vector3(-145,36,115)),    // Root Foundry
      WORLD.microCrucible.clone().add(new THREE.Vector3(155,-18,-70)),    // Slag Procession
      WORLD.microCrucible.clone().add(new THREE.Vector3(0,38,-190))       // Severed Crown
    ],
    siteNames:[
      'INTAKE GANTRY',
      'FURNACE HEART',
      'ROOT FOUNDRY',
      'SLAG PROCESSION',
      'SEVERED CROWN'
    ],
    waves:[
      {label:'CUSTOMS SCREEN',role:'INTERCEPTORS',fighter:5,frigate:2},
      {label:'GANTRY ENFORCERS',role:'PLATE PRESSURE',frigate:3,destroyer:1},
      {label:'KILN GUARD',role:'SHIELD PRESSURE',frigate:2,destroyer:2},
      {label:'FURNACE HAMMERS',role:'ARMOUR BREAKERS',destroyer:2,cruiser:1},
      {label:'ROOT HUNTERS',role:'REGENERATIVE SCREEN',frigate:3,cruiser:2},
      {label:'FUSED PROCESSION',role:'INTERNAL PRESSURE',destroyer:2,cruiser:2},
      {label:'SLAG BATTERIES',role:'HEAVY KINETICS',destroyer:3,cruiser:1,battleship:1},
      {label:'WAR-REPAIR COLUMN',role:'CAPITAL PRESSURE',cruiser:2,battleship:1},
      {label:'CROWN ESCORT',role:'BREACH DEFENCE',destroyer:2,cruiser:2,battleship:1},
      {label:'THE FOUNDRY TYRANT',role:'DREADNOUGHT EXECUTION',cruiser:1,battleship:1,dreadnought:1}
    ]
  },

  black_sun_march:{
    id:'black_sun_march',
    index:'II',
    name:'BLACK SUN MARCH',
    subtitle:'A long processional beneath a near spectral singularity, cut by Vanta shadow pylons, Prism lens ruins and Abyssal artillery corridors.',
    anchor:WORLD.microBlackSun,
    entry:WORLD.microBlackSun.clone().add(new THREE.Vector3(20,14,235)),
    estimated:'35–50 MIN',
    threat:'SEVERE',
    reward:470,
    interWave:5.6,
    power:.77,
    clearColor:0x05040a,
    fogColor:0x0b0713,
    fogDensity:.00104,
    key:0xb7caff,
    rim:0xb66cff,
    races:['blackhole','ai_hunters','cosmic_darkness'],
    route:[
      WORLD.microBlackSun.clone().add(new THREE.Vector3(0,0,140)),
      WORLD.microBlackSun.clone().add(new THREE.Vector3(-145,35,20)),
      WORLD.microBlackSun.clone().add(new THREE.Vector3(155,20,-85)),
      WORLD.microBlackSun.clone().add(new THREE.Vector3(0,55,-170))
    ],
    waves:[
      {frigate:4,destroyer:2},
      {destroyer:3,cruiser:1},
      {frigate:3,cruiser:2},
      {destroyer:2,cruiser:2,battleship:1},
      {cruiser:3,battleship:1},
      {destroyer:3,battleship:2},
      {cruiser:2,battleship:2},
      {battleship:2,dreadnought:1},
      {cruiser:3,dreadnought:1},
      {battleship:2,dreadnought:1}
    ]
  },

  grave_choir:{
    id:'grave_choir',
    index:'III',
    name:'GRAVE CHOIR',
    subtitle:'An Ossuary war-cathedral spread through a procession of dead capitals, violet reliquaries and a final Titan-scale chancel.',
    anchor:WORLD.microGraveChoir,
    entry:WORLD.microGraveChoir.clone().add(new THREE.Vector3(95,24,250)),
    estimated:'40–60 MIN',
    threat:'MYTHIC',
    reward:720,
    interWave:6.0,
    power:.80,
    clearColor:0x070409,
    fogColor:0x120815,
    fogDensity:.00112,
    key:0xd7c1df,
    rim:0xa45fff,
    races:['pagan_ai','blackhole','ai_hunters'],
    route:[
      WORLD.microGraveChoir.clone().add(new THREE.Vector3(70,0,160)),
      WORLD.microGraveChoir.clone().add(new THREE.Vector3(-165,25,65)),
      WORLD.microGraveChoir.clone().add(new THREE.Vector3(145,-10,-65)),
      WORLD.microGraveChoir.clone().add(new THREE.Vector3(0,35,-185))
    ],
    waves:[
      {frigate:3,destroyer:3},
      {destroyer:4,cruiser:1},
      {destroyer:2,cruiser:3},
      {cruiser:2,battleship:2},
      {destroyer:3,battleship:2},
      {cruiser:3,battleship:2},
      {cruiser:2,battleship:1,dreadnought:1},
      {battleship:2,dreadnought:1},
      {cruiser:2,battleship:2,dreadnought:1},
      {battleship:2,dreadnought:1,titan:1}
    ]
  }
,

  pilgrim_halo:{
    id:'pilgrim_halo',index:'IV',name:'PILGRIM HALO',
    subtitle:'A radiant pilgrimage ring where cathedral relics and machine sanctuaries orbit a calm gold-cyan halo.',
    anchor:WORLD.microPilgrimHalo,
    entry:WORLD.microPilgrimHalo.clone().add(new THREE.Vector3(0,22,235)),
    estimated:'DEMO ROUTE',threat:'RADIANT // CEREMONIAL',reward:190,interWave:1.35,power:.68,
    requiresAdvance:true,advanceRadius:108,
    clearColor:0x07090a,fogColor:0x0d1111,fogDensity:.00092,key:0xffe0a0,rim:0x78efff,
    races:['cosmic_light','sol_symbiots','techno_angels'],
    route:[
      WORLD.microPilgrimHalo.clone().add(new THREE.Vector3(0,18,150)),
      WORLD.microPilgrimHalo.clone().add(new THREE.Vector3(-145,20,-15)),
      WORLD.microPilgrimHalo.clone().add(new THREE.Vector3(145,20,-15)),
      WORLD.microPilgrimHalo.clone().add(new THREE.Vector3(0,88,-185))
    ],
    siteNames:['GOLDEN APPROACH','LEFT RELIQUARY','RIGHT RELIQUARY','ASCENSION HALO'],
    waves:[
      {label:'PILGRIM ESCORT',role:'RADIANT SCREEN',fighter:3,frigate:2},
      {label:'COVENANT TEST',role:'PRECISION FIRE',frigate:3,destroyer:1},
      {label:'HALO SENTINELS',role:'SHIELD DISCIPLINE',destroyer:2,cruiser:1},
      {label:'ASCENSION GUARD',role:'RADIANT LINE',cruiser:2,battleship:1}
    ]
  },

  cinder_relay:{
    id:'cinder_relay',index:'V',name:'CINDER RELAY',
    subtitle:'An orange-black industrial signal lattice surrounded by drydocks, wreck traffic and overdriven relay pylons.',
    anchor:WORLD.microCinderRelay,
    entry:WORLD.microCinderRelay.clone().add(new THREE.Vector3(0,12,235)),
    estimated:'DEMO ROUTE',threat:'INDUSTRIAL // HOT',reward:205,interWave:1.30,power:.70,
    requiresAdvance:true,advanceRadius:108,
    clearColor:0x0b0704,fogColor:0x160b06,fogDensity:.00118,key:0xffa855,rim:0x78eaff,
    races:['human_hunters','ai','hybrid_fused'],
    route:[
      WORLD.microCinderRelay.clone().add(new THREE.Vector3(0,32,160)),
      WORLD.microCinderRelay.clone().add(new THREE.Vector3(-145,-12,55)),
      WORLD.microCinderRelay.clone().add(new THREE.Vector3(135,18,-70)),
      WORLD.microCinderRelay.clone().add(new THREE.Vector3(20,-36,-185))
    ],
    siteNames:['RELAY APPROACH','FERRIC YARD','SIGNAL SPINE','ASH WRECKFIELD'],
    waves:[
      {label:'SIGNAL PICKETS',role:'INTERCEPT',fighter:4,frigate:1},
      {label:'YARD DEFENDERS',role:'KINETIC LINE',frigate:2,destroyer:2},
      {label:'RELAY ENFORCERS',role:'INDUSTRIAL PRESSURE',destroyer:2,cruiser:1},
      {label:'CINDER FOREMAN',role:'HEAVY EXECUTION',cruiser:1,battleship:1}
    ]
  },

  cold_cathedral:{
    id:'cold_cathedral',index:'VI',name:'COLD CATHEDRAL',
    subtitle:'A frozen prism nave of black ribs, cold cyan glass and distant violet stellar geometry.',
    anchor:WORLD.microColdCathedral,
    entry:WORLD.microColdCathedral.clone().add(new THREE.Vector3(0,20,245)),
    estimated:'DEMO ROUTE',threat:'COLD // GOTHIC',reward:225,interWave:1.45,power:.72,
    requiresAdvance:true,advanceRadius:112,
    clearColor:0x03070b,fogColor:0x07101a,fogDensity:.00132,key:0xbfefff,rim:0xa77bff,
    races:['cosmic_darkness','amethyst_angels','ai_hunters'],
    route:[
      WORLD.microColdCathedral.clone().add(new THREE.Vector3(0,10,160)),
      WORLD.microColdCathedral.clone().add(new THREE.Vector3(-155,-25,120)),
      WORLD.microColdCathedral.clone().add(new THREE.Vector3(155,18,95)),
      WORLD.microColdCathedral.clone().add(new THREE.Vector3(0,95,-205))
    ],
    siteNames:['FROST NARTHEX','LEFT OSSUARY','RIGHT OSSUARY','CRYOSTAR APSE'],
    waves:[
      {label:'COLD ACOLYTES',role:'VEIL INTERCEPT',frigate:3,destroyer:1},
      {label:'AMETHYST CHOIR',role:'PRECISION PRESSURE',destroyer:2,cruiser:1},
      {label:'NULL PROCESSION',role:'LONG RANGE',destroyer:2,cruiser:2},
      {label:'CATHEDRAL WARDEN',role:'GOTHIC LINE',cruiser:2,battleship:1}
    ]
  },

  orison_vault:{
    id:'orison_vault',index:'VII',name:'ORISON VAULT',
    subtitle:'A white-gold archive engine surrounded by rotating knowledge rings and serene Aion reliquaries.',
    anchor:WORLD.microOrisonVault,
    entry:WORLD.microOrisonVault.clone().add(new THREE.Vector3(0,30,245)),
    estimated:'DEMO ROUTE',threat:'ARCHIVE // SOVEREIGN',reward:245,interWave:1.40,power:.73,
    requiresAdvance:true,advanceRadius:110,
    clearColor:0x0b0905,fogColor:0x151007,fogDensity:.00094,key:0xffe4a6,rim:0x82efff,
    races:['ai_gods','sol_symbiots','techno_angels'],
    route:[
      WORLD.microOrisonVault.clone().add(new THREE.Vector3(0,20,155)),
      WORLD.microOrisonVault.clone().add(new THREE.Vector3(-150,42,90)),
      WORLD.microOrisonVault.clone().add(new THREE.Vector3(150,55,80)),
      WORLD.microOrisonVault.clone().add(new THREE.Vector3(0,26,-185))
    ],
    siteNames:['ARCHIVE THRESHOLD','PAST LENS','FUTURE LENS','ORISON CORE'],
    waves:[
      {label:'ARCHIVE SCREEN',role:'PRECISION SCREEN',fighter:2,frigate:3},
      {label:'COVENANT READERS',role:'CAPACITOR PRESSURE',frigate:2,destroyer:2},
      {label:'PRISM WARDENS',role:'RANGED LINE',destroyer:2,cruiser:1},
      {label:'IMPERIAL CURATOR',role:'SOVEREIGN CORE',cruiser:1,battleship:1}
    ]
  },

  chaos_carnival:{
    id:'chaos_carnival',index:'VIII',name:'CHAOS CARNIVAL',
    subtitle:'A violent wreck-festival of crooked energy rings, fluorescent debris and impossible carnival machinery.',
    anchor:WORLD.microChaosCarnival,
    entry:WORLD.microChaosCarnival.clone().add(new THREE.Vector3(0,18,255)),
    estimated:'DEMO ROUTE',threat:'WILD // VIVID',reward:220,interWave:1.15,power:.71,
    requiresAdvance:true,advanceRadius:115,
    clearColor:0x12040b,fogColor:0x1b0712,fogDensity:.00112,key:0xffa65c,rim:0xff65d8,
    races:['chaos','hybrid_fused','savanah'],
    route:[
      WORLD.microChaosCarnival.clone().add(new THREE.Vector3(0,35,170)),
      WORLD.microChaosCarnival.clone().add(new THREE.Vector3(-155,-24,95)),
      WORLD.microChaosCarnival.clone().add(new THREE.Vector3(155,28,-15)),
      WORLD.microChaosCarnival.clone().add(new THREE.Vector3(0,86,-185))
    ],
    siteNames:['TICKET BURN','WRECK CAROUSEL','RUPTURE MIDWAY','CARNIVAL CROWN'],
    waves:[
      {label:'LAUGHING PACK',role:'SWARM',fighter:6,frigate:1},
      {label:'WRECK DANCERS',role:'BRAWL',frigate:4,destroyer:1},
      {label:'RUPTURE PARADE',role:'CHAOS PRESSURE',destroyer:2,cruiser:2},
      {label:'RINGMASTER',role:'PREDATOR EXECUTION',cruiser:2,battleship:1}
    ]
  },

  laughing_maw:{
    id:'laughing_maw',index:'IX',name:'LAUGHING MAW',
    subtitle:'A predatory void-mouth of bone-black fangs, red-violet stars and wreckage caught between impossible jaws.',
    anchor:WORLD.microLaughingMaw,
    entry:WORLD.microLaughingMaw.clone().add(new THREE.Vector3(0,10,265)),
    estimated:'DEMO ROUTE',threat:'ABYSSAL // PREDATORY',reward:275,interWave:1.35,power:.76,
    requiresAdvance:true,advanceRadius:114,
    clearColor:0x080207,fogColor:0x160710,fogDensity:.00130,key:0xff7a70,rim:0xb45cff,
    races:['chaos','blackhole','pagan_ai'],
    route:[
      WORLD.microLaughingMaw.clone().add(new THREE.Vector3(0,0,165)),
      WORLD.microLaughingMaw.clone().add(new THREE.Vector3(-170,-38,120)),
      WORLD.microLaughingMaw.clone().add(new THREE.Vector3(160,24,95)),
      WORLD.microLaughingMaw.clone().add(new THREE.Vector3(0,0,-185))
    ],
    siteNames:['TEETH OF ENTRY','LEFT GULLET','RIGHT GULLET','BLACK TONGUE'],
    waves:[
      {label:'MAW SCOUTS',role:'PREDATOR SCREEN',fighter:4,frigate:2},
      {label:'BONE RUNNERS',role:'KINETIC BRAWL',frigate:3,destroyer:2},
      {label:'VOID JAWS',role:'INTERNAL PRESSURE',destroyer:2,cruiser:2},
      {label:'THE LAUGH BELOW',role:'ABYSSAL EXECUTION',battleship:1,dreadnought:1}
    ]
  }};
