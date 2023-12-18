import typescript from 'rollup-plugin-typescript2';
import externals from 'rollup-plugin-node-externals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import eslint from '@rollup/plugin-eslint';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const input = 'src/index.ts';

export default defineConfig({
    // Configuration options go here
    server: {
        port: 8000,
        host: true,
        hmr: true
    },
    build: {
        rollupOptions: {
            input: {
                'three-loader-3diles': 'src/index.ts',
                'google-3d-tiles-example': 'examples/demos/google-3dtiles/index.html',
            },
            output: {
                entryFileNames: '[name].js',
            },
            external: [
                'three',
                'three/examples/jsm/loaders/GLTFLoader.js',
                'three/examples/jsm/loaders/DRACOLoader.js',
                'three/examples/jsm/loaders/KTX2Loader.js'
            ],
        }
    }
});

function commonPlugins() {
  const plugins = [
    externals(),
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.ts'],
      browser: true
    }),
    terser()
  ];
  return plugins;
}

function umdConfig() {
  return {
    output: {
        file: `dist/three-loader-3dtiles.min.js`,
        format: 'umd',
        sourcemap: true,
        globals: {
        three: 'THREE',
        'three/examples/jsm/loaders/GLTFLoader.js' : 'THREE',
        'three/examples/jsm/loaders/DRACOLoader.js' : 'THREE',
        'three/examples/jsm/loaders/KTX2Loader.js' : 'THREE'
        },
    },
    external: [
    'three',
    'three/examples/jsm/loaders/GLTFLoader.js',
    'three/examples/jsm/loaders/DRACOLoader.js',
    'three/examples/jsm/loaders/KTX2Loader.js'
    ],
    plugins: [...commonPlugins()]
  }
}

function esmConfig() {
  return {
    output: {
        file: `dist/three-loader-3dtiles.esm.min.js`,
        format: 'es',
        sourcemap: true
    },
    plugins: [...commonPlugins()]
  }
}
