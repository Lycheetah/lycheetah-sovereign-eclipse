/* Zone module. Build body extracted unchanged from gold master 0.27.5. */
import { WORLD, MICRO_ZJ_BATTLE_ZONES } from '../../world/destinations.js';

export function buildBlackSunMarchWorld(ctx){
  const {
    THREE, WORLD, microWorldGroups, worldAssetGroups,
    addMesh, addBillboardGlow, box, wedge, cyl,
    createNavBeacon, createIndustrialPlatform, createLycheetahReliquary,
    createServiceLane, createVeilChoir, createWorldRockField,
    createSpectralBlackSun, createBlackSunCrown, createCelestialVeil, createWreckCluster,
    glowAmber, glowCyan, glowGreen, glowPurple, glowRed,
    matArmorDark, matFerric, matGold, matOrganic, matVanta, matBone
  } = ctx;
  const root=microWorldGroups.black_sun_march;
  const c=WORLD.microBlackSun;

  // A much closer, harsher spectral singularity than the Naraka horizon sun.
  const sunPos=c.clone().add(new THREE.Vector3(-60,125,-420));
  createSpectralBlackSun(root,sunPos,2.35);
  createBlackSunCrown(root,sunPos,1.82);

  // Vanta shadow processional.
  for(let i=0;i<11;i++){
    const x=(i-5)*36;
    const z=(i%2?1:-1)*55;
    const tower=new THREE.Group();
    tower.position.copy(c).add(new THREE.Vector3(x,(i%3-1)*11,z));
    root.add(tower);
    worldAssetGroups.push(tower);

    box(5,58+(i%4)*12,7,matVanta,[0,0,0],[0,0,(i%2?-.04:.04)],tower);
    wedge(32,3.5,7,matArmorDark,[0,18,0],tower,.03,.90,.5).rotation.z=(i%2?-.30:.30);
    addMesh(
      new THREE.SphereGeometry(.72,10,7),
      i%3===0?glowPurple:glowRed,
      [0,28,0],[0,0,0],[1,1,1],tower
    );
  }

  // Prism lens lattice.
  for(const side of [-1,1]){
    const lens=createCelestialVeil(
      root,
      c.clone().add(new THREE.Vector3(side*155,38,-45)),
      .96,
      0x75eaff,
      side>0?0xc288ff:0xffcc7c
    );
    lens.rotation.y=side*.18;
  }

  createWreckCluster(
    root,
    c.clone().add(new THREE.Vector3(105,-35,170)),
    0x9d67ff,1.28
  );
  createWreckCluster(
    root,
    c.clone().add(new THREE.Vector3(-150,20,135)),
    0x5fe8ff,1.02
  );

  createVeilChoir(root,c.clone().add(new THREE.Vector3(0,20,-80)),175,300,0xa987ff);
  createWorldRockField(root,'naraka',c.clone().add(new THREE.Vector3(0,-20,60)),28,150,0x16131f,'black_sun_march');
}

export const BLACK_SUN_MARCH = {
  id: 'black_sun_march',
  region: 'naraka',
  name: 'BLACK SUN MARCH',
  sites: ['PROCESSIONAL', 'VANTA SHADOW', 'PRISM LENS', 'ARTILLERY CORRIDOR'],
  data: MICRO_ZJ_BATTLE_ZONES['black_sun_march'],
  build: buildBlackSunMarchWorld
};
