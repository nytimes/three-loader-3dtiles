import { Object3D } from 'three';
import type { LoaderProps, LoaderOptions, Runtime, GeoCoord } from './types';
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
}
export { Loader3DTiles, PointCloudColoring, Shading, Runtime, GeoCoord, LoaderOptions, LoaderProps };
//# sourceMappingURL=index.d.ts.map