import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


//three js components
let scene, camera, renderer, clock, mixer, clips
let cameraPosition = new THREE.Vector3(0, 0, 20)
let model
const loader = new THREE.TextureLoader();
const cross = loader.load('./particleTex.png');

const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 5000;

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
  //posArray[i] = Math.random()
  //posArray[i] = Math.random() -0.5;
  posArray[i] = (Math.random() -0.5) * 10;
}

const material = new THREE.PointsMaterial({
  size: .25,
  map: cross,
  transparent: true,
  opacity: .5,
  blending: THREE.NormalBlending
});

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMesh = new THREE.Points(particlesGeometry, material);

let divCanvas = document.querySelector('#three');


console.log(divCanvas.clientHeight + " " + divCanvas.clientWidth);
function init() {
  //clock
  clock = new THREE.Clock()

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(15, divCanvas.clientWidth / divCanvas.clientHeight, 0.1, 1000)
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
  camera.lookAt(0, 2.5, 0)
  //set up renderer
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#three'),
    antialias: true,
    alpha: true
  })
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(divCanvas.clientWidth, divCanvas.clientHeight)

  //add lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
  directionalLight.position.set(1, 1, 1)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
  scene.add(directionalLight, ambientLight)

  //add some cubes
  /*
  const floorGeometry = new THREE.BoxGeometry(5, 0.1, 5)
  const material = new THREE.MeshStandardMaterial({ color: 0x99bbee })
  const floor = new THREE.Mesh(floorGeometry, material)
  floor.position.set(0, -0.05, 0)

  const wallGeometry = new THREE.BoxGeometry(5, 3, 0.1)
  const back = new THREE.Mesh(wallGeometry, material)
  back.position.set(0, 1.5, -2.5)

  scene.add(floor, back)*/
  scene.add(particlesMesh);
  //add your model
  // create a animation mixer

  // Instantiate a loader
  const loader = new GLTFLoader();

  // Load a glTF resource
  loader.load(
    // resource URL
    'smallerTex.glb',
    // called when the resource is loaded
    function(gltf) {
      model = gltf.scene
      scene.add(model);
     model.scale.set(2.4, 2.4, 2.4);

      mixer = new THREE.AnimationMixer(model);
      clips = gltf.animations; // Array<THREE.AnimationClip>
      mixer.clipAction(clips[0]).play()
      
    },
    // called while loading is progressing
    function(xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function(error) {
      console.log('An error happened');
    }
  );

  window.onresize = function() {
    console.log(divCanvas.clientHeight + " " + divCanvas.clientWidth);
     
    camera.aspect = (window.innerWidth/ window.innerHeight)
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

let previousMousePosition = {
x: 0,
y: 0
};

let touchStartX = 0;
let touchStartY = 0;
let rotationSpeed = 0.01;

let isDragging = false;

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('touchstart', onTouchStart, false);
document.addEventListener('touchmove', onTouchMove, false);

function onMouseDown(event) {
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
}

function onMouseMove(event) {
  if (!isDragging) return;

  const deltaX = event.clientX - previousMousePosition.x;
  const deltaY = event.clientY - previousMousePosition.y;


  if(event.clientX < previousMousePosition.x) {
    rotationSpeed *= -1;
  }

  if(event.clientX > previousMousePosition.x) {
    rotationSpeed *= -1;
  }

  rotateModel(deltaX, deltaY);

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
}



function onMouseUp() {
  isDragging = false;
}

function onTouchStart(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function onTouchMove(event) {
  if (event.touches.length === 1) {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;

    // Rotate the model based on touch movement

    console.log("clientX " + event.touches[0].clientX);
    console.log("previoustouch position " + touchStartX)


  
    model.rotation.y += deltaX * rotationSpeed;
    model.rotation.x += 0 * rotationSpeed; 
    particlesMesh.rotation.y += deltaX * rotationSpeed*.5;


    touchStartX = touchX;
    touchStartY = touchY;
  }
} 

rotateModel();
function rotateModel(deltaX, deltaY) {
  // Adjust the rotation speed
  const rotationSpeed = 0.005;

  if (!model) return;

  // Rotate the model
  model.rotation.y += deltaX * rotationSpeed;
  model.rotation.x += 0 * rotationSpeed;
  particlesMesh.rotation.y += deltaX * rotationSpeed*2;
}

function animate() {
  requestAnimationFrame(animate)
  //model.rotation.y += rotationSpeed;
  particlesMesh.rotation.y += rotationSpeed *.5;

  if (mixer) {
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera)
}



const tick = () =>
{
  
  console.log("hello");
  const elapsedTime = clock.getElapsedTime()

  window.requestAnimationFrame(tick);
  
}

init()
animate()
tick();