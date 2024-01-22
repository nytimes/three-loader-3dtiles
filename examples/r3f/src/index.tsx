import * as ReactDOM from 'react-dom/client'
import { useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { ErrorBoundary } from 'react-error-boundary';
import { Matrix4, Euler } from 'three'

import { Loader3DTilesR3FAsset } from './loader-3dtiles-r3f'

function App() {
  const camera = useRef(null);

  return (
    <div id="canvas-container">
      <Canvas style={{ background: '#272730'}}>
        <PerspectiveCamera ref={camera}>
          <ErrorBoundary fallbackRender={() => (
            <mesh>
              <sphereGeometry />
              <meshBasicMaterial color="red" />
            </mesh>
          )}>
            <Suspense fallback={
              <mesh>
                <sphereGeometry />
                <meshBasicMaterial color="yellow" />
              </mesh>
            }>
              <Loader3DTilesR3FAsset
                 dracoDecoderPath={"https://unpkg.com/three@0.160.0/examples/jsm/libs/draco"}
                 basisTranscoderPath={"https://unpkg.com/three@0.160.0/examples/jsm/libs/basis"}
                 rotation={new Euler(-Math.PI / 2, 0, 0)}
                 url="https://int.nyt.com/data/3dscenes/ONA360/TILESET/0731_FREEMAN_ALLEY_10M_A_36x8K__10K-PN_50P_DB/tileset_tileset.json"
                maximumScreenSpaceError={48}
              />
            </Suspense>
          </ErrorBoundary>
        </PerspectiveCamera>
        <OrbitControls camera={camera.current} />
      </Canvas>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
