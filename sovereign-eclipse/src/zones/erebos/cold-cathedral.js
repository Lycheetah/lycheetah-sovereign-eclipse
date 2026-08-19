/* Zone module from gold master 0.27.5.2. */
import { WORLD, MICRO_ZJ_BATTLE_ZONES } from '../../world/destinations.js';

export function buildColdCathedralWorld(ctx){
  const {
    THREE, WORLD, microWorldGroups, worldAssetGroups,
    addMesh, addBillboardGlow, box, wedge, cyl,
    createNavBeacon, createIndustrialPlatform, createLycheetahReliquary,
    createServiceLane, createVeilChoir, createWorldRockField,
    createSpectralBlackSun, createBlackSunCrown, createCelestialVeil, createWreckCluster,
    glowAmber, glowCyan, glowGreen, glowPurple, glowRed, glowGold,
    matArmorDark, matFerric, matGold, matOrganic, matVanta, matBone, matPrism, matWhite, matIvory
  } = ctx;
  const root=microWorldGroups.cold_cathedral,c=WORLD.microColdCathedral;
  const nave=new THREE.Group();nave.position.copy(c);root.add(nave);worldAssetGroups.push(nave);
  for(const side of [-1,1]){
    for(let i=0;i<8;i++){
      const z=-165+i*46,h=48+(i%4)*13;
      const rib=wedge(h,4.8,7.2,i%2?matPrism:matVanta,[side*(42+i*2),8,z],nave,.02,.94,.48);
      rib.rotation.x=Math.PI/2;rib.rotation.z=side*(.20+i*.012);
      addMesh(new THREE.SphereGeometry(.48,8,6),i%2?glowCyan:glowPurple,[side*(42+i*2),28,z],[0,0,0],[1,1,1],nave);
    }
  }
  createCelestialVeil(root,c.clone().add(new THREE.Vector3(0,95,-205)),1.52,0xa8efff,0x9b72ff);
  createBlackSunCrown(root,c.clone().add(new THREE.Vector3(0,120,-390)),.88);
  createWreckCluster(root,c.clone().add(new THREE.Vector3(-155,-25,120)),0x7deaff,.86);
  createWreckCluster(root,c.clone().add(new THREE.Vector3(155,18,95)),0xad77ff,.94);
  createVeilChoir(root,c.clone().add(new THREE.Vector3(0,28,-25)),205,330,0x8fcfff);
}

export const COLD_CATHEDRAL = {
  id: 'cold_cathedral',
  region: 'erebos',
  name: 'COLD CATHEDRAL',
  sites: ['FROST NARTHEX', 'LEFT OSSUARY', 'RIGHT OSSUARY', 'CRYOSTAR APSE'],
  data: MICRO_ZJ_BATTLE_ZONES['cold_cathedral'],
  build: buildColdCathedralWorld
};
