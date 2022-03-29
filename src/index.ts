import { load } from '@loaders.gl/core';
import { CesiumIonLoader, Tiles3DLoader } from '@loaders.gl/3d-tiles';
import { Tileset3D, TILE_TYPE, TILE_CONTENT_STATE } from '@loaders.gl/tiles';
import { CullingVolume, Plane } from '@math.gl/culling';
import  { _PerspectiveFrustum as PerspectiveFrustum}  from '@math.gl/culling';
import { Matrix4 as MathGLMatrix4 } from '@math.gl/core';
import * as Util from './util';
import {
  Object3D,
  Group,
  Matrix4,
  Vector3,
  Vector2,
  Mesh,
  BufferGeometry,
  MeshStandardMaterial,
  LineSegments,
  Material,
  Float32BufferAttribute,
  ShaderMaterial,
  MeshBasicMaterial,
  Uint8BufferAttribute,
  Points,
  Camera,
  PerspectiveCamera,
  WebGLRenderer,
  Texture
} from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';

import { Gradients } from './gradients';

import { PointCloudFS, PointCloudVS } from './shaders';

import { LoaderProps, LoaderOptions, Runtime, PointCloudColoring, Shading, GeoCoord } from './types';

const gradient = Gradients.RAINBOW;
const gradientTexture = typeof document != 'undefined' ? Util.generateGradientTexture(gradient) : null;

const grayscale = Gradients.GRAYSCALE;
const grayscaleTexture = typeof document != 'undefined' ? Util.generateGradientTexture(grayscale) : null;

const defaultOptions: LoaderOptions = {
  throttleRequests: true,
  maxRequests: 64,
  updateInterval: 0.1,
  maxConcurrency: 1,
  maximumScreenSpaceError: 16,
  maximumMemoryUsage: 32,
  viewDistanceScale: 1.0,
  skipLevelOfDetail: false,
  updateTransforms: true,
  shading: Shading.FlatTexture,
  pointCloudColoring: PointCloudColoring.White,
  worker: true,
  wireframe: false,
  debug: false,
  basisTranscoderPath: null,
  dracoDecoderPath: null,
  material: null,
  computeNormals: false,
  shaderCallback: null
};

/** 3D Tiles Loader */
class Loader3DTiles {
  /**
  * Loads a tileset of 3D Tiles according to the given {@link LoaderProps}
  * @public
  *
  * @param props - Properties for this load call {@link LoaderProps}.
  * @returns An object containing the 3D Model to be added to the scene
  * and a runtime engine to be updated every frame.
  */
  public static async load (props: LoaderProps): Promise<{ model: Object3D; runtime: Runtime }> {
    const options = { ...defaultOptions, ...props.options };
    const { url } = props;

    const UPDATE_INTERVAL = options.updateInterval;

    const loadersGLOptions: {[key: string]: unknown} = {};

    if (options.cesiumIONToken) {
      loadersGLOptions['cesium-ion'] = {
        accessToken: options.cesiumIONToken,
      };
      const metadata = await CesiumIonLoader.preload(url, loadersGLOptions);
      loadersGLOptions['fetch'] = { headers: metadata.headers };
    }

    const tilesetJson = await load(url, Tiles3DLoader, {
      ...loadersGLOptions,
    });

    const renderMap = {};
    const boxMap = {};
    const unloadQueue = [];
    const root = new Group();

    const tileBoxes = new Group();
    if (!options.debug) {
      tileBoxes.visible = false;
    } else {
      // TODO: Need to have a parent root with no transform and then a conent root with transform
      //root.add(tileBoxes)
    }

    const pointcloudUniforms = {
      pointSize: { type: 'f', value: 1.0 },
      gradient: { type: 't', value: gradientTexture },
      grayscale: { type: 't', value: grayscaleTexture },
      rootCenter: { type: 'vec3', value: new Vector3() },
      rootNormal: { type: 'vec3', value: new Vector3() },
      coloring: { type: 'i', value: options.pointCloudColoring },
      hideGround: { type: 'b', value: true },
      elevationRange: { type: 'vec2', value: new Vector2(0, 400) },
      maxIntensity: { type: 'f', value: 1.0 },
      intensityContrast: { type: 'f', value: 1.0 },
    };

    let cameraReference = null;
    let rendererReference = null;

    const gltfLoader = new GLTFLoader();

    if (options.basisTranscoderPath) {
      const ktx2Loader = new KTX2Loader();
      ktx2Loader.detectSupport(props.renderer);
      ktx2Loader.setTranscoderPath(options.basisTranscoderPath + '/');
      ktx2Loader.setWorkerLimit(1);

      gltfLoader.setKTX2Loader(ktx2Loader);
    }

    if (options.dracoDecoderPath) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(options.dracoDecoderPath + '/');
      dracoLoader.setWorkerLimit(options.maxConcurrency);
      gltfLoader.setDRACOLoader(dracoLoader);
    }

    const unlitMaterial = new MeshBasicMaterial();

    const tileOptions = {
      maximumMemoryUsage: options.maximumMemoryUsage,
      maximumScreenSpaceError: options.maximumScreenSpaceError,
      viewDistanceScale: options.viewDistanceScale,
      skipLevelOfDetail: options.skipLevelOfDetail,
      updateTransforms: options.updateTransforms,
      throttleRequests: options.throttleRequests,
      maxRequests: options.maxRequests,
      contentLoader: async (tile) => {
        let tileContent = null;
        switch (tile.type) {
          case TILE_TYPE.POINTCLOUD: {
            tileContent = createPointNodes(tile, pointcloudUniforms);
            break;
          }
          case TILE_TYPE.SCENEGRAPH:
          case TILE_TYPE.MESH: {
            tileContent = await createGLTFNodes(gltfLoader, tile, unlitMaterial, options, rootTransformInverse);
            break;
          }
          default:
            break;
        }
        if (tileContent) {
          tileContent.visible = false;
          renderMap[tile.id] = tileContent;
          root.add(renderMap[tile.id]);
          if (options.debug) {
            const box = Util.loadersBoundingBoxToMesh(tile);
            tileBoxes.add(box);
            boxMap[tile.id] = box;
          }
        }
      },
      onTileLoad: async () => {
        if (tileset) {
          tileset._frameNumber++;
          tilesetUpdate(tileset, renderMap, rendererReference, cameraReference);
        }
      },
      onTileUnload: (tile) => {
        unloadQueue.push(tile);
      },
      onTileError: (tile, message) => {
        console.error('Tile error', tile.id, message);
      },
    };
    const tileset = new Tileset3D(tilesetJson, {
      ...tileOptions,
      loadOptions: {
        ...loadersGLOptions,
        maxConcurrency: options.maxConcurrency,
        worker: options.worker,
        gltf: {
          loadImages: false,
        },
        '3d-tiles': {
          loadGLTF: false
        },
      },
    });
    //
    // transformations
    let threeMat = new Matrix4();
    const tileTrasnform = new Matrix4();

    if (tileset.root.boundingVolume) {
      if (tileset.root.header.boundingVolume.region) {
        // TODO: Handle region type bounding volumes
        console.warn("Cannot apply a model matrix to bounding volumes of type region. Tileset stays in original geo-coordinates.")
      } else {
        console.log("Applying bounding volume center");

        tileTrasnform.copy(new Matrix4());
        tileTrasnform.extractRotation(Util.getMatrix4FromHalfAxes(tileset.root.boundingVolume.halfAxes));
        tileTrasnform.setPosition(
          tileset.root.boundingVolume.center[0],
          tileset.root.boundingVolume.center[1],
          tileset.root.boundingVolume.center[2]
        )
      }
    }

    // TODO: Originally the tileset is moved by loaders.gl to its WGS84 matching coordiate. In here, we negate that and bring it back to 0,0,0 with an optional initial transform. If we want to combine the tileset with other geographic layers we might need to go back to those original coordiates
    threeMat.copy(tileTrasnform).invert();

    const resetTransform = threeMat.clone();

    let modelMatrix = new MathGLMatrix4(threeMat.toArray());
    tileset.modelMatrix = modelMatrix;

    let disposeFlag = false;

    const rootCenter = new Vector3();

    pointcloudUniforms.rootCenter.value.copy(rootCenter);
    pointcloudUniforms.rootNormal.value.copy(new Vector3(0, 0, 1).normalize());

    // Extra stats
    tileset.stats.get('Loader concurrency').count = options.maxConcurrency

    tileset.stats.get('Maximum SSE').count = options.maximumScreenSpaceError;

    tileset.stats.get('Maximum mem usage').count = options.maximumMemoryUsage;

    let timer = 0;

    const lastCameraTransform: Matrix4 = new Matrix4().makeTranslation(Infinity, Infinity, Infinity);
    let lastCameraAspect = null;
    const lastCameraPosition = new Vector3(Infinity, Infinity, Infinity);
    let sseDenominator = null;

    const lastRootTransform:Matrix4 = new Matrix4().copy(root.matrixWorld)
    const rootTransformInverse = new Matrix4().copy(lastRootTransform).invert();

    function tilesetUpdate(tileset, renderMap, renderer, camera) {
      if (disposeFlag) {
        return;
      }

      // Assumes camera fov, near and far are not changing
      if (!sseDenominator || camera.aspect != lastCameraAspect) {
        const loadersFrustum = new PerspectiveFrustum({
          fov: (camera.fov / 180) * Math.PI,
          aspectRatio: camera.aspect,
          near: camera.near,
          far: camera.far,
        });

        sseDenominator = loadersFrustum.sseDenominator;
        lastCameraAspect = camera.aspect;

        if (options.debug) {
          console.log('Updated sse denonimator:', sseDenominator);
        }
      }

      const frustum = Util.getCameraFrustum(camera);
      const planes = frustum.planes.map((plane) => new Plane(plane.normal.toArray(), plane.constant));
      const cullingVolume = new CullingVolume(planes);

      const rendererSize = new Vector2();
      renderer.getSize(rendererSize);

      const frameState = {
        camera: {
          position: lastCameraPosition.toArray(),
        },

        height: rendererSize.y,
        frameNumber: tileset._frameNumber,
        sseDenominator: sseDenominator,
        cullingVolume: cullingVolume,
        viewport: {
          id: 0,
        },
      };

      tileset._cache.reset();
      tileset._traverser.traverse(tileset.root, frameState, tileset.options);

      for (const tile of tileset.tiles) {
        if (tile.selected) {
          if (!renderMap[tile.id]) {
            console.error('TILE SELECTED BUT NOT LOADED!!', tile.id);
          } else {
            // Make sure it's visible
            renderMap[tile.id].visible = true;
          }
        } else {
          if (renderMap[tile.id]) {
            renderMap[tile.id].visible = false;
          }
        }
      }
      while (unloadQueue.length > 0) {
        const tile = unloadQueue.pop();
        if (renderMap[tile.id] && tile.contentState == TILE_CONTENT_STATE.UNLOADED) {
          root.remove(renderMap[tile.id]);
          disposeNode(renderMap[tile.id]);
          delete renderMap[tile.id];
        }
        if (boxMap[tile.id]) {
          disposeNode(boxMap[tile.id]);
          tileBoxes.remove(boxMap[tile.id]);
          delete boxMap[tile.id];
        }
      }

      if (props.onProgress) {
        props.onProgress(
          tileset.stats.get('Tiles Loaded').count,
          tileset.stats.get('Tiles Loaded').count + tileset.stats.get('Tiles Loading').count,
        );
      }

      return frameState;
    }

    return {
      model: root,
      runtime: {
        getTileset: () => {
          return tileset;
        },
        getStats: () => {
          return tileset.stats;
        },
        showTiles: (visible) => {
          tileBoxes.visible = visible;
        },
        setWireframe: (wireframe) => {
          options.wireframe = wireframe;
          root.traverse((object) => {
            if (object instanceof Mesh) {
              object.material.wireframe = wireframe;
            }
          });
        },
        setDebug: (debug) => {
          options.debug = debug;
          tileBoxes.visible = debug;
        },
        setShading: (shading) => {
          options.shading = shading;
        },
        getTileBoxes: () => {
          return tileBoxes;
        },
        setViewDistanceScale: (scale) => {
          tileset.options.viewDistanceScale = scale;
          tileset._frameNumber++;
          tilesetUpdate(tileset, renderMap, rendererReference, cameraReference);
        },
        setHideGround: (enabled) => {
          pointcloudUniforms.hideGround.value = enabled;
        },
        setPointCloudColoring: (selection) => {
          pointcloudUniforms.coloring.value = selection;
        },
        setElevationRange: (range) => {
          pointcloudUniforms.elevationRange.value.set(range[0], range[1]);
        },
        setMaxIntensity: (intensity) => {
          pointcloudUniforms.maxIntensity.value = intensity;
        },
        setIntensityContrast: (contrast) => {
          pointcloudUniforms.intensityContrast.value = contrast;
        },
        getLatLongHeightFromPosition: (position) => {
          const cartographicPosition = tileset.ellipsoid.cartesianToCartographic(
            new Vector3().copy(position).applyMatrix4(new Matrix4().copy(threeMat).invert()).toArray(),
          );
          return {
            lat: cartographicPosition[1],
            long: cartographicPosition[0],
            height: cartographicPosition[2],
          };
        },
        getPositionFromLatLongHeight: (coord) => {
          const cartesianPosition = tileset.ellipsoid.cartographicToCartesian([coord.long, coord.lat, coord.height]);
          return new Vector3(...cartesianPosition).applyMatrix4(threeMat);
        },
        getCameraFrustum: (camera: Camera) => {
          const frustum = Util.getCameraFrustum(camera);
          const meshes = frustum.planes
            .map((plane) => new Plane(plane.normal.toArray(), plane.constant))
            .map((loadersPlane) => Util.loadersPlaneToMesh(loadersPlane));

          const model = new Group();
          for (const mesh of meshes) model.add(mesh);

          return model;
        },
        update: function (dt: number, renderer: WebGLRenderer, camera: Camera) {
          cameraReference = camera;
          rendererReference = renderer;

          timer += dt;

          if (tileset && timer >= UPDATE_INTERVAL) {
            if (!lastRootTransform.equals(root.matrixWorld)) {
              lastRootTransform.copy(root.matrixWorld);
              threeMat = resetTransform.clone();
              threeMat.premultiply(lastRootTransform);
              
              const rootCenter = new Vector3().setFromMatrixPosition(lastRootTransform);
              pointcloudUniforms.rootCenter.value.copy(rootCenter);
              pointcloudUniforms.rootNormal.value.copy(new Vector3(0, 0, 1).applyMatrix4(lastRootTransform).normalize());

              rootTransformInverse.copy(lastRootTransform).invert(); 
              modelMatrix = new MathGLMatrix4(threeMat.toArray());
              tileset.modelMatrix = modelMatrix;
            }

            const cameraChanged: boolean =
              !camera.matrixWorld.equals(lastCameraTransform) ||
              !((<PerspectiveCamera>camera).aspect == lastCameraAspect);

            if (cameraChanged) {
              timer = 0;
              tileset._frameNumber++;
              camera.getWorldPosition(lastCameraPosition);
              lastCameraTransform.copy(camera.matrixWorld);
              tilesetUpdate(tileset, renderMap, renderer, camera);
            }

          }
        },
        dispose: function () {
          disposeFlag = true;
          tileset._destroy();
          while (root.children.length > 0) {
            const obj = root.children[0];
            disposeNode(obj);
            root.remove(obj);
          }
          while (tileBoxes.children.length > 0) {
            const obj = tileBoxes.children[0] as LineSegments;
            tileBoxes.remove(obj);
            obj.geometry.dispose();
            (<Material>obj.material).dispose();
          }
        },
      },
    };
  }
}

async function createGLTFNodes(gltfLoader, tile, unlitMaterial, options, rootTransformInverse): Promise<Object3D> {
  return new Promise((resolve, reject) => {
    const rotateX = new Matrix4().makeRotationAxis(new Vector3(1, 0, 0), Math.PI / 2);
    const shouldRotate = tile.tileset.asset?.gltfUpAxis !== "Z";

    // The computed trasnform already contains the root's transform, so we have to invert it
    const contentTransform = new Matrix4().fromArray(tile.computedTransform).premultiply(rootTransformInverse);

    if (shouldRotate) {
      contentTransform.multiply(rotateX); // convert from GLTF Y-up to Z-up
    }

    gltfLoader.parse(
      tile.content.gltfArrayBuffer,
      tile.contentUrl ? tile.contentUrl.substr(0,tile.contentUrl.lastIndexOf('/') + 1) : '',
      (gltf) => {
        const tileContent = gltf.scenes[0] as Group;
        tileContent.applyMatrix4(contentTransform); 

        tileContent.traverse((object) => {
          if (object instanceof Mesh) {
            const originalMaterial = (object.material as MeshStandardMaterial);
            const originalMap = originalMaterial.map;

            if (options.material) {
              object.material = options.material.clone();
              originalMaterial.dispose();
            } else if (options.shading == Shading.FlatTexture) {
              object.material = unlitMaterial.clone();
              originalMaterial.dispose();
            }

            if (options.shading != Shading.ShadedNoTexture) {
              if (object.material.uniforms) {
                object.material.uniforms.map = { value: originalMap };
              } else {
                object.material.map = originalMap;
              }
            } else {
              if (originalMap) {
                originalMap.dispose();
              }
              object.material.map = null;
            }

            if (options.shaderCallback) {
              object.onBeforeRender = options.shaderCallback;
            }
            object.material.wireframe = options.wireframe;

            if (options.computeNormals) {
              object.geometry.computeVertexNormals();
            }
          }
        });
        resolve(tileContent);
      },
      (e) => {
        reject(new Error(`error parsing gltf in tile ${tile.id}: ${e}`));
      },
    );
  });
}
function createPointNodes(tile, pointcloudUniforms) {
  const d = {
    rtc_center: tile.content.rtcCenter, // eslint-disable-line camelcase
    points: tile.content.attributes.positions,
    intensities: tile.content.attributes.intensity,
    classifications: tile.content.attributes.classification,
    rgb: null,
    rgba: null,
  };
  const { colors } = tile.content.attributes;
  if (colors && colors.size === 3) {
    d.rgb = colors.value;
  }
  if (colors && colors.size === 4) {
    d.rgba = colors.value;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(d.points, 3));
  const pointcloudMaterial = new ShaderMaterial({
    uniforms: pointcloudUniforms,
    vertexShader: PointCloudVS,
    fragmentShader: PointCloudFS,
    transparent: true,
  });
  if (d.rgba) {
    geometry.setAttribute('color', new Float32BufferAttribute(d.rgba, 4));
    pointcloudMaterial.vertexColors = true;
  } else if (d.rgb) {
    geometry.setAttribute('color', new Uint8BufferAttribute(d.rgb, 3, true));
    pointcloudMaterial.vertexColors = true;
  }
  if (d.intensities) {
    geometry.setAttribute('intensity', new Uint8BufferAttribute(d.intensities, 1, true));
  }
  if (d.classifications) {
    geometry.setAttribute('classification', new Uint8BufferAttribute(d.classifications, 1, false));
  }

  const tileContent = new Points(geometry, pointcloudMaterial);
  if (d.rtc_center) {
    const c = d.rtc_center;

    // TODO: In the case of entwine/region bounding volume the modelMatrix also needs to be applied?
    tileContent.applyMatrix4(new Matrix4().makeTranslation(c[0], c[1], c[2]));//.multiply(threeMat));
  }
  return tileContent;
}


function disposeMaterial(material) {

  if ((material as ShaderMaterial)?.uniforms?.map) {
    ((material as ShaderMaterial)?.uniforms?.map.value as Texture)?.dispose();
  }
  else if (material.map) {
    (material.map as Texture)?.dispose();
  }
  material.dispose();
}

function disposeNode(node) {
  node.traverse((object) => {
    if (object.isMesh) {
      object.geometry.dispose();

      if (object.material.isMaterial) {
        disposeMaterial(object.material);   
      } else {
        // an array of materials
        for (const material of object.material) {
          disposeMaterial(material);
        } 
      }
    }
  });
  for (let i = node.children.length - 1; i >= 0; i--) {
    const obj = node.children[i];
    node.remove(obj);
  }
}

export { Loader3DTiles, PointCloudColoring, Shading, Runtime, GeoCoord, LoaderOptions, LoaderProps };
