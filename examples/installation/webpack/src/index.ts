import { Loader3DTiles } from 'three-loader-3dtiles'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
  sRGBEncoding
} from 'three'

const scene = new Scene()

const camera = new PerspectiveCamera()
camera.position.set(0,0,10);

const renderer = new WebGLRenderer()
renderer.outputEncoding = sRGBEncoding;

const clock = new Clock()
const controls = new OrbitControls( camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let tilesRuntime = null;

async function loadTileset() {
  const result = await Loader3DTiles.load( 
  {
      url: 'https://int.nyt.com/data/3dscenes/ONA360/TILESET/0731_FREEMAN_ALLEY_10M_A_36x8K__10K-PN_50P_DB/tileset_tileset.json',
      renderer: renderer,
      options: {
        dracoDecoderPath: 'https://unpkg.com/three@0.137.0/examples/js/libs/draco',
        basisTranscoderPath: 'https://unpkg.com/three@0.137.0/examples/js/libs/basis'
      }
  }
  )
  const {model, runtime} = result
  tilesRuntime = runtime
  scene.add(model)
}

function render() {
  const dt = clock.getDelta()
  controls.update();
  if (tilesRuntime) {
    tilesRuntime.update(dt, renderer, camera)
  }
  renderer.render(scene, camera)
  window.requestAnimationFrame(render)
}

loadTileset();
render()
