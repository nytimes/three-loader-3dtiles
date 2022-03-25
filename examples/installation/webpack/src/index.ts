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
  GridHelper
} from 'three'

const scene = new Scene()

const camera = new PerspectiveCamera()
camera.position.set(0,0, 100);

const renderer = new WebGLRenderer()
renderer.outputEncoding = sRGBEncoding;

const clock = new Clock()
const controls = new OrbitControls( camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


const canvasParent = document.querySelector('#canvas-parent');
const statsParent = document.querySelector('#stats-widget') as HTMLElement;

let tilesRuntime = undefined;
let statsRuntime = undefined;

const gridHelper = new GridHelper(100,5);
scene.add( gridHelper );

async function loadTileset() {
  const result = await Loader3DTiles.load( 
  {
       url: 'https://int.nyt.com/data/3dscenes/ONA360/TILESET/0731_FREEMAN_ALLEY_10M_A_36x8K__10K-PN_50P_DB/tileset_tileset.json',
      renderer: renderer,
      options: {
        dracoDecoderPath: 'https://unpkg.com/three@0.137.0/examples/js/libs/draco',
        basisTranscoderPath: 'https://unpkg.com/three@0.137.0/examples/js/libs/basis',
        debug: true,
        pointCloudColoring: PointCloudColoring.RGB
      }
  }
  )
  const {model, runtime} = result
  tilesRuntime = runtime

  model.rotation.set(-Math.PI/2, 0, 0);

  statsRuntime = new StatsWidget(runtime.getStats(), {container: statsParent });
  statsParent.style.visibility = 'visible';

  scene.add(runtime.getTileBoxes());
  scene.add(model)
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

loadTileset();
render()
