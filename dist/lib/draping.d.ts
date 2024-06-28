/** A Three.JS implementation of:
 * Real-time Screen-space Geometry Draping for 3D Digital Terrain Models
 * Trapp and Döllner, 2019
 * https://ieeexplore.ieee.org/abstract/document/8811991
 */
import { Object3D, ShaderMaterial, WebGLRenderTarget, WebGLRenderer, Blending } from 'three';
import type { Viewport } from './types';
declare let target: WebGLRenderTarget | null;
interface DrapingShaderOptions {
    /** Minimum terrain height when searching for a matching vertex to the GEOJson overlay. Default: `0` */
    minHeight: number;
    /** Maximum terrain height when searching for a matching vertex to the GEOJson overlay. Default: `300` */
    maxHeight: number;
    /** Number of samples to average around the render target cordinate when draping the GEOJson overlay. Default: `4` */
    samples: number;
    /** Number of pixels to step toward each sample when averaging the samples. Default: 4.0 */
    sampleStep: number;
    /** Opacity of the draped colors. Default: `0.5` */
    opacity: number;
    /** Blending algoritum of the draped colors. Default: `THREE.NormalBlending` */
    blendingType: Blending;
}
declare function setup(viewport: Viewport, model: Object3D, renderer: WebGLRenderer, shaderOptions?: DrapingShaderOptions): void;
declare function resizeRenderTarget(viewport: Viewport): void;
declare function update(camera: any): void;
declare const drapingMaterial: ShaderMaterial;
export { target, setup, resizeRenderTarget, update, drapingMaterial, DrapingShaderOptions };
//# sourceMappingURL=draping.d.ts.map