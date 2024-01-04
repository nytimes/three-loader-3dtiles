import typescript from 'rollup-plugin-typescript2';
import externals from 'rollup-plugin-node-externals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import eslint from '@rollup/plugin-eslint';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

const { NODE_ENV } = process.env;
const name = 'ThreeLoader3DTiles';
const sourcemap = true;

const addSyntheticNamedExportsToSkippedNodeImports = () => ({
  load: (importee) => {
    if (importee === '\u0000node-resolve:empty.js') {
      return {code: 'export default {};', syntheticNamedExports: true};
    } else {
      return null;
    }
  }
});


const config = [esmConfig('development'), umdConfig('development')];
if (NODE_ENV === 'production') {
  config.push(esmConfig('production'), umdConfig('production'))
}

export default config;
