// Scene setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setSize(window.innerWidth, window.innerHeight);

// Controls (rotate camera)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Light
const light = new THREE.PointLight(0xffffff);
light.position.set(10, 10, 10);
scene.add(light);

// Store objects
let objects = [];

// Camera position
camera.position.z = 5;

// Add Cube
function addCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.x = Math.random() * 4 - 2;

  scene.add(cube);
  objects.push(cube);
}

// Add Sphere
function addSphere() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xff00aa });
  const sphere = new THREE.Mesh(geometry, material);

  sphere.position.x = Math.random() * 4 - 2;

  scene.add(sphere);
  objects.push(sphere);
}

// Add Cylinder
function addCylinder() {
  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00aaff });
  const cyl = new THREE.Mesh(geometry, material);

  cyl.position.x = Math.random() * 4 - 2;

  scene.add(cyl);
  objects.push(cyl);
}

// Clear scene
function clearScene() {
  objects.forEach(obj => scene.remove(obj));
  objects = [];
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();
