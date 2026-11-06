/*
 * MUSCLE FACTORY GYM — Global Three.js background
 * Keeps the original combined dumbbell + crest fixed behind the ENTIRE page.
 * The WebGL canvas is transparent; no hero-card/background panel is used.
 */
(function () {
  'use strict';

  const container = document.getElementById('webgl-container');
  const stage = document.getElementById('interactive-3d-stage');
  const vignette = document.querySelector('.vignette-overlay');

  if (!container) return;
  if (typeof window.THREE === 'undefined') {
    console.warn('Three.js did not load. The rest of the website remains available.');
    return;
  }

  /* Move the canvas and page-wide vignette out of the hero markup. This makes
     them true fixed background layers instead of children of the hero card. */
  document.body.insertBefore(container, document.body.firstChild);
  if (vignette) document.body.insertBefore(vignette, container.nextSibling);

  Object.entries({
    position: 'fixed', top: '0', right: '0', bottom: '0', left: '0',
    width: '100vw', height: '100vh', zIndex: '0', opacity: '0.92',
    pointerEvents: 'none', overflow: 'hidden', borderRadius: '0',
    background: 'transparent'
  }).forEach(([property, value]) => container.style.setProperty(property, value, 'important'));

  if (vignette) {
    Object.entries({
      position: 'fixed', inset: '0', zIndex: '1', pointerEvents: 'none',
      borderRadius: '0',
      background: 'radial-gradient(circle at 50% 35%, rgba(9,9,11,.15) 0%, rgba(9,9,11,.72) 65%, rgba(9,9,11,.96) 100%)'
    }).forEach(([property, value]) => vignette.style.setProperty(property, value, 'important'));
  }

  // The old framed hero stage is no longer needed; the 3D object is global.
  if (stage) stage.style.setProperty('display', 'none', 'important');

  const THREE = window.THREE;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x09090b, 0.085);

  const camera = new THREE.PerspectiveCamera(
    42,
    Math.max(1, window.innerWidth) / Math.max(1, window.innerHeight),
    0.1,
    100
  );
  camera.position.set(0, 0, 7.2);

  const renderer = new THREE.WebGLRenderer({
    antialias: window.devicePixelRatio <= 1.5,
    alpha: true,
    powerPreference: 'low-power'
  });
  renderer.setPixelRatio(Math.min(
    window.devicePixelRatio || 1,
    window.matchMedia('(max-width: 767px)').matches ? 1.25 : 1.6
  ));
  renderer.setClearColor(0x000000, 0); // Transparent canvas: no box behind the model.
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  // Original strict-palette PBR materials.
  const matObsidianIron = new THREE.MeshStandardMaterial({
    color: 0x09090b, metalness: 0.78, roughness: 0.36
  });
  const matCharcoalCore = new THREE.MeshStandardMaterial({
    color: 0x141416, metalness: 0.65, roughness: 0.48
  });
  const matBrushedGold = new THREE.MeshStandardMaterial({
    color: 0xc8a45d, metalness: 0.92, roughness: 0.22
  });

  const rootGroup = new THREE.Group();
  const dumbbellGroup = new THREE.Group();
  const badgeGroup = new THREE.Group();
  scene.add(rootGroup);
  rootGroup.add(dumbbellGroup, badgeGroup);

  // Knurled brushed-gold handle shaft.
  const handleGeo = new THREE.CylinderGeometry(0.16, 0.16, 2.5, 32);
  handleGeo.rotateZ(Math.PI / 2);
  dumbbellGroup.add(new THREE.Mesh(handleGeo, matBrushedGold));
  [-0.65, -0.22, 0.22, 0.65].forEach((xPos) => {
    const gripRingGeo = new THREE.TorusGeometry(0.166, 0.015, 12, 32);
    gripRingGeo.rotateY(Math.PI / 2);
    const gripRing = new THREE.Mesh(gripRingGeo, matObsidianIron);
    gripRing.position.x = xPos;
    dumbbellGroup.add(gripRing);
  });

  // Symmetrical left/right weight stacks.
  function buildWeightStack(sideSign) {
    const stack = new THREE.Group();

    const innerCollarGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.16, 24);
    innerCollarGeo.rotateZ(Math.PI / 2);
    const innerCollar = new THREE.Mesh(innerCollarGeo, matBrushedGold);
    innerCollar.position.x = sideSign * 1.15;
    stack.add(innerCollar);

    const mainPlateGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.36, 8);
    mainPlateGeo.rotateZ(Math.PI / 2);
    const mainPlate = new THREE.Mesh(mainPlateGeo, matObsidianIron);
    mainPlate.position.x = sideSign * 1.44;
    stack.add(mainPlate);

    const goldRimGeo = new THREE.TorusGeometry(0.92, 0.028, 8, 8);
    goldRimGeo.rotateY(Math.PI / 2);
    [-1.26, -1.62].forEach((offset) => {
      const rim = new THREE.Mesh(goldRimGeo, matBrushedGold);
      rim.position.x = sideSign * Math.abs(offset);
      stack.add(rim);
    });

    const outerPlateGeo = new THREE.CylinderGeometry(0.74, 0.74, 0.26, 8);
    outerPlateGeo.rotateZ(Math.PI / 2);
    const outerPlate = new THREE.Mesh(outerPlateGeo, matCharcoalCore);
    outerPlate.position.x = sideSign * 1.78;
    stack.add(outerPlate);

    const endCapGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.12, 16);
    endCapGeo.rotateZ(Math.PI / 2);
    const endCap = new THREE.Mesh(endCapGeo, matBrushedGold);
    endCap.position.x = sideSign * 1.94;
    stack.add(endCap);
    return stack;
  }
  dumbbellGroup.add(buildWeightStack(-1), buildWeightStack(1));

  // Original geometric club crest. Always shown together with the dumbbell.
  const outerCrestGeo = new THREE.TorusGeometry(2.35, 0.035, 8, 8);
  const outerCrest = new THREE.Mesh(outerCrestGeo, matBrushedGold);
  badgeGroup.add(outerCrest);
  const innerCrestGeo = new THREE.TorusGeometry(1.95, 0.022, 8, 16);
  const innerCrest = new THREE.Mesh(innerCrestGeo, matObsidianIron);
  innerCrest.rotation.z = Math.PI / 8;
  badgeGroup.add(innerCrest);
  const coreOctaGeo = new THREE.OctahedronGeometry(0.55, 0);
  const coreOcta = new THREE.Mesh(coreOctaGeo, matBrushedGold);
  coreOcta.visible = false;
  badgeGroup.add(coreOcta);

  // Studio lighting rig.
  scene.add(new THREE.AmbientLight(0xf4f4f6, 0.55));
  const goldKeyLight = new THREE.DirectionalLight(0xc8a45d, 2.6);
  goldKeyLight.position.set(5, 6, 5);
  scene.add(goldKeyLight);
  const alabasterRimLight = new THREE.DirectionalLight(0xf4f4f6, 1.4);
  alabasterRimLight.position.set(-6, 3, -4);
  scene.add(alabasterRimLight);
  const warmBottomFill = new THREE.PointLight(0xc8a45d, 1.8, 14);
  warmBottomFill.position.set(0, -4, 3);
  scene.add(warmBottomFill);

  let targetRotX = 0.28;
  let targetRotY = -0.45;
  let currentRotX = 0.28;
  let currentRotY = -0.45;
  let scrollOffset = window.scrollY || window.pageYOffset || 0;
  let rafId = 0;
  let isPageVisible = document.visibilityState === 'visible';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clock = new THREE.Clock();

  function resizeRenderer() {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);

    // Match the original placement: offset right on desktop, centered on mobile.
    if (width >= 1024) {
      rootGroup.position.set(1.55, 0.15, 0);
      rootGroup.scale.setScalar(0.92);
    } else {
      rootGroup.position.set(0, -0.35, 0);
      rootGroup.scale.setScalar(0.68);
    }
    renderStatic();
  }

  function renderScene(elapsed, animate) {
    const movement = animate ? elapsed : 0;
    const scrollRotation = animate ? scrollOffset * 0.0022 : 0;

    currentRotX += (targetRotX - currentRotX) * 0.06;
    currentRotY += (targetRotY - currentRotY) * 0.06;
    dumbbellGroup.rotation.x = currentRotX + (animate ? Math.sin(movement * 0.7) * 0.12 : 0);
    dumbbellGroup.rotation.y = currentRotY + (animate ? movement * 0.22 + scrollRotation : 0);
    dumbbellGroup.rotation.z = 0.32 + scrollRotation * 0.35;
    outerCrest.rotation.x = -currentRotX * 0.6 + (animate ? movement * 0.15 : 0);
    outerCrest.rotation.y = -currentRotY * 0.6 - scrollRotation * 0.8;
    innerCrest.rotation.z = animate ? movement * 0.25 + scrollRotation : 0.18;
    renderer.render(scene, camera);
  }

  function renderStatic() {
    renderScene(clock.getElapsedTime(), false);
  }

  function animate() {
    rafId = 0;
    if (!isPageVisible || reduceMotion.matches) return;
    renderScene(clock.getElapsedTime(), true);
    rafId = window.requestAnimationFrame(animate);
  }

  function syncAnimation() {
    const shouldAnimate = isPageVisible && !reduceMotion.matches;
    if (shouldAnimate && !rafId) rafId = window.requestAnimationFrame(animate);
    if (!shouldAnimate && rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
      renderStatic();
    }
  }

  // Pointer interaction works across the whole viewport, not just the old hero card.
  window.addEventListener('pointermove', (event) => {
    targetRotY = (event.clientX / Math.max(1, window.innerWidth)) * 1.9 - 0.95;
    targetRotX = (event.clientY / Math.max(1, window.innerHeight)) * 1.1 - 0.55;
    if (reduceMotion.matches) renderStatic();
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    targetRotX = 0.28;
    targetRotY = -0.45;
    if (reduceMotion.matches) renderStatic();
  }, { passive: true });

  window.addEventListener('touchmove', (event) => {
    if (!event.touches.length) return;
    targetRotY = (event.touches[0].clientX / Math.max(1, window.innerWidth)) * 2.2 - 1.1;
    targetRotX = (event.touches[0].clientY / Math.max(1, window.innerHeight)) * 1.3 - 0.65;
    if (reduceMotion.matches) renderStatic();
  }, { passive: true });

  window.addEventListener('scroll', () => {
    scrollOffset = window.scrollY || window.pageYOffset || 0;
  }, { passive: true });
  window.addEventListener('resize', resizeRenderer, { passive: true });
  document.addEventListener('visibilitychange', () => {
    isPageVisible = document.visibilityState === 'visible';
    syncAnimation();
  });
  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', syncAnimation);
  } else if (typeof reduceMotion.addListener === 'function') {
    reduceMotion.addListener(syncAnimation);
  }

  resizeRenderer();
  syncAnimation();
})();
