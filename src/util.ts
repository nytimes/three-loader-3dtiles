import {
  Vector3,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  DoubleSide,
  BoxGeometry,
  PlaneGeometry,
  Camera,
  Frustum,
  CanvasTexture,
  LinearFilter,
  RepeatWrapping,
  Group,
  ArrowHelper,
  Color,
} from 'three';
import { Tile3D } from '@loaders.gl/tiles';
import { Plane as MathGLPlane } from '@math.gl/culling';
import { Matrix3 as MathGLMatrix3 } from '@math.gl/core';

import { Gradient } from './gradients'

// From https://github.com/potree/potree/blob/master/src/materials/PointCloudMaterial.js
function generateGradientTexture(gradient: Gradient): CanvasTexture {
  const size = 64;

  // create canvas
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  // get context
  const context = canvas.getContext('2d');

  // draw gradient
  context.rect(0, 0, size, size);
  const ctxGradient = context.createLinearGradient(0, 0, size, size);

  for (let i = 0; i < gradient.length; i++) {
    const step = gradient[i];

    ctxGradient.addColorStop(step[0], '#' + step[1].getHexString());
  }

  context.fillStyle = ctxGradient;
  context.fill();

  //let texture = new THREE.Texture(canvas);
  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;

  texture.minFilter = LinearFilter;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(2, 2);
  // textureImage = texture.image;

  return texture;
}

function getCameraFrustum(camera: Camera): Frustum {
  camera.updateMatrix(); // make sure camera's local matrix is updated
  camera.updateMatrixWorld(); // make sure camera's world matrix is updated
  camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
  const frustum = new Frustum();
  frustum.setFromProjectionMatrix(new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));

  return frustum;
}

function loadersPlaneToMesh(plane: MathGLPlane): Group {
  const group = new Group();

  // Create a basic rectangle geometry from math.gl plane
  const planeGeometry = new PlaneGeometry(10, 5);

  // Align the geometry to the plane
  const coplanarPoint = new Vector3(...plane.projectPointOntoPlane([0, 0, 0]));
  const normal = new Vector3(plane.normal.x, plane.normal.y, plane.normal.z);
  const focalPoint = new Vector3().copy(coplanarPoint).add(normal);
  planeGeometry.lookAt(focalPoint);
  planeGeometry.translate(coplanarPoint.x, coplanarPoint.y, coplanarPoint.z);

  // Edges
  /*
  const edges = new EdgesGeometry(planeGeometry)
  var dispPlane = new LineSegments(edges, new LineBasicMaterial({ color: 0x00ffff }))*/

  //plane
  const material = new MeshBasicMaterial({ color: 0x00ffff, side: DoubleSide });
  const mesh = new Mesh(planeGeometry, material);

  const arrowHelper = new ArrowHelper(normal, coplanarPoint, 5, 0xffff00);

  group.add(arrowHelper);
  group.add(mesh);

  return group;
}

function loadersBoundingBoxToMesh(tile: Tile3D): LineSegments {
  // Create a basic rectangle geometry from math.gl half-axes

  const { boundingVolume } = tile;

  let redColor = 0;
  if (tile.content) {
    redColor = Math.min(tile.content.byteLength / 500000, 1.0);
  }

  const boxColor = new Color(redColor, 1.0, 0.0);

  const boxGeometry = new BoxGeometry(1, 1, 1);
  const boxTransform = new Matrix4();

  if (boundingVolume.halfAxes) {
    boxTransform.copy(getMatrix4FromHalfAxes(boundingVolume.halfAxes));
  } else if (boundingVolume.radius) {
    boxGeometry.scale(boundingVolume.radius * 2, boundingVolume.radius * 2, boundingVolume.radius * 2);    
  }

  boxGeometry.applyMatrix4(boxTransform);
  const edges = new EdgesGeometry(boxGeometry);
  const dispPlane = new LineSegments(edges, new LineBasicMaterial({ color: boxColor }));
  dispPlane.position.copy(new Vector3(...boundingVolume.center));
  return dispPlane;
}

function getMatrix4FromHalfAxes(halfAxes: MathGLMatrix3): Matrix4 {
  const m = halfAxes;
  const rotateMatrix = new Matrix4().fromArray([
    m[0] * 2,
    m[1] * 2,
    m[2] * 2,
    0,
    m[3] * 2,
    m[4] * 2,
    m[5] * 2,
    0,
    m[6] * 2,
    m[7] * 2,
    m[8] * 2,
    0,
    0,
    0,
    0,
    1,
  ]);
  return rotateMatrix;
}

export {
  getCameraFrustum,
  loadersPlaneToMesh,
  loadersBoundingBoxToMesh,
  generateGradientTexture,
  getMatrix4FromHalfAxes,
};
