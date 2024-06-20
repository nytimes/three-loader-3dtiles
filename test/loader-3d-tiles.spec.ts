import { Loader3DTiles, Runtime } from '../src'
import { expect, use } from 'chai'
import { Object3D } from 'three'
import chaiAsPromised from 'chai-as-promised'
import { installFilePolyfills } from '@loaders.gl/polyfills'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

use(chaiAsPromised)
installFilePolyfills()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Loader3DTiles', () => {
  it('handles successful loading of a tileset', async () => {
    const { model, runtime } = <{ model: Object3D; runtime: Runtime }>await Loader3DTiles.load(
      {
        url: path.resolve(__dirname,'./redrocks-tileset.json'),
        viewport: { width: 100, height: 100, devicePixelRatio: 1 }
      },
    )
    expect(model.type).to.equal('Group')
    expect(runtime.getTileset().root.type).to.equal('pointcloud')
  })
  it('throws an exception when loading failes', async () => {
    expect(
      Loader3DTiles.load({
        url: path.resolve(__dirname, './non-existing.json'),
        viewport: { width: 100, height: 100, devicePixelRatio: 1 }
      }),
    ).to.be.rejectedWith(Error)
  })
})
