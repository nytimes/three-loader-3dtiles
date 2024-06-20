import { CanvasTexture as Lc, LinearFilter as Pc, RepeatWrapping as Jr, Frustum as Gc, Matrix4 as Y, Group as yn, PlaneGeometry as Nc, Vector3 as nt, MeshBasicMaterial as Gs, DoubleSide as No, Mesh as Ns, ArrowHelper as Uc, Color as _, BoxGeometry as Hc, EdgesGeometry as Jc, LineSegments as Vc, LineBasicMaterial as jc, Vector2 as Uo, ShaderMaterial as ar, NormalBlending as cr, WebGLRenderTarget as kc, NearestFilter as Vr, RGBAFormat as Kc, FloatType as zc, Scene as Wc, WebGLRenderer as Xc, Euler as es, BufferGeometry as Ho, Float32BufferAttribute as wn, BufferAttribute as Jo, Quaternion as Qc, Uint8BufferAttribute as jr, Points as qc } from "three";
import { GLTFLoader as Yc } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader as $c } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader as Zc } from "three/examples/jsm/loaders/KTX2Loader.js";
async function je(e, t, n, s) {
  return s._parse(e, t, n, s);
}
function U(e, t) {
  if (!e)
    throw new Error(t || "loader assertion failed.");
}
const Jn = !!(typeof process != "object" || String(process) !== "[object process]" || process.browser), kr = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
kr && parseFloat(kr[1]);
function tu(e, t) {
  return Vo(e || {}, t);
}
function Vo(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  if (n > 3)
    return t;
  const s = {
    ...e
  };
  for (const [r, i] of Object.entries(t))
    i && typeof i == "object" && !Array.isArray(i) ? s[r] = Vo(s[r] || {}, t[r], n + 1) : s[r] = t[r];
  return s;
}
const eu = "latest";
function nu() {
  var e;
  return (e = globalThis._loadersgl_) !== null && e !== void 0 && e.version || (globalThis._loadersgl_ = globalThis._loadersgl_ || {}, globalThis._loadersgl_.version = "4.1.1"), globalThis._loadersgl_.version;
}
const jo = nu();
function Ht(e, t) {
  if (!e)
    throw new Error(t || "loaders.gl assertion failed.");
}
const Tt = typeof process != "object" || String(process) !== "[object process]" || process.browser, ur = typeof importScripts == "function", su = typeof window < "u" && typeof window.orientation < "u", Kr = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
Kr && parseFloat(Kr[1]);
class ru {
  constructor(t, n) {
    this.name = void 0, this.workerThread = void 0, this.isRunning = !0, this.result = void 0, this._resolve = () => {
    }, this._reject = () => {
    }, this.name = t, this.workerThread = n, this.result = new Promise((s, r) => {
      this._resolve = s, this._reject = r;
    });
  }
  postMessage(t, n) {
    this.workerThread.postMessage({
      source: "loaders.gl",
      type: t,
      payload: n
    });
  }
  done(t) {
    Ht(this.isRunning), this.isRunning = !1, this._resolve(t);
  }
  error(t) {
    Ht(this.isRunning), this.isRunning = !1, this._reject(t);
  }
}
class ns {
  terminate() {
  }
}
const ss = /* @__PURE__ */ new Map();
function iu(e) {
  Ht(e.source && !e.url || !e.source && e.url);
  let t = ss.get(e.source || e.url);
  return t || (e.url && (t = ou(e.url), ss.set(e.url, t)), e.source && (t = ko(e.source), ss.set(e.source, t))), Ht(t), t;
}
function ou(e) {
  if (!e.startsWith("http"))
    return e;
  const t = au(e);
  return ko(t);
}
function ko(e) {
  const t = new Blob([e], {
    type: "application/javascript"
  });
  return URL.createObjectURL(t);
}
function au(e) {
  return `try {
  importScripts('${e}');
} catch (error) {
  console.error(error);
  throw error;
}`;
}
function Ko(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = n || /* @__PURE__ */ new Set();
  if (e) {
    if (zr(e))
      s.add(e);
    else if (zr(e.buffer))
      s.add(e.buffer);
    else if (!ArrayBuffer.isView(e)) {
      if (t && typeof e == "object")
        for (const r in e)
          Ko(e[r], t, s);
    }
  }
  return n === void 0 ? Array.from(s) : [];
}
function zr(e) {
  return e ? e instanceof ArrayBuffer || typeof MessagePort < "u" && e instanceof MessagePort || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas : !1;
}
const rs = () => {
};
class Us {
  static isSupported() {
    return typeof Worker < "u" && Tt || typeof ns < "u" && !Tt;
  }
  constructor(t) {
    this.name = void 0, this.source = void 0, this.url = void 0, this.terminated = !1, this.worker = void 0, this.onMessage = void 0, this.onError = void 0, this._loadableURL = "";
    const {
      name: n,
      source: s,
      url: r
    } = t;
    Ht(s || r), this.name = n, this.source = s, this.url = r, this.onMessage = rs, this.onError = (i) => console.log(i), this.worker = Tt ? this._createBrowserWorker() : this._createNodeWorker();
  }
  destroy() {
    this.onMessage = rs, this.onError = rs, this.worker.terminate(), this.terminated = !0;
  }
  get isRunning() {
    return !!this.onMessage;
  }
  postMessage(t, n) {
    n = n || Ko(t), this.worker.postMessage(t, n);
  }
  _getErrorFromErrorEvent(t) {
    let n = "Failed to load ";
    return n += `worker ${this.name} from ${this.url}. `, t.message && (n += `${t.message} in `), t.lineno && (n += `:${t.lineno}:${t.colno}`), new Error(n);
  }
  _createBrowserWorker() {
    this._loadableURL = iu({
      source: this.source,
      url: this.url
    });
    const t = new Worker(this._loadableURL, {
      name: this.name
    });
    return t.onmessage = (n) => {
      n.data ? this.onMessage(n.data) : this.onError(new Error("No data received"));
    }, t.onerror = (n) => {
      this.onError(this._getErrorFromErrorEvent(n)), this.terminated = !0;
    }, t.onmessageerror = (n) => console.error(n), t;
  }
  _createNodeWorker() {
    let t;
    if (this.url) {
      const s = this.url.includes(":/") || this.url.startsWith("/") ? this.url : `./${this.url}`;
      t = new ns(s, {
        eval: !1
      });
    } else if (this.source)
      t = new ns(this.source, {
        eval: !0
      });
    else
      throw new Error("no worker");
    return t.on("message", (n) => {
      this.onMessage(n);
    }), t.on("error", (n) => {
      this.onError(n);
    }), t.on("exit", (n) => {
    }), t;
  }
}
class cu {
  static isSupported() {
    return Us.isSupported();
  }
  constructor(t) {
    this.name = "unnamed", this.source = void 0, this.url = void 0, this.maxConcurrency = 1, this.maxMobileConcurrency = 1, this.onDebug = () => {
    }, this.reuseWorkers = !0, this.props = {}, this.jobQueue = [], this.idleQueue = [], this.count = 0, this.isDestroyed = !1, this.source = t.source, this.url = t.url, this.setProps(t);
  }
  destroy() {
    this.idleQueue.forEach((t) => t.destroy()), this.isDestroyed = !0;
  }
  setProps(t) {
    this.props = {
      ...this.props,
      ...t
    }, t.name !== void 0 && (this.name = t.name), t.maxConcurrency !== void 0 && (this.maxConcurrency = t.maxConcurrency), t.maxMobileConcurrency !== void 0 && (this.maxMobileConcurrency = t.maxMobileConcurrency), t.reuseWorkers !== void 0 && (this.reuseWorkers = t.reuseWorkers), t.onDebug !== void 0 && (this.onDebug = t.onDebug);
  }
  async startJob(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (i, o, a) => i.done(a), s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (i, o) => i.error(o);
    const r = new Promise((i) => (this.jobQueue.push({
      name: t,
      onMessage: n,
      onError: s,
      onStart: i
    }), this));
    return this._startQueuedJob(), await r;
  }
  async _startQueuedJob() {
    if (!this.jobQueue.length)
      return;
    const t = this._getAvailableWorker();
    if (!t)
      return;
    const n = this.jobQueue.shift();
    if (n) {
      this.onDebug({
        message: "Starting job",
        name: n.name,
        workerThread: t,
        backlog: this.jobQueue.length
      });
      const s = new ru(n.name, t);
      t.onMessage = (r) => n.onMessage(s, r.type, r.payload), t.onError = (r) => n.onError(s, r), n.onStart(s);
      try {
        await s.result;
      } catch (r) {
        console.error(`Worker exception: ${r}`);
      } finally {
        this.returnWorkerToQueue(t);
      }
    }
  }
  returnWorkerToQueue(t) {
    !Tt || this.isDestroyed || !this.reuseWorkers || this.count > this._getMaxConcurrency() ? (t.destroy(), this.count--) : this.idleQueue.push(t), this.isDestroyed || this._startQueuedJob();
  }
  _getAvailableWorker() {
    if (this.idleQueue.length > 0)
      return this.idleQueue.shift() || null;
    if (this.count < this._getMaxConcurrency()) {
      this.count++;
      const t = `${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`;
      return new Us({
        name: t,
        source: this.source,
        url: this.url
      });
    }
    return null;
  }
  _getMaxConcurrency() {
    return su ? this.maxMobileConcurrency : this.maxConcurrency;
  }
}
const uu = {
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: !0,
  onDebug: () => {
  }
};
class Gt {
  static isSupported() {
    return Us.isSupported();
  }
  static getWorkerFarm() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Gt._workerFarm = Gt._workerFarm || new Gt({}), Gt._workerFarm.setProps(t), Gt._workerFarm;
  }
  constructor(t) {
    this.props = void 0, this.workerPools = /* @__PURE__ */ new Map(), this.props = {
      ...uu
    }, this.setProps(t), this.workerPools = /* @__PURE__ */ new Map();
  }
  destroy() {
    for (const t of this.workerPools.values())
      t.destroy();
    this.workerPools = /* @__PURE__ */ new Map();
  }
  setProps(t) {
    this.props = {
      ...this.props,
      ...t
    };
    for (const n of this.workerPools.values())
      n.setProps(this._getWorkerPoolProps());
  }
  getWorkerPool(t) {
    const {
      name: n,
      source: s,
      url: r
    } = t;
    let i = this.workerPools.get(n);
    return i || (i = new cu({
      name: n,
      source: s,
      url: r
    }), i.setProps(this._getWorkerPoolProps()), this.workerPools.set(n, i)), i;
  }
  _getWorkerPoolProps() {
    return {
      maxConcurrency: this.props.maxConcurrency,
      maxMobileConcurrency: this.props.maxMobileConcurrency,
      reuseWorkers: this.props.reuseWorkers,
      onDebug: this.props.onDebug
    };
  }
}
Gt._workerFarm = void 0;
function lu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const n = t[e.id] || {}, s = Tt ? `${e.id}-worker.js` : `${e.id}-worker-node.js`;
  let r = n.workerUrl;
  if (!r && e.id === "compression" && (r = t.workerUrl), t._workerType === "test" && (Tt ? r = `modules/${e.module}/dist/${s}` : r = `modules/${e.module}/src/workers/${e.id}-worker-node.ts`), !r) {
    let i = e.version;
    i === "latest" && (i = eu);
    const o = i ? `@${i}` : "";
    r = `https://unpkg.com/@loaders.gl/${e.module}${o}/dist/${s}`;
  }
  return Ht(r), r;
}
function hu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : jo;
  Ht(e, "no worker provided");
  const n = e.version;
  return !(!t || !n);
}
const fu = {}, du = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fu
}, Symbol.toStringTag, { value: "Module" })), is = {};
async function $t(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  return t && (e = mu(e, t, n, s)), is[e] = is[e] || gu(e), await is[e];
}
function mu(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  if (!n.useLocalLibraries && e.startsWith("http"))
    return e;
  s = s || e;
  const r = n.modules || {};
  return r[s] ? r[s] : Tt ? n.CDN ? (Ht(n.CDN.startsWith("http")), `${n.CDN}/${t}@${jo}/dist/libs/${s}`) : ur ? `../src/libs/${s}` : `modules/${t}/src/libs/${s}` : `modules/${t}/dist/libs/${s}`;
}
async function gu(e) {
  if (e.endsWith("wasm"))
    return await pu(e);
  if (!Tt)
    try {
      return du && void 0;
    } catch (n) {
      return console.error(n), null;
    }
  if (ur)
    return importScripts(e);
  const t = await yu(e);
  return Au(t, e);
}
function Au(e, t) {
  if (!Tt)
    return;
  if (ur)
    return eval.call(globalThis, e), null;
  const n = document.createElement("script");
  n.id = t;
  try {
    n.appendChild(document.createTextNode(e));
  } catch {
    n.text = e;
  }
  return document.body.appendChild(n), null;
}
async function pu(e) {
  return await (await fetch(e)).arrayBuffer();
}
async function yu(e) {
  return await (await fetch(e)).text();
}
function Bu(e, t) {
  return !Gt.isSupported() || !Tt && !(t != null && t._nodeWorkers) ? !1 : e.worker && (t == null ? void 0 : t.worker);
}
async function Cu(e, t, n, s, r) {
  const i = e.id, o = lu(e, n), c = Gt.getWorkerFarm(n).getWorkerPool({
    name: i,
    url: o
  });
  n = JSON.parse(JSON.stringify(n)), s = JSON.parse(JSON.stringify(s || {}));
  const u = await c.startJob("process-on-worker", Eu.bind(null, r));
  return u.postMessage("process", {
    input: t,
    options: n,
    context: s
  }), await (await u.result).result;
}
async function Eu(e, t, n, s) {
  switch (n) {
    case "done":
      t.done(s);
      break;
    case "error":
      t.error(new Error(s.error));
      break;
    case "process":
      const {
        id: r,
        input: i,
        options: o
      } = s;
      try {
        const a = await e(i, o);
        t.postMessage("done", {
          id: r,
          result: a
        });
      } catch (a) {
        const c = a instanceof Error ? a.message : "unknown error";
        t.postMessage("error", {
          id: r,
          error: c
        });
      }
      break;
    default:
      console.warn(`parse-with-worker unknown message ${n}`);
  }
}
function Tu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
  return typeof e == "string" ? e.slice(0, t) : ArrayBuffer.isView(e) ? Wr(e.buffer, e.byteOffset, t) : e instanceof ArrayBuffer ? Wr(e, 0, t) : "";
}
function Wr(e, t, n) {
  if (e.byteLength <= t + n)
    return "";
  const s = new DataView(e);
  let r = "";
  for (let i = 0; i < n; i++)
    r += String.fromCharCode(s.getUint8(t + i));
  return r;
}
function bu(e) {
  try {
    return JSON.parse(e);
  } catch {
    throw new Error(`Failed to parse JSON from data starting with "${Tu(e)}"`);
  }
}
function _u(e, t, n) {
  if (n = n || e.byteLength, e.byteLength < n || t.byteLength < n)
    return !1;
  const s = new Uint8Array(e), r = new Uint8Array(t);
  for (let i = 0; i < s.length; ++i)
    if (s[i] !== r[i])
      return !1;
  return !0;
}
function wu() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return Ru(t);
}
function Ru(e) {
  const t = e.map((i) => i instanceof ArrayBuffer ? new Uint8Array(i) : i), n = t.reduce((i, o) => i + o.byteLength, 0), s = new Uint8Array(n);
  let r = 0;
  for (const i of t)
    s.set(i, r), r += i.byteLength;
  return s.buffer;
}
function lr(e, t, n) {
  const s = n !== void 0 ? new Uint8Array(e).subarray(t, t + n) : new Uint8Array(e).subarray(t);
  return new Uint8Array(s).buffer;
}
function ke(e, t) {
  return U(e >= 0), U(t > 0), e + (t - 1) & ~(t - 1);
}
function Mu(e, t, n) {
  let s;
  if (e instanceof ArrayBuffer)
    s = new Uint8Array(e);
  else {
    const r = e.byteOffset, i = e.byteLength;
    s = new Uint8Array(e.buffer || e.arrayBuffer, r, i);
  }
  return t.set(s, n), n + ke(s.byteLength, 4);
}
async function Su(e) {
  const t = [];
  for await (const n of e)
    t.push(n);
  return wu(...t);
}
function Xr() {
  let e;
  if (typeof window < "u" && window.performance)
    e = window.performance.now();
  else if (typeof process < "u" && process.hrtime) {
    const t = process.hrtime();
    e = t[0] * 1e3 + t[1] / 1e6;
  } else
    e = Date.now();
  return e;
}
class Qr {
  constructor(t, n) {
    this.name = void 0, this.type = void 0, this.sampleSize = 1, this.time = 0, this.count = 0, this.samples = 0, this.lastTiming = 0, this.lastSampleTime = 0, this.lastSampleCount = 0, this._count = 0, this._time = 0, this._samples = 0, this._startTime = 0, this._timerPending = !1, this.name = t, this.type = n, this.reset();
  }
  reset() {
    return this.time = 0, this.count = 0, this.samples = 0, this.lastTiming = 0, this.lastSampleTime = 0, this.lastSampleCount = 0, this._count = 0, this._time = 0, this._samples = 0, this._startTime = 0, this._timerPending = !1, this;
  }
  setSampleSize(t) {
    return this.sampleSize = t, this;
  }
  incrementCount() {
    return this.addCount(1), this;
  }
  decrementCount() {
    return this.subtractCount(1), this;
  }
  addCount(t) {
    return this._count += t, this._samples++, this._checkSampling(), this;
  }
  subtractCount(t) {
    return this._count -= t, this._samples++, this._checkSampling(), this;
  }
  addTime(t) {
    return this._time += t, this.lastTiming = t, this._samples++, this._checkSampling(), this;
  }
  timeStart() {
    return this._startTime = Xr(), this._timerPending = !0, this;
  }
  timeEnd() {
    return this._timerPending ? (this.addTime(Xr() - this._startTime), this._timerPending = !1, this._checkSampling(), this) : this;
  }
  getSampleAverageCount() {
    return this.sampleSize > 0 ? this.lastSampleCount / this.sampleSize : 0;
  }
  getSampleAverageTime() {
    return this.sampleSize > 0 ? this.lastSampleTime / this.sampleSize : 0;
  }
  getSampleHz() {
    return this.lastSampleTime > 0 ? this.sampleSize / (this.lastSampleTime / 1e3) : 0;
  }
  getAverageCount() {
    return this.samples > 0 ? this.count / this.samples : 0;
  }
  getAverageTime() {
    return this.samples > 0 ? this.time / this.samples : 0;
  }
  getHz() {
    return this.time > 0 ? this.samples / (this.time / 1e3) : 0;
  }
  _checkSampling() {
    this._samples === this.sampleSize && (this.lastSampleTime = this._time, this.lastSampleCount = this._count, this.count += this._count, this.time += this._time, this.samples += this._samples, this._time = 0, this._count = 0, this._samples = 0);
  }
}
class zo {
  constructor(t) {
    this.id = void 0, this.stats = {}, this.id = t.id, this.stats = {}, this._initializeStats(t.stats), Object.seal(this);
  }
  get(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "count";
    return this._getOrCreate({
      name: t,
      type: n
    });
  }
  get size() {
    return Object.keys(this.stats).length;
  }
  reset() {
    for (const t of Object.values(this.stats))
      t.reset();
    return this;
  }
  forEach(t) {
    for (const n of Object.values(this.stats))
      t(n);
  }
  getTable() {
    const t = {};
    return this.forEach((n) => {
      t[n.name] = {
        time: n.time || 0,
        count: n.count || 0,
        average: n.getAverageTime() || 0,
        hz: n.getHz() || 0
      };
    }), t;
  }
  _initializeStats() {
    (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).forEach((n) => this._getOrCreate(n));
  }
  _getOrCreate(t) {
    const {
      name: n,
      type: s
    } = t;
    let r = this.stats[n];
    return r || (t instanceof Qr ? r = t : r = new Qr(n, s), this.stats[n] = r), r;
  }
}
const Iu = "Queued Requests", xu = "Active Requests", vu = "Cancelled Requests", Fu = "Queued Requests Ever", Ou = "Active Requests Ever", Du = {
  id: "request-scheduler",
  throttleRequests: !0,
  maxRequests: 6
};
class Lu {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.props = void 0, this.stats = void 0, this.activeRequestCount = 0, this.requestQueue = [], this.requestMap = /* @__PURE__ */ new Map(), this.deferredUpdate = null, this.props = {
      ...Du,
      ...t
    }, this.stats = new zo({
      id: this.props.id
    }), this.stats.get(Iu), this.stats.get(xu), this.stats.get(vu), this.stats.get(Fu), this.stats.get(Ou);
  }
  scheduleRequest(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : () => 0;
    if (!this.props.throttleRequests)
      return Promise.resolve({
        done: () => {
        }
      });
    if (this.requestMap.has(t))
      return this.requestMap.get(t);
    const s = {
      handle: t,
      priority: 0,
      getPriority: n
    }, r = new Promise((i) => (s.resolve = i, s));
    return this.requestQueue.push(s), this.requestMap.set(t, r), this._issueNewRequests(), r;
  }
  _issueRequest(t) {
    const {
      handle: n,
      resolve: s
    } = t;
    let r = !1;
    const i = () => {
      r || (r = !0, this.requestMap.delete(n), this.activeRequestCount--, this._issueNewRequests());
    };
    return this.activeRequestCount++, s ? s({
      done: i
    }) : Promise.resolve({
      done: i
    });
  }
  _issueNewRequests() {
    this.deferredUpdate || (this.deferredUpdate = setTimeout(() => this._issueNewRequestsAsync(), 0));
  }
  _issueNewRequestsAsync() {
    this.deferredUpdate = null;
    const t = Math.max(this.props.maxRequests - this.activeRequestCount, 0);
    if (t !== 0) {
      this._updateAllRequests();
      for (let n = 0; n < t; ++n) {
        const s = this.requestQueue.shift();
        s && this._issueRequest(s);
      }
    }
  }
  _updateAllRequests() {
    const t = this.requestQueue;
    for (let n = 0; n < t.length; ++n) {
      const s = t[n];
      this._updateRequest(s) || (t.splice(n, 1), this.requestMap.delete(s.handle), n--);
    }
    t.sort((n, s) => n.priority - s.priority);
  }
  _updateRequest(t) {
    return t.priority = t.getPriority(t.handle), t.priority < 0 ? (t.resolve(null), !1) : !0;
  }
}
let Pu = "";
const qr = {};
function Gu(e) {
  for (const t in qr)
    if (e.startsWith(t)) {
      const n = qr[t];
      e = e.replace(t, n);
    }
  return !e.startsWith("http://") && !e.startsWith("https://") && (e = `${Pu}${e}`), e;
}
function Nu(e) {
  return e && typeof e == "object" && e.isBuffer;
}
function Wo(e) {
  if (Nu(e))
    return e;
  if (e instanceof ArrayBuffer)
    return e;
  if (ArrayBuffer.isView(e))
    return e.byteOffset === 0 && e.byteLength === e.buffer.byteLength ? e.buffer : e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
  if (typeof e == "string") {
    const t = e;
    return new TextEncoder().encode(t).buffer;
  }
  if (e && typeof e == "object" && e._toArrayBuffer)
    return e._toArrayBuffer();
  throw new Error("toArrayBuffer");
}
function Uu() {
  var e;
  if (typeof process < "u" && typeof process.cwd < "u")
    return process.cwd();
  const t = (e = window.location) === null || e === void 0 ? void 0 : e.pathname;
  return (t == null ? void 0 : t.slice(0, t.lastIndexOf("/") + 1)) || "";
}
function Xo(e) {
  const t = e ? e.lastIndexOf("/") : -1;
  return t >= 0 ? e.substr(t + 1) : "";
}
function hr(e) {
  const t = e ? e.lastIndexOf("/") : -1;
  return t >= 0 ? e.substr(0, t) : "";
}
function Hu() {
  const e = [];
  for (let r = 0; r < arguments.length; r++)
    e[r] = r < 0 || arguments.length <= r ? void 0 : arguments[r];
  let t = "", n = !1, s;
  for (let r = e.length - 1; r >= -1 && !n; r--) {
    let i;
    r >= 0 ? i = e[r] : (s === void 0 && (s = Uu()), i = s), i.length !== 0 && (t = `${i}/${t}`, n = i.charCodeAt(0) === Se);
  }
  return t = Ju(t, !n), n ? `/${t}` : t.length > 0 ? t : ".";
}
const Se = 47, os = 46;
function Ju(e, t) {
  let n = "", s = -1, r = 0, i, o = !1;
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length)
      i = e.charCodeAt(a);
    else {
      if (i === Se)
        break;
      i = Se;
    }
    if (i === Se) {
      if (!(s === a - 1 || r === 1))
        if (s !== a - 1 && r === 2) {
          if (n.length < 2 || !o || n.charCodeAt(n.length - 1) !== os || n.charCodeAt(n.length - 2) !== os) {
            if (n.length > 2) {
              const c = n.length - 1;
              let u = c;
              for (; u >= 0 && n.charCodeAt(u) !== Se; --u)
                ;
              if (u !== c) {
                n = u === -1 ? "" : n.slice(0, u), s = a, r = 0, o = !1;
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              n = "", s = a, r = 0, o = !1;
              continue;
            }
          }
          t && (n.length > 0 ? n += "/.." : n = "..", o = !0);
        } else {
          const c = e.slice(s + 1, a);
          n.length > 0 ? n += `/${c}` : n = c, o = !1;
        }
      s = a, r = 0;
    } else
      i === os && r !== -1 ? ++r : r = -1;
  }
  return n;
}
const Vu = (e) => typeof e == "boolean", xe = (e) => typeof e == "function", Ke = (e) => e !== null && typeof e == "object", Yr = (e) => Ke(e) && e.constructor === {}.constructor, ju = (e) => !!e && typeof e[Symbol.iterator] == "function", ku = (e) => e && typeof e[Symbol.asyncIterator] == "function", ne = (e) => typeof Response < "u" && e instanceof Response || e && e.arrayBuffer && e.text && e.json, se = (e) => typeof Blob < "u" && e instanceof Blob, Ku = (e) => e && typeof e == "object" && e.isBuffer, zu = (e) => typeof ReadableStream < "u" && e instanceof ReadableStream || Ke(e) && xe(e.tee) && xe(e.cancel) && xe(e.getReader), Wu = (e) => Ke(e) && xe(e.read) && xe(e.pipe) && Vu(e.readable), Qo = (e) => zu(e) || Wu(e), Xu = /^data:([-\w.]+\/[-\w.+]+)(;|,)/, Qu = /^([-\w.]+\/[-\w.+]+)/;
function qu(e) {
  const t = Qu.exec(e);
  return t ? t[1] : e;
}
function $r(e) {
  const t = Xu.exec(e);
  return t ? t[1] : "";
}
const qo = /\?.*/;
function Yu(e) {
  const t = e.match(qo);
  return t && t[0];
}
function fr(e) {
  return e.replace(qo, "");
}
function Vn(e) {
  return ne(e) ? e.url : se(e) ? e.name || "" : typeof e == "string" ? e : "";
}
function dr(e) {
  if (ne(e)) {
    const t = e, n = t.headers.get("content-type") || "", s = fr(t.url);
    return qu(n) || $r(s);
  }
  return se(e) ? e.type || "" : typeof e == "string" ? $r(e) : "";
}
function $u(e) {
  return ne(e) ? e.headers["content-length"] || -1 : se(e) ? e.size : typeof e == "string" ? e.length : e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? e.byteLength : -1;
}
async function Yo(e) {
  if (ne(e))
    return e;
  const t = {}, n = $u(e);
  n >= 0 && (t["content-length"] = String(n));
  const s = Vn(e), r = dr(e);
  r && (t["content-type"] = r);
  const i = await el(e);
  i && (t["x-first-bytes"] = i), typeof e == "string" && (e = new TextEncoder().encode(e));
  const o = new Response(e, {
    headers: t
  });
  return Object.defineProperty(o, "url", {
    value: s
  }), o;
}
async function Zu(e) {
  if (!e.ok) {
    const t = await tl(e);
    throw new Error(t);
  }
}
async function tl(e) {
  let t = `Failed to fetch resource ${e.url} (${e.status}): `;
  try {
    const n = e.headers.get("Content-Type");
    let s = e.statusText;
    n != null && n.includes("application/json") && (s += ` ${await e.text()}`), t += s, t = t.length > 60 ? `${t.slice(0, 60)}...` : t;
  } catch {
  }
  return t;
}
async function el(e) {
  if (typeof e == "string")
    return `data:,${e.slice(0, 5)}`;
  if (e instanceof Blob) {
    const n = e.slice(0, 5);
    return await new Promise((s) => {
      const r = new FileReader();
      r.onload = (i) => {
        var o;
        return s(i == null || (o = i.target) === null || o === void 0 ? void 0 : o.result);
      }, r.readAsDataURL(n);
    });
  }
  if (e instanceof ArrayBuffer) {
    const n = e.slice(0, 5);
    return `data:base64,${nl(n)}`;
  }
  return null;
}
function nl(e) {
  let t = "";
  const n = new Uint8Array(e);
  for (let s = 0; s < n.byteLength; s++)
    t += String.fromCharCode(n[s]);
  return btoa(t);
}
function sl(e) {
  return !rl(e) && !il(e);
}
function rl(e) {
  return e.startsWith("http:") || e.startsWith("https:");
}
function il(e) {
  return e.startsWith("data:");
}
async function Le(e, t) {
  if (typeof e == "string") {
    const r = Gu(e);
    if (sl(r)) {
      var n;
      if ((n = globalThis.loaders) !== null && n !== void 0 && n.fetchNode) {
        var s;
        return (s = globalThis.loaders) === null || s === void 0 ? void 0 : s.fetchNode(r, t);
      }
    }
    return await fetch(r, t);
  }
  return await Yo(e);
}
function ol(e) {
  if (typeof window < "u" && typeof window.process == "object" && window.process.type === "renderer" || typeof process < "u" && typeof process.versions == "object" && process.versions.electron)
    return !0;
  const t = typeof navigator == "object" && typeof navigator.userAgent == "string" && navigator.userAgent, n = e || t;
  return !!(n && n.indexOf("Electron") >= 0);
}
function ze() {
  return !(typeof process == "object" && String(process) === "[object process]" && !process.browser) || ol();
}
const Ye = globalThis.window || globalThis.self || globalThis.global, Ce = globalThis.process || {}, $o = typeof __VERSION__ < "u" ? __VERSION__ : "untranspiled source";
ze();
function al(e) {
  try {
    const t = window[e], n = "__storage_test__";
    return t.setItem(n, n), t.removeItem(n), t;
  } catch {
    return null;
  }
}
class cl {
  constructor(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "sessionStorage";
    this.storage = void 0, this.id = void 0, this.config = void 0, this.storage = al(s), this.id = t, this.config = n, this._loadConfiguration();
  }
  getConfiguration() {
    return this.config;
  }
  setConfiguration(t) {
    if (Object.assign(this.config, t), this.storage) {
      const n = JSON.stringify(this.config);
      this.storage.setItem(this.id, n);
    }
  }
  _loadConfiguration() {
    let t = {};
    if (this.storage) {
      const n = this.storage.getItem(this.id);
      t = n ? JSON.parse(n) : {};
    }
    return Object.assign(this.config, t), this;
  }
}
function ul(e) {
  let t;
  return e < 10 ? t = "".concat(e.toFixed(2), "ms") : e < 100 ? t = "".concat(e.toFixed(1), "ms") : e < 1e3 ? t = "".concat(e.toFixed(0), "ms") : t = "".concat((e / 1e3).toFixed(2), "s"), t;
}
function ll(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8;
  const n = Math.max(t - e.length, 0);
  return "".concat(" ".repeat(n)).concat(e);
}
function as(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 600;
  const r = e.src.replace(/\(/g, "%28").replace(/\)/g, "%29");
  e.width > s && (n = Math.min(n, s / e.width));
  const i = e.width * n, o = e.height * n, a = ["font-size:1px;", "padding:".concat(Math.floor(o / 2), "px ").concat(Math.floor(i / 2), "px;"), "line-height:".concat(o, "px;"), "background:url(".concat(r, ");"), "background-size:".concat(i, "px ").concat(o, "px;"), "color:transparent;"].join("");
  return ["".concat(t, " %c+"), a];
}
let Rn;
(function(e) {
  e[e.BLACK = 30] = "BLACK", e[e.RED = 31] = "RED", e[e.GREEN = 32] = "GREEN", e[e.YELLOW = 33] = "YELLOW", e[e.BLUE = 34] = "BLUE", e[e.MAGENTA = 35] = "MAGENTA", e[e.CYAN = 36] = "CYAN", e[e.WHITE = 37] = "WHITE", e[e.BRIGHT_BLACK = 90] = "BRIGHT_BLACK", e[e.BRIGHT_RED = 91] = "BRIGHT_RED", e[e.BRIGHT_GREEN = 92] = "BRIGHT_GREEN", e[e.BRIGHT_YELLOW = 93] = "BRIGHT_YELLOW", e[e.BRIGHT_BLUE = 94] = "BRIGHT_BLUE", e[e.BRIGHT_MAGENTA = 95] = "BRIGHT_MAGENTA", e[e.BRIGHT_CYAN = 96] = "BRIGHT_CYAN", e[e.BRIGHT_WHITE = 97] = "BRIGHT_WHITE";
})(Rn || (Rn = {}));
const hl = 10;
function Zr(e) {
  return typeof e != "string" ? e : (e = e.toUpperCase(), Rn[e] || Rn.WHITE);
}
function fl(e, t, n) {
  if (!ze && typeof e == "string") {
    if (t) {
      const s = Zr(t);
      e = "\x1B[".concat(s, "m").concat(e, "\x1B[39m");
    }
    if (n) {
      const s = Zr(n);
      e = "\x1B[".concat(s + hl, "m").concat(e, "\x1B[49m");
    }
  }
  return e;
}
function dl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ["constructor"];
  const n = Object.getPrototypeOf(e), s = Object.getOwnPropertyNames(n), r = e;
  for (const i of s) {
    const o = r[i];
    typeof o == "function" && (t.find((a) => i === a) || (r[i] = o.bind(e)));
  }
}
function Mn(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
function oe() {
  let e;
  if (ze() && Ye.performance) {
    var t, n;
    e = Ye == null || (t = Ye.performance) === null || t === void 0 || (n = t.now) === null || n === void 0 ? void 0 : n.call(t);
  } else if ("hrtime" in Ce) {
    var s;
    const r = Ce == null || (s = Ce.hrtime) === null || s === void 0 ? void 0 : s.call(Ce);
    e = r[0] * 1e3 + r[1] / 1e6;
  } else
    e = Date.now();
  return e;
}
const ae = {
  debug: ze() && console.debug || console.log,
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
}, ml = {
  enabled: !0,
  level: 0
};
function Bt() {
}
const ti = {}, ei = {
  once: !0
};
class jn {
  constructor() {
    let {
      id: t
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
      id: ""
    };
    this.id = void 0, this.VERSION = $o, this._startTs = oe(), this._deltaTs = oe(), this._storage = void 0, this.userData = {}, this.LOG_THROTTLE_TIMEOUT = 0, this.id = t, this.userData = {}, this._storage = new cl("__probe-".concat(this.id, "__"), ml), this.timeStamp("".concat(this.id, " started")), dl(this), Object.seal(this);
  }
  set level(t) {
    this.setLevel(t);
  }
  get level() {
    return this.getLevel();
  }
  isEnabled() {
    return this._storage.config.enabled;
  }
  getLevel() {
    return this._storage.config.level;
  }
  getTotal() {
    return Number((oe() - this._startTs).toPrecision(10));
  }
  getDelta() {
    return Number((oe() - this._deltaTs).toPrecision(10));
  }
  set priority(t) {
    this.level = t;
  }
  get priority() {
    return this.level;
  }
  getPriority() {
    return this.level;
  }
  enable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return this._storage.setConfiguration({
      enabled: t
    }), this;
  }
  setLevel(t) {
    return this._storage.setConfiguration({
      level: t
    }), this;
  }
  get(t) {
    return this._storage.config[t];
  }
  set(t, n) {
    this._storage.setConfiguration({
      [t]: n
    });
  }
  settings() {
    console.table ? console.table(this._storage.config) : console.log(this._storage.config);
  }
  assert(t, n) {
    Mn(t, n);
  }
  warn(t) {
    return this._getLogFunction(0, t, ae.warn, arguments, ei);
  }
  error(t) {
    return this._getLogFunction(0, t, ae.error, arguments);
  }
  deprecated(t, n) {
    return this.warn("`".concat(t, "` is deprecated and will be removed in a later version. Use `").concat(n, "` instead"));
  }
  removed(t, n) {
    return this.error("`".concat(t, "` has been removed. Use `").concat(n, "` instead"));
  }
  probe(t, n) {
    return this._getLogFunction(t, n, ae.log, arguments, {
      time: !0,
      once: !0
    });
  }
  log(t, n) {
    return this._getLogFunction(t, n, ae.debug, arguments);
  }
  info(t, n) {
    return this._getLogFunction(t, n, console.info, arguments);
  }
  once(t, n) {
    return this._getLogFunction(t, n, ae.debug || ae.info, arguments, ei);
  }
  table(t, n, s) {
    return n ? this._getLogFunction(t, n, console.table || Bt, s && [s], {
      tag: yl(n)
    }) : Bt;
  }
  image(t) {
    let {
      logLevel: n,
      priority: s,
      image: r,
      message: i = "",
      scale: o = 1
    } = t;
    return this._shouldLog(n || s) ? ze() ? pl({
      image: r,
      message: i,
      scale: o
    }) : Al() : Bt;
  }
  time(t, n) {
    return this._getLogFunction(t, n, console.time ? console.time : console.info);
  }
  timeEnd(t, n) {
    return this._getLogFunction(t, n, console.timeEnd ? console.timeEnd : console.info);
  }
  timeStamp(t, n) {
    return this._getLogFunction(t, n, console.timeStamp || Bt);
  }
  group(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      collapsed: !1
    };
    const r = ni({
      logLevel: t,
      message: n,
      opts: s
    }), {
      collapsed: i
    } = s;
    return r.method = (i ? console.groupCollapsed : console.group) || console.info, this._getLogFunction(r);
  }
  groupCollapsed(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.group(t, n, Object.assign({}, s, {
      collapsed: !0
    }));
  }
  groupEnd(t) {
    return this._getLogFunction(t, "", console.groupEnd || Bt);
  }
  withGroup(t, n, s) {
    this.group(t, n)();
    try {
      s();
    } finally {
      this.groupEnd(t)();
    }
  }
  trace() {
    console.trace && console.trace();
  }
  _shouldLog(t) {
    return this.isEnabled() && this.getLevel() >= Zo(t);
  }
  _getLogFunction(t, n, s, r, i) {
    if (this._shouldLog(t)) {
      i = ni({
        logLevel: t,
        message: n,
        args: r,
        opts: i
      }), s = s || i.method, Mn(s), i.total = this.getTotal(), i.delta = this.getDelta(), this._deltaTs = oe();
      const o = i.tag || i.message;
      if (i.once && o)
        if (!ti[o])
          ti[o] = oe();
        else
          return Bt;
      return n = gl(this.id, i.message, i), s.bind(console, n, ...i.args);
    }
    return Bt;
  }
}
jn.VERSION = $o;
function Zo(e) {
  if (!e)
    return 0;
  let t;
  switch (typeof e) {
    case "number":
      t = e;
      break;
    case "object":
      t = e.logLevel || e.priority || 0;
      break;
    default:
      return 0;
  }
  return Mn(Number.isFinite(t) && t >= 0), t;
}
function ni(e) {
  const {
    logLevel: t,
    message: n
  } = e;
  e.logLevel = Zo(t);
  const s = e.args ? Array.from(e.args) : [];
  for (; s.length && s.shift() !== n; )
    ;
  switch (typeof t) {
    case "string":
    case "function":
      n !== void 0 && s.unshift(n), e.message = t;
      break;
    case "object":
      Object.assign(e, t);
      break;
  }
  typeof e.message == "function" && (e.message = e.message());
  const r = typeof e.message;
  return Mn(r === "string" || r === "object"), Object.assign(e, {
    args: s
  }, e.opts);
}
function gl(e, t, n) {
  if (typeof t == "string") {
    const s = n.time ? ll(ul(n.total)) : "";
    t = n.time ? "".concat(e, ": ").concat(s, "  ").concat(t) : "".concat(e, ": ").concat(t), t = fl(t, n.color, n.background);
  }
  return t;
}
function Al(e) {
  return console.warn("removed"), Bt;
}
function pl(e) {
  let {
    image: t,
    message: n = "",
    scale: s = 1
  } = e;
  if (typeof t == "string") {
    const i = new Image();
    return i.onload = () => {
      const o = as(i, n, s);
      console.log(...o);
    }, i.src = t, Bt;
  }
  const r = t.nodeName || "";
  if (r.toLowerCase() === "img")
    return console.log(...as(t, n, s)), Bt;
  if (r.toLowerCase() === "canvas") {
    const i = new Image();
    return i.onload = () => console.log(...as(i, n, s)), i.src = t.toDataURL(), Bt;
  }
  return Bt;
}
function yl(e) {
  for (const t in e)
    for (const n in e[t])
      return n || "untitled";
  return "empty";
}
const ta = new jn({
  id: "@probe.gl/log"
}), si = new jn({
  id: "loaders.gl"
});
class Bl {
  log() {
    return () => {
    };
  }
  info() {
    return () => {
    };
  }
  warn() {
    return () => {
    };
  }
  error() {
    return () => {
    };
  }
}
class Cl {
  constructor() {
    this.console = void 0, this.console = console;
  }
  log() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.console.log.bind(this.console, ...n);
  }
  info() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.console.info.bind(this.console, ...n);
  }
  warn() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.console.warn.bind(this.console, ...n);
  }
  error() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.console.error.bind(this.console, ...n);
  }
}
const ea = {
  fetch: null,
  mimeType: void 0,
  nothrow: !1,
  log: new Cl(),
  useLocalLibraries: !1,
  CDN: "https://unpkg.com/@loaders.gl",
  worker: !0,
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: Jn,
  _nodeWorkers: !1,
  _workerType: "",
  limit: 0,
  _limitMB: 0,
  batchSize: "auto",
  batchDebounceMs: 0,
  metadata: !1,
  transforms: []
}, El = {
  throws: "nothrow",
  dataType: "(no longer used)",
  uri: "baseUri",
  method: "fetch.method",
  headers: "fetch.headers",
  body: "fetch.body",
  mode: "fetch.mode",
  credentials: "fetch.credentials",
  cache: "fetch.cache",
  redirect: "fetch.redirect",
  referrer: "fetch.referrer",
  referrerPolicy: "fetch.referrerPolicy",
  integrity: "fetch.integrity",
  keepalive: "fetch.keepalive",
  signal: "fetch.signal"
};
function na() {
  globalThis.loaders = globalThis.loaders || {};
  const {
    loaders: e
  } = globalThis;
  return e._state = e._state || {}, e._state;
}
function sa() {
  const e = na();
  return e.globalOptions = e.globalOptions || {
    ...ea
  }, e.globalOptions;
}
function Tl(e, t, n, s) {
  return n = n || [], n = Array.isArray(n) ? n : [n], bl(e, n), wl(t, e, s);
}
function bl(e, t) {
  ri(e, null, ea, El, t);
  for (const n of t) {
    const s = e && e[n.id] || {}, r = n.options && n.options[n.id] || {}, i = n.deprecatedOptions && n.deprecatedOptions[n.id] || {};
    ri(s, n.id, r, i, t);
  }
}
function ri(e, t, n, s, r) {
  const i = t || "Top level", o = t ? `${t}.` : "";
  for (const a in e) {
    const c = !t && Ke(e[a]), u = a === "baseUri" && !t, l = a === "workerUrl" && t;
    if (!(a in n) && !u && !l) {
      if (a in s)
        si.warn(`${i} loader option '${o}${a}' no longer supported, use '${s[a]}'`)();
      else if (!c) {
        const h = _l(a, r);
        si.warn(`${i} loader option '${o}${a}' not recognized. ${h}`)();
      }
    }
  }
}
function _l(e, t) {
  const n = e.toLowerCase();
  let s = "";
  for (const r of t)
    for (const i in r.options) {
      if (e === i)
        return `Did you mean '${r.id}.${i}'?`;
      const o = i.toLowerCase();
      (n.startsWith(o) || o.startsWith(n)) && (s = s || `Did you mean '${r.id}.${i}'?`);
    }
  return s;
}
function wl(e, t, n) {
  const r = {
    ...e.options || {}
  };
  return Rl(r, n), r.log === null && (r.log = new Bl()), ii(r, sa()), ii(r, t), r;
}
function ii(e, t) {
  for (const n in t)
    if (n in t) {
      const s = t[n];
      Yr(s) && Yr(e[n]) ? e[n] = {
        ...e[n],
        ...t[n]
      } : e[n] = t[n];
    }
}
function Rl(e, t) {
  t && !("baseUri" in e) && (e.baseUri = t);
}
function mr(e) {
  var t;
  return e ? (Array.isArray(e) && (e = e[0]), Array.isArray((t = e) === null || t === void 0 ? void 0 : t.extensions)) : !1;
}
function ra(e) {
  var t, n;
  U(e, "null loader"), U(mr(e), "invalid loader");
  let s;
  return Array.isArray(e) && (s = e[1], e = e[0], e = {
    ...e,
    options: {
      ...e.options,
      ...s
    }
  }), ((t = e) !== null && t !== void 0 && t.parseTextSync || (n = e) !== null && n !== void 0 && n.parseText) && (e.text = !0), e.text || (e.binary = !0), e;
}
const Ml = () => {
  const e = na();
  return e.loaderRegistry = e.loaderRegistry || [], e.loaderRegistry;
};
function Sl() {
  return Ml();
}
const Il = new jn({
  id: "loaders.gl"
}), xl = /\.([^.]+)$/;
async function vl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0;
  if (!ia(e))
    return null;
  let r = oi(e, t, {
    ...n,
    nothrow: !0
  }, s);
  if (r)
    return r;
  if (se(e) && (e = await e.slice(0, 10).arrayBuffer(), r = oi(e, t, n, s)), !r && !(n != null && n.nothrow))
    throw new Error(oa(e));
  return r;
}
function oi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0;
  if (!ia(e))
    return null;
  if (t && !Array.isArray(t))
    return ra(t);
  let r = [];
  t && (r = r.concat(t)), n != null && n.ignoreRegisteredLoaders || r.push(...Sl()), Ol(r);
  const i = Fl(e, r, n, s);
  if (!i && !(n != null && n.nothrow))
    throw new Error(oa(e));
  return i;
}
function Fl(e, t, n, s) {
  const r = Vn(e), i = dr(e), o = fr(r) || (s == null ? void 0 : s.url);
  let a = null, c = "";
  if (n != null && n.mimeType && (a = cs(t, n == null ? void 0 : n.mimeType), c = `match forced by supplied MIME type ${n == null ? void 0 : n.mimeType}`), a = a || Dl(t, o), c = c || (a ? `matched url ${o}` : ""), a = a || cs(t, i), c = c || (a ? `matched MIME type ${i}` : ""), a = a || Pl(t, e), c = c || (a ? `matched initial data ${aa(e)}` : ""), n != null && n.fallbackMimeType && (a = a || cs(t, n == null ? void 0 : n.fallbackMimeType), c = c || (a ? `matched fallback MIME type ${i}` : "")), c) {
    var u;
    Il.log(1, `selectLoader selected ${(u = a) === null || u === void 0 ? void 0 : u.name}: ${c}.`);
  }
  return a;
}
function ia(e) {
  return !(e instanceof Response && e.status === 204);
}
function oa(e) {
  const t = Vn(e), n = dr(e);
  let s = "No valid loader found (";
  s += t ? `${Xo(t)}, ` : "no url provided, ", s += `MIME type: ${n ? `"${n}"` : "not provided"}, `;
  const r = e ? aa(e) : "";
  return s += r ? ` first bytes: "${r}"` : "first bytes: not available", s += ")", s;
}
function Ol(e) {
  for (const t of e)
    ra(t);
}
function Dl(e, t) {
  const n = t && xl.exec(t), s = n && n[1];
  return s ? Ll(e, s) : null;
}
function Ll(e, t) {
  t = t.toLowerCase();
  for (const n of e)
    for (const s of n.extensions)
      if (s.toLowerCase() === t)
        return n;
  return null;
}
function cs(e, t) {
  for (const n of e)
    if (n.mimeTypes && n.mimeTypes.includes(t) || t === `application/x.${n.id}`)
      return n;
  return null;
}
function Pl(e, t) {
  if (!t)
    return null;
  for (const n of e)
    if (typeof t == "string") {
      if (Gl(t, n))
        return n;
    } else if (ArrayBuffer.isView(t)) {
      if (ai(t.buffer, t.byteOffset, n))
        return n;
    } else if (t instanceof ArrayBuffer && ai(t, 0, n))
      return n;
  return null;
}
function Gl(e, t) {
  return t.testText ? t.testText(e) : (Array.isArray(t.tests) ? t.tests : [t.tests]).some((s) => e.startsWith(s));
}
function ai(e, t, n) {
  return (Array.isArray(n.tests) ? n.tests : [n.tests]).some((r) => Nl(e, t, n, r));
}
function Nl(e, t, n, s) {
  if (s instanceof ArrayBuffer)
    return _u(s, e, s.byteLength);
  switch (typeof s) {
    case "function":
      return s(e);
    case "string":
      const r = Hs(e, t, s.length);
      return s === r;
    default:
      return !1;
  }
}
function aa(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
  return typeof e == "string" ? e.slice(0, t) : ArrayBuffer.isView(e) ? Hs(e.buffer, e.byteOffset, t) : e instanceof ArrayBuffer ? Hs(e, 0, t) : "";
}
function Hs(e, t, n) {
  if (e.byteLength < t + n)
    return "";
  const s = new DataView(e);
  let r = "";
  for (let i = 0; i < n; i++)
    r += String.fromCharCode(s.getUint8(t + i));
  return r;
}
const Ul = 256 * 1024;
function* Hl(e, t) {
  const n = (t == null ? void 0 : t.chunkSize) || Ul;
  let s = 0;
  const r = new TextEncoder();
  for (; s < e.length; ) {
    const i = Math.min(e.length - s, n), o = e.slice(s, s + i);
    s += i, yield r.encode(o);
  }
}
const Jl = 256 * 1024;
function Vl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return function* () {
    const {
      chunkSize: n = Jl
    } = t;
    let s = 0;
    for (; s < e.byteLength; ) {
      const r = Math.min(e.byteLength - s, n), i = new ArrayBuffer(r), o = new Uint8Array(e, s, r);
      new Uint8Array(i).set(o), s += r, yield i;
    }
  }();
}
const jl = 1024 * 1024;
async function* kl(e, t) {
  const n = (t == null ? void 0 : t.chunkSize) || jl;
  let s = 0;
  for (; s < e.size; ) {
    const r = s + n, i = await e.slice(s, r).arrayBuffer();
    s = r, yield i;
  }
}
function ci(e, t) {
  return Jn ? Kl(e, t) : zl(e);
}
async function* Kl(e, t) {
  const n = e.getReader();
  let s;
  try {
    for (; ; ) {
      const r = s || n.read();
      t != null && t._streamReadAhead && (s = n.read());
      const {
        done: i,
        value: o
      } = await r;
      if (i)
        return;
      yield Wo(o);
    }
  } catch {
    n.releaseLock();
  }
}
async function* zl(e, t) {
  for await (const n of e)
    yield Wo(n);
}
function Wl(e, t) {
  if (typeof e == "string")
    return Hl(e, t);
  if (e instanceof ArrayBuffer)
    return Vl(e, t);
  if (se(e))
    return kl(e, t);
  if (Qo(e))
    return ci(e, t);
  if (ne(e))
    return ci(e.body, t);
  throw new Error("makeIterator");
}
const ca = "Cannot convert supplied data type";
function Xl(e, t, n) {
  if (t.text && typeof e == "string")
    return e;
  if (Ku(e) && (e = e.buffer), e instanceof ArrayBuffer) {
    const s = e;
    return t.text && !t.binary ? new TextDecoder("utf8").decode(s) : s;
  }
  if (ArrayBuffer.isView(e)) {
    if (t.text && !t.binary)
      return new TextDecoder("utf8").decode(e);
    let s = e.buffer;
    const r = e.byteLength || e.length;
    return (e.byteOffset !== 0 || r !== s.byteLength) && (s = s.slice(e.byteOffset, e.byteOffset + r)), s;
  }
  throw new Error(ca);
}
async function Ql(e, t, n) {
  const s = e instanceof ArrayBuffer || ArrayBuffer.isView(e);
  if (typeof e == "string" || s)
    return Xl(e, t);
  if (se(e) && (e = await Yo(e)), ne(e)) {
    const r = e;
    return await Zu(r), t.binary ? await r.arrayBuffer() : await r.text();
  }
  if (Qo(e) && (e = Wl(e, n)), ju(e) || ku(e))
    return Su(e);
  throw new Error(ca);
}
function ua(e, t) {
  const n = sa(), s = e || n;
  return typeof s.fetch == "function" ? s.fetch : Ke(s.fetch) ? (r) => Le(r, s.fetch) : t != null && t.fetch ? t == null ? void 0 : t.fetch : Le;
}
function ql(e, t, n) {
  if (n)
    return n;
  const s = {
    fetch: ua(t, e),
    ...e
  };
  if (s.url) {
    const r = fr(s.url);
    s.baseUrl = r, s.queryString = Yu(s.url), s.filename = Xo(r), s.baseUrl = hr(r);
  }
  return Array.isArray(s.loaders) || (s.loaders = null), s;
}
function Yl(e, t) {
  if (e && !Array.isArray(e))
    return e;
  let n;
  if (e && (n = Array.isArray(e) ? e : [e]), t && t.loaders) {
    const s = Array.isArray(t.loaders) ? t.loaders : [t.loaders];
    n = n ? [...n, ...s] : s;
  }
  return n && n.length ? n : void 0;
}
async function Sn(e, t, n, s) {
  t && !Array.isArray(t) && !mr(t) && (s = void 0, n = t, t = void 0), e = await e, n = n || {};
  const r = Vn(e), o = Yl(t, s), a = await vl(e, o, n);
  return a ? (n = Tl(n, a, o, r), s = ql({
    url: r,
    _parse: Sn,
    loaders: o
  }, n, s || null), await $l(a, e, n, s)) : null;
}
async function $l(e, t, n, s) {
  if (hu(e), n = tu(e.options, n), ne(t)) {
    const i = t, {
      ok: o,
      redirected: a,
      status: c,
      statusText: u,
      type: l,
      url: h
    } = i, f = Object.fromEntries(i.headers.entries());
    s.response = {
      headers: f,
      ok: o,
      redirected: a,
      status: c,
      statusText: u,
      type: l,
      url: h
    };
  }
  t = await Ql(t, e, n);
  const r = e;
  if (r.parseTextSync && typeof t == "string")
    return r.parseTextSync(t, n, s);
  if (Bu(e, n))
    return await Cu(e, t, n, s, Sn);
  if (r.parseText && typeof t == "string")
    return await r.parseText(t, n, s);
  if (r.parse)
    return await r.parse(t, n, s);
  throw Ht(!r.parseSync), new Error(`${e.id} loader - no parser found and worker is disabled`);
}
function Zl(e) {
  switch (e.constructor) {
    case Int8Array:
      return "int8";
    case Uint8Array:
    case Uint8ClampedArray:
      return "uint8";
    case Int16Array:
      return "int16";
    case Uint16Array:
      return "uint16";
    case Int32Array:
      return "int32";
    case Uint32Array:
      return "uint32";
    case Float32Array:
      return "float32";
    case Float64Array:
      return "float64";
    default:
      return "null";
  }
}
function th(e) {
  let t = 1 / 0, n = 1 / 0, s = 1 / 0, r = -1 / 0, i = -1 / 0, o = -1 / 0;
  const a = e.POSITION ? e.POSITION.value : [], c = a && a.length;
  for (let u = 0; u < c; u += 3) {
    const l = a[u], h = a[u + 1], f = a[u + 2];
    t = l < t ? l : t, n = h < n ? h : n, s = f < s ? f : s, r = l > r ? l : r, i = h > i ? h : i, o = f > o ? f : o;
  }
  return [[t, n, s], [r, i, o]];
}
function eh(e, t, n) {
  const s = Zl(t.value), r = n || nh(t);
  return {
    name: e,
    type: {
      type: "fixed-size-list",
      listSize: t.size,
      children: [{
        name: "value",
        type: s
      }]
    },
    nullable: !1,
    metadata: r
  };
}
function nh(e) {
  const t = {};
  return "byteOffset" in e && (t.byteOffset = e.byteOffset.toString(10)), "byteStride" in e && (t.byteStride = e.byteStride.toString(10)), "normalized" in e && (t.normalized = e.normalized.toString()), t;
}
async function ge(e, t, n, s) {
  let r, i;
  !Array.isArray(t) && !mr(t) ? (r = [], i = t) : (r = t, i = n);
  const o = ua(i);
  let a = e;
  return typeof e == "string" && (a = await o(e)), se(e) && (a = await o(e)), Array.isArray(r) ? await Sn(a, r, i) : await Sn(a, r, i);
}
const sh = 1 / Math.PI * 180, rh = 1 / 180 * Math.PI, ih = {
  EPSILON: 1e-12,
  debug: !1,
  precision: 4,
  printTypes: !1,
  printDegrees: !1,
  printRowMajor: !0,
  _cartographicRadians: !1
};
globalThis.mathgl = globalThis.mathgl || {
  config: {
    ...ih
  }
};
const $ = globalThis.mathgl.config;
function oh(e, {
  precision: t = $.precision
} = {}) {
  return e = hh(e), "".concat(parseFloat(e.toPrecision(t)));
}
function te(e) {
  return Array.isArray(e) || ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function ah(e) {
  return uh(e);
}
function ch(e) {
  return wt(e);
}
function uh(e, t) {
  return gr(e, (n) => n * rh, t);
}
function wt(e, t) {
  return gr(e, (n) => n * sh, t);
}
function lh(e, t, n) {
  return gr(e, (s) => Math.max(t, Math.min(n, s)));
}
function kt(e, t, n) {
  const s = $.EPSILON;
  n && ($.EPSILON = n);
  try {
    if (e === t)
      return !0;
    if (te(e) && te(t)) {
      if (e.length !== t.length)
        return !1;
      for (let r = 0; r < e.length; ++r)
        if (!kt(e[r], t[r]))
          return !1;
      return !0;
    }
    return e && e.equals ? e.equals(t) : t && t.equals ? t.equals(e) : typeof e == "number" && typeof t == "number" ? Math.abs(e - t) <= $.EPSILON * Math.max(1, Math.abs(e), Math.abs(t)) : !1;
  } finally {
    $.EPSILON = s;
  }
}
function hh(e) {
  return Math.round(e / $.EPSILON) * $.EPSILON;
}
function fh(e) {
  return e.clone ? e.clone() : new Array(e.length);
}
function gr(e, t, n) {
  if (te(e)) {
    const s = e;
    n = n || fh(s);
    for (let r = 0; r < n.length && r < s.length; ++r) {
      const i = typeof e == "number" ? e : e[r];
      n[r] = t(i, r, n);
    }
    return n;
  }
  return t(e);
}
function dh(e) {
  function t() {
    var n = Reflect.construct(e, Array.from(arguments));
    return Object.setPrototypeOf(n, Object.getPrototypeOf(this)), n;
  }
  return t.prototype = Object.create(e.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e, t;
}
class Ar extends dh(Array) {
  clone() {
    return new this.constructor().copy(this);
  }
  fromArray(t, n = 0) {
    for (let s = 0; s < this.ELEMENTS; ++s)
      this[s] = t[s + n];
    return this.check();
  }
  toArray(t = [], n = 0) {
    for (let s = 0; s < this.ELEMENTS; ++s)
      t[n + s] = this[s];
    return t;
  }
  toObject(t) {
    return t;
  }
  from(t) {
    return Array.isArray(t) ? this.copy(t) : this.fromObject(t);
  }
  to(t) {
    return t === this ? this : te(t) ? this.toArray(t) : this.toObject(t);
  }
  toTarget(t) {
    return t ? this.to(t) : this;
  }
  toFloat32Array() {
    return new Float32Array(this);
  }
  toString() {
    return this.formatString($);
  }
  formatString(t) {
    let n = "";
    for (let s = 0; s < this.ELEMENTS; ++s)
      n += (s > 0 ? ", " : "") + oh(this[s], t);
    return "".concat(t.printTypes ? this.constructor.name : "", "[").concat(n, "]");
  }
  equals(t) {
    if (!t || this.length !== t.length)
      return !1;
    for (let n = 0; n < this.ELEMENTS; ++n)
      if (!kt(this[n], t[n]))
        return !1;
    return !0;
  }
  exactEquals(t) {
    if (!t || this.length !== t.length)
      return !1;
    for (let n = 0; n < this.ELEMENTS; ++n)
      if (this[n] !== t[n])
        return !1;
    return !0;
  }
  negate() {
    for (let t = 0; t < this.ELEMENTS; ++t)
      this[t] = -this[t];
    return this.check();
  }
  lerp(t, n, s) {
    if (s === void 0)
      return this.lerp(this, t, n);
    for (let r = 0; r < this.ELEMENTS; ++r) {
      const i = t[r], o = typeof n == "number" ? n : n[r];
      this[r] = i + s * (o - i);
    }
    return this.check();
  }
  min(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] = Math.min(t[n], this[n]);
    return this.check();
  }
  max(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] = Math.max(t[n], this[n]);
    return this.check();
  }
  clamp(t, n) {
    for (let s = 0; s < this.ELEMENTS; ++s)
      this[s] = Math.min(Math.max(this[s], t[s]), n[s]);
    return this.check();
  }
  add(...t) {
    for (const n of t)
      for (let s = 0; s < this.ELEMENTS; ++s)
        this[s] += n[s];
    return this.check();
  }
  subtract(...t) {
    for (const n of t)
      for (let s = 0; s < this.ELEMENTS; ++s)
        this[s] -= n[s];
    return this.check();
  }
  scale(t) {
    if (typeof t == "number")
      for (let n = 0; n < this.ELEMENTS; ++n)
        this[n] *= t;
    else
      for (let n = 0; n < this.ELEMENTS && n < t.length; ++n)
        this[n] *= t[n];
    return this.check();
  }
  multiplyByScalar(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] *= t;
    return this.check();
  }
  check() {
    if ($.debug && !this.validate())
      throw new Error("math.gl: ".concat(this.constructor.name, " some fields set to invalid numbers'"));
    return this;
  }
  validate() {
    let t = this.length === this.ELEMENTS;
    for (let n = 0; n < this.ELEMENTS; ++n)
      t = t && Number.isFinite(this[n]);
    return t;
  }
  sub(t) {
    return this.subtract(t);
  }
  setScalar(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] = t;
    return this.check();
  }
  addScalar(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] += t;
    return this.check();
  }
  subScalar(t) {
    return this.addScalar(-t);
  }
  multiplyScalar(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] *= t;
    return this.check();
  }
  divideScalar(t) {
    return this.multiplyByScalar(1 / t);
  }
  clampScalar(t, n) {
    for (let s = 0; s < this.ELEMENTS; ++s)
      this[s] = Math.min(Math.max(this[s], t), n);
    return this.check();
  }
  get elements() {
    return this;
  }
}
function mh(e, t) {
  if (e.length !== t)
    return !1;
  for (let n = 0; n < e.length; ++n)
    if (!Number.isFinite(e[n]))
      return !1;
  return !0;
}
function N(e) {
  if (!Number.isFinite(e))
    throw new Error("Invalid number ".concat(JSON.stringify(e)));
  return e;
}
function ve(e, t, n = "") {
  if ($.debug && !mh(e, t))
    throw new Error("math.gl: ".concat(n, " some fields set to invalid numbers'"));
  return e;
}
function j(e, t) {
  if (!e)
    throw new Error("math.gl assertion ".concat(t));
}
class pr extends Ar {
  get x() {
    return this[0];
  }
  set x(t) {
    this[0] = N(t);
  }
  get y() {
    return this[1];
  }
  set y(t) {
    this[1] = N(t);
  }
  len() {
    return Math.sqrt(this.lengthSquared());
  }
  magnitude() {
    return this.len();
  }
  lengthSquared() {
    let t = 0;
    for (let n = 0; n < this.ELEMENTS; ++n)
      t += this[n] * this[n];
    return t;
  }
  magnitudeSquared() {
    return this.lengthSquared();
  }
  distance(t) {
    return Math.sqrt(this.distanceSquared(t));
  }
  distanceSquared(t) {
    let n = 0;
    for (let s = 0; s < this.ELEMENTS; ++s) {
      const r = this[s] - t[s];
      n += r * r;
    }
    return N(n);
  }
  dot(t) {
    let n = 0;
    for (let s = 0; s < this.ELEMENTS; ++s)
      n += this[s] * t[s];
    return N(n);
  }
  normalize() {
    const t = this.magnitude();
    if (t !== 0)
      for (let n = 0; n < this.ELEMENTS; ++n)
        this[n] /= t;
    return this.check();
  }
  multiply(...t) {
    for (const n of t)
      for (let s = 0; s < this.ELEMENTS; ++s)
        this[s] *= n[s];
    return this.check();
  }
  divide(...t) {
    for (const n of t)
      for (let s = 0; s < this.ELEMENTS; ++s)
        this[s] /= n[s];
    return this.check();
  }
  lengthSq() {
    return this.lengthSquared();
  }
  distanceTo(t) {
    return this.distance(t);
  }
  distanceToSquared(t) {
    return this.distanceSquared(t);
  }
  getComponent(t) {
    return j(t >= 0 && t < this.ELEMENTS, "index is out of range"), N(this[t]);
  }
  setComponent(t, n) {
    return j(t >= 0 && t < this.ELEMENTS, "index is out of range"), this[t] = n, this.check();
  }
  addVectors(t, n) {
    return this.copy(t).add(n);
  }
  subVectors(t, n) {
    return this.copy(t).subtract(n);
  }
  multiplyVectors(t, n) {
    return this.copy(t).multiply(n);
  }
  addScaledVector(t, n) {
    return this.add(new this.constructor(t).multiplyScalar(n));
  }
}
const Fe = 1e-6;
let St = typeof Float32Array < "u" ? Float32Array : Array;
function gh() {
  const e = new St(2);
  return St != Float32Array && (e[0] = 0, e[1] = 0), e;
}
function Ah(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e;
}
function ph(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r + n[4], e[1] = n[1] * s + n[3] * r + n[5], e;
}
function la(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[3] * r + n[6], e[1] = n[1] * s + n[4] * r + n[7], e;
}
function ha(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[4] * r + n[12], e[1] = n[1] * s + n[5] * r + n[13], e;
}
(function() {
  const e = gh();
  return function(t, n, s, r, i, o) {
    let a, c;
    for (n || (n = 2), s || (s = 0), r ? c = Math.min(r * n + s, t.length) : c = t.length, a = s; a < c; a += n)
      e[0] = t[a], e[1] = t[a + 1], i(e, e, o), t[a] = e[0], t[a + 1] = e[1];
    return t;
  };
})();
function fa(e, t, n) {
  const s = t[0], r = t[1], i = n[3] * s + n[7] * r || 1;
  return e[0] = (n[0] * s + n[4] * r) / i, e[1] = (n[1] * s + n[5] * r) / i, e;
}
function da(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[3] * s + n[7] * r + n[11] * i || 1;
  return e[0] = (n[0] * s + n[4] * r + n[8] * i) / o, e[1] = (n[1] * s + n[5] * r + n[9] * i) / o, e[2] = (n[2] * s + n[6] * r + n[10] * i) / o, e;
}
function yh(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e[2] = t[2], e;
}
function Bh(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e[2] = t[2], e[3] = t[3], e;
}
function ma(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  return e[0] = n[0] * s + n[3] * r + n[6] * i, e[1] = n[1] * s + n[4] * r + n[7] * i, e[2] = n[2] * s + n[5] * r + n[8] * i, e[3] = t[3], e;
}
class kn extends pr {
  constructor(t = 0, n = 0) {
    super(2), te(t) && arguments.length === 1 ? this.copy(t) : ($.debug && (N(t), N(n)), this[0] = t, this[1] = n);
  }
  set(t, n) {
    return this[0] = t, this[1] = n, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this.check();
  }
  fromObject(t) {
    return $.debug && (N(t.x), N(t.y)), this[0] = t.x, this[1] = t.y, this.check();
  }
  toObject(t) {
    return t.x = this[0], t.y = this[1], t;
  }
  get ELEMENTS() {
    return 2;
  }
  horizontalAngle() {
    return Math.atan2(this.y, this.x);
  }
  verticalAngle() {
    return Math.atan2(this.x, this.y);
  }
  transform(t) {
    return this.transformAsPoint(t);
  }
  transformAsPoint(t) {
    return ha(this, this, t), this.check();
  }
  transformAsVector(t) {
    return fa(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return la(this, this, t), this.check();
  }
  transformByMatrix2x3(t) {
    return ph(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return Ah(this, this, t), this.check();
  }
}
function ga() {
  const e = new St(3);
  return St != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e;
}
function Aa(e) {
  const t = e[0], n = e[1], s = e[2];
  return Math.sqrt(t * t + n * n + s * s);
}
function ui(e, t, n) {
  const s = new St(3);
  return s[0] = e, s[1] = t, s[2] = n, s;
}
function Ch(e, t) {
  const n = t[0], s = t[1], r = t[2];
  let i = n * n + s * s + r * r;
  return i > 0 && (i = 1 / Math.sqrt(i)), e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e;
}
function yr(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
}
function Bn(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[0], a = n[1], c = n[2];
  return e[0] = r * c - i * a, e[1] = i * o - s * c, e[2] = s * a - r * o, e;
}
function Br(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  let o = n[3] * s + n[7] * r + n[11] * i + n[15];
  return o = o || 1, e[0] = (n[0] * s + n[4] * r + n[8] * i + n[12]) / o, e[1] = (n[1] * s + n[5] * r + n[9] * i + n[13]) / o, e[2] = (n[2] * s + n[6] * r + n[10] * i + n[14]) / o, e;
}
function pa(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  return e[0] = s * n[0] + r * n[3] + i * n[6], e[1] = s * n[1] + r * n[4] + i * n[7], e[2] = s * n[2] + r * n[5] + i * n[8], e;
}
function ya(e, t, n) {
  const s = n[0], r = n[1], i = n[2], o = n[3], a = t[0], c = t[1], u = t[2];
  let l = r * u - i * c, h = i * a - s * u, f = s * c - r * a, d = r * f - i * h, m = i * l - s * f, g = s * h - r * l;
  const p = o * 2;
  return l *= p, h *= p, f *= p, d *= 2, m *= 2, g *= 2, e[0] = a + l + d, e[1] = c + h + m, e[2] = u + f + g, e;
}
function Eh(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[0], i[1] = r[1] * Math.cos(s) - r[2] * Math.sin(s), i[2] = r[1] * Math.sin(s) + r[2] * Math.cos(s), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function Th(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[2] * Math.sin(s) + r[0] * Math.cos(s), i[1] = r[1], i[2] = r[2] * Math.cos(s) - r[0] * Math.sin(s), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function bh(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[0] * Math.cos(s) - r[1] * Math.sin(s), i[1] = r[0] * Math.sin(s) + r[1] * Math.cos(s), i[2] = r[2], e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function _h(e, t) {
  const n = e[0], s = e[1], r = e[2], i = t[0], o = t[1], a = t[2], c = Math.sqrt((n * n + s * s + r * r) * (i * i + o * o + a * a)), u = c && yr(e, t) / c;
  return Math.acos(Math.min(Math.max(u, -1), 1));
}
const wh = Aa;
(function() {
  const e = ga();
  return function(t, n, s, r, i, o) {
    let a, c;
    for (n || (n = 3), s || (s = 0), r ? c = Math.min(r * n + s, t.length) : c = t.length, a = s; a < c; a += n)
      e[0] = t[a], e[1] = t[a + 1], e[2] = t[a + 2], i(e, e, o), t[a] = e[0], t[a + 1] = e[1], t[a + 2] = e[2];
    return t;
  };
})();
const us = [0, 0, 0];
let $e;
class A extends pr {
  static get ZERO() {
    return $e || ($e = new A(0, 0, 0), Object.freeze($e)), $e;
  }
  constructor(t = 0, n = 0, s = 0) {
    super(-0, -0, -0), arguments.length === 1 && te(t) ? this.copy(t) : ($.debug && (N(t), N(n), N(s)), this[0] = t, this[1] = n, this[2] = s);
  }
  set(t, n, s) {
    return this[0] = t, this[1] = n, this[2] = s, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this.check();
  }
  fromObject(t) {
    return $.debug && (N(t.x), N(t.y), N(t.z)), this[0] = t.x, this[1] = t.y, this[2] = t.z, this.check();
  }
  toObject(t) {
    return t.x = this[0], t.y = this[1], t.z = this[2], t;
  }
  get ELEMENTS() {
    return 3;
  }
  get z() {
    return this[2];
  }
  set z(t) {
    this[2] = N(t);
  }
  angle(t) {
    return _h(this, t);
  }
  cross(t) {
    return Bn(this, this, t), this.check();
  }
  rotateX({
    radians: t,
    origin: n = us
  }) {
    return Eh(this, this, n, t), this.check();
  }
  rotateY({
    radians: t,
    origin: n = us
  }) {
    return Th(this, this, n, t), this.check();
  }
  rotateZ({
    radians: t,
    origin: n = us
  }) {
    return bh(this, this, n, t), this.check();
  }
  transform(t) {
    return this.transformAsPoint(t);
  }
  transformAsPoint(t) {
    return Br(this, this, t), this.check();
  }
  transformAsVector(t) {
    return da(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return pa(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return yh(this, this, t), this.check();
  }
  transformByQuaternion(t) {
    return ya(this, this, t), this.check();
  }
}
let Ze;
class Cr extends pr {
  static get ZERO() {
    return Ze || (Ze = new Cr(0, 0, 0, 0), Object.freeze(Ze)), Ze;
  }
  constructor(t = 0, n = 0, s = 0, r = 0) {
    super(-0, -0, -0, -0), te(t) && arguments.length === 1 ? this.copy(t) : ($.debug && (N(t), N(n), N(s), N(r)), this[0] = t, this[1] = n, this[2] = s, this[3] = r);
  }
  set(t, n, s, r) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this.check();
  }
  fromObject(t) {
    return $.debug && (N(t.x), N(t.y), N(t.z), N(t.w)), this[0] = t.x, this[1] = t.y, this[2] = t.z, this[3] = t.w, this;
  }
  toObject(t) {
    return t.x = this[0], t.y = this[1], t.z = this[2], t.w = this[3], t;
  }
  get ELEMENTS() {
    return 4;
  }
  get z() {
    return this[2];
  }
  set z(t) {
    this[2] = N(t);
  }
  get w() {
    return this[3];
  }
  set w(t) {
    this[3] = N(t);
  }
  transform(t) {
    return Br(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return ma(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return Bh(this, this, t), this.check();
  }
  transformByQuaternion(t) {
    return ya(this, this, t), this.check();
  }
  applyMatrix4(t) {
    return t.transform(this, this), this;
  }
}
class Ba extends Ar {
  toString() {
    let t = "[";
    if ($.printRowMajor) {
      t += "row-major:";
      for (let n = 0; n < this.RANK; ++n)
        for (let s = 0; s < this.RANK; ++s)
          t += " ".concat(this[s * this.RANK + n]);
    } else {
      t += "column-major:";
      for (let n = 0; n < this.ELEMENTS; ++n)
        t += " ".concat(this[n]);
    }
    return t += "]", t;
  }
  getElementIndex(t, n) {
    return n * this.RANK + t;
  }
  getElement(t, n) {
    return this[n * this.RANK + t];
  }
  setElement(t, n, s) {
    return this[n * this.RANK + t] = N(s), this;
  }
  getColumn(t, n = new Array(this.RANK).fill(-0)) {
    const s = t * this.RANK;
    for (let r = 0; r < this.RANK; ++r)
      n[r] = this[s + r];
    return n;
  }
  setColumn(t, n) {
    const s = t * this.RANK;
    for (let r = 0; r < this.RANK; ++r)
      this[s + r] = n[r];
    return this;
  }
}
function Rh() {
  const e = new St(9);
  return St != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1, e;
}
function Mh(e, t) {
  if (e === t) {
    const n = t[1], s = t[2], r = t[5];
    e[1] = t[3], e[2] = t[6], e[3] = n, e[5] = t[7], e[6] = s, e[7] = r;
  } else
    e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
  return e;
}
function Sh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], a = t[5], c = t[6], u = t[7], l = t[8], h = l * o - a * u, f = -l * i + a * c, d = u * i - o * c;
  let m = n * h + s * f + r * d;
  return m ? (m = 1 / m, e[0] = h * m, e[1] = (-l * s + r * u) * m, e[2] = (a * s - r * o) * m, e[3] = f * m, e[4] = (l * n - r * c) * m, e[5] = (-a * n + r * i) * m, e[6] = d * m, e[7] = (-u * n + s * c) * m, e[8] = (o * n - s * i) * m, e) : null;
}
function Ih(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3], i = e[4], o = e[5], a = e[6], c = e[7], u = e[8];
  return t * (u * i - o * c) + n * (-u * r + o * a) + s * (c * r - i * a);
}
function li(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = n[0], d = n[1], m = n[2], g = n[3], p = n[4], C = n[5], w = n[6], y = n[7], B = n[8];
  return e[0] = f * s + d * o + m * u, e[1] = f * r + d * a + m * l, e[2] = f * i + d * c + m * h, e[3] = g * s + p * o + C * u, e[4] = g * r + p * a + C * l, e[5] = g * i + p * c + C * h, e[6] = w * s + y * o + B * u, e[7] = w * r + y * a + B * l, e[8] = w * i + y * c + B * h, e;
}
function xh(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = n[0], d = n[1];
  return e[0] = s, e[1] = r, e[2] = i, e[3] = o, e[4] = a, e[5] = c, e[6] = f * s + d * o + u, e[7] = f * r + d * a + l, e[8] = f * i + d * c + h, e;
}
function vh(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = Math.sin(n), d = Math.cos(n);
  return e[0] = d * s + f * o, e[1] = d * r + f * a, e[2] = d * i + f * c, e[3] = d * o - f * s, e[4] = d * a - f * r, e[5] = d * c - f * i, e[6] = u, e[7] = l, e[8] = h, e;
}
function hi(e, t, n) {
  const s = n[0], r = n[1];
  return e[0] = s * t[0], e[1] = s * t[1], e[2] = s * t[2], e[3] = r * t[3], e[4] = r * t[4], e[5] = r * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
}
function Fh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n + n, a = s + s, c = r + r, u = n * o, l = s * o, h = s * a, f = r * o, d = r * a, m = r * c, g = i * o, p = i * a, C = i * c;
  return e[0] = 1 - h - m, e[3] = l - C, e[6] = f + p, e[1] = l + C, e[4] = 1 - u - m, e[7] = d - g, e[2] = f - p, e[5] = d + g, e[8] = 1 - u - h, e;
}
var Js;
(function(e) {
  e[e.COL0ROW0 = 0] = "COL0ROW0", e[e.COL0ROW1 = 1] = "COL0ROW1", e[e.COL0ROW2 = 2] = "COL0ROW2", e[e.COL1ROW0 = 3] = "COL1ROW0", e[e.COL1ROW1 = 4] = "COL1ROW1", e[e.COL1ROW2 = 5] = "COL1ROW2", e[e.COL2ROW0 = 6] = "COL2ROW0", e[e.COL2ROW1 = 7] = "COL2ROW1", e[e.COL2ROW2 = 8] = "COL2ROW2";
})(Js || (Js = {}));
const Oh = Object.freeze([1, 0, 0, 0, 1, 0, 0, 0, 1]);
class z extends Ba {
  static get IDENTITY() {
    return Lh();
  }
  static get ZERO() {
    return Dh();
  }
  get ELEMENTS() {
    return 9;
  }
  get RANK() {
    return 3;
  }
  get INDICES() {
    return Js;
  }
  constructor(t, ...n) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0), arguments.length === 1 && Array.isArray(t) ? this.copy(t) : n.length > 0 ? this.copy([t, ...n]) : this.identity();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this[4] = t[4], this[5] = t[5], this[6] = t[6], this[7] = t[7], this[8] = t[8], this.check();
  }
  identity() {
    return this.copy(Oh);
  }
  fromObject(t) {
    return this.check();
  }
  fromQuaternion(t) {
    return Fh(this, t), this.check();
  }
  set(t, n, s, r, i, o, a, c, u) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this[4] = i, this[5] = o, this[6] = a, this[7] = c, this[8] = u, this.check();
  }
  setRowMajor(t, n, s, r, i, o, a, c, u) {
    return this[0] = t, this[1] = r, this[2] = a, this[3] = n, this[4] = i, this[5] = c, this[6] = s, this[7] = o, this[8] = u, this.check();
  }
  determinant() {
    return Ih(this);
  }
  transpose() {
    return Mh(this, this), this.check();
  }
  invert() {
    return Sh(this, this), this.check();
  }
  multiplyLeft(t) {
    return li(this, t, this), this.check();
  }
  multiplyRight(t) {
    return li(this, this, t), this.check();
  }
  rotate(t) {
    return vh(this, this, t), this.check();
  }
  scale(t) {
    return Array.isArray(t) ? hi(this, this, t) : hi(this, this, [t, t]), this.check();
  }
  translate(t) {
    return xh(this, this, t), this.check();
  }
  transform(t, n) {
    let s;
    switch (t.length) {
      case 2:
        s = la(n || [-0, -0], t, this);
        break;
      case 3:
        s = pa(n || [-0, -0, -0], t, this);
        break;
      case 4:
        s = ma(n || [-0, -0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return ve(s, t.length), s;
  }
  transformVector(t, n) {
    return this.transform(t, n);
  }
  transformVector2(t, n) {
    return this.transform(t, n);
  }
  transformVector3(t, n) {
    return this.transform(t, n);
  }
}
let tn, en = null;
function Dh() {
  return tn || (tn = new z([0, 0, 0, 0, 0, 0, 0, 0, 0]), Object.freeze(tn)), tn;
}
function Lh() {
  return en || (en = new z(), Object.freeze(en)), en;
}
function Ph(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Gh(e, t) {
  if (e === t) {
    const n = t[1], s = t[2], r = t[3], i = t[6], o = t[7], a = t[11];
    e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = n, e[6] = t[9], e[7] = t[13], e[8] = s, e[9] = i, e[11] = t[14], e[12] = r, e[13] = o, e[14] = a;
  } else
    e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
  return e;
}
function Nh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], a = t[5], c = t[6], u = t[7], l = t[8], h = t[9], f = t[10], d = t[11], m = t[12], g = t[13], p = t[14], C = t[15], w = n * a - s * o, y = n * c - r * o, B = n * u - i * o, R = s * c - r * a, T = s * u - i * a, v = r * u - i * c, F = l * g - h * m, x = l * p - f * m, D = l * C - d * m, k = h * p - f * g, W = h * C - d * g, X = f * C - d * p;
  let L = w * X - y * W + B * k + R * D - T * x + v * F;
  return L ? (L = 1 / L, e[0] = (a * X - c * W + u * k) * L, e[1] = (r * W - s * X - i * k) * L, e[2] = (g * v - p * T + C * R) * L, e[3] = (f * T - h * v - d * R) * L, e[4] = (c * D - o * X - u * x) * L, e[5] = (n * X - r * D + i * x) * L, e[6] = (p * B - m * v - C * y) * L, e[7] = (l * v - f * B + d * y) * L, e[8] = (o * W - a * D + u * F) * L, e[9] = (s * D - n * W - i * F) * L, e[10] = (m * T - g * B + C * w) * L, e[11] = (h * B - l * T - d * w) * L, e[12] = (a * x - o * k - c * F) * L, e[13] = (n * k - s * x + r * F) * L, e[14] = (g * y - m * R - p * w) * L, e[15] = (l * R - h * y + f * w) * L, e) : null;
}
function Uh(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3], i = e[4], o = e[5], a = e[6], c = e[7], u = e[8], l = e[9], h = e[10], f = e[11], d = e[12], m = e[13], g = e[14], p = e[15], C = t * o - n * i, w = t * a - s * i, y = n * a - s * o, B = u * m - l * d, R = u * g - h * d, T = l * g - h * m, v = t * T - n * R + s * B, F = i * T - o * R + a * B, x = u * y - l * w + h * C, D = d * y - m * w + g * C;
  return c * v - r * F + p * x - f * D;
}
function fi(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = t[9], d = t[10], m = t[11], g = t[12], p = t[13], C = t[14], w = t[15];
  let y = n[0], B = n[1], R = n[2], T = n[3];
  return e[0] = y * s + B * a + R * h + T * g, e[1] = y * r + B * c + R * f + T * p, e[2] = y * i + B * u + R * d + T * C, e[3] = y * o + B * l + R * m + T * w, y = n[4], B = n[5], R = n[6], T = n[7], e[4] = y * s + B * a + R * h + T * g, e[5] = y * r + B * c + R * f + T * p, e[6] = y * i + B * u + R * d + T * C, e[7] = y * o + B * l + R * m + T * w, y = n[8], B = n[9], R = n[10], T = n[11], e[8] = y * s + B * a + R * h + T * g, e[9] = y * r + B * c + R * f + T * p, e[10] = y * i + B * u + R * d + T * C, e[11] = y * o + B * l + R * m + T * w, y = n[12], B = n[13], R = n[14], T = n[15], e[12] = y * s + B * a + R * h + T * g, e[13] = y * r + B * c + R * f + T * p, e[14] = y * i + B * u + R * d + T * C, e[15] = y * o + B * l + R * m + T * w, e;
}
function Hh(e, t, n) {
  const s = n[0], r = n[1], i = n[2];
  let o, a, c, u, l, h, f, d, m, g, p, C;
  return t === e ? (e[12] = t[0] * s + t[4] * r + t[8] * i + t[12], e[13] = t[1] * s + t[5] * r + t[9] * i + t[13], e[14] = t[2] * s + t[6] * r + t[10] * i + t[14], e[15] = t[3] * s + t[7] * r + t[11] * i + t[15]) : (o = t[0], a = t[1], c = t[2], u = t[3], l = t[4], h = t[5], f = t[6], d = t[7], m = t[8], g = t[9], p = t[10], C = t[11], e[0] = o, e[1] = a, e[2] = c, e[3] = u, e[4] = l, e[5] = h, e[6] = f, e[7] = d, e[8] = m, e[9] = g, e[10] = p, e[11] = C, e[12] = o * s + l * r + m * i + t[12], e[13] = a * s + h * r + g * i + t[13], e[14] = c * s + f * r + p * i + t[14], e[15] = u * s + d * r + C * i + t[15]), e;
}
function Jh(e, t, n) {
  const s = n[0], r = n[1], i = n[2];
  return e[0] = t[0] * s, e[1] = t[1] * s, e[2] = t[2] * s, e[3] = t[3] * s, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * i, e[9] = t[9] * i, e[10] = t[10] * i, e[11] = t[11] * i, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function Vh(e, t, n, s) {
  let r = s[0], i = s[1], o = s[2], a = Math.sqrt(r * r + i * i + o * o), c, u, l, h, f, d, m, g, p, C, w, y, B, R, T, v, F, x, D, k, W, X, L, ot;
  return a < Fe ? null : (a = 1 / a, r *= a, i *= a, o *= a, u = Math.sin(n), c = Math.cos(n), l = 1 - c, h = t[0], f = t[1], d = t[2], m = t[3], g = t[4], p = t[5], C = t[6], w = t[7], y = t[8], B = t[9], R = t[10], T = t[11], v = r * r * l + c, F = i * r * l + o * u, x = o * r * l - i * u, D = r * i * l - o * u, k = i * i * l + c, W = o * i * l + r * u, X = r * o * l + i * u, L = i * o * l - r * u, ot = o * o * l + c, e[0] = h * v + g * F + y * x, e[1] = f * v + p * F + B * x, e[2] = d * v + C * F + R * x, e[3] = m * v + w * F + T * x, e[4] = h * D + g * k + y * W, e[5] = f * D + p * k + B * W, e[6] = d * D + C * k + R * W, e[7] = m * D + w * k + T * W, e[8] = h * X + g * L + y * ot, e[9] = f * X + p * L + B * ot, e[10] = d * X + C * L + R * ot, e[11] = m * X + w * L + T * ot, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e);
}
function jh(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[4], o = t[5], a = t[6], c = t[7], u = t[8], l = t[9], h = t[10], f = t[11];
  return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = i * r + u * s, e[5] = o * r + l * s, e[6] = a * r + h * s, e[7] = c * r + f * s, e[8] = u * r - i * s, e[9] = l * r - o * s, e[10] = h * r - a * s, e[11] = f * r - c * s, e;
}
function kh(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[0], o = t[1], a = t[2], c = t[3], u = t[8], l = t[9], h = t[10], f = t[11];
  return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * r - u * s, e[1] = o * r - l * s, e[2] = a * r - h * s, e[3] = c * r - f * s, e[8] = i * s + u * r, e[9] = o * s + l * r, e[10] = a * s + h * r, e[11] = c * s + f * r, e;
}
function Kh(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[0], o = t[1], a = t[2], c = t[3], u = t[4], l = t[5], h = t[6], f = t[7];
  return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * r + u * s, e[1] = o * r + l * s, e[2] = a * r + h * s, e[3] = c * r + f * s, e[4] = u * r - i * s, e[5] = l * r - o * s, e[6] = h * r - a * s, e[7] = f * r - c * s, e;
}
function zh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[4], o = t[5], a = t[6], c = t[8], u = t[9], l = t[10];
  return e[0] = Math.sqrt(n * n + s * s + r * r), e[1] = Math.sqrt(i * i + o * o + a * a), e[2] = Math.sqrt(c * c + u * u + l * l), e;
}
function Wh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n + n, a = s + s, c = r + r, u = n * o, l = s * o, h = s * a, f = r * o, d = r * a, m = r * c, g = i * o, p = i * a, C = i * c;
  return e[0] = 1 - h - m, e[1] = l + C, e[2] = f - p, e[3] = 0, e[4] = l - C, e[5] = 1 - u - m, e[6] = d + g, e[7] = 0, e[8] = f + p, e[9] = d - g, e[10] = 1 - u - h, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Xh(e, t, n, s, r, i, o) {
  const a = 1 / (n - t), c = 1 / (r - s), u = 1 / (i - o);
  return e[0] = i * 2 * a, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i * 2 * c, e[6] = 0, e[7] = 0, e[8] = (n + t) * a, e[9] = (r + s) * c, e[10] = (o + i) * u, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = o * i * 2 * u, e[15] = 0, e;
}
function Qh(e, t, n, s, r) {
  const i = 1 / Math.tan(t / 2);
  if (e[0] = i / n, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, r != null && r !== 1 / 0) {
    const o = 1 / (s - r);
    e[10] = (r + s) * o, e[14] = 2 * r * s * o;
  } else
    e[10] = -1, e[14] = -2 * s;
  return e;
}
const qh = Qh;
function Yh(e, t, n, s, r, i, o) {
  const a = 1 / (t - n), c = 1 / (s - r), u = 1 / (i - o);
  return e[0] = -2 * a, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * c, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * u, e[11] = 0, e[12] = (t + n) * a, e[13] = (r + s) * c, e[14] = (o + i) * u, e[15] = 1, e;
}
const $h = Yh;
function Zh(e, t, n, s) {
  let r, i, o, a, c, u, l, h, f, d;
  const m = t[0], g = t[1], p = t[2], C = s[0], w = s[1], y = s[2], B = n[0], R = n[1], T = n[2];
  return Math.abs(m - B) < Fe && Math.abs(g - R) < Fe && Math.abs(p - T) < Fe ? Ph(e) : (h = m - B, f = g - R, d = p - T, r = 1 / Math.sqrt(h * h + f * f + d * d), h *= r, f *= r, d *= r, i = w * d - y * f, o = y * h - C * d, a = C * f - w * h, r = Math.sqrt(i * i + o * o + a * a), r ? (r = 1 / r, i *= r, o *= r, a *= r) : (i = 0, o = 0, a = 0), c = f * a - d * o, u = d * i - h * a, l = h * o - f * i, r = Math.sqrt(c * c + u * u + l * l), r ? (r = 1 / r, c *= r, u *= r, l *= r) : (c = 0, u = 0, l = 0), e[0] = i, e[1] = c, e[2] = h, e[3] = 0, e[4] = o, e[5] = u, e[6] = f, e[7] = 0, e[8] = a, e[9] = l, e[10] = d, e[11] = 0, e[12] = -(i * m + o * g + a * p), e[13] = -(c * m + u * g + l * p), e[14] = -(h * m + f * g + d * p), e[15] = 1, e);
}
function tf() {
  const e = new St(4);
  return St != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e;
}
function ef(e, t, n) {
  return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e;
}
function nf(e, t, n) {
  return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e;
}
function sf(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3];
  return Math.sqrt(t * t + n * n + s * s + r * r);
}
function rf(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3];
  return t * t + n * n + s * s + r * r;
}
function of(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3];
  let o = n * n + s * s + r * r + i * i;
  return o > 0 && (o = 1 / Math.sqrt(o)), e[0] = n * o, e[1] = s * o, e[2] = r * o, e[3] = i * o, e;
}
function af(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
}
function cf(e, t, n, s) {
  const r = t[0], i = t[1], o = t[2], a = t[3];
  return e[0] = r + s * (n[0] - r), e[1] = i + s * (n[1] - i), e[2] = o + s * (n[2] - o), e[3] = a + s * (n[3] - a), e;
}
function uf(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3];
  return e[0] = n[0] * s + n[4] * r + n[8] * i + n[12] * o, e[1] = n[1] * s + n[5] * r + n[9] * i + n[13] * o, e[2] = n[2] * s + n[6] * r + n[10] * i + n[14] * o, e[3] = n[3] * s + n[7] * r + n[11] * i + n[15] * o, e;
}
function lf(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[0], a = n[1], c = n[2], u = n[3], l = u * s + a * i - c * r, h = u * r + c * s - o * i, f = u * i + o * r - a * s, d = -o * s - a * r - c * i;
  return e[0] = l * u + d * -o + h * -c - f * -a, e[1] = h * u + d * -a + f * -o - l * -c, e[2] = f * u + d * -c + l * -a - h * -o, e[3] = t[3], e;
}
(function() {
  const e = tf();
  return function(t, n, s, r, i, o) {
    let a, c;
    for (n || (n = 4), s || (s = 0), r ? c = Math.min(r * n + s, t.length) : c = t.length, a = s; a < c; a += n)
      e[0] = t[a], e[1] = t[a + 1], e[2] = t[a + 2], e[3] = t[a + 3], i(e, e, o), t[a] = e[0], t[a + 1] = e[1], t[a + 2] = e[2], t[a + 3] = e[3];
    return t;
  };
})();
var Vs;
(function(e) {
  e[e.COL0ROW0 = 0] = "COL0ROW0", e[e.COL0ROW1 = 1] = "COL0ROW1", e[e.COL0ROW2 = 2] = "COL0ROW2", e[e.COL0ROW3 = 3] = "COL0ROW3", e[e.COL1ROW0 = 4] = "COL1ROW0", e[e.COL1ROW1 = 5] = "COL1ROW1", e[e.COL1ROW2 = 6] = "COL1ROW2", e[e.COL1ROW3 = 7] = "COL1ROW3", e[e.COL2ROW0 = 8] = "COL2ROW0", e[e.COL2ROW1 = 9] = "COL2ROW1", e[e.COL2ROW2 = 10] = "COL2ROW2", e[e.COL2ROW3 = 11] = "COL2ROW3", e[e.COL3ROW0 = 12] = "COL3ROW0", e[e.COL3ROW1 = 13] = "COL3ROW1", e[e.COL3ROW2 = 14] = "COL3ROW2", e[e.COL3ROW3 = 15] = "COL3ROW3";
})(Vs || (Vs = {}));
const hf = 45 * Math.PI / 180, ff = 1, ls = 0.1, hs = 500, df = Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
class V extends Ba {
  static get IDENTITY() {
    return gf();
  }
  static get ZERO() {
    return mf();
  }
  get ELEMENTS() {
    return 16;
  }
  get RANK() {
    return 4;
  }
  get INDICES() {
    return Vs;
  }
  constructor(t) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0), arguments.length === 1 && Array.isArray(t) ? this.copy(t) : this.identity();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this[4] = t[4], this[5] = t[5], this[6] = t[6], this[7] = t[7], this[8] = t[8], this[9] = t[9], this[10] = t[10], this[11] = t[11], this[12] = t[12], this[13] = t[13], this[14] = t[14], this[15] = t[15], this.check();
  }
  set(t, n, s, r, i, o, a, c, u, l, h, f, d, m, g, p) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this[4] = i, this[5] = o, this[6] = a, this[7] = c, this[8] = u, this[9] = l, this[10] = h, this[11] = f, this[12] = d, this[13] = m, this[14] = g, this[15] = p, this.check();
  }
  setRowMajor(t, n, s, r, i, o, a, c, u, l, h, f, d, m, g, p) {
    return this[0] = t, this[1] = i, this[2] = u, this[3] = d, this[4] = n, this[5] = o, this[6] = l, this[7] = m, this[8] = s, this[9] = a, this[10] = h, this[11] = g, this[12] = r, this[13] = c, this[14] = f, this[15] = p, this.check();
  }
  toRowMajor(t) {
    return t[0] = this[0], t[1] = this[4], t[2] = this[8], t[3] = this[12], t[4] = this[1], t[5] = this[5], t[6] = this[9], t[7] = this[13], t[8] = this[2], t[9] = this[6], t[10] = this[10], t[11] = this[14], t[12] = this[3], t[13] = this[7], t[14] = this[11], t[15] = this[15], t;
  }
  identity() {
    return this.copy(df);
  }
  fromObject(t) {
    return this.check();
  }
  fromQuaternion(t) {
    return Wh(this, t), this.check();
  }
  frustum(t) {
    const {
      left: n,
      right: s,
      bottom: r,
      top: i,
      near: o = ls,
      far: a = hs
    } = t;
    return a === 1 / 0 ? Af(this, n, s, r, i, o) : Xh(this, n, s, r, i, o, a), this.check();
  }
  lookAt(t) {
    const {
      eye: n,
      center: s = [0, 0, 0],
      up: r = [0, 1, 0]
    } = t;
    return Zh(this, n, s, r), this.check();
  }
  ortho(t) {
    const {
      left: n,
      right: s,
      bottom: r,
      top: i,
      near: o = ls,
      far: a = hs
    } = t;
    return $h(this, n, s, r, i, o, a), this.check();
  }
  orthographic(t) {
    const {
      fovy: n = hf,
      aspect: s = ff,
      focalDistance: r = 1,
      near: i = ls,
      far: o = hs
    } = t;
    di(n);
    const a = n / 2, c = r * Math.tan(a), u = c * s;
    return this.ortho({
      left: -u,
      right: u,
      bottom: -c,
      top: c,
      near: i,
      far: o
    });
  }
  perspective(t) {
    const {
      fovy: n = 45 * Math.PI / 180,
      aspect: s = 1,
      near: r = 0.1,
      far: i = 500
    } = t;
    return di(n), qh(this, n, s, r, i), this.check();
  }
  determinant() {
    return Uh(this);
  }
  getScale(t = [-0, -0, -0]) {
    return t[0] = Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2]), t[1] = Math.sqrt(this[4] * this[4] + this[5] * this[5] + this[6] * this[6]), t[2] = Math.sqrt(this[8] * this[8] + this[9] * this[9] + this[10] * this[10]), t;
  }
  getTranslation(t = [-0, -0, -0]) {
    return t[0] = this[12], t[1] = this[13], t[2] = this[14], t;
  }
  getRotation(t, n) {
    t = t || [-0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0], n = n || [-0, -0, -0];
    const s = this.getScale(n), r = 1 / s[0], i = 1 / s[1], o = 1 / s[2];
    return t[0] = this[0] * r, t[1] = this[1] * i, t[2] = this[2] * o, t[3] = 0, t[4] = this[4] * r, t[5] = this[5] * i, t[6] = this[6] * o, t[7] = 0, t[8] = this[8] * r, t[9] = this[9] * i, t[10] = this[10] * o, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
  }
  getRotationMatrix3(t, n) {
    t = t || [-0, -0, -0, -0, -0, -0, -0, -0, -0], n = n || [-0, -0, -0];
    const s = this.getScale(n), r = 1 / s[0], i = 1 / s[1], o = 1 / s[2];
    return t[0] = this[0] * r, t[1] = this[1] * i, t[2] = this[2] * o, t[3] = this[4] * r, t[4] = this[5] * i, t[5] = this[6] * o, t[6] = this[8] * r, t[7] = this[9] * i, t[8] = this[10] * o, t;
  }
  transpose() {
    return Gh(this, this), this.check();
  }
  invert() {
    return Nh(this, this), this.check();
  }
  multiplyLeft(t) {
    return fi(this, t, this), this.check();
  }
  multiplyRight(t) {
    return fi(this, this, t), this.check();
  }
  rotateX(t) {
    return jh(this, this, t), this.check();
  }
  rotateY(t) {
    return kh(this, this, t), this.check();
  }
  rotateZ(t) {
    return Kh(this, this, t), this.check();
  }
  rotateXYZ(t) {
    return this.rotateX(t[0]).rotateY(t[1]).rotateZ(t[2]);
  }
  rotateAxis(t, n) {
    return Vh(this, this, t, n), this.check();
  }
  scale(t) {
    return Jh(this, this, Array.isArray(t) ? t : [t, t, t]), this.check();
  }
  translate(t) {
    return Hh(this, this, t), this.check();
  }
  transform(t, n) {
    return t.length === 4 ? (n = uf(n || [-0, -0, -0, -0], t, this), ve(n, 4), n) : this.transformAsPoint(t, n);
  }
  transformAsPoint(t, n) {
    const {
      length: s
    } = t;
    let r;
    switch (s) {
      case 2:
        r = ha(n || [-0, -0], t, this);
        break;
      case 3:
        r = Br(n || [-0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return ve(r, t.length), r;
  }
  transformAsVector(t, n) {
    let s;
    switch (t.length) {
      case 2:
        s = fa(n || [-0, -0], t, this);
        break;
      case 3:
        s = da(n || [-0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return ve(s, t.length), s;
  }
  transformPoint(t, n) {
    return this.transformAsPoint(t, n);
  }
  transformVector(t, n) {
    return this.transformAsPoint(t, n);
  }
  transformDirection(t, n) {
    return this.transformAsVector(t, n);
  }
  makeRotationX(t) {
    return this.identity().rotateX(t);
  }
  makeTranslation(t, n, s) {
    return this.identity().translate([t, n, s]);
  }
}
let nn, sn;
function mf() {
  return nn || (nn = new V([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), Object.freeze(nn)), nn;
}
function gf() {
  return sn || (sn = new V(), Object.freeze(sn)), sn;
}
function di(e) {
  if (e > Math.PI * 2)
    throw Error("expected radians");
}
function Af(e, t, n, s, r, i) {
  const o = 2 * i / (n - t), a = 2 * i / (r - s), c = (n + t) / (n - t), u = (r + s) / (r - s), l = -1, h = -1, f = -2 * i;
  return e[0] = o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = a, e[6] = 0, e[7] = 0, e[8] = c, e[9] = u, e[10] = l, e[11] = h, e[12] = 0, e[13] = 0, e[14] = f, e[15] = 0, e;
}
function mi() {
  const e = new St(4);
  return St != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e;
}
function pf(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e;
}
function Ca(e, t, n) {
  n = n * 0.5;
  const s = Math.sin(n);
  return e[0] = s * t[0], e[1] = s * t[1], e[2] = s * t[2], e[3] = Math.cos(n), e;
}
function gi(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = n[0], c = n[1], u = n[2], l = n[3];
  return e[0] = s * l + o * a + r * u - i * c, e[1] = r * l + o * c + i * a - s * u, e[2] = i * l + o * u + s * c - r * a, e[3] = o * l - s * a - r * c - i * u, e;
}
function yf(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], a = Math.sin(n), c = Math.cos(n);
  return e[0] = s * c + o * a, e[1] = r * c + i * a, e[2] = i * c - r * a, e[3] = o * c - s * a, e;
}
function Bf(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], a = Math.sin(n), c = Math.cos(n);
  return e[0] = s * c - i * a, e[1] = r * c + o * a, e[2] = i * c + s * a, e[3] = o * c - r * a, e;
}
function Cf(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], a = Math.sin(n), c = Math.cos(n);
  return e[0] = s * c + r * a, e[1] = r * c - s * a, e[2] = i * c + o * a, e[3] = o * c - i * a, e;
}
function Ef(e, t) {
  const n = t[0], s = t[1], r = t[2];
  return e[0] = n, e[1] = s, e[2] = r, e[3] = Math.sqrt(Math.abs(1 - n * n - s * s - r * r)), e;
}
function Cn(e, t, n, s) {
  const r = t[0], i = t[1], o = t[2], a = t[3];
  let c = n[0], u = n[1], l = n[2], h = n[3], f, d, m, g, p;
  return f = r * c + i * u + o * l + a * h, f < 0 && (f = -f, c = -c, u = -u, l = -l, h = -h), 1 - f > Fe ? (d = Math.acos(f), p = Math.sin(d), m = Math.sin((1 - s) * d) / p, g = Math.sin(s * d) / p) : (m = 1 - s, g = s), e[0] = m * r + g * c, e[1] = m * i + g * u, e[2] = m * o + g * l, e[3] = m * a + g * h, e;
}
function Tf(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n * n + s * s + r * r + i * i, a = o ? 1 / o : 0;
  return e[0] = -n * a, e[1] = -s * a, e[2] = -r * a, e[3] = i * a, e;
}
function bf(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e;
}
function Ea(e, t) {
  const n = t[0] + t[4] + t[8];
  let s;
  if (n > 0)
    s = Math.sqrt(n + 1), e[3] = 0.5 * s, s = 0.5 / s, e[0] = (t[5] - t[7]) * s, e[1] = (t[6] - t[2]) * s, e[2] = (t[1] - t[3]) * s;
  else {
    let r = 0;
    t[4] > t[0] && (r = 1), t[8] > t[r * 3 + r] && (r = 2);
    const i = (r + 1) % 3, o = (r + 2) % 3;
    s = Math.sqrt(t[r * 3 + r] - t[i * 3 + i] - t[o * 3 + o] + 1), e[r] = 0.5 * s, s = 0.5 / s, e[3] = (t[i * 3 + o] - t[o * 3 + i]) * s, e[i] = (t[i * 3 + r] + t[r * 3 + i]) * s, e[o] = (t[o * 3 + r] + t[r * 3 + o]) * s;
  }
  return e;
}
const _f = ef, wf = nf, Rf = af, Mf = cf, Sf = sf, If = rf, Ta = of, xf = function() {
  const e = ga(), t = ui(1, 0, 0), n = ui(0, 1, 0);
  return function(s, r, i) {
    const o = yr(r, i);
    return o < -0.999999 ? (Bn(e, t, r), wh(e) < 1e-6 && Bn(e, n, r), Ch(e, e), Ca(s, e, Math.PI), s) : o > 0.999999 ? (s[0] = 0, s[1] = 0, s[2] = 0, s[3] = 1, s) : (Bn(e, r, i), s[0] = e[0], s[1] = e[1], s[2] = e[2], s[3] = 1 + o, Ta(s, s));
  };
}();
(function() {
  const e = mi(), t = mi();
  return function(n, s, r, i, o, a) {
    return Cn(e, s, o, a), Cn(t, r, i, a), Cn(n, e, t, 2 * a * (1 - a)), n;
  };
})();
(function() {
  const e = Rh();
  return function(t, n, s, r) {
    return e[0] = s[0], e[3] = s[1], e[6] = s[2], e[1] = r[0], e[4] = r[1], e[7] = r[2], e[2] = -n[0], e[5] = -n[1], e[8] = -n[2], Ta(t, Ea(t, e));
  };
})();
const vf = [0, 0, 0, 1];
class In extends Ar {
  constructor(t = 0, n = 0, s = 0, r = 1) {
    super(-0, -0, -0, -0), Array.isArray(t) && arguments.length === 1 ? this.copy(t) : this.set(t, n, s, r);
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this.check();
  }
  set(t, n, s, r) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this.check();
  }
  fromObject(t) {
    return this[0] = t.x, this[1] = t.y, this[2] = t.z, this[3] = t.w, this.check();
  }
  fromMatrix3(t) {
    return Ea(this, t), this.check();
  }
  fromAxisRotation(t, n) {
    return Ca(this, t, n), this.check();
  }
  identity() {
    return pf(this), this.check();
  }
  setAxisAngle(t, n) {
    return this.fromAxisRotation(t, n);
  }
  get ELEMENTS() {
    return 4;
  }
  get x() {
    return this[0];
  }
  set x(t) {
    this[0] = N(t);
  }
  get y() {
    return this[1];
  }
  set y(t) {
    this[1] = N(t);
  }
  get z() {
    return this[2];
  }
  set z(t) {
    this[2] = N(t);
  }
  get w() {
    return this[3];
  }
  set w(t) {
    this[3] = N(t);
  }
  len() {
    return Sf(this);
  }
  lengthSquared() {
    return If(this);
  }
  dot(t) {
    return Rf(this, t);
  }
  rotationTo(t, n) {
    return xf(this, t, n), this.check();
  }
  add(t) {
    return _f(this, this, t), this.check();
  }
  calculateW() {
    return Ef(this, this), this.check();
  }
  conjugate() {
    return bf(this, this), this.check();
  }
  invert() {
    return Tf(this, this), this.check();
  }
  lerp(t, n, s) {
    return s === void 0 ? this.lerp(this, t, n) : (Mf(this, t, n, s), this.check());
  }
  multiplyRight(t) {
    return gi(this, this, t), this.check();
  }
  multiplyLeft(t) {
    return gi(this, t, this), this.check();
  }
  normalize() {
    const t = this.len(), n = t > 0 ? 1 / t : 0;
    return this[0] = this[0] * n, this[1] = this[1] * n, this[2] = this[2] * n, this[3] = this[3] * n, t === 0 && (this[3] = 1), this.check();
  }
  rotateX(t) {
    return yf(this, this, t), this.check();
  }
  rotateY(t) {
    return Bf(this, this, t), this.check();
  }
  rotateZ(t) {
    return Cf(this, this, t), this.check();
  }
  scale(t) {
    return wf(this, this, t), this.check();
  }
  slerp(t, n, s) {
    let r, i, o;
    switch (arguments.length) {
      case 1:
        ({
          start: r = vf,
          target: i,
          ratio: o
        } = t);
        break;
      case 2:
        r = this, i = t, o = n;
        break;
      default:
        r = t, i = n, o = s;
    }
    return Cn(this, r, i, o), this.check();
  }
  transformVector4(t, n = new Cr()) {
    return lf(n, t, this), ve(n, 4);
  }
  lengthSq() {
    return this.lengthSquared();
  }
  setFromAxisAngle(t, n) {
    return this.setAxisAngle(t, n);
  }
  premultiply(t) {
    return this.multiplyLeft(t);
  }
  multiply(t) {
    return this.multiplyRight(t);
  }
}
function Pe(e) {
  "@babel/helpers - typeof";
  return Pe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pe(e);
}
function Ff(e, t) {
  if (Pe(e) != "object" || !e)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var s = n.call(e, t || "default");
    if (Pe(s) != "object")
      return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Of(e) {
  var t = Ff(e, "string");
  return Pe(t) == "symbol" ? t : String(t);
}
function I(e, t, n) {
  return t = Of(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
const Df = 0.1, Lf = 1e-12, ba = 1e-15, Pf = 1e-20, Gf = 6378137, Nf = 6378137, Uf = 6356752314245179e-9;
function Kn(e) {
  return e;
}
new A();
function Hf(e, t = [], n = Kn) {
  return "longitude" in e ? (t[0] = n(e.longitude), t[1] = n(e.latitude), t[2] = e.height) : "x" in e ? (t[0] = n(e.x), t[1] = n(e.y), t[2] = e.z) : (t[0] = n(e[0]), t[1] = n(e[1]), t[2] = e[2]), t;
}
function Jf(e, t = []) {
  return Hf(e, t, $._cartographicRadians ? Kn : ah);
}
function Vf(e, t, n = Kn) {
  return "longitude" in t ? (t.longitude = n(e[0]), t.latitude = n(e[1]), t.height = e[2]) : "x" in t ? (t.x = n(e[0]), t.y = n(e[1]), t.z = e[2]) : (t[0] = n(e[0]), t[1] = n(e[1]), t[2] = e[2]), t;
}
function jf(e, t) {
  return Vf(e, t, $._cartographicRadians ? Kn : ch);
}
const Ai = 1e-14, kf = new A(), pi = {
  up: {
    south: "east",
    north: "west",
    west: "south",
    east: "north"
  },
  down: {
    south: "west",
    north: "east",
    west: "north",
    east: "south"
  },
  south: {
    up: "west",
    down: "east",
    west: "down",
    east: "up"
  },
  north: {
    up: "east",
    down: "west",
    west: "up",
    east: "down"
  },
  west: {
    up: "north",
    down: "south",
    north: "down",
    south: "up"
  },
  east: {
    up: "south",
    down: "north",
    north: "up",
    south: "down"
  }
}, fs = {
  north: [-1, 0, 0],
  east: [0, 1, 0],
  up: [0, 0, 1],
  south: [1, 0, 0],
  west: [0, -1, 0],
  down: [0, 0, -1]
}, Ee = {
  east: new A(),
  north: new A(),
  up: new A(),
  west: new A(),
  south: new A(),
  down: new A()
}, Kf = new A(), zf = new A(), Wf = new A();
function yi(e, t, n, s, r, i) {
  const o = pi[t] && pi[t][n];
  j(o && (!s || s === o));
  let a, c, u;
  const l = kf.copy(r);
  if (kt(l.x, 0, Ai) && kt(l.y, 0, Ai)) {
    const f = Math.sign(l.z);
    a = Kf.fromArray(fs[t]), t !== "east" && t !== "west" && a.scale(f), c = zf.fromArray(fs[n]), n !== "east" && n !== "west" && c.scale(f), u = Wf.fromArray(fs[s]), s !== "east" && s !== "west" && u.scale(f);
  } else {
    const {
      up: f,
      east: d,
      north: m
    } = Ee;
    d.set(-l.y, l.x, 0).normalize(), e.geodeticSurfaceNormal(l, f), m.copy(f).cross(d);
    const {
      down: g,
      west: p,
      south: C
    } = Ee;
    g.copy(f).scale(-1), p.copy(d).scale(-1), C.copy(m).scale(-1), a = Ee[t], c = Ee[n], u = Ee[s];
  }
  return i[0] = a.x, i[1] = a.y, i[2] = a.z, i[3] = 0, i[4] = c.x, i[5] = c.y, i[6] = c.z, i[7] = 0, i[8] = u.x, i[9] = u.y, i[10] = u.z, i[11] = 0, i[12] = l.x, i[13] = l.y, i[14] = l.z, i[15] = 1, i;
}
const ce = new A(), Xf = new A(), Qf = new A();
function qf(e, t, n = []) {
  const {
    oneOverRadii: s,
    oneOverRadiiSquared: r,
    centerToleranceSquared: i
  } = t;
  ce.from(e);
  const o = ce.x, a = ce.y, c = ce.z, u = s.x, l = s.y, h = s.z, f = o * o * u * u, d = a * a * l * l, m = c * c * h * h, g = f + d + m, p = Math.sqrt(1 / g);
  if (!Number.isFinite(p))
    return;
  const C = Xf;
  if (C.copy(e).scale(p), g < i)
    return C.to(n);
  const w = r.x, y = r.y, B = r.z, R = Qf;
  R.set(C.x * w * 2, C.y * y * 2, C.z * B * 2);
  let T = (1 - p) * ce.len() / (0.5 * R.len()), v = 0, F, x, D, k;
  do {
    T -= v, F = 1 / (1 + T * w), x = 1 / (1 + T * y), D = 1 / (1 + T * B);
    const W = F * F, X = x * x, L = D * D, ot = W * F, zt = X * x, ie = L * D;
    k = f * W + d * X + m * L - 1;
    const Dt = -2 * (f * ot * w + d * zt * y + m * ie * B);
    v = k / Dt;
  } while (Math.abs(k) > Lf);
  return ce.scale([F, x, D]).to(n);
}
const rn = new A(), Bi = new A(), Yf = new A(), _t = new A(), $f = new A(), on = new A();
class J {
  constructor(t = 0, n = 0, s = 0) {
    I(this, "radii", void 0), I(this, "radiiSquared", void 0), I(this, "radiiToTheFourth", void 0), I(this, "oneOverRadii", void 0), I(this, "oneOverRadiiSquared", void 0), I(this, "minimumRadius", void 0), I(this, "maximumRadius", void 0), I(this, "centerToleranceSquared", Df), I(this, "squaredXOverSquaredZ", void 0), j(t >= 0), j(n >= 0), j(s >= 0), this.radii = new A(t, n, s), this.radiiSquared = new A(t * t, n * n, s * s), this.radiiToTheFourth = new A(t * t * t * t, n * n * n * n, s * s * s * s), this.oneOverRadii = new A(t === 0 ? 0 : 1 / t, n === 0 ? 0 : 1 / n, s === 0 ? 0 : 1 / s), this.oneOverRadiiSquared = new A(t === 0 ? 0 : 1 / (t * t), n === 0 ? 0 : 1 / (n * n), s === 0 ? 0 : 1 / (s * s)), this.minimumRadius = Math.min(t, n, s), this.maximumRadius = Math.max(t, n, s), this.radiiSquared.z !== 0 && (this.squaredXOverSquaredZ = this.radiiSquared.x / this.radiiSquared.z), Object.freeze(this);
  }
  equals(t) {
    return this === t || !!(t && this.radii.equals(t.radii));
  }
  toString() {
    return this.radii.toString();
  }
  cartographicToCartesian(t, n = [0, 0, 0]) {
    const s = Bi, r = Yf, [, , i] = t;
    this.geodeticSurfaceNormalCartographic(t, s), r.copy(this.radiiSquared).scale(s);
    const o = Math.sqrt(s.dot(r));
    return r.scale(1 / o), s.scale(i), r.add(s), r.to(n);
  }
  cartesianToCartographic(t, n = [0, 0, 0]) {
    on.from(t);
    const s = this.scaleToGeodeticSurface(on, _t);
    if (!s)
      return;
    const r = this.geodeticSurfaceNormal(s, Bi), i = $f;
    i.copy(on).subtract(s);
    const o = Math.atan2(r.y, r.x), a = Math.asin(r.z), c = Math.sign(yr(i, on)) * Aa(i);
    return jf([o, a, c], n);
  }
  eastNorthUpToFixedFrame(t, n = new V()) {
    return yi(this, "east", "north", "up", t, n);
  }
  localFrameToFixedFrame(t, n, s, r, i = new V()) {
    return yi(this, t, n, s, r, i);
  }
  geocentricSurfaceNormal(t, n = [0, 0, 0]) {
    return rn.from(t).normalize().to(n);
  }
  geodeticSurfaceNormalCartographic(t, n = [0, 0, 0]) {
    const s = Jf(t), r = s[0], i = s[1], o = Math.cos(i);
    return rn.set(o * Math.cos(r), o * Math.sin(r), Math.sin(i)).normalize(), rn.to(n);
  }
  geodeticSurfaceNormal(t, n = [0, 0, 0]) {
    return rn.from(t).scale(this.oneOverRadiiSquared).normalize().to(n);
  }
  scaleToGeodeticSurface(t, n) {
    return qf(t, this, n);
  }
  scaleToGeocentricSurface(t, n = [0, 0, 0]) {
    _t.from(t);
    const s = _t.x, r = _t.y, i = _t.z, o = this.oneOverRadiiSquared, a = 1 / Math.sqrt(s * s * o.x + r * r * o.y + i * i * o.z);
    return _t.multiplyScalar(a).to(n);
  }
  transformPositionToScaledSpace(t, n = [0, 0, 0]) {
    return _t.from(t).scale(this.oneOverRadii).to(n);
  }
  transformPositionFromScaledSpace(t, n = [0, 0, 0]) {
    return _t.from(t).scale(this.radii).to(n);
  }
  getSurfaceNormalIntersectionWithZAxis(t, n = 0, s = [0, 0, 0]) {
    j(kt(this.radii.x, this.radii.y, ba)), j(this.radii.z > 0), _t.from(t);
    const r = _t.z * (1 - this.squaredXOverSquaredZ);
    if (!(Math.abs(r) >= this.radii.z - n))
      return _t.set(0, 0, r).to(s);
  }
}
I(J, "WGS84", new J(Gf, Nf, Uf));
class Zf {
  constructor(t, n, s) {
    this.item = void 0, this.previous = void 0, this.next = void 0, this.item = t, this.previous = n, this.next = s;
  }
}
class td {
  constructor() {
    this.head = null, this.tail = null, this._length = 0;
  }
  get length() {
    return this._length;
  }
  add(t) {
    const n = new Zf(t, this.tail, null);
    return this.tail ? (this.tail.next = n, this.tail = n) : (this.head = n, this.tail = n), ++this._length, n;
  }
  remove(t) {
    t && (t.previous && t.next ? (t.previous.next = t.next, t.next.previous = t.previous) : t.previous ? (t.previous.next = null, this.tail = t.previous) : t.next ? (t.next.previous = null, this.head = t.next) : (this.head = null, this.tail = null), t.next = null, t.previous = null, --this._length);
  }
  splice(t, n) {
    t !== n && (this.remove(n), this._insert(t, n));
  }
  _insert(t, n) {
    const s = t.next;
    t.next = n, this.tail === t ? this.tail = n : s.previous = n, n.next = s, n.previous = t, ++this._length;
  }
}
class ed {
  constructor() {
    this._list = void 0, this._sentinel = void 0, this._trimTiles = void 0, this._list = new td(), this._sentinel = this._list.add("sentinel"), this._trimTiles = !1;
  }
  reset() {
    this._list.splice(this._list.tail, this._sentinel);
  }
  touch(t) {
    const n = t._cacheNode;
    n && this._list.splice(this._sentinel, n);
  }
  add(t, n, s) {
    n._cacheNode || (n._cacheNode = this._list.add(n), s && s(t, n));
  }
  unloadTile(t, n, s) {
    const r = n._cacheNode;
    r && (this._list.remove(r), n._cacheNode = null, s && s(t, n));
  }
  unloadTiles(t, n) {
    const s = this._trimTiles;
    this._trimTiles = !1;
    const r = this._list, i = t.maximumMemoryUsage * 1024 * 1024, o = this._sentinel;
    let a = r.head;
    for (; a !== o && (t.gpuMemoryUsageInBytes > i || s); ) {
      const c = a.item;
      a = a.next, this.unloadTile(t, c, n);
    }
  }
  trim() {
    this._trimTiles = !0;
  }
}
function nd(e, t) {
  U(e), U(t);
  const {
    rtcCenter: n,
    gltfUpAxis: s
  } = t, {
    computedTransform: r,
    boundingVolume: {
      center: i
    }
  } = e;
  let o = new V(r);
  switch (n && o.translate(n), s) {
    case "Z":
      break;
    case "Y":
      const h = new V().rotateX(Math.PI / 2);
      o = o.multiplyRight(h);
      break;
    case "X":
      const f = new V().rotateY(-Math.PI / 2);
      o = o.multiplyRight(f);
      break;
  }
  t.isQuantized && o.translate(t.quantizedVolumeOffset).scale(t.quantizedVolumeScale);
  const a = new A(i);
  t.cartesianModelMatrix = o, t.cartesianOrigin = a;
  const c = J.WGS84.cartesianToCartographic(a, new A()), l = J.WGS84.eastNorthUpToFixedFrame(a).invert();
  t.cartographicModelMatrix = l.multiplyRight(o), t.cartographicOrigin = c, t.coordinateSystem || (t.modelMatrix = t.cartographicModelMatrix);
}
const gt = {
  OUTSIDE: -1,
  INTERSECTING: 0,
  INSIDE: 1
};
new A();
new A();
const Te = new A(), Ci = new A();
class We {
  constructor(t = [0, 0, 0], n = 0) {
    I(this, "center", void 0), I(this, "radius", void 0), this.radius = -0, this.center = new A(), this.fromCenterRadius(t, n);
  }
  fromCenterRadius(t, n) {
    return this.center.from(t), this.radius = n, this;
  }
  fromCornerPoints(t, n) {
    return n = Te.from(n), this.center = new A().from(t).add(n).scale(0.5), this.radius = this.center.distance(n), this;
  }
  equals(t) {
    return this === t || !!t && this.center.equals(t.center) && this.radius === t.radius;
  }
  clone() {
    return new We(this.center, this.radius);
  }
  union(t) {
    const n = this.center, s = this.radius, r = t.center, i = t.radius, o = Te.copy(r).subtract(n), a = o.magnitude();
    if (s >= a + i)
      return this.clone();
    if (i >= a + s)
      return t.clone();
    const c = (s + a + i) * 0.5;
    return Ci.copy(o).scale((-s + c) / a).add(n), this.center.copy(Ci), this.radius = c, this;
  }
  expand(t) {
    const s = Te.from(t).subtract(this.center).magnitude();
    return s > this.radius && (this.radius = s), this;
  }
  transform(t) {
    this.center.transform(t);
    const n = zh(Te, t);
    return this.radius = Math.max(n[0], Math.max(n[1], n[2])) * this.radius, this;
  }
  distanceSquaredTo(t) {
    const n = this.distanceTo(t);
    return n * n;
  }
  distanceTo(t) {
    const s = Te.from(t).subtract(this.center);
    return Math.max(0, s.len() - this.radius);
  }
  intersectPlane(t) {
    const n = this.center, s = this.radius, i = t.normal.dot(n) + t.distance;
    return i < -s ? gt.OUTSIDE : i < s ? gt.INTERSECTING : gt.INSIDE;
  }
}
const sd = new A(), rd = new A(), an = new A(), cn = new A(), un = new A(), id = new A(), od = new A(), Pt = {
  COLUMN0ROW0: 0,
  COLUMN0ROW1: 1,
  COLUMN0ROW2: 2,
  COLUMN1ROW0: 3,
  COLUMN1ROW1: 4,
  COLUMN1ROW2: 5,
  COLUMN2ROW0: 6,
  COLUMN2ROW1: 7,
  COLUMN2ROW2: 8
};
class Xe {
  constructor(t = [0, 0, 0], n = [0, 0, 0, 0, 0, 0, 0, 0, 0]) {
    I(this, "center", void 0), I(this, "halfAxes", void 0), this.center = new A().from(t), this.halfAxes = new z(n);
  }
  get halfSize() {
    const t = this.halfAxes.getColumn(0), n = this.halfAxes.getColumn(1), s = this.halfAxes.getColumn(2);
    return [new A(t).len(), new A(n).len(), new A(s).len()];
  }
  get quaternion() {
    const t = this.halfAxes.getColumn(0), n = this.halfAxes.getColumn(1), s = this.halfAxes.getColumn(2), r = new A(t).normalize(), i = new A(n).normalize(), o = new A(s).normalize();
    return new In().fromMatrix3(new z([...r, ...i, ...o]));
  }
  fromCenterHalfSizeQuaternion(t, n, s) {
    const r = new In(s), i = new z().fromQuaternion(r);
    return i[0] = i[0] * n[0], i[1] = i[1] * n[0], i[2] = i[2] * n[0], i[3] = i[3] * n[1], i[4] = i[4] * n[1], i[5] = i[5] * n[1], i[6] = i[6] * n[2], i[7] = i[7] * n[2], i[8] = i[8] * n[2], this.center = new A().from(t), this.halfAxes = i, this;
  }
  clone() {
    return new Xe(this.center, this.halfAxes);
  }
  equals(t) {
    return this === t || !!t && this.center.equals(t.center) && this.halfAxes.equals(t.halfAxes);
  }
  getBoundingSphere(t = new We()) {
    const n = this.halfAxes, s = n.getColumn(0, an), r = n.getColumn(1, cn), i = n.getColumn(2, un), o = sd.copy(s).add(r).add(i);
    return t.center.copy(this.center), t.radius = o.magnitude(), t;
  }
  intersectPlane(t) {
    const n = this.center, s = t.normal, r = this.halfAxes, i = s.x, o = s.y, a = s.z, c = Math.abs(i * r[Pt.COLUMN0ROW0] + o * r[Pt.COLUMN0ROW1] + a * r[Pt.COLUMN0ROW2]) + Math.abs(i * r[Pt.COLUMN1ROW0] + o * r[Pt.COLUMN1ROW1] + a * r[Pt.COLUMN1ROW2]) + Math.abs(i * r[Pt.COLUMN2ROW0] + o * r[Pt.COLUMN2ROW1] + a * r[Pt.COLUMN2ROW2]), u = s.dot(n) + t.distance;
    return u <= -c ? gt.OUTSIDE : u >= c ? gt.INSIDE : gt.INTERSECTING;
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceSquaredTo(t));
  }
  distanceSquaredTo(t) {
    const n = rd.from(t).subtract(this.center), s = this.halfAxes, r = s.getColumn(0, an), i = s.getColumn(1, cn), o = s.getColumn(2, un), a = r.magnitude(), c = i.magnitude(), u = o.magnitude();
    r.normalize(), i.normalize(), o.normalize();
    let l = 0, h;
    return h = Math.abs(n.dot(r)) - a, h > 0 && (l += h * h), h = Math.abs(n.dot(i)) - c, h > 0 && (l += h * h), h = Math.abs(n.dot(o)) - u, h > 0 && (l += h * h), l;
  }
  computePlaneDistances(t, n, s = [-0, -0]) {
    let r = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
    const o = this.center, a = this.halfAxes, c = a.getColumn(0, an), u = a.getColumn(1, cn), l = a.getColumn(2, un), h = id.copy(c).add(u).add(l).add(o), f = od.copy(h).subtract(t);
    let d = n.dot(f);
    return r = Math.min(d, r), i = Math.max(d, i), h.copy(o).add(c).add(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), h.copy(o).add(c).subtract(u).add(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), h.copy(o).add(c).subtract(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).add(u).add(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).add(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).subtract(u).add(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).subtract(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), s[0] = r, s[1] = i, s;
  }
  transform(t) {
    this.center.transformAsPoint(t);
    const n = this.halfAxes.getColumn(0, an);
    n.transformAsPoint(t);
    const s = this.halfAxes.getColumn(1, cn);
    s.transformAsPoint(t);
    const r = this.halfAxes.getColumn(2, un);
    return r.transformAsPoint(t), this.halfAxes = new z([...n, ...s, ...r]), this;
  }
  getTransform() {
    throw new Error("not implemented");
  }
}
const Ei = new A(), Ti = new A();
class Z {
  constructor(t = [0, 0, 1], n = 0) {
    I(this, "normal", void 0), I(this, "distance", void 0), this.normal = new A(), this.distance = -0, this.fromNormalDistance(t, n);
  }
  fromNormalDistance(t, n) {
    return j(Number.isFinite(n)), this.normal.from(t).normalize(), this.distance = n, this;
  }
  fromPointNormal(t, n) {
    t = Ei.from(t), this.normal.from(n).normalize();
    const s = -this.normal.dot(t);
    return this.distance = s, this;
  }
  fromCoefficients(t, n, s, r) {
    return this.normal.set(t, n, s), j(kt(this.normal.len(), 1)), this.distance = r, this;
  }
  clone() {
    return new Z(this.normal, this.distance);
  }
  equals(t) {
    return kt(this.distance, t.distance) && kt(this.normal, t.normal);
  }
  getPointDistance(t) {
    return this.normal.dot(t) + this.distance;
  }
  transform(t) {
    const n = Ti.copy(this.normal).transformAsVector(t).normalize(), s = this.normal.scale(-this.distance).transform(t);
    return this.fromPointNormal(s, n);
  }
  projectPointOntoPlane(t, n = [0, 0, 0]) {
    const s = Ei.from(t), r = this.getPointDistance(s), i = Ti.copy(this.normal).scale(r);
    return s.subtract(i).to(n);
  }
}
const bi = [new A([1, 0, 0]), new A([0, 1, 0]), new A([0, 0, 1])], _i = new A(), ad = new A();
class ft {
  constructor(t = []) {
    I(this, "planes", void 0), this.planes = t;
  }
  fromBoundingSphere(t) {
    this.planes.length = 2 * bi.length;
    const n = t.center, s = t.radius;
    let r = 0;
    for (const i of bi) {
      let o = this.planes[r], a = this.planes[r + 1];
      o || (o = this.planes[r] = new Z()), a || (a = this.planes[r + 1] = new Z());
      const c = _i.copy(i).scale(-s).add(n);
      o.fromPointNormal(c, i);
      const u = _i.copy(i).scale(s).add(n), l = ad.copy(i).negate();
      a.fromPointNormal(u, l), r += 2;
    }
    return this;
  }
  computeVisibility(t) {
    let n = gt.INSIDE;
    for (const s of this.planes)
      switch (t.intersectPlane(s)) {
        case gt.OUTSIDE:
          return gt.OUTSIDE;
        case gt.INTERSECTING:
          n = gt.INTERSECTING;
          break;
      }
    return n;
  }
  computeVisibilityWithPlaneMask(t, n) {
    if (j(Number.isFinite(n), "parentPlaneMask is required."), n === ft.MASK_OUTSIDE || n === ft.MASK_INSIDE)
      return n;
    let s = ft.MASK_INSIDE;
    const r = this.planes;
    for (let i = 0; i < this.planes.length; ++i) {
      const o = i < 31 ? 1 << i : 0;
      if (i < 31 && !(n & o))
        continue;
      const a = r[i], c = t.intersectPlane(a);
      if (c === gt.OUTSIDE)
        return ft.MASK_OUTSIDE;
      c === gt.INTERSECTING && (s |= o);
    }
    return s;
  }
}
I(ft, "MASK_OUTSIDE", 4294967295);
I(ft, "MASK_INSIDE", 0);
I(ft, "MASK_INDETERMINATE", 2147483647);
const cd = new A(), ud = new A(), ld = new A(), hd = new A(), fd = new A();
class xn {
  constructor(t = {}) {
    I(this, "left", void 0), I(this, "_left", void 0), I(this, "right", void 0), I(this, "_right", void 0), I(this, "top", void 0), I(this, "_top", void 0), I(this, "bottom", void 0), I(this, "_bottom", void 0), I(this, "near", void 0), I(this, "_near", void 0), I(this, "far", void 0), I(this, "_far", void 0), I(this, "_cullingVolume", new ft([new Z(), new Z(), new Z(), new Z(), new Z(), new Z()])), I(this, "_perspectiveMatrix", new V()), I(this, "_infinitePerspective", new V());
    const {
      near: n = 1,
      far: s = 5e8
    } = t;
    this.left = t.left, this._left = void 0, this.right = t.right, this._right = void 0, this.top = t.top, this._top = void 0, this.bottom = t.bottom, this._bottom = void 0, this.near = n, this._near = n, this.far = s, this._far = s;
  }
  clone() {
    return new xn({
      right: this.right,
      left: this.left,
      top: this.top,
      bottom: this.bottom,
      near: this.near,
      far: this.far
    });
  }
  equals(t) {
    return t && t instanceof xn && this.right === t.right && this.left === t.left && this.top === t.top && this.bottom === t.bottom && this.near === t.near && this.far === t.far;
  }
  get projectionMatrix() {
    return this._update(), this._perspectiveMatrix;
  }
  get infiniteProjectionMatrix() {
    return this._update(), this._infinitePerspective;
  }
  computeCullingVolume(t, n, s) {
    j(t, "position is required."), j(n, "direction is required."), j(s, "up is required.");
    const r = this._cullingVolume.planes;
    s = cd.copy(s).normalize();
    const i = ud.copy(n).cross(s).normalize(), o = ld.copy(n).multiplyByScalar(this.near).add(t), a = hd.copy(n).multiplyByScalar(this.far).add(t);
    let c = fd;
    return c.copy(i).multiplyByScalar(this.left).add(o).subtract(t).cross(s), r[0].fromPointNormal(t, c), c.copy(i).multiplyByScalar(this.right).add(o).subtract(t).cross(s).negate(), r[1].fromPointNormal(t, c), c.copy(s).multiplyByScalar(this.bottom).add(o).subtract(t).cross(i).negate(), r[2].fromPointNormal(t, c), c.copy(s).multiplyByScalar(this.top).add(o).subtract(t).cross(i), r[3].fromPointNormal(t, c), c = new A().copy(n), r[4].fromPointNormal(o, c), c.negate(), r[5].fromPointNormal(a, c), this._cullingVolume;
  }
  getPixelDimensions(t, n, s, r) {
    this._update(), j(Number.isFinite(t) && Number.isFinite(n)), j(t > 0), j(n > 0), j(s > 0), j(r);
    const i = 1 / this.near;
    let o = this.top * i;
    const a = 2 * s * o / n;
    o = this.right * i;
    const c = 2 * s * o / t;
    return r.x = c, r.y = a, r;
  }
  _update() {
    j(Number.isFinite(this.right) && Number.isFinite(this.left) && Number.isFinite(this.top) && Number.isFinite(this.bottom) && Number.isFinite(this.near) && Number.isFinite(this.far));
    const {
      top: t,
      bottom: n,
      right: s,
      left: r,
      near: i,
      far: o
    } = this;
    (t !== this._top || n !== this._bottom || r !== this._left || s !== this._right || i !== this._near || o !== this._far) && (j(this.near > 0 && this.near < this.far, "near must be greater than zero and less than far."), this._left = r, this._right = s, this._top = t, this._bottom = n, this._near = i, this._far = o, this._perspectiveMatrix = new V().frustum({
      left: r,
      right: s,
      bottom: n,
      top: t,
      near: i,
      far: o
    }), this._infinitePerspective = new V().frustum({
      left: r,
      right: s,
      bottom: n,
      top: t,
      near: i,
      far: 1 / 0
    }));
  }
}
const dd = (e) => e !== null && typeof e < "u";
class vn {
  constructor(t = {}) {
    I(this, "_offCenterFrustum", new xn()), I(this, "fov", void 0), I(this, "_fov", void 0), I(this, "_fovy", void 0), I(this, "_sseDenominator", void 0), I(this, "aspectRatio", void 0), I(this, "_aspectRatio", void 0), I(this, "near", void 0), I(this, "_near", void 0), I(this, "far", void 0), I(this, "_far", void 0), I(this, "xOffset", void 0), I(this, "_xOffset", void 0), I(this, "yOffset", void 0), I(this, "_yOffset", void 0);
    const {
      fov: n,
      aspectRatio: s,
      near: r = 1,
      far: i = 5e8,
      xOffset: o = 0,
      yOffset: a = 0
    } = t;
    this.fov = n, this.aspectRatio = s, this.near = r, this.far = i, this.xOffset = o, this.yOffset = a;
  }
  clone() {
    return new vn({
      aspectRatio: this.aspectRatio,
      fov: this.fov,
      near: this.near,
      far: this.far
    });
  }
  equals(t) {
    return !dd(t) || !(t instanceof vn) ? !1 : (this._update(), t._update(), this.fov === t.fov && this.aspectRatio === t.aspectRatio && this.near === t.near && this.far === t.far && this._offCenterFrustum.equals(t._offCenterFrustum));
  }
  get projectionMatrix() {
    return this._update(), this._offCenterFrustum.projectionMatrix;
  }
  get infiniteProjectionMatrix() {
    return this._update(), this._offCenterFrustum.infiniteProjectionMatrix;
  }
  get fovy() {
    return this._update(), this._fovy;
  }
  get sseDenominator() {
    return this._update(), this._sseDenominator;
  }
  computeCullingVolume(t, n, s) {
    return this._update(), this._offCenterFrustum.computeCullingVolume(t, n, s);
  }
  getPixelDimensions(t, n, s, r) {
    return this._update(), this._offCenterFrustum.getPixelDimensions(t, n, s, r || new kn());
  }
  _update() {
    j(Number.isFinite(this.fov) && Number.isFinite(this.aspectRatio) && Number.isFinite(this.near) && Number.isFinite(this.far));
    const t = this._offCenterFrustum;
    (this.fov !== this._fov || this.aspectRatio !== this._aspectRatio || this.near !== this._near || this.far !== this._far || this.xOffset !== this._xOffset || this.yOffset !== this._yOffset) && (j(this.fov >= 0 && this.fov < Math.PI), j(this.aspectRatio > 0), j(this.near >= 0 && this.near < this.far), this._aspectRatio = this.aspectRatio, this._fov = this.fov, this._fovy = this.aspectRatio <= 1 ? this.fov : Math.atan(Math.tan(this.fov * 0.5) / this.aspectRatio) * 2, this._near = this.near, this._far = this.far, this._sseDenominator = 2 * Math.tan(0.5 * this._fovy), this._xOffset = this.xOffset, this._yOffset = this.yOffset, t.top = this.near * Math.tan(0.5 * this._fovy), t.bottom = -t.top, t.right = this.aspectRatio * t.top, t.left = -t.right, t.near = this.near, t.far = this.far, t.right += this.xOffset, t.left += this.xOffset, t.top += this.yOffset, t.bottom += this.yOffset);
  }
}
new A();
new A();
new A();
new A();
new A();
new A();
new A();
new A();
new A();
new A();
new A();
new A();
const xt = new z(), md = new z(), gd = new z(), ln = new z(), wi = new z();
function Ad(e, t = {}) {
  const n = Pf, s = 10;
  let r = 0, i = 0;
  const o = md, a = gd;
  o.identity(), a.copy(e);
  const c = n * pd(a);
  for (; i < s && yd(a) > c; )
    Bd(a, ln), wi.copy(ln).transpose(), a.multiplyRight(ln), a.multiplyLeft(wi), o.multiplyRight(ln), ++r > 2 && (++i, r = 0);
  return t.unitary = o.toTarget(t.unitary), t.diagonal = a.toTarget(t.diagonal), t;
}
function pd(e) {
  let t = 0;
  for (let n = 0; n < 9; ++n) {
    const s = e[n];
    t += s * s;
  }
  return Math.sqrt(t);
}
const js = [1, 0, 0], ks = [2, 2, 1];
function yd(e) {
  let t = 0;
  for (let n = 0; n < 3; ++n) {
    const s = e[xt.getElementIndex(ks[n], js[n])];
    t += 2 * s * s;
  }
  return Math.sqrt(t);
}
function Bd(e, t) {
  const n = ba;
  let s = 0, r = 1;
  for (let u = 0; u < 3; ++u) {
    const l = Math.abs(e[xt.getElementIndex(ks[u], js[u])]);
    l > s && (r = u, s = l);
  }
  const i = js[r], o = ks[r];
  let a = 1, c = 0;
  if (Math.abs(e[xt.getElementIndex(o, i)]) > n) {
    const u = e[xt.getElementIndex(o, o)], l = e[xt.getElementIndex(i, i)], h = e[xt.getElementIndex(o, i)], f = (u - l) / 2 / h;
    let d;
    f < 0 ? d = -1 / (-f + Math.sqrt(1 + f * f)) : d = 1 / (f + Math.sqrt(1 + f * f)), a = 1 / Math.sqrt(1 + d * d), c = d * a;
  }
  return z.IDENTITY.to(t), t[xt.getElementIndex(i, i)] = t[xt.getElementIndex(o, o)] = a, t[xt.getElementIndex(o, i)] = c, t[xt.getElementIndex(i, o)] = -c, t;
}
const Jt = new A(), Cd = new A(), Ed = new A(), Td = new A(), bd = new A(), _d = new z(), wd = {
  diagonal: new z(),
  unitary: new z()
};
function Rd(e, t = new Xe()) {
  if (!e || e.length === 0)
    return t.halfAxes = new z([0, 0, 0, 0, 0, 0, 0, 0, 0]), t.center = new A(), t;
  const n = e.length, s = new A(0, 0, 0);
  for (const x of e)
    s.add(x);
  const r = 1 / n;
  s.multiplyByScalar(r);
  let i = 0, o = 0, a = 0, c = 0, u = 0, l = 0;
  for (const x of e) {
    const D = Jt.copy(x).subtract(s);
    i += D.x * D.x, o += D.x * D.y, a += D.x * D.z, c += D.y * D.y, u += D.y * D.z, l += D.z * D.z;
  }
  i *= r, o *= r, a *= r, c *= r, u *= r, l *= r;
  const h = _d;
  h[0] = i, h[1] = o, h[2] = a, h[3] = o, h[4] = c, h[5] = u, h[6] = a, h[7] = u, h[8] = l;
  const {
    unitary: f
  } = Ad(h, wd), d = t.halfAxes.copy(f);
  let m = d.getColumn(0, Ed), g = d.getColumn(1, Td), p = d.getColumn(2, bd), C = -Number.MAX_VALUE, w = -Number.MAX_VALUE, y = -Number.MAX_VALUE, B = Number.MAX_VALUE, R = Number.MAX_VALUE, T = Number.MAX_VALUE;
  for (const x of e)
    Jt.copy(x), C = Math.max(Jt.dot(m), C), w = Math.max(Jt.dot(g), w), y = Math.max(Jt.dot(p), y), B = Math.min(Jt.dot(m), B), R = Math.min(Jt.dot(g), R), T = Math.min(Jt.dot(p), T);
  m = m.multiplyByScalar(0.5 * (B + C)), g = g.multiplyByScalar(0.5 * (R + w)), p = p.multiplyByScalar(0.5 * (T + y)), t.center.copy(m).add(g).add(p);
  const v = Cd.set(C - B, w - R, y - T).multiplyByScalar(0.5), F = new z([v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
  return t.halfAxes.multiplyRight(F), t;
}
const Ri = new A(), ds = new A(), Ks = new ft([new Z(), new Z(), new Z(), new Z(), new Z(), new Z()]);
function Md(e, t) {
  const {
    cameraDirection: n,
    cameraUp: s,
    height: r
  } = e, {
    metersPerUnit: i
  } = e.distanceScales, o = En(e, e.center), a = J.WGS84.eastNorthUpToFixedFrame(o), c = e.unprojectPosition(e.cameraPosition), u = J.WGS84.cartographicToCartesian(c, new A()), l = new A(a.transformAsVector(new A(n).scale(i))).normalize(), h = new A(a.transformAsVector(new A(s).scale(i))).normalize();
  Id(e);
  const f = e.constructor, {
    longitude: d,
    latitude: m,
    width: g,
    bearing: p,
    zoom: C
  } = e, w = new f({
    longitude: d,
    latitude: m,
    height: r,
    width: g,
    bearing: p,
    zoom: C,
    pitch: 0
  });
  return {
    camera: {
      position: u,
      direction: l,
      up: h
    },
    viewport: e,
    topDownViewport: w,
    height: r,
    cullingVolume: Ks,
    frameNumber: t,
    sseDenominator: 1.15
  };
}
function Sd(e, t, n) {
  if (n === 0 || e.length <= n)
    return [e, []];
  const s = [], {
    longitude: r,
    latitude: i
  } = t.viewport;
  for (const [u, l] of e.entries()) {
    const [h, f] = l.header.mbs, d = Math.abs(r - h), m = Math.abs(i - f), g = Math.sqrt(m * m + d * d);
    s.push([u, g]);
  }
  const o = s.sort((u, l) => u[1] - l[1]), a = [];
  for (let u = 0; u < n; u++)
    a.push(e[o[u][0]]);
  const c = [];
  for (let u = n; u < o.length; u++)
    c.push(e[o[u][0]]);
  return [a, c];
}
function Id(e) {
  const t = e.getFrustumPlanes(), n = Mi(t.near, e.cameraPosition), s = En(e, n), r = En(e, e.cameraPosition, ds);
  let i = 0;
  Ks.planes[i++].fromPointNormal(s, Ri.copy(s).subtract(r));
  for (const o in t) {
    if (o === "near")
      continue;
    const a = t[o], c = Mi(a, n, ds), u = En(e, c, ds);
    Ks.planes[i++].fromPointNormal(u, Ri.copy(s).subtract(u));
  }
}
function Mi(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : new A();
  const s = e.normal.dot(t);
  return n.copy(e.normal).scale(e.distance - s).add(t), n;
}
function En(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : new A();
  const s = e.unprojectPosition(t);
  return J.WGS84.cartographicToCartesian(s, n);
}
const xd = 6378137, vd = 6378137, zs = 6356752314245179e-9, fe = new A();
function Fd(e, t) {
  if (e instanceof Xe) {
    const {
      halfAxes: n
    } = e, s = Dd(n);
    return Math.log2(zs / (s + t[2]));
  } else if (e instanceof We) {
    const {
      radius: n
    } = e;
    return Math.log2(zs / (n + t[2]));
  } else if (e.width && e.height) {
    const {
      width: n,
      height: s
    } = e, r = Math.log2(xd / n), i = Math.log2(vd / s);
    return (r + i) / 2;
  }
  return 1;
}
function _a(e, t, n) {
  J.WGS84.cartographicToCartesian([e.xmax, e.ymax, e.zmax], fe);
  const s = Math.sqrt(Math.pow(fe[0] - n[0], 2) + Math.pow(fe[1] - n[1], 2) + Math.pow(fe[2] - n[2], 2));
  return Math.log2(zs / (s + t[2]));
}
function Od(e, t, n) {
  const [s, r, i, o] = e;
  return _a({
    xmin: s,
    xmax: i,
    ymin: r,
    ymax: o,
    zmin: 0,
    zmax: 0
  }, t, n);
}
function Dd(e) {
  e.getColumn(0, fe);
  const t = e.getColumn(1), n = e.getColumn(2);
  return fe.add(t).add(n).len();
}
const ut = {
  UNLOADED: 0,
  LOADING: 1,
  PROCESSING: 2,
  READY: 3,
  EXPIRED: 4,
  FAILED: 5
};
let Ut = function(e) {
  return e[e.ADD = 1] = "ADD", e[e.REPLACE = 2] = "REPLACE", e;
}({}), qt = function(e) {
  return e.EMPTY = "empty", e.SCENEGRAPH = "scenegraph", e.POINTCLOUD = "pointcloud", e.MESH = "mesh", e;
}({}), pt = function(e) {
  return e.I3S = "I3S", e.TILES3D = "TILES3D", e;
}({}), zn = function(e) {
  return e.GEOMETRIC_ERROR = "geometricError", e.MAX_SCREEN_THRESHOLD = "maxScreenThreshold", e;
}({});
const Ld = {
  NOT_COMPUTED: -1,
  USE_OPTIMIZATION: 1,
  SKIP_OPTIMIZATION: 0
};
function wa(e) {
  return e != null;
}
const st = new A(), Tn = new A(), Pd = new A(), Gd = new A(), Xt = new A(), Si = new A(), Ii = new A(), xi = new A();
function ms(e, t, n) {
  if (U(e, "3D Tile: boundingVolume must be defined"), e.box)
    return Ra(e.box, t, n);
  if (e.region)
    return Hd(e.region);
  if (e.sphere)
    return Ud(e.sphere, t, n);
  throw new Error("3D Tile: boundingVolume must contain a sphere, region, or box");
}
function Nd(e, t) {
  if (e.box)
    return Jd(t);
  if (e.region) {
    const [n, s, r, i, o, a] = e.region;
    return [[wt(n), wt(s), o], [wt(r), wt(i), a]];
  }
  if (e.sphere)
    return Vd(t);
  throw new Error("Unkown boundingVolume type");
}
function Ra(e, t, n) {
  const s = new A(e[0], e[1], e[2]);
  t.transform(s, s);
  let r = [];
  if (e.length === 10) {
    const u = e.slice(3, 6), l = new In();
    l.fromArray(e, 6);
    const h = new A([1, 0, 0]), f = new A([0, 1, 0]), d = new A([0, 0, 1]);
    h.transformByQuaternion(l), h.scale(u[0]), f.transformByQuaternion(l), f.scale(u[1]), d.transformByQuaternion(l), d.scale(u[2]), r = [...h.toArray(), ...f.toArray(), ...d.toArray()];
  } else
    r = [...e.slice(3, 6), ...e.slice(6, 9), ...e.slice(9, 12)];
  const i = t.transformAsVector(r.slice(0, 3)), o = t.transformAsVector(r.slice(3, 6)), a = t.transformAsVector(r.slice(6, 9)), c = new z([i[0], i[1], i[2], o[0], o[1], o[2], a[0], a[1], a[2]]);
  return wa(n) ? (n.center = s, n.halfAxes = c, n) : new Xe(s, c);
}
function Ud(e, t, n) {
  const s = new A(e[0], e[1], e[2]);
  t.transform(s, s);
  const r = t.getScale(Tn), i = Math.max(Math.max(r[0], r[1]), r[2]), o = e[3] * i;
  return wa(n) ? (n.center = s, n.radius = o, n) : new We(s, o);
}
function Hd(e) {
  const [t, n, s, r, i, o] = e, a = J.WGS84.cartographicToCartesian([wt(t), wt(r), i], Pd), c = J.WGS84.cartographicToCartesian([wt(s), wt(n), o], Gd), u = new A().addVectors(a, c).multiplyByScalar(0.5);
  return J.WGS84.cartesianToCartographic(u, Xt), J.WGS84.cartographicToCartesian([wt(s), Xt[1], Xt[2]], Si), J.WGS84.cartographicToCartesian([Xt[0], wt(r), Xt[2]], Ii), J.WGS84.cartographicToCartesian([Xt[0], Xt[1], o], xi), Ra([...u, ...Si.subtract(u), ...Ii.subtract(u), ...xi.subtract(u)], new V());
}
function Jd(e) {
  const t = Ma(), {
    halfAxes: n
  } = e, s = new A(n.getColumn(0)), r = new A(n.getColumn(1)), i = new A(n.getColumn(2));
  for (let o = 0; o < 2; o++) {
    for (let a = 0; a < 2; a++) {
      for (let c = 0; c < 2; c++)
        st.copy(e.center), st.add(s), st.add(r), st.add(i), Sa(t, st), i.negate();
      r.negate();
    }
    s.negate();
  }
  return t;
}
function Vd(e) {
  const t = Ma(), {
    center: n,
    radius: s
  } = e, r = J.WGS84.scaleToGeodeticSurface(n, st);
  let i;
  r ? i = J.WGS84.geodeticSurfaceNormal(r) : i = new A(0, 0, 1);
  let o = new A(i[2], -i[1], 0);
  o.len() > 0 ? o.normalize() : o = new A(0, 1, 0);
  const a = o.clone().cross(i);
  for (const c of [o, a, i]) {
    Tn.copy(c).scale(s);
    for (let u = 0; u < 2; u++)
      st.copy(n), st.add(Tn), Sa(t, st), Tn.negate();
  }
  return t;
}
function Ma() {
  return [[1 / 0, 1 / 0, 1 / 0], [-1 / 0, -1 / 0, -1 / 0]];
}
function Sa(e, t) {
  J.WGS84.cartesianToCartographic(t, st), e[0][0] = Math.min(e[0][0], st[0]), e[0][1] = Math.min(e[0][1], st[1]), e[0][2] = Math.min(e[0][2], st[2]), e[1][0] = Math.max(e[1][0], st[0]), e[1][1] = Math.max(e[1][1], st[1]), e[1][2] = Math.max(e[1][2], st[2]);
}
new A();
new A();
new V();
new A();
new A();
new A();
function jd(e, t) {
  const n = e * t;
  return 1 - Math.exp(-(n * n));
}
function kd(e, t) {
  if (e.dynamicScreenSpaceError && e.dynamicScreenSpaceErrorComputedDensity) {
    const n = e.dynamicScreenSpaceErrorComputedDensity, s = e.dynamicScreenSpaceErrorFactor;
    return jd(t, n) * s;
  }
  return 0;
}
function Kd(e, t, n) {
  const s = e.tileset, r = e.parent && e.parent.lodMetricValue || e.lodMetricValue, i = n ? r : e.lodMetricValue;
  if (i === 0)
    return 0;
  const o = Math.max(e._distanceToCamera, 1e-7), {
    height: a,
    sseDenominator: c
  } = t, {
    viewDistanceScale: u
  } = s.options;
  let l = i * a * (u || 1) / (o * c);
  return l -= kd(s, o), l;
}
const gs = new A(), vi = new A(), Vt = new A(), Fi = new A(), zd = new A(), As = new V(), Oi = new V();
function Wd(e, t) {
  if (e.lodMetricValue === 0 || isNaN(e.lodMetricValue))
    return "DIG";
  const n = 2 * Ia(e, t);
  return n < 2 ? "OUT" : !e.header.children || n <= e.lodMetricValue ? "DRAW" : e.header.children ? "DIG" : "OUT";
}
function Ia(e, t) {
  const {
    topDownViewport: n
  } = t, s = e.header.mbs[1], r = e.header.mbs[0], i = e.header.mbs[2], o = e.header.mbs[3], a = [...e.boundingVolume.center], c = n.unprojectPosition(n.cameraPosition);
  J.WGS84.cartographicToCartesian(c, gs), vi.copy(gs).subtract(a).normalize(), J.WGS84.eastNorthUpToFixedFrame(a, As), Oi.copy(As).invert(), Vt.copy(gs).transform(Oi);
  const u = Math.sqrt(Vt[0] * Vt[0] + Vt[1] * Vt[1]), l = u * u / Vt[2];
  Fi.copy([Vt[0], Vt[1], l]);
  const f = Fi.transform(As).subtract(a).normalize(), m = vi.cross(f).normalize().scale(o).add(a), g = J.WGS84.cartesianToCartographic(m), p = n.project([r, s, i]), C = n.project(g);
  return zd.copy(p).subtract(C).magnitude();
}
function Xd(e) {
  return {
    assetGltfUpAxis: e.asset && e.asset.gltfUpAxis || "Y"
  };
}
class Di {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    this._map = /* @__PURE__ */ new Map(), this._array = void 0, this._length = void 0, this._array = new Array(t), this._length = t;
  }
  get length() {
    return this._length;
  }
  set length(t) {
    this._length = t, t > this._array.length && (this._array.length = t);
  }
  get values() {
    return this._array;
  }
  get(t) {
    return U(t < this._array.length), this._array[t];
  }
  set(t, n) {
    U(t >= 0), t >= this.length && (this.length = t + 1), this._map.has(this._array[t]) && this._map.delete(this._array[t]), this._array[t] = n, this._map.set(n, t);
  }
  delete(t) {
    const n = this._map.get(t);
    n >= 0 && (this._array.splice(n, 1), this._map.delete(t), this.length--);
  }
  peek() {
    return this._array[this._length - 1];
  }
  push(t) {
    if (!this._map.has(t)) {
      const n = this.length++;
      this._array[n] = t, this._map.set(t, n);
    }
  }
  pop() {
    const t = this._array[--this.length];
    return this._map.delete(t), t;
  }
  reserve(t) {
    U(t >= 0), t > this._array.length && (this._array.length = t);
  }
  resize(t) {
    U(t >= 0), this.length = t;
  }
  trim(t) {
    t == null && (t = this.length), this._array.length = t;
  }
  reset() {
    this._array = [], this._map = /* @__PURE__ */ new Map(), this._length = 0;
  }
  find(t) {
    return this._map.has(t);
  }
}
const Qd = {
  loadSiblings: !1,
  skipLevelOfDetail: !1,
  updateTransforms: !0,
  onTraversalEnd: () => {
  },
  viewportTraversersMap: {},
  basePath: ""
};
class Wn {
  traversalFinished(t) {
    return !0;
  }
  constructor(t) {
    this.options = void 0, this.root = null, this.selectedTiles = {}, this.requestedTiles = {}, this.emptyTiles = {}, this.lastUpdate = (/* @__PURE__ */ new Date()).getTime(), this.updateDebounceTime = 1e3, this._traversalStack = new Di(), this._emptyTraversalStack = new Di(), this._frameNumber = null, this.options = {
      ...Qd,
      ...t
    };
  }
  traverse(t, n, s) {
    this.root = t, this.options = {
      ...this.options,
      ...s
    }, this.reset(), this.updateTile(t, n), this._frameNumber = n.frameNumber, this.executeTraversal(t, n);
  }
  reset() {
    this.requestedTiles = {}, this.selectedTiles = {}, this.emptyTiles = {}, this._traversalStack.reset(), this._emptyTraversalStack.reset();
  }
  executeTraversal(t, n) {
    const s = this._traversalStack;
    for (t._selectionDepth = 1, s.push(t); s.length > 0; ) {
      const i = s.pop();
      let o = !1;
      this.canTraverse(i, n) && (this.updateChildTiles(i, n), o = this.updateAndPushChildren(i, n, s, i.hasRenderContent ? i._selectionDepth + 1 : i._selectionDepth));
      const a = i.parent, c = !!(!a || a._shouldRefine), u = !o;
      i.hasRenderContent ? i.refine === Ut.ADD ? (this.loadTile(i, n), this.selectTile(i, n)) : i.refine === Ut.REPLACE && (this.loadTile(i, n), u && this.selectTile(i, n)) : (this.emptyTiles[i.id] = i, this.loadTile(i, n), u && this.selectTile(i, n)), this.touchTile(i, n), i._shouldRefine = o && c;
    }
    const r = (/* @__PURE__ */ new Date()).getTime();
    (this.traversalFinished(n) || r - this.lastUpdate > this.updateDebounceTime) && (this.lastUpdate = r, this.options.onTraversalEnd(n));
  }
  updateChildTiles(t, n) {
    const s = t.children;
    for (const r of s)
      this.updateTile(r, n);
  }
  updateAndPushChildren(t, n, s, r) {
    const {
      loadSiblings: i,
      skipLevelOfDetail: o
    } = this.options, a = t.children;
    a.sort(this.compareDistanceToCamera.bind(this));
    const c = t.refine === Ut.REPLACE && t.hasRenderContent && !o;
    let u = !1, l = !0;
    for (const h of a)
      if (h._selectionDepth = r, h.isVisibleAndInRequestVolume ? (s.find(h) && s.delete(h), s.push(h), u = !0) : (c || i) && (this.loadTile(h, n), this.touchTile(h, n)), c) {
        let f;
        if (h._inRequestVolume ? h.hasRenderContent ? f = h.contentAvailable : f = this.executeEmptyTraversal(h, n) : f = !1, l = l && f, !l)
          return !1;
      }
    return u || (l = !1), l;
  }
  updateTile(t, n) {
    this.updateTileVisibility(t, n);
  }
  selectTile(t, n) {
    this.shouldSelectTile(t) && (t._selectedFrame = n.frameNumber, this.selectedTiles[t.id] = t);
  }
  loadTile(t, n) {
    this.shouldLoadTile(t) && (t._requestedFrame = n.frameNumber, t._priority = t._getPriority(), this.requestedTiles[t.id] = t);
  }
  touchTile(t, n) {
    t.tileset._cache.touch(t), t._touchedFrame = n.frameNumber;
  }
  canTraverse(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    return t.hasChildren ? t.hasTilesetContent ? !t.contentExpired : !r && !t.isVisibleAndInRequestVolume ? !1 : this.shouldRefine(t, n, s) : !1;
  }
  shouldLoadTile(t) {
    return t.hasUnloadedContent || t.contentExpired;
  }
  shouldSelectTile(t) {
    return t.contentAvailable && !this.options.skipLevelOfDetail;
  }
  shouldRefine(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = t._screenSpaceError;
    return s && (r = t.getScreenSpaceError(n, !0)), r > t.tileset.memoryAdjustedScreenSpaceError;
  }
  updateTileVisibility(t, n) {
    const s = [];
    if (this.options.viewportTraversersMap)
      for (const r in this.options.viewportTraversersMap)
        this.options.viewportTraversersMap[r] === n.viewport.id && s.push(r);
    else
      s.push(n.viewport.id);
    t.updateVisibility(n, s);
  }
  compareDistanceToCamera(t, n) {
    return t._distanceToCamera - n._distanceToCamera;
  }
  anyChildrenVisible(t, n) {
    let s = !1;
    for (const r of t.children)
      r.updateVisibility(n), s = s || r.isVisibleAndInRequestVolume;
    return s;
  }
  executeEmptyTraversal(t, n) {
    let s = !0;
    const r = this._emptyTraversalStack;
    for (r.push(t); r.length > 0; ) {
      const i = r.pop(), o = !i.hasRenderContent && this.canTraverse(i, n, !1, !1), a = !i.hasRenderContent && i.children.length === 0;
      if (!o && !i.contentAvailable && !a && (s = !1), this.updateTile(i, n), i.isVisibleAndInRequestVolume || (this.loadTile(i, n), this.touchTile(i, n)), o) {
        const c = i.children;
        for (const u of c)
          r.push(u);
      }
    }
    return s;
  }
}
const Li = new A();
function qd(e) {
  return e != null;
}
class Ws {
  constructor(t, n, s) {
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
    this.tileset = void 0, this.header = void 0, this.id = void 0, this.url = void 0, this.parent = void 0, this.refine = void 0, this.type = void 0, this.contentUrl = void 0, this.lodMetricType = "geometricError", this.lodMetricValue = 0, this.boundingVolume = null, this.content = null, this.contentState = ut.UNLOADED, this.gpuMemoryUsageInBytes = 0, this.children = [], this.depth = 0, this.viewportIds = [], this.transform = new V(), this.extensions = null, this.implicitTiling = null, this.userData = {}, this.computedTransform = void 0, this.hasEmptyContent = !1, this.hasTilesetContent = !1, this.traverser = new Wn({}), this._cacheNode = null, this._frameNumber = null, this._expireDate = null, this._expiredContent = null, this._boundingBox = void 0, this._distanceToCamera = 0, this._screenSpaceError = 0, this._visibilityPlaneMask = void 0, this._visible = void 0, this._contentBoundingVolume = void 0, this._viewerRequestVolume = void 0, this._initialTransform = new V(), this._priority = 0, this._selectedFrame = 0, this._requestedFrame = 0, this._selectionDepth = 0, this._touchedFrame = 0, this._centerZDepth = 0, this._shouldRefine = !1, this._stackLength = 0, this._visitedFrame = 0, this._inRequestVolume = !1, this._lodJudge = null, this.header = n, this.tileset = t, this.id = r || n.id, this.url = n.url, this.parent = s, this.refine = this._getRefine(n.refine), this.type = n.type, this.contentUrl = n.contentUrl, this._initializeLodMetric(n), this._initializeTransforms(n), this._initializeBoundingVolumes(n), this._initializeContent(n), this._initializeRenderingState(n), Object.seal(this);
  }
  destroy() {
    this.header = null;
  }
  isDestroyed() {
    return this.header === null;
  }
  get selected() {
    return this._selectedFrame === this.tileset._frameNumber;
  }
  get isVisible() {
    return this._visible;
  }
  get isVisibleAndInRequestVolume() {
    return this._visible && this._inRequestVolume;
  }
  get hasRenderContent() {
    return !this.hasEmptyContent && !this.hasTilesetContent;
  }
  get hasChildren() {
    return this.children.length > 0 || this.header.children && this.header.children.length > 0;
  }
  get contentReady() {
    return this.contentState === ut.READY || this.hasEmptyContent;
  }
  get contentAvailable() {
    return !!(this.contentReady && this.hasRenderContent || this._expiredContent && !this.contentFailed);
  }
  get hasUnloadedContent() {
    return this.hasRenderContent && this.contentUnloaded;
  }
  get contentUnloaded() {
    return this.contentState === ut.UNLOADED;
  }
  get contentExpired() {
    return this.contentState === ut.EXPIRED;
  }
  get contentFailed() {
    return this.contentState === ut.FAILED;
  }
  get distanceToCamera() {
    return this._distanceToCamera;
  }
  get screenSpaceError() {
    return this._screenSpaceError;
  }
  get boundingBox() {
    return this._boundingBox || (this._boundingBox = Nd(this.header.boundingVolume, this.boundingVolume)), this._boundingBox;
  }
  getScreenSpaceError(t, n) {
    switch (this.tileset.type) {
      case pt.I3S:
        return Ia(this, t);
      case pt.TILES3D:
        return Kd(this, t, n);
      default:
        throw new Error("Unsupported tileset type");
    }
  }
  unselect() {
    this._selectedFrame = 0;
  }
  _getGpuMemoryUsageInBytes() {
    return this.content.gpuMemoryUsageInBytes || this.content.byteLength || 0;
  }
  _getPriority() {
    const t = this.tileset._traverser, {
      skipLevelOfDetail: n
    } = t.options, s = this.refine === Ut.ADD || n;
    if (s && !this.isVisible && this._visible !== void 0 || this.tileset._frameNumber - this._touchedFrame >= 1 || this.contentState === ut.UNLOADED)
      return -1;
    const r = this.parent, o = r && (!s || this._screenSpaceError === 0 || r.hasTilesetContent) ? r._screenSpaceError : this._screenSpaceError, a = t.root ? t.root._screenSpaceError : 0;
    return Math.max(a - o, 0);
  }
  async loadContent() {
    if (this.hasEmptyContent)
      return !1;
    if (this.content)
      return !0;
    this.contentExpired && (this._expireDate = null), this.contentState = ut.LOADING;
    const n = await this.tileset._requestScheduler.scheduleRequest(this.id, this._getPriority.bind(this));
    if (!n)
      return this.contentState = ut.UNLOADED, !1;
    try {
      const s = this.tileset.getTileUrl(this.contentUrl), r = this.tileset.loader, i = {
        ...this.tileset.loadOptions,
        [r.id]: {
          ...this.tileset.loadOptions[r.id],
          isTileset: this.type === "json",
          ...this._getLoaderSpecificOptions(r.id)
        }
      };
      return this.content = await ge(s, r, i), this.tileset.options.contentLoader && await this.tileset.options.contentLoader(this), this._isTileset() && this.tileset._initializeTileHeaders(this.content, this), this.contentState = ut.READY, this._onContentLoaded(), !0;
    } catch (s) {
      throw this.contentState = ut.FAILED, s;
    } finally {
      n.done();
    }
  }
  unloadContent() {
    return this.content && this.content.destroy && this.content.destroy(), this.content = null, this.header.content && this.header.content.destroy && this.header.content.destroy(), this.header.content = null, this.contentState = ut.UNLOADED, !0;
  }
  updateVisibility(t, n) {
    if (this._frameNumber === t.frameNumber)
      return;
    const s = this.parent, r = s ? s._visibilityPlaneMask : ft.MASK_INDETERMINATE;
    if (this.tileset._traverser.options.updateTransforms) {
      const i = s ? s.computedTransform : this.tileset.modelMatrix;
      this._updateTransform(i);
    }
    this._distanceToCamera = this.distanceToTile(t), this._screenSpaceError = this.getScreenSpaceError(t, !1), this._visibilityPlaneMask = this.visibility(t, r), this._visible = this._visibilityPlaneMask !== ft.MASK_OUTSIDE, this._inRequestVolume = this.insideViewerRequestVolume(t), this._frameNumber = t.frameNumber, this.viewportIds = n;
  }
  visibility(t, n) {
    const {
      cullingVolume: s
    } = t, {
      boundingVolume: r
    } = this;
    return s.computeVisibilityWithPlaneMask(r, n);
  }
  contentVisibility() {
    return !0;
  }
  distanceToTile(t) {
    const n = this.boundingVolume;
    return Math.sqrt(Math.max(n.distanceSquaredTo(t.camera.position), 0));
  }
  cameraSpaceZDepth(t) {
    let {
      camera: n
    } = t;
    const s = this.boundingVolume;
    return Li.subVectors(s.center, n.position), n.direction.dot(Li);
  }
  insideViewerRequestVolume(t) {
    const n = this._viewerRequestVolume;
    return !n || n.distanceSquaredTo(t.camera.position) <= 0;
  }
  updateExpiration() {
    if (qd(this._expireDate) && this.contentReady && !this.hasEmptyContent) {
      const t = Date.now();
      Date.lessThan(this._expireDate, t) && (this.contentState = ut.EXPIRED, this._expiredContent = this.content);
    }
  }
  get extras() {
    return this.header.extras;
  }
  _initializeLodMetric(t) {
    "lodMetricType" in t ? this.lodMetricType = t.lodMetricType : (this.lodMetricType = this.parent && this.parent.lodMetricType || this.tileset.lodMetricType, console.warn("3D Tile: Required prop lodMetricType is undefined. Using parent lodMetricType")), "lodMetricValue" in t ? this.lodMetricValue = t.lodMetricValue : (this.lodMetricValue = this.parent && this.parent.lodMetricValue || this.tileset.lodMetricValue, console.warn("3D Tile: Required prop lodMetricValue is undefined. Using parent lodMetricValue"));
  }
  _initializeTransforms(t) {
    this.transform = t.transform ? new V(t.transform) : new V();
    const n = this.parent, s = this.tileset, r = n && n.computedTransform ? n.computedTransform.clone() : s.modelMatrix.clone();
    this.computedTransform = new V(r).multiplyRight(this.transform);
    const i = n && n._initialTransform ? n._initialTransform.clone() : new V();
    this._initialTransform = new V(i).multiplyRight(this.transform);
  }
  _initializeBoundingVolumes(t) {
    this._contentBoundingVolume = null, this._viewerRequestVolume = null, this._updateBoundingVolume(t);
  }
  _initializeContent(t) {
    this.content = {
      _tileset: this.tileset,
      _tile: this
    }, this.hasEmptyContent = !0, this.contentState = ut.UNLOADED, this.hasTilesetContent = !1, t.contentUrl && (this.content = null, this.hasEmptyContent = !1);
  }
  _initializeRenderingState(t) {
    this.depth = t.level || (this.parent ? this.parent.depth + 1 : 0), this._shouldRefine = !1, this._distanceToCamera = 0, this._centerZDepth = 0, this._screenSpaceError = 0, this._visibilityPlaneMask = ft.MASK_INDETERMINATE, this._visible = void 0, this._inRequestVolume = !1, this._stackLength = 0, this._selectionDepth = 0, this._frameNumber = 0, this._touchedFrame = 0, this._visitedFrame = 0, this._selectedFrame = 0, this._requestedFrame = 0, this._priority = 0;
  }
  _getRefine(t) {
    return t || this.parent && this.parent.refine || Ut.REPLACE;
  }
  _isTileset() {
    return this.contentUrl.indexOf(".json") !== -1;
  }
  _onContentLoaded() {
    switch (this.content && this.content.type) {
      case "vctr":
      case "geom":
        this.tileset._traverser.disableSkipLevelOfDetail = !0;
        break;
    }
    this._isTileset() ? this.hasTilesetContent = !0 : this.gpuMemoryUsageInBytes = this._getGpuMemoryUsageInBytes();
  }
  _updateBoundingVolume(t) {
    this.boundingVolume = ms(t.boundingVolume, this.computedTransform, this.boundingVolume);
    const n = t.content;
    n && (n.boundingVolume && (this._contentBoundingVolume = ms(n.boundingVolume, this.computedTransform, this._contentBoundingVolume)), t.viewerRequestVolume && (this._viewerRequestVolume = ms(t.viewerRequestVolume, this.computedTransform, this._viewerRequestVolume)));
  }
  _updateTransform() {
    const n = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new V()).clone().multiplyRight(this.transform);
    n.equals(this.computedTransform) || (this.computedTransform = n, this._updateBoundingVolume(this.header));
  }
  _getLoaderSpecificOptions(t) {
    switch (t) {
      case "i3s":
        return {
          ...this.tileset.options.i3s,
          _tileOptions: {
            attributeUrls: this.header.attributeUrls,
            textureUrl: this.header.textureUrl,
            textureFormat: this.header.textureFormat,
            textureLoaderOptions: this.header.textureLoaderOptions,
            materialDefinition: this.header.materialDefinition,
            isDracoGeometry: this.header.isDracoGeometry,
            mbs: this.header.mbs
          },
          _tilesetOptions: {
            store: this.tileset.tileset.store,
            attributeStorageInfo: this.tileset.tileset.attributeStorageInfo,
            fields: this.tileset.tileset.fields
          },
          isTileHeader: !1
        };
      case "3d-tiles":
      case "cesium-ion":
      default:
        return Xd(this.tileset.tileset);
    }
  }
}
class Yd extends Wn {
  compareDistanceToCamera(t, n) {
    return n._distanceToCamera === 0 && t._distanceToCamera === 0 ? n._centerZDepth - t._centerZDepth : n._distanceToCamera - t._distanceToCamera;
  }
  updateTileVisibility(t, n) {
    if (super.updateTileVisibility(t, n), !t.isVisibleAndInRequestVolume)
      return;
    const s = t.children.length > 0;
    if (t.hasTilesetContent && s) {
      const o = t.children[0];
      this.updateTileVisibility(o, n), t._visible = o._visible;
      return;
    }
    if (this.meetsScreenSpaceErrorEarly(t, n)) {
      t._visible = !1;
      return;
    }
    const r = t.refine === Ut.REPLACE, i = t._optimChildrenWithinParent === Ld.USE_OPTIMIZATION;
    if (r && i && s && !this.anyChildrenVisible(t, n)) {
      t._visible = !1;
      return;
    }
  }
  meetsScreenSpaceErrorEarly(t, n) {
    const {
      parent: s
    } = t;
    return !s || s.hasTilesetContent || s.refine !== Ut.ADD ? !1 : !this.shouldRefine(t, n, !0);
  }
}
class $d {
  constructor() {
    this.frameNumberMap = /* @__PURE__ */ new Map();
  }
  register(t, n) {
    const s = this.frameNumberMap.get(t) || /* @__PURE__ */ new Map(), r = s.get(n) || 0;
    s.set(n, r + 1), this.frameNumberMap.set(t, s);
  }
  deregister(t, n) {
    const s = this.frameNumberMap.get(t);
    if (!s)
      return;
    const r = s.get(n) || 1;
    s.set(n, r - 1);
  }
  isZero(t, n) {
    var s;
    return (((s = this.frameNumberMap.get(t)) === null || s === void 0 ? void 0 : s.get(n)) || 0) === 0;
  }
}
const ps = {
  REQUESTED: "REQUESTED",
  COMPLETED: "COMPLETED",
  ERROR: "ERROR"
};
class Zd {
  constructor() {
    this._statusMap = void 0, this.pendingTilesRegister = new $d(), this._statusMap = {};
  }
  add(t, n, s, r) {
    if (!this._statusMap[n]) {
      const {
        frameNumber: i,
        viewport: {
          id: o
        }
      } = r;
      this._statusMap[n] = {
        request: t,
        callback: s,
        key: n,
        frameState: r,
        status: ps.REQUESTED
      }, this.pendingTilesRegister.register(o, i), t().then((a) => {
        this._statusMap[n].status = ps.COMPLETED;
        const {
          frameNumber: c,
          viewport: {
            id: u
          }
        } = this._statusMap[n].frameState;
        this.pendingTilesRegister.deregister(u, c), this._statusMap[n].callback(a, r);
      }).catch((a) => {
        this._statusMap[n].status = ps.ERROR;
        const {
          frameNumber: c,
          viewport: {
            id: u
          }
        } = this._statusMap[n].frameState;
        this.pendingTilesRegister.deregister(u, c), s(a);
      });
    }
  }
  update(t, n) {
    if (this._statusMap[t]) {
      const {
        frameNumber: s,
        viewport: {
          id: r
        }
      } = this._statusMap[t].frameState;
      this.pendingTilesRegister.deregister(r, s);
      const {
        frameNumber: i,
        viewport: {
          id: o
        }
      } = n;
      this.pendingTilesRegister.register(o, i), this._statusMap[t].frameState = n;
    }
  }
  find(t) {
    return this._statusMap[t];
  }
  hasPendingTiles(t, n) {
    return !this.pendingTilesRegister.isZero(t, n);
  }
}
class tm extends Wn {
  constructor(t) {
    super(t), this._tileManager = void 0, this._tileManager = new Zd();
  }
  traversalFinished(t) {
    return !this._tileManager.hasPendingTiles(t.viewport.id, this._frameNumber || 0);
  }
  shouldRefine(t, n) {
    return t._lodJudge = Wd(t, n), t._lodJudge === "DIG";
  }
  updateChildTiles(t, n) {
    const s = t.header.children || [], r = t.children, i = t.tileset;
    for (const o of s) {
      const a = `${o.id}-${n.viewport.id}`, c = r && r.find((u) => u.id === a);
      if (c)
        c && this.updateTile(c, n);
      else {
        let u = () => this._loadTile(o.id, i);
        this._tileManager.find(a) ? this._tileManager.update(a, n) : (i.tileset.nodePages && (u = () => i.tileset.nodePagesTile.formTileFromNodePages(o.id)), this._tileManager.add(u, a, (h) => this._onTileLoad(h, t, a), n));
      }
    }
    return !1;
  }
  async _loadTile(t, n) {
    const {
      loader: s
    } = n, r = n.getTileUrl(`${n.url}/nodes/${t}`), i = {
      ...n.loadOptions,
      i3s: {
        ...n.loadOptions.i3s,
        isTileHeader: !0
      }
    };
    return await ge(r, s, i);
  }
  _onTileLoad(t, n, s) {
    const r = new Ws(n.tileset, t, n, s);
    n.children.push(r);
    const i = this._tileManager.find(r.id).frameState;
    this.updateTile(r, i), this._frameNumber === i.frameNumber && (this.traversalFinished(i) || (/* @__PURE__ */ new Date()).getTime() - this.lastUpdate > this.updateDebounceTime) && this.executeTraversal(r, i);
  }
}
const em = {
  description: "",
  ellipsoid: J.WGS84,
  modelMatrix: new V(),
  throttleRequests: !0,
  maxRequests: 64,
  maximumMemoryUsage: 32,
  memoryCacheOverflow: 1,
  maximumTilesSelected: 0,
  debounceTime: 0,
  onTileLoad: () => {
  },
  onTileUnload: () => {
  },
  onTileError: () => {
  },
  onTraversalComplete: (e) => e,
  contentLoader: void 0,
  viewDistanceScale: 1,
  maximumScreenSpaceError: 8,
  memoryAdjustedScreenSpaceError: !1,
  loadTiles: !0,
  updateTransforms: !0,
  viewportTraversersMap: null,
  loadOptions: {
    fetch: {}
  },
  attributions: [],
  basePath: "",
  i3s: {}
}, hn = "Tiles In Tileset(s)", ys = "Tiles In Memory", Pi = "Tiles In View", Gi = "Tiles To Render", Ni = "Tiles Loaded", Bs = "Tiles Loading", Ui = "Tiles Unloaded", Hi = "Failed Tile Loads", Ji = "Points/Vertices", Cs = "Tile Memory Use", Vi = "Maximum Screen Space Error";
class nm {
  constructor(t, n) {
    this.options = void 0, this.loadOptions = void 0, this.type = void 0, this.tileset = void 0, this.loader = void 0, this.url = void 0, this.basePath = void 0, this.modelMatrix = void 0, this.ellipsoid = void 0, this.lodMetricType = void 0, this.lodMetricValue = void 0, this.refine = void 0, this.root = null, this.roots = {}, this.asset = {}, this.description = "", this.properties = void 0, this.extras = null, this.attributions = {}, this.credits = {}, this.stats = void 0, this.contentFormats = {
      draco: !1,
      meshopt: !1,
      dds: !1,
      ktx2: !1
    }, this.cartographicCenter = null, this.cartesianCenter = null, this.zoom = 1, this.boundingVolume = null, this.dynamicScreenSpaceErrorComputedDensity = 0, this.maximumMemoryUsage = 32, this.gpuMemoryUsageInBytes = 0, this.memoryAdjustedScreenSpaceError = 0, this._cacheBytes = 0, this._cacheOverflowBytes = 0, this._frameNumber = 0, this._queryParams = {}, this._extensionsUsed = [], this._tiles = {}, this._pendingCount = 0, this.selectedTiles = [], this.traverseCounter = 0, this.geometricError = 0, this.lastUpdatedVieports = null, this._requestedTiles = [], this._emptyTiles = [], this.frameStateData = {}, this._traverser = void 0, this._cache = new ed(), this._requestScheduler = void 0, this.updatePromise = null, this.tilesetInitializationPromise = void 0, this.options = {
      ...em,
      ...n
    }, this.tileset = t, this.loader = t.loader, this.type = t.type, this.url = t.url, this.basePath = t.basePath || hr(this.url), this.modelMatrix = this.options.modelMatrix, this.ellipsoid = this.options.ellipsoid, this.lodMetricType = t.lodMetricType, this.lodMetricValue = t.lodMetricValue, this.refine = t.root.refine, this.loadOptions = this.options.loadOptions || {}, this._traverser = this._initializeTraverser(), this._requestScheduler = new Lu({
      throttleRequests: this.options.throttleRequests,
      maxRequests: this.options.maxRequests
    }), this.memoryAdjustedScreenSpaceError = this.options.maximumScreenSpaceError, this._cacheBytes = this.options.maximumMemoryUsage * 1024 * 1024, this._cacheOverflowBytes = this.options.memoryCacheOverflow * 1024 * 1024, this.stats = new zo({
      id: this.url
    }), this._initializeStats(), this.tilesetInitializationPromise = this._initializeTileSet(t);
  }
  destroy() {
    this._destroy();
  }
  isLoaded() {
    return this._pendingCount === 0 && this._frameNumber !== 0 && this._requestedTiles.length === 0;
  }
  get tiles() {
    return Object.values(this._tiles);
  }
  get frameNumber() {
    return this._frameNumber;
  }
  get queryParams() {
    return new URLSearchParams(this._queryParams).toString();
  }
  setProps(t) {
    this.options = {
      ...this.options,
      ...t
    };
  }
  getTileUrl(t) {
    if (t.startsWith("data:"))
      return t;
    let s = t;
    return this.queryParams.length && (s = `${t}${t.includes("?") ? "&" : "?"}${this.queryParams}`), s;
  }
  hasExtension(t) {
    return this._extensionsUsed.indexOf(t) > -1;
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    this.tilesetInitializationPromise.then(() => {
      !t && this.lastUpdatedVieports ? t = this.lastUpdatedVieports : this.lastUpdatedVieports = t, t && this.doUpdate(t);
    });
  }
  async selectTiles() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    return await this.tilesetInitializationPromise, t && (this.lastUpdatedVieports = t), this.updatePromise || (this.updatePromise = new Promise((n) => {
      setTimeout(() => {
        this.lastUpdatedVieports && this.doUpdate(this.lastUpdatedVieports), n(this._frameNumber), this.updatePromise = null;
      }, this.options.debounceTime);
    })), this.updatePromise;
  }
  adjustScreenSpaceError() {
    this.gpuMemoryUsageInBytes < this._cacheBytes ? this.memoryAdjustedScreenSpaceError = Math.max(this.memoryAdjustedScreenSpaceError / 1.02, this.options.maximumScreenSpaceError) : this.gpuMemoryUsageInBytes > this._cacheBytes + this._cacheOverflowBytes && (this.memoryAdjustedScreenSpaceError *= 1.02);
  }
  doUpdate(t) {
    if ("loadTiles" in this.options && !this.options.loadTiles || this.traverseCounter > 0)
      return;
    const n = t instanceof Array ? t : [t];
    this._cache.reset(), this._frameNumber++, this.traverseCounter = n.length;
    const s = [];
    for (const r of n) {
      const i = r.id;
      this._needTraverse(i) ? s.push(i) : this.traverseCounter--;
    }
    for (const r of n) {
      const i = r.id;
      if (this.roots[i] || (this.roots[i] = this._initializeTileHeaders(this.tileset, null)), !s.includes(i))
        continue;
      const o = Md(r, this._frameNumber);
      this._traverser.traverse(this.roots[i], o, this.options);
    }
  }
  _needTraverse(t) {
    let n = t;
    return this.options.viewportTraversersMap && (n = this.options.viewportTraversersMap[t]), n === t;
  }
  _onTraversalEnd(t) {
    const n = t.viewport.id;
    this.frameStateData[n] || (this.frameStateData[n] = {
      selectedTiles: [],
      _requestedTiles: [],
      _emptyTiles: []
    });
    const s = this.frameStateData[n], r = Object.values(this._traverser.selectedTiles), [i, o] = Sd(r, t, this.options.maximumTilesSelected);
    s.selectedTiles = i;
    for (const a of o)
      a.unselect();
    s._requestedTiles = Object.values(this._traverser.requestedTiles), s._emptyTiles = Object.values(this._traverser.emptyTiles), this.traverseCounter--, !(this.traverseCounter > 0) && this._updateTiles();
  }
  _updateTiles() {
    this.selectedTiles = [], this._requestedTiles = [], this._emptyTiles = [];
    for (const t in this.frameStateData) {
      const n = this.frameStateData[t];
      this.selectedTiles = this.selectedTiles.concat(n.selectedTiles), this._requestedTiles = this._requestedTiles.concat(n._requestedTiles), this._emptyTiles = this._emptyTiles.concat(n._emptyTiles);
    }
    this.selectedTiles = this.options.onTraversalComplete(this.selectedTiles);
    for (const t of this.selectedTiles)
      this._tiles[t.id] = t;
    this._loadTiles(), this._unloadTiles(), this._updateStats();
  }
  _tilesChanged(t, n) {
    if (t.length !== n.length)
      return !0;
    const s = new Set(t.map((o) => o.id)), r = new Set(n.map((o) => o.id));
    let i = t.filter((o) => !r.has(o.id)).length > 0;
    return i = i || n.filter((o) => !s.has(o.id)).length > 0, i;
  }
  _loadTiles() {
    for (const t of this._requestedTiles)
      t.contentUnloaded && this._loadTile(t);
  }
  _unloadTiles() {
    this._cache.unloadTiles(this, (t, n) => t._unloadTile(n));
  }
  _updateStats() {
    let t = 0, n = 0;
    for (const s of this.selectedTiles)
      s.contentAvailable && s.content && (t++, s.content.pointCount ? n += s.content.pointCount : n += s.content.vertexCount);
    this.stats.get(Pi).count = this.selectedTiles.length, this.stats.get(Gi).count = t, this.stats.get(Ji).count = n, this.stats.get(Vi).count = this.memoryAdjustedScreenSpaceError;
  }
  async _initializeTileSet(t) {
    this.type === pt.I3S && (this.calculateViewPropsI3S(), t.root = await t.root), this.root = this._initializeTileHeaders(t, null), this.type === pt.TILES3D && (this._initializeTiles3DTileset(t), this.calculateViewPropsTiles3D()), this.type === pt.I3S && this._initializeI3STileset();
  }
  calculateViewPropsI3S() {
    var t;
    const n = this.tileset.fullExtent;
    if (n) {
      const {
        xmin: r,
        xmax: i,
        ymin: o,
        ymax: a,
        zmin: c,
        zmax: u
      } = n;
      this.cartographicCenter = new A(r + (i - r) / 2, o + (a - o) / 2, c + (u - c) / 2), this.cartesianCenter = new A(), J.WGS84.cartographicToCartesian(this.cartographicCenter, this.cartesianCenter), this.zoom = _a(n, this.cartographicCenter, this.cartesianCenter);
      return;
    }
    const s = (t = this.tileset.store) === null || t === void 0 ? void 0 : t.extent;
    if (s) {
      const [r, i, o, a] = s;
      this.cartographicCenter = new A(r + (o - r) / 2, i + (a - i) / 2, 0), this.cartesianCenter = new A(), J.WGS84.cartographicToCartesian(this.cartographicCenter, this.cartesianCenter), this.zoom = Od(s, this.cartographicCenter, this.cartesianCenter);
      return;
    }
    console.warn("Extent is not defined in the tileset header"), this.cartographicCenter = new A(), this.zoom = 1;
  }
  calculateViewPropsTiles3D() {
    const t = this.root, {
      center: n
    } = t.boundingVolume;
    if (!n) {
      console.warn("center was not pre-calculated for the root tile"), this.cartographicCenter = new A(), this.zoom = 1;
      return;
    }
    n[0] !== 0 || n[1] !== 0 || n[2] !== 0 ? (this.cartographicCenter = new A(), J.WGS84.cartesianToCartographic(n, this.cartographicCenter)) : this.cartographicCenter = new A(0, 0, -J.WGS84.radii[0]), this.cartesianCenter = n, this.zoom = Fd(t.boundingVolume, this.cartographicCenter);
  }
  _initializeStats() {
    this.stats.get(hn), this.stats.get(Bs), this.stats.get(ys), this.stats.get(Pi), this.stats.get(Gi), this.stats.get(Ni), this.stats.get(Ui), this.stats.get(Hi), this.stats.get(Ji), this.stats.get(Cs, "memory"), this.stats.get(Vi);
  }
  _initializeTileHeaders(t, n) {
    const s = new Ws(this, t.root, n);
    if (n && (n.children.push(s), s.depth = n.depth + 1), this.type === pt.TILES3D) {
      const i = [];
      for (i.push(s); i.length > 0; ) {
        const o = i.pop();
        this.stats.get(hn).incrementCount();
        const a = o.header.children || [];
        for (const c of a) {
          var r;
          const u = new Ws(this, c, o);
          if ((r = u.contentUrl) !== null && r !== void 0 && r.includes("?session=")) {
            const h = new URL(u.contentUrl).searchParams.get("session");
            h && (this._queryParams.session = h);
          }
          o.children.push(u), u.depth = o.depth + 1, i.push(u);
        }
      }
    }
    return s;
  }
  _initializeTraverser() {
    let t;
    switch (this.type) {
      case pt.TILES3D:
        t = Yd;
        break;
      case pt.I3S:
        t = tm;
        break;
      default:
        t = Wn;
    }
    return new t({
      basePath: this.basePath,
      onTraversalEnd: this._onTraversalEnd.bind(this)
    });
  }
  _destroyTileHeaders(t) {
    this._destroySubtree(t);
  }
  async _loadTile(t) {
    let n;
    try {
      this._onStartTileLoading(), n = await t.loadContent();
    } catch (s) {
      this._onTileLoadError(t, s instanceof Error ? s : new Error("load failed"));
    } finally {
      this._onEndTileLoading(), this._onTileLoad(t, n);
    }
  }
  _onTileLoadError(t, n) {
    this.stats.get(Hi).incrementCount();
    const s = n.message || n.toString(), r = t.url;
    console.error(`A 3D tile failed to load: ${t.url} ${s}`), this.options.onTileError(t, s, r);
  }
  _onTileLoad(t, n) {
    if (n) {
      if (this.type === pt.I3S) {
        var s, r;
        const i = ((s = this.tileset) === null || s === void 0 || (r = s.nodePagesTile) === null || r === void 0 ? void 0 : r.nodesInNodePages) || 0;
        this.stats.get(hn).reset(), this.stats.get(hn).addCount(i);
      }
      t && t.content && nd(t, t.content), this.updateContentTypes(t), this._addTileToCache(t), this.options.onTileLoad(t);
    }
  }
  updateContentTypes(t) {
    if (this.type === pt.I3S)
      switch (t.header.isDracoGeometry && (this.contentFormats.draco = !0), t.header.textureFormat) {
        case "dds":
          this.contentFormats.dds = !0;
          break;
        case "ktx2":
          this.contentFormats.ktx2 = !0;
          break;
      }
    else if (this.type === pt.TILES3D) {
      var n;
      const {
        extensionsRemoved: s = []
      } = ((n = t.content) === null || n === void 0 ? void 0 : n.gltf) || {};
      s.includes("KHR_draco_mesh_compression") && (this.contentFormats.draco = !0), s.includes("EXT_meshopt_compression") && (this.contentFormats.meshopt = !0), s.includes("KHR_texture_basisu") && (this.contentFormats.ktx2 = !0);
    }
  }
  _onStartTileLoading() {
    this._pendingCount++, this.stats.get(Bs).incrementCount();
  }
  _onEndTileLoading() {
    this._pendingCount--, this.stats.get(Bs).decrementCount();
  }
  _addTileToCache(t) {
    this._cache.add(this, t, (n) => n._updateCacheStats(t));
  }
  _updateCacheStats(t) {
    this.stats.get(Ni).incrementCount(), this.stats.get(ys).incrementCount(), this.gpuMemoryUsageInBytes += t.gpuMemoryUsageInBytes || 0, this.stats.get(Cs).count = this.gpuMemoryUsageInBytes, this.options.memoryAdjustedScreenSpaceError && this.adjustScreenSpaceError();
  }
  _unloadTile(t) {
    this.gpuMemoryUsageInBytes -= t.gpuMemoryUsageInBytes || 0, this.stats.get(ys).decrementCount(), this.stats.get(Ui).incrementCount(), this.stats.get(Cs).count = this.gpuMemoryUsageInBytes, this.options.onTileUnload(t), t.unloadContent();
  }
  _destroy() {
    const t = [];
    for (this.root && t.push(this.root); t.length > 0; ) {
      const n = t.pop();
      for (const s of n.children)
        t.push(s);
      this._destroyTile(n);
    }
    this.root = null;
  }
  _destroySubtree(t) {
    const n = t, s = [];
    for (s.push(n); s.length > 0; ) {
      t = s.pop();
      for (const r of t.children)
        s.push(r);
      t !== n && this._destroyTile(t);
    }
    n.children = [];
  }
  _destroyTile(t) {
    this._cache.unloadTile(this, t), this._unloadTile(t), t.destroy();
  }
  _initializeTiles3DTileset(t) {
    if (t.queryString) {
      const n = new URLSearchParams(t.queryString), s = Object.fromEntries(n.entries());
      this._queryParams = {
        ...this._queryParams,
        ...s
      };
    }
    if (this.asset = t.asset, !this.asset)
      throw new Error("Tileset must have an asset property.");
    if (this.asset.version !== "0.0" && this.asset.version !== "1.0" && this.asset.version !== "1.1")
      throw new Error("The tileset must be 3D Tiles version either 0.0 or 1.0 or 1.1.");
    "tilesetVersion" in this.asset && (this._queryParams.v = this.asset.tilesetVersion), this.credits = {
      attributions: this.options.attributions || []
    }, this.description = this.options.description || "", this.properties = t.properties, this.geometricError = t.geometricError, this._extensionsUsed = t.extensionsUsed || [], this.extras = t.extras;
  }
  _initializeI3STileset() {
    this.loadOptions.i3s && "token" in this.loadOptions.i3s && (this._queryParams.token = this.loadOptions.i3s.token);
  }
}
const xa = "4.1.1", be = {
  COMPOSITE: "cmpt",
  POINT_CLOUD: "pnts",
  BATCHED_3D_MODEL: "b3dm",
  INSTANCED_3D_MODEL: "i3dm",
  GEOMETRY: "geom",
  VECTOR: "vect",
  GLTF: "glTF"
};
function va(e, t, n) {
  U(e instanceof ArrayBuffer);
  const s = new TextDecoder("utf8"), r = new Uint8Array(e, t, n);
  return s.decode(r);
}
function sm(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  const n = new DataView(e);
  return `${String.fromCharCode(n.getUint8(t + 0))}${String.fromCharCode(n.getUint8(t + 1))}${String.fromCharCode(n.getUint8(t + 2))}${String.fromCharCode(n.getUint8(t + 3))}`;
}
const rm = "4.1.1", im = {
  name: "Draco",
  id: "draco",
  module: "draco",
  version: rm,
  worker: !0,
  extensions: ["drc"],
  mimeTypes: ["application/octet-stream"],
  binary: !0,
  tests: ["DRACO"],
  options: {
    draco: {
      decoderType: typeof WebAssembly == "object" ? "wasm" : "js",
      libraryPath: "libs/",
      extraAttributes: {},
      attributeNameEntry: void 0
    }
  }
};
function om(e, t, n) {
  const s = Fa(t.metadata), r = [], i = am(t.attributes);
  for (const o in e) {
    const a = e[o], c = ji(o, a, i[o]);
    r.push(c);
  }
  if (n) {
    const o = ji("indices", n);
    r.push(o);
  }
  return {
    fields: r,
    metadata: s
  };
}
function am(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    t[s.name || "undefined"] = s;
  }
  return t;
}
function ji(e, t, n) {
  const s = n ? Fa(n.metadata) : void 0;
  return eh(e, t, s);
}
function Fa(e) {
  Object.entries(e);
  const t = {};
  for (const n in e)
    t[`${n}.string`] = JSON.stringify(e[n]);
  return t;
}
const ki = {
  POSITION: "POSITION",
  NORMAL: "NORMAL",
  COLOR: "COLOR_0",
  TEX_COORD: "TEXCOORD_0"
}, cm = {
  1: Int8Array,
  2: Uint8Array,
  3: Int16Array,
  4: Uint16Array,
  5: Int32Array,
  6: Uint32Array,
  9: Float32Array
}, um = 4;
class lm {
  constructor(t) {
    this.draco = void 0, this.decoder = void 0, this.metadataQuerier = void 0, this.draco = t, this.decoder = new this.draco.Decoder(), this.metadataQuerier = new this.draco.MetadataQuerier();
  }
  destroy() {
    this.draco.destroy(this.decoder), this.draco.destroy(this.metadataQuerier);
  }
  parseSync(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const s = new this.draco.DecoderBuffer();
    s.Init(new Int8Array(t), t.byteLength), this._disableAttributeTransforms(n);
    const r = this.decoder.GetEncodedGeometryType(s), i = r === this.draco.TRIANGULAR_MESH ? new this.draco.Mesh() : new this.draco.PointCloud();
    try {
      let o;
      switch (r) {
        case this.draco.TRIANGULAR_MESH:
          o = this.decoder.DecodeBufferToMesh(s, i);
          break;
        case this.draco.POINT_CLOUD:
          o = this.decoder.DecodeBufferToPointCloud(s, i);
          break;
        default:
          throw new Error("DRACO: Unknown geometry type.");
      }
      if (!o.ok() || !i.ptr) {
        const f = `DRACO decompression failed: ${o.error_msg()}`;
        throw new Error(f);
      }
      const a = this._getDracoLoaderData(i, r, n), c = this._getMeshData(i, a, n), u = th(c.attributes), l = om(c.attributes, a, c.indices);
      return {
        loader: "draco",
        loaderData: a,
        header: {
          vertexCount: i.num_points(),
          boundingBox: u
        },
        ...c,
        schema: l
      };
    } finally {
      this.draco.destroy(s), i && this.draco.destroy(i);
    }
  }
  _getDracoLoaderData(t, n, s) {
    const r = this._getTopLevelMetadata(t), i = this._getDracoAttributes(t, s);
    return {
      geometry_type: n,
      num_attributes: t.num_attributes(),
      num_points: t.num_points(),
      num_faces: t instanceof this.draco.Mesh ? t.num_faces() : 0,
      metadata: r,
      attributes: i
    };
  }
  _getDracoAttributes(t, n) {
    const s = {};
    for (let r = 0; r < t.num_attributes(); r++) {
      const i = this.decoder.GetAttribute(t, r), o = this._getAttributeMetadata(t, r);
      s[i.unique_id()] = {
        unique_id: i.unique_id(),
        attribute_type: i.attribute_type(),
        data_type: i.data_type(),
        num_components: i.num_components(),
        byte_offset: i.byte_offset(),
        byte_stride: i.byte_stride(),
        normalized: i.normalized(),
        attribute_index: r,
        metadata: o
      };
      const a = this._getQuantizationTransform(i, n);
      a && (s[i.unique_id()].quantization_transform = a);
      const c = this._getOctahedronTransform(i, n);
      c && (s[i.unique_id()].octahedron_transform = c);
    }
    return s;
  }
  _getMeshData(t, n, s) {
    const r = this._getMeshAttributes(n, t, s);
    if (!r.POSITION)
      throw new Error("DRACO: No position attribute found.");
    if (t instanceof this.draco.Mesh)
      switch (s.topology) {
        case "triangle-strip":
          return {
            topology: "triangle-strip",
            mode: 4,
            attributes: r,
            indices: {
              value: this._getTriangleStripIndices(t),
              size: 1
            }
          };
        case "triangle-list":
        default:
          return {
            topology: "triangle-list",
            mode: 5,
            attributes: r,
            indices: {
              value: this._getTriangleListIndices(t),
              size: 1
            }
          };
      }
    return {
      topology: "point-list",
      mode: 0,
      attributes: r
    };
  }
  _getMeshAttributes(t, n, s) {
    const r = {};
    for (const i of Object.values(t.attributes)) {
      const o = this._deduceAttributeName(i, s);
      i.name = o;
      const {
        value: a,
        size: c
      } = this._getAttributeValues(n, i);
      r[o] = {
        value: a,
        size: c,
        byteOffset: i.byte_offset,
        byteStride: i.byte_stride,
        normalized: i.normalized
      };
    }
    return r;
  }
  _getTriangleListIndices(t) {
    const s = t.num_faces() * 3, r = s * um, i = this.draco._malloc(r);
    try {
      return this.decoder.GetTrianglesUInt32Array(t, r, i), new Uint32Array(this.draco.HEAPF32.buffer, i, s).slice();
    } finally {
      this.draco._free(i);
    }
  }
  _getTriangleStripIndices(t) {
    const n = new this.draco.DracoInt32Array();
    try {
      return this.decoder.GetTriangleStripsFromMesh(t, n), dm(n);
    } finally {
      this.draco.destroy(n);
    }
  }
  _getAttributeValues(t, n) {
    const s = cm[n.data_type], r = n.num_components, o = t.num_points() * r, a = o * s.BYTES_PER_ELEMENT, c = hm(this.draco, s);
    let u;
    const l = this.draco._malloc(a);
    try {
      const h = this.decoder.GetAttribute(t, n.attribute_index);
      this.decoder.GetAttributeDataArrayForAllPoints(t, h, c, a, l), u = new s(this.draco.HEAPF32.buffer, l, o).slice();
    } finally {
      this.draco._free(l);
    }
    return {
      value: u,
      size: r
    };
  }
  _deduceAttributeName(t, n) {
    const s = t.unique_id;
    for (const [o, a] of Object.entries(n.extraAttributes || {}))
      if (a === s)
        return o;
    const r = t.attribute_type;
    for (const o in ki)
      if (this.draco[o] === r)
        return ki[o];
    const i = n.attributeNameEntry || "name";
    return t.metadata[i] ? t.metadata[i].string : `CUSTOM_ATTRIBUTE_${s}`;
  }
  _getTopLevelMetadata(t) {
    const n = this.decoder.GetMetadata(t);
    return this._getDracoMetadata(n);
  }
  _getAttributeMetadata(t, n) {
    const s = this.decoder.GetAttributeMetadata(t, n);
    return this._getDracoMetadata(s);
  }
  _getDracoMetadata(t) {
    if (!t || !t.ptr)
      return {};
    const n = {}, s = this.metadataQuerier.NumEntries(t);
    for (let r = 0; r < s; r++) {
      const i = this.metadataQuerier.GetEntryName(t, r);
      n[i] = this._getDracoMetadataField(t, i);
    }
    return n;
  }
  _getDracoMetadataField(t, n) {
    const s = new this.draco.DracoInt32Array();
    try {
      this.metadataQuerier.GetIntEntryArray(t, n, s);
      const r = fm(s);
      return {
        int: this.metadataQuerier.GetIntEntry(t, n),
        string: this.metadataQuerier.GetStringEntry(t, n),
        double: this.metadataQuerier.GetDoubleEntry(t, n),
        intArray: r
      };
    } finally {
      this.draco.destroy(s);
    }
  }
  _disableAttributeTransforms(t) {
    const {
      quantizedAttributes: n = [],
      octahedronAttributes: s = []
    } = t, r = [...n, ...s];
    for (const i of r)
      this.decoder.SkipAttributeTransform(this.draco[i]);
  }
  _getQuantizationTransform(t, n) {
    const {
      quantizedAttributes: s = []
    } = n, r = t.attribute_type();
    if (s.map((o) => this.decoder[o]).includes(r)) {
      const o = new this.draco.AttributeQuantizationTransform();
      try {
        if (o.InitFromAttribute(t))
          return {
            quantization_bits: o.quantization_bits(),
            range: o.range(),
            min_values: new Float32Array([1, 2, 3]).map((a) => o.min_value(a))
          };
      } finally {
        this.draco.destroy(o);
      }
    }
    return null;
  }
  _getOctahedronTransform(t, n) {
    const {
      octahedronAttributes: s = []
    } = n, r = t.attribute_type();
    if (s.map((o) => this.decoder[o]).includes(r)) {
      const o = new this.draco.AttributeQuantizationTransform();
      try {
        if (o.InitFromAttribute(t))
          return {
            quantization_bits: o.quantization_bits()
          };
      } finally {
        this.draco.destroy(o);
      }
    }
    return null;
  }
}
function hm(e, t) {
  switch (t) {
    case Float32Array:
      return e.DT_FLOAT32;
    case Int8Array:
      return e.DT_INT8;
    case Int16Array:
      return e.DT_INT16;
    case Int32Array:
      return e.DT_INT32;
    case Uint8Array:
      return e.DT_UINT8;
    case Uint16Array:
      return e.DT_UINT16;
    case Uint32Array:
      return e.DT_UINT32;
    default:
      return e.DT_INVALID;
  }
}
function fm(e) {
  const t = e.size(), n = new Int32Array(t);
  for (let s = 0; s < t; s++)
    n[s] = e.GetValue(s);
  return n;
}
function dm(e) {
  const t = e.size(), n = new Int32Array(t);
  for (let s = 0; s < t; s++)
    n[s] = e.GetValue(s);
  return n;
}
const mm = "1.5.6", gm = "1.4.1", Es = `https://www.gstatic.com/draco/versioned/decoders/${mm}`, ht = {
  DECODER: "draco_wasm_wrapper.js",
  DECODER_WASM: "draco_decoder.wasm",
  FALLBACK_DECODER: "draco_decoder.js",
  ENCODER: "draco_encoder.js"
}, Ts = {
  [ht.DECODER]: `${Es}/${ht.DECODER}`,
  [ht.DECODER_WASM]: `${Es}/${ht.DECODER_WASM}`,
  [ht.FALLBACK_DECODER]: `${Es}/${ht.FALLBACK_DECODER}`,
  [ht.ENCODER]: `https://raw.githubusercontent.com/google/draco/${gm}/javascript/${ht.ENCODER}`
};
let _e;
async function Am(e) {
  const t = e.modules || {};
  return t.draco3d ? _e = _e || t.draco3d.createDecoderModule({}).then((n) => ({
    draco: n
  })) : _e = _e || pm(e), await _e;
}
async function pm(e) {
  let t, n;
  switch (e.draco && e.draco.decoderType) {
    case "js":
      t = await $t(Ts[ht.FALLBACK_DECODER], "draco", e, ht.FALLBACK_DECODER);
      break;
    case "wasm":
    default:
      [t, n] = await Promise.all([await $t(Ts[ht.DECODER], "draco", e, ht.DECODER), await $t(Ts[ht.DECODER_WASM], "draco", e, ht.DECODER_WASM)]);
  }
  return t = t || globalThis.DracoDecoderModule, await ym(t, n);
}
function ym(e, t) {
  const n = {};
  return t && (n.wasmBinary = t), new Promise((s) => {
    e({
      ...n,
      onModuleLoaded: (r) => s({
        draco: r
      })
    });
  });
}
const Oa = {
  ...im,
  parse: Bm
};
async function Bm(e, t) {
  const {
    draco: n
  } = await Am(t), s = new lm(n);
  try {
    return s.parseSync(e, t == null ? void 0 : t.draco);
  } finally {
    s.destroy();
  }
}
const Cm = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, q = {
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  INT: 5124,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,
  DOUBLE: 5130
}, P = {
  ...Cm,
  ...q
}, bs = {
  [q.DOUBLE]: Float64Array,
  [q.FLOAT]: Float32Array,
  [q.UNSIGNED_SHORT]: Uint16Array,
  [q.UNSIGNED_INT]: Uint32Array,
  [q.UNSIGNED_BYTE]: Uint8Array,
  [q.BYTE]: Int8Array,
  [q.SHORT]: Int16Array,
  [q.INT]: Int32Array
}, Em = {
  DOUBLE: q.DOUBLE,
  FLOAT: q.FLOAT,
  UNSIGNED_SHORT: q.UNSIGNED_SHORT,
  UNSIGNED_INT: q.UNSIGNED_INT,
  UNSIGNED_BYTE: q.UNSIGNED_BYTE,
  BYTE: q.BYTE,
  SHORT: q.SHORT,
  INT: q.INT
}, _s = "Failed to convert GL type";
class Ot {
  static fromTypedArray(t) {
    t = ArrayBuffer.isView(t) ? t.constructor : t;
    for (const n in bs)
      if (bs[n] === t)
        return n;
    throw new Error(_s);
  }
  static fromName(t) {
    const n = Em[t];
    if (!n)
      throw new Error(_s);
    return n;
  }
  static getArrayType(t) {
    switch (t) {
      case q.UNSIGNED_SHORT_5_6_5:
      case q.UNSIGNED_SHORT_4_4_4_4:
      case q.UNSIGNED_SHORT_5_5_5_1:
        return Uint16Array;
      default:
        const n = bs[t];
        if (!n)
          throw new Error(_s);
        return n;
    }
  }
  static getByteSize(t) {
    return Ot.getArrayType(t).BYTES_PER_ELEMENT;
  }
  static validate(t) {
    return !!Ot.getArrayType(t);
  }
  static createTypedArray(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, r = arguments.length > 3 ? arguments[3] : void 0;
    r === void 0 && (r = (n.byteLength - s) / Ot.getByteSize(t));
    const i = Ot.getArrayType(t);
    return new i(n, s, r);
  }
}
function Tm(e, t) {
  if (!e)
    throw new Error(`math.gl assertion failed. ${t}`);
}
function bm(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [0, 0, 0];
  const n = e >> 11 & 31, s = e >> 5 & 63, r = e & 31;
  return t[0] = n << 3, t[1] = s << 2, t[2] = r << 3, t;
}
new kn();
new A();
new kn();
new kn();
function Ki(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 255;
  return lh(e, 0, t) / t * 2 - 1;
}
function zi(e) {
  return e < 0 ? -1 : 1;
}
function _m(e, t, n, s) {
  if (Tm(s), e < 0 || e > n || t < 0 || t > n)
    throw new Error(`x and y must be unsigned normalized integers between 0 and ${n}`);
  if (s.x = Ki(e, n), s.y = Ki(t, n), s.z = 1 - (Math.abs(s.x) + Math.abs(s.y)), s.z < 0) {
    const r = s.x;
    s.x = (1 - Math.abs(s.y)) * zi(r), s.y = (1 - Math.abs(r)) * zi(s.y);
  }
  return s.normalize();
}
function wm(e, t, n) {
  return _m(e, t, 255, n);
}
class Er {
  constructor(t, n) {
    this.json = void 0, this.buffer = void 0, this.featuresLength = 0, this._cachedTypedArrays = {}, this.json = t, this.buffer = n;
  }
  getExtension(t) {
    return this.json.extensions && this.json.extensions[t];
  }
  hasProperty(t) {
    return !!this.json[t];
  }
  getGlobalProperty(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : P.UNSIGNED_INT, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    const r = this.json[t];
    return r && Number.isFinite(r.byteOffset) ? this._getTypedArrayFromBinary(t, n, s, 1, r.byteOffset) : r;
  }
  getPropertyArray(t, n, s) {
    const r = this.json[t];
    return r && Number.isFinite(r.byteOffset) ? ("componentType" in r && (n = Ot.fromName(r.componentType)), this._getTypedArrayFromBinary(t, n, s, this.featuresLength, r.byteOffset)) : this._getTypedArrayFromArray(t, n, r);
  }
  getProperty(t, n, s, r, i) {
    const o = this.json[t];
    if (!o)
      return o;
    const a = this.getPropertyArray(t, n, s);
    if (s === 1)
      return a[r];
    for (let c = 0; c < s; ++c)
      i[c] = a[s * r + c];
    return i;
  }
  _getTypedArrayFromBinary(t, n, s, r, i) {
    const o = this._cachedTypedArrays;
    let a = o[t];
    return a || (a = Ot.createTypedArray(n, this.buffer.buffer, this.buffer.byteOffset + i, r * s), o[t] = a), a;
  }
  _getTypedArrayFromArray(t, n, s) {
    const r = this._cachedTypedArrays;
    let i = r[t];
    return i || (i = Ot.createTypedArray(n, s), r[t] = i), i;
  }
}
const Rm = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Mm = {
  SCALAR: (e, t) => e[t],
  VEC2: (e, t) => [e[2 * t + 0], e[2 * t + 1]],
  VEC3: (e, t) => [e[3 * t + 0], e[3 * t + 1], e[3 * t + 2]],
  VEC4: (e, t) => [e[4 * t + 0], e[4 * t + 1], e[4 * t + 2], e[4 * t + 3]],
  MAT2: (e, t) => [e[4 * t + 0], e[4 * t + 1], e[4 * t + 2], e[4 * t + 3]],
  MAT3: (e, t) => [e[9 * t + 0], e[9 * t + 1], e[9 * t + 2], e[9 * t + 3], e[9 * t + 4], e[9 * t + 5], e[9 * t + 6], e[9 * t + 7], e[9 * t + 8]],
  MAT4: (e, t) => [e[16 * t + 0], e[16 * t + 1], e[16 * t + 2], e[16 * t + 3], e[16 * t + 4], e[16 * t + 5], e[16 * t + 6], e[16 * t + 7], e[16 * t + 8], e[16 * t + 9], e[16 * t + 10], e[16 * t + 11], e[16 * t + 12], e[16 * t + 13], e[16 * t + 14], e[16 * t + 15]]
}, Sm = {
  SCALAR: (e, t, n) => {
    t[n] = e;
  },
  VEC2: (e, t, n) => {
    t[2 * n + 0] = e[0], t[2 * n + 1] = e[1];
  },
  VEC3: (e, t, n) => {
    t[3 * n + 0] = e[0], t[3 * n + 1] = e[1], t[3 * n + 2] = e[2];
  },
  VEC4: (e, t, n) => {
    t[4 * n + 0] = e[0], t[4 * n + 1] = e[1], t[4 * n + 2] = e[2], t[4 * n + 3] = e[3];
  },
  MAT2: (e, t, n) => {
    t[4 * n + 0] = e[0], t[4 * n + 1] = e[1], t[4 * n + 2] = e[2], t[4 * n + 3] = e[3];
  },
  MAT3: (e, t, n) => {
    t[9 * n + 0] = e[0], t[9 * n + 1] = e[1], t[9 * n + 2] = e[2], t[9 * n + 3] = e[3], t[9 * n + 4] = e[4], t[9 * n + 5] = e[5], t[9 * n + 6] = e[6], t[9 * n + 7] = e[7], t[9 * n + 8] = e[8], t[9 * n + 9] = e[9];
  },
  MAT4: (e, t, n) => {
    t[16 * n + 0] = e[0], t[16 * n + 1] = e[1], t[16 * n + 2] = e[2], t[16 * n + 3] = e[3], t[16 * n + 4] = e[4], t[16 * n + 5] = e[5], t[16 * n + 6] = e[6], t[16 * n + 7] = e[7], t[16 * n + 8] = e[8], t[16 * n + 9] = e[9], t[16 * n + 10] = e[10], t[16 * n + 11] = e[11], t[16 * n + 12] = e[12], t[16 * n + 13] = e[13], t[16 * n + 14] = e[14], t[16 * n + 15] = e[15];
  }
};
function Im(e, t, n, s) {
  const {
    componentType: r
  } = e;
  U(e.componentType);
  const i = typeof r == "string" ? Ot.fromName(r) : r, o = Rm[e.type], a = Mm[e.type], c = Sm[e.type];
  return n += e.byteOffset, {
    values: Ot.createTypedArray(i, t, n, o * s),
    type: i,
    size: o,
    unpacker: a,
    packer: c
  };
}
const vt = (e) => e !== void 0;
function xm(e, t, n) {
  if (!t)
    return null;
  let s = e.getExtension("3DTILES_batch_table_hierarchy");
  const r = t.HIERARCHY;
  return r && (console.warn("3D Tile Parser: HIERARCHY is deprecated. Use 3DTILES_batch_table_hierarchy."), t.extensions = t.extensions || {}, t.extensions["3DTILES_batch_table_hierarchy"] = r, s = r), s ? vm(s, n) : null;
}
function vm(e, t) {
  let n, s, r;
  const i = e.instancesLength, o = e.classes;
  let a = e.classIds, c = e.parentCounts, u = e.parentIds, l = i;
  vt(a.byteOffset) && (a.componentType = defaultValue(a.componentType, GL.UNSIGNED_SHORT), a.type = AttributeType.SCALAR, r = getBinaryAccessor(a), a = r.createArrayBufferView(t.buffer, t.byteOffset + a.byteOffset, i));
  let h;
  if (vt(c))
    for (vt(c.byteOffset) && (c.componentType = defaultValue(c.componentType, GL.UNSIGNED_SHORT), c.type = AttributeType.SCALAR, r = getBinaryAccessor(c), c = r.createArrayBufferView(t.buffer, t.byteOffset + c.byteOffset, i)), h = new Uint16Array(i), l = 0, n = 0; n < i; ++n)
      h[n] = l, l += c[n];
  vt(u) && vt(u.byteOffset) && (u.componentType = defaultValue(u.componentType, GL.UNSIGNED_SHORT), u.type = AttributeType.SCALAR, r = getBinaryAccessor(u), u = r.createArrayBufferView(t.buffer, t.byteOffset + u.byteOffset, l));
  const f = o.length;
  for (n = 0; n < f; ++n) {
    const p = o[n].length, C = o[n].instances, w = getBinaryProperties(p, C, t);
    o[n].instances = combine(w, C);
  }
  const d = new Array(f).fill(0), m = new Uint16Array(i);
  for (n = 0; n < i; ++n)
    s = a[n], m[n] = d[s], ++d[s];
  const g = {
    classes: o,
    classIds: a,
    classIndexes: m,
    parentCounts: c,
    parentIndexes: h,
    parentIds: u
  };
  return Dm(g), g;
}
function we(e, t, n) {
  if (!e)
    return;
  const s = e.parentCounts;
  return e.parentIds ? n(e, t) : s > 0 ? Fm(e, t, n) : Om(e, t, n);
}
function Fm(e, t, n) {
  const s = e.classIds, r = e.parentCounts, i = e.parentIds, o = e.parentIndexes, a = s.length, c = scratchVisited;
  c.length = Math.max(c.length, a);
  const u = ++marker, l = scratchStack;
  for (l.length = 0, l.push(t); l.length > 0; ) {
    if (t = l.pop(), c[t] === u)
      continue;
    c[t] = u;
    const h = n(e, t);
    if (vt(h))
      return h;
    const f = r[t], d = o[t];
    for (let m = 0; m < f; ++m) {
      const g = i[d + m];
      g !== t && l.push(g);
    }
  }
  return null;
}
function Om(e, t, n) {
  let s = !0;
  for (; s; ) {
    const r = n(e, t);
    if (vt(r))
      return r;
    const i = e.parentIds[t];
    s = i !== t, t = i;
  }
  throw new Error("traverseHierarchySingleParent");
}
function Dm(e) {
  const n = e.classIds.length;
  for (let s = 0; s < n; ++s)
    Da(e, s, stack);
}
function Da(e, t, n) {
  const s = e.parentCounts, r = e.parentIds, i = e.parentIndexes, a = e.classIds.length;
  if (!vt(r))
    return;
  assert(t < a, `Parent index ${t} exceeds the total number of instances: ${a}`), assert(n.indexOf(t) === -1, "Circular dependency detected in the batch table hierarchy."), n.push(t);
  const c = vt(s) ? s[t] : 1, u = vt(s) ? i[t] : t;
  for (let l = 0; l < c; ++l) {
    const h = r[u + l];
    h !== t && Da(e, h, n);
  }
  n.pop(t);
}
function ct(e) {
  return e != null;
}
const fn = (e, t) => e, Lm = {
  HIERARCHY: !0,
  extensions: !0,
  extras: !0
};
class La {
  constructor(t, n, s) {
    var r;
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    this.json = void 0, this.binary = void 0, this.featureCount = void 0, this._extensions = void 0, this._properties = void 0, this._binaryProperties = void 0, this._hierarchy = void 0, U(s >= 0), this.json = t || {}, this.binary = n, this.featureCount = s, this._extensions = ((r = this.json) === null || r === void 0 ? void 0 : r.extensions) || {}, this._properties = {};
    for (const o in this.json)
      Lm[o] || (this._properties[o] = this.json[o]);
    this._binaryProperties = this._initializeBinaryProperties(), i["3DTILES_batch_table_hierarchy"] && (this._hierarchy = xm(this, this.json, this.binary));
  }
  getExtension(t) {
    return this.json && this.json.extensions && this.json.extensions[t];
  }
  memorySizeInBytes() {
    return 0;
  }
  isClass(t, n) {
    if (this._checkBatchId(t), U(typeof n == "string", n), this._hierarchy) {
      const s = we(this._hierarchy, t, (r, i) => {
        const o = r.classIds[i];
        return r.classes[o].name === n;
      });
      return ct(s);
    }
    return !1;
  }
  isExactClass(t, n) {
    return U(typeof n == "string", n), this.getExactClassName(t) === n;
  }
  getExactClassName(t) {
    if (this._checkBatchId(t), this._hierarchy) {
      const n = this._hierarchy.classIds[t];
      return this._hierarchy.classes[n].name;
    }
  }
  hasProperty(t, n) {
    return this._checkBatchId(t), U(typeof n == "string", n), ct(this._properties[n]) || this._hasPropertyInHierarchy(t, n);
  }
  getPropertyNames(t, n) {
    this._checkBatchId(t), n = ct(n) ? n : [], n.length = 0;
    const s = Object.keys(this._properties);
    return n.push(...s), this._hierarchy && this._getPropertyNamesInHierarchy(t, n), n;
  }
  getProperty(t, n) {
    if (this._checkBatchId(t), U(typeof n == "string", n), this._binaryProperties) {
      const r = this._binaryProperties[n];
      if (ct(r))
        return this._getBinaryProperty(r, t);
    }
    const s = this._properties[n];
    if (ct(s))
      return fn(s[t]);
    if (this._hierarchy) {
      const r = this._getHierarchyProperty(t, n);
      if (ct(r))
        return r;
    }
  }
  setProperty(t, n, s) {
    const r = this.featureCount;
    if (this._checkBatchId(t), U(typeof n == "string", n), this._binaryProperties) {
      const o = this._binaryProperties[n];
      if (o) {
        this._setBinaryProperty(o, t, s);
        return;
      }
    }
    if (this._hierarchy && this._setHierarchyProperty(this, t, n, s))
      return;
    let i = this._properties[n];
    ct(i) || (this._properties[n] = new Array(r), i = this._properties[n]), i[t] = fn(s);
  }
  _checkBatchId(t) {
    if (!(t >= 0 && t < this.featureCount))
      throw new Error("batchId not in range [0, featureCount - 1].");
  }
  _getBinaryProperty(t, n) {
    return t.unpack(t.typedArray, n);
  }
  _setBinaryProperty(t, n, s) {
    t.pack(s, t.typedArray, n);
  }
  _initializeBinaryProperties() {
    let t = null;
    for (const n in this._properties) {
      const s = this._properties[n], r = this._initializeBinaryProperty(n, s);
      r && (t = t || {}, t[n] = r);
    }
    return t;
  }
  _initializeBinaryProperty(t, n) {
    if ("byteOffset" in n) {
      const s = n;
      U(this.binary, `Property ${t} requires a batch table binary.`), U(s.type, `Property ${t} requires a type.`);
      const r = Im(s, this.binary.buffer, this.binary.byteOffset | 0, this.featureCount);
      return {
        typedArray: r.values,
        componentCount: r.size,
        unpack: r.unpacker,
        pack: r.packer
      };
    }
    return null;
  }
  _hasPropertyInHierarchy(t, n) {
    if (!this._hierarchy)
      return !1;
    const s = we(this._hierarchy, t, (r, i) => {
      const o = r.classIds[i], a = r.classes[o].instances;
      return ct(a[n]);
    });
    return ct(s);
  }
  _getPropertyNamesInHierarchy(t, n) {
    we(this._hierarchy, t, (s, r) => {
      const i = s.classIds[r], o = s.classes[i].instances;
      for (const a in o)
        o.hasOwnProperty(a) && n.indexOf(a) === -1 && n.push(a);
    });
  }
  _getHierarchyProperty(t, n) {
    return we(this._hierarchy, t, (s, r) => {
      const i = s.classIds[r], o = s.classes[i], a = s.classIndexes[r], c = o.instances[n];
      return ct(c) ? ct(c.typedArray) ? this._getBinaryProperty(c, a) : fn(c[a]) : null;
    });
  }
  _setHierarchyProperty(t, n, s, r) {
    const i = we(this._hierarchy, n, (o, a) => {
      const c = o.classIds[a], u = o.classes[c], l = o.classIndexes[a], h = u.instances[s];
      return ct(h) ? (U(a === n, `Inherited property "${s}" is read-only.`), ct(h.typedArray) ? this._setBinaryProperty(h, l, r) : h[l] = fn(r), !0) : !1;
    });
    return ct(i);
  }
}
const ws = 4;
function Xn(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = new DataView(t);
  if (e.magic = s.getUint32(n, !0), n += ws, e.version = s.getUint32(n, !0), n += ws, e.byteLength = s.getUint32(n, !0), n += ws, e.version !== 1)
    throw new Error(`3D Tile Version ${e.version} not supported`);
  return n;
}
const ue = 4, Wi = "b3dm tile in legacy format.";
function Tr(e, t, n) {
  const s = new DataView(t);
  let r;
  e.header = e.header || {};
  let i = s.getUint32(n, !0);
  n += ue;
  let o = s.getUint32(n, !0);
  n += ue;
  let a = s.getUint32(n, !0);
  n += ue;
  let c = s.getUint32(n, !0);
  return n += ue, a >= 570425344 ? (n -= ue * 2, r = i, a = o, c = 0, i = 0, o = 0, console.warn(Wi)) : c >= 570425344 && (n -= ue, r = a, a = i, c = o, i = 0, o = 0, console.warn(Wi)), e.header.featureTableJsonByteLength = i, e.header.featureTableBinaryByteLength = o, e.header.batchTableJsonByteLength = a, e.header.batchTableBinaryByteLength = c, e.header.batchLength = r, n;
}
function br(e, t, n, s) {
  return n = Pm(e, t, n), n = Gm(e, t, n), n;
}
function Pm(e, t, n, s) {
  const {
    featureTableJsonByteLength: r,
    featureTableBinaryByteLength: i,
    batchLength: o
  } = e.header || {};
  if (e.featureTableJson = {
    BATCH_LENGTH: o || 0
  }, r && r > 0) {
    const a = va(t, n, r);
    e.featureTableJson = JSON.parse(a);
  }
  return n += r || 0, e.featureTableBinary = new Uint8Array(t, n, i), n += i || 0, n;
}
function Gm(e, t, n, s) {
  const {
    batchTableJsonByteLength: r,
    batchTableBinaryByteLength: i
  } = e.header || {};
  if (r && r > 0) {
    const o = va(t, n, r);
    e.batchTableJson = JSON.parse(o), n += r, i && i > 0 && (e.batchTableBinary = new Uint8Array(t, n, i), e.batchTableBinary = new Uint8Array(e.batchTableBinary), n += i);
  }
  return n;
}
function Pa(e, t, n) {
  if (!t && (!e || !e.batchIds || !n))
    return null;
  const {
    batchIds: s,
    isRGB565: r,
    pointCount: i = 0
  } = e;
  if (s && n) {
    const o = new Uint8ClampedArray(i * 3);
    for (let a = 0; a < i; a++) {
      const c = s[a], l = n.getProperty(c, "dimensions").map((h) => h * 255);
      o[a * 3] = l[0], o[a * 3 + 1] = l[1], o[a * 3 + 2] = l[2];
    }
    return {
      type: P.UNSIGNED_BYTE,
      value: o,
      size: 3,
      normalized: !0
    };
  }
  if (t && r) {
    const o = new Uint8ClampedArray(i * 3);
    for (let a = 0; a < i; a++) {
      const c = bm(t[a]);
      o[a * 3] = c[0], o[a * 3 + 1] = c[1], o[a * 3 + 2] = c[2];
    }
    return {
      type: P.UNSIGNED_BYTE,
      value: o,
      size: 3,
      normalized: !0
    };
  }
  return t && t.length === i * 3 ? {
    type: P.UNSIGNED_BYTE,
    value: t,
    size: 3,
    normalized: !0
  } : {
    type: P.UNSIGNED_BYTE,
    value: t || new Uint8ClampedArray(),
    size: 4,
    normalized: !0
  };
}
const Xi = new A();
function Nm(e, t) {
  if (!t)
    return null;
  if (e.isOctEncoded16P) {
    const n = new Float32Array((e.pointsLength || 0) * 3);
    for (let s = 0; s < (e.pointsLength || 0); s++)
      wm(t[s * 2], t[s * 2 + 1], Xi), Xi.toArray(n, s * 3);
    return {
      type: P.FLOAT,
      size: 2,
      value: n
    };
  }
  return {
    type: P.FLOAT,
    size: 2,
    value: t
  };
}
function Um(e, t, n) {
  return e.isQuantized ? n["3d-tiles"] && n["3d-tiles"].decodeQuantizedPositions ? (e.isQuantized = !1, Hm(e, t)) : {
    type: P.UNSIGNED_SHORT,
    value: t,
    size: 3,
    normalized: !0
  } : t;
}
function Hm(e, t) {
  const n = new A(), s = new Float32Array(e.pointCount * 3);
  for (let r = 0; r < e.pointCount; r++)
    n.set(t[r * 3], t[r * 3 + 1], t[r * 3 + 2]).scale(1 / e.quantizedRange).multiply(e.quantizedVolumeScale).add(e.quantizedVolumeOffset).toArray(s, r * 3);
  return s;
}
async function Jm(e, t, n, s, r) {
  n = Xn(e, t, n), n = Tr(e, t, n), n = br(e, t, n), Vm(e);
  const {
    featureTable: i,
    batchTable: o
  } = jm(e);
  return await Xm(e, i, o, s, r), km(e, i, s), Km(e, i, o), zm(e, i), n;
}
function Vm(e) {
  e.attributes = {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, e.isQuantized = !1, e.isTranslucent = !1, e.isRGB565 = !1, e.isOctEncoded16P = !1;
}
function jm(e) {
  const t = new Er(e.featureTableJson, e.featureTableBinary), n = t.getGlobalProperty("POINTS_LENGTH");
  if (!Number.isFinite(n))
    throw new Error("POINTS_LENGTH must be defined");
  t.featuresLength = n, e.featuresLength = n, e.pointsLength = n, e.pointCount = n, e.rtcCenter = t.getGlobalProperty("RTC_CENTER", P.FLOAT, 3);
  const s = Wm(e, t);
  return {
    featureTable: t,
    batchTable: s
  };
}
function km(e, t, n) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.positions) {
    if (t.hasProperty("POSITION"))
      e.attributes.positions = t.getPropertyArray("POSITION", P.FLOAT, 3);
    else if (t.hasProperty("POSITION_QUANTIZED")) {
      const s = t.getPropertyArray("POSITION_QUANTIZED", P.UNSIGNED_SHORT, 3);
      if (e.isQuantized = !0, e.quantizedRange = 65535, e.quantizedVolumeScale = t.getGlobalProperty("QUANTIZED_VOLUME_SCALE", P.FLOAT, 3), !e.quantizedVolumeScale)
        throw new Error("QUANTIZED_VOLUME_SCALE must be defined for quantized positions.");
      if (e.quantizedVolumeOffset = t.getGlobalProperty("QUANTIZED_VOLUME_OFFSET", P.FLOAT, 3), !e.quantizedVolumeOffset)
        throw new Error("QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.");
      e.attributes.positions = Um(e, s, n);
    }
  }
  if (!e.attributes.positions)
    throw new Error("Either POSITION or POSITION_QUANTIZED must be defined.");
}
function Km(e, t, n) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.colors) {
    let s = null;
    t.hasProperty("RGBA") ? (s = t.getPropertyArray("RGBA", P.UNSIGNED_BYTE, 4), e.isTranslucent = !0) : t.hasProperty("RGB") ? s = t.getPropertyArray("RGB", P.UNSIGNED_BYTE, 3) : t.hasProperty("RGB565") && (s = t.getPropertyArray("RGB565", P.UNSIGNED_SHORT, 1), e.isRGB565 = !0), e.attributes.colors = Pa(e, s, n);
  }
  t.hasProperty("CONSTANT_RGBA") && (e.constantRGBA = t.getGlobalProperty("CONSTANT_RGBA", P.UNSIGNED_BYTE, 4));
}
function zm(e, t) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.normals) {
    let n = null;
    t.hasProperty("NORMAL") ? n = t.getPropertyArray("NORMAL", P.FLOAT, 3) : t.hasProperty("NORMAL_OCT16P") && (n = t.getPropertyArray("NORMAL_OCT16P", P.UNSIGNED_BYTE, 2), e.isOctEncoded16P = !0), e.attributes.normals = Nm(e, n);
  }
}
function Wm(e, t) {
  let n = null;
  if (!e.batchIds && t.hasProperty("BATCH_ID") && (e.batchIds = t.getPropertyArray("BATCH_ID", P.UNSIGNED_SHORT, 1), e.batchIds)) {
    const s = t.getGlobalProperty("BATCH_LENGTH");
    if (!s)
      throw new Error("Global property: BATCH_LENGTH must be defined when BATCH_ID is defined.");
    const {
      batchTableJson: r,
      batchTableBinary: i
    } = e;
    n = new La(r, i, s);
  }
  return n;
}
async function Xm(e, t, n, s, r) {
  let i, o, a;
  const c = e.batchTableJson && e.batchTableJson.extensions && e.batchTableJson.extensions["3DTILES_draco_point_compression"];
  c && (a = c.properties);
  const u = t.getExtension("3DTILES_draco_point_compression");
  if (u) {
    o = u.properties;
    const h = u.byteOffset, f = u.byteLength;
    if (!o || !Number.isFinite(h) || !f)
      throw new Error("Draco properties, byteOffset, and byteLength must be defined");
    i = (e.featureTableBinary || []).slice(h, h + f), e.hasPositions = Number.isFinite(o.POSITION), e.hasColors = Number.isFinite(o.RGB) || Number.isFinite(o.RGBA), e.hasNormals = Number.isFinite(o.NORMAL), e.hasBatchIds = Number.isFinite(o.BATCH_ID), e.isTranslucent = Number.isFinite(o.RGBA);
  }
  if (!i)
    return !0;
  const l = {
    buffer: i,
    properties: {
      ...o,
      ...a
    },
    featureTableProperties: o,
    batchTableProperties: a,
    dequantizeInShader: !1
  };
  return await Qm(e, l, s, r);
}
async function Qm(e, t, n, s) {
  if (!s)
    return;
  const r = {
    ...n,
    draco: {
      ...n == null ? void 0 : n.draco,
      extraAttributes: t.batchTableProperties || {}
    }
  };
  delete r["3d-tiles"];
  const i = await je(t.buffer, Oa, r, s), o = i.attributes.POSITION && i.attributes.POSITION.value, a = i.attributes.COLOR_0 && i.attributes.COLOR_0.value, c = i.attributes.NORMAL && i.attributes.NORMAL.value, u = i.attributes.BATCH_ID && i.attributes.BATCH_ID.value, l = o && i.attributes.POSITION.value.quantization, h = c && i.attributes.NORMAL.value.quantization;
  if (l) {
    const d = i.POSITION.data.quantization, m = d.range;
    e.quantizedVolumeScale = new A(m, m, m), e.quantizedVolumeOffset = new A(d.minValues), e.quantizedRange = (1 << d.quantizationBits) - 1, e.isQuantizedDraco = !0;
  }
  h && (e.octEncodedRange = (1 << i.NORMAL.data.quantization.quantizationBits) - 1, e.isOctEncodedDraco = !0);
  const f = {};
  if (t.batchTableProperties)
    for (const d of Object.keys(t.batchTableProperties))
      i.attributes[d] && i.attributes[d].value && (f[d.toLowerCase()] = i.attributes[d].value);
  e.attributes = {
    positions: o,
    colors: Pa(e, a, void 0),
    normals: c,
    batchIds: u,
    ...f
  };
}
const qm = "4.1.1";
var Rs;
const Ym = (Rs = globalThis.loaders) === null || Rs === void 0 ? void 0 : Rs.parseImageNode, Xs = typeof Image < "u", Qs = typeof ImageBitmap < "u", $m = !!Ym, qs = Jn ? !0 : $m;
function Zm(e) {
  switch (e) {
    case "auto":
      return Qs || Xs || qs;
    case "imagebitmap":
      return Qs;
    case "image":
      return Xs;
    case "data":
      return qs;
    default:
      throw new Error(`@loaders.gl/images: image ${e} not supported in this environment`);
  }
}
function tg() {
  if (Qs)
    return "imagebitmap";
  if (Xs)
    return "image";
  if (qs)
    return "data";
  throw new Error("Install '@loaders.gl/polyfills' to parse images under Node.js");
}
function eg(e) {
  const t = ng(e);
  if (!t)
    throw new Error("Not an image");
  return t;
}
function Ga(e) {
  switch (eg(e)) {
    case "data":
      return e;
    case "image":
    case "imagebitmap":
      const t = document.createElement("canvas"), n = t.getContext("2d");
      if (!n)
        throw new Error("getImageData");
      return t.width = e.width, t.height = e.height, n.drawImage(e, 0, 0), n.getImageData(0, 0, e.width, e.height);
    default:
      throw new Error("getImageData");
  }
}
function ng(e) {
  return typeof ImageBitmap < "u" && e instanceof ImageBitmap ? "imagebitmap" : typeof Image < "u" && e instanceof Image ? "image" : e && typeof e == "object" && e.data && e.width && e.height ? "data" : null;
}
const sg = /^data:image\/svg\+xml/, rg = /\.svg((\?|#).*)?$/;
function _r(e) {
  return e && (sg.test(e) || rg.test(e));
}
function ig(e, t) {
  if (_r(t)) {
    let s = new TextDecoder().decode(e);
    try {
      typeof unescape == "function" && typeof encodeURIComponent == "function" && (s = unescape(encodeURIComponent(s)));
    } catch (i) {
      throw new Error(i.message);
    }
    return `data:image/svg+xml;base64,${btoa(s)}`;
  }
  return Na(e, t);
}
function Na(e, t) {
  if (_r(t))
    throw new Error("SVG cannot be parsed directly to imagebitmap");
  return new Blob([new Uint8Array(e)]);
}
async function Ua(e, t, n) {
  const s = ig(e, n), r = self.URL || self.webkitURL, i = typeof s != "string" && r.createObjectURL(s);
  try {
    return await og(i || s, t);
  } finally {
    i && r.revokeObjectURL(i);
  }
}
async function og(e, t) {
  const n = new Image();
  return n.src = e, t.image && t.image.decode && n.decode ? (await n.decode(), n) : await new Promise((s, r) => {
    try {
      n.onload = () => s(n), n.onerror = (i) => {
        const o = i instanceof Error ? i.message : "error";
        r(new Error(o));
      };
    } catch (i) {
      r(i);
    }
  });
}
const ag = {};
let Qi = !0;
async function cg(e, t, n) {
  let s;
  _r(n) ? s = await Ua(e, t, n) : s = Na(e, n);
  const r = t && t.imagebitmap;
  return await ug(s, r);
}
async function ug(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if ((lg(t) || !Qi) && (t = null), t)
    try {
      return await createImageBitmap(e, t);
    } catch (n) {
      console.warn(n), Qi = !1;
    }
  return await createImageBitmap(e);
}
function lg(e) {
  for (const t in e || ag)
    return !1;
  return !0;
}
function hg(e) {
  return !gg(e, "ftyp", 4) || !(e[8] & 96) ? null : fg(e);
}
function fg(e) {
  switch (dg(e, 8, 12).replace("\0", " ").trim()) {
    case "avif":
    case "avis":
      return {
        extension: "avif",
        mimeType: "image/avif"
      };
    default:
      return null;
  }
}
function dg(e, t, n) {
  return String.fromCharCode(...e.slice(t, n));
}
function mg(e) {
  return [...e].map((t) => t.charCodeAt(0));
}
function gg(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = mg(t);
  for (let r = 0; r < s.length; ++r)
    if (s[r] !== e[r + n])
      return !1;
  return !0;
}
const Ft = !1, Oe = !0;
function wr(e) {
  const t = Qe(e);
  return pg(t) || Cg(t) || yg(t) || Bg(t) || Ag(t);
}
function Ag(e) {
  const t = new Uint8Array(e instanceof DataView ? e.buffer : e), n = hg(t);
  return n ? {
    mimeType: n.mimeType,
    width: 0,
    height: 0
  } : null;
}
function pg(e) {
  const t = Qe(e);
  return t.byteLength >= 24 && t.getUint32(0, Ft) === 2303741511 ? {
    mimeType: "image/png",
    width: t.getUint32(16, Ft),
    height: t.getUint32(20, Ft)
  } : null;
}
function yg(e) {
  const t = Qe(e);
  return t.byteLength >= 10 && t.getUint32(0, Ft) === 1195984440 ? {
    mimeType: "image/gif",
    width: t.getUint16(6, Oe),
    height: t.getUint16(8, Oe)
  } : null;
}
function Bg(e) {
  const t = Qe(e);
  return t.byteLength >= 14 && t.getUint16(0, Ft) === 16973 && t.getUint32(2, Oe) === t.byteLength ? {
    mimeType: "image/bmp",
    width: t.getUint32(18, Oe),
    height: t.getUint32(22, Oe)
  } : null;
}
function Cg(e) {
  const t = Qe(e);
  if (!(t.byteLength >= 3 && t.getUint16(0, Ft) === 65496 && t.getUint8(2) === 255))
    return null;
  const {
    tableMarkers: s,
    sofMarkers: r
  } = Eg();
  let i = 2;
  for (; i + 9 < t.byteLength; ) {
    const o = t.getUint16(i, Ft);
    if (r.has(o))
      return {
        mimeType: "image/jpeg",
        height: t.getUint16(i + 5, Ft),
        width: t.getUint16(i + 7, Ft)
      };
    if (!s.has(o))
      return null;
    i += 2, i += t.getUint16(i, Ft);
  }
  return null;
}
function Eg() {
  const e = /* @__PURE__ */ new Set([65499, 65476, 65484, 65501, 65534]);
  for (let n = 65504; n < 65520; ++n)
    e.add(n);
  return {
    tableMarkers: e,
    sofMarkers: /* @__PURE__ */ new Set([65472, 65473, 65474, 65475, 65477, 65478, 65479, 65481, 65482, 65483, 65485, 65486, 65487, 65502])
  };
}
function Qe(e) {
  if (e instanceof DataView)
    return e;
  if (ArrayBuffer.isView(e))
    return new DataView(e.buffer);
  if (e instanceof ArrayBuffer)
    return new DataView(e);
  throw new Error("toDataView");
}
async function Tg(e, t) {
  var n;
  const {
    mimeType: s
  } = wr(e) || {}, r = (n = globalThis.loaders) === null || n === void 0 ? void 0 : n.parseImageNode;
  return U(r), await r(e, s);
}
async function bg(e, t, n) {
  t = t || {};
  const r = (t.image || {}).type || "auto", {
    url: i
  } = n || {}, o = _g(r);
  let a;
  switch (o) {
    case "imagebitmap":
      a = await cg(e, t, i);
      break;
    case "image":
      a = await Ua(e, t, i);
      break;
    case "data":
      a = await Tg(e);
      break;
    default:
      U(!1);
  }
  return r === "data" && (a = Ga(a)), a;
}
function _g(e) {
  switch (e) {
    case "auto":
    case "data":
      return tg();
    default:
      return Zm(e), e;
  }
}
const wg = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "svg", "avif"], Rg = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/avif", "image/bmp", "image/vnd.microsoft.icon", "image/svg+xml"], Mg = {
  image: {
    type: "auto",
    decode: !0
  }
}, Sg = {
  id: "image",
  module: "images",
  name: "Images",
  version: qm,
  mimeTypes: Rg,
  extensions: wg,
  parse: bg,
  tests: [(e) => !!wr(new DataView(e))],
  options: Mg
}, Ms = {};
function Ig(e) {
  if (Ms[e] === void 0) {
    const t = Jn ? vg(e) : xg(e);
    Ms[e] = t;
  }
  return Ms[e];
}
function xg(e) {
  var t, n;
  const s = ["image/png", "image/jpeg", "image/gif"], r = ((t = globalThis.loaders) === null || t === void 0 ? void 0 : t.imageFormatsNode) || s;
  return !!((n = globalThis.loaders) === null || n === void 0 ? void 0 : n.parseImageNode) && r.includes(e);
}
function vg(e) {
  switch (e) {
    case "image/avif":
    case "image/webp":
      return Fg(e);
    default:
      return !0;
  }
}
function Fg(e) {
  try {
    return document.createElement("canvas").toDataURL(e).indexOf(`data:${e}`) === 0;
  } catch {
    return !1;
  }
}
function At(e, t) {
  if (!e)
    throw new Error(t || "assert failed: gltf");
}
const Ha = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Ja = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}, Og = 1.33, qi = ["SCALAR", "VEC2", "VEC3", "VEC4"], Dg = [[Int8Array, 5120], [Uint8Array, 5121], [Int16Array, 5122], [Uint16Array, 5123], [Uint32Array, 5125], [Float32Array, 5126], [Float64Array, 5130]], Lg = new Map(Dg), Pg = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Gg = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}, Ng = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
function Va(e) {
  return qi[e - 1] || qi[0];
}
function Rr(e) {
  const t = Lg.get(e.constructor);
  if (!t)
    throw new Error("Illegal typed array");
  return t;
}
function Mr(e, t) {
  const n = Ng[e.componentType], s = Pg[e.type], r = Gg[e.componentType], i = e.count * s, o = e.count * s * r;
  At(o >= 0 && o <= t.byteLength);
  const a = Ja[e.componentType], c = Ha[e.type];
  return {
    ArrayType: n,
    length: i,
    byteLength: o,
    componentByteSize: a,
    numberOfComponentsInElement: c
  };
}
function ja(e) {
  let {
    images: t,
    bufferViews: n
  } = e;
  t = t || [], n = n || [];
  const s = t.map((o) => o.bufferView);
  n = n.filter((o) => !s.includes(o));
  const r = n.reduce((o, a) => o + a.byteLength, 0), i = t.reduce((o, a) => {
    const {
      width: c,
      height: u
    } = a.image;
    return o + c * u;
  }, 0);
  return r + Math.ceil(4 * i * Og);
}
function Ug(e, t, n) {
  const s = e.bufferViews[n];
  At(s);
  const r = s.buffer, i = t[r];
  At(i);
  const o = (s.byteOffset || 0) + i.byteOffset;
  return new Uint8Array(i.arrayBuffer, o, s.byteLength);
}
function Hg(e, t, n) {
  var s, r;
  const i = typeof n == "number" ? (s = e.accessors) === null || s === void 0 ? void 0 : s[n] : n;
  if (!i)
    throw new Error(`No gltf accessor ${JSON.stringify(n)}`);
  const o = (r = e.bufferViews) === null || r === void 0 ? void 0 : r[i.bufferView || 0];
  if (!o)
    throw new Error(`No gltf buffer view for accessor ${o}`);
  const {
    arrayBuffer: a,
    byteOffset: c
  } = t[o.buffer], u = (c || 0) + (i.byteOffset || 0) + (o.byteOffset || 0), {
    ArrayType: l,
    length: h,
    componentByteSize: f,
    numberOfComponentsInElement: d
  } = Mr(i, o), m = f * d, g = o.byteStride || m;
  if (typeof o.byteStride > "u" || o.byteStride === m)
    return new l(a, u, h);
  const p = new l(h);
  for (let C = 0; C < i.count; C++) {
    const w = new l(a, u + C * g, d);
    p.set(w, C * d);
  }
  return p;
}
function Jg() {
  return {
    asset: {
      version: "2.0",
      generator: "loaders.gl"
    },
    buffers: [],
    extensions: {},
    extensionsRequired: [],
    extensionsUsed: []
  };
}
class rt {
  constructor(t) {
    this.gltf = void 0, this.sourceBuffers = void 0, this.byteLength = void 0, this.gltf = {
      json: (t == null ? void 0 : t.json) || Jg(),
      buffers: (t == null ? void 0 : t.buffers) || [],
      images: (t == null ? void 0 : t.images) || []
    }, this.sourceBuffers = [], this.byteLength = 0, this.gltf.buffers && this.gltf.buffers[0] && (this.byteLength = this.gltf.buffers[0].byteLength, this.sourceBuffers = [this.gltf.buffers[0]]);
  }
  get json() {
    return this.gltf.json;
  }
  getApplicationData(t) {
    return this.json[t];
  }
  getExtraData(t) {
    return (this.json.extras || {})[t];
  }
  hasExtension(t) {
    const n = this.getUsedExtensions().find((r) => r === t), s = this.getRequiredExtensions().find((r) => r === t);
    return typeof n == "string" || typeof s == "string";
  }
  getExtension(t) {
    const n = this.getUsedExtensions().find((r) => r === t), s = this.json.extensions || {};
    return n ? s[t] : null;
  }
  getRequiredExtension(t) {
    return this.getRequiredExtensions().find((s) => s === t) ? this.getExtension(t) : null;
  }
  getRequiredExtensions() {
    return this.json.extensionsRequired || [];
  }
  getUsedExtensions() {
    return this.json.extensionsUsed || [];
  }
  getRemovedExtensions() {
    return this.json.extensionsRemoved || [];
  }
  getObjectExtension(t, n) {
    return (t.extensions || {})[n];
  }
  getScene(t) {
    return this.getObject("scenes", t);
  }
  getNode(t) {
    return this.getObject("nodes", t);
  }
  getSkin(t) {
    return this.getObject("skins", t);
  }
  getMesh(t) {
    return this.getObject("meshes", t);
  }
  getMaterial(t) {
    return this.getObject("materials", t);
  }
  getAccessor(t) {
    return this.getObject("accessors", t);
  }
  getTexture(t) {
    return this.getObject("textures", t);
  }
  getSampler(t) {
    return this.getObject("samplers", t);
  }
  getImage(t) {
    return this.getObject("images", t);
  }
  getBufferView(t) {
    return this.getObject("bufferViews", t);
  }
  getBuffer(t) {
    return this.getObject("buffers", t);
  }
  getObject(t, n) {
    if (typeof n == "object")
      return n;
    const s = this.json[t] && this.json[t][n];
    if (!s)
      throw new Error(`glTF file error: Could not find ${t}[${n}]`);
    return s;
  }
  getTypedArrayForBufferView(t) {
    t = this.getBufferView(t);
    const n = t.buffer, s = this.gltf.buffers[n];
    At(s);
    const r = (t.byteOffset || 0) + s.byteOffset;
    return new Uint8Array(s.arrayBuffer, r, t.byteLength);
  }
  getTypedArrayForAccessor(t) {
    const n = this.getAccessor(t);
    return Hg(this.gltf.json, this.gltf.buffers, n);
  }
  getTypedArrayForImageData(t) {
    t = this.getAccessor(t);
    const n = this.getBufferView(t.bufferView), r = this.getBuffer(n.buffer).data, i = n.byteOffset || 0;
    return new Uint8Array(r, i, n.byteLength);
  }
  addApplicationData(t, n) {
    return this.json[t] = n, this;
  }
  addExtraData(t, n) {
    return this.json.extras = this.json.extras || {}, this.json.extras[t] = n, this;
  }
  addObjectExtension(t, n, s) {
    return t.extensions = t.extensions || {}, t.extensions[n] = s, this.registerUsedExtension(n), this;
  }
  setObjectExtension(t, n, s) {
    const r = t.extensions || {};
    r[n] = s;
  }
  removeObjectExtension(t, n) {
    const s = (t == null ? void 0 : t.extensions) || {};
    if (s[n]) {
      this.json.extensionsRemoved = this.json.extensionsRemoved || [];
      const r = this.json.extensionsRemoved;
      r.includes(n) || r.push(n);
    }
    delete s[n];
  }
  addExtension(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return At(n), this.json.extensions = this.json.extensions || {}, this.json.extensions[t] = n, this.registerUsedExtension(t), n;
  }
  addRequiredExtension(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return At(n), this.addExtension(t, n), this.registerRequiredExtension(t), n;
  }
  registerUsedExtension(t) {
    this.json.extensionsUsed = this.json.extensionsUsed || [], this.json.extensionsUsed.find((n) => n === t) || this.json.extensionsUsed.push(t);
  }
  registerRequiredExtension(t) {
    this.registerUsedExtension(t), this.json.extensionsRequired = this.json.extensionsRequired || [], this.json.extensionsRequired.find((n) => n === t) || this.json.extensionsRequired.push(t);
  }
  removeExtension(t) {
    var n;
    if ((n = this.json.extensions) !== null && n !== void 0 && n[t]) {
      this.json.extensionsRemoved = this.json.extensionsRemoved || [];
      const s = this.json.extensionsRemoved;
      s.includes(t) || s.push(t);
    }
    this.json.extensions && delete this.json.extensions[t], this.json.extensionsRequired && this._removeStringFromArray(this.json.extensionsRequired, t), this.json.extensionsUsed && this._removeStringFromArray(this.json.extensionsUsed, t);
  }
  setDefaultScene(t) {
    this.json.scene = t;
  }
  addScene(t) {
    const {
      nodeIndices: n
    } = t;
    return this.json.scenes = this.json.scenes || [], this.json.scenes.push({
      nodes: n
    }), this.json.scenes.length - 1;
  }
  addNode(t) {
    const {
      meshIndex: n,
      matrix: s
    } = t;
    this.json.nodes = this.json.nodes || [];
    const r = {
      mesh: n
    };
    return s && (r.matrix = s), this.json.nodes.push(r), this.json.nodes.length - 1;
  }
  addMesh(t) {
    const {
      attributes: n,
      indices: s,
      material: r,
      mode: i = 4
    } = t, a = {
      primitives: [{
        attributes: this._addAttributes(n),
        mode: i
      }]
    };
    if (s) {
      const c = this._addIndices(s);
      a.primitives[0].indices = c;
    }
    return Number.isFinite(r) && (a.primitives[0].material = r), this.json.meshes = this.json.meshes || [], this.json.meshes.push(a), this.json.meshes.length - 1;
  }
  addPointCloud(t) {
    const s = {
      primitives: [{
        attributes: this._addAttributes(t),
        mode: 0
      }]
    };
    return this.json.meshes = this.json.meshes || [], this.json.meshes.push(s), this.json.meshes.length - 1;
  }
  addImage(t, n) {
    const s = wr(t), r = n || (s == null ? void 0 : s.mimeType), o = {
      bufferView: this.addBufferView(t),
      mimeType: r
    };
    return this.json.images = this.json.images || [], this.json.images.push(o), this.json.images.length - 1;
  }
  addBufferView(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.byteLength;
    const r = t.byteLength;
    At(Number.isFinite(r)), this.sourceBuffers = this.sourceBuffers || [], this.sourceBuffers.push(t);
    const i = {
      buffer: n,
      byteOffset: s,
      byteLength: r
    };
    return this.byteLength += ke(r, 4), this.json.bufferViews = this.json.bufferViews || [], this.json.bufferViews.push(i), this.json.bufferViews.length - 1;
  }
  addAccessor(t, n) {
    const s = {
      bufferView: t,
      type: Va(n.size),
      componentType: n.componentType,
      count: n.count,
      max: n.max,
      min: n.min
    };
    return this.json.accessors = this.json.accessors || [], this.json.accessors.push(s), this.json.accessors.length - 1;
  }
  addBinaryBuffer(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      size: 3
    };
    const s = this.addBufferView(t);
    let r = {
      min: n.min,
      max: n.max
    };
    (!r.min || !r.max) && (r = this._getAccessorMinMax(t, n.size));
    const i = {
      size: n.size,
      componentType: Rr(t),
      count: Math.round(t.length / n.size),
      min: r.min,
      max: r.max
    };
    return this.addAccessor(s, Object.assign(i, n));
  }
  addTexture(t) {
    const {
      imageIndex: n
    } = t, s = {
      source: n
    };
    return this.json.textures = this.json.textures || [], this.json.textures.push(s), this.json.textures.length - 1;
  }
  addMaterial(t) {
    return this.json.materials = this.json.materials || [], this.json.materials.push(t), this.json.materials.length - 1;
  }
  createBinaryChunk() {
    var t, n;
    this.gltf.buffers = [];
    const s = this.byteLength, r = new ArrayBuffer(s), i = new Uint8Array(r);
    let o = 0;
    for (const a of this.sourceBuffers || [])
      o = Mu(a, i, o);
    (t = this.json) !== null && t !== void 0 && (n = t.buffers) !== null && n !== void 0 && n[0] ? this.json.buffers[0].byteLength = s : this.json.buffers = [{
      byteLength: s
    }], this.gltf.binary = r, this.sourceBuffers = [r];
  }
  _removeStringFromArray(t, n) {
    let s = !0;
    for (; s; ) {
      const r = t.indexOf(n);
      r > -1 ? t.splice(r, 1) : s = !1;
    }
  }
  _addAttributes() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const n = {};
    for (const s in t) {
      const r = t[s], i = this._getGltfAttributeName(s), o = this.addBinaryBuffer(r.value, r);
      n[i] = o;
    }
    return n;
  }
  _addIndices(t) {
    return this.addBinaryBuffer(t, {
      size: 1
    });
  }
  _getGltfAttributeName(t) {
    switch (t.toLowerCase()) {
      case "position":
      case "positions":
      case "vertices":
        return "POSITION";
      case "normal":
      case "normals":
        return "NORMAL";
      case "color":
      case "colors":
        return "COLOR_0";
      case "texcoord":
      case "texcoords":
        return "TEXCOORD_0";
      default:
        return t;
    }
  }
  _getAccessorMinMax(t, n) {
    const s = {
      min: null,
      max: null
    };
    if (t.length < n)
      return s;
    s.min = [], s.max = [];
    const r = t.subarray(0, n);
    for (const i of r)
      s.min.push(i), s.max.push(i);
    for (let i = n; i < t.length; i += n)
      for (let o = 0; o < n; o++)
        s.min[0 + o] = Math.min(s.min[0 + o], t[i + o]), s.max[0 + o] = Math.max(s.max[0 + o], t[i + o]);
    return s;
  }
}
function Yi(e) {
  return (e % 1 + 1) % 1;
}
const ka = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16,
  BOOLEAN: 1,
  STRING: 1,
  ENUM: 1
}, Vg = {
  INT8: Int8Array,
  UINT8: Uint8Array,
  INT16: Int16Array,
  UINT16: Uint16Array,
  INT32: Int32Array,
  UINT32: Uint32Array,
  INT64: BigInt64Array,
  UINT64: BigUint64Array,
  FLOAT32: Float32Array,
  FLOAT64: Float64Array
}, Ka = {
  INT8: 1,
  UINT8: 1,
  INT16: 2,
  UINT16: 2,
  INT32: 4,
  UINT32: 4,
  INT64: 8,
  UINT64: 8,
  FLOAT32: 4,
  FLOAT64: 8
};
function Sr(e, t) {
  return Ka[t] * ka[e];
}
function Qn(e, t, n, s) {
  if (n !== "UINT8" && n !== "UINT16" && n !== "UINT32" && n !== "UINT64")
    return null;
  const r = e.getTypedArrayForBufferView(t), i = qn(r, "SCALAR", n, s + 1);
  return i instanceof BigInt64Array || i instanceof BigUint64Array ? null : i;
}
function qn(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  const r = ka[t], i = Vg[n], o = Ka[n], a = s * r, c = a * o;
  let u = e.buffer, l = e.byteOffset;
  return l % o !== 0 && (u = new Uint8Array(u).slice(l, l + c).buffer, l = 0), new i(u, l, a);
}
function Ir(e, t, n) {
  var s, r;
  const i = `TEXCOORD_${t.texCoord || 0}`, o = n.attributes[i], a = e.getTypedArrayForAccessor(o), c = e.gltf.json, u = t.index, l = (s = c.textures) === null || s === void 0 || (r = s[u]) === null || r === void 0 ? void 0 : r.source;
  if (typeof l < "u") {
    var h, f, d;
    const m = (h = c.images) === null || h === void 0 || (f = h[l]) === null || f === void 0 ? void 0 : f.mimeType, g = (d = e.gltf.images) === null || d === void 0 ? void 0 : d[l];
    if (g && typeof g.width < "u") {
      const p = [];
      for (let C = 0; C < a.length; C += 2) {
        const w = jg(g, m, a, C, t.channels);
        p.push(w);
      }
      return p;
    }
  }
  return [];
}
function za(e, t, n, s, r) {
  if (!(n != null && n.length))
    return;
  const i = [];
  for (const l of n) {
    let h = s.findIndex((f) => f === l);
    h === -1 && (h = s.push(l) - 1), i.push(h);
  }
  const o = new Uint32Array(i), a = e.gltf.buffers.push({
    arrayBuffer: o.buffer,
    byteOffset: o.byteOffset,
    byteLength: o.byteLength
  }) - 1, c = e.addBufferView(o, a, 0), u = e.addAccessor(c, {
    size: 1,
    componentType: Rr(o),
    count: o.length
  });
  r.attributes[t] = u;
}
function jg(e, t, n, s) {
  let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [0];
  const i = {
    r: {
      offset: 0,
      shift: 0
    },
    g: {
      offset: 1,
      shift: 8
    },
    b: {
      offset: 2,
      shift: 16
    },
    a: {
      offset: 3,
      shift: 24
    }
  }, o = n[s], a = n[s + 1];
  let c = 1;
  t && (t.indexOf("image/jpeg") !== -1 || t.indexOf("image/png") !== -1) && (c = 4);
  const u = kg(o, a, e, c);
  let l = 0;
  for (const h of r) {
    const f = typeof h == "number" ? Object.values(i)[h] : i[h], d = u + f.offset, m = Ga(e);
    if (m.data.length <= d)
      throw new Error(`${m.data.length} <= ${d}`);
    const g = m.data[d];
    l |= g << f.shift;
  }
  return l;
}
function kg(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  const r = n.width, i = Yi(e) * (r - 1), o = Math.round(i), a = n.height, c = Yi(t) * (a - 1), u = Math.round(c), l = n.components ? n.components : s;
  return (u * r + o) * l;
}
function Wa(e, t, n, s, r) {
  const i = [];
  for (let o = 0; o < t; o++) {
    const a = n[o], c = n[o + 1] - n[o];
    if (c + a > s)
      break;
    const u = a / r, l = c / r;
    i.push(e.slice(u, u + l));
  }
  return i;
}
function Xa(e, t, n) {
  const s = [];
  for (let r = 0; r < t; r++) {
    const i = r * n;
    s.push(e.slice(i, i + n));
  }
  return s;
}
function Qa(e, t, n, s) {
  if (n)
    throw new Error("Not implemented - arrayOffsets for strings is specified");
  if (s) {
    const r = [], i = new TextDecoder("utf8");
    let o = 0;
    for (let a = 0; a < e; a++) {
      const c = s[a + 1] - s[a];
      if (c + o <= t.length) {
        const u = t.subarray(o, c + o), l = i.decode(u);
        r.push(l), o += c;
      }
    }
    return r;
  }
  return [];
}
const qa = "EXT_mesh_features", Kg = qa;
async function zg(e, t) {
  const n = new rt(e);
  Wg(n, t);
}
function Wg(e, t) {
  const n = e.gltf.json;
  if (n.meshes)
    for (const s of n.meshes)
      for (const r of s.primitives)
        Xg(e, r, t);
}
function Xg(e, t, n) {
  var s, r;
  if (!(n != null && (s = n.gltf) !== null && s !== void 0 && s.loadBuffers))
    return;
  const i = (r = t.extensions) === null || r === void 0 ? void 0 : r[qa], o = i == null ? void 0 : i.featureIds;
  if (o)
    for (const c of o) {
      var a;
      let u;
      if (typeof c.attribute < "u") {
        const l = `_FEATURE_ID_${c.attribute}`, h = t.attributes[l];
        u = e.getTypedArrayForAccessor(h);
      } else
        typeof c.texture < "u" && n !== null && n !== void 0 && (a = n.gltf) !== null && a !== void 0 && a.loadImages ? u = Ir(e, c.texture, t) : u = [];
      c.data = u;
    }
}
const Qg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: zg,
  name: Kg
}, Symbol.toStringTag, { value: "Module" })), xr = "EXT_structural_metadata", qg = xr;
async function Yg(e, t) {
  const n = new rt(e);
  $g(n, t);
}
function $g(e, t) {
  var n, s;
  if (!((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const r = e.getExtension(xr);
  r && ((s = t.gltf) !== null && s !== void 0 && s.loadImages && Zg(e, r), t0(e, r));
}
function Zg(e, t) {
  const n = t.propertyTextures, s = e.gltf.json;
  if (n && s.meshes)
    for (const r of s.meshes)
      for (const i of r.primitives)
        n0(e, n, i, t);
}
function t0(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, r = t.propertyTables;
  if (s && r)
    for (const i in s) {
      const o = e0(r, i);
      o && r0(e, n, o);
    }
}
function e0(e, t) {
  for (const n of e)
    if (n.class === t)
      return n;
  return null;
}
function n0(e, t, n, s) {
  var r;
  if (!t)
    return;
  const i = (r = n.extensions) === null || r === void 0 ? void 0 : r[xr], o = i == null ? void 0 : i.propertyTextures;
  if (o)
    for (const a of o) {
      const c = t[a];
      s0(e, c, n, s);
    }
}
function s0(e, t, n, s) {
  if (!t.properties)
    return;
  s.dataAttributeNames || (s.dataAttributeNames = []);
  const r = t.class;
  for (const o in t.properties) {
    var i;
    const a = `${r}_${o}`, c = (i = t.properties) === null || i === void 0 ? void 0 : i[o];
    if (!c)
      continue;
    c.data || (c.data = []);
    const u = c.data, l = Ir(e, c, n);
    l !== null && (za(e, a, l, u, n), c.data = u, s.dataAttributeNames.push(a));
  }
}
function r0(e, t, n) {
  var s;
  const r = (s = t.classes) === null || s === void 0 ? void 0 : s[n.class];
  if (!r)
    throw new Error(`Incorrect data in the EXT_structural_metadata extension: no schema class with name ${n.class}`);
  const i = n.count;
  for (const a in r.properties) {
    var o;
    const c = r.properties[a], u = (o = n.properties) === null || o === void 0 ? void 0 : o[a];
    if (u) {
      const l = i0(e, t, c, i, u);
      u.data = l;
    }
  }
}
function i0(e, t, n, s, r) {
  let i = [];
  const o = r.values, a = e.getTypedArrayForBufferView(o), c = o0(e, n, r, s), u = a0(e, r, s);
  switch (n.type) {
    case "SCALAR":
    case "VEC2":
    case "VEC3":
    case "VEC4":
    case "MAT2":
    case "MAT3":
    case "MAT4": {
      i = c0(n, s, a, c);
      break;
    }
    case "BOOLEAN":
      throw new Error(`Not implemented - classProperty.type=${n.type}`);
    case "STRING": {
      i = Qa(s, a, c, u);
      break;
    }
    case "ENUM": {
      i = u0(t, n, s, a, c);
      break;
    }
    default:
      throw new Error(`Unknown classProperty type ${n.type}`);
  }
  return i;
}
function o0(e, t, n, s) {
  return t.array && typeof t.count > "u" && typeof n.arrayOffsets < "u" ? Qn(e, n.arrayOffsets, n.arrayOffsetType || "UINT32", s) : null;
}
function a0(e, t, n) {
  return typeof t.stringOffsets < "u" ? Qn(e, t.stringOffsets, t.stringOffsetType || "UINT32", n) : null;
}
function c0(e, t, n, s) {
  const r = e.array, i = e.count, o = Sr(e.type, e.componentType), a = n.byteLength / o;
  let c;
  return e.componentType ? c = qn(n, e.type, e.componentType, a) : c = n, r ? s ? Wa(c, t, s, n.length, o) : i ? Xa(c, t, i) : [] : c;
}
function u0(e, t, n, s, r) {
  var i;
  const o = t.enumType;
  if (!o)
    throw new Error("Incorrect data in the EXT_structural_metadata extension: classProperty.enumType is not set for type ENUM");
  const a = (i = e.enums) === null || i === void 0 ? void 0 : i[o];
  if (!a)
    throw new Error(`Incorrect data in the EXT_structural_metadata extension: schema.enums does't contain ${o}`);
  const c = a.valueType || "UINT16", u = Sr(t.type, c), l = s.byteLength / u;
  let h = qn(s, t.type, c, l);
  if (h || (h = s), t.array) {
    if (r)
      return l0({
        valuesData: h,
        numberOfElements: n,
        arrayOffsets: r,
        valuesDataBytesLength: s.length,
        elementSize: u,
        enumEntry: a
      });
    const f = t.count;
    return f ? h0(h, n, f, a) : [];
  }
  return vr(h, 0, n, a);
}
function l0(e) {
  const {
    valuesData: t,
    numberOfElements: n,
    arrayOffsets: s,
    valuesDataBytesLength: r,
    elementSize: i,
    enumEntry: o
  } = e, a = [];
  for (let c = 0; c < n; c++) {
    const u = s[c], l = s[c + 1] - s[c];
    if (l + u > r)
      break;
    const h = u / i, f = l / i, d = vr(t, h, f, o);
    a.push(d);
  }
  return a;
}
function h0(e, t, n, s) {
  const r = [];
  for (let i = 0; i < t; i++) {
    const o = n * i, a = vr(e, o, n, s);
    r.push(a);
  }
  return r;
}
function vr(e, t, n, s) {
  const r = [];
  for (let i = 0; i < n; i++)
    if (e instanceof BigInt64Array || e instanceof BigUint64Array)
      r.push("");
    else {
      const o = e[t + i], a = f0(s, o);
      a ? r.push(a.name) : r.push("");
    }
  return r;
}
function f0(e, t) {
  for (const n of e.values)
    if (n.value === t)
      return n;
  return null;
}
const d0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Yg,
  name: qg
}, Symbol.toStringTag, { value: "Module" })), Ya = "EXT_feature_metadata", m0 = Ya;
async function g0(e, t) {
  const n = new rt(e);
  A0(n, t);
}
function A0(e, t) {
  var n, s;
  if (!((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const r = e.getExtension(Ya);
  r && ((s = t.gltf) !== null && s !== void 0 && s.loadImages && p0(e, r), y0(e, r));
}
function p0(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, {
    featureTextures: r
  } = t;
  if (s && r)
    for (const i in s) {
      const o = s[i], a = C0(r, i);
      a && T0(e, a, o);
    }
}
function y0(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, r = t.featureTables;
  if (s && r)
    for (const i in s) {
      const o = B0(r, i);
      o && E0(e, n, o);
    }
}
function B0(e, t) {
  for (const n in e) {
    const s = e[n];
    if (s.class === t)
      return s;
  }
  return null;
}
function C0(e, t) {
  for (const n in e) {
    const s = e[n];
    if (s.class === t)
      return s;
  }
  return null;
}
function E0(e, t, n) {
  var s;
  if (!n.class)
    return;
  const r = (s = t.classes) === null || s === void 0 ? void 0 : s[n.class];
  if (!r)
    throw new Error(`Incorrect data in the EXT_structural_metadata extension: no schema class with name ${n.class}`);
  const i = n.count;
  for (const a in r.properties) {
    var o;
    const c = r.properties[a], u = (o = n.properties) === null || o === void 0 ? void 0 : o[a];
    if (u) {
      const l = b0(e, t, c, i, u);
      u.data = l;
    }
  }
}
function T0(e, t, n) {
  const s = t.class;
  for (const i in n.properties) {
    var r;
    const o = t == null || (r = t.properties) === null || r === void 0 ? void 0 : r[i];
    if (o) {
      const a = S0(e, o, s);
      o.data = a;
    }
  }
}
function b0(e, t, n, s, r) {
  let i = [];
  const o = r.bufferView, a = e.getTypedArrayForBufferView(o), c = _0(e, n, r, s), u = w0(e, n, r, s);
  return n.type === "STRING" || n.componentType === "STRING" ? i = Qa(s, a, c, u) : R0(n) && (i = M0(n, s, a, c)), i;
}
function _0(e, t, n, s) {
  return t.type === "ARRAY" && typeof t.componentCount > "u" && typeof n.arrayOffsetBufferView < "u" ? Qn(e, n.arrayOffsetBufferView, n.offsetType || "UINT32", s) : null;
}
function w0(e, t, n, s) {
  return typeof n.stringOffsetBufferView < "u" ? Qn(e, n.stringOffsetBufferView, n.offsetType || "UINT32", s) : null;
}
function R0(e) {
  const t = ["UINT8", "INT16", "UINT16", "INT32", "UINT32", "INT64", "UINT64", "FLOAT32", "FLOAT64"];
  return t.includes(e.type) || typeof e.componentType < "u" && t.includes(e.componentType);
}
function M0(e, t, n, s) {
  const r = e.type === "ARRAY", i = e.componentCount, o = "SCALAR", a = e.componentType || e.type, c = Sr(o, a), u = n.byteLength / c, l = qn(n, o, a, u);
  return r ? s ? Wa(l, t, s, n.length, c) : i ? Xa(l, t, i) : [] : l;
}
function S0(e, t, n) {
  const s = e.gltf.json;
  if (!s.meshes)
    return [];
  const r = [];
  for (const i of s.meshes)
    for (const o of i.primitives)
      I0(e, n, t, r, o);
  return r;
}
function I0(e, t, n, s, r) {
  const i = {
    channels: n.channels,
    ...n.texture
  }, o = Ir(e, i, r);
  o && za(e, t, o, s, r);
}
const x0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: g0,
  name: m0
}, Symbol.toStringTag, { value: "Module" })), v0 = "4.1.1", F0 = "4.1.1", Fn = {
  TRANSCODER: "basis_transcoder.js",
  TRANSCODER_WASM: "basis_transcoder.wasm",
  ENCODER: "basis_encoder.js",
  ENCODER_WASM: "basis_encoder.wasm"
};
let Ss;
async function $i(e) {
  const t = e.modules || {};
  return t.basis ? t.basis : (Ss = Ss || O0(e), await Ss);
}
async function O0(e) {
  let t = null, n = null;
  return [t, n] = await Promise.all([await $t(Fn.TRANSCODER, "textures", e), await $t(Fn.TRANSCODER_WASM, "textures", e)]), t = t || globalThis.BASIS, await D0(t, n);
}
function D0(e, t) {
  const n = {};
  return t && (n.wasmBinary = t), new Promise((s) => {
    e(n).then((r) => {
      const {
        BasisFile: i,
        initializeBasis: o
      } = r;
      o(), s({
        BasisFile: i
      });
    });
  });
}
let Is;
async function Zi(e) {
  const t = e.modules || {};
  return t.basisEncoder ? t.basisEncoder : (Is = Is || L0(e), await Is);
}
async function L0(e) {
  let t = null, n = null;
  return [t, n] = await Promise.all([await $t(Fn.ENCODER, "textures", e), await $t(Fn.ENCODER_WASM, "textures", e)]), t = t || globalThis.BASIS, await P0(t, n);
}
function P0(e, t) {
  const n = {};
  return t && (n.wasmBinary = t), new Promise((s) => {
    e(n).then((r) => {
      const {
        BasisFile: i,
        KTX2File: o,
        initializeBasis: a,
        BasisEncoder: c
      } = r;
      a(), s({
        BasisFile: i,
        KTX2File: o,
        BasisEncoder: c
      });
    });
  });
}
const le = {
  COMPRESSED_RGB_S3TC_DXT1_EXT: 33776,
  COMPRESSED_RGBA_S3TC_DXT1_EXT: 33777,
  COMPRESSED_RGBA_S3TC_DXT3_EXT: 33778,
  COMPRESSED_RGBA_S3TC_DXT5_EXT: 33779,
  COMPRESSED_R11_EAC: 37488,
  COMPRESSED_SIGNED_R11_EAC: 37489,
  COMPRESSED_RG11_EAC: 37490,
  COMPRESSED_SIGNED_RG11_EAC: 37491,
  COMPRESSED_RGB8_ETC2: 37492,
  COMPRESSED_RGBA8_ETC2_EAC: 37493,
  COMPRESSED_SRGB8_ETC2: 37494,
  COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 37495,
  COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37496,
  COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37497,
  COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 35840,
  COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 35842,
  COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 35841,
  COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 35843,
  COMPRESSED_RGB_ETC1_WEBGL: 36196,
  COMPRESSED_RGB_ATC_WEBGL: 35986,
  COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL: 35987,
  COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL: 34798,
  COMPRESSED_RGBA_ASTC_4X4_KHR: 37808,
  COMPRESSED_RGBA_ASTC_5X4_KHR: 37809,
  COMPRESSED_RGBA_ASTC_5X5_KHR: 37810,
  COMPRESSED_RGBA_ASTC_6X5_KHR: 37811,
  COMPRESSED_RGBA_ASTC_6X6_KHR: 37812,
  COMPRESSED_RGBA_ASTC_8X5_KHR: 37813,
  COMPRESSED_RGBA_ASTC_8X6_KHR: 37814,
  COMPRESSED_RGBA_ASTC_8X8_KHR: 37815,
  COMPRESSED_RGBA_ASTC_10X5_KHR: 37816,
  COMPRESSED_RGBA_ASTC_10X6_KHR: 37817,
  COMPRESSED_RGBA_ASTC_10X8_KHR: 37818,
  COMPRESSED_RGBA_ASTC_10X10_KHR: 37819,
  COMPRESSED_RGBA_ASTC_12X10_KHR: 37820,
  COMPRESSED_RGBA_ASTC_12X12_KHR: 37821,
  COMPRESSED_SRGB8_ALPHA8_ASTC_4X4_KHR: 37840,
  COMPRESSED_SRGB8_ALPHA8_ASTC_5X4_KHR: 37841,
  COMPRESSED_SRGB8_ALPHA8_ASTC_5X5_KHR: 37842,
  COMPRESSED_SRGB8_ALPHA8_ASTC_6X5_KHR: 37843,
  COMPRESSED_SRGB8_ALPHA8_ASTC_6X6_KHR: 37844,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8X5_KHR: 37845,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8X6_KHR: 37846,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8X8_KHR: 37847,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X5_KHR: 37848,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X6_KHR: 37849,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X8_KHR: 37850,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X10_KHR: 37851,
  COMPRESSED_SRGB8_ALPHA8_ASTC_12X10_KHR: 37852,
  COMPRESSED_SRGB8_ALPHA8_ASTC_12X12_KHR: 37853,
  COMPRESSED_RED_RGTC1_EXT: 36283,
  COMPRESSED_SIGNED_RED_RGTC1_EXT: 36284,
  COMPRESSED_RED_GREEN_RGTC2_EXT: 36285,
  COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT: 36286,
  COMPRESSED_SRGB_S3TC_DXT1_EXT: 35916,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT: 35917,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT: 35918,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT: 35919
}, G0 = ["", "WEBKIT_", "MOZ_"], to = {
  WEBGL_compressed_texture_s3tc: "dxt",
  WEBGL_compressed_texture_s3tc_srgb: "dxt-srgb",
  WEBGL_compressed_texture_etc1: "etc1",
  WEBGL_compressed_texture_etc: "etc2",
  WEBGL_compressed_texture_pvrtc: "pvrtc",
  WEBGL_compressed_texture_atc: "atc",
  WEBGL_compressed_texture_astc: "astc",
  EXT_texture_compression_rgtc: "rgtc"
};
let dn = null;
function N0(e) {
  if (!dn) {
    e = e || U0() || void 0, dn = /* @__PURE__ */ new Set();
    for (const t of G0)
      for (const n in to)
        if (e && e.getExtension(`${t}${n}`)) {
          const s = to[n];
          dn.add(s);
        }
  }
  return dn;
}
function U0() {
  try {
    return document.createElement("canvas").getContext("webgl");
  } catch {
    return null;
  }
}
var eo, no, so, ro, io, oo, ao, co;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.BASISLZ = 1] = "BASISLZ", e[e.ZSTD = 2] = "ZSTD", e[e.ZLIB = 3] = "ZLIB";
})(eo || (eo = {})), function(e) {
  e[e.BASICFORMAT = 0] = "BASICFORMAT";
}(no || (no = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.ETC1S = 163] = "ETC1S", e[e.UASTC = 166] = "UASTC";
}(so || (so = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.SRGB = 1] = "SRGB";
}(ro || (ro = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.LINEAR = 1] = "LINEAR", e[e.SRGB = 2] = "SRGB", e[e.ITU = 3] = "ITU", e[e.NTSC = 4] = "NTSC", e[e.SLOG = 5] = "SLOG", e[e.SLOG2 = 6] = "SLOG2";
}(io || (io = {})), function(e) {
  e[e.ALPHA_STRAIGHT = 0] = "ALPHA_STRAIGHT", e[e.ALPHA_PREMULTIPLIED = 1] = "ALPHA_PREMULTIPLIED";
}(oo || (oo = {})), function(e) {
  e[e.RGB = 0] = "RGB", e[e.RRR = 3] = "RRR", e[e.GGG = 4] = "GGG", e[e.AAA = 15] = "AAA";
}(ao || (ao = {})), function(e) {
  e[e.RGB = 0] = "RGB", e[e.RGBA = 3] = "RGBA", e[e.RRR = 4] = "RRR", e[e.RRRG = 5] = "RRRG";
}(co || (co = {}));
const mt = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function H0(e) {
  const t = new Uint8Array(e);
  return !(t.byteLength < mt.length || t[0] !== mt[0] || t[1] !== mt[1] || t[2] !== mt[2] || t[3] !== mt[3] || t[4] !== mt[4] || t[5] !== mt[5] || t[6] !== mt[6] || t[7] !== mt[7] || t[8] !== mt[8] || t[9] !== mt[9] || t[10] !== mt[10] || t[11] !== mt[11]);
}
const J0 = {
  etc1: {
    basisFormat: 0,
    compressed: !0,
    format: le.COMPRESSED_RGB_ETC1_WEBGL
  },
  etc2: {
    basisFormat: 1,
    compressed: !0
  },
  bc1: {
    basisFormat: 2,
    compressed: !0,
    format: le.COMPRESSED_RGB_S3TC_DXT1_EXT
  },
  bc3: {
    basisFormat: 3,
    compressed: !0,
    format: le.COMPRESSED_RGBA_S3TC_DXT5_EXT
  },
  bc4: {
    basisFormat: 4,
    compressed: !0
  },
  bc5: {
    basisFormat: 5,
    compressed: !0
  },
  "bc7-m6-opaque-only": {
    basisFormat: 6,
    compressed: !0
  },
  "bc7-m5": {
    basisFormat: 7,
    compressed: !0
  },
  "pvrtc1-4-rgb": {
    basisFormat: 8,
    compressed: !0,
    format: le.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
  },
  "pvrtc1-4-rgba": {
    basisFormat: 9,
    compressed: !0,
    format: le.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
  },
  "astc-4x4": {
    basisFormat: 10,
    compressed: !0,
    format: le.COMPRESSED_RGBA_ASTC_4X4_KHR
  },
  "atc-rgb": {
    basisFormat: 11,
    compressed: !0
  },
  "atc-rgba-interpolated-alpha": {
    basisFormat: 12,
    compressed: !0
  },
  rgba32: {
    basisFormat: 13,
    compressed: !1
  },
  rgb565: {
    basisFormat: 14,
    compressed: !1
  },
  bgr565: {
    basisFormat: 15,
    compressed: !1
  },
  rgba4444: {
    basisFormat: 16,
    compressed: !1
  }
};
async function V0(e, t) {
  if (t.basis.containerFormat === "auto") {
    if (H0(e)) {
      const s = await Zi(t);
      return uo(s.KTX2File, e, t);
    }
    const {
      BasisFile: n
    } = await $i(t);
    return xs(n, e, t);
  }
  switch (t.basis.module) {
    case "encoder":
      const n = await Zi(t);
      switch (t.basis.containerFormat) {
        case "ktx2":
          return uo(n.KTX2File, e, t);
        case "basis":
        default:
          return xs(n.BasisFile, e, t);
      }
    case "transcoder":
    default:
      const {
        BasisFile: s
      } = await $i(t);
      return xs(s, e, t);
  }
}
function xs(e, t, n) {
  const s = new e(new Uint8Array(t));
  try {
    if (!s.startTranscoding())
      throw new Error("Failed to start basis transcoding");
    const r = s.getNumImages(), i = [];
    for (let o = 0; o < r; o++) {
      const a = s.getNumLevels(o), c = [];
      for (let u = 0; u < a; u++)
        c.push(j0(s, o, u, n));
      i.push(c);
    }
    return i;
  } finally {
    s.close(), s.delete();
  }
}
function j0(e, t, n, s) {
  const r = e.getImageWidth(t, n), i = e.getImageHeight(t, n), o = e.getHasAlpha(), {
    compressed: a,
    format: c,
    basisFormat: u
  } = $a(s, o), l = e.getImageTranscodedSizeInBytes(t, n, u), h = new Uint8Array(l);
  if (!e.transcodeImage(h, t, n, u, 0, 0))
    throw new Error("failed to start Basis transcoding");
  return {
    width: r,
    height: i,
    data: h,
    compressed: a,
    format: c,
    hasAlpha: o
  };
}
function uo(e, t, n) {
  const s = new e(new Uint8Array(t));
  try {
    if (!s.startTranscoding())
      throw new Error("failed to start KTX2 transcoding");
    const r = s.getLevels(), i = [];
    for (let o = 0; o < r; o++) {
      i.push(k0(s, o, n));
      break;
    }
    return [i];
  } finally {
    s.close(), s.delete();
  }
}
function k0(e, t, n) {
  const {
    alphaFlag: s,
    height: r,
    width: i
  } = e.getImageLevelInfo(t, 0, 0), {
    compressed: o,
    format: a,
    basisFormat: c
  } = $a(n, s), u = e.getImageTranscodedSizeInBytes(t, 0, 0, c), l = new Uint8Array(u);
  if (!e.transcodeImage(l, t, 0, 0, c, 0, -1, -1))
    throw new Error("Failed to transcode KTX2 image");
  return {
    width: i,
    height: r,
    data: l,
    compressed: o,
    levelSize: u,
    hasAlpha: s,
    format: a
  };
}
function $a(e, t) {
  let n = e && e.basis && e.basis.format;
  return n === "auto" && (n = Za()), typeof n == "object" && (n = t ? n.alpha : n.noAlpha), n = n.toLowerCase(), J0[n];
}
function Za() {
  const e = N0();
  return e.has("astc") ? "astc-4x4" : e.has("dxt") ? {
    alpha: "bc3",
    noAlpha: "bc1"
  } : e.has("pvrtc") ? {
    alpha: "pvrtc1-4-rgba",
    noAlpha: "pvrtc1-4-rgb"
  } : e.has("etc1") ? "etc1" : e.has("etc2") ? "etc2" : "rgb565";
}
const K0 = {
  name: "Basis",
  id: "basis",
  module: "textures",
  version: F0,
  worker: !0,
  extensions: ["basis", "ktx2"],
  mimeTypes: ["application/octet-stream", "image/ktx2"],
  tests: ["sB"],
  binary: !0,
  options: {
    basis: {
      format: "auto",
      libraryPath: "libs/",
      containerFormat: "auto",
      module: "transcoder"
    }
  }
}, z0 = {
  ...K0,
  parse: V0
}, Ae = !0, lo = 1735152710, Fr = 12, On = 8, W0 = 1313821514, X0 = 5130562, Q0 = 0, q0 = 0, Y0 = 1;
function $0(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return `${String.fromCharCode(e.getUint8(t + 0))}${String.fromCharCode(e.getUint8(t + 1))}${String.fromCharCode(e.getUint8(t + 2))}${String.fromCharCode(e.getUint8(t + 3))}`;
}
function Z0(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const s = new DataView(e), {
    magic: r = lo
  } = n, i = s.getUint32(t, !1);
  return i === r || i === lo;
}
function tA(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = new DataView(t), r = $0(s, n + 0), i = s.getUint32(n + 4, Ae), o = s.getUint32(n + 8, Ae);
  switch (Object.assign(e, {
    header: {
      byteOffset: n,
      byteLength: o,
      hasBinChunk: !1
    },
    type: r,
    version: i,
    json: {},
    binChunks: []
  }), n += Fr, e.version) {
    case 1:
      return eA(e, s, n);
    case 2:
      return nA(e, s, n, {});
    default:
      throw new Error(`Invalid GLB version ${e.version}. Only supports version 1 and 2.`);
  }
}
function eA(e, t, n) {
  U(e.header.byteLength > Fr + On);
  const s = t.getUint32(n + 0, Ae), r = t.getUint32(n + 4, Ae);
  return n += On, U(r === Q0), Ys(e, t, n, s), n += s, n += $s(e, t, n, e.header.byteLength), n;
}
function nA(e, t, n, s) {
  return U(e.header.byteLength > Fr + On), sA(e, t, n, s), n + e.header.byteLength;
}
function sA(e, t, n, s) {
  for (; n + 8 <= e.header.byteLength; ) {
    const r = t.getUint32(n + 0, Ae), i = t.getUint32(n + 4, Ae);
    switch (n += On, i) {
      case W0:
        Ys(e, t, n, r);
        break;
      case X0:
        $s(e, t, n, r);
        break;
      case q0:
        s.strict || Ys(e, t, n, r);
        break;
      case Y0:
        s.strict || $s(e, t, n, r);
        break;
    }
    n += ke(r, 4);
  }
  return n;
}
function Ys(e, t, n, s) {
  const r = new Uint8Array(t.buffer, n, s), o = new TextDecoder("utf8").decode(r);
  return e.json = JSON.parse(o), ke(s, 4);
}
function $s(e, t, n, s) {
  return e.header.hasBinChunk = !0, e.binChunks.push({
    byteOffset: n,
    byteLength: s,
    arrayBuffer: t.buffer
  }), ke(s, 4);
}
function tc(e, t) {
  if (e.startsWith("data:") || e.startsWith("http:") || e.startsWith("https:"))
    return e;
  const s = t.baseUri || t.uri;
  if (!s)
    throw new Error(`'baseUri' must be provided to resolve relative url ${e}`);
  return s.substr(0, s.lastIndexOf("/") + 1) + e;
}
const rA = "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", iA = "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", oA = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11]), aA = new Uint8Array([32, 0, 65, 253, 3, 1, 2, 34, 4, 106, 6, 5, 11, 8, 7, 20, 13, 33, 12, 16, 128, 9, 116, 64, 19, 113, 127, 15, 10, 21, 22, 14, 255, 66, 24, 54, 136, 107, 18, 23, 192, 26, 114, 118, 132, 17, 77, 101, 130, 144, 27, 87, 131, 44, 45, 74, 156, 154, 70, 167]), cA = {
  0: "",
  1: "meshopt_decodeFilterOct",
  2: "meshopt_decodeFilterQuat",
  3: "meshopt_decodeFilterExp",
  NONE: "",
  OCTAHEDRAL: "meshopt_decodeFilterOct",
  QUATERNION: "meshopt_decodeFilterQuat",
  EXPONENTIAL: "meshopt_decodeFilterExp"
}, uA = {
  0: "meshopt_decodeVertexBuffer",
  1: "meshopt_decodeIndexBuffer",
  2: "meshopt_decodeIndexSequence",
  ATTRIBUTES: "meshopt_decodeVertexBuffer",
  TRIANGLES: "meshopt_decodeIndexBuffer",
  INDICES: "meshopt_decodeIndexSequence"
};
async function lA(e, t, n, s, r) {
  let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : "NONE";
  const o = await hA();
  mA(o, o.exports[uA[r]], e, t, n, s, o.exports[cA[i || "NONE"]]);
}
let vs;
async function hA() {
  return vs || (vs = fA()), vs;
}
async function fA() {
  let e = rA;
  WebAssembly.validate(oA) && (e = iA, console.log("Warning: meshopt_decoder is using experimental SIMD support"));
  const t = await WebAssembly.instantiate(dA(e), {});
  return await t.instance.exports.__wasm_call_ctors(), t.instance;
}
function dA(e) {
  const t = new Uint8Array(e.length);
  for (let s = 0; s < e.length; ++s) {
    const r = e.charCodeAt(s);
    t[s] = r > 96 ? r - 71 : r > 64 ? r - 65 : r > 47 ? r + 4 : r > 46 ? 63 : 62;
  }
  let n = 0;
  for (let s = 0; s < e.length; ++s)
    t[n++] = t[s] < 60 ? aA[t[s]] : (t[s] - 60) * 64 + t[++s];
  return t.buffer.slice(0, n);
}
function mA(e, t, n, s, r, i, o) {
  const a = e.exports.sbrk, c = s + 3 & -4, u = a(c * r), l = a(i.length), h = new Uint8Array(e.exports.memory.buffer);
  h.set(i, l);
  const f = t(u, s, r, l, i.length);
  if (f === 0 && o && o(u, c, r), n.set(h.subarray(u, u + s * r)), a(u - a(0)), f !== 0)
    throw new Error(`Malformed buffer data: ${f}`);
}
const Dn = "EXT_meshopt_compression", gA = Dn;
async function AA(e, t) {
  var n, s;
  const r = new rt(e);
  if (!(t != null && (n = t.gltf) !== null && n !== void 0 && n.decompressMeshes) || !((s = t.gltf) !== null && s !== void 0 && s.loadBuffers))
    return;
  const i = [];
  for (const o of e.json.bufferViews || [])
    i.push(pA(r, o));
  await Promise.all(i), r.removeExtension(Dn);
}
async function pA(e, t) {
  const n = e.getObjectExtension(t, Dn);
  if (n) {
    const {
      byteOffset: s = 0,
      byteLength: r = 0,
      byteStride: i,
      count: o,
      mode: a,
      filter: c = "NONE",
      buffer: u
    } = n, l = e.gltf.buffers[u], h = new Uint8Array(l.arrayBuffer, l.byteOffset + s, r), f = new Uint8Array(e.gltf.buffers[t.buffer].arrayBuffer, t.byteOffset, t.byteLength);
    await lA(f, o, i, h, a, c), e.removeObjectExtension(t, Dn);
  }
}
const yA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: AA,
  name: gA
}, Symbol.toStringTag, { value: "Module" })), he = "EXT_texture_webp", BA = he;
function CA(e, t) {
  const n = new rt(e);
  if (!Ig("image/webp")) {
    if (n.getRequiredExtensions().includes(he))
      throw new Error(`gltf: Required extension ${he} not supported by browser`);
    return;
  }
  const {
    json: s
  } = n;
  for (const r of s.textures || []) {
    const i = n.getObjectExtension(r, he);
    i && (r.source = i.source), n.removeObjectExtension(r, he);
  }
  n.removeExtension(he);
}
const EA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: BA,
  preprocess: CA
}, Symbol.toStringTag, { value: "Module" })), bn = "KHR_texture_basisu", TA = bn;
function bA(e, t) {
  const n = new rt(e), {
    json: s
  } = n;
  for (const r of s.textures || []) {
    const i = n.getObjectExtension(r, bn);
    i && (r.source = i.source, n.removeObjectExtension(r, bn));
  }
  n.removeExtension(bn);
}
const _A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: TA,
  preprocess: bA
}, Symbol.toStringTag, { value: "Module" }));
function wA(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    if (n !== "indices") {
      const r = ec(s);
      t[n] = r;
    }
  }
  return t;
}
function ec(e) {
  const {
    buffer: t,
    size: n,
    count: s
  } = RA(e);
  return {
    value: t,
    size: n,
    byteOffset: 0,
    count: s,
    type: Va(n),
    componentType: Rr(t)
  };
}
function RA(e) {
  let t = e, n = 1, s = 0;
  return e && e.value && (t = e.value, n = e.size || 1), t && (ArrayBuffer.isView(t) || (t = MA(t, Float32Array)), s = t.length / n), {
    buffer: t,
    size: n,
    count: s
  };
}
function MA(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return e ? Array.isArray(e) ? new t(e) : n && !(e instanceof t) ? new t(e) : e : null;
}
const Kt = "KHR_draco_mesh_compression", SA = Kt;
function IA(e, t, n) {
  const s = new rt(e);
  for (const r of nc(s))
    s.getObjectExtension(r, Kt);
}
async function xA(e, t, n) {
  var s;
  if (!(t != null && (s = t.gltf) !== null && s !== void 0 && s.decompressMeshes))
    return;
  const r = new rt(e), i = [];
  for (const o of nc(r))
    r.getObjectExtension(o, Kt) && i.push(FA(r, o, t, n));
  await Promise.all(i), r.removeExtension(Kt);
}
function vA(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const n = new rt(e);
  for (const s of n.json.meshes || [])
    OA(s, t), n.addRequiredExtension(Kt);
}
async function FA(e, t, n, s) {
  const r = e.getObjectExtension(t, Kt);
  if (!r)
    return;
  const i = e.getTypedArrayForBufferView(r.bufferView), o = lr(i.buffer, i.byteOffset), a = {
    ...n
  };
  delete a["3d-tiles"];
  const c = await je(o, Oa, a, s), u = wA(c.attributes);
  for (const [l, h] of Object.entries(u))
    if (l in t.attributes) {
      const f = t.attributes[l], d = e.getAccessor(f);
      d != null && d.min && d !== null && d !== void 0 && d.max && (h.min = d.min, h.max = d.max);
    }
  t.attributes = u, c.indices && (t.indices = ec(c.indices)), e.removeObjectExtension(t, Kt), DA(t);
}
function OA(e, t) {
  var n;
  let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 4, r = arguments.length > 3 ? arguments[3] : void 0, i = arguments.length > 4 ? arguments[4] : void 0;
  if (!r.DracoWriter)
    throw new Error("options.gltf.DracoWriter not provided");
  const o = r.DracoWriter.encodeSync({
    attributes: e
  }), a = i == null || (n = i.parseSync) === null || n === void 0 ? void 0 : n.call(i, {
    attributes: e
  }), c = r._addFauxAttributes(a.attributes), u = r.addBufferView(o);
  return {
    primitives: [{
      attributes: c,
      mode: s,
      extensions: {
        [Kt]: {
          bufferView: u,
          attributes: c
        }
      }
    }]
  };
}
function DA(e) {
  if (!e.attributes && Object.keys(e.attributes).length > 0)
    throw new Error("glTF: Empty primitive detected: Draco decompression failure?");
}
function* nc(e) {
  for (const t of e.json.meshes || [])
    for (const n of t.primitives)
      yield n;
}
const LA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: xA,
  encode: vA,
  name: SA,
  preprocess: IA
}, Symbol.toStringTag, { value: "Module" })), Or = "KHR_texture_transform", PA = Or, mn = new A(), GA = new z(), NA = new z();
async function UA(e, t) {
  var n;
  if (!new rt(e).hasExtension(Or) || !((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const i = e.json.materials || [];
  for (let o = 0; o < i.length; o++)
    HA(o, e);
}
function HA(e, t) {
  var n, s, r;
  const i = [], o = (n = t.json.materials) === null || n === void 0 ? void 0 : n[e], a = o == null || (s = o.pbrMetallicRoughness) === null || s === void 0 ? void 0 : s.baseColorTexture;
  a && Re(t, e, a, i);
  const c = o == null ? void 0 : o.emissiveTexture;
  c && Re(t, e, c, i);
  const u = o == null ? void 0 : o.normalTexture;
  u && Re(t, e, u, i);
  const l = o == null ? void 0 : o.occlusionTexture;
  l && Re(t, e, l, i);
  const h = o == null || (r = o.pbrMetallicRoughness) === null || r === void 0 ? void 0 : r.metallicRoughnessTexture;
  h && Re(t, e, h, i);
}
function Re(e, t, n, s) {
  const r = JA(n, s);
  if (!r)
    return;
  const i = e.json.meshes || [];
  for (const o of i)
    for (const a of o.primitives) {
      const c = a.material;
      Number.isFinite(c) && t === c && VA(e, a, r);
    }
}
function JA(e, t) {
  var n;
  const s = (n = e.extensions) === null || n === void 0 ? void 0 : n[Or], {
    texCoord: r = 0
  } = e, {
    texCoord: i = r
  } = s;
  if (!(t.findIndex((a) => {
    let [c, u] = a;
    return c === r && u === i;
  }) !== -1)) {
    const a = KA(s);
    return r !== i && (e.texCoord = i), t.push([r, i]), {
      originalTexCoord: r,
      texCoord: i,
      matrix: a
    };
  }
  return null;
}
function VA(e, t, n) {
  const {
    originalTexCoord: s,
    texCoord: r,
    matrix: i
  } = n, o = t.attributes[`TEXCOORD_${s}`];
  if (Number.isFinite(o)) {
    var a;
    const u = (a = e.json.accessors) === null || a === void 0 ? void 0 : a[o];
    if (u && u.bufferView) {
      var c;
      const l = (c = e.json.bufferViews) === null || c === void 0 ? void 0 : c[u.bufferView];
      if (l) {
        const {
          arrayBuffer: h,
          byteOffset: f
        } = e.buffers[l.buffer], d = (f || 0) + (u.byteOffset || 0) + (l.byteOffset || 0), {
          ArrayType: m,
          length: g
        } = Mr(u, l), p = Ja[u.componentType], C = Ha[u.type], w = l.byteStride || p * C, y = new Float32Array(g);
        for (let B = 0; B < u.count; B++) {
          const R = new m(h, d + B * w, 2);
          mn.set(R[0], R[1], 1), mn.transformByMatrix3(i), y.set([mn[0], mn[1]], B * C);
        }
        s === r ? jA(u, l, e.buffers, y) : kA(r, u, t, e, y);
      }
    }
  }
}
function jA(e, t, n, s) {
  e.componentType = 5126, n.push({
    arrayBuffer: s.buffer,
    byteOffset: 0,
    byteLength: s.buffer.byteLength
  }), t.buffer = n.length - 1, t.byteLength = s.buffer.byteLength, t.byteOffset = 0, delete t.byteStride;
}
function kA(e, t, n, s, r) {
  s.buffers.push({
    arrayBuffer: r.buffer,
    byteOffset: 0,
    byteLength: r.buffer.byteLength
  });
  const i = s.json.bufferViews;
  if (!i)
    return;
  i.push({
    buffer: s.buffers.length - 1,
    byteLength: r.buffer.byteLength,
    byteOffset: 0
  });
  const o = s.json.accessors;
  o && (o.push({
    bufferView: (i == null ? void 0 : i.length) - 1,
    byteOffset: 0,
    componentType: 5126,
    count: t.count,
    type: "VEC2"
  }), n.attributes[`TEXCOORD_${e}`] = o.length - 1);
}
function KA(e) {
  const {
    offset: t = [0, 0],
    rotation: n = 0,
    scale: s = [1, 1]
  } = e, r = new z().set(1, 0, 0, 0, 1, 0, t[0], t[1], 1), i = GA.set(Math.cos(n), Math.sin(n), 0, -Math.sin(n), Math.cos(n), 0, 0, 0, 1), o = NA.set(s[0], 0, 0, 0, s[1], 0, 0, 0, 1);
  return r.multiplyRight(i).multiplyRight(o);
}
const zA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: UA,
  name: PA
}, Symbol.toStringTag, { value: "Module" })), Yt = "KHR_lights_punctual", WA = Yt;
async function XA(e) {
  const t = new rt(e), {
    json: n
  } = t, s = t.getExtension(Yt);
  s && (t.json.lights = s.lights, t.removeExtension(Yt));
  for (const r of n.nodes || []) {
    const i = t.getObjectExtension(r, Yt);
    i && (r.light = i.light), t.removeObjectExtension(r, Yt);
  }
}
async function QA(e) {
  const t = new rt(e), {
    json: n
  } = t;
  if (n.lights) {
    const s = t.addExtension(Yt);
    At(!s.lights), s.lights = n.lights, delete n.lights;
  }
  if (t.json.lights) {
    for (const s of t.json.lights) {
      const r = s.node;
      t.addObjectExtension(r, Yt, s);
    }
    delete t.json.lights;
  }
}
const qA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: XA,
  encode: QA,
  name: WA
}, Symbol.toStringTag, { value: "Module" })), Ge = "KHR_materials_unlit", YA = Ge;
async function $A(e) {
  const t = new rt(e), {
    json: n
  } = t;
  for (const s of n.materials || [])
    s.extensions && s.extensions.KHR_materials_unlit && (s.unlit = !0), t.removeObjectExtension(s, Ge);
  t.removeExtension(Ge);
}
function ZA(e) {
  const t = new rt(e), {
    json: n
  } = t;
  if (t.materials)
    for (const s of n.materials || [])
      s.unlit && (delete s.unlit, t.addObjectExtension(s, Ge, {}), t.addExtension(Ge));
}
const tp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: $A,
  encode: ZA,
  name: YA
}, Symbol.toStringTag, { value: "Module" })), Ie = "KHR_techniques_webgl", ep = Ie;
async function np(e) {
  const t = new rt(e), {
    json: n
  } = t, s = t.getExtension(Ie);
  if (s) {
    const r = rp(s, t);
    for (const i of n.materials || []) {
      const o = t.getObjectExtension(i, Ie);
      o && (i.technique = Object.assign({}, o, r[o.technique]), i.technique.values = ip(i.technique, t)), t.removeObjectExtension(i, Ie);
    }
    t.removeExtension(Ie);
  }
}
async function sp(e, t) {
}
function rp(e, t) {
  const {
    programs: n = [],
    shaders: s = [],
    techniques: r = []
  } = e, i = new TextDecoder();
  return s.forEach((o) => {
    if (Number.isFinite(o.bufferView))
      o.code = i.decode(t.getTypedArrayForBufferView(o.bufferView));
    else
      throw new Error("KHR_techniques_webgl: no shader code");
  }), n.forEach((o) => {
    o.fragmentShader = s[o.fragmentShader], o.vertexShader = s[o.vertexShader];
  }), r.forEach((o) => {
    o.program = n[o.program];
  }), r;
}
function ip(e, t) {
  const n = Object.assign({}, e.values);
  return Object.keys(e.uniforms || {}).forEach((s) => {
    e.uniforms[s].value && !(s in n) && (n[s] = e.uniforms[s].value);
  }), Object.keys(n).forEach((s) => {
    typeof n[s] == "object" && n[s].index !== void 0 && (n[s].texture = t.getTexture(n[s].index));
  }), n;
}
const op = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: np,
  encode: sp,
  name: ep
}, Symbol.toStringTag, { value: "Module" })), sc = [d0, Qg, yA, EA, _A, LA, qA, tp, op, zA, x0];
function ap(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = sc.filter((i) => rc(i.name, t));
  for (const i of s) {
    var r;
    (r = i.preprocess) === null || r === void 0 || r.call(i, e, t, n);
  }
}
async function cp(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = sc.filter((i) => rc(i.name, t));
  for (const i of s) {
    var r;
    await ((r = i.decode) === null || r === void 0 ? void 0 : r.call(i, e, t, n));
  }
}
function rc(e, t) {
  var n;
  const s = (t == null || (n = t.gltf) === null || n === void 0 ? void 0 : n.excludeExtensions) || {};
  return !(e in s && !s[e]);
}
const Fs = "KHR_binary_glTF";
function up(e) {
  const t = new rt(e), {
    json: n
  } = t;
  for (const s of n.images || []) {
    const r = t.getObjectExtension(s, Fs);
    r && Object.assign(s, r), t.removeObjectExtension(s, Fs);
  }
  n.buffers && n.buffers[0] && delete n.buffers[0].uri, t.removeExtension(Fs);
}
const ho = {
  accessors: "accessor",
  animations: "animation",
  buffers: "buffer",
  bufferViews: "bufferView",
  images: "image",
  materials: "material",
  meshes: "mesh",
  nodes: "node",
  samplers: "sampler",
  scenes: "scene",
  skins: "skin",
  textures: "texture"
}, lp = {
  accessor: "accessors",
  animations: "animation",
  buffer: "buffers",
  bufferView: "bufferViews",
  image: "images",
  material: "materials",
  mesh: "meshes",
  node: "nodes",
  sampler: "samplers",
  scene: "scenes",
  skin: "skins",
  texture: "textures"
};
class hp {
  constructor() {
    this.idToIndexMap = {
      animations: {},
      accessors: {},
      buffers: {},
      bufferViews: {},
      images: {},
      materials: {},
      meshes: {},
      nodes: {},
      samplers: {},
      scenes: {},
      skins: {},
      textures: {}
    }, this.json = void 0;
  }
  normalize(t, n) {
    this.json = t.json;
    const s = t.json;
    switch (s.asset && s.asset.version) {
      case "2.0":
        return;
      case void 0:
      case "1.0":
        break;
      default:
        console.warn(`glTF: Unknown version ${s.asset.version}`);
        return;
    }
    if (!n.normalize)
      throw new Error("glTF v1 is not supported.");
    console.warn("Converting glTF v1 to glTF v2 format. This is experimental and may fail."), this._addAsset(s), this._convertTopLevelObjectsToArrays(s), up(t), this._convertObjectIdsToArrayIndices(s), this._updateObjects(s), this._updateMaterial(s);
  }
  _addAsset(t) {
    t.asset = t.asset || {}, t.asset.version = "2.0", t.asset.generator = t.asset.generator || "Normalized to glTF 2.0 by loaders.gl";
  }
  _convertTopLevelObjectsToArrays(t) {
    for (const n in ho)
      this._convertTopLevelObjectToArray(t, n);
  }
  _convertTopLevelObjectToArray(t, n) {
    const s = t[n];
    if (!(!s || Array.isArray(s))) {
      t[n] = [];
      for (const r in s) {
        const i = s[r];
        i.id = i.id || r;
        const o = t[n].length;
        t[n].push(i), this.idToIndexMap[n][r] = o;
      }
    }
  }
  _convertObjectIdsToArrayIndices(t) {
    for (const n in ho)
      this._convertIdsToIndices(t, n);
    "scene" in t && (t.scene = this._convertIdToIndex(t.scene, "scene"));
    for (const n of t.textures)
      this._convertTextureIds(n);
    for (const n of t.meshes)
      this._convertMeshIds(n);
    for (const n of t.nodes)
      this._convertNodeIds(n);
    for (const n of t.scenes)
      this._convertSceneIds(n);
  }
  _convertTextureIds(t) {
    t.source && (t.source = this._convertIdToIndex(t.source, "image"));
  }
  _convertMeshIds(t) {
    for (const n of t.primitives) {
      const {
        attributes: s,
        indices: r,
        material: i
      } = n;
      for (const o in s)
        s[o] = this._convertIdToIndex(s[o], "accessor");
      r && (n.indices = this._convertIdToIndex(r, "accessor")), i && (n.material = this._convertIdToIndex(i, "material"));
    }
  }
  _convertNodeIds(t) {
    t.children && (t.children = t.children.map((n) => this._convertIdToIndex(n, "node"))), t.meshes && (t.meshes = t.meshes.map((n) => this._convertIdToIndex(n, "mesh")));
  }
  _convertSceneIds(t) {
    t.nodes && (t.nodes = t.nodes.map((n) => this._convertIdToIndex(n, "node")));
  }
  _convertIdsToIndices(t, n) {
    t[n] || (console.warn(`gltf v1: json doesn't contain attribute ${n}`), t[n] = []);
    for (const s of t[n])
      for (const r in s) {
        const i = s[r], o = this._convertIdToIndex(i, r);
        s[r] = o;
      }
  }
  _convertIdToIndex(t, n) {
    const s = lp[n];
    if (s in this.idToIndexMap) {
      const r = this.idToIndexMap[s][t];
      if (!Number.isFinite(r))
        throw new Error(`gltf v1: failed to resolve ${n} with id ${t}`);
      return r;
    }
    return t;
  }
  _updateObjects(t) {
    for (const n of this.json.buffers)
      delete n.type;
  }
  _updateMaterial(t) {
    for (const i of t.materials) {
      var n, s, r;
      i.pbrMetallicRoughness = {
        baseColorFactor: [1, 1, 1, 1],
        metallicFactor: 1,
        roughnessFactor: 1
      };
      const o = ((n = i.values) === null || n === void 0 ? void 0 : n.tex) || ((s = i.values) === null || s === void 0 ? void 0 : s.texture2d_0) || ((r = i.values) === null || r === void 0 ? void 0 : r.diffuseTex), a = t.textures.findIndex((c) => c.id === o);
      a !== -1 && (i.pbrMetallicRoughness.baseColorTexture = {
        index: a
      });
    }
  }
}
function fp(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new hp().normalize(e, t);
}
async function dp(e, t) {
  var n, s, r;
  let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 ? arguments[3] : void 0, a = arguments.length > 4 ? arguments[4] : void 0;
  return mp(e, t, i, o), fp(e, {
    normalize: o == null || (n = o.gltf) === null || n === void 0 ? void 0 : n.normalize
  }), ap(e, o, a), o != null && (s = o.gltf) !== null && s !== void 0 && s.loadBuffers && e.json.buffers && await gp(e, o, a), o != null && (r = o.gltf) !== null && r !== void 0 && r.loadImages && await Ap(e, o, a), await cp(e, o, a), e;
}
function mp(e, t, n, s) {
  if (s.uri && (e.baseUri = s.uri), t instanceof ArrayBuffer && !Z0(t, n, s) && (t = new TextDecoder().decode(t)), typeof t == "string")
    e.json = bu(t);
  else if (t instanceof ArrayBuffer) {
    const o = {};
    n = tA(o, t, n, s.glb), At(o.type === "glTF", `Invalid GLB magic string ${o.type}`), e._glb = o, e.json = o.json;
  } else
    At(!1, "GLTF: must be ArrayBuffer or string");
  const r = e.json.buffers || [];
  if (e.buffers = new Array(r.length).fill(null), e._glb && e._glb.header.hasBinChunk) {
    const {
      binChunks: o
    } = e._glb;
    e.buffers[0] = {
      arrayBuffer: o[0].arrayBuffer,
      byteOffset: o[0].byteOffset,
      byteLength: o[0].byteLength
    };
  }
  const i = e.json.images || [];
  e.images = new Array(i.length).fill({});
}
async function gp(e, t, n) {
  const s = e.json.buffers || [];
  for (let o = 0; o < s.length; ++o) {
    const a = s[o];
    if (a.uri) {
      var r, i;
      const {
        fetch: c
      } = n;
      At(c);
      const u = tc(a.uri, t), l = await (n == null || (r = n.fetch) === null || r === void 0 ? void 0 : r.call(n, u)), h = await (l == null || (i = l.arrayBuffer) === null || i === void 0 ? void 0 : i.call(l));
      e.buffers[o] = {
        arrayBuffer: h,
        byteOffset: 0,
        byteLength: h.byteLength
      }, delete a.uri;
    } else
      e.buffers[o] === null && (e.buffers[o] = {
        arrayBuffer: new ArrayBuffer(a.byteLength),
        byteOffset: 0,
        byteLength: a.byteLength
      });
  }
}
async function Ap(e, t, n) {
  const s = pp(e), r = e.json.images || [], i = [];
  for (const o of s)
    i.push(yp(e, r[o], o, t, n));
  return await Promise.all(i);
}
function pp(e) {
  const t = /* @__PURE__ */ new Set(), n = e.json.textures || [];
  for (const s of n)
    s.source !== void 0 && t.add(s.source);
  return Array.from(t).sort();
}
async function yp(e, t, n, s, r) {
  let i;
  if (t.uri && !t.hasOwnProperty("bufferView")) {
    const a = tc(t.uri, s), {
      fetch: c
    } = r;
    i = await (await c(a)).arrayBuffer(), t.bufferView = {
      data: i
    };
  }
  if (Number.isFinite(t.bufferView)) {
    const a = Ug(e.json, e.buffers, t.bufferView);
    i = lr(a.buffer, a.byteOffset, a.byteLength);
  }
  At(i, "glTF image has no data");
  let o = await je(i, [Sg, z0], {
    ...s,
    mimeType: t.mimeType,
    basis: s.basis || {
      format: Za()
    }
  }, r);
  o && o[0] && (o = {
    compressed: !0,
    mipmaps: !1,
    width: o[0].width,
    height: o[0].height,
    data: o[0]
  }), e.images = e.images || [], e.images[n] = o;
}
const Ln = {
  name: "glTF",
  id: "gltf",
  module: "gltf",
  version: v0,
  extensions: ["gltf", "glb"],
  mimeTypes: ["model/gltf+json", "model/gltf-binary"],
  text: !0,
  binary: !0,
  tests: ["glTF"],
  parse: Bp,
  options: {
    gltf: {
      normalize: !0,
      loadBuffers: !0,
      loadImages: !0,
      decompressMeshes: !0
    },
    log: console
  }
};
async function Bp(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  t = {
    ...Ln.options,
    ...t
  }, t.gltf = {
    ...Ln.options.gltf,
    ...t.gltf
  };
  const {
    byteOffset: s = 0
  } = t;
  return await dp({}, e, s, t, n);
}
const Cp = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Ep = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}, yt = {
  TEXTURE_MAG_FILTER: 10240,
  TEXTURE_MIN_FILTER: 10241,
  TEXTURE_WRAP_S: 10242,
  TEXTURE_WRAP_T: 10243,
  REPEAT: 10497,
  LINEAR: 9729,
  NEAREST_MIPMAP_LINEAR: 9986
}, Tp = {
  magFilter: yt.TEXTURE_MAG_FILTER,
  minFilter: yt.TEXTURE_MIN_FILTER,
  wrapS: yt.TEXTURE_WRAP_S,
  wrapT: yt.TEXTURE_WRAP_T
}, bp = {
  [yt.TEXTURE_MAG_FILTER]: yt.LINEAR,
  [yt.TEXTURE_MIN_FILTER]: yt.NEAREST_MIPMAP_LINEAR,
  [yt.TEXTURE_WRAP_S]: yt.REPEAT,
  [yt.TEXTURE_WRAP_T]: yt.REPEAT
};
function _p() {
  return {
    id: "default-sampler",
    parameters: bp
  };
}
function wp(e) {
  return Ep[e];
}
function Rp(e) {
  return Cp[e];
}
class Mp {
  constructor() {
    this.baseUri = "", this.jsonUnprocessed = void 0, this.json = void 0, this.buffers = [], this.images = [];
  }
  postProcess(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const {
      json: s,
      buffers: r = [],
      images: i = []
    } = t, {
      baseUri: o = ""
    } = t;
    return At(s), this.baseUri = o, this.buffers = r, this.images = i, this.jsonUnprocessed = s, this.json = this._resolveTree(t.json, n), this.json;
  }
  _resolveTree(t) {
    const n = {
      ...t
    };
    return this.json = n, t.bufferViews && (n.bufferViews = t.bufferViews.map((s, r) => this._resolveBufferView(s, r))), t.images && (n.images = t.images.map((s, r) => this._resolveImage(s, r))), t.samplers && (n.samplers = t.samplers.map((s, r) => this._resolveSampler(s, r))), t.textures && (n.textures = t.textures.map((s, r) => this._resolveTexture(s, r))), t.accessors && (n.accessors = t.accessors.map((s, r) => this._resolveAccessor(s, r))), t.materials && (n.materials = t.materials.map((s, r) => this._resolveMaterial(s, r))), t.meshes && (n.meshes = t.meshes.map((s, r) => this._resolveMesh(s, r))), t.nodes && (n.nodes = t.nodes.map((s, r) => this._resolveNode(s, r)), n.nodes = n.nodes.map((s, r) => this._resolveNodeChildren(s))), t.skins && (n.skins = t.skins.map((s, r) => this._resolveSkin(s, r))), t.scenes && (n.scenes = t.scenes.map((s, r) => this._resolveScene(s, r))), typeof this.json.scene == "number" && n.scenes && (n.scene = n.scenes[this.json.scene]), n;
  }
  getScene(t) {
    return this._get(this.json.scenes, t);
  }
  getNode(t) {
    return this._get(this.json.nodes, t);
  }
  getSkin(t) {
    return this._get(this.json.skins, t);
  }
  getMesh(t) {
    return this._get(this.json.meshes, t);
  }
  getMaterial(t) {
    return this._get(this.json.materials, t);
  }
  getAccessor(t) {
    return this._get(this.json.accessors, t);
  }
  getCamera(t) {
    return this._get(this.json.cameras, t);
  }
  getTexture(t) {
    return this._get(this.json.textures, t);
  }
  getSampler(t) {
    return this._get(this.json.samplers, t);
  }
  getImage(t) {
    return this._get(this.json.images, t);
  }
  getBufferView(t) {
    return this._get(this.json.bufferViews, t);
  }
  getBuffer(t) {
    return this._get(this.json.buffers, t);
  }
  _get(t, n) {
    if (typeof n == "object")
      return n;
    const s = t && t[n];
    return s || console.warn(`glTF file error: Could not find ${t}[${n}]`), s;
  }
  _resolveScene(t, n) {
    return {
      ...t,
      id: t.id || `scene-${n}`,
      nodes: (t.nodes || []).map((s) => this.getNode(s))
    };
  }
  _resolveNode(t, n) {
    const s = {
      ...t,
      id: (t == null ? void 0 : t.id) || `node-${n}`
    };
    return t.mesh !== void 0 && (s.mesh = this.getMesh(t.mesh)), t.camera !== void 0 && (s.camera = this.getCamera(t.camera)), t.skin !== void 0 && (s.skin = this.getSkin(t.skin)), t.meshes !== void 0 && t.meshes.length && (s.mesh = t.meshes.reduce((r, i) => {
      const o = this.getMesh(i);
      return r.id = o.id, r.primitives = r.primitives.concat(o.primitives), r;
    }, {
      primitives: []
    })), s;
  }
  _resolveNodeChildren(t) {
    return t.children && (t.children = t.children.map((n) => this.getNode(n))), t;
  }
  _resolveSkin(t, n) {
    const s = typeof t.inverseBindMatrices == "number" ? this.getAccessor(t.inverseBindMatrices) : void 0;
    return {
      ...t,
      id: t.id || `skin-${n}`,
      inverseBindMatrices: s
    };
  }
  _resolveMesh(t, n) {
    const s = {
      ...t,
      id: t.id || `mesh-${n}`,
      primitives: []
    };
    return t.primitives && (s.primitives = t.primitives.map((r) => {
      const i = {
        ...r,
        attributes: {},
        indices: void 0,
        material: void 0
      }, o = r.attributes;
      for (const a in o)
        i.attributes[a] = this.getAccessor(o[a]);
      return r.indices !== void 0 && (i.indices = this.getAccessor(r.indices)), r.material !== void 0 && (i.material = this.getMaterial(r.material)), i;
    })), s;
  }
  _resolveMaterial(t, n) {
    const s = {
      ...t,
      id: t.id || `material-${n}`
    };
    if (s.normalTexture && (s.normalTexture = {
      ...s.normalTexture
    }, s.normalTexture.texture = this.getTexture(s.normalTexture.index)), s.occlusionTexture && (s.occlusionTexture = {
      ...s.occlusionTexture
    }, s.occlusionTexture.texture = this.getTexture(s.occlusionTexture.index)), s.emissiveTexture && (s.emissiveTexture = {
      ...s.emissiveTexture
    }, s.emissiveTexture.texture = this.getTexture(s.emissiveTexture.index)), s.emissiveFactor || (s.emissiveFactor = s.emissiveTexture ? [1, 1, 1] : [0, 0, 0]), s.pbrMetallicRoughness) {
      s.pbrMetallicRoughness = {
        ...s.pbrMetallicRoughness
      };
      const r = s.pbrMetallicRoughness;
      r.baseColorTexture && (r.baseColorTexture = {
        ...r.baseColorTexture
      }, r.baseColorTexture.texture = this.getTexture(r.baseColorTexture.index)), r.metallicRoughnessTexture && (r.metallicRoughnessTexture = {
        ...r.metallicRoughnessTexture
      }, r.metallicRoughnessTexture.texture = this.getTexture(r.metallicRoughnessTexture.index));
    }
    return s;
  }
  _resolveAccessor(t, n) {
    const s = wp(t.componentType), r = Rp(t.type), i = s * r, o = {
      ...t,
      id: t.id || `accessor-${n}`,
      bytesPerComponent: s,
      components: r,
      bytesPerElement: i,
      value: void 0,
      bufferView: void 0,
      sparse: void 0
    };
    if (t.bufferView !== void 0 && (o.bufferView = this.getBufferView(t.bufferView)), o.bufferView) {
      const a = o.bufferView.buffer, {
        ArrayType: c,
        byteLength: u
      } = Mr(o, o.bufferView), l = (o.bufferView.byteOffset || 0) + (o.byteOffset || 0) + a.byteOffset;
      let h = a.arrayBuffer.slice(l, l + u);
      o.bufferView.byteStride && (h = this._getValueFromInterleavedBuffer(a, l, o.bufferView.byteStride, o.bytesPerElement, o.count)), o.value = new c(h);
    }
    return o;
  }
  _getValueFromInterleavedBuffer(t, n, s, r, i) {
    const o = new Uint8Array(i * r);
    for (let a = 0; a < i; a++) {
      const c = n + a * s;
      o.set(new Uint8Array(t.arrayBuffer.slice(c, c + r)), a * r);
    }
    return o.buffer;
  }
  _resolveTexture(t, n) {
    return {
      ...t,
      id: t.id || `texture-${n}`,
      sampler: typeof t.sampler == "number" ? this.getSampler(t.sampler) : _p(),
      source: typeof t.source == "number" ? this.getImage(t.source) : void 0
    };
  }
  _resolveSampler(t, n) {
    const s = {
      id: t.id || `sampler-${n}`,
      ...t,
      parameters: {}
    };
    for (const r in s) {
      const i = this._enumSamplerParameter(r);
      i !== void 0 && (s.parameters[i] = s[r]);
    }
    return s;
  }
  _enumSamplerParameter(t) {
    return Tp[t];
  }
  _resolveImage(t, n) {
    const s = {
      ...t,
      id: t.id || `image-${n}`,
      image: null,
      bufferView: t.bufferView !== void 0 ? this.getBufferView(t.bufferView) : void 0
    }, r = this.images[n];
    return r && (s.image = r), s;
  }
  _resolveBufferView(t, n) {
    const s = t.buffer, r = this.buffers[s].arrayBuffer;
    let i = this.buffers[s].byteOffset || 0;
    return t.byteOffset && (i += t.byteOffset), {
      id: `bufferView-${n}`,
      ...t,
      buffer: this.buffers[s],
      data: new Uint8Array(r, i, t.byteLength)
    };
  }
  _resolveCamera(t, n) {
    const s = {
      ...t,
      id: t.id || `camera-${n}`
    };
    return s.perspective, s.orthographic, s;
  }
}
function ic(e, t) {
  return new Mp().postProcess(e, t);
}
const Zs = {
  URI: 0,
  EMBEDDED: 1
};
function oc(e, t, n, s) {
  e.rotateYtoZ = !0;
  const r = (e.byteOffset || 0) + (e.byteLength || 0) - n;
  if (r === 0)
    throw new Error("glTF byte length must be greater than 0.");
  return e.gltfUpAxis = s != null && s["3d-tiles"] && s["3d-tiles"].assetGltfUpAxis ? s["3d-tiles"].assetGltfUpAxis : "Y", e.gltfArrayBuffer = lr(t, n, r), e.gltfByteOffset = 0, e.gltfByteLength = r, n % 4 === 0 || console.warn(`${e.type}: embedded glb is not aligned to a 4-byte boundary.`), (e.byteOffset || 0) + (e.byteLength || 0);
}
async function ac(e, t, n, s) {
  const r = (n == null ? void 0 : n["3d-tiles"]) || {};
  if (Sp(e, t), r.loadGLTF) {
    if (!s)
      return;
    if (e.gltfUrl) {
      const {
        fetch: i
      } = s, o = await i(e.gltfUrl, n);
      e.gltfArrayBuffer = await o.arrayBuffer(), e.gltfByteOffset = 0;
    }
    if (e.gltfArrayBuffer) {
      const i = await je(e.gltfArrayBuffer, Ln, n, s);
      e.gltf = ic(i), e.gpuMemoryUsageInBytes = ja(e.gltf), delete e.gltfArrayBuffer, delete e.gltfByteOffset, delete e.gltfByteLength;
    }
  }
}
function Sp(e, t, n) {
  switch (t) {
    case Zs.URI:
      if (e.gltfArrayBuffer) {
        const s = new Uint8Array(e.gltfArrayBuffer, e.gltfByteOffset), i = new TextDecoder().decode(s);
        e.gltfUrl = i.replace(/[\s\0]+$/, "");
      }
      delete e.gltfArrayBuffer, delete e.gltfByteOffset, delete e.gltfByteLength;
      break;
    case Zs.EMBEDDED:
      break;
    default:
      throw new Error("b3dm: Illegal glTF format field");
  }
}
async function Ip(e, t, n, s, r) {
  var i;
  n = xp(e, t, n, s), await ac(e, Zs.EMBEDDED, s, r);
  const o = e == null || (i = e.gltf) === null || i === void 0 ? void 0 : i.extensions;
  return o && o.CESIUM_RTC && (e.rtcCenter = o.CESIUM_RTC.center), n;
}
function xp(e, t, n, s, r) {
  n = Xn(e, t, n), n = Tr(e, t, n), n = br(e, t, n), n = oc(e, t, n, s);
  const i = new Er(e.featureTableJson, e.featureTableBinary);
  return e.rtcCenter = i.getGlobalProperty("RTC_CENTER", P.FLOAT, 3), n;
}
async function vp(e, t, n, s, r) {
  return n = Fp(e, t, n, s), await ac(e, e.gltfFormat || 0, s, r), n;
}
function Fp(e, t, n, s, r) {
  var i;
  if (n = Xn(e, t, n), e.version !== 1)
    throw new Error(`Instanced 3D Model version ${e.version} is not supported`);
  n = Tr(e, t, n);
  const o = new DataView(t);
  if (e.gltfFormat = o.getUint32(n, !0), n += 4, n = br(e, t, n), n = oc(e, t, n, s), !(e != null && (i = e.header) !== null && i !== void 0 && i.featureTableJsonByteLength) || e.header.featureTableJsonByteLength === 0)
    throw new Error("i3dm parser: featureTableJsonByteLength is zero.");
  const a = new Er(e.featureTableJson, e.featureTableBinary), c = a.getGlobalProperty("INSTANCES_LENGTH");
  if (a.featuresLength = c, !Number.isFinite(c))
    throw new Error("i3dm parser: INSTANCES_LENGTH must be defined");
  e.eastNorthUp = a.getGlobalProperty("EAST_NORTH_UP"), e.rtcCenter = a.getGlobalProperty("RTC_CENTER", P.FLOAT, 3);
  const u = new La(e.batchTableJson, e.batchTableBinary, c);
  return Op(e, a, u, c), n;
}
function Op(e, t, n, s) {
  const r = new Array(s), i = new A();
  new A(), new A(), new A();
  const o = new z(), a = new In(), c = new A(), u = {}, l = new V(), h = [], f = [], d = [], m = [];
  for (let g = 0; g < s; g++) {
    let p;
    if (t.hasProperty("POSITION"))
      p = t.getProperty("POSITION", P.FLOAT, 3, g, i);
    else if (t.hasProperty("POSITION_QUANTIZED")) {
      p = t.getProperty("POSITION_QUANTIZED", P.UNSIGNED_SHORT, 3, g, i);
      const T = t.getGlobalProperty("QUANTIZED_VOLUME_OFFSET", P.FLOAT, 3);
      if (!T)
        throw new Error("i3dm parser: QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.");
      const v = t.getGlobalProperty("QUANTIZED_VOLUME_SCALE", P.FLOAT, 3);
      if (!v)
        throw new Error("i3dm parser: QUANTIZED_VOLUME_SCALE must be defined for quantized positions.");
      const F = 65535;
      for (let x = 0; x < 3; x++)
        p[x] = p[x] / F * v[x] + T[x];
    }
    if (!p)
      throw new Error("i3dm: POSITION or POSITION_QUANTIZED must be defined for each instance.");
    if (i.copy(p), u.translation = i, e.normalUp = t.getProperty("NORMAL_UP", P.FLOAT, 3, g, h), e.normalRight = t.getProperty("NORMAL_RIGHT", P.FLOAT, 3, g, f), e.normalUp) {
      if (!e.normalRight)
        throw new Error("i3dm: Custom orientation requires both NORMAL_UP and NORMAL_RIGHT.");
      e.hasCustomOrientation = !0;
    } else {
      if (e.octNormalUp = t.getProperty("NORMAL_UP_OCT32P", P.UNSIGNED_SHORT, 2, g, h), e.octNormalRight = t.getProperty("NORMAL_RIGHT_OCT32P", P.UNSIGNED_SHORT, 2, g, f), e.octNormalUp)
        throw e.octNormalRight ? new Error("i3dm: oct-encoded orientation not implemented") : new Error("i3dm: oct-encoded orientation requires NORMAL_UP_OCT32P and NORMAL_RIGHT_OCT32P");
      e.eastNorthUp ? (J.WGS84.eastNorthUpToFixedFrame(i, l), l.getRotationMatrix3(o)) : o.identity();
    }
    a.fromMatrix3(o), u.rotation = a, c.set(1, 1, 1);
    const C = t.getProperty("SCALE", P.FLOAT, 1, g, d);
    Number.isFinite(C) && c.multiplyByScalar(C);
    const w = t.getProperty("SCALE_NON_UNIFORM", P.FLOAT, 3, g, h);
    w && c.scale(w), u.scale = c;
    let y = t.getProperty("BATCH_ID", P.UNSIGNED_SHORT, 1, g, m);
    y === void 0 && (y = g);
    const B = new V().fromQuaternion(u.rotation);
    l.identity(), l.translate(u.translation), l.multiplyRight(B), l.scale(u.scale);
    const R = l.clone();
    r[g] = {
      modelMatrix: R,
      batchId: y
    };
  }
  e.instances = r;
}
async function Dp(e, t, n, s, r, i) {
  n = Xn(e, t, n);
  const o = new DataView(t);
  for (e.tilesLength = o.getUint32(n, !0), n += 4, e.tiles = []; e.tiles.length < e.tilesLength && (e.byteLength || 0) - n > 12; ) {
    const a = {
      shape: "tile3d"
    };
    e.tiles.push(a), n = await i(t, n, s, r, a);
  }
  return n;
}
async function Lp(e, t, n, s) {
  var r, i;
  if (e.rotateYtoZ = !0, e.gltfUpAxis = n != null && (r = n["3d-tiles"]) !== null && r !== void 0 && r.assetGltfUpAxis ? n["3d-tiles"].assetGltfUpAxis : "Y", n != null && (i = n["3d-tiles"]) !== null && i !== void 0 && i.loadGLTF) {
    if (!s)
      return t.byteLength;
    const o = await je(t, Ln, n, s);
    e.gltf = ic(o), e.gpuMemoryUsageInBytes = ja(e.gltf);
  } else
    e.gltfArrayBuffer = t;
  return t.byteLength;
}
async function cc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
    shape: "tile3d"
  };
  switch (r.byteOffset = t, r.type = sm(e, t), r.type) {
    case be.COMPOSITE:
      return await Dp(r, e, t, n, s, cc);
    case be.BATCHED_3D_MODEL:
      return await Ip(r, e, t, n, s);
    case be.GLTF:
      return await Lp(r, e, n, s);
    case be.INSTANCED_3D_MODEL:
      return await vp(r, e, t, n, s);
    case be.POINT_CLOUD:
      return await Jm(r, e, t, n, s);
    default:
      throw new Error(`3DTileLoader: unknown type ${r.type}`);
  }
}
const Pp = 1952609651, Gp = 1;
async function Np(e, t, n) {
  if (new Uint32Array(e.slice(0, 4))[0] !== Pp)
    throw new Error("Wrong subtree file magic number");
  if (new Uint32Array(e.slice(4, 8))[0] !== Gp)
    throw new Error("Wrong subtree file verson, must be 1");
  const i = fo(e.slice(8, 16)), o = new Uint8Array(e, 24, i), c = new TextDecoder("utf8").decode(o), u = JSON.parse(c), l = fo(e.slice(16, 24));
  let h = new ArrayBuffer(0);
  if (l && (h = e.slice(24 + i)), await gn(u, u.tileAvailability, h, n), Array.isArray(u.contentAvailability))
    for (const f of u.contentAvailability)
      await gn(u, f, h, n);
  else
    await gn(u, u.contentAvailability, h, n);
  return await gn(u, u.childSubtreeAvailability, h, n), u;
}
async function gn(e, t, n, s) {
  const r = Number.isFinite(t.bitstream) ? t.bitstream : t.bufferView;
  if (typeof r != "number")
    return;
  const i = e.bufferViews[r], o = e.buffers[i.buffer];
  if (!(s != null && s.baseUrl))
    throw new Error("Url is not provided");
  if (!s.fetch)
    throw new Error("fetch is not provided");
  if (o.uri) {
    const c = `${(s == null ? void 0 : s.baseUrl) || ""}/${o.uri}`, l = await (await s.fetch(c)).arrayBuffer();
    t.explicitBitstream = new Uint8Array(l, i.byteOffset, i.byteLength);
    return;
  }
  const a = e.buffers.slice(0, i.buffer).reduce((c, u) => c + u.byteLength, 0);
  t.explicitBitstream = new Uint8Array(n.slice(a, a + o.byteLength), i.byteOffset, i.byteLength);
}
function fo(e) {
  const t = new DataView(e), n = t.getUint32(0, !0), s = t.getUint32(4, !0);
  return n + 2 ** 32 * s;
}
const uc = {
  id: "3d-tiles-subtree",
  name: "3D Tiles Subtree",
  module: "3d-tiles",
  version: xa,
  extensions: ["subtree"],
  mimeTypes: ["application/octet-stream"],
  tests: ["subtree"],
  parse: Np,
  options: {}
};
/**
 * @license
 * Copyright 2009 The Closure Library Authors
 * Copyright 2020 Daniel Wirtz / The long.js Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var Ct = null;
try {
  Ct = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    13,
    2,
    96,
    0,
    1,
    127,
    96,
    4,
    127,
    127,
    127,
    127,
    1,
    127,
    3,
    7,
    6,
    0,
    1,
    1,
    1,
    1,
    1,
    6,
    6,
    1,
    127,
    1,
    65,
    0,
    11,
    7,
    50,
    6,
    3,
    109,
    117,
    108,
    0,
    1,
    5,
    100,
    105,
    118,
    95,
    115,
    0,
    2,
    5,
    100,
    105,
    118,
    95,
    117,
    0,
    3,
    5,
    114,
    101,
    109,
    95,
    115,
    0,
    4,
    5,
    114,
    101,
    109,
    95,
    117,
    0,
    5,
    8,
    103,
    101,
    116,
    95,
    104,
    105,
    103,
    104,
    0,
    0,
    10,
    191,
    1,
    6,
    4,
    0,
    35,
    0,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    126,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    127,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    128,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    129,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    130,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11
  ])), {}).exports;
} catch {
}
function H(e, t, n) {
  this.low = e | 0, this.high = t | 0, this.unsigned = !!n;
}
H.prototype.__isLong__;
Object.defineProperty(H.prototype, "__isLong__", { value: !0 });
function it(e) {
  return (e && e.__isLong__) === !0;
}
function mo(e) {
  var t = Math.clz32(e & -e);
  return e ? 31 - t : t;
}
H.isLong = it;
var go = {}, Ao = {};
function re(e, t) {
  var n, s, r;
  return t ? (e >>>= 0, (r = 0 <= e && e < 256) && (s = Ao[e], s) ? s : (n = G(e, 0, !0), r && (Ao[e] = n), n)) : (e |= 0, (r = -128 <= e && e < 128) && (s = go[e], s) ? s : (n = G(e, e < 0 ? -1 : 0, !1), r && (go[e] = n), n));
}
H.fromInt = re;
function Et(e, t) {
  if (isNaN(e))
    return t ? Nt : Mt;
  if (t) {
    if (e < 0)
      return Nt;
    if (e >= lc)
      return dc;
  } else {
    if (e <= -yo)
      return dt;
    if (e + 1 >= yo)
      return fc;
  }
  return e < 0 ? Et(-e, t).neg() : G(e % pe | 0, e / pe | 0, t);
}
H.fromNumber = Et;
function G(e, t, n) {
  return new H(e, t, n);
}
H.fromBits = G;
var Pn = Math.pow;
function Dr(e, t, n) {
  if (e.length === 0)
    throw Error("empty string");
  if (typeof t == "number" ? (n = t, t = !1) : t = !!t, e === "NaN" || e === "Infinity" || e === "+Infinity" || e === "-Infinity")
    return t ? Nt : Mt;
  if (n = n || 10, n < 2 || 36 < n)
    throw RangeError("radix");
  var s;
  if ((s = e.indexOf("-")) > 0)
    throw Error("interior hyphen");
  if (s === 0)
    return Dr(e.substring(1), t, n).neg();
  for (var r = Et(Pn(n, 8)), i = Mt, o = 0; o < e.length; o += 8) {
    var a = Math.min(8, e.length - o), c = parseInt(e.substring(o, o + a), n);
    if (a < 8) {
      var u = Et(Pn(n, a));
      i = i.mul(u).add(Et(c));
    } else
      i = i.mul(r), i = i.add(Et(c));
  }
  return i.unsigned = t, i;
}
H.fromString = Dr;
function It(e, t) {
  return typeof e == "number" ? Et(e, t) : typeof e == "string" ? Dr(e, t) : G(e.low, e.high, typeof t == "boolean" ? t : e.unsigned);
}
H.fromValue = It;
var po = 65536, Up = 1 << 24, pe = po * po, lc = pe * pe, yo = lc / 2, Bo = re(Up), Mt = re(0);
H.ZERO = Mt;
var Nt = re(0, !0);
H.UZERO = Nt;
var de = re(1);
H.ONE = de;
var hc = re(1, !0);
H.UONE = hc;
var tr = re(-1);
H.NEG_ONE = tr;
var fc = G(-1, 2147483647, !1);
H.MAX_VALUE = fc;
var dc = G(-1, -1, !0);
H.MAX_UNSIGNED_VALUE = dc;
var dt = G(0, -2147483648, !1);
H.MIN_VALUE = dt;
var b = H.prototype;
b.toInt = function() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
b.toNumber = function() {
  return this.unsigned ? (this.high >>> 0) * pe + (this.low >>> 0) : this.high * pe + (this.low >>> 0);
};
b.toString = function(t) {
  if (t = t || 10, t < 2 || 36 < t)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative())
    if (this.eq(dt)) {
      var n = Et(t), s = this.div(n), r = s.mul(n).sub(this);
      return s.toString(t) + r.toInt().toString(t);
    } else
      return "-" + this.neg().toString(t);
  for (var i = Et(Pn(t, 6), this.unsigned), o = this, a = ""; ; ) {
    var c = o.div(i), u = o.sub(c.mul(i)).toInt() >>> 0, l = u.toString(t);
    if (o = c, o.isZero())
      return l + a;
    for (; l.length < 6; )
      l = "0" + l;
    a = "" + l + a;
  }
};
b.getHighBits = function() {
  return this.high;
};
b.getHighBitsUnsigned = function() {
  return this.high >>> 0;
};
b.getLowBits = function() {
  return this.low;
};
b.getLowBitsUnsigned = function() {
  return this.low >>> 0;
};
b.getNumBitsAbs = function() {
  if (this.isNegative())
    return this.eq(dt) ? 64 : this.neg().getNumBitsAbs();
  for (var t = this.high != 0 ? this.high : this.low, n = 31; n > 0 && !(t & 1 << n); n--)
    ;
  return this.high != 0 ? n + 33 : n + 1;
};
b.isZero = function() {
  return this.high === 0 && this.low === 0;
};
b.eqz = b.isZero;
b.isNegative = function() {
  return !this.unsigned && this.high < 0;
};
b.isPositive = function() {
  return this.unsigned || this.high >= 0;
};
b.isOdd = function() {
  return (this.low & 1) === 1;
};
b.isEven = function() {
  return (this.low & 1) === 0;
};
b.equals = function(t) {
  return it(t) || (t = It(t)), this.unsigned !== t.unsigned && this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low;
};
b.eq = b.equals;
b.notEquals = function(t) {
  return !this.eq(
    /* validates */
    t
  );
};
b.neq = b.notEquals;
b.ne = b.notEquals;
b.lessThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) < 0;
};
b.lt = b.lessThan;
b.lessThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) <= 0;
};
b.lte = b.lessThanOrEqual;
b.le = b.lessThanOrEqual;
b.greaterThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) > 0;
};
b.gt = b.greaterThan;
b.greaterThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) >= 0;
};
b.gte = b.greaterThanOrEqual;
b.ge = b.greaterThanOrEqual;
b.compare = function(t) {
  if (it(t) || (t = It(t)), this.eq(t))
    return 0;
  var n = this.isNegative(), s = t.isNegative();
  return n && !s ? -1 : !n && s ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1;
};
b.comp = b.compare;
b.negate = function() {
  return !this.unsigned && this.eq(dt) ? dt : this.not().add(de);
};
b.neg = b.negate;
b.add = function(t) {
  it(t) || (t = It(t));
  var n = this.high >>> 16, s = this.high & 65535, r = this.low >>> 16, i = this.low & 65535, o = t.high >>> 16, a = t.high & 65535, c = t.low >>> 16, u = t.low & 65535, l = 0, h = 0, f = 0, d = 0;
  return d += i + u, f += d >>> 16, d &= 65535, f += r + c, h += f >>> 16, f &= 65535, h += s + a, l += h >>> 16, h &= 65535, l += n + o, l &= 65535, G(f << 16 | d, l << 16 | h, this.unsigned);
};
b.subtract = function(t) {
  return it(t) || (t = It(t)), this.add(t.neg());
};
b.sub = b.subtract;
b.multiply = function(t) {
  if (this.isZero())
    return this;
  if (it(t) || (t = It(t)), Ct) {
    var n = Ct.mul(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return G(n, Ct.get_high(), this.unsigned);
  }
  if (t.isZero())
    return this.unsigned ? Nt : Mt;
  if (this.eq(dt))
    return t.isOdd() ? dt : Mt;
  if (t.eq(dt))
    return this.isOdd() ? dt : Mt;
  if (this.isNegative())
    return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
  if (t.isNegative())
    return this.mul(t.neg()).neg();
  if (this.lt(Bo) && t.lt(Bo))
    return Et(this.toNumber() * t.toNumber(), this.unsigned);
  var s = this.high >>> 16, r = this.high & 65535, i = this.low >>> 16, o = this.low & 65535, a = t.high >>> 16, c = t.high & 65535, u = t.low >>> 16, l = t.low & 65535, h = 0, f = 0, d = 0, m = 0;
  return m += o * l, d += m >>> 16, m &= 65535, d += i * l, f += d >>> 16, d &= 65535, d += o * u, f += d >>> 16, d &= 65535, f += r * l, h += f >>> 16, f &= 65535, f += i * u, h += f >>> 16, f &= 65535, f += o * c, h += f >>> 16, f &= 65535, h += s * l + r * u + i * c + o * a, h &= 65535, G(d << 16 | m, h << 16 | f, this.unsigned);
};
b.mul = b.multiply;
b.divide = function(t) {
  if (it(t) || (t = It(t)), t.isZero())
    throw Error("division by zero");
  if (Ct) {
    if (!this.unsigned && this.high === -2147483648 && t.low === -1 && t.high === -1)
      return this;
    var n = (this.unsigned ? Ct.div_u : Ct.div_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return G(n, Ct.get_high(), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? Nt : Mt;
  var s, r, i;
  if (this.unsigned) {
    if (t.unsigned || (t = t.toUnsigned()), t.gt(this))
      return Nt;
    if (t.gt(this.shru(1)))
      return hc;
    i = Nt;
  } else {
    if (this.eq(dt)) {
      if (t.eq(de) || t.eq(tr))
        return dt;
      if (t.eq(dt))
        return de;
      var o = this.shr(1);
      return s = o.div(t).shl(1), s.eq(Mt) ? t.isNegative() ? de : tr : (r = this.sub(t.mul(s)), i = s.add(r.div(t)), i);
    } else if (t.eq(dt))
      return this.unsigned ? Nt : Mt;
    if (this.isNegative())
      return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
    if (t.isNegative())
      return this.div(t.neg()).neg();
    i = Mt;
  }
  for (r = this; r.gte(t); ) {
    s = Math.max(1, Math.floor(r.toNumber() / t.toNumber()));
    for (var a = Math.ceil(Math.log(s) / Math.LN2), c = a <= 48 ? 1 : Pn(2, a - 48), u = Et(s), l = u.mul(t); l.isNegative() || l.gt(r); )
      s -= c, u = Et(s, this.unsigned), l = u.mul(t);
    u.isZero() && (u = de), i = i.add(u), r = r.sub(l);
  }
  return i;
};
b.div = b.divide;
b.modulo = function(t) {
  if (it(t) || (t = It(t)), Ct) {
    var n = (this.unsigned ? Ct.rem_u : Ct.rem_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return G(n, Ct.get_high(), this.unsigned);
  }
  return this.sub(this.div(t).mul(t));
};
b.mod = b.modulo;
b.rem = b.modulo;
b.not = function() {
  return G(~this.low, ~this.high, this.unsigned);
};
b.countLeadingZeros = function() {
  return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
};
b.clz = b.countLeadingZeros;
b.countTrailingZeros = function() {
  return this.low ? mo(this.low) : mo(this.high) + 32;
};
b.ctz = b.countTrailingZeros;
b.and = function(t) {
  return it(t) || (t = It(t)), G(this.low & t.low, this.high & t.high, this.unsigned);
};
b.or = function(t) {
  return it(t) || (t = It(t)), G(this.low | t.low, this.high | t.high, this.unsigned);
};
b.xor = function(t) {
  return it(t) || (t = It(t)), G(this.low ^ t.low, this.high ^ t.high, this.unsigned);
};
b.shiftLeft = function(t) {
  return it(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? G(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : G(0, this.low << t - 32, this.unsigned);
};
b.shl = b.shiftLeft;
b.shiftRight = function(t) {
  return it(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? G(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : G(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
b.shr = b.shiftRight;
b.shiftRightUnsigned = function(t) {
  return it(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? G(this.low >>> t | this.high << 32 - t, this.high >>> t, this.unsigned) : t === 32 ? G(this.high, 0, this.unsigned) : G(this.high >>> t - 32, 0, this.unsigned);
};
b.shru = b.shiftRightUnsigned;
b.shr_u = b.shiftRightUnsigned;
b.rotateLeft = function(t) {
  var n;
  return it(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t === 32 ? G(this.high, this.low, this.unsigned) : t < 32 ? (n = 32 - t, G(this.low << t | this.high >>> n, this.high << t | this.low >>> n, this.unsigned)) : (t -= 32, n = 32 - t, G(this.high << t | this.low >>> n, this.low << t | this.high >>> n, this.unsigned));
};
b.rotl = b.rotateLeft;
b.rotateRight = function(t) {
  var n;
  return it(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t === 32 ? G(this.high, this.low, this.unsigned) : t < 32 ? (n = 32 - t, G(this.high << n | this.low >>> t, this.low << n | this.high >>> t, this.unsigned)) : (t -= 32, n = 32 - t, G(this.low << n | this.high >>> t, this.high << n | this.low >>> t, this.unsigned));
};
b.rotr = b.rotateRight;
b.toSigned = function() {
  return this.unsigned ? G(this.low, this.high, !1) : this;
};
b.toUnsigned = function() {
  return this.unsigned ? this : G(this.low, this.high, !0);
};
b.toBytes = function(t) {
  return t ? this.toBytesLE() : this.toBytesBE();
};
b.toBytesLE = function() {
  var t = this.high, n = this.low;
  return [
    n & 255,
    n >>> 8 & 255,
    n >>> 16 & 255,
    n >>> 24,
    t & 255,
    t >>> 8 & 255,
    t >>> 16 & 255,
    t >>> 24
  ];
};
b.toBytesBE = function() {
  var t = this.high, n = this.low;
  return [
    t >>> 24,
    t >>> 16 & 255,
    t >>> 8 & 255,
    t & 255,
    n >>> 24,
    n >>> 16 & 255,
    n >>> 8 & 255,
    n & 255
  ];
};
H.fromBytes = function(t, n, s) {
  return s ? H.fromBytesLE(t, n) : H.fromBytesBE(t, n);
};
H.fromBytesLE = function(t, n) {
  return new H(
    t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24,
    t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24,
    n
  );
};
H.fromBytesBE = function(t, n) {
  return new H(
    t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7],
    t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3],
    n
  );
};
const Hp = 16;
function mc(e) {
  e === "X" && (e = "");
  const t = e.padEnd(Hp, "0");
  return H.fromString(t, !0, 16);
}
function Jp(e) {
  if (e.isZero())
    return "X";
  let t = e.countTrailingZeros();
  const n = t % 4;
  t = (t - n) / 4;
  const s = t;
  t *= 4;
  const i = e.shiftRightUnsigned(t).toString(16).replace(/0+$/, "");
  return Array(17 - s - i.length).join("0") + i;
}
function Vp(e, t) {
  const n = jp(e).shiftRightUnsigned(2);
  return e.add(H.fromNumber(2 * t + 1 - 4).multiply(n));
}
function jp(e) {
  return e.and(e.not().add(1));
}
const kp = 3, Kp = 30, zp = 2 * Kp + 1, Co = 180 / Math.PI;
function Wp(e) {
  if (e.length === 0)
    throw new Error(`Invalid Hilbert quad key ${e}`);
  const t = e.split("/"), n = parseInt(t[0], 10), s = t[1], r = s.length;
  let i = 0;
  const o = [0, 0];
  for (let a = r - 1; a >= 0; a--) {
    i = r - a;
    const c = s[a];
    let u = 0, l = 0;
    c === "1" ? l = 1 : c === "2" ? (u = 1, l = 1) : c === "3" && (u = 1);
    const h = Math.pow(2, i - 1);
    Qp(h, o, u, l), o[0] += h * u, o[1] += h * l;
  }
  if (n % 2 === 1) {
    const a = o[0];
    o[0] = o[1], o[1] = a;
  }
  return {
    face: n,
    ij: o,
    level: i
  };
}
function Xp(e) {
  if (e.isZero())
    return "";
  let t = e.toString(2);
  for (; t.length < kp + zp; )
    t = "0" + t;
  const n = t.lastIndexOf("1"), s = t.substring(0, 3), r = t.substring(3, n), i = r.length / 2, o = H.fromString(s, !0, 2).toString(10);
  let a = "";
  if (i !== 0)
    for (a = H.fromString(r, !0, 2).toString(4); a.length < i; )
      a = "0" + a;
  return `${o}/${a}`;
}
function gc(e, t, n) {
  const s = 1 << t;
  return [(e[0] + n[0]) / s, (e[1] + n[1]) / s];
}
function Eo(e) {
  return e >= 0.5 ? 1 / 3 * (4 * e * e - 1) : 1 / 3 * (1 - 4 * (1 - e) * (1 - e));
}
function Ac(e) {
  return [Eo(e[0]), Eo(e[1])];
}
function pc(e, t) {
  let [n, s] = t;
  switch (e) {
    case 0:
      return [1, n, s];
    case 1:
      return [-n, 1, s];
    case 2:
      return [-n, -s, 1];
    case 3:
      return [-1, -s, -n];
    case 4:
      return [s, -1, -n];
    case 5:
      return [s, n, -1];
    default:
      throw new Error("Invalid face");
  }
}
function yc(e) {
  let [t, n, s] = e;
  const r = Math.atan2(s, Math.sqrt(t * t + n * n));
  return [Math.atan2(n, t) * Co, r * Co];
}
function Qp(e, t, n, s) {
  if (s === 0) {
    n === 1 && (t[0] = e - 1 - t[0], t[1] = e - 1 - t[1]);
    const r = t[0];
    t[0] = t[1], t[1] = r;
  }
}
function qp(e) {
  const t = gc(e.ij, e.level, [0.5, 0.5]), n = Ac(t), s = pc(e.face, n);
  return yc(s);
}
const Yp = 100;
function To(e) {
  const {
    face: t,
    ij: n,
    level: s
  } = e, r = [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]], i = Math.max(1, Math.ceil(Yp * Math.pow(2, -s))), o = new Float64Array(4 * i * 2 + 2);
  let a = 0, c = 0;
  for (let u = 0; u < 4; u++) {
    const l = r[u].slice(0), h = r[u + 1], f = (h[0] - l[0]) / i, d = (h[1] - l[1]) / i;
    for (let m = 0; m < i; m++) {
      l[0] += f, l[1] += d;
      const g = gc(n, s, l), p = Ac(g), C = pc(t, p), w = yc(C);
      Math.abs(w[1]) > 89.999 && (w[0] = c);
      const y = w[0] - c;
      w[0] += y > 180 ? -360 : y < -180 ? 360 : 0, o[a++] = w[0], o[a++] = w[1], c = w[0];
    }
  }
  return o[a++] = o[0], o[a++] = o[1], o;
}
function Lr(e) {
  const t = $p(e);
  return Wp(t);
}
function $p(e) {
  if (e.indexOf("/") > 0)
    return e;
  const t = mc(e);
  return Xp(t);
}
function Zp(e) {
  const t = Lr(e);
  return qp(t);
}
function ty(e) {
  let t;
  if (e.face === 2 || e.face === 5) {
    let n = null, s = 0;
    for (let r = 0; r < 4; r++) {
      const i = `${e.face}/${r}`, o = Lr(i), a = To(o);
      (typeof n > "u" || n === null) && (n = new Float64Array(4 * a.length)), n.set(a, s), s += a.length;
    }
    t = bo(n);
  } else {
    const n = To(e);
    t = bo(n);
  }
  return t;
}
function bo(e) {
  if (e.length % 2 !== 0)
    throw new Error("Invalid corners");
  const t = [], n = [];
  for (let s = 0; s < e.length; s += 2)
    t.push(e[s]), n.push(e[s + 1]);
  return t.sort((s, r) => s - r), n.sort((s, r) => s - r), {
    west: t[0],
    east: t[t.length - 1],
    north: n[n.length - 1],
    south: n[0]
  };
}
function ey(e, t) {
  const n = (t == null ? void 0 : t.minimumHeight) || 0, s = (t == null ? void 0 : t.maximumHeight) || 0, r = Lr(e), i = ty(r), o = i.west, a = i.south, c = i.east, u = i.north, l = [];
  return l.push(new A(o, u, n)), l.push(new A(c, u, n)), l.push(new A(c, a, n)), l.push(new A(o, a, n)), l.push(new A(o, u, s)), l.push(new A(c, u, s)), l.push(new A(c, a, s)), l.push(new A(o, a, s)), l;
}
function Bc(e) {
  const t = e.token, n = {
    minimumHeight: e.minimumHeight,
    maximumHeight: e.maximumHeight
  }, s = ey(t, n), r = Zp(t), i = r[0], o = r[1], a = J.WGS84.cartographicToCartesian([i, o, n.maximumHeight]), c = new A(a[0], a[1], a[2]);
  s.push(c);
  const u = Rd(s);
  return [...u.center, ...u.halfAxes];
}
const ny = 4, sy = 8, ry = {
  QUADTREE: ny,
  OCTREE: sy
};
function iy(e, t, n) {
  if (e != null && e.box) {
    const s = mc(e.s2VolumeInfo.token), r = Vp(s, t), i = Jp(r), o = {
      ...e.s2VolumeInfo
    };
    switch (o.token = i, n) {
      case "OCTREE":
        const u = e.s2VolumeInfo, l = u.maximumHeight - u.minimumHeight, h = l / 2, f = u.minimumHeight + l / 2;
        u.minimumHeight = f - h, u.maximumHeight = f + h;
        break;
    }
    return {
      box: Bc(o),
      s2VolumeInfo: o
    };
  }
}
async function Cc(e) {
  const {
    implicitOptions: t,
    parentData: n = {
      mortonIndex: 0,
      x: 0,
      y: 0,
      z: 0
    },
    childIndex: s = 0,
    s2VolumeBox: r,
    loaderOptions: i
  } = e;
  let {
    subtree: o,
    level: a = 0,
    globalData: c = {
      level: 0,
      mortonIndex: 0,
      x: 0,
      y: 0,
      z: 0
    }
  } = e;
  const {
    subdivisionScheme: u,
    subtreeLevels: l,
    maximumLevel: h,
    contentUrlTemplate: f,
    subtreesUriTemplate: d,
    basePath: m
  } = t, g = {
    children: [],
    lodMetricValue: 0,
    contentUrl: ""
  };
  if (!h)
    return ta.once(`Missing 'maximumLevel' or 'availableLevels' property. The subtree ${f} won't be loaded...`), g;
  const p = a + c.level;
  if (p > h)
    return g;
  const C = ry[u], w = Math.log2(C), y = s & 1, B = s >> 1 & 1, R = s >> 2 & 1, T = (C ** a - 1) / (C - 1);
  let v = Qt(n.mortonIndex, s, w), F = T + v, x = Qt(n.x, y, 1), D = Qt(n.y, B, 1), k = Qt(n.z, R, 1), W = !1;
  a >= l && (W = Os(o.childSubtreeAvailability, v));
  const X = Qt(c.x, x, a), L = Qt(c.y, D, a), ot = Qt(c.z, k, a);
  if (W) {
    const tt = `${m}/${d}`, Lt = er(tt, p, X, L, ot);
    o = await ge(Lt, uc, i), c = {
      mortonIndex: v,
      x,
      y: D,
      z: k,
      level: a
    }, v = 0, F = 0, x = 0, D = 0, k = 0, a = 0;
  }
  if (!Os(o.tileAvailability, F))
    return g;
  Os(o.contentAvailability, F) && (g.contentUrl = er(f, p, X, L, ot));
  const ye = a + 1, Dt = {
    mortonIndex: v,
    x,
    y: D,
    z: k
  };
  for (let tt = 0; tt < C; tt++) {
    const Lt = iy(r, tt, u), Wt = await Cc({
      subtree: o,
      implicitOptions: t,
      loaderOptions: i,
      parentData: Dt,
      childIndex: tt,
      level: ye,
      globalData: {
        ...c
      },
      s2VolumeBox: Lt
    });
    if (Wt.contentUrl || Wt.children.length) {
      const Be = p + 1, $n = oy(Wt, Be, {
        childTileX: x,
        childTileY: D,
        childTileZ: k
      }, t, r);
      g.children.push($n);
    }
  }
  return g;
}
function Os(e, t) {
  let n;
  return Array.isArray(e) ? (n = e[0], e.length > 1 && ta.once('Not supported extension "3DTILES_multiple_contents" has been detected')) : n = e, "constant" in n ? !!n.constant : n.explicitBitstream ? uy(t, n.explicitBitstream) : !1;
}
function oy(e, t, n, s, r) {
  const {
    basePath: i,
    refine: o,
    getRefine: a,
    lodMetricType: c,
    getTileType: u,
    rootLodMetricValue: l,
    rootBoundingVolume: h
  } = s, f = e.contentUrl && e.contentUrl.replace(`${i}/`, ""), d = l / 2 ** t, m = r != null && r.box ? {
    box: r.box
  } : h, g = ay(t, m, n);
  return {
    children: e.children,
    contentUrl: e.contentUrl,
    content: {
      uri: f
    },
    id: e.contentUrl,
    refine: a(o),
    type: u(e),
    lodMetricType: c,
    lodMetricValue: d,
    geometricError: d,
    transform: e.transform,
    boundingVolume: g
  };
}
function ay(e, t, n) {
  if (t.region) {
    const {
      childTileX: s,
      childTileY: r,
      childTileZ: i
    } = n, [o, a, c, u, l, h] = t.region, f = 2 ** e, d = (c - o) / f, m = (u - a) / f, g = (h - l) / f, [p, C] = [o + d * s, o + d * (s + 1)], [w, y] = [a + m * r, a + m * (r + 1)], [B, R] = [l + g * i, l + g * (i + 1)];
    return {
      region: [p, w, C, y, B, R]
    };
  }
  if (t.box)
    return t;
  throw new Error(`Unsupported bounding volume type ${t}`);
}
function Qt(e, t, n) {
  return (e << n) + t;
}
function er(e, t, n, s, r) {
  const i = cy({
    level: t,
    x: n,
    y: s,
    z: r
  });
  return e.replace(/{level}|{x}|{y}|{z}/gi, (o) => i[o]);
}
function cy(e) {
  const t = {};
  for (const n in e)
    t[`{${n}}`] = e[n];
  return t;
}
function uy(e, t) {
  const n = Math.floor(e / 8), s = e % 8;
  return (t[n] >> s & 1) === 1;
}
function Pr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  if (!t)
    return qt.EMPTY;
  const s = t.split("?")[0].split(".").pop();
  switch (s) {
    case "pnts":
      return qt.POINTCLOUD;
    case "i3dm":
    case "b3dm":
    case "glb":
    case "gltf":
      return qt.SCENEGRAPH;
    default:
      return s || qt.EMPTY;
  }
}
function Gr(e) {
  switch (e) {
    case "REPLACE":
    case "replace":
      return Ut.REPLACE;
    case "ADD":
    case "add":
      return Ut.ADD;
    default:
      return e;
  }
}
function nr(e, t) {
  if (/^[a-z][0-9a-z+.-]*:/i.test(t)) {
    const s = new URL(e, `${t}/`);
    return decodeURI(s.toString());
  } else if (e.startsWith("/"))
    return e;
  return Hu(t, e);
}
function _o(e, t) {
  if (!e)
    return null;
  let n;
  if (e.content) {
    var s;
    const i = e.content.uri || ((s = e.content) === null || s === void 0 ? void 0 : s.url);
    typeof i < "u" && (n = nr(i, t));
  }
  return {
    ...e,
    id: n,
    contentUrl: n,
    lodMetricType: zn.GEOMETRIC_ERROR,
    lodMetricValue: e.geometricError,
    transformMatrix: e.transform,
    type: Pr(e, n),
    refine: Gr(e.refine)
  };
}
async function ly(e, t, n) {
  let s = null;
  const r = Ro(e.root);
  r && e.root ? s = await wo(e.root, e, t, r, n) : s = _o(e.root, t);
  const i = [];
  for (i.push(s); i.length > 0; ) {
    const o = i.pop() || {}, a = o.children || [], c = [];
    for (const u of a) {
      const l = Ro(u);
      let h;
      l ? h = await wo(u, e, t, l, n) : h = _o(u, t), h && (c.push(h), i.push(h));
    }
    o.children = c;
  }
  return s;
}
async function wo(e, t, n, s, r) {
  var i, o, a;
  const {
    subdivisionScheme: c,
    maximumLevel: u,
    availableLevels: l,
    subtreeLevels: h,
    subtrees: {
      uri: f
    }
  } = s, d = er(f, 0, 0, 0, 0), m = nr(d, n), g = await ge(m, uc, r), p = (i = e.content) === null || i === void 0 ? void 0 : i.uri, C = p ? nr(p, n) : "", w = t == null || (o = t.root) === null || o === void 0 ? void 0 : o.refine, y = e.geometricError, B = (a = e.boundingVolume.extensions) === null || a === void 0 ? void 0 : a["3DTILES_bounding_volume_S2"];
  if (B) {
    const F = {
      box: Bc(B),
      s2VolumeInfo: B
    };
    e.boundingVolume = F;
  }
  const R = e.boundingVolume, T = {
    contentUrlTemplate: C,
    subtreesUriTemplate: f,
    subdivisionScheme: c,
    subtreeLevels: h,
    maximumLevel: Number.isFinite(l) ? l - 1 : u,
    refine: w,
    basePath: n,
    lodMetricType: zn.GEOMETRIC_ERROR,
    rootLodMetricValue: y,
    rootBoundingVolume: R,
    getTileType: Pr,
    getRefine: Gr
  };
  return await hy(e, n, g, T, r);
}
async function hy(e, t, n, s, r) {
  if (!e)
    return null;
  const {
    children: i,
    contentUrl: o
  } = await Cc({
    subtree: n,
    implicitOptions: s,
    loaderOptions: r
  });
  let a, c = null;
  return o && (a = o, c = {
    uri: o.replace(`${t}/`, "")
  }), {
    ...e,
    id: a,
    contentUrl: a,
    lodMetricType: zn.GEOMETRIC_ERROR,
    lodMetricValue: e.geometricError,
    transformMatrix: e.transform,
    type: Pr(e, a),
    refine: Gr(e.refine),
    content: c || e.content,
    children: i
  };
}
function Ro(e) {
  var t;
  return (e == null || (t = e.extensions) === null || t === void 0 ? void 0 : t["3DTILES_implicit_tiling"]) || (e == null ? void 0 : e.implicitTiling);
}
const De = {
  id: "3d-tiles",
  name: "3D Tiles",
  module: "3d-tiles",
  version: xa,
  extensions: ["cmpt", "pnts", "b3dm", "i3dm"],
  mimeTypes: ["application/octet-stream"],
  tests: ["cmpt", "pnts", "b3dm", "i3dm"],
  parse: fy,
  options: {
    "3d-tiles": {
      loadGLTF: !0,
      decodeQuantizedPositions: !1,
      isTileset: "auto",
      assetGltfUpAxis: null
    }
  }
};
async function fy(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = t["3d-tiles"] || {};
  let r;
  return s.isTileset === "auto" ? r = (n == null ? void 0 : n.url) && n.url.indexOf(".json") !== -1 : r = s.isTileset, r ? dy(e, t, n) : my(e, t, n);
}
async function dy(e, t, n) {
  var s;
  const r = JSON.parse(new TextDecoder().decode(e)), i = (n == null ? void 0 : n.url) || "", o = gy(i), a = await ly(r, o, t || {});
  return {
    ...r,
    shape: "tileset3d",
    loader: De,
    url: i,
    queryString: (n == null ? void 0 : n.queryString) || "",
    basePath: o,
    root: a || r.root,
    type: pt.TILES3D,
    lodMetricType: zn.GEOMETRIC_ERROR,
    lodMetricValue: ((s = r.root) === null || s === void 0 ? void 0 : s.geometricError) || 0
  };
}
async function my(e, t, n) {
  const s = {
    content: {
      shape: "tile3d",
      featureIds: null
    }
  };
  return await cc(e, 0, t, n, s.content), s.content;
}
function gy(e) {
  return hr(e);
}
const Ec = "https://api.cesium.com/v1/assets";
async function Ay(e, t) {
  if (!t) {
    const i = await py(e);
    for (const o of i.items)
      o.type === "3DTILES" && (t = o.id);
  }
  const n = await yy(e, t), {
    type: s,
    url: r
  } = n;
  return U(s === "3DTILES" && r), n.headers = {
    Authorization: `Bearer ${n.accessToken}`
  }, n;
}
async function py(e) {
  U(e);
  const t = Ec, n = {
    Authorization: `Bearer ${e}`
  }, s = await Le(t, {
    headers: n
  });
  if (!s.ok)
    throw new Error(s.statusText);
  return await s.json();
}
async function yy(e, t) {
  U(e, t);
  const n = {
    Authorization: `Bearer ${e}`
  }, s = `${Ec}/${t}`;
  let r = await Le(`${s}`, {
    headers: n
  });
  if (!r.ok)
    throw new Error(r.statusText);
  let i = await r.json();
  if (r = await Le(`${s}/endpoint`, {
    headers: n
  }), !r.ok)
    throw new Error(r.statusText);
  const o = await r.json();
  return i = {
    ...i,
    ...o
  }, i;
}
async function By(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  t = t["cesium-ion"] || {};
  const {
    accessToken: n
  } = t;
  let s = t.assetId;
  if (!Number.isFinite(s)) {
    const r = e.match(/\/([0-9]+)\/tileset.json/);
    s = r && r[1];
  }
  return Ay(n, s);
}
const Tc = {
  ...De,
  id: "cesium-ion",
  name: "Cesium Ion",
  preload: By,
  parse: async (e, t, n) => (t = {
    ...t
  }, t["3d-tiles"] = t["cesium-ion"], t.loader = Tc, De.parse(e, t, n)),
  options: {
    "cesium-ion": {
      ...De.options["3d-tiles"],
      accessToken: null
    }
  }
}, Mo = 100;
class Cy {
  constructor(t, n) {
    if (this.schema = void 0, this.options = void 0, this.shape = void 0, this.length = 0, this.rows = null, this.cursor = 0, this._headers = [], this.options = n, this.schema = t, !Array.isArray(t)) {
      this._headers = [];
      for (const s in t)
        this._headers[t[s].index] = t[s].name;
    }
  }
  rowCount() {
    return this.length;
  }
  addArrayRow(t, n) {
    Number.isFinite(n) && (this.cursor = n), this.shape = "array-row-table", this.rows = this.rows || new Array(Mo), this.rows[this.length] = t, this.length++;
  }
  addObjectRow(t, n) {
    Number.isFinite(n) && (this.cursor = n), this.shape = "object-row-table", this.rows = this.rows || new Array(Mo), this.rows[this.length] = t, this.length++;
  }
  getBatch() {
    let t = this.rows;
    return t ? (t = t.slice(0, this.length), this.rows = null, {
      shape: this.shape || "array-row-table",
      batchType: "data",
      data: t,
      length: this.length,
      schema: this.schema,
      cursor: this.cursor
    }) : null;
  }
}
function Ey(e, t) {
  if (!e)
    throw new Error("null row");
  const n = {};
  if (t)
    for (let s = 0; s < t.length; s++)
      n[t[s]] = e[s];
  else
    for (let s = 0; s < e.length; s++) {
      const r = `column-${s}`;
      n[r] = e[s];
    }
  return n;
}
function Ty(e, t) {
  if (!e)
    throw new Error("null row");
  if (t) {
    const n = new Array(t.length);
    for (let s = 0; s < t.length; s++)
      n[s] = e[t[s]];
    return n;
  }
  return Object.values(e);
}
function by(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) {
    const s = `column-${n}`;
    t.push(s);
  }
  return t;
}
function _y(e) {
  return Object.keys(e);
}
const So = 100;
class wy {
  constructor(t, n) {
    if (this.schema = void 0, this.options = void 0, this.length = 0, this.objectRows = null, this.arrayRows = null, this.cursor = 0, this._headers = null, this.options = n, this.schema = t, t) {
      this._headers = [];
      for (const s in t)
        this._headers[t[s].index] = t[s].name;
    }
  }
  rowCount() {
    return this.length;
  }
  addArrayRow(t, n) {
    switch (Number.isFinite(n) && (this.cursor = n), this._headers || (this._headers = by(t)), this.options.shape) {
      case "object-row-table":
        const s = Ey(t, this._headers);
        this.addObjectRow(s, n);
        break;
      case "array-row-table":
        this.arrayRows = this.arrayRows || new Array(So), this.arrayRows[this.length] = t, this.length++;
        break;
    }
  }
  addObjectRow(t, n) {
    switch (Number.isFinite(n) && (this.cursor = n), this._headers || (this._headers = _y(t)), this.options.shape) {
      case "array-row-table":
        const s = Ty(t, this._headers);
        this.addArrayRow(s, n);
        break;
      case "object-row-table":
        this.objectRows = this.objectRows || new Array(So), this.objectRows[this.length] = t, this.length++;
        break;
    }
  }
  getBatch() {
    let t = this.arrayRows || this.objectRows;
    return t ? (t = t.slice(0, this.length), this.arrayRows = null, this.objectRows = null, {
      shape: this.options.shape,
      batchType: "data",
      data: t,
      length: this.length,
      schema: this.schema,
      cursor: this.cursor
    }) : null;
  }
}
const Ry = 100;
class My {
  constructor(t, n) {
    this.schema = void 0, this.length = 0, this.allocated = 0, this.columns = {}, this.schema = t, this._reallocateColumns();
  }
  rowCount() {
    return this.length;
  }
  addArrayRow(t) {
    this._reallocateColumns();
    let n = 0;
    for (const s in this.columns)
      this.columns[s][this.length] = t[n++];
    this.length++;
  }
  addObjectRow(t) {
    this._reallocateColumns();
    for (const n in t)
      this.columns[n][this.length] = t[n];
    this.length++;
  }
  getBatch() {
    this._pruneColumns();
    const t = Array.isArray(this.schema) ? this.columns : {};
    if (!Array.isArray(this.schema))
      for (const s in this.schema) {
        const r = this.schema[s];
        t[r.name] = this.columns[r.index];
      }
    return this.columns = {}, {
      shape: "columnar-table",
      batchType: "data",
      data: t,
      schema: this.schema,
      length: this.length
    };
  }
  _reallocateColumns() {
    if (!(this.length < this.allocated)) {
      this.allocated = this.allocated > 0 ? this.allocated *= 2 : Ry, this.columns = {};
      for (const t in this.schema) {
        const n = this.schema[t], s = n.type || Float32Array, r = this.columns[n.index];
        if (r && ArrayBuffer.isView(r)) {
          const i = new s(this.allocated);
          i.set(r), this.columns[n.index] = i;
        } else
          r ? (r.length = this.allocated, this.columns[n.index] = r) : this.columns[n.index] = new s(this.allocated);
      }
    }
  }
  _pruneColumns() {
    for (const [t, n] of Object.entries(this.columns))
      this.columns[t] = n.slice(0, this.length);
  }
}
const Sy = {
  shape: void 0,
  batchSize: "auto",
  batchDebounceMs: 0,
  limit: 0,
  _limitMB: 0
}, Iy = "TableBatchBuilder";
class Ne {
  constructor(t, n) {
    this.schema = void 0, this.options = void 0, this.aggregator = null, this.batchCount = 0, this.bytesUsed = 0, this.isChunkComplete = !1, this.lastBatchEmittedMs = Date.now(), this.totalLength = 0, this.totalBytes = 0, this.rowBytes = 0, this.schema = t, this.options = {
      ...Sy,
      ...n
    };
  }
  limitReached() {
    var t, n;
    return !!(!((t = this.options) === null || t === void 0) && t.limit && this.totalLength >= this.options.limit || !((n = this.options) === null || n === void 0) && n._limitMB && this.totalBytes / 1e6 >= this.options._limitMB);
  }
  addRow(t) {
    this.limitReached() || (this.totalLength++, this.rowBytes = this.rowBytes || this._estimateRowMB(t), this.totalBytes += this.rowBytes, Array.isArray(t) ? this.addArrayRow(t) : this.addObjectRow(t));
  }
  addArrayRow(t) {
    if (!this.aggregator) {
      const n = this._getTableBatchType();
      this.aggregator = new n(this.schema, this.options);
    }
    this.aggregator.addArrayRow(t);
  }
  addObjectRow(t) {
    if (!this.aggregator) {
      const n = this._getTableBatchType();
      this.aggregator = new n(this.schema, this.options);
    }
    this.aggregator.addObjectRow(t);
  }
  chunkComplete(t) {
    t instanceof ArrayBuffer && (this.bytesUsed += t.byteLength), typeof t == "string" && (this.bytesUsed += t.length), this.isChunkComplete = !0;
  }
  getFullBatch(t) {
    return this._isFull() ? this._getBatch(t) : null;
  }
  getFinalBatch(t) {
    return this._getBatch(t);
  }
  _estimateRowMB(t) {
    return Array.isArray(t) ? t.length * 8 : Object.keys(t).length * 8;
  }
  _isFull() {
    if (!this.aggregator || this.aggregator.rowCount() === 0)
      return !1;
    if (this.options.batchSize === "auto") {
      if (!this.isChunkComplete)
        return !1;
    } else if (this.options.batchSize > this.aggregator.rowCount())
      return !1;
    return this.options.batchDebounceMs > Date.now() - this.lastBatchEmittedMs ? !1 : (this.isChunkComplete = !1, this.lastBatchEmittedMs = Date.now(), !0);
  }
  _getBatch(t) {
    if (!this.aggregator)
      return null;
    t != null && t.bytesUsed && (this.bytesUsed = t.bytesUsed);
    const n = this.aggregator.getBatch();
    return n.count = this.batchCount, n.bytesUsed = this.bytesUsed, Object.assign(n, t), this.batchCount++, this.aggregator = null, n;
  }
  _getTableBatchType() {
    switch (this.options.shape) {
      case "array-row-table":
      case "object-row-table":
        return wy;
      case "columnar-table":
        return My;
      case "arrow-table":
        if (!Ne.ArrowBatch)
          throw new Error(Iy);
        return Ne.ArrowBatch;
      default:
        return Cy;
    }
  }
}
Ne.ArrowBatch = void 0;
function xy(e) {
  try {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return async function* () {
      const n = new TextDecoder(void 0, t);
      for await (const s of e)
        yield typeof s == "string" ? s : n.decode(s, {
          stream: !0
        });
    }();
  } catch (t) {
    return Promise.reject(t);
  }
}
const sr = Number.MAX_SAFE_INTEGER;
var M = function(e) {
  return e[e.BEGIN = 0] = "BEGIN", e[e.VALUE = 1] = "VALUE", e[e.OPEN_OBJECT = 2] = "OPEN_OBJECT", e[e.CLOSE_OBJECT = 3] = "CLOSE_OBJECT", e[e.OPEN_ARRAY = 4] = "OPEN_ARRAY", e[e.CLOSE_ARRAY = 5] = "CLOSE_ARRAY", e[e.TEXT_ESCAPE = 6] = "TEXT_ESCAPE", e[e.STRING = 7] = "STRING", e[e.BACKSLASH = 8] = "BACKSLASH", e[e.END = 9] = "END", e[e.OPEN_KEY = 10] = "OPEN_KEY", e[e.CLOSE_KEY = 11] = "CLOSE_KEY", e[e.TRUE = 12] = "TRUE", e[e.TRUE2 = 13] = "TRUE2", e[e.TRUE3 = 14] = "TRUE3", e[e.FALSE = 15] = "FALSE", e[e.FALSE2 = 16] = "FALSE2", e[e.FALSE3 = 17] = "FALSE3", e[e.FALSE4 = 18] = "FALSE4", e[e.NULL = 19] = "NULL", e[e.NULL2 = 20] = "NULL2", e[e.NULL3 = 21] = "NULL3", e[e.NUMBER_DECIMAL_POINT = 22] = "NUMBER_DECIMAL_POINT", e[e.NUMBER_DIGIT = 23] = "NUMBER_DIGIT", e;
}(M || {});
const S = {
  tab: 9,
  lineFeed: 10,
  carriageReturn: 13,
  space: 32,
  doubleQuote: 34,
  plus: 43,
  comma: 44,
  minus: 45,
  period: 46,
  _0: 48,
  _9: 57,
  colon: 58,
  E: 69,
  openBracket: 91,
  backslash: 92,
  closeBracket: 93,
  a: 97,
  b: 98,
  e: 101,
  f: 102,
  l: 108,
  n: 110,
  r: 114,
  s: 115,
  t: 116,
  u: 117,
  openBrace: 123,
  closeBrace: 125
}, Io = /[\\"\n]/g, xo = {
  onready: () => {
  },
  onopenobject: () => {
  },
  onkey: () => {
  },
  oncloseobject: () => {
  },
  onopenarray: () => {
  },
  onclosearray: () => {
  },
  onvalue: () => {
  },
  onerror: () => {
  },
  onend: () => {
  },
  onchunkparsed: () => {
  }
};
class vy {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.options = xo, this.bufferCheckPosition = sr, this.q = "", this.c = "", this.p = "", this.closed = !1, this.closedRoot = !1, this.sawRoot = !1, this.error = null, this.state = M.BEGIN, this.stack = [], this.position = 0, this.column = 0, this.line = 1, this.slashed = !1, this.unicodeI = 0, this.unicodeS = null, this.depth = 0, this.textNode = void 0, this.numberNode = void 0, this.options = {
      ...xo,
      ...t
    }, this.textNode = void 0, this.numberNode = "", this.emit("onready");
  }
  end() {
    return (this.state !== M.VALUE || this.depth !== 0) && this._error("Unexpected end"), this._closeValue(), this.c = "", this.closed = !0, this.emit("onend"), this;
  }
  resume() {
    return this.error = null, this;
  }
  close() {
    return this.write(null);
  }
  emit(t, n) {
    var s, r;
    (s = (r = this.options)[t]) === null || s === void 0 || s.call(r, n, this);
  }
  emitNode(t, n) {
    this._closeValue(), this.emit(t, n);
  }
  write(t) {
    if (this.error)
      throw this.error;
    if (this.closed)
      return this._error("Cannot write after close. Assign an onready handler.");
    if (t === null)
      return this.end();
    let n = 0, s = t.charCodeAt(0), r = this.p;
    for (; s && (r = s, this.c = s = t.charCodeAt(n++), r !== s ? this.p = r : r = this.p, !!s); )
      switch (this.position++, s === S.lineFeed ? (this.line++, this.column = 0) : this.column++, this.state) {
        case M.BEGIN:
          s === S.openBrace ? this.state = M.OPEN_OBJECT : s === S.openBracket ? this.state = M.OPEN_ARRAY : Me(s) || this._error("Non-whitespace before {[.");
          continue;
        case M.OPEN_KEY:
        case M.OPEN_OBJECT:
          if (Me(s))
            continue;
          if (this.state === M.OPEN_KEY)
            this.stack.push(M.CLOSE_KEY);
          else if (s === S.closeBrace) {
            this.emit("onopenobject"), this.depth++, this.emit("oncloseobject"), this.depth--, this.state = this.stack.pop() || M.VALUE;
            continue;
          } else
            this.stack.push(M.CLOSE_OBJECT);
          s === S.doubleQuote ? this.state = M.STRING : this._error('Malformed object key should start with "');
          continue;
        case M.CLOSE_KEY:
        case M.CLOSE_OBJECT:
          if (Me(s))
            continue;
          s === S.colon ? (this.state === M.CLOSE_OBJECT ? (this.stack.push(M.CLOSE_OBJECT), this._closeValue("onopenobject"), this.depth++) : this._closeValue("onkey"), this.state = M.VALUE) : s === S.closeBrace ? (this.emitNode("oncloseobject"), this.depth--, this.state = this.stack.pop() || M.VALUE) : s === S.comma ? (this.state === M.CLOSE_OBJECT && this.stack.push(M.CLOSE_OBJECT), this._closeValue(), this.state = M.OPEN_KEY) : this._error("Bad object");
          continue;
        case M.OPEN_ARRAY:
        case M.VALUE:
          if (Me(s))
            continue;
          if (this.state === M.OPEN_ARRAY)
            if (this.emit("onopenarray"), this.depth++, this.state = M.VALUE, s === S.closeBracket) {
              this.emit("onclosearray"), this.depth--, this.state = this.stack.pop() || M.VALUE;
              continue;
            } else
              this.stack.push(M.CLOSE_ARRAY);
          s === S.doubleQuote ? this.state = M.STRING : s === S.openBrace ? this.state = M.OPEN_OBJECT : s === S.openBracket ? this.state = M.OPEN_ARRAY : s === S.t ? this.state = M.TRUE : s === S.f ? this.state = M.FALSE : s === S.n ? this.state = M.NULL : s === S.minus ? this.numberNode += "-" : S._0 <= s && s <= S._9 ? (this.numberNode += String.fromCharCode(s), this.state = M.NUMBER_DIGIT) : this._error("Bad value");
          continue;
        case M.CLOSE_ARRAY:
          if (s === S.comma)
            this.stack.push(M.CLOSE_ARRAY), this._closeValue("onvalue"), this.state = M.VALUE;
          else if (s === S.closeBracket)
            this.emitNode("onclosearray"), this.depth--, this.state = this.stack.pop() || M.VALUE;
          else {
            if (Me(s))
              continue;
            this._error("Bad array");
          }
          continue;
        case M.STRING:
          this.textNode === void 0 && (this.textNode = "");
          let i = n - 1, o = this.slashed, a = this.unicodeI;
          t:
            for (; ; ) {
              for (; a > 0; )
                if (this.unicodeS += String.fromCharCode(s), s = t.charCodeAt(n++), this.position++, a === 4 ? (this.textNode += String.fromCharCode(parseInt(this.unicodeS, 16)), a = 0, i = n - 1) : a++, !s)
                  break t;
              if (s === S.doubleQuote && !o) {
                this.state = this.stack.pop() || M.VALUE, this.textNode += t.substring(i, n - 1), this.position += n - 1 - i;
                break;
              }
              if (s === S.backslash && !o && (o = !0, this.textNode += t.substring(i, n - 1), this.position += n - 1 - i, s = t.charCodeAt(n++), this.position++, !s))
                break;
              if (o) {
                if (o = !1, s === S.n ? this.textNode += `
` : s === S.r ? this.textNode += "\r" : s === S.t ? this.textNode += "	" : s === S.f ? this.textNode += "\f" : s === S.b ? this.textNode += "\b" : s === S.u ? (a = 1, this.unicodeS = "") : this.textNode += String.fromCharCode(s), s = t.charCodeAt(n++), this.position++, i = n - 1, s)
                  continue;
                break;
              }
              Io.lastIndex = n;
              const c = Io.exec(t);
              if (c === null) {
                n = t.length + 1, this.textNode += t.substring(i, n - 1), this.position += n - 1 - i;
                break;
              }
              if (n = c.index + 1, s = t.charCodeAt(c.index), !s) {
                this.textNode += t.substring(i, n - 1), this.position += n - 1 - i;
                break;
              }
            }
          this.slashed = o, this.unicodeI = a;
          continue;
        case M.TRUE:
          s === S.r ? this.state = M.TRUE2 : this._error(`Invalid true started with t${s}`);
          continue;
        case M.TRUE2:
          s === S.u ? this.state = M.TRUE3 : this._error(`Invalid true started with tr${s}`);
          continue;
        case M.TRUE3:
          s === S.e ? (this.emit("onvalue", !0), this.state = this.stack.pop() || M.VALUE) : this._error(`Invalid true started with tru${s}`);
          continue;
        case M.FALSE:
          s === S.a ? this.state = M.FALSE2 : this._error(`Invalid false started with f${s}`);
          continue;
        case M.FALSE2:
          s === S.l ? this.state = M.FALSE3 : this._error(`Invalid false started with fa${s}`);
          continue;
        case M.FALSE3:
          s === S.s ? this.state = M.FALSE4 : this._error(`Invalid false started with fal${s}`);
          continue;
        case M.FALSE4:
          s === S.e ? (this.emit("onvalue", !1), this.state = this.stack.pop() || M.VALUE) : this._error(`Invalid false started with fals${s}`);
          continue;
        case M.NULL:
          s === S.u ? this.state = M.NULL2 : this._error(`Invalid null started with n${s}`);
          continue;
        case M.NULL2:
          s === S.l ? this.state = M.NULL3 : this._error(`Invalid null started with nu${s}`);
          continue;
        case M.NULL3:
          s === S.l ? (this.emit("onvalue", null), this.state = this.stack.pop() || M.VALUE) : this._error(`Invalid null started with nul${s}`);
          continue;
        case M.NUMBER_DECIMAL_POINT:
          s === S.period ? (this.numberNode += ".", this.state = M.NUMBER_DIGIT) : this._error("Leading zero not followed by .");
          continue;
        case M.NUMBER_DIGIT:
          S._0 <= s && s <= S._9 ? this.numberNode += String.fromCharCode(s) : s === S.period ? (this.numberNode.indexOf(".") !== -1 && this._error("Invalid number has two dots"), this.numberNode += ".") : s === S.e || s === S.E ? ((this.numberNode.indexOf("e") !== -1 || this.numberNode.indexOf("E") !== -1) && this._error("Invalid number has two exponential"), this.numberNode += "e") : s === S.plus || s === S.minus ? (r === S.e || r === S.E || this._error("Invalid symbol in number"), this.numberNode += String.fromCharCode(s)) : (this._closeNumber(), n--, this.state = this.stack.pop() || M.VALUE);
          continue;
        default:
          this._error(`Unknown state: ${this.state}`);
      }
    return this.position >= this.bufferCheckPosition && Fy(this), this.emit("onchunkparsed"), this;
  }
  _closeValue() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "onvalue";
    this.textNode !== void 0 && this.emit(t, this.textNode), this.textNode = void 0;
  }
  _closeNumber() {
    this.numberNode && this.emit("onvalue", parseFloat(this.numberNode)), this.numberNode = "";
  }
  _error() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    this._closeValue(), t += `
Line: ${this.line}
Column: ${this.column}
Char: ${this.c}`;
    const n = new Error(t);
    this.error = n, this.emit("onerror", n);
  }
}
function Me(e) {
  return e === S.carriageReturn || e === S.lineFeed || e === S.space || e === S.tab;
}
function Fy(e) {
  const t = Math.max(sr, 10);
  let n = 0;
  for (const s of ["textNode", "numberNode"]) {
    const r = e[s] === void 0 ? 0 : e[s].length;
    if (r > t)
      switch (s) {
        case "text":
          break;
        default:
          e._error(`Max buffer length exceeded: ${s}`);
      }
    n = Math.max(n, r);
  }
  e.bufferCheckPosition = sr - n + e.position;
}
class Zt {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    if (this.path = void 0, this.path = ["$"], t instanceof Zt) {
      this.path = [...t.path];
      return;
    }
    if (Array.isArray(t)) {
      this.path.push(...t);
      return;
    }
    if (typeof t == "string" && (this.path = t.split("."), this.path[0] !== "$"))
      throw new Error("JSONPaths must start with $");
  }
  clone() {
    return new Zt(this);
  }
  toString() {
    return this.path.join(".");
  }
  push(t) {
    this.path.push(t);
  }
  pop() {
    return this.path.pop();
  }
  set(t) {
    this.path[this.path.length - 1] = t;
  }
  equals(t) {
    if (!this || !t || this.path.length !== t.path.length)
      return !1;
    for (let n = 0; n < this.path.length; ++n)
      if (this.path[n] !== t.path[n])
        return !1;
    return !0;
  }
  setFieldAtPath(t, n) {
    const s = [...this.path];
    s.shift();
    const r = s.pop();
    for (const i of s)
      t = t[i];
    t[r] = n;
  }
  getFieldAtPath(t) {
    const n = [...this.path];
    n.shift();
    const s = n.pop();
    for (const r of n)
      t = t[r];
    return t[s];
  }
}
class Oy {
  constructor(t) {
    this.parser = void 0, this.result = void 0, this.previousStates = [], this.currentState = Object.freeze({
      container: [],
      key: null
    }), this.jsonpath = new Zt(), this.reset(), this.parser = new vy({
      onready: () => {
        this.jsonpath = new Zt(), this.previousStates.length = 0, this.currentState.container.length = 0;
      },
      onopenobject: (n) => {
        this._openObject({}), typeof n < "u" && this.parser.emit("onkey", n);
      },
      onkey: (n) => {
        this.jsonpath.set(n), this.currentState.key = n;
      },
      oncloseobject: () => {
        this._closeObject();
      },
      onopenarray: () => {
        this._openArray();
      },
      onclosearray: () => {
        this._closeArray();
      },
      onvalue: (n) => {
        this._pushOrSet(n);
      },
      onerror: (n) => {
        throw n;
      },
      onend: () => {
        this.result = this.currentState.container.pop();
      },
      ...t
    });
  }
  reset() {
    this.result = void 0, this.previousStates = [], this.currentState = Object.freeze({
      container: [],
      key: null
    }), this.jsonpath = new Zt();
  }
  write(t) {
    this.parser.write(t);
  }
  close() {
    this.parser.close();
  }
  _pushOrSet(t) {
    const {
      container: n,
      key: s
    } = this.currentState;
    s !== null ? (n[s] = t, this.currentState.key = null) : n.push(t);
  }
  _openArray() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    this.jsonpath.push(null), this._pushOrSet(t), this.previousStates.push(this.currentState), this.currentState = {
      container: t,
      isArray: !0,
      key: null
    };
  }
  _closeArray() {
    this.jsonpath.pop(), this.currentState = this.previousStates.pop();
  }
  _openObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.jsonpath.push(null), this._pushOrSet(t), this.previousStates.push(this.currentState), this.currentState = {
      container: t,
      isArray: !1,
      key: null
    };
  }
  _closeObject() {
    this.jsonpath.pop(), this.currentState = this.previousStates.pop();
  }
}
class Dy extends Oy {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    super({
      onopenarray: () => {
        if (!this.streamingArray && this._matchJSONPath()) {
          this.streamingJsonPath = this.getJsonPath().clone(), this.streamingArray = [], this._openArray(this.streamingArray);
          return;
        }
        this._openArray();
      },
      onopenobject: (s) => {
        this.topLevelObject ? this._openObject({}) : (this.topLevelObject = {}, this._openObject(this.topLevelObject)), typeof s < "u" && this.parser.emit("onkey", s);
      }
    }), this.jsonPaths = void 0, this.streamingJsonPath = null, this.streamingArray = null, this.topLevelObject = null;
    const n = t.jsonpaths || [];
    this.jsonPaths = n.map((s) => new Zt(s));
  }
  write(t) {
    super.write(t);
    let n = [];
    return this.streamingArray && (n = [...this.streamingArray], this.streamingArray.length = 0), n;
  }
  getPartialResult() {
    return this.topLevelObject;
  }
  getStreamingJsonPath() {
    return this.streamingJsonPath;
  }
  getStreamingJsonPathAsString() {
    return this.streamingJsonPath && this.streamingJsonPath.toString();
  }
  getJsonPath() {
    return this.jsonpath;
  }
  _matchJSONPath() {
    const t = this.getJsonPath();
    if (this.jsonPaths.length === 0)
      return !0;
    for (const n of this.jsonPaths)
      if (n.equals(t))
        return !0;
    return !1;
  }
}
async function* Ly(e, t) {
  const n = xy(e), {
    metadata: s
  } = t, {
    jsonpaths: r
  } = t.json || {};
  let i = !0;
  const o = null, a = new Ne(o, t), c = new Dy({
    jsonpaths: r
  });
  for await (const f of n) {
    const d = c.write(f), m = d.length > 0 && c.getStreamingJsonPathAsString();
    if (d.length > 0 && i) {
      if (s) {
        var u;
        yield {
          shape: (t == null || (u = t.json) === null || u === void 0 ? void 0 : u.shape) || "array-row-table",
          batchType: "partial-result",
          data: [],
          length: 0,
          bytesUsed: 0,
          container: c.getPartialResult(),
          jsonpath: m
        };
      }
      i = !1;
    }
    for (const p of d) {
      a.addRow(p);
      const C = a.getFullBatch({
        jsonpath: m
      });
      C && (yield C);
    }
    a.chunkComplete(f);
    const g = a.getFullBatch({
      jsonpath: m
    });
    g && (yield g);
  }
  const l = c.getStreamingJsonPathAsString(), h = a.getFinalBatch({
    jsonpath: l
  });
  h && (yield h), s && (yield {
    shape: "json",
    batchType: "final-result",
    container: c.getPartialResult(),
    jsonpath: c.getStreamingJsonPathAsString(),
    data: [],
    length: 0
  });
}
const Gn = {
  x: 0,
  y: 1,
  z: 2
};
function bc(e, t = {}) {
  const { start: n = 0, end: s = e.length, plane: r = "xy" } = t, i = t.size || 2;
  let o = 0;
  const a = Gn[r[0]], c = Gn[r[1]];
  for (let u = n, l = s - i; u < s; u += i)
    o += (e[u + a] - e[l + a]) * (e[u + c] + e[l + c]), l = u;
  return o / 2;
}
function Py(e, t, n = 2, s, r = "xy") {
  const i = t && t.length, o = i ? t[0] * n : e.length;
  let a = _c(e, 0, o, n, !0, s && s[0], r);
  const c = [];
  if (!a || a.next === a.prev)
    return c;
  let u, l, h, f, d, m, g;
  if (i && (a = Jy(e, t, a, n, s, r)), e.length > 80 * n) {
    f = l = e[0], d = h = e[1];
    for (let p = n; p < o; p += n)
      m = e[p], g = e[p + 1], m < f && (f = m), g < d && (d = g), m > l && (l = m), g > h && (h = g);
    u = Math.max(l - f, h - d), u = u !== 0 ? 32767 / u : 0;
  }
  return Ue(a, c, n, f, d, u, 0), c;
}
function _c(e, t, n, s, r, i, o) {
  let a, c;
  i === void 0 && (i = bc(e, { start: t, end: n, size: s, plane: o }));
  let u = Gn[o[0]], l = Gn[o[1]];
  if (r === i < 0)
    for (a = t; a < n; a += s)
      c = vo(a, e[a + u], e[a + l], c);
  else
    for (a = n - s; a >= t; a -= s)
      c = vo(a, e[a + u], e[a + l], c);
  return c && Yn(c, c.next) && (Je(c), c = c.next), c;
}
function ee(e, t) {
  if (!e)
    return e;
  t || (t = e);
  let n = e, s;
  do
    if (s = !1, !n.steiner && (Yn(n, n.next) || K(n.prev, n, n.next) === 0)) {
      if (Je(n), n = t = n.prev, n === n.next)
        break;
      s = !0;
    } else
      n = n.next;
  while (s || n !== t);
  return t;
}
function Ue(e, t, n, s, r, i, o) {
  if (!e)
    return;
  !o && i && zy(e, s, r, i);
  let a = e, c, u;
  for (; e.prev !== e.next; ) {
    if (c = e.prev, u = e.next, i ? Ny(e, s, r, i) : Gy(e)) {
      t.push(c.i / n | 0), t.push(e.i / n | 0), t.push(u.i / n | 0), Je(e), e = u.next, a = u.next;
      continue;
    }
    if (e = u, e === a) {
      o ? o === 1 ? (e = Uy(ee(e), t, n), Ue(e, t, n, s, r, i, 2)) : o === 2 && Hy(e, t, n, s, r, i) : Ue(ee(e), t, n, s, r, i, 1);
      break;
    }
  }
}
function Gy(e) {
  const t = e.prev, n = e, s = e.next;
  if (K(t, n, s) >= 0)
    return !1;
  const r = t.x, i = n.x, o = s.x, a = t.y, c = n.y, u = s.y, l = r < i ? r < o ? r : o : i < o ? i : o, h = a < c ? a < u ? a : u : c < u ? c : u, f = r > i ? r > o ? r : o : i > o ? i : o, d = a > c ? a > u ? a : u : c > u ? c : u;
  let m = s.next;
  for (; m !== t; ) {
    if (m.x >= l && m.x <= f && m.y >= h && m.y <= d && me(r, a, i, c, o, u, m.x, m.y) && K(m.prev, m, m.next) >= 0)
      return !1;
    m = m.next;
  }
  return !0;
}
function Ny(e, t, n, s) {
  const r = e.prev, i = e, o = e.next;
  if (K(r, i, o) >= 0)
    return !1;
  const a = r.x, c = i.x, u = o.x, l = r.y, h = i.y, f = o.y, d = a < c ? a < u ? a : u : c < u ? c : u, m = l < h ? l < f ? l : f : h < f ? h : f, g = a > c ? a > u ? a : u : c > u ? c : u, p = l > h ? l > f ? l : f : h > f ? h : f, C = rr(d, m, t, n, s), w = rr(g, p, t, n, s);
  let y = e.prevZ, B = e.nextZ;
  for (; y && y.z >= C && B && B.z <= w; ) {
    if (y.x >= d && y.x <= g && y.y >= m && y.y <= p && y !== r && y !== o && me(a, l, c, h, u, f, y.x, y.y) && K(y.prev, y, y.next) >= 0 || (y = y.prevZ, B.x >= d && B.x <= g && B.y >= m && B.y <= p && B !== r && B !== o && me(a, l, c, h, u, f, B.x, B.y) && K(B.prev, B, B.next) >= 0))
      return !1;
    B = B.nextZ;
  }
  for (; y && y.z >= C; ) {
    if (y.x >= d && y.x <= g && y.y >= m && y.y <= p && y !== r && y !== o && me(a, l, c, h, u, f, y.x, y.y) && K(y.prev, y, y.next) >= 0)
      return !1;
    y = y.prevZ;
  }
  for (; B && B.z <= w; ) {
    if (B.x >= d && B.x <= g && B.y >= m && B.y <= p && B !== r && B !== o && me(a, l, c, h, u, f, B.x, B.y) && K(B.prev, B, B.next) >= 0)
      return !1;
    B = B.nextZ;
  }
  return !0;
}
function Uy(e, t, n) {
  let s = e;
  do {
    const r = s.prev, i = s.next.next;
    !Yn(r, i) && wc(r, s, s.next, i) && He(r, i) && He(i, r) && (t.push(r.i / n | 0), t.push(s.i / n | 0), t.push(i.i / n | 0), Je(s), Je(s.next), s = e = i), s = s.next;
  } while (s !== e);
  return ee(s);
}
function Hy(e, t, n, s, r, i) {
  let o = e;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && Qy(o, a)) {
        let c = Rc(o, a);
        o = ee(o, o.next), c = ee(c, c.next), Ue(o, t, n, s, r, i, 0), Ue(c, t, n, s, r, i, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== e);
}
function Jy(e, t, n, s, r, i) {
  const o = [];
  let a, c, u, l, h;
  for (a = 0, c = t.length; a < c; a++)
    u = t[a] * s, l = a < c - 1 ? t[a + 1] * s : e.length, h = _c(e, u, l, s, !1, r && r[a + 1], i), h === h.next && (h.steiner = !0), o.push(Xy(h));
  for (o.sort(Vy), a = 0; a < o.length; a++)
    n = jy(o[a], n);
  return n;
}
function Vy(e, t) {
  return e.x - t.x;
}
function jy(e, t) {
  const n = ky(e, t);
  if (!n)
    return t;
  const s = Rc(n, e);
  return ee(s, s.next), ee(n, n.next);
}
function ky(e, t) {
  let n = t;
  const s = e.x, r = e.y;
  let i = -1 / 0, o;
  do {
    if (r <= n.y && r >= n.next.y && n.next.y !== n.y) {
      const f = n.x + (r - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
      if (f <= s && f > i && (i = f, o = n.x < n.next.x ? n : n.next, f === s))
        return o;
    }
    n = n.next;
  } while (n !== t);
  if (!o)
    return null;
  const a = o, c = o.x, u = o.y;
  let l = 1 / 0, h;
  n = o;
  do
    s >= n.x && n.x >= c && s !== n.x && me(r < u ? s : i, r, c, u, r < u ? i : s, r, n.x, n.y) && (h = Math.abs(r - n.y) / (s - n.x), He(n, e) && (h < l || h === l && (n.x > o.x || n.x === o.x && Ky(o, n))) && (o = n, l = h)), n = n.next;
  while (n !== a);
  return o;
}
function Ky(e, t) {
  return K(e.prev, e, t.prev) < 0 && K(t.next, e, e.next) < 0;
}
function zy(e, t, n, s) {
  let r = e;
  do
    r.z === 0 && (r.z = rr(r.x, r.y, t, n, s)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next;
  while (r !== e);
  r.prevZ.nextZ = null, r.prevZ = null, Wy(r);
}
function Wy(e) {
  let t, n, s = 1, r, i, o, a, c, u;
  do {
    for (i = e, e = null, u = null, r = 0; i; ) {
      for (r++, a = i, o = 0, n = 0; n < s && (o++, a = a.nextZ, !!a); n++)
        ;
      for (c = s; o > 0 || c > 0 && a; )
        o !== 0 && (c === 0 || !a || i.z <= a.z) ? (t = i, i = i.nextZ, o--) : (t = a, a = a.nextZ, c--), u ? u.nextZ = t : e = t, t.prevZ = u, u = t;
      i = a;
    }
    u.nextZ = null, s *= 2;
  } while (r > 1);
  return e;
}
function rr(e, t, n, s, r) {
  return e = (e - n) * r | 0, t = (t - s) * r | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, e | t << 1;
}
function Xy(e) {
  let t = e, n = e;
  do
    (t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next;
  while (t !== e);
  return n;
}
function me(e, t, n, s, r, i, o, a) {
  return (r - o) * (t - a) >= (e - o) * (i - a) && (e - o) * (s - a) >= (n - o) * (t - a) && (n - o) * (i - a) >= (r - o) * (s - a);
}
function Qy(e, t) {
  return e.next.i !== t.i && e.prev.i !== t.i && !qy(e, t) && // dones't intersect other edges
  (He(e, t) && He(t, e) && Yy(e, t) && // locally visible
  (K(e.prev, e, t.prev) || K(e, t.prev, t)) || // does not create opposite-facing sectors
  Yn(e, t) && K(e.prev, e, e.next) > 0 && K(t.prev, t, t.next) > 0);
}
function K(e, t, n) {
  return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
}
function Yn(e, t) {
  return e.x === t.x && e.y === t.y;
}
function wc(e, t, n, s) {
  const r = pn(K(e, t, n)), i = pn(K(e, t, s)), o = pn(K(n, s, e)), a = pn(K(n, s, t));
  return !!(r !== i && o !== a || r === 0 && An(e, n, t) || i === 0 && An(e, s, t) || o === 0 && An(n, e, s) || a === 0 && An(n, t, s));
}
function An(e, t, n) {
  return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y);
}
function pn(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function qy(e, t) {
  let n = e;
  do {
    if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && wc(n, n.next, e, t))
      return !0;
    n = n.next;
  } while (n !== e);
  return !1;
}
function He(e, t) {
  return K(e.prev, e, e.next) < 0 ? K(e, t, e.next) >= 0 && K(e, e.prev, t) >= 0 : K(e, t, e.prev) < 0 || K(e, e.next, t) < 0;
}
function Yy(e, t) {
  let n = e, s = !1;
  const r = (e.x + t.x) / 2, i = (e.y + t.y) / 2;
  do
    n.y > i != n.next.y > i && n.next.y !== n.y && r < (n.next.x - n.x) * (i - n.y) / (n.next.y - n.y) + n.x && (s = !s), n = n.next;
  while (n !== e);
  return s;
}
function Rc(e, t) {
  const n = new ir(e.i, e.x, e.y), s = new ir(t.i, t.x, t.y), r = e.next, i = t.prev;
  return e.next = t, t.prev = e, n.next = r, r.prev = n, s.next = n, n.prev = s, i.next = s, s.prev = i, s;
}
function vo(e, t, n, s) {
  const r = new ir(e, t, n);
  return s ? (r.next = s.next, r.prev = s, s.next.prev = r, s.next = r) : (r.prev = r, r.next = r), r;
}
function Je(e) {
  e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
class ir {
  constructor(t, n, s) {
    this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1, this.i = t, this.x = n, this.y = s;
  }
}
function $y(e, t, n) {
  const s = Zy(e), r = Object.keys(s).filter((i) => s[i] !== Array);
  return tB(e, {
    propArrayTypes: s,
    ...t
  }, {
    numericPropKeys: n && n.numericPropKeys || r,
    PositionDataType: n ? n.PositionDataType : Float32Array,
    triangulate: n ? n.triangulate : !0
  });
}
function Zy(e) {
  const t = {};
  for (const n of e)
    if (n.properties)
      for (const s in n.properties) {
        const r = n.properties[s];
        t[s] = oB(r, t[s]);
      }
  return t;
}
function tB(e, t, n) {
  const {
    pointPositionsCount: s,
    pointFeaturesCount: r,
    linePositionsCount: i,
    linePathsCount: o,
    lineFeaturesCount: a,
    polygonPositionsCount: c,
    polygonObjectsCount: u,
    polygonRingsCount: l,
    polygonFeaturesCount: h,
    propArrayTypes: f,
    coordLength: d
  } = t, {
    numericPropKeys: m = [],
    PositionDataType: g = Float32Array,
    triangulate: p = !0
  } = n, C = e[0] && "id" in e[0], w = e.length > 65535 ? Uint32Array : Uint16Array, y = {
    type: "Point",
    positions: new g(s * d),
    globalFeatureIds: new w(s),
    featureIds: r > 65535 ? new Uint32Array(s) : new Uint16Array(s),
    numericProps: {},
    properties: [],
    fields: []
  }, B = {
    type: "LineString",
    pathIndices: i > 65535 ? new Uint32Array(o + 1) : new Uint16Array(o + 1),
    positions: new g(i * d),
    globalFeatureIds: new w(i),
    featureIds: a > 65535 ? new Uint32Array(i) : new Uint16Array(i),
    numericProps: {},
    properties: [],
    fields: []
  }, R = {
    type: "Polygon",
    polygonIndices: c > 65535 ? new Uint32Array(u + 1) : new Uint16Array(u + 1),
    primitivePolygonIndices: c > 65535 ? new Uint32Array(l + 1) : new Uint16Array(l + 1),
    positions: new g(c * d),
    globalFeatureIds: new w(c),
    featureIds: h > 65535 ? new Uint32Array(c) : new Uint16Array(c),
    numericProps: {},
    properties: [],
    fields: []
  };
  p && (R.triangles = []);
  for (const v of [y, B, R])
    for (const F of m) {
      const x = f[F];
      v.numericProps[F] = new x(v.positions.length / d);
    }
  B.pathIndices[o] = i, R.polygonIndices[u] = c, R.primitivePolygonIndices[l] = c;
  const T = {
    pointPosition: 0,
    pointFeature: 0,
    linePosition: 0,
    linePath: 0,
    lineFeature: 0,
    polygonPosition: 0,
    polygonObject: 0,
    polygonRing: 0,
    polygonFeature: 0,
    feature: 0
  };
  for (const v of e) {
    const F = v.geometry, x = v.properties || {};
    switch (F.type) {
      case "Point":
        eB(F, y, T, d, x), y.properties.push(Ls(x, m)), C && y.fields.push({
          id: v.id
        }), T.pointFeature++;
        break;
      case "LineString":
        nB(F, B, T, d, x), B.properties.push(Ls(x, m)), C && B.fields.push({
          id: v.id
        }), T.lineFeature++;
        break;
      case "Polygon":
        sB(F, R, T, d, x), R.properties.push(Ls(x, m)), C && R.fields.push({
          id: v.id
        }), T.polygonFeature++;
        break;
      default:
        throw new Error("Invalid geometry type");
    }
    T.feature++;
  }
  return iB(y, B, R, d);
}
function eB(e, t, n, s, r) {
  t.positions.set(e.data, n.pointPosition * s);
  const i = e.data.length / s;
  Nr(t, r, n.pointPosition, i), t.globalFeatureIds.fill(n.feature, n.pointPosition, n.pointPosition + i), t.featureIds.fill(n.pointFeature, n.pointPosition, n.pointPosition + i), n.pointPosition += i;
}
function nB(e, t, n, s, r) {
  t.positions.set(e.data, n.linePosition * s);
  const i = e.data.length / s;
  Nr(t, r, n.linePosition, i), t.globalFeatureIds.fill(n.feature, n.linePosition, n.linePosition + i), t.featureIds.fill(n.lineFeature, n.linePosition, n.linePosition + i);
  for (let o = 0, a = e.indices.length; o < a; ++o) {
    const c = e.indices[o], u = o === a - 1 ? e.data.length : e.indices[o + 1];
    t.pathIndices[n.linePath++] = n.linePosition, n.linePosition += (u - c) / s;
  }
}
function sB(e, t, n, s, r) {
  t.positions.set(e.data, n.polygonPosition * s);
  const i = e.data.length / s;
  Nr(t, r, n.polygonPosition, i), t.globalFeatureIds.fill(n.feature, n.polygonPosition, n.polygonPosition + i), t.featureIds.fill(n.polygonFeature, n.polygonPosition, n.polygonPosition + i);
  for (let o = 0, a = e.indices.length; o < a; ++o) {
    const c = n.polygonPosition;
    t.polygonIndices[n.polygonObject++] = c;
    const u = e.areas[o], l = e.indices[o], h = e.indices[o + 1];
    for (let d = 0, m = l.length; d < m; ++d) {
      const g = l[d], p = d === m - 1 ? h === void 0 ? e.data.length : h[0] : l[d + 1];
      t.primitivePolygonIndices[n.polygonRing++] = n.polygonPosition, n.polygonPosition += (p - g) / s;
    }
    const f = n.polygonPosition;
    rB(t, u, l, {
      startPosition: c,
      endPosition: f,
      coordLength: s
    });
  }
}
function rB(e, t, n, s) {
  let {
    startPosition: r,
    endPosition: i,
    coordLength: o
  } = s;
  if (!e.triangles)
    return;
  const a = r * o, c = i * o, u = e.positions.subarray(a, c), l = n[0], h = n.slice(1).map((d) => (d - l) / o), f = Py(u, h, o, t);
  for (let d = 0, m = f.length; d < m; ++d)
    e.triangles.push(r + f[d]);
}
function Ds(e, t) {
  const n = {};
  for (const s in e)
    n[s] = {
      value: e[s],
      size: t
    };
  return n;
}
function iB(e, t, n, s) {
  const r = {
    shape: "binary-feature-collection",
    points: {
      ...e,
      positions: {
        value: e.positions,
        size: s
      },
      globalFeatureIds: {
        value: e.globalFeatureIds,
        size: 1
      },
      featureIds: {
        value: e.featureIds,
        size: 1
      },
      numericProps: Ds(e.numericProps, 1)
    },
    lines: {
      ...t,
      positions: {
        value: t.positions,
        size: s
      },
      pathIndices: {
        value: t.pathIndices,
        size: 1
      },
      globalFeatureIds: {
        value: t.globalFeatureIds,
        size: 1
      },
      featureIds: {
        value: t.featureIds,
        size: 1
      },
      numericProps: Ds(t.numericProps, 1)
    },
    polygons: {
      ...n,
      positions: {
        value: n.positions,
        size: s
      },
      polygonIndices: {
        value: n.polygonIndices,
        size: 1
      },
      primitivePolygonIndices: {
        value: n.primitivePolygonIndices,
        size: 1
      },
      globalFeatureIds: {
        value: n.globalFeatureIds,
        size: 1
      },
      featureIds: {
        value: n.featureIds,
        size: 1
      },
      numericProps: Ds(n.numericProps, 1)
    }
  };
  return r.polygons && n.triangles && (r.polygons.triangles = {
    value: new Uint32Array(n.triangles),
    size: 1
  }), r;
}
function Nr(e, t, n, s) {
  for (const r in e.numericProps)
    if (r in t) {
      const i = t[r];
      e.numericProps[r].fill(i, n, n + s);
    }
}
function Ls(e, t) {
  const n = {};
  for (const s in e)
    t.includes(s) || (n[s] = e[s]);
  return n;
}
function oB(e, t) {
  return t === Array || !Number.isFinite(e) ? Array : t === Float64Array || Math.fround(e) !== e ? Float64Array : Float32Array;
}
function aB(e) {
  let t = 0, n = 0, s = 0, r = 0, i = 0, o = 0, a = 0, c = 0, u = 0;
  const l = /* @__PURE__ */ new Set();
  for (const h of e) {
    const f = h.geometry;
    switch (f.type) {
      case "Point":
        n++, t++, l.add(f.coordinates.length);
        break;
      case "MultiPoint":
        n++, t += f.coordinates.length;
        for (const m of f.coordinates)
          l.add(m.length);
        break;
      case "LineString":
        i++, s += f.coordinates.length, r++;
        for (const m of f.coordinates)
          l.add(m.length);
        break;
      case "MultiLineString":
        i++;
        for (const m of f.coordinates) {
          s += m.length, r++;
          for (const g of m)
            l.add(g.length);
        }
        break;
      case "Polygon":
        u++, a++, c += f.coordinates.length;
        const d = f.coordinates.flat();
        o += d.length;
        for (const m of d)
          l.add(m.length);
        break;
      case "MultiPolygon":
        u++;
        for (const m of f.coordinates) {
          a++, c += m.length;
          const g = m.flat();
          o += g.length;
          for (const p of g)
            l.add(p.length);
        }
        break;
      default:
        throw new Error(`Unsupported geometry type: ${f.type}`);
    }
  }
  return {
    coordLength: l.size > 0 ? Math.max(...l) : 2,
    pointPositionsCount: t,
    pointFeaturesCount: n,
    linePositionsCount: s,
    linePathsCount: r,
    lineFeaturesCount: i,
    polygonPositionsCount: o,
    polygonObjectsCount: a,
    polygonRingsCount: c,
    polygonFeaturesCount: u
  };
}
function cB(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    coordLength: 2,
    fixRingWinding: !0
  };
  return e.map((n) => uB(n, t));
}
function Fo(e, t, n, s) {
  n.push(t.length), t.push(...e);
  for (let r = e.length; r < s.coordLength; r++)
    t.push(0);
}
function or(e, t, n, s) {
  n.push(t.length);
  for (const r of e) {
    t.push(...r);
    for (let i = r.length; i < s.coordLength; i++)
      t.push(0);
  }
}
function Oo(e, t, n, s, r) {
  let i = 0;
  const o = [], a = [];
  for (const c of e) {
    const u = c.map((f) => f.slice(0, 2));
    let l = bc(u.flat());
    const h = l < 0;
    r.fixRingWinding && (i === 0 && !h || i > 0 && h) && (c.reverse(), l = -l), o.push(l), or(c, t, a, r), i++;
  }
  i > 0 && (s.push(o), n.push(a));
}
function uB(e, t) {
  const {
    geometry: n
  } = e;
  if (n.type === "GeometryCollection")
    throw new Error("GeometryCollection type not supported");
  const s = [], r = [];
  let i, o;
  switch (n.type) {
    case "Point":
      o = "Point", Fo(n.coordinates, s, r, t);
      break;
    case "MultiPoint":
      o = "Point", n.coordinates.map((a) => Fo(a, s, r, t));
      break;
    case "LineString":
      o = "LineString", or(n.coordinates, s, r, t);
      break;
    case "MultiLineString":
      o = "LineString", n.coordinates.map((a) => or(a, s, r, t));
      break;
    case "Polygon":
      o = "Polygon", i = [], Oo(n.coordinates, s, r, i, t);
      break;
    case "MultiPolygon":
      o = "Polygon", i = [], n.coordinates.map((a) => Oo(a, s, r, i, t));
      break;
    default:
      throw new Error(`Unknown type: ${o}`);
  }
  return {
    ...e,
    geometry: {
      type: o,
      indices: r,
      data: s,
      areas: i
    }
  };
}
function Mc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    fixRingWinding: !0,
    triangulate: !0
  };
  const n = aB(e), s = n.coordLength, {
    fixRingWinding: r
  } = t, i = cB(e, {
    coordLength: s,
    fixRingWinding: r
  });
  return $y(i, n, {
    numericPropKeys: t.numericPropKeys,
    PositionDataType: t.PositionDataType || Float32Array,
    triangulate: t.triangulate
  });
}
const lB = "4.1.4", hB = {
  name: "GeoJSON",
  id: "geojson",
  module: "geojson",
  version: lB,
  worker: !0,
  extensions: ["geojson"],
  mimeTypes: ["application/geo+json"],
  category: "geometry",
  text: !0,
  options: {
    geojson: {
      shape: "object-row-table"
    },
    json: {
      shape: "object-row-table",
      jsonpaths: ["$", "$.features"]
    },
    gis: {
      format: "geojson"
    }
  }
}, Ve = {
  ...hB,
  parse: fB,
  parseTextSync: Sc,
  parseInBatches: dB
};
async function fB(e, t) {
  return Sc(new TextDecoder().decode(e), t);
}
function Sc(e, t) {
  var n;
  t = {
    ...Ve.options,
    ...t
  }, t.geojson = {
    ...Ve.options.geojson,
    ...t.geojson
  }, t.gis = t.gis || {};
  let s;
  try {
    s = JSON.parse(e);
  } catch {
    s = {};
  }
  const r = {
    shape: "geojson-table",
    type: "FeatureCollection",
    features: ((n = s) === null || n === void 0 ? void 0 : n.features) || []
  };
  switch (t.gis.format) {
    case "binary":
      return Mc(r.features);
    default:
      return r;
  }
}
function dB(e, t) {
  t = {
    ...Ve.options,
    ...t
  }, t.json = {
    ...Ve.options.geojson,
    ...t.geojson
  };
  const n = Ly(e, t);
  switch (t.gis.format) {
    case "binary":
      return mB(n);
    default:
      return n;
  }
}
async function* mB(e) {
  for await (const t of e)
    t.data = Mc(t.data), yield t;
}
function gB(e) {
  let t = 0;
  for (const s in e.attributes) {
    const r = e.getAttribute(s);
    t += r.count * r.itemSize * r.array.BYTES_PER_ELEMENT;
  }
  const n = e.getIndex();
  return t += n ? n.count * n.itemSize * n.array.BYTES_PER_ELEMENT : 0, t;
}
function Ic(e) {
  const n = document.createElement("canvas");
  n.width = 64, n.height = 64;
  const s = n.getContext("2d");
  s.rect(0, 0, 64, 64);
  const r = s.createLinearGradient(0, 0, 64, 64);
  for (let o = 0; o < e.length; o++) {
    const a = e[o];
    r.addColorStop(a[0], "#" + a[1].getHexString());
  }
  s.fillStyle = r, s.fill();
  const i = new Lc(n);
  return i.needsUpdate = !0, i.minFilter = Pc, i.wrapS = Jr, i.wrapT = Jr, i.repeat.set(2, 2), i;
}
function Do(e) {
  e.updateMatrix(), e.updateMatrixWorld(), e.matrixWorldInverse.copy(e.matrixWorld).invert();
  const t = new Gc();
  return t.setFromProjectionMatrix(new Y().multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse)), t;
}
function AB(e) {
  const t = new yn(), n = new Nc(10, 5), s = new nt(...e.projectPointOntoPlane([0, 0, 0])), r = new nt(e.normal.x, e.normal.y, e.normal.z), i = new nt().copy(s).add(r);
  n.lookAt(i), n.translate(s.x, s.y, s.z);
  const o = new Gs({ color: 65535, side: No }), a = new Ns(n, o), c = new Uc(r, s, 5, 16776960);
  return t.add(c), t.add(a), t;
}
function Lo(e) {
  const { boundingVolume: t } = e;
  let n = 0;
  e.content && (n = Math.min(e.content.byteLength / 5e5, 1));
  const s = new _(n, 1, 0), r = new Hc(1, 1, 1), i = new Y();
  t.halfAxes ? i.copy(xc(t.halfAxes)) : t.radius && r.scale(t.radius * 2, t.radius * 2, t.radius * 2), r.applyMatrix4(i);
  const o = new Jc(r), a = new Vc(o, new jc({ color: s }));
  return a.position.copy(new nt(...t.center)), a;
}
function xc(e) {
  const t = e;
  return new Y().fromArray([
    t[0] * 2,
    t[1] * 2,
    t[2] * 2,
    0,
    t[3] * 2,
    t[4] * 2,
    t[5] * 2,
    0,
    t[6] * 2,
    t[7] * 2,
    t[8] * 2,
    0,
    0,
    0,
    0,
    1
  ]);
}
function pB(e, t) {
  const r = 2 * Math.PI * 6378137 / 2, i = t * r / 180;
  let o = Math.log(Math.tan((90 + e) * Math.PI / 360)) / (Math.PI / 180);
  return o = o * r / 180, new Uo(i, o);
}
function yB(e) {
  let t = 0;
  if ((e == null ? void 0 : e.userData.mimeType) == "image/ktx2" && e.mipmaps) {
    for (let n = 0; n < e.mipmaps.length; n++)
      t += e.mipmaps[n].data.byteLength;
    return t;
  } else if (e.image) {
    const { image: n } = e, s = 4;
    let r = [n.width, n.height];
    for (; r[0] > 1 || r[1] > 1; )
      t += r[0] * r[1] * s, r[0] = Math.max(Math.floor(r[0] / 2), 1), r[1] = Math.max(Math.floor(r[1] / 2), 1);
    return t += 1 * 1 * s, t;
  } else
    return;
}
function vc(e) {
  return gB(e);
}
let lt = null, Rt = null, Nn = null, _n = null;
const Po = {
  minHeight: 0,
  maxHeight: 300,
  samples: 4,
  sampleStep: 4,
  opacity: 0.5,
  blendingType: cr
};
function BB(e, t, n, s = Po) {
  lt && lt.dispose(), Rt || (Rt = n);
  const r = { ...Po, ...s };
  lt = new kc(e.width * e.devicePixelRatio, e.height * e.devicePixelRatio), lt.texture.minFilter = Vr, lt.texture.magFilter = Vr, lt.stencilBuffer = !1, lt.texture.format = Kc, lt.texture.type = zc, Rt.setPixelRatio(devicePixelRatio), Rt.setSize(e.width, e.height), Rt.setRenderTarget(lt), Nn = new Wc(), Nn.overrideMaterial = TB, _n = t, jt.uniforms.tPosition.value = lt.texture, jt.uniforms.minHeight.value = r.minHeight, jt.uniforms.maxHeight.value = r.maxHeight, jt.uniforms.samples.value = r.samples, jt.uniforms.sampleStep.value = r.sampleStep, jt.uniforms.opacity.value = r.opacity, jt.blending = r.blendingType;
}
function CB(e) {
  lt.setSize(e.width * e.devicePixelRatio, e.height * e.devicePixelRatio), Rt.setPixelRatio(devicePixelRatio), Rt.setSize(e.width, e.height);
}
function EB(e) {
  if (Rt) {
    const t = _n.parent;
    Nn.add(_n), Rt.setRenderTarget(lt), Rt.render(Nn, e), t && t.add(_n), Rt.setRenderTarget(null);
  }
}
const Un = (e) => e.toString(), TB = new ar({
  vertexShader: Un`
        varying vec3 vPosition;
        void main() {
            vPosition =  (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
  fragmentShader: Un`
        varying vec3 vPosition;
        void main() {
            gl_FragColor = vec4(vPosition, 1.0);
        }
    `,
  side: No
}), bB = Un`
    #include <packing>

    varying vec2 vUv;
    varying vec3 vColor;
    uniform sampler2D tPosition;
    uniform float minHeight;
    uniform float maxHeight;
    uniform int samples;
    uniform float sampleStep;

    mat4 MVP;

    // Convert to normalized screen coordinates
    vec4 toNSC(const in vec4 v) {
        return vec4(0.5 * (v.xyz / v.w) + 0.5, v.w);
    }
    vec4 vertexDraping(
        const in sampler2D positionTex, // Position G-Buffer
        const in vec4 Vin // Vertex to drape
    ) {
        float texSize = float(textureSize(positionTex, 0).x);
        float pixelSize = 1.0 / texSize;
        vec2 stepSize = vec2(sampleStep/texSize);
        vec4 VinWorld = modelMatrix * Vin;

        vec4 lineStart = projectionMatrix * viewMatrix * vec4(VinWorld.x, minHeight, VinWorld.z, 1.0);
        vec4 lineEnd = projectionMatrix * viewMatrix * vec4(VinWorld.x, maxHeight, VinWorld.z, 1.0);

        vec4 Vout = VinWorld;

        // Binary search for line-terrain intersection
        float first = 0.0, last = 1.0;
        while(first <= last) {
            // Compute mid-point
            float mid = first + (last-first) / 2.0;
            // Compute texture coordinates along line
            vec4 texCoords = toNSC(mix(lineStart, lineEnd, mid));
            vec4 texSample = vec4(0.0); // Sample terrain
            for(int s = -samples; s < samples; s++) {
                for(int t = -samples; t < samples; t++) {
                    texSample += texture(positionTex,
                    texCoords.st + vec2(s,t) * stepSize);
                }
            }
            // Smooth samples obtain from G-Buffer
            texSample = texSample / (float(samples) * float(samples) * 4.0);
            float terrainHeight = texSample.y;
            Vout.y = terrainHeight;
           
            if((last-first) < pixelSize) { // Termination criteria
                return Vout;
            }
            // Perform intersection test
            float depthScene = toNSC(projectionMatrix * viewMatrix * Vout).y;
            if(depthScene >= texCoords.y) {
                first = mid;
            }
            else
                last = mid;
        }
        return Vout;
    }

    void main() {
        vColor = color;
        vUv = uv;
        MVP = projectionMatrix * modelViewMatrix;
        vec4 inputVertex = vec4(position, 1.0);
        vec4 outputVertex = vertexDraping(tPosition, inputVertex);
        vec4 finalPosition = projectionMatrix * viewMatrix * outputVertex;
        gl_Position = finalPosition;
    }
`, _B = Un`
    varying vec3 vColor;
    uniform float opacity;

    void main() {
        gl_FragColor = vec4(vColor, opacity);
    }
`, jt = new ar({
  vertexShader: bB,
  fragmentShader: _B,
  uniforms: {
    tPosition: { value: null },
    minHeight: { value: 0 },
    maxHeight: { value: 300 },
    opacity: { value: 0.5 },
    samples: { value: 4 },
    sampleStep: { value: 4 }
  },
  vertexColors: !0,
  transparent: !0,
  depthTest: !1,
  blending: cr
}), Fc = {
  // From chroma spectral http://gka.github.io/chroma.js/
  SPECTRAL: [
    [0, new _(0.3686, 0.3098, 0.6353)],
    [0.1, new _(0.1961, 0.5333, 0.7412)],
    [0.2, new _(0.4, 0.7608, 0.6471)],
    [0.3, new _(0.6706, 0.8667, 0.6431)],
    [0.4, new _(0.902, 0.9608, 0.5961)],
    [0.5, new _(1, 1, 0.749)],
    [0.6, new _(0.9961, 0.8784, 0.5451)],
    [0.7, new _(0.9922, 0.6824, 0.3804)],
    [0.8, new _(0.9569, 0.4275, 0.2627)],
    [0.9, new _(0.8353, 0.2431, 0.3098)],
    [1, new _(0.6196, 39e-4, 0.2588)]
  ],
  PLASMA: [
    [0, new _(0.241, 0.015, 0.61)],
    [0.1, new _(0.387, 1e-3, 0.654)],
    [0.2, new _(0.524, 0.025, 0.653)],
    [0.3, new _(0.651, 0.125, 0.596)],
    [0.4, new _(0.752, 0.227, 0.513)],
    [0.5, new _(0.837, 0.329, 0.431)],
    [0.6, new _(0.907, 0.435, 0.353)],
    [0.7, new _(0.963, 0.554, 0.272)],
    [0.8, new _(0.992, 0.681, 0.195)],
    [0.9, new _(0.987, 0.822, 0.144)],
    [1, new _(0.94, 0.975, 0.131)]
  ],
  YELLOW_GREEN: [
    [0, new _(0.1647, 0.2824, 0.3451)],
    [0.1, new _(0.1338, 0.3555, 0.4227)],
    [0.2, new _(0.061, 0.4319, 0.4864)],
    [0.3, new _(0, 0.5099, 0.5319)],
    [0.4, new _(0, 0.5881, 0.5569)],
    [0.5, new _(0.137, 0.665, 0.5614)],
    [0.6, new _(0.2906, 0.7395, 0.5477)],
    [0.7, new _(0.4453, 0.8099, 0.5201)],
    [0.8, new _(0.6102, 0.8748, 0.485)],
    [0.9, new _(0.7883, 0.9323, 0.4514)],
    [1, new _(0.9804, 0.9804, 0.4314)]
  ],
  VIRIDIS: [
    [0, new _(0.267, 5e-3, 0.329)],
    [0.1, new _(0.283, 0.141, 0.458)],
    [0.2, new _(0.254, 0.265, 0.53)],
    [0.3, new _(0.207, 0.372, 0.553)],
    [0.4, new _(0.164, 0.471, 0.558)],
    [0.5, new _(0.128, 0.567, 0.551)],
    [0.6, new _(0.135, 0.659, 0.518)],
    [0.7, new _(0.267, 0.749, 0.441)],
    [0.8, new _(0.478, 0.821, 0.318)],
    [0.9, new _(0.741, 0.873, 0.15)],
    [1, new _(0.993, 0.906, 0.144)]
  ],
  INFERNO: [
    [0, new _(0.077, 0.042, 0.206)],
    [0.1, new _(0.225, 0.036, 0.388)],
    [0.2, new _(0.373, 0.074, 0.432)],
    [0.3, new _(0.522, 0.128, 0.42)],
    [0.4, new _(0.665, 0.182, 0.37)],
    [0.5, new _(0.797, 0.255, 0.287)],
    [0.6, new _(0.902, 0.364, 0.184)],
    [0.7, new _(0.969, 0.516, 0.063)],
    [0.8, new _(0.988, 0.683, 0.072)],
    [0.9, new _(0.961, 0.859, 0.298)],
    [1, new _(0.988, 0.998, 0.645)]
  ],
  GRAYSCALE: [
    [0, new _(0, 0, 0)],
    [1, new _(1, 1, 1)]
  ],
  // 16 samples of the TURBU color scheme
  // values taken from: https://gist.github.com/mikhailov-work/ee72ba4191942acecc03fe6da94fc73f
  // original file licensed under Apache-2.0
  TURBO: [
    [0, new _(0.18995, 0.07176, 0.23217)],
    [0.07, new _(0.25107, 0.25237, 0.63374)],
    [0.13, new _(0.27628, 0.42118, 0.89123)],
    [0.2, new _(0.25862, 0.57958, 0.99876)],
    [0.27, new _(0.15844, 0.73551, 0.92305)],
    [0.33, new _(0.09267, 0.86554, 0.7623)],
    [0.4, new _(0.19659, 0.94901, 0.59466)],
    [0.47, new _(0.42778, 0.99419, 0.38575)],
    [0.53, new _(0.64362, 0.98999, 0.23356)],
    [0.6, new _(0.80473, 0.92452, 0.20459)],
    [0.67, new _(0.93301, 0.81236, 0.22667)],
    [0.73, new _(0.99314, 0.67408, 0.20348)],
    [0.8, new _(0.9836, 0.49291, 0.12849)],
    [0.87, new _(0.92105, 0.31489, 0.05475)],
    [0.93, new _(0.81608, 0.18462, 0.01809)],
    [1, new _(0.66449, 0.08436, 424e-5)]
  ],
  RAINBOW: [
    [0, new _(0.278, 0, 0.714)],
    [1 / 6, new _(0, 0, 1)],
    [2 / 6, new _(0, 1, 1)],
    [3 / 6, new _(0, 1, 0)],
    [4 / 6, new _(1, 1, 0)],
    [5 / 6, new _(1, 0.64, 0)],
    [1, new _(1, 0, 0)]
  ],
  CONTOUR: [
    [0, new _(0, 0, 0)],
    [0.03, new _(0, 0, 0)],
    [0.04, new _(1, 1, 1)],
    [1, new _(1, 1, 1)]
  ]
}, wB = `
  varying vec3 vColor;
  uniform float alpha;

  void main() {
    if (vColor == vec3(0.0, 0.0, 0.0)) {
      discard;
    } else {
      gl_FragColor = vec4( vColor, alpha);
    }
  }
`, RB = `
  varying vec3 vColor;
  uniform sampler2D gradient;
  uniform sampler2D grayscale;
  attribute float intensity;
  attribute float classification;
  uniform vec3 rootCenter;
  uniform vec3 rootNormal;
  uniform vec2 elevationRange;
  uniform int coloring;
  uniform bool hideGround;
  uniform float maxIntensity;
  uniform float intensityContrast;
  uniform float pointSize;

  #ifdef USE_COLOR
  vec3 getRGB() {
      vec3 rgb = color;
      return rgb;
  }
  #endif

  vec3 getElevation(){
    vec4 world = modelMatrix * vec4( position, 1.0 );
    float diff = abs(dot(rootNormal, (vec3(world) - rootCenter)));
    float w = max(diff - elevationRange.x,0.0) / max(elevationRange.y - elevationRange.x,1.0);
    vec3 cElevation = texture2D(gradient, vec2(w,1.0-w)).rgb;

    return cElevation;
  }

  vec3 getIntensity(){
    // TODO: real contrast enhancement. Check https://github.com/yuki-koyama/enhancer/blob/master/shaders/enhancer.fs
    float intmod = pow(intensity, intensityContrast);
    vec3 cIntensity = texture2D(grayscale, vec2(intmod / maxIntensity ,1.0-(intmod / maxIntensity))).rgb;
    return cIntensity;
  }

  vec3 getClassification(){
    float classNormalized = classification / 255.0;
    vec3 cClassification = texture2D(gradient, vec2(classNormalized * 5.0,1.0-classNormalized * 5.0)).rgb;
    return cClassification;
  }

  vec3 getColor(){
      vec3 color;
      if (hideGround && classification == 2.0) {
         return vec3(0.0, 0.0, 0.0);               
      }

      if (coloring == 1) {
        color = getIntensity();
      }
      else if (coloring == 2) {
        color = getClassification();
      } else if (coloring == 3) {
        color = getElevation();
      } 
      #ifdef USE_COLOR
      else if (coloring == 4) {
        color = getRGB();
      }
      #endif
      else {
        color = vec3(1.0, 1.0, 1.0);
      }
      return color;
  }

  void main() {
      vColor = getColor();

      gl_PointSize = pointSize;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;
var Oc = /* @__PURE__ */ ((e) => (e[e.Intensity = 1] = "Intensity", e[e.Classification = 2] = "Classification", e[e.Elevation = 3] = "Elevation", e[e.RGB = 4] = "RGB", e[e.White = 5] = "White", e))(Oc || {}), Hn = /* @__PURE__ */ ((e) => (e[e.FlatTexture = 1] = "FlatTexture", e[e.ShadedTexture = 2] = "ShadedTexture", e[e.ShadedNoTexture = 3] = "ShadedNoTexture", e))(Hn || {});
const MB = Fc.RAINBOW, SB = typeof document < "u" ? Ic(MB) : null, IB = Fc.GRAYSCALE, xB = typeof document < "u" ? Ic(IB) : null, vB = {
  throttleRequests: !0,
  maxRequests: 64,
  updateInterval: 0.1,
  maxConcurrency: 1,
  maximumScreenSpaceError: 16,
  memoryAdjustedScreenSpaceError: !0,
  maximumMemoryUsage: 400,
  memoryCacheOverflow: 128,
  viewDistanceScale: 1,
  skipLevelOfDetail: !1,
  resetTransform: !1,
  updateTransforms: !0,
  shading: Hn.FlatTexture,
  transparent: !1,
  pointCloudColoring: Oc.White,
  pointSize: 1,
  worker: !0,
  wireframe: !1,
  debug: !1,
  gltfLoader: null,
  basisTranscoderPath: null,
  dracoDecoderPath: null,
  material: null,
  contentPostProcess: void 0,
  preloadTilesCount: null,
  collectAttributions: !1
};
class HB {
  /**
  * Loads a tileset of 3D Tiles according to the given {@link LoaderProps}
  * @public
  *
  * @param props - Properties for this load call {@link LoaderProps}.
  * @returns An object containing the 3D Model to be added to the scene
  * and a runtime engine to be updated every frame.
  */
  static async load(t) {
    const n = { ...vB, ...t.options }, { url: s, renderer: r } = t;
    let { viewport: i } = t;
    const o = n.updateInterval, a = 5, c = {};
    if (n.cesiumIONToken) {
      c["cesium-ion"] = {
        accessToken: n.cesiumIONToken
      };
      const E = await Tc.preload(s, c);
      c.fetch = { headers: E.headers };
    }
    n.googleApiKey && (c.fetch = { headers: { "X-GOOG-API-KEY": n.googleApiKey } }, t.options.hasOwnProperty("collectAttributions") || (n.collectAttributions = !0)), t.loadingManager && t.loadingManager.itemStart(s);
    const u = await ge(s, De, {
      ...c
    }), l = {}, h = {}, f = [], d = new yn(), m = new yn();
    n.debug || (m.visible = !1);
    const g = {
      pointSize: { type: "f", value: n.pointSize },
      gradient: { type: "t", value: SB },
      grayscale: { type: "t", value: xB },
      rootCenter: { type: "vec3", value: new nt() },
      rootNormal: { type: "vec3", value: new nt() },
      coloring: { type: "i", value: n.pointCloudColoring },
      hideGround: { type: "b", value: !0 },
      elevationRange: { type: "vec2", value: new Uo(0, 400) },
      maxIntensity: { type: "f", value: 1 },
      intensityContrast: { type: "f", value: 1 },
      alpha: { type: "f", value: 1 }
    }, p = new ar({
      uniforms: g,
      vertexShader: RB,
      fragmentShader: wB,
      transparent: n.transparent,
      vertexColors: !0
    });
    let C, w, y;
    n.gltfLoader ? C = n.gltfLoader : (C = new Yc(), n.basisTranscoderPath && (w = new Zc(), w.detectSupport(r ?? new Xc()), w.setTranscoderPath(n.basisTranscoderPath + "/"), w.setWorkerLimit(1), C.setKTX2Loader(w)), n.dracoDecoderPath && (y = new $c(), y.setDecoderPath(n.dracoDecoderPath + "/"), y.setWorkerLimit(n.maxConcurrency), C.setDRACOLoader(y)));
    const B = new Gs({ transparent: n.transparent }), R = {
      maximumMemoryUsage: n.maximumMemoryUsage,
      maximumScreenSpaceError: n.maximumScreenSpaceError,
      memoryAdjustedScreenSpaceError: n.memoryAdjustedScreenSpaceError,
      memoryCacheOverflow: n.memoryCacheOverflow,
      viewDistanceScale: n.viewDistanceScale,
      skipLevelOfDetail: n.skipLevelOfDetail,
      updateTransforms: n.updateTransforms,
      throttleRequests: n.throttleRequests,
      maxRequests: n.maxRequests,
      contentLoader: async (E) => {
        let O = null;
        switch (E.type) {
          case qt.POINTCLOUD: {
            O = OB(E, p, n, Lt);
            break;
          }
          case qt.SCENEGRAPH:
          case qt.MESH: {
            O = await FB(C, E, B, n, Lt);
            break;
          }
        }
        if (O && (O.visible = !1, l[E.id] = O, d.add(l[E.id]), n.debug)) {
          const et = Lo(E);
          m.add(et), h[E.id] = et;
        }
      },
      onTileLoad: async (E) => {
        T && (n.resetTransform && !D && (E == null ? void 0 : E.depth) <= a && Wt(E), zt = !0);
      },
      onTileUnload: (E) => {
        f.push(E);
      },
      onTileError: (E, O) => {
        console.warn("Tile error", E.id, O);
      },
      onTraversalComplete(E) {
        return n.collectAttributions && (k = LB(E)), E;
      }
    }, T = new nm(u, {
      ...R,
      loadOptions: {
        ...c,
        maxConcurrency: n.maxConcurrency,
        worker: n.worker,
        gltf: {
          loadImages: !1
        },
        "3d-tiles": {
          loadGLTF: !1
        }
      }
    }), v = new Y(), F = new Y(), x = new nt();
    let D = !1, k = "";
    if (T.root.boundingVolume ? (T.root.header.boundingVolume.region && console.warn("Cannot apply a model matrix to bounding volumes of type region. Tileset stays in original geo-coordinates."), F.setPosition(
      T.root.boundingVolume.center[0],
      T.root.boundingVolume.center[1],
      T.root.boundingVolume.center[2]
    )) : console.warn("Bounding volume not found, no transformations applied"), n.debug) {
      const E = Lo(T.root);
      m.add(E), h[T.root.id] = E;
    }
    let W = !1, X = !1;
    g.rootCenter.value.copy(x), g.rootNormal.value.copy(new nt(0, 0, 1).normalize()), T.stats.get("Loader concurrency").count = n.maxConcurrency, T.stats.get("Maximum mem usage").count = n.maximumMemoryUsage;
    let L = 0, ot = null, zt = !0, ie = null;
    const ye = new nt(1 / 0, 1 / 0, 1 / 0);
    let Dt = null;
    d.updateMatrixWorld(!0);
    const tt = new Y().copy(d.matrixWorld), Lt = new Y().copy(tt).invert();
    n.resetTransform && Wt(T.root), n.debug && (h[T.root.id].applyMatrix4(v), m.matrixWorld.copy(d.matrixWorld));
    function Wt(E) {
      if (!E.boundingVolume.halfAxes)
        return;
      const O = E.boundingVolume.halfAxes, et = new Y().extractRotation(xc(O)).premultiply(new Y().extractRotation(Lt));
      if (!new es().setFromRotationMatrix(et).equals(new es())) {
        D = !0;
        const bt = new nt(
          F.elements[12],
          F.elements[13],
          F.elements[14]
        );
        F.extractRotation(et), F.setPosition(bt);
      }
      Be();
    }
    function Be() {
      v.copy(tt), n.resetTransform && v.multiply(new Y().copy(F).invert()), T.modelMatrix = new V(v.toArray());
    }
    function qe(E, O, et, at) {
      if (W || !at)
        return;
      Dt || (Dt = new vn({
        fov: at.fov / 180 * Math.PI,
        aspectRatio: at.aspect,
        near: at.near,
        far: at.far
      }).sseDenominator, n.debug && console.log("Updated sse denonimator:", Dt));
      const Zn = Do(at).planes.map((Q) => new Z(Q.normal.toArray(), Q.constant)), Dc = new ft(Zn), Ur = {
        camera: {
          position: ye.toArray()
        },
        height: et.height * et.devicePixelRatio,
        frameNumber: E._frameNumber,
        sseDenominator: Dt,
        cullingVolume: Dc,
        viewport: {
          id: 0
        }
      };
      E._cache.reset(), E._traverser.traverse(E.root, Ur, E.options);
      for (const Q of E.tiles)
        Q.selected ? O[Q.id] ? O[Q.id].visible = !0 : console.error("TILE SELECTED BUT NOT LOADED!!", Q.id) : O[Q.id] && (O[Q.id].visible = !1);
      for (; f.length > 0; ) {
        const Q = f.pop();
        O[Q.id] && Q.contentState == ut.UNLOADED && (d.remove(O[Q.id]), Ps(O[Q.id]), delete O[Q.id]), h[Q.id] && (Ps(h[Q.id]), m.remove(h[Q.id]), delete h[Q.id]);
      }
      const ts = E.stats.get("Tiles Loaded").count, Hr = E.stats.get("Tiles Loading").count;
      return t.onProgress && t.onProgress(
        ts,
        ts + Hr
      ), t.loadingManager && !X && Hr == 0 && (n.preloadTilesCount == null || ts >= n.preloadTilesCount) && (X = !0, t.loadingManager.itemEnd(t.url)), Ur;
    }
    function $n(E) {
      const O = new nt(), et = new Qc(), at = new nt();
      E.decompose(O, et, at), d.position.copy(O), d.quaternion.copy(et), d.scale.copy(at), d.updateMatrix(), d.updateMatrixWorld(!0), tt.copy(d.matrixWorld), Lt.copy(tt).invert(), Be();
    }
    return {
      model: d,
      runtime: {
        getTileset: () => T,
        getStats: () => T.stats,
        getDataAttributions: () => k,
        showTiles: (E) => {
          m.visible = E;
        },
        setWireframe: (E) => {
          n.wireframe = E, d.traverse((O) => {
            O instanceof Ns && (O.material.wireframe = E);
          });
        },
        setDebug: (E) => {
          n.debug = E, m.visible = E;
        },
        setShading: (E) => {
          n.shading = E;
        },
        getTileBoxes: () => m,
        setViewDistanceScale: (E) => {
          T.options.viewDistanceScale = E, T._frameNumber++, qe(T, l, i, ie);
        },
        setMaximumScreenSpaceError: (E) => {
          T.options.maximumScreenSpaceError = E, T._frameNumber++, qe(T, l, i, ie);
        },
        setHideGround: (E) => {
          g.hideGround.value = E;
        },
        setPointCloudColoring: (E) => {
          g.coloring.value = E;
        },
        setElevationRange: (E) => {
          g.elevationRange.value.set(E[0], E[1]);
        },
        setMaxIntensity: (E) => {
          g.maxIntensity.value = E;
        },
        setIntensityContrast: (E) => {
          g.intensityContrast.value = E;
        },
        setPointAlpha: (E) => {
          g.alpha.value = E;
        },
        getLatLongHeightFromPosition: (E) => {
          const O = T.ellipsoid.cartesianToCartographic(
            new nt().copy(E).applyMatrix4(new Y().copy(v).invert()).toArray()
          );
          return {
            lat: O[1],
            long: O[0],
            height: O[2]
          };
        },
        getPositionFromLatLongHeight: (E) => {
          const O = T.ellipsoid.cartographicToCartesian([
            E.long,
            E.lat,
            E.height
          ]);
          return new nt(...O).applyMatrix4(v);
        },
        orientToGeocoord: (E) => {
          const O = [E.long, E.lat, E.height], et = T.ellipsoid.cartographicToCartesian(O), at = new Y().fromArray(T.ellipsoid.eastNorthUpToFixedFrame(et)), bt = new Y().makeRotationFromEuler(
            new es(Math.PI / 2, Math.PI / 2, 0)
          ), Zn = new Y().copy(at).multiply(bt).invert();
          $n(Zn);
        },
        getWebMercatorCoord: (E) => pB(E.lat, E.long),
        getCameraFrustum: (E) => {
          const et = Do(E).planes.map((bt) => new Z(bt.normal.toArray(), bt.constant)).map((bt) => AB(bt)), at = new yn();
          for (const bt of et)
            at.add(bt);
          return at;
        },
        overlayGeoJSON: (E, O) => {
          if (E.applyMatrix4(v), E.updateMatrixWorld(), !r)
            throw new Error("GeoJSON draping requires a rendere reference via LoaderProps");
          return BB(i, d, r, O), E.material.dispose(), E.material = jt, E;
        },
        setViewport: (E) => {
          i = E, Dt = null, zt = !0, lt && CB(i);
        },
        update: function(E, O) {
          if (ie = O, L += E, lt && EB(O), T && L >= o) {
            if (!tt.equals(d.matrixWorld)) {
              L = 0, tt.copy(d.matrixWorld), n.updateTransforms && Be();
              const et = new nt().setFromMatrixPosition(tt);
              g.rootCenter.value.copy(et), g.rootNormal.value.copy(new nt(0, 0, 1).applyMatrix4(tt).normalize()), Lt.copy(tt).invert(), n.debug && (h[T.root.id].matrixWorld.copy(v), h[T.root.id].applyMatrix4(tt));
            }
            ot == null ? ot = new Y().copy(O.matrixWorld) : (zt || DB(O, ot)) && (L = 0, zt = !1, T._frameNumber++, O.getWorldPosition(ye), ot.copy(O.matrixWorld), qe(T, l, i, O));
          }
        },
        dispose: function() {
          for (W = !0, T._destroy(); d.children.length > 0; ) {
            const E = d.children[0];
            Ps(E), d.remove(E);
          }
          for (; m.children.length > 0; ) {
            const E = m.children[0];
            m.remove(E), E.geometry.dispose(), E.material.dispose();
          }
          w && w.dispose(), y && y.dispose();
        }
      }
    };
  }
  /**
  * Loads a tileset of 3D Tiles according to the given {@link GeoJSONLoaderProps}
  * Could be overlayed on geograpical 3D Tiles using {@link Runtime.overlayGeoJSON}
  * @public
  *
  * @param props - Properties for this load call {@link GeoJSONLoaderProps}.
  * @returns An object containing the 3D Model to be added to the scene
  */
  static async loadGeoJSON(t) {
    const { url: n, height: s, featureToColor: r } = t;
    return ge(n, Ve, { worker: !1, gis: { format: "binary" } }).then((i) => {
      const o = i, a = new Ho(), c = o.polygons.positions.value.reduce((h, f, d, m) => {
        if (d % 2 == 0) {
          const g = [f, m[d + 1], s ?? 0], p = J.WGS84.cartographicToCartesian(g);
          h.push(...p);
        }
        return h;
      }, []);
      if (a.setAttribute("position", new wn(
        c,
        3
      )), r) {
        const h = o.polygons.numericProps[r.feature].value.reduce((f, d, m, g) => {
          const p = r.colorMap(d);
          return f[m * 3] = p.r, f[m * 3 + 1] = p.g, f[m * 3 + 2] = p.b, f;
        }, []);
        a.setAttribute("color", new wn(
          h,
          3
        ));
      }
      a.setIndex(
        new Jo(o.polygons.triangles.value, 1)
      );
      const u = new Gs({
        transparent: !0,
        vertexColors: !0,
        opacity: 0.5,
        blending: cr
      });
      return new Ns(a, u);
    });
  }
}
async function FB(e, t, n, s, r) {
  return new Promise((i, o) => {
    const a = new Y().makeRotationAxis(new nt(1, 0, 0), Math.PI / 2), c = t.content.gltfUpAxis !== "Z", u = new Y().fromArray(t.computedTransform).premultiply(r);
    c && u.multiply(a), t.content.byteLength || (t.content.byteLength = t.content.gltfArrayBuffer.byteLength), e.parse(
      t.content.gltfArrayBuffer,
      t.contentUrl ? t.contentUrl.substr(0, t.contentUrl.lastIndexOf("/") + 1) : null,
      (l) => {
        t.userData.asset = l.asset;
        const h = l.scenes[0];
        h.applyMatrix4(u), t.content.texturesByteLength = 0, t.content.geometriesByteLength = 0, h.traverse((f) => {
          if (f.type == "Mesh") {
            const d = f;
            t.content.geometriesByteLength += vc(d.geometry);
            const m = d.material, g = m.map;
            if (g) {
              const p = yB(g);
              p && (t.content.texturesByteLength += p);
            }
            s.material ? (d.material = s.material.clone(), m.dispose()) : s.shading == Hn.FlatTexture && d.material.type !== "MeshBasicMaterial" && (d.material = n.clone(), m.dispose()), s.shading != Hn.ShadedNoTexture ? d.material.type == "ShaderMaterial" ? d.material.uniforms.map = { value: g } : d.material.map = g : (g && g.dispose(), d.material.map = null), d.material.wireframe = s.wireframe, s.contentPostProcess && s.contentPostProcess(d);
          }
        }), t.content.gpuMemoryUsageInBytes = t.content.texturesByteLength + t.content.geometriesByteLength, i(h);
      },
      (l) => {
        o(new Error(`error parsing gltf in tile ${t.id}: ${l}`));
      }
    );
  });
}
function OB(e, t, n, s) {
  const r = {
    rtc_center: e.content.rtcCenter,
    // eslint-disable-line camelcase
    points: e.content.attributes.positions,
    intensities: e.content.attributes.intensity,
    classifications: e.content.attributes.classification,
    rgb: null,
    rgba: null
  }, { colors: i } = e.content.attributes;
  i && i.size === 3 && (r.rgb = i.value), i && i.size === 4 && (r.rgba = i.value);
  const o = new Ho();
  o.setAttribute("position", new wn(r.points, 3));
  const a = new Y().fromArray(e.computedTransform).premultiply(s);
  r.rgba ? o.setAttribute("color", new wn(r.rgba, 4)) : r.rgb && o.setAttribute("color", new jr(r.rgb, 3, !0)), r.intensities && o.setAttribute(
    "intensity",
    // Handles both 16bit or 8bit intensity values
    new Jo(r.intensities, 1, !0)
  ), r.classifications && o.setAttribute("classification", new jr(r.classifications, 1, !1)), e.content.geometriesByteLength = vc(o), e.content.gpuMemoryUsageInBytes = e.content.geometriesByteLength;
  const c = new qc(o, n.material || t);
  if (r.rtc_center) {
    const u = r.rtc_center;
    a.multiply(new Y().makeTranslation(u[0], u[1], u[2]));
  }
  return c.applyMatrix4(a), n.contentPostProcess && n.contentPostProcess(c), c;
}
function Go(e) {
  var t, n, s, r;
  (t = e == null ? void 0 : e.uniforms) != null && t.map ? (s = (n = e == null ? void 0 : e.uniforms) == null ? void 0 : n.map.value) == null || s.dispose() : e.map && ((r = e.map) == null || r.dispose()), e.dispose();
}
function Ps(e) {
  e.traverse((t) => {
    if (t.isMesh)
      if (t.geometry.dispose(), t.material.isMaterial)
        Go(t.material);
      else
        for (const n of t.material)
          Go(n);
  });
  for (let t = e.children.length - 1; t >= 0; t--) {
    const n = e.children[t];
    e.remove(n);
  }
}
function DB(e, t) {
  return !e.matrixWorld.equals(t);
}
function LB(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    var o, a;
    const i = (a = (o = r == null ? void 0 : r.userData) == null ? void 0 : o.asset) == null ? void 0 : a.copyright;
    i && i.split(/;/g).map((u) => u.trim()).forEach((u) => {
      u && t.set(u, (t.get(u) || 0) + 1);
    });
  }), Array.from(t).sort((r, i) => i[1] - r[1]).map(([r]) => r).join("; ");
}
export {
  HB as Loader3DTiles,
  Oc as PointCloudColoring,
  Hn as Shading
};
