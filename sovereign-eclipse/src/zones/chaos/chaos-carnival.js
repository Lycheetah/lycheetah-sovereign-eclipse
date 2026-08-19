/* Zone module from gold master 0.27.5.2. */
import { WORLD, MICRO_ZJ_BATTLE_ZONES } from '../../world/destinations.js';

export function buildChaosCarnivalWorld(ctx){
  const {
    THREE, WORLD, microWorldGroups, worldAssetGroups,
    addMesh, addBillboardGlow, box, wedge, cyl,
    createNavBeacon, createIndustrialPlatform, createLycheetahReliquary,
    createServiceLane, createVeilChoir, createWorldRockField,
    createSpectralBlackSun, createBlackSunCrown, createCelestialVeil, createWreckCluster,
    glowAmber, glowCyan, glowGreen, glowPurple, glowRed, glowGold,
    matArmorDark, matFerric, matGold, matOrganic, matVanta, matBone, matPrism, matWhite, matIvory
  } = ctx;
  const root=microWorldGroups.chaos_carnival,c=WORLD.microChaosCarnival;
  const carnival=new THREE.Group();carnival.position.copy(c);root.add(carnival);worldAssetGroups.push(carnival);
  const mats=[glowPurple,glowAmber,glowRed,glowCyan];
  for(let i=0;i<13;i++){
    const a=i/13*Math.PI*2,r=42+(i%4)*18;
    const ring=addMesh(
      new THREE.TorusGeometry(10+(i%5)*5,.38+(i%3)*.12,8,48),
      mats[i%mats.length],
      [Math.cos(a)*r,(i%5-2)*13,Math.sin(a)*r],
      [Math.PI/2+a*.09,a*.21,a*.31],[1,1,1],carnival
    );
    ring.userData.spin=(i%2?-.08:.07);
  }
  for(let i=0;i<4;i++){
    createWreckCluster(
      root,c.clone().add(new THREE.Vector3((i-1.5)*105,(i%2?28:-24),95-(i%3)*110)),
      i%2?0xff7d55:0xb969ff,.82+i*.10
    );
  }
  createNavBeacon(root,c.clone().add(new THREE.Vector3(0,35,170)),0xffa748,1.44);
  createCelestialVeil(root,c.clone().add(new THREE.Vector3(0,86,-185)),1.10,0xff5fcf,0xffbd55);
  createVeilChoir(root,c.clone().add(new THREE.Vector3(0,8,0)),210,345,0xd36aff);
}

export const CHAOS_CARNIVAL = {
  id: 'chaos_carnival',
  region: 'chaos',
  name: 'CHAOS CARNIVAL',
  sites: ['TICKET BURN', 'WRECK CAROUSEL', 'RUPTURE MIDWAY', 'CARNIVAL CROWN'],
  data: MICRO_ZJ_BATTLE_ZONES['chaos_carnival'],
  build: buildChaosCarnivalWorld
};
