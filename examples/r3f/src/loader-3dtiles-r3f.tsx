import { Loader3DTiles, LoaderProps, Runtime } from 'three-loader-3dtiles'
import { useLoader, useThree, useFrame } from '@react-three/fiber'
import { Loader, Object3D } from 'three'

class Loader3DTilesBridge extends Loader {
  props: LoaderProps;

  load(url, onLoad, onProgress, onError) {
    const loadTileset = async () => {
      try {
        const result = await Loader3DTiles.load({
           url,
           ...this.props,
          onProgress
         })
         onLoad(result);
      }
      catch(e) {
        console.log("Error loading 3d tiles!", e);
        onError(e);
      }
    }
    loadTileset();
  }
  setProps(props) {
    this.props = props;
  }
};

function Loader3DTilesR3FAsset(options) {
  const threeState = useThree();
  const props = {
    renderer: threeState.gl,
    options: {
      dracoDecoderPath: 'https://unpkg.com/three@0.129.0/examples/js/libs/draco',
      basisTranscoderPath: 'https://unpkg.com/three@0.129.0/examples/js/libs/basis',
      ...options
    }
  }

  // TODO: Getting type error
  // @ts-ignore
  const { model, runtime } = useLoader(Loader3DTilesBridge, options.url, (loader:Loader3DTilesBridge) => {
    loader.setProps(props);    
  })

  useFrame(({ gl, camera }, dt) => {
    runtime.update(dt, gl, camera);
  });

  // TODO: Disposal throws an error from updateCacheStats
  return (
    <group dispose={runtime.dispose}>
      <primitive object={model} />
    </group>
  )
}

export { Loader3DTilesR3FAsset }
