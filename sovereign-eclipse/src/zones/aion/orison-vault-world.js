/* Zone module from gold master 0.27.5.2. */
import { WORLD, MICRO_ZJ_BATTLE_ZONES } from '../../world/destinations.js';

export function buildOrisonVaultWorld(ctx){
  const {
    THREE, WORLD, microWorldGroups, worldAssetGroups,
    addMesh, addBillboardGlow, box, wedge, cyl,
    createNavBeacon, createIndustrialPlatform, createLycheetahReliquary,
    createServiceLane, createVeilChoir, createWorldRockField,
    createSpectralBlackSun, createBlackSunCrown, createCelestialVeil, createWreckCluster,
    glowAmber, glowCyan, glowGreen, glowPurple, glowRed, glowGold,
    matArmorDark, matFerric, matGold, matOrganic, matVanta, matBone, matPrism, matWhite, matIvory
  } = ctx;
  const root=microWorldGroups.orison_vault,c=WORLD.microOrisonVault;
  const vault=new THREE.Group();vault.position.copy(c);root.add(vault);worldAssetGroups.push(vault);
  for(let i=0;i<11;i++){
    const a=i/11*Math.PI*2,r=76;
    const g=new THREE.Group();g.position.set(Math.cos(a)*r,(i%2?12:-5),Math.sin(a)*r);g.rotation.y=-a;vault.add(g);
    box(6,54,6,i%3===0?matWhite:matIvory,[0,0,0],[0,0,0],g);
    addMesh(new THREE.TorusGeometry(9,.28,9,44),i%2?glowGold:glowCyan,[0,19,0],[Math.PI/2,0,0],[1,1,1],g).userData.spin=(i%2?-.025:.025);
  }
  for(let i=0;i<6;i++){
    const ring=addMesh(new THREE.TorusGeometry(30+i*10,.34,10,90),i%2?glowCyan:glowGold,[0,5,0],[Math.PI/2.05,.1*i,.18*i],[1,1,1],vault);
    ring.userData.spin=(i%2?-.02:.016);
  }
  createLycheetahReliquary(root,c.clone().add(new THREE.Vector3(0,26,-185)),1.18,0xffe5a5,0x7fefff);
  createCelestialVeil(root,c.clone().add(new THREE.Vector3(150,55,80)),.94,0xffe9b7,0x7fefff);
  createCelestialVeil(root,c.clone().add(new THREE.Vector3(-150,42,90)),.84,0xc4f4ff,0xffd477);
  createVeilChoir(root,c.clone().add(new THREE.Vector3(0,36,-25)),185,290,0xffe4a8);
}

export const ORISON_VAULT = {
  id: 'orison_vault',
  region: 'aion',
  name: 'ORISON VAULT',
  sites: ['ARCHIVE THRESHOLD', 'PAST LENS', 'FUTURE LENS', 'ORISON CORE'],
  data: MICRO_ZJ_BATTLE_ZONES['orison_vault'],
  build: buildOrisonVaultWorld
};
