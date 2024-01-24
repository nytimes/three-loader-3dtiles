import { Vector2, Matrix4, LineSegments, Camera, Frustum, CanvasTexture, Group, Texture, BufferGeometry } from 'three';
import { Tile3D } from '@loaders.gl/tiles';
import { Plane as MathGLPlane } from '@math.gl/culling';
import { Matrix3 as MathGLMatrix3 } from '@math.gl/core';
import { Gradient } from './gradients';
declare function generateGradientTexture(gradient: Gradient): CanvasTexture;
declare function getCameraFrustum(camera: Camera): Frustum;
declare function loadersPlaneToMesh(plane: MathGLPlane): Group;
declare function loadersBoundingBoxToMesh(tile: Tile3D): LineSegments;
declare function getMatrix4FromHalfAxes(halfAxes: MathGLMatrix3): Matrix4;
declare function datumsToSpherical(latitude: number, longitude: number): Vector2;
declare function getTextureVRAMByteLength(texture: Texture): number | undefined;
declare function getGeometryVRAMByteLength(geometry: BufferGeometry): number;
export { getCameraFrustum, loadersPlaneToMesh, loadersBoundingBoxToMesh, generateGradientTexture, getMatrix4FromHalfAxes, datumsToSpherical, getTextureVRAMByteLength, getGeometryVRAMByteLength };
//# sourceMappingURL=util.d.ts.map