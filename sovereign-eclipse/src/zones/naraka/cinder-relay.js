/* Zone module from gold master 0.27.5.2. */
import { WORLD, MICRO_ZJ_BATTLE_ZONES } from '../../world/destinations.js';

export function buildCinderRelayWorld(ctx){
  const {
    THREE, WORLD, microWorldGroups, worldAssetGroups,
    addMesh, addBillboardGlow, box, wedge, cyl,
    createNavBeacon, createIndustrialPlatform, createLycheetahReliquary,
    createServiceLane, createVeilChoir, createWorldRockField,
    createSpectralBlackSun, createBlackSunCrown, createCelestialVeil, createWreckCluster,
    glowAmber, glowCyan, glowGreen, glowPurple, glowRed, glowGold,
    matArmorDark, matFerric, matGold, matOrganic, matVanta, matBone, matPrism, matWhite, matIvory
  } = ctx;
  const root=microWorldGroups.cinder_relay,c=WORLD.microCinderRelay;
  for(let i=0;i<9;i++){
    const a=i/9*Math.PI*2,r=58+(i%3)*24;
    const g=new THREE.Group();
    g.position.copy(c).add(new THREE.Vector3(Math.cos(a)*r,(i%3-1)*11,Math.sin(a)*r));
    g.rotation.y=-a;root.add(g);worldAssetGroups.push(g);
    box(8,38+(i%4)*12,8,i%2?matFerric:matArmorDark,[0,0,0],[0,0,0],g);
    wedge(26,4,7,matGold,[0,15,0],g,.04,.86,.45).rotation.z=(i%2?-.28:.28);
    addMesh(new THREE.SphereGeometry(.8,9,7),i%2?glowAmber:glowRed,[0,24,0],[0,0,0],[1,1,1],g);
  }
  createIndustrialPlatform(root,c.clone().add(new THREE.Vector3(-145,-12,55)),0xff9f48,1.22);
  createIndustrialPlatform(root,c.clone().add(new THREE.Vector3(135,18,-70)),0x6fefff,.92);
  createWreckCluster(root,c.clone().add(new THREE.Vector3(20,-36,-185)),0xff8d54,1.14);
  createNavBeacon(root,c.clone().add(new THREE.Vector3(0,32,160)),0xffa84f,1.35);
  createWorldRockField(root,'naraka',c.clone().add(new THREE.Vector3(-60,-10,-25)),30,155,0x2d2119,'cinder_relay');
}

export const CINDER_RELAY = {
  id: 'cinder_relay',
  region: 'naraka',
  name: 'CINDER RELAY',
  sites: ['RELAY APPROACH', 'FERRIC YARD', 'SIGNAL SPINE', 'ASH WRECKFIELD'],
  data: MICRO_ZJ_BATTLE_ZONES['cinder_relay'],
  build: buildCinderRelayWorld
};
