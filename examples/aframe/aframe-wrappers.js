AFRAME.registerComponent('story-rig', {
  init: function () {
    console.log("Init story rig")
    const scene = this.el.sceneEl.object3D;
    const camera = this.el.children[0].object3D.children[0]; // Assuming a child camera
    this.rig = new ThreeStoryControls.CameraRig(camera, scene)
  }
});

AFRAME.registerComponent('story-points-controls', {
  dependencies: ['story-rig'],
  init: function () {
    console.log("Init story-points-controls")
    const rig = this.el.components['story-rig'].rig;

    const makePOIs = () => {
      return Array.from(document.querySelectorAll('[story-point]')).map(
        el => ({
          position: el.object3D.position,
          quaternion: el.object3D.quaternion,
          duration: el.getAttribute('story-point').duration,
          ease: el.getAttribute('story-point').ease
      }));
    }

    const controls = new ThreeStoryControls.StoryPointsControls(rig, makePOIs(), {
      cycle: true,
    })
    controls.enable()
    controls.goToPOI(0);

    this.el.addEventListener('nextPOI', function (event) {
      controls.nextPOI();
    });
    this.el.addEventListener('prevPOI', function (event) {
      controls.prevPOI();
    });
    document.querySelectorAll('[story-point]').forEach(item => {
      item.addEventListener('storyPointUpdated', event => {
        controls.pois = makePOIs();
      })
    })
  }
});

AFRAME.registerComponent('story-point', {
  schema: {
    duration: {type: 'number', default: 1},
    ease: {type: 'string', default: 'power1'}
  },
  init: function () {
    console.log("Init story point", this.data)
  },
  update: function() {
    this.el.emit("storyPointUpdated");
  }
});

AFRAME.registerComponent('story-scroll-controls', {
  dependencies: ['story-rig','gltf-model'],
  schema: {
    dampingFactor:  {type: 'number', default: 0.5},
    offset:  {type: 'string', default: '0vh'},
    scrollElement: {type: 'selector'}
  },
  init: function () {
    console.log("Init story-scroll-controls")
    const rig = this.el.components['story-rig'].rig;
    this.el.addEventListener('model-loaded', event => {
      console.log("Model loaded!",event.detail)
      rig.setAnimationClip(event.detail.model.animations[0])
      rig.setAnimationTime(0)
      this.controls = new ThreeStoryControls.ScrollControls(rig, {
        scrollElement: this.data.scrollElement,
        dampingFactor: this.data.dampingFactor,
        startOffset: this.data.offset,
        endOffset: this.data.offset
      })
      this.controls.enable();
    })
  },
  tick: function () {
    if (this.controls) {
      this.controls.update();
    }
  }
});

AFRAME.registerComponent('story-threedof-controls', {
  dependencies: ['story-rig'],
  schema: {
    panFactor:  {type: 'number', default: Math.PI / 10},
    tiltFactor:  {type: 'number', default: Math.PI / 10},
    truckFactor:  {type: 'number', default: 0},
    pedestalFactor:  {type: 'number', default: 0}
  },
  init: function () {
    const rig = this.el.components['story-rig'].rig;
    this.controls = new ThreeStoryControls.ThreeDOFControls(rig, {
        panFactor: this.data.panFactor,
        tiltFactor: this.data.tiltFactor,
        truckFactor: this.data.truckFactor,
        pedestalFactor: this.data.pedestalFactor,
        domElement: document.querySelector('a-scene')
    })
    this.controls.enable();
  },
  tick: function () {
    if (this.controls) {
      this.controls.update();
    }
  }
});

AFRAME.registerComponent('3d-tiles', {
  schema: {
    url: {type: 'string'},
    cameraEntity: {type: 'selector'},
    maximumSSE: {type: 'int', default: 16},
    maximumMem: {type: 'int', default: 32},
    distanceScale: {type: 'number', default: 1.0},
    wireframe: {type: 'boolean', default: false},
    cesiumIONToken: {type: 'string'}
  },
  init: async function () {
    this.camera = this.data.cameraEntity?.object3D.children[0] ?? document.querySelector('a-scene').camera;
    if (!this.camera) {
      throw new Error("3D-Tils: Please specifiy the target camera via the cameraEntity property")
    }
    this.originalCamera = this.camera;
    const {model, runtime} = await ThreeLoader3DTiles.Loader3DTiles.load({
        url: this.data.url,
        renderer: this.el.sceneEl.renderer,
        options: {
          dracoDecoderPath: 'https://unpkg.com/three@0.133.0/examples/js/libs/draco',
          basisTranscoderPath: 'https://unpkg.com/three@0.133.0/examples/js/libs/basis',
          cesiumIONToken: this.data.cesiumIONToken,
          maximumScreenSpaceError: this.data.maximumSSE,
          maximumMemoryUsage: this.data.maximumMem,
          viewDistanceScale: this.data.distanceScale,
          updateTransforms: true
        }
    })
    this.el.setObject3D('tileset', model);
    this.runtime = runtime;
    this.el.sceneEl.addEventListener('camera-set-active', (e) => { 
      // TODO: For some reason after closing the inspector this event is fired with an empty camera,
      // so revert to the original camera used.
      //
      // TODO: Does not provide the right Inspector perspective camera
      this.camera = e.detail.cameraEl.object3D.children[0] ?? this.originalCamera;
    }) 
  },
  update: function() {
    if (this.runtime) {
      this.runtime.setWireframe(this.data.wireframe);
      this.runtime.setViewDistanceScale(this.data.distanceScale);
    }    
  },
  tick: function(t,dt) {
    if (this.runtime) {
      if (!this.camera) {
        console.log("Camera lost");
      }
      this.runtime.update(dt, this.el.sceneEl.renderer, this.camera);
    }
  },
  remove: function() {
    if (this.runtime) {
      this.runtime.dispose();
    }
  }
});
