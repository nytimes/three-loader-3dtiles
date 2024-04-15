import { Camera } from 'three';
import { Color } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { LoadingManager } from 'three';
import { Material } from 'three';
import { Mesh } from 'three';
import { Object3D } from 'three';
import { Points } from 'three';
import { Stats as Stats_2 } from '@probe.gl/stats';
import { Tileset3D } from '@loaders.gl/tiles';
import { Vector2 } from 'three';
import { Vector3 } from 'three';
import { WebGLRenderer } from 'three';

export declare interface FeatureToColor {
    /** Name of the property in the GeoJSON feature data */
    feature: string;
    /** A function mapping a value of the property to a vertex color*/
    colorMap: (value: number) => Color;
}

/** Container object for interfacing with lat/long/height coordinates */
export declare interface GeoCoord {
    /** Longitude */
    long: number;
    /** Latitude */
    lat: number;
    /** Height */
    height: number;
}

export declare interface GeoJSONLoaderProps {
    /** The URL of the GeoJSON file. */
    url: string;
    /** cartographic A height in which to place the GeoJSON */
    height: number;
    /** A mapping function between data features and vertex colors */
    featureToColor?: FeatureToColor;
}

/** 3D Tiles Loader */
export declare class Loader3DTiles {
    /**
     * Loads a tileset of 3D Tiles according to the given {@link LoaderProps}
     * @public
     *
     * @param props - Properties for this load call {@link LoaderProps}.
     * @returns An object containing the 3D Model to be added to the scene
     * and a runtime engine to be updated every frame.
     */
    static load(props: LoaderProps): Promise<{
        model: Object3D;
        runtime: Runtime;
    }>;
    /**
     * Loads a tileset of 3D Tiles according to the given {@link GeoJSONLoaderProps}
     * Could be overlayed on geograpical 3D Tiles using {@link Runtime.overlayGeoJSON}
     * @public
     *
     * @param props - Properties for this load call {@link GeoJSONLoaderProps}.
     * @returns An object containing the 3D Model to be added to the scene
     */
    static loadGeoJSON(props: GeoJSONLoaderProps): Promise<Object3D>;
}

/** Advanced loader options */
export declare interface LoaderOptions {
    /** A Cesium ION access token when loading tilesets from Cesium ION. */
    cesiumIONToken?: string;
    /** Google API Key for loading Google Maps 3D Tiles*/
    googleApiKey?: string;
    /** Collect tile attribution data (copyright) - Default: `true` if `googleApiKey` is set, otherwise `false`. */
    collectAttributions?: boolean;
    /** Whether to reset the tileset to the origin (0, 0, 0) - Default: `false`. */
    resetTransform?: boolean;
    /** Whether to check if the tileset was transformed, set to `true` if the model is changes position in runtime - Default: `true`. */
    updateTransforms?: boolean;
    /** Interval in seconds for the traverser to check in an update is needed - Default: `0.1`. */
    updateInterval?: number;
    /** Maximum GPU memory (MB) to use for displaying tiles. May go over the limit if tiles within the camera viewport exceed that ammount - Default: `32`. */
    maximumMemoryUsage?: number;
    /** determines the distance from tiles in which they are refined, depending on their geometrical size. increase the value to load lower lod tiles from the same view distance (increases performnace) - Default: `16`.*/
    maximumScreenSpaceError?: number;
    /** Whether to adjust the screen space error to maintain the maximum memory limit - Default `true`.*/
    memoryAdjustedScreenSpaceError?: boolean;
    /** The maximum additional memory (in MB) to allow for cache headroom before adjusting the screen spacer error - Default: `1`. */
    memoryCacheOverflow?: number;
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
    /** A callback for running post-processing on tile content (Mesh or Points) - Default: `undefined` */
    contentPostProcess?: (content: Mesh | Points) => void;
    /** When viewing b3dm (mesh) tiles, show meshes as wireframe - Default: `false`. */
    wireframe?: boolean;
    /** When viewing Point Cloud tiles, how should the points be colored ({@link PointCloudColoring}) - Default: `PointCloudColoring.White` */
    pointCloudColoring?: PointCloudColoring;
    /** Point size for Point Cloud tiles -  Default: `1.0` */
    pointSize?: number;
    /** Debug mode: Show tile bounding boxes. Make sure to add the boxes to the scene from {@link Runtime.getTileBoxes} - Default: `false` */
    debug?: boolean;
    /** Provide an existing three js GLTFLoader so that KTX2 and DRACO workers are reused across the application*/
    gltfLoader?: GLTFLoader;
    /** A path to that contains the basis universal library. e.g: `https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis` - Default: `undefined` */
    basisTranscoderPath?: string;
    /** A path to that contains the draco library. e.g: `https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco` - Default: `undefined` */
    dracoDecoderPath?: string;
    /** When using a three.js loading manager, do not call `onLoad` until this number of tiles were loaded - Default: `undefined` */
    preloadTilesCount?: number;
}

/** Properties for loading a tileset */
export declare interface LoaderProps {
    /** The URL of the tileset. For example if using Cesium ION,
     * it would have the form: `https://assets.cesium.com/[ASSET_ID]/tileset.json`.
     */
    url: string;
    /** Required when using compressed textures (basis universal) for GPU feature detection. */
    renderer?: WebGLRenderer;
    /** Advanced options for loading the tileset ({@link LoaderOptions}) */
    options?: LoaderOptions;
    /** a loading progress callback function */
    onProgress?(progress: number | ProgressEvent<EventTarget>, total?: number): void;
    /** Use a Three JS loading manager */
    loadingManager?: LoadingManager;
}

/** Types of coloring used when viewing point cloud tiles */
export declare enum PointCloudColoring {
    Intensity = 1,
    Classification = 2,
    Elevation = 3,
    RGB = 4,
    White = 5
}

/** Runtime methods that can be used once a tileset is loaded */
export declare interface Runtime {
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
      getStats(): Stats_2;
      /** Get the tileset's attribution text. */
      getDataAttributions(): string;
      /** Get the tile bounding boxes group when `debug: true` is set. */
      getTileBoxes(): Object3D;
      /** Show or hide the tile bounding boxes. */
      showTiles(boolean: any): void;
      /** Enable or disable wireframe mode. */
      setWireframe(boolean: any): void;
      /** Enable or disable deubg mode. */
      setDebug(boolean: any): void;
      /** Set the current shading mode for b3dm tiles. See {@link Shading}. */
      setShading(Shading: any): void;
      /** Set the current view distance scale. See {@link LoaderOptions} */
      setViewDistanceScale(number: any): void;
      /** Set the current maximum screen space error. See {@link LoaderOptions} */
      setMaximumScreenSpaceError(number: any): void;
      /** In point clouds wher the points are classified as `Ground`, hide the ground level points - Default: `false`.*/
      setHideGround(boolean: any): void;
      /** In point clouds set the type of coloring used. See {@link PointCloudColoring} */
      setPointCloudColoring(PointCloudColoring: any): void;
      /** In point clouds when coloring by `PointCloudColoring.Elevation`, set the min/max elevation values - Default: `[0, 400]`. */
      setElevationRange(range: ReadonlyArray<number>): void;
      /** In point clouds when coloring by `PointCloudColoring.Intensity`, set the max intensity value -  Default: `1.0` */
      setMaxIntensity(number: any): void;
      /** In point clouds when coloring by `PointCloudColoring.Intensity`, set the contrast factor. Default: `1.0`. */
      setIntensityContrast(number: any): void;
      /** In point clouds when, set the alpha value. Default: `1.0`. */
      setPointAlpha(number: any): void;
      /** When viewing a Geo-located tileset, get the {@link GeoCoord} value from a world-space `Vector3`. */
      getLatLongHeightFromPosition(Vector3: any): GeoCoord;
      /** When viewing a Geo-located tileset, world-space `Vector3` from a {@link GeoCoord}. */
      getPositionFromLatLongHeight(GeoCoord: any): Vector3;
      /** Orient a WGS84 globe to lat/long*/
      orientToGeocoord(coord: GeoCoord): void;
      /** Get Web-Mercator coordinates from Lat/long */
      getWebMercatorCoord(coord: GeoCoord): void;
      /** Get the current camera frustum as mesh planes (for debugging purposes). */
      getCameraFrustum(camera: Camera): Object3D;
      /** Overlay a GeoJSON polygon on top of geo-located 3d tiles */
      overlayGeoJSON(geoJSONMesh: Mesh): void;
      /** Update the tileset for rendering. */
      update(dt: Number, viewportSize: Vector2, camera: Camera): void;
      /** Dispose of all of the tileset's assets in memory. */
      dispose(): void;
     }

     /** Types of shading used when viewing b3dm (mesh) tiles */
     export declare enum Shading {
         FlatTexture = 1,
         ShadedTexture = 2,
         ShadedNoTexture = 3
     }

     export { }