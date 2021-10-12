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

function Loader3DTilesR3FAsset(props) {
  const threeState = useThree();
  const loaderProps = {
    renderer: threeState.gl,
    options: {
      dracoDecoderPath: 'https://unpkg.com/three@0.129.0/examples/js/libs/draco',
      basisTranscoderPath: 'https://unpkg.com/three@0.129.0/examples/js/libs/basis',
      ...props
    }
  }

  // TODO: Getting type error
  // @ts-ignore
  const { model, runtime } = useLoader(Loader3DTilesBridge, props.url, (loader:Loader3DTilesBridge) => {
    loader.setProps(loaderProps);    
  })

  useFrame(({ gl, camera }, dt) => {
    runtime.update(dt, gl, camera);
  });

  // TODO: Disposal throws an error from updateCacheStats
  return (
    <group {...props} dispose={runtime.dispose}>
      <primitive object={model} />
    </group>
  )
}

export { Loader3DTilesR3FAsset }
