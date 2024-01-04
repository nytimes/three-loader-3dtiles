import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
      alias: {
        '@loaders.gl/tiles': '@softrobot/loaders.gl-tiles'
      }
    },
    base: './',
    optimizeDeps: {
      exclude: ['@loaders.gl/tiles', '@loaders.gl/3d-tiles']
    },
    server: {
        port: 8000,
        host: true,
        hmr: true
    },
    build: {
        outDir: 'dist/web',
        rollupOptions: {
            input: {
                'three-loader-3diles': 'src/index.ts',
                'google-3d-tiles-example': 'examples/demos/google-3dtiles/index.html',
                'realitycapture-example': 'examples/demos/realitycapture/index.html',
                'map-overlay-example': 'examples/demos/map-overlay/index.html',
                'cesium': 'examples/demos/cesium/index.html',
                'demos-index': 'examples/demos/index.html',
            },
        }
    }
});