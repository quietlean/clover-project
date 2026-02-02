// 'npx vite' um den server zu starten

import './style.css'
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'; //three/examples/jsm/loaders/OBJLoader.js three/examples/jsm/loaders/OBJLoader.js

console.log(OBJLoader);

// ========== Die Szene wird erstellt ==========

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2b2e34);

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 2000)

const renderer = new THREE.WebGLRenderer({ //Hier wird ausgewählt durch was unser canvas gerendert wird
  //canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio); //das ist glaube dafür das das canvas die gleiche Seitenratio hat wie der Browser
renderer.setSize(window.innerWidth, window.innerHeight); //das sorgt dafür das das canvas Fullscreen ist
renderer.setAnimationLoop(animate);
document.body.appendChild( renderer.domElement); //in dem fall wird das canvas erst durch das js script ins HTML eingefügt

camera.position.z = 5;

renderer.render(scene, camera); //Hier geben wir jetzt dem renderer die szene und die Kamera die gerendert werden sollen

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// ========== Die Objekte werden der Szene hinzugefügt ==========

const loader = new OBJLoader();
//const object = await loader.loadAsync('/3d-assets/skullgoon.obj')
//scene.add(object);

let skull = null; // hier wird das obj reingeladen

console.log('🚀 VOR loader.load');
loader.load(
  '/clover-project/modelle/skull-1.obj',
  (obj) => {
    skull = obj;

    console.log('OBJ GELADEN .2');
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhongMaterial({
          color: 0x00ff00,
          flatShading: true,
        });
      }
    });

    obj.scale.set(0.5, 0.5, 0.5); // OBJ ist oft riesig
    scene.add(obj);
  },
  undefined,
  (error) => {
    console.error(error);
  }

  
);
console.log('🚀 NACH loader.load');
/*
async function loadSkull() {
  const obj = await loader.loadAsync('/public/modelle/skull-1.obj');

  obj.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        flatShading: true,
      });
    }
  });

  obj.scale.set(0.5, 0.5, 0.5);
  scene.add(obj);
  skull = obj;
}

loadSkull();
*/

// ========== Die Animation wird ausgeführt ==========

// Für scrollen auf Computern
let scrollValue = 0

window.addEventListener('wheel', (event) => {
  scrollValue += event.deltaY * 0.001
})

// Für scrollen auf Geräten mit Touch-Display
window.addEventListener('touchstart', (event) => {
  startY = event.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', (event) => {
  const y = event.touches[0].clientY;
  const diff = startY - y;
  scrollValue += diff * 0.01; // Anpassbarer Faktor für die Scroll-Empfindlichkeit
  startY = y;
  event.preventDefault(); // Verhindert das Standard-Scrollverhalten der Seite
}, { passive: false });

function animate() {

  requestAnimationFrame(animate);

  skull.rotation.y = scrollValue;
  /*if (skull) { //sonst startet die animation befor das modell geladen hat
    skull.rotation.y = scrollValue;
  }*/

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => { //das sorgt dafür, dass das canvas und die kamera und die szene upgedated werden, wenn sich der viewport ändert
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}); 