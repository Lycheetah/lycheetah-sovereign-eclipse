/* Zone module. Build body extracted unchanged from gold master 0.27.5. */
import { WORLD, MICRO_ZJ_BATTLE_ZONES } from '../../world/destinations.js';

export function buildAetherCrucibleWorld(ctx){
  const {
    THREE, WORLD, microWorldGroups, worldAssetGroups,
    addMesh, addBillboardGlow, box, wedge, cyl,
    createNavBeacon, createIndustrialPlatform, createLycheetahReliquary,
    createServiceLane, createVeilChoir, createWorldRockField,
    createSpectralBlackSun, createBlackSunCrown, createCelestialVeil, createWreckCluster,
    glowAmber, glowCyan, glowGreen, glowPurple, glowRed,
    matArmorDark, matFerric, matGold, matOrganic, matVanta, matBone
  } = ctx;
  const root=microWorldGroups.aether_crucible;
  const c=WORLD.microCrucible;

  // ----------------------------------------------------------
  // FURNACE HEART — the visual and mechanical centre.
  // ----------------------------------------------------------
  const furnace=new THREE.Group();
  furnace.position.copy(c).add(new THREE.Vector3(0,0,35));
  root.add(furnace);
  worldAssetGroups.push(furnace);

  for(let i=0;i<10;i++){
    const a=i/10*Math.PI*2;
    const r=50+(i%2)*10;
    const pylon=new THREE.Group();
    pylon.position.set(Math.cos(a)*r,(i%3-1)*7,Math.sin(a)*r);
    pylon.rotation.y=-a;
    furnace.add(pylon);

    box(6,48+(i%2)*16,8,i%2?matFerric:matArmorDark,[0,0,0],[0,0,0],pylon);
    wedge(20,4.5,5.5,matGold,[0,16,0],pylon,.04,.88,.6).rotation.z=(i%2?-.15:.15);
    addMesh(
      new THREE.SphereGeometry(.7,9,7),
      i%2?glowAmber:glowCyan,
      [0,23,0],[0,0,0],[1,1,1],pylon
    );
  }

  for(let i=0;i<7;i++){
    const ring=addMesh(
      new THREE.TorusGeometry(22+i*6,.42+i*.06,10,82),
      i%2?glowAmber:glowCyan,
      [0,0,0],
      [Math.PI/2.08,.08*i,.17*i],
      [1,1,1],
      furnace
    );
    ring.userData.spin=(i%2?-.044:.032);
  }

  addMesh(
    new THREE.SphereGeometry(10,24,16),
    new THREE.MeshBasicMaterial({color:0x020100}),
    [0,0,0],[0,0,0],[1,1,1],furnace
  );
  addBillboardGlow(0xffb84e,125,.060,furnace);
  addBillboardGlow(0x76efff,84,.034,furnace);

  // ----------------------------------------------------------
  // I — INTAKE GANTRY
  // Long mechanical jaws make the arrival site immediately readable.
  // ----------------------------------------------------------
  const intake=c.clone().add(new THREE.Vector3(20,5,155));
  for(const side of [-1,1]){
    const jaw=new THREE.Group();
    jaw.position.copy(intake).add(new THREE.Vector3(side*52,0,0));
    jaw.rotation.z=side*.08;
    root.add(jaw);
    worldAssetGroups.push(jaw);

    box(9,66,10,matArmorDark,[0,0,0],[0,0,0],jaw);
    for(let i=0;i<4;i++){
      wedge(
        30,3.4,6,
        i%2?matFerric:matGold,
        [side*-12,-20+i*15,-2],
        jaw,.04,.86,.4
      ).rotation.z=side*(.22+i*.025);
    }
    addMesh(new THREE.TorusGeometry(9,.30,10,44),glowCyan,[0,24,0],[Math.PI/2,0,0],[1,1,1],jaw).userData.spin=side*.05;
  }
  createNavBeacon(root,intake.clone().add(new THREE.Vector3(0,22,-10)),0x7cecff,1.15);

  // ----------------------------------------------------------
  // III — ROOT FOUNDRY
  // Living industrial architecture: recognisably different from Ferric metal.
  // ----------------------------------------------------------
  const rootSite=c.clone().add(new THREE.Vector3(-145,36,115));
  const bloom=createLycheetahReliquary(root,rootSite,1.25,0x65ff9c,0x76eaff);
  bloom.scale.y=.84;
  for(let i=0;i<5;i++){
    const a=i/5*Math.PI*2;
    const g=new THREE.Group();
    g.position.copy(rootSite).add(new THREE.Vector3(Math.cos(a)*48,(i%2?9:-8),Math.sin(a)*48));
    root.add(g);worldAssetGroups.push(g);
    wedge(26,6,4,matOrganic,[0,0,0],g,.10,.78,.3).rotation.y=-a;
    addMesh(new THREE.SphereGeometry(1.1,10,8),glowGreen,[0,5,0],[0,0,0],[1,1,1],g);
  }

  // ----------------------------------------------------------
  // IV — SLAG PROCESSION
  // Ferric repair platforms create cover and collision geometry.
  // ----------------------------------------------------------
  const slag=c.clone().add(new THREE.Vector3(155,-18,-70));
  const drydockA=createIndustrialPlatform(root,slag.clone().add(new THREE.Vector3(0,0,0)),0xffa94c,1.42);
  const drydockB=createIndustrialPlatform(root,slag.clone().add(new THREE.Vector3(-68,24,-42)),0x7defff,.90);
  drydockB.rotation.y=.44;

  // ----------------------------------------------------------
  // V — SEVERED CROWN
  // End arena opens out again around a broken halo.
  // ----------------------------------------------------------
  const crown=c.clone().add(new THREE.Vector3(0,38,-190));
  const crownRoot=new THREE.Group();
  crownRoot.position.copy(crown);
  root.add(crownRoot);worldAssetGroups.push(crownRoot);

  for(let i=0;i<5;i++){
    const r=addMesh(
      new THREE.TorusGeometry(31+i*8,.45+i*.09,10,86),
      i%2?glowAmber:glowCyan,
      [0,0,0],
      [Math.PI/2.25,.14*i,.25*i],
      [1,1,1],crownRoot
    );
    r.userData.spin=(i%2?-.028:.020);
  }
  for(const side of [-1,1]){
    const broken=wedge(58,6,8,matFerric,[side*46,-5,0],crownRoot,.05,.88,.4);
    broken.rotation.z=side*.42;
    broken.rotation.y=side*.18;
  }
  addBillboardGlow(0xffb84e,82,.035,crownRoot);

  // Service / traversal lanes visually connect the five sites.
  createServiceLane(root,[
    [intake.x,intake.y,intake.z],
    [c.x,c.y,c.z+35],
    [rootSite.x,rootSite.y,rootSite.z]
  ],0x7cecff,0xffb85a,.82);

  createServiceLane(root,[
    [rootSite.x,rootSite.y,rootSite.z],
    [slag.x,slag.y,slag.z],
    [crown.x,crown.y,crown.z]
  ],0xffb85a,0x7cecff,.82);

  createVeilChoir(root,c.clone().add(new THREE.Vector3(0,40,20)),165,270,0xffb85b);
  createWorldRockField(root,'naraka',c.clone().add(new THREE.Vector3(100,0,-105)),26,116,0x30261d,'aether_crucible');
  createWorldRockField(root,'naraka',c.clone().add(new THREE.Vector3(-125,8,105)),22,102,0x20282b,'aether_crucible');
}

export const AETHER_CRUCIBLE = {
  id: 'aether_crucible',
  region: 'naraka',
  name: 'AETHER CRUCIBLE',
  sites: ['INTAKE GANTRY', 'FURNACE HEART', 'ROOT FOUNDRY', 'SLAG PROCESSION', 'SEVERED CROWN'],
  data: MICRO_ZJ_BATTLE_ZONES['aether_crucible'],
  build: buildAetherCrucibleWorld
};
