/* Zone module from gold master 0.27.5.2. */
import { WORLD, MICRO_ZJ_BATTLE_ZONES } from '../../world/destinations.js';

export function buildLaughingMawWorld(ctx){
  const {
    THREE, WORLD, microWorldGroups, worldAssetGroups,
    addMesh, addBillboardGlow, box, wedge, cyl,
    createNavBeacon, createIndustrialPlatform, createLycheetahReliquary,
    createServiceLane, createVeilChoir, createWorldRockField,
    createSpectralBlackSun, createBlackSunCrown, createCelestialVeil, createWreckCluster,
    glowAmber, glowCyan, glowGreen, glowPurple, glowRed, glowGold,
    matArmorDark, matFerric, matGold, matOrganic, matVanta, matBone, matPrism, matWhite, matIvory
  } = ctx;
  const root=microWorldGroups.laughing_maw,c=WORLD.microLaughingMaw;
  const maw=new THREE.Group();maw.position.copy(c);root.add(maw);worldAssetGroups.push(maw);
  addMesh(new THREE.SphereGeometry(13,24,16),new THREE.MeshBasicMaterial({color:0x010003}),[0,0,-20],[0,0,0],[1,1,1],maw);
  addBillboardGlow(0xc02563,118,.052,maw);
  for(const side of [-1,1]){
    for(let i=0;i<7;i++){
      const z=-145+i*44;
      const fang=wedge(62-i*3,7,12,i%2?matBone:matVanta,[side*(48+i*8),(i%3-1)*12,z],maw,.03,.92,.45);
      fang.rotation.x=Math.PI/2;fang.rotation.z=side*(.58-i*.025);fang.rotation.y=side*.16;
      addMesh(new THREE.SphereGeometry(.7,8,6),i%2?glowRed:glowPurple,[side*(48+i*8),18,z],[0,0,0],[1,1,1],maw);
    }
  }
  createSpectralBlackSun(root,c.clone().add(new THREE.Vector3(0,128,-430)),1.28);
  createWreckCluster(root,c.clone().add(new THREE.Vector3(-170,-38,120)),0xd85a78,1.18);
  createWreckCluster(root,c.clone().add(new THREE.Vector3(160,24,95)),0x8d52ff,1.08);
  createVeilChoir(root,c.clone().add(new THREE.Vector3(0,16,-25)),220,360,0xb54a88);
  createWorldRockField(root,'naraka',c.clone().add(new THREE.Vector3(35,-35,-90)),26,165,0x22121d,'laughing_maw');
}

export const LAUGHING_MAW = {
  id: 'laughing_maw',
  region: 'chaos',
  name: 'LAUGHING MAW',
  sites: ['TEETH OF ENTRY', 'LEFT GULLET', 'RIGHT GULLET', 'BLACK TONGUE'],
  data: MICRO_ZJ_BATTLE_ZONES['laughing_maw'],
  build: buildLaughingMawWorld
};
