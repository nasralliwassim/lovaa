// THREE.js 3D Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const heartShape = new THREE.Shape();
heartShape.moveTo(0.25, 0.25);
heartShape.bezierCurveTo(0.25, 0, 0, 0, 0, 0.25);
heartShape.bezierCurveTo(0, 0.5, 0.25, 0.75, 0.5, 1);
heartShape.bezierCurveTo(0.75, 0.75, 1, 0.5, 1, 0.25);
heartShape.bezierCurveTo(1, 0, 0.75, 0, 0.5, 0.25);
heartShape.bezierCurveTo(0.5, 0, 0.25, 0, 0.25, 0.25);

const geometry = new THREE.ExtrudeGeometry(heartShape, {
  depth: 0.3,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.05,
  bevelSegments: 10
});

const material = new THREE.MeshPhongMaterial({ color: 0xff3366, shininess: 100 });

const hearts = [];
for (let i = 0; i < 15; i++) {
  const heart = new THREE.Mesh(geometry, material);
  heart.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 5
  );
  heart.rotationSpeed = {
    x: (Math.random() * 0.01),
    y: (Math.random() * 0.01)
  };
  scene.add(heart);
  hearts.push(heart);
}

function animate() {
  requestAnimationFrame(animate);
  hearts.forEach(h => {
    h.rotation.y += h.rotationSpeed.y;
    h.rotation.x += h.rotationSpeed.x;
  });
  renderer.render(scene, camera);
}

animate();

// Resize responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Audio control
const playPauseBtn = document.getElementById('playPauseBtn');
const audio = document.getElementById('audio');

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      playPauseBtn.textContent = "⏸ Pause la musique";
    }).catch((err) => {
      console.error("Erreur de lecture audio :", err);
    });
  } else {
    audio.pause();
    playPauseBtn.textContent = "🎵 Lire la musique";
  }
});
