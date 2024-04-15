import { CanvasTexture as _c, LinearFilter as wc, RepeatWrapping as Dr, Frustum as Rc, Matrix4 as Z, Group as gn, PlaneGeometry as Mc, Vector3 as st, MeshBasicMaterial as Os, DoubleSide as Ic, Mesh as Fs, ArrowHelper as Sc, Color as _, BoxGeometry as xc, EdgesGeometry as Oc, LineSegments as Fc, LineBasicMaterial as vc, Vector2 as vs, ShaderMaterial as Dc, Euler as Qn, BufferGeometry as So, Float32BufferAttribute as En, BufferAttribute as xo, Quaternion as Lc, Uint8BufferAttribute as Lr, Points as Gc } from "three";
import { GLTFLoader as Pc } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader as Nc } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader as Uc } from "three/examples/jsm/loaders/KTX2Loader.js";
async function He(e, t, n, s) {
  return s._parse(e, t, n, s);
}
function U(e, t) {
  if (!e)
    throw new Error(t || "loader assertion failed.");
}
const Ln = !!(typeof process != "object" || String(process) !== "[object process]" || process.browser), Gr = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
Gr && parseFloat(Gr[1]);
function Hc(e, t) {
  return Oo(e || {}, t);
}
function Oo(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  if (n > 3)
    return t;
  const s = {
    ...e
  };
  for (const [r, i] of Object.entries(t))
    i && typeof i == "object" && !Array.isArray(i) ? s[r] = Oo(s[r] || {}, t[r], n + 1) : s[r] = t[r];
  return s;
}
const Jc = "latest";
function Vc() {
  var e;
  return (e = globalThis._loadersgl_) !== null && e !== void 0 && e.version || (globalThis._loadersgl_ = globalThis._loadersgl_ || {}, globalThis._loadersgl_.version = "4.1.1"), globalThis._loadersgl_.version;
}
const Fo = Vc();
function Pt(e, t) {
  if (!e)
    throw new Error(t || "loaders.gl assertion failed.");
}
const Et = typeof process != "object" || String(process) !== "[object process]" || process.browser, nr = typeof importScripts == "function", jc = typeof window < "u" && typeof window.orientation < "u", Pr = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
Pr && parseFloat(Pr[1]);
class kc {
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
    Pt(this.isRunning), this.isRunning = !1, this._resolve(t);
  }
  error(t) {
    Pt(this.isRunning), this.isRunning = !1, this._reject(t);
  }
}
class qn {
  terminate() {
  }
}
const Yn = /* @__PURE__ */ new Map();
function Kc(e) {
  Pt(e.source && !e.url || !e.source && e.url);
  let t = Yn.get(e.source || e.url);
  return t || (e.url && (t = zc(e.url), Yn.set(e.url, t)), e.source && (t = vo(e.source), Yn.set(e.source, t))), Pt(t), t;
}
function zc(e) {
  if (!e.startsWith("http"))
    return e;
  const t = Wc(e);
  return vo(t);
}
function vo(e) {
  const t = new Blob([e], {
    type: "application/javascript"
  });
  return URL.createObjectURL(t);
}
function Wc(e) {
  return `try {
  importScripts('${e}');
} catch (error) {
  console.error(error);
  throw error;
}`;
}
function Do(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = n || /* @__PURE__ */ new Set();
  if (e) {
    if (Nr(e))
      s.add(e);
    else if (Nr(e.buffer))
      s.add(e.buffer);
    else if (!ArrayBuffer.isView(e)) {
      if (t && typeof e == "object")
        for (const r in e)
          Do(e[r], t, s);
    }
  }
  return n === void 0 ? Array.from(s) : [];
}
function Nr(e) {
  return e ? e instanceof ArrayBuffer || typeof MessagePort < "u" && e instanceof MessagePort || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas : !1;
}
const $n = () => {
};
class Ds {
  static isSupported() {
    return typeof Worker < "u" && Et || typeof qn < "u" && !Et;
  }
  constructor(t) {
    this.name = void 0, this.source = void 0, this.url = void 0, this.terminated = !1, this.worker = void 0, this.onMessage = void 0, this.onError = void 0, this._loadableURL = "";
    const {
      name: n,
      source: s,
      url: r
    } = t;
    Pt(s || r), this.name = n, this.source = s, this.url = r, this.onMessage = $n, this.onError = (i) => console.log(i), this.worker = Et ? this._createBrowserWorker() : this._createNodeWorker();
  }
  destroy() {
    this.onMessage = $n, this.onError = $n, this.worker.terminate(), this.terminated = !0;
  }
  get isRunning() {
    return !!this.onMessage;
  }
  postMessage(t, n) {
    n = n || Do(t), this.worker.postMessage(t, n);
  }
  _getErrorFromErrorEvent(t) {
    let n = "Failed to load ";
    return n += `worker ${this.name} from ${this.url}. `, t.message && (n += `${t.message} in `), t.lineno && (n += `:${t.lineno}:${t.colno}`), new Error(n);
  }
  _createBrowserWorker() {
    this._loadableURL = Kc({
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
      t = new qn(s, {
        eval: !1
      });
    } else if (this.source)
      t = new qn(this.source, {
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
class Xc {
  static isSupported() {
    return Ds.isSupported();
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
      const s = new kc(n.name, t);
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
    !Et || this.isDestroyed || !this.reuseWorkers || this.count > this._getMaxConcurrency() ? (t.destroy(), this.count--) : this.idleQueue.push(t), this.isDestroyed || this._startQueuedJob();
  }
  _getAvailableWorker() {
    if (this.idleQueue.length > 0)
      return this.idleQueue.shift() || null;
    if (this.count < this._getMaxConcurrency()) {
      this.count++;
      const t = `${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`;
      return new Ds({
        name: t,
        source: this.source,
        url: this.url
      });
    }
    return null;
  }
  _getMaxConcurrency() {
    return jc ? this.maxMobileConcurrency : this.maxConcurrency;
  }
}
const Qc = {
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: !0,
  onDebug: () => {
  }
};
class Dt {
  static isSupported() {
    return Ds.isSupported();
  }
  static getWorkerFarm() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Dt._workerFarm = Dt._workerFarm || new Dt({}), Dt._workerFarm.setProps(t), Dt._workerFarm;
  }
  constructor(t) {
    this.props = void 0, this.workerPools = /* @__PURE__ */ new Map(), this.props = {
      ...Qc
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
    return i || (i = new Xc({
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
Dt._workerFarm = void 0;
function qc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const n = t[e.id] || {}, s = Et ? `${e.id}-worker.js` : `${e.id}-worker-node.js`;
  let r = n.workerUrl;
  if (!r && e.id === "compression" && (r = t.workerUrl), t._workerType === "test" && (Et ? r = `modules/${e.module}/dist/${s}` : r = `modules/${e.module}/src/workers/${e.id}-worker-node.ts`), !r) {
    let i = e.version;
    i === "latest" && (i = Jc);
    const o = i ? `@${i}` : "";
    r = `https://unpkg.com/@loaders.gl/${e.module}${o}/dist/${s}`;
  }
  return Pt(r), r;
}
function Yc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Fo;
  Pt(e, "no worker provided");
  const n = e.version;
  return !(!t || !n);
}
const $c = {}, Zc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $c
}, Symbol.toStringTag, { value: "Module" })), Zn = {};
async function Xt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  return t && (e = tu(e, t, n, s)), Zn[e] = Zn[e] || eu(e), await Zn[e];
}
function tu(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  if (!n.useLocalLibraries && e.startsWith("http"))
    return e;
  s = s || e;
  const r = n.modules || {};
  return r[s] ? r[s] : Et ? n.CDN ? (Pt(n.CDN.startsWith("http")), `${n.CDN}/${t}@${Fo}/dist/libs/${s}`) : nr ? `../src/libs/${s}` : `modules/${t}/src/libs/${s}` : `modules/${t}/dist/libs/${s}`;
}
async function eu(e) {
  if (e.endsWith("wasm"))
    return await su(e);
  if (!Et)
    try {
      return Zc && void 0;
    } catch (n) {
      return console.error(n), null;
    }
  if (nr)
    return importScripts(e);
  const t = await ru(e);
  return nu(t, e);
}
function nu(e, t) {
  if (!Et)
    return;
  if (nr)
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
async function su(e) {
  return await (await fetch(e)).arrayBuffer();
}
async function ru(e) {
  return await (await fetch(e)).text();
}
function iu(e, t) {
  return !Dt.isSupported() || !Et && !(t != null && t._nodeWorkers) ? !1 : e.worker && (t == null ? void 0 : t.worker);
}
async function ou(e, t, n, s, r) {
  const i = e.id, o = qc(e, n), c = Dt.getWorkerFarm(n).getWorkerPool({
    name: i,
    url: o
  });
  n = JSON.parse(JSON.stringify(n)), s = JSON.parse(JSON.stringify(s || {}));
  const u = await c.startJob("process-on-worker", au.bind(null, r));
  return u.postMessage("process", {
    input: t,
    options: n,
    context: s
  }), await (await u.result).result;
}
async function au(e, t, n, s) {
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
function cu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
  return typeof e == "string" ? e.slice(0, t) : ArrayBuffer.isView(e) ? Ur(e.buffer, e.byteOffset, t) : e instanceof ArrayBuffer ? Ur(e, 0, t) : "";
}
function Ur(e, t, n) {
  if (e.byteLength <= t + n)
    return "";
  const s = new DataView(e);
  let r = "";
  for (let i = 0; i < n; i++)
    r += String.fromCharCode(s.getUint8(t + i));
  return r;
}
function uu(e) {
  try {
    return JSON.parse(e);
  } catch {
    throw new Error(`Failed to parse JSON from data starting with "${cu(e)}"`);
  }
}
function lu(e, t, n) {
  if (n = n || e.byteLength, e.byteLength < n || t.byteLength < n)
    return !1;
  const s = new Uint8Array(e), r = new Uint8Array(t);
  for (let i = 0; i < s.length; ++i)
    if (s[i] !== r[i])
      return !1;
  return !0;
}
function hu() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return fu(t);
}
function fu(e) {
  const t = e.map((i) => i instanceof ArrayBuffer ? new Uint8Array(i) : i), n = t.reduce((i, o) => i + o.byteLength, 0), s = new Uint8Array(n);
  let r = 0;
  for (const i of t)
    s.set(i, r), r += i.byteLength;
  return s.buffer;
}
function sr(e, t, n) {
  const s = n !== void 0 ? new Uint8Array(e).subarray(t, t + n) : new Uint8Array(e).subarray(t);
  return new Uint8Array(s).buffer;
}
function Je(e, t) {
  return U(e >= 0), U(t > 0), e + (t - 1) & ~(t - 1);
}
function du(e, t, n) {
  let s;
  if (e instanceof ArrayBuffer)
    s = new Uint8Array(e);
  else {
    const r = e.byteOffset, i = e.byteLength;
    s = new Uint8Array(e.buffer || e.arrayBuffer, r, i);
  }
  return t.set(s, n), n + Je(s.byteLength, 4);
}
async function mu(e) {
  const t = [];
  for await (const n of e)
    t.push(n);
  return hu(...t);
}
function Hr() {
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
class Jr {
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
    return this._startTime = Hr(), this._timerPending = !0, this;
  }
  timeEnd() {
    return this._timerPending ? (this.addTime(Hr() - this._startTime), this._timerPending = !1, this._checkSampling(), this) : this;
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
class Lo {
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
    return r || (t instanceof Jr ? r = t : r = new Jr(n, s), this.stats[n] = r), r;
  }
}
const gu = "Queued Requests", Au = "Active Requests", pu = "Cancelled Requests", yu = "Queued Requests Ever", Bu = "Active Requests Ever", Cu = {
  id: "request-scheduler",
  throttleRequests: !0,
  maxRequests: 6
};
class Eu {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.props = void 0, this.stats = void 0, this.activeRequestCount = 0, this.requestQueue = [], this.requestMap = /* @__PURE__ */ new Map(), this.deferredUpdate = null, this.props = {
      ...Cu,
      ...t
    }, this.stats = new Lo({
      id: this.props.id
    }), this.stats.get(gu), this.stats.get(Au), this.stats.get(pu), this.stats.get(yu), this.stats.get(Bu);
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
let Tu = "";
const Vr = {};
function bu(e) {
  for (const t in Vr)
    if (e.startsWith(t)) {
      const n = Vr[t];
      e = e.replace(t, n);
    }
  return !e.startsWith("http://") && !e.startsWith("https://") && (e = `${Tu}${e}`), e;
}
function _u(e) {
  return e && typeof e == "object" && e.isBuffer;
}
function Go(e) {
  if (_u(e))
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
function wu() {
  var e;
  if (typeof process < "u" && typeof process.cwd < "u")
    return process.cwd();
  const t = (e = window.location) === null || e === void 0 ? void 0 : e.pathname;
  return (t == null ? void 0 : t.slice(0, t.lastIndexOf("/") + 1)) || "";
}
function Po(e) {
  const t = e ? e.lastIndexOf("/") : -1;
  return t >= 0 ? e.substr(t + 1) : "";
}
function rr(e) {
  const t = e ? e.lastIndexOf("/") : -1;
  return t >= 0 ? e.substr(0, t) : "";
}
function Ru() {
  const e = [];
  for (let r = 0; r < arguments.length; r++)
    e[r] = r < 0 || arguments.length <= r ? void 0 : arguments[r];
  let t = "", n = !1, s;
  for (let r = e.length - 1; r >= -1 && !n; r--) {
    let i;
    r >= 0 ? i = e[r] : (s === void 0 && (s = wu()), i = s), i.length !== 0 && (t = `${i}/${t}`, n = i.charCodeAt(0) === we);
  }
  return t = Mu(t, !n), n ? `/${t}` : t.length > 0 ? t : ".";
}
const we = 47, ts = 46;
function Mu(e, t) {
  let n = "", s = -1, r = 0, i, o = !1;
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length)
      i = e.charCodeAt(a);
    else {
      if (i === we)
        break;
      i = we;
    }
    if (i === we) {
      if (!(s === a - 1 || r === 1))
        if (s !== a - 1 && r === 2) {
          if (n.length < 2 || !o || n.charCodeAt(n.length - 1) !== ts || n.charCodeAt(n.length - 2) !== ts) {
            if (n.length > 2) {
              const c = n.length - 1;
              let u = c;
              for (; u >= 0 && n.charCodeAt(u) !== we; --u)
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
      i === ts && r !== -1 ? ++r : r = -1;
  }
  return n;
}
const Iu = (e) => typeof e == "boolean", Me = (e) => typeof e == "function", Ve = (e) => e !== null && typeof e == "object", jr = (e) => Ve(e) && e.constructor === {}.constructor, Su = (e) => !!e && typeof e[Symbol.iterator] == "function", xu = (e) => e && typeof e[Symbol.asyncIterator] == "function", $t = (e) => typeof Response < "u" && e instanceof Response || e && e.arrayBuffer && e.text && e.json, Zt = (e) => typeof Blob < "u" && e instanceof Blob, Ou = (e) => e && typeof e == "object" && e.isBuffer, Fu = (e) => typeof ReadableStream < "u" && e instanceof ReadableStream || Ve(e) && Me(e.tee) && Me(e.cancel) && Me(e.getReader), vu = (e) => Ve(e) && Me(e.read) && Me(e.pipe) && Iu(e.readable), No = (e) => Fu(e) || vu(e), Du = /^data:([-\w.]+\/[-\w.+]+)(;|,)/, Lu = /^([-\w.]+\/[-\w.+]+)/;
function Gu(e) {
  const t = Lu.exec(e);
  return t ? t[1] : e;
}
function kr(e) {
  const t = Du.exec(e);
  return t ? t[1] : "";
}
const Uo = /\?.*/;
function Pu(e) {
  const t = e.match(Uo);
  return t && t[0];
}
function ir(e) {
  return e.replace(Uo, "");
}
function Gn(e) {
  return $t(e) ? e.url : Zt(e) ? e.name || "" : typeof e == "string" ? e : "";
}
function or(e) {
  if ($t(e)) {
    const t = e, n = t.headers.get("content-type") || "", s = ir(t.url);
    return Gu(n) || kr(s);
  }
  return Zt(e) ? e.type || "" : typeof e == "string" ? kr(e) : "";
}
function Nu(e) {
  return $t(e) ? e.headers["content-length"] || -1 : Zt(e) ? e.size : typeof e == "string" ? e.length : e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? e.byteLength : -1;
}
async function Ho(e) {
  if ($t(e))
    return e;
  const t = {}, n = Nu(e);
  n >= 0 && (t["content-length"] = String(n));
  const s = Gn(e), r = or(e);
  r && (t["content-type"] = r);
  const i = await Ju(e);
  i && (t["x-first-bytes"] = i), typeof e == "string" && (e = new TextEncoder().encode(e));
  const o = new Response(e, {
    headers: t
  });
  return Object.defineProperty(o, "url", {
    value: s
  }), o;
}
async function Uu(e) {
  if (!e.ok) {
    const t = await Hu(e);
    throw new Error(t);
  }
}
async function Hu(e) {
  let t = `Failed to fetch resource ${e.url} (${e.status}): `;
  try {
    const n = e.headers.get("Content-Type");
    let s = e.statusText;
    n != null && n.includes("application/json") && (s += ` ${await e.text()}`), t += s, t = t.length > 60 ? `${t.slice(0, 60)}...` : t;
  } catch {
  }
  return t;
}
async function Ju(e) {
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
    return `data:base64,${Vu(n)}`;
  }
  return null;
}
function Vu(e) {
  let t = "";
  const n = new Uint8Array(e);
  for (let s = 0; s < n.byteLength; s++)
    t += String.fromCharCode(n[s]);
  return btoa(t);
}
function ju(e) {
  return !ku(e) && !Ku(e);
}
function ku(e) {
  return e.startsWith("http:") || e.startsWith("https:");
}
function Ku(e) {
  return e.startsWith("data:");
}
async function Fe(e, t) {
  if (typeof e == "string") {
    const r = bu(e);
    if (ju(r)) {
      var n;
      if ((n = globalThis.loaders) !== null && n !== void 0 && n.fetchNode) {
        var s;
        return (s = globalThis.loaders) === null || s === void 0 ? void 0 : s.fetchNode(r, t);
      }
    }
    return await fetch(r, t);
  }
  return await Ho(e);
}
function zu(e) {
  if (typeof window < "u" && typeof window.process == "object" && window.process.type === "renderer" || typeof process < "u" && typeof process.versions == "object" && process.versions.electron)
    return !0;
  const t = typeof navigator == "object" && typeof navigator.userAgent == "string" && navigator.userAgent, n = e || t;
  return !!(n && n.indexOf("Electron") >= 0);
}
function je() {
  return !(typeof process == "object" && String(process) === "[object process]" && !process.browser) || zu();
}
const Xe = globalThis.window || globalThis.self || globalThis.global, pe = globalThis.process || {}, Jo = typeof __VERSION__ < "u" ? __VERSION__ : "untranspiled source";
je();
function Wu(e) {
  try {
    const t = window[e], n = "__storage_test__";
    return t.setItem(n, n), t.removeItem(n), t;
  } catch {
    return null;
  }
}
class Xu {
  constructor(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "sessionStorage";
    this.storage = void 0, this.id = void 0, this.config = void 0, this.storage = Wu(s), this.id = t, this.config = n, this._loadConfiguration();
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
function Qu(e) {
  let t;
  return e < 10 ? t = "".concat(e.toFixed(2), "ms") : e < 100 ? t = "".concat(e.toFixed(1), "ms") : e < 1e3 ? t = "".concat(e.toFixed(0), "ms") : t = "".concat((e / 1e3).toFixed(2), "s"), t;
}
function qu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8;
  const n = Math.max(t - e.length, 0);
  return "".concat(" ".repeat(n)).concat(e);
}
function es(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 600;
  const r = e.src.replace(/\(/g, "%28").replace(/\)/g, "%29");
  e.width > s && (n = Math.min(n, s / e.width));
  const i = e.width * n, o = e.height * n, a = ["font-size:1px;", "padding:".concat(Math.floor(o / 2), "px ").concat(Math.floor(i / 2), "px;"), "line-height:".concat(o, "px;"), "background:url(".concat(r, ");"), "background-size:".concat(i, "px ").concat(o, "px;"), "color:transparent;"].join("");
  return ["".concat(t, " %c+"), a];
}
let Tn;
(function(e) {
  e[e.BLACK = 30] = "BLACK", e[e.RED = 31] = "RED", e[e.GREEN = 32] = "GREEN", e[e.YELLOW = 33] = "YELLOW", e[e.BLUE = 34] = "BLUE", e[e.MAGENTA = 35] = "MAGENTA", e[e.CYAN = 36] = "CYAN", e[e.WHITE = 37] = "WHITE", e[e.BRIGHT_BLACK = 90] = "BRIGHT_BLACK", e[e.BRIGHT_RED = 91] = "BRIGHT_RED", e[e.BRIGHT_GREEN = 92] = "BRIGHT_GREEN", e[e.BRIGHT_YELLOW = 93] = "BRIGHT_YELLOW", e[e.BRIGHT_BLUE = 94] = "BRIGHT_BLUE", e[e.BRIGHT_MAGENTA = 95] = "BRIGHT_MAGENTA", e[e.BRIGHT_CYAN = 96] = "BRIGHT_CYAN", e[e.BRIGHT_WHITE = 97] = "BRIGHT_WHITE";
})(Tn || (Tn = {}));
const Yu = 10;
function Kr(e) {
  return typeof e != "string" ? e : (e = e.toUpperCase(), Tn[e] || Tn.WHITE);
}
function $u(e, t, n) {
  if (!je && typeof e == "string") {
    if (t) {
      const s = Kr(t);
      e = "\x1B[".concat(s, "m").concat(e, "\x1B[39m");
    }
    if (n) {
      const s = Kr(n);
      e = "\x1B[".concat(s + Yu, "m").concat(e, "\x1B[49m");
    }
  }
  return e;
}
function Zu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ["constructor"];
  const n = Object.getPrototypeOf(e), s = Object.getOwnPropertyNames(n), r = e;
  for (const i of s) {
    const o = r[i];
    typeof o == "function" && (t.find((a) => i === a) || (r[i] = o.bind(e)));
  }
}
function bn(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
function se() {
  let e;
  if (je() && Xe.performance) {
    var t, n;
    e = Xe == null || (t = Xe.performance) === null || t === void 0 || (n = t.now) === null || n === void 0 ? void 0 : n.call(t);
  } else if ("hrtime" in pe) {
    var s;
    const r = pe == null || (s = pe.hrtime) === null || s === void 0 ? void 0 : s.call(pe);
    e = r[0] * 1e3 + r[1] / 1e6;
  } else
    e = Date.now();
  return e;
}
const re = {
  debug: je() && console.debug || console.log,
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
}, tl = {
  enabled: !0,
  level: 0
};
function yt() {
}
const zr = {}, Wr = {
  once: !0
};
class Pn {
  constructor() {
    let {
      id: t
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
      id: ""
    };
    this.id = void 0, this.VERSION = Jo, this._startTs = se(), this._deltaTs = se(), this._storage = void 0, this.userData = {}, this.LOG_THROTTLE_TIMEOUT = 0, this.id = t, this.userData = {}, this._storage = new Xu("__probe-".concat(this.id, "__"), tl), this.timeStamp("".concat(this.id, " started")), Zu(this), Object.seal(this);
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
    return Number((se() - this._startTs).toPrecision(10));
  }
  getDelta() {
    return Number((se() - this._deltaTs).toPrecision(10));
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
    bn(t, n);
  }
  warn(t) {
    return this._getLogFunction(0, t, re.warn, arguments, Wr);
  }
  error(t) {
    return this._getLogFunction(0, t, re.error, arguments);
  }
  deprecated(t, n) {
    return this.warn("`".concat(t, "` is deprecated and will be removed in a later version. Use `").concat(n, "` instead"));
  }
  removed(t, n) {
    return this.error("`".concat(t, "` has been removed. Use `").concat(n, "` instead"));
  }
  probe(t, n) {
    return this._getLogFunction(t, n, re.log, arguments, {
      time: !0,
      once: !0
    });
  }
  log(t, n) {
    return this._getLogFunction(t, n, re.debug, arguments);
  }
  info(t, n) {
    return this._getLogFunction(t, n, console.info, arguments);
  }
  once(t, n) {
    return this._getLogFunction(t, n, re.debug || re.info, arguments, Wr);
  }
  table(t, n, s) {
    return n ? this._getLogFunction(t, n, console.table || yt, s && [s], {
      tag: rl(n)
    }) : yt;
  }
  image(t) {
    let {
      logLevel: n,
      priority: s,
      image: r,
      message: i = "",
      scale: o = 1
    } = t;
    return this._shouldLog(n || s) ? je() ? sl({
      image: r,
      message: i,
      scale: o
    }) : nl() : yt;
  }
  time(t, n) {
    return this._getLogFunction(t, n, console.time ? console.time : console.info);
  }
  timeEnd(t, n) {
    return this._getLogFunction(t, n, console.timeEnd ? console.timeEnd : console.info);
  }
  timeStamp(t, n) {
    return this._getLogFunction(t, n, console.timeStamp || yt);
  }
  group(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      collapsed: !1
    };
    const r = Xr({
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
    return this._getLogFunction(t, "", console.groupEnd || yt);
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
    return this.isEnabled() && this.getLevel() >= Vo(t);
  }
  _getLogFunction(t, n, s, r, i) {
    if (this._shouldLog(t)) {
      i = Xr({
        logLevel: t,
        message: n,
        args: r,
        opts: i
      }), s = s || i.method, bn(s), i.total = this.getTotal(), i.delta = this.getDelta(), this._deltaTs = se();
      const o = i.tag || i.message;
      if (i.once && o)
        if (!zr[o])
          zr[o] = se();
        else
          return yt;
      return n = el(this.id, i.message, i), s.bind(console, n, ...i.args);
    }
    return yt;
  }
}
Pn.VERSION = Jo;
function Vo(e) {
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
  return bn(Number.isFinite(t) && t >= 0), t;
}
function Xr(e) {
  const {
    logLevel: t,
    message: n
  } = e;
  e.logLevel = Vo(t);
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
  return bn(r === "string" || r === "object"), Object.assign(e, {
    args: s
  }, e.opts);
}
function el(e, t, n) {
  if (typeof t == "string") {
    const s = n.time ? qu(Qu(n.total)) : "";
    t = n.time ? "".concat(e, ": ").concat(s, "  ").concat(t) : "".concat(e, ": ").concat(t), t = $u(t, n.color, n.background);
  }
  return t;
}
function nl(e) {
  return console.warn("removed"), yt;
}
function sl(e) {
  let {
    image: t,
    message: n = "",
    scale: s = 1
  } = e;
  if (typeof t == "string") {
    const i = new Image();
    return i.onload = () => {
      const o = es(i, n, s);
      console.log(...o);
    }, i.src = t, yt;
  }
  const r = t.nodeName || "";
  if (r.toLowerCase() === "img")
    return console.log(...es(t, n, s)), yt;
  if (r.toLowerCase() === "canvas") {
    const i = new Image();
    return i.onload = () => console.log(...es(i, n, s)), i.src = t.toDataURL(), yt;
  }
  return yt;
}
function rl(e) {
  for (const t in e)
    for (const n in e[t])
      return n || "untitled";
  return "empty";
}
const jo = new Pn({
  id: "@probe.gl/log"
}), Qr = new Pn({
  id: "loaders.gl"
});
class il {
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
class ol {
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
const ko = {
  fetch: null,
  mimeType: void 0,
  nothrow: !1,
  log: new ol(),
  useLocalLibraries: !1,
  CDN: "https://unpkg.com/@loaders.gl",
  worker: !0,
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: Ln,
  _nodeWorkers: !1,
  _workerType: "",
  limit: 0,
  _limitMB: 0,
  batchSize: "auto",
  batchDebounceMs: 0,
  metadata: !1,
  transforms: []
}, al = {
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
function Ko() {
  globalThis.loaders = globalThis.loaders || {};
  const {
    loaders: e
  } = globalThis;
  return e._state = e._state || {}, e._state;
}
function zo() {
  const e = Ko();
  return e.globalOptions = e.globalOptions || {
    ...ko
  }, e.globalOptions;
}
function cl(e, t, n, s) {
  return n = n || [], n = Array.isArray(n) ? n : [n], ul(e, n), hl(t, e, s);
}
function ul(e, t) {
  qr(e, null, ko, al, t);
  for (const n of t) {
    const s = e && e[n.id] || {}, r = n.options && n.options[n.id] || {}, i = n.deprecatedOptions && n.deprecatedOptions[n.id] || {};
    qr(s, n.id, r, i, t);
  }
}
function qr(e, t, n, s, r) {
  const i = t || "Top level", o = t ? `${t}.` : "";
  for (const a in e) {
    const c = !t && Ve(e[a]), u = a === "baseUri" && !t, l = a === "workerUrl" && t;
    if (!(a in n) && !u && !l) {
      if (a in s)
        Qr.warn(`${i} loader option '${o}${a}' no longer supported, use '${s[a]}'`)();
      else if (!c) {
        const h = ll(a, r);
        Qr.warn(`${i} loader option '${o}${a}' not recognized. ${h}`)();
      }
    }
  }
}
function ll(e, t) {
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
function hl(e, t, n) {
  const r = {
    ...e.options || {}
  };
  return fl(r, n), r.log === null && (r.log = new il()), Yr(r, zo()), Yr(r, t), r;
}
function Yr(e, t) {
  for (const n in t)
    if (n in t) {
      const s = t[n];
      jr(s) && jr(e[n]) ? e[n] = {
        ...e[n],
        ...t[n]
      } : e[n] = t[n];
    }
}
function fl(e, t) {
  t && !("baseUri" in e) && (e.baseUri = t);
}
function ar(e) {
  var t;
  return e ? (Array.isArray(e) && (e = e[0]), Array.isArray((t = e) === null || t === void 0 ? void 0 : t.extensions)) : !1;
}
function Wo(e) {
  var t, n;
  U(e, "null loader"), U(ar(e), "invalid loader");
  let s;
  return Array.isArray(e) && (s = e[1], e = e[0], e = {
    ...e,
    options: {
      ...e.options,
      ...s
    }
  }), ((t = e) !== null && t !== void 0 && t.parseTextSync || (n = e) !== null && n !== void 0 && n.parseText) && (e.text = !0), e.text || (e.binary = !0), e;
}
const dl = () => {
  const e = Ko();
  return e.loaderRegistry = e.loaderRegistry || [], e.loaderRegistry;
};
function ml() {
  return dl();
}
const gl = new Pn({
  id: "loaders.gl"
}), Al = /\.([^.]+)$/;
async function pl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0;
  if (!Xo(e))
    return null;
  let r = $r(e, t, {
    ...n,
    nothrow: !0
  }, s);
  if (r)
    return r;
  if (Zt(e) && (e = await e.slice(0, 10).arrayBuffer(), r = $r(e, t, n, s)), !r && !(n != null && n.nothrow))
    throw new Error(Qo(e));
  return r;
}
function $r(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0;
  if (!Xo(e))
    return null;
  if (t && !Array.isArray(t))
    return Wo(t);
  let r = [];
  t && (r = r.concat(t)), n != null && n.ignoreRegisteredLoaders || r.push(...ml()), Bl(r);
  const i = yl(e, r, n, s);
  if (!i && !(n != null && n.nothrow))
    throw new Error(Qo(e));
  return i;
}
function yl(e, t, n, s) {
  const r = Gn(e), i = or(e), o = ir(r) || (s == null ? void 0 : s.url);
  let a = null, c = "";
  if (n != null && n.mimeType && (a = ns(t, n == null ? void 0 : n.mimeType), c = `match forced by supplied MIME type ${n == null ? void 0 : n.mimeType}`), a = a || Cl(t, o), c = c || (a ? `matched url ${o}` : ""), a = a || ns(t, i), c = c || (a ? `matched MIME type ${i}` : ""), a = a || Tl(t, e), c = c || (a ? `matched initial data ${qo(e)}` : ""), n != null && n.fallbackMimeType && (a = a || ns(t, n == null ? void 0 : n.fallbackMimeType), c = c || (a ? `matched fallback MIME type ${i}` : "")), c) {
    var u;
    gl.log(1, `selectLoader selected ${(u = a) === null || u === void 0 ? void 0 : u.name}: ${c}.`);
  }
  return a;
}
function Xo(e) {
  return !(e instanceof Response && e.status === 204);
}
function Qo(e) {
  const t = Gn(e), n = or(e);
  let s = "No valid loader found (";
  s += t ? `${Po(t)}, ` : "no url provided, ", s += `MIME type: ${n ? `"${n}"` : "not provided"}, `;
  const r = e ? qo(e) : "";
  return s += r ? ` first bytes: "${r}"` : "first bytes: not available", s += ")", s;
}
function Bl(e) {
  for (const t of e)
    Wo(t);
}
function Cl(e, t) {
  const n = t && Al.exec(t), s = n && n[1];
  return s ? El(e, s) : null;
}
function El(e, t) {
  t = t.toLowerCase();
  for (const n of e)
    for (const s of n.extensions)
      if (s.toLowerCase() === t)
        return n;
  return null;
}
function ns(e, t) {
  for (const n of e)
    if (n.mimeTypes && n.mimeTypes.includes(t) || t === `application/x.${n.id}`)
      return n;
  return null;
}
function Tl(e, t) {
  if (!t)
    return null;
  for (const n of e)
    if (typeof t == "string") {
      if (bl(t, n))
        return n;
    } else if (ArrayBuffer.isView(t)) {
      if (Zr(t.buffer, t.byteOffset, n))
        return n;
    } else if (t instanceof ArrayBuffer && Zr(t, 0, n))
      return n;
  return null;
}
function bl(e, t) {
  return t.testText ? t.testText(e) : (Array.isArray(t.tests) ? t.tests : [t.tests]).some((s) => e.startsWith(s));
}
function Zr(e, t, n) {
  return (Array.isArray(n.tests) ? n.tests : [n.tests]).some((r) => _l(e, t, n, r));
}
function _l(e, t, n, s) {
  if (s instanceof ArrayBuffer)
    return lu(s, e, s.byteLength);
  switch (typeof s) {
    case "function":
      return s(e);
    case "string":
      const r = Ls(e, t, s.length);
      return s === r;
    default:
      return !1;
  }
}
function qo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
  return typeof e == "string" ? e.slice(0, t) : ArrayBuffer.isView(e) ? Ls(e.buffer, e.byteOffset, t) : e instanceof ArrayBuffer ? Ls(e, 0, t) : "";
}
function Ls(e, t, n) {
  if (e.byteLength < t + n)
    return "";
  const s = new DataView(e);
  let r = "";
  for (let i = 0; i < n; i++)
    r += String.fromCharCode(s.getUint8(t + i));
  return r;
}
const wl = 256 * 1024;
function* Rl(e, t) {
  const n = (t == null ? void 0 : t.chunkSize) || wl;
  let s = 0;
  const r = new TextEncoder();
  for (; s < e.length; ) {
    const i = Math.min(e.length - s, n), o = e.slice(s, s + i);
    s += i, yield r.encode(o);
  }
}
const Ml = 256 * 1024;
function Il(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return function* () {
    const {
      chunkSize: n = Ml
    } = t;
    let s = 0;
    for (; s < e.byteLength; ) {
      const r = Math.min(e.byteLength - s, n), i = new ArrayBuffer(r), o = new Uint8Array(e, s, r);
      new Uint8Array(i).set(o), s += r, yield i;
    }
  }();
}
const Sl = 1024 * 1024;
async function* xl(e, t) {
  const n = (t == null ? void 0 : t.chunkSize) || Sl;
  let s = 0;
  for (; s < e.size; ) {
    const r = s + n, i = await e.slice(s, r).arrayBuffer();
    s = r, yield i;
  }
}
function ti(e, t) {
  return Ln ? Ol(e, t) : Fl(e);
}
async function* Ol(e, t) {
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
      yield Go(o);
    }
  } catch {
    n.releaseLock();
  }
}
async function* Fl(e, t) {
  for await (const n of e)
    yield Go(n);
}
function vl(e, t) {
  if (typeof e == "string")
    return Rl(e, t);
  if (e instanceof ArrayBuffer)
    return Il(e, t);
  if (Zt(e))
    return xl(e, t);
  if (No(e))
    return ti(e, t);
  if ($t(e))
    return ti(e.body, t);
  throw new Error("makeIterator");
}
const Yo = "Cannot convert supplied data type";
function Dl(e, t, n) {
  if (t.text && typeof e == "string")
    return e;
  if (Ou(e) && (e = e.buffer), e instanceof ArrayBuffer) {
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
  throw new Error(Yo);
}
async function Ll(e, t, n) {
  const s = e instanceof ArrayBuffer || ArrayBuffer.isView(e);
  if (typeof e == "string" || s)
    return Dl(e, t);
  if (Zt(e) && (e = await Ho(e)), $t(e)) {
    const r = e;
    return await Uu(r), t.binary ? await r.arrayBuffer() : await r.text();
  }
  if (No(e) && (e = vl(e, n)), Su(e) || xu(e))
    return mu(e);
  throw new Error(Yo);
}
function $o(e, t) {
  const n = zo(), s = e || n;
  return typeof s.fetch == "function" ? s.fetch : Ve(s.fetch) ? (r) => Fe(r, s.fetch) : t != null && t.fetch ? t == null ? void 0 : t.fetch : Fe;
}
function Gl(e, t, n) {
  if (n)
    return n;
  const s = {
    fetch: $o(t, e),
    ...e
  };
  if (s.url) {
    const r = ir(s.url);
    s.baseUrl = r, s.queryString = Pu(s.url), s.filename = Po(r), s.baseUrl = rr(r);
  }
  return Array.isArray(s.loaders) || (s.loaders = null), s;
}
function Pl(e, t) {
  if (e && !Array.isArray(e))
    return e;
  let n;
  if (e && (n = Array.isArray(e) ? e : [e]), t && t.loaders) {
    const s = Array.isArray(t.loaders) ? t.loaders : [t.loaders];
    n = n ? [...n, ...s] : s;
  }
  return n && n.length ? n : void 0;
}
async function _n(e, t, n, s) {
  t && !Array.isArray(t) && !ar(t) && (s = void 0, n = t, t = void 0), e = await e, n = n || {};
  const r = Gn(e), o = Pl(t, s), a = await pl(e, o, n);
  return a ? (n = cl(n, a, o, r), s = Gl({
    url: r,
    _parse: _n,
    loaders: o
  }, n, s || null), await Nl(a, e, n, s)) : null;
}
async function Nl(e, t, n, s) {
  if (Yc(e), n = Hc(e.options, n), $t(t)) {
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
  t = await Ll(t, e, n);
  const r = e;
  if (r.parseTextSync && typeof t == "string")
    return r.parseTextSync(t, n, s);
  if (iu(e, n))
    return await ou(e, t, n, s, _n);
  if (r.parseText && typeof t == "string")
    return await r.parseText(t, n, s);
  if (r.parse)
    return await r.parse(t, n, s);
  throw Pt(!r.parseSync), new Error(`${e.id} loader - no parser found and worker is disabled`);
}
function Ul(e) {
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
function Hl(e) {
  let t = 1 / 0, n = 1 / 0, s = 1 / 0, r = -1 / 0, i = -1 / 0, o = -1 / 0;
  const a = e.POSITION ? e.POSITION.value : [], c = a && a.length;
  for (let u = 0; u < c; u += 3) {
    const l = a[u], h = a[u + 1], f = a[u + 2];
    t = l < t ? l : t, n = h < n ? h : n, s = f < s ? f : s, r = l > r ? l : r, i = h > i ? h : i, o = f > o ? f : o;
  }
  return [[t, n, s], [r, i, o]];
}
function Jl(e, t, n) {
  const s = Ul(t.value), r = n || Vl(t);
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
function Vl(e) {
  const t = {};
  return "byteOffset" in e && (t.byteOffset = e.byteOffset.toString(10)), "byteStride" in e && (t.byteStride = e.byteStride.toString(10)), "normalized" in e && (t.normalized = e.normalized.toString()), t;
}
async function fe(e, t, n, s) {
  let r, i;
  !Array.isArray(t) && !ar(t) ? (r = [], i = t) : (r = t, i = n);
  const o = $o(i);
  let a = e;
  return typeof e == "string" && (a = await o(e)), Zt(e) && (a = await o(e)), Array.isArray(r) ? await _n(a, r, i) : await _n(a, r, i);
}
const jl = 1 / Math.PI * 180, kl = 1 / 180 * Math.PI, Kl = {
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
    ...Kl
  }
};
const tt = globalThis.mathgl.config;
function zl(e, {
  precision: t = tt.precision
} = {}) {
  return e = Yl(e), "".concat(parseFloat(e.toPrecision(t)));
}
function qt(e) {
  return Array.isArray(e) || ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Wl(e) {
  return Ql(e);
}
function Xl(e) {
  return _t(e);
}
function Ql(e, t) {
  return cr(e, (n) => n * kl, t);
}
function _t(e, t) {
  return cr(e, (n) => n * jl, t);
}
function ql(e, t, n) {
  return cr(e, (s) => Math.max(t, Math.min(n, s)));
}
function Jt(e, t, n) {
  const s = tt.EPSILON;
  n && (tt.EPSILON = n);
  try {
    if (e === t)
      return !0;
    if (qt(e) && qt(t)) {
      if (e.length !== t.length)
        return !1;
      for (let r = 0; r < e.length; ++r)
        if (!Jt(e[r], t[r]))
          return !1;
      return !0;
    }
    return e && e.equals ? e.equals(t) : t && t.equals ? t.equals(e) : typeof e == "number" && typeof t == "number" ? Math.abs(e - t) <= tt.EPSILON * Math.max(1, Math.abs(e), Math.abs(t)) : !1;
  } finally {
    tt.EPSILON = s;
  }
}
function Yl(e) {
  return Math.round(e / tt.EPSILON) * tt.EPSILON;
}
function $l(e) {
  return e.clone ? e.clone() : new Array(e.length);
}
function cr(e, t, n) {
  if (qt(e)) {
    const s = e;
    n = n || $l(s);
    for (let r = 0; r < n.length && r < s.length; ++r) {
      const i = typeof e == "number" ? e : e[r];
      n[r] = t(i, r, n);
    }
    return n;
  }
  return t(e);
}
function Zl(e) {
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
class ur extends Zl(Array) {
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
    return t === this ? this : qt(t) ? this.toArray(t) : this.toObject(t);
  }
  toTarget(t) {
    return t ? this.to(t) : this;
  }
  toFloat32Array() {
    return new Float32Array(this);
  }
  toString() {
    return this.formatString(tt);
  }
  formatString(t) {
    let n = "";
    for (let s = 0; s < this.ELEMENTS; ++s)
      n += (s > 0 ? ", " : "") + zl(this[s], t);
    return "".concat(t.printTypes ? this.constructor.name : "", "[").concat(n, "]");
  }
  equals(t) {
    if (!t || this.length !== t.length)
      return !1;
    for (let n = 0; n < this.ELEMENTS; ++n)
      if (!Jt(this[n], t[n]))
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
    if (tt.debug && !this.validate())
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
function th(e, t) {
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
function Ie(e, t, n = "") {
  if (tt.debug && !th(e, t))
    throw new Error("math.gl: ".concat(n, " some fields set to invalid numbers'"));
  return e;
}
function j(e, t) {
  if (!e)
    throw new Error("math.gl assertion ".concat(t));
}
class lr extends ur {
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
const Se = 1e-6;
let Rt = typeof Float32Array < "u" ? Float32Array : Array;
function eh() {
  const e = new Rt(2);
  return Rt != Float32Array && (e[0] = 0, e[1] = 0), e;
}
function nh(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e;
}
function sh(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r + n[4], e[1] = n[1] * s + n[3] * r + n[5], e;
}
function Zo(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[3] * r + n[6], e[1] = n[1] * s + n[4] * r + n[7], e;
}
function ta(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[4] * r + n[12], e[1] = n[1] * s + n[5] * r + n[13], e;
}
(function() {
  const e = eh();
  return function(t, n, s, r, i, o) {
    let a, c;
    for (n || (n = 2), s || (s = 0), r ? c = Math.min(r * n + s, t.length) : c = t.length, a = s; a < c; a += n)
      e[0] = t[a], e[1] = t[a + 1], i(e, e, o), t[a] = e[0], t[a + 1] = e[1];
    return t;
  };
})();
function ea(e, t, n) {
  const s = t[0], r = t[1], i = n[3] * s + n[7] * r || 1;
  return e[0] = (n[0] * s + n[4] * r) / i, e[1] = (n[1] * s + n[5] * r) / i, e;
}
function na(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[3] * s + n[7] * r + n[11] * i || 1;
  return e[0] = (n[0] * s + n[4] * r + n[8] * i) / o, e[1] = (n[1] * s + n[5] * r + n[9] * i) / o, e[2] = (n[2] * s + n[6] * r + n[10] * i) / o, e;
}
function rh(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e[2] = t[2], e;
}
function ih(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e[2] = t[2], e[3] = t[3], e;
}
function sa(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  return e[0] = n[0] * s + n[3] * r + n[6] * i, e[1] = n[1] * s + n[4] * r + n[7] * i, e[2] = n[2] * s + n[5] * r + n[8] * i, e[3] = t[3], e;
}
class Nn extends lr {
  constructor(t = 0, n = 0) {
    super(2), qt(t) && arguments.length === 1 ? this.copy(t) : (tt.debug && (N(t), N(n)), this[0] = t, this[1] = n);
  }
  set(t, n) {
    return this[0] = t, this[1] = n, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this.check();
  }
  fromObject(t) {
    return tt.debug && (N(t.x), N(t.y)), this[0] = t.x, this[1] = t.y, this.check();
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
    return ta(this, this, t), this.check();
  }
  transformAsVector(t) {
    return ea(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return Zo(this, this, t), this.check();
  }
  transformByMatrix2x3(t) {
    return sh(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return nh(this, this, t), this.check();
  }
}
function ra() {
  const e = new Rt(3);
  return Rt != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e;
}
function ia(e) {
  const t = e[0], n = e[1], s = e[2];
  return Math.sqrt(t * t + n * n + s * s);
}
function ei(e, t, n) {
  const s = new Rt(3);
  return s[0] = e, s[1] = t, s[2] = n, s;
}
function oh(e, t) {
  const n = t[0], s = t[1], r = t[2];
  let i = n * n + s * s + r * r;
  return i > 0 && (i = 1 / Math.sqrt(i)), e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e;
}
function hr(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
}
function An(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[0], a = n[1], c = n[2];
  return e[0] = r * c - i * a, e[1] = i * o - s * c, e[2] = s * a - r * o, e;
}
function fr(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  let o = n[3] * s + n[7] * r + n[11] * i + n[15];
  return o = o || 1, e[0] = (n[0] * s + n[4] * r + n[8] * i + n[12]) / o, e[1] = (n[1] * s + n[5] * r + n[9] * i + n[13]) / o, e[2] = (n[2] * s + n[6] * r + n[10] * i + n[14]) / o, e;
}
function oa(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  return e[0] = s * n[0] + r * n[3] + i * n[6], e[1] = s * n[1] + r * n[4] + i * n[7], e[2] = s * n[2] + r * n[5] + i * n[8], e;
}
function aa(e, t, n) {
  const s = n[0], r = n[1], i = n[2], o = n[3], a = t[0], c = t[1], u = t[2];
  let l = r * u - i * c, h = i * a - s * u, f = s * c - r * a, d = r * f - i * h, m = i * l - s * f, g = s * h - r * l;
  const p = o * 2;
  return l *= p, h *= p, f *= p, d *= 2, m *= 2, g *= 2, e[0] = a + l + d, e[1] = c + h + m, e[2] = u + f + g, e;
}
function ah(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[0], i[1] = r[1] * Math.cos(s) - r[2] * Math.sin(s), i[2] = r[1] * Math.sin(s) + r[2] * Math.cos(s), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function ch(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[2] * Math.sin(s) + r[0] * Math.cos(s), i[1] = r[1], i[2] = r[2] * Math.cos(s) - r[0] * Math.sin(s), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function uh(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[0] * Math.cos(s) - r[1] * Math.sin(s), i[1] = r[0] * Math.sin(s) + r[1] * Math.cos(s), i[2] = r[2], e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function lh(e, t) {
  const n = e[0], s = e[1], r = e[2], i = t[0], o = t[1], a = t[2], c = Math.sqrt((n * n + s * s + r * r) * (i * i + o * o + a * a)), u = c && hr(e, t) / c;
  return Math.acos(Math.min(Math.max(u, -1), 1));
}
const hh = ia;
(function() {
  const e = ra();
  return function(t, n, s, r, i, o) {
    let a, c;
    for (n || (n = 3), s || (s = 0), r ? c = Math.min(r * n + s, t.length) : c = t.length, a = s; a < c; a += n)
      e[0] = t[a], e[1] = t[a + 1], e[2] = t[a + 2], i(e, e, o), t[a] = e[0], t[a + 1] = e[1], t[a + 2] = e[2];
    return t;
  };
})();
const ss = [0, 0, 0];
let Qe;
class A extends lr {
  static get ZERO() {
    return Qe || (Qe = new A(0, 0, 0), Object.freeze(Qe)), Qe;
  }
  constructor(t = 0, n = 0, s = 0) {
    super(-0, -0, -0), arguments.length === 1 && qt(t) ? this.copy(t) : (tt.debug && (N(t), N(n), N(s)), this[0] = t, this[1] = n, this[2] = s);
  }
  set(t, n, s) {
    return this[0] = t, this[1] = n, this[2] = s, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this.check();
  }
  fromObject(t) {
    return tt.debug && (N(t.x), N(t.y), N(t.z)), this[0] = t.x, this[1] = t.y, this[2] = t.z, this.check();
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
    return lh(this, t);
  }
  cross(t) {
    return An(this, this, t), this.check();
  }
  rotateX({
    radians: t,
    origin: n = ss
  }) {
    return ah(this, this, n, t), this.check();
  }
  rotateY({
    radians: t,
    origin: n = ss
  }) {
    return ch(this, this, n, t), this.check();
  }
  rotateZ({
    radians: t,
    origin: n = ss
  }) {
    return uh(this, this, n, t), this.check();
  }
  transform(t) {
    return this.transformAsPoint(t);
  }
  transformAsPoint(t) {
    return fr(this, this, t), this.check();
  }
  transformAsVector(t) {
    return na(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return oa(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return rh(this, this, t), this.check();
  }
  transformByQuaternion(t) {
    return aa(this, this, t), this.check();
  }
}
let qe;
class dr extends lr {
  static get ZERO() {
    return qe || (qe = new dr(0, 0, 0, 0), Object.freeze(qe)), qe;
  }
  constructor(t = 0, n = 0, s = 0, r = 0) {
    super(-0, -0, -0, -0), qt(t) && arguments.length === 1 ? this.copy(t) : (tt.debug && (N(t), N(n), N(s), N(r)), this[0] = t, this[1] = n, this[2] = s, this[3] = r);
  }
  set(t, n, s, r) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this.check();
  }
  fromObject(t) {
    return tt.debug && (N(t.x), N(t.y), N(t.z), N(t.w)), this[0] = t.x, this[1] = t.y, this[2] = t.z, this[3] = t.w, this;
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
    return fr(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return sa(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return ih(this, this, t), this.check();
  }
  transformByQuaternion(t) {
    return aa(this, this, t), this.check();
  }
  applyMatrix4(t) {
    return t.transform(this, this), this;
  }
}
class ca extends ur {
  toString() {
    let t = "[";
    if (tt.printRowMajor) {
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
function fh() {
  const e = new Rt(9);
  return Rt != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1, e;
}
function dh(e, t) {
  if (e === t) {
    const n = t[1], s = t[2], r = t[5];
    e[1] = t[3], e[2] = t[6], e[3] = n, e[5] = t[7], e[6] = s, e[7] = r;
  } else
    e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
  return e;
}
function mh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], a = t[5], c = t[6], u = t[7], l = t[8], h = l * o - a * u, f = -l * i + a * c, d = u * i - o * c;
  let m = n * h + s * f + r * d;
  return m ? (m = 1 / m, e[0] = h * m, e[1] = (-l * s + r * u) * m, e[2] = (a * s - r * o) * m, e[3] = f * m, e[4] = (l * n - r * c) * m, e[5] = (-a * n + r * i) * m, e[6] = d * m, e[7] = (-u * n + s * c) * m, e[8] = (o * n - s * i) * m, e) : null;
}
function gh(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3], i = e[4], o = e[5], a = e[6], c = e[7], u = e[8];
  return t * (u * i - o * c) + n * (-u * r + o * a) + s * (c * r - i * a);
}
function ni(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = n[0], d = n[1], m = n[2], g = n[3], p = n[4], C = n[5], w = n[6], y = n[7], B = n[8];
  return e[0] = f * s + d * o + m * u, e[1] = f * r + d * a + m * l, e[2] = f * i + d * c + m * h, e[3] = g * s + p * o + C * u, e[4] = g * r + p * a + C * l, e[5] = g * i + p * c + C * h, e[6] = w * s + y * o + B * u, e[7] = w * r + y * a + B * l, e[8] = w * i + y * c + B * h, e;
}
function Ah(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = n[0], d = n[1];
  return e[0] = s, e[1] = r, e[2] = i, e[3] = o, e[4] = a, e[5] = c, e[6] = f * s + d * o + u, e[7] = f * r + d * a + l, e[8] = f * i + d * c + h, e;
}
function ph(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = Math.sin(n), d = Math.cos(n);
  return e[0] = d * s + f * o, e[1] = d * r + f * a, e[2] = d * i + f * c, e[3] = d * o - f * s, e[4] = d * a - f * r, e[5] = d * c - f * i, e[6] = u, e[7] = l, e[8] = h, e;
}
function si(e, t, n) {
  const s = n[0], r = n[1];
  return e[0] = s * t[0], e[1] = s * t[1], e[2] = s * t[2], e[3] = r * t[3], e[4] = r * t[4], e[5] = r * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
}
function yh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n + n, a = s + s, c = r + r, u = n * o, l = s * o, h = s * a, f = r * o, d = r * a, m = r * c, g = i * o, p = i * a, C = i * c;
  return e[0] = 1 - h - m, e[3] = l - C, e[6] = f + p, e[1] = l + C, e[4] = 1 - u - m, e[7] = d - g, e[2] = f - p, e[5] = d + g, e[8] = 1 - u - h, e;
}
var Gs;
(function(e) {
  e[e.COL0ROW0 = 0] = "COL0ROW0", e[e.COL0ROW1 = 1] = "COL0ROW1", e[e.COL0ROW2 = 2] = "COL0ROW2", e[e.COL1ROW0 = 3] = "COL1ROW0", e[e.COL1ROW1 = 4] = "COL1ROW1", e[e.COL1ROW2 = 5] = "COL1ROW2", e[e.COL2ROW0 = 6] = "COL2ROW0", e[e.COL2ROW1 = 7] = "COL2ROW1", e[e.COL2ROW2 = 8] = "COL2ROW2";
})(Gs || (Gs = {}));
const Bh = Object.freeze([1, 0, 0, 0, 1, 0, 0, 0, 1]);
class z extends ca {
  static get IDENTITY() {
    return Eh();
  }
  static get ZERO() {
    return Ch();
  }
  get ELEMENTS() {
    return 9;
  }
  get RANK() {
    return 3;
  }
  get INDICES() {
    return Gs;
  }
  constructor(t, ...n) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0), arguments.length === 1 && Array.isArray(t) ? this.copy(t) : n.length > 0 ? this.copy([t, ...n]) : this.identity();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this[4] = t[4], this[5] = t[5], this[6] = t[6], this[7] = t[7], this[8] = t[8], this.check();
  }
  identity() {
    return this.copy(Bh);
  }
  fromObject(t) {
    return this.check();
  }
  fromQuaternion(t) {
    return yh(this, t), this.check();
  }
  set(t, n, s, r, i, o, a, c, u) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this[4] = i, this[5] = o, this[6] = a, this[7] = c, this[8] = u, this.check();
  }
  setRowMajor(t, n, s, r, i, o, a, c, u) {
    return this[0] = t, this[1] = r, this[2] = a, this[3] = n, this[4] = i, this[5] = c, this[6] = s, this[7] = o, this[8] = u, this.check();
  }
  determinant() {
    return gh(this);
  }
  transpose() {
    return dh(this, this), this.check();
  }
  invert() {
    return mh(this, this), this.check();
  }
  multiplyLeft(t) {
    return ni(this, t, this), this.check();
  }
  multiplyRight(t) {
    return ni(this, this, t), this.check();
  }
  rotate(t) {
    return ph(this, this, t), this.check();
  }
  scale(t) {
    return Array.isArray(t) ? si(this, this, t) : si(this, this, [t, t]), this.check();
  }
  translate(t) {
    return Ah(this, this, t), this.check();
  }
  transform(t, n) {
    let s;
    switch (t.length) {
      case 2:
        s = Zo(n || [-0, -0], t, this);
        break;
      case 3:
        s = oa(n || [-0, -0, -0], t, this);
        break;
      case 4:
        s = sa(n || [-0, -0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return Ie(s, t.length), s;
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
let Ye, $e = null;
function Ch() {
  return Ye || (Ye = new z([0, 0, 0, 0, 0, 0, 0, 0, 0]), Object.freeze(Ye)), Ye;
}
function Eh() {
  return $e || ($e = new z(), Object.freeze($e)), $e;
}
function Th(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function bh(e, t) {
  if (e === t) {
    const n = t[1], s = t[2], r = t[3], i = t[6], o = t[7], a = t[11];
    e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = n, e[6] = t[9], e[7] = t[13], e[8] = s, e[9] = i, e[11] = t[14], e[12] = r, e[13] = o, e[14] = a;
  } else
    e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
  return e;
}
function _h(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], a = t[5], c = t[6], u = t[7], l = t[8], h = t[9], f = t[10], d = t[11], m = t[12], g = t[13], p = t[14], C = t[15], w = n * a - s * o, y = n * c - r * o, B = n * u - i * o, R = s * c - r * a, E = s * u - i * a, O = r * u - i * c, F = l * g - h * m, x = l * p - f * m, v = l * C - d * m, k = h * p - f * g, X = h * C - d * g, Q = f * C - d * p;
  let D = w * Q - y * X + B * k + R * v - E * x + O * F;
  return D ? (D = 1 / D, e[0] = (a * Q - c * X + u * k) * D, e[1] = (r * X - s * Q - i * k) * D, e[2] = (g * O - p * E + C * R) * D, e[3] = (f * E - h * O - d * R) * D, e[4] = (c * v - o * Q - u * x) * D, e[5] = (n * Q - r * v + i * x) * D, e[6] = (p * B - m * O - C * y) * D, e[7] = (l * O - f * B + d * y) * D, e[8] = (o * X - a * v + u * F) * D, e[9] = (s * v - n * X - i * F) * D, e[10] = (m * E - g * B + C * w) * D, e[11] = (h * B - l * E - d * w) * D, e[12] = (a * x - o * k - c * F) * D, e[13] = (n * k - s * x + r * F) * D, e[14] = (g * y - m * R - p * w) * D, e[15] = (l * R - h * y + f * w) * D, e) : null;
}
function wh(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3], i = e[4], o = e[5], a = e[6], c = e[7], u = e[8], l = e[9], h = e[10], f = e[11], d = e[12], m = e[13], g = e[14], p = e[15], C = t * o - n * i, w = t * a - s * i, y = n * a - s * o, B = u * m - l * d, R = u * g - h * d, E = l * g - h * m, O = t * E - n * R + s * B, F = i * E - o * R + a * B, x = u * y - l * w + h * C, v = d * y - m * w + g * C;
  return c * O - r * F + p * x - f * v;
}
function ri(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = t[9], d = t[10], m = t[11], g = t[12], p = t[13], C = t[14], w = t[15];
  let y = n[0], B = n[1], R = n[2], E = n[3];
  return e[0] = y * s + B * a + R * h + E * g, e[1] = y * r + B * c + R * f + E * p, e[2] = y * i + B * u + R * d + E * C, e[3] = y * o + B * l + R * m + E * w, y = n[4], B = n[5], R = n[6], E = n[7], e[4] = y * s + B * a + R * h + E * g, e[5] = y * r + B * c + R * f + E * p, e[6] = y * i + B * u + R * d + E * C, e[7] = y * o + B * l + R * m + E * w, y = n[8], B = n[9], R = n[10], E = n[11], e[8] = y * s + B * a + R * h + E * g, e[9] = y * r + B * c + R * f + E * p, e[10] = y * i + B * u + R * d + E * C, e[11] = y * o + B * l + R * m + E * w, y = n[12], B = n[13], R = n[14], E = n[15], e[12] = y * s + B * a + R * h + E * g, e[13] = y * r + B * c + R * f + E * p, e[14] = y * i + B * u + R * d + E * C, e[15] = y * o + B * l + R * m + E * w, e;
}
function Rh(e, t, n) {
  const s = n[0], r = n[1], i = n[2];
  let o, a, c, u, l, h, f, d, m, g, p, C;
  return t === e ? (e[12] = t[0] * s + t[4] * r + t[8] * i + t[12], e[13] = t[1] * s + t[5] * r + t[9] * i + t[13], e[14] = t[2] * s + t[6] * r + t[10] * i + t[14], e[15] = t[3] * s + t[7] * r + t[11] * i + t[15]) : (o = t[0], a = t[1], c = t[2], u = t[3], l = t[4], h = t[5], f = t[6], d = t[7], m = t[8], g = t[9], p = t[10], C = t[11], e[0] = o, e[1] = a, e[2] = c, e[3] = u, e[4] = l, e[5] = h, e[6] = f, e[7] = d, e[8] = m, e[9] = g, e[10] = p, e[11] = C, e[12] = o * s + l * r + m * i + t[12], e[13] = a * s + h * r + g * i + t[13], e[14] = c * s + f * r + p * i + t[14], e[15] = u * s + d * r + C * i + t[15]), e;
}
function Mh(e, t, n) {
  const s = n[0], r = n[1], i = n[2];
  return e[0] = t[0] * s, e[1] = t[1] * s, e[2] = t[2] * s, e[3] = t[3] * s, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * i, e[9] = t[9] * i, e[10] = t[10] * i, e[11] = t[11] * i, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function Ih(e, t, n, s) {
  let r = s[0], i = s[1], o = s[2], a = Math.sqrt(r * r + i * i + o * o), c, u, l, h, f, d, m, g, p, C, w, y, B, R, E, O, F, x, v, k, X, Q, D, at;
  return a < Se ? null : (a = 1 / a, r *= a, i *= a, o *= a, u = Math.sin(n), c = Math.cos(n), l = 1 - c, h = t[0], f = t[1], d = t[2], m = t[3], g = t[4], p = t[5], C = t[6], w = t[7], y = t[8], B = t[9], R = t[10], E = t[11], O = r * r * l + c, F = i * r * l + o * u, x = o * r * l - i * u, v = r * i * l - o * u, k = i * i * l + c, X = o * i * l + r * u, Q = r * o * l + i * u, D = i * o * l - r * u, at = o * o * l + c, e[0] = h * O + g * F + y * x, e[1] = f * O + p * F + B * x, e[2] = d * O + C * F + R * x, e[3] = m * O + w * F + E * x, e[4] = h * v + g * k + y * X, e[5] = f * v + p * k + B * X, e[6] = d * v + C * k + R * X, e[7] = m * v + w * k + E * X, e[8] = h * Q + g * D + y * at, e[9] = f * Q + p * D + B * at, e[10] = d * Q + C * D + R * at, e[11] = m * Q + w * D + E * at, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e);
}
function Sh(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[4], o = t[5], a = t[6], c = t[7], u = t[8], l = t[9], h = t[10], f = t[11];
  return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = i * r + u * s, e[5] = o * r + l * s, e[6] = a * r + h * s, e[7] = c * r + f * s, e[8] = u * r - i * s, e[9] = l * r - o * s, e[10] = h * r - a * s, e[11] = f * r - c * s, e;
}
function xh(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[0], o = t[1], a = t[2], c = t[3], u = t[8], l = t[9], h = t[10], f = t[11];
  return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * r - u * s, e[1] = o * r - l * s, e[2] = a * r - h * s, e[3] = c * r - f * s, e[8] = i * s + u * r, e[9] = o * s + l * r, e[10] = a * s + h * r, e[11] = c * s + f * r, e;
}
function Oh(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[0], o = t[1], a = t[2], c = t[3], u = t[4], l = t[5], h = t[6], f = t[7];
  return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * r + u * s, e[1] = o * r + l * s, e[2] = a * r + h * s, e[3] = c * r + f * s, e[4] = u * r - i * s, e[5] = l * r - o * s, e[6] = h * r - a * s, e[7] = f * r - c * s, e;
}
function Fh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[4], o = t[5], a = t[6], c = t[8], u = t[9], l = t[10];
  return e[0] = Math.sqrt(n * n + s * s + r * r), e[1] = Math.sqrt(i * i + o * o + a * a), e[2] = Math.sqrt(c * c + u * u + l * l), e;
}
function vh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n + n, a = s + s, c = r + r, u = n * o, l = s * o, h = s * a, f = r * o, d = r * a, m = r * c, g = i * o, p = i * a, C = i * c;
  return e[0] = 1 - h - m, e[1] = l + C, e[2] = f - p, e[3] = 0, e[4] = l - C, e[5] = 1 - u - m, e[6] = d + g, e[7] = 0, e[8] = f + p, e[9] = d - g, e[10] = 1 - u - h, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Dh(e, t, n, s, r, i, o) {
  const a = 1 / (n - t), c = 1 / (r - s), u = 1 / (i - o);
  return e[0] = i * 2 * a, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i * 2 * c, e[6] = 0, e[7] = 0, e[8] = (n + t) * a, e[9] = (r + s) * c, e[10] = (o + i) * u, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = o * i * 2 * u, e[15] = 0, e;
}
function Lh(e, t, n, s, r) {
  const i = 1 / Math.tan(t / 2);
  if (e[0] = i / n, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, r != null && r !== 1 / 0) {
    const o = 1 / (s - r);
    e[10] = (r + s) * o, e[14] = 2 * r * s * o;
  } else
    e[10] = -1, e[14] = -2 * s;
  return e;
}
const Gh = Lh;
function Ph(e, t, n, s, r, i, o) {
  const a = 1 / (t - n), c = 1 / (s - r), u = 1 / (i - o);
  return e[0] = -2 * a, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * c, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * u, e[11] = 0, e[12] = (t + n) * a, e[13] = (r + s) * c, e[14] = (o + i) * u, e[15] = 1, e;
}
const Nh = Ph;
function Uh(e, t, n, s) {
  let r, i, o, a, c, u, l, h, f, d;
  const m = t[0], g = t[1], p = t[2], C = s[0], w = s[1], y = s[2], B = n[0], R = n[1], E = n[2];
  return Math.abs(m - B) < Se && Math.abs(g - R) < Se && Math.abs(p - E) < Se ? Th(e) : (h = m - B, f = g - R, d = p - E, r = 1 / Math.sqrt(h * h + f * f + d * d), h *= r, f *= r, d *= r, i = w * d - y * f, o = y * h - C * d, a = C * f - w * h, r = Math.sqrt(i * i + o * o + a * a), r ? (r = 1 / r, i *= r, o *= r, a *= r) : (i = 0, o = 0, a = 0), c = f * a - d * o, u = d * i - h * a, l = h * o - f * i, r = Math.sqrt(c * c + u * u + l * l), r ? (r = 1 / r, c *= r, u *= r, l *= r) : (c = 0, u = 0, l = 0), e[0] = i, e[1] = c, e[2] = h, e[3] = 0, e[4] = o, e[5] = u, e[6] = f, e[7] = 0, e[8] = a, e[9] = l, e[10] = d, e[11] = 0, e[12] = -(i * m + o * g + a * p), e[13] = -(c * m + u * g + l * p), e[14] = -(h * m + f * g + d * p), e[15] = 1, e);
}
function Hh() {
  const e = new Rt(4);
  return Rt != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e;
}
function Jh(e, t, n) {
  return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e;
}
function Vh(e, t, n) {
  return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e;
}
function jh(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3];
  return Math.sqrt(t * t + n * n + s * s + r * r);
}
function kh(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3];
  return t * t + n * n + s * s + r * r;
}
function Kh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3];
  let o = n * n + s * s + r * r + i * i;
  return o > 0 && (o = 1 / Math.sqrt(o)), e[0] = n * o, e[1] = s * o, e[2] = r * o, e[3] = i * o, e;
}
function zh(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
}
function Wh(e, t, n, s) {
  const r = t[0], i = t[1], o = t[2], a = t[3];
  return e[0] = r + s * (n[0] - r), e[1] = i + s * (n[1] - i), e[2] = o + s * (n[2] - o), e[3] = a + s * (n[3] - a), e;
}
function Xh(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3];
  return e[0] = n[0] * s + n[4] * r + n[8] * i + n[12] * o, e[1] = n[1] * s + n[5] * r + n[9] * i + n[13] * o, e[2] = n[2] * s + n[6] * r + n[10] * i + n[14] * o, e[3] = n[3] * s + n[7] * r + n[11] * i + n[15] * o, e;
}
function Qh(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[0], a = n[1], c = n[2], u = n[3], l = u * s + a * i - c * r, h = u * r + c * s - o * i, f = u * i + o * r - a * s, d = -o * s - a * r - c * i;
  return e[0] = l * u + d * -o + h * -c - f * -a, e[1] = h * u + d * -a + f * -o - l * -c, e[2] = f * u + d * -c + l * -a - h * -o, e[3] = t[3], e;
}
(function() {
  const e = Hh();
  return function(t, n, s, r, i, o) {
    let a, c;
    for (n || (n = 4), s || (s = 0), r ? c = Math.min(r * n + s, t.length) : c = t.length, a = s; a < c; a += n)
      e[0] = t[a], e[1] = t[a + 1], e[2] = t[a + 2], e[3] = t[a + 3], i(e, e, o), t[a] = e[0], t[a + 1] = e[1], t[a + 2] = e[2], t[a + 3] = e[3];
    return t;
  };
})();
var Ps;
(function(e) {
  e[e.COL0ROW0 = 0] = "COL0ROW0", e[e.COL0ROW1 = 1] = "COL0ROW1", e[e.COL0ROW2 = 2] = "COL0ROW2", e[e.COL0ROW3 = 3] = "COL0ROW3", e[e.COL1ROW0 = 4] = "COL1ROW0", e[e.COL1ROW1 = 5] = "COL1ROW1", e[e.COL1ROW2 = 6] = "COL1ROW2", e[e.COL1ROW3 = 7] = "COL1ROW3", e[e.COL2ROW0 = 8] = "COL2ROW0", e[e.COL2ROW1 = 9] = "COL2ROW1", e[e.COL2ROW2 = 10] = "COL2ROW2", e[e.COL2ROW3 = 11] = "COL2ROW3", e[e.COL3ROW0 = 12] = "COL3ROW0", e[e.COL3ROW1 = 13] = "COL3ROW1", e[e.COL3ROW2 = 14] = "COL3ROW2", e[e.COL3ROW3 = 15] = "COL3ROW3";
})(Ps || (Ps = {}));
const qh = 45 * Math.PI / 180, Yh = 1, rs = 0.1, is = 500, $h = Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
class V extends ca {
  static get IDENTITY() {
    return tf();
  }
  static get ZERO() {
    return Zh();
  }
  get ELEMENTS() {
    return 16;
  }
  get RANK() {
    return 4;
  }
  get INDICES() {
    return Ps;
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
    return this.copy($h);
  }
  fromObject(t) {
    return this.check();
  }
  fromQuaternion(t) {
    return vh(this, t), this.check();
  }
  frustum(t) {
    const {
      left: n,
      right: s,
      bottom: r,
      top: i,
      near: o = rs,
      far: a = is
    } = t;
    return a === 1 / 0 ? ef(this, n, s, r, i, o) : Dh(this, n, s, r, i, o, a), this.check();
  }
  lookAt(t) {
    const {
      eye: n,
      center: s = [0, 0, 0],
      up: r = [0, 1, 0]
    } = t;
    return Uh(this, n, s, r), this.check();
  }
  ortho(t) {
    const {
      left: n,
      right: s,
      bottom: r,
      top: i,
      near: o = rs,
      far: a = is
    } = t;
    return Nh(this, n, s, r, i, o, a), this.check();
  }
  orthographic(t) {
    const {
      fovy: n = qh,
      aspect: s = Yh,
      focalDistance: r = 1,
      near: i = rs,
      far: o = is
    } = t;
    ii(n);
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
    return ii(n), Gh(this, n, s, r, i), this.check();
  }
  determinant() {
    return wh(this);
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
    return bh(this, this), this.check();
  }
  invert() {
    return _h(this, this), this.check();
  }
  multiplyLeft(t) {
    return ri(this, t, this), this.check();
  }
  multiplyRight(t) {
    return ri(this, this, t), this.check();
  }
  rotateX(t) {
    return Sh(this, this, t), this.check();
  }
  rotateY(t) {
    return xh(this, this, t), this.check();
  }
  rotateZ(t) {
    return Oh(this, this, t), this.check();
  }
  rotateXYZ(t) {
    return this.rotateX(t[0]).rotateY(t[1]).rotateZ(t[2]);
  }
  rotateAxis(t, n) {
    return Ih(this, this, t, n), this.check();
  }
  scale(t) {
    return Mh(this, this, Array.isArray(t) ? t : [t, t, t]), this.check();
  }
  translate(t) {
    return Rh(this, this, t), this.check();
  }
  transform(t, n) {
    return t.length === 4 ? (n = Xh(n || [-0, -0, -0, -0], t, this), Ie(n, 4), n) : this.transformAsPoint(t, n);
  }
  transformAsPoint(t, n) {
    const {
      length: s
    } = t;
    let r;
    switch (s) {
      case 2:
        r = ta(n || [-0, -0], t, this);
        break;
      case 3:
        r = fr(n || [-0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return Ie(r, t.length), r;
  }
  transformAsVector(t, n) {
    let s;
    switch (t.length) {
      case 2:
        s = ea(n || [-0, -0], t, this);
        break;
      case 3:
        s = na(n || [-0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return Ie(s, t.length), s;
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
let Ze, tn;
function Zh() {
  return Ze || (Ze = new V([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), Object.freeze(Ze)), Ze;
}
function tf() {
  return tn || (tn = new V(), Object.freeze(tn)), tn;
}
function ii(e) {
  if (e > Math.PI * 2)
    throw Error("expected radians");
}
function ef(e, t, n, s, r, i) {
  const o = 2 * i / (n - t), a = 2 * i / (r - s), c = (n + t) / (n - t), u = (r + s) / (r - s), l = -1, h = -1, f = -2 * i;
  return e[0] = o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = a, e[6] = 0, e[7] = 0, e[8] = c, e[9] = u, e[10] = l, e[11] = h, e[12] = 0, e[13] = 0, e[14] = f, e[15] = 0, e;
}
function oi() {
  const e = new Rt(4);
  return Rt != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e;
}
function nf(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e;
}
function ua(e, t, n) {
  n = n * 0.5;
  const s = Math.sin(n);
  return e[0] = s * t[0], e[1] = s * t[1], e[2] = s * t[2], e[3] = Math.cos(n), e;
}
function ai(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = n[0], c = n[1], u = n[2], l = n[3];
  return e[0] = s * l + o * a + r * u - i * c, e[1] = r * l + o * c + i * a - s * u, e[2] = i * l + o * u + s * c - r * a, e[3] = o * l - s * a - r * c - i * u, e;
}
function sf(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], a = Math.sin(n), c = Math.cos(n);
  return e[0] = s * c + o * a, e[1] = r * c + i * a, e[2] = i * c - r * a, e[3] = o * c - s * a, e;
}
function rf(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], a = Math.sin(n), c = Math.cos(n);
  return e[0] = s * c - i * a, e[1] = r * c + o * a, e[2] = i * c + s * a, e[3] = o * c - r * a, e;
}
function of(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], a = Math.sin(n), c = Math.cos(n);
  return e[0] = s * c + r * a, e[1] = r * c - s * a, e[2] = i * c + o * a, e[3] = o * c - i * a, e;
}
function af(e, t) {
  const n = t[0], s = t[1], r = t[2];
  return e[0] = n, e[1] = s, e[2] = r, e[3] = Math.sqrt(Math.abs(1 - n * n - s * s - r * r)), e;
}
function pn(e, t, n, s) {
  const r = t[0], i = t[1], o = t[2], a = t[3];
  let c = n[0], u = n[1], l = n[2], h = n[3], f, d, m, g, p;
  return f = r * c + i * u + o * l + a * h, f < 0 && (f = -f, c = -c, u = -u, l = -l, h = -h), 1 - f > Se ? (d = Math.acos(f), p = Math.sin(d), m = Math.sin((1 - s) * d) / p, g = Math.sin(s * d) / p) : (m = 1 - s, g = s), e[0] = m * r + g * c, e[1] = m * i + g * u, e[2] = m * o + g * l, e[3] = m * a + g * h, e;
}
function cf(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n * n + s * s + r * r + i * i, a = o ? 1 / o : 0;
  return e[0] = -n * a, e[1] = -s * a, e[2] = -r * a, e[3] = i * a, e;
}
function uf(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e;
}
function la(e, t) {
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
const lf = Jh, hf = Vh, ff = zh, df = Wh, mf = jh, gf = kh, ha = Kh, Af = function() {
  const e = ra(), t = ei(1, 0, 0), n = ei(0, 1, 0);
  return function(s, r, i) {
    const o = hr(r, i);
    return o < -0.999999 ? (An(e, t, r), hh(e) < 1e-6 && An(e, n, r), oh(e, e), ua(s, e, Math.PI), s) : o > 0.999999 ? (s[0] = 0, s[1] = 0, s[2] = 0, s[3] = 1, s) : (An(e, r, i), s[0] = e[0], s[1] = e[1], s[2] = e[2], s[3] = 1 + o, ha(s, s));
  };
}();
(function() {
  const e = oi(), t = oi();
  return function(n, s, r, i, o, a) {
    return pn(e, s, o, a), pn(t, r, i, a), pn(n, e, t, 2 * a * (1 - a)), n;
  };
})();
(function() {
  const e = fh();
  return function(t, n, s, r) {
    return e[0] = s[0], e[3] = s[1], e[6] = s[2], e[1] = r[0], e[4] = r[1], e[7] = r[2], e[2] = -n[0], e[5] = -n[1], e[8] = -n[2], ha(t, la(t, e));
  };
})();
const pf = [0, 0, 0, 1];
class wn extends ur {
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
    return la(this, t), this.check();
  }
  fromAxisRotation(t, n) {
    return ua(this, t, n), this.check();
  }
  identity() {
    return nf(this), this.check();
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
    return mf(this);
  }
  lengthSquared() {
    return gf(this);
  }
  dot(t) {
    return ff(this, t);
  }
  rotationTo(t, n) {
    return Af(this, t, n), this.check();
  }
  add(t) {
    return lf(this, this, t), this.check();
  }
  calculateW() {
    return af(this, this), this.check();
  }
  conjugate() {
    return uf(this, this), this.check();
  }
  invert() {
    return cf(this, this), this.check();
  }
  lerp(t, n, s) {
    return s === void 0 ? this.lerp(this, t, n) : (df(this, t, n, s), this.check());
  }
  multiplyRight(t) {
    return ai(this, this, t), this.check();
  }
  multiplyLeft(t) {
    return ai(this, t, this), this.check();
  }
  normalize() {
    const t = this.len(), n = t > 0 ? 1 / t : 0;
    return this[0] = this[0] * n, this[1] = this[1] * n, this[2] = this[2] * n, this[3] = this[3] * n, t === 0 && (this[3] = 1), this.check();
  }
  rotateX(t) {
    return sf(this, this, t), this.check();
  }
  rotateY(t) {
    return rf(this, this, t), this.check();
  }
  rotateZ(t) {
    return of(this, this, t), this.check();
  }
  scale(t) {
    return hf(this, this, t), this.check();
  }
  slerp(t, n, s) {
    let r, i, o;
    switch (arguments.length) {
      case 1:
        ({
          start: r = pf,
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
    return pn(this, r, i, o), this.check();
  }
  transformVector4(t, n = new dr()) {
    return Qh(n, t, this), Ie(n, 4);
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
function ve(e) {
  "@babel/helpers - typeof";
  return ve = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ve(e);
}
function yf(e, t) {
  if (ve(e) != "object" || !e)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var s = n.call(e, t || "default");
    if (ve(s) != "object")
      return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Bf(e) {
  var t = yf(e, "string");
  return ve(t) == "symbol" ? t : String(t);
}
function S(e, t, n) {
  return t = Bf(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
const Cf = 0.1, Ef = 1e-12, fa = 1e-15, Tf = 1e-20, bf = 6378137, _f = 6378137, wf = 6356752314245179e-9;
function Un(e) {
  return e;
}
new A();
function Rf(e, t = [], n = Un) {
  return "longitude" in e ? (t[0] = n(e.longitude), t[1] = n(e.latitude), t[2] = e.height) : "x" in e ? (t[0] = n(e.x), t[1] = n(e.y), t[2] = e.z) : (t[0] = n(e[0]), t[1] = n(e[1]), t[2] = e[2]), t;
}
function Mf(e, t = []) {
  return Rf(e, t, tt._cartographicRadians ? Un : Wl);
}
function If(e, t, n = Un) {
  return "longitude" in t ? (t.longitude = n(e[0]), t.latitude = n(e[1]), t.height = e[2]) : "x" in t ? (t.x = n(e[0]), t.y = n(e[1]), t.z = e[2]) : (t[0] = n(e[0]), t[1] = n(e[1]), t[2] = e[2]), t;
}
function Sf(e, t) {
  return If(e, t, tt._cartographicRadians ? Un : Xl);
}
const ci = 1e-14, xf = new A(), ui = {
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
}, os = {
  north: [-1, 0, 0],
  east: [0, 1, 0],
  up: [0, 0, 1],
  south: [1, 0, 0],
  west: [0, -1, 0],
  down: [0, 0, -1]
}, ye = {
  east: new A(),
  north: new A(),
  up: new A(),
  west: new A(),
  south: new A(),
  down: new A()
}, Of = new A(), Ff = new A(), vf = new A();
function li(e, t, n, s, r, i) {
  const o = ui[t] && ui[t][n];
  j(o && (!s || s === o));
  let a, c, u;
  const l = xf.copy(r);
  if (Jt(l.x, 0, ci) && Jt(l.y, 0, ci)) {
    const f = Math.sign(l.z);
    a = Of.fromArray(os[t]), t !== "east" && t !== "west" && a.scale(f), c = Ff.fromArray(os[n]), n !== "east" && n !== "west" && c.scale(f), u = vf.fromArray(os[s]), s !== "east" && s !== "west" && u.scale(f);
  } else {
    const {
      up: f,
      east: d,
      north: m
    } = ye;
    d.set(-l.y, l.x, 0).normalize(), e.geodeticSurfaceNormal(l, f), m.copy(f).cross(d);
    const {
      down: g,
      west: p,
      south: C
    } = ye;
    g.copy(f).scale(-1), p.copy(d).scale(-1), C.copy(m).scale(-1), a = ye[t], c = ye[n], u = ye[s];
  }
  return i[0] = a.x, i[1] = a.y, i[2] = a.z, i[3] = 0, i[4] = c.x, i[5] = c.y, i[6] = c.z, i[7] = 0, i[8] = u.x, i[9] = u.y, i[10] = u.z, i[11] = 0, i[12] = l.x, i[13] = l.y, i[14] = l.z, i[15] = 1, i;
}
const ie = new A(), Df = new A(), Lf = new A();
function Gf(e, t, n = []) {
  const {
    oneOverRadii: s,
    oneOverRadiiSquared: r,
    centerToleranceSquared: i
  } = t;
  ie.from(e);
  const o = ie.x, a = ie.y, c = ie.z, u = s.x, l = s.y, h = s.z, f = o * o * u * u, d = a * a * l * l, m = c * c * h * h, g = f + d + m, p = Math.sqrt(1 / g);
  if (!Number.isFinite(p))
    return;
  const C = Df;
  if (C.copy(e).scale(p), g < i)
    return C.to(n);
  const w = r.x, y = r.y, B = r.z, R = Lf;
  R.set(C.x * w * 2, C.y * y * 2, C.z * B * 2);
  let E = (1 - p) * ie.len() / (0.5 * R.len()), O = 0, F, x, v, k;
  do {
    E -= O, F = 1 / (1 + E * w), x = 1 / (1 + E * y), v = 1 / (1 + E * B);
    const X = F * F, Q = x * x, D = v * v, at = X * F, ee = Q * x, ne = D * v;
    k = f * X + d * Q + m * D - 1;
    const Nt = -2 * (f * at * w + d * ee * y + m * ne * B);
    O = k / Nt;
  } while (Math.abs(k) > Ef);
  return ie.scale([F, x, v]).to(n);
}
const en = new A(), hi = new A(), Pf = new A(), bt = new A(), Nf = new A(), nn = new A();
class J {
  constructor(t = 0, n = 0, s = 0) {
    S(this, "radii", void 0), S(this, "radiiSquared", void 0), S(this, "radiiToTheFourth", void 0), S(this, "oneOverRadii", void 0), S(this, "oneOverRadiiSquared", void 0), S(this, "minimumRadius", void 0), S(this, "maximumRadius", void 0), S(this, "centerToleranceSquared", Cf), S(this, "squaredXOverSquaredZ", void 0), j(t >= 0), j(n >= 0), j(s >= 0), this.radii = new A(t, n, s), this.radiiSquared = new A(t * t, n * n, s * s), this.radiiToTheFourth = new A(t * t * t * t, n * n * n * n, s * s * s * s), this.oneOverRadii = new A(t === 0 ? 0 : 1 / t, n === 0 ? 0 : 1 / n, s === 0 ? 0 : 1 / s), this.oneOverRadiiSquared = new A(t === 0 ? 0 : 1 / (t * t), n === 0 ? 0 : 1 / (n * n), s === 0 ? 0 : 1 / (s * s)), this.minimumRadius = Math.min(t, n, s), this.maximumRadius = Math.max(t, n, s), this.radiiSquared.z !== 0 && (this.squaredXOverSquaredZ = this.radiiSquared.x / this.radiiSquared.z), Object.freeze(this);
  }
  equals(t) {
    return this === t || !!(t && this.radii.equals(t.radii));
  }
  toString() {
    return this.radii.toString();
  }
  cartographicToCartesian(t, n = [0, 0, 0]) {
    const s = hi, r = Pf, [, , i] = t;
    this.geodeticSurfaceNormalCartographic(t, s), r.copy(this.radiiSquared).scale(s);
    const o = Math.sqrt(s.dot(r));
    return r.scale(1 / o), s.scale(i), r.add(s), r.to(n);
  }
  cartesianToCartographic(t, n = [0, 0, 0]) {
    nn.from(t);
    const s = this.scaleToGeodeticSurface(nn, bt);
    if (!s)
      return;
    const r = this.geodeticSurfaceNormal(s, hi), i = Nf;
    i.copy(nn).subtract(s);
    const o = Math.atan2(r.y, r.x), a = Math.asin(r.z), c = Math.sign(hr(i, nn)) * ia(i);
    return Sf([o, a, c], n);
  }
  eastNorthUpToFixedFrame(t, n = new V()) {
    return li(this, "east", "north", "up", t, n);
  }
  localFrameToFixedFrame(t, n, s, r, i = new V()) {
    return li(this, t, n, s, r, i);
  }
  geocentricSurfaceNormal(t, n = [0, 0, 0]) {
    return en.from(t).normalize().to(n);
  }
  geodeticSurfaceNormalCartographic(t, n = [0, 0, 0]) {
    const s = Mf(t), r = s[0], i = s[1], o = Math.cos(i);
    return en.set(o * Math.cos(r), o * Math.sin(r), Math.sin(i)).normalize(), en.to(n);
  }
  geodeticSurfaceNormal(t, n = [0, 0, 0]) {
    return en.from(t).scale(this.oneOverRadiiSquared).normalize().to(n);
  }
  scaleToGeodeticSurface(t, n) {
    return Gf(t, this, n);
  }
  scaleToGeocentricSurface(t, n = [0, 0, 0]) {
    bt.from(t);
    const s = bt.x, r = bt.y, i = bt.z, o = this.oneOverRadiiSquared, a = 1 / Math.sqrt(s * s * o.x + r * r * o.y + i * i * o.z);
    return bt.multiplyScalar(a).to(n);
  }
  transformPositionToScaledSpace(t, n = [0, 0, 0]) {
    return bt.from(t).scale(this.oneOverRadii).to(n);
  }
  transformPositionFromScaledSpace(t, n = [0, 0, 0]) {
    return bt.from(t).scale(this.radii).to(n);
  }
  getSurfaceNormalIntersectionWithZAxis(t, n = 0, s = [0, 0, 0]) {
    j(Jt(this.radii.x, this.radii.y, fa)), j(this.radii.z > 0), bt.from(t);
    const r = bt.z * (1 - this.squaredXOverSquaredZ);
    if (!(Math.abs(r) >= this.radii.z - n))
      return bt.set(0, 0, r).to(s);
  }
}
S(J, "WGS84", new J(bf, _f, wf));
class Uf {
  constructor(t, n, s) {
    this.item = void 0, this.previous = void 0, this.next = void 0, this.item = t, this.previous = n, this.next = s;
  }
}
class Hf {
  constructor() {
    this.head = null, this.tail = null, this._length = 0;
  }
  get length() {
    return this._length;
  }
  add(t) {
    const n = new Uf(t, this.tail, null);
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
class Jf {
  constructor() {
    this._list = void 0, this._sentinel = void 0, this._trimTiles = void 0, this._list = new Hf(), this._sentinel = this._list.add("sentinel"), this._trimTiles = !1;
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
function Vf(e, t) {
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
const mt = {
  OUTSIDE: -1,
  INTERSECTING: 0,
  INSIDE: 1
};
new A();
new A();
const Be = new A(), fi = new A();
class ke {
  constructor(t = [0, 0, 0], n = 0) {
    S(this, "center", void 0), S(this, "radius", void 0), this.radius = -0, this.center = new A(), this.fromCenterRadius(t, n);
  }
  fromCenterRadius(t, n) {
    return this.center.from(t), this.radius = n, this;
  }
  fromCornerPoints(t, n) {
    return n = Be.from(n), this.center = new A().from(t).add(n).scale(0.5), this.radius = this.center.distance(n), this;
  }
  equals(t) {
    return this === t || !!t && this.center.equals(t.center) && this.radius === t.radius;
  }
  clone() {
    return new ke(this.center, this.radius);
  }
  union(t) {
    const n = this.center, s = this.radius, r = t.center, i = t.radius, o = Be.copy(r).subtract(n), a = o.magnitude();
    if (s >= a + i)
      return this.clone();
    if (i >= a + s)
      return t.clone();
    const c = (s + a + i) * 0.5;
    return fi.copy(o).scale((-s + c) / a).add(n), this.center.copy(fi), this.radius = c, this;
  }
  expand(t) {
    const s = Be.from(t).subtract(this.center).magnitude();
    return s > this.radius && (this.radius = s), this;
  }
  transform(t) {
    this.center.transform(t);
    const n = Fh(Be, t);
    return this.radius = Math.max(n[0], Math.max(n[1], n[2])) * this.radius, this;
  }
  distanceSquaredTo(t) {
    const n = this.distanceTo(t);
    return n * n;
  }
  distanceTo(t) {
    const s = Be.from(t).subtract(this.center);
    return Math.max(0, s.len() - this.radius);
  }
  intersectPlane(t) {
    const n = this.center, s = this.radius, i = t.normal.dot(n) + t.distance;
    return i < -s ? mt.OUTSIDE : i < s ? mt.INTERSECTING : mt.INSIDE;
  }
}
const jf = new A(), kf = new A(), sn = new A(), rn = new A(), on = new A(), Kf = new A(), zf = new A(), vt = {
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
class Ke {
  constructor(t = [0, 0, 0], n = [0, 0, 0, 0, 0, 0, 0, 0, 0]) {
    S(this, "center", void 0), S(this, "halfAxes", void 0), this.center = new A().from(t), this.halfAxes = new z(n);
  }
  get halfSize() {
    const t = this.halfAxes.getColumn(0), n = this.halfAxes.getColumn(1), s = this.halfAxes.getColumn(2);
    return [new A(t).len(), new A(n).len(), new A(s).len()];
  }
  get quaternion() {
    const t = this.halfAxes.getColumn(0), n = this.halfAxes.getColumn(1), s = this.halfAxes.getColumn(2), r = new A(t).normalize(), i = new A(n).normalize(), o = new A(s).normalize();
    return new wn().fromMatrix3(new z([...r, ...i, ...o]));
  }
  fromCenterHalfSizeQuaternion(t, n, s) {
    const r = new wn(s), i = new z().fromQuaternion(r);
    return i[0] = i[0] * n[0], i[1] = i[1] * n[0], i[2] = i[2] * n[0], i[3] = i[3] * n[1], i[4] = i[4] * n[1], i[5] = i[5] * n[1], i[6] = i[6] * n[2], i[7] = i[7] * n[2], i[8] = i[8] * n[2], this.center = new A().from(t), this.halfAxes = i, this;
  }
  clone() {
    return new Ke(this.center, this.halfAxes);
  }
  equals(t) {
    return this === t || !!t && this.center.equals(t.center) && this.halfAxes.equals(t.halfAxes);
  }
  getBoundingSphere(t = new ke()) {
    const n = this.halfAxes, s = n.getColumn(0, sn), r = n.getColumn(1, rn), i = n.getColumn(2, on), o = jf.copy(s).add(r).add(i);
    return t.center.copy(this.center), t.radius = o.magnitude(), t;
  }
  intersectPlane(t) {
    const n = this.center, s = t.normal, r = this.halfAxes, i = s.x, o = s.y, a = s.z, c = Math.abs(i * r[vt.COLUMN0ROW0] + o * r[vt.COLUMN0ROW1] + a * r[vt.COLUMN0ROW2]) + Math.abs(i * r[vt.COLUMN1ROW0] + o * r[vt.COLUMN1ROW1] + a * r[vt.COLUMN1ROW2]) + Math.abs(i * r[vt.COLUMN2ROW0] + o * r[vt.COLUMN2ROW1] + a * r[vt.COLUMN2ROW2]), u = s.dot(n) + t.distance;
    return u <= -c ? mt.OUTSIDE : u >= c ? mt.INSIDE : mt.INTERSECTING;
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceSquaredTo(t));
  }
  distanceSquaredTo(t) {
    const n = kf.from(t).subtract(this.center), s = this.halfAxes, r = s.getColumn(0, sn), i = s.getColumn(1, rn), o = s.getColumn(2, on), a = r.magnitude(), c = i.magnitude(), u = o.magnitude();
    r.normalize(), i.normalize(), o.normalize();
    let l = 0, h;
    return h = Math.abs(n.dot(r)) - a, h > 0 && (l += h * h), h = Math.abs(n.dot(i)) - c, h > 0 && (l += h * h), h = Math.abs(n.dot(o)) - u, h > 0 && (l += h * h), l;
  }
  computePlaneDistances(t, n, s = [-0, -0]) {
    let r = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
    const o = this.center, a = this.halfAxes, c = a.getColumn(0, sn), u = a.getColumn(1, rn), l = a.getColumn(2, on), h = Kf.copy(c).add(u).add(l).add(o), f = zf.copy(h).subtract(t);
    let d = n.dot(f);
    return r = Math.min(d, r), i = Math.max(d, i), h.copy(o).add(c).add(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), h.copy(o).add(c).subtract(u).add(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), h.copy(o).add(c).subtract(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).add(u).add(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).add(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).subtract(u).add(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).subtract(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), s[0] = r, s[1] = i, s;
  }
  transform(t) {
    this.center.transformAsPoint(t);
    const n = this.halfAxes.getColumn(0, sn);
    n.transformAsPoint(t);
    const s = this.halfAxes.getColumn(1, rn);
    s.transformAsPoint(t);
    const r = this.halfAxes.getColumn(2, on);
    return r.transformAsPoint(t), this.halfAxes = new z([...n, ...s, ...r]), this;
  }
  getTransform() {
    throw new Error("not implemented");
  }
}
const di = new A(), mi = new A();
class et {
  constructor(t = [0, 0, 1], n = 0) {
    S(this, "normal", void 0), S(this, "distance", void 0), this.normal = new A(), this.distance = -0, this.fromNormalDistance(t, n);
  }
  fromNormalDistance(t, n) {
    return j(Number.isFinite(n)), this.normal.from(t).normalize(), this.distance = n, this;
  }
  fromPointNormal(t, n) {
    t = di.from(t), this.normal.from(n).normalize();
    const s = -this.normal.dot(t);
    return this.distance = s, this;
  }
  fromCoefficients(t, n, s, r) {
    return this.normal.set(t, n, s), j(Jt(this.normal.len(), 1)), this.distance = r, this;
  }
  clone() {
    return new et(this.normal, this.distance);
  }
  equals(t) {
    return Jt(this.distance, t.distance) && Jt(this.normal, t.normal);
  }
  getPointDistance(t) {
    return this.normal.dot(t) + this.distance;
  }
  transform(t) {
    const n = mi.copy(this.normal).transformAsVector(t).normalize(), s = this.normal.scale(-this.distance).transform(t);
    return this.fromPointNormal(s, n);
  }
  projectPointOntoPlane(t, n = [0, 0, 0]) {
    const s = di.from(t), r = this.getPointDistance(s), i = mi.copy(this.normal).scale(r);
    return s.subtract(i).to(n);
  }
}
const gi = [new A([1, 0, 0]), new A([0, 1, 0]), new A([0, 0, 1])], Ai = new A(), Wf = new A();
class ht {
  constructor(t = []) {
    S(this, "planes", void 0), this.planes = t;
  }
  fromBoundingSphere(t) {
    this.planes.length = 2 * gi.length;
    const n = t.center, s = t.radius;
    let r = 0;
    for (const i of gi) {
      let o = this.planes[r], a = this.planes[r + 1];
      o || (o = this.planes[r] = new et()), a || (a = this.planes[r + 1] = new et());
      const c = Ai.copy(i).scale(-s).add(n);
      o.fromPointNormal(c, i);
      const u = Ai.copy(i).scale(s).add(n), l = Wf.copy(i).negate();
      a.fromPointNormal(u, l), r += 2;
    }
    return this;
  }
  computeVisibility(t) {
    let n = mt.INSIDE;
    for (const s of this.planes)
      switch (t.intersectPlane(s)) {
        case mt.OUTSIDE:
          return mt.OUTSIDE;
        case mt.INTERSECTING:
          n = mt.INTERSECTING;
          break;
      }
    return n;
  }
  computeVisibilityWithPlaneMask(t, n) {
    if (j(Number.isFinite(n), "parentPlaneMask is required."), n === ht.MASK_OUTSIDE || n === ht.MASK_INSIDE)
      return n;
    let s = ht.MASK_INSIDE;
    const r = this.planes;
    for (let i = 0; i < this.planes.length; ++i) {
      const o = i < 31 ? 1 << i : 0;
      if (i < 31 && !(n & o))
        continue;
      const a = r[i], c = t.intersectPlane(a);
      if (c === mt.OUTSIDE)
        return ht.MASK_OUTSIDE;
      c === mt.INTERSECTING && (s |= o);
    }
    return s;
  }
}
S(ht, "MASK_OUTSIDE", 4294967295);
S(ht, "MASK_INSIDE", 0);
S(ht, "MASK_INDETERMINATE", 2147483647);
const Xf = new A(), Qf = new A(), qf = new A(), Yf = new A(), $f = new A();
class Rn {
  constructor(t = {}) {
    S(this, "left", void 0), S(this, "_left", void 0), S(this, "right", void 0), S(this, "_right", void 0), S(this, "top", void 0), S(this, "_top", void 0), S(this, "bottom", void 0), S(this, "_bottom", void 0), S(this, "near", void 0), S(this, "_near", void 0), S(this, "far", void 0), S(this, "_far", void 0), S(this, "_cullingVolume", new ht([new et(), new et(), new et(), new et(), new et(), new et()])), S(this, "_perspectiveMatrix", new V()), S(this, "_infinitePerspective", new V());
    const {
      near: n = 1,
      far: s = 5e8
    } = t;
    this.left = t.left, this._left = void 0, this.right = t.right, this._right = void 0, this.top = t.top, this._top = void 0, this.bottom = t.bottom, this._bottom = void 0, this.near = n, this._near = n, this.far = s, this._far = s;
  }
  clone() {
    return new Rn({
      right: this.right,
      left: this.left,
      top: this.top,
      bottom: this.bottom,
      near: this.near,
      far: this.far
    });
  }
  equals(t) {
    return t && t instanceof Rn && this.right === t.right && this.left === t.left && this.top === t.top && this.bottom === t.bottom && this.near === t.near && this.far === t.far;
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
    s = Xf.copy(s).normalize();
    const i = Qf.copy(n).cross(s).normalize(), o = qf.copy(n).multiplyByScalar(this.near).add(t), a = Yf.copy(n).multiplyByScalar(this.far).add(t);
    let c = $f;
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
const Zf = (e) => e !== null && typeof e < "u";
class Mn {
  constructor(t = {}) {
    S(this, "_offCenterFrustum", new Rn()), S(this, "fov", void 0), S(this, "_fov", void 0), S(this, "_fovy", void 0), S(this, "_sseDenominator", void 0), S(this, "aspectRatio", void 0), S(this, "_aspectRatio", void 0), S(this, "near", void 0), S(this, "_near", void 0), S(this, "far", void 0), S(this, "_far", void 0), S(this, "xOffset", void 0), S(this, "_xOffset", void 0), S(this, "yOffset", void 0), S(this, "_yOffset", void 0);
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
    return new Mn({
      aspectRatio: this.aspectRatio,
      fov: this.fov,
      near: this.near,
      far: this.far
    });
  }
  equals(t) {
    return !Zf(t) || !(t instanceof Mn) ? !1 : (this._update(), t._update(), this.fov === t.fov && this.aspectRatio === t.aspectRatio && this.near === t.near && this.far === t.far && this._offCenterFrustum.equals(t._offCenterFrustum));
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
    return this._update(), this._offCenterFrustum.getPixelDimensions(t, n, s, r || new Nn());
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
const It = new z(), td = new z(), ed = new z(), an = new z(), pi = new z();
function nd(e, t = {}) {
  const n = Tf, s = 10;
  let r = 0, i = 0;
  const o = td, a = ed;
  o.identity(), a.copy(e);
  const c = n * sd(a);
  for (; i < s && rd(a) > c; )
    id(a, an), pi.copy(an).transpose(), a.multiplyRight(an), a.multiplyLeft(pi), o.multiplyRight(an), ++r > 2 && (++i, r = 0);
  return t.unitary = o.toTarget(t.unitary), t.diagonal = a.toTarget(t.diagonal), t;
}
function sd(e) {
  let t = 0;
  for (let n = 0; n < 9; ++n) {
    const s = e[n];
    t += s * s;
  }
  return Math.sqrt(t);
}
const Ns = [1, 0, 0], Us = [2, 2, 1];
function rd(e) {
  let t = 0;
  for (let n = 0; n < 3; ++n) {
    const s = e[It.getElementIndex(Us[n], Ns[n])];
    t += 2 * s * s;
  }
  return Math.sqrt(t);
}
function id(e, t) {
  const n = fa;
  let s = 0, r = 1;
  for (let u = 0; u < 3; ++u) {
    const l = Math.abs(e[It.getElementIndex(Us[u], Ns[u])]);
    l > s && (r = u, s = l);
  }
  const i = Ns[r], o = Us[r];
  let a = 1, c = 0;
  if (Math.abs(e[It.getElementIndex(o, i)]) > n) {
    const u = e[It.getElementIndex(o, o)], l = e[It.getElementIndex(i, i)], h = e[It.getElementIndex(o, i)], f = (u - l) / 2 / h;
    let d;
    f < 0 ? d = -1 / (-f + Math.sqrt(1 + f * f)) : d = 1 / (f + Math.sqrt(1 + f * f)), a = 1 / Math.sqrt(1 + d * d), c = d * a;
  }
  return z.IDENTITY.to(t), t[It.getElementIndex(i, i)] = t[It.getElementIndex(o, o)] = a, t[It.getElementIndex(o, i)] = c, t[It.getElementIndex(i, o)] = -c, t;
}
const Ut = new A(), od = new A(), ad = new A(), cd = new A(), ud = new A(), ld = new z(), hd = {
  diagonal: new z(),
  unitary: new z()
};
function fd(e, t = new Ke()) {
  if (!e || e.length === 0)
    return t.halfAxes = new z([0, 0, 0, 0, 0, 0, 0, 0, 0]), t.center = new A(), t;
  const n = e.length, s = new A(0, 0, 0);
  for (const x of e)
    s.add(x);
  const r = 1 / n;
  s.multiplyByScalar(r);
  let i = 0, o = 0, a = 0, c = 0, u = 0, l = 0;
  for (const x of e) {
    const v = Ut.copy(x).subtract(s);
    i += v.x * v.x, o += v.x * v.y, a += v.x * v.z, c += v.y * v.y, u += v.y * v.z, l += v.z * v.z;
  }
  i *= r, o *= r, a *= r, c *= r, u *= r, l *= r;
  const h = ld;
  h[0] = i, h[1] = o, h[2] = a, h[3] = o, h[4] = c, h[5] = u, h[6] = a, h[7] = u, h[8] = l;
  const {
    unitary: f
  } = nd(h, hd), d = t.halfAxes.copy(f);
  let m = d.getColumn(0, ad), g = d.getColumn(1, cd), p = d.getColumn(2, ud), C = -Number.MAX_VALUE, w = -Number.MAX_VALUE, y = -Number.MAX_VALUE, B = Number.MAX_VALUE, R = Number.MAX_VALUE, E = Number.MAX_VALUE;
  for (const x of e)
    Ut.copy(x), C = Math.max(Ut.dot(m), C), w = Math.max(Ut.dot(g), w), y = Math.max(Ut.dot(p), y), B = Math.min(Ut.dot(m), B), R = Math.min(Ut.dot(g), R), E = Math.min(Ut.dot(p), E);
  m = m.multiplyByScalar(0.5 * (B + C)), g = g.multiplyByScalar(0.5 * (R + w)), p = p.multiplyByScalar(0.5 * (E + y)), t.center.copy(m).add(g).add(p);
  const O = od.set(C - B, w - R, y - E).multiplyByScalar(0.5), F = new z([O[0], 0, 0, 0, O[1], 0, 0, 0, O[2]]);
  return t.halfAxes.multiplyRight(F), t;
}
const yi = new A(), as = new A(), Hs = new ht([new et(), new et(), new et(), new et(), new et(), new et()]);
function dd(e, t) {
  const {
    cameraDirection: n,
    cameraUp: s,
    height: r
  } = e, {
    metersPerUnit: i
  } = e.distanceScales, o = yn(e, e.center), a = J.WGS84.eastNorthUpToFixedFrame(o), c = e.unprojectPosition(e.cameraPosition), u = J.WGS84.cartographicToCartesian(c, new A()), l = new A(a.transformAsVector(new A(n).scale(i))).normalize(), h = new A(a.transformAsVector(new A(s).scale(i))).normalize();
  gd(e);
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
    cullingVolume: Hs,
    frameNumber: t,
    sseDenominator: 1.15
  };
}
function md(e, t, n) {
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
function gd(e) {
  const t = e.getFrustumPlanes(), n = Bi(t.near, e.cameraPosition), s = yn(e, n), r = yn(e, e.cameraPosition, as);
  let i = 0;
  Hs.planes[i++].fromPointNormal(s, yi.copy(s).subtract(r));
  for (const o in t) {
    if (o === "near")
      continue;
    const a = t[o], c = Bi(a, n, as), u = yn(e, c, as);
    Hs.planes[i++].fromPointNormal(u, yi.copy(s).subtract(u));
  }
}
function Bi(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : new A();
  const s = e.normal.dot(t);
  return n.copy(e.normal).scale(e.distance - s).add(t), n;
}
function yn(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : new A();
  const s = e.unprojectPosition(t);
  return J.WGS84.cartographicToCartesian(s, n);
}
const Ad = 6378137, pd = 6378137, Js = 6356752314245179e-9, ue = new A();
function yd(e, t) {
  if (e instanceof Ke) {
    const {
      halfAxes: n
    } = e, s = Cd(n);
    return Math.log2(Js / (s + t[2]));
  } else if (e instanceof ke) {
    const {
      radius: n
    } = e;
    return Math.log2(Js / (n + t[2]));
  } else if (e.width && e.height) {
    const {
      width: n,
      height: s
    } = e, r = Math.log2(Ad / n), i = Math.log2(pd / s);
    return (r + i) / 2;
  }
  return 1;
}
function da(e, t, n) {
  J.WGS84.cartographicToCartesian([e.xmax, e.ymax, e.zmax], ue);
  const s = Math.sqrt(Math.pow(ue[0] - n[0], 2) + Math.pow(ue[1] - n[1], 2) + Math.pow(ue[2] - n[2], 2));
  return Math.log2(Js / (s + t[2]));
}
function Bd(e, t, n) {
  const [s, r, i, o] = e;
  return da({
    xmin: s,
    xmax: i,
    ymin: r,
    ymax: o,
    zmin: 0,
    zmax: 0
  }, t, n);
}
function Cd(e) {
  e.getColumn(0, ue);
  const t = e.getColumn(1), n = e.getColumn(2);
  return ue.add(t).add(n).len();
}
const ut = {
  UNLOADED: 0,
  LOADING: 1,
  PROCESSING: 2,
  READY: 3,
  EXPIRED: 4,
  FAILED: 5
};
let Gt = function(e) {
  return e[e.ADD = 1] = "ADD", e[e.REPLACE = 2] = "REPLACE", e;
}({}), zt = function(e) {
  return e.EMPTY = "empty", e.SCENEGRAPH = "scenegraph", e.POINTCLOUD = "pointcloud", e.MESH = "mesh", e;
}({}), At = function(e) {
  return e.I3S = "I3S", e.TILES3D = "TILES3D", e;
}({}), Hn = function(e) {
  return e.GEOMETRIC_ERROR = "geometricError", e.MAX_SCREEN_THRESHOLD = "maxScreenThreshold", e;
}({});
const Ed = {
  NOT_COMPUTED: -1,
  USE_OPTIMIZATION: 1,
  SKIP_OPTIMIZATION: 0
};
function ma(e) {
  return e != null;
}
const rt = new A(), Bn = new A(), Td = new A(), bd = new A(), kt = new A(), Ci = new A(), Ei = new A(), Ti = new A();
function cs(e, t, n) {
  if (U(e, "3D Tile: boundingVolume must be defined"), e.box)
    return ga(e.box, t, n);
  if (e.region)
    return Rd(e.region);
  if (e.sphere)
    return wd(e.sphere, t, n);
  throw new Error("3D Tile: boundingVolume must contain a sphere, region, or box");
}
function _d(e, t) {
  if (e.box)
    return Md(t);
  if (e.region) {
    const [n, s, r, i, o, a] = e.region;
    return [[_t(n), _t(s), o], [_t(r), _t(i), a]];
  }
  if (e.sphere)
    return Id(t);
  throw new Error("Unkown boundingVolume type");
}
function ga(e, t, n) {
  const s = new A(e[0], e[1], e[2]);
  t.transform(s, s);
  let r = [];
  if (e.length === 10) {
    const u = e.slice(3, 6), l = new wn();
    l.fromArray(e, 6);
    const h = new A([1, 0, 0]), f = new A([0, 1, 0]), d = new A([0, 0, 1]);
    h.transformByQuaternion(l), h.scale(u[0]), f.transformByQuaternion(l), f.scale(u[1]), d.transformByQuaternion(l), d.scale(u[2]), r = [...h.toArray(), ...f.toArray(), ...d.toArray()];
  } else
    r = [...e.slice(3, 6), ...e.slice(6, 9), ...e.slice(9, 12)];
  const i = t.transformAsVector(r.slice(0, 3)), o = t.transformAsVector(r.slice(3, 6)), a = t.transformAsVector(r.slice(6, 9)), c = new z([i[0], i[1], i[2], o[0], o[1], o[2], a[0], a[1], a[2]]);
  return ma(n) ? (n.center = s, n.halfAxes = c, n) : new Ke(s, c);
}
function wd(e, t, n) {
  const s = new A(e[0], e[1], e[2]);
  t.transform(s, s);
  const r = t.getScale(Bn), i = Math.max(Math.max(r[0], r[1]), r[2]), o = e[3] * i;
  return ma(n) ? (n.center = s, n.radius = o, n) : new ke(s, o);
}
function Rd(e) {
  const [t, n, s, r, i, o] = e, a = J.WGS84.cartographicToCartesian([_t(t), _t(r), i], Td), c = J.WGS84.cartographicToCartesian([_t(s), _t(n), o], bd), u = new A().addVectors(a, c).multiplyByScalar(0.5);
  return J.WGS84.cartesianToCartographic(u, kt), J.WGS84.cartographicToCartesian([_t(s), kt[1], kt[2]], Ci), J.WGS84.cartographicToCartesian([kt[0], _t(r), kt[2]], Ei), J.WGS84.cartographicToCartesian([kt[0], kt[1], o], Ti), ga([...u, ...Ci.subtract(u), ...Ei.subtract(u), ...Ti.subtract(u)], new V());
}
function Md(e) {
  const t = Aa(), {
    halfAxes: n
  } = e, s = new A(n.getColumn(0)), r = new A(n.getColumn(1)), i = new A(n.getColumn(2));
  for (let o = 0; o < 2; o++) {
    for (let a = 0; a < 2; a++) {
      for (let c = 0; c < 2; c++)
        rt.copy(e.center), rt.add(s), rt.add(r), rt.add(i), pa(t, rt), i.negate();
      r.negate();
    }
    s.negate();
  }
  return t;
}
function Id(e) {
  const t = Aa(), {
    center: n,
    radius: s
  } = e, r = J.WGS84.scaleToGeodeticSurface(n, rt);
  let i;
  r ? i = J.WGS84.geodeticSurfaceNormal(r) : i = new A(0, 0, 1);
  let o = new A(i[2], -i[1], 0);
  o.len() > 0 ? o.normalize() : o = new A(0, 1, 0);
  const a = o.clone().cross(i);
  for (const c of [o, a, i]) {
    Bn.copy(c).scale(s);
    for (let u = 0; u < 2; u++)
      rt.copy(n), rt.add(Bn), pa(t, rt), Bn.negate();
  }
  return t;
}
function Aa() {
  return [[1 / 0, 1 / 0, 1 / 0], [-1 / 0, -1 / 0, -1 / 0]];
}
function pa(e, t) {
  J.WGS84.cartesianToCartographic(t, rt), e[0][0] = Math.min(e[0][0], rt[0]), e[0][1] = Math.min(e[0][1], rt[1]), e[0][2] = Math.min(e[0][2], rt[2]), e[1][0] = Math.max(e[1][0], rt[0]), e[1][1] = Math.max(e[1][1], rt[1]), e[1][2] = Math.max(e[1][2], rt[2]);
}
new A();
new A();
new V();
new A();
new A();
new A();
function Sd(e, t) {
  const n = e * t;
  return 1 - Math.exp(-(n * n));
}
function xd(e, t) {
  if (e.dynamicScreenSpaceError && e.dynamicScreenSpaceErrorComputedDensity) {
    const n = e.dynamicScreenSpaceErrorComputedDensity, s = e.dynamicScreenSpaceErrorFactor;
    return Sd(t, n) * s;
  }
  return 0;
}
function Od(e, t, n) {
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
  return l -= xd(s, o), l;
}
const us = new A(), bi = new A(), Ht = new A(), _i = new A(), Fd = new A(), ls = new V(), wi = new V();
function vd(e, t) {
  if (e.lodMetricValue === 0 || isNaN(e.lodMetricValue))
    return "DIG";
  const n = 2 * ya(e, t);
  return n < 2 ? "OUT" : !e.header.children || n <= e.lodMetricValue ? "DRAW" : e.header.children ? "DIG" : "OUT";
}
function ya(e, t) {
  const {
    topDownViewport: n
  } = t, s = e.header.mbs[1], r = e.header.mbs[0], i = e.header.mbs[2], o = e.header.mbs[3], a = [...e.boundingVolume.center], c = n.unprojectPosition(n.cameraPosition);
  J.WGS84.cartographicToCartesian(c, us), bi.copy(us).subtract(a).normalize(), J.WGS84.eastNorthUpToFixedFrame(a, ls), wi.copy(ls).invert(), Ht.copy(us).transform(wi);
  const u = Math.sqrt(Ht[0] * Ht[0] + Ht[1] * Ht[1]), l = u * u / Ht[2];
  _i.copy([Ht[0], Ht[1], l]);
  const f = _i.transform(ls).subtract(a).normalize(), m = bi.cross(f).normalize().scale(o).add(a), g = J.WGS84.cartesianToCartographic(m), p = n.project([r, s, i]), C = n.project(g);
  return Fd.copy(p).subtract(C).magnitude();
}
function Dd(e) {
  return {
    assetGltfUpAxis: e.asset && e.asset.gltfUpAxis || "Y"
  };
}
class Ri {
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
const Ld = {
  loadSiblings: !1,
  skipLevelOfDetail: !1,
  updateTransforms: !0,
  onTraversalEnd: () => {
  },
  viewportTraversersMap: {},
  basePath: ""
};
class Jn {
  traversalFinished(t) {
    return !0;
  }
  constructor(t) {
    this.options = void 0, this.root = null, this.selectedTiles = {}, this.requestedTiles = {}, this.emptyTiles = {}, this.lastUpdate = (/* @__PURE__ */ new Date()).getTime(), this.updateDebounceTime = 1e3, this._traversalStack = new Ri(), this._emptyTraversalStack = new Ri(), this._frameNumber = null, this.options = {
      ...Ld,
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
      i.hasRenderContent ? i.refine === Gt.ADD ? (this.loadTile(i, n), this.selectTile(i, n)) : i.refine === Gt.REPLACE && (this.loadTile(i, n), u && this.selectTile(i, n)) : (this.emptyTiles[i.id] = i, this.loadTile(i, n), u && this.selectTile(i, n)), this.touchTile(i, n), i._shouldRefine = o && c;
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
    const c = t.refine === Gt.REPLACE && t.hasRenderContent && !o;
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
const Mi = new A();
function Gd(e) {
  return e != null;
}
class Vs {
  constructor(t, n, s) {
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
    this.tileset = void 0, this.header = void 0, this.id = void 0, this.url = void 0, this.parent = void 0, this.refine = void 0, this.type = void 0, this.contentUrl = void 0, this.lodMetricType = "geometricError", this.lodMetricValue = 0, this.boundingVolume = null, this.content = null, this.contentState = ut.UNLOADED, this.gpuMemoryUsageInBytes = 0, this.children = [], this.depth = 0, this.viewportIds = [], this.transform = new V(), this.extensions = null, this.implicitTiling = null, this.userData = {}, this.computedTransform = void 0, this.hasEmptyContent = !1, this.hasTilesetContent = !1, this.traverser = new Jn({}), this._cacheNode = null, this._frameNumber = null, this._expireDate = null, this._expiredContent = null, this._boundingBox = void 0, this._distanceToCamera = 0, this._screenSpaceError = 0, this._visibilityPlaneMask = void 0, this._visible = void 0, this._contentBoundingVolume = void 0, this._viewerRequestVolume = void 0, this._initialTransform = new V(), this._priority = 0, this._selectedFrame = 0, this._requestedFrame = 0, this._selectionDepth = 0, this._touchedFrame = 0, this._centerZDepth = 0, this._shouldRefine = !1, this._stackLength = 0, this._visitedFrame = 0, this._inRequestVolume = !1, this._lodJudge = null, this.header = n, this.tileset = t, this.id = r || n.id, this.url = n.url, this.parent = s, this.refine = this._getRefine(n.refine), this.type = n.type, this.contentUrl = n.contentUrl, this._initializeLodMetric(n), this._initializeTransforms(n), this._initializeBoundingVolumes(n), this._initializeContent(n), this._initializeRenderingState(n), Object.seal(this);
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
    return this._boundingBox || (this._boundingBox = _d(this.header.boundingVolume, this.boundingVolume)), this._boundingBox;
  }
  getScreenSpaceError(t, n) {
    switch (this.tileset.type) {
      case At.I3S:
        return ya(this, t);
      case At.TILES3D:
        return Od(this, t, n);
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
    } = t.options, s = this.refine === Gt.ADD || n;
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
      return this.content = await fe(s, r, i), this.tileset.options.contentLoader && await this.tileset.options.contentLoader(this), this._isTileset() && this.tileset._initializeTileHeaders(this.content, this), this.contentState = ut.READY, this._onContentLoaded(), !0;
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
    const s = this.parent, r = s ? s._visibilityPlaneMask : ht.MASK_INDETERMINATE;
    if (this.tileset._traverser.options.updateTransforms) {
      const i = s ? s.computedTransform : this.tileset.modelMatrix;
      this._updateTransform(i);
    }
    this._distanceToCamera = this.distanceToTile(t), this._screenSpaceError = this.getScreenSpaceError(t, !1), this._visibilityPlaneMask = this.visibility(t, r), this._visible = this._visibilityPlaneMask !== ht.MASK_OUTSIDE, this._inRequestVolume = this.insideViewerRequestVolume(t), this._frameNumber = t.frameNumber, this.viewportIds = n;
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
    return Mi.subVectors(s.center, n.position), n.direction.dot(Mi);
  }
  insideViewerRequestVolume(t) {
    const n = this._viewerRequestVolume;
    return !n || n.distanceSquaredTo(t.camera.position) <= 0;
  }
  updateExpiration() {
    if (Gd(this._expireDate) && this.contentReady && !this.hasEmptyContent) {
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
    this.depth = t.level || (this.parent ? this.parent.depth + 1 : 0), this._shouldRefine = !1, this._distanceToCamera = 0, this._centerZDepth = 0, this._screenSpaceError = 0, this._visibilityPlaneMask = ht.MASK_INDETERMINATE, this._visible = void 0, this._inRequestVolume = !1, this._stackLength = 0, this._selectionDepth = 0, this._frameNumber = 0, this._touchedFrame = 0, this._visitedFrame = 0, this._selectedFrame = 0, this._requestedFrame = 0, this._priority = 0;
  }
  _getRefine(t) {
    return t || this.parent && this.parent.refine || Gt.REPLACE;
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
    this.boundingVolume = cs(t.boundingVolume, this.computedTransform, this.boundingVolume);
    const n = t.content;
    n && (n.boundingVolume && (this._contentBoundingVolume = cs(n.boundingVolume, this.computedTransform, this._contentBoundingVolume)), t.viewerRequestVolume && (this._viewerRequestVolume = cs(t.viewerRequestVolume, this.computedTransform, this._viewerRequestVolume)));
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
        return Dd(this.tileset.tileset);
    }
  }
}
class Pd extends Jn {
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
    const r = t.refine === Gt.REPLACE, i = t._optimChildrenWithinParent === Ed.USE_OPTIMIZATION;
    if (r && i && s && !this.anyChildrenVisible(t, n)) {
      t._visible = !1;
      return;
    }
  }
  meetsScreenSpaceErrorEarly(t, n) {
    const {
      parent: s
    } = t;
    return !s || s.hasTilesetContent || s.refine !== Gt.ADD ? !1 : !this.shouldRefine(t, n, !0);
  }
}
class Nd {
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
const hs = {
  REQUESTED: "REQUESTED",
  COMPLETED: "COMPLETED",
  ERROR: "ERROR"
};
class Ud {
  constructor() {
    this._statusMap = void 0, this.pendingTilesRegister = new Nd(), this._statusMap = {};
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
        status: hs.REQUESTED
      }, this.pendingTilesRegister.register(o, i), t().then((a) => {
        this._statusMap[n].status = hs.COMPLETED;
        const {
          frameNumber: c,
          viewport: {
            id: u
          }
        } = this._statusMap[n].frameState;
        this.pendingTilesRegister.deregister(u, c), this._statusMap[n].callback(a, r);
      }).catch((a) => {
        this._statusMap[n].status = hs.ERROR;
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
class Hd extends Jn {
  constructor(t) {
    super(t), this._tileManager = void 0, this._tileManager = new Ud();
  }
  traversalFinished(t) {
    return !this._tileManager.hasPendingTiles(t.viewport.id, this._frameNumber || 0);
  }
  shouldRefine(t, n) {
    return t._lodJudge = vd(t, n), t._lodJudge === "DIG";
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
    return await fe(r, s, i);
  }
  _onTileLoad(t, n, s) {
    const r = new Vs(n.tileset, t, n, s);
    n.children.push(r);
    const i = this._tileManager.find(r.id).frameState;
    this.updateTile(r, i), this._frameNumber === i.frameNumber && (this.traversalFinished(i) || (/* @__PURE__ */ new Date()).getTime() - this.lastUpdate > this.updateDebounceTime) && this.executeTraversal(r, i);
  }
}
const Jd = {
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
}, cn = "Tiles In Tileset(s)", fs = "Tiles In Memory", Ii = "Tiles In View", Si = "Tiles To Render", xi = "Tiles Loaded", ds = "Tiles Loading", Oi = "Tiles Unloaded", Fi = "Failed Tile Loads", vi = "Points/Vertices", ms = "Tile Memory Use", Di = "Maximum Screen Space Error";
class Vd {
  constructor(t, n) {
    this.options = void 0, this.loadOptions = void 0, this.type = void 0, this.tileset = void 0, this.loader = void 0, this.url = void 0, this.basePath = void 0, this.modelMatrix = void 0, this.ellipsoid = void 0, this.lodMetricType = void 0, this.lodMetricValue = void 0, this.refine = void 0, this.root = null, this.roots = {}, this.asset = {}, this.description = "", this.properties = void 0, this.extras = null, this.attributions = {}, this.credits = {}, this.stats = void 0, this.contentFormats = {
      draco: !1,
      meshopt: !1,
      dds: !1,
      ktx2: !1
    }, this.cartographicCenter = null, this.cartesianCenter = null, this.zoom = 1, this.boundingVolume = null, this.dynamicScreenSpaceErrorComputedDensity = 0, this.maximumMemoryUsage = 32, this.gpuMemoryUsageInBytes = 0, this.memoryAdjustedScreenSpaceError = 0, this._cacheBytes = 0, this._cacheOverflowBytes = 0, this._frameNumber = 0, this._queryParams = {}, this._extensionsUsed = [], this._tiles = {}, this._pendingCount = 0, this.selectedTiles = [], this.traverseCounter = 0, this.geometricError = 0, this.lastUpdatedVieports = null, this._requestedTiles = [], this._emptyTiles = [], this.frameStateData = {}, this._traverser = void 0, this._cache = new Jf(), this._requestScheduler = void 0, this.updatePromise = null, this.tilesetInitializationPromise = void 0, this.options = {
      ...Jd,
      ...n
    }, this.tileset = t, this.loader = t.loader, this.type = t.type, this.url = t.url, this.basePath = t.basePath || rr(this.url), this.modelMatrix = this.options.modelMatrix, this.ellipsoid = this.options.ellipsoid, this.lodMetricType = t.lodMetricType, this.lodMetricValue = t.lodMetricValue, this.refine = t.root.refine, this.loadOptions = this.options.loadOptions || {}, this._traverser = this._initializeTraverser(), this._requestScheduler = new Eu({
      throttleRequests: this.options.throttleRequests,
      maxRequests: this.options.maxRequests
    }), this.memoryAdjustedScreenSpaceError = this.options.maximumScreenSpaceError, this._cacheBytes = this.options.maximumMemoryUsage * 1024 * 1024, this._cacheOverflowBytes = this.options.memoryCacheOverflow * 1024 * 1024, this.stats = new Lo({
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
      const o = dd(r, this._frameNumber);
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
    const s = this.frameStateData[n], r = Object.values(this._traverser.selectedTiles), [i, o] = md(r, t, this.options.maximumTilesSelected);
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
    this.stats.get(Ii).count = this.selectedTiles.length, this.stats.get(Si).count = t, this.stats.get(vi).count = n, this.stats.get(Di).count = this.memoryAdjustedScreenSpaceError;
  }
  async _initializeTileSet(t) {
    this.type === At.I3S && (this.calculateViewPropsI3S(), t.root = await t.root), this.root = this._initializeTileHeaders(t, null), this.type === At.TILES3D && (this._initializeTiles3DTileset(t), this.calculateViewPropsTiles3D()), this.type === At.I3S && this._initializeI3STileset();
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
      this.cartographicCenter = new A(r + (i - r) / 2, o + (a - o) / 2, c + (u - c) / 2), this.cartesianCenter = new A(), J.WGS84.cartographicToCartesian(this.cartographicCenter, this.cartesianCenter), this.zoom = da(n, this.cartographicCenter, this.cartesianCenter);
      return;
    }
    const s = (t = this.tileset.store) === null || t === void 0 ? void 0 : t.extent;
    if (s) {
      const [r, i, o, a] = s;
      this.cartographicCenter = new A(r + (o - r) / 2, i + (a - i) / 2, 0), this.cartesianCenter = new A(), J.WGS84.cartographicToCartesian(this.cartographicCenter, this.cartesianCenter), this.zoom = Bd(s, this.cartographicCenter, this.cartesianCenter);
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
    n[0] !== 0 || n[1] !== 0 || n[2] !== 0 ? (this.cartographicCenter = new A(), J.WGS84.cartesianToCartographic(n, this.cartographicCenter)) : this.cartographicCenter = new A(0, 0, -J.WGS84.radii[0]), this.cartesianCenter = n, this.zoom = yd(t.boundingVolume, this.cartographicCenter);
  }
  _initializeStats() {
    this.stats.get(cn), this.stats.get(ds), this.stats.get(fs), this.stats.get(Ii), this.stats.get(Si), this.stats.get(xi), this.stats.get(Oi), this.stats.get(Fi), this.stats.get(vi), this.stats.get(ms, "memory"), this.stats.get(Di);
  }
  _initializeTileHeaders(t, n) {
    const s = new Vs(this, t.root, n);
    if (n && (n.children.push(s), s.depth = n.depth + 1), this.type === At.TILES3D) {
      const i = [];
      for (i.push(s); i.length > 0; ) {
        const o = i.pop();
        this.stats.get(cn).incrementCount();
        const a = o.header.children || [];
        for (const c of a) {
          var r;
          const u = new Vs(this, c, o);
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
      case At.TILES3D:
        t = Pd;
        break;
      case At.I3S:
        t = Hd;
        break;
      default:
        t = Jn;
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
    this.stats.get(Fi).incrementCount();
    const s = n.message || n.toString(), r = t.url;
    console.error(`A 3D tile failed to load: ${t.url} ${s}`), this.options.onTileError(t, s, r);
  }
  _onTileLoad(t, n) {
    if (n) {
      if (this.type === At.I3S) {
        var s, r;
        const i = ((s = this.tileset) === null || s === void 0 || (r = s.nodePagesTile) === null || r === void 0 ? void 0 : r.nodesInNodePages) || 0;
        this.stats.get(cn).reset(), this.stats.get(cn).addCount(i);
      }
      t && t.content && Vf(t, t.content), this.updateContentTypes(t), this._addTileToCache(t), this.options.onTileLoad(t);
    }
  }
  updateContentTypes(t) {
    if (this.type === At.I3S)
      switch (t.header.isDracoGeometry && (this.contentFormats.draco = !0), t.header.textureFormat) {
        case "dds":
          this.contentFormats.dds = !0;
          break;
        case "ktx2":
          this.contentFormats.ktx2 = !0;
          break;
      }
    else if (this.type === At.TILES3D) {
      var n;
      const {
        extensionsRemoved: s = []
      } = ((n = t.content) === null || n === void 0 ? void 0 : n.gltf) || {};
      s.includes("KHR_draco_mesh_compression") && (this.contentFormats.draco = !0), s.includes("EXT_meshopt_compression") && (this.contentFormats.meshopt = !0), s.includes("KHR_texture_basisu") && (this.contentFormats.ktx2 = !0);
    }
  }
  _onStartTileLoading() {
    this._pendingCount++, this.stats.get(ds).incrementCount();
  }
  _onEndTileLoading() {
    this._pendingCount--, this.stats.get(ds).decrementCount();
  }
  _addTileToCache(t) {
    this._cache.add(this, t, (n) => n._updateCacheStats(t));
  }
  _updateCacheStats(t) {
    this.stats.get(xi).incrementCount(), this.stats.get(fs).incrementCount(), this.gpuMemoryUsageInBytes += t.gpuMemoryUsageInBytes || 0, this.stats.get(ms).count = this.gpuMemoryUsageInBytes, this.options.memoryAdjustedScreenSpaceError && this.adjustScreenSpaceError();
  }
  _unloadTile(t) {
    this.gpuMemoryUsageInBytes -= t.gpuMemoryUsageInBytes || 0, this.stats.get(fs).decrementCount(), this.stats.get(Oi).incrementCount(), this.stats.get(ms).count = this.gpuMemoryUsageInBytes, this.options.onTileUnload(t), t.unloadContent();
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
const Ba = "4.1.1", Ce = {
  COMPOSITE: "cmpt",
  POINT_CLOUD: "pnts",
  BATCHED_3D_MODEL: "b3dm",
  INSTANCED_3D_MODEL: "i3dm",
  GEOMETRY: "geom",
  VECTOR: "vect",
  GLTF: "glTF"
};
function Ca(e, t, n) {
  U(e instanceof ArrayBuffer);
  const s = new TextDecoder("utf8"), r = new Uint8Array(e, t, n);
  return s.decode(r);
}
function jd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  const n = new DataView(e);
  return `${String.fromCharCode(n.getUint8(t + 0))}${String.fromCharCode(n.getUint8(t + 1))}${String.fromCharCode(n.getUint8(t + 2))}${String.fromCharCode(n.getUint8(t + 3))}`;
}
const kd = "4.1.1", Kd = {
  name: "Draco",
  id: "draco",
  module: "draco",
  version: kd,
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
function zd(e, t, n) {
  const s = Ea(t.metadata), r = [], i = Wd(t.attributes);
  for (const o in e) {
    const a = e[o], c = Li(o, a, i[o]);
    r.push(c);
  }
  if (n) {
    const o = Li("indices", n);
    r.push(o);
  }
  return {
    fields: r,
    metadata: s
  };
}
function Wd(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    t[s.name || "undefined"] = s;
  }
  return t;
}
function Li(e, t, n) {
  const s = n ? Ea(n.metadata) : void 0;
  return Jl(e, t, s);
}
function Ea(e) {
  Object.entries(e);
  const t = {};
  for (const n in e)
    t[`${n}.string`] = JSON.stringify(e[n]);
  return t;
}
const Gi = {
  POSITION: "POSITION",
  NORMAL: "NORMAL",
  COLOR: "COLOR_0",
  TEX_COORD: "TEXCOORD_0"
}, Xd = {
  1: Int8Array,
  2: Uint8Array,
  3: Int16Array,
  4: Uint16Array,
  5: Int32Array,
  6: Uint32Array,
  9: Float32Array
}, Qd = 4;
class qd {
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
      const a = this._getDracoLoaderData(i, r, n), c = this._getMeshData(i, a, n), u = Hl(c.attributes), l = zd(c.attributes, a, c.indices);
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
    const s = t.num_faces() * 3, r = s * Qd, i = this.draco._malloc(r);
    try {
      return this.decoder.GetTrianglesUInt32Array(t, r, i), new Uint32Array(this.draco.HEAPF32.buffer, i, s).slice();
    } finally {
      this.draco._free(i);
    }
  }
  _getTriangleStripIndices(t) {
    const n = new this.draco.DracoInt32Array();
    try {
      return this.decoder.GetTriangleStripsFromMesh(t, n), Zd(n);
    } finally {
      this.draco.destroy(n);
    }
  }
  _getAttributeValues(t, n) {
    const s = Xd[n.data_type], r = n.num_components, o = t.num_points() * r, a = o * s.BYTES_PER_ELEMENT, c = Yd(this.draco, s);
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
    for (const o in Gi)
      if (this.draco[o] === r)
        return Gi[o];
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
      const r = $d(s);
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
function Yd(e, t) {
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
function $d(e) {
  const t = e.size(), n = new Int32Array(t);
  for (let s = 0; s < t; s++)
    n[s] = e.GetValue(s);
  return n;
}
function Zd(e) {
  const t = e.size(), n = new Int32Array(t);
  for (let s = 0; s < t; s++)
    n[s] = e.GetValue(s);
  return n;
}
const tm = "1.5.6", em = "1.4.1", gs = `https://www.gstatic.com/draco/versioned/decoders/${tm}`, lt = {
  DECODER: "draco_wasm_wrapper.js",
  DECODER_WASM: "draco_decoder.wasm",
  FALLBACK_DECODER: "draco_decoder.js",
  ENCODER: "draco_encoder.js"
}, As = {
  [lt.DECODER]: `${gs}/${lt.DECODER}`,
  [lt.DECODER_WASM]: `${gs}/${lt.DECODER_WASM}`,
  [lt.FALLBACK_DECODER]: `${gs}/${lt.FALLBACK_DECODER}`,
  [lt.ENCODER]: `https://raw.githubusercontent.com/google/draco/${em}/javascript/${lt.ENCODER}`
};
let Ee;
async function nm(e) {
  const t = e.modules || {};
  return t.draco3d ? Ee = Ee || t.draco3d.createDecoderModule({}).then((n) => ({
    draco: n
  })) : Ee = Ee || sm(e), await Ee;
}
async function sm(e) {
  let t, n;
  switch (e.draco && e.draco.decoderType) {
    case "js":
      t = await Xt(As[lt.FALLBACK_DECODER], "draco", e, lt.FALLBACK_DECODER);
      break;
    case "wasm":
    default:
      [t, n] = await Promise.all([await Xt(As[lt.DECODER], "draco", e, lt.DECODER), await Xt(As[lt.DECODER_WASM], "draco", e, lt.DECODER_WASM)]);
  }
  return t = t || globalThis.DracoDecoderModule, await rm(t, n);
}
function rm(e, t) {
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
const Ta = {
  ...Kd,
  parse: im
};
async function im(e, t) {
  const {
    draco: n
  } = await nm(t), s = new qd(n);
  try {
    return s.parseSync(e, t == null ? void 0 : t.draco);
  } finally {
    s.destroy();
  }
}
const om = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, Y = {
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  INT: 5124,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,
  DOUBLE: 5130
}, G = {
  ...om,
  ...Y
}, ps = {
  [Y.DOUBLE]: Float64Array,
  [Y.FLOAT]: Float32Array,
  [Y.UNSIGNED_SHORT]: Uint16Array,
  [Y.UNSIGNED_INT]: Uint32Array,
  [Y.UNSIGNED_BYTE]: Uint8Array,
  [Y.BYTE]: Int8Array,
  [Y.SHORT]: Int16Array,
  [Y.INT]: Int32Array
}, am = {
  DOUBLE: Y.DOUBLE,
  FLOAT: Y.FLOAT,
  UNSIGNED_SHORT: Y.UNSIGNED_SHORT,
  UNSIGNED_INT: Y.UNSIGNED_INT,
  UNSIGNED_BYTE: Y.UNSIGNED_BYTE,
  BYTE: Y.BYTE,
  SHORT: Y.SHORT,
  INT: Y.INT
}, ys = "Failed to convert GL type";
class Ot {
  static fromTypedArray(t) {
    t = ArrayBuffer.isView(t) ? t.constructor : t;
    for (const n in ps)
      if (ps[n] === t)
        return n;
    throw new Error(ys);
  }
  static fromName(t) {
    const n = am[t];
    if (!n)
      throw new Error(ys);
    return n;
  }
  static getArrayType(t) {
    switch (t) {
      case Y.UNSIGNED_SHORT_5_6_5:
      case Y.UNSIGNED_SHORT_4_4_4_4:
      case Y.UNSIGNED_SHORT_5_5_5_1:
        return Uint16Array;
      default:
        const n = ps[t];
        if (!n)
          throw new Error(ys);
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
function cm(e, t) {
  if (!e)
    throw new Error(`math.gl assertion failed. ${t}`);
}
function um(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [0, 0, 0];
  const n = e >> 11 & 31, s = e >> 5 & 63, r = e & 31;
  return t[0] = n << 3, t[1] = s << 2, t[2] = r << 3, t;
}
new Nn();
new A();
new Nn();
new Nn();
function Pi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 255;
  return ql(e, 0, t) / t * 2 - 1;
}
function Ni(e) {
  return e < 0 ? -1 : 1;
}
function lm(e, t, n, s) {
  if (cm(s), e < 0 || e > n || t < 0 || t > n)
    throw new Error(`x and y must be unsigned normalized integers between 0 and ${n}`);
  if (s.x = Pi(e, n), s.y = Pi(t, n), s.z = 1 - (Math.abs(s.x) + Math.abs(s.y)), s.z < 0) {
    const r = s.x;
    s.x = (1 - Math.abs(s.y)) * Ni(r), s.y = (1 - Math.abs(r)) * Ni(s.y);
  }
  return s.normalize();
}
function hm(e, t, n) {
  return lm(e, t, 255, n);
}
class mr {
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
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : G.UNSIGNED_INT, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
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
const fm = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, dm = {
  SCALAR: (e, t) => e[t],
  VEC2: (e, t) => [e[2 * t + 0], e[2 * t + 1]],
  VEC3: (e, t) => [e[3 * t + 0], e[3 * t + 1], e[3 * t + 2]],
  VEC4: (e, t) => [e[4 * t + 0], e[4 * t + 1], e[4 * t + 2], e[4 * t + 3]],
  MAT2: (e, t) => [e[4 * t + 0], e[4 * t + 1], e[4 * t + 2], e[4 * t + 3]],
  MAT3: (e, t) => [e[9 * t + 0], e[9 * t + 1], e[9 * t + 2], e[9 * t + 3], e[9 * t + 4], e[9 * t + 5], e[9 * t + 6], e[9 * t + 7], e[9 * t + 8]],
  MAT4: (e, t) => [e[16 * t + 0], e[16 * t + 1], e[16 * t + 2], e[16 * t + 3], e[16 * t + 4], e[16 * t + 5], e[16 * t + 6], e[16 * t + 7], e[16 * t + 8], e[16 * t + 9], e[16 * t + 10], e[16 * t + 11], e[16 * t + 12], e[16 * t + 13], e[16 * t + 14], e[16 * t + 15]]
}, mm = {
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
function gm(e, t, n, s) {
  const {
    componentType: r
  } = e;
  U(e.componentType);
  const i = typeof r == "string" ? Ot.fromName(r) : r, o = fm[e.type], a = dm[e.type], c = mm[e.type];
  return n += e.byteOffset, {
    values: Ot.createTypedArray(i, t, n, o * s),
    type: i,
    size: o,
    unpacker: a,
    packer: c
  };
}
const St = (e) => e !== void 0;
function Am(e, t, n) {
  if (!t)
    return null;
  let s = e.getExtension("3DTILES_batch_table_hierarchy");
  const r = t.HIERARCHY;
  return r && (console.warn("3D Tile Parser: HIERARCHY is deprecated. Use 3DTILES_batch_table_hierarchy."), t.extensions = t.extensions || {}, t.extensions["3DTILES_batch_table_hierarchy"] = r, s = r), s ? pm(s, n) : null;
}
function pm(e, t) {
  let n, s, r;
  const i = e.instancesLength, o = e.classes;
  let a = e.classIds, c = e.parentCounts, u = e.parentIds, l = i;
  St(a.byteOffset) && (a.componentType = defaultValue(a.componentType, GL.UNSIGNED_SHORT), a.type = AttributeType.SCALAR, r = getBinaryAccessor(a), a = r.createArrayBufferView(t.buffer, t.byteOffset + a.byteOffset, i));
  let h;
  if (St(c))
    for (St(c.byteOffset) && (c.componentType = defaultValue(c.componentType, GL.UNSIGNED_SHORT), c.type = AttributeType.SCALAR, r = getBinaryAccessor(c), c = r.createArrayBufferView(t.buffer, t.byteOffset + c.byteOffset, i)), h = new Uint16Array(i), l = 0, n = 0; n < i; ++n)
      h[n] = l, l += c[n];
  St(u) && St(u.byteOffset) && (u.componentType = defaultValue(u.componentType, GL.UNSIGNED_SHORT), u.type = AttributeType.SCALAR, r = getBinaryAccessor(u), u = r.createArrayBufferView(t.buffer, t.byteOffset + u.byteOffset, l));
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
  return Cm(g), g;
}
function Te(e, t, n) {
  if (!e)
    return;
  const s = e.parentCounts;
  return e.parentIds ? n(e, t) : s > 0 ? ym(e, t, n) : Bm(e, t, n);
}
function ym(e, t, n) {
  const s = e.classIds, r = e.parentCounts, i = e.parentIds, o = e.parentIndexes, a = s.length, c = scratchVisited;
  c.length = Math.max(c.length, a);
  const u = ++marker, l = scratchStack;
  for (l.length = 0, l.push(t); l.length > 0; ) {
    if (t = l.pop(), c[t] === u)
      continue;
    c[t] = u;
    const h = n(e, t);
    if (St(h))
      return h;
    const f = r[t], d = o[t];
    for (let m = 0; m < f; ++m) {
      const g = i[d + m];
      g !== t && l.push(g);
    }
  }
  return null;
}
function Bm(e, t, n) {
  let s = !0;
  for (; s; ) {
    const r = n(e, t);
    if (St(r))
      return r;
    const i = e.parentIds[t];
    s = i !== t, t = i;
  }
  throw new Error("traverseHierarchySingleParent");
}
function Cm(e) {
  const n = e.classIds.length;
  for (let s = 0; s < n; ++s)
    ba(e, s, stack);
}
function ba(e, t, n) {
  const s = e.parentCounts, r = e.parentIds, i = e.parentIndexes, a = e.classIds.length;
  if (!St(r))
    return;
  assert(t < a, `Parent index ${t} exceeds the total number of instances: ${a}`), assert(n.indexOf(t) === -1, "Circular dependency detected in the batch table hierarchy."), n.push(t);
  const c = St(s) ? s[t] : 1, u = St(s) ? i[t] : t;
  for (let l = 0; l < c; ++l) {
    const h = r[u + l];
    h !== t && ba(e, h, n);
  }
  n.pop(t);
}
function ct(e) {
  return e != null;
}
const un = (e, t) => e, Em = {
  HIERARCHY: !0,
  extensions: !0,
  extras: !0
};
class _a {
  constructor(t, n, s) {
    var r;
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    this.json = void 0, this.binary = void 0, this.featureCount = void 0, this._extensions = void 0, this._properties = void 0, this._binaryProperties = void 0, this._hierarchy = void 0, U(s >= 0), this.json = t || {}, this.binary = n, this.featureCount = s, this._extensions = ((r = this.json) === null || r === void 0 ? void 0 : r.extensions) || {}, this._properties = {};
    for (const o in this.json)
      Em[o] || (this._properties[o] = this.json[o]);
    this._binaryProperties = this._initializeBinaryProperties(), i["3DTILES_batch_table_hierarchy"] && (this._hierarchy = Am(this, this.json, this.binary));
  }
  getExtension(t) {
    return this.json && this.json.extensions && this.json.extensions[t];
  }
  memorySizeInBytes() {
    return 0;
  }
  isClass(t, n) {
    if (this._checkBatchId(t), U(typeof n == "string", n), this._hierarchy) {
      const s = Te(this._hierarchy, t, (r, i) => {
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
      return un(s[t]);
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
    ct(i) || (this._properties[n] = new Array(r), i = this._properties[n]), i[t] = un(s);
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
      const r = gm(s, this.binary.buffer, this.binary.byteOffset | 0, this.featureCount);
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
    const s = Te(this._hierarchy, t, (r, i) => {
      const o = r.classIds[i], a = r.classes[o].instances;
      return ct(a[n]);
    });
    return ct(s);
  }
  _getPropertyNamesInHierarchy(t, n) {
    Te(this._hierarchy, t, (s, r) => {
      const i = s.classIds[r], o = s.classes[i].instances;
      for (const a in o)
        o.hasOwnProperty(a) && n.indexOf(a) === -1 && n.push(a);
    });
  }
  _getHierarchyProperty(t, n) {
    return Te(this._hierarchy, t, (s, r) => {
      const i = s.classIds[r], o = s.classes[i], a = s.classIndexes[r], c = o.instances[n];
      return ct(c) ? ct(c.typedArray) ? this._getBinaryProperty(c, a) : un(c[a]) : null;
    });
  }
  _setHierarchyProperty(t, n, s, r) {
    const i = Te(this._hierarchy, n, (o, a) => {
      const c = o.classIds[a], u = o.classes[c], l = o.classIndexes[a], h = u.instances[s];
      return ct(h) ? (U(a === n, `Inherited property "${s}" is read-only.`), ct(h.typedArray) ? this._setBinaryProperty(h, l, r) : h[l] = un(r), !0) : !1;
    });
    return ct(i);
  }
}
const Bs = 4;
function Vn(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = new DataView(t);
  if (e.magic = s.getUint32(n, !0), n += Bs, e.version = s.getUint32(n, !0), n += Bs, e.byteLength = s.getUint32(n, !0), n += Bs, e.version !== 1)
    throw new Error(`3D Tile Version ${e.version} not supported`);
  return n;
}
const oe = 4, Ui = "b3dm tile in legacy format.";
function gr(e, t, n) {
  const s = new DataView(t);
  let r;
  e.header = e.header || {};
  let i = s.getUint32(n, !0);
  n += oe;
  let o = s.getUint32(n, !0);
  n += oe;
  let a = s.getUint32(n, !0);
  n += oe;
  let c = s.getUint32(n, !0);
  return n += oe, a >= 570425344 ? (n -= oe * 2, r = i, a = o, c = 0, i = 0, o = 0, console.warn(Ui)) : c >= 570425344 && (n -= oe, r = a, a = i, c = o, i = 0, o = 0, console.warn(Ui)), e.header.featureTableJsonByteLength = i, e.header.featureTableBinaryByteLength = o, e.header.batchTableJsonByteLength = a, e.header.batchTableBinaryByteLength = c, e.header.batchLength = r, n;
}
function Ar(e, t, n, s) {
  return n = Tm(e, t, n), n = bm(e, t, n), n;
}
function Tm(e, t, n, s) {
  const {
    featureTableJsonByteLength: r,
    featureTableBinaryByteLength: i,
    batchLength: o
  } = e.header || {};
  if (e.featureTableJson = {
    BATCH_LENGTH: o || 0
  }, r && r > 0) {
    const a = Ca(t, n, r);
    e.featureTableJson = JSON.parse(a);
  }
  return n += r || 0, e.featureTableBinary = new Uint8Array(t, n, i), n += i || 0, n;
}
function bm(e, t, n, s) {
  const {
    batchTableJsonByteLength: r,
    batchTableBinaryByteLength: i
  } = e.header || {};
  if (r && r > 0) {
    const o = Ca(t, n, r);
    e.batchTableJson = JSON.parse(o), n += r, i && i > 0 && (e.batchTableBinary = new Uint8Array(t, n, i), e.batchTableBinary = new Uint8Array(e.batchTableBinary), n += i);
  }
  return n;
}
function wa(e, t, n) {
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
      type: G.UNSIGNED_BYTE,
      value: o,
      size: 3,
      normalized: !0
    };
  }
  if (t && r) {
    const o = new Uint8ClampedArray(i * 3);
    for (let a = 0; a < i; a++) {
      const c = um(t[a]);
      o[a * 3] = c[0], o[a * 3 + 1] = c[1], o[a * 3 + 2] = c[2];
    }
    return {
      type: G.UNSIGNED_BYTE,
      value: o,
      size: 3,
      normalized: !0
    };
  }
  return t && t.length === i * 3 ? {
    type: G.UNSIGNED_BYTE,
    value: t,
    size: 3,
    normalized: !0
  } : {
    type: G.UNSIGNED_BYTE,
    value: t || new Uint8ClampedArray(),
    size: 4,
    normalized: !0
  };
}
const Hi = new A();
function _m(e, t) {
  if (!t)
    return null;
  if (e.isOctEncoded16P) {
    const n = new Float32Array((e.pointsLength || 0) * 3);
    for (let s = 0; s < (e.pointsLength || 0); s++)
      hm(t[s * 2], t[s * 2 + 1], Hi), Hi.toArray(n, s * 3);
    return {
      type: G.FLOAT,
      size: 2,
      value: n
    };
  }
  return {
    type: G.FLOAT,
    size: 2,
    value: t
  };
}
function wm(e, t, n) {
  return e.isQuantized ? n["3d-tiles"] && n["3d-tiles"].decodeQuantizedPositions ? (e.isQuantized = !1, Rm(e, t)) : {
    type: G.UNSIGNED_SHORT,
    value: t,
    size: 3,
    normalized: !0
  } : t;
}
function Rm(e, t) {
  const n = new A(), s = new Float32Array(e.pointCount * 3);
  for (let r = 0; r < e.pointCount; r++)
    n.set(t[r * 3], t[r * 3 + 1], t[r * 3 + 2]).scale(1 / e.quantizedRange).multiply(e.quantizedVolumeScale).add(e.quantizedVolumeOffset).toArray(s, r * 3);
  return s;
}
async function Mm(e, t, n, s, r) {
  n = Vn(e, t, n), n = gr(e, t, n), n = Ar(e, t, n), Im(e);
  const {
    featureTable: i,
    batchTable: o
  } = Sm(e);
  return await Dm(e, i, o, s, r), xm(e, i, s), Om(e, i, o), Fm(e, i), n;
}
function Im(e) {
  e.attributes = {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, e.isQuantized = !1, e.isTranslucent = !1, e.isRGB565 = !1, e.isOctEncoded16P = !1;
}
function Sm(e) {
  const t = new mr(e.featureTableJson, e.featureTableBinary), n = t.getGlobalProperty("POINTS_LENGTH");
  if (!Number.isFinite(n))
    throw new Error("POINTS_LENGTH must be defined");
  t.featuresLength = n, e.featuresLength = n, e.pointsLength = n, e.pointCount = n, e.rtcCenter = t.getGlobalProperty("RTC_CENTER", G.FLOAT, 3);
  const s = vm(e, t);
  return {
    featureTable: t,
    batchTable: s
  };
}
function xm(e, t, n) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.positions) {
    if (t.hasProperty("POSITION"))
      e.attributes.positions = t.getPropertyArray("POSITION", G.FLOAT, 3);
    else if (t.hasProperty("POSITION_QUANTIZED")) {
      const s = t.getPropertyArray("POSITION_QUANTIZED", G.UNSIGNED_SHORT, 3);
      if (e.isQuantized = !0, e.quantizedRange = 65535, e.quantizedVolumeScale = t.getGlobalProperty("QUANTIZED_VOLUME_SCALE", G.FLOAT, 3), !e.quantizedVolumeScale)
        throw new Error("QUANTIZED_VOLUME_SCALE must be defined for quantized positions.");
      if (e.quantizedVolumeOffset = t.getGlobalProperty("QUANTIZED_VOLUME_OFFSET", G.FLOAT, 3), !e.quantizedVolumeOffset)
        throw new Error("QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.");
      e.attributes.positions = wm(e, s, n);
    }
  }
  if (!e.attributes.positions)
    throw new Error("Either POSITION or POSITION_QUANTIZED must be defined.");
}
function Om(e, t, n) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.colors) {
    let s = null;
    t.hasProperty("RGBA") ? (s = t.getPropertyArray("RGBA", G.UNSIGNED_BYTE, 4), e.isTranslucent = !0) : t.hasProperty("RGB") ? s = t.getPropertyArray("RGB", G.UNSIGNED_BYTE, 3) : t.hasProperty("RGB565") && (s = t.getPropertyArray("RGB565", G.UNSIGNED_SHORT, 1), e.isRGB565 = !0), e.attributes.colors = wa(e, s, n);
  }
  t.hasProperty("CONSTANT_RGBA") && (e.constantRGBA = t.getGlobalProperty("CONSTANT_RGBA", G.UNSIGNED_BYTE, 4));
}
function Fm(e, t) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.normals) {
    let n = null;
    t.hasProperty("NORMAL") ? n = t.getPropertyArray("NORMAL", G.FLOAT, 3) : t.hasProperty("NORMAL_OCT16P") && (n = t.getPropertyArray("NORMAL_OCT16P", G.UNSIGNED_BYTE, 2), e.isOctEncoded16P = !0), e.attributes.normals = _m(e, n);
  }
}
function vm(e, t) {
  let n = null;
  if (!e.batchIds && t.hasProperty("BATCH_ID") && (e.batchIds = t.getPropertyArray("BATCH_ID", G.UNSIGNED_SHORT, 1), e.batchIds)) {
    const s = t.getGlobalProperty("BATCH_LENGTH");
    if (!s)
      throw new Error("Global property: BATCH_LENGTH must be defined when BATCH_ID is defined.");
    const {
      batchTableJson: r,
      batchTableBinary: i
    } = e;
    n = new _a(r, i, s);
  }
  return n;
}
async function Dm(e, t, n, s, r) {
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
  return await Lm(e, l, s, r);
}
async function Lm(e, t, n, s) {
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
  const i = await He(t.buffer, Ta, r, s), o = i.attributes.POSITION && i.attributes.POSITION.value, a = i.attributes.COLOR_0 && i.attributes.COLOR_0.value, c = i.attributes.NORMAL && i.attributes.NORMAL.value, u = i.attributes.BATCH_ID && i.attributes.BATCH_ID.value, l = o && i.attributes.POSITION.value.quantization, h = c && i.attributes.NORMAL.value.quantization;
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
    colors: wa(e, a, void 0),
    normals: c,
    batchIds: u,
    ...f
  };
}
const Gm = "4.1.1";
var Cs;
const Pm = (Cs = globalThis.loaders) === null || Cs === void 0 ? void 0 : Cs.parseImageNode, js = typeof Image < "u", ks = typeof ImageBitmap < "u", Nm = !!Pm, Ks = Ln ? !0 : Nm;
function Um(e) {
  switch (e) {
    case "auto":
      return ks || js || Ks;
    case "imagebitmap":
      return ks;
    case "image":
      return js;
    case "data":
      return Ks;
    default:
      throw new Error(`@loaders.gl/images: image ${e} not supported in this environment`);
  }
}
function Hm() {
  if (ks)
    return "imagebitmap";
  if (js)
    return "image";
  if (Ks)
    return "data";
  throw new Error("Install '@loaders.gl/polyfills' to parse images under Node.js");
}
function Jm(e) {
  const t = Vm(e);
  if (!t)
    throw new Error("Not an image");
  return t;
}
function Ra(e) {
  switch (Jm(e)) {
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
function Vm(e) {
  return typeof ImageBitmap < "u" && e instanceof ImageBitmap ? "imagebitmap" : typeof Image < "u" && e instanceof Image ? "image" : e && typeof e == "object" && e.data && e.width && e.height ? "data" : null;
}
const jm = /^data:image\/svg\+xml/, km = /\.svg((\?|#).*)?$/;
function pr(e) {
  return e && (jm.test(e) || km.test(e));
}
function Km(e, t) {
  if (pr(t)) {
    let s = new TextDecoder().decode(e);
    try {
      typeof unescape == "function" && typeof encodeURIComponent == "function" && (s = unescape(encodeURIComponent(s)));
    } catch (i) {
      throw new Error(i.message);
    }
    return `data:image/svg+xml;base64,${btoa(s)}`;
  }
  return Ma(e, t);
}
function Ma(e, t) {
  if (pr(t))
    throw new Error("SVG cannot be parsed directly to imagebitmap");
  return new Blob([new Uint8Array(e)]);
}
async function Ia(e, t, n) {
  const s = Km(e, n), r = self.URL || self.webkitURL, i = typeof s != "string" && r.createObjectURL(s);
  try {
    return await zm(i || s, t);
  } finally {
    i && r.revokeObjectURL(i);
  }
}
async function zm(e, t) {
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
const Wm = {};
let Ji = !0;
async function Xm(e, t, n) {
  let s;
  pr(n) ? s = await Ia(e, t, n) : s = Ma(e, n);
  const r = t && t.imagebitmap;
  return await Qm(s, r);
}
async function Qm(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if ((qm(t) || !Ji) && (t = null), t)
    try {
      return await createImageBitmap(e, t);
    } catch (n) {
      console.warn(n), Ji = !1;
    }
  return await createImageBitmap(e);
}
function qm(e) {
  for (const t in e || Wm)
    return !1;
  return !0;
}
function Ym(e) {
  return !eg(e, "ftyp", 4) || !(e[8] & 96) ? null : $m(e);
}
function $m(e) {
  switch (Zm(e, 8, 12).replace("\0", " ").trim()) {
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
function Zm(e, t, n) {
  return String.fromCharCode(...e.slice(t, n));
}
function tg(e) {
  return [...e].map((t) => t.charCodeAt(0));
}
function eg(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = tg(t);
  for (let r = 0; r < s.length; ++r)
    if (s[r] !== e[r + n])
      return !1;
  return !0;
}
const xt = !1, xe = !0;
function yr(e) {
  const t = ze(e);
  return sg(t) || og(t) || rg(t) || ig(t) || ng(t);
}
function ng(e) {
  const t = new Uint8Array(e instanceof DataView ? e.buffer : e), n = Ym(t);
  return n ? {
    mimeType: n.mimeType,
    width: 0,
    height: 0
  } : null;
}
function sg(e) {
  const t = ze(e);
  return t.byteLength >= 24 && t.getUint32(0, xt) === 2303741511 ? {
    mimeType: "image/png",
    width: t.getUint32(16, xt),
    height: t.getUint32(20, xt)
  } : null;
}
function rg(e) {
  const t = ze(e);
  return t.byteLength >= 10 && t.getUint32(0, xt) === 1195984440 ? {
    mimeType: "image/gif",
    width: t.getUint16(6, xe),
    height: t.getUint16(8, xe)
  } : null;
}
function ig(e) {
  const t = ze(e);
  return t.byteLength >= 14 && t.getUint16(0, xt) === 16973 && t.getUint32(2, xe) === t.byteLength ? {
    mimeType: "image/bmp",
    width: t.getUint32(18, xe),
    height: t.getUint32(22, xe)
  } : null;
}
function og(e) {
  const t = ze(e);
  if (!(t.byteLength >= 3 && t.getUint16(0, xt) === 65496 && t.getUint8(2) === 255))
    return null;
  const {
    tableMarkers: s,
    sofMarkers: r
  } = ag();
  let i = 2;
  for (; i + 9 < t.byteLength; ) {
    const o = t.getUint16(i, xt);
    if (r.has(o))
      return {
        mimeType: "image/jpeg",
        height: t.getUint16(i + 5, xt),
        width: t.getUint16(i + 7, xt)
      };
    if (!s.has(o))
      return null;
    i += 2, i += t.getUint16(i, xt);
  }
  return null;
}
function ag() {
  const e = /* @__PURE__ */ new Set([65499, 65476, 65484, 65501, 65534]);
  for (let n = 65504; n < 65520; ++n)
    e.add(n);
  return {
    tableMarkers: e,
    sofMarkers: /* @__PURE__ */ new Set([65472, 65473, 65474, 65475, 65477, 65478, 65479, 65481, 65482, 65483, 65485, 65486, 65487, 65502])
  };
}
function ze(e) {
  if (e instanceof DataView)
    return e;
  if (ArrayBuffer.isView(e))
    return new DataView(e.buffer);
  if (e instanceof ArrayBuffer)
    return new DataView(e);
  throw new Error("toDataView");
}
async function cg(e, t) {
  var n;
  const {
    mimeType: s
  } = yr(e) || {}, r = (n = globalThis.loaders) === null || n === void 0 ? void 0 : n.parseImageNode;
  return U(r), await r(e, s);
}
async function ug(e, t, n) {
  t = t || {};
  const r = (t.image || {}).type || "auto", {
    url: i
  } = n || {}, o = lg(r);
  let a;
  switch (o) {
    case "imagebitmap":
      a = await Xm(e, t, i);
      break;
    case "image":
      a = await Ia(e, t, i);
      break;
    case "data":
      a = await cg(e);
      break;
    default:
      U(!1);
  }
  return r === "data" && (a = Ra(a)), a;
}
function lg(e) {
  switch (e) {
    case "auto":
    case "data":
      return Hm();
    default:
      return Um(e), e;
  }
}
const hg = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "svg", "avif"], fg = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/avif", "image/bmp", "image/vnd.microsoft.icon", "image/svg+xml"], dg = {
  image: {
    type: "auto",
    decode: !0
  }
}, mg = {
  id: "image",
  module: "images",
  name: "Images",
  version: Gm,
  mimeTypes: fg,
  extensions: hg,
  parse: ug,
  tests: [(e) => !!yr(new DataView(e))],
  options: dg
}, Es = {};
function gg(e) {
  if (Es[e] === void 0) {
    const t = Ln ? pg(e) : Ag(e);
    Es[e] = t;
  }
  return Es[e];
}
function Ag(e) {
  var t, n;
  const s = ["image/png", "image/jpeg", "image/gif"], r = ((t = globalThis.loaders) === null || t === void 0 ? void 0 : t.imageFormatsNode) || s;
  return !!((n = globalThis.loaders) === null || n === void 0 ? void 0 : n.parseImageNode) && r.includes(e);
}
function pg(e) {
  switch (e) {
    case "image/avif":
    case "image/webp":
      return yg(e);
    default:
      return !0;
  }
}
function yg(e) {
  try {
    return document.createElement("canvas").toDataURL(e).indexOf(`data:${e}`) === 0;
  } catch {
    return !1;
  }
}
function gt(e, t) {
  if (!e)
    throw new Error(t || "assert failed: gltf");
}
const Sa = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, xa = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}, Bg = 1.33, Vi = ["SCALAR", "VEC2", "VEC3", "VEC4"], Cg = [[Int8Array, 5120], [Uint8Array, 5121], [Int16Array, 5122], [Uint16Array, 5123], [Uint32Array, 5125], [Float32Array, 5126], [Float64Array, 5130]], Eg = new Map(Cg), Tg = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, bg = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}, _g = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
function Oa(e) {
  return Vi[e - 1] || Vi[0];
}
function Br(e) {
  const t = Eg.get(e.constructor);
  if (!t)
    throw new Error("Illegal typed array");
  return t;
}
function Cr(e, t) {
  const n = _g[e.componentType], s = Tg[e.type], r = bg[e.componentType], i = e.count * s, o = e.count * s * r;
  gt(o >= 0 && o <= t.byteLength);
  const a = xa[e.componentType], c = Sa[e.type];
  return {
    ArrayType: n,
    length: i,
    byteLength: o,
    componentByteSize: a,
    numberOfComponentsInElement: c
  };
}
function Fa(e) {
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
  return r + Math.ceil(4 * i * Bg);
}
function wg(e, t, n) {
  const s = e.bufferViews[n];
  gt(s);
  const r = s.buffer, i = t[r];
  gt(i);
  const o = (s.byteOffset || 0) + i.byteOffset;
  return new Uint8Array(i.arrayBuffer, o, s.byteLength);
}
function Rg(e, t, n) {
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
  } = Cr(i, o), m = f * d, g = o.byteStride || m;
  if (typeof o.byteStride > "u" || o.byteStride === m)
    return new l(a, u, h);
  const p = new l(h);
  for (let C = 0; C < i.count; C++) {
    const w = new l(a, u + C * g, d);
    p.set(w, C * d);
  }
  return p;
}
function Mg() {
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
class it {
  constructor(t) {
    this.gltf = void 0, this.sourceBuffers = void 0, this.byteLength = void 0, this.gltf = {
      json: (t == null ? void 0 : t.json) || Mg(),
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
    gt(s);
    const r = (t.byteOffset || 0) + s.byteOffset;
    return new Uint8Array(s.arrayBuffer, r, t.byteLength);
  }
  getTypedArrayForAccessor(t) {
    const n = this.getAccessor(t);
    return Rg(this.gltf.json, this.gltf.buffers, n);
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
    return gt(n), this.json.extensions = this.json.extensions || {}, this.json.extensions[t] = n, this.registerUsedExtension(t), n;
  }
  addRequiredExtension(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return gt(n), this.addExtension(t, n), this.registerRequiredExtension(t), n;
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
    const s = yr(t), r = n || (s == null ? void 0 : s.mimeType), o = {
      bufferView: this.addBufferView(t),
      mimeType: r
    };
    return this.json.images = this.json.images || [], this.json.images.push(o), this.json.images.length - 1;
  }
  addBufferView(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.byteLength;
    const r = t.byteLength;
    gt(Number.isFinite(r)), this.sourceBuffers = this.sourceBuffers || [], this.sourceBuffers.push(t);
    const i = {
      buffer: n,
      byteOffset: s,
      byteLength: r
    };
    return this.byteLength += Je(r, 4), this.json.bufferViews = this.json.bufferViews || [], this.json.bufferViews.push(i), this.json.bufferViews.length - 1;
  }
  addAccessor(t, n) {
    const s = {
      bufferView: t,
      type: Oa(n.size),
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
      componentType: Br(t),
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
      o = du(a, i, o);
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
function ji(e) {
  return (e % 1 + 1) % 1;
}
const va = {
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
}, Ig = {
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
}, Da = {
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
function Er(e, t) {
  return Da[t] * va[e];
}
function jn(e, t, n, s) {
  if (n !== "UINT8" && n !== "UINT16" && n !== "UINT32" && n !== "UINT64")
    return null;
  const r = e.getTypedArrayForBufferView(t), i = kn(r, "SCALAR", n, s + 1);
  return i instanceof BigInt64Array || i instanceof BigUint64Array ? null : i;
}
function kn(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  const r = va[t], i = Ig[n], o = Da[n], a = s * r, c = a * o;
  let u = e.buffer, l = e.byteOffset;
  return l % o !== 0 && (u = new Uint8Array(u).slice(l, l + c).buffer, l = 0), new i(u, l, a);
}
function Tr(e, t, n) {
  var s, r;
  const i = `TEXCOORD_${t.texCoord || 0}`, o = n.attributes[i], a = e.getTypedArrayForAccessor(o), c = e.gltf.json, u = t.index, l = (s = c.textures) === null || s === void 0 || (r = s[u]) === null || r === void 0 ? void 0 : r.source;
  if (typeof l < "u") {
    var h, f, d;
    const m = (h = c.images) === null || h === void 0 || (f = h[l]) === null || f === void 0 ? void 0 : f.mimeType, g = (d = e.gltf.images) === null || d === void 0 ? void 0 : d[l];
    if (g && typeof g.width < "u") {
      const p = [];
      for (let C = 0; C < a.length; C += 2) {
        const w = Sg(g, m, a, C, t.channels);
        p.push(w);
      }
      return p;
    }
  }
  return [];
}
function La(e, t, n, s, r) {
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
    componentType: Br(o),
    count: o.length
  });
  r.attributes[t] = u;
}
function Sg(e, t, n, s) {
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
  const u = xg(o, a, e, c);
  let l = 0;
  for (const h of r) {
    const f = typeof h == "number" ? Object.values(i)[h] : i[h], d = u + f.offset, m = Ra(e);
    if (m.data.length <= d)
      throw new Error(`${m.data.length} <= ${d}`);
    const g = m.data[d];
    l |= g << f.shift;
  }
  return l;
}
function xg(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  const r = n.width, i = ji(e) * (r - 1), o = Math.round(i), a = n.height, c = ji(t) * (a - 1), u = Math.round(c), l = n.components ? n.components : s;
  return (u * r + o) * l;
}
function Ga(e, t, n, s, r) {
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
function Pa(e, t, n) {
  const s = [];
  for (let r = 0; r < t; r++) {
    const i = r * n;
    s.push(e.slice(i, i + n));
  }
  return s;
}
function Na(e, t, n, s) {
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
const Ua = "EXT_mesh_features", Og = Ua;
async function Fg(e, t) {
  const n = new it(e);
  vg(n, t);
}
function vg(e, t) {
  const n = e.gltf.json;
  if (n.meshes)
    for (const s of n.meshes)
      for (const r of s.primitives)
        Dg(e, r, t);
}
function Dg(e, t, n) {
  var s, r;
  if (!(n != null && (s = n.gltf) !== null && s !== void 0 && s.loadBuffers))
    return;
  const i = (r = t.extensions) === null || r === void 0 ? void 0 : r[Ua], o = i == null ? void 0 : i.featureIds;
  if (o)
    for (const c of o) {
      var a;
      let u;
      if (typeof c.attribute < "u") {
        const l = `_FEATURE_ID_${c.attribute}`, h = t.attributes[l];
        u = e.getTypedArrayForAccessor(h);
      } else
        typeof c.texture < "u" && n !== null && n !== void 0 && (a = n.gltf) !== null && a !== void 0 && a.loadImages ? u = Tr(e, c.texture, t) : u = [];
      c.data = u;
    }
}
const Lg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Fg,
  name: Og
}, Symbol.toStringTag, { value: "Module" })), br = "EXT_structural_metadata", Gg = br;
async function Pg(e, t) {
  const n = new it(e);
  Ng(n, t);
}
function Ng(e, t) {
  var n, s;
  if (!((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const r = e.getExtension(br);
  r && ((s = t.gltf) !== null && s !== void 0 && s.loadImages && Ug(e, r), Hg(e, r));
}
function Ug(e, t) {
  const n = t.propertyTextures, s = e.gltf.json;
  if (n && s.meshes)
    for (const r of s.meshes)
      for (const i of r.primitives)
        Vg(e, n, i, t);
}
function Hg(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, r = t.propertyTables;
  if (s && r)
    for (const i in s) {
      const o = Jg(r, i);
      o && kg(e, n, o);
    }
}
function Jg(e, t) {
  for (const n of e)
    if (n.class === t)
      return n;
  return null;
}
function Vg(e, t, n, s) {
  var r;
  if (!t)
    return;
  const i = (r = n.extensions) === null || r === void 0 ? void 0 : r[br], o = i == null ? void 0 : i.propertyTextures;
  if (o)
    for (const a of o) {
      const c = t[a];
      jg(e, c, n, s);
    }
}
function jg(e, t, n, s) {
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
    const u = c.data, l = Tr(e, c, n);
    l !== null && (La(e, a, l, u, n), c.data = u, s.dataAttributeNames.push(a));
  }
}
function kg(e, t, n) {
  var s;
  const r = (s = t.classes) === null || s === void 0 ? void 0 : s[n.class];
  if (!r)
    throw new Error(`Incorrect data in the EXT_structural_metadata extension: no schema class with name ${n.class}`);
  const i = n.count;
  for (const a in r.properties) {
    var o;
    const c = r.properties[a], u = (o = n.properties) === null || o === void 0 ? void 0 : o[a];
    if (u) {
      const l = Kg(e, t, c, i, u);
      u.data = l;
    }
  }
}
function Kg(e, t, n, s, r) {
  let i = [];
  const o = r.values, a = e.getTypedArrayForBufferView(o), c = zg(e, n, r, s), u = Wg(e, r, s);
  switch (n.type) {
    case "SCALAR":
    case "VEC2":
    case "VEC3":
    case "VEC4":
    case "MAT2":
    case "MAT3":
    case "MAT4": {
      i = Xg(n, s, a, c);
      break;
    }
    case "BOOLEAN":
      throw new Error(`Not implemented - classProperty.type=${n.type}`);
    case "STRING": {
      i = Na(s, a, c, u);
      break;
    }
    case "ENUM": {
      i = Qg(t, n, s, a, c);
      break;
    }
    default:
      throw new Error(`Unknown classProperty type ${n.type}`);
  }
  return i;
}
function zg(e, t, n, s) {
  return t.array && typeof t.count > "u" && typeof n.arrayOffsets < "u" ? jn(e, n.arrayOffsets, n.arrayOffsetType || "UINT32", s) : null;
}
function Wg(e, t, n) {
  return typeof t.stringOffsets < "u" ? jn(e, t.stringOffsets, t.stringOffsetType || "UINT32", n) : null;
}
function Xg(e, t, n, s) {
  const r = e.array, i = e.count, o = Er(e.type, e.componentType), a = n.byteLength / o;
  let c;
  return e.componentType ? c = kn(n, e.type, e.componentType, a) : c = n, r ? s ? Ga(c, t, s, n.length, o) : i ? Pa(c, t, i) : [] : c;
}
function Qg(e, t, n, s, r) {
  var i;
  const o = t.enumType;
  if (!o)
    throw new Error("Incorrect data in the EXT_structural_metadata extension: classProperty.enumType is not set for type ENUM");
  const a = (i = e.enums) === null || i === void 0 ? void 0 : i[o];
  if (!a)
    throw new Error(`Incorrect data in the EXT_structural_metadata extension: schema.enums does't contain ${o}`);
  const c = a.valueType || "UINT16", u = Er(t.type, c), l = s.byteLength / u;
  let h = kn(s, t.type, c, l);
  if (h || (h = s), t.array) {
    if (r)
      return qg({
        valuesData: h,
        numberOfElements: n,
        arrayOffsets: r,
        valuesDataBytesLength: s.length,
        elementSize: u,
        enumEntry: a
      });
    const f = t.count;
    return f ? Yg(h, n, f, a) : [];
  }
  return _r(h, 0, n, a);
}
function qg(e) {
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
    const h = u / i, f = l / i, d = _r(t, h, f, o);
    a.push(d);
  }
  return a;
}
function Yg(e, t, n, s) {
  const r = [];
  for (let i = 0; i < t; i++) {
    const o = n * i, a = _r(e, o, n, s);
    r.push(a);
  }
  return r;
}
function _r(e, t, n, s) {
  const r = [];
  for (let i = 0; i < n; i++)
    if (e instanceof BigInt64Array || e instanceof BigUint64Array)
      r.push("");
    else {
      const o = e[t + i], a = $g(s, o);
      a ? r.push(a.name) : r.push("");
    }
  return r;
}
function $g(e, t) {
  for (const n of e.values)
    if (n.value === t)
      return n;
  return null;
}
const Zg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Pg,
  name: Gg
}, Symbol.toStringTag, { value: "Module" })), Ha = "EXT_feature_metadata", t0 = Ha;
async function e0(e, t) {
  const n = new it(e);
  n0(n, t);
}
function n0(e, t) {
  var n, s;
  if (!((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const r = e.getExtension(Ha);
  r && ((s = t.gltf) !== null && s !== void 0 && s.loadImages && s0(e, r), r0(e, r));
}
function s0(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, {
    featureTextures: r
  } = t;
  if (s && r)
    for (const i in s) {
      const o = s[i], a = o0(r, i);
      a && c0(e, a, o);
    }
}
function r0(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, r = t.featureTables;
  if (s && r)
    for (const i in s) {
      const o = i0(r, i);
      o && a0(e, n, o);
    }
}
function i0(e, t) {
  for (const n in e) {
    const s = e[n];
    if (s.class === t)
      return s;
  }
  return null;
}
function o0(e, t) {
  for (const n in e) {
    const s = e[n];
    if (s.class === t)
      return s;
  }
  return null;
}
function a0(e, t, n) {
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
      const l = u0(e, t, c, i, u);
      u.data = l;
    }
  }
}
function c0(e, t, n) {
  const s = t.class;
  for (const i in n.properties) {
    var r;
    const o = t == null || (r = t.properties) === null || r === void 0 ? void 0 : r[i];
    if (o) {
      const a = m0(e, o, s);
      o.data = a;
    }
  }
}
function u0(e, t, n, s, r) {
  let i = [];
  const o = r.bufferView, a = e.getTypedArrayForBufferView(o), c = l0(e, n, r, s), u = h0(e, n, r, s);
  return n.type === "STRING" || n.componentType === "STRING" ? i = Na(s, a, c, u) : f0(n) && (i = d0(n, s, a, c)), i;
}
function l0(e, t, n, s) {
  return t.type === "ARRAY" && typeof t.componentCount > "u" && typeof n.arrayOffsetBufferView < "u" ? jn(e, n.arrayOffsetBufferView, n.offsetType || "UINT32", s) : null;
}
function h0(e, t, n, s) {
  return typeof n.stringOffsetBufferView < "u" ? jn(e, n.stringOffsetBufferView, n.offsetType || "UINT32", s) : null;
}
function f0(e) {
  const t = ["UINT8", "INT16", "UINT16", "INT32", "UINT32", "INT64", "UINT64", "FLOAT32", "FLOAT64"];
  return t.includes(e.type) || typeof e.componentType < "u" && t.includes(e.componentType);
}
function d0(e, t, n, s) {
  const r = e.type === "ARRAY", i = e.componentCount, o = "SCALAR", a = e.componentType || e.type, c = Er(o, a), u = n.byteLength / c, l = kn(n, o, a, u);
  return r ? s ? Ga(l, t, s, n.length, c) : i ? Pa(l, t, i) : [] : l;
}
function m0(e, t, n) {
  const s = e.gltf.json;
  if (!s.meshes)
    return [];
  const r = [];
  for (const i of s.meshes)
    for (const o of i.primitives)
      g0(e, n, t, r, o);
  return r;
}
function g0(e, t, n, s, r) {
  const i = {
    channels: n.channels,
    ...n.texture
  }, o = Tr(e, i, r);
  o && La(e, t, o, s, r);
}
const A0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: e0,
  name: t0
}, Symbol.toStringTag, { value: "Module" })), p0 = "4.1.1", y0 = "4.1.1", In = {
  TRANSCODER: "basis_transcoder.js",
  TRANSCODER_WASM: "basis_transcoder.wasm",
  ENCODER: "basis_encoder.js",
  ENCODER_WASM: "basis_encoder.wasm"
};
let Ts;
async function ki(e) {
  const t = e.modules || {};
  return t.basis ? t.basis : (Ts = Ts || B0(e), await Ts);
}
async function B0(e) {
  let t = null, n = null;
  return [t, n] = await Promise.all([await Xt(In.TRANSCODER, "textures", e), await Xt(In.TRANSCODER_WASM, "textures", e)]), t = t || globalThis.BASIS, await C0(t, n);
}
function C0(e, t) {
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
let bs;
async function Ki(e) {
  const t = e.modules || {};
  return t.basisEncoder ? t.basisEncoder : (bs = bs || E0(e), await bs);
}
async function E0(e) {
  let t = null, n = null;
  return [t, n] = await Promise.all([await Xt(In.ENCODER, "textures", e), await Xt(In.ENCODER_WASM, "textures", e)]), t = t || globalThis.BASIS, await T0(t, n);
}
function T0(e, t) {
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
const ae = {
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
}, b0 = ["", "WEBKIT_", "MOZ_"], zi = {
  WEBGL_compressed_texture_s3tc: "dxt",
  WEBGL_compressed_texture_s3tc_srgb: "dxt-srgb",
  WEBGL_compressed_texture_etc1: "etc1",
  WEBGL_compressed_texture_etc: "etc2",
  WEBGL_compressed_texture_pvrtc: "pvrtc",
  WEBGL_compressed_texture_atc: "atc",
  WEBGL_compressed_texture_astc: "astc",
  EXT_texture_compression_rgtc: "rgtc"
};
let ln = null;
function _0(e) {
  if (!ln) {
    e = e || w0() || void 0, ln = /* @__PURE__ */ new Set();
    for (const t of b0)
      for (const n in zi)
        if (e && e.getExtension(`${t}${n}`)) {
          const s = zi[n];
          ln.add(s);
        }
  }
  return ln;
}
function w0() {
  try {
    return document.createElement("canvas").getContext("webgl");
  } catch {
    return null;
  }
}
var Wi, Xi, Qi, qi, Yi, $i, Zi, to;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.BASISLZ = 1] = "BASISLZ", e[e.ZSTD = 2] = "ZSTD", e[e.ZLIB = 3] = "ZLIB";
})(Wi || (Wi = {})), function(e) {
  e[e.BASICFORMAT = 0] = "BASICFORMAT";
}(Xi || (Xi = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.ETC1S = 163] = "ETC1S", e[e.UASTC = 166] = "UASTC";
}(Qi || (Qi = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.SRGB = 1] = "SRGB";
}(qi || (qi = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.LINEAR = 1] = "LINEAR", e[e.SRGB = 2] = "SRGB", e[e.ITU = 3] = "ITU", e[e.NTSC = 4] = "NTSC", e[e.SLOG = 5] = "SLOG", e[e.SLOG2 = 6] = "SLOG2";
}(Yi || (Yi = {})), function(e) {
  e[e.ALPHA_STRAIGHT = 0] = "ALPHA_STRAIGHT", e[e.ALPHA_PREMULTIPLIED = 1] = "ALPHA_PREMULTIPLIED";
}($i || ($i = {})), function(e) {
  e[e.RGB = 0] = "RGB", e[e.RRR = 3] = "RRR", e[e.GGG = 4] = "GGG", e[e.AAA = 15] = "AAA";
}(Zi || (Zi = {})), function(e) {
  e[e.RGB = 0] = "RGB", e[e.RGBA = 3] = "RGBA", e[e.RRR = 4] = "RRR", e[e.RRRG = 5] = "RRRG";
}(to || (to = {}));
const dt = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function R0(e) {
  const t = new Uint8Array(e);
  return !(t.byteLength < dt.length || t[0] !== dt[0] || t[1] !== dt[1] || t[2] !== dt[2] || t[3] !== dt[3] || t[4] !== dt[4] || t[5] !== dt[5] || t[6] !== dt[6] || t[7] !== dt[7] || t[8] !== dt[8] || t[9] !== dt[9] || t[10] !== dt[10] || t[11] !== dt[11]);
}
const M0 = {
  etc1: {
    basisFormat: 0,
    compressed: !0,
    format: ae.COMPRESSED_RGB_ETC1_WEBGL
  },
  etc2: {
    basisFormat: 1,
    compressed: !0
  },
  bc1: {
    basisFormat: 2,
    compressed: !0,
    format: ae.COMPRESSED_RGB_S3TC_DXT1_EXT
  },
  bc3: {
    basisFormat: 3,
    compressed: !0,
    format: ae.COMPRESSED_RGBA_S3TC_DXT5_EXT
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
    format: ae.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
  },
  "pvrtc1-4-rgba": {
    basisFormat: 9,
    compressed: !0,
    format: ae.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
  },
  "astc-4x4": {
    basisFormat: 10,
    compressed: !0,
    format: ae.COMPRESSED_RGBA_ASTC_4X4_KHR
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
async function I0(e, t) {
  if (t.basis.containerFormat === "auto") {
    if (R0(e)) {
      const s = await Ki(t);
      return eo(s.KTX2File, e, t);
    }
    const {
      BasisFile: n
    } = await ki(t);
    return _s(n, e, t);
  }
  switch (t.basis.module) {
    case "encoder":
      const n = await Ki(t);
      switch (t.basis.containerFormat) {
        case "ktx2":
          return eo(n.KTX2File, e, t);
        case "basis":
        default:
          return _s(n.BasisFile, e, t);
      }
    case "transcoder":
    default:
      const {
        BasisFile: s
      } = await ki(t);
      return _s(s, e, t);
  }
}
function _s(e, t, n) {
  const s = new e(new Uint8Array(t));
  try {
    if (!s.startTranscoding())
      throw new Error("Failed to start basis transcoding");
    const r = s.getNumImages(), i = [];
    for (let o = 0; o < r; o++) {
      const a = s.getNumLevels(o), c = [];
      for (let u = 0; u < a; u++)
        c.push(S0(s, o, u, n));
      i.push(c);
    }
    return i;
  } finally {
    s.close(), s.delete();
  }
}
function S0(e, t, n, s) {
  const r = e.getImageWidth(t, n), i = e.getImageHeight(t, n), o = e.getHasAlpha(), {
    compressed: a,
    format: c,
    basisFormat: u
  } = Ja(s, o), l = e.getImageTranscodedSizeInBytes(t, n, u), h = new Uint8Array(l);
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
function eo(e, t, n) {
  const s = new e(new Uint8Array(t));
  try {
    if (!s.startTranscoding())
      throw new Error("failed to start KTX2 transcoding");
    const r = s.getLevels(), i = [];
    for (let o = 0; o < r; o++) {
      i.push(x0(s, o, n));
      break;
    }
    return [i];
  } finally {
    s.close(), s.delete();
  }
}
function x0(e, t, n) {
  const {
    alphaFlag: s,
    height: r,
    width: i
  } = e.getImageLevelInfo(t, 0, 0), {
    compressed: o,
    format: a,
    basisFormat: c
  } = Ja(n, s), u = e.getImageTranscodedSizeInBytes(t, 0, 0, c), l = new Uint8Array(u);
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
function Ja(e, t) {
  let n = e && e.basis && e.basis.format;
  return n === "auto" && (n = Va()), typeof n == "object" && (n = t ? n.alpha : n.noAlpha), n = n.toLowerCase(), M0[n];
}
function Va() {
  const e = _0();
  return e.has("astc") ? "astc-4x4" : e.has("dxt") ? {
    alpha: "bc3",
    noAlpha: "bc1"
  } : e.has("pvrtc") ? {
    alpha: "pvrtc1-4-rgba",
    noAlpha: "pvrtc1-4-rgb"
  } : e.has("etc1") ? "etc1" : e.has("etc2") ? "etc2" : "rgb565";
}
const O0 = {
  name: "Basis",
  id: "basis",
  module: "textures",
  version: y0,
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
}, F0 = {
  ...O0,
  parse: I0
}, de = !0, no = 1735152710, wr = 12, Sn = 8, v0 = 1313821514, D0 = 5130562, L0 = 0, G0 = 0, P0 = 1;
function N0(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return `${String.fromCharCode(e.getUint8(t + 0))}${String.fromCharCode(e.getUint8(t + 1))}${String.fromCharCode(e.getUint8(t + 2))}${String.fromCharCode(e.getUint8(t + 3))}`;
}
function U0(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const s = new DataView(e), {
    magic: r = no
  } = n, i = s.getUint32(t, !1);
  return i === r || i === no;
}
function H0(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = new DataView(t), r = N0(s, n + 0), i = s.getUint32(n + 4, de), o = s.getUint32(n + 8, de);
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
  }), n += wr, e.version) {
    case 1:
      return J0(e, s, n);
    case 2:
      return V0(e, s, n, {});
    default:
      throw new Error(`Invalid GLB version ${e.version}. Only supports version 1 and 2.`);
  }
}
function J0(e, t, n) {
  U(e.header.byteLength > wr + Sn);
  const s = t.getUint32(n + 0, de), r = t.getUint32(n + 4, de);
  return n += Sn, U(r === L0), zs(e, t, n, s), n += s, n += Ws(e, t, n, e.header.byteLength), n;
}
function V0(e, t, n, s) {
  return U(e.header.byteLength > wr + Sn), j0(e, t, n, s), n + e.header.byteLength;
}
function j0(e, t, n, s) {
  for (; n + 8 <= e.header.byteLength; ) {
    const r = t.getUint32(n + 0, de), i = t.getUint32(n + 4, de);
    switch (n += Sn, i) {
      case v0:
        zs(e, t, n, r);
        break;
      case D0:
        Ws(e, t, n, r);
        break;
      case G0:
        s.strict || zs(e, t, n, r);
        break;
      case P0:
        s.strict || Ws(e, t, n, r);
        break;
    }
    n += Je(r, 4);
  }
  return n;
}
function zs(e, t, n, s) {
  const r = new Uint8Array(t.buffer, n, s), o = new TextDecoder("utf8").decode(r);
  return e.json = JSON.parse(o), Je(s, 4);
}
function Ws(e, t, n, s) {
  return e.header.hasBinChunk = !0, e.binChunks.push({
    byteOffset: n,
    byteLength: s,
    arrayBuffer: t.buffer
  }), Je(s, 4);
}
function ja(e, t) {
  if (e.startsWith("data:") || e.startsWith("http:") || e.startsWith("https:"))
    return e;
  const s = t.baseUri || t.uri;
  if (!s)
    throw new Error(`'baseUri' must be provided to resolve relative url ${e}`);
  return s.substr(0, s.lastIndexOf("/") + 1) + e;
}
const k0 = "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", K0 = "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", z0 = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11]), W0 = new Uint8Array([32, 0, 65, 253, 3, 1, 2, 34, 4, 106, 6, 5, 11, 8, 7, 20, 13, 33, 12, 16, 128, 9, 116, 64, 19, 113, 127, 15, 10, 21, 22, 14, 255, 66, 24, 54, 136, 107, 18, 23, 192, 26, 114, 118, 132, 17, 77, 101, 130, 144, 27, 87, 131, 44, 45, 74, 156, 154, 70, 167]), X0 = {
  0: "",
  1: "meshopt_decodeFilterOct",
  2: "meshopt_decodeFilterQuat",
  3: "meshopt_decodeFilterExp",
  NONE: "",
  OCTAHEDRAL: "meshopt_decodeFilterOct",
  QUATERNION: "meshopt_decodeFilterQuat",
  EXPONENTIAL: "meshopt_decodeFilterExp"
}, Q0 = {
  0: "meshopt_decodeVertexBuffer",
  1: "meshopt_decodeIndexBuffer",
  2: "meshopt_decodeIndexSequence",
  ATTRIBUTES: "meshopt_decodeVertexBuffer",
  TRIANGLES: "meshopt_decodeIndexBuffer",
  INDICES: "meshopt_decodeIndexSequence"
};
async function q0(e, t, n, s, r) {
  let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : "NONE";
  const o = await Y0();
  tA(o, o.exports[Q0[r]], e, t, n, s, o.exports[X0[i || "NONE"]]);
}
let ws;
async function Y0() {
  return ws || (ws = $0()), ws;
}
async function $0() {
  let e = k0;
  WebAssembly.validate(z0) && (e = K0, console.log("Warning: meshopt_decoder is using experimental SIMD support"));
  const t = await WebAssembly.instantiate(Z0(e), {});
  return await t.instance.exports.__wasm_call_ctors(), t.instance;
}
function Z0(e) {
  const t = new Uint8Array(e.length);
  for (let s = 0; s < e.length; ++s) {
    const r = e.charCodeAt(s);
    t[s] = r > 96 ? r - 71 : r > 64 ? r - 65 : r > 47 ? r + 4 : r > 46 ? 63 : 62;
  }
  let n = 0;
  for (let s = 0; s < e.length; ++s)
    t[n++] = t[s] < 60 ? W0[t[s]] : (t[s] - 60) * 64 + t[++s];
  return t.buffer.slice(0, n);
}
function tA(e, t, n, s, r, i, o) {
  const a = e.exports.sbrk, c = s + 3 & -4, u = a(c * r), l = a(i.length), h = new Uint8Array(e.exports.memory.buffer);
  h.set(i, l);
  const f = t(u, s, r, l, i.length);
  if (f === 0 && o && o(u, c, r), n.set(h.subarray(u, u + s * r)), a(u - a(0)), f !== 0)
    throw new Error(`Malformed buffer data: ${f}`);
}
const xn = "EXT_meshopt_compression", eA = xn;
async function nA(e, t) {
  var n, s;
  const r = new it(e);
  if (!(t != null && (n = t.gltf) !== null && n !== void 0 && n.decompressMeshes) || !((s = t.gltf) !== null && s !== void 0 && s.loadBuffers))
    return;
  const i = [];
  for (const o of e.json.bufferViews || [])
    i.push(sA(r, o));
  await Promise.all(i), r.removeExtension(xn);
}
async function sA(e, t) {
  const n = e.getObjectExtension(t, xn);
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
    await q0(f, o, i, h, a, c), e.removeObjectExtension(t, xn);
  }
}
const rA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: nA,
  name: eA
}, Symbol.toStringTag, { value: "Module" })), ce = "EXT_texture_webp", iA = ce;
function oA(e, t) {
  const n = new it(e);
  if (!gg("image/webp")) {
    if (n.getRequiredExtensions().includes(ce))
      throw new Error(`gltf: Required extension ${ce} not supported by browser`);
    return;
  }
  const {
    json: s
  } = n;
  for (const r of s.textures || []) {
    const i = n.getObjectExtension(r, ce);
    i && (r.source = i.source), n.removeObjectExtension(r, ce);
  }
  n.removeExtension(ce);
}
const aA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: iA,
  preprocess: oA
}, Symbol.toStringTag, { value: "Module" })), Cn = "KHR_texture_basisu", cA = Cn;
function uA(e, t) {
  const n = new it(e), {
    json: s
  } = n;
  for (const r of s.textures || []) {
    const i = n.getObjectExtension(r, Cn);
    i && (r.source = i.source, n.removeObjectExtension(r, Cn));
  }
  n.removeExtension(Cn);
}
const lA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: cA,
  preprocess: uA
}, Symbol.toStringTag, { value: "Module" }));
function hA(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    if (n !== "indices") {
      const r = ka(s);
      t[n] = r;
    }
  }
  return t;
}
function ka(e) {
  const {
    buffer: t,
    size: n,
    count: s
  } = fA(e);
  return {
    value: t,
    size: n,
    byteOffset: 0,
    count: s,
    type: Oa(n),
    componentType: Br(t)
  };
}
function fA(e) {
  let t = e, n = 1, s = 0;
  return e && e.value && (t = e.value, n = e.size || 1), t && (ArrayBuffer.isView(t) || (t = dA(t, Float32Array)), s = t.length / n), {
    buffer: t,
    size: n,
    count: s
  };
}
function dA(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return e ? Array.isArray(e) ? new t(e) : n && !(e instanceof t) ? new t(e) : e : null;
}
const Vt = "KHR_draco_mesh_compression", mA = Vt;
function gA(e, t, n) {
  const s = new it(e);
  for (const r of Ka(s))
    s.getObjectExtension(r, Vt);
}
async function AA(e, t, n) {
  var s;
  if (!(t != null && (s = t.gltf) !== null && s !== void 0 && s.decompressMeshes))
    return;
  const r = new it(e), i = [];
  for (const o of Ka(r))
    r.getObjectExtension(o, Vt) && i.push(yA(r, o, t, n));
  await Promise.all(i), r.removeExtension(Vt);
}
function pA(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const n = new it(e);
  for (const s of n.json.meshes || [])
    BA(s, t), n.addRequiredExtension(Vt);
}
async function yA(e, t, n, s) {
  const r = e.getObjectExtension(t, Vt);
  if (!r)
    return;
  const i = e.getTypedArrayForBufferView(r.bufferView), o = sr(i.buffer, i.byteOffset), a = {
    ...n
  };
  delete a["3d-tiles"];
  const c = await He(o, Ta, a, s), u = hA(c.attributes);
  for (const [l, h] of Object.entries(u))
    if (l in t.attributes) {
      const f = t.attributes[l], d = e.getAccessor(f);
      d != null && d.min && d !== null && d !== void 0 && d.max && (h.min = d.min, h.max = d.max);
    }
  t.attributes = u, c.indices && (t.indices = ka(c.indices)), e.removeObjectExtension(t, Vt), CA(t);
}
function BA(e, t) {
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
        [Vt]: {
          bufferView: u,
          attributes: c
        }
      }
    }]
  };
}
function CA(e) {
  if (!e.attributes && Object.keys(e.attributes).length > 0)
    throw new Error("glTF: Empty primitive detected: Draco decompression failure?");
}
function* Ka(e) {
  for (const t of e.json.meshes || [])
    for (const n of t.primitives)
      yield n;
}
const EA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: AA,
  encode: pA,
  name: mA,
  preprocess: gA
}, Symbol.toStringTag, { value: "Module" })), Rr = "KHR_texture_transform", TA = Rr, hn = new A(), bA = new z(), _A = new z();
async function wA(e, t) {
  var n;
  if (!new it(e).hasExtension(Rr) || !((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const i = e.json.materials || [];
  for (let o = 0; o < i.length; o++)
    RA(o, e);
}
function RA(e, t) {
  var n, s, r;
  const i = [], o = (n = t.json.materials) === null || n === void 0 ? void 0 : n[e], a = o == null || (s = o.pbrMetallicRoughness) === null || s === void 0 ? void 0 : s.baseColorTexture;
  a && be(t, e, a, i);
  const c = o == null ? void 0 : o.emissiveTexture;
  c && be(t, e, c, i);
  const u = o == null ? void 0 : o.normalTexture;
  u && be(t, e, u, i);
  const l = o == null ? void 0 : o.occlusionTexture;
  l && be(t, e, l, i);
  const h = o == null || (r = o.pbrMetallicRoughness) === null || r === void 0 ? void 0 : r.metallicRoughnessTexture;
  h && be(t, e, h, i);
}
function be(e, t, n, s) {
  const r = MA(n, s);
  if (!r)
    return;
  const i = e.json.meshes || [];
  for (const o of i)
    for (const a of o.primitives) {
      const c = a.material;
      Number.isFinite(c) && t === c && IA(e, a, r);
    }
}
function MA(e, t) {
  var n;
  const s = (n = e.extensions) === null || n === void 0 ? void 0 : n[Rr], {
    texCoord: r = 0
  } = e, {
    texCoord: i = r
  } = s;
  if (!(t.findIndex((a) => {
    let [c, u] = a;
    return c === r && u === i;
  }) !== -1)) {
    const a = OA(s);
    return r !== i && (e.texCoord = i), t.push([r, i]), {
      originalTexCoord: r,
      texCoord: i,
      matrix: a
    };
  }
  return null;
}
function IA(e, t, n) {
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
        } = Cr(u, l), p = xa[u.componentType], C = Sa[u.type], w = l.byteStride || p * C, y = new Float32Array(g);
        for (let B = 0; B < u.count; B++) {
          const R = new m(h, d + B * w, 2);
          hn.set(R[0], R[1], 1), hn.transformByMatrix3(i), y.set([hn[0], hn[1]], B * C);
        }
        s === r ? SA(u, l, e.buffers, y) : xA(r, u, t, e, y);
      }
    }
  }
}
function SA(e, t, n, s) {
  e.componentType = 5126, n.push({
    arrayBuffer: s.buffer,
    byteOffset: 0,
    byteLength: s.buffer.byteLength
  }), t.buffer = n.length - 1, t.byteLength = s.buffer.byteLength, t.byteOffset = 0, delete t.byteStride;
}
function xA(e, t, n, s, r) {
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
function OA(e) {
  const {
    offset: t = [0, 0],
    rotation: n = 0,
    scale: s = [1, 1]
  } = e, r = new z().set(1, 0, 0, 0, 1, 0, t[0], t[1], 1), i = bA.set(Math.cos(n), Math.sin(n), 0, -Math.sin(n), Math.cos(n), 0, 0, 0, 1), o = _A.set(s[0], 0, 0, 0, s[1], 0, 0, 0, 1);
  return r.multiplyRight(i).multiplyRight(o);
}
const FA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: wA,
  name: TA
}, Symbol.toStringTag, { value: "Module" })), Wt = "KHR_lights_punctual", vA = Wt;
async function DA(e) {
  const t = new it(e), {
    json: n
  } = t, s = t.getExtension(Wt);
  s && (t.json.lights = s.lights, t.removeExtension(Wt));
  for (const r of n.nodes || []) {
    const i = t.getObjectExtension(r, Wt);
    i && (r.light = i.light), t.removeObjectExtension(r, Wt);
  }
}
async function LA(e) {
  const t = new it(e), {
    json: n
  } = t;
  if (n.lights) {
    const s = t.addExtension(Wt);
    gt(!s.lights), s.lights = n.lights, delete n.lights;
  }
  if (t.json.lights) {
    for (const s of t.json.lights) {
      const r = s.node;
      t.addObjectExtension(r, Wt, s);
    }
    delete t.json.lights;
  }
}
const GA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: DA,
  encode: LA,
  name: vA
}, Symbol.toStringTag, { value: "Module" })), De = "KHR_materials_unlit", PA = De;
async function NA(e) {
  const t = new it(e), {
    json: n
  } = t;
  for (const s of n.materials || [])
    s.extensions && s.extensions.KHR_materials_unlit && (s.unlit = !0), t.removeObjectExtension(s, De);
  t.removeExtension(De);
}
function UA(e) {
  const t = new it(e), {
    json: n
  } = t;
  if (t.materials)
    for (const s of n.materials || [])
      s.unlit && (delete s.unlit, t.addObjectExtension(s, De, {}), t.addExtension(De));
}
const HA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: NA,
  encode: UA,
  name: PA
}, Symbol.toStringTag, { value: "Module" })), Re = "KHR_techniques_webgl", JA = Re;
async function VA(e) {
  const t = new it(e), {
    json: n
  } = t, s = t.getExtension(Re);
  if (s) {
    const r = kA(s, t);
    for (const i of n.materials || []) {
      const o = t.getObjectExtension(i, Re);
      o && (i.technique = Object.assign({}, o, r[o.technique]), i.technique.values = KA(i.technique, t)), t.removeObjectExtension(i, Re);
    }
    t.removeExtension(Re);
  }
}
async function jA(e, t) {
}
function kA(e, t) {
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
function KA(e, t) {
  const n = Object.assign({}, e.values);
  return Object.keys(e.uniforms || {}).forEach((s) => {
    e.uniforms[s].value && !(s in n) && (n[s] = e.uniforms[s].value);
  }), Object.keys(n).forEach((s) => {
    typeof n[s] == "object" && n[s].index !== void 0 && (n[s].texture = t.getTexture(n[s].index));
  }), n;
}
const zA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: VA,
  encode: jA,
  name: JA
}, Symbol.toStringTag, { value: "Module" })), za = [Zg, Lg, rA, aA, lA, EA, GA, HA, zA, FA, A0];
function WA(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = za.filter((i) => Wa(i.name, t));
  for (const i of s) {
    var r;
    (r = i.preprocess) === null || r === void 0 || r.call(i, e, t, n);
  }
}
async function XA(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = za.filter((i) => Wa(i.name, t));
  for (const i of s) {
    var r;
    await ((r = i.decode) === null || r === void 0 ? void 0 : r.call(i, e, t, n));
  }
}
function Wa(e, t) {
  var n;
  const s = (t == null || (n = t.gltf) === null || n === void 0 ? void 0 : n.excludeExtensions) || {};
  return !(e in s && !s[e]);
}
const Rs = "KHR_binary_glTF";
function QA(e) {
  const t = new it(e), {
    json: n
  } = t;
  for (const s of n.images || []) {
    const r = t.getObjectExtension(s, Rs);
    r && Object.assign(s, r), t.removeObjectExtension(s, Rs);
  }
  n.buffers && n.buffers[0] && delete n.buffers[0].uri, t.removeExtension(Rs);
}
const so = {
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
}, qA = {
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
class YA {
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
    console.warn("Converting glTF v1 to glTF v2 format. This is experimental and may fail."), this._addAsset(s), this._convertTopLevelObjectsToArrays(s), QA(t), this._convertObjectIdsToArrayIndices(s), this._updateObjects(s), this._updateMaterial(s);
  }
  _addAsset(t) {
    t.asset = t.asset || {}, t.asset.version = "2.0", t.asset.generator = t.asset.generator || "Normalized to glTF 2.0 by loaders.gl";
  }
  _convertTopLevelObjectsToArrays(t) {
    for (const n in so)
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
    for (const n in so)
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
    const s = qA[n];
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
function $A(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new YA().normalize(e, t);
}
async function ZA(e, t) {
  var n, s, r;
  let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 ? arguments[3] : void 0, a = arguments.length > 4 ? arguments[4] : void 0;
  return tp(e, t, i, o), $A(e, {
    normalize: o == null || (n = o.gltf) === null || n === void 0 ? void 0 : n.normalize
  }), WA(e, o, a), o != null && (s = o.gltf) !== null && s !== void 0 && s.loadBuffers && e.json.buffers && await ep(e, o, a), o != null && (r = o.gltf) !== null && r !== void 0 && r.loadImages && await np(e, o, a), await XA(e, o, a), e;
}
function tp(e, t, n, s) {
  if (s.uri && (e.baseUri = s.uri), t instanceof ArrayBuffer && !U0(t, n, s) && (t = new TextDecoder().decode(t)), typeof t == "string")
    e.json = uu(t);
  else if (t instanceof ArrayBuffer) {
    const o = {};
    n = H0(o, t, n, s.glb), gt(o.type === "glTF", `Invalid GLB magic string ${o.type}`), e._glb = o, e.json = o.json;
  } else
    gt(!1, "GLTF: must be ArrayBuffer or string");
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
async function ep(e, t, n) {
  const s = e.json.buffers || [];
  for (let o = 0; o < s.length; ++o) {
    const a = s[o];
    if (a.uri) {
      var r, i;
      const {
        fetch: c
      } = n;
      gt(c);
      const u = ja(a.uri, t), l = await (n == null || (r = n.fetch) === null || r === void 0 ? void 0 : r.call(n, u)), h = await (l == null || (i = l.arrayBuffer) === null || i === void 0 ? void 0 : i.call(l));
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
async function np(e, t, n) {
  const s = sp(e), r = e.json.images || [], i = [];
  for (const o of s)
    i.push(rp(e, r[o], o, t, n));
  return await Promise.all(i);
}
function sp(e) {
  const t = /* @__PURE__ */ new Set(), n = e.json.textures || [];
  for (const s of n)
    s.source !== void 0 && t.add(s.source);
  return Array.from(t).sort();
}
async function rp(e, t, n, s, r) {
  let i;
  if (t.uri && !t.hasOwnProperty("bufferView")) {
    const a = ja(t.uri, s), {
      fetch: c
    } = r;
    i = await (await c(a)).arrayBuffer(), t.bufferView = {
      data: i
    };
  }
  if (Number.isFinite(t.bufferView)) {
    const a = wg(e.json, e.buffers, t.bufferView);
    i = sr(a.buffer, a.byteOffset, a.byteLength);
  }
  gt(i, "glTF image has no data");
  let o = await He(i, [mg, F0], {
    ...s,
    mimeType: t.mimeType,
    basis: s.basis || {
      format: Va()
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
const On = {
  name: "glTF",
  id: "gltf",
  module: "gltf",
  version: p0,
  extensions: ["gltf", "glb"],
  mimeTypes: ["model/gltf+json", "model/gltf-binary"],
  text: !0,
  binary: !0,
  tests: ["glTF"],
  parse: ip,
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
async function ip(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  t = {
    ...On.options,
    ...t
  }, t.gltf = {
    ...On.options.gltf,
    ...t.gltf
  };
  const {
    byteOffset: s = 0
  } = t;
  return await ZA({}, e, s, t, n);
}
const op = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, ap = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}, pt = {
  TEXTURE_MAG_FILTER: 10240,
  TEXTURE_MIN_FILTER: 10241,
  TEXTURE_WRAP_S: 10242,
  TEXTURE_WRAP_T: 10243,
  REPEAT: 10497,
  LINEAR: 9729,
  NEAREST_MIPMAP_LINEAR: 9986
}, cp = {
  magFilter: pt.TEXTURE_MAG_FILTER,
  minFilter: pt.TEXTURE_MIN_FILTER,
  wrapS: pt.TEXTURE_WRAP_S,
  wrapT: pt.TEXTURE_WRAP_T
}, up = {
  [pt.TEXTURE_MAG_FILTER]: pt.LINEAR,
  [pt.TEXTURE_MIN_FILTER]: pt.NEAREST_MIPMAP_LINEAR,
  [pt.TEXTURE_WRAP_S]: pt.REPEAT,
  [pt.TEXTURE_WRAP_T]: pt.REPEAT
};
function lp() {
  return {
    id: "default-sampler",
    parameters: up
  };
}
function hp(e) {
  return ap[e];
}
function fp(e) {
  return op[e];
}
class dp {
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
    return gt(s), this.baseUri = o, this.buffers = r, this.images = i, this.jsonUnprocessed = s, this.json = this._resolveTree(t.json, n), this.json;
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
    const s = hp(t.componentType), r = fp(t.type), i = s * r, o = {
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
      } = Cr(o, o.bufferView), l = (o.bufferView.byteOffset || 0) + (o.byteOffset || 0) + a.byteOffset;
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
      sampler: typeof t.sampler == "number" ? this.getSampler(t.sampler) : lp(),
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
    return cp[t];
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
function Xa(e, t) {
  return new dp().postProcess(e, t);
}
const Xs = {
  URI: 0,
  EMBEDDED: 1
};
function Qa(e, t, n, s) {
  e.rotateYtoZ = !0;
  const r = (e.byteOffset || 0) + (e.byteLength || 0) - n;
  if (r === 0)
    throw new Error("glTF byte length must be greater than 0.");
  return e.gltfUpAxis = s != null && s["3d-tiles"] && s["3d-tiles"].assetGltfUpAxis ? s["3d-tiles"].assetGltfUpAxis : "Y", e.gltfArrayBuffer = sr(t, n, r), e.gltfByteOffset = 0, e.gltfByteLength = r, n % 4 === 0 || console.warn(`${e.type}: embedded glb is not aligned to a 4-byte boundary.`), (e.byteOffset || 0) + (e.byteLength || 0);
}
async function qa(e, t, n, s) {
  const r = (n == null ? void 0 : n["3d-tiles"]) || {};
  if (mp(e, t), r.loadGLTF) {
    if (!s)
      return;
    if (e.gltfUrl) {
      const {
        fetch: i
      } = s, o = await i(e.gltfUrl, n);
      e.gltfArrayBuffer = await o.arrayBuffer(), e.gltfByteOffset = 0;
    }
    if (e.gltfArrayBuffer) {
      const i = await He(e.gltfArrayBuffer, On, n, s);
      e.gltf = Xa(i), e.gpuMemoryUsageInBytes = Fa(e.gltf), delete e.gltfArrayBuffer, delete e.gltfByteOffset, delete e.gltfByteLength;
    }
  }
}
function mp(e, t, n) {
  switch (t) {
    case Xs.URI:
      if (e.gltfArrayBuffer) {
        const s = new Uint8Array(e.gltfArrayBuffer, e.gltfByteOffset), i = new TextDecoder().decode(s);
        e.gltfUrl = i.replace(/[\s\0]+$/, "");
      }
      delete e.gltfArrayBuffer, delete e.gltfByteOffset, delete e.gltfByteLength;
      break;
    case Xs.EMBEDDED:
      break;
    default:
      throw new Error("b3dm: Illegal glTF format field");
  }
}
async function gp(e, t, n, s, r) {
  var i;
  n = Ap(e, t, n, s), await qa(e, Xs.EMBEDDED, s, r);
  const o = e == null || (i = e.gltf) === null || i === void 0 ? void 0 : i.extensions;
  return o && o.CESIUM_RTC && (e.rtcCenter = o.CESIUM_RTC.center), n;
}
function Ap(e, t, n, s, r) {
  n = Vn(e, t, n), n = gr(e, t, n), n = Ar(e, t, n), n = Qa(e, t, n, s);
  const i = new mr(e.featureTableJson, e.featureTableBinary);
  return e.rtcCenter = i.getGlobalProperty("RTC_CENTER", G.FLOAT, 3), n;
}
async function pp(e, t, n, s, r) {
  return n = yp(e, t, n, s), await qa(e, e.gltfFormat || 0, s, r), n;
}
function yp(e, t, n, s, r) {
  var i;
  if (n = Vn(e, t, n), e.version !== 1)
    throw new Error(`Instanced 3D Model version ${e.version} is not supported`);
  n = gr(e, t, n);
  const o = new DataView(t);
  if (e.gltfFormat = o.getUint32(n, !0), n += 4, n = Ar(e, t, n), n = Qa(e, t, n, s), !(e != null && (i = e.header) !== null && i !== void 0 && i.featureTableJsonByteLength) || e.header.featureTableJsonByteLength === 0)
    throw new Error("i3dm parser: featureTableJsonByteLength is zero.");
  const a = new mr(e.featureTableJson, e.featureTableBinary), c = a.getGlobalProperty("INSTANCES_LENGTH");
  if (a.featuresLength = c, !Number.isFinite(c))
    throw new Error("i3dm parser: INSTANCES_LENGTH must be defined");
  e.eastNorthUp = a.getGlobalProperty("EAST_NORTH_UP"), e.rtcCenter = a.getGlobalProperty("RTC_CENTER", G.FLOAT, 3);
  const u = new _a(e.batchTableJson, e.batchTableBinary, c);
  return Bp(e, a, u, c), n;
}
function Bp(e, t, n, s) {
  const r = new Array(s), i = new A();
  new A(), new A(), new A();
  const o = new z(), a = new wn(), c = new A(), u = {}, l = new V(), h = [], f = [], d = [], m = [];
  for (let g = 0; g < s; g++) {
    let p;
    if (t.hasProperty("POSITION"))
      p = t.getProperty("POSITION", G.FLOAT, 3, g, i);
    else if (t.hasProperty("POSITION_QUANTIZED")) {
      p = t.getProperty("POSITION_QUANTIZED", G.UNSIGNED_SHORT, 3, g, i);
      const E = t.getGlobalProperty("QUANTIZED_VOLUME_OFFSET", G.FLOAT, 3);
      if (!E)
        throw new Error("i3dm parser: QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.");
      const O = t.getGlobalProperty("QUANTIZED_VOLUME_SCALE", G.FLOAT, 3);
      if (!O)
        throw new Error("i3dm parser: QUANTIZED_VOLUME_SCALE must be defined for quantized positions.");
      const F = 65535;
      for (let x = 0; x < 3; x++)
        p[x] = p[x] / F * O[x] + E[x];
    }
    if (!p)
      throw new Error("i3dm: POSITION or POSITION_QUANTIZED must be defined for each instance.");
    if (i.copy(p), u.translation = i, e.normalUp = t.getProperty("NORMAL_UP", G.FLOAT, 3, g, h), e.normalRight = t.getProperty("NORMAL_RIGHT", G.FLOAT, 3, g, f), e.normalUp) {
      if (!e.normalRight)
        throw new Error("i3dm: Custom orientation requires both NORMAL_UP and NORMAL_RIGHT.");
      e.hasCustomOrientation = !0;
    } else {
      if (e.octNormalUp = t.getProperty("NORMAL_UP_OCT32P", G.UNSIGNED_SHORT, 2, g, h), e.octNormalRight = t.getProperty("NORMAL_RIGHT_OCT32P", G.UNSIGNED_SHORT, 2, g, f), e.octNormalUp)
        throw e.octNormalRight ? new Error("i3dm: oct-encoded orientation not implemented") : new Error("i3dm: oct-encoded orientation requires NORMAL_UP_OCT32P and NORMAL_RIGHT_OCT32P");
      e.eastNorthUp ? (J.WGS84.eastNorthUpToFixedFrame(i, l), l.getRotationMatrix3(o)) : o.identity();
    }
    a.fromMatrix3(o), u.rotation = a, c.set(1, 1, 1);
    const C = t.getProperty("SCALE", G.FLOAT, 1, g, d);
    Number.isFinite(C) && c.multiplyByScalar(C);
    const w = t.getProperty("SCALE_NON_UNIFORM", G.FLOAT, 3, g, h);
    w && c.scale(w), u.scale = c;
    let y = t.getProperty("BATCH_ID", G.UNSIGNED_SHORT, 1, g, m);
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
async function Cp(e, t, n, s, r, i) {
  n = Vn(e, t, n);
  const o = new DataView(t);
  for (e.tilesLength = o.getUint32(n, !0), n += 4, e.tiles = []; e.tiles.length < e.tilesLength && (e.byteLength || 0) - n > 12; ) {
    const a = {
      shape: "tile3d"
    };
    e.tiles.push(a), n = await i(t, n, s, r, a);
  }
  return n;
}
async function Ep(e, t, n, s) {
  var r, i;
  if (e.rotateYtoZ = !0, e.gltfUpAxis = n != null && (r = n["3d-tiles"]) !== null && r !== void 0 && r.assetGltfUpAxis ? n["3d-tiles"].assetGltfUpAxis : "Y", n != null && (i = n["3d-tiles"]) !== null && i !== void 0 && i.loadGLTF) {
    if (!s)
      return t.byteLength;
    const o = await He(t, On, n, s);
    e.gltf = Xa(o), e.gpuMemoryUsageInBytes = Fa(e.gltf);
  } else
    e.gltfArrayBuffer = t;
  return t.byteLength;
}
async function Ya(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
    shape: "tile3d"
  };
  switch (r.byteOffset = t, r.type = jd(e, t), r.type) {
    case Ce.COMPOSITE:
      return await Cp(r, e, t, n, s, Ya);
    case Ce.BATCHED_3D_MODEL:
      return await gp(r, e, t, n, s);
    case Ce.GLTF:
      return await Ep(r, e, n, s);
    case Ce.INSTANCED_3D_MODEL:
      return await pp(r, e, t, n, s);
    case Ce.POINT_CLOUD:
      return await Mm(r, e, t, n, s);
    default:
      throw new Error(`3DTileLoader: unknown type ${r.type}`);
  }
}
const Tp = 1952609651, bp = 1;
async function _p(e, t, n) {
  if (new Uint32Array(e.slice(0, 4))[0] !== Tp)
    throw new Error("Wrong subtree file magic number");
  if (new Uint32Array(e.slice(4, 8))[0] !== bp)
    throw new Error("Wrong subtree file verson, must be 1");
  const i = ro(e.slice(8, 16)), o = new Uint8Array(e, 24, i), c = new TextDecoder("utf8").decode(o), u = JSON.parse(c), l = ro(e.slice(16, 24));
  let h = new ArrayBuffer(0);
  if (l && (h = e.slice(24 + i)), await fn(u, u.tileAvailability, h, n), Array.isArray(u.contentAvailability))
    for (const f of u.contentAvailability)
      await fn(u, f, h, n);
  else
    await fn(u, u.contentAvailability, h, n);
  return await fn(u, u.childSubtreeAvailability, h, n), u;
}
async function fn(e, t, n, s) {
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
function ro(e) {
  const t = new DataView(e), n = t.getUint32(0, !0), s = t.getUint32(4, !0);
  return n + 2 ** 32 * s;
}
const $a = {
  id: "3d-tiles-subtree",
  name: "3D Tiles Subtree",
  module: "3d-tiles",
  version: Ba,
  extensions: ["subtree"],
  mimeTypes: ["application/octet-stream"],
  tests: ["subtree"],
  parse: _p,
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
var Bt = null;
try {
  Bt = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
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
function ot(e) {
  return (e && e.__isLong__) === !0;
}
function io(e) {
  var t = Math.clz32(e & -e);
  return e ? 31 - t : t;
}
H.isLong = ot;
var oo = {}, ao = {};
function te(e, t) {
  var n, s, r;
  return t ? (e >>>= 0, (r = 0 <= e && e < 256) && (s = ao[e], s) ? s : (n = P(e, 0, !0), r && (ao[e] = n), n)) : (e |= 0, (r = -128 <= e && e < 128) && (s = oo[e], s) ? s : (n = P(e, e < 0 ? -1 : 0, !1), r && (oo[e] = n), n));
}
H.fromInt = te;
function Ct(e, t) {
  if (isNaN(e))
    return t ? Lt : wt;
  if (t) {
    if (e < 0)
      return Lt;
    if (e >= Za)
      return nc;
  } else {
    if (e <= -uo)
      return ft;
    if (e + 1 >= uo)
      return ec;
  }
  return e < 0 ? Ct(-e, t).neg() : P(e % me | 0, e / me | 0, t);
}
H.fromNumber = Ct;
function P(e, t, n) {
  return new H(e, t, n);
}
H.fromBits = P;
var Fn = Math.pow;
function Mr(e, t, n) {
  if (e.length === 0)
    throw Error("empty string");
  if (typeof t == "number" ? (n = t, t = !1) : t = !!t, e === "NaN" || e === "Infinity" || e === "+Infinity" || e === "-Infinity")
    return t ? Lt : wt;
  if (n = n || 10, n < 2 || 36 < n)
    throw RangeError("radix");
  var s;
  if ((s = e.indexOf("-")) > 0)
    throw Error("interior hyphen");
  if (s === 0)
    return Mr(e.substring(1), t, n).neg();
  for (var r = Ct(Fn(n, 8)), i = wt, o = 0; o < e.length; o += 8) {
    var a = Math.min(8, e.length - o), c = parseInt(e.substring(o, o + a), n);
    if (a < 8) {
      var u = Ct(Fn(n, a));
      i = i.mul(u).add(Ct(c));
    } else
      i = i.mul(r), i = i.add(Ct(c));
  }
  return i.unsigned = t, i;
}
H.fromString = Mr;
function Mt(e, t) {
  return typeof e == "number" ? Ct(e, t) : typeof e == "string" ? Mr(e, t) : P(e.low, e.high, typeof t == "boolean" ? t : e.unsigned);
}
H.fromValue = Mt;
var co = 65536, wp = 1 << 24, me = co * co, Za = me * me, uo = Za / 2, lo = te(wp), wt = te(0);
H.ZERO = wt;
var Lt = te(0, !0);
H.UZERO = Lt;
var le = te(1);
H.ONE = le;
var tc = te(1, !0);
H.UONE = tc;
var Qs = te(-1);
H.NEG_ONE = Qs;
var ec = P(-1, 2147483647, !1);
H.MAX_VALUE = ec;
var nc = P(-1, -1, !0);
H.MAX_UNSIGNED_VALUE = nc;
var ft = P(0, -2147483648, !1);
H.MIN_VALUE = ft;
var b = H.prototype;
b.toInt = function() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
b.toNumber = function() {
  return this.unsigned ? (this.high >>> 0) * me + (this.low >>> 0) : this.high * me + (this.low >>> 0);
};
b.toString = function(t) {
  if (t = t || 10, t < 2 || 36 < t)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative())
    if (this.eq(ft)) {
      var n = Ct(t), s = this.div(n), r = s.mul(n).sub(this);
      return s.toString(t) + r.toInt().toString(t);
    } else
      return "-" + this.neg().toString(t);
  for (var i = Ct(Fn(t, 6), this.unsigned), o = this, a = ""; ; ) {
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
    return this.eq(ft) ? 64 : this.neg().getNumBitsAbs();
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
  return ot(t) || (t = Mt(t)), this.unsigned !== t.unsigned && this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low;
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
  if (ot(t) || (t = Mt(t)), this.eq(t))
    return 0;
  var n = this.isNegative(), s = t.isNegative();
  return n && !s ? -1 : !n && s ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1;
};
b.comp = b.compare;
b.negate = function() {
  return !this.unsigned && this.eq(ft) ? ft : this.not().add(le);
};
b.neg = b.negate;
b.add = function(t) {
  ot(t) || (t = Mt(t));
  var n = this.high >>> 16, s = this.high & 65535, r = this.low >>> 16, i = this.low & 65535, o = t.high >>> 16, a = t.high & 65535, c = t.low >>> 16, u = t.low & 65535, l = 0, h = 0, f = 0, d = 0;
  return d += i + u, f += d >>> 16, d &= 65535, f += r + c, h += f >>> 16, f &= 65535, h += s + a, l += h >>> 16, h &= 65535, l += n + o, l &= 65535, P(f << 16 | d, l << 16 | h, this.unsigned);
};
b.subtract = function(t) {
  return ot(t) || (t = Mt(t)), this.add(t.neg());
};
b.sub = b.subtract;
b.multiply = function(t) {
  if (this.isZero())
    return this;
  if (ot(t) || (t = Mt(t)), Bt) {
    var n = Bt.mul(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return P(n, Bt.get_high(), this.unsigned);
  }
  if (t.isZero())
    return this.unsigned ? Lt : wt;
  if (this.eq(ft))
    return t.isOdd() ? ft : wt;
  if (t.eq(ft))
    return this.isOdd() ? ft : wt;
  if (this.isNegative())
    return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
  if (t.isNegative())
    return this.mul(t.neg()).neg();
  if (this.lt(lo) && t.lt(lo))
    return Ct(this.toNumber() * t.toNumber(), this.unsigned);
  var s = this.high >>> 16, r = this.high & 65535, i = this.low >>> 16, o = this.low & 65535, a = t.high >>> 16, c = t.high & 65535, u = t.low >>> 16, l = t.low & 65535, h = 0, f = 0, d = 0, m = 0;
  return m += o * l, d += m >>> 16, m &= 65535, d += i * l, f += d >>> 16, d &= 65535, d += o * u, f += d >>> 16, d &= 65535, f += r * l, h += f >>> 16, f &= 65535, f += i * u, h += f >>> 16, f &= 65535, f += o * c, h += f >>> 16, f &= 65535, h += s * l + r * u + i * c + o * a, h &= 65535, P(d << 16 | m, h << 16 | f, this.unsigned);
};
b.mul = b.multiply;
b.divide = function(t) {
  if (ot(t) || (t = Mt(t)), t.isZero())
    throw Error("division by zero");
  if (Bt) {
    if (!this.unsigned && this.high === -2147483648 && t.low === -1 && t.high === -1)
      return this;
    var n = (this.unsigned ? Bt.div_u : Bt.div_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return P(n, Bt.get_high(), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? Lt : wt;
  var s, r, i;
  if (this.unsigned) {
    if (t.unsigned || (t = t.toUnsigned()), t.gt(this))
      return Lt;
    if (t.gt(this.shru(1)))
      return tc;
    i = Lt;
  } else {
    if (this.eq(ft)) {
      if (t.eq(le) || t.eq(Qs))
        return ft;
      if (t.eq(ft))
        return le;
      var o = this.shr(1);
      return s = o.div(t).shl(1), s.eq(wt) ? t.isNegative() ? le : Qs : (r = this.sub(t.mul(s)), i = s.add(r.div(t)), i);
    } else if (t.eq(ft))
      return this.unsigned ? Lt : wt;
    if (this.isNegative())
      return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
    if (t.isNegative())
      return this.div(t.neg()).neg();
    i = wt;
  }
  for (r = this; r.gte(t); ) {
    s = Math.max(1, Math.floor(r.toNumber() / t.toNumber()));
    for (var a = Math.ceil(Math.log(s) / Math.LN2), c = a <= 48 ? 1 : Fn(2, a - 48), u = Ct(s), l = u.mul(t); l.isNegative() || l.gt(r); )
      s -= c, u = Ct(s, this.unsigned), l = u.mul(t);
    u.isZero() && (u = le), i = i.add(u), r = r.sub(l);
  }
  return i;
};
b.div = b.divide;
b.modulo = function(t) {
  if (ot(t) || (t = Mt(t)), Bt) {
    var n = (this.unsigned ? Bt.rem_u : Bt.rem_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return P(n, Bt.get_high(), this.unsigned);
  }
  return this.sub(this.div(t).mul(t));
};
b.mod = b.modulo;
b.rem = b.modulo;
b.not = function() {
  return P(~this.low, ~this.high, this.unsigned);
};
b.countLeadingZeros = function() {
  return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
};
b.clz = b.countLeadingZeros;
b.countTrailingZeros = function() {
  return this.low ? io(this.low) : io(this.high) + 32;
};
b.ctz = b.countTrailingZeros;
b.and = function(t) {
  return ot(t) || (t = Mt(t)), P(this.low & t.low, this.high & t.high, this.unsigned);
};
b.or = function(t) {
  return ot(t) || (t = Mt(t)), P(this.low | t.low, this.high | t.high, this.unsigned);
};
b.xor = function(t) {
  return ot(t) || (t = Mt(t)), P(this.low ^ t.low, this.high ^ t.high, this.unsigned);
};
b.shiftLeft = function(t) {
  return ot(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? P(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : P(0, this.low << t - 32, this.unsigned);
};
b.shl = b.shiftLeft;
b.shiftRight = function(t) {
  return ot(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? P(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : P(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
b.shr = b.shiftRight;
b.shiftRightUnsigned = function(t) {
  return ot(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? P(this.low >>> t | this.high << 32 - t, this.high >>> t, this.unsigned) : t === 32 ? P(this.high, 0, this.unsigned) : P(this.high >>> t - 32, 0, this.unsigned);
};
b.shru = b.shiftRightUnsigned;
b.shr_u = b.shiftRightUnsigned;
b.rotateLeft = function(t) {
  var n;
  return ot(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t === 32 ? P(this.high, this.low, this.unsigned) : t < 32 ? (n = 32 - t, P(this.low << t | this.high >>> n, this.high << t | this.low >>> n, this.unsigned)) : (t -= 32, n = 32 - t, P(this.high << t | this.low >>> n, this.low << t | this.high >>> n, this.unsigned));
};
b.rotl = b.rotateLeft;
b.rotateRight = function(t) {
  var n;
  return ot(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t === 32 ? P(this.high, this.low, this.unsigned) : t < 32 ? (n = 32 - t, P(this.high << n | this.low >>> t, this.low << n | this.high >>> t, this.unsigned)) : (t -= 32, n = 32 - t, P(this.low << n | this.high >>> t, this.high << n | this.low >>> t, this.unsigned));
};
b.rotr = b.rotateRight;
b.toSigned = function() {
  return this.unsigned ? P(this.low, this.high, !1) : this;
};
b.toUnsigned = function() {
  return this.unsigned ? this : P(this.low, this.high, !0);
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
const Rp = 16;
function sc(e) {
  e === "X" && (e = "");
  const t = e.padEnd(Rp, "0");
  return H.fromString(t, !0, 16);
}
function Mp(e) {
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
function Ip(e, t) {
  const n = Sp(e).shiftRightUnsigned(2);
  return e.add(H.fromNumber(2 * t + 1 - 4).multiply(n));
}
function Sp(e) {
  return e.and(e.not().add(1));
}
const xp = 3, Op = 30, Fp = 2 * Op + 1, ho = 180 / Math.PI;
function vp(e) {
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
    Lp(h, o, u, l), o[0] += h * u, o[1] += h * l;
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
function Dp(e) {
  if (e.isZero())
    return "";
  let t = e.toString(2);
  for (; t.length < xp + Fp; )
    t = "0" + t;
  const n = t.lastIndexOf("1"), s = t.substring(0, 3), r = t.substring(3, n), i = r.length / 2, o = H.fromString(s, !0, 2).toString(10);
  let a = "";
  if (i !== 0)
    for (a = H.fromString(r, !0, 2).toString(4); a.length < i; )
      a = "0" + a;
  return `${o}/${a}`;
}
function rc(e, t, n) {
  const s = 1 << t;
  return [(e[0] + n[0]) / s, (e[1] + n[1]) / s];
}
function fo(e) {
  return e >= 0.5 ? 1 / 3 * (4 * e * e - 1) : 1 / 3 * (1 - 4 * (1 - e) * (1 - e));
}
function ic(e) {
  return [fo(e[0]), fo(e[1])];
}
function oc(e, t) {
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
function ac(e) {
  let [t, n, s] = e;
  const r = Math.atan2(s, Math.sqrt(t * t + n * n));
  return [Math.atan2(n, t) * ho, r * ho];
}
function Lp(e, t, n, s) {
  if (s === 0) {
    n === 1 && (t[0] = e - 1 - t[0], t[1] = e - 1 - t[1]);
    const r = t[0];
    t[0] = t[1], t[1] = r;
  }
}
function Gp(e) {
  const t = rc(e.ij, e.level, [0.5, 0.5]), n = ic(t), s = oc(e.face, n);
  return ac(s);
}
const Pp = 100;
function mo(e) {
  const {
    face: t,
    ij: n,
    level: s
  } = e, r = [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]], i = Math.max(1, Math.ceil(Pp * Math.pow(2, -s))), o = new Float64Array(4 * i * 2 + 2);
  let a = 0, c = 0;
  for (let u = 0; u < 4; u++) {
    const l = r[u].slice(0), h = r[u + 1], f = (h[0] - l[0]) / i, d = (h[1] - l[1]) / i;
    for (let m = 0; m < i; m++) {
      l[0] += f, l[1] += d;
      const g = rc(n, s, l), p = ic(g), C = oc(t, p), w = ac(C);
      Math.abs(w[1]) > 89.999 && (w[0] = c);
      const y = w[0] - c;
      w[0] += y > 180 ? -360 : y < -180 ? 360 : 0, o[a++] = w[0], o[a++] = w[1], c = w[0];
    }
  }
  return o[a++] = o[0], o[a++] = o[1], o;
}
function Ir(e) {
  const t = Np(e);
  return vp(t);
}
function Np(e) {
  if (e.indexOf("/") > 0)
    return e;
  const t = sc(e);
  return Dp(t);
}
function Up(e) {
  const t = Ir(e);
  return Gp(t);
}
function Hp(e) {
  let t;
  if (e.face === 2 || e.face === 5) {
    let n = null, s = 0;
    for (let r = 0; r < 4; r++) {
      const i = `${e.face}/${r}`, o = Ir(i), a = mo(o);
      (typeof n > "u" || n === null) && (n = new Float64Array(4 * a.length)), n.set(a, s), s += a.length;
    }
    t = go(n);
  } else {
    const n = mo(e);
    t = go(n);
  }
  return t;
}
function go(e) {
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
function Jp(e, t) {
  const n = (t == null ? void 0 : t.minimumHeight) || 0, s = (t == null ? void 0 : t.maximumHeight) || 0, r = Ir(e), i = Hp(r), o = i.west, a = i.south, c = i.east, u = i.north, l = [];
  return l.push(new A(o, u, n)), l.push(new A(c, u, n)), l.push(new A(c, a, n)), l.push(new A(o, a, n)), l.push(new A(o, u, s)), l.push(new A(c, u, s)), l.push(new A(c, a, s)), l.push(new A(o, a, s)), l;
}
function cc(e) {
  const t = e.token, n = {
    minimumHeight: e.minimumHeight,
    maximumHeight: e.maximumHeight
  }, s = Jp(t, n), r = Up(t), i = r[0], o = r[1], a = J.WGS84.cartographicToCartesian([i, o, n.maximumHeight]), c = new A(a[0], a[1], a[2]);
  s.push(c);
  const u = fd(s);
  return [...u.center, ...u.halfAxes];
}
const Vp = 4, jp = 8, kp = {
  QUADTREE: Vp,
  OCTREE: jp
};
function Kp(e, t, n) {
  if (e != null && e.box) {
    const s = sc(e.s2VolumeInfo.token), r = Ip(s, t), i = Mp(r), o = {
      ...e.s2VolumeInfo
    };
    switch (o.token = i, n) {
      case "OCTREE":
        const u = e.s2VolumeInfo, l = u.maximumHeight - u.minimumHeight, h = l / 2, f = u.minimumHeight + l / 2;
        u.minimumHeight = f - h, u.maximumHeight = f + h;
        break;
    }
    return {
      box: cc(o),
      s2VolumeInfo: o
    };
  }
}
async function uc(e) {
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
    return jo.once(`Missing 'maximumLevel' or 'availableLevels' property. The subtree ${f} won't be loaded...`), g;
  const p = a + c.level;
  if (p > h)
    return g;
  const C = kp[u], w = Math.log2(C), y = s & 1, B = s >> 1 & 1, R = s >> 2 & 1, E = (C ** a - 1) / (C - 1);
  let O = Kt(n.mortonIndex, s, w), F = E + O, x = Kt(n.x, y, 1), v = Kt(n.y, B, 1), k = Kt(n.z, R, 1), X = !1;
  a >= l && (X = Ms(o.childSubtreeAvailability, O));
  const Q = Kt(c.x, x, a), D = Kt(c.y, v, a), at = Kt(c.z, k, a);
  if (X) {
    const nt = `${m}/${d}`, Ft = qs(nt, p, Q, D, at);
    o = await fe(Ft, $a, i), c = {
      mortonIndex: O,
      x,
      y: v,
      z: k,
      level: a
    }, O = 0, F = 0, x = 0, v = 0, k = 0, a = 0;
  }
  if (!Ms(o.tileAvailability, F))
    return g;
  Ms(o.contentAvailability, F) && (g.contentUrl = qs(f, p, Q, D, at));
  const ge = a + 1, Nt = {
    mortonIndex: O,
    x,
    y: v,
    z: k
  };
  for (let nt = 0; nt < C; nt++) {
    const Ft = Kp(r, nt, u), jt = await uc({
      subtree: o,
      implicitOptions: t,
      loaderOptions: i,
      parentData: Nt,
      childIndex: nt,
      level: ge,
      globalData: {
        ...c
      },
      s2VolumeBox: Ft
    });
    if (jt.contentUrl || jt.children.length) {
      const Ae = p + 1, zn = zp(jt, Ae, {
        childTileX: x,
        childTileY: v,
        childTileZ: k
      }, t, r);
      g.children.push(zn);
    }
  }
  return g;
}
function Ms(e, t) {
  let n;
  return Array.isArray(e) ? (n = e[0], e.length > 1 && jo.once('Not supported extension "3DTILES_multiple_contents" has been detected')) : n = e, "constant" in n ? !!n.constant : n.explicitBitstream ? Qp(t, n.explicitBitstream) : !1;
}
function zp(e, t, n, s, r) {
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
  } : h, g = Wp(t, m, n);
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
function Wp(e, t, n) {
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
function Kt(e, t, n) {
  return (e << n) + t;
}
function qs(e, t, n, s, r) {
  const i = Xp({
    level: t,
    x: n,
    y: s,
    z: r
  });
  return e.replace(/{level}|{x}|{y}|{z}/gi, (o) => i[o]);
}
function Xp(e) {
  const t = {};
  for (const n in e)
    t[`{${n}}`] = e[n];
  return t;
}
function Qp(e, t) {
  const n = Math.floor(e / 8), s = e % 8;
  return (t[n] >> s & 1) === 1;
}
function Sr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  if (!t)
    return zt.EMPTY;
  const s = t.split("?")[0].split(".").pop();
  switch (s) {
    case "pnts":
      return zt.POINTCLOUD;
    case "i3dm":
    case "b3dm":
    case "glb":
    case "gltf":
      return zt.SCENEGRAPH;
    default:
      return s || zt.EMPTY;
  }
}
function xr(e) {
  switch (e) {
    case "REPLACE":
    case "replace":
      return Gt.REPLACE;
    case "ADD":
    case "add":
      return Gt.ADD;
    default:
      return e;
  }
}
function Ys(e, t) {
  if (/^[a-z][0-9a-z+.-]*:/i.test(t)) {
    const s = new URL(e, `${t}/`);
    return decodeURI(s.toString());
  } else if (e.startsWith("/"))
    return e;
  return Ru(t, e);
}
function Ao(e, t) {
  if (!e)
    return null;
  let n;
  if (e.content) {
    var s;
    const i = e.content.uri || ((s = e.content) === null || s === void 0 ? void 0 : s.url);
    typeof i < "u" && (n = Ys(i, t));
  }
  return {
    ...e,
    id: n,
    contentUrl: n,
    lodMetricType: Hn.GEOMETRIC_ERROR,
    lodMetricValue: e.geometricError,
    transformMatrix: e.transform,
    type: Sr(e, n),
    refine: xr(e.refine)
  };
}
async function qp(e, t, n) {
  let s = null;
  const r = yo(e.root);
  r && e.root ? s = await po(e.root, e, t, r, n) : s = Ao(e.root, t);
  const i = [];
  for (i.push(s); i.length > 0; ) {
    const o = i.pop() || {}, a = o.children || [], c = [];
    for (const u of a) {
      const l = yo(u);
      let h;
      l ? h = await po(u, e, t, l, n) : h = Ao(u, t), h && (c.push(h), i.push(h));
    }
    o.children = c;
  }
  return s;
}
async function po(e, t, n, s, r) {
  var i, o, a;
  const {
    subdivisionScheme: c,
    maximumLevel: u,
    availableLevels: l,
    subtreeLevels: h,
    subtrees: {
      uri: f
    }
  } = s, d = qs(f, 0, 0, 0, 0), m = Ys(d, n), g = await fe(m, $a, r), p = (i = e.content) === null || i === void 0 ? void 0 : i.uri, C = p ? Ys(p, n) : "", w = t == null || (o = t.root) === null || o === void 0 ? void 0 : o.refine, y = e.geometricError, B = (a = e.boundingVolume.extensions) === null || a === void 0 ? void 0 : a["3DTILES_bounding_volume_S2"];
  if (B) {
    const F = {
      box: cc(B),
      s2VolumeInfo: B
    };
    e.boundingVolume = F;
  }
  const R = e.boundingVolume, E = {
    contentUrlTemplate: C,
    subtreesUriTemplate: f,
    subdivisionScheme: c,
    subtreeLevels: h,
    maximumLevel: Number.isFinite(l) ? l - 1 : u,
    refine: w,
    basePath: n,
    lodMetricType: Hn.GEOMETRIC_ERROR,
    rootLodMetricValue: y,
    rootBoundingVolume: R,
    getTileType: Sr,
    getRefine: xr
  };
  return await Yp(e, n, g, E, r);
}
async function Yp(e, t, n, s, r) {
  if (!e)
    return null;
  const {
    children: i,
    contentUrl: o
  } = await uc({
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
    lodMetricType: Hn.GEOMETRIC_ERROR,
    lodMetricValue: e.geometricError,
    transformMatrix: e.transform,
    type: Sr(e, a),
    refine: xr(e.refine),
    content: c || e.content,
    children: i
  };
}
function yo(e) {
  var t;
  return (e == null || (t = e.extensions) === null || t === void 0 ? void 0 : t["3DTILES_implicit_tiling"]) || (e == null ? void 0 : e.implicitTiling);
}
const Oe = {
  id: "3d-tiles",
  name: "3D Tiles",
  module: "3d-tiles",
  version: Ba,
  extensions: ["cmpt", "pnts", "b3dm", "i3dm"],
  mimeTypes: ["application/octet-stream"],
  tests: ["cmpt", "pnts", "b3dm", "i3dm"],
  parse: $p,
  options: {
    "3d-tiles": {
      loadGLTF: !0,
      decodeQuantizedPositions: !1,
      isTileset: "auto",
      assetGltfUpAxis: null
    }
  }
};
async function $p(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = t["3d-tiles"] || {};
  let r;
  return s.isTileset === "auto" ? r = (n == null ? void 0 : n.url) && n.url.indexOf(".json") !== -1 : r = s.isTileset, r ? Zp(e, t, n) : ty(e, t, n);
}
async function Zp(e, t, n) {
  var s;
  const r = JSON.parse(new TextDecoder().decode(e)), i = (n == null ? void 0 : n.url) || "", o = ey(i), a = await qp(r, o, t || {});
  return {
    ...r,
    shape: "tileset3d",
    loader: Oe,
    url: i,
    queryString: (n == null ? void 0 : n.queryString) || "",
    basePath: o,
    root: a || r.root,
    type: At.TILES3D,
    lodMetricType: Hn.GEOMETRIC_ERROR,
    lodMetricValue: ((s = r.root) === null || s === void 0 ? void 0 : s.geometricError) || 0
  };
}
async function ty(e, t, n) {
  const s = {
    content: {
      shape: "tile3d",
      featureIds: null
    }
  };
  return await Ya(e, 0, t, n, s.content), s.content;
}
function ey(e) {
  return rr(e);
}
const lc = "https://api.cesium.com/v1/assets";
async function ny(e, t) {
  if (!t) {
    const i = await sy(e);
    for (const o of i.items)
      o.type === "3DTILES" && (t = o.id);
  }
  const n = await ry(e, t), {
    type: s,
    url: r
  } = n;
  return U(s === "3DTILES" && r), n.headers = {
    Authorization: `Bearer ${n.accessToken}`
  }, n;
}
async function sy(e) {
  U(e);
  const t = lc, n = {
    Authorization: `Bearer ${e}`
  }, s = await Fe(t, {
    headers: n
  });
  if (!s.ok)
    throw new Error(s.statusText);
  return await s.json();
}
async function ry(e, t) {
  U(e, t);
  const n = {
    Authorization: `Bearer ${e}`
  }, s = `${lc}/${t}`;
  let r = await Fe(`${s}`, {
    headers: n
  });
  if (!r.ok)
    throw new Error(r.statusText);
  let i = await r.json();
  if (r = await Fe(`${s}/endpoint`, {
    headers: n
  }), !r.ok)
    throw new Error(r.statusText);
  const o = await r.json();
  return i = {
    ...i,
    ...o
  }, i;
}
async function iy(e) {
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
  return ny(n, s);
}
const hc = {
  ...Oe,
  id: "cesium-ion",
  name: "Cesium Ion",
  preload: iy,
  parse: async (e, t, n) => (t = {
    ...t
  }, t["3d-tiles"] = t["cesium-ion"], t.loader = hc, Oe.parse(e, t, n)),
  options: {
    "cesium-ion": {
      ...Oe.options["3d-tiles"],
      accessToken: null
    }
  }
}, Bo = 100;
class oy {
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
    Number.isFinite(n) && (this.cursor = n), this.shape = "array-row-table", this.rows = this.rows || new Array(Bo), this.rows[this.length] = t, this.length++;
  }
  addObjectRow(t, n) {
    Number.isFinite(n) && (this.cursor = n), this.shape = "object-row-table", this.rows = this.rows || new Array(Bo), this.rows[this.length] = t, this.length++;
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
function ay(e, t) {
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
function cy(e, t) {
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
function uy(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) {
    const s = `column-${n}`;
    t.push(s);
  }
  return t;
}
function ly(e) {
  return Object.keys(e);
}
const Co = 100;
class hy {
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
    switch (Number.isFinite(n) && (this.cursor = n), this._headers || (this._headers = uy(t)), this.options.shape) {
      case "object-row-table":
        const s = ay(t, this._headers);
        this.addObjectRow(s, n);
        break;
      case "array-row-table":
        this.arrayRows = this.arrayRows || new Array(Co), this.arrayRows[this.length] = t, this.length++;
        break;
    }
  }
  addObjectRow(t, n) {
    switch (Number.isFinite(n) && (this.cursor = n), this._headers || (this._headers = ly(t)), this.options.shape) {
      case "array-row-table":
        const s = cy(t, this._headers);
        this.addArrayRow(s, n);
        break;
      case "object-row-table":
        this.objectRows = this.objectRows || new Array(Co), this.objectRows[this.length] = t, this.length++;
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
const fy = 100;
class dy {
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
      this.allocated = this.allocated > 0 ? this.allocated *= 2 : fy, this.columns = {};
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
const my = {
  shape: void 0,
  batchSize: "auto",
  batchDebounceMs: 0,
  limit: 0,
  _limitMB: 0
}, gy = "TableBatchBuilder";
class Le {
  constructor(t, n) {
    this.schema = void 0, this.options = void 0, this.aggregator = null, this.batchCount = 0, this.bytesUsed = 0, this.isChunkComplete = !1, this.lastBatchEmittedMs = Date.now(), this.totalLength = 0, this.totalBytes = 0, this.rowBytes = 0, this.schema = t, this.options = {
      ...my,
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
        return hy;
      case "columnar-table":
        return dy;
      case "arrow-table":
        if (!Le.ArrowBatch)
          throw new Error(gy);
        return Le.ArrowBatch;
      default:
        return oy;
    }
  }
}
Le.ArrowBatch = void 0;
function Ay(e) {
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
const $s = Number.MAX_SAFE_INTEGER;
var M = function(e) {
  return e[e.BEGIN = 0] = "BEGIN", e[e.VALUE = 1] = "VALUE", e[e.OPEN_OBJECT = 2] = "OPEN_OBJECT", e[e.CLOSE_OBJECT = 3] = "CLOSE_OBJECT", e[e.OPEN_ARRAY = 4] = "OPEN_ARRAY", e[e.CLOSE_ARRAY = 5] = "CLOSE_ARRAY", e[e.TEXT_ESCAPE = 6] = "TEXT_ESCAPE", e[e.STRING = 7] = "STRING", e[e.BACKSLASH = 8] = "BACKSLASH", e[e.END = 9] = "END", e[e.OPEN_KEY = 10] = "OPEN_KEY", e[e.CLOSE_KEY = 11] = "CLOSE_KEY", e[e.TRUE = 12] = "TRUE", e[e.TRUE2 = 13] = "TRUE2", e[e.TRUE3 = 14] = "TRUE3", e[e.FALSE = 15] = "FALSE", e[e.FALSE2 = 16] = "FALSE2", e[e.FALSE3 = 17] = "FALSE3", e[e.FALSE4 = 18] = "FALSE4", e[e.NULL = 19] = "NULL", e[e.NULL2 = 20] = "NULL2", e[e.NULL3 = 21] = "NULL3", e[e.NUMBER_DECIMAL_POINT = 22] = "NUMBER_DECIMAL_POINT", e[e.NUMBER_DIGIT = 23] = "NUMBER_DIGIT", e;
}(M || {});
const I = {
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
}, Eo = /[\\"\n]/g, To = {
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
class py {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.options = To, this.bufferCheckPosition = $s, this.q = "", this.c = "", this.p = "", this.closed = !1, this.closedRoot = !1, this.sawRoot = !1, this.error = null, this.state = M.BEGIN, this.stack = [], this.position = 0, this.column = 0, this.line = 1, this.slashed = !1, this.unicodeI = 0, this.unicodeS = null, this.depth = 0, this.textNode = void 0, this.numberNode = void 0, this.options = {
      ...To,
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
      switch (this.position++, s === I.lineFeed ? (this.line++, this.column = 0) : this.column++, this.state) {
        case M.BEGIN:
          s === I.openBrace ? this.state = M.OPEN_OBJECT : s === I.openBracket ? this.state = M.OPEN_ARRAY : _e(s) || this._error("Non-whitespace before {[.");
          continue;
        case M.OPEN_KEY:
        case M.OPEN_OBJECT:
          if (_e(s))
            continue;
          if (this.state === M.OPEN_KEY)
            this.stack.push(M.CLOSE_KEY);
          else if (s === I.closeBrace) {
            this.emit("onopenobject"), this.depth++, this.emit("oncloseobject"), this.depth--, this.state = this.stack.pop() || M.VALUE;
            continue;
          } else
            this.stack.push(M.CLOSE_OBJECT);
          s === I.doubleQuote ? this.state = M.STRING : this._error('Malformed object key should start with "');
          continue;
        case M.CLOSE_KEY:
        case M.CLOSE_OBJECT:
          if (_e(s))
            continue;
          s === I.colon ? (this.state === M.CLOSE_OBJECT ? (this.stack.push(M.CLOSE_OBJECT), this._closeValue("onopenobject"), this.depth++) : this._closeValue("onkey"), this.state = M.VALUE) : s === I.closeBrace ? (this.emitNode("oncloseobject"), this.depth--, this.state = this.stack.pop() || M.VALUE) : s === I.comma ? (this.state === M.CLOSE_OBJECT && this.stack.push(M.CLOSE_OBJECT), this._closeValue(), this.state = M.OPEN_KEY) : this._error("Bad object");
          continue;
        case M.OPEN_ARRAY:
        case M.VALUE:
          if (_e(s))
            continue;
          if (this.state === M.OPEN_ARRAY)
            if (this.emit("onopenarray"), this.depth++, this.state = M.VALUE, s === I.closeBracket) {
              this.emit("onclosearray"), this.depth--, this.state = this.stack.pop() || M.VALUE;
              continue;
            } else
              this.stack.push(M.CLOSE_ARRAY);
          s === I.doubleQuote ? this.state = M.STRING : s === I.openBrace ? this.state = M.OPEN_OBJECT : s === I.openBracket ? this.state = M.OPEN_ARRAY : s === I.t ? this.state = M.TRUE : s === I.f ? this.state = M.FALSE : s === I.n ? this.state = M.NULL : s === I.minus ? this.numberNode += "-" : I._0 <= s && s <= I._9 ? (this.numberNode += String.fromCharCode(s), this.state = M.NUMBER_DIGIT) : this._error("Bad value");
          continue;
        case M.CLOSE_ARRAY:
          if (s === I.comma)
            this.stack.push(M.CLOSE_ARRAY), this._closeValue("onvalue"), this.state = M.VALUE;
          else if (s === I.closeBracket)
            this.emitNode("onclosearray"), this.depth--, this.state = this.stack.pop() || M.VALUE;
          else {
            if (_e(s))
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
              if (s === I.doubleQuote && !o) {
                this.state = this.stack.pop() || M.VALUE, this.textNode += t.substring(i, n - 1), this.position += n - 1 - i;
                break;
              }
              if (s === I.backslash && !o && (o = !0, this.textNode += t.substring(i, n - 1), this.position += n - 1 - i, s = t.charCodeAt(n++), this.position++, !s))
                break;
              if (o) {
                if (o = !1, s === I.n ? this.textNode += `
` : s === I.r ? this.textNode += "\r" : s === I.t ? this.textNode += "	" : s === I.f ? this.textNode += "\f" : s === I.b ? this.textNode += "\b" : s === I.u ? (a = 1, this.unicodeS = "") : this.textNode += String.fromCharCode(s), s = t.charCodeAt(n++), this.position++, i = n - 1, s)
                  continue;
                break;
              }
              Eo.lastIndex = n;
              const c = Eo.exec(t);
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
          s === I.r ? this.state = M.TRUE2 : this._error(`Invalid true started with t${s}`);
          continue;
        case M.TRUE2:
          s === I.u ? this.state = M.TRUE3 : this._error(`Invalid true started with tr${s}`);
          continue;
        case M.TRUE3:
          s === I.e ? (this.emit("onvalue", !0), this.state = this.stack.pop() || M.VALUE) : this._error(`Invalid true started with tru${s}`);
          continue;
        case M.FALSE:
          s === I.a ? this.state = M.FALSE2 : this._error(`Invalid false started with f${s}`);
          continue;
        case M.FALSE2:
          s === I.l ? this.state = M.FALSE3 : this._error(`Invalid false started with fa${s}`);
          continue;
        case M.FALSE3:
          s === I.s ? this.state = M.FALSE4 : this._error(`Invalid false started with fal${s}`);
          continue;
        case M.FALSE4:
          s === I.e ? (this.emit("onvalue", !1), this.state = this.stack.pop() || M.VALUE) : this._error(`Invalid false started with fals${s}`);
          continue;
        case M.NULL:
          s === I.u ? this.state = M.NULL2 : this._error(`Invalid null started with n${s}`);
          continue;
        case M.NULL2:
          s === I.l ? this.state = M.NULL3 : this._error(`Invalid null started with nu${s}`);
          continue;
        case M.NULL3:
          s === I.l ? (this.emit("onvalue", null), this.state = this.stack.pop() || M.VALUE) : this._error(`Invalid null started with nul${s}`);
          continue;
        case M.NUMBER_DECIMAL_POINT:
          s === I.period ? (this.numberNode += ".", this.state = M.NUMBER_DIGIT) : this._error("Leading zero not followed by .");
          continue;
        case M.NUMBER_DIGIT:
          I._0 <= s && s <= I._9 ? this.numberNode += String.fromCharCode(s) : s === I.period ? (this.numberNode.indexOf(".") !== -1 && this._error("Invalid number has two dots"), this.numberNode += ".") : s === I.e || s === I.E ? ((this.numberNode.indexOf("e") !== -1 || this.numberNode.indexOf("E") !== -1) && this._error("Invalid number has two exponential"), this.numberNode += "e") : s === I.plus || s === I.minus ? (r === I.e || r === I.E || this._error("Invalid symbol in number"), this.numberNode += String.fromCharCode(s)) : (this._closeNumber(), n--, this.state = this.stack.pop() || M.VALUE);
          continue;
        default:
          this._error(`Unknown state: ${this.state}`);
      }
    return this.position >= this.bufferCheckPosition && yy(this), this.emit("onchunkparsed"), this;
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
function _e(e) {
  return e === I.carriageReturn || e === I.lineFeed || e === I.space || e === I.tab;
}
function yy(e) {
  const t = Math.max($s, 10);
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
  e.bufferCheckPosition = $s - n + e.position;
}
class Qt {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    if (this.path = void 0, this.path = ["$"], t instanceof Qt) {
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
    return new Qt(this);
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
class By {
  constructor(t) {
    this.parser = void 0, this.result = void 0, this.previousStates = [], this.currentState = Object.freeze({
      container: [],
      key: null
    }), this.jsonpath = new Qt(), this.reset(), this.parser = new py({
      onready: () => {
        this.jsonpath = new Qt(), this.previousStates.length = 0, this.currentState.container.length = 0;
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
    }), this.jsonpath = new Qt();
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
class Cy extends By {
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
    this.jsonPaths = n.map((s) => new Qt(s));
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
async function* Ey(e, t) {
  const n = Ay(e), {
    metadata: s
  } = t, {
    jsonpaths: r
  } = t.json || {};
  let i = !0;
  const o = null, a = new Le(o, t), c = new Cy({
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
const vn = {
  x: 0,
  y: 1,
  z: 2
};
function fc(e, t = {}) {
  const { start: n = 0, end: s = e.length, plane: r = "xy" } = t, i = t.size || 2;
  let o = 0;
  const a = vn[r[0]], c = vn[r[1]];
  for (let u = n, l = s - i; u < s; u += i)
    o += (e[u + a] - e[l + a]) * (e[u + c] + e[l + c]), l = u;
  return o / 2;
}
function Ty(e, t, n = 2, s, r = "xy") {
  const i = t && t.length, o = i ? t[0] * n : e.length;
  let a = dc(e, 0, o, n, !0, s && s[0], r);
  const c = [];
  if (!a || a.next === a.prev)
    return c;
  let u, l, h, f, d, m, g;
  if (i && (a = My(e, t, a, n, s, r)), e.length > 80 * n) {
    f = l = e[0], d = h = e[1];
    for (let p = n; p < o; p += n)
      m = e[p], g = e[p + 1], m < f && (f = m), g < d && (d = g), m > l && (l = m), g > h && (h = g);
    u = Math.max(l - f, h - d), u = u !== 0 ? 32767 / u : 0;
  }
  return Ge(a, c, n, f, d, u, 0), c;
}
function dc(e, t, n, s, r, i, o) {
  let a, c;
  i === void 0 && (i = fc(e, { start: t, end: n, size: s, plane: o }));
  let u = vn[o[0]], l = vn[o[1]];
  if (r === i < 0)
    for (a = t; a < n; a += s)
      c = bo(a, e[a + u], e[a + l], c);
  else
    for (a = n - s; a >= t; a -= s)
      c = bo(a, e[a + u], e[a + l], c);
  return c && Kn(c, c.next) && (Ne(c), c = c.next), c;
}
function Yt(e, t) {
  if (!e)
    return e;
  t || (t = e);
  let n = e, s;
  do
    if (s = !1, !n.steiner && (Kn(n, n.next) || K(n.prev, n, n.next) === 0)) {
      if (Ne(n), n = t = n.prev, n === n.next)
        break;
      s = !0;
    } else
      n = n.next;
  while (s || n !== t);
  return t;
}
function Ge(e, t, n, s, r, i, o) {
  if (!e)
    return;
  !o && i && Fy(e, s, r, i);
  let a = e, c, u;
  for (; e.prev !== e.next; ) {
    if (c = e.prev, u = e.next, i ? _y(e, s, r, i) : by(e)) {
      t.push(c.i / n | 0), t.push(e.i / n | 0), t.push(u.i / n | 0), Ne(e), e = u.next, a = u.next;
      continue;
    }
    if (e = u, e === a) {
      o ? o === 1 ? (e = wy(Yt(e), t, n), Ge(e, t, n, s, r, i, 2)) : o === 2 && Ry(e, t, n, s, r, i) : Ge(Yt(e), t, n, s, r, i, 1);
      break;
    }
  }
}
function by(e) {
  const t = e.prev, n = e, s = e.next;
  if (K(t, n, s) >= 0)
    return !1;
  const r = t.x, i = n.x, o = s.x, a = t.y, c = n.y, u = s.y, l = r < i ? r < o ? r : o : i < o ? i : o, h = a < c ? a < u ? a : u : c < u ? c : u, f = r > i ? r > o ? r : o : i > o ? i : o, d = a > c ? a > u ? a : u : c > u ? c : u;
  let m = s.next;
  for (; m !== t; ) {
    if (m.x >= l && m.x <= f && m.y >= h && m.y <= d && he(r, a, i, c, o, u, m.x, m.y) && K(m.prev, m, m.next) >= 0)
      return !1;
    m = m.next;
  }
  return !0;
}
function _y(e, t, n, s) {
  const r = e.prev, i = e, o = e.next;
  if (K(r, i, o) >= 0)
    return !1;
  const a = r.x, c = i.x, u = o.x, l = r.y, h = i.y, f = o.y, d = a < c ? a < u ? a : u : c < u ? c : u, m = l < h ? l < f ? l : f : h < f ? h : f, g = a > c ? a > u ? a : u : c > u ? c : u, p = l > h ? l > f ? l : f : h > f ? h : f, C = Zs(d, m, t, n, s), w = Zs(g, p, t, n, s);
  let y = e.prevZ, B = e.nextZ;
  for (; y && y.z >= C && B && B.z <= w; ) {
    if (y.x >= d && y.x <= g && y.y >= m && y.y <= p && y !== r && y !== o && he(a, l, c, h, u, f, y.x, y.y) && K(y.prev, y, y.next) >= 0 || (y = y.prevZ, B.x >= d && B.x <= g && B.y >= m && B.y <= p && B !== r && B !== o && he(a, l, c, h, u, f, B.x, B.y) && K(B.prev, B, B.next) >= 0))
      return !1;
    B = B.nextZ;
  }
  for (; y && y.z >= C; ) {
    if (y.x >= d && y.x <= g && y.y >= m && y.y <= p && y !== r && y !== o && he(a, l, c, h, u, f, y.x, y.y) && K(y.prev, y, y.next) >= 0)
      return !1;
    y = y.prevZ;
  }
  for (; B && B.z <= w; ) {
    if (B.x >= d && B.x <= g && B.y >= m && B.y <= p && B !== r && B !== o && he(a, l, c, h, u, f, B.x, B.y) && K(B.prev, B, B.next) >= 0)
      return !1;
    B = B.nextZ;
  }
  return !0;
}
function wy(e, t, n) {
  let s = e;
  do {
    const r = s.prev, i = s.next.next;
    !Kn(r, i) && mc(r, s, s.next, i) && Pe(r, i) && Pe(i, r) && (t.push(r.i / n | 0), t.push(s.i / n | 0), t.push(i.i / n | 0), Ne(s), Ne(s.next), s = e = i), s = s.next;
  } while (s !== e);
  return Yt(s);
}
function Ry(e, t, n, s, r, i) {
  let o = e;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && Ly(o, a)) {
        let c = gc(o, a);
        o = Yt(o, o.next), c = Yt(c, c.next), Ge(o, t, n, s, r, i, 0), Ge(c, t, n, s, r, i, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== e);
}
function My(e, t, n, s, r, i) {
  const o = [];
  let a, c, u, l, h;
  for (a = 0, c = t.length; a < c; a++)
    u = t[a] * s, l = a < c - 1 ? t[a + 1] * s : e.length, h = dc(e, u, l, s, !1, r && r[a + 1], i), h === h.next && (h.steiner = !0), o.push(Dy(h));
  for (o.sort(Iy), a = 0; a < o.length; a++)
    n = Sy(o[a], n);
  return n;
}
function Iy(e, t) {
  return e.x - t.x;
}
function Sy(e, t) {
  const n = xy(e, t);
  if (!n)
    return t;
  const s = gc(n, e);
  return Yt(s, s.next), Yt(n, n.next);
}
function xy(e, t) {
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
    s >= n.x && n.x >= c && s !== n.x && he(r < u ? s : i, r, c, u, r < u ? i : s, r, n.x, n.y) && (h = Math.abs(r - n.y) / (s - n.x), Pe(n, e) && (h < l || h === l && (n.x > o.x || n.x === o.x && Oy(o, n))) && (o = n, l = h)), n = n.next;
  while (n !== a);
  return o;
}
function Oy(e, t) {
  return K(e.prev, e, t.prev) < 0 && K(t.next, e, e.next) < 0;
}
function Fy(e, t, n, s) {
  let r = e;
  do
    r.z === 0 && (r.z = Zs(r.x, r.y, t, n, s)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next;
  while (r !== e);
  r.prevZ.nextZ = null, r.prevZ = null, vy(r);
}
function vy(e) {
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
function Zs(e, t, n, s, r) {
  return e = (e - n) * r | 0, t = (t - s) * r | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, e | t << 1;
}
function Dy(e) {
  let t = e, n = e;
  do
    (t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next;
  while (t !== e);
  return n;
}
function he(e, t, n, s, r, i, o, a) {
  return (r - o) * (t - a) >= (e - o) * (i - a) && (e - o) * (s - a) >= (n - o) * (t - a) && (n - o) * (i - a) >= (r - o) * (s - a);
}
function Ly(e, t) {
  return e.next.i !== t.i && e.prev.i !== t.i && !Gy(e, t) && // dones't intersect other edges
  (Pe(e, t) && Pe(t, e) && Py(e, t) && // locally visible
  (K(e.prev, e, t.prev) || K(e, t.prev, t)) || // does not create opposite-facing sectors
  Kn(e, t) && K(e.prev, e, e.next) > 0 && K(t.prev, t, t.next) > 0);
}
function K(e, t, n) {
  return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
}
function Kn(e, t) {
  return e.x === t.x && e.y === t.y;
}
function mc(e, t, n, s) {
  const r = mn(K(e, t, n)), i = mn(K(e, t, s)), o = mn(K(n, s, e)), a = mn(K(n, s, t));
  return !!(r !== i && o !== a || r === 0 && dn(e, n, t) || i === 0 && dn(e, s, t) || o === 0 && dn(n, e, s) || a === 0 && dn(n, t, s));
}
function dn(e, t, n) {
  return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y);
}
function mn(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function Gy(e, t) {
  let n = e;
  do {
    if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && mc(n, n.next, e, t))
      return !0;
    n = n.next;
  } while (n !== e);
  return !1;
}
function Pe(e, t) {
  return K(e.prev, e, e.next) < 0 ? K(e, t, e.next) >= 0 && K(e, e.prev, t) >= 0 : K(e, t, e.prev) < 0 || K(e, e.next, t) < 0;
}
function Py(e, t) {
  let n = e, s = !1;
  const r = (e.x + t.x) / 2, i = (e.y + t.y) / 2;
  do
    n.y > i != n.next.y > i && n.next.y !== n.y && r < (n.next.x - n.x) * (i - n.y) / (n.next.y - n.y) + n.x && (s = !s), n = n.next;
  while (n !== e);
  return s;
}
function gc(e, t) {
  const n = new tr(e.i, e.x, e.y), s = new tr(t.i, t.x, t.y), r = e.next, i = t.prev;
  return e.next = t, t.prev = e, n.next = r, r.prev = n, s.next = n, n.prev = s, i.next = s, s.prev = i, s;
}
function bo(e, t, n, s) {
  const r = new tr(e, t, n);
  return s ? (r.next = s.next, r.prev = s, s.next.prev = r, s.next = r) : (r.prev = r, r.next = r), r;
}
function Ne(e) {
  e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
class tr {
  constructor(t, n, s) {
    this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1, this.i = t, this.x = n, this.y = s;
  }
}
function Ny(e, t, n) {
  const s = Uy(e), r = Object.keys(s).filter((i) => s[i] !== Array);
  return Hy(e, {
    propArrayTypes: s,
    ...t
  }, {
    numericPropKeys: n && n.numericPropKeys || r,
    PositionDataType: n ? n.PositionDataType : Float32Array,
    triangulate: n ? n.triangulate : !0
  });
}
function Uy(e) {
  const t = {};
  for (const n of e)
    if (n.properties)
      for (const s in n.properties) {
        const r = n.properties[s];
        t[s] = zy(r, t[s]);
      }
  return t;
}
function Hy(e, t, n) {
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
  for (const O of [y, B, R])
    for (const F of m) {
      const x = f[F];
      O.numericProps[F] = new x(O.positions.length / d);
    }
  B.pathIndices[o] = i, R.polygonIndices[u] = c, R.primitivePolygonIndices[l] = c;
  const E = {
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
  for (const O of e) {
    const F = O.geometry, x = O.properties || {};
    switch (F.type) {
      case "Point":
        Jy(F, y, E, d, x), y.properties.push(Ss(x, m)), C && y.fields.push({
          id: O.id
        }), E.pointFeature++;
        break;
      case "LineString":
        Vy(F, B, E, d, x), B.properties.push(Ss(x, m)), C && B.fields.push({
          id: O.id
        }), E.lineFeature++;
        break;
      case "Polygon":
        jy(F, R, E, d, x), R.properties.push(Ss(x, m)), C && R.fields.push({
          id: O.id
        }), E.polygonFeature++;
        break;
      default:
        throw new Error("Invalid geometry type");
    }
    E.feature++;
  }
  return Ky(y, B, R, d);
}
function Jy(e, t, n, s, r) {
  t.positions.set(e.data, n.pointPosition * s);
  const i = e.data.length / s;
  Or(t, r, n.pointPosition, i), t.globalFeatureIds.fill(n.feature, n.pointPosition, n.pointPosition + i), t.featureIds.fill(n.pointFeature, n.pointPosition, n.pointPosition + i), n.pointPosition += i;
}
function Vy(e, t, n, s, r) {
  t.positions.set(e.data, n.linePosition * s);
  const i = e.data.length / s;
  Or(t, r, n.linePosition, i), t.globalFeatureIds.fill(n.feature, n.linePosition, n.linePosition + i), t.featureIds.fill(n.lineFeature, n.linePosition, n.linePosition + i);
  for (let o = 0, a = e.indices.length; o < a; ++o) {
    const c = e.indices[o], u = o === a - 1 ? e.data.length : e.indices[o + 1];
    t.pathIndices[n.linePath++] = n.linePosition, n.linePosition += (u - c) / s;
  }
}
function jy(e, t, n, s, r) {
  t.positions.set(e.data, n.polygonPosition * s);
  const i = e.data.length / s;
  Or(t, r, n.polygonPosition, i), t.globalFeatureIds.fill(n.feature, n.polygonPosition, n.polygonPosition + i), t.featureIds.fill(n.polygonFeature, n.polygonPosition, n.polygonPosition + i);
  for (let o = 0, a = e.indices.length; o < a; ++o) {
    const c = n.polygonPosition;
    t.polygonIndices[n.polygonObject++] = c;
    const u = e.areas[o], l = e.indices[o], h = e.indices[o + 1];
    for (let d = 0, m = l.length; d < m; ++d) {
      const g = l[d], p = d === m - 1 ? h === void 0 ? e.data.length : h[0] : l[d + 1];
      t.primitivePolygonIndices[n.polygonRing++] = n.polygonPosition, n.polygonPosition += (p - g) / s;
    }
    const f = n.polygonPosition;
    ky(t, u, l, {
      startPosition: c,
      endPosition: f,
      coordLength: s
    });
  }
}
function ky(e, t, n, s) {
  let {
    startPosition: r,
    endPosition: i,
    coordLength: o
  } = s;
  if (!e.triangles)
    return;
  const a = r * o, c = i * o, u = e.positions.subarray(a, c), l = n[0], h = n.slice(1).map((d) => (d - l) / o), f = Ty(u, h, o, t);
  for (let d = 0, m = f.length; d < m; ++d)
    e.triangles.push(r + f[d]);
}
function Is(e, t) {
  const n = {};
  for (const s in e)
    n[s] = {
      value: e[s],
      size: t
    };
  return n;
}
function Ky(e, t, n, s) {
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
      numericProps: Is(e.numericProps, 1)
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
      numericProps: Is(t.numericProps, 1)
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
      numericProps: Is(n.numericProps, 1)
    }
  };
  return r.polygons && n.triangles && (r.polygons.triangles = {
    value: new Uint32Array(n.triangles),
    size: 1
  }), r;
}
function Or(e, t, n, s) {
  for (const r in e.numericProps)
    if (r in t) {
      const i = t[r];
      e.numericProps[r].fill(i, n, n + s);
    }
}
function Ss(e, t) {
  const n = {};
  for (const s in e)
    t.includes(s) || (n[s] = e[s]);
  return n;
}
function zy(e, t) {
  return t === Array || !Number.isFinite(e) ? Array : t === Float64Array || Math.fround(e) !== e ? Float64Array : Float32Array;
}
function Wy(e) {
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
function Xy(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    coordLength: 2,
    fixRingWinding: !0
  };
  return e.map((n) => Qy(n, t));
}
function _o(e, t, n, s) {
  n.push(t.length), t.push(...e);
  for (let r = e.length; r < s.coordLength; r++)
    t.push(0);
}
function er(e, t, n, s) {
  n.push(t.length);
  for (const r of e) {
    t.push(...r);
    for (let i = r.length; i < s.coordLength; i++)
      t.push(0);
  }
}
function wo(e, t, n, s, r) {
  let i = 0;
  const o = [], a = [];
  for (const c of e) {
    const u = c.map((f) => f.slice(0, 2));
    let l = fc(u.flat());
    const h = l < 0;
    r.fixRingWinding && (i === 0 && !h || i > 0 && h) && (c.reverse(), l = -l), o.push(l), er(c, t, a, r), i++;
  }
  i > 0 && (s.push(o), n.push(a));
}
function Qy(e, t) {
  const {
    geometry: n
  } = e;
  if (n.type === "GeometryCollection")
    throw new Error("GeometryCollection type not supported");
  const s = [], r = [];
  let i, o;
  switch (n.type) {
    case "Point":
      o = "Point", _o(n.coordinates, s, r, t);
      break;
    case "MultiPoint":
      o = "Point", n.coordinates.map((a) => _o(a, s, r, t));
      break;
    case "LineString":
      o = "LineString", er(n.coordinates, s, r, t);
      break;
    case "MultiLineString":
      o = "LineString", n.coordinates.map((a) => er(a, s, r, t));
      break;
    case "Polygon":
      o = "Polygon", i = [], wo(n.coordinates, s, r, i, t);
      break;
    case "MultiPolygon":
      o = "Polygon", i = [], n.coordinates.map((a) => wo(a, s, r, i, t));
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
function Ac(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    fixRingWinding: !0,
    triangulate: !0
  };
  const n = Wy(e), s = n.coordLength, {
    fixRingWinding: r
  } = t, i = Xy(e, {
    coordLength: s,
    fixRingWinding: r
  });
  return Ny(i, n, {
    numericPropKeys: t.numericPropKeys,
    PositionDataType: t.PositionDataType || Float32Array,
    triangulate: t.triangulate
  });
}
const qy = "4.1.4", Yy = {
  name: "GeoJSON",
  id: "geojson",
  module: "geojson",
  version: qy,
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
}, Ue = {
  ...Yy,
  parse: $y,
  parseTextSync: pc,
  parseInBatches: Zy
};
async function $y(e, t) {
  return pc(new TextDecoder().decode(e), t);
}
function pc(e, t) {
  var n;
  t = {
    ...Ue.options,
    ...t
  }, t.geojson = {
    ...Ue.options.geojson,
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
      return Ac(r.features);
    default:
      return r;
  }
}
function Zy(e, t) {
  t = {
    ...Ue.options,
    ...t
  }, t.json = {
    ...Ue.options.geojson,
    ...t.geojson
  };
  const n = Ey(e, t);
  switch (t.gis.format) {
    case "binary":
      return tB(n);
    default:
      return n;
  }
}
async function* tB(e) {
  for await (const t of e)
    t.data = Ac(t.data), yield t;
}
function eB(e) {
  let t = 0;
  for (const s in e.attributes) {
    const r = e.getAttribute(s);
    t += r.count * r.itemSize * r.array.BYTES_PER_ELEMENT;
  }
  const n = e.getIndex();
  return t += n ? n.count * n.itemSize * n.array.BYTES_PER_ELEMENT : 0, t;
}
function yc(e) {
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
  const i = new _c(n);
  return i.needsUpdate = !0, i.minFilter = wc, i.wrapS = Dr, i.wrapT = Dr, i.repeat.set(2, 2), i;
}
function Ro(e) {
  e.updateMatrix(), e.updateMatrixWorld(), e.matrixWorldInverse.copy(e.matrixWorld).invert();
  const t = new Rc();
  return t.setFromProjectionMatrix(new Z().multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse)), t;
}
function nB(e) {
  const t = new gn(), n = new Mc(10, 5), s = new st(...e.projectPointOntoPlane([0, 0, 0])), r = new st(e.normal.x, e.normal.y, e.normal.z), i = new st().copy(s).add(r);
  n.lookAt(i), n.translate(s.x, s.y, s.z);
  const o = new Os({ color: 65535, side: Ic }), a = new Fs(n, o), c = new Sc(r, s, 5, 16776960);
  return t.add(c), t.add(a), t;
}
function Mo(e) {
  const { boundingVolume: t } = e;
  let n = 0;
  e.content && (n = Math.min(e.content.byteLength / 5e5, 1));
  const s = new _(n, 1, 0), r = new xc(1, 1, 1), i = new Z();
  t.halfAxes ? i.copy(Bc(t.halfAxes)) : t.radius && r.scale(t.radius * 2, t.radius * 2, t.radius * 2), r.applyMatrix4(i);
  const o = new Oc(r), a = new Fc(o, new vc({ color: s }));
  return a.position.copy(new st(...t.center)), a;
}
function Bc(e) {
  const t = e;
  return new Z().fromArray([
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
function sB(e, t) {
  const r = 2 * Math.PI * 6378137 / 2, i = t * r / 180;
  let o = Math.log(Math.tan((90 + e) * Math.PI / 360)) / (Math.PI / 180);
  return o = o * r / 180, new vs(i, o);
}
function rB(e) {
  let t = 0;
  if (e.userData.mimeType == "image/ktx2" && e.mipmaps) {
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
function Cc(e) {
  return eB(e);
}
const Ec = {
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
}, iB = `
  varying vec3 vColor;
  uniform float alpha;

  void main() {
    if (vColor == vec3(0.0, 0.0, 0.0)) {
      discard;
    } else {
      gl_FragColor = vec4( vColor, alpha);
    }
  }
`, oB = `
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
var Tc = /* @__PURE__ */ ((e) => (e[e.Intensity = 1] = "Intensity", e[e.Classification = 2] = "Classification", e[e.Elevation = 3] = "Elevation", e[e.RGB = 4] = "RGB", e[e.White = 5] = "White", e))(Tc || {}), Dn = /* @__PURE__ */ ((e) => (e[e.FlatTexture = 1] = "FlatTexture", e[e.ShadedTexture = 2] = "ShadedTexture", e[e.ShadedNoTexture = 3] = "ShadedNoTexture", e))(Dn || {});
const aB = Ec.RAINBOW, cB = typeof document < "u" ? yc(aB) : null, uB = Ec.GRAYSCALE, lB = typeof document < "u" ? yc(uB) : null, hB = {
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
  shading: Dn.FlatTexture,
  transparent: !1,
  pointCloudColoring: Tc.White,
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
class CB {
  /**
  * Loads a tileset of 3D Tiles according to the given {@link LoaderProps}
  * @public
  *
  * @param props - Properties for this load call {@link LoaderProps}.
  * @returns An object containing the 3D Model to be added to the scene
  * and a runtime engine to be updated every frame.
  */
  static async load(t) {
    const n = { ...hB, ...t.options }, { url: s } = t, r = n.updateInterval, i = 5, o = {};
    if (n.cesiumIONToken) {
      o["cesium-ion"] = {
        accessToken: n.cesiumIONToken
      };
      const T = await hc.preload(s, o);
      o.fetch = { headers: T.headers };
    }
    n.googleApiKey && (o.fetch = { headers: { "X-GOOG-API-KEY": n.googleApiKey } }, t.options.hasOwnProperty("collectAttributions") || (n.collectAttributions = !0)), t.loadingManager && t.loadingManager.itemStart(s);
    const a = await fe(s, Oe, {
      ...o
    }), c = {}, u = {}, l = [], h = new gn(), f = new gn();
    n.debug || (f.visible = !1);
    const d = {
      pointSize: { type: "f", value: n.pointSize },
      gradient: { type: "t", value: cB },
      grayscale: { type: "t", value: lB },
      rootCenter: { type: "vec3", value: new st() },
      rootNormal: { type: "vec3", value: new st() },
      coloring: { type: "i", value: n.pointCloudColoring },
      hideGround: { type: "b", value: !0 },
      elevationRange: { type: "vec2", value: new vs(0, 400) },
      maxIntensity: { type: "f", value: 1 },
      intensityContrast: { type: "f", value: 1 },
      alpha: { type: "f", value: 1 }
    }, m = new Dc({
      uniforms: d,
      vertexShader: oB,
      fragmentShader: iB,
      transparent: n.transparent,
      vertexColors: !0
    });
    let g = null, p = new vs(), C, w, y;
    n.gltfLoader ? C = n.gltfLoader : (C = new Pc(), n.basisTranscoderPath && (w = new Uc(), w.detectSupport(t.renderer), w.setTranscoderPath(n.basisTranscoderPath + "/"), w.setWorkerLimit(1), C.setKTX2Loader(w)), n.dracoDecoderPath && (y = new Nc(), y.setDecoderPath(n.dracoDecoderPath + "/"), y.setWorkerLimit(n.maxConcurrency), C.setDRACOLoader(y)));
    const B = new Os({ transparent: n.transparent }), R = {
      maximumMemoryUsage: n.maximumMemoryUsage,
      maximumScreenSpaceError: n.maximumScreenSpaceError,
      memoryAdjustedScreenSpaceError: n.memoryAdjustedScreenSpaceError,
      memoryCacheOverflow: n.memoryCacheOverflow,
      viewDistanceScale: n.viewDistanceScale,
      skipLevelOfDetail: n.skipLevelOfDetail,
      updateTransforms: n.updateTransforms,
      throttleRequests: n.throttleRequests,
      maxRequests: n.maxRequests,
      contentLoader: async (T) => {
        let L = null;
        switch (T.type) {
          case zt.POINTCLOUD: {
            L = dB(T, m, n, Ft);
            break;
          }
          case zt.SCENEGRAPH:
          case zt.MESH: {
            L = await fB(C, T, B, n, Ft);
            break;
          }
        }
        if (L && (L.visible = !1, c[T.id] = L, h.add(c[T.id]), n.debug)) {
          const W = Mo(T);
          f.add(W), u[T.id] = W;
        }
      },
      onTileLoad: async (T) => {
        E && (n.resetTransform && !v && (T == null ? void 0 : T.depth) <= i && jt(T), ne = !0);
      },
      onTileUnload: (T) => {
        l.push(T);
      },
      onTileError: (T, L) => {
        console.error("Tile error", T.id, L);
      },
      onTraversalComplete(T) {
        return n.collectAttributions && (k = gB(T)), T;
      }
    }, E = new Vd(a, {
      ...R,
      loadOptions: {
        ...o,
        maxConcurrency: n.maxConcurrency,
        worker: n.worker,
        gltf: {
          loadImages: !1
        },
        "3d-tiles": {
          loadGLTF: !1
        }
      }
    }), O = new Z(), F = new Z(), x = new st();
    let v = !1, k = "";
    if (E.root.boundingVolume ? (E.root.header.boundingVolume.region && console.warn("Cannot apply a model matrix to bounding volumes of type region. Tileset stays in original geo-coordinates."), F.setPosition(
      E.root.boundingVolume.center[0],
      E.root.boundingVolume.center[1],
      E.root.boundingVolume.center[2]
    )) : console.warn("Bounding volume not found, no transformations applied"), n.debug) {
      const T = Mo(E.root);
      f.add(T), u[E.root.id] = T;
    }
    let X = !1, Q = !1;
    d.rootCenter.value.copy(x), d.rootNormal.value.copy(new st(0, 0, 1).normalize()), E.stats.get("Loader concurrency").count = n.maxConcurrency, E.stats.get("Maximum mem usage").count = n.maximumMemoryUsage;
    let D = 0, at = null, ee = null, ne = !1;
    const ge = new st(1 / 0, 1 / 0, 1 / 0);
    let Nt = null;
    h.updateMatrixWorld(!0);
    const nt = new Z().copy(h.matrixWorld), Ft = new Z().copy(nt).invert();
    n.resetTransform && jt(E.root), n.debug && (u[E.root.id].applyMatrix4(O), f.matrixWorld.copy(h.matrixWorld));
    function jt(T) {
      if (!T.boundingVolume.halfAxes)
        return;
      const L = T.boundingVolume.halfAxes, W = new Z().extractRotation(Bc(L)).premultiply(new Z().extractRotation(Ft));
      if (!new Qn().setFromRotationMatrix(W).equals(new Qn())) {
        v = !0;
        const Tt = new st(
          F.elements[12],
          F.elements[13],
          F.elements[14]
        );
        F.extractRotation(W), F.setPosition(Tt);
      }
      Ae();
    }
    function Ae() {
      O.copy(nt), n.resetTransform && O.multiply(new Z().copy(F).invert()), E.modelMatrix = new V(O.toArray());
    }
    function We(T, L, W, $) {
      if (X || !$)
        return;
      (!Nt || $.aspect != ee) && (Nt = new Mn({
        fov: $.fov / 180 * Math.PI,
        aspectRatio: $.aspect,
        near: $.near,
        far: $.far
      }).sseDenominator, ee = $.aspect, n.debug && console.log("Updated sse denonimator:", Nt));
      const Wn = Ro($).planes.map((q) => new et(q.normal.toArray(), q.constant)), bc = new ht(Wn), Fr = {
        camera: {
          position: ge.toArray()
        },
        height: W,
        frameNumber: T._frameNumber,
        sseDenominator: Nt,
        cullingVolume: bc,
        viewport: {
          id: 0
        }
      };
      T._cache.reset(), T._traverser.traverse(T.root, Fr, T.options);
      for (const q of T.tiles)
        q.selected ? L[q.id] ? L[q.id].visible = !0 : console.error("TILE SELECTED BUT NOT LOADED!!", q.id) : L[q.id] && (L[q.id].visible = !1);
      for (; l.length > 0; ) {
        const q = l.pop();
        L[q.id] && q.contentState == ut.UNLOADED && (h.remove(L[q.id]), xs(L[q.id]), delete L[q.id]), u[q.id] && (xs(u[q.id]), f.remove(u[q.id]), delete u[q.id]);
      }
      const Xn = T.stats.get("Tiles Loaded").count, vr = T.stats.get("Tiles Loading").count;
      return t.onProgress && t.onProgress(
        Xn,
        Xn + vr
      ), t.loadingManager && !Q && vr == 0 && (n.preloadTilesCount == null || Xn >= n.preloadTilesCount) && (Q = !0, t.loadingManager.itemEnd(t.url)), Fr;
    }
    function zn(T) {
      const L = new st(), W = new Lc(), $ = new st();
      T.decompose(L, W, $), h.position.copy(L), h.quaternion.copy(W), h.scale.copy($), h.updateMatrix(), h.updateMatrixWorld(!0), nt.copy(h.matrixWorld), Ft.copy(nt).invert(), Ae();
    }
    return {
      model: h,
      runtime: {
        getTileset: () => E,
        getStats: () => E.stats,
        getDataAttributions: () => k,
        showTiles: (T) => {
          f.visible = T;
        },
        setWireframe: (T) => {
          n.wireframe = T, h.traverse((L) => {
            L instanceof Fs && (L.material.wireframe = T);
          });
        },
        setDebug: (T) => {
          n.debug = T, f.visible = T;
        },
        setShading: (T) => {
          n.shading = T;
        },
        getTileBoxes: () => f,
        setViewDistanceScale: (T) => {
          E.options.viewDistanceScale = T, E._frameNumber++, We(E, c, p.y, g);
        },
        setMaximumScreenSpaceError: (T) => {
          E.options.maximumScreenSpaceError = T, E._frameNumber++, We(E, c, p.y, g);
        },
        setHideGround: (T) => {
          d.hideGround.value = T;
        },
        setPointCloudColoring: (T) => {
          d.coloring.value = T;
        },
        setElevationRange: (T) => {
          d.elevationRange.value.set(T[0], T[1]);
        },
        setMaxIntensity: (T) => {
          d.maxIntensity.value = T;
        },
        setIntensityContrast: (T) => {
          d.intensityContrast.value = T;
        },
        setPointAlpha: (T) => {
          d.alpha.value = T;
        },
        getLatLongHeightFromPosition: (T) => {
          const L = E.ellipsoid.cartesianToCartographic(
            new st().copy(T).applyMatrix4(new Z().copy(O).invert()).toArray()
          );
          return {
            lat: L[1],
            long: L[0],
            height: L[2]
          };
        },
        getPositionFromLatLongHeight: (T) => {
          const L = E.ellipsoid.cartographicToCartesian([
            T.long,
            T.lat,
            T.height
          ]);
          return new st(...L).applyMatrix4(O);
        },
        orientToGeocoord: (T) => {
          const L = [T.long, T.lat, T.height], W = E.ellipsoid.cartographicToCartesian(L), $ = new Z().fromArray(E.ellipsoid.eastNorthUpToFixedFrame(W)), Tt = new Z().makeRotationFromEuler(
            new Qn(Math.PI / 2, Math.PI / 2, 0)
          ), Wn = new Z().copy($).multiply(Tt).invert();
          zn(Wn);
        },
        getWebMercatorCoord: (T) => sB(T.lat, T.long),
        getCameraFrustum: (T) => {
          const W = Ro(T).planes.map((Tt) => new et(Tt.normal.toArray(), Tt.constant)).map((Tt) => nB(Tt)), $ = new gn();
          for (const Tt of W)
            $.add(Tt);
          return $;
        },
        overlayGeoJSON: (T) => (T.applyMatrix4(O), T.updateMatrixWorld(), T),
        update: function(T, L, W) {
          if (g = W, p.copy(L), D += T, E && D >= r) {
            if (!nt.equals(h.matrixWorld)) {
              D = 0, nt.copy(h.matrixWorld), n.updateTransforms && Ae();
              const $ = new st().setFromMatrixPosition(nt);
              d.rootCenter.value.copy($), d.rootNormal.value.copy(new st(0, 0, 1).applyMatrix4(nt).normalize()), Ft.copy(nt).invert(), n.debug && (u[E.root.id].matrixWorld.copy(O), u[E.root.id].applyMatrix4(nt));
            }
            at == null ? at = new Z().copy(W.matrixWorld) : (ne || mB(W, at, ee)) && (D = 0, ne = !1, E._frameNumber++, W.getWorldPosition(ge), at.copy(W.matrixWorld), We(E, c, p.y, W));
          }
        },
        dispose: function() {
          for (X = !0, E._destroy(); h.children.length > 0; ) {
            const T = h.children[0];
            xs(T), h.remove(T);
          }
          for (; f.children.length > 0; ) {
            const T = f.children[0];
            f.remove(T), T.geometry.dispose(), T.material.dispose();
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
    return fe(n, Ue, { worker: !1, gis: { format: "binary" } }).then((i) => {
      const o = i, a = new So(), c = o.polygons.positions.value.reduce((h, f, d, m) => {
        if (d % 2 == 0) {
          const g = [f, m[d + 1], s], p = J.WGS84.cartographicToCartesian(g);
          h.push(...p);
        }
        return h;
      }, []);
      if (r) {
        const h = o.polygons.numericProps[r.feature].value.reduce((f, d, m, g) => {
          const p = r.colorMap(d);
          return f[m * 3] = p.r, f[m * 3 + 1] = p.g, f[m * 3 + 2] = p.b, f;
        }, []);
        a.setAttribute("color", new En(
          h,
          3
        ));
      }
      a.setAttribute("position", new En(
        c,
        3
      )), a.setIndex(
        new xo(o.polygons.triangles.value, 1)
      );
      const u = new Os({ transparent: !0 });
      return u.vertexColors = !0, new Fs(a, u);
    });
  }
}
async function fB(e, t, n, s, r) {
  return new Promise((i, o) => {
    const a = new Z().makeRotationAxis(new st(1, 0, 0), Math.PI / 2), c = t.content.gltfUpAxis !== "Z", u = new Z().fromArray(t.computedTransform).premultiply(r);
    c && u.multiply(a), t.content.byteLength || (t.content.byteLength = t.content.gltfArrayBuffer.byteLength), e.parse(
      t.content.gltfArrayBuffer,
      t.contentUrl ? t.contentUrl.substr(0, t.contentUrl.lastIndexOf("/") + 1) : "",
      (l) => {
        t.userData.asset = l.asset;
        const h = l.scenes[0];
        h.applyMatrix4(u), t.content.texturesByteLength = 0, t.content.geometriesByteLength = 0, h.traverse((f) => {
          if (f.type == "Mesh") {
            const d = f;
            t.content.geometriesByteLength += Cc(d.geometry);
            const m = d.material, g = m.map, p = rB(g);
            p && (t.content.texturesByteLength += p), s.material ? (d.material = s.material.clone(), m.dispose()) : s.shading == Dn.FlatTexture && d.material.type !== "MeshBasicMaterial" && (d.material = n.clone(), m.dispose()), s.shading != Dn.ShadedNoTexture ? d.material.type == "ShaderMaterial" ? d.material.uniforms.map = { value: g } : d.material.map = g : (g && g.dispose(), d.material.map = null), d.material.wireframe = s.wireframe, s.contentPostProcess && s.contentPostProcess(d);
          }
        }), t.content.gpuMemoryUsageInBytes = t.content.texturesByteLength + t.content.geometriesByteLength, i(h);
      },
      (l) => {
        o(new Error(`error parsing gltf in tile ${t.id}: ${l}`));
      }
    );
  });
}
function dB(e, t, n, s) {
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
  const o = new So();
  o.setAttribute("position", new En(r.points, 3));
  const a = new Z().fromArray(e.computedTransform).premultiply(s);
  r.rgba ? o.setAttribute("color", new En(r.rgba, 4)) : r.rgb && o.setAttribute("color", new Lr(r.rgb, 3, !0)), r.intensities && o.setAttribute(
    "intensity",
    // Handles both 16bit or 8bit intensity values
    new xo(r.intensities, 1, !0)
  ), r.classifications && o.setAttribute("classification", new Lr(r.classifications, 1, !1)), e.content.geometriesByteLength = Cc(o), e.content.gpuMemoryUsageInBytes = e.content.geometriesByteLength;
  const c = new Gc(o, n.material || t);
  if (r.rtc_center) {
    const u = r.rtc_center;
    a.multiply(new Z().makeTranslation(u[0], u[1], u[2]));
  }
  return c.applyMatrix4(a), n.contentPostProcess && n.contentPostProcess(c), c;
}
function Io(e) {
  var t, n, s, r;
  (t = e == null ? void 0 : e.uniforms) != null && t.map ? (s = (n = e == null ? void 0 : e.uniforms) == null ? void 0 : n.map.value) == null || s.dispose() : e.map && ((r = e.map) == null || r.dispose()), e.dispose();
}
function xs(e) {
  e.traverse((t) => {
    if (t.isMesh)
      if (t.geometry.dispose(), t.material.isMaterial)
        Io(t.material);
      else
        for (const n of t.material)
          Io(n);
  });
  for (let t = e.children.length - 1; t >= 0; t--) {
    const n = e.children[t];
    e.remove(n);
  }
}
function mB(e, t, n) {
  return !e.matrixWorld.equals(t) || e.aspect != n;
}
function gB(e) {
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
  CB as Loader3DTiles,
  Tc as PointCloudColoring,
  Dn as Shading
};
