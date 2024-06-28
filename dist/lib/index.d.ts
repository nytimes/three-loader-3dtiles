import { Object3D } from 'three';
import type { LoaderProps, LoaderOptions, Runtime, GeoCoord, GeoJSONLoaderProps, FeatureToColor, DrapingShaderOptions } from './types';
import { PointCloudColoring, Shading } from './types';
/** 3D Tiles Loader */
declare class Loader3DTiles {
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
export { Loader3DTiles, PointCloudColoring, Shading, Runtime, GeoCoord, FeatureToColor, LoaderOptions, LoaderProps, GeoJSONLoaderProps, DrapingShaderOptions };
//# sourceMappingURL=index.d.ts.map