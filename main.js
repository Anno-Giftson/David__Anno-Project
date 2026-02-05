// === Scene setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // sky blue

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// === Ground blocks ===
const blockSize = 1;
const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
const material = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // grass

const worldSize = 20; // 20x20 blocks
for (let x = -worldSize/2; x < worldSize/2; x++) {
  for (let z = -worldSize/2; z < worldSize/2; z++) {
    const block = new THREE.Mesh(geometry, material);
    block.position.set(x, 0, z);
    scene.add(block);
  }
}

// === PointerLockControls for WASD + mouse ===
const controls = new THREE.PointerLockControls(camera, document.body);
camera.position.set(0, 2, 5); // start slightly above ground
scene.add(controls.getObject());

// Click to lock mouse
document.body.addEventListener('click', () => {
  controls.lock();
});

// Movement
const move = { forward: false, backward: false, left: false, right: false };
const velocity = new THREE.Vector3();
const speed = 0.1;

document.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'KeyW': move.forward = true; break;
    case 'KeyS': move.backward = true; break;
    case 'KeyA': move.left = true; break;
    case 'KeyD': move.right = true; break;


