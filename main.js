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
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// === Pointer Lock Mouse Look ===
const controls = new THREE.PointerLockControls(camera, document.body);
scene.add(controls.getObject());

// start position
controls.getObject().position.set(0, 2, 5);


// === Ground blocks ===
const blockSize = 1;
const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
const material = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // grass

const worldSize = 20;
for (let x = -worldSize / 2; x < worldSize / 2; x++) {
  for (let z = -worldSize / 2; z < worldSize / 2; z++) {
    const block = new THREE.Mesh(geometry, material);
    block.position.set(x, 0, z);
    scene.add(block);
  }
}

// Movement
if (moveForward) controls.moveForward(speed);
if (moveBackward) controls.moveForward(-speed);
if (moveRight) controls.moveRight(speed);
if (moveLeft) controls.moveRight(-speed);

// Vertical
if (moveUp) controls.getObject().position.y += verticalSpeed;
if (moveDown) controls.getObject().position.y -= verticalSpeed;


// === Speeds ===
const speed = 0.1;
const verticalSpeed = 0.1;
const turnSpeed = 0.03;
const lookSpeed = 0.02;

// === Keyboard controls ===
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW': moveForward = true; break;
    case 'KeyS': moveBackward = true; break;
    case 'KeyA': moveLeft = true; break;
    case 'KeyD': moveRight = true; break;

    case 'Space': moveUp = true; break;
    case 'ShiftLeft': moveDown = true; break;

    case 'ArrowDown': lookUp = true; break;
    case 'ArrowUp': lookDown = true; break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW': moveForward = false; break;
    case 'KeyS': moveBackward = false; break;
    case 'KeyA': moveLeft = false; break;
    case 'KeyD': moveRight = false; break;

    case 'Space': moveUp = false; break;
    case 'ShiftLeft': moveDown = false; break;

    case 'ArrowDown': lookUp = false; break;
    case 'ArrowUp': lookDown = false; break;
  }
});

// === Animation loop ===
function animate() {
  requestAnimationFrame(animate);

animate();

// === Window resize ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.body.addEventListener('click', () => {
  controls.lock();
});
