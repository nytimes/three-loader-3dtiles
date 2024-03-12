import{O as W,S as I,a as K}from"./stats-widget-VM3aIsim.js";import{V as w,E as S,O as f,P as M,b as N,A as Y,Q as x,S as X,W as Z,c as B,L as _,C as Q}from"./three-loader-3diles-dx29Csso.js";import{g as D}from"./index-G-f5Qm2g.js";class A{constructor(t){this.epsilon=.001,this.values={},this.targetValues={},this.deltaValues={},Object.assign(this.values,t.values),Object.assign(this.targetValues,t.values),this.deltaValues={};for(const e in this.values)this.deltaValues[e]=0;this.dampingFactor=t.dampingFactor,t.epsilon&&(this.epsilon=t.epsilon),this.hasReached=!0}update(){const t={};let e=!0;for(const i in this.values)t[i]=this.targetValues[i]-this.values[i],e=e&&Math.abs(t[i])<this.epsilon;if(e){for(const i in this.values)this.deltaValues[i]=t[i],this.values[i]=this.targetValues[i];this.hasReached=!0}else for(const i in this.values)this.deltaValues[i]=this.dampingFactor*t[i],this.values[i]+=this.deltaValues[i]}setTarget(t){for(const e in t)this.targetValues[e]=t[e];this.hasReached=!1}addToTarget(t,e){this.targetValues[t]+=e,this.hasReached=!1}resetAll(t){for(const e in this.values)this.targetValues[e]=t,this.values[e]=t,this.deltaValues[e]=0;this.hasReached=!0}resetData(t){for(const e in t)this.targetValues[e]=t[e],this.values[e]=t[e],this.deltaValues[e]=0;this.hasReached=!0}getCurrentValues(){return Object.assign({},this.values)}getDeltaValues(){return Object.assign({},this.deltaValues)}reachedTarget(){return this.hasReached}}var n,R,a;(function(s){s.Pan="Pan",s.Tilt="Tilt",s.Roll="Roll",s.Truck="Truck",s.Pedestal="Pedestal",s.Dolly="Dolly",s.Zoom="Zoom"})(n||(n={})),function(s){s.Body="body",s.Head="head",s.Eyes="eyes"}(R||(R={})),function(s){s.X="x",s.Y="y",s.Z="z"}(a||(a={}));const H={[a.X]:new w(1,0,0),[a.Y]:new w(0,1,0),[a.Z]:new w(0,0,1)},k={[a.X]:{[n.Pan]:a.X,[n.Tilt]:a.Z,[n.Roll]:a.Y},[a.Y]:{[n.Pan]:a.Y,[n.Tilt]:a.X,[n.Roll]:a.Z},[a.Z]:{[n.Pan]:a.Z,[n.Tilt]:a.Y,[n.Roll]:a.X}};class G extends S{constructor(t,e){super(),this.inTransit=!1,this.upAxis=a.Y,this.actionAxes=k[this.upAxis],this.hasAnimation=!1,this.animationTranslationObjectName="Translation",this.animationRotationObjectName="Rotation",this.translateAlong={[n.Tilt]:!1,[n.Pan]:!0,[n.Roll]:!1},this.camera=t,this.scene=e,this.body=new f,this.head=new f,this.eyes=new f,this.head.name=this.animationRotationObjectName,this.body.name=this.animationTranslationObjectName,this.body.rotation.order=this.getRotationOrder(),this.head.rotation.order=this.getRotationOrder(),this.eyes.rotation.order=this.getRotationOrder(),this.scene.add(this.body.add(this.head.add(this.eyes.add(this.camera)))),this.cameraIsInRig=!0,this.unpackTransform()}getAxisFor(t){return this.actionAxes[t]}getAxisVectorFor(t){return H[this.actionAxes[t]]}do(t,e,i){const o=this[i];switch(t){case n.Pan:case n.Tilt:case n.Roll:{const r=this.getAxisVectorFor(t);o?o.rotateOnAxis(r,e):this.translateAlong[t]?this.body.rotateOnAxis(r,e):this.eyes.rotateOnAxis(r,e);break}case n.Truck:{const r=this.getAxisVectorFor(n.Tilt);(o||this.body).translateOnAxis(r,e);break}case n.Pedestal:{const r=this.getAxisVectorFor(n.Pan);(o||this.body).translateOnAxis(r,e);break}case n.Dolly:{const r=this.getAxisVectorFor(n.Roll);(o||this.body).translateOnAxis(r,e);break}case n.Zoom:this.camera instanceof M&&(this.camera.fov=e,this.camera.updateProjectionMatrix())}}getWorldCoordinates(){const t=new w;this.camera.getWorldPosition(t);const e=new x;return this.camera.getWorldQuaternion(e),{position:t,quaternion:e}}setWorldCoordinates({position:t,quaternion:e}){const i=new N().setFromQuaternion(e,this.getRotationOrder()),o=[n.Pan,n.Tilt,n.Roll];this.eyes.position.set(0,0,0),this.eyes.rotation.set(0,0,0),this.head.position.set(0,0,0),this.head.rotation.set(0,0,0),this.body.position.copy(t),o.forEach(r=>{const d=this.getAxisFor(r);this.translateAlong[r]?this.body.rotation[d]=i[d]:this.eyes.rotation[d]=i[d]}),this.camera.rotation.set(0,0,0),this.camera.position.set(0,0,0)}packTransform(){const{position:t,quaternion:e}=this.getWorldCoordinates();this.body.position.copy(t),this.body.rotation.set(0,0,0),this.head.quaternion.copy(e),this.head.position.set(0,0,0),this.eyes.position.set(0,0,0),this.eyes.rotation.set(0,0,0)}unpackTransform(){const{position:t,quaternion:e}=this.getWorldCoordinates();this.setWorldCoordinates({position:t,quaternion:e})}disassemble(){this.cameraIsInRig&&(this.scene.attach(this.camera),this.cameraIsInRig=!1)}assemble(){this.cameraIsInRig||(this.eyes.attach(this.camera),this.unpackTransform(),this.cameraIsInRig=!0)}getRotationOrder(){return Object.values(this.actionAxes).join("").toUpperCase()}isInRig(){return this.cameraIsInRig}isMoving(){return this.inTransit}setUpAxis(t){this.upAxis=t,this.actionAxes=k[this.upAxis],this.body.rotation.order=this.getRotationOrder()}setAnimationClip(t,e,i){this.animationClip=t,e&&(this.animationTranslationObjectName=e),i&&(this.animationRotationObjectName=i),this.hasAnimation=!0,this.animationClip.duration+=.01,this.mixer=new Y(this.body);const o=this.mixer.clipAction(this.animationClip);o.clampWhenFinished=!0,o.play()}flyTo(t,e,i=1,o="power1",r=!0){if(!this.isMoving()){const d=this.getWorldCoordinates(),h={px:d.position.x,py:d.position.y,pz:d.position.z,qx:d.quaternion.x,qy:d.quaternion.y,qz:d.quaternion.z,qw:d.quaternion.w,slerpAmt:0},v={px:t.x,py:t.y,pz:t.z,qx:e.x,qy:e.y,qz:e.z,qw:e.w,slerpAmt:1},b=new x,V=new x(h.qx,h.qy,h.qz,h.qw),q=()=>{this.inTransit=!0,this.packTransform(),this.dispatchEvent({type:"CameraMoveStart"})},L=U=>{this.body.position.set(h.px,h.py,h.pz),r?(b.slerpQuaternions(V,e,h.slerpAmt),this.head.setRotationFromQuaternion(b)):this.head.quaternion.set(h.qx,h.qy,h.qz,h.qw),this.dispatchEvent({type:"CameraMoveUpdate",progress:U.progress()})},j=()=>{this.inTransit=!1,this.unpackTransform(),this.dispatchEvent({type:"CameraMoveEnd"})};D.to(h,Object.assign(Object.assign({duration:i,ease:o},v),{onStart:q,onUpdate:function(){L(this)},onComplete:j}))}}flyToKeyframe(t,e=1,i="power1"){if(this.hasAnimation&&!this.isMoving()){const o={time:this.mixer.time},r={time:this.animationClip.tracks[0].times[t]},d=()=>{this.inTransit=!0,this.dispatchEvent({type:"CameraMoveStart"})},h=b=>{this.mixer.setTime(o.time),this.dispatchEvent({type:"CameraMoveUpdate",progress:b.progress()})},v=()=>{this.inTransit=!1,this.dispatchEvent({type:"CameraMoveEnd"})};D.to(o,Object.assign(Object.assign({duration:e,ease:i},r),{onStart:d,onUpdate:function(){h(this)},onComplete:v}))}}setAnimationPercentage(t){if(this.hasAnimation){const e=Math.max(0,Math.min(t*this.animationClip.duration,this.animationClip.duration-1e-4));this.mixer.setTime(e)}}setAnimationTime(t){this.hasAnimation&&this.mixer.setTime(t)}setAnimationKeyframe(t){this.hasAnimation&&this.mixer.setTime(this.animationClip.tracks[0].times[t])}}class P extends S{constructor(){super()}}const J={keyMapping:{forward:["ArrowUp","w","W"],backward:["ArrowDown","s","S"],left:["ArrowLeft","a","A"],right:["ArrowRight","d","D"],up:["u","U"],down:["n","N"]},dampingFactor:.5,incrementor:1,preventBubbling:!0};class $ extends P{constructor(t){super(),Object.assign(this,J,t);const e={};for(const i in this.keyMapping)e[i]=0;this.damper=new A({values:e,dampingFactor:this.dampingFactor}),this.onKeyUp=this.onKeyUp.bind(this),this.onKeyDown=this.onKeyDown.bind(this)}connect(){document.addEventListener("keyup",this.onKeyUp,!0),document.addEventListener("keydown",this.onKeyDown,!0),this.connected=!0}disconnect(){document.removeEventListener("keyup",this.onKeyUp,!0),document.removeEventListener("keydown",this.onKeyDown,!0),this.connected=!1}update(){this.type!=="continuous"||this.damper.reachedTarget()||(this.damper.update(),this.dispatchEvent({type:"update",values:this.damper.getCurrentValues(),deltas:this.damper.getDeltaValues()}),this.damper.reachedTarget()&&(this.damper.resetAll(0),this.dispatchEvent({type:"inertiacomplete"})))}isEnabled(){return this.connected}onKeyUp(t){if(this.type==="discrete"){for(const e in this.keyMapping)if(this.keyMapping[e].includes(t.key)){this.preventBubbling&&t.preventDefault(),this.dispatchEvent({type:"trigger",trigger:e});break}}}onKeyDown(t){if(this.type==="continuous"){for(const e in this.keyMapping)if(this.keyMapping[e].includes(t.key)){this.preventBubbling&&t.preventDefault(),this.damper.addToTarget(e,this.incrementor);break}}}}const tt={domElement:document.body,dampingFactor:.5,shouldNormalize:!0,normalizeAroundZero:!0,multipointerThreshold:100};class et extends P{constructor(t){super(),this.domElement=document.body,this.shouldNormalize=!0,this.normalizeAroundZero=!0,this.pointerCount=0,this.recordedPosition=!1,this.cache=[],this.lastDownTime=0,this.lastUpTime=0,Object.assign(this,tt,t),this.damper=new A({values:{x:null,y:null},dampingFactor:this.dampingFactor}),this.setDimensions(),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onPointerDown=this.onPointerDown.bind(this),this.onResize=this.onResize.bind(this)}connect(){this.domElement.addEventListener("pointermove",this.onPointerMove,{passive:!0}),this.domElement.addEventListener("pointerdown",this.onPointerDown,{passive:!0}),this.domElement.addEventListener("pointerleave",this.onPointerUp,{passive:!0}),this.domElement.addEventListener("pointerup",this.onPointerUp,{passive:!0}),window.addEventListener("resize",this.onResize),this.connected=!0}disconnect(){this.domElement.removeEventListener("pointermove",this.onPointerMove),this.domElement.removeEventListener("pointerdown",this.onPointerDown),this.domElement.removeEventListener("pointerleave",this.onPointerUp),this.domElement.removeEventListener("pointerup",this.onPointerUp),this.connected=!1}update(t){this.pointerCount!==this.cache.length&&t-this.lastDownTime>this.multipointerThreshold&&t-this.lastUpTime>this.multipointerThreshold&&(this.pointerCount=this.cache.length,this.pointerCount===0?(this.damper.resetAll(null),this.recordedPosition=!1):(this.damper.resetData(this.getPointerPosition(this.cache[0])),this.recordedPosition=!0)),this.damper.reachedTarget()||(this.damper.update(),this.dispatchEvent({type:"update",values:this.shouldNormalize?this.normalize(this.damper.getCurrentValues(),this.normalizeAroundZero):this.damper.getCurrentValues(),deltas:this.shouldNormalize?this.normalize(this.damper.getDeltaValues(),!1):this.damper.getDeltaValues(),pointerCount:this.pointerCount}),this.damper.reachedTarget()&&this.dispatchEvent({type:"inertiacomplete"}))}isEnabled(){return this.connected}setDimensions(){this.width=this.domElement.getBoundingClientRect().width,this.height=this.domElement.getBoundingClientRect().height}getPointerPosition(t){return{x:Math.max(0,Math.min(this.width,t.x-this.domElement.offsetLeft)),y:Math.max(0,Math.min(this.height,t.y-this.domElement.offsetTop))}}normalize(t,e){let i=t.x/this.width,o=t.y/this.height;return e&&(i=2*i-1,o=2*o-1),{x:i,y:o}}onPointerMove(t){this.pointerCount===this.cache.length&&(this.cache.length===0?this.recordedPosition?this.damper.setTarget(this.getPointerPosition(t)):(this.damper.resetData(this.getPointerPosition(t)),this.recordedPosition=!0):t.pointerId===this.cache[0].pointerId&&this.damper.setTarget(this.getPointerPosition(t)))}onPointerDown(t){t.button===0&&(this.cache.push(t),this.lastDownTime=window.performance.now())}onPointerUp(t){if(t.button===0||t.type==="pointerleave"){for(let e=0;e<this.cache.length;e++)if(this.cache[e].pointerId==t.pointerId){this.cache.splice(e,1);break}this.lastUpTime=window.performance.now()}}onResize(){this.setDimensions()}}const it={dampingFactor:.5,thresholdX:15,thresholdY:15,debounceDuration:700};class nt extends P{constructor(t){super(),this.lastThresholdTrigger=0,Object.assign(this,it,t),this.damper=new A({values:{x:0,y:0},dampingFactor:this.dampingFactor}),this.onWheel=this.onWheel.bind(this)}connect(){(this.domElement||window).addEventListener("wheel",this.onWheel,{passive:!0}),this.connected=!0}disconnect(){(this.domElement||window).removeEventListener("wheel",this.onWheel),this.connected=!1}update(){this.type!=="continuous"||this.damper.reachedTarget()||(this.damper.update(),this.dispatchEvent({type:"update",values:this.damper.getCurrentValues(),deltas:this.damper.getDeltaValues()}),this.damper.reachedTarget()&&(this.damper.resetAll(0),this.dispatchEvent({type:"inertiacomplete"})))}isEnabled(){return this.connected}onWheel(t){if(this.type==="continuous")this.damper.addToTarget("x",t.deltaX),this.damper.addToTarget("y",t.deltaY);else if(this.type==="discrete"&&(Math.abs(t.deltaX)>=this.thresholdX||Math.abs(t.deltaY)>=this.thresholdY)){const e=window.performance.now();e-this.lastThresholdTrigger>this.debounceDuration&&(this.lastThresholdTrigger=e,this.dispatchEvent({type:"trigger",x:Math.abs(t.deltaX)>=this.thresholdX?Math.sign(t.deltaX):0,y:Math.abs(t.deltaY)>=this.thresholdY?Math.sign(t.deltaY):0}))}}}const c={domElement:document.body,pointerDampFactor:.3,pointerScaleFactor:4,keyboardDampFactor:.5,keyboardScaleFactor:.5,wheelDampFactor:.25,wheelScaleFactor:.05,panDegreeFactor:Math.PI/4,tiltDegreeFactor:Math.PI/10};class st{constructor(t,e={}){this.enabled=!1,this.cameraRig=t,this.wheelScaleFactor=e.wheelScaleFactor||c.wheelScaleFactor,this.pointerScaleFactor=e.pointerScaleFactor||c.pointerScaleFactor,this.panDegreeFactor=e.panDegreeFactor||c.panDegreeFactor,this.tiltDegreeFactor=e.tiltDegreeFactor||c.tiltDegreeFactor,this.keyboardAdaptor=new $({type:"continuous",dampingFactor:e.keyboardDampFactor||c.keyboardDampFactor,incrementor:e.keyboardScaleFactor||c.keyboardScaleFactor}),this.wheelAdaptor=new nt({type:"continuous",dampingFactor:e.wheelDampFactor||c.wheelDampFactor,domElement:e.domElement||c.domElement}),this.pointerAdaptor=new et({domElement:e.domElement||c.domElement,dampingFactor:e.pointerDampFactor||c.pointerDampFactor}),this.onWheel=this.onWheel.bind(this),this.onKey=this.onKey.bind(this),this.onPointer=this.onPointer.bind(this)}isEnabled(){return this.enabled}enable(){this.wheelAdaptor.connect(),this.keyboardAdaptor.connect(),this.pointerAdaptor.connect(),this.wheelAdaptor.addEventListener("update",this.onWheel),this.keyboardAdaptor.addEventListener("update",this.onKey),this.pointerAdaptor.addEventListener("update",this.onPointer),this.enabled=!0}disable(){this.wheelAdaptor.disconnect(),this.keyboardAdaptor.disconnect(),this.pointerAdaptor.disconnect(),this.wheelAdaptor.removeEventListener("update",this.onWheel),this.keyboardAdaptor.removeEventListener("update",this.onKey),this.pointerAdaptor.removeEventListener("update",this.onPointer),this.enabled=!1}onWheel(t){this.cameraRig.do(n.Dolly,t.deltas.y*this.wheelScaleFactor),this.cameraRig.do(n.Truck,t.deltas.x*this.wheelScaleFactor)}onKey(t){this.cameraRig.do(n.Dolly,t.values.backward-t.values.forward),this.cameraRig.do(n.Truck,t.values.right-t.values.left),this.cameraRig.do(n.Pedestal,t.values.up-t.values.down)}onPointer(t){switch(t.pointerCount){case 1:this.cameraRig.do(n.Pan,t.deltas.x*this.panDegreeFactor),this.cameraRig.do(n.Tilt,t.deltas.y*this.tiltDegreeFactor);break;case 2:this.cameraRig.do(n.Dolly,-t.deltas.y*this.pointerScaleFactor),this.cameraRig.do(n.Truck,-t.deltas.x*this.pointerScaleFactor)}}update(t){this.enabled&&(this.keyboardAdaptor.update(),this.wheelAdaptor.update(),this.pointerAdaptor.update(t))}}(function(s,t){t===void 0&&(t={});var e=t.insertAt;if(s&&typeof document<"u"){var i=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css",e==="top"&&i.firstChild?i.insertBefore(o,i.firstChild):i.appendChild(o),o.styleSheet?o.styleSheet.cssText=s:o.appendChild(document.createTextNode(s))}})(`.tb-ch {
  width: 350px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  overflow-x: visible;
  transition: all 0.2s ease-in-out;
}
  .tb-ch.collapsed {
    left: -350px;
  }
  .tb-ch * {
    box-sizing: border-box;
  }
  .tb-ch button {
    text-transform: capitalize;
    cursor: pointer;
  }
  .tb-ch .btn-round {
    font-size: 1.8rem;
    line-height: 1;
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    right: -3rem;
    bottom: 0.5rem;
  }
  .tb-ch .btn-round.collapse {
      bottom: 3.5rem;
    }
  .tb-ch .controls {
    position: absolute;
    bottom: 0;
    height: 225px;
    border-top: 1px solid black;
    padding: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .tb-ch .btn-text {
    padding: 0.5rem;
    text-align: center;
    width: 100%;
  }
  .tb-ch input[type='range'] {
    width: 100%;
  }
  .tb-ch .pois {
    height: calc(100vh - 225px - 1rem);
    overflow: scroll;
    padding: 1rem 1rem 0;
  }
  .tb-ch .poi {
    margin-bottom: 1rem;
  }
  .tb-ch .poi h2 {
      font-size: 1rem;
    }
  .tb-ch .poi .wrapper {
      display: flex;
      flex-direction: row;
    }
  .tb-ch .poi img {
      display: block;
      max-width: 100%;
      min-width: 0;
      margin-right: 0.5rem;
    }
  .tb-ch .poi .poi-controls {
      display: flex;
      flex-direction: column;
    }
  .tb-ch .poi .poi-controls button {
        padding: 0.5rem;
        width: 2rem;
        height: 2rem;
        margin-bottom: 0.25rem;
      }
  .tb-ch .poi .poi-params {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: calc(100% - 2.5rem);
    }
  .tb-ch .poi label,
    .tb-ch .poi input,
    .tb-ch .poi select {
      width: 50%;
      font-size: 0.7rem;
      font-family: monospace;
      margin: 0.25rem 0;
    }
  .tb-ch .poi input {
      text-align: center;
    }
`);const u=new URLSearchParams(document.location.search),l=document.querySelector("#canvas-parent"),C=document.querySelector("#stats-widget"),F=new X,p=new M(35,1,.01,1e3),g=new Z;g.outputColorSSpace=B;const ot=new Q,at=new G(p,F);let m;u.get("orbit")?(m=new W(p,l),m.listenToKeyEvents(document.body),p.position.set(0,200,0),m.update()):(m=new st(at,{panDegreeFactor:2,wheelScaleFactor:.01,keyboardScaleFactor:.015,keyboardDampFactor:0}),m.enable());l.appendChild(g.domElement);const y=new I;y.domElement.style.position="absolute";y.domElement.style.top="10px";y.domElement.style.left="10px";l.appendChild(y.domElement);let E,T;u.get("tilesetUrl")&&(document.querySelector("#example-desc").style.display="none");rt();async function rt(){const s=await _.load({url:u.get("tilesetUrl")??"https://int.nyt.com/data/3dscenes/ONA360/TILESET/0731_FREEMAN_ALLEY_10M_A_36x8K__10K-PN_50P_DB/tileset_tileset.json",renderer:g,options:{dracoDecoderPath:"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco",basisTranscoderPath:"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis",maximumScreenSpaceError:u.get("sse")??48,resetTransform:!0}}),{model:t,runtime:e}=s;t.rotation.set(-Math.PI/2,0,Math.PI/2),u.get("tilesetUrl")||t.position.set(-1,4,-16),E=e,F.add(t),T=new K(e.getStats(),{container:C}),C.style.visibility="visible"}function z(s){const t=ot.getDelta();m.update(s),E&&E.update(t,l.clientHeight,p),T&&T.update(),g.render(F,p),y.update(),window.requestAnimationFrame(z)}O();function O(){g.setSize(l.clientWidth,l.clientHeight),p.aspect=l.clientWidth/l.clientHeight,p.updateProjectionMatrix()}window.addEventListener("resize",O);z();
