## v1.2

## v1.2.7
- Experimental feature: real time draping of GeoJSON overlays (see example).
- Add a `Viewport` structure required on initial load and updated via the `setViewport()` function. Contains `width`, `height`, and `devicePixelRatio`.
- Added `setRenderer()` for setting the renderer after the first load if needed.

## v1.2.3
 - runtime.update() now takes `viewportSize:Vector2` rather than `viewportHeight:number` (for future features that will require viewport width).
 - Preliminary support and example for loading GeoJSON and overlaying on Google 3D Tiles.

## v1.2.2
 - Extract data attributions from Google's 3D Tiles.
 - Options added: 
    - `collectAttributions` 
    - `contentPostProcess`
    - `resetTransform`
 - Options removed:
    - `geoTransform` (use `orientToGeocoord` and `getWebMercatorCoord`)
    - `shaderCallback` (use `contentPostProcess`)
    - `computeNormals` (use `contentPostProcess`)

## v1.2.0
 - Support for Photorealistic 3D Tiles by Google Maps ([demo: requires API key](https://nytimes.github.io/three-loader-3dtiles/dist/web/examples/demos/google-3dtiles/), [demo source](https://github.com/nytimes/three-loader-3dtiles/blob/main/examples/demos/google-3dtiles/index.html)).
 - Upgrade to loaders.gl v4.1 and Three.js r160.
   - Includes loaders.gl PRs [#2847](https://github.com/visgl/loaders.gl/pull/2847) and [#2851](https://github.com/visgl/loaders.gl/pull/2851).
 - Faster build system with Vite.
 - Support for `memoryAdjustedScreenSpaceError` and `memoryCacheOverflow` - Adjust the maximum screen space error based on GPU memory utilization.
 - More accurate estimates of GPU memory utilization.
 - `runtime.update()` function now takes `viewportHeight` instead of the whole `renderer` object (for screen space error calculations).
 - Support providing an external `gltfLoader` in `options`, to reuse existing loader workers.
 - Minor performance optimizations.

## v1.1

### v1.1.17
 -  Support a three.js loading manager with a specified preloading tiles count. 
 
### v1.1.14
 -  Support setting point cloud opacity and material transparency.

### v1.1.12
 -  Point cloud shader fixes: support 16bit intensity values and a custom point size.

### v1.1.10
- Detect and reset the tileset orientation when it is deeper in the hierarchy (workaround for DJI Terra exports).

### v1.1.8
- Added a `GeoTransform` option, supporting Web Mercator. New demo with _OpenStreetMap_.

### v1.1.5
 - Fixed a bug where tileset geo-transformations were not correctly reset to 0.
 - Dispose KTX2 and DRACO loaders.
 - Support the `material` option in point cloud tilesets.

### v1.1.4
 - Bump to Three.js r137.

### v1.1.3
 - Bump to Three.js r133 and loaders.gl 3.1.4 ([issue #12](https://github.com/nytimes/three-loader-3dtiles/issues/12)).
 - Remove `loadersGlGltf`, `RDGLTFLoader.js`: Now supporting glTF parsing only via Three.JS.
 - Remove `initialTransform`: Now supoorting tileset transformation only via setting the matrix of the root Object3D.
 - Bug fixes in glTF tranversal and tile transformations ([issue #11](https://github.com/nytimes/three-loader-3dtiles/issues/11)).
 - Support for tilesets with shifted bounding volumes but no `transformMatrix` property (e.g. from _DJI Terra_).

## v1.0

### v1.0.9
Orientation bug fix for point cloud elevation shader.

### v1.0.8
Better disposal of materials and textures.

### v1.0.7
Set tile transform by the root object3d's transform. Update transforms by default.

### v1.0.6
- Added UMD build.

### v1.0.3

- Fixes for NPM build.
- Updates Webpack example.

### v1.0.1

- Name change.
- Drone CI Integration.

### v1.0.0

- First public release!
