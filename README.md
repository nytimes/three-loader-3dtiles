# three-loader-3dtiles  
![license](https://img.shields.io/badge/License-Apache%202.0-yellow.svg) [![npm version](https://badge.fury.io/js/three-loader-3dtiles.svg)](https://badge.fury.io/js/three-loader-3dtiles)
[![Build Status](https://cloud.drone.io/api/badges/nytimes/three-loader-3dtiles/status.svg)](https://cloud.drone.io/nytimes/three-loader-3dtiles)

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
* [Photogrammetry exported to 3D Tiles in RealityCapture](https://nytimes.github.io/three-loader-3dtiles/examples/demos/realitycapture)
* [LiDAR Point Cloud hosted as 3D Tiles in Cesium ION](https://nytimes.github.io/three-loader-3dtiles/examples/demos/cesium)
* [Map overlay with OpenStreetMap](https://nytimes.github.io/three-loader-3dtiles/examples/demos/map-overlay)

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
      renderer: renderer,
      options: {
        dracoDecoderPath: 'https://unpkg.com/three@0.137.0/examples/js/libs/draco',
        basisTranscoderPath: 'https://unpkg.com/three@0.137.0/examples/js/libs/basis'        
      }
  )
  const {model, runtime} = result
  tilesRuntime = runtime
  scene.add(model)
}

function render() {
  const dt = clock.getDelta()
  if (tilesRuntime) {
    tilesRuntime.update(dt, renderer, camera)
  }
  renderer.render(scene, camera)
  window.requestAnimationFrame(render)
}

loadTileset()
render()
```

---

## Installation

The library supports [three.js](https://threejs.org/) r137 and uses its GLTF, Draco, and KTX2/Basis loaders.
Refer to the `browserslist` field in [package.json](./package.json) for target browsers.

### 1. ES Module
Download [dist/three-loader-3dtiles.esm.min.js](dist/three-loader-3dtiles.esm.min.js) and use an `importmap` to import the dependencies. See [here](examples/installation/es-module) for a full example. The [demos](examples/demos) also use this method of installation:

#### **`index.html`**
  ```html
  <script async src="https://ga.jspm.io/npm:es-module-shims@1.4.4/dist/es-module-shims.js"></script>
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.skypack.dev/three@0.137.0",
        "three/examples/jsm/loaders/GLTFLoader.js": "https://cdn.skypack.dev/three@v0.137.0/examples/jsm/loaders/GLTFLoader",
        "three/examples/jsm/loaders/DRACOLoader.js": "https://cdn.skypack.dev/three@v0.137.0/examples/jsm/loaders/DRACOLoader",
        "three/examples/jsm/loaders/KTX2Loader.js": "https://cdn.skypack.dev/three@v0.137.0/examples/jsm/loaders/KTX2Loader",
        "three-loader-3dtiles" : "./three-loader-3dtiles.esm.min.js"
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
If you use a build system such as Webpack / Parcel / Rollup etc, you should also install the library along with three.js from npm:
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
* Code for the demos is in [`examples/demos`](examples/demos).

## Alternatives
To our knowledge, this is the only [loaders.gl](https://github.com/visgl/loaders.gl)-based Three.js library, but there are several implementations of 3D Tiles for Three.js. Notable examples:

 - [NASSA-AMMOS / 3DTilesRendererJS](https://github.com/NASA-AMMOS/3DTilesRendererJS)
 - [ebeaufay / 3DTilesViewer](https://github.com/ebeaufay/3DTilesViewer)
 - [iTowns](https://github.com/iTowns/itowns)

 ---

> This repository is maintained by the Research & Development team at The New York Times and is provided as-is for your own use. For more information about R&D at the Times visit [rd.nytimes.com](https://rd.nytimes.com)
