import { Loader3DTiles, PointCloudColoring } from 'three-loader-3dtiles'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import StatsWidget from '@probe.gl/stats-widget';

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
  sRGBEncoding,
  GridHelper,
  AmbientLight
} from 'three'

const scene = new Scene()

const gridHelper = new GridHelper( 1000, 10 );
scene.add( gridHelper );

const camera = new PerspectiveCamera();
camera.position.set(0,0,100);

const renderer = new WebGLRenderer()
renderer.outputEncoding = sRGBEncoding;

const clock = new Clock()
const controls = new OrbitControls( camera, renderer.domElement);

const canvasParent = document.querySelector('#canvas-parent');
const statsParent = document.querySelector('#stats-widget') as HTMLElement;

canvasParent.appendChild(renderer.domElement);

let tilesRuntime = undefined;
let statsRuntime = undefined;


async function loadTileset() {
  const result = await Loader3DTiles.load( 
  {
      url: 'https://assets.cesium.com/1182497/tileset.json',
      renderer: renderer,
      options: {
        dracoDecoderPath: 'https://unpkg.com/three@0.137.0/examples/js/libs/draco',
        basisTranscoderPath: 'https://unpkg.com/three@0.137.0/examples/js/libs/basis',
        debug: false,
        pointCloudColoring: PointCloudColoring.RGB,
        cesiumIONToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNGFlZTdjZi1lYmJiLTQ4YTMtODBhOS00OTEwZGFlZTE3YjUiLCJpZCI6Mjk0NDUsImlhdCI6MTY1NjM2Mzk5MH0.0vBVNZq3_NfesCswCBEoBAVvlQePbXJtQZ1LgEEy3DY",
        pointSize: 3.0,
        transparent: true
      }
  }
  )
  const {model, runtime} = result;
  scene.add(model);
  scene.add(runtime.getTileBoxes());

  tilesRuntime = runtime

  setTimeout(() => {
    runtime.setPointAlpha(0.1);
  }, 3000)

  statsRuntime = new StatsWidget(runtime.getStats(), {container: statsParent });
  statsParent.style.visibility = 'visible';

  model.rotation.set(-Math.PI/2, 0, 0);
}

function render() {
  const dt = clock.getDelta()
  controls.update();
  if (tilesRuntime) {
    tilesRuntime.update(dt, renderer, camera)
  }
  if (statsRuntime) {
    statsRuntime.update();
  }
  renderer.render(scene, camera)
  window.requestAnimationFrame(render)
}

function onWindowResize() {
  renderer.setSize(canvasParent.clientWidth, canvasParent.clientHeight);
  camera.aspect = canvasParent.clientWidth / canvasParent.clientHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', onWindowResize)

loadTileset();
onWindowResize();
render();
