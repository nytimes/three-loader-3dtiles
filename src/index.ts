import { load } from '@loaders.gl/core';
import { CesiumIonLoader, Tiles3DLoader } from '@loaders.gl/3d-tiles';
import { _GeoJSONLoader } from '@loaders.gl/json';
import { Tileset3D, TILE_TYPE, TILE_CONTENT_STATE } from '@loaders.gl/tiles';
import { CullingVolume, Plane } from '@math.gl/culling';
import  { _PerspectiveFrustum as PerspectiveFrustum}  from '@math.gl/culling';
import { Matrix4 as MathGLMatrix4, toRadians } from '@math.gl/core';
import { Ellipsoid } from '@math.gl/geospatial';
import * as Util from './util';
import * as Draping from './draping';
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
  BufferAttribute,
  Points,
  Camera,
  Texture,
  Euler,
  Quaternion,
  NormalBlending,
  WebGLRenderer
} from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';

import { Gradients } from './gradients';

import { PointCloudFS, PointCloudVS } from './shaders';

import type { 
  LoaderProps, 
  LoaderOptions, 
  Runtime, 
  GeoCoord, 
  GeoJSONLoaderProps, 
  FeatureToColor, 
  DrapingShaderOptions,
  Viewport
} from './types';
import { PointCloudColoring, Shading } from './types';
import { BinaryFeatureCollection, FeatureCollection } from '@loaders.gl/schema';

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
  memoryAdjustedScreenSpaceError: true,
  maximumMemoryUsage: 400,
  memoryCacheOverflow : 128,
  viewDistanceScale: 1.0,
  skipLevelOfDetail: false,
  resetTransform: false,
  updateTransforms: true,
  shading: Shading.FlatTexture,
  transparent: false,
  pointCloudColoring: PointCloudColoring.White,
  pointSize: 1.0,
  worker: true,
  wireframe: false,
  debug: false,
  gltfLoader: null,
  basisTranscoderPath: null,
  dracoDecoderPath: null,
  material: null,
  contentPostProcess: undefined,
  preloadTilesCount: null,
  collectAttributions: false
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
    let { viewport, renderer } = props;

    const UPDATE_INTERVAL = options.updateInterval;
    const MAX_DEPTH_FOR_ORIENTATION = 5;

    const loadersGLOptions: {[key: string]: unknown} = {};

    if (options.cesiumIONToken) {
      loadersGLOptions['cesium-ion'] = {
        accessToken: options.cesiumIONToken,
      };
      const metadata = await CesiumIonLoader.preload(url, loadersGLOptions);
      loadersGLOptions['fetch'] = { headers: metadata.headers };
    }

    if (options.googleApiKey) {
      loadersGLOptions['fetch'] = { headers: { 'X-GOOG-API-KEY': options.googleApiKey} };
      if (!props.options.hasOwnProperty('collectAttributions')) {  
        options.collectAttributions = true;
      }
    }


    if (props.loadingManager) {
      props.loadingManager.itemStart(url);
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
      pointSize: { type: 'f', value: options.pointSize },
      gradient: { type: 't', value: gradientTexture },
      grayscale: { type: 't', value: grayscaleTexture },
      rootCenter: { type: 'vec3', value: new Vector3() },
      rootNormal: { type: 'vec3', value: new Vector3() },
      coloring: { type: 'i', value: options.pointCloudColoring },
      hideGround: { type: 'b', value: true },
      elevationRange: { type: 'vec2', value: new Vector2(0, 400) },
      maxIntensity: { type: 'f', value: 1.0 },
      intensityContrast: { type: 'f', value: 1.0 },
      alpha: { type: 'f', value: 1.0 },
    };

    const pointcloudMaterial = new ShaderMaterial({
      uniforms: pointcloudUniforms,
      vertexShader: PointCloudVS,
      fragmentShader: PointCloudFS,
      transparent: options.transparent,
      vertexColors: true
    });
    
    let gltfLoader = undefined;
    let ktx2Loader = undefined;
    let dracoLoader = undefined;

    if (options.gltfLoader) {
      gltfLoader = options.gltfLoader;
    }
    else {
      gltfLoader = new GLTFLoader();

      if (options.basisTranscoderPath) {
        ktx2Loader = new KTX2Loader();
        ktx2Loader.detectSupport(renderer ?? new WebGLRenderer());
        ktx2Loader.setTranscoderPath(options.basisTranscoderPath + '/');
        ktx2Loader.setWorkerLimit(1);

        gltfLoader.setKTX2Loader(ktx2Loader);
      }

      if (options.dracoDecoderPath) {
        dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(options.dracoDecoderPath + '/');
        dracoLoader.setWorkerLimit(options.maxConcurrency);
        gltfLoader.setDRACOLoader(dracoLoader);
      }
    }
    
    const unlitMaterial = new MeshBasicMaterial({transparent: options.transparent});

    const tileOptions = {
      maximumMemoryUsage: options.maximumMemoryUsage,
      maximumScreenSpaceError: options.maximumScreenSpaceError,
      memoryAdjustedScreenSpaceError: options.memoryAdjustedScreenSpaceError,
      memoryCacheOverflow: options.memoryCacheOverflow,
      viewDistanceScale: options.viewDistanceScale,
      skipLevelOfDetail: options.skipLevelOfDetail,
      updateTransforms: options.updateTransforms,
      throttleRequests: options.throttleRequests,
      maxRequests: options.maxRequests,
      contentLoader: async (tile) => {
        let tileContent = null;
        switch (tile.type) {
          case TILE_TYPE.POINTCLOUD: {
            tileContent = createPointNodes(tile, pointcloudMaterial, options, rootTransformInverse);
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
      onTileLoad: async (tile) => {
        if (tileset) {
          if (options.resetTransform && !orientationDetected && tile?.depth <= MAX_DEPTH_FOR_ORIENTATION) {
            detectOrientation(tile);
          }
          needsUpdate = true;
        }
      },
      onTileUnload: (tile) => {
        unloadQueue.push(tile);
      },
      onTileError: (tile, message) => {
        console.warn('Tile error', tile.id, message);
      },
      onTraversalComplete(selectedTiles) {
        if (options.collectAttributions) {
          dataAttributions = collectAttributions(selectedTiles);
        }
        return selectedTiles;
      }
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
    const threeMat = new Matrix4();
    const tileTransform = new Matrix4();
    const rootCenter = new Vector3();
    let orientationDetected = false;

    let dataAttributions = '';

    if (tileset.root.boundingVolume) {
      if (tileset.root.header.boundingVolume.region) {
        // TODO: Handle region type bounding volumes
        // https://github.com/visgl/loaders.gl/issues/1994
        console.warn("Cannot apply a model matrix to bounding volumes of type region. Tileset stays in original geo-coordinates.")
      }
      tileTransform.setPosition(
        tileset.root.boundingVolume.center[0],
        tileset.root.boundingVolume.center[1],
        tileset.root.boundingVolume.center[2]
      )
    } else {
      console.warn("Bounding volume not found, no transformations applied")
    }

    if (options.debug) {
      const box = Util.loadersBoundingBoxToMesh(tileset.root);
      tileBoxes.add(box);
      boxMap[tileset.root.id] = box;
    }

    let disposeFlag = false;
    let loadingEnded = false;

    pointcloudUniforms.rootCenter.value.copy(rootCenter);
    pointcloudUniforms.rootNormal.value.copy(new Vector3(0, 0, 1).normalize());

    // Extra stats
    tileset.stats.get('Loader concurrency').count = options.maxConcurrency
    tileset.stats.get('Maximum mem usage').count = options.maximumMemoryUsage;

    let timer = 0;

    let lastCameraTransform: Matrix4 = null;
    let needsUpdate = true;
    let cameraReference = null;
    const lastCameraPosition = new Vector3(Infinity, Infinity, Infinity);
    let sseDenominator = null;

    root.updateMatrixWorld(true);
    const lastRootTransform:Matrix4 = new Matrix4().copy(root.matrixWorld)
    const rootTransformInverse = new Matrix4().copy(lastRootTransform).invert();

    if (options.resetTransform) {
      detectOrientation(tileset.root);
    }

    if (options.debug) {
      boxMap[tileset.root.id].applyMatrix4(threeMat);
      tileBoxes.matrixWorld.copy(root.matrixWorld);
    }

    function detectOrientation(tile) {
      if (!tile.boundingVolume.halfAxes) {
        return;
      }
      const halfAxes = tile.boundingVolume.halfAxes;
      const orientationMatrix = new Matrix4()
      .extractRotation(Util.getMatrix4FromHalfAxes(halfAxes))
      .premultiply(new Matrix4().extractRotation(rootTransformInverse));

      const rotation = new Euler().setFromRotationMatrix(orientationMatrix);

      if (!rotation.equals(new Euler())) {
        orientationDetected = true;
        const pos = new Vector3(
          tileTransform.elements[12], 
          tileTransform.elements[13], 
          tileTransform.elements[14])
        ;
        tileTransform.extractRotation(orientationMatrix);
        tileTransform.setPosition(pos);
      } 
      updateTransform();
    }

    function updateTransform() {
      // Reset the current model matrix and apply our own transformation
      threeMat.copy(lastRootTransform);
      
      if (options.resetTransform) {
        threeMat.multiply(new Matrix4().copy(tileTransform).invert());
      }

      tileset.modelMatrix = new MathGLMatrix4(threeMat.toArray());
    }
    function tilesetUpdate(tileset, renderMap, viewport, camera) {
      if (disposeFlag || !camera) {
        return;
      }
      // Assumes camera fov, near and far are not changing
      if (!sseDenominator) {
        const loadersFrustum = new PerspectiveFrustum({
          fov: (camera.fov / 180) * Math.PI,
          aspectRatio: camera.aspect,
          near: camera.near,
          far: camera.far,
        });

        sseDenominator = loadersFrustum.sseDenominator;

        if (options.debug) {
          console.log('Updated sse denonimator:', sseDenominator);
        }
      }

      const frustum = Util.getCameraFrustum(camera);
      const planes = frustum.planes.map((plane) => new Plane(plane.normal.toArray(), plane.constant));
      const cullingVolume = new CullingVolume(planes);

      const frameState = {
        camera: {
          position: lastCameraPosition.toArray(),
        },

        height: viewport.height * viewport.devicePixelRatio,
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

      const tilesLoaded = tileset.stats.get('Tiles Loaded').count;
      const tilesLoading = tileset.stats.get('Tiles Loading').count;

      if (props.onProgress) {
        props.onProgress(
          tilesLoaded,
          tilesLoaded + tilesLoading
        );
      }

      if (props.loadingManager && !loadingEnded) {
        if (tilesLoading == 0 && 
           (
            options.preloadTilesCount == null ||
            tilesLoaded >= options.preloadTilesCount)
           ) {
             loadingEnded = true;
             props.loadingManager.itemEnd(props.url);
           }
      }

      return frameState;
    }

    function setGeoTransformation(transformationMatrix) {
      const position = new Vector3();
      const quaternion = new Quaternion();
      const scale = new Vector3();

      // Decompose the matrix into position, quaternion, and scale
      transformationMatrix.decompose(position, quaternion, scale);

      // Apply the decomposed values to the root object
      root.position.copy(position);
      root.quaternion.copy(quaternion);
      root.scale.copy(scale);

      // Update the root object's matrix to reflect the changes
      root.updateMatrix();
      root.updateMatrixWorld(true);

      lastRootTransform.copy(root.matrixWorld);
      rootTransformInverse.copy(lastRootTransform).invert();

      updateTransform();
      
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
        getDataAttributions: () => {
          return dataAttributions;
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
          tilesetUpdate(tileset, renderMap, viewport, cameraReference);
        },
        setMaximumScreenSpaceError: (sse) => {
          tileset.options.maximumScreenSpaceError = sse;
          tileset._frameNumber++;
          tilesetUpdate(tileset, renderMap, viewport, cameraReference);
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
        setPointAlpha: (alpha) => {
          pointcloudUniforms.alpha.value = alpha;
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
          const cartesianPosition = tileset.ellipsoid.cartographicToCartesian([
            coord.long,
            coord.lat,
            coord.height
          ]);
          return new Vector3(...cartesianPosition).applyMatrix4(threeMat);
        },
        orientToGeocoord: (coord:GeoCoord) => {
          // Set the transofrmation matrix to the rotate the WGS84 globe to the given lat/long/Alt
          const cartographicPosition = [coord.long, coord.lat, coord.height];

          const cartesianPosition:number[] = tileset.ellipsoid.cartographicToCartesian(cartographicPosition);
          const ellipsoidTransform = new Matrix4().fromArray(tileset.ellipsoid.eastNorthUpToFixedFrame(cartesianPosition));

          // Flip to Z is altitiude, Y is north, X is east
          const alignRotation = new Matrix4().makeRotationFromEuler(
            new Euler(Math.PI / 2, Math.PI / 2, 0)
          );

          const geoTransform = new Matrix4().copy(ellipsoidTransform).multiply(alignRotation).invert()

          setGeoTransformation(geoTransform);
        },
        getWebMercatorCoord: (coord:GeoCoord): Vector2 => {
          return Util.datumsToSpherical(coord.lat, coord.long);
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
        overlayGeoJSON: (geoJSONMesh, shaderOptions: DrapingShaderOptions) => {
          geoJSONMesh.applyMatrix4(threeMat);
          geoJSONMesh.updateMatrixWorld();

          // Initialize draping
          if (!renderer) {
            throw new Error("GeoJSON draping requires a renderer reference via LoaderProps");
          }
          Draping.setup(viewport, root, renderer, shaderOptions);
          (geoJSONMesh.material as Material).dispose();
          geoJSONMesh.material = Draping.drapingMaterial;

          return geoJSONMesh;
        },
        setViewport: (updatedViewport: Viewport) => {
          viewport = updatedViewport;
          sseDenominator = null;
          needsUpdate = true;

          if (Draping.target) {
            Draping.resizeRenderTarget(viewport);
          }
        },
        setRenderer: (updatedRenderer: WebGLRenderer) => {
          renderer = updatedRenderer;
        },
        update: function (dt: number, camera: Camera) {
          cameraReference = camera;
          timer += dt;

          if (Draping.target) {
            Draping.update(camera);
          }

          if (tileset && timer >= UPDATE_INTERVAL) {
            if (!lastRootTransform.equals(root.matrixWorld)) {
              timer = 0;
              lastRootTransform.copy(root.matrixWorld);
              if (options.updateTransforms) {
                  updateTransform();
              }

              const rootCenter = new Vector3().setFromMatrixPosition(lastRootTransform);
              pointcloudUniforms.rootCenter.value.copy(rootCenter);
              pointcloudUniforms.rootNormal.value.copy(new Vector3(0, 0, 1).applyMatrix4(lastRootTransform).normalize());
              rootTransformInverse.copy(lastRootTransform).invert(); 

              if (options.debug) {
                boxMap[tileset.root.id].matrixWorld.copy(threeMat);
                boxMap[tileset.root.id].applyMatrix4(lastRootTransform);
              }
            }

            if (lastCameraTransform == null) {
              lastCameraTransform = new Matrix4().copy(camera.matrixWorld);
            } else {
              if (
                needsUpdate || 
                cameraChanged(camera, lastCameraTransform)
            ) {
                timer = 0;
                needsUpdate = false;
                tileset._frameNumber++;
                camera.getWorldPosition(lastCameraPosition);
                lastCameraTransform.copy(camera.matrixWorld);
                tilesetUpdate(tileset, renderMap, viewport, camera);
              }
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
            (obj.material as Material).dispose();
          }
          if (ktx2Loader) {
            ktx2Loader.dispose();
          }
          if (dracoLoader) {
            dracoLoader.dispose();
          }
        },
      },
    };
  }
  /**
  * Loads a tileset of 3D Tiles according to the given {@link GeoJSONLoaderProps}
  * Could be overlayed on geograpical 3D Tiles using {@link Runtime.overlayGeoJSON}
  * @public
  *
  * @param props - Properties for this load call {@link GeoJSONLoaderProps}.
  * @returns An object containing the 3D Model to be added to the scene
  */
  public static async loadGeoJSON(props: GeoJSONLoaderProps): Promise <Object3D> {
    const { url, height, featureToColor } = props; 
    return load(url, _GeoJSONLoader, { worker: false,  gis: {format: 'binary'}}).then((data) => {  
        const featureCollection = data as unknown as BinaryFeatureCollection;
        const geometry = new BufferGeometry();
        const cartesianPositions = (featureCollection.polygons.positions.value as Float32Array).reduce((acc, val, i, src) => {
          if (i % 2 == 0) {
            const cartographic = [val, src[i + 1], height ?? 0];
            const cartesian = Ellipsoid.WGS84.cartographicToCartesian(cartographic);

            acc.push(...cartesian);
          }
          return acc;
        }, []);
        geometry.setAttribute('position', new Float32BufferAttribute(
          cartesianPositions,
          3
        ));
        if (featureToColor) {
          const colors = ((featureCollection.polygons.numericProps as any)
          [featureToColor.feature].value as Array<number>).reduce((acc, val, i, src) => {
              const color = featureToColor.colorMap(val);
              acc[i * 3] = color.r;
              acc[(i *3) + 1] = color.g;
              acc[(i *3) + 2] = color.b;
              return acc;
          }, []);
          geometry.setAttribute('color', new Float32BufferAttribute(
            colors,
            3
          ));
        }
        geometry.setIndex(
          new BufferAttribute(featureCollection.polygons.triangles.value, 1)
        );
        const material = new MeshBasicMaterial({
          transparent: true, 
          vertexColors: true,
          opacity: 0.5, 
          blending: NormalBlending
        });
        const mesh = new Mesh( geometry, material );
        return mesh;
    });
  }
}



async function createGLTFNodes(gltfLoader, tile, unlitMaterial, options, rootTransformInverse): Promise<Object3D> {
  return new Promise((resolve, reject) => {
    const rotateX = new Matrix4().makeRotationAxis(new Vector3(1, 0, 0), Math.PI / 2);
    const shouldRotate = tile.content.gltfUpAxis !== "Z";

    // The computed trasnform already contains the root's transform, so we have to invert it
    const contentTransform = new Matrix4().fromArray(tile.computedTransform).premultiply(rootTransformInverse);

    if (shouldRotate) {
      contentTransform.multiply(rotateX); // convert from GLTF Y-up to Z-up
    }

    if (!tile.content.byteLength) {
      // In some cases (Google 3D Tiles) the byte length is not set in the content header
      tile.content.byteLength = tile.content.gltfArrayBuffer.byteLength;
    }

    gltfLoader.parse(
      tile.content.gltfArrayBuffer,
      tile.contentUrl ? tile.contentUrl.substr(0,tile.contentUrl.lastIndexOf('/') + 1) : null,
      (gltf) => {
        tile.userData.asset = gltf.asset;
        
        const tileContent = gltf.scenes[0] as Group;
        tileContent.applyMatrix4(contentTransform); 
      
        // Memory usage 
        tile.content.texturesByteLength = 0;
        tile.content.geometriesByteLength = 0;

        tileContent.traverse((object) => {
          if (object.type == "Mesh") {
            const mesh = object as Mesh;

            tile.content.geometriesByteLength += Util.getGeometryVRAMByteLength(mesh.geometry);

            const originalMaterial = (mesh.material as MeshStandardMaterial);
            const originalMap = originalMaterial.map;

            if (originalMap) {
              const textureByteLength = Util.getTextureVRAMByteLength(originalMap);
              if (textureByteLength) {
                tile.content.texturesByteLength += textureByteLength;
              }
            }

            if (options.material) {
              mesh.material = options.material.clone();
              originalMaterial.dispose();
            } else if (options.shading == Shading.FlatTexture && (mesh.material as Material).type !== "MeshBasicMaterial") {
              mesh.material = unlitMaterial.clone();
              originalMaterial.dispose();
            }

            if (options.shading != Shading.ShadedNoTexture) {
              if ((mesh.material as Material).type == "ShaderMaterial") {
                 (mesh.material as ShaderMaterial).uniforms.map = { value: originalMap };
              } else {
                (mesh.material as MeshStandardMaterial).map = originalMap;
              }
            } else {
              if (originalMap) {
                originalMap.dispose();
              }
              (mesh.material as MeshStandardMaterial).map = null;
            }

            (mesh.material as MeshStandardMaterial | MeshBasicMaterial).wireframe = options.wireframe;

            if (options.contentPostProcess) {
              options.contentPostProcess(mesh);
            }
          }
        });
        tile.content.gpuMemoryUsageInBytes = tile.content.texturesByteLength + tile.content.geometriesByteLength;
        resolve(tileContent);
      },
      (e) => {
        reject(new Error(`error parsing gltf in tile ${tile.id}: ${e}`));
      },
    );
  });
}
function createPointNodes(tile, pointcloudMaterial, options, rootTransformInverse) {
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

  const contentTransform = new Matrix4().fromArray(tile.computedTransform).premultiply(rootTransformInverse);

  if (d.rgba) {
    geometry.setAttribute('color', new Float32BufferAttribute(d.rgba, 4));
  } else if (d.rgb) {
    geometry.setAttribute('color', new Uint8BufferAttribute(d.rgb, 3, true));
  }
  if (d.intensities) {
    geometry.setAttribute(
      'intensity',
      // Handles both 16bit or 8bit intensity values
      new BufferAttribute(d.intensities, 1, true)
    );
  }
  if (d.classifications) {
    geometry.setAttribute('classification', new Uint8BufferAttribute(d.classifications, 1, false));
  }

  tile.content.geometriesByteLength = Util.getGeometryVRAMByteLength(geometry);
  tile.content.gpuMemoryUsageInBytes = tile.content.geometriesByteLength;

  const tileContent = new Points(geometry, options.material || pointcloudMaterial);

  if (d.rtc_center) {
    const c = d.rtc_center;
    contentTransform.multiply(new Matrix4().makeTranslation(c[0], c[1], c[2]));
  }
  tileContent.applyMatrix4(contentTransform);

  if (options.contentPostProcess) {
    options.contentPostProcess(tileContent);
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

function cameraChanged(camera:Camera, lastCameraTransform:Matrix4) {
  return !camera.matrixWorld.equals(lastCameraTransform);
}

function collectAttributions(tiles) {
  // attribution guidelines: https://developers.google.com/maps/documentation/tile/create-renderer#display-attributions
  
  const copyrightCounts = new Map(); // Use a Map to keep track of counts

  tiles.forEach(tile => {
    const copyright = tile?.userData?.asset?.copyright;
    if (copyright) {
      const attributions = copyright.split(/;/g).map(attr => attr.trim());
      attributions.forEach(attr => {
        if (attr) {
          // Increment the count for this attribution in the Map
          copyrightCounts.set(attr, (copyrightCounts.get(attr) || 0) + 1);
        }
      });
    }
  });

  const sortedAttributions = Array.from(copyrightCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([attr,]) => attr);

  const attributionString = sortedAttributions.join('; ');
  return attributionString;
}

export {
   Loader3DTiles, 
   PointCloudColoring, 
   Shading, 
   Runtime, 
   GeoCoord, 
   FeatureToColor, 
   LoaderOptions, 
   LoaderProps,
   GeoJSONLoaderProps,
   DrapingShaderOptions
};
