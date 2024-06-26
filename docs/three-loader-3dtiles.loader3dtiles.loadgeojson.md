<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [three-loader-3dtiles](./three-loader-3dtiles.md) &gt; [Loader3DTiles](./three-loader-3dtiles.loader3dtiles.md) &gt; [loadGeoJSON](./three-loader-3dtiles.loader3dtiles.loadgeojson.md)

## Loader3DTiles.loadGeoJSON() method

Loads a tileset of 3D Tiles according to the given [GeoJSONLoaderProps](./three-loader-3dtiles.geojsonloaderprops.md) Could be overlayed on geograpical 3D Tiles using [Runtime.overlayGeoJSON()](./three-loader-3dtiles.runtime.overlaygeojson.md)

**Signature:**

```typescript
static loadGeoJSON(props: GeoJSONLoaderProps): Promise<Object3D>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  props | [GeoJSONLoaderProps](./three-loader-3dtiles.geojsonloaderprops.md) | Properties for this load call [GeoJSONLoaderProps](./three-loader-3dtiles.geojsonloaderprops.md)<!-- -->. |

**Returns:**

Promise&lt;Object3D&gt;

An object containing the 3D Model to be added to the scene

