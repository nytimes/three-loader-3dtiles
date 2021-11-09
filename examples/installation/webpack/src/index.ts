import { Loader3DTiles } from 'three-loader-3dtiles'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import {
  Scene,
  PerspectiveCamera,
  Euler,
  WebGLRenderer,
  Clock
} from 'three'

const scene = new Scene()
const camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.y = 5;

const renderer = new WebGLRenderer()
const clock = new Clock()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls( camera, renderer.domElement);
controls.update();

let tilesRuntime = null;

async function loadTileset() {
  const result = await Loader3DTiles.load( 
  {
      url: 'https://int.nyt.com/data/3dscenes/ONA360/TILESET/0731_FREEMAN_ALLEY_10M_A_36x8K__10K-PN_50P_DB/tileset_tileset.json',
      renderer: renderer,
      options: {
        dracoDecoderPath: 'https://unpkg.com/three@0.129.0/examples/js/libs/draco',
        basisTranscoderPath: 'https://unpkg.com/three@0.129.0/examples/js/libs/basis'
      }
  }
  )
  const {model, runtime} = result
  model.rotation.copy(new Euler(-90 * Math.PI / 180, 0, 0));
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
