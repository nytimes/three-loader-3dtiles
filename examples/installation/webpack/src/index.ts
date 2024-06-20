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
  SRGBColorSpace,
  GridHelper,
  AmbientLight
} from 'three'

const scene = new Scene()

const gridHelper = new GridHelper( 1000, 10 );
scene.add( gridHelper );

const camera = new PerspectiveCamera();
camera.position.set(0,0,100);

const renderer = new WebGLRenderer()
renderer.outputColorSpace = SRGBColorSpace;

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
      url: 'https://int.nyt.com/data/3dscenes/ONA360/TILESET/0731_FREEMAN_ALLEY_10M_A_36x8K__10K-PN_50P_DB/tileset_tileset.json',
      viewport: getViewport(),
      options: {
        dracoDecoderPath: 'https://unpkg.com/three@0.160.0/examples/jsm/libs/draco',
        basisTranscoderPath: 'https://unpkg.com/three@0.160.0/examples/jsm/libs/basis',
        debug: true,
        pointCloudColoring: PointCloudColoring.RGB
      }
  }
  )
  const {model, runtime} = result;
  scene.add(model);
  scene.add(runtime.getTileBoxes());

  tilesRuntime = runtime

  statsRuntime = new StatsWidget(runtime.getStats(), {container: statsParent });
  statsParent.style.visibility = 'visible';

  model.rotation.set(-Math.PI/2, 0, 0);
}

function render() {
  const dt = clock.getDelta()
  controls.update();
  if (tilesRuntime) {
    tilesRuntime.update(dt, canvasParent.clientHeight, camera)
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
  tilesRuntime?.setViewport(getViewport());
}
window.addEventListener('resize', onWindowResize)

function getViewport() {
  return {
    width: canvasParent.clientWidth,
    height: canvasParent.clientHeight,
    devicePixelRatio: window.devicePixelRatio
  }
}

loadTileset();
onWindowResize();
render();
