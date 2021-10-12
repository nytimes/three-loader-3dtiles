# A-Frame components for three-loader-3dtiles

These examples show how 3dtiles can be used inside of an A-Frame scene.

## `3d-tiles` component

### Properties

| Property | Type | Description | Default Value |
|----------|------|-------------|---------------|
| url | string | The URL of the tileset. For example if using Cesium ION, it would have the form: https://assets.cesium.com/[ASSET_ID]/tileset.json. | '' |
| cameraEl | selector | A selector for the camera whose position is used to determine which tiles to display at which LOD. If a `cameraEl` value is not provided then component uses `document.querySelector('a-scene').camera` to find `a-camera` primitive or entity with `camera` component. For more info see [Camera Requirement note below](#camera-requirement). | '' |
| maximumSSE | int | maximumScreenSpaceError (Optional) determines the distance from tiles in which they are refined, depending on their geometrical size. Increase the value to load lower LOD tiles from the same view distance (increases performance). | 16 |
| maximumMem | int | maximumMemoryUsage (Optional) determines maximum GPU memory (MB) to use for displaying tiles. May go over the limit if tiles within the camera viewport exceed that amount. | 32 |
| distanceScale | number | (Optional) 0-1 scale for the LOD quality. A lower value loads tiles from lower LODs (increases performance). | 1.0 |
| wireframe | boolean | (Optional) When viewing b3dm (mesh) tiles, show meshes as wireframe. | false | 
| cesiumIONToken | string | (Optional) A Cesium ION access token when loading tilesets from Cesium ION. | '' |

### Camera Requirement
To use the `3d-tiles` component, your A-Frame scene must have a camera defined using [`<a-camera>`](https://aframe.io/docs/1.2.0/primitives/a-camera.html) or the [`camera` component](https://aframe.io/docs/1.2.0/components/camera.html) . The component will attempt to use one of these automatically, or you can specify your own selector with the `cameraEl` property.

The camera is used to provide dynamic levels of detail (LOD) for 3D tiles. If no suitable camera is found the tiles will not display and an error is shown on the console `3D Tiles: Please add an active camera or specify the target camera via the cameraEl property`.

### Installation and Usage

Here is an example of loading A-Frame, the `3d-tiles` A-Frame component, and necessary supporting 3dtiles libraries from a CDN. 

```
<head>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>

    <script src='https://cdn.jsdelivr.net/npm/three@0.133.0/examples/js/utils/WorkerPool.js'></script>
    <script src='https://cdn.jsdelivr.net/npm/three@0.133.0/examples/js/loaders/KTX2Loader.js'></script>
    <script src='https://cdn.jsdelivr.net/npm/three-loader-3dtiles@1.0.4/dist/three-loader-3dtiles.min.js'></script>

    <script src='https://cdn.jsdelivr.net/npm/three-loader-3dtiles@1.0.4/examples/aframe/aframe-wrappers.js'></script>
</head>
```

Here is an example usage of `3d-tiles` component in a basic A-Frame scene:
```
<body>
  <a-scene>
    <a-camera></a-camera>
    <a-entity
      id="freeman-tiles"
      position="0.5 1.1 10"
      rotation="-90 0 0"
      3d-tiles="url: https://storage.googleapis.com/rd-big-files/tilesets/ONA360/TILESET/0731_FREEMAN_ALLEY_10M_A_36x8K__10K-PN_50P_DB/tileset_tileset.json;
      maximumSSE: 48;"
    ></a-entity>
    <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
    <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
    <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
    <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
    <a-sky color="#ECECEC"></a-sky>
  </a-scene>
</body>
```
