const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

// Controls (mouse rotate / zoom)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 15, 10);
scene.add(light);

// Ambient light for softer look
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

// Grid (Roblox Studio style)
const grid = new THREE.GridHelper(30, 30);
scene.add(grid);

// Camera position
camera.position.set(5, 5, 5);
controls.update();

// Storage
let blocks = [];

// Raycasting (click detection)
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Snap to grid (Roblox style)
function snap(n) {
  return Math.round(n);
}

// Create block
function createBlock(pos) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ffcc
  });

  const block = new THREE.Mesh(geometry, material);

  block.position.set(
    snap(pos.x),
    snap(pos.y),
    snap(pos.z)
  );

  scene.add(block);
  blocks.push(block);
}

// Remove block
function deleteBlock(obj) {
  scene.remove(obj);
  blocks = blocks.filter(b => b !== obj);
}

// Mouse click handler
window.addEventListener("mousedown", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const hits = raycaster.intersectObjects(blocks);

  // RIGHT CLICK = delete
  if (e.button === 2) {
    if (hits.length > 0) {
      deleteBlock(hits[0].object);
    }
    return;
  }

  // LEFT CLICK = place
  if (hits.length > 0) {
    const pos = hits[0].object.position.clone();
    pos.y += 1;
    createBlock(pos);
  } else {
    // place on ground plane
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hitPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, hitPoint);

    createBlock(hitPoint);
  }
});

// Disable right-click menu
window.addEventListener("contextmenu", (e) => e.preventDefault());

// Resize fix
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Game loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
