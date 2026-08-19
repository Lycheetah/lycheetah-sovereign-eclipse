/* Zone module from gold master 0.27.5.2. */
import { WORLD, MICRO_ZJ_BATTLE_ZONES } from '../../world/destinations.js';

export function buildPilgrimHaloWorld(ctx){
  const {
    THREE, WORLD, microWorldGroups, worldAssetGroups,
    addMesh, addBillboardGlow, box, wedge, cyl,
    createNavBeacon, createIndustrialPlatform, createLycheetahReliquary,
    createServiceLane, createVeilChoir, createWorldRockField,
    createSpectralBlackSun, createBlackSunCrown, createCelestialVeil, createWreckCluster,
    glowAmber, glowCyan, glowGreen, glowPurple, glowRed, glowGold,
    matArmorDark, matFerric, matGold, matOrganic, matVanta, matBone, matPrism, matWhite, matIvory
  } = ctx;
  const root=microWorldGroups.pilgrim_halo,c=WORLD.microPilgrimHalo;
  const halo=new THREE.Group();halo.position.copy(c);root.add(halo);worldAssetGroups.push(halo);
  for(let i=0;i<8;i++){
    const ring=addMesh(
      new THREE.TorusGeometry(34+i*9,.44+i*.055,10,92),
      i%2?glowGold:glowCyan,[0,10,0],
      [Math.PI/2.08,.08*i,.16*i],[1,1,1],halo
    );
    ring.userData.spin=(i%2?-.018:.024);
  }
  for(const side of [-1,1]){
    const shrine=createLycheetahReliquary(
      root,c.clone().add(new THREE.Vector3(side*145,20,-15)),
      .88,0xffe29b,0x83f4ff
    );
    shrine.rotation.y=side*.22;
  }
  createCelestialVeil(root,c.clone().add(new THREE.Vector3(0,88,-185)),1.22,0xffe9ad,0x79efff);
  createNavBeacon(root,c.clone().add(new THREE.Vector3(0,18,150)),0xffd986,1.35);
  createVeilChoir(root,c.clone().add(new THREE.Vector3(0,18,-10)),190,310,0xd8f8ff);
  createWorldRockField(root,'naraka',c.clone().add(new THREE.Vector3(105,-20,35)),18,130,0x2a2926,'pilgrim_halo');
}

export const PILGRIM_HALO = {
  id: 'pilgrim_halo',
  region: 'naraka',
  name: 'PILGRIM HALO',
  sites: ['GOLDEN APPROACH', 'LEFT RELIQUARY', 'RIGHT RELIQUARY', 'ASCENSION HALO'],
  data: MICRO_ZJ_BATTLE_ZONES['pilgrim_halo'],
  build: buildPilgrimHaloWorld
};
