import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    optimizeDeps: {
      // These packages raise import errors unless specifically included in here
      include: ['jszip', 'pako', 'snappyjs']
    },
    server: {
        port: 8000,
        host: true,
        hmr: true,
        open: '/examples/demos/index.html'
    },
    build: {
        outDir: 'dist/web',
        rollupOptions: {
            input: {
                'three-loader-3diles': 'src/index.ts',
                'google-3d-tiles-example': 'examples/demos/google-3dtiles/index.html',
                'google-geojson-example': 'examples/demos/google-geojson/index.html',
                'realitycapture-example': 'examples/demos/realitycapture/index.html',
                'map-overlay-example': 'examples/demos/map-overlay/index.html',
                'cesium': 'examples/demos/cesium/index.html',
                'demos-index': 'examples/demos/index.html',
            },
        }
    }
});