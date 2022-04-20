import { Loader3DTiles, PointCloudColoring } from 'three-loader-3dtiles'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import StatsWidget from '@probe.gl/stats-widget';

import { OpenStreetMapsProvider, MapView, UnitsUtils, BingMapsProvider } from 'geo-three'

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

const camera = new PerspectiveCamera( 45,1, 0.1, 10000000 );
camera.position.set(0,0, 100);

const renderer = new WebGLRenderer()
renderer.outputEncoding = sRGBEncoding;

const clock = new Clock()
const controls = new OrbitControls( camera, renderer.domElement);

const canvasParent = document.querySelector('#canvas-parent');
const statsParent = document.querySelector('#stats-widget') as HTMLElement;

canvasParent.appendChild(renderer.domElement);

let tilesRuntime = undefined;
let statsRuntime = undefined;

const gridHelper = new GridHelper(100,5);
scene.add( gridHelper );

const light = new AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const provider = new BingMapsProvider();
const map = new MapView(MapView.PLANAR, provider);
scene.add(map)

async function loadTileset() {
  const result = await Loader3DTiles.load( 
  {
      url: 'https://storage.googleapis.com/rd-big-files/DRONE/2022/RC-TILESET/P1/0322_Presidents_P1_10M_78x8K__10K-PN_DB/tileset_tileset.json',
      renderer: renderer,
      options: {
        dracoDecoderPath: 'https://unpkg.com/three@0.137.0/examples/js/libs/draco',
        basisTranscoderPath: 'https://unpkg.com/three@0.137.0/examples/js/libs/basis',
        debug: false,
        pointCloudColoring: PointCloudColoring.RGB,
        resetGeoTransform: false
      }
  }
  )
  const {model, runtime} = result
  tilesRuntime = runtime

  statsRuntime = new StatsWidget(runtime.getStats(), {container: statsParent });
  statsParent.style.visibility = 'visible';

  scene.add(runtime.getTileBoxes());
  scene.add(model)

  camera.position.copy(model.position);
  camera.translateY(100);
  controls.target.copy(model.position);
  controls.update();
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
