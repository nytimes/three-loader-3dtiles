# three-loader-3dtiles  
![license](https://img.shields.io/badge/License-Apache%202.0-yellow.svg) [![npm version](https://badge.fury.io/js/three-loader-3dtiles.svg)](https://badge.fury.io/js/three-loader-3dtiles)
[![Build Status](https://drone.dv.nyt.net/api/badges/nytimes/three-loader-3dtiles/status.svg)](https://drone.dv.nyt.net/nytimes/three-loader-3dtiles)

[Demos](#demos) &mdash;
[Usage](#basic-usage) &mdash;
[Roadmap](#roadmap) &mdash;
[Contributing](#contributing) &mdash;
[Docs](#docs) &mdash;
[Alternatives](#alternatives)

This is a [Three.js](https://threejs.org/) loader module for handling [OGC 3D Tiles](https://www.ogc.org/standards/3DTiles), created by [Cesium](https://github.com/CesiumGS/3d-tiles). It currently supports the two main formats:

1. Batched 3D Model (b3dm) - based on glTF.
2. Point cloud.

Internally, the loader uses the [loaders.gl library](https://github.com/visgl/loaders.gl), which is part of the [vis.gl platform](https://vis.gl/), openly governed by the [Urban Computing Foundation](https://uc.foundation/). Cesium has [worked closely with loaders.gl](https://cesium.com/blog/2019/11/06/cesium-uber/) to create a platform-independent implementation of their 3D Tiles viewer.

Development of this library started at The New York Times R&D as an effort to create a clean bridge between the 3D Tiles specification and the widely used 3D library Three.js. The library helps us deliver massive 3D and Geographical journalism to desktops and mobile readers alike. From **Re**porting to **Tele**porting!

---

## Demos
* [Photogrammetry exported to 3D Tiles in RealityCapture](https://nytimes.github.io/three-loader-3dtiles/dist/web/examples/demos/realitycapture)
* [LiDAR Point Cloud hosted as 3D Tiles in Cesium ION](https://nytimes.github.io/three-loader-3dtiles/dist/web/examples/demos/cesium)
* [Map overlay with OpenStreetMap](https://nytimes.github.io/three-loader-3dtiles/dist/web/examples/demos/map-overlay)
* [Google Maps Photorealistic 3D Tiles](https://nytimes.github.io/three-loader-3dtiles/dist/web/examples/demos/google-3dtiles)
* [Google 3D Tiles with GeoJSON Draping (experimental)](https://nytimes.github.io/three-loader-3dtiles/dist/web/examples/demos/google-geojson)

---

## Basic Usage
Here is a simple example using the `Loader3DTiles` module to view a `tileset.json` containing a 3d tile hierarchy.

```javascript
import { 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  Clock 
} from 'three'
import { Loader3DTiles } from 'three-loader-3dtiles';

const scene = new Scene()
const camera = new PerspectiveCamera()
const renderer = new WebGLRenderer()
const clock = new Clock()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let tilesRuntime = null;

async function loadTileset() {
  const result = await Loader3DTiles.load(
      url: 'https://<TILESET URL>/tileset.json',
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio
      }
      options: {
        dracoDecoderPath: 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco',
        basisTranscoderPath: 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis',
      }
  )
  const {model, runtime} = result
  tilesRuntime = runtime
  scene.add(model)
}

function render() {
  const dt = clock.getDelta()
  if (tilesRuntime) {
    tilesRuntime.update(dt, window.innerHeight, camera)
  }
  renderer.render(scene, camera)
  window.requestAnimationFrame(render)
}

loadTileset()
render()
```

---

## Installation

The library supports [three.js](https://threejs.org/) r160 and uses its GLTF, Draco, and KTX2/Basis loaders.
Refer to the `browserslist` field in [package.json](./package.json) for target browsers.

### 1. ES Module
Use an `importmap` to import the dependencies from the npm. See [here](examples/installation/es-module) for a full example. 

#### **`index.html`**
  ```html
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
        "three/examples/jsm/": "https://unpkg.com/three@0.160.0/examples/jsm/",
        "three-loader-3dtiles" : "https://unpkg.com/three-loader-3dtiles/dist/lib/three-loader-3dtiles.js"
      }
    }
  </script>
  <script src='index.js' type='module'>

  ```
#### **`index.js`**
  ```javascript
  import { Scene, PerspectiveCamera } from 'three';
  import { Loader3DTiles } from 'three-loader-3dtiles';
  ```

### 3. NPM
If you use a build system such as Webpack / Vite / Rollup etc, you should also install the library along with three.js from npm:
```
npm install -s three three-loader-3dtiles
```
The application script would be the same as in the ES Module example (when using `importmap`).

See [here](examples/installation/webpack) for a complete webpack example.

### 4. A-Frame
Refer to our dedicated A-Frame component: [aframe-loader-3dtiles-component](https://github.com/nytimes/aframe-loader-3dtiles-component).

### 5. React-Three-Fiber
Refer to [examples/r3f](examples/r3f).

---
## Roadmap 

### Supporting 3D Tiles Next
The [3D Tiles Next specification](https://cesium.com/blog/2021/11/10/introducing-3d-tiles-next/) is in the works, with some of the features already supported in loaders.gl. Supporting the new extensions opens up possibilities for new applications.

### Skip-traversal
Implementing the [Skip traversal mechanism](https://cesium.com/blog/2017/05/05/skipping-levels-of-detail/) could greatly improve performance of b3dm (mesh) tiles, but requires a shader/Stencil buffer-based implementation which manually manges Z-culling. This is a very wanted feature and contributions would be greatly appreciated.


## Contributing

Refer to [CONTRIBUTING.MD](./CONTRIBUTING.md) for general contribution instructions.

### Developing
The library is built using rollup. To run a simple development server type:
```
npm run dev
```
It is also possible to develop the library while developing loaders.gl. Just clone the source of loaders.gl and run:
```
LOADERS_GL_SRC=<path to loaders.gl> npm run dev
```

### Building
To build the library run:
```
npm run build
```
To build the production minified version run:
```
npm run build:production
```
And to build the API documentation run:
```
npm run docs
```


### Tests
A rudimentary test spec is available at [./test](./test). To run it type:
```
npm run test
```


## Docs
* API documentation is available [here](docs/three-loader-3dtiles.md). 
* Code for the demos is in [examples/demos](https://github.com/nytimes/three-loader-3dtiles/tree/main/examples/demos).

## Alternatives
To our knowledge, this is the only [loaders.gl](https://github.com/visgl/loaders.gl)-based Three.js library, but there are several implementations of 3D Tiles for Three.js. Notable examples:

 - [NASSA-AMMOS / 3DTilesRendererJS](https://github.com/NASA-AMMOS/3DTilesRendererJS)
 - [ebeaufay / 3DTilesViewer](https://github.com/ebeaufay/3DTilesViewer)
 - [iTowns](https://github.com/iTowns/itowns)

 ---

> This repository is maintained by the Research & Development team at The New York Times and is provided as-is for your own use. For more information about R&D at the Times visit [rd.nytimes.com](https://rd.nytimes.com)
