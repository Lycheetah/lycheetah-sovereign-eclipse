/* Zone module. Build body extracted unchanged from gold master 0.27.5. */
import { WORLD, MICRO_ZJ_BATTLE_ZONES } from '../../world/destinations.js';

export function buildGraveChoirWorld(ctx){
  const {
    THREE, WORLD, microWorldGroups, worldAssetGroups,
    addMesh, addBillboardGlow, box, wedge, cyl,
    createNavBeacon, createIndustrialPlatform, createLycheetahReliquary,
    createServiceLane, createVeilChoir, createWorldRockField,
    createSpectralBlackSun, createBlackSunCrown, createCelestialVeil, createWreckCluster,
    glowAmber, glowCyan, glowGreen, glowPurple, glowRed,
    matArmorDark, matFerric, matGold, matOrganic, matVanta, matBone
  } = ctx;
  const root=microWorldGroups.grave_choir;
  const c=WORLD.microGraveChoir;

  // Ossuary cathedral-procession.
  const choir=new THREE.Group();
  choir.position.copy(c);
  root.add(choir);
  worldAssetGroups.push(choir);

  for(const side of [-1,1]){
    for(let i=0;i<7;i++){
      const depth=(i-3)*34;
      const h=42+i*8;
      const rib=wedge(
        h,4.2,8.0,
        i%2?matBone:matArmorDark,
        [side*(38+i*7),Math.sin(i)*8,depth],
        choir,.02,.92,.5
      );
      rib.rotation.x=Math.PI/2;
      rib.rotation.z=side*(.13+i*.018);
    }
  }

  for(let i=0;i<6;i++){
    const ring=addMesh(
      new THREE.TorusGeometry(32+i*10,.45+i*.08,10,82),
      i%2?glowPurple:glowRed,
      [0,6,-20],
      [Math.PI/2.15,.08*i,.17*i],
      [1,1,1],choir
    );
    ring.userData.spin=(i%2?-.032:.024);
  }

  addMesh(
    new THREE.SphereGeometry(7,20,14),
    new THREE.MeshBasicMaterial({color:0x000000}),
    [0,6,-20],[0,0,0],[1,1,1],choir
  );

  // Wreck procession lanes.
  for(let i=0;i<5;i++){
    createWreckCluster(
      root,
      c.clone().add(new THREE.Vector3(
        -210+i*92,
        (i%2?28:-22),
        120+(i%3)*55
      )),
      i%2?0xb76cff:0xff6f69,
      .92+i*.08
    );
  }

  createCelestialVeil(
    root,
    c.clone().add(new THREE.Vector3(0,82,-175)),
    1.36,0xb176ff,0xff7c70
  );

  createVeilChoir(
    root,
    c.clone().add(new THREE.Vector3(0,18,0)),
    210,340,0x9b6eff
  );

  createWorldRockField(root,'naraka',c.clone().add(new THREE.Vector3(-90,-12,-70)),32,170,0x241c2a,'grave_choir');
}

export const GRAVE_CHOIR = {
  id: 'grave_choir',
  region: 'naraka',
  name: 'GRAVE CHOIR',
  sites: ['OSSUARY PROCESSION', 'DEAD CAPITALS', 'VIOLET RELIQUARY', 'TITAN CHANCEL'],
  data: MICRO_ZJ_BATTLE_ZONES['grave_choir'],
  build: buildGraveChoirWorld
};
