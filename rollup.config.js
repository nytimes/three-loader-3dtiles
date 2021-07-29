import typescript from 'rollup-plugin-typescript2';
import externals from 'rollup-plugin-node-externals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import eslint from '@rbnlffl/rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import { getOcularConfig } from 'ocular-dev-tools';

const { NODE_ENV } = process.env;
const input = 'src/index.ts';
const name = 'ThreebirdLoader3DTiles';
const sourcemap = true;

// If developing along with loaders.gl, use the source instead of the package from npm

const commonPlugins = () => {
  const plugins = [
    externals(),
    alias({
      entries: process.env.LOADERS_GL_SRC ? 
        Object.entries(
          getOcularConfig({root: process.env.LOADERS_GL_SRC}).aliases
        )
        .map(
          ([key, value], i) => ({
              find: key,
              replacement: value
          })
        )
      : []
    }),
    addSyntheticNamedExportsToSkippedNodeImports(),
    nodeResolve({
      extensions: ['.js', '.ts'],
      browser: true
    }),
    // TODO: Internal RDGLTFLoader should be converted to typescript
    eslint({filterExclude: ['src/RDGLTFLoader.js', 'node_modules/**']}),
    typescript({
      tsconfigDefaults: {
        compilerOptions: {
          paths: process.env.LOADERS_GL_SRC ? 
            Object.fromEntries(
              Object.entries(
                getOcularConfig({root: process.env.LOADERS_GL_SRC}).aliases
              )
              .map(
                  ([key, value], i) => [key, [value]]
              )          
            )
          : {}
        }
      }
    })
  ];
  if (NODE_ENV === 'production') {
    plugins.push(terser());
  }
  return plugins;
};

const addSyntheticNamedExportsToSkippedNodeImports = () => ({
  load: (importee) => {
    if (importee === '\u0000node-resolve:empty.js') {
      return {code: 'export default {};', syntheticNamedExports: true};
    } else {
      return null;
    }
  }
});

const esmConfig = {
  input,
  output: {
    file: `dist/threebird-loader-3d-tiles.esm${NODE_ENV == 'production' ? '.min' : ''}.js`,
    format: 'es',
    name,
    sourcemap,
  },
  plugins: [...commonPlugins()]
}

const config = [esmConfig];

export default config;
