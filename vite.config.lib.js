import { defineConfig } from 'vite';

const input = 'src/index.ts';

export default defineConfig({
    resolve: {
      alias: {
      //  '@loaders.gl/tiles': '@softrobot/loaders.gl-tiles'
      }
    },
    build: {
        outDir: 'dist/lib',
        lib: {
            entry: 'src/index.ts',
            name: 'ThreeLoader3DTiles',
            fileName: 'three-loader-3dtiles'
        },
        rollupOptions: {
            external: [
                'three',
                'three/examples/jsm/loaders/GLTFLoader.js',
                'three/examples/jsm/loaders/DRACOLoader.js',
                'three/examples/jsm/loaders/KTX2Loader.js'
            ],
            output: {
              globals: {
                three: 'THREE',
                'three/examples/jsm/loaders/GLTFLoader.js' : 'THREE',
                'three/examples/jsm/loaders/DRACOLoader.js' : 'THREE',
                'three/examples/jsm/loaders/KTX2Loader.js' : 'THREE'
              }
            }
        }
    }
});