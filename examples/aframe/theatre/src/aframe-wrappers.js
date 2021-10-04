import {getProject} from "@theatre/core"
import studio from "@theatre/studio"

AFRAME.registerComponent('3d-tiles', {
  schema: {
    url: {type: 'string'},
    wireframe: {type: 'boolean', default: false}
  },
  init: async function () {
    console.log("Init 3d-tiles", this.data.url);
    this.camera = document.querySelector('[camera]').object3D.children[0];
    const {model, runtime} = await ThreeLoader3DTiles.Loader3DTiles.load({
        url: this.data.url,
        renderer: this.el.sceneEl.renderer,
        options: {
          dracoDecoderPath: 'https://unpkg.com/three@0.133.0/examples/js/libs/draco',
          basisTranscoderPath: 'https://unpkg.com/three@0.133.0/examples/js/libs/basis',
          maximumScreenSpaceError: 48,
          initialTransform:
            new THREE.Matrix4()
              .makeRotationFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0))
              .setPosition(0, 0, 0)
          
        }
    })
    this.el.setObject3D('tileset', model);
    this.runtime = runtime;
  },
  tick: function(t,dt) {
    if (this.runtime) {
       this.runtime.update(dt, this.el.sceneEl.renderer, this.camera);
    }
  }
});

AFRAME.registerComponent('theatre-animation', {
  schema: {
  },
  init: function () {
    console.log("Init theatre", this.el.id);
    studio.initialize()
    const proj = getProject(
      "A-Frame Theatre"
    )
    const sheet = proj.sheet(
      "Scene"
    )
    const obj = sheet.object(
      this.el.id,
      // These are the object's default values (and as we'll later learn, its props types)
      {
        position:  {
          x: this.el.object3D.position.x,
          y: this.el.object3D.position.y,
          z: this.el.object3D.position.z
        }

      }
    )
    const unsubscribe = obj.onValuesChange( (newValue) => {
      this.el.object3D.position.x = newValue.position.x;
      this.el.object3D.position.y = newValue.position.y;
      this.el.object3D.position.z = newValue.position.z;
    })
  },
  tick: function(t,dt) {
  }
});
