import{O as Rt,S as Et,a as It}from"./stats-widget-FuDRuBfE.js";import{V as b,T as K,M as pt,d as ct,e as vt,F as At,R as st,f as tt,B as it,g as O,h as gt,i as dt,Q as Dt,j as Pt,D as zt,N as et,U as St,S as Ct,P as Lt,W as Ht,c as Ut,L as Vt,a as Gt,G as Ot,C as Nt}from"./three-loader-3diles-hrSmYP0K.js";import{T as Ft}from"./index-G-f5Qm2g.js";/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function S(A,t,e,s){function i(o){return o instanceof e?o:new e(function(r){r(o)})}return new(e||(e=Promise))(function(o,r){function a(h){try{c(s.next(h))}catch(d){r(d)}}function n(h){try{c(s.throw(h))}catch(d){r(d)}}function c(h){h.done?o(h.value):i(h.value).then(a,n)}c((s=s.apply(A,t||[])).next())})}class ot{constructor(){this.name="",this.minZoom=0,this.maxZoom=20,this.bounds=[],this.center=[]}fetchTile(t,e,s){return null}getMetaData(){return S(this,void 0,void 0,function*(){})}}class xt extends ot{constructor(t="https://a.tile.openstreetmap.org/"){super(),this.address=t,this.format="png",this.maxZoom=19}fetchTile(t,e,s){return new Promise((i,o)=>{const r=document.createElement("img");r.onload=function(){i(r)},r.onerror=function(){o()},r.crossOrigin="Anonymous",r.src=this.address+t+"/"+e+"/"+s+"."+this.format})}}class ut{static createOffscreenCanvas(t,e){if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(t,e);{let s=document.createElement("canvas");return s.width=t,s.height=e,s}}}class wt{static createFillTexture(t="#000000",e=1,s=1){const i=ut.createOffscreenCanvas(e,s),o=i.getContext("2d");o.fillStyle=t,o.fillRect(0,0,e,s);const r=new K(i);return r.format=st,r.magFilter=tt,r.minFilter=tt,r.generateMipmaps=!1,r.needsUpdate=!0,r}}class T{}T.root=-1;T.topLeft=0;T.topRight=1;T.bottomLeft=2;T.bottomRight=3;class H extends pt{constructor(t=null,e=null,s=T.root,i=0,o=0,r=0,a=null,n=null){super(a,n),this.mapView=null,this.parentNode=null,this.subdivided=!1,this.disposed=!1,this.nodesLoaded=0,this.childrenCache=null,this.isMesh=!0,this.mapView=e,this.parentNode=t,this.disposed=!1,this.location=s,this.level=i,this.x=o,this.y=r,this.initialize()}initialize(){return S(this,void 0,void 0,function*(){})}createChildNodes(){}subdivide(){const t=this.mapView.maxZoom();this.children.length>0||this.level+1>t||this.parentNode!==null&&this.parentNode.nodesLoaded<H.childrens||(this.mapView.cacheTiles&&this.childrenCache!==null?(this.isMesh=!1,this.children=this.childrenCache,this.nodesLoaded=this.childrenCache.length):this.createChildNodes(),this.subdivided=!0)}simplify(){const t=this.mapView.minZoom();if(!(this.level-1<t)){if(this.mapView.cacheTiles)this.childrenCache=this.children;else for(let e=0;e<this.children.length;e++)this.children[e].dispose();this.subdivided=!1,this.isMesh=!0,this.children=[],this.nodesLoaded=0}}loadData(){return S(this,void 0,void 0,function*(){if(this.level<this.mapView.provider.minZoom||this.level>this.mapView.provider.maxZoom){console.warn("Geo-Three: Loading tile outside of provider range.",this),this.material.map=H.defaultTexture,this.material.needsUpdate=!0;return}try{const t=yield this.mapView.provider.fetchTile(this.level,this.x,this.y);if(this.disposed)return;const e=new K(t);e.generateMipmaps=!1,e.format=st,e.magFilter=tt,e.minFilter=tt,e.needsUpdate=!0,this.material.map=e}catch{if(this.disposed)return;console.warn("Geo-Three: Failed to load node tile data.",this),this.material.map=H.defaultTexture}this.material.needsUpdate=!0})}nodeReady(){if(this.disposed){console.warn("Geo-Three: nodeReady() called for disposed node.",this),this.dispose();return}if(this.parentNode!==null){if(this.parentNode.nodesLoaded++,this.parentNode.nodesLoaded===H.childrens){this.parentNode.subdivided===!0&&(this.parentNode.isMesh=!1);for(let t=0;t<this.parentNode.children.length;t++)this.parentNode.children[t].visible=!0}this.parentNode.nodesLoaded>H.childrens&&console.error("Geo-Three: Loaded more children objects than expected.",this.parentNode.nodesLoaded,this)}else this.visible=!0}dispose(){this.disposed=!0;const t=this;try{const e=t.material;e.dispose(),e.map&&e.map!==H.defaultTexture&&e.map.dispose()}catch{}try{t.geometry.dispose()}catch{}}}H.defaultTexture=wt.createFillTexture();H.baseGeometry=null;H.baseScale=null;H.childrens=4;class B extends it{constructor(t=1,e=1,s=1,i=1,o=!1,r=10){super();const a=[],n=[],c=[],h=[];B.buildPlane(t,e,s,i,a,n,c,h),o&&B.buildSkirt(t,e,s,i,r,a,n,c,h),this.setIndex(a),this.setAttribute("position",new O(n,3)),this.setAttribute("normal",new O(c,3)),this.setAttribute("uv",new O(h,2))}static buildPlane(t=1,e=1,s=1,i=1,o,r,a,n){const c=t/2,h=e/2,d=s+1,g=i+1,f=t/s,x=e/i;for(let p=0;p<g;p++){const m=p*x-h;for(let w=0;w<d;w++){const l=w*f-c;r.push(l,0,m),a.push(0,1,0),n.push(w/s,1-p/i)}}for(let p=0;p<i;p++)for(let m=0;m<s;m++){const w=m+d*p,l=m+d*(p+1),u=m+1+d*(p+1),v=m+1+d*p;o.push(w,l,v,l,u,v)}}static buildSkirt(t=1,e=1,s=1,i=1,o,r,a,n,c){const h=t/2,d=e/2,g=s+1,f=i+1,x=t/s,p=e/i;let m=a.length/3;for(let l=0;l<g;l++){const u=l*x-h,v=-d;a.push(u,-o,v),n.push(0,1,0),c.push(l/s,1)}for(let l=0;l<s;l++){const u=l,v=l+1,y=l+m,U=l+m+1;r.push(v,y,u,v,U,y)}m=a.length/3;for(let l=0;l<g;l++){const u=l*x-h,v=i*p-d;a.push(u,-o,v),n.push(0,1,0),c.push(l/s,0)}let w=g*f-s-1;for(let l=0;l<s;l++){const u=w+l,v=w+l+1,y=l+m,U=l+m+1;r.push(u,y,v,y,U,v)}m=a.length/3;for(let l=0;l<f;l++){const u=l*p-d,v=-h;a.push(v,-o,u),n.push(0,1,0),c.push(0,1-l/i)}for(let l=0;l<i;l++){const u=l*f,v=(l+1)*f,y=l+m,U=l+m+1;r.push(u,y,v,y,U,v)}m=a.length/3;for(let l=0;l<f;l++){const u=l*p-d,v=s*x-h;a.push(v,-o,u),n.push(0,1,0),c.push(1,1-l/i)}for(let l=0;l<i;l++){const u=l*f+i,v=(l+1)*f+i,y=l+m,U=l+m+1;r.push(v,y,u,v,U,y)}}}class at{constructor(t,e){this.latitude=t,this.longitude=e}}class E{static datumsToSpherical(t,e){const s=e*E.EARTH_ORIGIN/180;let i=Math.log(Math.tan((90+t)*Math.PI/360))/(Math.PI/180);return i=i*E.EARTH_ORIGIN/180,new gt(s,i)}static sphericalToDatums(t,e){const s=t/E.EARTH_ORIGIN*180;let i=e/E.EARTH_ORIGIN*180;return i=180/Math.PI*(2*Math.atan(Math.exp(i*Math.PI/180))-Math.PI/2),new at(i,s)}static quadtreeToDatums(t,e,s){const i=Math.pow(2,t),o=e/i*360-180,a=180*(Math.atan(Math.sinh(Math.PI*(1-2*s/i)))/Math.PI);return new at(a,o)}static vectorToDatums(t){const e=180/Math.PI,s=Math.atan2(t.y,Math.sqrt(Math.pow(t.x,2)+Math.pow(-t.z,2)))*e,i=Math.atan2(-t.z,t.x)*e;return new at(s,i)}static datumsToVector(t,e){const s=Math.PI/180,i=e*s,o=t*s;var r=Math.cos(o);return new b(-Math.cos(i+Math.PI)*r,Math.sin(o),Math.sin(i+Math.PI)*r)}static mapboxAltitude(t){return(t.r*255*65536+t.g*255*256+t.b*255)*.1-1e4}}E.EARTH_RADIUS=6371008;E.EARTH_RADIUS_A=6378137;E.EARTH_RADIUS_B=6356752314245e-6;E.EARTH_PERIMETER=2*Math.PI*E.EARTH_RADIUS;E.EARTH_ORIGIN=E.EARTH_PERIMETER/2;class G extends H{constructor(t=null,e=null,s=T.root,i=0,o=0,r=0){super(t,e,s,i,o,r,G.geometry,new ct({wireframe:!1})),this.matrixAutoUpdate=!1,this.isMesh=!0,this.visible=!1}initialize(){const t=Object.create(null,{initialize:{get:()=>super.initialize}});return S(this,void 0,void 0,function*(){t.initialize.call(this),yield this.loadData(),this.nodeReady()})}createChildNodes(){const t=this.level+1,e=this.x*2,s=this.y*2,i=Object.getPrototypeOf(this).constructor;let o=new i(this,this.mapView,T.topLeft,t,e,s);o.scale.set(.5,1,.5),o.position.set(-.25,0,-.25),this.add(o),o.updateMatrix(),o.updateMatrixWorld(!0),o=new i(this,this.mapView,T.topRight,t,e+1,s),o.scale.set(.5,1,.5),o.position.set(.25,0,-.25),this.add(o),o.updateMatrix(),o.updateMatrixWorld(!0),o=new i(this,this.mapView,T.bottomLeft,t,e,s+1),o.scale.set(.5,1,.5),o.position.set(-.25,0,.25),this.add(o),o.updateMatrix(),o.updateMatrixWorld(!0),o=new i(this,this.mapView,T.bottomRight,t,e+1,s+1),o.scale.set(.5,1,.5),o.position.set(.25,0,.25),this.add(o),o.updateMatrix(),o.updateMatrixWorld(!0)}raycast(t,e){this.isMesh===!0&&super.raycast(t,e)}}G.geometry=new B(1,1,1,1,!1);G.baseGeometry=G.geometry;G.baseScale=new b(E.EARTH_PERIMETER,1,E.EARTH_PERIMETER);class Zt extends it{constructor(t=1,e=1,s=1,i=1,o=!1,r=10,a=null,n=!0){super();const c=[],h=[],d=[],g=[];B.buildPlane(t,e,s,i,c,h,d,g);const f=a.data;for(let x=0,p=0;x<f.length&&p<h.length;x+=4,p+=3){const m=f[x],w=f[x+1],l=f[x+2],u=(m*65536+w*256+l)*.1-1e4;h[p+1]=u}o&&B.buildSkirt(t,e,s,i,r,c,h,d,g),this.setIndex(c),this.setAttribute("position",new O(h,3)),this.setAttribute("normal",new O(d,3)),this.setAttribute("uv",new O(g,2)),n&&this.computeNormals(s,i)}computeNormals(t,e){const s=this.getAttribute("position");if(s!==void 0){let i=this.getAttribute("normal");const o=e*t;for(let p=0;p<o;p++)i.setXYZ(p,0,0,0);const r=new b,a=new b,n=new b,c=new b,h=new b,d=new b,g=new b,f=new b,x=e*t*6;for(let p=0;p<x;p+=3){const m=this.index.getX(p+0),w=this.index.getX(p+1),l=this.index.getX(p+2);r.fromBufferAttribute(s,m),a.fromBufferAttribute(s,w),n.fromBufferAttribute(s,l),g.subVectors(n,a),f.subVectors(r,a),g.cross(f),c.fromBufferAttribute(i,m),h.fromBufferAttribute(i,w),d.fromBufferAttribute(i,l),c.add(g),h.add(g),d.add(g),i.setXYZ(m,c.x,c.y,c.z),i.setXYZ(w,h.x,h.y,h.z),i.setXYZ(l,d.x,d.y,d.z)}this.normalizeNormals(),i.needsUpdate=!0}}}class N extends H{constructor(t=null,e=null,s=T.root,i=0,o=0,r=0,a=N.geometry,n=new dt({wireframe:!1,color:16777215})){super(t,e,s,i,o,r,a,n),this.heightLoaded=!1,this.textureLoaded=!1,this.geometrySize=16,this.geometryNormals=!1,this.isMesh=!0,this.visible=!1,this.matrixAutoUpdate=!1}initialize(){const t=Object.create(null,{initialize:{get:()=>super.initialize}});return S(this,void 0,void 0,function*(){t.initialize.call(this),yield this.loadData(),yield this.loadHeightGeometry(),this.nodeReady()})}loadData(){const t=Object.create(null,{loadData:{get:()=>super.loadData}});return S(this,void 0,void 0,function*(){yield t.loadData.call(this),this.textureLoaded=!0})}loadHeightGeometry(){return S(this,void 0,void 0,function*(){if(this.mapView.heightProvider===null)throw new Error("GeoThree: MapView.heightProvider provider is null.");if(this.level<this.mapView.heightProvider.minZoom||this.level>this.mapView.heightProvider.maxZoom){console.warn("Geo-Three: Loading tile outside of provider range.",this),this.geometry=G.baseGeometry;return}try{const t=yield this.mapView.heightProvider.fetchTile(this.level,this.x,this.y);if(this.disposed)return;const e=ut.createOffscreenCanvas(this.geometrySize+1,this.geometrySize+1),s=e.getContext("2d");s.imageSmoothingEnabled=!1,s.drawImage(t,0,0,N.tileSize,N.tileSize,0,0,e.width,e.height);const i=s.getImageData(0,0,e.width,e.height);this.geometry=new Zt(1,1,this.geometrySize,this.geometrySize,!0,10,i,!0)}catch{if(this.disposed)return;this.geometry=G.baseGeometry}this.heightLoaded=!0})}createChildNodes(){const t=this.level+1,e=Object.getPrototypeOf(this).constructor,s=this.x*2,i=this.y*2;let o=new e(this,this.mapView,T.topLeft,t,s,i);o.scale.set(.5,1,.5),o.position.set(-.25,0,-.25),this.add(o),o.updateMatrix(),o.updateMatrixWorld(!0),o=new e(this,this.mapView,T.topRight,t,s+1,i),o.scale.set(.5,1,.5),o.position.set(.25,0,-.25),this.add(o),o.updateMatrix(),o.updateMatrixWorld(!0),o=new e(this,this.mapView,T.bottomLeft,t,s,i+1),o.scale.set(.5,1,.5),o.position.set(-.25,0,.25),this.add(o),o.updateMatrix(),o.updateMatrixWorld(!0),o=new e(this,this.mapView,T.bottomRight,t,s+1,i+1),o.scale.set(.5,1,.5),o.position.set(.25,0,.25),this.add(o),o.updateMatrix(),o.updateMatrixWorld(!0)}raycast(t,e){this.isMesh===!0&&super.raycast(t,e)}}N.tileSize=256;N.geometry=new B(1,1,1,1);N.baseGeometry=G.geometry;N.baseScale=new b(E.EARTH_PERIMETER,1,E.EARTH_PERIMETER);class yt extends it{constructor(t,e,s,i,o,r,a){super();const n=r+a;let c=0;const h=[],d=new b,g=new b,f=[],x=[],p=[],m=[];for(let w=0;w<=s;w++){const l=[],u=w/s;for(let v=0;v<=e;v++){const y=v/e;d.x=-t*Math.cos(i+y*o)*Math.sin(r+u*a),d.y=t*Math.cos(r+u*a),d.z=t*Math.sin(i+y*o)*Math.sin(r+u*a),x.push(d.x,d.y,d.z),g.set(d.x,d.y,d.z).normalize(),p.push(g.x,g.y,g.z),m.push(y,1-u),l.push(c++)}h.push(l)}for(let w=0;w<s;w++)for(let l=0;l<e;l++){const u=h[w][l+1],v=h[w][l],y=h[w+1][l],U=h[w+1][l+1];(w!==0||r>0)&&f.push(u,v,U),(w!==s-1||n<Math.PI)&&f.push(v,y,U)}this.setIndex(f),this.setAttribute("position",new O(x,3)),this.setAttribute("normal",new O(p,3)),this.setAttribute("uv",new O(m,2))}}class Y extends H{constructor(t=null,e=null,s=T.root,i=0,o=0,r=0){super(t,e,s,i,o,r,Y.createGeometry(i,o,r),new ct({wireframe:!1})),this.applyScaleNode(),this.matrixAutoUpdate=!1,this.isMesh=!0,this.visible=!1}initialize(){const t=Object.create(null,{initialize:{get:()=>super.initialize}});return S(this,void 0,void 0,function*(){t.initialize.call(this),yield this.loadData(),this.nodeReady()})}static createGeometry(t,e,s){const i=Math.pow(2,t),o=40,r=Math.floor(Y.segments*(o/(t+1))/o),a=1/i*2*Math.PI,n=e*a,c=1/i*Math.PI,h=s*c;return new yt(1,r,r,n,a,h,c)}applyScaleNode(){this.geometry.computeBoundingBox();const e=this.geometry.boundingBox.clone().getCenter(new b),s=new vt;s.compose(new b(-e.x,-e.y,-e.z),new Dt,new b(E.EARTH_RADIUS,E.EARTH_RADIUS,E.EARTH_RADIUS)),this.geometry.applyMatrix4(s),this.position.copy(e),this.updateMatrix(),this.updateMatrixWorld()}updateMatrix(){this.matrix.setPosition(this.position),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t=!1){(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1)}createChildNodes(){const t=this.level+1,e=this.x*2,s=this.y*2,i=Object.getPrototypeOf(this).constructor;let o=new i(this,this.mapView,T.topLeft,t,e,s);this.add(o),o=new i(this,this.mapView,T.topRight,t,e+1,s),this.add(o),o=new i(this,this.mapView,T.bottomLeft,t,e,s+1),this.add(o),o=new i(this,this.mapView,T.bottomRight,t,e+1,s+1),this.add(o)}raycast(t,e){this.isMesh===!0&&super.raycast(t,e)}}Y.baseGeometry=new yt(E.EARTH_RADIUS,64,64,0,2*Math.PI,0,Math.PI);Y.baseScale=new b(1,1,1);Y.segments=80;class L extends N{constructor(t=null,e=null,s=T.root,i=0,o=0,r=0){const a=L.prepareMaterial(new dt({map:H.defaultTexture,color:16777215}));super(t,e,s,i,o,r,L.geometry,a),this.frustumCulled=!1}static prepareMaterial(t){return t.userData={heightMap:{value:L.defaultHeightTexture}},t.onBeforeCompile=e=>{for(const s in t.userData)e.uniforms[s]=t.userData[s];e.vertexShader=`
			uniform sampler2D heightMap;
			`+e.vertexShader,e.vertexShader=e.vertexShader.replace("#include <fog_vertex>",`
			#include <fog_vertex>
	
			// Calculate height of the title
			vec4 _theight = texture2D(heightMap, vUv);
			float _height = ((_theight.r * 255.0 * 65536.0 + _theight.g * 255.0 * 256.0 + _theight.b * 255.0) * 0.1) - 10000.0;
			vec3 _transformed = position + _height * normal;
	
			// Vertex position based on height
			gl_Position = projectionMatrix * modelViewMatrix * vec4(_transformed, 1.0);
			`)},t}loadData(){const t=Object.create(null,{loadData:{get:()=>super.loadData}});return S(this,void 0,void 0,function*(){yield t.loadData.call(this),this.textureLoaded=!0})}loadHeightGeometry(){return S(this,void 0,void 0,function*(){if(this.mapView.heightProvider===null)throw new Error("GeoThree: MapView.heightProvider provider is null.");if(this.level<this.mapView.heightProvider.minZoom||this.level>this.mapView.heightProvider.maxZoom){console.warn("Geo-Three: Loading tile outside of provider range.",this),this.material.map=L.defaultTexture,this.material.needsUpdate=!0;return}try{const t=yield this.mapView.heightProvider.fetchTile(this.level,this.x,this.y);if(this.disposed)return;const e=new K(t);e.generateMipmaps=!1,e.format=st,e.magFilter=et,e.minFilter=et,e.needsUpdate=!0,this.material.userData.heightMap.value=e}catch{if(this.disposed)return;console.error("Geo-Three: Failed to load node tile height data.",this),this.material.userData.heightMap.value=L.defaultHeightTexture}this.material.needsUpdate=!0,this.heightLoaded=!0})}raycast(t,e){this.isMesh===!0&&(this.geometry=G.geometry,super.raycast(t,e),this.geometry=L.geometry)}dispose(){super.dispose(),this.material.userData.heightMap.value&&this.material.userData.heightMap.value!==L.defaultHeightTexture&&this.material.userData.heightMap.value.dispose()}}L.defaultHeightTexture=wt.createFillTexture("#0186C0");L.geometrySize=256;L.geometry=new B(1,1,L.geometrySize,L.geometrySize,!0);L.baseGeometry=G.geometry;L.baseScale=new b(E.EARTH_PERIMETER,1,E.EARTH_PERIMETER);class jt{constructor(){this.subdivisionRays=1,this.thresholdUp=.6,this.thresholdDown=.15,this.raycaster=new Pt,this.mouse=new gt,this.powerDistance=!1,this.scaleDistance=!0}updateLOD(t,e,s,i){const o=[];for(let r=0;r<this.subdivisionRays;r++)this.mouse.set(Math.random()*2-1,Math.random()*2-1),this.raycaster.setFromCamera(this.mouse,e),this.raycaster.intersectObjects(t.children,!0,o);for(let r=0;r<o.length;r++){const a=o[r].object;let n=o[r].distance;if(this.powerDistance&&(n=Math.pow(n*2,a.level)),this.scaleDistance){const c=a.matrixWorld.elements;n=new b(c[0],c[1],c[2]).length()/n}n>this.thresholdUp?a.subdivide():n<this.thresholdDown&&a.parentNode&&a.parentNode.simplify()}}}class Wt{constructor(t=257){this.gridSize=t;const e=t-1;if(e&e-1)throw new Error(`Expected grid size to be 2^n+1, got ${t}.`);this.numTriangles=e*e*2-2,this.numParentTriangles=this.numTriangles-e*e,this.indices=new Uint32Array(this.gridSize*this.gridSize),this.coords=new Uint16Array(this.numTriangles*4);for(let s=0;s<this.numTriangles;s++){let i=s+2,o=0,r=0,a=0,n=0,c=0,h=0;for(i&1?a=n=c=e:o=r=h=e;(i>>=1)>1;){const g=o+a>>1,f=r+n>>1;i&1?(a=o,n=r,o=c,r=h):(o=a,r=n,a=c,n=h),c=g,h=f}const d=s*4;this.coords[d+0]=o,this.coords[d+1]=r,this.coords[d+2]=a,this.coords[d+3]=n}}createTile(t){return new kt(t,this)}}class kt{constructor(t,e){const s=e.gridSize;if(t.length!==s*s)throw new Error(`Expected terrain data of length ${s*s} (${s} x ${s}), got ${t.length}.`);this.terrain=t,this.martini=e,this.errors=new Float32Array(t.length),this.update()}update(){const{numTriangles:t,numParentTriangles:e,coords:s,gridSize:i}=this.martini,{terrain:o,errors:r}=this;for(let a=t-1;a>=0;a--){const n=a*4,c=s[n+0],h=s[n+1],d=s[n+2],g=s[n+3],f=c+d>>1,x=h+g>>1,p=f+x-h,m=x+c-f,w=(o[h*i+c]+o[g*i+d])/2,l=x*i+f,u=Math.abs(w-o[l]);if(r[l]=Math.max(r[l],u),a<e){const v=(h+m>>1)*i+(c+p>>1),y=(g+m>>1)*i+(d+p>>1);r[l]=Math.max(r[l],r[v],r[y])}}}getMesh(t=0,e=!1){const{gridSize:s,indices:i}=this.martini,{errors:o}=this;let r=0,a=0;const n=s-1;let c,h,d=0;const g=[],f=[],x=[],p=[];i.fill(0);function m(I,D,M,R,P,C){const F=I+M>>1,Z=D+R>>1;Math.abs(I-P)+Math.abs(D-C)>1&&o[Z*s+F]>t?(m(P,C,I,D,F,Z),m(M,R,P,C,F,Z)):(c=D*s+I,h=R*s+M,d=C*s+P,i[c]===0&&(e&&(I===0?g.push(r):I===n&&f.push(r),D===0?x.push(r):D===n&&p.push(r)),i[c]=++r),i[h]===0&&(e&&(M===0?g.push(r):M===n&&f.push(r),R===0?x.push(r):R===n&&p.push(r)),i[h]=++r),i[d]===0&&(e&&(P===0?g.push(r):P===n&&f.push(r),C===0?x.push(r):C===n&&p.push(r)),i[d]=++r),a++)}m(0,0,n,n,n,0),m(n,n,0,0,0,n);let w=r*2,l=a*3;e&&(w+=(g.length+f.length+x.length+p.length)*2,l+=((g.length-1)*2+(f.length-1)*2+(x.length-1)*2+(p.length-1)*2)*3);const u=new Uint16Array(w),v=new Uint32Array(l);let y=0;function U(I,D,M,R,P,C){const F=I+M>>1,Z=D+R>>1;if(Math.abs(I-P)+Math.abs(D-C)>1&&o[Z*s+F]>t)U(P,C,I,D,F,Z),U(M,R,P,C,F,Z);else{const Q=i[D*s+I]-1,rt=i[R*s+M]-1,nt=i[C*s+P]-1;u[2*Q]=I,u[2*Q+1]=D,u[2*rt]=M,u[2*rt+1]=R,u[2*nt]=P,u[2*nt+1]=C,v[y++]=Q,v[y++]=rt,v[y++]=nt}}if(U(0,0,n,n,n,0),U(n,n,0,0,0,n),e){let D=function(M){const R=M.length;for(let P=0;P<R-1;P++){const C=M[P],F=M[P+1],Z=I/2,Q=(I+2)/2;u[I++]=u[2*C],u[I++]=u[2*C+1],v[y++]=C,v[y++]=Z,v[y++]=F,v[y++]=Z,v[y++]=Q,v[y++]=F}u[I++]=u[2*M[R-1]],u[I++]=u[2*M[R-1]+1]};g.sort((M,R)=>u[2*M+1]-u[2*R+1]),f.sort((M,R)=>u[2*R+1]-u[2*M+1]),x.sort((M,R)=>u[2*R]-u[2*M]),p.sort((M,R)=>u[2*M]-u[2*R]);let I=r*2;D(g),D(f),D(x),D(p)}return{vertices:u,triangles:v,numVerticesWithoutSkirts:r}}}class V extends N{constructor(t=null,e=null,s=T.root,i=0,o=0,r=0,{elevationDecoder:a=null,meshMaxError:n=10,exageration:c=1}={}){super(t,e,s,i,o,r,V.geometry,V.prepareMaterial(new dt({map:V.emptyTexture,color:16777215,side:zt}),i,c)),this.elevationDecoder={rScaler:256,gScaler:1,bScaler:1/256,offset:-32768},this.exageration=1,this.meshMaxError=10,a&&(this.elevationDecoder=a),this.meshMaxError=n,this.exageration=c,this.frustumCulled=!1}static prepareMaterial(t,e,s=1){return t.userData={heightMap:{value:V.emptyTexture},drawNormals:{value:0},drawBlack:{value:0},zoomlevel:{value:e},computeNormals:{value:1},drawTexture:{value:1}},t.onBeforeCompile=i=>{for(let o in t.userData)i.uniforms[o]=t.userData[o];i.vertexShader=`
				uniform bool computeNormals;
				uniform float zoomlevel;
				uniform sampler2D heightMap;
				`+i.vertexShader,i.fragmentShader=`
				uniform bool drawNormals;
				uniform bool drawTexture;
				uniform bool drawBlack;
				`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("#include <dithering_fragment>",`
				if(drawBlack) {
					gl_FragColor = vec4( 0.0,0.0,0.0, 1.0 );
				} else if(drawNormals) {
					gl_FragColor = vec4( ( 0.5 * vNormal + 0.5 ), 1.0 );
				} else if (!drawTexture) {
					gl_FragColor = vec4( 0.0,0.0,0.0, 0.0 );
				}`),i.vertexShader=i.vertexShader.replace("#include <fog_vertex>",`
				#include <fog_vertex>

				// queried pixels:
				// +-----------+
				// |   |   |   |
				// | a | b | c |
				// |   |   |   |
				// +-----------+
				// |   |   |   |
				// | d | e | f |
				// |   |   |   |
				// +-----------+
				// |   |   |   |
				// | g | h | i |
				// |   |   |   |
				// +-----------+

				if (computeNormals) {
					float e = getElevation(vUv, 0.0);
					ivec2 size = textureSize(heightMap, 0);
					float offset = 1.0 / float(size.x);
					float a = getElevation(vUv + vec2(-offset, -offset), 0.0);
					float b = getElevation(vUv + vec2(0, -offset), 0.0);
					float c = getElevation(vUv + vec2(offset, -offset), 0.0);
					float d = getElevation(vUv + vec2(-offset, 0), 0.0);
					float f = getElevation(vUv + vec2(offset, 0), 0.0);
					float g = getElevation(vUv + vec2(-offset, offset), 0.0);
					float h = getElevation(vUv + vec2(0, offset), 0.0);
					float i = getElevation(vUv + vec2(offset,offset), 0.0);


					float normalLength = 500.0 / zoomlevel;

					vec3 v0 = vec3(0.0, 0.0, 0.0);
					vec3 v1 = vec3(0.0, normalLength, 0.0);
					vec3 v2 = vec3(normalLength, 0.0, 0.0);
					v0.z = (e + d + g + h) / 4.0;
					v1.z = (e+ b + a + d) / 4.0;
					v2.z = (e+ h + i + f) / 4.0;
					vNormal = (normalize(cross(v2 - v0, v1 - v0))).rbg;
				}
				`)},t}static getTerrain(t,e,s){const{rScaler:i,bScaler:o,gScaler:r,offset:a}=s,n=e+1,c=new Float32Array(n*n);for(let h=0,d=0;d<e;d++)for(let g=0;g<e;g++,h++){const f=h*4,x=t[f+0],p=t[f+1],m=t[f+2];c[h+d]=x*i+p*r+m*o+a}for(let h=n*(n-1),d=0;d<n-1;d++,h++)c[h]=c[h-n];for(let h=n-1,d=0;d<n;d++,h+=n)c[h]=c[h-1];return c}static getMeshAttributes(t,e,s,i,o){const r=s+1,a=t.length/2,n=new Float32Array(a*3),c=new Float32Array(a*2),[h,d,g,f]=i||[0,0,s,s],x=(g-h)/s,p=(f-d)/s;for(let m=0;m<a;m++){const w=t[m*2],l=t[m*2+1],u=l*r+w;n[3*m+0]=w*x+h,n[3*m+1]=-e[u]*o,n[3*m+2]=-l*p+f,c[2*m+0]=w/s,c[2*m+1]=l/s}return{position:{value:n,size:3},uv:{value:c,size:2}}}processHeight(t){return S(this,void 0,void 0,function*(){const e=t.width,s=e+1;var i=ut.createOffscreenCanvas(e,e),o=i.getContext("2d");o.imageSmoothingEnabled=!1,o.drawImage(t,0,0,e,e,0,0,i.width,i.height);var r=o.getImageData(0,0,i.width,i.height),a=r.data;const n=V.getTerrain(a,e,this.elevationDecoder),h=new Wt(s).createTile(n),{vertices:d,triangles:g}=h.getMesh(typeof this.meshMaxError=="function"?this.meshMaxError(this.level):this.meshMaxError),f=V.getMeshAttributes(d,n,e,[-.5,-.5,.5,.5],this.exageration);this.geometry=new it,this.geometry.setIndex(new St(g,1)),this.geometry.setAttribute("position",new O(f.position.value,f.position.size)),this.geometry.setAttribute("uv",new O(f.uv.value,f.uv.size)),this.geometry.rotateX(Math.PI);var x=new K(t);x.generateMipmaps=!1,x.format=st,x.magFilter=et,x.minFilter=et,x.needsUpdate=!0,this.material.userData.heightMap.value=x,this.material.map=x,this.material.needsUpdate=!0})}loadHeightGeometry(){return S(this,void 0,void 0,function*(){if(this.mapView.heightProvider===null)throw new Error("GeoThree: MapView.heightProvider provider is null.");const t=yield this.mapView.heightProvider.fetchTile(this.level,this.x,this.y);this.disposed||(this.processHeight(t),this.heightLoaded=!0,this.nodeReady())})}}V.geometrySize=16;V.emptyTexture=new K;V.geometry=new B(1,1,1,1);V.tileSize=256;class z extends pt{constructor(t=z.PLANAR,e=new xt,s=null){super(void 0,new ct({transparent:!0,opacity:0})),this.lod=null,this.provider=null,this.heightProvider=null,this.root=null,this.cacheTiles=!1,this.onBeforeRender=(i,o,r,a,n,c)=>{this.lod.updateLOD(this,r,i,o)},this.lod=new jt,this.provider=e,this.heightProvider=s,this.setRoot(t),this.preSubdivide()}setRoot(t){if(typeof t=="number"){if(!z.mapModes.has(t))throw new Error("Map mode "+t+" does is not registered.");const e=z.mapModes.get(t);t=new e(null,this)}this.root!==null&&(this.remove(this.root),this.root=null),this.root=t,this.root!==null&&(this.geometry=this.root.constructor.baseGeometry,this.scale.copy(this.root.constructor.baseScale),this.root.mapView=this,this.add(this.root),this.root.initialize())}preSubdivide(){var t,e;function s(o,r){if(!(r<=0)){o.subdivide();for(let a=0;a<o.children.length;a++)if(o.children[a]instanceof H){const n=o.children[a];s(n,r-1)}}}const i=Math.max(this.provider.minZoom,(e=(t=this.heightProvider)===null||t===void 0?void 0:t.minZoom)!==null&&e!==void 0?e:-1/0);i>0&&s(this.root,i)}setProvider(t){t!==this.provider&&(this.provider=t,this.clear())}setHeightProvider(t){t!==this.heightProvider&&(this.heightProvider=t,this.clear())}clear(){return this.traverse(function(t){t.childrenCache&&(t.childrenCache=null),t.initialize&&t.initialize()}),this}minZoom(){var t,e;return Math.max(this.provider.minZoom,(e=(t=this.heightProvider)===null||t===void 0?void 0:t.minZoom)!==null&&e!==void 0?e:-1/0)}maxZoom(){var t,e;return Math.min(this.provider.maxZoom,(e=(t=this.heightProvider)===null||t===void 0?void 0:t.maxZoom)!==null&&e!==void 0?e:1/0)}getMetaData(){this.provider.getMetaData()}raycast(t,e){return!1}}z.PLANAR=200;z.SPHERICAL=201;z.HEIGHT=202;z.HEIGHT_SHADER=203;z.MARTINI=204;z.mapModes=new Map([[z.PLANAR,G],[z.SPHERICAL,Y],[z.HEIGHT,N],[z.HEIGHT_SHADER,L],[z.MARTINI,V]]);new b;new b;new vt;new b;new At;new b;class Mt{static get(t){return S(this,void 0,void 0,function*(){return new Promise(function(e,s){const i=new XMLHttpRequest;i.overrideMimeType("text/plain"),i.open("GET",t,!0),i.onload=function(){e(i.response)},i.onerror=s,i.send(null)})})}static getRaw(t){return S(this,void 0,void 0,function*(){return new Promise(function(e,s){var i=new XMLHttpRequest;i.responseType="arraybuffer",i.open("GET",t,!0),i.onload=function(){e(i.response)},i.onerror=s,i.send(null)})})}static request(t,e,s,i,o,r,a){function n(h){try{return JSON.parse(h)}catch{return h}}const c=new XMLHttpRequest;if(c.overrideMimeType("text/plain"),c.open(e,t,!0),s!=null)for(const h in s)c.setRequestHeader(h,s[h]);return o!==void 0&&(c.onload=function(h){o(n(c.response),c)}),r!==void 0&&(c.onerror=r),a!==void 0&&(c.onprogress=a),c.send(i!==void 0?i:null),c}}class j extends ot{constructor(t="",e=j.AERIAL){super(),this.maxZoom=19,this.minZoom=1,this.format="jpeg",this.mapSize=512,this.subdomain="t1",this.meta=null,this.apiKey=t,this.type=e}getMetaData(){return S(this,void 0,void 0,function*(){const t=j.ADDRESS+"/REST/V1/Imagery/Metadata/RoadOnDemand?output=json&include=ImageryProviders&key="+this.apiKey,e=yield Mt.get(t);this.meta=JSON.parse(e)})}static quadKey(t,e,s){let i="";for(let o=t;o>0;o--){const r=1<<o-1;let a=0;e&r&&a++,s&r&&(a+=2),i+=a}return i}fetchTile(t,e,s){return new Promise((i,o)=>{const r=document.createElement("img");r.onload=function(){i(r)},r.onerror=function(){o()},r.crossOrigin="Anonymous",r.src="http://ecn."+this.subdomain+".tiles.virtualearth.net/tiles/"+this.type+j.quadKey(t,e,s)+".jpeg?g=1173"})}}j.ADDRESS="https://dev.virtualearth.net";j.AERIAL="a";j.ROAD="r";j.AERIAL_LABELS="h";j.OBLIQUE="o";j.OBLIQUE_LABELS="b";class Bt extends ot{constructor(t="",e="",s="base",i="normal.day",o="png",r=512){super(),this.appId=t,this.appCode=e,this.style=s,this.scheme=i,this.format=o,this.size=r,this.version="newest",this.server=1}nextServer(){this.server=this.server%4===0?1:this.server+1}getMetaData(){return S(this,void 0,void 0,function*(){})}fetchTile(t,e,s){return this.nextServer(),new Promise((i,o)=>{const r=document.createElement("img");r.onload=function(){i(r)},r.onerror=function(){o()},r.crossOrigin="Anonymous",r.src="https://"+this.server+"."+this.style+".maps.api.here.com/maptile/2.1/maptile/"+this.version+"/"+this.scheme+"/"+t+"/"+e+"/"+s+"/"+this.size+"/"+this.format+"?app_id="+this.appId+"&app_code="+this.appCode})}}Bt.PATH="/maptile/2.1/";class k extends ot{constructor(t="",e="",s=k.STYLE,i="png",o=!1,r="v4"){super(),this.apiToken=t,this.format=i,this.useHDPI=o,this.mode=s,this.mapId=e,this.style=e,this.version=r}getMetaData(){return S(this,void 0,void 0,function*(){const t=k.ADDRESS+this.version+"/"+this.mapId+".json?access_token="+this.apiToken,e=yield Mt.get(t),s=JSON.parse(e);this.name=s.name,this.minZoom=s.minZoom,this.maxZoom=s.maxZoom,this.bounds=s.bounds,this.center=s.center})}fetchTile(t,e,s){return new Promise((i,o)=>{const r=document.createElement("img");r.onload=function(){i(r)},r.onerror=function(){o()},r.crossOrigin="Anonymous",this.mode===k.STYLE?r.src=k.ADDRESS+"styles/v1/"+this.style+"/tiles/"+t+"/"+e+"/"+s+(this.useHDPI?"@2x?access_token=":"?access_token=")+this.apiToken:r.src=k.ADDRESS+"v4/"+this.mapId+"/"+t+"/"+e+"/"+s+(this.useHDPI?"@2x.":".")+this.format+"?access_token="+this.apiToken})}}k.ADDRESS="https://api.mapbox.com/";k.STYLE=100;k.MAP_ID=101;const _t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NjEwMjA4Ni00YmVkLTQyMjgtYjRmZS1lY2M3ZWFiMmFmNTYiLCJpZCI6MjYxMzMsImlhdCI6MTY3NTM2ODY4NX0.chGkGL6DkDNv5wYJQDMzWIvi9iDoVa27dgng_5ARDmo",_=document.querySelector("#canvas-parent"),ft=document.querySelector("#stats-widget"),mt=new Ct,W=new Lt(45,1,100,1e6),J=new Ht;J.preserveDrawingBuffer=!0;const Xt=new Nt,X=new Rt(W,_);X.listenToKeyEvents(window);_.appendChild(J.domElement);const $=new Et;$.domElement.style.position="absolute";$.domElement.style.top="10px";$.domElement.style.left="10px";_.appendChild($.domElement);const q=new URLSearchParams(document.location.search);q.get("tilesetUrl")&&(J.outputColorSpace=Ut);Jt();let lt,ht;const Yt=new xt,qt=new z(z.PLANAR,Yt);mt.add(qt);async function Jt(){const A=await Vt.load({url:q.get("tilesetUrl")??"https://assets.ion.cesium.com/43978/tileset.json",renderer:J,options:{cesiumIONToken:q.get("tilesetUrl")?null:_t,dracoDecoderPath:"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco",basisTranscoderPath:"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis",pointCloudColoring:Gt.RGB,maximumScreenSpaceError:q.get("sse")??6,memoryAdjustedScreenSpaceError:!1,geoTransform:Ot.Mercator}}),{model:t,runtime:e}=A;lt=e,t.rotation.set(-Math.PI/2,0,0),mt.add(t),ht=new It(e.getStats(),{container:ft}),ft.style.visibility="visible",q.get("tilesetUrl")||t.translateZ(230),W.position.copy(t.position),W.translateY(8e4),X.target.copy(t.position),X.update(),Qt()}function Qt(){X.enabled=!1,Ft.to(W.position,{duration:5,y:q.get("tilesetUrl")?100:3e3,onUpdate:function(){X.update()},onComplete:function(){X.enabled=!0,W.near=1,W.updateProjectionMatrix()}})}function bt(A){const t=Xt.getDelta();X.update(),lt&&lt.update(t,_.clientHeight,W),ht&&ht.update(),J.render(mt,W),$.update(),window.requestAnimationFrame(bt)}Tt();function Tt(){J.setSize(_.clientWidth,_.clientHeight),W.aspect=_.clientWidth/_.clientHeight,W.updateProjectionMatrix()}window.addEventListener("resize",Tt);bt();