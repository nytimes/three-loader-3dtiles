import { Loader3DTiles, LoaderProps, Runtime } from 'three-loader-3dtiles'
import { useLoader, useThree, useFrame } from '@react-three/fiber'
import { Loader, Vector2 } from 'three'

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
    viewport: getViewport(threeState.gl),
    options: {
      ...props
    }
  }

  // TODO: Getting type error
  // @ts-ignore
  const { model, runtime } = useLoader(Loader3DTilesBridge, props.url, (loader:Loader3DTilesBridge) => {
    loader.setProps(loaderProps);    
  })

  useFrame(({ size, camera }, dt) => {
    runtime.update(dt, size.height, camera);
  });

  return (
    <group {...props} dispose={runtime.dispose}>
      <primitive object={model} />
    </group>
  )
}
function getViewport(renderer) {
  const viewSize = renderer.getSize(new Vector2());
  return {
    width: viewSize.x,
    height: viewSize.y,
    devicePixelRatio: renderer.getPixelRatio()
  }
}

export { Loader3DTilesR3FAsset }
