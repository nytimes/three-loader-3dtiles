import { Stats } from '@probe.gl/stats';
import { Tileset3D } from '@loaders.gl/tiles';
import {
  Object3D,
  Vector3,
  Material,
  Shader,
  WebGLRenderer,
} from 'three';

/** Types of coloring used when viewing point cloud tiles */
enum PointCloudColoring {
  Intensity = 1,
  Classification = 2,
  Elevation = 3,
  RGB = 4,
  White = 5,
}

/** Types of shading used when viewing b3dm (mesh) tiles */
enum Shading {
  FlatTexture = 1,
  ShadedTexture = 2,
  ShadedNoTexture = 3,
}

enum GeoTransform {
  Reset = 1,
  Mercator = 2,
  WGS84Cartesian = 3
}

/** Properties for loading a tileset */
interface LoaderProps {
    /** The URL of the tileset. For example if using Cesium ION, 
    * it would have the form: `https://assets.cesium.com/[ASSET_ID]/tileset.json`.
    */
    url: string;
    /** Required when using compressed textures (basis universal) for GPU feature detection. */
    renderer?: WebGLRenderer;
    /** Advanced options for loading the tileset ({@link LoaderOptions}) */
    options?: LoaderOptions;
    onProgress?(progress: number | ProgressEvent<EventTarget>, total?: number): void;
}

/** Advanced loader options */
interface LoaderOptions {
  /** A Cesium ION access token when loading tilesets from Cesium ION. */
  cesiumIONToken?: string;
  /** Whether to check if the tileset was transformed, set to `true` if the model is changes position in runtime. Default: `true` */
  updateTransforms?: boolean;
  /** Interval in seconds for the traverser to check in an update is needed - Default: `0.1`. */
  updateInterval?: number;
  /** Maximum GPU memory (MB) to use for displaying tiles. May go over the limit if tiles within the camera viewport exceed that ammount - Default: `32`. */
  maximumMemoryUsage?: number;
  /** determines the distance from tiles in which they are refined, depending on their geometrical size. increase the value to load lower lod tiles from the same view distance (increases performnace) - default: `16`.*/
  maximumScreenSpaceError?: number;
  /** 0-1 scale for the LOD quality. A lower value loads tiles from lower LODs (increases performance). */ 
  viewDistanceScale?: number;
  /** Maximum worker thread concurrency when processing DRACO-compressed tiles - Default: `1` worker. */
  maxConcurrency?: number;
  /** Whether to use workers when processing DRACO-compressed tiles - Default: `true`. */
  worker?: boolean;
  /** Whether to throttle network requests so that tiles got out of the frame before the request launched, would not be requested - Default: `true` */
  throttleRequests?: boolean;
  /** When thorttling requests, how many requests can launch simultaneously - Default: `64` */
  maxRequests?: number;
  /** _EXPERIMENTAL_: Skip traversal mechanism, not yet supported. Default: `false` */ 
  skipLevelOfDetail?: boolean;
  /** When viewing b3dm (mesh) tiles, which type of {@link Shading} is used - Default: `Shading.FlatTexture` */
  shading?: Shading;
  /** Whether to set the material as transparent - Default: `false` */
  transparent?: boolean;
  /** Apply a custom material, supports both b3dm (mesh) tiles and Point Cloud tiles - Default: `undefined` **/
  material?: Material;
  /** When viewing b3dm (mesh) tiles, a callback to update shader uniforms - Default: `undefined` */
  shaderCallback?: (shader: Shader, renderer: WebGLRenderer) => void;
  /** When viewing b3dm (mesh) tiles, show meshes as wireframe - Default: `false`. */
  wireframe?: boolean;
  /** When viewing b3dm (mesh) tiles, compute the vertex normals - Default: `false`. */
  computeNormals?: boolean;
  /** When viewing Point Cloud tiles, how should the points be colored ({@link PointCloudColoring}) - Default: `PointCloudColoring.White` */
  pointCloudColoring?: PointCloudColoring;
  /** Point size for Point Cloud tiles -  Default: `1.0` */
  pointSize?: number;
  /** Debug mode: Show tile bounding boxes. Make sure to add the boxes to the scene from {@link Runtime.getTileBoxes} - Default: `false` */
  debug?: boolean;
  /** A path to that contains the basis universal library. e.g: `https://unpkg.com/three@0.129.0/examples/js/libs/basis` - Default: `undefined` */
  basisTranscoderPath?: string;
  /** A path to that contains the draco library. e.g: `https://unpkg.com/three@0.129.0/examples/js/libs/draco` - Default: `undefined` */
  dracoDecoderPath?: string;
  /** How to handle geo transformations: Reset any geo location and place the model at (0,0,0), Apply Mercator projection (for use with ccommon 2D mapping applications, or convert WGS84 long/lat to 3D cartesian coordinates)- Default: `Reset` */
  geoTransform?: GeoTransform;
}

/** Container object for interfacing with lat/long/height coordinates */
interface GeoCoord {
  long: number;
  lat: number;
  height: number;
}

/** Runtime methods that can be used once a tileset is loaded */
interface Runtime {
  /** 
  * Get a reference to the loaders.gl {@link https://github.com/visgl/loaders.gl/blob/master/modules/tiles/docs/api-reference/tileset-3d.md | Tileset3D} object.
  *
  * @returns {@link https://github.com/visgl/loaders.gl/blob/master/modules/tiles/docs/api-reference/tileset-3d.md | Tileset3D} 
  */
  getTileset(): Tileset3D;
  /** 
  * Get a reference to the probe.gl {@link https://github.com/uber-web/probe.gl/blob/master/docs/api-reference/stats/stats.md | Stats} object. 
  * @returns {@link https://github.com/uber-web/probe.gl/blob/master/docs/api-reference/stats/stats.md | Stats}
  */
  getStats(): Stats;
  /** Get the tile bounding boxes group when `debug: true` is set. */
  getTileBoxes(): Object3D;
  /** Show or hide the tile bounding boxes. */
  showTiles(boolean): void;
  /** Enable or disable wireframe mode. */
  setWireframe(boolean): void;
  /** Enable or disable deubg mode. */
  setDebug(boolean): void;
  /** Set the current shading mode for b3dm tiles. See {@link Shading}. */
  setShading(Shading): void;
  /** Set the current view distance scale. See {@link LoaderOptions} */
  setViewDistanceScale(number): void;
  /** In point clouds wher the points are classified as `Ground`, hide the ground level points - Default: `false`.*/
  setHideGround(boolean): void;
  /** In point clouds set the type of coloring used. See {@link PointCloudColoring} */
  setPointCloudColoring(PointCloudColoring): void;
  /** In point clouds when coloring by `PointCloudColoring.Elevation`, set the min/max elevation values - Default: `[0, 400]`. */
  setElevationRange(range: ReadonlyArray<number>): void;
  /** In point clouds when coloring by `PointCloudColoring.Intensity`, set the max intensity value -  Default: `1.0` */
  setMaxIntensity(number): void;
  /** In point clouds when coloring by `PointCloudColoring.Intensity`, set the contrast factor. Default: `1.0`. */
  setIntensityContrast(number): void;
  /** In point clouds when, set the alpha value. Default: `1.0`. */
  setPointAlpha(number): void;
  /** When viewing a Geo-located tileset, get the {@link GeoCoord} value from a world-space `Vector3`. */
  getLatLongHeightFromPosition(Vector3): GeoCoord;
  /** When viewing a Geo-located tileset, world-space `Vector3` from a {@link GeoCoord}. */
  getPositionFromLatLongHeight(GeoCoord): Vector3;
  /** Get the current camera frustum as mesh planes (for debugging purposes). */
  getCameraFrustum(Camera): Object3D;
  /** Update the tileset for rendering. */
  update(number, WebGLRenderer, Camera): void;
  /** Dispose of all of the tileset's assets in memory. */
  dispose(): void;
}

export { LoaderProps, LoaderOptions, PointCloudColoring, Runtime, GeoCoord, Shading, GeoTransform };
