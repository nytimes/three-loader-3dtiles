## v1.1

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
