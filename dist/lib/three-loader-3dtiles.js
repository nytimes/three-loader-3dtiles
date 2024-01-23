import { CanvasTexture as Vu, LinearFilter as Ju, RepeatWrapping as Di, Frustum as Wu, Matrix4 as Y, Group as jn, PlaneGeometry as zu, Vector3 as it, MeshBasicMaterial as ua, DoubleSide as ju, Mesh as la, ArrowHelper as Ku, Color as M, BoxGeometry as qu, EdgesGeometry as Xu, LineSegments as Qu, LineBasicMaterial as Yu, Vector2 as Cr, ShaderMaterial as Zu, Euler as Os, BufferGeometry as tl, Float32BufferAttribute as Gi, Uint8BufferAttribute as Ni, BufferAttribute as el, Points as nl } from "three";
import { GLTFLoader as sl } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader as rl } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader as il } from "three/examples/jsm/loaders/KTX2Loader.js";
function Pi(e, t) {
  if (!e)
    throw new Error(t || "loader assertion failed.");
}
const fa = !!(typeof process != "object" || String(process) !== "[object process]" || process.browser), Ui = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
Ui && parseFloat(Ui[1]);
function ol(e, t) {
  return da(e || {}, t);
}
function da(e, t) {
  const n = {
    ...e
  };
  for (const [s, r] of Object.entries(t))
    r && typeof r == "object" && !Array.isArray(r) ? n[s] = da(n[s] || {}, t[s]) : n[s] = t[s];
  return n;
}
const ma = "latest";
function cl() {
  var e;
  return (e = globalThis._loadersgl_) !== null && e !== void 0 && e.version || (globalThis._loadersgl_ = globalThis._loadersgl_ || {}, typeof __VERSION__ > "u" ? (console.warn("loaders.gl: The __VERSION__ variable is not injected using babel plugin. Latest unstable workers would be fetched from the CDN."), globalThis._loadersgl_.version = ma) : globalThis._loadersgl_.version = __VERSION__), globalThis._loadersgl_.version;
}
const al = cl();
function te(e, t) {
  if (!e)
    throw new Error(t || "loaders.gl assertion failed.");
}
const ae = typeof process != "object" || String(process) !== "[object process]" || process.browser, hl = typeof window < "u" && typeof window.orientation < "u", Hi = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
Hi && parseFloat(Hi[1]);
let ul = class {
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
    te(this.isRunning), this.isRunning = !1, this._resolve(t);
  }
  error(t) {
    te(this.isRunning), this.isRunning = !1, this._reject(t);
  }
}, vs = class {
  terminate() {
  }
};
const xs = /* @__PURE__ */ new Map();
function ll(e) {
  te(e.source && !e.url || !e.source && e.url);
  let t = xs.get(e.source || e.url);
  return t || (e.url && (t = fl(e.url), xs.set(e.url, t)), e.source && (t = ga(e.source), xs.set(e.source, t))), te(t), t;
}
function fl(e) {
  if (!e.startsWith("http"))
    return e;
  const t = dl(e);
  return ga(t);
}
function ga(e) {
  const t = new Blob([e], {
    type: "application/javascript"
  });
  return URL.createObjectURL(t);
}
function dl(e) {
  return `try {
  importScripts('${e}');
} catch (error) {
  console.error(error);
  throw error;
}`;
}
function Aa(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = n || /* @__PURE__ */ new Set();
  if (e) {
    if (ki(e))
      s.add(e);
    else if (ki(e.buffer))
      s.add(e.buffer);
    else if (!ArrayBuffer.isView(e)) {
      if (t && typeof e == "object")
        for (const r in e)
          Aa(e[r], t, s);
    }
  }
  return n === void 0 ? Array.from(s) : [];
}
function ki(e) {
  return e ? e instanceof ArrayBuffer || typeof MessagePort < "u" && e instanceof MessagePort || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas : !1;
}
const Fs = () => {
};
let br = class {
  static isSupported() {
    return typeof Worker < "u" && ae || typeof vs < "u" && !ae;
  }
  constructor(t) {
    this.name = void 0, this.source = void 0, this.url = void 0, this.terminated = !1, this.worker = void 0, this.onMessage = void 0, this.onError = void 0, this._loadableURL = "";
    const {
      name: n,
      source: s,
      url: r
    } = t;
    te(s || r), this.name = n, this.source = s, this.url = r, this.onMessage = Fs, this.onError = (i) => console.log(i), this.worker = ae ? this._createBrowserWorker() : this._createNodeWorker();
  }
  destroy() {
    this.onMessage = Fs, this.onError = Fs, this.worker.terminate(), this.terminated = !0;
  }
  get isRunning() {
    return !!this.onMessage;
  }
  postMessage(t, n) {
    n = n || Aa(t), this.worker.postMessage(t, n);
  }
  _getErrorFromErrorEvent(t) {
    let n = "Failed to load ";
    return n += `worker ${this.name} from ${this.url}. `, t.message && (n += `${t.message} in `), t.lineno && (n += `:${t.lineno}:${t.colno}`), new Error(n);
  }
  _createBrowserWorker() {
    this._loadableURL = ll({
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
      t = new vs(s, {
        eval: !1
      });
    } else if (this.source)
      t = new vs(this.source, {
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
}, ml = class {
  static isSupported() {
    return br.isSupported();
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
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (i, o, c) => i.done(c), s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (i, o) => i.error(o);
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
      const s = new ul(n.name, t);
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
    !ae || this.isDestroyed || !this.reuseWorkers || this.count > this._getMaxConcurrency() ? (t.destroy(), this.count--) : this.idleQueue.push(t), this.isDestroyed || this._startQueuedJob();
  }
  _getAvailableWorker() {
    if (this.idleQueue.length > 0)
      return this.idleQueue.shift() || null;
    if (this.count < this._getMaxConcurrency()) {
      this.count++;
      const t = `${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`;
      return new br({
        name: t,
        source: this.source,
        url: this.url
      });
    }
    return null;
  }
  _getMaxConcurrency() {
    return hl ? this.maxMobileConcurrency : this.maxConcurrency;
  }
};
const gl = {
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: !0,
  onDebug: () => {
  }
};
let Kr = class _e {
  static isSupported() {
    return br.isSupported();
  }
  static getWorkerFarm() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return _e._workerFarm = _e._workerFarm || new _e({}), _e._workerFarm.setProps(t), _e._workerFarm;
  }
  constructor(t) {
    this.props = void 0, this.workerPools = /* @__PURE__ */ new Map(), this.props = {
      ...gl
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
    return i || (i = new ml({
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
};
Kr._workerFarm = void 0;
function Al(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const n = t[e.id] || {}, s = ae ? `${e.id}-worker.js` : `${e.id}-worker-node.js`;
  let r = n.workerUrl;
  if (!r && e.id === "compression" && (r = t.workerUrl), t._workerType === "test" && (ae ? r = `modules/${e.module}/dist/${s}` : r = `modules/${e.module}/src/workers/${e.id}-worker-node.ts`), !r) {
    let i = e.version;
    i === "latest" && (i = ma);
    const o = i ? `@${i}` : "";
    r = `https://unpkg.com/@loaders.gl/${e.module}${o}/dist/${s}`;
  }
  return te(r), r;
}
function pl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : al;
  te(e, "no worker provided");
  const n = e.version;
  return !(!t || !n);
}
const yl = {}, pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yl
}, Symbol.toStringTag, { value: "Module" }));
function Bl(e, t) {
  return !Kr.isSupported() || !ae && !(t != null && t._nodeWorkers) ? !1 : e.worker && (t == null ? void 0 : t.worker);
}
async function Tl(e, t, n, s, r) {
  const i = e.id, o = Al(e, n), a = Kr.getWorkerFarm(n).getWorkerPool({
    name: i,
    url: o
  });
  n = JSON.parse(JSON.stringify(n)), s = JSON.parse(JSON.stringify(s || {}));
  const h = await a.startJob("process-on-worker", El.bind(null, r));
  return h.postMessage("process", {
    input: t,
    options: n,
    context: s
  }), await (await h.result).result;
}
async function El(e, t, n, s) {
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
        const c = await e(i, o);
        t.postMessage("done", {
          id: r,
          result: c
        });
      } catch (c) {
        const a = c instanceof Error ? c.message : "unknown error";
        t.postMessage("error", {
          id: r,
          error: a
        });
      }
      break;
    default:
      console.warn(`parse-with-worker unknown message ${n}`);
  }
}
function Cl(e, t, n) {
  if (n = n || e.byteLength, e.byteLength < n || t.byteLength < n)
    return !1;
  const s = new Uint8Array(e), r = new Uint8Array(t);
  for (let i = 0; i < s.length; ++i)
    if (s[i] !== r[i])
      return !1;
  return !0;
}
function bl() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  const s = t.map((c) => c instanceof ArrayBuffer ? new Uint8Array(c) : c), r = s.reduce((c, a) => c + a.byteLength, 0), i = new Uint8Array(r);
  let o = 0;
  for (const c of s)
    i.set(c, o), o += c.byteLength;
  return i.buffer;
}
async function wl(e) {
  const t = [];
  for await (const n of e)
    t.push(n);
  return bl(...t);
}
let _l = "";
const $i = {};
function Ml(e) {
  for (const t in $i)
    if (e.startsWith(t)) {
      const n = $i[t];
      e = e.replace(t, n);
    }
  return !e.startsWith("http://") && !e.startsWith("https://") && (e = `${_l}${e}`), e;
}
function Rl(e) {
  return e && typeof e == "object" && e.isBuffer;
}
function ya(e) {
  if (Rl(e))
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
function Ba(e) {
  const t = e ? e.lastIndexOf("/") : -1;
  return t >= 0 ? e.substr(t + 1) : "";
}
function Sl(e) {
  const t = e ? e.lastIndexOf("/") : -1;
  return t >= 0 ? e.substr(0, t) : "";
}
const Il = (e) => typeof e == "boolean", We = (e) => typeof e == "function", rn = (e) => e !== null && typeof e == "object", Vi = (e) => rn(e) && e.constructor === {}.constructor, Ol = (e) => !!e && typeof e[Symbol.iterator] == "function", vl = (e) => e && typeof e[Symbol.asyncIterator] == "function", fe = (e) => typeof Response < "u" && e instanceof Response || e && e.arrayBuffer && e.text && e.json, de = (e) => typeof Blob < "u" && e instanceof Blob, xl = (e) => e && typeof e == "object" && e.isBuffer, Fl = (e) => typeof ReadableStream < "u" && e instanceof ReadableStream || rn(e) && We(e.tee) && We(e.cancel) && We(e.getReader), Ll = (e) => rn(e) && We(e.read) && We(e.pipe) && Il(e.readable), Ta = (e) => Fl(e) || Ll(e), Dl = /^data:([-\w.]+\/[-\w.+]+)(;|,)/, Gl = /^([-\w.]+\/[-\w.+]+)/;
function Nl(e) {
  const t = Gl.exec(e);
  return t ? t[1] : e;
}
function Ji(e) {
  const t = Dl.exec(e);
  return t ? t[1] : "";
}
const Ea = /\?.*/;
function Pl(e) {
  const t = e.match(Ea);
  return t && t[0];
}
function qr(e) {
  return e.replace(Ea, "");
}
function ps(e) {
  return fe(e) ? e.url : de(e) ? e.name || "" : typeof e == "string" ? e : "";
}
function Xr(e) {
  if (fe(e)) {
    const t = e, n = t.headers.get("content-type") || "", s = qr(t.url);
    return Nl(n) || Ji(s);
  }
  return de(e) ? e.type || "" : typeof e == "string" ? Ji(e) : "";
}
function Ul(e) {
  return fe(e) ? e.headers["content-length"] || -1 : de(e) ? e.size : typeof e == "string" ? e.length : e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? e.byteLength : -1;
}
async function Ca(e) {
  if (fe(e))
    return e;
  const t = {}, n = Ul(e);
  n >= 0 && (t["content-length"] = String(n));
  const s = ps(e), r = Xr(e);
  r && (t["content-type"] = r);
  const i = await $l(e);
  i && (t["x-first-bytes"] = i), typeof e == "string" && (e = new TextEncoder().encode(e));
  const o = new Response(e, {
    headers: t
  });
  return Object.defineProperty(o, "url", {
    value: s
  }), o;
}
async function Hl(e) {
  if (!e.ok) {
    const t = await kl(e);
    throw new Error(t);
  }
}
async function kl(e) {
  let t = `Failed to fetch resource ${e.url} (${e.status}): `;
  try {
    const n = e.headers.get("Content-Type");
    let s = e.statusText;
    n != null && n.includes("application/json") && (s += ` ${await e.text()}`), t += s, t = t.length > 60 ? `${t.slice(0, 60)}...` : t;
  } catch {
  }
  return t;
}
async function $l(e) {
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
    return `data:base64,${Vl(n)}`;
  }
  return null;
}
function Vl(e) {
  let t = "";
  const n = new Uint8Array(e);
  for (let s = 0; s < n.byteLength; s++)
    t += String.fromCharCode(n[s]);
  return btoa(t);
}
function Jl(e) {
  return !Wl(e) && !zl(e);
}
function Wl(e) {
  return e.startsWith("http:") || e.startsWith("https:");
}
function zl(e) {
  return e.startsWith("data:");
}
async function Ze(e, t) {
  if (typeof e == "string") {
    const r = Ml(e);
    if (Jl(r)) {
      var n;
      if ((n = globalThis.loaders) !== null && n !== void 0 && n.fetchNode) {
        var s;
        return (s = globalThis.loaders) === null || s === void 0 ? void 0 : s.fetchNode(r, t);
      }
    }
    return await fetch(r, t);
  }
  return await Ca(e);
}
function jl(e) {
  if (typeof window < "u" && typeof window.process == "object" && window.process.type === "renderer" || typeof process < "u" && typeof process.versions == "object" && process.versions.electron)
    return !0;
  const t = typeof navigator == "object" && typeof navigator.userAgent == "string" && navigator.userAgent, n = e || t;
  return !!(n && n.indexOf("Electron") >= 0);
}
function on() {
  return !(typeof process == "object" && String(process) === "[object process]" && !process.browser) || jl();
}
const An = globalThis.window || globalThis.self || globalThis.global, xe = globalThis.process || {}, ba = typeof __VERSION__ < "u" ? __VERSION__ : "untranspiled source";
on();
function Kl(e) {
  try {
    const t = window[e], n = "__storage_test__";
    return t.setItem(n, n), t.removeItem(n), t;
  } catch {
    return null;
  }
}
let ql = class {
  constructor(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "sessionStorage";
    this.storage = void 0, this.id = void 0, this.config = void 0, this.storage = Kl(s), this.id = t, this.config = n, this._loadConfiguration();
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
};
function Xl(e) {
  let t;
  return e < 10 ? t = "".concat(e.toFixed(2), "ms") : e < 100 ? t = "".concat(e.toFixed(1), "ms") : e < 1e3 ? t = "".concat(e.toFixed(0), "ms") : t = "".concat((e / 1e3).toFixed(2), "s"), t;
}
function Ql(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8;
  const n = Math.max(t - e.length, 0);
  return "".concat(" ".repeat(n)).concat(e);
}
function Ls(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 600;
  const r = e.src.replace(/\(/g, "%28").replace(/\)/g, "%29");
  e.width > s && (n = Math.min(n, s / e.width));
  const i = e.width * n, o = e.height * n, c = ["font-size:1px;", "padding:".concat(Math.floor(o / 2), "px ").concat(Math.floor(i / 2), "px;"), "line-height:".concat(o, "px;"), "background:url(".concat(r, ");"), "background-size:".concat(i, "px ").concat(o, "px;"), "color:transparent;"].join("");
  return ["".concat(t, " %c+"), c];
}
let es;
(function(e) {
  e[e.BLACK = 30] = "BLACK", e[e.RED = 31] = "RED", e[e.GREEN = 32] = "GREEN", e[e.YELLOW = 33] = "YELLOW", e[e.BLUE = 34] = "BLUE", e[e.MAGENTA = 35] = "MAGENTA", e[e.CYAN = 36] = "CYAN", e[e.WHITE = 37] = "WHITE", e[e.BRIGHT_BLACK = 90] = "BRIGHT_BLACK", e[e.BRIGHT_RED = 91] = "BRIGHT_RED", e[e.BRIGHT_GREEN = 92] = "BRIGHT_GREEN", e[e.BRIGHT_YELLOW = 93] = "BRIGHT_YELLOW", e[e.BRIGHT_BLUE = 94] = "BRIGHT_BLUE", e[e.BRIGHT_MAGENTA = 95] = "BRIGHT_MAGENTA", e[e.BRIGHT_CYAN = 96] = "BRIGHT_CYAN", e[e.BRIGHT_WHITE = 97] = "BRIGHT_WHITE";
})(es || (es = {}));
const Yl = 10;
function Wi(e) {
  return typeof e != "string" ? e : (e = e.toUpperCase(), es[e] || es.WHITE);
}
function Zl(e, t, n) {
  if (!on && typeof e == "string") {
    if (t) {
      const s = Wi(t);
      e = "\x1B[".concat(s, "m").concat(e, "\x1B[39m");
    }
    if (n) {
      const s = Wi(n);
      e = "\x1B[".concat(s + Yl, "m").concat(e, "\x1B[49m");
    }
  }
  return e;
}
function tf(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ["constructor"];
  const n = Object.getPrototypeOf(e), s = Object.getOwnPropertyNames(n), r = e;
  for (const i of s) {
    const o = r[i];
    typeof o == "function" && (t.find((c) => i === c) || (r[i] = o.bind(e)));
  }
}
function ns(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
function pe() {
  let e;
  if (on() && An.performance) {
    var t, n;
    e = An == null || (t = An.performance) === null || t === void 0 || (n = t.now) === null || n === void 0 ? void 0 : n.call(t);
  } else if ("hrtime" in xe) {
    var s;
    const r = xe == null || (s = xe.hrtime) === null || s === void 0 ? void 0 : s.call(xe);
    e = r[0] * 1e3 + r[1] / 1e6;
  } else
    e = Date.now();
  return e;
}
const ye = {
  debug: on() && console.debug || console.log,
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
}, ef = {
  enabled: !0,
  level: 0
};
function yt() {
}
const zi = {}, ji = {
  once: !0
};
let ys = class {
  constructor() {
    let {
      id: t
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
      id: ""
    };
    this.id = void 0, this.VERSION = ba, this._startTs = pe(), this._deltaTs = pe(), this._storage = void 0, this.userData = {}, this.LOG_THROTTLE_TIMEOUT = 0, this.id = t, this.userData = {}, this._storage = new ql("__probe-".concat(this.id, "__"), ef), this.timeStamp("".concat(this.id, " started")), tf(this), Object.seal(this);
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
    return Number((pe() - this._startTs).toPrecision(10));
  }
  getDelta() {
    return Number((pe() - this._deltaTs).toPrecision(10));
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
    ns(t, n);
  }
  warn(t) {
    return this._getLogFunction(0, t, ye.warn, arguments, ji);
  }
  error(t) {
    return this._getLogFunction(0, t, ye.error, arguments);
  }
  deprecated(t, n) {
    return this.warn("`".concat(t, "` is deprecated and will be removed in a later version. Use `").concat(n, "` instead"));
  }
  removed(t, n) {
    return this.error("`".concat(t, "` has been removed. Use `").concat(n, "` instead"));
  }
  probe(t, n) {
    return this._getLogFunction(t, n, ye.log, arguments, {
      time: !0,
      once: !0
    });
  }
  log(t, n) {
    return this._getLogFunction(t, n, ye.debug, arguments);
  }
  info(t, n) {
    return this._getLogFunction(t, n, console.info, arguments);
  }
  once(t, n) {
    return this._getLogFunction(t, n, ye.debug || ye.info, arguments, ji);
  }
  table(t, n, s) {
    return n ? this._getLogFunction(t, n, console.table || yt, s && [s], {
      tag: of(n)
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
    return this._shouldLog(n || s) ? on() ? rf({
      image: r,
      message: i,
      scale: o
    }) : sf() : yt;
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
    const r = Ki({
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
    return this.isEnabled() && this.getLevel() >= wa(t);
  }
  _getLogFunction(t, n, s, r, i) {
    if (this._shouldLog(t)) {
      i = Ki({
        logLevel: t,
        message: n,
        args: r,
        opts: i
      }), s = s || i.method, ns(s), i.total = this.getTotal(), i.delta = this.getDelta(), this._deltaTs = pe();
      const o = i.tag || i.message;
      if (i.once && o)
        if (!zi[o])
          zi[o] = pe();
        else
          return yt;
      return n = nf(this.id, i.message, i), s.bind(console, n, ...i.args);
    }
    return yt;
  }
};
ys.VERSION = ba;
function wa(e) {
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
  return ns(Number.isFinite(t) && t >= 0), t;
}
function Ki(e) {
  const {
    logLevel: t,
    message: n
  } = e;
  e.logLevel = wa(t);
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
  return ns(r === "string" || r === "object"), Object.assign(e, {
    args: s
  }, e.opts);
}
function nf(e, t, n) {
  if (typeof t == "string") {
    const s = n.time ? Ql(Xl(n.total)) : "";
    t = n.time ? "".concat(e, ": ").concat(s, "  ").concat(t) : "".concat(e, ": ").concat(t), t = Zl(t, n.color, n.background);
  }
  return t;
}
function sf(e) {
  return console.warn("removed"), yt;
}
function rf(e) {
  let {
    image: t,
    message: n = "",
    scale: s = 1
  } = e;
  if (typeof t == "string") {
    const i = new Image();
    return i.onload = () => {
      const o = Ls(i, n, s);
      console.log(...o);
    }, i.src = t, yt;
  }
  const r = t.nodeName || "";
  if (r.toLowerCase() === "img")
    return console.log(...Ls(t, n, s)), yt;
  if (r.toLowerCase() === "canvas") {
    const i = new Image();
    return i.onload = () => console.log(...Ls(i, n, s)), i.src = t.toDataURL(), yt;
  }
  return yt;
}
function of(e) {
  for (const t in e)
    for (const n in e[t])
      return n || "untitled";
  return "empty";
}
const _a = new ys({
  id: "@probe.gl/log"
}), qi = new ys({
  id: "loaders.gl"
});
let cf = class {
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
}, af = class {
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
};
const Ma = {
  fetch: null,
  mimeType: void 0,
  nothrow: !1,
  log: new af(),
  useLocalLibraries: !1,
  CDN: "https://unpkg.com/@loaders.gl",
  worker: !0,
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: fa,
  _nodeWorkers: !1,
  _workerType: "",
  limit: 0,
  _limitMB: 0,
  batchSize: "auto",
  batchDebounceMs: 0,
  metadata: !1,
  transforms: []
}, hf = {
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
function Ra() {
  globalThis.loaders = globalThis.loaders || {};
  const {
    loaders: e
  } = globalThis;
  return e._state = e._state || {}, e._state;
}
function Sa() {
  const e = Ra();
  return e.globalOptions = e.globalOptions || {
    ...Ma
  }, e.globalOptions;
}
function uf(e, t, n, s) {
  return n = n || [], n = Array.isArray(n) ? n : [n], lf(e, n), df(t, e, s);
}
function lf(e, t) {
  Xi(e, null, Ma, hf, t);
  for (const n of t) {
    const s = e && e[n.id] || {}, r = n.options && n.options[n.id] || {}, i = n.deprecatedOptions && n.deprecatedOptions[n.id] || {};
    Xi(s, n.id, r, i, t);
  }
}
function Xi(e, t, n, s, r) {
  const i = t || "Top level", o = t ? `${t}.` : "";
  for (const c in e) {
    const a = !t && rn(e[c]), h = c === "baseUri" && !t, u = c === "workerUrl" && t;
    if (!(c in n) && !h && !u) {
      if (c in s)
        qi.warn(`${i} loader option '${o}${c}' no longer supported, use '${s[c]}'`)();
      else if (!a) {
        const l = ff(c, r);
        qi.warn(`${i} loader option '${o}${c}' not recognized. ${l}`)();
      }
    }
  }
}
function ff(e, t) {
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
function df(e, t, n) {
  const r = {
    ...e.options || {}
  };
  return mf(r, n), r.log === null && (r.log = new cf()), Qi(r, Sa()), Qi(r, t), r;
}
function Qi(e, t) {
  for (const n in t)
    if (n in t) {
      const s = t[n];
      Vi(s) && Vi(e[n]) ? e[n] = {
        ...e[n],
        ...t[n]
      } : e[n] = t[n];
    }
}
function mf(e, t) {
  t && !("baseUri" in e) && (e.baseUri = t);
}
function Qr(e) {
  var t;
  return e ? (Array.isArray(e) && (e = e[0]), Array.isArray((t = e) === null || t === void 0 ? void 0 : t.extensions)) : !1;
}
function Ia(e) {
  var t, n;
  Pi(e, "null loader"), Pi(Qr(e), "invalid loader");
  let s;
  return Array.isArray(e) && (s = e[1], e = e[0], e = {
    ...e,
    options: {
      ...e.options,
      ...s
    }
  }), ((t = e) !== null && t !== void 0 && t.parseTextSync || (n = e) !== null && n !== void 0 && n.parseText) && (e.text = !0), e.text || (e.binary = !0), e;
}
const gf = () => {
  const e = Ra();
  return e.loaderRegistry = e.loaderRegistry || [], e.loaderRegistry;
};
function Af() {
  return gf();
}
const pf = new ys({
  id: "loaders.gl"
}), yf = /\.([^.]+)$/;
async function Bf(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0;
  if (!Oa(e))
    return null;
  let r = Yi(e, t, {
    ...n,
    nothrow: !0
  }, s);
  if (r)
    return r;
  if (de(e) && (e = await e.slice(0, 10).arrayBuffer(), r = Yi(e, t, n, s)), !r && !(n != null && n.nothrow))
    throw new Error(va(e));
  return r;
}
function Yi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0;
  if (!Oa(e))
    return null;
  if (t && !Array.isArray(t))
    return Ia(t);
  let r = [];
  t && (r = r.concat(t)), n != null && n.ignoreRegisteredLoaders || r.push(...Af()), Ef(r);
  const i = Tf(e, r, n, s);
  if (!i && !(n != null && n.nothrow))
    throw new Error(va(e));
  return i;
}
function Tf(e, t, n, s) {
  const r = ps(e), i = Xr(e), o = qr(r) || (s == null ? void 0 : s.url);
  let c = null, a = "";
  if (n != null && n.mimeType && (c = Ds(t, n == null ? void 0 : n.mimeType), a = `match forced by supplied MIME type ${n == null ? void 0 : n.mimeType}`), c = c || Cf(t, o), a = a || (c ? `matched url ${o}` : ""), c = c || Ds(t, i), a = a || (c ? `matched MIME type ${i}` : ""), c = c || wf(t, e), a = a || (c ? `matched initial data ${xa(e)}` : ""), n != null && n.fallbackMimeType && (c = c || Ds(t, n == null ? void 0 : n.fallbackMimeType), a = a || (c ? `matched fallback MIME type ${i}` : "")), a) {
    var h;
    pf.log(1, `selectLoader selected ${(h = c) === null || h === void 0 ? void 0 : h.name}: ${a}.`);
  }
  return c;
}
function Oa(e) {
  return !(e instanceof Response && e.status === 204);
}
function va(e) {
  const t = ps(e), n = Xr(e);
  let s = "No valid loader found (";
  s += t ? `${Ba(t)}, ` : "no url provided, ", s += `MIME type: ${n ? `"${n}"` : "not provided"}, `;
  const r = e ? xa(e) : "";
  return s += r ? ` first bytes: "${r}"` : "first bytes: not available", s += ")", s;
}
function Ef(e) {
  for (const t of e)
    Ia(t);
}
function Cf(e, t) {
  const n = t && yf.exec(t), s = n && n[1];
  return s ? bf(e, s) : null;
}
function bf(e, t) {
  t = t.toLowerCase();
  for (const n of e)
    for (const s of n.extensions)
      if (s.toLowerCase() === t)
        return n;
  return null;
}
function Ds(e, t) {
  for (const n of e)
    if (n.mimeTypes && n.mimeTypes.includes(t) || t === `application/x.${n.id}`)
      return n;
  return null;
}
function wf(e, t) {
  if (!t)
    return null;
  for (const n of e)
    if (typeof t == "string") {
      if (_f(t, n))
        return n;
    } else if (ArrayBuffer.isView(t)) {
      if (Zi(t.buffer, t.byteOffset, n))
        return n;
    } else if (t instanceof ArrayBuffer && Zi(t, 0, n))
      return n;
  return null;
}
function _f(e, t) {
  return t.testText ? t.testText(e) : (Array.isArray(t.tests) ? t.tests : [t.tests]).some((s) => e.startsWith(s));
}
function Zi(e, t, n) {
  return (Array.isArray(n.tests) ? n.tests : [n.tests]).some((r) => Mf(e, t, n, r));
}
function Mf(e, t, n, s) {
  if (s instanceof ArrayBuffer)
    return Cl(s, e, s.byteLength);
  switch (typeof s) {
    case "function":
      return s(e);
    case "string":
      const r = wr(e, t, s.length);
      return s === r;
    default:
      return !1;
  }
}
function xa(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
  return typeof e == "string" ? e.slice(0, t) : ArrayBuffer.isView(e) ? wr(e.buffer, e.byteOffset, t) : e instanceof ArrayBuffer ? wr(e, 0, t) : "";
}
function wr(e, t, n) {
  if (e.byteLength < t + n)
    return "";
  const s = new DataView(e);
  let r = "";
  for (let i = 0; i < n; i++)
    r += String.fromCharCode(s.getUint8(t + i));
  return r;
}
const Rf = 256 * 1024;
function* Sf(e, t) {
  const n = (t == null ? void 0 : t.chunkSize) || Rf;
  let s = 0;
  const r = new TextEncoder();
  for (; s < e.length; ) {
    const i = Math.min(e.length - s, n), o = e.slice(s, s + i);
    s += i, yield r.encode(o);
  }
}
const If = 256 * 1024;
function Of(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return function* () {
    const {
      chunkSize: n = If
    } = t;
    let s = 0;
    for (; s < e.byteLength; ) {
      const r = Math.min(e.byteLength - s, n), i = new ArrayBuffer(r), o = new Uint8Array(e, s, r);
      new Uint8Array(i).set(o), s += r, yield i;
    }
  }();
}
const vf = 1024 * 1024;
async function* xf(e, t) {
  const n = (t == null ? void 0 : t.chunkSize) || vf;
  let s = 0;
  for (; s < e.size; ) {
    const r = s + n, i = await e.slice(s, r).arrayBuffer();
    s = r, yield i;
  }
}
function to(e, t) {
  return fa ? Ff(e, t) : Lf(e);
}
async function* Ff(e, t) {
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
      yield ya(o);
    }
  } catch {
    n.releaseLock();
  }
}
async function* Lf(e, t) {
  for await (const n of e)
    yield ya(n);
}
function Df(e, t) {
  if (typeof e == "string")
    return Sf(e, t);
  if (e instanceof ArrayBuffer)
    return Of(e, t);
  if (de(e))
    return xf(e, t);
  if (Ta(e))
    return to(e, t);
  if (fe(e))
    return to(e.body, t);
  throw new Error("makeIterator");
}
const Fa = "Cannot convert supplied data type";
function Gf(e, t, n) {
  if (t.text && typeof e == "string")
    return e;
  if (xl(e) && (e = e.buffer), e instanceof ArrayBuffer) {
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
  throw new Error(Fa);
}
async function Nf(e, t, n) {
  const s = e instanceof ArrayBuffer || ArrayBuffer.isView(e);
  if (typeof e == "string" || s)
    return Gf(e, t);
  if (de(e) && (e = await Ca(e)), fe(e)) {
    const r = e;
    return await Hl(r), t.binary ? await r.arrayBuffer() : await r.text();
  }
  if (Ta(e) && (e = Df(e, n)), Ol(e) || vl(e))
    return wl(e);
  throw new Error(Fa);
}
function La(e, t) {
  const n = Sa(), s = e || n;
  return typeof s.fetch == "function" ? s.fetch : rn(s.fetch) ? (r) => Ze(r, s.fetch) : t != null && t.fetch ? t == null ? void 0 : t.fetch : Ze;
}
function Pf(e, t, n) {
  if (n)
    return n;
  const s = {
    fetch: La(t, e),
    ...e
  };
  if (s.url) {
    const r = qr(s.url);
    s.baseUrl = r, s.queryString = Pl(s.url), s.filename = Ba(r), s.baseUrl = Sl(r);
  }
  return Array.isArray(s.loaders) || (s.loaders = null), s;
}
function Uf(e, t) {
  if (e && !Array.isArray(e))
    return e;
  let n;
  if (e && (n = Array.isArray(e) ? e : [e]), t && t.loaders) {
    const s = Array.isArray(t.loaders) ? t.loaders : [t.loaders];
    n = n ? [...n, ...s] : s;
  }
  return n && n.length ? n : void 0;
}
async function ss(e, t, n, s) {
  t && !Array.isArray(t) && !Qr(t) && (s = void 0, n = t, t = void 0), e = await e, n = n || {};
  const r = ps(e), o = Uf(t, s), c = await Bf(e, o, n);
  return c ? (n = uf(n, c, o, r), s = Pf({
    url: r,
    _parse: ss,
    loaders: o
  }, n, s || null), await Hf(c, e, n, s)) : null;
}
async function Hf(e, t, n, s) {
  if (pl(e), n = ol(e.options, n), fe(t)) {
    const i = t, {
      ok: o,
      redirected: c,
      status: a,
      statusText: h,
      type: u,
      url: l
    } = i, f = Object.fromEntries(i.headers.entries());
    s.response = {
      headers: f,
      ok: o,
      redirected: c,
      status: a,
      statusText: h,
      type: u,
      url: l
    };
  }
  t = await Nf(t, e, n);
  const r = e;
  if (r.parseTextSync && typeof t == "string")
    return r.parseTextSync(t, n, s);
  if (Bl(e, n))
    return await Tl(e, t, n, s, ss);
  if (r.parseText && typeof t == "string")
    return await r.parseText(t, n, s);
  if (r.parse)
    return await r.parse(t, n, s);
  throw te(!r.parseSync), new Error(`${e.id} loader - no parser found and worker is disabled`);
}
function kf(e) {
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
function $f(e) {
  let t = 1 / 0, n = 1 / 0, s = 1 / 0, r = -1 / 0, i = -1 / 0, o = -1 / 0;
  const c = e.POSITION ? e.POSITION.value : [], a = c && c.length;
  for (let h = 0; h < a; h += 3) {
    const u = c[h], l = c[h + 1], f = c[h + 2];
    t = u < t ? u : t, n = l < n ? l : n, s = f < s ? f : s, r = u > r ? u : r, i = l > i ? l : i, o = f > o ? f : o;
  }
  return [[t, n, s], [r, i, o]];
}
function Vf(e, t, n) {
  const s = kf(t.value), r = n || Jf(t);
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
function Jf(e) {
  const t = {};
  return "byteOffset" in e && (t.byteOffset = e.byteOffset.toString(10)), "byteStride" in e && (t.byteStride = e.byteStride.toString(10)), "normalized" in e && (t.normalized = e.normalized.toString()), t;
}
async function Yr(e, t, n, s) {
  let r, i;
  !Array.isArray(t) && !Qr(t) ? (r = [], i = t) : (r = t, i = n);
  const o = La(i);
  let c = e;
  return typeof e == "string" && (c = await o(e)), de(e) && (c = await o(e)), Array.isArray(r) ? await ss(c, r, i) : await ss(c, r, i);
}
async function Zr(e, t, n, s) {
  return s._parse(e, t, n, s);
}
function ht(e, t) {
  if (!e)
    throw new Error(t || "loader assertion failed.");
}
function Wf(e, t, n) {
  const s = n !== void 0 ? new Uint8Array(e).subarray(t, t + n) : new Uint8Array(e).subarray(t);
  return new Uint8Array(s).buffer;
}
function zf() {
  var e;
  if (typeof process < "u" && typeof process.cwd < "u")
    return process.cwd();
  const t = (e = window.location) === null || e === void 0 ? void 0 : e.pathname;
  return (t == null ? void 0 : t.slice(0, t.lastIndexOf("/") + 1)) || "";
}
function jf(e) {
  const t = e ? e.lastIndexOf("/") : -1;
  return t >= 0 ? e.substr(0, t) : "";
}
function Kf() {
  const e = [];
  for (let r = 0; r < arguments.length; r++)
    e[r] = r < 0 || arguments.length <= r ? void 0 : arguments[r];
  let t = "", n = !1, s;
  for (let r = e.length - 1; r >= -1 && !n; r--) {
    let i;
    r >= 0 ? i = e[r] : (s === void 0 && (s = zf()), i = s), i.length !== 0 && (t = `${i}/${t}`, n = i.charCodeAt(0) === $e);
  }
  return t = qf(t, !n), n ? `/${t}` : t.length > 0 ? t : ".";
}
const $e = 47, Gs = 46;
function qf(e, t) {
  let n = "", s = -1, r = 0, i, o = !1;
  for (let c = 0; c <= e.length; ++c) {
    if (c < e.length)
      i = e.charCodeAt(c);
    else {
      if (i === $e)
        break;
      i = $e;
    }
    if (i === $e) {
      if (!(s === c - 1 || r === 1))
        if (s !== c - 1 && r === 2) {
          if (n.length < 2 || !o || n.charCodeAt(n.length - 1) !== Gs || n.charCodeAt(n.length - 2) !== Gs) {
            if (n.length > 2) {
              const a = n.length - 1;
              let h = a;
              for (; h >= 0 && n.charCodeAt(h) !== $e; --h)
                ;
              if (h !== a) {
                n = h === -1 ? "" : n.slice(0, h), s = c, r = 0, o = !1;
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              n = "", s = c, r = 0, o = !1;
              continue;
            }
          }
          t && (n.length > 0 ? n += "/.." : n = "..", o = !0);
        } else {
          const a = e.slice(s + 1, c);
          n.length > 0 ? n += `/${a}` : n = a, o = !1;
        }
      s = c, r = 0;
    } else
      i === Gs && r !== -1 ? ++r : r = -1;
  }
  return n;
}
const Xf = 1 / Math.PI * 180, Qf = 1 / 180 * Math.PI, Yf = {
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
    ...Yf
  }
};
const Z = globalThis.mathgl.config;
function Zf(e, {
  precision: t = Z.precision
} = {}) {
  return e = rd(e), "".concat(parseFloat(e.toPrecision(t)));
}
function le(e) {
  return Array.isArray(e) || ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function _r(e) {
  return ed(e);
}
function td(e) {
  return nd(e);
}
function ed(e, t) {
  return ti(e, (n) => n * Qf, t);
}
function nd(e, t) {
  return ti(e, (n) => n * Xf, t);
}
function sd(e, t, n) {
  return ti(e, (s) => Math.max(t, Math.min(n, s)));
}
function Yt(e, t, n) {
  const s = Z.EPSILON;
  n && (Z.EPSILON = n);
  try {
    if (e === t)
      return !0;
    if (le(e) && le(t)) {
      if (e.length !== t.length)
        return !1;
      for (let r = 0; r < e.length; ++r)
        if (!Yt(e[r], t[r]))
          return !1;
      return !0;
    }
    return e && e.equals ? e.equals(t) : t && t.equals ? t.equals(e) : typeof e == "number" && typeof t == "number" ? Math.abs(e - t) <= Z.EPSILON * Math.max(1, Math.abs(e), Math.abs(t)) : !1;
  } finally {
    Z.EPSILON = s;
  }
}
function rd(e) {
  return Math.round(e / Z.EPSILON) * Z.EPSILON;
}
function id(e) {
  return e.clone ? e.clone() : new Array(e.length);
}
function ti(e, t, n) {
  if (le(e)) {
    const s = e;
    n = n || id(s);
    for (let r = 0; r < n.length && r < s.length; ++r) {
      const i = typeof e == "number" ? e : e[r];
      n[r] = t(i, r, n);
    }
    return n;
  }
  return t(e);
}
function od(e) {
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
let ei = class extends od(Array) {
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
    return t === this ? this : le(t) ? this.toArray(t) : this.toObject(t);
  }
  toTarget(t) {
    return t ? this.to(t) : this;
  }
  toFloat32Array() {
    return new Float32Array(this);
  }
  toString() {
    return this.formatString(Z);
  }
  formatString(t) {
    let n = "";
    for (let s = 0; s < this.ELEMENTS; ++s)
      n += (s > 0 ? ", " : "") + Zf(this[s], t);
    return "".concat(t.printTypes ? this.constructor.name : "", "[").concat(n, "]");
  }
  equals(t) {
    if (!t || this.length !== t.length)
      return !1;
    for (let n = 0; n < this.ELEMENTS; ++n)
      if (!Yt(this[n], t[n]))
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
    if (Z.debug && !this.validate())
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
};
function cd(e, t) {
  if (e.length !== t)
    return !1;
  for (let n = 0; n < e.length; ++n)
    if (!Number.isFinite(e[n]))
      return !1;
  return !0;
}
function k(e) {
  if (!Number.isFinite(e))
    throw new Error("Invalid number ".concat(JSON.stringify(e)));
  return e;
}
function ze(e, t, n = "") {
  if (Z.debug && !cd(e, t))
    throw new Error("math.gl: ".concat(n, " some fields set to invalid numbers'"));
  return e;
}
function J(e, t) {
  if (!e)
    throw new Error("math.gl assertion ".concat(t));
}
let ni = class extends ei {
  get x() {
    return this[0];
  }
  set x(t) {
    this[0] = k(t);
  }
  get y() {
    return this[1];
  }
  set y(t) {
    this[1] = k(t);
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
    return k(n);
  }
  dot(t) {
    let n = 0;
    for (let s = 0; s < this.ELEMENTS; ++s)
      n += this[s] * t[s];
    return k(n);
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
    return J(t >= 0 && t < this.ELEMENTS, "index is out of range"), k(this[t]);
  }
  setComponent(t, n) {
    return J(t >= 0 && t < this.ELEMENTS, "index is out of range"), this[t] = n, this.check();
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
};
const je = 1e-6;
let vt = typeof Float32Array < "u" ? Float32Array : Array;
function ad() {
  const e = new vt(2);
  return vt != Float32Array && (e[0] = 0, e[1] = 0), e;
}
function hd(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e;
}
function ud(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r + n[4], e[1] = n[1] * s + n[3] * r + n[5], e;
}
function Da(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[3] * r + n[6], e[1] = n[1] * s + n[4] * r + n[7], e;
}
function Ga(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[4] * r + n[12], e[1] = n[1] * s + n[5] * r + n[13], e;
}
(function() {
  const e = ad();
  return function(t, n, s, r, i, o) {
    let c, a;
    for (n || (n = 2), s || (s = 0), r ? a = Math.min(r * n + s, t.length) : a = t.length, c = s; c < a; c += n)
      e[0] = t[c], e[1] = t[c + 1], i(e, e, o), t[c] = e[0], t[c + 1] = e[1];
    return t;
  };
})();
function Na(e, t, n) {
  const s = t[0], r = t[1], i = n[3] * s + n[7] * r || 1;
  return e[0] = (n[0] * s + n[4] * r) / i, e[1] = (n[1] * s + n[5] * r) / i, e;
}
function Pa(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[3] * s + n[7] * r + n[11] * i || 1;
  return e[0] = (n[0] * s + n[4] * r + n[8] * i) / o, e[1] = (n[1] * s + n[5] * r + n[9] * i) / o, e[2] = (n[2] * s + n[6] * r + n[10] * i) / o, e;
}
function ld(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e[2] = t[2], e;
}
function fd(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e[2] = t[2], e[3] = t[3], e;
}
function Ua(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  return e[0] = n[0] * s + n[3] * r + n[6] * i, e[1] = n[1] * s + n[4] * r + n[7] * i, e[2] = n[2] * s + n[5] * r + n[8] * i, e[3] = t[3], e;
}
class Bs extends ni {
  constructor(t = 0, n = 0) {
    super(2), le(t) && arguments.length === 1 ? this.copy(t) : (Z.debug && (k(t), k(n)), this[0] = t, this[1] = n);
  }
  set(t, n) {
    return this[0] = t, this[1] = n, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this.check();
  }
  fromObject(t) {
    return Z.debug && (k(t.x), k(t.y)), this[0] = t.x, this[1] = t.y, this.check();
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
    return Ga(this, this, t), this.check();
  }
  transformAsVector(t) {
    return Na(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return Da(this, this, t), this.check();
  }
  transformByMatrix2x3(t) {
    return ud(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return hd(this, this, t), this.check();
  }
}
function Ha() {
  const e = new vt(3);
  return vt != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e;
}
function ka(e) {
  const t = e[0], n = e[1], s = e[2];
  return Math.sqrt(t * t + n * n + s * s);
}
function eo(e, t, n) {
  const s = new vt(3);
  return s[0] = e, s[1] = t, s[2] = n, s;
}
function dd(e, t) {
  const n = t[0], s = t[1], r = t[2];
  let i = n * n + s * s + r * r;
  return i > 0 && (i = 1 / Math.sqrt(i)), e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e;
}
function si(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
}
function Kn(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[0], c = n[1], a = n[2];
  return e[0] = r * a - i * c, e[1] = i * o - s * a, e[2] = s * c - r * o, e;
}
function ri(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  let o = n[3] * s + n[7] * r + n[11] * i + n[15];
  return o = o || 1, e[0] = (n[0] * s + n[4] * r + n[8] * i + n[12]) / o, e[1] = (n[1] * s + n[5] * r + n[9] * i + n[13]) / o, e[2] = (n[2] * s + n[6] * r + n[10] * i + n[14]) / o, e;
}
function $a(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  return e[0] = s * n[0] + r * n[3] + i * n[6], e[1] = s * n[1] + r * n[4] + i * n[7], e[2] = s * n[2] + r * n[5] + i * n[8], e;
}
function Va(e, t, n) {
  const s = n[0], r = n[1], i = n[2], o = n[3], c = t[0], a = t[1], h = t[2];
  let u = r * h - i * a, l = i * c - s * h, f = s * a - r * c, d = r * f - i * l, m = i * u - s * f, g = s * l - r * u;
  const A = o * 2;
  return u *= A, l *= A, f *= A, d *= 2, m *= 2, g *= 2, e[0] = c + u + d, e[1] = a + l + m, e[2] = h + f + g, e;
}
function md(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[0], i[1] = r[1] * Math.cos(s) - r[2] * Math.sin(s), i[2] = r[1] * Math.sin(s) + r[2] * Math.cos(s), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function gd(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[2] * Math.sin(s) + r[0] * Math.cos(s), i[1] = r[1], i[2] = r[2] * Math.cos(s) - r[0] * Math.sin(s), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function Ad(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[0] * Math.cos(s) - r[1] * Math.sin(s), i[1] = r[0] * Math.sin(s) + r[1] * Math.cos(s), i[2] = r[2], e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function pd(e, t) {
  const n = e[0], s = e[1], r = e[2], i = t[0], o = t[1], c = t[2], a = Math.sqrt((n * n + s * s + r * r) * (i * i + o * o + c * c)), h = a && si(e, t) / a;
  return Math.acos(Math.min(Math.max(h, -1), 1));
}
const yd = ka;
(function() {
  const e = Ha();
  return function(t, n, s, r, i, o) {
    let c, a;
    for (n || (n = 3), s || (s = 0), r ? a = Math.min(r * n + s, t.length) : a = t.length, c = s; c < a; c += n)
      e[0] = t[c], e[1] = t[c + 1], e[2] = t[c + 2], i(e, e, o), t[c] = e[0], t[c + 1] = e[1], t[c + 2] = e[2];
    return t;
  };
})();
const Ns = [0, 0, 0];
let pn, w = class Ja extends ni {
  static get ZERO() {
    return pn || (pn = new Ja(0, 0, 0), Object.freeze(pn)), pn;
  }
  constructor(t = 0, n = 0, s = 0) {
    super(-0, -0, -0), arguments.length === 1 && le(t) ? this.copy(t) : (Z.debug && (k(t), k(n), k(s)), this[0] = t, this[1] = n, this[2] = s);
  }
  set(t, n, s) {
    return this[0] = t, this[1] = n, this[2] = s, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this.check();
  }
  fromObject(t) {
    return Z.debug && (k(t.x), k(t.y), k(t.z)), this[0] = t.x, this[1] = t.y, this[2] = t.z, this.check();
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
    this[2] = k(t);
  }
  angle(t) {
    return pd(this, t);
  }
  cross(t) {
    return Kn(this, this, t), this.check();
  }
  rotateX({
    radians: t,
    origin: n = Ns
  }) {
    return md(this, this, n, t), this.check();
  }
  rotateY({
    radians: t,
    origin: n = Ns
  }) {
    return gd(this, this, n, t), this.check();
  }
  rotateZ({
    radians: t,
    origin: n = Ns
  }) {
    return Ad(this, this, n, t), this.check();
  }
  transform(t) {
    return this.transformAsPoint(t);
  }
  transformAsPoint(t) {
    return ri(this, this, t), this.check();
  }
  transformAsVector(t) {
    return Pa(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return $a(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return ld(this, this, t), this.check();
  }
  transformByQuaternion(t) {
    return Va(this, this, t), this.check();
  }
}, yn, Bd = class Wa extends ni {
  static get ZERO() {
    return yn || (yn = new Wa(0, 0, 0, 0), Object.freeze(yn)), yn;
  }
  constructor(t = 0, n = 0, s = 0, r = 0) {
    super(-0, -0, -0, -0), le(t) && arguments.length === 1 ? this.copy(t) : (Z.debug && (k(t), k(n), k(s), k(r)), this[0] = t, this[1] = n, this[2] = s, this[3] = r);
  }
  set(t, n, s, r) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this.check();
  }
  fromObject(t) {
    return Z.debug && (k(t.x), k(t.y), k(t.z), k(t.w)), this[0] = t.x, this[1] = t.y, this[2] = t.z, this[3] = t.w, this;
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
    this[2] = k(t);
  }
  get w() {
    return this[3];
  }
  set w(t) {
    this[3] = k(t);
  }
  transform(t) {
    return ri(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return Ua(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return fd(this, this, t), this.check();
  }
  transformByQuaternion(t) {
    return Va(this, this, t), this.check();
  }
  applyMatrix4(t) {
    return t.transform(this, this), this;
  }
}, za = class extends ei {
  toString() {
    let t = "[";
    if (Z.printRowMajor) {
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
    return this[n * this.RANK + t] = k(s), this;
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
};
function Td() {
  const e = new vt(9);
  return vt != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1, e;
}
function Ed(e, t) {
  if (e === t) {
    const n = t[1], s = t[2], r = t[5];
    e[1] = t[3], e[2] = t[6], e[3] = n, e[5] = t[7], e[6] = s, e[7] = r;
  } else
    e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
  return e;
}
function Cd(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], c = t[5], a = t[6], h = t[7], u = t[8], l = u * o - c * h, f = -u * i + c * a, d = h * i - o * a;
  let m = n * l + s * f + r * d;
  return m ? (m = 1 / m, e[0] = l * m, e[1] = (-u * s + r * h) * m, e[2] = (c * s - r * o) * m, e[3] = f * m, e[4] = (u * n - r * a) * m, e[5] = (-c * n + r * i) * m, e[6] = d * m, e[7] = (-h * n + s * a) * m, e[8] = (o * n - s * i) * m, e) : null;
}
function bd(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3], i = e[4], o = e[5], c = e[6], a = e[7], h = e[8];
  return t * (h * i - o * a) + n * (-h * r + o * c) + s * (a * r - i * c);
}
function no(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], c = t[4], a = t[5], h = t[6], u = t[7], l = t[8], f = n[0], d = n[1], m = n[2], g = n[3], A = n[4], p = n[5], C = n[6], T = n[7], E = n[8];
  return e[0] = f * s + d * o + m * h, e[1] = f * r + d * c + m * u, e[2] = f * i + d * a + m * l, e[3] = g * s + A * o + p * h, e[4] = g * r + A * c + p * u, e[5] = g * i + A * a + p * l, e[6] = C * s + T * o + E * h, e[7] = C * r + T * c + E * u, e[8] = C * i + T * a + E * l, e;
}
function wd(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], c = t[4], a = t[5], h = t[6], u = t[7], l = t[8], f = n[0], d = n[1];
  return e[0] = s, e[1] = r, e[2] = i, e[3] = o, e[4] = c, e[5] = a, e[6] = f * s + d * o + h, e[7] = f * r + d * c + u, e[8] = f * i + d * a + l, e;
}
function _d(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], c = t[4], a = t[5], h = t[6], u = t[7], l = t[8], f = Math.sin(n), d = Math.cos(n);
  return e[0] = d * s + f * o, e[1] = d * r + f * c, e[2] = d * i + f * a, e[3] = d * o - f * s, e[4] = d * c - f * r, e[5] = d * a - f * i, e[6] = h, e[7] = u, e[8] = l, e;
}
function so(e, t, n) {
  const s = n[0], r = n[1];
  return e[0] = s * t[0], e[1] = s * t[1], e[2] = s * t[2], e[3] = r * t[3], e[4] = r * t[4], e[5] = r * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
}
function Md(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n + n, c = s + s, a = r + r, h = n * o, u = s * o, l = s * c, f = r * o, d = r * c, m = r * a, g = i * o, A = i * c, p = i * a;
  return e[0] = 1 - l - m, e[3] = u - p, e[6] = f + A, e[1] = u + p, e[4] = 1 - h - m, e[7] = d - g, e[2] = f - A, e[5] = d + g, e[8] = 1 - h - l, e;
}
var Mr;
(function(e) {
  e[e.COL0ROW0 = 0] = "COL0ROW0", e[e.COL0ROW1 = 1] = "COL0ROW1", e[e.COL0ROW2 = 2] = "COL0ROW2", e[e.COL1ROW0 = 3] = "COL1ROW0", e[e.COL1ROW1 = 4] = "COL1ROW1", e[e.COL1ROW2 = 5] = "COL1ROW2", e[e.COL2ROW0 = 6] = "COL2ROW0", e[e.COL2ROW1 = 7] = "COL2ROW1", e[e.COL2ROW2 = 8] = "COL2ROW2";
})(Mr || (Mr = {}));
const Rd = Object.freeze([1, 0, 0, 0, 1, 0, 0, 0, 1]);
let K = class extends za {
  static get IDENTITY() {
    return Id();
  }
  static get ZERO() {
    return Sd();
  }
  get ELEMENTS() {
    return 9;
  }
  get RANK() {
    return 3;
  }
  get INDICES() {
    return Mr;
  }
  constructor(t, ...n) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0), arguments.length === 1 && Array.isArray(t) ? this.copy(t) : n.length > 0 ? this.copy([t, ...n]) : this.identity();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this[4] = t[4], this[5] = t[5], this[6] = t[6], this[7] = t[7], this[8] = t[8], this.check();
  }
  identity() {
    return this.copy(Rd);
  }
  fromObject(t) {
    return this.check();
  }
  fromQuaternion(t) {
    return Md(this, t), this.check();
  }
  set(t, n, s, r, i, o, c, a, h) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this[4] = i, this[5] = o, this[6] = c, this[7] = a, this[8] = h, this.check();
  }
  setRowMajor(t, n, s, r, i, o, c, a, h) {
    return this[0] = t, this[1] = r, this[2] = c, this[3] = n, this[4] = i, this[5] = a, this[6] = s, this[7] = o, this[8] = h, this.check();
  }
  determinant() {
    return bd(this);
  }
  transpose() {
    return Ed(this, this), this.check();
  }
  invert() {
    return Cd(this, this), this.check();
  }
  multiplyLeft(t) {
    return no(this, t, this), this.check();
  }
  multiplyRight(t) {
    return no(this, this, t), this.check();
  }
  rotate(t) {
    return _d(this, this, t), this.check();
  }
  scale(t) {
    return Array.isArray(t) ? so(this, this, t) : so(this, this, [t, t]), this.check();
  }
  translate(t) {
    return wd(this, this, t), this.check();
  }
  transform(t, n) {
    let s;
    switch (t.length) {
      case 2:
        s = Da(n || [-0, -0], t, this);
        break;
      case 3:
        s = $a(n || [-0, -0, -0], t, this);
        break;
      case 4:
        s = Ua(n || [-0, -0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return ze(s, t.length), s;
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
}, Bn, Tn = null;
function Sd() {
  return Bn || (Bn = new K([0, 0, 0, 0, 0, 0, 0, 0, 0]), Object.freeze(Bn)), Bn;
}
function Id() {
  return Tn || (Tn = new K(), Object.freeze(Tn)), Tn;
}
function Od(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function vd(e, t) {
  if (e === t) {
    const n = t[1], s = t[2], r = t[3], i = t[6], o = t[7], c = t[11];
    e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = n, e[6] = t[9], e[7] = t[13], e[8] = s, e[9] = i, e[11] = t[14], e[12] = r, e[13] = o, e[14] = c;
  } else
    e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
  return e;
}
function xd(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], c = t[5], a = t[6], h = t[7], u = t[8], l = t[9], f = t[10], d = t[11], m = t[12], g = t[13], A = t[14], p = t[15], C = n * c - s * o, T = n * a - r * o, E = n * h - i * o, b = s * a - r * c, y = s * h - i * c, F = r * h - i * a, x = u * g - l * m, I = u * A - f * m, v = u * p - d * m, D = l * A - f * g, N = l * p - d * g, G = f * p - d * A;
  let S = C * G - T * N + E * D + b * v - y * I + F * x;
  return S ? (S = 1 / S, e[0] = (c * G - a * N + h * D) * S, e[1] = (r * N - s * G - i * D) * S, e[2] = (g * F - A * y + p * b) * S, e[3] = (f * y - l * F - d * b) * S, e[4] = (a * v - o * G - h * I) * S, e[5] = (n * G - r * v + i * I) * S, e[6] = (A * E - m * F - p * T) * S, e[7] = (u * F - f * E + d * T) * S, e[8] = (o * N - c * v + h * x) * S, e[9] = (s * v - n * N - i * x) * S, e[10] = (m * y - g * E + p * C) * S, e[11] = (l * E - u * y - d * C) * S, e[12] = (c * I - o * D - a * x) * S, e[13] = (n * D - s * I + r * x) * S, e[14] = (g * T - m * b - A * C) * S, e[15] = (u * b - l * T + f * C) * S, e) : null;
}
function Fd(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3], i = e[4], o = e[5], c = e[6], a = e[7], h = e[8], u = e[9], l = e[10], f = e[11], d = e[12], m = e[13], g = e[14], A = e[15], p = t * o - n * i, C = t * c - s * i, T = n * c - s * o, E = h * m - u * d, b = h * g - l * d, y = u * g - l * m, F = t * y - n * b + s * E, x = i * y - o * b + c * E, I = h * T - u * C + l * p, v = d * T - m * C + g * p;
  return a * F - r * x + A * I - f * v;
}
function ro(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], c = t[4], a = t[5], h = t[6], u = t[7], l = t[8], f = t[9], d = t[10], m = t[11], g = t[12], A = t[13], p = t[14], C = t[15];
  let T = n[0], E = n[1], b = n[2], y = n[3];
  return e[0] = T * s + E * c + b * l + y * g, e[1] = T * r + E * a + b * f + y * A, e[2] = T * i + E * h + b * d + y * p, e[3] = T * o + E * u + b * m + y * C, T = n[4], E = n[5], b = n[6], y = n[7], e[4] = T * s + E * c + b * l + y * g, e[5] = T * r + E * a + b * f + y * A, e[6] = T * i + E * h + b * d + y * p, e[7] = T * o + E * u + b * m + y * C, T = n[8], E = n[9], b = n[10], y = n[11], e[8] = T * s + E * c + b * l + y * g, e[9] = T * r + E * a + b * f + y * A, e[10] = T * i + E * h + b * d + y * p, e[11] = T * o + E * u + b * m + y * C, T = n[12], E = n[13], b = n[14], y = n[15], e[12] = T * s + E * c + b * l + y * g, e[13] = T * r + E * a + b * f + y * A, e[14] = T * i + E * h + b * d + y * p, e[15] = T * o + E * u + b * m + y * C, e;
}
function Ld(e, t, n) {
  const s = n[0], r = n[1], i = n[2];
  let o, c, a, h, u, l, f, d, m, g, A, p;
  return t === e ? (e[12] = t[0] * s + t[4] * r + t[8] * i + t[12], e[13] = t[1] * s + t[5] * r + t[9] * i + t[13], e[14] = t[2] * s + t[6] * r + t[10] * i + t[14], e[15] = t[3] * s + t[7] * r + t[11] * i + t[15]) : (o = t[0], c = t[1], a = t[2], h = t[3], u = t[4], l = t[5], f = t[6], d = t[7], m = t[8], g = t[9], A = t[10], p = t[11], e[0] = o, e[1] = c, e[2] = a, e[3] = h, e[4] = u, e[5] = l, e[6] = f, e[7] = d, e[8] = m, e[9] = g, e[10] = A, e[11] = p, e[12] = o * s + u * r + m * i + t[12], e[13] = c * s + l * r + g * i + t[13], e[14] = a * s + f * r + A * i + t[14], e[15] = h * s + d * r + p * i + t[15]), e;
}
function Dd(e, t, n) {
  const s = n[0], r = n[1], i = n[2];
  return e[0] = t[0] * s, e[1] = t[1] * s, e[2] = t[2] * s, e[3] = t[3] * s, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * i, e[9] = t[9] * i, e[10] = t[10] * i, e[11] = t[11] * i, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function Gd(e, t, n, s) {
  let r = s[0], i = s[1], o = s[2], c = Math.sqrt(r * r + i * i + o * o), a, h, u, l, f, d, m, g, A, p, C, T, E, b, y, F, x, I, v, D, N, G, S, z;
  return c < je ? null : (c = 1 / c, r *= c, i *= c, o *= c, h = Math.sin(n), a = Math.cos(n), u = 1 - a, l = t[0], f = t[1], d = t[2], m = t[3], g = t[4], A = t[5], p = t[6], C = t[7], T = t[8], E = t[9], b = t[10], y = t[11], F = r * r * u + a, x = i * r * u + o * h, I = o * r * u - i * h, v = r * i * u - o * h, D = i * i * u + a, N = o * i * u + r * h, G = r * o * u + i * h, S = i * o * u - r * h, z = o * o * u + a, e[0] = l * F + g * x + T * I, e[1] = f * F + A * x + E * I, e[2] = d * F + p * x + b * I, e[3] = m * F + C * x + y * I, e[4] = l * v + g * D + T * N, e[5] = f * v + A * D + E * N, e[6] = d * v + p * D + b * N, e[7] = m * v + C * D + y * N, e[8] = l * G + g * S + T * z, e[9] = f * G + A * S + E * z, e[10] = d * G + p * S + b * z, e[11] = m * G + C * S + y * z, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e);
}
function Nd(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[4], o = t[5], c = t[6], a = t[7], h = t[8], u = t[9], l = t[10], f = t[11];
  return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = i * r + h * s, e[5] = o * r + u * s, e[6] = c * r + l * s, e[7] = a * r + f * s, e[8] = h * r - i * s, e[9] = u * r - o * s, e[10] = l * r - c * s, e[11] = f * r - a * s, e;
}
function Pd(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[0], o = t[1], c = t[2], a = t[3], h = t[8], u = t[9], l = t[10], f = t[11];
  return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * r - h * s, e[1] = o * r - u * s, e[2] = c * r - l * s, e[3] = a * r - f * s, e[8] = i * s + h * r, e[9] = o * s + u * r, e[10] = c * s + l * r, e[11] = a * s + f * r, e;
}
function Ud(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[0], o = t[1], c = t[2], a = t[3], h = t[4], u = t[5], l = t[6], f = t[7];
  return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * r + h * s, e[1] = o * r + u * s, e[2] = c * r + l * s, e[3] = a * r + f * s, e[4] = h * r - i * s, e[5] = u * r - o * s, e[6] = l * r - c * s, e[7] = f * r - a * s, e;
}
function Hd(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[4], o = t[5], c = t[6], a = t[8], h = t[9], u = t[10];
  return e[0] = Math.sqrt(n * n + s * s + r * r), e[1] = Math.sqrt(i * i + o * o + c * c), e[2] = Math.sqrt(a * a + h * h + u * u), e;
}
function kd(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n + n, c = s + s, a = r + r, h = n * o, u = s * o, l = s * c, f = r * o, d = r * c, m = r * a, g = i * o, A = i * c, p = i * a;
  return e[0] = 1 - l - m, e[1] = u + p, e[2] = f - A, e[3] = 0, e[4] = u - p, e[5] = 1 - h - m, e[6] = d + g, e[7] = 0, e[8] = f + A, e[9] = d - g, e[10] = 1 - h - l, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function $d(e, t, n, s, r, i, o) {
  const c = 1 / (n - t), a = 1 / (r - s), h = 1 / (i - o);
  return e[0] = i * 2 * c, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i * 2 * a, e[6] = 0, e[7] = 0, e[8] = (n + t) * c, e[9] = (r + s) * a, e[10] = (o + i) * h, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = o * i * 2 * h, e[15] = 0, e;
}
function Vd(e, t, n, s, r) {
  const i = 1 / Math.tan(t / 2);
  if (e[0] = i / n, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, r != null && r !== 1 / 0) {
    const o = 1 / (s - r);
    e[10] = (r + s) * o, e[14] = 2 * r * s * o;
  } else
    e[10] = -1, e[14] = -2 * s;
  return e;
}
const Jd = Vd;
function Wd(e, t, n, s, r, i, o) {
  const c = 1 / (t - n), a = 1 / (s - r), h = 1 / (i - o);
  return e[0] = -2 * c, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * a, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * h, e[11] = 0, e[12] = (t + n) * c, e[13] = (r + s) * a, e[14] = (o + i) * h, e[15] = 1, e;
}
const zd = Wd;
function jd(e, t, n, s) {
  let r, i, o, c, a, h, u, l, f, d;
  const m = t[0], g = t[1], A = t[2], p = s[0], C = s[1], T = s[2], E = n[0], b = n[1], y = n[2];
  return Math.abs(m - E) < je && Math.abs(g - b) < je && Math.abs(A - y) < je ? Od(e) : (l = m - E, f = g - b, d = A - y, r = 1 / Math.sqrt(l * l + f * f + d * d), l *= r, f *= r, d *= r, i = C * d - T * f, o = T * l - p * d, c = p * f - C * l, r = Math.sqrt(i * i + o * o + c * c), r ? (r = 1 / r, i *= r, o *= r, c *= r) : (i = 0, o = 0, c = 0), a = f * c - d * o, h = d * i - l * c, u = l * o - f * i, r = Math.sqrt(a * a + h * h + u * u), r ? (r = 1 / r, a *= r, h *= r, u *= r) : (a = 0, h = 0, u = 0), e[0] = i, e[1] = a, e[2] = l, e[3] = 0, e[4] = o, e[5] = h, e[6] = f, e[7] = 0, e[8] = c, e[9] = u, e[10] = d, e[11] = 0, e[12] = -(i * m + o * g + c * A), e[13] = -(a * m + h * g + u * A), e[14] = -(l * m + f * g + d * A), e[15] = 1, e);
}
function Kd() {
  const e = new vt(4);
  return vt != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e;
}
function qd(e, t, n) {
  return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e;
}
function Xd(e, t, n) {
  return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e;
}
function Qd(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3];
  return Math.sqrt(t * t + n * n + s * s + r * r);
}
function Yd(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3];
  return t * t + n * n + s * s + r * r;
}
function Zd(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3];
  let o = n * n + s * s + r * r + i * i;
  return o > 0 && (o = 1 / Math.sqrt(o)), e[0] = n * o, e[1] = s * o, e[2] = r * o, e[3] = i * o, e;
}
function t0(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
}
function e0(e, t, n, s) {
  const r = t[0], i = t[1], o = t[2], c = t[3];
  return e[0] = r + s * (n[0] - r), e[1] = i + s * (n[1] - i), e[2] = o + s * (n[2] - o), e[3] = c + s * (n[3] - c), e;
}
function n0(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3];
  return e[0] = n[0] * s + n[4] * r + n[8] * i + n[12] * o, e[1] = n[1] * s + n[5] * r + n[9] * i + n[13] * o, e[2] = n[2] * s + n[6] * r + n[10] * i + n[14] * o, e[3] = n[3] * s + n[7] * r + n[11] * i + n[15] * o, e;
}
function s0(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[0], c = n[1], a = n[2], h = n[3], u = h * s + c * i - a * r, l = h * r + a * s - o * i, f = h * i + o * r - c * s, d = -o * s - c * r - a * i;
  return e[0] = u * h + d * -o + l * -a - f * -c, e[1] = l * h + d * -c + f * -o - u * -a, e[2] = f * h + d * -a + u * -c - l * -o, e[3] = t[3], e;
}
(function() {
  const e = Kd();
  return function(t, n, s, r, i, o) {
    let c, a;
    for (n || (n = 4), s || (s = 0), r ? a = Math.min(r * n + s, t.length) : a = t.length, c = s; c < a; c += n)
      e[0] = t[c], e[1] = t[c + 1], e[2] = t[c + 2], e[3] = t[c + 3], i(e, e, o), t[c] = e[0], t[c + 1] = e[1], t[c + 2] = e[2], t[c + 3] = e[3];
    return t;
  };
})();
var Rr;
(function(e) {
  e[e.COL0ROW0 = 0] = "COL0ROW0", e[e.COL0ROW1 = 1] = "COL0ROW1", e[e.COL0ROW2 = 2] = "COL0ROW2", e[e.COL0ROW3 = 3] = "COL0ROW3", e[e.COL1ROW0 = 4] = "COL1ROW0", e[e.COL1ROW1 = 5] = "COL1ROW1", e[e.COL1ROW2 = 6] = "COL1ROW2", e[e.COL1ROW3 = 7] = "COL1ROW3", e[e.COL2ROW0 = 8] = "COL2ROW0", e[e.COL2ROW1 = 9] = "COL2ROW1", e[e.COL2ROW2 = 10] = "COL2ROW2", e[e.COL2ROW3 = 11] = "COL2ROW3", e[e.COL3ROW0 = 12] = "COL3ROW0", e[e.COL3ROW1 = 13] = "COL3ROW1", e[e.COL3ROW2 = 14] = "COL3ROW2", e[e.COL3ROW3 = 15] = "COL3ROW3";
})(Rr || (Rr = {}));
const r0 = 45 * Math.PI / 180, i0 = 1, Ps = 0.1, Us = 500, o0 = Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
let Tt = class extends za {
  static get IDENTITY() {
    return a0();
  }
  static get ZERO() {
    return c0();
  }
  get ELEMENTS() {
    return 16;
  }
  get RANK() {
    return 4;
  }
  get INDICES() {
    return Rr;
  }
  constructor(t) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0), arguments.length === 1 && Array.isArray(t) ? this.copy(t) : this.identity();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this[4] = t[4], this[5] = t[5], this[6] = t[6], this[7] = t[7], this[8] = t[8], this[9] = t[9], this[10] = t[10], this[11] = t[11], this[12] = t[12], this[13] = t[13], this[14] = t[14], this[15] = t[15], this.check();
  }
  set(t, n, s, r, i, o, c, a, h, u, l, f, d, m, g, A) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this[4] = i, this[5] = o, this[6] = c, this[7] = a, this[8] = h, this[9] = u, this[10] = l, this[11] = f, this[12] = d, this[13] = m, this[14] = g, this[15] = A, this.check();
  }
  setRowMajor(t, n, s, r, i, o, c, a, h, u, l, f, d, m, g, A) {
    return this[0] = t, this[1] = i, this[2] = h, this[3] = d, this[4] = n, this[5] = o, this[6] = u, this[7] = m, this[8] = s, this[9] = c, this[10] = l, this[11] = g, this[12] = r, this[13] = a, this[14] = f, this[15] = A, this.check();
  }
  toRowMajor(t) {
    return t[0] = this[0], t[1] = this[4], t[2] = this[8], t[3] = this[12], t[4] = this[1], t[5] = this[5], t[6] = this[9], t[7] = this[13], t[8] = this[2], t[9] = this[6], t[10] = this[10], t[11] = this[14], t[12] = this[3], t[13] = this[7], t[14] = this[11], t[15] = this[15], t;
  }
  identity() {
    return this.copy(o0);
  }
  fromObject(t) {
    return this.check();
  }
  fromQuaternion(t) {
    return kd(this, t), this.check();
  }
  frustum(t) {
    const {
      left: n,
      right: s,
      bottom: r,
      top: i,
      near: o = Ps,
      far: c = Us
    } = t;
    return c === 1 / 0 ? h0(this, n, s, r, i, o) : $d(this, n, s, r, i, o, c), this.check();
  }
  lookAt(t) {
    const {
      eye: n,
      center: s = [0, 0, 0],
      up: r = [0, 1, 0]
    } = t;
    return jd(this, n, s, r), this.check();
  }
  ortho(t) {
    const {
      left: n,
      right: s,
      bottom: r,
      top: i,
      near: o = Ps,
      far: c = Us
    } = t;
    return zd(this, n, s, r, i, o, c), this.check();
  }
  orthographic(t) {
    const {
      fovy: n = r0,
      aspect: s = i0,
      focalDistance: r = 1,
      near: i = Ps,
      far: o = Us
    } = t;
    io(n);
    const c = n / 2, a = r * Math.tan(c), h = a * s;
    return this.ortho({
      left: -h,
      right: h,
      bottom: -a,
      top: a,
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
    return io(n), Jd(this, n, s, r, i), this.check();
  }
  determinant() {
    return Fd(this);
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
    return vd(this, this), this.check();
  }
  invert() {
    return xd(this, this), this.check();
  }
  multiplyLeft(t) {
    return ro(this, t, this), this.check();
  }
  multiplyRight(t) {
    return ro(this, this, t), this.check();
  }
  rotateX(t) {
    return Nd(this, this, t), this.check();
  }
  rotateY(t) {
    return Pd(this, this, t), this.check();
  }
  rotateZ(t) {
    return Ud(this, this, t), this.check();
  }
  rotateXYZ(t) {
    return this.rotateX(t[0]).rotateY(t[1]).rotateZ(t[2]);
  }
  rotateAxis(t, n) {
    return Gd(this, this, t, n), this.check();
  }
  scale(t) {
    return Dd(this, this, Array.isArray(t) ? t : [t, t, t]), this.check();
  }
  translate(t) {
    return Ld(this, this, t), this.check();
  }
  transform(t, n) {
    return t.length === 4 ? (n = n0(n || [-0, -0, -0, -0], t, this), ze(n, 4), n) : this.transformAsPoint(t, n);
  }
  transformAsPoint(t, n) {
    const {
      length: s
    } = t;
    let r;
    switch (s) {
      case 2:
        r = Ga(n || [-0, -0], t, this);
        break;
      case 3:
        r = ri(n || [-0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return ze(r, t.length), r;
  }
  transformAsVector(t, n) {
    let s;
    switch (t.length) {
      case 2:
        s = Na(n || [-0, -0], t, this);
        break;
      case 3:
        s = Pa(n || [-0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return ze(s, t.length), s;
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
}, En, Cn;
function c0() {
  return En || (En = new Tt([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), Object.freeze(En)), En;
}
function a0() {
  return Cn || (Cn = new Tt(), Object.freeze(Cn)), Cn;
}
function io(e) {
  if (e > Math.PI * 2)
    throw Error("expected radians");
}
function h0(e, t, n, s, r, i) {
  const o = 2 * i / (n - t), c = 2 * i / (r - s), a = (n + t) / (n - t), h = (r + s) / (r - s), u = -1, l = -1, f = -2 * i;
  return e[0] = o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = c, e[6] = 0, e[7] = 0, e[8] = a, e[9] = h, e[10] = u, e[11] = l, e[12] = 0, e[13] = 0, e[14] = f, e[15] = 0, e;
}
function oo() {
  const e = new vt(4);
  return vt != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e;
}
function u0(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e;
}
function ja(e, t, n) {
  n = n * 0.5;
  const s = Math.sin(n);
  return e[0] = s * t[0], e[1] = s * t[1], e[2] = s * t[2], e[3] = Math.cos(n), e;
}
function co(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], c = n[0], a = n[1], h = n[2], u = n[3];
  return e[0] = s * u + o * c + r * h - i * a, e[1] = r * u + o * a + i * c - s * h, e[2] = i * u + o * h + s * a - r * c, e[3] = o * u - s * c - r * a - i * h, e;
}
function l0(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], c = Math.sin(n), a = Math.cos(n);
  return e[0] = s * a + o * c, e[1] = r * a + i * c, e[2] = i * a - r * c, e[3] = o * a - s * c, e;
}
function f0(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], c = Math.sin(n), a = Math.cos(n);
  return e[0] = s * a - i * c, e[1] = r * a + o * c, e[2] = i * a + s * c, e[3] = o * a - r * c, e;
}
function d0(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], c = Math.sin(n), a = Math.cos(n);
  return e[0] = s * a + r * c, e[1] = r * a - s * c, e[2] = i * a + o * c, e[3] = o * a - i * c, e;
}
function m0(e, t) {
  const n = t[0], s = t[1], r = t[2];
  return e[0] = n, e[1] = s, e[2] = r, e[3] = Math.sqrt(Math.abs(1 - n * n - s * s - r * r)), e;
}
function qn(e, t, n, s) {
  const r = t[0], i = t[1], o = t[2], c = t[3];
  let a = n[0], h = n[1], u = n[2], l = n[3], f, d, m, g, A;
  return f = r * a + i * h + o * u + c * l, f < 0 && (f = -f, a = -a, h = -h, u = -u, l = -l), 1 - f > je ? (d = Math.acos(f), A = Math.sin(d), m = Math.sin((1 - s) * d) / A, g = Math.sin(s * d) / A) : (m = 1 - s, g = s), e[0] = m * r + g * a, e[1] = m * i + g * h, e[2] = m * o + g * u, e[3] = m * c + g * l, e;
}
function g0(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n * n + s * s + r * r + i * i, c = o ? 1 / o : 0;
  return e[0] = -n * c, e[1] = -s * c, e[2] = -r * c, e[3] = i * c, e;
}
function A0(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e;
}
function Ka(e, t) {
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
const p0 = qd, y0 = Xd, B0 = t0, T0 = e0, E0 = Qd, C0 = Yd, qa = Zd, b0 = function() {
  const e = Ha(), t = eo(1, 0, 0), n = eo(0, 1, 0);
  return function(s, r, i) {
    const o = si(r, i);
    return o < -0.999999 ? (Kn(e, t, r), yd(e) < 1e-6 && Kn(e, n, r), dd(e, e), ja(s, e, Math.PI), s) : o > 0.999999 ? (s[0] = 0, s[1] = 0, s[2] = 0, s[3] = 1, s) : (Kn(e, r, i), s[0] = e[0], s[1] = e[1], s[2] = e[2], s[3] = 1 + o, qa(s, s));
  };
}();
(function() {
  const e = oo(), t = oo();
  return function(n, s, r, i, o, c) {
    return qn(e, s, o, c), qn(t, r, i, c), qn(n, e, t, 2 * c * (1 - c)), n;
  };
})();
(function() {
  const e = Td();
  return function(t, n, s, r) {
    return e[0] = s[0], e[3] = s[1], e[6] = s[2], e[1] = r[0], e[4] = r[1], e[7] = r[2], e[2] = -n[0], e[5] = -n[1], e[8] = -n[2], qa(t, Ka(t, e));
  };
})();
const w0 = [0, 0, 0, 1];
let Sr = class extends ei {
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
    return Ka(this, t), this.check();
  }
  fromAxisRotation(t, n) {
    return ja(this, t, n), this.check();
  }
  identity() {
    return u0(this), this.check();
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
    this[0] = k(t);
  }
  get y() {
    return this[1];
  }
  set y(t) {
    this[1] = k(t);
  }
  get z() {
    return this[2];
  }
  set z(t) {
    this[2] = k(t);
  }
  get w() {
    return this[3];
  }
  set w(t) {
    this[3] = k(t);
  }
  len() {
    return E0(this);
  }
  lengthSquared() {
    return C0(this);
  }
  dot(t) {
    return B0(this, t);
  }
  rotationTo(t, n) {
    return b0(this, t, n), this.check();
  }
  add(t) {
    return p0(this, this, t), this.check();
  }
  calculateW() {
    return m0(this, this), this.check();
  }
  conjugate() {
    return A0(this, this), this.check();
  }
  invert() {
    return g0(this, this), this.check();
  }
  lerp(t, n, s) {
    return s === void 0 ? this.lerp(this, t, n) : (T0(this, t, n, s), this.check());
  }
  multiplyRight(t) {
    return co(this, this, t), this.check();
  }
  multiplyLeft(t) {
    return co(this, t, this), this.check();
  }
  normalize() {
    const t = this.len(), n = t > 0 ? 1 / t : 0;
    return this[0] = this[0] * n, this[1] = this[1] * n, this[2] = this[2] * n, this[3] = this[3] * n, t === 0 && (this[3] = 1), this.check();
  }
  rotateX(t) {
    return l0(this, this, t), this.check();
  }
  rotateY(t) {
    return f0(this, this, t), this.check();
  }
  rotateZ(t) {
    return d0(this, this, t), this.check();
  }
  scale(t) {
    return y0(this, this, t), this.check();
  }
  slerp(t, n, s) {
    let r, i, o;
    switch (arguments.length) {
      case 1:
        ({
          start: r = w0,
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
    return qn(this, r, i, o), this.check();
  }
  transformVector4(t, n = new Bd()) {
    return s0(n, t, this), ze(n, 4);
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
};
function tn(e) {
  "@babel/helpers - typeof";
  return tn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, tn(e);
}
function _0(e, t) {
  if (tn(e) != "object" || !e)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var s = n.call(e, t || "default");
    if (tn(s) != "object")
      return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function M0(e) {
  var t = _0(e, "string");
  return tn(t) == "symbol" ? t : String(t);
}
function L(e, t, n) {
  return t = M0(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
const R0 = 0.1, S0 = 1e-12, Xa = 1e-15, I0 = 1e-20, O0 = 6378137, v0 = 6378137, x0 = 6356752314245179e-9;
function Ts(e) {
  return e;
}
new w();
function F0(e, t = [], n = Ts) {
  return "longitude" in e ? (t[0] = n(e.longitude), t[1] = n(e.latitude), t[2] = e.height) : "x" in e ? (t[0] = n(e.x), t[1] = n(e.y), t[2] = e.z) : (t[0] = n(e[0]), t[1] = n(e[1]), t[2] = e[2]), t;
}
function L0(e, t = []) {
  return F0(e, t, Z._cartographicRadians ? Ts : _r);
}
function D0(e, t, n = Ts) {
  return "longitude" in t ? (t.longitude = n(e[0]), t.latitude = n(e[1]), t.height = e[2]) : "x" in t ? (t.x = n(e[0]), t.y = n(e[1]), t.z = e[2]) : (t[0] = n(e[0]), t[1] = n(e[1]), t[2] = e[2]), t;
}
function G0(e, t) {
  return D0(e, t, Z._cartographicRadians ? Ts : td);
}
const ao = 1e-14, N0 = new w(), ho = {
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
}, Hs = {
  north: [-1, 0, 0],
  east: [0, 1, 0],
  up: [0, 0, 1],
  south: [1, 0, 0],
  west: [0, -1, 0],
  down: [0, 0, -1]
}, Fe = {
  east: new w(),
  north: new w(),
  up: new w(),
  west: new w(),
  south: new w(),
  down: new w()
}, P0 = new w(), U0 = new w(), H0 = new w();
function uo(e, t, n, s, r, i) {
  const o = ho[t] && ho[t][n];
  J(o && (!s || s === o));
  let c, a, h;
  const u = N0.copy(r);
  if (Yt(u.x, 0, ao) && Yt(u.y, 0, ao)) {
    const f = Math.sign(u.z);
    c = P0.fromArray(Hs[t]), t !== "east" && t !== "west" && c.scale(f), a = U0.fromArray(Hs[n]), n !== "east" && n !== "west" && a.scale(f), h = H0.fromArray(Hs[s]), s !== "east" && s !== "west" && h.scale(f);
  } else {
    const {
      up: f,
      east: d,
      north: m
    } = Fe;
    d.set(-u.y, u.x, 0).normalize(), e.geodeticSurfaceNormal(u, f), m.copy(f).cross(d);
    const {
      down: g,
      west: A,
      south: p
    } = Fe;
    g.copy(f).scale(-1), A.copy(d).scale(-1), p.copy(m).scale(-1), c = Fe[t], a = Fe[n], h = Fe[s];
  }
  return i[0] = c.x, i[1] = c.y, i[2] = c.z, i[3] = 0, i[4] = a.x, i[5] = a.y, i[6] = a.z, i[7] = 0, i[8] = h.x, i[9] = h.y, i[10] = h.z, i[11] = 0, i[12] = u.x, i[13] = u.y, i[14] = u.z, i[15] = 1, i;
}
const Be = new w(), k0 = new w(), $0 = new w();
function V0(e, t, n = []) {
  const {
    oneOverRadii: s,
    oneOverRadiiSquared: r,
    centerToleranceSquared: i
  } = t;
  Be.from(e);
  const o = Be.x, c = Be.y, a = Be.z, h = s.x, u = s.y, l = s.z, f = o * o * h * h, d = c * c * u * u, m = a * a * l * l, g = f + d + m, A = Math.sqrt(1 / g);
  if (!Number.isFinite(A))
    return;
  const p = k0;
  if (p.copy(e).scale(A), g < i)
    return p.to(n);
  const C = r.x, T = r.y, E = r.z, b = $0;
  b.set(p.x * C * 2, p.y * T * 2, p.z * E * 2);
  let y = (1 - A) * Be.len() / (0.5 * b.len()), F = 0, x, I, v, D;
  do {
    y -= F, x = 1 / (1 + y * C), I = 1 / (1 + y * T), v = 1 / (1 + y * E);
    const N = x * x, G = I * I, S = v * v, z = N * x, se = G * I, $t = S * v;
    D = f * N + d * G + m * S - 1;
    const Lt = -2 * (f * z * C + d * se * T + m * $t * E);
    F = D / Lt;
  } while (Math.abs(D) > S0);
  return Be.scale([x, I, v]).to(n);
}
const bn = new w(), lo = new w(), J0 = new w(), _t = new w(), W0 = new w(), wn = new w();
let rs = class {
  constructor(t = 0, n = 0, s = 0) {
    L(this, "radii", void 0), L(this, "radiiSquared", void 0), L(this, "radiiToTheFourth", void 0), L(this, "oneOverRadii", void 0), L(this, "oneOverRadiiSquared", void 0), L(this, "minimumRadius", void 0), L(this, "maximumRadius", void 0), L(this, "centerToleranceSquared", R0), L(this, "squaredXOverSquaredZ", void 0), J(t >= 0), J(n >= 0), J(s >= 0), this.radii = new w(t, n, s), this.radiiSquared = new w(t * t, n * n, s * s), this.radiiToTheFourth = new w(t * t * t * t, n * n * n * n, s * s * s * s), this.oneOverRadii = new w(t === 0 ? 0 : 1 / t, n === 0 ? 0 : 1 / n, s === 0 ? 0 : 1 / s), this.oneOverRadiiSquared = new w(t === 0 ? 0 : 1 / (t * t), n === 0 ? 0 : 1 / (n * n), s === 0 ? 0 : 1 / (s * s)), this.minimumRadius = Math.min(t, n, s), this.maximumRadius = Math.max(t, n, s), this.radiiSquared.z !== 0 && (this.squaredXOverSquaredZ = this.radiiSquared.x / this.radiiSquared.z), Object.freeze(this);
  }
  equals(t) {
    return this === t || !!(t && this.radii.equals(t.radii));
  }
  toString() {
    return this.radii.toString();
  }
  cartographicToCartesian(t, n = [0, 0, 0]) {
    const s = lo, r = J0, [, , i] = t;
    this.geodeticSurfaceNormalCartographic(t, s), r.copy(this.radiiSquared).scale(s);
    const o = Math.sqrt(s.dot(r));
    return r.scale(1 / o), s.scale(i), r.add(s), r.to(n);
  }
  cartesianToCartographic(t, n = [0, 0, 0]) {
    wn.from(t);
    const s = this.scaleToGeodeticSurface(wn, _t);
    if (!s)
      return;
    const r = this.geodeticSurfaceNormal(s, lo), i = W0;
    i.copy(wn).subtract(s);
    const o = Math.atan2(r.y, r.x), c = Math.asin(r.z), a = Math.sign(si(i, wn)) * ka(i);
    return G0([o, c, a], n);
  }
  eastNorthUpToFixedFrame(t, n = new Tt()) {
    return uo(this, "east", "north", "up", t, n);
  }
  localFrameToFixedFrame(t, n, s, r, i = new Tt()) {
    return uo(this, t, n, s, r, i);
  }
  geocentricSurfaceNormal(t, n = [0, 0, 0]) {
    return bn.from(t).normalize().to(n);
  }
  geodeticSurfaceNormalCartographic(t, n = [0, 0, 0]) {
    const s = L0(t), r = s[0], i = s[1], o = Math.cos(i);
    return bn.set(o * Math.cos(r), o * Math.sin(r), Math.sin(i)).normalize(), bn.to(n);
  }
  geodeticSurfaceNormal(t, n = [0, 0, 0]) {
    return bn.from(t).scale(this.oneOverRadiiSquared).normalize().to(n);
  }
  scaleToGeodeticSurface(t, n) {
    return V0(t, this, n);
  }
  scaleToGeocentricSurface(t, n = [0, 0, 0]) {
    _t.from(t);
    const s = _t.x, r = _t.y, i = _t.z, o = this.oneOverRadiiSquared, c = 1 / Math.sqrt(s * s * o.x + r * r * o.y + i * i * o.z);
    return _t.multiplyScalar(c).to(n);
  }
  transformPositionToScaledSpace(t, n = [0, 0, 0]) {
    return _t.from(t).scale(this.oneOverRadii).to(n);
  }
  transformPositionFromScaledSpace(t, n = [0, 0, 0]) {
    return _t.from(t).scale(this.radii).to(n);
  }
  getSurfaceNormalIntersectionWithZAxis(t, n = 0, s = [0, 0, 0]) {
    J(Yt(this.radii.x, this.radii.y, Xa)), J(this.radii.z > 0), _t.from(t);
    const r = _t.z * (1 - this.squaredXOverSquaredZ);
    if (!(Math.abs(r) >= this.radii.z - n))
      return _t.set(0, 0, r).to(s);
  }
};
L(rs, "WGS84", new rs(O0, v0, x0));
const mt = {
  OUTSIDE: -1,
  INTERSECTING: 0,
  INSIDE: 1
};
new w();
new w();
const Le = new w(), fo = new w();
let z0 = class Qa {
  constructor(t = [0, 0, 0], n = 0) {
    L(this, "center", void 0), L(this, "radius", void 0), this.radius = -0, this.center = new w(), this.fromCenterRadius(t, n);
  }
  fromCenterRadius(t, n) {
    return this.center.from(t), this.radius = n, this;
  }
  fromCornerPoints(t, n) {
    return n = Le.from(n), this.center = new w().from(t).add(n).scale(0.5), this.radius = this.center.distance(n), this;
  }
  equals(t) {
    return this === t || !!t && this.center.equals(t.center) && this.radius === t.radius;
  }
  clone() {
    return new Qa(this.center, this.radius);
  }
  union(t) {
    const n = this.center, s = this.radius, r = t.center, i = t.radius, o = Le.copy(r).subtract(n), c = o.magnitude();
    if (s >= c + i)
      return this.clone();
    if (i >= c + s)
      return t.clone();
    const a = (s + c + i) * 0.5;
    return fo.copy(o).scale((-s + a) / c).add(n), this.center.copy(fo), this.radius = a, this;
  }
  expand(t) {
    const s = Le.from(t).subtract(this.center).magnitude();
    return s > this.radius && (this.radius = s), this;
  }
  transform(t) {
    this.center.transform(t);
    const n = Hd(Le, t);
    return this.radius = Math.max(n[0], Math.max(n[1], n[2])) * this.radius, this;
  }
  distanceSquaredTo(t) {
    const n = this.distanceTo(t);
    return n * n;
  }
  distanceTo(t) {
    const s = Le.from(t).subtract(this.center);
    return Math.max(0, s.len() - this.radius);
  }
  intersectPlane(t) {
    const n = this.center, s = this.radius, i = t.normal.dot(n) + t.distance;
    return i < -s ? mt.OUTSIDE : i < s ? mt.INTERSECTING : mt.INSIDE;
  }
};
const j0 = new w(), K0 = new w(), _n = new w(), Mn = new w(), Rn = new w(), q0 = new w(), X0 = new w(), Jt = {
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
let Q0 = class Ya {
  constructor(t = [0, 0, 0], n = [0, 0, 0, 0, 0, 0, 0, 0, 0]) {
    L(this, "center", void 0), L(this, "halfAxes", void 0), this.center = new w().from(t), this.halfAxes = new K(n);
  }
  get halfSize() {
    const t = this.halfAxes.getColumn(0), n = this.halfAxes.getColumn(1), s = this.halfAxes.getColumn(2);
    return [new w(t).len(), new w(n).len(), new w(s).len()];
  }
  get quaternion() {
    const t = this.halfAxes.getColumn(0), n = this.halfAxes.getColumn(1), s = this.halfAxes.getColumn(2), r = new w(t).normalize(), i = new w(n).normalize(), o = new w(s).normalize();
    return new Sr().fromMatrix3(new K([...r, ...i, ...o]));
  }
  fromCenterHalfSizeQuaternion(t, n, s) {
    const r = new Sr(s), i = new K().fromQuaternion(r);
    return i[0] = i[0] * n[0], i[1] = i[1] * n[0], i[2] = i[2] * n[0], i[3] = i[3] * n[1], i[4] = i[4] * n[1], i[5] = i[5] * n[1], i[6] = i[6] * n[2], i[7] = i[7] * n[2], i[8] = i[8] * n[2], this.center = new w().from(t), this.halfAxes = i, this;
  }
  clone() {
    return new Ya(this.center, this.halfAxes);
  }
  equals(t) {
    return this === t || !!t && this.center.equals(t.center) && this.halfAxes.equals(t.halfAxes);
  }
  getBoundingSphere(t = new z0()) {
    const n = this.halfAxes, s = n.getColumn(0, _n), r = n.getColumn(1, Mn), i = n.getColumn(2, Rn), o = j0.copy(s).add(r).add(i);
    return t.center.copy(this.center), t.radius = o.magnitude(), t;
  }
  intersectPlane(t) {
    const n = this.center, s = t.normal, r = this.halfAxes, i = s.x, o = s.y, c = s.z, a = Math.abs(i * r[Jt.COLUMN0ROW0] + o * r[Jt.COLUMN0ROW1] + c * r[Jt.COLUMN0ROW2]) + Math.abs(i * r[Jt.COLUMN1ROW0] + o * r[Jt.COLUMN1ROW1] + c * r[Jt.COLUMN1ROW2]) + Math.abs(i * r[Jt.COLUMN2ROW0] + o * r[Jt.COLUMN2ROW1] + c * r[Jt.COLUMN2ROW2]), h = s.dot(n) + t.distance;
    return h <= -a ? mt.OUTSIDE : h >= a ? mt.INSIDE : mt.INTERSECTING;
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceSquaredTo(t));
  }
  distanceSquaredTo(t) {
    const n = K0.from(t).subtract(this.center), s = this.halfAxes, r = s.getColumn(0, _n), i = s.getColumn(1, Mn), o = s.getColumn(2, Rn), c = r.magnitude(), a = i.magnitude(), h = o.magnitude();
    r.normalize(), i.normalize(), o.normalize();
    let u = 0, l;
    return l = Math.abs(n.dot(r)) - c, l > 0 && (u += l * l), l = Math.abs(n.dot(i)) - a, l > 0 && (u += l * l), l = Math.abs(n.dot(o)) - h, l > 0 && (u += l * l), u;
  }
  computePlaneDistances(t, n, s = [-0, -0]) {
    let r = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
    const o = this.center, c = this.halfAxes, a = c.getColumn(0, _n), h = c.getColumn(1, Mn), u = c.getColumn(2, Rn), l = q0.copy(a).add(h).add(u).add(o), f = X0.copy(l).subtract(t);
    let d = n.dot(f);
    return r = Math.min(d, r), i = Math.max(d, i), l.copy(o).add(a).add(h).subtract(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), l.copy(o).add(a).subtract(h).add(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), l.copy(o).add(a).subtract(h).subtract(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(l).subtract(a).add(h).add(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(l).subtract(a).add(h).subtract(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(l).subtract(a).subtract(h).add(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(l).subtract(a).subtract(h).subtract(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), s[0] = r, s[1] = i, s;
  }
  transform(t) {
    this.center.transformAsPoint(t);
    const n = this.halfAxes.getColumn(0, _n);
    n.transformAsPoint(t);
    const s = this.halfAxes.getColumn(1, Mn);
    s.transformAsPoint(t);
    const r = this.halfAxes.getColumn(2, Rn);
    return r.transformAsPoint(t), this.halfAxes = new K([...n, ...s, ...r]), this;
  }
  getTransform() {
    throw new Error("not implemented");
  }
};
const mo = new w(), go = new w();
let Nt = class Za {
  constructor(t = [0, 0, 1], n = 0) {
    L(this, "normal", void 0), L(this, "distance", void 0), this.normal = new w(), this.distance = -0, this.fromNormalDistance(t, n);
  }
  fromNormalDistance(t, n) {
    return J(Number.isFinite(n)), this.normal.from(t).normalize(), this.distance = n, this;
  }
  fromPointNormal(t, n) {
    t = mo.from(t), this.normal.from(n).normalize();
    const s = -this.normal.dot(t);
    return this.distance = s, this;
  }
  fromCoefficients(t, n, s, r) {
    return this.normal.set(t, n, s), J(Yt(this.normal.len(), 1)), this.distance = r, this;
  }
  clone() {
    return new Za(this.normal, this.distance);
  }
  equals(t) {
    return Yt(this.distance, t.distance) && Yt(this.normal, t.normal);
  }
  getPointDistance(t) {
    return this.normal.dot(t) + this.distance;
  }
  transform(t) {
    const n = go.copy(this.normal).transformAsVector(t).normalize(), s = this.normal.scale(-this.distance).transform(t);
    return this.fromPointNormal(s, n);
  }
  projectPointOntoPlane(t, n = [0, 0, 0]) {
    const s = mo.from(t), r = this.getPointDistance(s), i = go.copy(this.normal).scale(r);
    return s.subtract(i).to(n);
  }
};
const Ao = [new w([1, 0, 0]), new w([0, 1, 0]), new w([0, 0, 1])], po = new w(), Y0 = new w();
let cn = class Ve {
  constructor(t = []) {
    L(this, "planes", void 0), this.planes = t;
  }
  fromBoundingSphere(t) {
    this.planes.length = 2 * Ao.length;
    const n = t.center, s = t.radius;
    let r = 0;
    for (const i of Ao) {
      let o = this.planes[r], c = this.planes[r + 1];
      o || (o = this.planes[r] = new Nt()), c || (c = this.planes[r + 1] = new Nt());
      const a = po.copy(i).scale(-s).add(n);
      o.fromPointNormal(a, i);
      const h = po.copy(i).scale(s).add(n), u = Y0.copy(i).negate();
      c.fromPointNormal(h, u), r += 2;
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
    if (J(Number.isFinite(n), "parentPlaneMask is required."), n === Ve.MASK_OUTSIDE || n === Ve.MASK_INSIDE)
      return n;
    let s = Ve.MASK_INSIDE;
    const r = this.planes;
    for (let i = 0; i < this.planes.length; ++i) {
      const o = i < 31 ? 1 << i : 0;
      if (i < 31 && !(n & o))
        continue;
      const c = r[i], a = t.intersectPlane(c);
      if (a === mt.OUTSIDE)
        return Ve.MASK_OUTSIDE;
      a === mt.INTERSECTING && (s |= o);
    }
    return s;
  }
};
L(cn, "MASK_OUTSIDE", 4294967295);
L(cn, "MASK_INSIDE", 0);
L(cn, "MASK_INDETERMINATE", 2147483647);
const Z0 = new w(), tm = new w(), em = new w(), nm = new w(), sm = new w();
class is {
  constructor(t = {}) {
    L(this, "left", void 0), L(this, "_left", void 0), L(this, "right", void 0), L(this, "_right", void 0), L(this, "top", void 0), L(this, "_top", void 0), L(this, "bottom", void 0), L(this, "_bottom", void 0), L(this, "near", void 0), L(this, "_near", void 0), L(this, "far", void 0), L(this, "_far", void 0), L(this, "_cullingVolume", new cn([new Nt(), new Nt(), new Nt(), new Nt(), new Nt(), new Nt()])), L(this, "_perspectiveMatrix", new Tt()), L(this, "_infinitePerspective", new Tt());
    const {
      near: n = 1,
      far: s = 5e8
    } = t;
    this.left = t.left, this._left = void 0, this.right = t.right, this._right = void 0, this.top = t.top, this._top = void 0, this.bottom = t.bottom, this._bottom = void 0, this.near = n, this._near = n, this.far = s, this._far = s;
  }
  clone() {
    return new is({
      right: this.right,
      left: this.left,
      top: this.top,
      bottom: this.bottom,
      near: this.near,
      far: this.far
    });
  }
  equals(t) {
    return t && t instanceof is && this.right === t.right && this.left === t.left && this.top === t.top && this.bottom === t.bottom && this.near === t.near && this.far === t.far;
  }
  get projectionMatrix() {
    return this._update(), this._perspectiveMatrix;
  }
  get infiniteProjectionMatrix() {
    return this._update(), this._infinitePerspective;
  }
  computeCullingVolume(t, n, s) {
    J(t, "position is required."), J(n, "direction is required."), J(s, "up is required.");
    const r = this._cullingVolume.planes;
    s = Z0.copy(s).normalize();
    const i = tm.copy(n).cross(s).normalize(), o = em.copy(n).multiplyByScalar(this.near).add(t), c = nm.copy(n).multiplyByScalar(this.far).add(t);
    let a = sm;
    return a.copy(i).multiplyByScalar(this.left).add(o).subtract(t).cross(s), r[0].fromPointNormal(t, a), a.copy(i).multiplyByScalar(this.right).add(o).subtract(t).cross(s).negate(), r[1].fromPointNormal(t, a), a.copy(s).multiplyByScalar(this.bottom).add(o).subtract(t).cross(i).negate(), r[2].fromPointNormal(t, a), a.copy(s).multiplyByScalar(this.top).add(o).subtract(t).cross(i), r[3].fromPointNormal(t, a), a = new w().copy(n), r[4].fromPointNormal(o, a), a.negate(), r[5].fromPointNormal(c, a), this._cullingVolume;
  }
  getPixelDimensions(t, n, s, r) {
    this._update(), J(Number.isFinite(t) && Number.isFinite(n)), J(t > 0), J(n > 0), J(s > 0), J(r);
    const i = 1 / this.near;
    let o = this.top * i;
    const c = 2 * s * o / n;
    o = this.right * i;
    const a = 2 * s * o / t;
    return r.x = a, r.y = c, r;
  }
  _update() {
    J(Number.isFinite(this.right) && Number.isFinite(this.left) && Number.isFinite(this.top) && Number.isFinite(this.bottom) && Number.isFinite(this.near) && Number.isFinite(this.far));
    const {
      top: t,
      bottom: n,
      right: s,
      left: r,
      near: i,
      far: o
    } = this;
    (t !== this._top || n !== this._bottom || r !== this._left || s !== this._right || i !== this._near || o !== this._far) && (J(this.near > 0 && this.near < this.far, "near must be greater than zero and less than far."), this._left = r, this._right = s, this._top = t, this._bottom = n, this._near = i, this._far = o, this._perspectiveMatrix = new Tt().frustum({
      left: r,
      right: s,
      bottom: n,
      top: t,
      near: i,
      far: o
    }), this._infinitePerspective = new Tt().frustum({
      left: r,
      right: s,
      bottom: n,
      top: t,
      near: i,
      far: 1 / 0
    }));
  }
}
const rm = (e) => e !== null && typeof e < "u";
class os {
  constructor(t = {}) {
    L(this, "_offCenterFrustum", new is()), L(this, "fov", void 0), L(this, "_fov", void 0), L(this, "_fovy", void 0), L(this, "_sseDenominator", void 0), L(this, "aspectRatio", void 0), L(this, "_aspectRatio", void 0), L(this, "near", void 0), L(this, "_near", void 0), L(this, "far", void 0), L(this, "_far", void 0), L(this, "xOffset", void 0), L(this, "_xOffset", void 0), L(this, "yOffset", void 0), L(this, "_yOffset", void 0);
    const {
      fov: n,
      aspectRatio: s,
      near: r = 1,
      far: i = 5e8,
      xOffset: o = 0,
      yOffset: c = 0
    } = t;
    this.fov = n, this.aspectRatio = s, this.near = r, this.far = i, this.xOffset = o, this.yOffset = c;
  }
  clone() {
    return new os({
      aspectRatio: this.aspectRatio,
      fov: this.fov,
      near: this.near,
      far: this.far
    });
  }
  equals(t) {
    return !rm(t) || !(t instanceof os) ? !1 : (this._update(), t._update(), this.fov === t.fov && this.aspectRatio === t.aspectRatio && this.near === t.near && this.far === t.far && this._offCenterFrustum.equals(t._offCenterFrustum));
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
    return this._update(), this._offCenterFrustum.getPixelDimensions(t, n, s, r || new Bs());
  }
  _update() {
    J(Number.isFinite(this.fov) && Number.isFinite(this.aspectRatio) && Number.isFinite(this.near) && Number.isFinite(this.far));
    const t = this._offCenterFrustum;
    (this.fov !== this._fov || this.aspectRatio !== this._aspectRatio || this.near !== this._near || this.far !== this._far || this.xOffset !== this._xOffset || this.yOffset !== this._yOffset) && (J(this.fov >= 0 && this.fov < Math.PI), J(this.aspectRatio > 0), J(this.near >= 0 && this.near < this.far), this._aspectRatio = this.aspectRatio, this._fov = this.fov, this._fovy = this.aspectRatio <= 1 ? this.fov : Math.atan(Math.tan(this.fov * 0.5) / this.aspectRatio) * 2, this._near = this.near, this._far = this.far, this._sseDenominator = 2 * Math.tan(0.5 * this._fovy), this._xOffset = this.xOffset, this._yOffset = this.yOffset, t.top = this.near * Math.tan(0.5 * this._fovy), t.bottom = -t.top, t.right = this.aspectRatio * t.top, t.left = -t.right, t.near = this.near, t.far = this.far, t.right += this.xOffset, t.left += this.xOffset, t.top += this.yOffset, t.bottom += this.yOffset);
  }
}
new w();
new w();
new w();
new w();
new w();
new w();
new w();
new w();
new w();
new w();
new w();
new w();
const Dt = new K(), im = new K(), om = new K(), Sn = new K(), yo = new K();
function cm(e, t = {}) {
  const n = I0, s = 10;
  let r = 0, i = 0;
  const o = im, c = om;
  o.identity(), c.copy(e);
  const a = n * am(c);
  for (; i < s && hm(c) > a; )
    um(c, Sn), yo.copy(Sn).transpose(), c.multiplyRight(Sn), c.multiplyLeft(yo), o.multiplyRight(Sn), ++r > 2 && (++i, r = 0);
  return t.unitary = o.toTarget(t.unitary), t.diagonal = c.toTarget(t.diagonal), t;
}
function am(e) {
  let t = 0;
  for (let n = 0; n < 9; ++n) {
    const s = e[n];
    t += s * s;
  }
  return Math.sqrt(t);
}
const Ir = [1, 0, 0], Or = [2, 2, 1];
function hm(e) {
  let t = 0;
  for (let n = 0; n < 3; ++n) {
    const s = e[Dt.getElementIndex(Or[n], Ir[n])];
    t += 2 * s * s;
  }
  return Math.sqrt(t);
}
function um(e, t) {
  const n = Xa;
  let s = 0, r = 1;
  for (let h = 0; h < 3; ++h) {
    const u = Math.abs(e[Dt.getElementIndex(Or[h], Ir[h])]);
    u > s && (r = h, s = u);
  }
  const i = Ir[r], o = Or[r];
  let c = 1, a = 0;
  if (Math.abs(e[Dt.getElementIndex(o, i)]) > n) {
    const h = e[Dt.getElementIndex(o, o)], u = e[Dt.getElementIndex(i, i)], l = e[Dt.getElementIndex(o, i)], f = (h - u) / 2 / l;
    let d;
    f < 0 ? d = -1 / (-f + Math.sqrt(1 + f * f)) : d = 1 / (f + Math.sqrt(1 + f * f)), c = 1 / Math.sqrt(1 + d * d), a = d * c;
  }
  return K.IDENTITY.to(t), t[Dt.getElementIndex(i, i)] = t[Dt.getElementIndex(o, o)] = c, t[Dt.getElementIndex(o, i)] = a, t[Dt.getElementIndex(i, o)] = -a, t;
}
const Xt = new w(), lm = new w(), fm = new w(), dm = new w(), mm = new w(), gm = new K(), Am = {
  diagonal: new K(),
  unitary: new K()
};
function pm(e, t = new Q0()) {
  if (!e || e.length === 0)
    return t.halfAxes = new K([0, 0, 0, 0, 0, 0, 0, 0, 0]), t.center = new w(), t;
  const n = e.length, s = new w(0, 0, 0);
  for (const I of e)
    s.add(I);
  const r = 1 / n;
  s.multiplyByScalar(r);
  let i = 0, o = 0, c = 0, a = 0, h = 0, u = 0;
  for (const I of e) {
    const v = Xt.copy(I).subtract(s);
    i += v.x * v.x, o += v.x * v.y, c += v.x * v.z, a += v.y * v.y, h += v.y * v.z, u += v.z * v.z;
  }
  i *= r, o *= r, c *= r, a *= r, h *= r, u *= r;
  const l = gm;
  l[0] = i, l[1] = o, l[2] = c, l[3] = o, l[4] = a, l[5] = h, l[6] = c, l[7] = h, l[8] = u;
  const {
    unitary: f
  } = cm(l, Am), d = t.halfAxes.copy(f);
  let m = d.getColumn(0, fm), g = d.getColumn(1, dm), A = d.getColumn(2, mm), p = -Number.MAX_VALUE, C = -Number.MAX_VALUE, T = -Number.MAX_VALUE, E = Number.MAX_VALUE, b = Number.MAX_VALUE, y = Number.MAX_VALUE;
  for (const I of e)
    Xt.copy(I), p = Math.max(Xt.dot(m), p), C = Math.max(Xt.dot(g), C), T = Math.max(Xt.dot(A), T), E = Math.min(Xt.dot(m), E), b = Math.min(Xt.dot(g), b), y = Math.min(Xt.dot(A), y);
  m = m.multiplyByScalar(0.5 * (E + p)), g = g.multiplyByScalar(0.5 * (b + C)), A = A.multiplyByScalar(0.5 * (y + T)), t.center.copy(m).add(g).add(A);
  const F = lm.set(p - E, C - b, T - y).multiplyByScalar(0.5), x = new K([F[0], 0, 0, 0, F[1], 0, 0, 0, F[2]]);
  return t.halfAxes.multiplyRight(x), t;
}
let Bo = function(e) {
  return e[e.ADD = 1] = "ADD", e[e.REPLACE = 2] = "REPLACE", e;
}({}), In = function(e) {
  return e.EMPTY = "empty", e.SCENEGRAPH = "scenegraph", e.POINTCLOUD = "pointcloud", e.MESH = "mesh", e;
}({}), ym = function(e) {
  return e.I3S = "I3S", e.TILES3D = "TILES3D", e;
}({}), Es = function(e) {
  return e.GEOMETRIC_ERROR = "geometricError", e.MAX_SCREEN_THRESHOLD = "maxScreenThreshold", e;
}({});
const th = "4.1.0-alpha.5", De = {
  COMPOSITE: "cmpt",
  POINT_CLOUD: "pnts",
  BATCHED_3D_MODEL: "b3dm",
  INSTANCED_3D_MODEL: "i3dm",
  GEOMETRY: "geom",
  VECTOR: "vect",
  GLTF: "glTF"
};
function eh(e, t, n) {
  ht(e instanceof ArrayBuffer);
  const s = new TextDecoder("utf8"), r = new Uint8Array(e, t, n);
  return s.decode(r);
}
function Bm(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  const n = new DataView(e);
  return `${String.fromCharCode(n.getUint8(t + 0))}${String.fromCharCode(n.getUint8(t + 1))}${String.fromCharCode(n.getUint8(t + 2))}${String.fromCharCode(n.getUint8(t + 3))}`;
}
const Tm = "4.1.0-alpha.5", Em = {
  name: "Draco",
  id: "draco",
  module: "draco",
  version: Tm,
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
function Cm(e, t, n) {
  const s = nh(t.metadata), r = [], i = bm(t.attributes);
  for (const o in e) {
    const c = e[o], a = To(o, c, i[o]);
    r.push(a);
  }
  if (n) {
    const o = To("indices", n);
    r.push(o);
  }
  return {
    fields: r,
    metadata: s
  };
}
function bm(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    t[s.name || "undefined"] = s;
  }
  return t;
}
function To(e, t, n) {
  const s = n ? nh(n.metadata) : void 0;
  return Vf(e, t, s);
}
function nh(e) {
  Object.entries(e);
  const t = {};
  for (const n in e)
    t[`${n}.string`] = JSON.stringify(e[n]);
  return t;
}
const Eo = {
  POSITION: "POSITION",
  NORMAL: "NORMAL",
  COLOR: "COLOR_0",
  TEX_COORD: "TEXCOORD_0"
}, wm = {
  1: Int8Array,
  2: Uint8Array,
  3: Int16Array,
  4: Uint16Array,
  5: Int32Array,
  6: Uint32Array,
  9: Float32Array
}, _m = 4;
class Mm {
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
      const c = this._getDracoLoaderData(i, r, n), a = this._getMeshData(i, c, n), h = $f(a.attributes), u = Cm(a.attributes, c, a.indices);
      return {
        loader: "draco",
        loaderData: c,
        header: {
          vertexCount: i.num_points(),
          boundingBox: h
        },
        ...a,
        schema: u
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
      const c = this._getQuantizationTransform(i, n);
      c && (s[i.unique_id()].quantization_transform = c);
      const a = this._getOctahedronTransform(i, n);
      a && (s[i.unique_id()].octahedron_transform = a);
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
        value: c,
        size: a
      } = this._getAttributeValues(n, i);
      r[o] = {
        value: c,
        size: a,
        byteOffset: i.byte_offset,
        byteStride: i.byte_stride,
        normalized: i.normalized
      };
    }
    return r;
  }
  _getTriangleListIndices(t) {
    const s = t.num_faces() * 3, r = s * _m, i = this.draco._malloc(r);
    try {
      return this.decoder.GetTrianglesUInt32Array(t, r, i), new Uint32Array(this.draco.HEAPF32.buffer, i, s).slice();
    } finally {
      this.draco._free(i);
    }
  }
  _getTriangleStripIndices(t) {
    const n = new this.draco.DracoInt32Array();
    try {
      return this.decoder.GetTriangleStripsFromMesh(t, n), Im(n);
    } finally {
      this.draco.destroy(n);
    }
  }
  _getAttributeValues(t, n) {
    const s = wm[n.data_type], r = n.num_components, o = t.num_points() * r, c = o * s.BYTES_PER_ELEMENT, a = Rm(this.draco, s);
    let h;
    const u = this.draco._malloc(c);
    try {
      const l = this.decoder.GetAttribute(t, n.attribute_index);
      this.decoder.GetAttributeDataArrayForAllPoints(t, l, a, c, u), h = new s(this.draco.HEAPF32.buffer, u, o).slice();
    } finally {
      this.draco._free(u);
    }
    return {
      value: h,
      size: r
    };
  }
  _deduceAttributeName(t, n) {
    const s = t.unique_id;
    for (const [o, c] of Object.entries(n.extraAttributes || {}))
      if (c === s)
        return o;
    const r = t.attribute_type;
    for (const o in Eo)
      if (this.draco[o] === r)
        return Eo[o];
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
      const r = Sm(s);
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
            min_values: new Float32Array([1, 2, 3]).map((c) => o.min_value(c))
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
function Rm(e, t) {
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
function Sm(e) {
  const t = e.size(), n = new Int32Array(t);
  for (let s = 0; s < t; s++)
    n[s] = e.GetValue(s);
  return n;
}
function Im(e) {
  const t = e.size(), n = new Int32Array(t);
  for (let s = 0; s < t; s++)
    n[s] = e.GetValue(s);
  return n;
}
function Om() {
  var e;
  return (e = globalThis._loadersgl_) !== null && e !== void 0 && e.version || (globalThis._loadersgl_ = globalThis._loadersgl_ || {}, globalThis._loadersgl_.version = "4.1.0-alpha.5"), globalThis._loadersgl_.version;
}
const vm = Om();
function xm(e, t) {
  if (!e)
    throw new Error(t || "loaders.gl assertion failed.");
}
const an = typeof process != "object" || String(process) !== "[object process]" || process.browser, ii = typeof importScripts == "function", Co = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
Co && parseFloat(Co[1]);
const ks = {};
async function $s(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  return t && (e = Fm(e, t, n, s)), ks[e] = ks[e] || Lm(e), await ks[e];
}
function Fm(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  if (!n.useLocalLibraries && e.startsWith("http"))
    return e;
  s = s || e;
  const r = n.modules || {};
  return r[s] ? r[s] : an ? n.CDN ? (xm(n.CDN.startsWith("http")), `${n.CDN}/${t}@${vm}/dist/libs/${s}`) : ii ? `../src/libs/${s}` : `modules/${t}/src/libs/${s}` : `modules/${t}/dist/libs/${s}`;
}
async function Lm(e) {
  if (e.endsWith("wasm"))
    return await Gm(e);
  if (!an)
    try {
      return pa && void 0;
    } catch (n) {
      return console.error(n), null;
    }
  if (ii)
    return importScripts(e);
  const t = await Nm(e);
  return Dm(t, e);
}
function Dm(e, t) {
  if (!an)
    return;
  if (ii)
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
async function Gm(e) {
  return await (await fetch(e)).arrayBuffer();
}
async function Nm(e) {
  return await (await fetch(e)).text();
}
const Pm = "1.5.6", Um = "1.4.1", Vs = `https://www.gstatic.com/draco/versioned/decoders/${Pm}`, ut = {
  DECODER: "draco_wasm_wrapper.js",
  DECODER_WASM: "draco_decoder.wasm",
  FALLBACK_DECODER: "draco_decoder.js",
  ENCODER: "draco_encoder.js"
}, Js = {
  [ut.DECODER]: `${Vs}/${ut.DECODER}`,
  [ut.DECODER_WASM]: `${Vs}/${ut.DECODER_WASM}`,
  [ut.FALLBACK_DECODER]: `${Vs}/${ut.FALLBACK_DECODER}`,
  [ut.ENCODER]: `https://raw.githubusercontent.com/google/draco/${Um}/javascript/${ut.ENCODER}`
};
let Ge;
async function Hm(e) {
  const t = e.modules || {};
  return t.draco3d ? Ge = Ge || t.draco3d.createDecoderModule({}).then((n) => ({
    draco: n
  })) : Ge = Ge || km(e), await Ge;
}
async function km(e) {
  let t, n;
  switch (e.draco && e.draco.decoderType) {
    case "js":
      t = await $s(Js[ut.FALLBACK_DECODER], "draco", e, ut.FALLBACK_DECODER);
      break;
    case "wasm":
    default:
      [t, n] = await Promise.all([await $s(Js[ut.DECODER], "draco", e, ut.DECODER), await $s(Js[ut.DECODER_WASM], "draco", e, ut.DECODER_WASM)]);
  }
  return t = t || globalThis.DracoDecoderModule, await $m(t, n);
}
function $m(e, t) {
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
const sh = {
  ...Em,
  parse: Vm
};
async function Vm(e, t) {
  const {
    draco: n
  } = await Hm(t), s = new Mm(n);
  try {
    return s.parseSync(e, t == null ? void 0 : t.draco);
  } finally {
    s.destroy();
  }
}
const Jm = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, X = {
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  INT: 5124,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,
  DOUBLE: 5130
}, U = {
  ...Jm,
  ...X
}, Ws = {
  [X.DOUBLE]: Float64Array,
  [X.FLOAT]: Float32Array,
  [X.UNSIGNED_SHORT]: Uint16Array,
  [X.UNSIGNED_INT]: Uint32Array,
  [X.UNSIGNED_BYTE]: Uint8Array,
  [X.BYTE]: Int8Array,
  [X.SHORT]: Int16Array,
  [X.INT]: Int32Array
}, Wm = {
  DOUBLE: X.DOUBLE,
  FLOAT: X.FLOAT,
  UNSIGNED_SHORT: X.UNSIGNED_SHORT,
  UNSIGNED_INT: X.UNSIGNED_INT,
  UNSIGNED_BYTE: X.UNSIGNED_BYTE,
  BYTE: X.BYTE,
  SHORT: X.SHORT,
  INT: X.INT
}, zs = "Failed to convert GL type";
class kt {
  static fromTypedArray(t) {
    t = ArrayBuffer.isView(t) ? t.constructor : t;
    for (const n in Ws)
      if (Ws[n] === t)
        return n;
    throw new Error(zs);
  }
  static fromName(t) {
    const n = Wm[t];
    if (!n)
      throw new Error(zs);
    return n;
  }
  static getArrayType(t) {
    switch (t) {
      case X.UNSIGNED_SHORT_5_6_5:
      case X.UNSIGNED_SHORT_4_4_4_4:
      case X.UNSIGNED_SHORT_5_5_5_1:
        return Uint16Array;
      default:
        const n = Ws[t];
        if (!n)
          throw new Error(zs);
        return n;
    }
  }
  static getByteSize(t) {
    return kt.getArrayType(t).BYTES_PER_ELEMENT;
  }
  static validate(t) {
    return !!kt.getArrayType(t);
  }
  static createTypedArray(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, r = arguments.length > 3 ? arguments[3] : void 0;
    r === void 0 && (r = (n.byteLength - s) / kt.getByteSize(t));
    const i = kt.getArrayType(t);
    return new i(n, s, r);
  }
}
function zm(e, t) {
  if (!e)
    throw new Error(`math.gl assertion failed. ${t}`);
}
function jm(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [0, 0, 0];
  const n = e >> 11 & 31, s = e >> 5 & 63, r = e & 31;
  return t[0] = n << 3, t[1] = s << 2, t[2] = r << 3, t;
}
new Bs();
new w();
new Bs();
new Bs();
function bo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 255;
  return sd(e, 0, t) / t * 2 - 1;
}
function wo(e) {
  return e < 0 ? -1 : 1;
}
function Km(e, t, n, s) {
  if (zm(s), e < 0 || e > n || t < 0 || t > n)
    throw new Error(`x and y must be unsigned normalized integers between 0 and ${n}`);
  if (s.x = bo(e, n), s.y = bo(t, n), s.z = 1 - (Math.abs(s.x) + Math.abs(s.y)), s.z < 0) {
    const r = s.x;
    s.x = (1 - Math.abs(s.y)) * wo(r), s.y = (1 - Math.abs(r)) * wo(s.y);
  }
  return s.normalize();
}
function qm(e, t, n) {
  return Km(e, t, 255, n);
}
class oi {
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
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : U.UNSIGNED_INT, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    const r = this.json[t];
    return r && Number.isFinite(r.byteOffset) ? this._getTypedArrayFromBinary(t, n, s, 1, r.byteOffset) : r;
  }
  getPropertyArray(t, n, s) {
    const r = this.json[t];
    return r && Number.isFinite(r.byteOffset) ? ("componentType" in r && (n = kt.fromName(r.componentType)), this._getTypedArrayFromBinary(t, n, s, this.featuresLength, r.byteOffset)) : this._getTypedArrayFromArray(t, n, r);
  }
  getProperty(t, n, s, r, i) {
    const o = this.json[t];
    if (!o)
      return o;
    const c = this.getPropertyArray(t, n, s);
    if (s === 1)
      return c[r];
    for (let a = 0; a < s; ++a)
      i[a] = c[s * r + a];
    return i;
  }
  _getTypedArrayFromBinary(t, n, s, r, i) {
    const o = this._cachedTypedArrays;
    let c = o[t];
    return c || (c = kt.createTypedArray(n, this.buffer.buffer, this.buffer.byteOffset + i, r * s), o[t] = c), c;
  }
  _getTypedArrayFromArray(t, n, s) {
    const r = this._cachedTypedArrays;
    let i = r[t];
    return i || (i = kt.createTypedArray(n, s), r[t] = i), i;
  }
}
const Xm = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Qm = {
  SCALAR: (e, t) => e[t],
  VEC2: (e, t) => [e[2 * t + 0], e[2 * t + 1]],
  VEC3: (e, t) => [e[3 * t + 0], e[3 * t + 1], e[3 * t + 2]],
  VEC4: (e, t) => [e[4 * t + 0], e[4 * t + 1], e[4 * t + 2], e[4 * t + 3]],
  MAT2: (e, t) => [e[4 * t + 0], e[4 * t + 1], e[4 * t + 2], e[4 * t + 3]],
  MAT3: (e, t) => [e[9 * t + 0], e[9 * t + 1], e[9 * t + 2], e[9 * t + 3], e[9 * t + 4], e[9 * t + 5], e[9 * t + 6], e[9 * t + 7], e[9 * t + 8]],
  MAT4: (e, t) => [e[16 * t + 0], e[16 * t + 1], e[16 * t + 2], e[16 * t + 3], e[16 * t + 4], e[16 * t + 5], e[16 * t + 6], e[16 * t + 7], e[16 * t + 8], e[16 * t + 9], e[16 * t + 10], e[16 * t + 11], e[16 * t + 12], e[16 * t + 13], e[16 * t + 14], e[16 * t + 15]]
}, Ym = {
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
function Zm(e, t, n, s) {
  const {
    componentType: r
  } = e;
  ht(e.componentType);
  const i = typeof r == "string" ? kt.fromName(r) : r, o = Xm[e.type], c = Qm[e.type], a = Ym[e.type];
  return n += e.byteOffset, {
    values: kt.createTypedArray(i, t, n, o * s),
    type: i,
    size: o,
    unpacker: c,
    packer: a
  };
}
const Ut = (e) => e !== void 0;
function tg(e, t, n) {
  if (!t)
    return null;
  let s = e.getExtension("3DTILES_batch_table_hierarchy");
  const r = t.HIERARCHY;
  return r && (console.warn("3D Tile Parser: HIERARCHY is deprecated. Use 3DTILES_batch_table_hierarchy."), t.extensions = t.extensions || {}, t.extensions["3DTILES_batch_table_hierarchy"] = r, s = r), s ? eg(s, n) : null;
}
function eg(e, t) {
  let n, s, r;
  const i = e.instancesLength, o = e.classes;
  let c = e.classIds, a = e.parentCounts, h = e.parentIds, u = i;
  Ut(c.byteOffset) && (c.componentType = defaultValue(c.componentType, GL.UNSIGNED_SHORT), c.type = AttributeType.SCALAR, r = getBinaryAccessor(c), c = r.createArrayBufferView(t.buffer, t.byteOffset + c.byteOffset, i));
  let l;
  if (Ut(a))
    for (Ut(a.byteOffset) && (a.componentType = defaultValue(a.componentType, GL.UNSIGNED_SHORT), a.type = AttributeType.SCALAR, r = getBinaryAccessor(a), a = r.createArrayBufferView(t.buffer, t.byteOffset + a.byteOffset, i)), l = new Uint16Array(i), u = 0, n = 0; n < i; ++n)
      l[n] = u, u += a[n];
  Ut(h) && Ut(h.byteOffset) && (h.componentType = defaultValue(h.componentType, GL.UNSIGNED_SHORT), h.type = AttributeType.SCALAR, r = getBinaryAccessor(h), h = r.createArrayBufferView(t.buffer, t.byteOffset + h.byteOffset, u));
  const f = o.length;
  for (n = 0; n < f; ++n) {
    const A = o[n].length, p = o[n].instances, C = getBinaryProperties(A, p, t);
    o[n].instances = combine(C, p);
  }
  const d = new Array(f).fill(0), m = new Uint16Array(i);
  for (n = 0; n < i; ++n)
    s = c[n], m[n] = d[s], ++d[s];
  const g = {
    classes: o,
    classIds: c,
    classIndexes: m,
    parentCounts: a,
    parentIndexes: l,
    parentIds: h
  };
  return rg(g), g;
}
function Ne(e, t, n) {
  if (!e)
    return;
  const s = e.parentCounts;
  return e.parentIds ? n(e, t) : s > 0 ? ng(e, t, n) : sg(e, t, n);
}
function ng(e, t, n) {
  const s = e.classIds, r = e.parentCounts, i = e.parentIds, o = e.parentIndexes, c = s.length, a = scratchVisited;
  a.length = Math.max(a.length, c);
  const h = ++marker, u = scratchStack;
  for (u.length = 0, u.push(t); u.length > 0; ) {
    if (t = u.pop(), a[t] === h)
      continue;
    a[t] = h;
    const l = n(e, t);
    if (Ut(l))
      return l;
    const f = r[t], d = o[t];
    for (let m = 0; m < f; ++m) {
      const g = i[d + m];
      g !== t && u.push(g);
    }
  }
  return null;
}
function sg(e, t, n) {
  let s = !0;
  for (; s; ) {
    const r = n(e, t);
    if (Ut(r))
      return r;
    const i = e.parentIds[t];
    s = i !== t, t = i;
  }
  throw new Error("traverseHierarchySingleParent");
}
function rg(e) {
  const n = e.classIds.length;
  for (let s = 0; s < n; ++s)
    rh(e, s, stack);
}
function rh(e, t, n) {
  const s = e.parentCounts, r = e.parentIds, i = e.parentIndexes, c = e.classIds.length;
  if (!Ut(r))
    return;
  assert(t < c, `Parent index ${t} exceeds the total number of instances: ${c}`), assert(n.indexOf(t) === -1, "Circular dependency detected in the batch table hierarchy."), n.push(t);
  const a = Ut(s) ? s[t] : 1, h = Ut(s) ? i[t] : t;
  for (let u = 0; u < a; ++u) {
    const l = r[h + u];
    l !== t && rh(e, l, n);
  }
  n.pop(t);
}
function ct(e) {
  return e != null;
}
const On = (e, t) => e, ig = {
  HIERARCHY: !0,
  extensions: !0,
  extras: !0
};
class ih {
  constructor(t, n, s) {
    var r;
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    this.json = void 0, this.binary = void 0, this.featureCount = void 0, this._extensions = void 0, this._properties = void 0, this._binaryProperties = void 0, this._hierarchy = void 0, ht(s >= 0), this.json = t || {}, this.binary = n, this.featureCount = s, this._extensions = ((r = this.json) === null || r === void 0 ? void 0 : r.extensions) || {}, this._properties = {};
    for (const o in this.json)
      ig[o] || (this._properties[o] = this.json[o]);
    this._binaryProperties = this._initializeBinaryProperties(), i["3DTILES_batch_table_hierarchy"] && (this._hierarchy = tg(this, this.json, this.binary));
  }
  getExtension(t) {
    return this.json && this.json.extensions && this.json.extensions[t];
  }
  memorySizeInBytes() {
    return 0;
  }
  isClass(t, n) {
    if (this._checkBatchId(t), ht(typeof n == "string", n), this._hierarchy) {
      const s = Ne(this._hierarchy, t, (r, i) => {
        const o = r.classIds[i];
        return r.classes[o].name === n;
      });
      return ct(s);
    }
    return !1;
  }
  isExactClass(t, n) {
    return ht(typeof n == "string", n), this.getExactClassName(t) === n;
  }
  getExactClassName(t) {
    if (this._checkBatchId(t), this._hierarchy) {
      const n = this._hierarchy.classIds[t];
      return this._hierarchy.classes[n].name;
    }
  }
  hasProperty(t, n) {
    return this._checkBatchId(t), ht(typeof n == "string", n), ct(this._properties[n]) || this._hasPropertyInHierarchy(t, n);
  }
  getPropertyNames(t, n) {
    this._checkBatchId(t), n = ct(n) ? n : [], n.length = 0;
    const s = Object.keys(this._properties);
    return n.push(...s), this._hierarchy && this._getPropertyNamesInHierarchy(t, n), n;
  }
  getProperty(t, n) {
    if (this._checkBatchId(t), ht(typeof n == "string", n), this._binaryProperties) {
      const r = this._binaryProperties[n];
      if (ct(r))
        return this._getBinaryProperty(r, t);
    }
    const s = this._properties[n];
    if (ct(s))
      return On(s[t]);
    if (this._hierarchy) {
      const r = this._getHierarchyProperty(t, n);
      if (ct(r))
        return r;
    }
  }
  setProperty(t, n, s) {
    const r = this.featureCount;
    if (this._checkBatchId(t), ht(typeof n == "string", n), this._binaryProperties) {
      const o = this._binaryProperties[n];
      if (o) {
        this._setBinaryProperty(o, t, s);
        return;
      }
    }
    if (this._hierarchy && this._setHierarchyProperty(this, t, n, s))
      return;
    let i = this._properties[n];
    ct(i) || (this._properties[n] = new Array(r), i = this._properties[n]), i[t] = On(s);
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
      ht(this.binary, `Property ${t} requires a batch table binary.`), ht(s.type, `Property ${t} requires a type.`);
      const r = Zm(s, this.binary.buffer, this.binary.byteOffset | 0, this.featureCount);
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
    const s = Ne(this._hierarchy, t, (r, i) => {
      const o = r.classIds[i], c = r.classes[o].instances;
      return ct(c[n]);
    });
    return ct(s);
  }
  _getPropertyNamesInHierarchy(t, n) {
    Ne(this._hierarchy, t, (s, r) => {
      const i = s.classIds[r], o = s.classes[i].instances;
      for (const c in o)
        o.hasOwnProperty(c) && n.indexOf(c) === -1 && n.push(c);
    });
  }
  _getHierarchyProperty(t, n) {
    return Ne(this._hierarchy, t, (s, r) => {
      const i = s.classIds[r], o = s.classes[i], c = s.classIndexes[r], a = o.instances[n];
      return ct(a) ? ct(a.typedArray) ? this._getBinaryProperty(a, c) : On(a[c]) : null;
    });
  }
  _setHierarchyProperty(t, n, s, r) {
    const i = Ne(this._hierarchy, n, (o, c) => {
      const a = o.classIds[c], h = o.classes[a], u = o.classIndexes[c], l = h.instances[s];
      return ct(l) ? (ht(c === n, `Inherited property "${s}" is read-only.`), ct(l.typedArray) ? this._setBinaryProperty(l, u, r) : l[u] = On(r), !0) : !1;
    });
    return ct(i);
  }
}
const js = 4;
function Cs(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = new DataView(t);
  if (e.magic = s.getUint32(n, !0), n += js, e.version = s.getUint32(n, !0), n += js, e.byteLength = s.getUint32(n, !0), n += js, e.version !== 1)
    throw new Error(`3D Tile Version ${e.version} not supported`);
  return n;
}
const Te = 4, _o = "b3dm tile in legacy format.";
function ci(e, t, n) {
  const s = new DataView(t);
  let r;
  e.header = e.header || {};
  let i = s.getUint32(n, !0);
  n += Te;
  let o = s.getUint32(n, !0);
  n += Te;
  let c = s.getUint32(n, !0);
  n += Te;
  let a = s.getUint32(n, !0);
  return n += Te, c >= 570425344 ? (n -= Te * 2, r = i, c = o, a = 0, i = 0, o = 0, console.warn(_o)) : a >= 570425344 && (n -= Te, r = c, c = i, a = o, i = 0, o = 0, console.warn(_o)), e.header.featureTableJsonByteLength = i, e.header.featureTableBinaryByteLength = o, e.header.batchTableJsonByteLength = c, e.header.batchTableBinaryByteLength = a, e.header.batchLength = r, n;
}
function ai(e, t, n, s) {
  return n = og(e, t, n), n = cg(e, t, n), n;
}
function og(e, t, n, s) {
  const {
    featureTableJsonByteLength: r,
    featureTableBinaryByteLength: i,
    batchLength: o
  } = e.header || {};
  if (e.featureTableJson = {
    BATCH_LENGTH: o || 0
  }, r && r > 0) {
    const c = eh(t, n, r);
    e.featureTableJson = JSON.parse(c);
  }
  return n += r || 0, e.featureTableBinary = new Uint8Array(t, n, i), n += i || 0, n;
}
function cg(e, t, n, s) {
  const {
    batchTableJsonByteLength: r,
    batchTableBinaryByteLength: i
  } = e.header || {};
  if (r && r > 0) {
    const o = eh(t, n, r);
    e.batchTableJson = JSON.parse(o), n += r, i && i > 0 && (e.batchTableBinary = new Uint8Array(t, n, i), e.batchTableBinary = new Uint8Array(e.batchTableBinary), n += i);
  }
  return n;
}
function oh(e, t, n) {
  if (!t && (!e || !e.batchIds || !n))
    return null;
  const {
    batchIds: s,
    isRGB565: r,
    pointCount: i = 0
  } = e;
  if (s && n) {
    const o = new Uint8ClampedArray(i * 3);
    for (let c = 0; c < i; c++) {
      const a = s[c], u = n.getProperty(a, "dimensions").map((l) => l * 255);
      o[c * 3] = u[0], o[c * 3 + 1] = u[1], o[c * 3 + 2] = u[2];
    }
    return {
      type: U.UNSIGNED_BYTE,
      value: o,
      size: 3,
      normalized: !0
    };
  }
  if (t && r) {
    const o = new Uint8ClampedArray(i * 3);
    for (let c = 0; c < i; c++) {
      const a = jm(t[c]);
      o[c * 3] = a[0], o[c * 3 + 1] = a[1], o[c * 3 + 2] = a[2];
    }
    return {
      type: U.UNSIGNED_BYTE,
      value: o,
      size: 3,
      normalized: !0
    };
  }
  return t && t.length === i * 3 ? {
    type: U.UNSIGNED_BYTE,
    value: t,
    size: 3,
    normalized: !0
  } : {
    type: U.UNSIGNED_BYTE,
    value: t || new Uint8ClampedArray(),
    size: 4,
    normalized: !0
  };
}
const Mo = new w();
function ag(e, t) {
  if (!t)
    return null;
  if (e.isOctEncoded16P) {
    const n = new Float32Array((e.pointsLength || 0) * 3);
    for (let s = 0; s < (e.pointsLength || 0); s++)
      qm(t[s * 2], t[s * 2 + 1], Mo), Mo.toArray(n, s * 3);
    return {
      type: U.FLOAT,
      size: 2,
      value: n
    };
  }
  return {
    type: U.FLOAT,
    size: 2,
    value: t
  };
}
function hg(e, t, n) {
  return e.isQuantized ? n["3d-tiles"] && n["3d-tiles"].decodeQuantizedPositions ? (e.isQuantized = !1, ug(e, t)) : {
    type: U.UNSIGNED_SHORT,
    value: t,
    size: 3,
    normalized: !0
  } : t;
}
function ug(e, t) {
  const n = new w(), s = new Float32Array(e.pointCount * 3);
  for (let r = 0; r < e.pointCount; r++)
    n.set(t[r * 3], t[r * 3 + 1], t[r * 3 + 2]).scale(1 / e.quantizedRange).multiply(e.quantizedVolumeScale).add(e.quantizedVolumeOffset).toArray(s, r * 3);
  return s;
}
async function lg(e, t, n, s, r) {
  n = Cs(e, t, n), n = ci(e, t, n), n = ai(e, t, n), fg(e);
  const {
    featureTable: i,
    batchTable: o
  } = dg(e);
  return await yg(e, i, o, s, r), mg(e, i, s), gg(e, i, o), Ag(e, i), n;
}
function fg(e) {
  e.attributes = {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, e.isQuantized = !1, e.isTranslucent = !1, e.isRGB565 = !1, e.isOctEncoded16P = !1;
}
function dg(e) {
  const t = new oi(e.featureTableJson, e.featureTableBinary), n = t.getGlobalProperty("POINTS_LENGTH");
  if (!Number.isFinite(n))
    throw new Error("POINTS_LENGTH must be defined");
  t.featuresLength = n, e.featuresLength = n, e.pointsLength = n, e.pointCount = n, e.rtcCenter = t.getGlobalProperty("RTC_CENTER", U.FLOAT, 3);
  const s = pg(e, t);
  return {
    featureTable: t,
    batchTable: s
  };
}
function mg(e, t, n) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.positions) {
    if (t.hasProperty("POSITION"))
      e.attributes.positions = t.getPropertyArray("POSITION", U.FLOAT, 3);
    else if (t.hasProperty("POSITION_QUANTIZED")) {
      const s = t.getPropertyArray("POSITION_QUANTIZED", U.UNSIGNED_SHORT, 3);
      if (e.isQuantized = !0, e.quantizedRange = 65535, e.quantizedVolumeScale = t.getGlobalProperty("QUANTIZED_VOLUME_SCALE", U.FLOAT, 3), !e.quantizedVolumeScale)
        throw new Error("QUANTIZED_VOLUME_SCALE must be defined for quantized positions.");
      if (e.quantizedVolumeOffset = t.getGlobalProperty("QUANTIZED_VOLUME_OFFSET", U.FLOAT, 3), !e.quantizedVolumeOffset)
        throw new Error("QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.");
      e.attributes.positions = hg(e, s, n);
    }
  }
  if (!e.attributes.positions)
    throw new Error("Either POSITION or POSITION_QUANTIZED must be defined.");
}
function gg(e, t, n) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.colors) {
    let s = null;
    t.hasProperty("RGBA") ? (s = t.getPropertyArray("RGBA", U.UNSIGNED_BYTE, 4), e.isTranslucent = !0) : t.hasProperty("RGB") ? s = t.getPropertyArray("RGB", U.UNSIGNED_BYTE, 3) : t.hasProperty("RGB565") && (s = t.getPropertyArray("RGB565", U.UNSIGNED_SHORT, 1), e.isRGB565 = !0), e.attributes.colors = oh(e, s, n);
  }
  t.hasProperty("CONSTANT_RGBA") && (e.constantRGBA = t.getGlobalProperty("CONSTANT_RGBA", U.UNSIGNED_BYTE, 4));
}
function Ag(e, t) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.normals) {
    let n = null;
    t.hasProperty("NORMAL") ? n = t.getPropertyArray("NORMAL", U.FLOAT, 3) : t.hasProperty("NORMAL_OCT16P") && (n = t.getPropertyArray("NORMAL_OCT16P", U.UNSIGNED_BYTE, 2), e.isOctEncoded16P = !0), e.attributes.normals = ag(e, n);
  }
}
function pg(e, t) {
  let n = null;
  if (!e.batchIds && t.hasProperty("BATCH_ID") && (e.batchIds = t.getPropertyArray("BATCH_ID", U.UNSIGNED_SHORT, 1), e.batchIds)) {
    const s = t.getGlobalProperty("BATCH_LENGTH");
    if (!s)
      throw new Error("Global property: BATCH_LENGTH must be defined when BATCH_ID is defined.");
    const {
      batchTableJson: r,
      batchTableBinary: i
    } = e;
    n = new ih(r, i, s);
  }
  return n;
}
async function yg(e, t, n, s, r) {
  let i, o, c;
  const a = e.batchTableJson && e.batchTableJson.extensions && e.batchTableJson.extensions["3DTILES_draco_point_compression"];
  a && (c = a.properties);
  const h = t.getExtension("3DTILES_draco_point_compression");
  if (h) {
    o = h.properties;
    const l = h.byteOffset, f = h.byteLength;
    if (!o || !Number.isFinite(l) || !f)
      throw new Error("Draco properties, byteOffset, and byteLength must be defined");
    i = (e.featureTableBinary || []).slice(l, l + f), e.hasPositions = Number.isFinite(o.POSITION), e.hasColors = Number.isFinite(o.RGB) || Number.isFinite(o.RGBA), e.hasNormals = Number.isFinite(o.NORMAL), e.hasBatchIds = Number.isFinite(o.BATCH_ID), e.isTranslucent = Number.isFinite(o.RGBA);
  }
  if (!i)
    return !0;
  const u = {
    buffer: i,
    properties: {
      ...o,
      ...c
    },
    featureTableProperties: o,
    batchTableProperties: c,
    dequantizeInShader: !1
  };
  return await Bg(e, u, s, r);
}
async function Bg(e, t, n, s) {
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
  const i = await Zr(t.buffer, sh, r, s), o = i.attributes.POSITION && i.attributes.POSITION.value, c = i.attributes.COLOR_0 && i.attributes.COLOR_0.value, a = i.attributes.NORMAL && i.attributes.NORMAL.value, h = i.attributes.BATCH_ID && i.attributes.BATCH_ID.value, u = o && i.attributes.POSITION.value.quantization, l = a && i.attributes.NORMAL.value.quantization;
  if (u) {
    const d = i.POSITION.data.quantization, m = d.range;
    e.quantizedVolumeScale = new w(m, m, m), e.quantizedVolumeOffset = new w(d.minValues), e.quantizedRange = (1 << d.quantizationBits) - 1, e.isQuantizedDraco = !0;
  }
  l && (e.octEncodedRange = (1 << i.NORMAL.data.quantization.quantizationBits) - 1, e.isOctEncodedDraco = !0);
  const f = {};
  if (t.batchTableProperties)
    for (const d of Object.keys(t.batchTableProperties))
      i.attributes[d] && i.attributes[d].value && (f[d.toLowerCase()] = i.attributes[d].value);
  e.attributes = {
    positions: o,
    colors: oh(e, c, void 0),
    normals: a,
    batchIds: h,
    ...f
  };
}
const Tg = "4.1.0-alpha.5";
function ch(e, t) {
  if (!e)
    throw new Error(t || "loader assertion failed.");
}
const ah = !!(typeof process != "object" || String(process) !== "[object process]" || process.browser), Ro = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
Ro && parseFloat(Ro[1]);
var Ks;
const Eg = (Ks = globalThis.loaders) === null || Ks === void 0 ? void 0 : Ks.parseImageNode, vr = typeof Image < "u", xr = typeof ImageBitmap < "u", Cg = !!Eg, Fr = ah ? !0 : Cg;
function bg(e) {
  switch (e) {
    case "auto":
      return xr || vr || Fr;
    case "imagebitmap":
      return xr;
    case "image":
      return vr;
    case "data":
      return Fr;
    default:
      throw new Error(`@loaders.gl/images: image ${e} not supported in this environment`);
  }
}
function wg() {
  if (xr)
    return "imagebitmap";
  if (vr)
    return "image";
  if (Fr)
    return "data";
  throw new Error("Install '@loaders.gl/polyfills' to parse images under Node.js");
}
function _g(e) {
  const t = Mg(e);
  if (!t)
    throw new Error("Not an image");
  return t;
}
function hh(e) {
  switch (_g(e)) {
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
function Mg(e) {
  return typeof ImageBitmap < "u" && e instanceof ImageBitmap ? "imagebitmap" : typeof Image < "u" && e instanceof Image ? "image" : e && typeof e == "object" && e.data && e.width && e.height ? "data" : null;
}
const Rg = /^data:image\/svg\+xml/, Sg = /\.svg((\?|#).*)?$/;
function hi(e) {
  return e && (Rg.test(e) || Sg.test(e));
}
function Ig(e, t) {
  if (hi(t)) {
    let s = new TextDecoder().decode(e);
    try {
      typeof unescape == "function" && typeof encodeURIComponent == "function" && (s = unescape(encodeURIComponent(s)));
    } catch (i) {
      throw new Error(i.message);
    }
    return `data:image/svg+xml;base64,${btoa(s)}`;
  }
  return uh(e, t);
}
function uh(e, t) {
  if (hi(t))
    throw new Error("SVG cannot be parsed directly to imagebitmap");
  return new Blob([new Uint8Array(e)]);
}
async function lh(e, t, n) {
  const s = Ig(e, n), r = self.URL || self.webkitURL, i = typeof s != "string" && r.createObjectURL(s);
  try {
    return await Og(i || s, t);
  } finally {
    i && r.revokeObjectURL(i);
  }
}
async function Og(e, t) {
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
const vg = {};
let So = !0;
async function xg(e, t, n) {
  let s;
  hi(n) ? s = await lh(e, t, n) : s = uh(e, n);
  const r = t && t.imagebitmap;
  return await Fg(s, r);
}
async function Fg(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if ((Lg(t) || !So) && (t = null), t)
    try {
      return await createImageBitmap(e, t);
    } catch (n) {
      console.warn(n), So = !1;
    }
  return await createImageBitmap(e);
}
function Lg(e) {
  for (const t in e || vg)
    return !1;
  return !0;
}
function Dg(e) {
  return !Ug(e, "ftyp", 4) || !(e[8] & 96) ? null : Gg(e);
}
function Gg(e) {
  switch (Ng(e, 8, 12).replace("\0", " ").trim()) {
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
function Ng(e, t, n) {
  return String.fromCharCode(...e.slice(t, n));
}
function Pg(e) {
  return [...e].map((t) => t.charCodeAt(0));
}
function Ug(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = Pg(t);
  for (let r = 0; r < s.length; ++r)
    if (s[r] !== e[r + n])
      return !1;
  return !0;
}
const Ht = !1, Ke = !0;
function ui(e) {
  const t = hn(e);
  return kg(t) || Jg(t) || $g(t) || Vg(t) || Hg(t);
}
function Hg(e) {
  const t = new Uint8Array(e instanceof DataView ? e.buffer : e), n = Dg(t);
  return n ? {
    mimeType: n.mimeType,
    width: 0,
    height: 0
  } : null;
}
function kg(e) {
  const t = hn(e);
  return t.byteLength >= 24 && t.getUint32(0, Ht) === 2303741511 ? {
    mimeType: "image/png",
    width: t.getUint32(16, Ht),
    height: t.getUint32(20, Ht)
  } : null;
}
function $g(e) {
  const t = hn(e);
  return t.byteLength >= 10 && t.getUint32(0, Ht) === 1195984440 ? {
    mimeType: "image/gif",
    width: t.getUint16(6, Ke),
    height: t.getUint16(8, Ke)
  } : null;
}
function Vg(e) {
  const t = hn(e);
  return t.byteLength >= 14 && t.getUint16(0, Ht) === 16973 && t.getUint32(2, Ke) === t.byteLength ? {
    mimeType: "image/bmp",
    width: t.getUint32(18, Ke),
    height: t.getUint32(22, Ke)
  } : null;
}
function Jg(e) {
  const t = hn(e);
  if (!(t.byteLength >= 3 && t.getUint16(0, Ht) === 65496 && t.getUint8(2) === 255))
    return null;
  const {
    tableMarkers: s,
    sofMarkers: r
  } = Wg();
  let i = 2;
  for (; i + 9 < t.byteLength; ) {
    const o = t.getUint16(i, Ht);
    if (r.has(o))
      return {
        mimeType: "image/jpeg",
        height: t.getUint16(i + 5, Ht),
        width: t.getUint16(i + 7, Ht)
      };
    if (!s.has(o))
      return null;
    i += 2, i += t.getUint16(i, Ht);
  }
  return null;
}
function Wg() {
  const e = /* @__PURE__ */ new Set([65499, 65476, 65484, 65501, 65534]);
  for (let n = 65504; n < 65520; ++n)
    e.add(n);
  return {
    tableMarkers: e,
    sofMarkers: /* @__PURE__ */ new Set([65472, 65473, 65474, 65475, 65477, 65478, 65479, 65481, 65482, 65483, 65485, 65486, 65487, 65502])
  };
}
function hn(e) {
  if (e instanceof DataView)
    return e;
  if (ArrayBuffer.isView(e))
    return new DataView(e.buffer);
  if (e instanceof ArrayBuffer)
    return new DataView(e);
  throw new Error("toDataView");
}
async function zg(e, t) {
  var n;
  const {
    mimeType: s
  } = ui(e) || {}, r = (n = globalThis.loaders) === null || n === void 0 ? void 0 : n.parseImageNode;
  return ch(r), await r(e, s);
}
async function jg(e, t, n) {
  t = t || {};
  const r = (t.image || {}).type || "auto", {
    url: i
  } = n || {}, o = Kg(r);
  let c;
  switch (o) {
    case "imagebitmap":
      c = await xg(e, t, i);
      break;
    case "image":
      c = await lh(e, t, i);
      break;
    case "data":
      c = await zg(e);
      break;
    default:
      ch(!1);
  }
  return r === "data" && (c = hh(c)), c;
}
function Kg(e) {
  switch (e) {
    case "auto":
    case "data":
      return wg();
    default:
      return bg(e), e;
  }
}
const qg = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "svg", "avif"], Xg = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/avif", "image/bmp", "image/vnd.microsoft.icon", "image/svg+xml"], Qg = {
  image: {
    type: "auto",
    decode: !0
  }
}, Yg = {
  id: "image",
  module: "images",
  name: "Images",
  version: Tg,
  mimeTypes: Xg,
  extensions: qg,
  parse: jg,
  tests: [(e) => !!ui(new DataView(e))],
  options: Qg
}, qs = {};
function Zg(e) {
  if (qs[e] === void 0) {
    const t = ah ? e1(e) : t1(e);
    qs[e] = t;
  }
  return qs[e];
}
function t1(e) {
  var t, n;
  const s = ["image/png", "image/jpeg", "image/gif"], r = ((t = globalThis.loaders) === null || t === void 0 ? void 0 : t.imageFormatsNode) || s;
  return !!((n = globalThis.loaders) === null || n === void 0 ? void 0 : n.parseImageNode) && r.includes(e);
}
function e1(e) {
  switch (e) {
    case "image/avif":
    case "image/webp":
      return n1(e);
    default:
      return !0;
  }
}
function n1(e) {
  try {
    return document.createElement("canvas").toDataURL(e).indexOf(`data:${e}`) === 0;
  } catch {
    return !1;
  }
}
async function fh(e, t, n, s) {
  return s._parse(e, t, n, s);
}
function en(e, t) {
  if (!e)
    throw new Error(t || "loader assertion failed.");
}
function s1(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
  return typeof e == "string" ? e.slice(0, t) : ArrayBuffer.isView(e) ? Io(e.buffer, e.byteOffset, t) : e instanceof ArrayBuffer ? Io(e, 0, t) : "";
}
function Io(e, t, n) {
  if (e.byteLength <= t + n)
    return "";
  const s = new DataView(e);
  let r = "";
  for (let i = 0; i < n; i++)
    r += String.fromCharCode(s.getUint8(t + i));
  return r;
}
function r1(e) {
  try {
    return JSON.parse(e);
  } catch {
    throw new Error(`Failed to parse JSON from data starting with "${s1(e)}"`);
  }
}
function dh(e, t, n) {
  const s = n !== void 0 ? new Uint8Array(e).subarray(t, t + n) : new Uint8Array(e).subarray(t);
  return new Uint8Array(s).buffer;
}
function un(e, t) {
  return en(e >= 0), en(t > 0), e + (t - 1) & ~(t - 1);
}
function i1(e, t, n) {
  let s;
  if (e instanceof ArrayBuffer)
    s = new Uint8Array(e);
  else {
    const r = e.byteOffset, i = e.byteLength;
    s = new Uint8Array(e.buffer || e.arrayBuffer, r, i);
  }
  return t.set(s, n), n + un(s.byteLength, 4);
}
function At(e, t) {
  if (!e)
    throw new Error(t || "assert failed: gltf");
}
const mh = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, gh = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}, o1 = 1.33, Oo = ["SCALAR", "VEC2", "VEC3", "VEC4"], c1 = [[Int8Array, 5120], [Uint8Array, 5121], [Int16Array, 5122], [Uint16Array, 5123], [Uint32Array, 5125], [Float32Array, 5126], [Float64Array, 5130]], a1 = new Map(c1), h1 = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, u1 = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}, l1 = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
function Ah(e) {
  return Oo[e - 1] || Oo[0];
}
function li(e) {
  const t = a1.get(e.constructor);
  if (!t)
    throw new Error("Illegal typed array");
  return t;
}
function fi(e, t) {
  const n = l1[e.componentType], s = h1[e.type], r = u1[e.componentType], i = e.count * s, o = e.count * s * r;
  At(o >= 0 && o <= t.byteLength);
  const c = gh[e.componentType], a = mh[e.type];
  return {
    ArrayType: n,
    length: i,
    byteLength: o,
    componentByteSize: c,
    numberOfComponentsInElement: a
  };
}
function ph(e) {
  let {
    images: t,
    bufferViews: n
  } = e;
  t = t || [], n = n || [];
  const s = t.map((o) => o.bufferView);
  n = n.filter((o) => !s.includes(o));
  const r = n.reduce((o, c) => o + c.byteLength, 0), i = t.reduce((o, c) => {
    const {
      width: a,
      height: h
    } = c.image;
    return o + a * h;
  }, 0);
  return r + Math.ceil(4 * i * o1);
}
function f1(e, t, n) {
  const s = e.bufferViews[n];
  At(s);
  const r = s.buffer, i = t[r];
  At(i);
  const o = (s.byteOffset || 0) + i.byteOffset;
  return new Uint8Array(i.arrayBuffer, o, s.byteLength);
}
function d1(e, t, n) {
  var s, r;
  const i = typeof n == "number" ? (s = e.accessors) === null || s === void 0 ? void 0 : s[n] : n;
  if (!i)
    throw new Error(`No gltf accessor ${JSON.stringify(n)}`);
  const o = (r = e.bufferViews) === null || r === void 0 ? void 0 : r[i.bufferView || 0];
  if (!o)
    throw new Error(`No gltf buffer view for accessor ${o}`);
  const {
    arrayBuffer: c,
    byteOffset: a
  } = t[o.buffer], h = (a || 0) + (i.byteOffset || 0) + (o.byteOffset || 0), {
    ArrayType: u,
    length: l,
    componentByteSize: f,
    numberOfComponentsInElement: d
  } = fi(i, o), m = f * d, g = o.byteStride || m;
  if (typeof o.byteStride > "u" || o.byteStride === m)
    return new u(c, h, l);
  const A = new u(l);
  for (let p = 0; p < i.count; p++) {
    const C = new u(c, h + p * g, d);
    A.set(C, p * d);
  }
  return A;
}
function m1() {
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
class st {
  constructor(t) {
    this.gltf = void 0, this.sourceBuffers = void 0, this.byteLength = void 0, this.gltf = {
      json: (t == null ? void 0 : t.json) || m1(),
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
    return d1(this.gltf.json, this.gltf.buffers, n);
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
    } = t, c = {
      primitives: [{
        attributes: this._addAttributes(n),
        mode: i
      }]
    };
    if (s) {
      const a = this._addIndices(s);
      c.primitives[0].indices = a;
    }
    return Number.isFinite(r) && (c.primitives[0].material = r), this.json.meshes = this.json.meshes || [], this.json.meshes.push(c), this.json.meshes.length - 1;
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
    const s = ui(t), r = n || (s == null ? void 0 : s.mimeType), o = {
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
    return this.byteLength += un(r, 4), this.json.bufferViews = this.json.bufferViews || [], this.json.bufferViews.push(i), this.json.bufferViews.length - 1;
  }
  addAccessor(t, n) {
    const s = {
      bufferView: t,
      type: Ah(n.size),
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
      componentType: li(t),
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
    for (const c of this.sourceBuffers || [])
      o = i1(c, i, o);
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
function vo(e) {
  return (e % 1 + 1) % 1;
}
const yh = {
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
}, g1 = {
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
}, Bh = {
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
function di(e, t) {
  return Bh[t] * yh[e];
}
function bs(e, t, n, s) {
  if (n !== "UINT8" && n !== "UINT16" && n !== "UINT32" && n !== "UINT64")
    return null;
  const r = e.getTypedArrayForBufferView(t), i = ws(r, "SCALAR", n, s + 1);
  return i instanceof BigInt64Array || i instanceof BigUint64Array ? null : i;
}
function ws(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  const r = yh[t], i = g1[n], o = Bh[n], c = s * r, a = c * o;
  let h = e.buffer, u = e.byteOffset;
  return u % o !== 0 && (h = new Uint8Array(h).slice(u, u + a).buffer, u = 0), new i(h, u, c);
}
function mi(e, t, n) {
  var s, r;
  const i = `TEXCOORD_${t.texCoord || 0}`, o = n.attributes[i], c = e.getTypedArrayForAccessor(o), a = e.gltf.json, h = t.index, u = (s = a.textures) === null || s === void 0 || (r = s[h]) === null || r === void 0 ? void 0 : r.source;
  if (typeof u < "u") {
    var l, f, d;
    const m = (l = a.images) === null || l === void 0 || (f = l[u]) === null || f === void 0 ? void 0 : f.mimeType, g = (d = e.gltf.images) === null || d === void 0 ? void 0 : d[u];
    if (g && typeof g.width < "u") {
      const A = [];
      for (let p = 0; p < c.length; p += 2) {
        const C = A1(g, m, c, p, t.channels);
        A.push(C);
      }
      return A;
    }
  }
  return [];
}
function Th(e, t, n, s, r) {
  if (!(n != null && n.length))
    return;
  const i = [];
  for (const u of n) {
    let l = s.findIndex((f) => f === u);
    l === -1 && (l = s.push(u) - 1), i.push(l);
  }
  const o = new Uint32Array(i), c = e.gltf.buffers.push({
    arrayBuffer: o.buffer,
    byteOffset: o.byteOffset,
    byteLength: o.byteLength
  }) - 1, a = e.addBufferView(o, c, 0), h = e.addAccessor(a, {
    size: 1,
    componentType: li(o),
    count: o.length
  });
  r.attributes[t] = h;
}
function A1(e, t, n, s) {
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
  }, o = n[s], c = n[s + 1];
  let a = 1;
  t && (t.indexOf("image/jpeg") !== -1 || t.indexOf("image/png") !== -1) && (a = 4);
  const h = p1(o, c, e, a);
  let u = 0;
  for (const l of r) {
    const f = typeof l == "number" ? Object.values(i)[l] : i[l], d = h + f.offset, m = hh(e);
    if (m.data.length <= d)
      throw new Error(`${m.data.length} <= ${d}`);
    const g = m.data[d];
    u |= g << f.shift;
  }
  return u;
}
function p1(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  const r = n.width, i = vo(e) * (r - 1), o = Math.round(i), c = n.height, a = vo(t) * (c - 1), h = Math.round(a), u = n.components ? n.components : s;
  return (h * r + o) * u;
}
function Eh(e, t, n, s, r) {
  const i = [];
  for (let o = 0; o < t; o++) {
    const c = n[o], a = n[o + 1] - n[o];
    if (a + c > s)
      break;
    const h = c / r, u = a / r;
    i.push(e.slice(h, h + u));
  }
  return i;
}
function Ch(e, t, n) {
  const s = [];
  for (let r = 0; r < t; r++) {
    const i = r * n;
    s.push(e.slice(i, i + n));
  }
  return s;
}
function bh(e, t, n, s) {
  if (n)
    throw new Error("Not implemented - arrayOffsets for strings is specified");
  if (s) {
    const r = [], i = new TextDecoder("utf8");
    let o = 0;
    for (let c = 0; c < e; c++) {
      const a = s[c + 1] - s[c];
      if (a + o <= t.length) {
        const h = t.subarray(o, a + o), u = i.decode(h);
        r.push(u), o += a;
      }
    }
    return r;
  }
  return [];
}
const wh = "EXT_mesh_features", y1 = wh;
async function B1(e, t) {
  const n = new st(e);
  T1(n, t);
}
function T1(e, t) {
  const n = e.gltf.json;
  if (n.meshes)
    for (const s of n.meshes)
      for (const r of s.primitives)
        E1(e, r, t);
}
function E1(e, t, n) {
  var s, r;
  if (!(n != null && (s = n.gltf) !== null && s !== void 0 && s.loadBuffers))
    return;
  const i = (r = t.extensions) === null || r === void 0 ? void 0 : r[wh], o = i == null ? void 0 : i.featureIds;
  if (o)
    for (const a of o) {
      var c;
      let h;
      if (typeof a.attribute < "u") {
        const u = `_FEATURE_ID_${a.attribute}`, l = t.attributes[u];
        h = e.getTypedArrayForAccessor(l);
      } else
        typeof a.texture < "u" && n !== null && n !== void 0 && (c = n.gltf) !== null && c !== void 0 && c.loadImages ? h = mi(e, a.texture, t) : h = [];
      a.data = h;
    }
}
const C1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: B1,
  name: y1
}, Symbol.toStringTag, { value: "Module" })), gi = "EXT_structural_metadata", b1 = gi;
async function w1(e, t) {
  const n = new st(e);
  _1(n, t);
}
function _1(e, t) {
  var n, s;
  if (!((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const r = e.getExtension(gi);
  r && ((s = t.gltf) !== null && s !== void 0 && s.loadImages && M1(e, r), R1(e, r));
}
function M1(e, t) {
  const n = t.propertyTextures, s = e.gltf.json;
  if (n && s.meshes)
    for (const r of s.meshes)
      for (const i of r.primitives)
        I1(e, n, i, t);
}
function R1(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, r = t.propertyTables;
  if (s && r)
    for (const i in s) {
      const o = S1(r, i);
      o && v1(e, n, o);
    }
}
function S1(e, t) {
  for (const n of e)
    if (n.class === t)
      return n;
  return null;
}
function I1(e, t, n, s) {
  var r;
  if (!t)
    return;
  const i = (r = n.extensions) === null || r === void 0 ? void 0 : r[gi], o = i == null ? void 0 : i.propertyTextures;
  if (o)
    for (const c of o) {
      const a = t[c];
      O1(e, a, n, s);
    }
}
function O1(e, t, n, s) {
  if (!t.properties)
    return;
  s.dataAttributeNames || (s.dataAttributeNames = []);
  const r = t.class;
  for (const o in t.properties) {
    var i;
    const c = `${r}_${o}`, a = (i = t.properties) === null || i === void 0 ? void 0 : i[o];
    if (!a)
      continue;
    a.data || (a.data = []);
    const h = a.data, u = mi(e, a, n);
    u !== null && (Th(e, c, u, h, n), a.data = h, s.dataAttributeNames.push(c));
  }
}
function v1(e, t, n) {
  var s;
  const r = (s = t.classes) === null || s === void 0 ? void 0 : s[n.class];
  if (!r)
    throw new Error(`Incorrect data in the EXT_structural_metadata extension: no schema class with name ${n.class}`);
  const i = n.count;
  for (const c in r.properties) {
    var o;
    const a = r.properties[c], h = (o = n.properties) === null || o === void 0 ? void 0 : o[c];
    if (h) {
      const u = x1(e, t, a, i, h);
      h.data = u;
    }
  }
}
function x1(e, t, n, s, r) {
  let i = [];
  const o = r.values, c = e.getTypedArrayForBufferView(o), a = F1(e, n, r, s), h = L1(e, r, s);
  switch (n.type) {
    case "SCALAR":
    case "VEC2":
    case "VEC3":
    case "VEC4":
    case "MAT2":
    case "MAT3":
    case "MAT4": {
      i = D1(n, s, c, a);
      break;
    }
    case "BOOLEAN":
      throw new Error(`Not implemented - classProperty.type=${n.type}`);
    case "STRING": {
      i = bh(s, c, a, h);
      break;
    }
    case "ENUM": {
      i = G1(t, n, s, c, a);
      break;
    }
    default:
      throw new Error(`Unknown classProperty type ${n.type}`);
  }
  return i;
}
function F1(e, t, n, s) {
  return t.array && typeof t.count > "u" && typeof n.arrayOffsets < "u" ? bs(e, n.arrayOffsets, n.arrayOffsetType || "UINT32", s) : null;
}
function L1(e, t, n) {
  return typeof t.stringOffsets < "u" ? bs(e, t.stringOffsets, t.stringOffsetType || "UINT32", n) : null;
}
function D1(e, t, n, s) {
  const r = e.array, i = e.count, o = di(e.type, e.componentType), c = n.byteLength / o;
  let a;
  return e.componentType ? a = ws(n, e.type, e.componentType, c) : a = n, r ? s ? Eh(a, t, s, n.length, o) : i ? Ch(a, t, i) : [] : a;
}
function G1(e, t, n, s, r) {
  var i;
  const o = t.enumType;
  if (!o)
    throw new Error("Incorrect data in the EXT_structural_metadata extension: classProperty.enumType is not set for type ENUM");
  const c = (i = e.enums) === null || i === void 0 ? void 0 : i[o];
  if (!c)
    throw new Error(`Incorrect data in the EXT_structural_metadata extension: schema.enums does't contain ${o}`);
  const a = c.valueType || "UINT16", h = di(t.type, a), u = s.byteLength / h;
  let l = ws(s, t.type, a, u);
  if (l || (l = s), t.array) {
    if (r)
      return N1({
        valuesData: l,
        numberOfElements: n,
        arrayOffsets: r,
        valuesDataBytesLength: s.length,
        elementSize: h,
        enumEntry: c
      });
    const f = t.count;
    return f ? P1(l, n, f, c) : [];
  }
  return Ai(l, 0, n, c);
}
function N1(e) {
  const {
    valuesData: t,
    numberOfElements: n,
    arrayOffsets: s,
    valuesDataBytesLength: r,
    elementSize: i,
    enumEntry: o
  } = e, c = [];
  for (let a = 0; a < n; a++) {
    const h = s[a], u = s[a + 1] - s[a];
    if (u + h > r)
      break;
    const l = h / i, f = u / i, d = Ai(t, l, f, o);
    c.push(d);
  }
  return c;
}
function P1(e, t, n, s) {
  const r = [];
  for (let i = 0; i < t; i++) {
    const o = n * i, c = Ai(e, o, n, s);
    r.push(c);
  }
  return r;
}
function Ai(e, t, n, s) {
  const r = [];
  for (let i = 0; i < n; i++)
    if (e instanceof BigInt64Array || e instanceof BigUint64Array)
      r.push("");
    else {
      const o = e[t + i], c = U1(s, o);
      c ? r.push(c.name) : r.push("");
    }
  return r;
}
function U1(e, t) {
  for (const n of e.values)
    if (n.value === t)
      return n;
  return null;
}
const H1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: w1,
  name: b1
}, Symbol.toStringTag, { value: "Module" })), _h = "EXT_feature_metadata", k1 = _h;
async function $1(e, t) {
  const n = new st(e);
  V1(n, t);
}
function V1(e, t) {
  var n, s;
  if (!((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const r = e.getExtension(_h);
  r && ((s = t.gltf) !== null && s !== void 0 && s.loadImages && J1(e, r), W1(e, r));
}
function J1(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, {
    featureTextures: r
  } = t;
  if (s && r)
    for (const i in s) {
      const o = s[i], c = j1(r, i);
      c && q1(e, c, o);
    }
}
function W1(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, r = t.featureTables;
  if (s && r)
    for (const i in s) {
      const o = z1(r, i);
      o && K1(e, n, o);
    }
}
function z1(e, t) {
  for (const n in e) {
    const s = e[n];
    if (s.class === t)
      return s;
  }
  return null;
}
function j1(e, t) {
  for (const n in e) {
    const s = e[n];
    if (s.class === t)
      return s;
  }
  return null;
}
function K1(e, t, n) {
  var s;
  if (!n.class)
    return;
  const r = (s = t.classes) === null || s === void 0 ? void 0 : s[n.class];
  if (!r)
    throw new Error(`Incorrect data in the EXT_structural_metadata extension: no schema class with name ${n.class}`);
  const i = n.count;
  for (const c in r.properties) {
    var o;
    const a = r.properties[c], h = (o = n.properties) === null || o === void 0 ? void 0 : o[c];
    if (h) {
      const u = X1(e, t, a, i, h);
      h.data = u;
    }
  }
}
function q1(e, t, n) {
  const s = t.class;
  for (const i in n.properties) {
    var r;
    const o = t == null || (r = t.properties) === null || r === void 0 ? void 0 : r[i];
    if (o) {
      const c = eA(e, o, s);
      o.data = c;
    }
  }
}
function X1(e, t, n, s, r) {
  let i = [];
  const o = r.bufferView, c = e.getTypedArrayForBufferView(o), a = Q1(e, n, r, s), h = Y1(e, n, r, s);
  return n.type === "STRING" || n.componentType === "STRING" ? i = bh(s, c, a, h) : Z1(n) && (i = tA(n, s, c, a)), i;
}
function Q1(e, t, n, s) {
  return t.type === "ARRAY" && typeof t.componentCount > "u" && typeof n.arrayOffsetBufferView < "u" ? bs(e, n.arrayOffsetBufferView, n.offsetType || "UINT32", s) : null;
}
function Y1(e, t, n, s) {
  return typeof n.stringOffsetBufferView < "u" ? bs(e, n.stringOffsetBufferView, n.offsetType || "UINT32", s) : null;
}
function Z1(e) {
  const t = ["UINT8", "INT16", "UINT16", "INT32", "UINT32", "INT64", "UINT64", "FLOAT32", "FLOAT64"];
  return t.includes(e.type) || typeof e.componentType < "u" && t.includes(e.componentType);
}
function tA(e, t, n, s) {
  const r = e.type === "ARRAY", i = e.componentCount, o = "SCALAR", c = e.componentType || e.type, a = di(o, c), h = n.byteLength / a, u = ws(n, o, c, h);
  return r ? s ? Eh(u, t, s, n.length, a) : i ? Ch(u, t, i) : [] : u;
}
function eA(e, t, n) {
  const s = e.gltf.json;
  if (!s.meshes)
    return [];
  const r = [];
  for (const i of s.meshes)
    for (const o of i.primitives)
      nA(e, n, t, r, o);
  return r;
}
function nA(e, t, n, s, r) {
  const i = {
    channels: n.channels,
    ...n.texture
  }, o = mi(e, i, r);
  o && Th(e, t, o, s, r);
}
const sA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: $1,
  name: k1
}, Symbol.toStringTag, { value: "Module" })), rA = "4.1.0-alpha.5", iA = "4.1.0-alpha.5";
function oA() {
  var e;
  return (e = globalThis._loadersgl_) !== null && e !== void 0 && e.version || (globalThis._loadersgl_ = globalThis._loadersgl_ || {}, globalThis._loadersgl_.version = "4.1.0-alpha.5"), globalThis._loadersgl_.version;
}
const cA = oA();
function aA(e, t) {
  if (!e)
    throw new Error(t || "loaders.gl assertion failed.");
}
const ln = typeof process != "object" || String(process) !== "[object process]" || process.browser, pi = typeof importScripts == "function", xo = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
xo && parseFloat(xo[1]);
const Xs = {};
async function cs(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  return t && (e = hA(e, t, n, s)), Xs[e] = Xs[e] || uA(e), await Xs[e];
}
function hA(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  if (!n.useLocalLibraries && e.startsWith("http"))
    return e;
  s = s || e;
  const r = n.modules || {};
  return r[s] ? r[s] : ln ? n.CDN ? (aA(n.CDN.startsWith("http")), `${n.CDN}/${t}@${cA}/dist/libs/${s}`) : pi ? `../src/libs/${s}` : `modules/${t}/src/libs/${s}` : `modules/${t}/dist/libs/${s}`;
}
async function uA(e) {
  if (e.endsWith("wasm"))
    return await fA(e);
  if (!ln)
    try {
      return pa && void 0;
    } catch (n) {
      return console.error(n), null;
    }
  if (pi)
    return importScripts(e);
  const t = await dA(e);
  return lA(t, e);
}
function lA(e, t) {
  if (!ln)
    return;
  if (pi)
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
async function fA(e) {
  return await (await fetch(e)).arrayBuffer();
}
async function dA(e) {
  return await (await fetch(e)).text();
}
const as = {
  TRANSCODER: "basis_transcoder.js",
  TRANSCODER_WASM: "basis_transcoder.wasm",
  ENCODER: "basis_encoder.js",
  ENCODER_WASM: "basis_encoder.wasm"
};
let Qs;
async function Fo(e) {
  const t = e.modules || {};
  return t.basis ? t.basis : (Qs = Qs || mA(e), await Qs);
}
async function mA(e) {
  let t = null, n = null;
  return [t, n] = await Promise.all([await cs(as.TRANSCODER, "textures", e), await cs(as.TRANSCODER_WASM, "textures", e)]), t = t || globalThis.BASIS, await gA(t, n);
}
function gA(e, t) {
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
let Ys;
async function Lo(e) {
  const t = e.modules || {};
  return t.basisEncoder ? t.basisEncoder : (Ys = Ys || AA(e), await Ys);
}
async function AA(e) {
  let t = null, n = null;
  return [t, n] = await Promise.all([await cs(as.ENCODER, "textures", e), await cs(as.ENCODER_WASM, "textures", e)]), t = t || globalThis.BASIS, await pA(t, n);
}
function pA(e, t) {
  const n = {};
  return t && (n.wasmBinary = t), new Promise((s) => {
    e(n).then((r) => {
      const {
        BasisFile: i,
        KTX2File: o,
        initializeBasis: c,
        BasisEncoder: a
      } = r;
      c(), s({
        BasisFile: i,
        KTX2File: o,
        BasisEncoder: a
      });
    });
  });
}
const Ee = {
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
}, yA = ["", "WEBKIT_", "MOZ_"], Do = {
  WEBGL_compressed_texture_s3tc: "dxt",
  WEBGL_compressed_texture_s3tc_srgb: "dxt-srgb",
  WEBGL_compressed_texture_etc1: "etc1",
  WEBGL_compressed_texture_etc: "etc2",
  WEBGL_compressed_texture_pvrtc: "pvrtc",
  WEBGL_compressed_texture_atc: "atc",
  WEBGL_compressed_texture_astc: "astc",
  EXT_texture_compression_rgtc: "rgtc"
};
let vn = null;
function BA(e) {
  if (!vn) {
    e = e || TA() || void 0, vn = /* @__PURE__ */ new Set();
    for (const t of yA)
      for (const n in Do)
        if (e && e.getExtension(`${t}${n}`)) {
          const s = Do[n];
          vn.add(s);
        }
  }
  return vn;
}
function TA() {
  try {
    return document.createElement("canvas").getContext("webgl");
  } catch {
    return null;
  }
}
var Go, No, Po, Uo, Ho, ko, $o, Vo;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.BASISLZ = 1] = "BASISLZ", e[e.ZSTD = 2] = "ZSTD", e[e.ZLIB = 3] = "ZLIB";
})(Go || (Go = {})), function(e) {
  e[e.BASICFORMAT = 0] = "BASICFORMAT";
}(No || (No = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.ETC1S = 163] = "ETC1S", e[e.UASTC = 166] = "UASTC";
}(Po || (Po = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.SRGB = 1] = "SRGB";
}(Uo || (Uo = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.LINEAR = 1] = "LINEAR", e[e.SRGB = 2] = "SRGB", e[e.ITU = 3] = "ITU", e[e.NTSC = 4] = "NTSC", e[e.SLOG = 5] = "SLOG", e[e.SLOG2 = 6] = "SLOG2";
}(Ho || (Ho = {})), function(e) {
  e[e.ALPHA_STRAIGHT = 0] = "ALPHA_STRAIGHT", e[e.ALPHA_PREMULTIPLIED = 1] = "ALPHA_PREMULTIPLIED";
}(ko || (ko = {})), function(e) {
  e[e.RGB = 0] = "RGB", e[e.RRR = 3] = "RRR", e[e.GGG = 4] = "GGG", e[e.AAA = 15] = "AAA";
}($o || ($o = {})), function(e) {
  e[e.RGB = 0] = "RGB", e[e.RGBA = 3] = "RGBA", e[e.RRR = 4] = "RRR", e[e.RRRG = 5] = "RRRG";
}(Vo || (Vo = {}));
const dt = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function EA(e) {
  const t = new Uint8Array(e);
  return !(t.byteLength < dt.length || t[0] !== dt[0] || t[1] !== dt[1] || t[2] !== dt[2] || t[3] !== dt[3] || t[4] !== dt[4] || t[5] !== dt[5] || t[6] !== dt[6] || t[7] !== dt[7] || t[8] !== dt[8] || t[9] !== dt[9] || t[10] !== dt[10] || t[11] !== dt[11]);
}
const CA = {
  etc1: {
    basisFormat: 0,
    compressed: !0,
    format: Ee.COMPRESSED_RGB_ETC1_WEBGL
  },
  etc2: {
    basisFormat: 1,
    compressed: !0
  },
  bc1: {
    basisFormat: 2,
    compressed: !0,
    format: Ee.COMPRESSED_RGB_S3TC_DXT1_EXT
  },
  bc3: {
    basisFormat: 3,
    compressed: !0,
    format: Ee.COMPRESSED_RGBA_S3TC_DXT5_EXT
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
    format: Ee.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
  },
  "pvrtc1-4-rgba": {
    basisFormat: 9,
    compressed: !0,
    format: Ee.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
  },
  "astc-4x4": {
    basisFormat: 10,
    compressed: !0,
    format: Ee.COMPRESSED_RGBA_ASTC_4X4_KHR
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
async function bA(e, t) {
  if (t.basis.containerFormat === "auto") {
    if (EA(e)) {
      const s = await Lo(t);
      return Jo(s.KTX2File, e, t);
    }
    const {
      BasisFile: n
    } = await Fo(t);
    return Zs(n, e, t);
  }
  switch (t.basis.module) {
    case "encoder":
      const n = await Lo(t);
      switch (t.basis.containerFormat) {
        case "ktx2":
          return Jo(n.KTX2File, e, t);
        case "basis":
        default:
          return Zs(n.BasisFile, e, t);
      }
    case "transcoder":
    default:
      const {
        BasisFile: s
      } = await Fo(t);
      return Zs(s, e, t);
  }
}
function Zs(e, t, n) {
  const s = new e(new Uint8Array(t));
  try {
    if (!s.startTranscoding())
      throw new Error("Failed to start basis transcoding");
    const r = s.getNumImages(), i = [];
    for (let o = 0; o < r; o++) {
      const c = s.getNumLevels(o), a = [];
      for (let h = 0; h < c; h++)
        a.push(wA(s, o, h, n));
      i.push(a);
    }
    return i;
  } finally {
    s.close(), s.delete();
  }
}
function wA(e, t, n, s) {
  const r = e.getImageWidth(t, n), i = e.getImageHeight(t, n), o = e.getHasAlpha(), {
    compressed: c,
    format: a,
    basisFormat: h
  } = Mh(s, o), u = e.getImageTranscodedSizeInBytes(t, n, h), l = new Uint8Array(u);
  if (!e.transcodeImage(l, t, n, h, 0, 0))
    throw new Error("failed to start Basis transcoding");
  return {
    width: r,
    height: i,
    data: l,
    compressed: c,
    format: a,
    hasAlpha: o
  };
}
function Jo(e, t, n) {
  const s = new e(new Uint8Array(t));
  try {
    if (!s.startTranscoding())
      throw new Error("failed to start KTX2 transcoding");
    const r = s.getLevels(), i = [];
    for (let o = 0; o < r; o++) {
      i.push(_A(s, o, n));
      break;
    }
    return [i];
  } finally {
    s.close(), s.delete();
  }
}
function _A(e, t, n) {
  const {
    alphaFlag: s,
    height: r,
    width: i
  } = e.getImageLevelInfo(t, 0, 0), {
    compressed: o,
    format: c,
    basisFormat: a
  } = Mh(n, s), h = e.getImageTranscodedSizeInBytes(t, 0, 0, a), u = new Uint8Array(h);
  if (!e.transcodeImage(u, t, 0, 0, a, 0, -1, -1))
    throw new Error("Failed to transcode KTX2 image");
  return {
    width: i,
    height: r,
    data: u,
    compressed: o,
    levelSize: h,
    hasAlpha: s,
    format: c
  };
}
function Mh(e, t) {
  let n = e && e.basis && e.basis.format;
  return n === "auto" && (n = Rh()), typeof n == "object" && (n = t ? n.alpha : n.noAlpha), n = n.toLowerCase(), CA[n];
}
function Rh() {
  const e = BA();
  return e.has("astc") ? "astc-4x4" : e.has("dxt") ? {
    alpha: "bc3",
    noAlpha: "bc1"
  } : e.has("pvrtc") ? {
    alpha: "pvrtc1-4-rgba",
    noAlpha: "pvrtc1-4-rgb"
  } : e.has("etc1") ? "etc1" : e.has("etc2") ? "etc2" : "rgb565";
}
const MA = {
  name: "Basis",
  id: "basis",
  module: "textures",
  version: iA,
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
}, RA = {
  ...MA,
  parse: bA
}, Ie = !0, Wo = 1735152710, yi = 12, hs = 8, SA = 1313821514, IA = 5130562, OA = 0, vA = 0, xA = 1;
function FA(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return `${String.fromCharCode(e.getUint8(t + 0))}${String.fromCharCode(e.getUint8(t + 1))}${String.fromCharCode(e.getUint8(t + 2))}${String.fromCharCode(e.getUint8(t + 3))}`;
}
function LA(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const s = new DataView(e), {
    magic: r = Wo
  } = n, i = s.getUint32(t, !1);
  return i === r || i === Wo;
}
function DA(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = new DataView(t), r = FA(s, n + 0), i = s.getUint32(n + 4, Ie), o = s.getUint32(n + 8, Ie);
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
  }), n += yi, e.version) {
    case 1:
      return GA(e, s, n);
    case 2:
      return NA(e, s, n, {});
    default:
      throw new Error(`Invalid GLB version ${e.version}. Only supports version 1 and 2.`);
  }
}
function GA(e, t, n) {
  en(e.header.byteLength > yi + hs);
  const s = t.getUint32(n + 0, Ie), r = t.getUint32(n + 4, Ie);
  return n += hs, en(r === OA), Lr(e, t, n, s), n += s, n += Dr(e, t, n, e.header.byteLength), n;
}
function NA(e, t, n, s) {
  return en(e.header.byteLength > yi + hs), PA(e, t, n, s), n + e.header.byteLength;
}
function PA(e, t, n, s) {
  for (; n + 8 <= e.header.byteLength; ) {
    const r = t.getUint32(n + 0, Ie), i = t.getUint32(n + 4, Ie);
    switch (n += hs, i) {
      case SA:
        Lr(e, t, n, r);
        break;
      case IA:
        Dr(e, t, n, r);
        break;
      case vA:
        s.strict || Lr(e, t, n, r);
        break;
      case xA:
        s.strict || Dr(e, t, n, r);
        break;
    }
    n += un(r, 4);
  }
  return n;
}
function Lr(e, t, n, s) {
  const r = new Uint8Array(t.buffer, n, s), o = new TextDecoder("utf8").decode(r);
  return e.json = JSON.parse(o), un(s, 4);
}
function Dr(e, t, n, s) {
  return e.header.hasBinChunk = !0, e.binChunks.push({
    byteOffset: n,
    byteLength: s,
    arrayBuffer: t.buffer
  }), un(s, 4);
}
function Sh(e, t) {
  if (e.startsWith("data:") || e.startsWith("http:") || e.startsWith("https:"))
    return e;
  const s = t.baseUri || t.uri;
  if (!s)
    throw new Error(`'baseUri' must be provided to resolve relative url ${e}`);
  return s.substr(0, s.lastIndexOf("/") + 1) + e;
}
const UA = "B9h9z9tFBBBF8fL9gBB9gLaaaaaFa9gEaaaB9gFaFa9gEaaaFaEMcBFFFGGGEIIILF9wFFFLEFBFKNFaFCx/IFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBF8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBGy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBEn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBIi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBKI9z9iqlBOc+x8ycGBM/qQFTa8jUUUUBCU/EBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAGTkUUUBRNCUoBAG9uC/wgBZHKCUGAKCUG9JyRVAECFJRICBRcGXEXAcAF9PQFAVAFAclAcAVJAF9JyRMGXGXAG9FQBAMCbJHKC9wZRSAKCIrCEJCGrRQANCUGJRfCBRbAIRTEXGXAOATlAQ9PQBCBRISEMATAQJRIGXAS9FQBCBRtCBREEXGXAOAIlCi9PQBCBRISLMANCU/CBJAEJRKGXGXGXGXGXATAECKrJ2BBAtCKZrCEZfIBFGEBMAKhB83EBAKCNJhB83EBSEMAKAI2BIAI2BBHmCKrHYAYCE6HYy86BBAKCFJAICIJAYJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCGJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCEJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCIJAYAmJHY2BBAI2BFHmCKrHPAPCE6HPy86BBAKCLJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCKJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCOJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCNJAYAmJHY2BBAI2BGHmCKrHPAPCE6HPy86BBAKCVJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCcJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCMJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCSJAYAmJHm2BBAI2BEHICKrHYAYCE6HYy86BBAKCQJAmAYJHm2BBAICIrCEZHYAYCE6HYy86BBAKCfJAmAYJHm2BBAICGrCEZHYAYCE6HYy86BBAKCbJAmAYJHK2BBAICEZHIAICE6HIy86BBAKAIJRISGMAKAI2BNAI2BBHmCIrHYAYCb6HYy86BBAKCFJAICNJAYJHY2BBAmCbZHmAmCb6Hmy86BBAKCGJAYAmJHm2BBAI2BFHYCIrHPAPCb6HPy86BBAKCEJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCIJAmAYJHm2BBAI2BGHYCIrHPAPCb6HPy86BBAKCLJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCKJAmAYJHm2BBAI2BEHYCIrHPAPCb6HPy86BBAKCOJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCNJAmAYJHm2BBAI2BIHYCIrHPAPCb6HPy86BBAKCVJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCcJAmAYJHm2BBAI2BLHYCIrHPAPCb6HPy86BBAKCMJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCSJAmAYJHm2BBAI2BKHYCIrHPAPCb6HPy86BBAKCQJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCfJAmAYJHm2BBAI2BOHICIrHYAYCb6HYy86BBAKCbJAmAYJHK2BBAICbZHIAICb6HIy86BBAKAIJRISFMAKAI8pBB83BBAKCNJAICNJ8pBB83BBAICTJRIMAtCGJRtAECTJHEAS9JQBMMGXAIQBCBRISEMGXAM9FQBANAbJ2BBRtCBRKAfREEXAEANCU/CBJAKJ2BBHTCFrCBATCFZl9zAtJHt86BBAEAGJREAKCFJHKAM9HQBMMAfCFJRfAIRTAbCFJHbAG9HQBMMABAcAG9sJANCUGJAMAG9sTkUUUBpANANCUGJAMCaJAG9sJAGTkUUUBpMAMCBAIyAcJRcAIQBMC9+RKSFMCBC99AOAIlAGCAAGCA9Ly6yRKMALCU/EBJ8kUUUUBAKM+OmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUFT+JUUUBpALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM+lLKFaF99GaG99FaG99GXGXAGCI9HQBAF9FQFEXGXGX9DBBB8/9DBBB+/ABCGJHG1BB+yAB1BBHE+yHI+L+TABCFJHL1BBHK+yHO+L+THN9DBBBB9gHVyAN9DBB/+hANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE86BBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG86BBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG86BBABCIJRBAFCaJHFQBSGMMAF9FQBEXGXGX9DBBB8/9DBBB+/ABCIJHG8uFB+yAB8uFBHE+yHI+L+TABCGJHL8uFBHK+yHO+L+THN9DBBBB9gHVyAN9DB/+g6ANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE87FBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG87FBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG87FBABCNJRBAFCaJHFQBMMM/SEIEaE99EaF99GXAF9FQBCBREABRIEXGXGX9D/zI818/AICKJ8uFBHLCEq+y+VHKAI8uFB+y+UHO9DB/+g6+U9DBBB8/9DBBB+/AO9DBBBB9gy+SHN+L9DBBB9P9d9FQBAN+oRVSFMCUUUU94RVMAICIJ8uFBRcAICGJ8uFBRMABALCFJCEZAEqCFWJAV87FBGXGXAKAM+y+UHN9DB/+g6+U9DBBB8/9DBBB+/AN9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRMSFMCUUUU94RMMABALCGJCEZAEqCFWJAM87FBGXGXAKAc+y+UHK9DB/+g6+U9DBBB8/9DBBB+/AK9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRcSFMCUUUU94RcMABALCaJCEZAEqCFWJAc87FBGXGX9DBBU8/AOAO+U+TANAN+U+TAKAK+U+THO9DBBBBAO9DBBBB9gy+R9DB/+g6+U9DBBB8/+SHO+L9DBBB9P9d9FQBAO+oRcSFMCUUUU94RcMABALCEZAEqCFWJAc87FBAICNJRIAECIJREAFCaJHFQBMMM9JBGXAGCGrAF9sHF9FQBEXABAB8oGBHGCNWCN91+yAGCi91CnWCUUU/8EJ+++U84GBABCIJRBAFCaJHFQBMMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEM/lFFFaGXGXAFABqCEZ9FQBABRESFMGXGXAGCT9PQBABRESFMABREEXAEAF8oGBjGBAECIJAFCIJ8oGBjGBAECNJAFCNJ8oGBjGBAECSJAFCSJ8oGBjGBAECTJREAFCTJRFAGC9wJHGCb9LQBMMAGCI9JQBEXAEAF8oGBjGBAFCIJRFAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF2BB86BBAECFJREAFCFJRFAGCaJHGQBMMABMoFFGaGXGXABCEZ9FQBABRESFMAFCgFZC+BwsN9sRIGXGXAGCT9PQBABRESFMABREEXAEAIjGBAECSJAIjGBAECNJAIjGBAECIJAIjGBAECTJREAGC9wJHGCb9LQBMMAGCI9JQBEXAEAIjGBAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF86BBAECFJREAGCaJHGQBMMABMMMFBCUNMIT9kBB", HA = "B9h9z9tFBBBF8dL9gBB9gLaaaaaFa9gEaaaB9gGaaB9gFaFaEQSBBFBFFGEGEGIILF9wFFFLEFBFKNFaFCx/aFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBG8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBIy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBKi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBNn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBcI9z9iqlBMc/j9JSIBTEM9+FLa8jUUUUBCTlRBCBRFEXCBRGCBREEXABCNJAGJAECUaAFAGrCFZHIy86BBAEAIJREAGCFJHGCN9HQBMAFCx+YUUBJAE86BBAFCEWCxkUUBJAB8pEN83EBAFCFJHFCUG9HQBMMkRIbaG97FaK978jUUUUBCU/KBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAG/8cBBCUoBAG9uC/wgBZHKCUGAKCUG9JyRNAECFJRKCBRVGXEXAVAF9PQFANAFAVlAVANJAF9JyRcGXGXAG9FQBAcCbJHIC9wZHMCE9sRSAMCFWRQAICIrCEJCGrRfCBRbEXAKRTCBRtGXEXGXAOATlAf9PQBCBRKSLMALCU/CBJAtAM9sJRmATAfJRKCBREGXAMCoB9JQBAOAKlC/gB9JQBCBRIEXAmAIJREGXGXGXGXGXATAICKrJ2BBHYCEZfIBFGEBMAECBDtDMIBSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAnDeBJAeCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAnDeBJAeCx+YUUBJ2BBJRKSFMAEAKDBBBDMIBAKCTJRKMGXGXGXGXGXAYCGrCEZfIBFGEBMAECBDtDMITSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCIJAnDeBJAeCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCNJAnDeBJAeCx+YUUBJ2BBJRKSFMAEAKDBBBDMITAKCTJRKMGXGXGXGXGXAYCIrCEZfIBFGEBMAECBDtDMIASEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCIJAnDeBJAeCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCNJAnDeBJAeCx+YUUBJ2BBJRKSFMAEAKDBBBDMIAAKCTJRKMGXGXGXGXGXAYCKrfIBFGEBMAECBDtDMI8wSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCIJAnDeBJAYCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCNJAnDeBJAYCx+YUUBJ2BBJRKSFMAEAKDBBBDMI8wAKCTJRKMAICoBJREAICUFJAM9LQFAERIAOAKlC/fB9LQBMMGXAEAM9PQBAECErRIEXGXAOAKlCi9PQBCBRKSOMAmAEJRYGXGXGXGXGXATAECKrJ2BBAICKZrCEZfIBFGEBMAYCBDtDMIBSEMAYAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAnDeBJAeCx+YUUBJ2BBJRKSGMAYAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAnDeBJAeCx+YUUBJ2BBJRKSFMAYAKDBBBDMIBAKCTJRKMAICGJRIAECTJHEAM9JQBMMGXAK9FQBAKRTAtCFJHtCI6QGSFMMCBRKSEMGXAM9FQBALCUGJAbJREALAbJDBGBRnCBRYEXAEALCU/CBJAYJHIDBIBHdCFD9tAdCFDbHPD9OD9hD9RHdAIAMJDBIBHiCFD9tAiAPD9OD9hD9RHiDQBTFtGmEYIPLdKeOnH8ZAIAQJDBIBHpCFD9tApAPD9OD9hD9RHpAIASJDBIBHyCFD9tAyAPD9OD9hD9RHyDQBTFtGmEYIPLdKeOnH8cDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGEAnD9uHnDyBjGBAEAGJHIAnAPAPDQILKOILKOILKOILKOD9uHnDyBjGBAIAGJHIAnAPAPDQNVcMNVcMNVcMNVcMD9uHnDyBjGBAIAGJHIAnAPAPDQSQfbSQfbSQfbSQfbD9uHnDyBjGBAIAGJHIAnA8ZA8cDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHnDyBjGBAIAGJHIAnAPAPDQILKOILKOILKOILKOD9uHnDyBjGBAIAGJHIAnAPAPDQNVcMNVcMNVcMNVcMD9uHnDyBjGBAIAGJHIAnAPAPDQSQfbSQfbSQfbSQfbD9uHnDyBjGBAIAGJHIAnAdAiDQNiV8ZcpMyS8cQ8df8eb8fHdApAyDQNiV8ZcpMyS8cQ8df8eb8fHiDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGED9uHnDyBjGBAIAGJHIAnAPAPDQILKOILKOILKOILKOD9uHnDyBjGBAIAGJHIAnAPAPDQNVcMNVcMNVcMNVcMD9uHnDyBjGBAIAGJHIAnAPAPDQSQfbSQfbSQfbSQfbD9uHnDyBjGBAIAGJHIAnAdAiDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHnDyBjGBAIAGJHIAnAPAPDQILKOILKOILKOILKOD9uHnDyBjGBAIAGJHIAnAPAPDQNVcMNVcMNVcMNVcMD9uHnDyBjGBAIAGJHIAnAPAPDQSQfbSQfbSQfbSQfbD9uHnDyBjGBAIAGJREAYCTJHYAM9JQBMMAbCIJHbAG9JQBMMABAVAG9sJALCUGJAcAG9s/8cBBALALCUGJAcCaJAG9sJAG/8cBBMAcCBAKyAVJRVAKQBMC9+RKSFMCBC99AOAKlAGCAAGCA9Ly6yRKMALCU/KBJ8kUUUUBAKMNBT+BUUUBM+KmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUF/8MBALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM/xLGEaK978jUUUUBCAlHE8kUUUUBGXGXAGCI9HQBGXAFC98ZHI9FQBABRGCBRLEXAGAGDBBBHKCiD+rFCiD+sFD/6FHOAKCND+rFCiD+sFD/6FAOD/gFAKCTD+rFCiD+sFD/6FHND/gFD/kFD/lFHVCBDtD+2FHcAOCUUUU94DtHMD9OD9RD/kFHO9DBB/+hDYAOAOD/mFAVAVD/mFANAcANAMD9OD9RD/kFHOAOD/mFD/kFD/kFD/jFD/nFHND/mF9DBBX9LDYHcD/kFCgFDtD9OAKCUUU94DtD9OD9QAOAND/mFAcD/kFCND+rFCU/+EDtD9OD9QAVAND/mFAcD/kFCTD+rFCUU/8ODtD9OD9QDMBBAGCTJRGALCIJHLAI9JQBMMAIAF9PQFAEAFCEZHLCGWHGqCBCTAGl/8MBAEABAICGWJHIAG/8cBBGXAL9FQBAEAEDBIBHKCiD+rFCiD+sFD/6FHOAKCND+rFCiD+sFD/6FAOD/gFAKCTD+rFCiD+sFD/6FHND/gFD/kFD/lFHVCBDtD+2FHcAOCUUUU94DtHMD9OD9RD/kFHO9DBB/+hDYAOAOD/mFAVAVD/mFANAcANAMD9OD9RD/kFHOAOD/mFD/kFD/kFD/jFD/nFHND/mF9DBBX9LDYHcD/kFCgFDtD9OAKCUUU94DtD9OD9QAOAND/mFAcD/kFCND+rFCU/+EDtD9OD9QAVAND/mFAcD/kFCTD+rFCUU/8ODtD9OD9QDMIBMAIAEAG/8cBBSFMABAFC98ZHGT+HUUUBAGAF9PQBAEAFCEZHICEWHLJCBCAALl/8MBAEABAGCEWJHGAL/8cBBAEAIT+HUUUBAGAEAL/8cBBMAECAJ8kUUUUBM+yEGGaO97GXAF9FQBCBRGEXABCTJHEAEDBBBHICBDtHLCUU98D8cFCUU98D8cEHKD9OABDBBBHOAIDQILKOSQfbPden8c8d8e8fCggFDtD9OD/6FAOAIDQBFGENVcMTtmYi8ZpyHICTD+sFD/6FHND/gFAICTD+rFCTD+sFD/6FHVD/gFD/kFD/lFHI9DB/+g6DYAVAIALD+2FHLAVCUUUU94DtHcD9OD9RD/kFHVAVD/mFAIAID/mFANALANAcD9OD9RD/kFHIAID/mFD/kFD/kFD/jFD/nFHND/mF9DBBX9LDYHLD/kFCTD+rFAVAND/mFALD/kFCggEDtD9OD9QHVAIAND/mFALD/kFCaDbCBDnGCBDnECBDnKCBDnOCBDncCBDnMCBDnfCBDnbD9OHIDQNVi8ZcMpySQ8c8dfb8e8fD9QDMBBABAOAKD9OAVAIDQBFTtGEmYILPdKOenD9QDMBBABCAJRBAGCIJHGAF9JQBMMM94FEa8jUUUUBCAlHE8kUUUUBABAFC98ZHIT+JUUUBGXAIAF9PQBAEAFCEZHLCEWHFJCBCAAFl/8MBAEABAICEWJHBAF/8cBBAEALT+JUUUBABAEAF/8cBBMAECAJ8kUUUUBM/hEIGaF97FaL978jUUUUBCTlRGGXAF9FQBCBREEXAGABDBBBHIABCTJHLDBBBHKDQILKOSQfbPden8c8d8e8fHOCTD+sFHNCID+rFDMIBAB9DBBU8/DY9D/zI818/DYANCEDtD9QD/6FD/nFHNAIAKDQBFGENVcMTtmYi8ZpyHICTD+rFCTD+sFD/6FD/mFHKAKD/mFANAICTD+sFD/6FD/mFHVAVD/mFANAOCTD+rFCTD+sFD/6FD/mFHOAOD/mFD/kFD/kFD/lFCBDtD+4FD/jF9DB/+g6DYHND/mF9DBBX9LDYHID/kFCggEDtHcD9OAVAND/mFAID/kFCTD+rFD9QHVAOAND/mFAID/kFCTD+rFAKAND/mFAID/kFAcD9OD9QHNDQBFTtGEmYILPdKOenHID8dBAGDBIBDyB+t+J83EBABCNJAID8dFAGDBIBDyF+t+J83EBALAVANDQNVi8ZcMpySQ8c8dfb8e8fHND8dBAGDBIBDyG+t+J83EBABCiJAND8dFAGDBIBDyE+t+J83EBABCAJRBAECIJHEAF9JQBMMM/3FGEaF978jUUUUBCoBlREGXAGCGrAF9sHIC98ZHL9FQBCBRGABRFEXAFAFDBBBHKCND+rFCND+sFD/6FAKCiD+sFCnD+rFCUUU/8EDtD+uFD/mFDMBBAFCTJRFAGCIJHGAL9JQBMMGXALAI9PQBAEAICEZHGCGWHFqCBCoBAFl/8MBAEABALCGWJHLAF/8cBBGXAG9FQBAEAEDBIBHKCND+rFCND+sFD/6FAKCiD+sFCnD+rFCUUU/8EDtD+uFD/mFDMIBMALAEAF/8cBBMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEMMMFBCUNMIT9tBB", kA = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11]), $A = new Uint8Array([32, 0, 65, 253, 3, 1, 2, 34, 4, 106, 6, 5, 11, 8, 7, 20, 13, 33, 12, 16, 128, 9, 116, 64, 19, 113, 127, 15, 10, 21, 22, 14, 255, 66, 24, 54, 136, 107, 18, 23, 192, 26, 114, 118, 132, 17, 77, 101, 130, 144, 27, 87, 131, 44, 45, 74, 156, 154, 70, 167]), VA = {
  0: "",
  1: "meshopt_decodeFilterOct",
  2: "meshopt_decodeFilterQuat",
  3: "meshopt_decodeFilterExp",
  NONE: "",
  OCTAHEDRAL: "meshopt_decodeFilterOct",
  QUATERNION: "meshopt_decodeFilterQuat",
  EXPONENTIAL: "meshopt_decodeFilterExp"
}, JA = {
  0: "meshopt_decodeVertexBuffer",
  1: "meshopt_decodeIndexBuffer",
  2: "meshopt_decodeIndexSequence",
  ATTRIBUTES: "meshopt_decodeVertexBuffer",
  TRIANGLES: "meshopt_decodeIndexBuffer",
  INDICES: "meshopt_decodeIndexSequence"
};
async function WA(e, t, n, s, r) {
  let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : "NONE";
  const o = await zA();
  qA(o, o.exports[JA[r]], e, t, n, s, o.exports[VA[i || "NONE"]]);
}
let tr;
async function zA() {
  return tr || (tr = jA()), tr;
}
async function jA() {
  let e = UA;
  WebAssembly.validate(kA) && (e = HA, console.log("Warning: meshopt_decoder is using experimental SIMD support"));
  const t = await WebAssembly.instantiate(KA(e), {});
  return await t.instance.exports.__wasm_call_ctors(), t.instance;
}
function KA(e) {
  const t = new Uint8Array(e.length);
  for (let s = 0; s < e.length; ++s) {
    const r = e.charCodeAt(s);
    t[s] = r > 96 ? r - 71 : r > 64 ? r - 65 : r > 47 ? r + 4 : r > 46 ? 63 : 62;
  }
  let n = 0;
  for (let s = 0; s < e.length; ++s)
    t[n++] = t[s] < 60 ? $A[t[s]] : (t[s] - 60) * 64 + t[++s];
  return t.buffer.slice(0, n);
}
function qA(e, t, n, s, r, i, o) {
  const c = e.exports.sbrk, a = s + 3 & -4, h = c(a * r), u = c(i.length), l = new Uint8Array(e.exports.memory.buffer);
  l.set(i, u);
  const f = t(h, s, r, u, i.length);
  if (f === 0 && o && o(h, a, r), n.set(l.subarray(h, h + s * r)), c(h - c(0)), f !== 0)
    throw new Error(`Malformed buffer data: ${f}`);
}
const us = "EXT_meshopt_compression", XA = us;
async function QA(e, t) {
  var n, s;
  const r = new st(e);
  if (!(t != null && (n = t.gltf) !== null && n !== void 0 && n.decompressMeshes) || !((s = t.gltf) !== null && s !== void 0 && s.loadBuffers))
    return;
  const i = [];
  for (const o of e.json.bufferViews || [])
    i.push(YA(r, o));
  await Promise.all(i), r.removeExtension(us);
}
async function YA(e, t) {
  const n = e.getObjectExtension(t, us);
  if (n) {
    const {
      byteOffset: s = 0,
      byteLength: r = 0,
      byteStride: i,
      count: o,
      mode: c,
      filter: a = "NONE",
      buffer: h
    } = n, u = e.gltf.buffers[h], l = new Uint8Array(u.arrayBuffer, u.byteOffset + s, r), f = new Uint8Array(e.gltf.buffers[t.buffer].arrayBuffer, t.byteOffset, t.byteLength);
    await WA(f, o, i, l, c, a), e.removeObjectExtension(t, us);
  }
}
const ZA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: QA,
  name: XA
}, Symbol.toStringTag, { value: "Module" })), Me = "EXT_texture_webp", tp = Me;
function ep(e, t) {
  const n = new st(e);
  if (!Zg("image/webp")) {
    if (n.getRequiredExtensions().includes(Me))
      throw new Error(`gltf: Required extension ${Me} not supported by browser`);
    return;
  }
  const {
    json: s
  } = n;
  for (const r of s.textures || []) {
    const i = n.getObjectExtension(r, Me);
    i && (r.source = i.source), n.removeObjectExtension(r, Me);
  }
  n.removeExtension(Me);
}
const np = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: tp,
  preprocess: ep
}, Symbol.toStringTag, { value: "Module" })), Xn = "KHR_texture_basisu", sp = Xn;
function rp(e, t) {
  const n = new st(e), {
    json: s
  } = n;
  for (const r of s.textures || []) {
    const i = n.getObjectExtension(r, Xn);
    i && (r.source = i.source, n.removeObjectExtension(r, Xn));
  }
  n.removeExtension(Xn);
}
const ip = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: sp,
  preprocess: rp
}, Symbol.toStringTag, { value: "Module" }));
function op(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    if (n !== "indices") {
      const r = Ih(s);
      t[n] = r;
    }
  }
  return t;
}
function Ih(e) {
  const {
    buffer: t,
    size: n,
    count: s
  } = cp(e);
  return {
    value: t,
    size: n,
    byteOffset: 0,
    count: s,
    type: Ah(n),
    componentType: li(t)
  };
}
function cp(e) {
  let t = e, n = 1, s = 0;
  return e && e.value && (t = e.value, n = e.size || 1), t && (ArrayBuffer.isView(t) || (t = ap(t, Float32Array)), s = t.length / n), {
    buffer: t,
    size: n,
    count: s
  };
}
function ap(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return e ? Array.isArray(e) ? new t(e) : n && !(e instanceof t) ? new t(e) : e : null;
}
const ee = "KHR_draco_mesh_compression", hp = ee;
function up(e, t, n) {
  const s = new st(e);
  for (const r of Oh(s))
    s.getObjectExtension(r, ee);
}
async function lp(e, t, n) {
  var s;
  if (!(t != null && (s = t.gltf) !== null && s !== void 0 && s.decompressMeshes))
    return;
  const r = new st(e), i = [];
  for (const o of Oh(r))
    r.getObjectExtension(o, ee) && i.push(dp(r, o, t, n));
  await Promise.all(i), r.removeExtension(ee);
}
function fp(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const n = new st(e);
  for (const s of n.json.meshes || [])
    mp(s, t), n.addRequiredExtension(ee);
}
async function dp(e, t, n, s) {
  const r = e.getObjectExtension(t, ee);
  if (!r)
    return;
  const i = e.getTypedArrayForBufferView(r.bufferView), o = dh(i.buffer, i.byteOffset), c = {
    ...n
  };
  delete c["3d-tiles"];
  const a = await fh(o, sh, c, s), h = op(a.attributes);
  for (const [u, l] of Object.entries(h))
    if (u in t.attributes) {
      const f = t.attributes[u], d = e.getAccessor(f);
      d != null && d.min && d !== null && d !== void 0 && d.max && (l.min = d.min, l.max = d.max);
    }
  t.attributes = h, a.indices && (t.indices = Ih(a.indices)), e.removeObjectExtension(t, ee), gp(t);
}
function mp(e, t) {
  var n;
  let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 4, r = arguments.length > 3 ? arguments[3] : void 0, i = arguments.length > 4 ? arguments[4] : void 0;
  if (!r.DracoWriter)
    throw new Error("options.gltf.DracoWriter not provided");
  const o = r.DracoWriter.encodeSync({
    attributes: e
  }), c = i == null || (n = i.parseSync) === null || n === void 0 ? void 0 : n.call(i, {
    attributes: e
  }), a = r._addFauxAttributes(c.attributes), h = r.addBufferView(o);
  return {
    primitives: [{
      attributes: a,
      mode: s,
      extensions: {
        [ee]: {
          bufferView: h,
          attributes: a
        }
      }
    }]
  };
}
function gp(e) {
  if (!e.attributes && Object.keys(e.attributes).length > 0)
    throw new Error("glTF: Empty primitive detected: Draco decompression failure?");
}
function* Oh(e) {
  for (const t of e.json.meshes || [])
    for (const n of t.primitives)
      yield n;
}
const Ap = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: lp,
  encode: fp,
  name: hp,
  preprocess: up
}, Symbol.toStringTag, { value: "Module" })), Bi = "KHR_texture_transform", pp = Bi, xn = new w(), yp = new K(), Bp = new K();
async function Tp(e, t) {
  var n;
  if (!new st(e).hasExtension(Bi) || !((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const i = e.json.materials || [];
  for (let o = 0; o < i.length; o++)
    Ep(o, e);
}
function Ep(e, t) {
  var n, s, r;
  const i = [], o = (n = t.json.materials) === null || n === void 0 ? void 0 : n[e], c = o == null || (s = o.pbrMetallicRoughness) === null || s === void 0 ? void 0 : s.baseColorTexture;
  c && Pe(t, e, c, i);
  const a = o == null ? void 0 : o.emissiveTexture;
  a && Pe(t, e, a, i);
  const h = o == null ? void 0 : o.normalTexture;
  h && Pe(t, e, h, i);
  const u = o == null ? void 0 : o.occlusionTexture;
  u && Pe(t, e, u, i);
  const l = o == null || (r = o.pbrMetallicRoughness) === null || r === void 0 ? void 0 : r.metallicRoughnessTexture;
  l && Pe(t, e, l, i);
}
function Pe(e, t, n, s) {
  const r = Cp(n, s);
  if (!r)
    return;
  const i = e.json.meshes || [];
  for (const o of i)
    for (const c of o.primitives) {
      const a = c.material;
      Number.isFinite(a) && t === a && bp(e, c, r);
    }
}
function Cp(e, t) {
  var n;
  const s = (n = e.extensions) === null || n === void 0 ? void 0 : n[Bi], {
    texCoord: r = 0
  } = e, {
    texCoord: i = r
  } = s;
  if (!(t.findIndex((c) => {
    let [a, h] = c;
    return a === r && h === i;
  }) !== -1)) {
    const c = Mp(s);
    return r !== i && (e.texCoord = i), t.push([r, i]), {
      originalTexCoord: r,
      texCoord: i,
      matrix: c
    };
  }
  return null;
}
function bp(e, t, n) {
  const {
    originalTexCoord: s,
    texCoord: r,
    matrix: i
  } = n, o = t.attributes[`TEXCOORD_${s}`];
  if (Number.isFinite(o)) {
    var c;
    const h = (c = e.json.accessors) === null || c === void 0 ? void 0 : c[o];
    if (h && h.bufferView) {
      var a;
      const u = (a = e.json.bufferViews) === null || a === void 0 ? void 0 : a[h.bufferView];
      if (u) {
        const {
          arrayBuffer: l,
          byteOffset: f
        } = e.buffers[u.buffer], d = (f || 0) + (h.byteOffset || 0) + (u.byteOffset || 0), {
          ArrayType: m,
          length: g
        } = fi(h, u), A = gh[h.componentType], p = mh[h.type], C = u.byteStride || A * p, T = new Float32Array(g);
        for (let E = 0; E < h.count; E++) {
          const b = new m(l, d + E * C, 2);
          xn.set(b[0], b[1], 1), xn.transformByMatrix3(i), T.set([xn[0], xn[1]], E * p);
        }
        s === r ? wp(h, u, e.buffers, T) : _p(r, h, t, e, T);
      }
    }
  }
}
function wp(e, t, n, s) {
  e.componentType = 5126, n.push({
    arrayBuffer: s.buffer,
    byteOffset: 0,
    byteLength: s.buffer.byteLength
  }), t.buffer = n.length - 1, t.byteLength = s.buffer.byteLength, t.byteOffset = 0, delete t.byteStride;
}
function _p(e, t, n, s, r) {
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
function Mp(e) {
  const {
    offset: t = [0, 0],
    rotation: n = 0,
    scale: s = [1, 1]
  } = e, r = new K().set(1, 0, 0, 0, 1, 0, t[0], t[1], 1), i = yp.set(Math.cos(n), Math.sin(n), 0, -Math.sin(n), Math.cos(n), 0, 0, 0, 1), o = Bp.set(s[0], 0, 0, 0, s[1], 0, 0, 0, 1);
  return r.multiplyRight(i).multiplyRight(o);
}
const Rp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Tp,
  name: pp
}, Symbol.toStringTag, { value: "Module" })), ce = "KHR_lights_punctual", Sp = ce;
async function Ip(e) {
  const t = new st(e), {
    json: n
  } = t, s = t.getExtension(ce);
  s && (t.json.lights = s.lights, t.removeExtension(ce));
  for (const r of n.nodes || []) {
    const i = t.getObjectExtension(r, ce);
    i && (r.light = i.light), t.removeObjectExtension(r, ce);
  }
}
async function Op(e) {
  const t = new st(e), {
    json: n
  } = t;
  if (n.lights) {
    const s = t.addExtension(ce);
    At(!s.lights), s.lights = n.lights, delete n.lights;
  }
  if (t.json.lights) {
    for (const s of t.json.lights) {
      const r = s.node;
      t.addObjectExtension(r, ce, s);
    }
    delete t.json.lights;
  }
}
const vp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Ip,
  encode: Op,
  name: Sp
}, Symbol.toStringTag, { value: "Module" })), nn = "KHR_materials_unlit", xp = nn;
async function Fp(e) {
  const t = new st(e), {
    json: n
  } = t;
  for (const s of n.materials || [])
    s.extensions && s.extensions.KHR_materials_unlit && (s.unlit = !0), t.removeObjectExtension(s, nn);
  t.removeExtension(nn);
}
function Lp(e) {
  const t = new st(e), {
    json: n
  } = t;
  if (t.materials)
    for (const s of n.materials || [])
      s.unlit && (delete s.unlit, t.addObjectExtension(s, nn, {}), t.addExtension(nn));
}
const Dp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Fp,
  encode: Lp,
  name: xp
}, Symbol.toStringTag, { value: "Module" })), Je = "KHR_techniques_webgl", Gp = Je;
async function Np(e) {
  const t = new st(e), {
    json: n
  } = t, s = t.getExtension(Je);
  if (s) {
    const r = Up(s, t);
    for (const i of n.materials || []) {
      const o = t.getObjectExtension(i, Je);
      o && (i.technique = Object.assign({}, o, r[o.technique]), i.technique.values = Hp(i.technique, t)), t.removeObjectExtension(i, Je);
    }
    t.removeExtension(Je);
  }
}
async function Pp(e, t) {
}
function Up(e, t) {
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
function Hp(e, t) {
  const n = Object.assign({}, e.values);
  return Object.keys(e.uniforms || {}).forEach((s) => {
    e.uniforms[s].value && !(s in n) && (n[s] = e.uniforms[s].value);
  }), Object.keys(n).forEach((s) => {
    typeof n[s] == "object" && n[s].index !== void 0 && (n[s].texture = t.getTexture(n[s].index));
  }), n;
}
const kp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Np,
  encode: Pp,
  name: Gp
}, Symbol.toStringTag, { value: "Module" })), vh = [H1, C1, ZA, np, ip, Ap, vp, Dp, kp, Rp, sA];
function $p(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = vh.filter((i) => xh(i.name, t));
  for (const i of s) {
    var r;
    (r = i.preprocess) === null || r === void 0 || r.call(i, e, t, n);
  }
}
async function Vp(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = vh.filter((i) => xh(i.name, t));
  for (const i of s) {
    var r;
    await ((r = i.decode) === null || r === void 0 ? void 0 : r.call(i, e, t, n));
  }
}
function xh(e, t) {
  var n;
  const s = (t == null || (n = t.gltf) === null || n === void 0 ? void 0 : n.excludeExtensions) || {};
  return !(e in s && !s[e]);
}
const er = "KHR_binary_glTF";
function Jp(e) {
  const t = new st(e), {
    json: n
  } = t;
  for (const s of n.images || []) {
    const r = t.getObjectExtension(s, er);
    r && Object.assign(s, r), t.removeObjectExtension(s, er);
  }
  n.buffers && n.buffers[0] && delete n.buffers[0].uri, t.removeExtension(er);
}
const zo = {
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
}, Wp = {
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
class zp {
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
    console.warn("Converting glTF v1 to glTF v2 format. This is experimental and may fail."), this._addAsset(s), this._convertTopLevelObjectsToArrays(s), Jp(t), this._convertObjectIdsToArrayIndices(s), this._updateObjects(s), this._updateMaterial(s);
  }
  _addAsset(t) {
    t.asset = t.asset || {}, t.asset.version = "2.0", t.asset.generator = t.asset.generator || "Normalized to glTF 2.0 by loaders.gl";
  }
  _convertTopLevelObjectsToArrays(t) {
    for (const n in zo)
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
    for (const n in zo)
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
    const s = Wp[n];
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
      const o = ((n = i.values) === null || n === void 0 ? void 0 : n.tex) || ((s = i.values) === null || s === void 0 ? void 0 : s.texture2d_0) || ((r = i.values) === null || r === void 0 ? void 0 : r.diffuseTex), c = t.textures.findIndex((a) => a.id === o);
      c !== -1 && (i.pbrMetallicRoughness.baseColorTexture = {
        index: c
      });
    }
  }
}
function jp(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new zp().normalize(e, t);
}
async function Kp(e, t) {
  var n, s, r;
  let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 ? arguments[3] : void 0, c = arguments.length > 4 ? arguments[4] : void 0;
  return qp(e, t, i, o), jp(e, {
    normalize: o == null || (n = o.gltf) === null || n === void 0 ? void 0 : n.normalize
  }), $p(e, o, c), o != null && (s = o.gltf) !== null && s !== void 0 && s.loadBuffers && e.json.buffers && await Xp(e, o, c), o != null && (r = o.gltf) !== null && r !== void 0 && r.loadImages && await Qp(e, o, c), await Vp(e, o, c), e;
}
function qp(e, t, n, s) {
  if (s.uri && (e.baseUri = s.uri), t instanceof ArrayBuffer && !LA(t, n, s) && (t = new TextDecoder().decode(t)), typeof t == "string")
    e.json = r1(t);
  else if (t instanceof ArrayBuffer) {
    const o = {};
    n = DA(o, t, n, s.glb), At(o.type === "glTF", `Invalid GLB magic string ${o.type}`), e._glb = o, e.json = o.json;
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
async function Xp(e, t, n) {
  const s = e.json.buffers || [];
  for (let o = 0; o < s.length; ++o) {
    const c = s[o];
    if (c.uri) {
      var r, i;
      const {
        fetch: a
      } = n;
      At(a);
      const h = Sh(c.uri, t), u = await (n == null || (r = n.fetch) === null || r === void 0 ? void 0 : r.call(n, h)), l = await (u == null || (i = u.arrayBuffer) === null || i === void 0 ? void 0 : i.call(u));
      e.buffers[o] = {
        arrayBuffer: l,
        byteOffset: 0,
        byteLength: l.byteLength
      }, delete c.uri;
    } else
      e.buffers[o] === null && (e.buffers[o] = {
        arrayBuffer: new ArrayBuffer(c.byteLength),
        byteOffset: 0,
        byteLength: c.byteLength
      });
  }
}
async function Qp(e, t, n) {
  const s = Yp(e), r = e.json.images || [], i = [];
  for (const o of s)
    i.push(Zp(e, r[o], o, t, n));
  return await Promise.all(i);
}
function Yp(e) {
  const t = /* @__PURE__ */ new Set(), n = e.json.textures || [];
  for (const s of n)
    s.source !== void 0 && t.add(s.source);
  return Array.from(t).sort();
}
async function Zp(e, t, n, s, r) {
  let i;
  if (t.uri && !t.hasOwnProperty("bufferView")) {
    const c = Sh(t.uri, s), {
      fetch: a
    } = r;
    i = await (await a(c)).arrayBuffer(), t.bufferView = {
      data: i
    };
  }
  if (Number.isFinite(t.bufferView)) {
    const c = f1(e.json, e.buffers, t.bufferView);
    i = dh(c.buffer, c.byteOffset, c.byteLength);
  }
  At(i, "glTF image has no data");
  let o = await fh(i, [Yg, RA], {
    ...s,
    mimeType: t.mimeType,
    basis: s.basis || {
      format: Rh()
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
const ls = {
  name: "glTF",
  id: "gltf",
  module: "gltf",
  version: rA,
  extensions: ["gltf", "glb"],
  mimeTypes: ["model/gltf+json", "model/gltf-binary"],
  text: !0,
  binary: !0,
  tests: ["glTF"],
  parse: ty,
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
async function ty(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  t = {
    ...ls.options,
    ...t
  }, t.gltf = {
    ...ls.options.gltf,
    ...t.gltf
  };
  const {
    byteOffset: s = 0
  } = t;
  return await Kp({}, e, s, t, n);
}
const ey = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, ny = {
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
}, sy = {
  magFilter: pt.TEXTURE_MAG_FILTER,
  minFilter: pt.TEXTURE_MIN_FILTER,
  wrapS: pt.TEXTURE_WRAP_S,
  wrapT: pt.TEXTURE_WRAP_T
}, ry = {
  [pt.TEXTURE_MAG_FILTER]: pt.LINEAR,
  [pt.TEXTURE_MIN_FILTER]: pt.NEAREST_MIPMAP_LINEAR,
  [pt.TEXTURE_WRAP_S]: pt.REPEAT,
  [pt.TEXTURE_WRAP_T]: pt.REPEAT
};
function iy() {
  return {
    id: "default-sampler",
    parameters: ry
  };
}
function oy(e) {
  return ny[e];
}
function cy(e) {
  return ey[e];
}
class ay {
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
      for (const c in o)
        i.attributes[c] = this.getAccessor(o[c]);
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
    const s = oy(t.componentType), r = cy(t.type), i = s * r, o = {
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
      const c = o.bufferView.buffer, {
        ArrayType: a,
        byteLength: h
      } = fi(o, o.bufferView), u = (o.bufferView.byteOffset || 0) + (o.byteOffset || 0) + c.byteOffset;
      let l = c.arrayBuffer.slice(u, u + h);
      o.bufferView.byteStride && (l = this._getValueFromInterleavedBuffer(c, u, o.bufferView.byteStride, o.bytesPerElement, o.count)), o.value = new a(l);
    }
    return o;
  }
  _getValueFromInterleavedBuffer(t, n, s, r, i) {
    const o = new Uint8Array(i * r);
    for (let c = 0; c < i; c++) {
      const a = n + c * s;
      o.set(new Uint8Array(t.arrayBuffer.slice(a, a + r)), c * r);
    }
    return o.buffer;
  }
  _resolveTexture(t, n) {
    return {
      ...t,
      id: t.id || `texture-${n}`,
      sampler: typeof t.sampler == "number" ? this.getSampler(t.sampler) : iy(),
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
    return sy[t];
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
function Fh(e, t) {
  return new ay().postProcess(e, t);
}
const Gr = {
  URI: 0,
  EMBEDDED: 1
};
function Lh(e, t, n, s) {
  e.rotateYtoZ = !0;
  const r = (e.byteOffset || 0) + (e.byteLength || 0) - n;
  if (r === 0)
    throw new Error("glTF byte length must be greater than 0.");
  return e.gltfUpAxis = s != null && s["3d-tiles"] && s["3d-tiles"].assetGltfUpAxis ? s["3d-tiles"].assetGltfUpAxis : "Y", e.gltfArrayBuffer = Wf(t, n, r), e.gltfByteOffset = 0, e.gltfByteLength = r, n % 4 === 0 || console.warn(`${e.type}: embedded glb is not aligned to a 4-byte boundary.`), (e.byteOffset || 0) + (e.byteLength || 0);
}
async function Dh(e, t, n, s) {
  const r = (n == null ? void 0 : n["3d-tiles"]) || {};
  if (hy(e, t), r.loadGLTF) {
    if (!s)
      return;
    if (e.gltfUrl) {
      const {
        fetch: i
      } = s, o = await i(e.gltfUrl, n);
      e.gltfArrayBuffer = await o.arrayBuffer(), e.gltfByteOffset = 0;
    }
    if (e.gltfArrayBuffer) {
      const i = await Zr(e.gltfArrayBuffer, ls, n, s);
      e.gltf = Fh(i), e.gpuMemoryUsageInBytes = ph(e.gltf), delete e.gltfArrayBuffer, delete e.gltfByteOffset, delete e.gltfByteLength;
    }
  }
}
function hy(e, t, n) {
  switch (t) {
    case Gr.URI:
      if (e.gltfArrayBuffer) {
        const s = new Uint8Array(e.gltfArrayBuffer, e.gltfByteOffset), i = new TextDecoder().decode(s);
        e.gltfUrl = i.replace(/[\s\0]+$/, "");
      }
      delete e.gltfArrayBuffer, delete e.gltfByteOffset, delete e.gltfByteLength;
      break;
    case Gr.EMBEDDED:
      break;
    default:
      throw new Error("b3dm: Illegal glTF format field");
  }
}
async function uy(e, t, n, s, r) {
  var i;
  n = ly(e, t, n, s), await Dh(e, Gr.EMBEDDED, s, r);
  const o = e == null || (i = e.gltf) === null || i === void 0 ? void 0 : i.extensions;
  return o && o.CESIUM_RTC && (e.rtcCenter = o.CESIUM_RTC.center), n;
}
function ly(e, t, n, s, r) {
  n = Cs(e, t, n), n = ci(e, t, n), n = ai(e, t, n), n = Lh(e, t, n, s);
  const i = new oi(e.featureTableJson, e.featureTableBinary);
  return e.rtcCenter = i.getGlobalProperty("RTC_CENTER", U.FLOAT, 3), n;
}
async function fy(e, t, n, s, r) {
  return n = dy(e, t, n, s), await Dh(e, e.gltfFormat || 0, s, r), n;
}
function dy(e, t, n, s, r) {
  var i;
  if (n = Cs(e, t, n), e.version !== 1)
    throw new Error(`Instanced 3D Model version ${e.version} is not supported`);
  n = ci(e, t, n);
  const o = new DataView(t);
  if (e.gltfFormat = o.getUint32(n, !0), n += 4, n = ai(e, t, n), n = Lh(e, t, n, s), !(e != null && (i = e.header) !== null && i !== void 0 && i.featureTableJsonByteLength) || e.header.featureTableJsonByteLength === 0)
    throw new Error("i3dm parser: featureTableJsonByteLength is zero.");
  const c = new oi(e.featureTableJson, e.featureTableBinary), a = c.getGlobalProperty("INSTANCES_LENGTH");
  if (c.featuresLength = a, !Number.isFinite(a))
    throw new Error("i3dm parser: INSTANCES_LENGTH must be defined");
  e.eastNorthUp = c.getGlobalProperty("EAST_NORTH_UP"), e.rtcCenter = c.getGlobalProperty("RTC_CENTER", U.FLOAT, 3);
  const h = new ih(e.batchTableJson, e.batchTableBinary, a);
  return my(e, c, h, a), n;
}
function my(e, t, n, s) {
  const r = new Array(s), i = new w();
  new w(), new w(), new w();
  const o = new K(), c = new Sr(), a = new w(), h = {}, u = new Tt(), l = [], f = [], d = [], m = [];
  for (let g = 0; g < s; g++) {
    let A;
    if (t.hasProperty("POSITION"))
      A = t.getProperty("POSITION", U.FLOAT, 3, g, i);
    else if (t.hasProperty("POSITION_QUANTIZED")) {
      A = t.getProperty("POSITION_QUANTIZED", U.UNSIGNED_SHORT, 3, g, i);
      const y = t.getGlobalProperty("QUANTIZED_VOLUME_OFFSET", U.FLOAT, 3);
      if (!y)
        throw new Error("i3dm parser: QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.");
      const F = t.getGlobalProperty("QUANTIZED_VOLUME_SCALE", U.FLOAT, 3);
      if (!F)
        throw new Error("i3dm parser: QUANTIZED_VOLUME_SCALE must be defined for quantized positions.");
      const x = 65535;
      for (let I = 0; I < 3; I++)
        A[I] = A[I] / x * F[I] + y[I];
    }
    if (!A)
      throw new Error("i3dm: POSITION or POSITION_QUANTIZED must be defined for each instance.");
    if (i.copy(A), h.translation = i, e.normalUp = t.getProperty("NORMAL_UP", U.FLOAT, 3, g, l), e.normalRight = t.getProperty("NORMAL_RIGHT", U.FLOAT, 3, g, f), e.normalUp) {
      if (!e.normalRight)
        throw new Error("i3dm: Custom orientation requires both NORMAL_UP and NORMAL_RIGHT.");
      e.hasCustomOrientation = !0;
    } else {
      if (e.octNormalUp = t.getProperty("NORMAL_UP_OCT32P", U.UNSIGNED_SHORT, 2, g, l), e.octNormalRight = t.getProperty("NORMAL_RIGHT_OCT32P", U.UNSIGNED_SHORT, 2, g, f), e.octNormalUp)
        throw e.octNormalRight ? new Error("i3dm: oct-encoded orientation not implemented") : new Error("i3dm: oct-encoded orientation requires NORMAL_UP_OCT32P and NORMAL_RIGHT_OCT32P");
      e.eastNorthUp ? (rs.WGS84.eastNorthUpToFixedFrame(i, u), u.getRotationMatrix3(o)) : o.identity();
    }
    c.fromMatrix3(o), h.rotation = c, a.set(1, 1, 1);
    const p = t.getProperty("SCALE", U.FLOAT, 1, g, d);
    Number.isFinite(p) && a.multiplyByScalar(p);
    const C = t.getProperty("SCALE_NON_UNIFORM", U.FLOAT, 3, g, l);
    C && a.scale(C), h.scale = a;
    let T = t.getProperty("BATCH_ID", U.UNSIGNED_SHORT, 1, g, m);
    T === void 0 && (T = g);
    const E = new Tt().fromQuaternion(h.rotation);
    u.identity(), u.translate(h.translation), u.multiplyRight(E), u.scale(h.scale);
    const b = u.clone();
    r[g] = {
      modelMatrix: b,
      batchId: T
    };
  }
  e.instances = r;
}
async function gy(e, t, n, s, r, i) {
  n = Cs(e, t, n);
  const o = new DataView(t);
  for (e.tilesLength = o.getUint32(n, !0), n += 4, e.tiles = []; e.tiles.length < e.tilesLength && (e.byteLength || 0) - n > 12; ) {
    const c = {
      shape: "tile3d"
    };
    e.tiles.push(c), n = await i(t, n, s, r, c);
  }
  return n;
}
async function Ay(e, t, n, s) {
  var r, i;
  if (e.rotateYtoZ = !0, e.gltfUpAxis = n != null && (r = n["3d-tiles"]) !== null && r !== void 0 && r.assetGltfUpAxis ? n["3d-tiles"].assetGltfUpAxis : "Y", n != null && (i = n["3d-tiles"]) !== null && i !== void 0 && i.loadGLTF) {
    if (!s)
      return t.byteLength;
    const o = await Zr(t, ls, n, s);
    e.gltf = Fh(o), e.gpuMemoryUsageInBytes = ph(e.gltf);
  } else
    e.gltfArrayBuffer = t;
  return t.byteLength;
}
async function Gh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
    shape: "tile3d"
  };
  switch (r.byteOffset = t, r.type = Bm(e, t), r.type) {
    case De.COMPOSITE:
      return await gy(r, e, t, n, s, Gh);
    case De.BATCHED_3D_MODEL:
      return await uy(r, e, t, n, s);
    case De.GLTF:
      return await Ay(r, e, n, s);
    case De.INSTANCED_3D_MODEL:
      return await fy(r, e, t, n, s);
    case De.POINT_CLOUD:
      return await lg(r, e, t, n, s);
    default:
      throw new Error(`3DTileLoader: unknown type ${r.type}`);
  }
}
const py = 1952609651, yy = 1;
async function By(e, t, n) {
  if (new Uint32Array(e.slice(0, 4))[0] !== py)
    throw new Error("Wrong subtree file magic number");
  if (new Uint32Array(e.slice(4, 8))[0] !== yy)
    throw new Error("Wrong subtree file verson, must be 1");
  const i = jo(e.slice(8, 16)), o = new Uint8Array(e, 24, i), a = new TextDecoder("utf8").decode(o), h = JSON.parse(a), u = jo(e.slice(16, 24));
  let l = new ArrayBuffer(0);
  if (u && (l = e.slice(24 + i)), await Fn(h, h.tileAvailability, l, n), Array.isArray(h.contentAvailability))
    for (const f of h.contentAvailability)
      await Fn(h, f, l, n);
  else
    await Fn(h, h.contentAvailability, l, n);
  return await Fn(h, h.childSubtreeAvailability, l, n), h;
}
async function Fn(e, t, n, s) {
  const r = Number.isFinite(t.bitstream) ? t.bitstream : t.bufferView;
  if (typeof r != "number")
    return;
  const i = e.bufferViews[r], o = e.buffers[i.buffer];
  if (!(s != null && s.baseUrl))
    throw new Error("Url is not provided");
  if (!s.fetch)
    throw new Error("fetch is not provided");
  if (o.uri) {
    const a = `${(s == null ? void 0 : s.baseUrl) || ""}/${o.uri}`, u = await (await s.fetch(a)).arrayBuffer();
    t.explicitBitstream = new Uint8Array(u, i.byteOffset, i.byteLength);
    return;
  }
  const c = e.buffers.slice(0, i.buffer).reduce((a, h) => a + h.byteLength, 0);
  t.explicitBitstream = new Uint8Array(n.slice(c, c + o.byteLength), i.byteOffset, i.byteLength);
}
function jo(e) {
  const t = new DataView(e), n = t.getUint32(0, !0), s = t.getUint32(4, !0);
  return n + 2 ** 32 * s;
}
const Nh = {
  id: "3d-tiles-subtree",
  name: "3D Tiles Subtree",
  module: "3d-tiles",
  version: th,
  extensions: ["subtree"],
  mimeTypes: ["application/octet-stream"],
  tests: ["subtree"],
  parse: By,
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
var Et = null;
try {
  Et = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
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
function $(e, t, n) {
  this.low = e | 0, this.high = t | 0, this.unsigned = !!n;
}
$.prototype.__isLong__;
Object.defineProperty($.prototype, "__isLong__", { value: !0 });
function rt(e) {
  return (e && e.__isLong__) === !0;
}
function Ko(e) {
  var t = Math.clz32(e & -e);
  return e ? 31 - t : t;
}
$.isLong = rt;
var qo = {}, Xo = {};
function me(e, t) {
  var n, s, r;
  return t ? (e >>>= 0, (r = 0 <= e && e < 256) && (s = Xo[e], s) ? s : (n = H(e, 0, !0), r && (Xo[e] = n), n)) : (e |= 0, (r = -128 <= e && e < 128) && (s = qo[e], s) ? s : (n = H(e, e < 0 ? -1 : 0, !1), r && (qo[e] = n), n));
}
$.fromInt = me;
function Ct(e, t) {
  if (isNaN(e))
    return t ? jt : Ot;
  if (t) {
    if (e < 0)
      return jt;
    if (e >= Ph)
      return kh;
  } else {
    if (e <= -Yo)
      return lt;
    if (e + 1 >= Yo)
      return Hh;
  }
  return e < 0 ? Ct(-e, t).neg() : H(e % Oe | 0, e / Oe | 0, t);
}
$.fromNumber = Ct;
function H(e, t, n) {
  return new $(e, t, n);
}
$.fromBits = H;
var fs = Math.pow;
function Ti(e, t, n) {
  if (e.length === 0)
    throw Error("empty string");
  if (typeof t == "number" ? (n = t, t = !1) : t = !!t, e === "NaN" || e === "Infinity" || e === "+Infinity" || e === "-Infinity")
    return t ? jt : Ot;
  if (n = n || 10, n < 2 || 36 < n)
    throw RangeError("radix");
  var s;
  if ((s = e.indexOf("-")) > 0)
    throw Error("interior hyphen");
  if (s === 0)
    return Ti(e.substring(1), t, n).neg();
  for (var r = Ct(fs(n, 8)), i = Ot, o = 0; o < e.length; o += 8) {
    var c = Math.min(8, e.length - o), a = parseInt(e.substring(o, o + c), n);
    if (c < 8) {
      var h = Ct(fs(n, c));
      i = i.mul(h).add(Ct(a));
    } else
      i = i.mul(r), i = i.add(Ct(a));
  }
  return i.unsigned = t, i;
}
$.fromString = Ti;
function Ft(e, t) {
  return typeof e == "number" ? Ct(e, t) : typeof e == "string" ? Ti(e, t) : H(e.low, e.high, typeof t == "boolean" ? t : e.unsigned);
}
$.fromValue = Ft;
var Qo = 65536, Ty = 1 << 24, Oe = Qo * Qo, Ph = Oe * Oe, Yo = Ph / 2, Zo = me(Ty), Ot = me(0);
$.ZERO = Ot;
var jt = me(0, !0);
$.UZERO = jt;
var Re = me(1);
$.ONE = Re;
var Uh = me(1, !0);
$.UONE = Uh;
var Nr = me(-1);
$.NEG_ONE = Nr;
var Hh = H(-1, 2147483647, !1);
$.MAX_VALUE = Hh;
var kh = H(-1, -1, !0);
$.MAX_UNSIGNED_VALUE = kh;
var lt = H(0, -2147483648, !1);
$.MIN_VALUE = lt;
var _ = $.prototype;
_.toInt = function() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
_.toNumber = function() {
  return this.unsigned ? (this.high >>> 0) * Oe + (this.low >>> 0) : this.high * Oe + (this.low >>> 0);
};
_.toString = function(t) {
  if (t = t || 10, t < 2 || 36 < t)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative())
    if (this.eq(lt)) {
      var n = Ct(t), s = this.div(n), r = s.mul(n).sub(this);
      return s.toString(t) + r.toInt().toString(t);
    } else
      return "-" + this.neg().toString(t);
  for (var i = Ct(fs(t, 6), this.unsigned), o = this, c = ""; ; ) {
    var a = o.div(i), h = o.sub(a.mul(i)).toInt() >>> 0, u = h.toString(t);
    if (o = a, o.isZero())
      return u + c;
    for (; u.length < 6; )
      u = "0" + u;
    c = "" + u + c;
  }
};
_.getHighBits = function() {
  return this.high;
};
_.getHighBitsUnsigned = function() {
  return this.high >>> 0;
};
_.getLowBits = function() {
  return this.low;
};
_.getLowBitsUnsigned = function() {
  return this.low >>> 0;
};
_.getNumBitsAbs = function() {
  if (this.isNegative())
    return this.eq(lt) ? 64 : this.neg().getNumBitsAbs();
  for (var t = this.high != 0 ? this.high : this.low, n = 31; n > 0 && !(t & 1 << n); n--)
    ;
  return this.high != 0 ? n + 33 : n + 1;
};
_.isZero = function() {
  return this.high === 0 && this.low === 0;
};
_.eqz = _.isZero;
_.isNegative = function() {
  return !this.unsigned && this.high < 0;
};
_.isPositive = function() {
  return this.unsigned || this.high >= 0;
};
_.isOdd = function() {
  return (this.low & 1) === 1;
};
_.isEven = function() {
  return (this.low & 1) === 0;
};
_.equals = function(t) {
  return rt(t) || (t = Ft(t)), this.unsigned !== t.unsigned && this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low;
};
_.eq = _.equals;
_.notEquals = function(t) {
  return !this.eq(
    /* validates */
    t
  );
};
_.neq = _.notEquals;
_.ne = _.notEquals;
_.lessThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) < 0;
};
_.lt = _.lessThan;
_.lessThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) <= 0;
};
_.lte = _.lessThanOrEqual;
_.le = _.lessThanOrEqual;
_.greaterThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) > 0;
};
_.gt = _.greaterThan;
_.greaterThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) >= 0;
};
_.gte = _.greaterThanOrEqual;
_.ge = _.greaterThanOrEqual;
_.compare = function(t) {
  if (rt(t) || (t = Ft(t)), this.eq(t))
    return 0;
  var n = this.isNegative(), s = t.isNegative();
  return n && !s ? -1 : !n && s ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1;
};
_.comp = _.compare;
_.negate = function() {
  return !this.unsigned && this.eq(lt) ? lt : this.not().add(Re);
};
_.neg = _.negate;
_.add = function(t) {
  rt(t) || (t = Ft(t));
  var n = this.high >>> 16, s = this.high & 65535, r = this.low >>> 16, i = this.low & 65535, o = t.high >>> 16, c = t.high & 65535, a = t.low >>> 16, h = t.low & 65535, u = 0, l = 0, f = 0, d = 0;
  return d += i + h, f += d >>> 16, d &= 65535, f += r + a, l += f >>> 16, f &= 65535, l += s + c, u += l >>> 16, l &= 65535, u += n + o, u &= 65535, H(f << 16 | d, u << 16 | l, this.unsigned);
};
_.subtract = function(t) {
  return rt(t) || (t = Ft(t)), this.add(t.neg());
};
_.sub = _.subtract;
_.multiply = function(t) {
  if (this.isZero())
    return this;
  if (rt(t) || (t = Ft(t)), Et) {
    var n = Et.mul(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return H(n, Et.get_high(), this.unsigned);
  }
  if (t.isZero())
    return this.unsigned ? jt : Ot;
  if (this.eq(lt))
    return t.isOdd() ? lt : Ot;
  if (t.eq(lt))
    return this.isOdd() ? lt : Ot;
  if (this.isNegative())
    return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
  if (t.isNegative())
    return this.mul(t.neg()).neg();
  if (this.lt(Zo) && t.lt(Zo))
    return Ct(this.toNumber() * t.toNumber(), this.unsigned);
  var s = this.high >>> 16, r = this.high & 65535, i = this.low >>> 16, o = this.low & 65535, c = t.high >>> 16, a = t.high & 65535, h = t.low >>> 16, u = t.low & 65535, l = 0, f = 0, d = 0, m = 0;
  return m += o * u, d += m >>> 16, m &= 65535, d += i * u, f += d >>> 16, d &= 65535, d += o * h, f += d >>> 16, d &= 65535, f += r * u, l += f >>> 16, f &= 65535, f += i * h, l += f >>> 16, f &= 65535, f += o * a, l += f >>> 16, f &= 65535, l += s * u + r * h + i * a + o * c, l &= 65535, H(d << 16 | m, l << 16 | f, this.unsigned);
};
_.mul = _.multiply;
_.divide = function(t) {
  if (rt(t) || (t = Ft(t)), t.isZero())
    throw Error("division by zero");
  if (Et) {
    if (!this.unsigned && this.high === -2147483648 && t.low === -1 && t.high === -1)
      return this;
    var n = (this.unsigned ? Et.div_u : Et.div_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return H(n, Et.get_high(), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? jt : Ot;
  var s, r, i;
  if (this.unsigned) {
    if (t.unsigned || (t = t.toUnsigned()), t.gt(this))
      return jt;
    if (t.gt(this.shru(1)))
      return Uh;
    i = jt;
  } else {
    if (this.eq(lt)) {
      if (t.eq(Re) || t.eq(Nr))
        return lt;
      if (t.eq(lt))
        return Re;
      var o = this.shr(1);
      return s = o.div(t).shl(1), s.eq(Ot) ? t.isNegative() ? Re : Nr : (r = this.sub(t.mul(s)), i = s.add(r.div(t)), i);
    } else if (t.eq(lt))
      return this.unsigned ? jt : Ot;
    if (this.isNegative())
      return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
    if (t.isNegative())
      return this.div(t.neg()).neg();
    i = Ot;
  }
  for (r = this; r.gte(t); ) {
    s = Math.max(1, Math.floor(r.toNumber() / t.toNumber()));
    for (var c = Math.ceil(Math.log(s) / Math.LN2), a = c <= 48 ? 1 : fs(2, c - 48), h = Ct(s), u = h.mul(t); u.isNegative() || u.gt(r); )
      s -= a, h = Ct(s, this.unsigned), u = h.mul(t);
    h.isZero() && (h = Re), i = i.add(h), r = r.sub(u);
  }
  return i;
};
_.div = _.divide;
_.modulo = function(t) {
  if (rt(t) || (t = Ft(t)), Et) {
    var n = (this.unsigned ? Et.rem_u : Et.rem_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return H(n, Et.get_high(), this.unsigned);
  }
  return this.sub(this.div(t).mul(t));
};
_.mod = _.modulo;
_.rem = _.modulo;
_.not = function() {
  return H(~this.low, ~this.high, this.unsigned);
};
_.countLeadingZeros = function() {
  return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
};
_.clz = _.countLeadingZeros;
_.countTrailingZeros = function() {
  return this.low ? Ko(this.low) : Ko(this.high) + 32;
};
_.ctz = _.countTrailingZeros;
_.and = function(t) {
  return rt(t) || (t = Ft(t)), H(this.low & t.low, this.high & t.high, this.unsigned);
};
_.or = function(t) {
  return rt(t) || (t = Ft(t)), H(this.low | t.low, this.high | t.high, this.unsigned);
};
_.xor = function(t) {
  return rt(t) || (t = Ft(t)), H(this.low ^ t.low, this.high ^ t.high, this.unsigned);
};
_.shiftLeft = function(t) {
  return rt(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? H(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : H(0, this.low << t - 32, this.unsigned);
};
_.shl = _.shiftLeft;
_.shiftRight = function(t) {
  return rt(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? H(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : H(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
_.shr = _.shiftRight;
_.shiftRightUnsigned = function(t) {
  return rt(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? H(this.low >>> t | this.high << 32 - t, this.high >>> t, this.unsigned) : t === 32 ? H(this.high, 0, this.unsigned) : H(this.high >>> t - 32, 0, this.unsigned);
};
_.shru = _.shiftRightUnsigned;
_.shr_u = _.shiftRightUnsigned;
_.rotateLeft = function(t) {
  var n;
  return rt(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t === 32 ? H(this.high, this.low, this.unsigned) : t < 32 ? (n = 32 - t, H(this.low << t | this.high >>> n, this.high << t | this.low >>> n, this.unsigned)) : (t -= 32, n = 32 - t, H(this.high << t | this.low >>> n, this.low << t | this.high >>> n, this.unsigned));
};
_.rotl = _.rotateLeft;
_.rotateRight = function(t) {
  var n;
  return rt(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t === 32 ? H(this.high, this.low, this.unsigned) : t < 32 ? (n = 32 - t, H(this.high << n | this.low >>> t, this.low << n | this.high >>> t, this.unsigned)) : (t -= 32, n = 32 - t, H(this.low << n | this.high >>> t, this.high << n | this.low >>> t, this.unsigned));
};
_.rotr = _.rotateRight;
_.toSigned = function() {
  return this.unsigned ? H(this.low, this.high, !1) : this;
};
_.toUnsigned = function() {
  return this.unsigned ? this : H(this.low, this.high, !0);
};
_.toBytes = function(t) {
  return t ? this.toBytesLE() : this.toBytesBE();
};
_.toBytesLE = function() {
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
_.toBytesBE = function() {
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
$.fromBytes = function(t, n, s) {
  return s ? $.fromBytesLE(t, n) : $.fromBytesBE(t, n);
};
$.fromBytesLE = function(t, n) {
  return new $(
    t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24,
    t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24,
    n
  );
};
$.fromBytesBE = function(t, n) {
  return new $(
    t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7],
    t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3],
    n
  );
};
const Ey = 16;
function $h(e) {
  e === "X" && (e = "");
  const t = e.padEnd(Ey, "0");
  return $.fromString(t, !0, 16);
}
function Cy(e) {
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
function by(e, t) {
  const n = wy(e).shiftRightUnsigned(2);
  return e.add($.fromNumber(2 * t + 1 - 4).multiply(n));
}
function wy(e) {
  return e.and(e.not().add(1));
}
const _y = 3, My = 30, Ry = 2 * My + 1, tc = 180 / Math.PI;
function Sy(e) {
  if (e.length === 0)
    throw new Error(`Invalid Hilbert quad key ${e}`);
  const t = e.split("/"), n = parseInt(t[0], 10), s = t[1], r = s.length;
  let i = 0;
  const o = [0, 0];
  for (let c = r - 1; c >= 0; c--) {
    i = r - c;
    const a = s[c];
    let h = 0, u = 0;
    a === "1" ? u = 1 : a === "2" ? (h = 1, u = 1) : a === "3" && (h = 1);
    const l = Math.pow(2, i - 1);
    Oy(l, o, h, u), o[0] += l * h, o[1] += l * u;
  }
  if (n % 2 === 1) {
    const c = o[0];
    o[0] = o[1], o[1] = c;
  }
  return {
    face: n,
    ij: o,
    level: i
  };
}
function Iy(e) {
  if (e.isZero())
    return "";
  let t = e.toString(2);
  for (; t.length < _y + Ry; )
    t = "0" + t;
  const n = t.lastIndexOf("1"), s = t.substring(0, 3), r = t.substring(3, n), i = r.length / 2, o = $.fromString(s, !0, 2).toString(10);
  let c = "";
  if (i !== 0)
    for (c = $.fromString(r, !0, 2).toString(4); c.length < i; )
      c = "0" + c;
  return `${o}/${c}`;
}
function Vh(e, t, n) {
  const s = 1 << t;
  return [(e[0] + n[0]) / s, (e[1] + n[1]) / s];
}
function ec(e) {
  return e >= 0.5 ? 1 / 3 * (4 * e * e - 1) : 1 / 3 * (1 - 4 * (1 - e) * (1 - e));
}
function Jh(e) {
  return [ec(e[0]), ec(e[1])];
}
function Wh(e, t) {
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
function zh(e) {
  let [t, n, s] = e;
  const r = Math.atan2(s, Math.sqrt(t * t + n * n));
  return [Math.atan2(n, t) * tc, r * tc];
}
function Oy(e, t, n, s) {
  if (s === 0) {
    n === 1 && (t[0] = e - 1 - t[0], t[1] = e - 1 - t[1]);
    const r = t[0];
    t[0] = t[1], t[1] = r;
  }
}
function vy(e) {
  const t = Vh(e.ij, e.level, [0.5, 0.5]), n = Jh(t), s = Wh(e.face, n);
  return zh(s);
}
const xy = 100;
function nc(e) {
  const {
    face: t,
    ij: n,
    level: s
  } = e, r = [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]], i = Math.max(1, Math.ceil(xy * Math.pow(2, -s))), o = new Float64Array(4 * i * 2 + 2);
  let c = 0, a = 0;
  for (let h = 0; h < 4; h++) {
    const u = r[h].slice(0), l = r[h + 1], f = (l[0] - u[0]) / i, d = (l[1] - u[1]) / i;
    for (let m = 0; m < i; m++) {
      u[0] += f, u[1] += d;
      const g = Vh(n, s, u), A = Jh(g), p = Wh(t, A), C = zh(p);
      Math.abs(C[1]) > 89.999 && (C[0] = a);
      const T = C[0] - a;
      C[0] += T > 180 ? -360 : T < -180 ? 360 : 0, o[c++] = C[0], o[c++] = C[1], a = C[0];
    }
  }
  return o[c++] = o[0], o[c++] = o[1], o;
}
function Ei(e) {
  const t = Fy(e);
  return Sy(t);
}
function Fy(e) {
  if (e.indexOf("/") > 0)
    return e;
  const t = $h(e);
  return Iy(t);
}
function Ly(e) {
  const t = Ei(e);
  return vy(t);
}
function Dy(e) {
  let t;
  if (e.face === 2 || e.face === 5) {
    let n = null, s = 0;
    for (let r = 0; r < 4; r++) {
      const i = `${e.face}/${r}`, o = Ei(i), c = nc(o);
      (typeof n > "u" || n === null) && (n = new Float64Array(4 * c.length)), n.set(c, s), s += c.length;
    }
    t = sc(n);
  } else {
    const n = nc(e);
    t = sc(n);
  }
  return t;
}
function sc(e) {
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
function Gy(e, t) {
  const n = (t == null ? void 0 : t.minimumHeight) || 0, s = (t == null ? void 0 : t.maximumHeight) || 0, r = Ei(e), i = Dy(r), o = i.west, c = i.south, a = i.east, h = i.north, u = [];
  return u.push(new w(o, h, n)), u.push(new w(a, h, n)), u.push(new w(a, c, n)), u.push(new w(o, c, n)), u.push(new w(o, h, s)), u.push(new w(a, h, s)), u.push(new w(a, c, s)), u.push(new w(o, c, s)), u;
}
function jh(e) {
  const t = e.token, n = {
    minimumHeight: e.minimumHeight,
    maximumHeight: e.maximumHeight
  }, s = Gy(t, n), r = Ly(t), i = r[0], o = r[1], c = rs.WGS84.cartographicToCartesian([i, o, n.maximumHeight]), a = new w(c[0], c[1], c[2]);
  s.push(a);
  const h = pm(s);
  return [...h.center, ...h.halfAxes];
}
const Ny = 4, Py = 8, Uy = {
  QUADTREE: Ny,
  OCTREE: Py
};
function Hy(e, t, n) {
  if (e != null && e.box) {
    const s = $h(e.s2VolumeInfo.token), r = by(s, t), i = Cy(r), o = {
      ...e.s2VolumeInfo
    };
    switch (o.token = i, n) {
      case "OCTREE":
        const h = e.s2VolumeInfo, u = h.maximumHeight - h.minimumHeight, l = u / 2, f = h.minimumHeight + u / 2;
        h.minimumHeight = f - l, h.maximumHeight = f + l;
        break;
    }
    return {
      box: jh(o),
      s2VolumeInfo: o
    };
  }
}
async function Kh(e) {
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
    level: c = 0,
    globalData: a = {
      level: 0,
      mortonIndex: 0,
      x: 0,
      y: 0,
      z: 0
    }
  } = e;
  const {
    subdivisionScheme: h,
    subtreeLevels: u,
    maximumLevel: l,
    contentUrlTemplate: f,
    subtreesUriTemplate: d,
    basePath: m
  } = t, g = {
    children: [],
    lodMetricValue: 0,
    contentUrl: ""
  };
  if (!l)
    return _a.once(`Missing 'maximumLevel' or 'availableLevels' property. The subtree ${f} won't be loaded...`), g;
  const A = c + a.level;
  if (A > l)
    return g;
  const p = Uy[h], C = Math.log2(p), T = s & 1, E = s >> 1 & 1, b = s >> 2 & 1, y = (p ** c - 1) / (p - 1);
  let F = ie(n.mortonIndex, s, C), x = y + F, I = ie(n.x, T, 1), v = ie(n.y, E, 1), D = ie(n.z, b, 1), N = !1;
  c >= u && (N = nr(o.childSubtreeAvailability, F));
  const G = ie(a.x, I, c), S = ie(a.y, v, c), z = ie(a.z, D, c);
  if (N) {
    const Vt = `${m}/${d}`, re = Pr(Vt, A, G, S, z);
    o = await Yr(re, Nh, i), a = {
      mortonIndex: F,
      x: I,
      y: v,
      z: D,
      level: c
    }, F = 0, x = 0, I = 0, v = 0, D = 0, c = 0;
  }
  if (!nr(o.tileAvailability, x))
    return g;
  nr(o.contentAvailability, x) && (g.contentUrl = Pr(f, A, G, S, z));
  const ft = c + 1, Lt = {
    mortonIndex: F,
    x: I,
    y: v,
    z: D
  };
  for (let Vt = 0; Vt < p; Vt++) {
    const re = Hy(r, Vt, h), qt = await Kh({
      subtree: o,
      implicitOptions: t,
      loaderOptions: i,
      parentData: Lt,
      childIndex: Vt,
      level: ft,
      globalData: {
        ...a
      },
      s2VolumeBox: re
    });
    if (qt.contentUrl || qt.children.length) {
      const R = A + 1, j = ky(qt, R, {
        childTileX: I,
        childTileY: v,
        childTileZ: D
      }, t, r);
      g.children.push(j);
    }
  }
  return g;
}
function nr(e, t) {
  let n;
  return Array.isArray(e) ? (n = e[0], e.length > 1 && _a.once('Not supported extension "3DTILES_multiple_contents" has been detected')) : n = e, "constant" in n ? !!n.constant : n.explicitBitstream ? Jy(t, n.explicitBitstream) : !1;
}
function ky(e, t, n, s, r) {
  const {
    basePath: i,
    refine: o,
    getRefine: c,
    lodMetricType: a,
    getTileType: h,
    rootLodMetricValue: u,
    rootBoundingVolume: l
  } = s, f = e.contentUrl && e.contentUrl.replace(`${i}/`, ""), d = u / 2 ** t, m = r != null && r.box ? {
    box: r.box
  } : l, g = $y(t, m, n);
  return {
    children: e.children,
    contentUrl: e.contentUrl,
    content: {
      uri: f
    },
    id: e.contentUrl,
    refine: c(o),
    type: h(e),
    lodMetricType: a,
    lodMetricValue: d,
    geometricError: d,
    transform: e.transform,
    boundingVolume: g
  };
}
function $y(e, t, n) {
  if (t.region) {
    const {
      childTileX: s,
      childTileY: r,
      childTileZ: i
    } = n, [o, c, a, h, u, l] = t.region, f = 2 ** e, d = (a - o) / f, m = (h - c) / f, g = (l - u) / f, [A, p] = [o + d * s, o + d * (s + 1)], [C, T] = [c + m * r, c + m * (r + 1)], [E, b] = [u + g * i, u + g * (i + 1)];
    return {
      region: [A, C, p, T, E, b]
    };
  }
  if (t.box)
    return t;
  throw new Error(`Unsupported bounding volume type ${t}`);
}
function ie(e, t, n) {
  return (e << n) + t;
}
function Pr(e, t, n, s, r) {
  const i = Vy({
    level: t,
    x: n,
    y: s,
    z: r
  });
  return e.replace(/{level}|{x}|{y}|{z}/gi, (o) => i[o]);
}
function Vy(e) {
  const t = {};
  for (const n in e)
    t[`{${n}}`] = e[n];
  return t;
}
function Jy(e, t) {
  const n = Math.floor(e / 8), s = e % 8;
  return (t[n] >> s & 1) === 1;
}
function Ci(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  if (!t)
    return In.EMPTY;
  const s = t.split("?")[0].split(".").pop();
  switch (s) {
    case "pnts":
      return In.POINTCLOUD;
    case "i3dm":
    case "b3dm":
    case "glb":
    case "gltf":
      return In.SCENEGRAPH;
    default:
      return s || In.EMPTY;
  }
}
function bi(e) {
  switch (e) {
    case "REPLACE":
    case "replace":
      return Bo.REPLACE;
    case "ADD":
    case "add":
      return Bo.ADD;
    default:
      return e;
  }
}
function Ur(e, t) {
  if (/^[a-z][0-9a-z+.-]*:/i.test(t)) {
    const s = new URL(e, `${t}/`);
    return decodeURI(s.toString());
  } else if (e.startsWith("/"))
    return e;
  return Kf(t, e);
}
function rc(e, t) {
  if (!e)
    return null;
  let n;
  if (e.content) {
    var s;
    const i = e.content.uri || ((s = e.content) === null || s === void 0 ? void 0 : s.url);
    typeof i < "u" && (n = Ur(i, t));
  }
  return {
    ...e,
    id: n,
    contentUrl: n,
    lodMetricType: Es.GEOMETRIC_ERROR,
    lodMetricValue: e.geometricError,
    transformMatrix: e.transform,
    type: Ci(e, n),
    refine: bi(e.refine)
  };
}
async function Wy(e, t, n) {
  let s = null;
  const r = oc(e.root);
  r && e.root ? s = await ic(e.root, e, t, r, n) : s = rc(e.root, t);
  const i = [];
  for (i.push(s); i.length > 0; ) {
    const o = i.pop() || {}, c = o.children || [], a = [];
    for (const h of c) {
      const u = oc(h);
      let l;
      u ? l = await ic(h, e, t, u, n) : l = rc(h, t), l && (a.push(l), i.push(l));
    }
    o.children = a;
  }
  return s;
}
async function ic(e, t, n, s, r) {
  var i, o, c;
  const {
    subdivisionScheme: a,
    maximumLevel: h,
    availableLevels: u,
    subtreeLevels: l,
    subtrees: {
      uri: f
    }
  } = s, d = Pr(f, 0, 0, 0, 0), m = Ur(d, n), g = await Yr(m, Nh, r), A = (i = e.content) === null || i === void 0 ? void 0 : i.uri, p = A ? Ur(A, n) : "", C = t == null || (o = t.root) === null || o === void 0 ? void 0 : o.refine, T = e.geometricError, E = (c = e.boundingVolume.extensions) === null || c === void 0 ? void 0 : c["3DTILES_bounding_volume_S2"];
  if (E) {
    const x = {
      box: jh(E),
      s2VolumeInfo: E
    };
    e.boundingVolume = x;
  }
  const b = e.boundingVolume, y = {
    contentUrlTemplate: p,
    subtreesUriTemplate: f,
    subdivisionScheme: a,
    subtreeLevels: l,
    maximumLevel: Number.isFinite(u) ? u - 1 : h,
    refine: C,
    basePath: n,
    lodMetricType: Es.GEOMETRIC_ERROR,
    rootLodMetricValue: T,
    rootBoundingVolume: b,
    getTileType: Ci,
    getRefine: bi
  };
  return await zy(e, n, g, y, r);
}
async function zy(e, t, n, s, r) {
  if (!e)
    return null;
  const {
    children: i,
    contentUrl: o
  } = await Kh({
    subtree: n,
    implicitOptions: s,
    loaderOptions: r
  });
  let c, a = null;
  return o && (c = o, a = {
    uri: o.replace(`${t}/`, "")
  }), {
    ...e,
    id: c,
    contentUrl: c,
    lodMetricType: Es.GEOMETRIC_ERROR,
    lodMetricValue: e.geometricError,
    transformMatrix: e.transform,
    type: Ci(e, c),
    refine: bi(e.refine),
    content: a || e.content,
    children: i
  };
}
function oc(e) {
  var t;
  return (e == null || (t = e.extensions) === null || t === void 0 ? void 0 : t["3DTILES_implicit_tiling"]) || (e == null ? void 0 : e.implicitTiling);
}
const qe = {
  id: "3d-tiles",
  name: "3D Tiles",
  module: "3d-tiles",
  version: th,
  extensions: ["cmpt", "pnts", "b3dm", "i3dm"],
  mimeTypes: ["application/octet-stream"],
  tests: ["cmpt", "pnts", "b3dm", "i3dm"],
  parse: jy,
  options: {
    "3d-tiles": {
      loadGLTF: !0,
      decodeQuantizedPositions: !1,
      isTileset: "auto",
      assetGltfUpAxis: null
    }
  }
};
async function jy(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = t["3d-tiles"] || {};
  let r;
  return s.isTileset === "auto" ? r = (n == null ? void 0 : n.url) && n.url.indexOf(".json") !== -1 : r = s.isTileset, r ? Ky(e, t, n) : qy(e, t, n);
}
async function Ky(e, t, n) {
  var s;
  const r = JSON.parse(new TextDecoder().decode(e)), i = (n == null ? void 0 : n.url) || "", o = Xy(i), c = await Wy(r, o, t || {});
  return {
    ...r,
    shape: "tileset3d",
    loader: qe,
    url: i,
    queryString: (n == null ? void 0 : n.queryString) || "",
    basePath: o,
    root: c || r.root,
    type: ym.TILES3D,
    lodMetricType: Es.GEOMETRIC_ERROR,
    lodMetricValue: ((s = r.root) === null || s === void 0 ? void 0 : s.geometricError) || 0
  };
}
async function qy(e, t, n) {
  const s = {
    content: {
      shape: "tile3d",
      featureIds: null
    }
  };
  return await Gh(e, 0, t, n, s.content), s.content;
}
function Xy(e) {
  return jf(e);
}
const qh = "https://api.cesium.com/v1/assets";
async function Qy(e, t) {
  if (!t) {
    const i = await Yy(e);
    for (const o of i.items)
      o.type === "3DTILES" && (t = o.id);
  }
  const n = await Zy(e, t), {
    type: s,
    url: r
  } = n;
  return ht(s === "3DTILES" && r), n.headers = {
    Authorization: `Bearer ${n.accessToken}`
  }, n;
}
async function Yy(e) {
  ht(e);
  const t = qh, n = {
    Authorization: `Bearer ${e}`
  }, s = await Ze(t, {
    headers: n
  });
  if (!s.ok)
    throw new Error(s.statusText);
  return await s.json();
}
async function Zy(e, t) {
  ht(e, t);
  const n = {
    Authorization: `Bearer ${e}`
  }, s = `${qh}/${t}`;
  let r = await Ze(`${s}`, {
    headers: n
  });
  if (!r.ok)
    throw new Error(r.statusText);
  let i = await r.json();
  if (r = await Ze(`${s}/endpoint`, {
    headers: n
  }), !r.ok)
    throw new Error(r.statusText);
  const o = await r.json();
  return i = {
    ...i,
    ...o
  }, i;
}
async function tB(e) {
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
  return Qy(n, s);
}
const Xh = {
  ...qe,
  id: "cesium-ion",
  name: "Cesium Ion",
  preload: tB,
  parse: async (e, t, n) => (t = {
    ...t
  }, t["3d-tiles"] = t["cesium-ion"], t.loader = Xh, qe.parse(e, t, n)),
  options: {
    "cesium-ion": {
      ...qe.options["3d-tiles"],
      accessToken: null
    }
  }
}, eB = 1 / Math.PI * 180, nB = 1 / 180 * Math.PI, sB = {
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
    ...sB
  }
};
const tt = globalThis.mathgl.config;
function rB(e, {
  precision: t = tt.precision
} = {}) {
  return e = aB(e), "".concat(parseFloat(e.toPrecision(t)));
}
function ve(e) {
  return Array.isArray(e) || ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function iB(e) {
  return cB(e);
}
function oB(e) {
  return St(e);
}
function cB(e, t) {
  return Qh(e, (n) => n * nB, t);
}
function St(e, t) {
  return Qh(e, (n) => n * eB, t);
}
function Zt(e, t, n) {
  const s = tt.EPSILON;
  n && (tt.EPSILON = n);
  try {
    if (e === t)
      return !0;
    if (ve(e) && ve(t)) {
      if (e.length !== t.length)
        return !1;
      for (let r = 0; r < e.length; ++r)
        if (!Zt(e[r], t[r]))
          return !1;
      return !0;
    }
    return e && e.equals ? e.equals(t) : t && t.equals ? t.equals(e) : typeof e == "number" && typeof t == "number" ? Math.abs(e - t) <= tt.EPSILON * Math.max(1, Math.abs(e), Math.abs(t)) : !1;
  } finally {
    tt.EPSILON = s;
  }
}
function aB(e) {
  return Math.round(e / tt.EPSILON) * tt.EPSILON;
}
function hB(e) {
  return e.clone ? e.clone() : new Array(e.length);
}
function Qh(e, t, n) {
  if (ve(e)) {
    const s = e;
    n = n || hB(s);
    for (let r = 0; r < n.length && r < s.length; ++r) {
      const i = typeof e == "number" ? e : e[r];
      n[r] = t(i, r, n);
    }
    return n;
  }
  return t(e);
}
function uB(e) {
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
class wi extends uB(Array) {
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
    return t === this ? this : ve(t) ? this.toArray(t) : this.toObject(t);
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
      n += (s > 0 ? ", " : "") + rB(this[s], t);
    return "".concat(t.printTypes ? this.constructor.name : "", "[").concat(n, "]");
  }
  equals(t) {
    if (!t || this.length !== t.length)
      return !1;
    for (let n = 0; n < this.ELEMENTS; ++n)
      if (!Zt(this[n], t[n]))
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
function lB(e, t) {
  if (e.length !== t)
    return !1;
  for (let n = 0; n < e.length; ++n)
    if (!Number.isFinite(e[n]))
      return !1;
  return !0;
}
function V(e) {
  if (!Number.isFinite(e))
    throw new Error("Invalid number ".concat(JSON.stringify(e)));
  return e;
}
function Xe(e, t, n = "") {
  if (tt.debug && !lB(e, t))
    throw new Error("math.gl: ".concat(n, " some fields set to invalid numbers'"));
  return e;
}
function It(e, t) {
  if (!e)
    throw new Error("math.gl assertion ".concat(t));
}
class Yh extends wi {
  get x() {
    return this[0];
  }
  set x(t) {
    this[0] = V(t);
  }
  get y() {
    return this[1];
  }
  set y(t) {
    this[1] = V(t);
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
    return V(n);
  }
  dot(t) {
    let n = 0;
    for (let s = 0; s < this.ELEMENTS; ++s)
      n += this[s] * t[s];
    return V(n);
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
    return It(t >= 0 && t < this.ELEMENTS, "index is out of range"), V(this[t]);
  }
  setComponent(t, n) {
    return It(t >= 0 && t < this.ELEMENTS, "index is out of range"), this[t] = n, this.check();
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
const Qe = 1e-6;
let xt = typeof Float32Array < "u" ? Float32Array : Array;
function fB() {
  const e = new xt(2);
  return xt != Float32Array && (e[0] = 0, e[1] = 0), e;
}
function dB(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[3] * r + n[6], e[1] = n[1] * s + n[4] * r + n[7], e;
}
function mB(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[4] * r + n[12], e[1] = n[1] * s + n[5] * r + n[13], e;
}
(function() {
  const e = fB();
  return function(t, n, s, r, i, o) {
    let c, a;
    for (n || (n = 2), s || (s = 0), r ? a = Math.min(r * n + s, t.length) : a = t.length, c = s; c < a; c += n)
      e[0] = t[c], e[1] = t[c + 1], i(e, e, o), t[c] = e[0], t[c + 1] = e[1];
    return t;
  };
})();
function gB(e, t, n) {
  const s = t[0], r = t[1], i = n[3] * s + n[7] * r || 1;
  return e[0] = (n[0] * s + n[4] * r) / i, e[1] = (n[1] * s + n[5] * r) / i, e;
}
function Zh(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[3] * s + n[7] * r + n[11] * i || 1;
  return e[0] = (n[0] * s + n[4] * r + n[8] * i) / o, e[1] = (n[1] * s + n[5] * r + n[9] * i) / o, e[2] = (n[2] * s + n[6] * r + n[10] * i) / o, e;
}
function AB(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e[2] = t[2], e;
}
function pB(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e[2] = t[2], e[3] = t[3], e;
}
function tu(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  return e[0] = n[0] * s + n[3] * r + n[6] * i, e[1] = n[1] * s + n[4] * r + n[7] * i, e[2] = n[2] * s + n[5] * r + n[8] * i, e[3] = t[3], e;
}
function eu() {
  const e = new xt(3);
  return xt != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e;
}
function nu(e) {
  const t = e[0], n = e[1], s = e[2];
  return Math.sqrt(t * t + n * n + s * s);
}
function cc(e, t, n) {
  const s = new xt(3);
  return s[0] = e, s[1] = t, s[2] = n, s;
}
function yB(e, t) {
  const n = t[0], s = t[1], r = t[2];
  let i = n * n + s * s + r * r;
  return i > 0 && (i = 1 / Math.sqrt(i)), e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e;
}
function _i(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
}
function Qn(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[0], c = n[1], a = n[2];
  return e[0] = r * a - i * c, e[1] = i * o - s * a, e[2] = s * c - r * o, e;
}
function Mi(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  let o = n[3] * s + n[7] * r + n[11] * i + n[15];
  return o = o || 1, e[0] = (n[0] * s + n[4] * r + n[8] * i + n[12]) / o, e[1] = (n[1] * s + n[5] * r + n[9] * i + n[13]) / o, e[2] = (n[2] * s + n[6] * r + n[10] * i + n[14]) / o, e;
}
function su(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  return e[0] = s * n[0] + r * n[3] + i * n[6], e[1] = s * n[1] + r * n[4] + i * n[7], e[2] = s * n[2] + r * n[5] + i * n[8], e;
}
function ru(e, t, n) {
  const s = n[0], r = n[1], i = n[2], o = n[3], c = t[0], a = t[1], h = t[2];
  let u = r * h - i * a, l = i * c - s * h, f = s * a - r * c, d = r * f - i * l, m = i * u - s * f, g = s * l - r * u;
  const A = o * 2;
  return u *= A, l *= A, f *= A, d *= 2, m *= 2, g *= 2, e[0] = c + u + d, e[1] = a + l + m, e[2] = h + f + g, e;
}
function BB(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[0], i[1] = r[1] * Math.cos(s) - r[2] * Math.sin(s), i[2] = r[1] * Math.sin(s) + r[2] * Math.cos(s), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function TB(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[2] * Math.sin(s) + r[0] * Math.cos(s), i[1] = r[1], i[2] = r[2] * Math.cos(s) - r[0] * Math.sin(s), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function EB(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[0] * Math.cos(s) - r[1] * Math.sin(s), i[1] = r[0] * Math.sin(s) + r[1] * Math.cos(s), i[2] = r[2], e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function CB(e, t) {
  const n = e[0], s = e[1], r = e[2], i = t[0], o = t[1], c = t[2], a = Math.sqrt((n * n + s * s + r * r) * (i * i + o * o + c * c)), h = a && _i(e, t) / a;
  return Math.acos(Math.min(Math.max(h, -1), 1));
}
const bB = nu;
(function() {
  const e = eu();
  return function(t, n, s, r, i, o) {
    let c, a;
    for (n || (n = 3), s || (s = 0), r ? a = Math.min(r * n + s, t.length) : a = t.length, c = s; c < a; c += n)
      e[0] = t[c], e[1] = t[c + 1], e[2] = t[c + 2], i(e, e, o), t[c] = e[0], t[c + 1] = e[1], t[c + 2] = e[2];
    return t;
  };
})();
const sr = [0, 0, 0];
let Ln;
class B extends Yh {
  static get ZERO() {
    return Ln || (Ln = new B(0, 0, 0), Object.freeze(Ln)), Ln;
  }
  constructor(t = 0, n = 0, s = 0) {
    super(-0, -0, -0), arguments.length === 1 && ve(t) ? this.copy(t) : (tt.debug && (V(t), V(n), V(s)), this[0] = t, this[1] = n, this[2] = s);
  }
  set(t, n, s) {
    return this[0] = t, this[1] = n, this[2] = s, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this.check();
  }
  fromObject(t) {
    return tt.debug && (V(t.x), V(t.y), V(t.z)), this[0] = t.x, this[1] = t.y, this[2] = t.z, this.check();
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
    this[2] = V(t);
  }
  angle(t) {
    return CB(this, t);
  }
  cross(t) {
    return Qn(this, this, t), this.check();
  }
  rotateX({
    radians: t,
    origin: n = sr
  }) {
    return BB(this, this, n, t), this.check();
  }
  rotateY({
    radians: t,
    origin: n = sr
  }) {
    return TB(this, this, n, t), this.check();
  }
  rotateZ({
    radians: t,
    origin: n = sr
  }) {
    return EB(this, this, n, t), this.check();
  }
  transform(t) {
    return this.transformAsPoint(t);
  }
  transformAsPoint(t) {
    return Mi(this, this, t), this.check();
  }
  transformAsVector(t) {
    return Zh(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return su(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return AB(this, this, t), this.check();
  }
  transformByQuaternion(t) {
    return ru(this, this, t), this.check();
  }
}
let Dn;
class Ri extends Yh {
  static get ZERO() {
    return Dn || (Dn = new Ri(0, 0, 0, 0), Object.freeze(Dn)), Dn;
  }
  constructor(t = 0, n = 0, s = 0, r = 0) {
    super(-0, -0, -0, -0), ve(t) && arguments.length === 1 ? this.copy(t) : (tt.debug && (V(t), V(n), V(s), V(r)), this[0] = t, this[1] = n, this[2] = s, this[3] = r);
  }
  set(t, n, s, r) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this.check();
  }
  fromObject(t) {
    return tt.debug && (V(t.x), V(t.y), V(t.z), V(t.w)), this[0] = t.x, this[1] = t.y, this[2] = t.z, this[3] = t.w, this;
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
    this[2] = V(t);
  }
  get w() {
    return this[3];
  }
  set w(t) {
    this[3] = V(t);
  }
  transform(t) {
    return Mi(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return tu(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return pB(this, this, t), this.check();
  }
  transformByQuaternion(t) {
    return ru(this, this, t), this.check();
  }
  applyMatrix4(t) {
    return t.transform(this, this), this;
  }
}
class iu extends wi {
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
    return this[n * this.RANK + t] = V(s), this;
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
function wB() {
  const e = new xt(9);
  return xt != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1, e;
}
function _B(e, t) {
  if (e === t) {
    const n = t[1], s = t[2], r = t[5];
    e[1] = t[3], e[2] = t[6], e[3] = n, e[5] = t[7], e[6] = s, e[7] = r;
  } else
    e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
  return e;
}
function MB(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], c = t[5], a = t[6], h = t[7], u = t[8], l = u * o - c * h, f = -u * i + c * a, d = h * i - o * a;
  let m = n * l + s * f + r * d;
  return m ? (m = 1 / m, e[0] = l * m, e[1] = (-u * s + r * h) * m, e[2] = (c * s - r * o) * m, e[3] = f * m, e[4] = (u * n - r * a) * m, e[5] = (-c * n + r * i) * m, e[6] = d * m, e[7] = (-h * n + s * a) * m, e[8] = (o * n - s * i) * m, e) : null;
}
function RB(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3], i = e[4], o = e[5], c = e[6], a = e[7], h = e[8];
  return t * (h * i - o * a) + n * (-h * r + o * c) + s * (a * r - i * c);
}
function ac(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], c = t[4], a = t[5], h = t[6], u = t[7], l = t[8], f = n[0], d = n[1], m = n[2], g = n[3], A = n[4], p = n[5], C = n[6], T = n[7], E = n[8];
  return e[0] = f * s + d * o + m * h, e[1] = f * r + d * c + m * u, e[2] = f * i + d * a + m * l, e[3] = g * s + A * o + p * h, e[4] = g * r + A * c + p * u, e[5] = g * i + A * a + p * l, e[6] = C * s + T * o + E * h, e[7] = C * r + T * c + E * u, e[8] = C * i + T * a + E * l, e;
}
function SB(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], c = t[4], a = t[5], h = t[6], u = t[7], l = t[8], f = n[0], d = n[1];
  return e[0] = s, e[1] = r, e[2] = i, e[3] = o, e[4] = c, e[5] = a, e[6] = f * s + d * o + h, e[7] = f * r + d * c + u, e[8] = f * i + d * a + l, e;
}
function IB(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], c = t[4], a = t[5], h = t[6], u = t[7], l = t[8], f = Math.sin(n), d = Math.cos(n);
  return e[0] = d * s + f * o, e[1] = d * r + f * c, e[2] = d * i + f * a, e[3] = d * o - f * s, e[4] = d * c - f * r, e[5] = d * a - f * i, e[6] = h, e[7] = u, e[8] = l, e;
}
function hc(e, t, n) {
  const s = n[0], r = n[1];
  return e[0] = s * t[0], e[1] = s * t[1], e[2] = s * t[2], e[3] = r * t[3], e[4] = r * t[4], e[5] = r * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
}
function OB(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n + n, c = s + s, a = r + r, h = n * o, u = s * o, l = s * c, f = r * o, d = r * c, m = r * a, g = i * o, A = i * c, p = i * a;
  return e[0] = 1 - l - m, e[3] = u - p, e[6] = f + A, e[1] = u + p, e[4] = 1 - h - m, e[7] = d - g, e[2] = f - A, e[5] = d + g, e[8] = 1 - h - l, e;
}
var Hr;
(function(e) {
  e[e.COL0ROW0 = 0] = "COL0ROW0", e[e.COL0ROW1 = 1] = "COL0ROW1", e[e.COL0ROW2 = 2] = "COL0ROW2", e[e.COL1ROW0 = 3] = "COL1ROW0", e[e.COL1ROW1 = 4] = "COL1ROW1", e[e.COL1ROW2 = 5] = "COL1ROW2", e[e.COL2ROW0 = 6] = "COL2ROW0", e[e.COL2ROW1 = 7] = "COL2ROW1", e[e.COL2ROW2 = 8] = "COL2ROW2";
})(Hr || (Hr = {}));
const vB = Object.freeze([1, 0, 0, 0, 1, 0, 0, 0, 1]);
class ot extends iu {
  static get IDENTITY() {
    return FB();
  }
  static get ZERO() {
    return xB();
  }
  get ELEMENTS() {
    return 9;
  }
  get RANK() {
    return 3;
  }
  get INDICES() {
    return Hr;
  }
  constructor(t, ...n) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0), arguments.length === 1 && Array.isArray(t) ? this.copy(t) : n.length > 0 ? this.copy([t, ...n]) : this.identity();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this[4] = t[4], this[5] = t[5], this[6] = t[6], this[7] = t[7], this[8] = t[8], this.check();
  }
  identity() {
    return this.copy(vB);
  }
  fromObject(t) {
    return this.check();
  }
  fromQuaternion(t) {
    return OB(this, t), this.check();
  }
  set(t, n, s, r, i, o, c, a, h) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this[4] = i, this[5] = o, this[6] = c, this[7] = a, this[8] = h, this.check();
  }
  setRowMajor(t, n, s, r, i, o, c, a, h) {
    return this[0] = t, this[1] = r, this[2] = c, this[3] = n, this[4] = i, this[5] = a, this[6] = s, this[7] = o, this[8] = h, this.check();
  }
  determinant() {
    return RB(this);
  }
  transpose() {
    return _B(this, this), this.check();
  }
  invert() {
    return MB(this, this), this.check();
  }
  multiplyLeft(t) {
    return ac(this, t, this), this.check();
  }
  multiplyRight(t) {
    return ac(this, this, t), this.check();
  }
  rotate(t) {
    return IB(this, this, t), this.check();
  }
  scale(t) {
    return Array.isArray(t) ? hc(this, this, t) : hc(this, this, [t, t]), this.check();
  }
  translate(t) {
    return SB(this, this, t), this.check();
  }
  transform(t, n) {
    let s;
    switch (t.length) {
      case 2:
        s = dB(n || [-0, -0], t, this);
        break;
      case 3:
        s = su(n || [-0, -0, -0], t, this);
        break;
      case 4:
        s = tu(n || [-0, -0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return Xe(s, t.length), s;
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
let Gn, Nn = null;
function xB() {
  return Gn || (Gn = new ot([0, 0, 0, 0, 0, 0, 0, 0, 0]), Object.freeze(Gn)), Gn;
}
function FB() {
  return Nn || (Nn = new ot(), Object.freeze(Nn)), Nn;
}
function LB(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function DB(e, t) {
  if (e === t) {
    const n = t[1], s = t[2], r = t[3], i = t[6], o = t[7], c = t[11];
    e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = n, e[6] = t[9], e[7] = t[13], e[8] = s, e[9] = i, e[11] = t[14], e[12] = r, e[13] = o, e[14] = c;
  } else
    e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
  return e;
}
function GB(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], c = t[5], a = t[6], h = t[7], u = t[8], l = t[9], f = t[10], d = t[11], m = t[12], g = t[13], A = t[14], p = t[15], C = n * c - s * o, T = n * a - r * o, E = n * h - i * o, b = s * a - r * c, y = s * h - i * c, F = r * h - i * a, x = u * g - l * m, I = u * A - f * m, v = u * p - d * m, D = l * A - f * g, N = l * p - d * g, G = f * p - d * A;
  let S = C * G - T * N + E * D + b * v - y * I + F * x;
  return S ? (S = 1 / S, e[0] = (c * G - a * N + h * D) * S, e[1] = (r * N - s * G - i * D) * S, e[2] = (g * F - A * y + p * b) * S, e[3] = (f * y - l * F - d * b) * S, e[4] = (a * v - o * G - h * I) * S, e[5] = (n * G - r * v + i * I) * S, e[6] = (A * E - m * F - p * T) * S, e[7] = (u * F - f * E + d * T) * S, e[8] = (o * N - c * v + h * x) * S, e[9] = (s * v - n * N - i * x) * S, e[10] = (m * y - g * E + p * C) * S, e[11] = (l * E - u * y - d * C) * S, e[12] = (c * I - o * D - a * x) * S, e[13] = (n * D - s * I + r * x) * S, e[14] = (g * T - m * b - A * C) * S, e[15] = (u * b - l * T + f * C) * S, e) : null;
}
function NB(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3], i = e[4], o = e[5], c = e[6], a = e[7], h = e[8], u = e[9], l = e[10], f = e[11], d = e[12], m = e[13], g = e[14], A = e[15], p = t * o - n * i, C = t * c - s * i, T = n * c - s * o, E = h * m - u * d, b = h * g - l * d, y = u * g - l * m, F = t * y - n * b + s * E, x = i * y - o * b + c * E, I = h * T - u * C + l * p, v = d * T - m * C + g * p;
  return a * F - r * x + A * I - f * v;
}
function uc(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], c = t[4], a = t[5], h = t[6], u = t[7], l = t[8], f = t[9], d = t[10], m = t[11], g = t[12], A = t[13], p = t[14], C = t[15];
  let T = n[0], E = n[1], b = n[2], y = n[3];
  return e[0] = T * s + E * c + b * l + y * g, e[1] = T * r + E * a + b * f + y * A, e[2] = T * i + E * h + b * d + y * p, e[3] = T * o + E * u + b * m + y * C, T = n[4], E = n[5], b = n[6], y = n[7], e[4] = T * s + E * c + b * l + y * g, e[5] = T * r + E * a + b * f + y * A, e[6] = T * i + E * h + b * d + y * p, e[7] = T * o + E * u + b * m + y * C, T = n[8], E = n[9], b = n[10], y = n[11], e[8] = T * s + E * c + b * l + y * g, e[9] = T * r + E * a + b * f + y * A, e[10] = T * i + E * h + b * d + y * p, e[11] = T * o + E * u + b * m + y * C, T = n[12], E = n[13], b = n[14], y = n[15], e[12] = T * s + E * c + b * l + y * g, e[13] = T * r + E * a + b * f + y * A, e[14] = T * i + E * h + b * d + y * p, e[15] = T * o + E * u + b * m + y * C, e;
}
function PB(e, t, n) {
  const s = n[0], r = n[1], i = n[2];
  let o, c, a, h, u, l, f, d, m, g, A, p;
  return t === e ? (e[12] = t[0] * s + t[4] * r + t[8] * i + t[12], e[13] = t[1] * s + t[5] * r + t[9] * i + t[13], e[14] = t[2] * s + t[6] * r + t[10] * i + t[14], e[15] = t[3] * s + t[7] * r + t[11] * i + t[15]) : (o = t[0], c = t[1], a = t[2], h = t[3], u = t[4], l = t[5], f = t[6], d = t[7], m = t[8], g = t[9], A = t[10], p = t[11], e[0] = o, e[1] = c, e[2] = a, e[3] = h, e[4] = u, e[5] = l, e[6] = f, e[7] = d, e[8] = m, e[9] = g, e[10] = A, e[11] = p, e[12] = o * s + u * r + m * i + t[12], e[13] = c * s + l * r + g * i + t[13], e[14] = a * s + f * r + A * i + t[14], e[15] = h * s + d * r + p * i + t[15]), e;
}
function UB(e, t, n) {
  const s = n[0], r = n[1], i = n[2];
  return e[0] = t[0] * s, e[1] = t[1] * s, e[2] = t[2] * s, e[3] = t[3] * s, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * i, e[9] = t[9] * i, e[10] = t[10] * i, e[11] = t[11] * i, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function HB(e, t, n, s) {
  let r = s[0], i = s[1], o = s[2], c = Math.sqrt(r * r + i * i + o * o), a, h, u, l, f, d, m, g, A, p, C, T, E, b, y, F, x, I, v, D, N, G, S, z;
  return c < Qe ? null : (c = 1 / c, r *= c, i *= c, o *= c, h = Math.sin(n), a = Math.cos(n), u = 1 - a, l = t[0], f = t[1], d = t[2], m = t[3], g = t[4], A = t[5], p = t[6], C = t[7], T = t[8], E = t[9], b = t[10], y = t[11], F = r * r * u + a, x = i * r * u + o * h, I = o * r * u - i * h, v = r * i * u - o * h, D = i * i * u + a, N = o * i * u + r * h, G = r * o * u + i * h, S = i * o * u - r * h, z = o * o * u + a, e[0] = l * F + g * x + T * I, e[1] = f * F + A * x + E * I, e[2] = d * F + p * x + b * I, e[3] = m * F + C * x + y * I, e[4] = l * v + g * D + T * N, e[5] = f * v + A * D + E * N, e[6] = d * v + p * D + b * N, e[7] = m * v + C * D + y * N, e[8] = l * G + g * S + T * z, e[9] = f * G + A * S + E * z, e[10] = d * G + p * S + b * z, e[11] = m * G + C * S + y * z, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e);
}
function kB(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[4], o = t[5], c = t[6], a = t[7], h = t[8], u = t[9], l = t[10], f = t[11];
  return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = i * r + h * s, e[5] = o * r + u * s, e[6] = c * r + l * s, e[7] = a * r + f * s, e[8] = h * r - i * s, e[9] = u * r - o * s, e[10] = l * r - c * s, e[11] = f * r - a * s, e;
}
function $B(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[0], o = t[1], c = t[2], a = t[3], h = t[8], u = t[9], l = t[10], f = t[11];
  return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * r - h * s, e[1] = o * r - u * s, e[2] = c * r - l * s, e[3] = a * r - f * s, e[8] = i * s + h * r, e[9] = o * s + u * r, e[10] = c * s + l * r, e[11] = a * s + f * r, e;
}
function VB(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[0], o = t[1], c = t[2], a = t[3], h = t[4], u = t[5], l = t[6], f = t[7];
  return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * r + h * s, e[1] = o * r + u * s, e[2] = c * r + l * s, e[3] = a * r + f * s, e[4] = h * r - i * s, e[5] = u * r - o * s, e[6] = l * r - c * s, e[7] = f * r - a * s, e;
}
function JB(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[4], o = t[5], c = t[6], a = t[8], h = t[9], u = t[10];
  return e[0] = Math.sqrt(n * n + s * s + r * r), e[1] = Math.sqrt(i * i + o * o + c * c), e[2] = Math.sqrt(a * a + h * h + u * u), e;
}
function WB(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n + n, c = s + s, a = r + r, h = n * o, u = s * o, l = s * c, f = r * o, d = r * c, m = r * a, g = i * o, A = i * c, p = i * a;
  return e[0] = 1 - l - m, e[1] = u + p, e[2] = f - A, e[3] = 0, e[4] = u - p, e[5] = 1 - h - m, e[6] = d + g, e[7] = 0, e[8] = f + A, e[9] = d - g, e[10] = 1 - h - l, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function zB(e, t, n, s, r, i, o) {
  const c = 1 / (n - t), a = 1 / (r - s), h = 1 / (i - o);
  return e[0] = i * 2 * c, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i * 2 * a, e[6] = 0, e[7] = 0, e[8] = (n + t) * c, e[9] = (r + s) * a, e[10] = (o + i) * h, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = o * i * 2 * h, e[15] = 0, e;
}
function jB(e, t, n, s, r) {
  const i = 1 / Math.tan(t / 2);
  if (e[0] = i / n, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, r != null && r !== 1 / 0) {
    const o = 1 / (s - r);
    e[10] = (r + s) * o, e[14] = 2 * r * s * o;
  } else
    e[10] = -1, e[14] = -2 * s;
  return e;
}
const KB = jB;
function qB(e, t, n, s, r, i, o) {
  const c = 1 / (t - n), a = 1 / (s - r), h = 1 / (i - o);
  return e[0] = -2 * c, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * a, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * h, e[11] = 0, e[12] = (t + n) * c, e[13] = (r + s) * a, e[14] = (o + i) * h, e[15] = 1, e;
}
const XB = qB;
function QB(e, t, n, s) {
  let r, i, o, c, a, h, u, l, f, d;
  const m = t[0], g = t[1], A = t[2], p = s[0], C = s[1], T = s[2], E = n[0], b = n[1], y = n[2];
  return Math.abs(m - E) < Qe && Math.abs(g - b) < Qe && Math.abs(A - y) < Qe ? LB(e) : (l = m - E, f = g - b, d = A - y, r = 1 / Math.sqrt(l * l + f * f + d * d), l *= r, f *= r, d *= r, i = C * d - T * f, o = T * l - p * d, c = p * f - C * l, r = Math.sqrt(i * i + o * o + c * c), r ? (r = 1 / r, i *= r, o *= r, c *= r) : (i = 0, o = 0, c = 0), a = f * c - d * o, h = d * i - l * c, u = l * o - f * i, r = Math.sqrt(a * a + h * h + u * u), r ? (r = 1 / r, a *= r, h *= r, u *= r) : (a = 0, h = 0, u = 0), e[0] = i, e[1] = a, e[2] = l, e[3] = 0, e[4] = o, e[5] = h, e[6] = f, e[7] = 0, e[8] = c, e[9] = u, e[10] = d, e[11] = 0, e[12] = -(i * m + o * g + c * A), e[13] = -(a * m + h * g + u * A), e[14] = -(l * m + f * g + d * A), e[15] = 1, e);
}
function YB() {
  const e = new xt(4);
  return xt != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e;
}
function ZB(e, t, n) {
  return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e;
}
function tT(e, t, n) {
  return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e;
}
function eT(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3];
  return Math.sqrt(t * t + n * n + s * s + r * r);
}
function nT(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3];
  return t * t + n * n + s * s + r * r;
}
function sT(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3];
  let o = n * n + s * s + r * r + i * i;
  return o > 0 && (o = 1 / Math.sqrt(o)), e[0] = n * o, e[1] = s * o, e[2] = r * o, e[3] = i * o, e;
}
function rT(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
}
function iT(e, t, n, s) {
  const r = t[0], i = t[1], o = t[2], c = t[3];
  return e[0] = r + s * (n[0] - r), e[1] = i + s * (n[1] - i), e[2] = o + s * (n[2] - o), e[3] = c + s * (n[3] - c), e;
}
function oT(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3];
  return e[0] = n[0] * s + n[4] * r + n[8] * i + n[12] * o, e[1] = n[1] * s + n[5] * r + n[9] * i + n[13] * o, e[2] = n[2] * s + n[6] * r + n[10] * i + n[14] * o, e[3] = n[3] * s + n[7] * r + n[11] * i + n[15] * o, e;
}
function cT(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[0], c = n[1], a = n[2], h = n[3], u = h * s + c * i - a * r, l = h * r + a * s - o * i, f = h * i + o * r - c * s, d = -o * s - c * r - a * i;
  return e[0] = u * h + d * -o + l * -a - f * -c, e[1] = l * h + d * -c + f * -o - u * -a, e[2] = f * h + d * -a + u * -c - l * -o, e[3] = t[3], e;
}
(function() {
  const e = YB();
  return function(t, n, s, r, i, o) {
    let c, a;
    for (n || (n = 4), s || (s = 0), r ? a = Math.min(r * n + s, t.length) : a = t.length, c = s; c < a; c += n)
      e[0] = t[c], e[1] = t[c + 1], e[2] = t[c + 2], e[3] = t[c + 3], i(e, e, o), t[c] = e[0], t[c + 1] = e[1], t[c + 2] = e[2], t[c + 3] = e[3];
    return t;
  };
})();
var kr;
(function(e) {
  e[e.COL0ROW0 = 0] = "COL0ROW0", e[e.COL0ROW1 = 1] = "COL0ROW1", e[e.COL0ROW2 = 2] = "COL0ROW2", e[e.COL0ROW3 = 3] = "COL0ROW3", e[e.COL1ROW0 = 4] = "COL1ROW0", e[e.COL1ROW1 = 5] = "COL1ROW1", e[e.COL1ROW2 = 6] = "COL1ROW2", e[e.COL1ROW3 = 7] = "COL1ROW3", e[e.COL2ROW0 = 8] = "COL2ROW0", e[e.COL2ROW1 = 9] = "COL2ROW1", e[e.COL2ROW2 = 10] = "COL2ROW2", e[e.COL2ROW3 = 11] = "COL2ROW3", e[e.COL3ROW0 = 12] = "COL3ROW0", e[e.COL3ROW1 = 13] = "COL3ROW1", e[e.COL3ROW2 = 14] = "COL3ROW2", e[e.COL3ROW3 = 15] = "COL3ROW3";
})(kr || (kr = {}));
const aT = 45 * Math.PI / 180, hT = 1, rr = 0.1, ir = 500, uT = Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
class Q extends iu {
  static get IDENTITY() {
    return fT();
  }
  static get ZERO() {
    return lT();
  }
  get ELEMENTS() {
    return 16;
  }
  get RANK() {
    return 4;
  }
  get INDICES() {
    return kr;
  }
  constructor(t) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0), arguments.length === 1 && Array.isArray(t) ? this.copy(t) : this.identity();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this[4] = t[4], this[5] = t[5], this[6] = t[6], this[7] = t[7], this[8] = t[8], this[9] = t[9], this[10] = t[10], this[11] = t[11], this[12] = t[12], this[13] = t[13], this[14] = t[14], this[15] = t[15], this.check();
  }
  set(t, n, s, r, i, o, c, a, h, u, l, f, d, m, g, A) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this[4] = i, this[5] = o, this[6] = c, this[7] = a, this[8] = h, this[9] = u, this[10] = l, this[11] = f, this[12] = d, this[13] = m, this[14] = g, this[15] = A, this.check();
  }
  setRowMajor(t, n, s, r, i, o, c, a, h, u, l, f, d, m, g, A) {
    return this[0] = t, this[1] = i, this[2] = h, this[3] = d, this[4] = n, this[5] = o, this[6] = u, this[7] = m, this[8] = s, this[9] = c, this[10] = l, this[11] = g, this[12] = r, this[13] = a, this[14] = f, this[15] = A, this.check();
  }
  toRowMajor(t) {
    return t[0] = this[0], t[1] = this[4], t[2] = this[8], t[3] = this[12], t[4] = this[1], t[5] = this[5], t[6] = this[9], t[7] = this[13], t[8] = this[2], t[9] = this[6], t[10] = this[10], t[11] = this[14], t[12] = this[3], t[13] = this[7], t[14] = this[11], t[15] = this[15], t;
  }
  identity() {
    return this.copy(uT);
  }
  fromObject(t) {
    return this.check();
  }
  fromQuaternion(t) {
    return WB(this, t), this.check();
  }
  frustum(t) {
    const {
      left: n,
      right: s,
      bottom: r,
      top: i,
      near: o = rr,
      far: c = ir
    } = t;
    return c === 1 / 0 ? dT(this, n, s, r, i, o) : zB(this, n, s, r, i, o, c), this.check();
  }
  lookAt(t) {
    const {
      eye: n,
      center: s = [0, 0, 0],
      up: r = [0, 1, 0]
    } = t;
    return QB(this, n, s, r), this.check();
  }
  ortho(t) {
    const {
      left: n,
      right: s,
      bottom: r,
      top: i,
      near: o = rr,
      far: c = ir
    } = t;
    return XB(this, n, s, r, i, o, c), this.check();
  }
  orthographic(t) {
    const {
      fovy: n = aT,
      aspect: s = hT,
      focalDistance: r = 1,
      near: i = rr,
      far: o = ir
    } = t;
    lc(n);
    const c = n / 2, a = r * Math.tan(c), h = a * s;
    return this.ortho({
      left: -h,
      right: h,
      bottom: -a,
      top: a,
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
    return lc(n), KB(this, n, s, r, i), this.check();
  }
  determinant() {
    return NB(this);
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
    return DB(this, this), this.check();
  }
  invert() {
    return GB(this, this), this.check();
  }
  multiplyLeft(t) {
    return uc(this, t, this), this.check();
  }
  multiplyRight(t) {
    return uc(this, this, t), this.check();
  }
  rotateX(t) {
    return kB(this, this, t), this.check();
  }
  rotateY(t) {
    return $B(this, this, t), this.check();
  }
  rotateZ(t) {
    return VB(this, this, t), this.check();
  }
  rotateXYZ(t) {
    return this.rotateX(t[0]).rotateY(t[1]).rotateZ(t[2]);
  }
  rotateAxis(t, n) {
    return HB(this, this, t, n), this.check();
  }
  scale(t) {
    return UB(this, this, Array.isArray(t) ? t : [t, t, t]), this.check();
  }
  translate(t) {
    return PB(this, this, t), this.check();
  }
  transform(t, n) {
    return t.length === 4 ? (n = oT(n || [-0, -0, -0, -0], t, this), Xe(n, 4), n) : this.transformAsPoint(t, n);
  }
  transformAsPoint(t, n) {
    const {
      length: s
    } = t;
    let r;
    switch (s) {
      case 2:
        r = mB(n || [-0, -0], t, this);
        break;
      case 3:
        r = Mi(n || [-0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return Xe(r, t.length), r;
  }
  transformAsVector(t, n) {
    let s;
    switch (t.length) {
      case 2:
        s = gB(n || [-0, -0], t, this);
        break;
      case 3:
        s = Zh(n || [-0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return Xe(s, t.length), s;
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
let Pn, Un;
function lT() {
  return Pn || (Pn = new Q([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), Object.freeze(Pn)), Pn;
}
function fT() {
  return Un || (Un = new Q(), Object.freeze(Un)), Un;
}
function lc(e) {
  if (e > Math.PI * 2)
    throw Error("expected radians");
}
function dT(e, t, n, s, r, i) {
  const o = 2 * i / (n - t), c = 2 * i / (r - s), a = (n + t) / (n - t), h = (r + s) / (r - s), u = -1, l = -1, f = -2 * i;
  return e[0] = o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = c, e[6] = 0, e[7] = 0, e[8] = a, e[9] = h, e[10] = u, e[11] = l, e[12] = 0, e[13] = 0, e[14] = f, e[15] = 0, e;
}
function fc() {
  const e = new xt(4);
  return xt != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e;
}
function mT(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e;
}
function ou(e, t, n) {
  n = n * 0.5;
  const s = Math.sin(n);
  return e[0] = s * t[0], e[1] = s * t[1], e[2] = s * t[2], e[3] = Math.cos(n), e;
}
function dc(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], c = n[0], a = n[1], h = n[2], u = n[3];
  return e[0] = s * u + o * c + r * h - i * a, e[1] = r * u + o * a + i * c - s * h, e[2] = i * u + o * h + s * a - r * c, e[3] = o * u - s * c - r * a - i * h, e;
}
function gT(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], c = Math.sin(n), a = Math.cos(n);
  return e[0] = s * a + o * c, e[1] = r * a + i * c, e[2] = i * a - r * c, e[3] = o * a - s * c, e;
}
function AT(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], c = Math.sin(n), a = Math.cos(n);
  return e[0] = s * a - i * c, e[1] = r * a + o * c, e[2] = i * a + s * c, e[3] = o * a - r * c, e;
}
function pT(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], c = Math.sin(n), a = Math.cos(n);
  return e[0] = s * a + r * c, e[1] = r * a - s * c, e[2] = i * a + o * c, e[3] = o * a - i * c, e;
}
function yT(e, t) {
  const n = t[0], s = t[1], r = t[2];
  return e[0] = n, e[1] = s, e[2] = r, e[3] = Math.sqrt(Math.abs(1 - n * n - s * s - r * r)), e;
}
function Yn(e, t, n, s) {
  const r = t[0], i = t[1], o = t[2], c = t[3];
  let a = n[0], h = n[1], u = n[2], l = n[3], f, d, m, g, A;
  return f = r * a + i * h + o * u + c * l, f < 0 && (f = -f, a = -a, h = -h, u = -u, l = -l), 1 - f > Qe ? (d = Math.acos(f), A = Math.sin(d), m = Math.sin((1 - s) * d) / A, g = Math.sin(s * d) / A) : (m = 1 - s, g = s), e[0] = m * r + g * a, e[1] = m * i + g * h, e[2] = m * o + g * u, e[3] = m * c + g * l, e;
}
function BT(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n * n + s * s + r * r + i * i, c = o ? 1 / o : 0;
  return e[0] = -n * c, e[1] = -s * c, e[2] = -r * c, e[3] = i * c, e;
}
function TT(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e;
}
function cu(e, t) {
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
const ET = ZB, CT = tT, bT = rT, wT = iT, _T = eT, MT = nT, au = sT, RT = function() {
  const e = eu(), t = cc(1, 0, 0), n = cc(0, 1, 0);
  return function(s, r, i) {
    const o = _i(r, i);
    return o < -0.999999 ? (Qn(e, t, r), bB(e) < 1e-6 && Qn(e, n, r), yB(e, e), ou(s, e, Math.PI), s) : o > 0.999999 ? (s[0] = 0, s[1] = 0, s[2] = 0, s[3] = 1, s) : (Qn(e, r, i), s[0] = e[0], s[1] = e[1], s[2] = e[2], s[3] = 1 + o, au(s, s));
  };
}();
(function() {
  const e = fc(), t = fc();
  return function(n, s, r, i, o, c) {
    return Yn(e, s, o, c), Yn(t, r, i, c), Yn(n, e, t, 2 * c * (1 - c)), n;
  };
})();
(function() {
  const e = wB();
  return function(t, n, s, r) {
    return e[0] = s[0], e[3] = s[1], e[6] = s[2], e[1] = r[0], e[4] = r[1], e[7] = r[2], e[2] = -n[0], e[5] = -n[1], e[8] = -n[2], au(t, cu(t, e));
  };
})();
const ST = [0, 0, 0, 1];
class $r extends wi {
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
    return cu(this, t), this.check();
  }
  fromAxisRotation(t, n) {
    return ou(this, t, n), this.check();
  }
  identity() {
    return mT(this), this.check();
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
    this[0] = V(t);
  }
  get y() {
    return this[1];
  }
  set y(t) {
    this[1] = V(t);
  }
  get z() {
    return this[2];
  }
  set z(t) {
    this[2] = V(t);
  }
  get w() {
    return this[3];
  }
  set w(t) {
    this[3] = V(t);
  }
  len() {
    return _T(this);
  }
  lengthSquared() {
    return MT(this);
  }
  dot(t) {
    return bT(this, t);
  }
  rotationTo(t, n) {
    return RT(this, t, n), this.check();
  }
  add(t) {
    return ET(this, this, t), this.check();
  }
  calculateW() {
    return yT(this, this), this.check();
  }
  conjugate() {
    return TT(this, this), this.check();
  }
  invert() {
    return BT(this, this), this.check();
  }
  lerp(t, n, s) {
    return s === void 0 ? this.lerp(this, t, n) : (wT(this, t, n, s), this.check());
  }
  multiplyRight(t) {
    return dc(this, this, t), this.check();
  }
  multiplyLeft(t) {
    return dc(this, t, this), this.check();
  }
  normalize() {
    const t = this.len(), n = t > 0 ? 1 / t : 0;
    return this[0] = this[0] * n, this[1] = this[1] * n, this[2] = this[2] * n, this[3] = this[3] * n, t === 0 && (this[3] = 1), this.check();
  }
  rotateX(t) {
    return gT(this, this, t), this.check();
  }
  rotateY(t) {
    return AT(this, this, t), this.check();
  }
  rotateZ(t) {
    return pT(this, this, t), this.check();
  }
  scale(t) {
    return CT(this, this, t), this.check();
  }
  slerp(t, n, s) {
    let r, i, o;
    switch (arguments.length) {
      case 1:
        ({
          start: r = ST,
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
    return Yn(this, r, i, o), this.check();
  }
  transformVector4(t, n = new Ri()) {
    return cT(n, t, this), Xe(n, 4);
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
function sn(e) {
  "@babel/helpers - typeof";
  return sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sn(e);
}
function IT(e, t) {
  if (sn(e) !== "object" || e === null)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var s = n.call(e, t || "default");
    if (sn(s) !== "object")
      return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function OT(e) {
  var t = IT(e, "string");
  return sn(t) === "symbol" ? t : String(t);
}
function O(e, t, n) {
  return t = OT(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
const vT = 0.1, xT = 1e-12, FT = 1e-15, LT = 6378137, DT = 6378137, GT = 6356752314245179e-9;
function _s(e) {
  return e;
}
new B();
function NT(e, t = [], n = _s) {
  return "longitude" in e ? (t[0] = n(e.longitude), t[1] = n(e.latitude), t[2] = e.height) : "x" in e ? (t[0] = n(e.x), t[1] = n(e.y), t[2] = e.z) : (t[0] = n(e[0]), t[1] = n(e[1]), t[2] = e[2]), t;
}
function PT(e, t = []) {
  return NT(e, t, tt._cartographicRadians ? _s : iB);
}
function UT(e, t, n = _s) {
  return "longitude" in t ? (t.longitude = n(e[0]), t.latitude = n(e[1]), t.height = e[2]) : "x" in t ? (t.x = n(e[0]), t.y = n(e[1]), t.z = e[2]) : (t[0] = n(e[0]), t[1] = n(e[1]), t[2] = e[2]), t;
}
function HT(e, t) {
  return UT(e, t, tt._cartographicRadians ? _s : oB);
}
const mc = 1e-14, kT = new B(), gc = {
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
}, or = {
  north: [-1, 0, 0],
  east: [0, 1, 0],
  up: [0, 0, 1],
  south: [1, 0, 0],
  west: [0, -1, 0],
  down: [0, 0, -1]
}, Ue = {
  east: new B(),
  north: new B(),
  up: new B(),
  west: new B(),
  south: new B(),
  down: new B()
}, $T = new B(), VT = new B(), JT = new B();
function Ac(e, t, n, s, r, i) {
  const o = gc[t] && gc[t][n];
  It(o && (!s || s === o));
  let c, a, h;
  const u = kT.copy(r);
  if (Zt(u.x, 0, mc) && Zt(u.y, 0, mc)) {
    const f = Math.sign(u.z);
    c = $T.fromArray(or[t]), t !== "east" && t !== "west" && c.scale(f), a = VT.fromArray(or[n]), n !== "east" && n !== "west" && a.scale(f), h = JT.fromArray(or[s]), s !== "east" && s !== "west" && h.scale(f);
  } else {
    const {
      up: f,
      east: d,
      north: m
    } = Ue;
    d.set(-u.y, u.x, 0).normalize(), e.geodeticSurfaceNormal(u, f), m.copy(f).cross(d);
    const {
      down: g,
      west: A,
      south: p
    } = Ue;
    g.copy(f).scale(-1), A.copy(d).scale(-1), p.copy(m).scale(-1), c = Ue[t], a = Ue[n], h = Ue[s];
  }
  return i[0] = c.x, i[1] = c.y, i[2] = c.z, i[3] = 0, i[4] = a.x, i[5] = a.y, i[6] = a.z, i[7] = 0, i[8] = h.x, i[9] = h.y, i[10] = h.z, i[11] = 0, i[12] = u.x, i[13] = u.y, i[14] = u.z, i[15] = 1, i;
}
const Ce = new B(), WT = new B(), zT = new B();
function jT(e, t, n = []) {
  const {
    oneOverRadii: s,
    oneOverRadiiSquared: r,
    centerToleranceSquared: i
  } = t;
  Ce.from(e);
  const o = Ce.x, c = Ce.y, a = Ce.z, h = s.x, u = s.y, l = s.z, f = o * o * h * h, d = c * c * u * u, m = a * a * l * l, g = f + d + m, A = Math.sqrt(1 / g);
  if (!Number.isFinite(A))
    return;
  const p = WT;
  if (p.copy(e).scale(A), g < i)
    return p.to(n);
  const C = r.x, T = r.y, E = r.z, b = zT;
  b.set(p.x * C * 2, p.y * T * 2, p.z * E * 2);
  let y = (1 - A) * Ce.len() / (0.5 * b.len()), F = 0, x, I, v, D;
  do {
    y -= F, x = 1 / (1 + y * C), I = 1 / (1 + y * T), v = 1 / (1 + y * E);
    const N = x * x, G = I * I, S = v * v, z = N * x, se = G * I, $t = S * v;
    D = f * N + d * G + m * S - 1;
    const Lt = -2 * (f * z * C + d * se * T + m * $t * E);
    F = D / Lt;
  } while (Math.abs(D) > xT);
  return Ce.scale([x, I, v]).to(n);
}
const Hn = new B(), pc = new B(), KT = new B(), Mt = new B(), qT = new B(), kn = new B();
class W {
  constructor(t = 0, n = 0, s = 0) {
    O(this, "radii", void 0), O(this, "radiiSquared", void 0), O(this, "radiiToTheFourth", void 0), O(this, "oneOverRadii", void 0), O(this, "oneOverRadiiSquared", void 0), O(this, "minimumRadius", void 0), O(this, "maximumRadius", void 0), O(this, "centerToleranceSquared", vT), O(this, "squaredXOverSquaredZ", void 0), It(t >= 0), It(n >= 0), It(s >= 0), this.radii = new B(t, n, s), this.radiiSquared = new B(t * t, n * n, s * s), this.radiiToTheFourth = new B(t * t * t * t, n * n * n * n, s * s * s * s), this.oneOverRadii = new B(t === 0 ? 0 : 1 / t, n === 0 ? 0 : 1 / n, s === 0 ? 0 : 1 / s), this.oneOverRadiiSquared = new B(t === 0 ? 0 : 1 / (t * t), n === 0 ? 0 : 1 / (n * n), s === 0 ? 0 : 1 / (s * s)), this.minimumRadius = Math.min(t, n, s), this.maximumRadius = Math.max(t, n, s), this.radiiSquared.z !== 0 && (this.squaredXOverSquaredZ = this.radiiSquared.x / this.radiiSquared.z), Object.freeze(this);
  }
  equals(t) {
    return this === t || !!(t && this.radii.equals(t.radii));
  }
  toString() {
    return this.radii.toString();
  }
  cartographicToCartesian(t, n = [0, 0, 0]) {
    const s = pc, r = KT, [, , i] = t;
    this.geodeticSurfaceNormalCartographic(t, s), r.copy(this.radiiSquared).scale(s);
    const o = Math.sqrt(s.dot(r));
    return r.scale(1 / o), s.scale(i), r.add(s), r.to(n);
  }
  cartesianToCartographic(t, n = [0, 0, 0]) {
    kn.from(t);
    const s = this.scaleToGeodeticSurface(kn, Mt);
    if (!s)
      return;
    const r = this.geodeticSurfaceNormal(s, pc), i = qT;
    i.copy(kn).subtract(s);
    const o = Math.atan2(r.y, r.x), c = Math.asin(r.z), a = Math.sign(_i(i, kn)) * nu(i);
    return HT([o, c, a], n);
  }
  eastNorthUpToFixedFrame(t, n = new Q()) {
    return Ac(this, "east", "north", "up", t, n);
  }
  localFrameToFixedFrame(t, n, s, r, i = new Q()) {
    return Ac(this, t, n, s, r, i);
  }
  geocentricSurfaceNormal(t, n = [0, 0, 0]) {
    return Hn.from(t).normalize().to(n);
  }
  geodeticSurfaceNormalCartographic(t, n = [0, 0, 0]) {
    const s = PT(t), r = s[0], i = s[1], o = Math.cos(i);
    return Hn.set(o * Math.cos(r), o * Math.sin(r), Math.sin(i)).normalize(), Hn.to(n);
  }
  geodeticSurfaceNormal(t, n = [0, 0, 0]) {
    return Hn.from(t).scale(this.oneOverRadiiSquared).normalize().to(n);
  }
  scaleToGeodeticSurface(t, n) {
    return jT(t, this, n);
  }
  scaleToGeocentricSurface(t, n = [0, 0, 0]) {
    Mt.from(t);
    const s = Mt.x, r = Mt.y, i = Mt.z, o = this.oneOverRadiiSquared, c = 1 / Math.sqrt(s * s * o.x + r * r * o.y + i * i * o.z);
    return Mt.multiplyScalar(c).to(n);
  }
  transformPositionToScaledSpace(t, n = [0, 0, 0]) {
    return Mt.from(t).scale(this.oneOverRadii).to(n);
  }
  transformPositionFromScaledSpace(t, n = [0, 0, 0]) {
    return Mt.from(t).scale(this.radii).to(n);
  }
  getSurfaceNormalIntersectionWithZAxis(t, n = 0, s = [0, 0, 0]) {
    It(Zt(this.radii.x, this.radii.y, FT)), It(this.radii.z > 0), Mt.from(t);
    const r = Mt.z * (1 - this.squaredXOverSquaredZ);
    if (!(Math.abs(r) >= this.radii.z - n))
      return Mt.set(0, 0, r).to(s);
  }
}
O(W, "WGS84", new W(LT, DT, GT));
function yc() {
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
let Bc = class {
  constructor(t, n) {
    O(this, "name", void 0), O(this, "type", void 0), O(this, "sampleSize", 1), O(this, "time", 0), O(this, "count", 0), O(this, "samples", 0), O(this, "lastTiming", 0), O(this, "lastSampleTime", 0), O(this, "lastSampleCount", 0), O(this, "_count", 0), O(this, "_time", 0), O(this, "_samples", 0), O(this, "_startTime", 0), O(this, "_timerPending", !1), this.name = t, this.type = n, this.reset();
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
    return this._startTime = yc(), this._timerPending = !0, this;
  }
  timeEnd() {
    return this._timerPending ? (this.addTime(yc() - this._startTime), this._timerPending = !1, this._checkSampling(), this) : this;
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
}, XT = class {
  constructor(t) {
    O(this, "id", void 0), O(this, "stats", {}), this.id = t.id, this.stats = {}, this._initializeStats(t.stats), Object.seal(this);
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
    return r || (t instanceof Bc ? r = t : r = new Bc(n, s), this.stats[n] = r), r;
  }
};
function Kt(e, t) {
  if (!e)
    throw new Error(t || "loader assertion failed.");
}
const hu = !!(typeof process != "object" || String(process) !== "[object process]" || process.browser), Tc = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
Tc && parseFloat(Tc[1]);
function QT(e, t) {
  return uu(e || {}, t);
}
function uu(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  if (n > 3)
    return t;
  const s = {
    ...e
  };
  for (const [r, i] of Object.entries(t))
    i && typeof i == "object" && !Array.isArray(i) ? s[r] = uu(s[r] || {}, t[r], n + 1) : s[r] = t[r];
  return s;
}
const YT = "latest";
function ZT() {
  var e;
  return (e = globalThis._loadersgl_) !== null && e !== void 0 && e.version || (globalThis._loadersgl_ = globalThis._loadersgl_ || {}, globalThis._loadersgl_.version = "4.1.0-alpha.9"), globalThis._loadersgl_.version;
}
const tE = ZT();
function ne(e, t) {
  if (!e)
    throw new Error(t || "loaders.gl assertion failed.");
}
const he = typeof process != "object" || String(process) !== "[object process]" || process.browser, eE = typeof window < "u" && typeof window.orientation < "u", Ec = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
Ec && parseFloat(Ec[1]);
class nE {
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
    ne(this.isRunning), this.isRunning = !1, this._resolve(t);
  }
  error(t) {
    ne(this.isRunning), this.isRunning = !1, this._reject(t);
  }
}
class cr {
  terminate() {
  }
}
const ar = /* @__PURE__ */ new Map();
function sE(e) {
  ne(e.source && !e.url || !e.source && e.url);
  let t = ar.get(e.source || e.url);
  return t || (e.url && (t = rE(e.url), ar.set(e.url, t)), e.source && (t = lu(e.source), ar.set(e.source, t))), ne(t), t;
}
function rE(e) {
  if (!e.startsWith("http"))
    return e;
  const t = iE(e);
  return lu(t);
}
function lu(e) {
  const t = new Blob([e], {
    type: "application/javascript"
  });
  return URL.createObjectURL(t);
}
function iE(e) {
  return `try {
  importScripts('${e}');
} catch (error) {
  console.error(error);
  throw error;
}`;
}
function fu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = n || /* @__PURE__ */ new Set();
  if (e) {
    if (Cc(e))
      s.add(e);
    else if (Cc(e.buffer))
      s.add(e.buffer);
    else if (!ArrayBuffer.isView(e)) {
      if (t && typeof e == "object")
        for (const r in e)
          fu(e[r], t, s);
    }
  }
  return n === void 0 ? Array.from(s) : [];
}
function Cc(e) {
  return e ? e instanceof ArrayBuffer || typeof MessagePort < "u" && e instanceof MessagePort || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas : !1;
}
const hr = () => {
};
class Vr {
  static isSupported() {
    return typeof Worker < "u" && he || typeof cr < "u" && !he;
  }
  constructor(t) {
    this.name = void 0, this.source = void 0, this.url = void 0, this.terminated = !1, this.worker = void 0, this.onMessage = void 0, this.onError = void 0, this._loadableURL = "";
    const {
      name: n,
      source: s,
      url: r
    } = t;
    ne(s || r), this.name = n, this.source = s, this.url = r, this.onMessage = hr, this.onError = (i) => console.log(i), this.worker = he ? this._createBrowserWorker() : this._createNodeWorker();
  }
  destroy() {
    this.onMessage = hr, this.onError = hr, this.worker.terminate(), this.terminated = !0;
  }
  get isRunning() {
    return !!this.onMessage;
  }
  postMessage(t, n) {
    n = n || fu(t), this.worker.postMessage(t, n);
  }
  _getErrorFromErrorEvent(t) {
    let n = "Failed to load ";
    return n += `worker ${this.name} from ${this.url}. `, t.message && (n += `${t.message} in `), t.lineno && (n += `:${t.lineno}:${t.colno}`), new Error(n);
  }
  _createBrowserWorker() {
    this._loadableURL = sE({
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
      t = new cr(s, {
        eval: !1
      });
    } else if (this.source)
      t = new cr(this.source, {
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
class oE {
  static isSupported() {
    return Vr.isSupported();
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
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (i, o, c) => i.done(c), s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (i, o) => i.error(o);
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
      const s = new nE(n.name, t);
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
    !he || this.isDestroyed || !this.reuseWorkers || this.count > this._getMaxConcurrency() ? (t.destroy(), this.count--) : this.idleQueue.push(t), this.isDestroyed || this._startQueuedJob();
  }
  _getAvailableWorker() {
    if (this.idleQueue.length > 0)
      return this.idleQueue.shift() || null;
    if (this.count < this._getMaxConcurrency()) {
      this.count++;
      const t = `${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`;
      return new Vr({
        name: t,
        source: this.source,
        url: this.url
      });
    }
    return null;
  }
  _getMaxConcurrency() {
    return eE ? this.maxMobileConcurrency : this.maxConcurrency;
  }
}
const cE = {
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: !0,
  onDebug: () => {
  }
};
class zt {
  static isSupported() {
    return Vr.isSupported();
  }
  static getWorkerFarm() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return zt._workerFarm = zt._workerFarm || new zt({}), zt._workerFarm.setProps(t), zt._workerFarm;
  }
  constructor(t) {
    this.props = void 0, this.workerPools = /* @__PURE__ */ new Map(), this.props = {
      ...cE
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
    return i || (i = new oE({
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
zt._workerFarm = void 0;
function aE(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const n = t[e.id] || {}, s = he ? `${e.id}-worker.js` : `${e.id}-worker-node.js`;
  let r = n.workerUrl;
  if (!r && e.id === "compression" && (r = t.workerUrl), t._workerType === "test" && (he ? r = `modules/${e.module}/dist/${s}` : r = `modules/${e.module}/src/workers/${e.id}-worker-node.ts`), !r) {
    let i = e.version;
    i === "latest" && (i = YT);
    const o = i ? `@${i}` : "";
    r = `https://unpkg.com/@loaders.gl/${e.module}${o}/dist/${s}`;
  }
  return ne(r), r;
}
function hE(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : tE;
  ne(e, "no worker provided");
  const n = e.version;
  return !(!t || !n);
}
function uE(e, t) {
  return !zt.isSupported() || !he && !(t != null && t._nodeWorkers) ? !1 : e.worker && (t == null ? void 0 : t.worker);
}
async function lE(e, t, n, s, r) {
  const i = e.id, o = aE(e, n), a = zt.getWorkerFarm(n).getWorkerPool({
    name: i,
    url: o
  });
  n = JSON.parse(JSON.stringify(n)), s = JSON.parse(JSON.stringify(s || {}));
  const h = await a.startJob("process-on-worker", fE.bind(null, r));
  return h.postMessage("process", {
    input: t,
    options: n,
    context: s
  }), await (await h.result).result;
}
async function fE(e, t, n, s) {
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
        const c = await e(i, o);
        t.postMessage("done", {
          id: r,
          result: c
        });
      } catch (c) {
        const a = c instanceof Error ? c.message : "unknown error";
        t.postMessage("error", {
          id: r,
          error: a
        });
      }
      break;
    default:
      console.warn(`parse-with-worker unknown message ${n}`);
  }
}
function dE(e, t, n) {
  if (n = n || e.byteLength, e.byteLength < n || t.byteLength < n)
    return !1;
  const s = new Uint8Array(e), r = new Uint8Array(t);
  for (let i = 0; i < s.length; ++i)
    if (s[i] !== r[i])
      return !1;
  return !0;
}
function mE() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return gE(t);
}
function gE(e) {
  const t = e.map((i) => i instanceof ArrayBuffer ? new Uint8Array(i) : i), n = t.reduce((i, o) => i + o.byteLength, 0), s = new Uint8Array(n);
  let r = 0;
  for (const i of t)
    s.set(i, r), r += i.byteLength;
  return s.buffer;
}
async function AE(e) {
  const t = [];
  for await (const n of e)
    t.push(n);
  return mE(...t);
}
function bc() {
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
class wc {
  constructor(t, n) {
    O(this, "name", void 0), O(this, "type", void 0), O(this, "sampleSize", 1), O(this, "time", 0), O(this, "count", 0), O(this, "samples", 0), O(this, "lastTiming", 0), O(this, "lastSampleTime", 0), O(this, "lastSampleCount", 0), O(this, "_count", 0), O(this, "_time", 0), O(this, "_samples", 0), O(this, "_startTime", 0), O(this, "_timerPending", !1), this.name = t, this.type = n, this.reset();
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
    return this._startTime = bc(), this._timerPending = !0, this;
  }
  timeEnd() {
    return this._timerPending ? (this.addTime(bc() - this._startTime), this._timerPending = !1, this._checkSampling(), this) : this;
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
class pE {
  constructor(t) {
    O(this, "id", void 0), O(this, "stats", {}), this.id = t.id, this.stats = {}, this._initializeStats(t.stats), Object.seal(this);
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
    return r || (t instanceof wc ? r = t : r = new wc(n, s), this.stats[n] = r), r;
  }
}
const yE = "Queued Requests", BE = "Active Requests", TE = "Cancelled Requests", EE = "Queued Requests Ever", CE = "Active Requests Ever", bE = {
  id: "request-scheduler",
  throttleRequests: !0,
  maxRequests: 6
};
class wE {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.props = void 0, this.stats = void 0, this.activeRequestCount = 0, this.requestQueue = [], this.requestMap = /* @__PURE__ */ new Map(), this.deferredUpdate = null, this.props = {
      ...bE,
      ...t
    }, this.stats = new pE({
      id: this.props.id
    }), this.stats.get(yE), this.stats.get(BE), this.stats.get(TE), this.stats.get(EE), this.stats.get(CE);
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
let _E = "";
const _c = {};
function ME(e) {
  for (const t in _c)
    if (e.startsWith(t)) {
      const n = _c[t];
      e = e.replace(t, n);
    }
  return !e.startsWith("http://") && !e.startsWith("https://") && (e = `${_E}${e}`), e;
}
function RE(e) {
  return e && typeof e == "object" && e.isBuffer;
}
function du(e) {
  if (RE(e))
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
function mu(e) {
  const t = e ? e.lastIndexOf("/") : -1;
  return t >= 0 ? e.substr(t + 1) : "";
}
function gu(e) {
  const t = e ? e.lastIndexOf("/") : -1;
  return t >= 0 ? e.substr(0, t) : "";
}
class SE {
  constructor(t, n, s) {
    this.item = void 0, this.previous = void 0, this.next = void 0, this.item = t, this.previous = n, this.next = s;
  }
}
class IE {
  constructor() {
    this.head = null, this.tail = null, this._length = 0;
  }
  get length() {
    return this._length;
  }
  add(t) {
    const n = new SE(t, this.tail, null);
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
class OE {
  constructor() {
    this._list = void 0, this._sentinel = void 0, this._trimTiles = void 0, this._list = new IE(), this._sentinel = this._list.add("sentinel"), this._trimTiles = !1;
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
    let c = r.head;
    for (; c !== o && (t.gpuMemoryUsageInBytes > i || s); ) {
      const a = c.item;
      c = c.next, this.unloadTile(t, a, n);
    }
  }
  trim() {
    this._trimTiles = !0;
  }
}
function vE(e, t) {
  Kt(e), Kt(t);
  const {
    rtcCenter: n,
    gltfUpAxis: s
  } = t, {
    computedTransform: r,
    boundingVolume: {
      center: i
    }
  } = e;
  let o = new Q(r);
  switch (n && o.translate(n), s) {
    case "Z":
      break;
    case "Y":
      const l = new Q().rotateX(Math.PI / 2);
      o = o.multiplyRight(l);
      break;
    case "X":
      const f = new Q().rotateY(-Math.PI / 2);
      o = o.multiplyRight(f);
      break;
  }
  t.isQuantized && o.translate(t.quantizedVolumeOffset).scale(t.quantizedVolumeScale);
  const c = new B(i);
  t.cartesianModelMatrix = o, t.cartesianOrigin = c;
  const a = W.WGS84.cartesianToCartographic(c, new B()), u = W.WGS84.eastNorthUpToFixedFrame(c).invert();
  t.cartographicModelMatrix = u.multiplyRight(o), t.cartographicOrigin = a, t.coordinateSystem || (t.modelMatrix = t.cartographicModelMatrix);
}
const gt = {
  OUTSIDE: -1,
  INTERSECTING: 0,
  INSIDE: 1
};
new B();
new B();
const He = new B(), Mc = new B();
class fn {
  constructor(t = [0, 0, 0], n = 0) {
    O(this, "center", void 0), O(this, "radius", void 0), this.radius = -0, this.center = new B(), this.fromCenterRadius(t, n);
  }
  fromCenterRadius(t, n) {
    return this.center.from(t), this.radius = n, this;
  }
  fromCornerPoints(t, n) {
    return n = He.from(n), this.center = new B().from(t).add(n).scale(0.5), this.radius = this.center.distance(n), this;
  }
  equals(t) {
    return this === t || !!t && this.center.equals(t.center) && this.radius === t.radius;
  }
  clone() {
    return new fn(this.center, this.radius);
  }
  union(t) {
    const n = this.center, s = this.radius, r = t.center, i = t.radius, o = He.copy(r).subtract(n), c = o.magnitude();
    if (s >= c + i)
      return this.clone();
    if (i >= c + s)
      return t.clone();
    const a = (s + c + i) * 0.5;
    return Mc.copy(o).scale((-s + a) / c).add(n), this.center.copy(Mc), this.radius = a, this;
  }
  expand(t) {
    const s = He.from(t).subtract(this.center).magnitude();
    return s > this.radius && (this.radius = s), this;
  }
  transform(t) {
    this.center.transform(t);
    const n = JB(He, t);
    return this.radius = Math.max(n[0], Math.max(n[1], n[2])) * this.radius, this;
  }
  distanceSquaredTo(t) {
    const n = this.distanceTo(t);
    return n * n;
  }
  distanceTo(t) {
    const s = He.from(t).subtract(this.center);
    return Math.max(0, s.len() - this.radius);
  }
  intersectPlane(t) {
    const n = this.center, s = this.radius, i = t.normal.dot(n) + t.distance;
    return i < -s ? gt.OUTSIDE : i < s ? gt.INTERSECTING : gt.INSIDE;
  }
}
const xE = new B(), FE = new B(), $n = new B(), Vn = new B(), Jn = new B(), LE = new B(), DE = new B(), Wt = {
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
class Ms {
  constructor(t = [0, 0, 0], n = [0, 0, 0, 0, 0, 0, 0, 0, 0]) {
    O(this, "center", void 0), O(this, "halfAxes", void 0), this.center = new B().from(t), this.halfAxes = new ot(n);
  }
  get halfSize() {
    const t = this.halfAxes.getColumn(0), n = this.halfAxes.getColumn(1), s = this.halfAxes.getColumn(2);
    return [new B(t).len(), new B(n).len(), new B(s).len()];
  }
  get quaternion() {
    const t = this.halfAxes.getColumn(0), n = this.halfAxes.getColumn(1), s = this.halfAxes.getColumn(2), r = new B(t).normalize(), i = new B(n).normalize(), o = new B(s).normalize();
    return new $r().fromMatrix3(new ot([...r, ...i, ...o]));
  }
  fromCenterHalfSizeQuaternion(t, n, s) {
    const r = new $r(s), i = new ot().fromQuaternion(r);
    return i[0] = i[0] * n[0], i[1] = i[1] * n[0], i[2] = i[2] * n[0], i[3] = i[3] * n[1], i[4] = i[4] * n[1], i[5] = i[5] * n[1], i[6] = i[6] * n[2], i[7] = i[7] * n[2], i[8] = i[8] * n[2], this.center = new B().from(t), this.halfAxes = i, this;
  }
  clone() {
    return new Ms(this.center, this.halfAxes);
  }
  equals(t) {
    return this === t || !!t && this.center.equals(t.center) && this.halfAxes.equals(t.halfAxes);
  }
  getBoundingSphere(t = new fn()) {
    const n = this.halfAxes, s = n.getColumn(0, $n), r = n.getColumn(1, Vn), i = n.getColumn(2, Jn), o = xE.copy(s).add(r).add(i);
    return t.center.copy(this.center), t.radius = o.magnitude(), t;
  }
  intersectPlane(t) {
    const n = this.center, s = t.normal, r = this.halfAxes, i = s.x, o = s.y, c = s.z, a = Math.abs(i * r[Wt.COLUMN0ROW0] + o * r[Wt.COLUMN0ROW1] + c * r[Wt.COLUMN0ROW2]) + Math.abs(i * r[Wt.COLUMN1ROW0] + o * r[Wt.COLUMN1ROW1] + c * r[Wt.COLUMN1ROW2]) + Math.abs(i * r[Wt.COLUMN2ROW0] + o * r[Wt.COLUMN2ROW1] + c * r[Wt.COLUMN2ROW2]), h = s.dot(n) + t.distance;
    return h <= -a ? gt.OUTSIDE : h >= a ? gt.INSIDE : gt.INTERSECTING;
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceSquaredTo(t));
  }
  distanceSquaredTo(t) {
    const n = FE.from(t).subtract(this.center), s = this.halfAxes, r = s.getColumn(0, $n), i = s.getColumn(1, Vn), o = s.getColumn(2, Jn), c = r.magnitude(), a = i.magnitude(), h = o.magnitude();
    r.normalize(), i.normalize(), o.normalize();
    let u = 0, l;
    return l = Math.abs(n.dot(r)) - c, l > 0 && (u += l * l), l = Math.abs(n.dot(i)) - a, l > 0 && (u += l * l), l = Math.abs(n.dot(o)) - h, l > 0 && (u += l * l), u;
  }
  computePlaneDistances(t, n, s = [-0, -0]) {
    let r = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
    const o = this.center, c = this.halfAxes, a = c.getColumn(0, $n), h = c.getColumn(1, Vn), u = c.getColumn(2, Jn), l = LE.copy(a).add(h).add(u).add(o), f = DE.copy(l).subtract(t);
    let d = n.dot(f);
    return r = Math.min(d, r), i = Math.max(d, i), l.copy(o).add(a).add(h).subtract(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), l.copy(o).add(a).subtract(h).add(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), l.copy(o).add(a).subtract(h).subtract(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(l).subtract(a).add(h).add(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(l).subtract(a).add(h).subtract(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(l).subtract(a).subtract(h).add(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(l).subtract(a).subtract(h).subtract(u), f.copy(l).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), s[0] = r, s[1] = i, s;
  }
  transform(t) {
    this.center.transformAsPoint(t);
    const n = this.halfAxes.getColumn(0, $n);
    n.transformAsPoint(t);
    const s = this.halfAxes.getColumn(1, Vn);
    s.transformAsPoint(t);
    const r = this.halfAxes.getColumn(2, Jn);
    return r.transformAsPoint(t), this.halfAxes = new ot([...n, ...s, ...r]), this;
  }
  getTransform() {
    throw new Error("not implemented");
  }
}
const Rc = new B(), Sc = new B();
class Pt {
  constructor(t = [0, 0, 1], n = 0) {
    O(this, "normal", void 0), O(this, "distance", void 0), this.normal = new B(), this.distance = -0, this.fromNormalDistance(t, n);
  }
  fromNormalDistance(t, n) {
    return It(Number.isFinite(n)), this.normal.from(t).normalize(), this.distance = n, this;
  }
  fromPointNormal(t, n) {
    t = Rc.from(t), this.normal.from(n).normalize();
    const s = -this.normal.dot(t);
    return this.distance = s, this;
  }
  fromCoefficients(t, n, s, r) {
    return this.normal.set(t, n, s), It(Zt(this.normal.len(), 1)), this.distance = r, this;
  }
  clone() {
    return new Pt(this.normal, this.distance);
  }
  equals(t) {
    return Zt(this.distance, t.distance) && Zt(this.normal, t.normal);
  }
  getPointDistance(t) {
    return this.normal.dot(t) + this.distance;
  }
  transform(t) {
    const n = Sc.copy(this.normal).transformAsVector(t).normalize(), s = this.normal.scale(-this.distance).transform(t);
    return this.fromPointNormal(s, n);
  }
  projectPointOntoPlane(t, n = [0, 0, 0]) {
    const s = Rc.from(t), r = this.getPointDistance(s), i = Sc.copy(this.normal).scale(r);
    return s.subtract(i).to(n);
  }
}
const Ic = [new B([1, 0, 0]), new B([0, 1, 0]), new B([0, 0, 1])], Oc = new B(), GE = new B();
class bt {
  constructor(t = []) {
    O(this, "planes", void 0), this.planes = t;
  }
  fromBoundingSphere(t) {
    this.planes.length = 2 * Ic.length;
    const n = t.center, s = t.radius;
    let r = 0;
    for (const i of Ic) {
      let o = this.planes[r], c = this.planes[r + 1];
      o || (o = this.planes[r] = new Pt()), c || (c = this.planes[r + 1] = new Pt());
      const a = Oc.copy(i).scale(-s).add(n);
      o.fromPointNormal(a, i);
      const h = Oc.copy(i).scale(s).add(n), u = GE.copy(i).negate();
      c.fromPointNormal(h, u), r += 2;
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
    if (It(Number.isFinite(n), "parentPlaneMask is required."), n === bt.MASK_OUTSIDE || n === bt.MASK_INSIDE)
      return n;
    let s = bt.MASK_INSIDE;
    const r = this.planes;
    for (let i = 0; i < this.planes.length; ++i) {
      const o = i < 31 ? 1 << i : 0;
      if (i < 31 && !(n & o))
        continue;
      const c = r[i], a = t.intersectPlane(c);
      if (a === gt.OUTSIDE)
        return bt.MASK_OUTSIDE;
      a === gt.INTERSECTING && (s |= o);
    }
    return s;
  }
}
O(bt, "MASK_OUTSIDE", 4294967295);
O(bt, "MASK_INSIDE", 0);
O(bt, "MASK_INDETERMINATE", 2147483647);
new B();
new B();
new B();
new B();
new B();
new B();
new B();
new B();
new B();
new B();
new B();
new B();
new B();
new B();
new B();
new B();
new B();
new ot();
new ot();
new ot();
new ot();
new ot();
new B();
new B();
new B();
new B();
new B();
new ot();
new ot(), new ot();
const vc = new B(), ur = new B(), Jr = new bt([new Pt(), new Pt(), new Pt(), new Pt(), new Pt(), new Pt()]);
function NE(e, t) {
  const {
    cameraDirection: n,
    cameraUp: s,
    height: r
  } = e, {
    metersPerUnit: i
  } = e.distanceScales, o = Zn(e, e.center), c = W.WGS84.eastNorthUpToFixedFrame(o), a = e.unprojectPosition(e.cameraPosition), h = W.WGS84.cartographicToCartesian(a, new B()), u = new B(c.transformAsVector(new B(n).scale(i))).normalize(), l = new B(c.transformAsVector(new B(s).scale(i))).normalize();
  UE(e);
  const f = e.constructor, {
    longitude: d,
    latitude: m,
    width: g,
    bearing: A,
    zoom: p
  } = e, C = new f({
    longitude: d,
    latitude: m,
    height: r,
    width: g,
    bearing: A,
    zoom: p,
    pitch: 0
  });
  return {
    camera: {
      position: h,
      direction: u,
      up: l
    },
    viewport: e,
    topDownViewport: C,
    height: r,
    cullingVolume: Jr,
    frameNumber: t,
    sseDenominator: 1.15
  };
}
function PE(e, t, n) {
  if (n === 0 || e.length <= n)
    return [e, []];
  const s = [], {
    longitude: r,
    latitude: i
  } = t.viewport;
  for (const [h, u] of e.entries()) {
    const [l, f] = u.header.mbs, d = Math.abs(r - l), m = Math.abs(i - f), g = Math.sqrt(m * m + d * d);
    s.push([h, g]);
  }
  const o = s.sort((h, u) => h[1] - u[1]), c = [];
  for (let h = 0; h < n; h++)
    c.push(e[o[h][0]]);
  const a = [];
  for (let h = n; h < o.length; h++)
    a.push(e[o[h][0]]);
  return [c, a];
}
function UE(e) {
  const t = e.getFrustumPlanes(), n = xc(t.near, e.cameraPosition), s = Zn(e, n), r = Zn(e, e.cameraPosition, ur);
  let i = 0;
  Jr.planes[i++].fromPointNormal(s, vc.copy(s).subtract(r));
  for (const o in t) {
    if (o === "near")
      continue;
    const c = t[o], a = xc(c, n, ur), h = Zn(e, a, ur);
    Jr.planes[i++].fromPointNormal(h, vc.copy(s).subtract(h));
  }
}
function xc(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : new B();
  const s = e.normal.dot(t);
  return n.copy(e.normal).scale(e.distance - s).add(t), n;
}
function Zn(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : new B();
  const s = e.unprojectPosition(t);
  return W.WGS84.cartographicToCartesian(s, n);
}
const HE = 6378137, kE = 6378137, Wr = 6356752314245179e-9, Se = new B();
function $E(e, t) {
  if (e instanceof Ms) {
    const {
      halfAxes: n
    } = e, s = JE(n);
    return Math.log2(Wr / (s + t[2]));
  } else if (e instanceof fn) {
    const {
      radius: n
    } = e;
    return Math.log2(Wr / (n + t[2]));
  } else if (e.width && e.height) {
    const {
      width: n,
      height: s
    } = e, r = Math.log2(HE / n), i = Math.log2(kE / s);
    return (r + i) / 2;
  }
  return 1;
}
function Au(e, t, n) {
  W.WGS84.cartographicToCartesian([e.xmax, e.ymax, e.zmax], Se);
  const s = Math.sqrt(Math.pow(Se[0] - n[0], 2) + Math.pow(Se[1] - n[1], 2) + Math.pow(Se[2] - n[2], 2));
  return Math.log2(Wr / (s + t[2]));
}
function VE(e, t, n) {
  const [s, r, i, o] = e;
  return Au({
    xmin: s,
    xmax: i,
    ymin: r,
    ymax: o,
    zmin: 0,
    zmax: 0
  }, t, n);
}
function JE(e) {
  e.getColumn(0, Se);
  const t = e.getColumn(1), n = e.getColumn(2);
  return Se.add(t).add(n).len();
}
const WE = (e) => typeof e == "boolean", Ye = (e) => typeof e == "function", dn = (e) => e !== null && typeof e == "object", Fc = (e) => dn(e) && e.constructor === {}.constructor, zE = (e) => !!e && typeof e[Symbol.iterator] == "function", jE = (e) => e && typeof e[Symbol.asyncIterator] == "function", ge = (e) => typeof Response < "u" && e instanceof Response || e && e.arrayBuffer && e.text && e.json, Ae = (e) => typeof Blob < "u" && e instanceof Blob, KE = (e) => e && typeof e == "object" && e.isBuffer, qE = (e) => typeof ReadableStream < "u" && e instanceof ReadableStream || dn(e) && Ye(e.tee) && Ye(e.cancel) && Ye(e.getReader), XE = (e) => dn(e) && Ye(e.read) && Ye(e.pipe) && WE(e.readable), pu = (e) => qE(e) || XE(e), QE = /^data:([-\w.]+\/[-\w.+]+)(;|,)/, YE = /^([-\w.]+\/[-\w.+]+)/;
function ZE(e) {
  const t = YE.exec(e);
  return t ? t[1] : e;
}
function Lc(e) {
  const t = QE.exec(e);
  return t ? t[1] : "";
}
const yu = /\?.*/;
function tC(e) {
  const t = e.match(yu);
  return t && t[0];
}
function Si(e) {
  return e.replace(yu, "");
}
function Rs(e) {
  return ge(e) ? e.url : Ae(e) ? e.name || "" : typeof e == "string" ? e : "";
}
function Ii(e) {
  if (ge(e)) {
    const t = e, n = t.headers.get("content-type") || "", s = Si(t.url);
    return ZE(n) || Lc(s);
  }
  return Ae(e) ? e.type || "" : typeof e == "string" ? Lc(e) : "";
}
function eC(e) {
  return ge(e) ? e.headers["content-length"] || -1 : Ae(e) ? e.size : typeof e == "string" ? e.length : e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? e.byteLength : -1;
}
async function Bu(e) {
  if (ge(e))
    return e;
  const t = {}, n = eC(e);
  n >= 0 && (t["content-length"] = String(n));
  const s = Rs(e), r = Ii(e);
  r && (t["content-type"] = r);
  const i = await rC(e);
  i && (t["x-first-bytes"] = i), typeof e == "string" && (e = new TextEncoder().encode(e));
  const o = new Response(e, {
    headers: t
  });
  return Object.defineProperty(o, "url", {
    value: s
  }), o;
}
async function nC(e) {
  if (!e.ok) {
    const t = await sC(e);
    throw new Error(t);
  }
}
async function sC(e) {
  let t = `Failed to fetch resource ${e.url} (${e.status}): `;
  try {
    const n = e.headers.get("Content-Type");
    let s = e.statusText;
    n != null && n.includes("application/json") && (s += ` ${await e.text()}`), t += s, t = t.length > 60 ? `${t.slice(0, 60)}...` : t;
  } catch {
  }
  return t;
}
async function rC(e) {
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
    return `data:base64,${iC(n)}`;
  }
  return null;
}
function iC(e) {
  let t = "";
  const n = new Uint8Array(e);
  for (let s = 0; s < n.byteLength; s++)
    t += String.fromCharCode(n[s]);
  return btoa(t);
}
function oC(e) {
  return !cC(e) && !aC(e);
}
function cC(e) {
  return e.startsWith("http:") || e.startsWith("https:");
}
function aC(e) {
  return e.startsWith("data:");
}
async function Dc(e, t) {
  if (typeof e == "string") {
    const r = ME(e);
    if (oC(r)) {
      var n;
      if ((n = globalThis.loaders) !== null && n !== void 0 && n.fetchNode) {
        var s;
        return (s = globalThis.loaders) === null || s === void 0 ? void 0 : s.fetchNode(r, t);
      }
    }
    return await fetch(r, t);
  }
  return await Bu(e);
}
function hC(e) {
  if (typeof window < "u" && typeof window.process == "object" && window.process.type === "renderer" || typeof process < "u" && typeof process.versions == "object" && process.versions.electron)
    return !0;
  const t = typeof navigator == "object" && typeof navigator.userAgent == "string" && navigator.userAgent, n = e || t;
  return !!(n && n.indexOf("Electron") >= 0);
}
function mn() {
  return !(typeof process == "object" && String(process) === "[object process]" && !process.browser) || hC();
}
const Wn = globalThis.window || globalThis.self || globalThis.global, ke = globalThis.process || {}, Tu = typeof __VERSION__ < "u" ? __VERSION__ : "untranspiled source";
mn();
function uC(e) {
  try {
    const t = window[e], n = "__storage_test__";
    return t.setItem(n, n), t.removeItem(n), t;
  } catch {
    return null;
  }
}
class lC {
  constructor(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "sessionStorage";
    O(this, "storage", void 0), O(this, "id", void 0), O(this, "config", void 0), this.storage = uC(s), this.id = t, this.config = n, this._loadConfiguration();
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
function fC(e) {
  let t;
  return e < 10 ? t = "".concat(e.toFixed(2), "ms") : e < 100 ? t = "".concat(e.toFixed(1), "ms") : e < 1e3 ? t = "".concat(e.toFixed(0), "ms") : t = "".concat((e / 1e3).toFixed(2), "s"), t;
}
function dC(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8;
  const n = Math.max(t - e.length, 0);
  return "".concat(" ".repeat(n)).concat(e);
}
function lr(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 600;
  const r = e.src.replace(/\(/g, "%28").replace(/\)/g, "%29");
  e.width > s && (n = Math.min(n, s / e.width));
  const i = e.width * n, o = e.height * n, c = ["font-size:1px;", "padding:".concat(Math.floor(o / 2), "px ").concat(Math.floor(i / 2), "px;"), "line-height:".concat(o, "px;"), "background:url(".concat(r, ");"), "background-size:".concat(i, "px ").concat(o, "px;"), "color:transparent;"].join("");
  return ["".concat(t, " %c+"), c];
}
let ds;
(function(e) {
  e[e.BLACK = 30] = "BLACK", e[e.RED = 31] = "RED", e[e.GREEN = 32] = "GREEN", e[e.YELLOW = 33] = "YELLOW", e[e.BLUE = 34] = "BLUE", e[e.MAGENTA = 35] = "MAGENTA", e[e.CYAN = 36] = "CYAN", e[e.WHITE = 37] = "WHITE", e[e.BRIGHT_BLACK = 90] = "BRIGHT_BLACK", e[e.BRIGHT_RED = 91] = "BRIGHT_RED", e[e.BRIGHT_GREEN = 92] = "BRIGHT_GREEN", e[e.BRIGHT_YELLOW = 93] = "BRIGHT_YELLOW", e[e.BRIGHT_BLUE = 94] = "BRIGHT_BLUE", e[e.BRIGHT_MAGENTA = 95] = "BRIGHT_MAGENTA", e[e.BRIGHT_CYAN = 96] = "BRIGHT_CYAN", e[e.BRIGHT_WHITE = 97] = "BRIGHT_WHITE";
})(ds || (ds = {}));
const mC = 10;
function Gc(e) {
  return typeof e != "string" ? e : (e = e.toUpperCase(), ds[e] || ds.WHITE);
}
function gC(e, t, n) {
  if (!mn && typeof e == "string") {
    if (t) {
      const s = Gc(t);
      e = "\x1B[".concat(s, "m").concat(e, "\x1B[39m");
    }
    if (n) {
      const s = Gc(n);
      e = "\x1B[".concat(s + mC, "m").concat(e, "\x1B[49m");
    }
  }
  return e;
}
function AC(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ["constructor"];
  const n = Object.getPrototypeOf(e), s = Object.getOwnPropertyNames(n), r = e;
  for (const i of s) {
    const o = r[i];
    typeof o == "function" && (t.find((c) => i === c) || (r[i] = o.bind(e)));
  }
}
function ms(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
function be() {
  let e;
  if (mn() && Wn.performance) {
    var t, n;
    e = Wn == null || (t = Wn.performance) === null || t === void 0 || (n = t.now) === null || n === void 0 ? void 0 : n.call(t);
  } else if ("hrtime" in ke) {
    var s;
    const r = ke == null || (s = ke.hrtime) === null || s === void 0 ? void 0 : s.call(ke);
    e = r[0] * 1e3 + r[1] / 1e6;
  } else
    e = Date.now();
  return e;
}
const we = {
  debug: mn() && console.debug || console.log,
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
}, pC = {
  enabled: !0,
  level: 0
};
function Bt() {
}
const Nc = {}, Pc = {
  once: !0
};
class Oi {
  constructor() {
    let {
      id: t
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
      id: ""
    };
    O(this, "id", void 0), O(this, "VERSION", Tu), O(this, "_startTs", be()), O(this, "_deltaTs", be()), O(this, "_storage", void 0), O(this, "userData", {}), O(this, "LOG_THROTTLE_TIMEOUT", 0), this.id = t, this.userData = {}, this._storage = new lC("__probe-".concat(this.id, "__"), pC), this.timeStamp("".concat(this.id, " started")), AC(this), Object.seal(this);
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
    return Number((be() - this._startTs).toPrecision(10));
  }
  getDelta() {
    return Number((be() - this._deltaTs).toPrecision(10));
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
    ms(t, n);
  }
  warn(t) {
    return this._getLogFunction(0, t, we.warn, arguments, Pc);
  }
  error(t) {
    return this._getLogFunction(0, t, we.error, arguments);
  }
  deprecated(t, n) {
    return this.warn("`".concat(t, "` is deprecated and will be removed in a later version. Use `").concat(n, "` instead"));
  }
  removed(t, n) {
    return this.error("`".concat(t, "` has been removed. Use `").concat(n, "` instead"));
  }
  probe(t, n) {
    return this._getLogFunction(t, n, we.log, arguments, {
      time: !0,
      once: !0
    });
  }
  log(t, n) {
    return this._getLogFunction(t, n, we.debug, arguments);
  }
  info(t, n) {
    return this._getLogFunction(t, n, console.info, arguments);
  }
  once(t, n) {
    return this._getLogFunction(t, n, we.debug || we.info, arguments, Pc);
  }
  table(t, n, s) {
    return n ? this._getLogFunction(t, n, console.table || Bt, s && [s], {
      tag: EC(n)
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
    return this._shouldLog(n || s) ? mn() ? TC({
      image: r,
      message: i,
      scale: o
    }) : BC() : Bt;
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
    const r = Uc({
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
    return this.isEnabled() && this.getLevel() >= Eu(t);
  }
  _getLogFunction(t, n, s, r, i) {
    if (this._shouldLog(t)) {
      i = Uc({
        logLevel: t,
        message: n,
        args: r,
        opts: i
      }), s = s || i.method, ms(s), i.total = this.getTotal(), i.delta = this.getDelta(), this._deltaTs = be();
      const o = i.tag || i.message;
      if (i.once && o)
        if (!Nc[o])
          Nc[o] = be();
        else
          return Bt;
      return n = yC(this.id, i.message, i), s.bind(console, n, ...i.args);
    }
    return Bt;
  }
}
O(Oi, "VERSION", Tu);
function Eu(e) {
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
  return ms(Number.isFinite(t) && t >= 0), t;
}
function Uc(e) {
  const {
    logLevel: t,
    message: n
  } = e;
  e.logLevel = Eu(t);
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
  return ms(r === "string" || r === "object"), Object.assign(e, {
    args: s
  }, e.opts);
}
function yC(e, t, n) {
  if (typeof t == "string") {
    const s = n.time ? dC(fC(n.total)) : "";
    t = n.time ? "".concat(e, ": ").concat(s, "  ").concat(t) : "".concat(e, ": ").concat(t), t = gC(t, n.color, n.background);
  }
  return t;
}
function BC(e) {
  return console.warn("removed"), Bt;
}
function TC(e) {
  let {
    image: t,
    message: n = "",
    scale: s = 1
  } = e;
  if (typeof t == "string") {
    const i = new Image();
    return i.onload = () => {
      const o = lr(i, n, s);
      console.log(...o);
    }, i.src = t, Bt;
  }
  const r = t.nodeName || "";
  if (r.toLowerCase() === "img")
    return console.log(...lr(t, n, s)), Bt;
  if (r.toLowerCase() === "canvas") {
    const i = new Image();
    return i.onload = () => console.log(...lr(i, n, s)), i.src = t.toDataURL(), Bt;
  }
  return Bt;
}
function EC(e) {
  for (const t in e)
    for (const n in e[t])
      return n || "untitled";
  return "empty";
}
const Hc = new Oi({
  id: "loaders.gl"
});
class CC {
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
class bC {
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
const Cu = {
  fetch: null,
  mimeType: void 0,
  nothrow: !1,
  log: new bC(),
  useLocalLibraries: !1,
  CDN: "https://unpkg.com/@loaders.gl",
  worker: !0,
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: hu,
  _nodeWorkers: !1,
  _workerType: "",
  limit: 0,
  _limitMB: 0,
  batchSize: "auto",
  batchDebounceMs: 0,
  metadata: !1,
  transforms: []
}, wC = {
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
function bu() {
  globalThis.loaders = globalThis.loaders || {};
  const {
    loaders: e
  } = globalThis;
  return e._state = e._state || {}, e._state;
}
function wu() {
  const e = bu();
  return e.globalOptions = e.globalOptions || {
    ...Cu
  }, e.globalOptions;
}
function _C(e, t, n, s) {
  return n = n || [], n = Array.isArray(n) ? n : [n], MC(e, n), SC(t, e, s);
}
function MC(e, t) {
  kc(e, null, Cu, wC, t);
  for (const n of t) {
    const s = e && e[n.id] || {}, r = n.options && n.options[n.id] || {}, i = n.deprecatedOptions && n.deprecatedOptions[n.id] || {};
    kc(s, n.id, r, i, t);
  }
}
function kc(e, t, n, s, r) {
  const i = t || "Top level", o = t ? `${t}.` : "";
  for (const c in e) {
    const a = !t && dn(e[c]), h = c === "baseUri" && !t, u = c === "workerUrl" && t;
    if (!(c in n) && !h && !u) {
      if (c in s)
        Hc.warn(`${i} loader option '${o}${c}' no longer supported, use '${s[c]}'`)();
      else if (!a) {
        const l = RC(c, r);
        Hc.warn(`${i} loader option '${o}${c}' not recognized. ${l}`)();
      }
    }
  }
}
function RC(e, t) {
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
function SC(e, t, n) {
  const r = {
    ...e.options || {}
  };
  return IC(r, n), r.log === null && (r.log = new CC()), $c(r, wu()), $c(r, t), r;
}
function $c(e, t) {
  for (const n in t)
    if (n in t) {
      const s = t[n];
      Fc(s) && Fc(e[n]) ? e[n] = {
        ...e[n],
        ...t[n]
      } : e[n] = t[n];
    }
}
function IC(e, t) {
  t && !("baseUri" in e) && (e.baseUri = t);
}
function vi(e) {
  var t;
  return e ? (Array.isArray(e) && (e = e[0]), Array.isArray((t = e) === null || t === void 0 ? void 0 : t.extensions)) : !1;
}
function _u(e) {
  var t, n;
  Kt(e, "null loader"), Kt(vi(e), "invalid loader");
  let s;
  return Array.isArray(e) && (s = e[1], e = e[0], e = {
    ...e,
    options: {
      ...e.options,
      ...s
    }
  }), ((t = e) !== null && t !== void 0 && t.parseTextSync || (n = e) !== null && n !== void 0 && n.parseText) && (e.text = !0), e.text || (e.binary = !0), e;
}
const OC = () => {
  const e = bu();
  return e.loaderRegistry = e.loaderRegistry || [], e.loaderRegistry;
};
function vC() {
  return OC();
}
const xC = new Oi({
  id: "loaders.gl"
}), FC = /\.([^.]+)$/;
async function LC(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0;
  if (!Mu(e))
    return null;
  let r = Vc(e, t, {
    ...n,
    nothrow: !0
  }, s);
  if (r)
    return r;
  if (Ae(e) && (e = await e.slice(0, 10).arrayBuffer(), r = Vc(e, t, n, s)), !r && !(n != null && n.nothrow))
    throw new Error(Ru(e));
  return r;
}
function Vc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0;
  if (!Mu(e))
    return null;
  if (t && !Array.isArray(t))
    return _u(t);
  let r = [];
  t && (r = r.concat(t)), n != null && n.ignoreRegisteredLoaders || r.push(...vC()), GC(r);
  const i = DC(e, r, n, s);
  if (!i && !(n != null && n.nothrow))
    throw new Error(Ru(e));
  return i;
}
function DC(e, t, n, s) {
  const r = Rs(e), i = Ii(e), o = Si(r) || (s == null ? void 0 : s.url);
  let c = null, a = "";
  if (n != null && n.mimeType && (c = fr(t, n == null ? void 0 : n.mimeType), a = `match forced by supplied MIME type ${n == null ? void 0 : n.mimeType}`), c = c || NC(t, o), a = a || (c ? `matched url ${o}` : ""), c = c || fr(t, i), a = a || (c ? `matched MIME type ${i}` : ""), c = c || UC(t, e), a = a || (c ? `matched initial data ${Su(e)}` : ""), n != null && n.fallbackMimeType && (c = c || fr(t, n == null ? void 0 : n.fallbackMimeType), a = a || (c ? `matched fallback MIME type ${i}` : "")), a) {
    var h;
    xC.log(1, `selectLoader selected ${(h = c) === null || h === void 0 ? void 0 : h.name}: ${a}.`);
  }
  return c;
}
function Mu(e) {
  return !(e instanceof Response && e.status === 204);
}
function Ru(e) {
  const t = Rs(e), n = Ii(e);
  let s = "No valid loader found (";
  s += t ? `${mu(t)}, ` : "no url provided, ", s += `MIME type: ${n ? `"${n}"` : "not provided"}, `;
  const r = e ? Su(e) : "";
  return s += r ? ` first bytes: "${r}"` : "first bytes: not available", s += ")", s;
}
function GC(e) {
  for (const t of e)
    _u(t);
}
function NC(e, t) {
  const n = t && FC.exec(t), s = n && n[1];
  return s ? PC(e, s) : null;
}
function PC(e, t) {
  t = t.toLowerCase();
  for (const n of e)
    for (const s of n.extensions)
      if (s.toLowerCase() === t)
        return n;
  return null;
}
function fr(e, t) {
  for (const n of e)
    if (n.mimeTypes && n.mimeTypes.includes(t) || t === `application/x.${n.id}`)
      return n;
  return null;
}
function UC(e, t) {
  if (!t)
    return null;
  for (const n of e)
    if (typeof t == "string") {
      if (HC(t, n))
        return n;
    } else if (ArrayBuffer.isView(t)) {
      if (Jc(t.buffer, t.byteOffset, n))
        return n;
    } else if (t instanceof ArrayBuffer && Jc(t, 0, n))
      return n;
  return null;
}
function HC(e, t) {
  return t.testText ? t.testText(e) : (Array.isArray(t.tests) ? t.tests : [t.tests]).some((s) => e.startsWith(s));
}
function Jc(e, t, n) {
  return (Array.isArray(n.tests) ? n.tests : [n.tests]).some((r) => kC(e, t, n, r));
}
function kC(e, t, n, s) {
  if (s instanceof ArrayBuffer)
    return dE(s, e, s.byteLength);
  switch (typeof s) {
    case "function":
      return s(e);
    case "string":
      const r = zr(e, t, s.length);
      return s === r;
    default:
      return !1;
  }
}
function Su(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
  return typeof e == "string" ? e.slice(0, t) : ArrayBuffer.isView(e) ? zr(e.buffer, e.byteOffset, t) : e instanceof ArrayBuffer ? zr(e, 0, t) : "";
}
function zr(e, t, n) {
  if (e.byteLength < t + n)
    return "";
  const s = new DataView(e);
  let r = "";
  for (let i = 0; i < n; i++)
    r += String.fromCharCode(s.getUint8(t + i));
  return r;
}
const $C = 256 * 1024;
function* VC(e, t) {
  const n = (t == null ? void 0 : t.chunkSize) || $C;
  let s = 0;
  const r = new TextEncoder();
  for (; s < e.length; ) {
    const i = Math.min(e.length - s, n), o = e.slice(s, s + i);
    s += i, yield r.encode(o);
  }
}
const JC = 256 * 1024;
function WC(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return function* () {
    const {
      chunkSize: n = JC
    } = t;
    let s = 0;
    for (; s < e.byteLength; ) {
      const r = Math.min(e.byteLength - s, n), i = new ArrayBuffer(r), o = new Uint8Array(e, s, r);
      new Uint8Array(i).set(o), s += r, yield i;
    }
  }();
}
const zC = 1024 * 1024;
async function* jC(e, t) {
  const n = (t == null ? void 0 : t.chunkSize) || zC;
  let s = 0;
  for (; s < e.size; ) {
    const r = s + n, i = await e.slice(s, r).arrayBuffer();
    s = r, yield i;
  }
}
function Wc(e, t) {
  return hu ? KC(e, t) : qC(e);
}
async function* KC(e, t) {
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
      yield du(o);
    }
  } catch {
    n.releaseLock();
  }
}
async function* qC(e, t) {
  for await (const n of e)
    yield du(n);
}
function XC(e, t) {
  if (typeof e == "string")
    return VC(e, t);
  if (e instanceof ArrayBuffer)
    return WC(e, t);
  if (Ae(e))
    return jC(e, t);
  if (pu(e))
    return Wc(e, t);
  if (ge(e))
    return Wc(e.body, t);
  throw new Error("makeIterator");
}
const Iu = "Cannot convert supplied data type";
function QC(e, t, n) {
  if (t.text && typeof e == "string")
    return e;
  if (KE(e) && (e = e.buffer), e instanceof ArrayBuffer) {
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
  throw new Error(Iu);
}
async function YC(e, t, n) {
  const s = e instanceof ArrayBuffer || ArrayBuffer.isView(e);
  if (typeof e == "string" || s)
    return QC(e, t);
  if (Ae(e) && (e = await Bu(e)), ge(e)) {
    const r = e;
    return await nC(r), t.binary ? await r.arrayBuffer() : await r.text();
  }
  if (pu(e) && (e = XC(e, n)), zE(e) || jE(e))
    return AE(e);
  throw new Error(Iu);
}
function Ou(e, t) {
  const n = wu(), s = e || n;
  return typeof s.fetch == "function" ? s.fetch : dn(s.fetch) ? (r) => Dc(r, s.fetch) : t != null && t.fetch ? t == null ? void 0 : t.fetch : Dc;
}
function ZC(e, t, n) {
  if (n)
    return n;
  const s = {
    fetch: Ou(t, e),
    ...e
  };
  if (s.url) {
    const r = Si(s.url);
    s.baseUrl = r, s.queryString = tC(s.url), s.filename = mu(r), s.baseUrl = gu(r);
  }
  return Array.isArray(s.loaders) || (s.loaders = null), s;
}
function tb(e, t) {
  if (e && !Array.isArray(e))
    return e;
  let n;
  if (e && (n = Array.isArray(e) ? e : [e]), t && t.loaders) {
    const s = Array.isArray(t.loaders) ? t.loaders : [t.loaders];
    n = n ? [...n, ...s] : s;
  }
  return n && n.length ? n : void 0;
}
async function gs(e, t, n, s) {
  t && !Array.isArray(t) && !vi(t) && (s = void 0, n = t, t = void 0), e = await e, n = n || {};
  const r = Rs(e), o = tb(t, s), c = await LC(e, o, n);
  return c ? (n = _C(n, c, o, r), s = ZC({
    url: r,
    _parse: gs,
    loaders: o
  }, n, s || null), await eb(c, e, n, s)) : null;
}
async function eb(e, t, n, s) {
  if (hE(e), n = QT(e.options, n), ge(t)) {
    const i = t, {
      ok: o,
      redirected: c,
      status: a,
      statusText: h,
      type: u,
      url: l
    } = i, f = Object.fromEntries(i.headers.entries());
    s.response = {
      headers: f,
      ok: o,
      redirected: c,
      status: a,
      statusText: h,
      type: u,
      url: l
    };
  }
  t = await YC(t, e, n);
  const r = e;
  if (r.parseTextSync && typeof t == "string")
    return r.parseTextSync(t, n, s);
  if (uE(e, n))
    return await lE(e, t, n, s, gs);
  if (r.parseText && typeof t == "string")
    return await r.parseText(t, n, s);
  if (r.parse)
    return await r.parse(t, n, s);
  throw ne(!r.parseSync), new Error(`${e.id} loader - no parser found and worker is disabled`);
}
async function vu(e, t, n, s) {
  let r, i;
  !Array.isArray(t) && !vi(t) ? (r = [], i = t) : (r = t, i = n);
  const o = Ou(i);
  let c = e;
  return typeof e == "string" && (c = await o(e)), Ae(e) && (c = await o(e)), Array.isArray(r) ? await gs(c, r, i) : await gs(c, r, i);
}
const at = {
  UNLOADED: 0,
  LOADING: 1,
  PROCESSING: 2,
  READY: 3,
  EXPIRED: 4,
  FAILED: 5
};
let ue = function(e) {
  return e[e.ADD = 1] = "ADD", e[e.REPLACE = 2] = "REPLACE", e;
}({}), dr = function(e) {
  return e.EMPTY = "empty", e.SCENEGRAPH = "scenegraph", e.POINTCLOUD = "pointcloud", e.MESH = "mesh", e;
}({}), Rt = function(e) {
  return e.I3S = "I3S", e.TILES3D = "TILES3D", e;
}({});
(function(e) {
  return e.GEOMETRIC_ERROR = "geometricError", e.MAX_SCREEN_THRESHOLD = "maxScreenThreshold", e;
})({});
const nb = {
  NOT_COMPUTED: -1,
  USE_OPTIMIZATION: 1,
  SKIP_OPTIMIZATION: 0
};
function xu(e) {
  return e != null;
}
const nt = new B(), ts = new B(), sb = new B(), rb = new B(), oe = new B(), zc = new B(), jc = new B(), Kc = new B();
function mr(e, t, n) {
  if (Kt(e, "3D Tile: boundingVolume must be defined"), e.box)
    return Fu(e.box, t, n);
  if (e.region)
    return cb(e.region);
  if (e.sphere)
    return ob(e.sphere, t, n);
  throw new Error("3D Tile: boundingVolume must contain a sphere, region, or box");
}
function ib(e, t) {
  if (e.box)
    return ab(t);
  if (e.region) {
    const [n, s, r, i, o, c] = e.region;
    return [[St(n), St(s), o], [St(r), St(i), c]];
  }
  if (e.sphere)
    return hb(t);
  throw new Error("Unkown boundingVolume type");
}
function Fu(e, t, n) {
  const s = new B(e[0], e[1], e[2]);
  t.transform(s, s);
  let r = [];
  if (e.length === 10) {
    const h = e.slice(3, 6), u = new $r();
    u.fromArray(e, 6);
    const l = new B([1, 0, 0]), f = new B([0, 1, 0]), d = new B([0, 0, 1]);
    l.transformByQuaternion(u), l.scale(h[0]), f.transformByQuaternion(u), f.scale(h[1]), d.transformByQuaternion(u), d.scale(h[2]), r = [...l.toArray(), ...f.toArray(), ...d.toArray()];
  } else
    r = [...e.slice(3, 6), ...e.slice(6, 9), ...e.slice(9, 12)];
  const i = t.transformAsVector(r.slice(0, 3)), o = t.transformAsVector(r.slice(3, 6)), c = t.transformAsVector(r.slice(6, 9)), a = new ot([i[0], i[1], i[2], o[0], o[1], o[2], c[0], c[1], c[2]]);
  return xu(n) ? (n.center = s, n.halfAxes = a, n) : new Ms(s, a);
}
function ob(e, t, n) {
  const s = new B(e[0], e[1], e[2]);
  t.transform(s, s);
  const r = t.getScale(ts), i = Math.max(Math.max(r[0], r[1]), r[2]), o = e[3] * i;
  return xu(n) ? (n.center = s, n.radius = o, n) : new fn(s, o);
}
function cb(e) {
  const [t, n, s, r, i, o] = e, c = W.WGS84.cartographicToCartesian([St(t), St(r), i], sb), a = W.WGS84.cartographicToCartesian([St(s), St(n), o], rb), h = new B().addVectors(c, a).multiplyByScalar(0.5);
  return W.WGS84.cartesianToCartographic(h, oe), W.WGS84.cartographicToCartesian([St(s), oe[1], oe[2]], zc), W.WGS84.cartographicToCartesian([oe[0], St(r), oe[2]], jc), W.WGS84.cartographicToCartesian([oe[0], oe[1], o], Kc), Fu([...h, ...zc.subtract(h), ...jc.subtract(h), ...Kc.subtract(h)], new Q());
}
function ab(e) {
  const t = Lu(), {
    halfAxes: n
  } = e, s = new B(n.getColumn(0)), r = new B(n.getColumn(1)), i = new B(n.getColumn(2));
  for (let o = 0; o < 2; o++) {
    for (let c = 0; c < 2; c++) {
      for (let a = 0; a < 2; a++)
        nt.copy(e.center), nt.add(s), nt.add(r), nt.add(i), Du(t, nt), i.negate();
      r.negate();
    }
    s.negate();
  }
  return t;
}
function hb(e) {
  const t = Lu(), {
    center: n,
    radius: s
  } = e, r = W.WGS84.scaleToGeodeticSurface(n, nt);
  let i;
  r ? i = W.WGS84.geodeticSurfaceNormal(r) : i = new B(0, 0, 1);
  let o = new B(i[2], -i[1], 0);
  o.len() > 0 ? o.normalize() : o = new B(0, 1, 0);
  const c = o.clone().cross(i);
  for (const a of [o, c, i]) {
    ts.copy(a).scale(s);
    for (let h = 0; h < 2; h++)
      nt.copy(n), nt.add(ts), Du(t, nt), ts.negate();
  }
  return t;
}
function Lu() {
  return [[1 / 0, 1 / 0, 1 / 0], [-1 / 0, -1 / 0, -1 / 0]];
}
function Du(e, t) {
  W.WGS84.cartesianToCartographic(t, nt), e[0][0] = Math.min(e[0][0], nt[0]), e[0][1] = Math.min(e[0][1], nt[1]), e[0][2] = Math.min(e[0][2], nt[2]), e[1][0] = Math.max(e[1][0], nt[0]), e[1][1] = Math.max(e[1][1], nt[1]), e[1][2] = Math.max(e[1][2], nt[2]);
}
new B();
new B();
new Q();
new B();
new B();
new B();
function ub(e, t) {
  const n = e * t;
  return 1 - Math.exp(-(n * n));
}
function lb(e, t) {
  if (e.dynamicScreenSpaceError && e.dynamicScreenSpaceErrorComputedDensity) {
    const n = e.dynamicScreenSpaceErrorComputedDensity, s = e.dynamicScreenSpaceErrorFactor;
    return ub(t, n) * s;
  }
  return 0;
}
function fb(e, t, n) {
  const s = e.tileset, r = e.parent && e.parent.lodMetricValue || e.lodMetricValue, i = n ? r : e.lodMetricValue;
  if (i === 0)
    return 0;
  const o = Math.max(e._distanceToCamera, 1e-7), {
    height: c,
    sseDenominator: a
  } = t, {
    viewDistanceScale: h
  } = s.options;
  let u = i * c * (h || 1) / (o * a);
  return u -= lb(s, o), u;
}
const gr = new B(), qc = new B(), Qt = new B(), Xc = new B(), db = new B(), Ar = new Q(), Qc = new Q();
function mb(e, t) {
  if (e.lodMetricValue === 0 || isNaN(e.lodMetricValue))
    return "DIG";
  const n = 2 * Gu(e, t);
  return n < 2 ? "OUT" : !e.header.children || n <= e.lodMetricValue ? "DRAW" : e.header.children ? "DIG" : "OUT";
}
function Gu(e, t) {
  const {
    topDownViewport: n
  } = t, s = e.header.mbs[1], r = e.header.mbs[0], i = e.header.mbs[2], o = e.header.mbs[3], c = [...e.boundingVolume.center], a = n.unprojectPosition(n.cameraPosition);
  W.WGS84.cartographicToCartesian(a, gr), qc.copy(gr).subtract(c).normalize(), W.WGS84.eastNorthUpToFixedFrame(c, Ar), Qc.copy(Ar).invert(), Qt.copy(gr).transform(Qc);
  const h = Math.sqrt(Qt[0] * Qt[0] + Qt[1] * Qt[1]), u = h * h / Qt[2];
  Xc.copy([Qt[0], Qt[1], u]);
  const f = Xc.transform(Ar).subtract(c).normalize(), m = qc.cross(f).normalize().scale(o).add(c), g = W.WGS84.cartesianToCartographic(m), A = n.project([r, s, i]), p = n.project(g);
  return db.copy(A).subtract(p).magnitude();
}
function gb(e) {
  return {
    assetGltfUpAxis: e.asset && e.asset.gltfUpAxis || "Y"
  };
}
class Yc {
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
    return Kt(t < this._array.length), this._array[t];
  }
  set(t, n) {
    Kt(t >= 0), t >= this.length && (this.length = t + 1), this._map.has(this._array[t]) && this._map.delete(this._array[t]), this._array[t] = n, this._map.set(n, t);
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
    Kt(t >= 0), t > this._array.length && (this._array.length = t);
  }
  resize(t) {
    Kt(t >= 0), this.length = t;
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
const Ab = {
  loadSiblings: !1,
  skipLevelOfDetail: !1,
  updateTransforms: !0,
  onTraversalEnd: () => {
  },
  viewportTraversersMap: {},
  basePath: ""
};
class Ss {
  traversalFinished(t) {
    return !0;
  }
  constructor(t) {
    this.options = void 0, this.root = null, this.selectedTiles = {}, this.requestedTiles = {}, this.emptyTiles = {}, this.lastUpdate = (/* @__PURE__ */ new Date()).getTime(), this.updateDebounceTime = 1e3, this._traversalStack = new Yc(), this._emptyTraversalStack = new Yc(), this._frameNumber = null, this.options = {
      ...Ab,
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
      const c = i.parent, a = !!(!c || c._shouldRefine), h = !o;
      i.hasRenderContent ? i.refine === ue.ADD ? (this.loadTile(i, n), this.selectTile(i, n)) : i.refine === ue.REPLACE && (this.loadTile(i, n), h && this.selectTile(i, n)) : (this.emptyTiles[i.id] = i, this.loadTile(i, n), h && this.selectTile(i, n)), this.touchTile(i, n), i._shouldRefine = o && a;
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
    } = this.options, c = t.children;
    c.sort(this.compareDistanceToCamera.bind(this));
    const a = t.refine === ue.REPLACE && t.hasRenderContent && !o;
    let h = !1, u = !0;
    for (const l of c)
      if (l._selectionDepth = r, l.isVisibleAndInRequestVolume ? (s.find(l) && s.delete(l), s.push(l), h = !0) : (a || i) && (this.loadTile(l, n), this.touchTile(l, n)), a) {
        let f;
        if (l._inRequestVolume ? l.hasRenderContent ? f = l.contentAvailable : f = this.executeEmptyTraversal(l, n) : f = !1, u = u && f, !u)
          return !1;
      }
    return h || (u = !1), u;
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
      const i = r.pop(), o = !i.hasRenderContent && this.canTraverse(i, n, !1, !1), c = !i.hasRenderContent && i.children.length === 0;
      if (!o && !i.contentAvailable && !c && (s = !1), this.updateTile(i, n), i.isVisibleAndInRequestVolume || (this.loadTile(i, n), this.touchTile(i, n)), o) {
        const a = i.children;
        for (const h of a)
          r.push(h);
      }
    }
    return s;
  }
}
const Zc = new B();
function pb(e) {
  return e != null;
}
class jr {
  constructor(t, n, s) {
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
    this.tileset = void 0, this.header = void 0, this.id = void 0, this.url = void 0, this.parent = void 0, this.refine = void 0, this.type = void 0, this.contentUrl = void 0, this.lodMetricType = "geometricError", this.lodMetricValue = 0, this.boundingVolume = null, this.content = null, this.contentState = at.UNLOADED, this.gpuMemoryUsageInBytes = 0, this.children = [], this.depth = 0, this.viewportIds = [], this.transform = new Q(), this.extensions = null, this.implicitTiling = null, this.userData = {}, this.computedTransform = void 0, this.hasEmptyContent = !1, this.hasTilesetContent = !1, this.traverser = new Ss({}), this._cacheNode = null, this._frameNumber = null, this._expireDate = null, this._expiredContent = null, this._boundingBox = void 0, this._distanceToCamera = 0, this._screenSpaceError = 0, this._visibilityPlaneMask = void 0, this._visible = void 0, this._contentBoundingVolume = void 0, this._viewerRequestVolume = void 0, this._initialTransform = new Q(), this._priority = 0, this._selectedFrame = 0, this._requestedFrame = 0, this._selectionDepth = 0, this._touchedFrame = 0, this._centerZDepth = 0, this._shouldRefine = !1, this._stackLength = 0, this._visitedFrame = 0, this._inRequestVolume = !1, this._lodJudge = null, this.header = n, this.tileset = t, this.id = r || n.id, this.url = n.url, this.parent = s, this.refine = this._getRefine(n.refine), this.type = n.type, this.contentUrl = n.contentUrl, this._initializeLodMetric(n), this._initializeTransforms(n), this._initializeBoundingVolumes(n), this._initializeContent(n), this._initializeRenderingState(n), Object.seal(this);
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
    return this.contentState === at.READY || this.hasEmptyContent;
  }
  get contentAvailable() {
    return !!(this.contentReady && this.hasRenderContent || this._expiredContent && !this.contentFailed);
  }
  get hasUnloadedContent() {
    return this.hasRenderContent && this.contentUnloaded;
  }
  get contentUnloaded() {
    return this.contentState === at.UNLOADED;
  }
  get contentExpired() {
    return this.contentState === at.EXPIRED;
  }
  get contentFailed() {
    return this.contentState === at.FAILED;
  }
  get distanceToCamera() {
    return this._distanceToCamera;
  }
  get screenSpaceError() {
    return this._screenSpaceError;
  }
  get boundingBox() {
    return this._boundingBox || (this._boundingBox = ib(this.header.boundingVolume, this.boundingVolume)), this._boundingBox;
  }
  getScreenSpaceError(t, n) {
    switch (this.tileset.type) {
      case Rt.I3S:
        return Gu(this, t);
      case Rt.TILES3D:
        return fb(this, t, n);
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
    } = t.options, s = this.refine === ue.ADD || n;
    if (s && !this.isVisible && this._visible !== void 0 || this.tileset._frameNumber - this._touchedFrame >= 1 || this.contentState === at.UNLOADED)
      return -1;
    const r = this.parent, o = r && (!s || this._screenSpaceError === 0 || r.hasTilesetContent) ? r._screenSpaceError : this._screenSpaceError, c = t.root ? t.root._screenSpaceError : 0;
    return Math.max(c - o, 0);
  }
  async loadContent() {
    if (this.hasEmptyContent)
      return !1;
    if (this.content)
      return !0;
    this.contentExpired && (this._expireDate = null), this.contentState = at.LOADING;
    const n = await this.tileset._requestScheduler.scheduleRequest(this.id, this._getPriority.bind(this));
    if (!n)
      return this.contentState = at.UNLOADED, !1;
    try {
      const s = this.tileset.getTileUrl(this.contentUrl), r = this.tileset.loader, i = {
        ...this.tileset.loadOptions,
        [r.id]: {
          ...this.tileset.loadOptions[r.id],
          isTileset: this.type === "json",
          ...this._getLoaderSpecificOptions(r.id)
        }
      };
      return this.content = await vu(s, r, i), this.tileset.options.contentLoader && await this.tileset.options.contentLoader(this), this._isTileset() && this.tileset._initializeTileHeaders(this.content, this), this.contentState = at.READY, this._onContentLoaded(), !0;
    } catch (s) {
      throw this.contentState = at.FAILED, s;
    } finally {
      n.done();
    }
  }
  unloadContent() {
    return this.content && this.content.destroy && this.content.destroy(), this.content = null, this.header.content && this.header.content.destroy && this.header.content.destroy(), this.header.content = null, this.contentState = at.UNLOADED, !0;
  }
  updateVisibility(t, n) {
    if (this._frameNumber === t.frameNumber)
      return;
    const s = this.parent, r = s ? s._visibilityPlaneMask : bt.MASK_INDETERMINATE;
    if (this.tileset._traverser.options.updateTransforms) {
      const i = s ? s.computedTransform : this.tileset.modelMatrix;
      this._updateTransform(i);
    }
    this._distanceToCamera = this.distanceToTile(t), this._screenSpaceError = this.getScreenSpaceError(t, !1), this._visibilityPlaneMask = this.visibility(t, r), this._visible = this._visibilityPlaneMask !== bt.MASK_OUTSIDE, this._inRequestVolume = this.insideViewerRequestVolume(t), this._frameNumber = t.frameNumber, this.viewportIds = n;
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
    return Zc.subVectors(s.center, n.position), n.direction.dot(Zc);
  }
  insideViewerRequestVolume(t) {
    const n = this._viewerRequestVolume;
    return !n || n.distanceSquaredTo(t.camera.position) <= 0;
  }
  updateExpiration() {
    if (pb(this._expireDate) && this.contentReady && !this.hasEmptyContent) {
      const t = Date.now();
      Date.lessThan(this._expireDate, t) && (this.contentState = at.EXPIRED, this._expiredContent = this.content);
    }
  }
  get extras() {
    return this.header.extras;
  }
  _initializeLodMetric(t) {
    "lodMetricType" in t ? this.lodMetricType = t.lodMetricType : (this.lodMetricType = this.parent && this.parent.lodMetricType || this.tileset.lodMetricType, console.warn("3D Tile: Required prop lodMetricType is undefined. Using parent lodMetricType")), "lodMetricValue" in t ? this.lodMetricValue = t.lodMetricValue : (this.lodMetricValue = this.parent && this.parent.lodMetricValue || this.tileset.lodMetricValue, console.warn("3D Tile: Required prop lodMetricValue is undefined. Using parent lodMetricValue"));
  }
  _initializeTransforms(t) {
    this.transform = t.transform ? new Q(t.transform) : new Q();
    const n = this.parent, s = this.tileset, r = n && n.computedTransform ? n.computedTransform.clone() : s.modelMatrix.clone();
    this.computedTransform = new Q(r).multiplyRight(this.transform);
    const i = n && n._initialTransform ? n._initialTransform.clone() : new Q();
    this._initialTransform = new Q(i).multiplyRight(this.transform);
  }
  _initializeBoundingVolumes(t) {
    this._contentBoundingVolume = null, this._viewerRequestVolume = null, this._updateBoundingVolume(t);
  }
  _initializeContent(t) {
    this.content = {
      _tileset: this.tileset,
      _tile: this
    }, this.hasEmptyContent = !0, this.contentState = at.UNLOADED, this.hasTilesetContent = !1, t.contentUrl && (this.content = null, this.hasEmptyContent = !1);
  }
  _initializeRenderingState(t) {
    this.depth = t.level || (this.parent ? this.parent.depth + 1 : 0), this._shouldRefine = !1, this._distanceToCamera = 0, this._centerZDepth = 0, this._screenSpaceError = 0, this._visibilityPlaneMask = bt.MASK_INDETERMINATE, this._visible = void 0, this._inRequestVolume = !1, this._stackLength = 0, this._selectionDepth = 0, this._frameNumber = 0, this._touchedFrame = 0, this._visitedFrame = 0, this._selectedFrame = 0, this._requestedFrame = 0, this._priority = 0;
  }
  _getRefine(t) {
    return t || this.parent && this.parent.refine || ue.REPLACE;
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
    this.boundingVolume = mr(t.boundingVolume, this.computedTransform, this.boundingVolume);
    const n = t.content;
    n && (n.boundingVolume && (this._contentBoundingVolume = mr(n.boundingVolume, this.computedTransform, this._contentBoundingVolume)), t.viewerRequestVolume && (this._viewerRequestVolume = mr(t.viewerRequestVolume, this.computedTransform, this._viewerRequestVolume)));
  }
  _updateTransform() {
    const n = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new Q()).clone().multiplyRight(this.transform);
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
        return gb(this.tileset.tileset);
    }
  }
}
class yb extends Ss {
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
    const r = t.refine === ue.REPLACE, i = t._optimChildrenWithinParent === nb.USE_OPTIMIZATION;
    if (r && i && s && !this.anyChildrenVisible(t, n)) {
      t._visible = !1;
      return;
    }
  }
  meetsScreenSpaceErrorEarly(t, n) {
    const {
      parent: s
    } = t;
    return !s || s.hasTilesetContent || s.refine !== ue.ADD ? !1 : !this.shouldRefine(t, n, !0);
  }
}
class Bb {
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
const pr = {
  REQUESTED: "REQUESTED",
  COMPLETED: "COMPLETED",
  ERROR: "ERROR"
};
class Tb {
  constructor() {
    this._statusMap = void 0, this.pendingTilesRegister = new Bb(), this._statusMap = {};
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
        status: pr.REQUESTED
      }, this.pendingTilesRegister.register(o, i), t().then((c) => {
        this._statusMap[n].status = pr.COMPLETED;
        const {
          frameNumber: a,
          viewport: {
            id: h
          }
        } = this._statusMap[n].frameState;
        this.pendingTilesRegister.deregister(h, a), this._statusMap[n].callback(c, r);
      }).catch((c) => {
        this._statusMap[n].status = pr.ERROR;
        const {
          frameNumber: a,
          viewport: {
            id: h
          }
        } = this._statusMap[n].frameState;
        this.pendingTilesRegister.deregister(h, a), s(c);
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
class Eb extends Ss {
  constructor(t) {
    super(t), this._tileManager = void 0, this._tileManager = new Tb();
  }
  traversalFinished(t) {
    return !this._tileManager.hasPendingTiles(t.viewport.id, this._frameNumber || 0);
  }
  shouldRefine(t, n) {
    return t._lodJudge = mb(t, n), t._lodJudge === "DIG";
  }
  updateChildTiles(t, n) {
    const s = t.header.children || [], r = t.children, i = t.tileset;
    for (const o of s) {
      const c = `${o.id}-${n.viewport.id}`, a = r && r.find((h) => h.id === c);
      if (a)
        a && this.updateTile(a, n);
      else {
        let h = () => this._loadTile(o.id, i);
        this._tileManager.find(c) ? this._tileManager.update(c, n) : (i.tileset.nodePages && (h = () => i.tileset.nodePagesTile.formTileFromNodePages(o.id)), this._tileManager.add(h, c, (l) => this._onTileLoad(l, t, c), n));
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
    return await vu(r, s, i);
  }
  _onTileLoad(t, n, s) {
    const r = new jr(n.tileset, t, n, s);
    n.children.push(r);
    const i = this._tileManager.find(r.id).frameState;
    this.updateTile(r, i), this._frameNumber === i.frameNumber && (this.traversalFinished(i) || (/* @__PURE__ */ new Date()).getTime() - this.lastUpdate > this.updateDebounceTime) && this.executeTraversal(r, i);
  }
}
const Cb = {
  description: "",
  ellipsoid: W.WGS84,
  modelMatrix: new Q(),
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
}, zn = "Tiles In Tileset(s)", yr = "Tiles In Memory", ta = "Tiles In View", ea = "Tiles To Render", na = "Tiles Loaded", Br = "Tiles Loading", sa = "Tiles Unloaded", ra = "Failed Tile Loads", ia = "Points/Vertices", Tr = "Tile Memory Use", oa = "Maximum Screen Space Error";
class bb {
  constructor(t, n) {
    this.options = void 0, this.loadOptions = void 0, this.type = void 0, this.tileset = void 0, this.loader = void 0, this.url = void 0, this.basePath = void 0, this.modelMatrix = void 0, this.ellipsoid = void 0, this.lodMetricType = void 0, this.lodMetricValue = void 0, this.refine = void 0, this.root = null, this.roots = {}, this.asset = {}, this.description = "", this.properties = void 0, this.extras = null, this.attributions = {}, this.credits = {}, this.stats = void 0, this.contentFormats = {
      draco: !1,
      meshopt: !1,
      dds: !1,
      ktx2: !1
    }, this.cartographicCenter = null, this.cartesianCenter = null, this.zoom = 1, this.boundingVolume = null, this.dynamicScreenSpaceErrorComputedDensity = 0, this.maximumMemoryUsage = 32, this.gpuMemoryUsageInBytes = 0, this.memoryAdjustedScreenSpaceError = 0, this._cacheBytes = 0, this._cacheOverflowBytes = 0, this._frameNumber = 0, this._queryParams = {}, this._extensionsUsed = [], this._tiles = {}, this._pendingCount = 0, this.selectedTiles = [], this.traverseCounter = 0, this.geometricError = 0, this.lastUpdatedVieports = null, this._requestedTiles = [], this._emptyTiles = [], this.frameStateData = {}, this._traverser = void 0, this._cache = new OE(), this._requestScheduler = void 0, this.updatePromise = null, this.tilesetInitializationPromise = void 0, this.options = {
      ...Cb,
      ...n
    }, this.tileset = t, this.loader = t.loader, this.type = t.type, this.url = t.url, this.basePath = t.basePath || gu(this.url), this.modelMatrix = this.options.modelMatrix, this.ellipsoid = this.options.ellipsoid, this.lodMetricType = t.lodMetricType, this.lodMetricValue = t.lodMetricValue, this.refine = t.root.refine, this.loadOptions = this.options.loadOptions || {}, this._traverser = this._initializeTraverser(), this._requestScheduler = new wE({
      throttleRequests: this.options.throttleRequests,
      maxRequests: this.options.maxRequests
    }), this.memoryAdjustedScreenSpaceError = this.options.maximumScreenSpaceError, this._cacheBytes = this.options.maximumMemoryUsage * 1024 * 1024, this._cacheOverflowBytes = this.options.memoryCacheOverflow * 1024 * 1024, this.stats = new XT({
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
      const o = NE(r, this._frameNumber);
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
    const s = this.frameStateData[n], r = Object.values(this._traverser.selectedTiles), [i, o] = PE(r, t, this.options.maximumTilesSelected);
    s.selectedTiles = i;
    for (const c of o)
      c.unselect();
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
    this.stats.get(ta).count = this.selectedTiles.length, this.stats.get(ea).count = t, this.stats.get(ia).count = n, this.stats.get(oa).count = this.memoryAdjustedScreenSpaceError;
  }
  async _initializeTileSet(t) {
    this.type === Rt.I3S && (this.calculateViewPropsI3S(), t.root = await t.root), this.root = this._initializeTileHeaders(t, null), this.type === Rt.TILES3D && (this._initializeTiles3DTileset(t), this.calculateViewPropsTiles3D()), this.type === Rt.I3S && this._initializeI3STileset();
  }
  calculateViewPropsI3S() {
    var t;
    const n = this.tileset.fullExtent;
    if (n) {
      const {
        xmin: r,
        xmax: i,
        ymin: o,
        ymax: c,
        zmin: a,
        zmax: h
      } = n;
      this.cartographicCenter = new B(r + (i - r) / 2, o + (c - o) / 2, a + (h - a) / 2), this.cartesianCenter = new B(), W.WGS84.cartographicToCartesian(this.cartographicCenter, this.cartesianCenter), this.zoom = Au(n, this.cartographicCenter, this.cartesianCenter);
      return;
    }
    const s = (t = this.tileset.store) === null || t === void 0 ? void 0 : t.extent;
    if (s) {
      const [r, i, o, c] = s;
      this.cartographicCenter = new B(r + (o - r) / 2, i + (c - i) / 2, 0), this.cartesianCenter = new B(), W.WGS84.cartographicToCartesian(this.cartographicCenter, this.cartesianCenter), this.zoom = VE(s, this.cartographicCenter, this.cartesianCenter);
      return;
    }
    console.warn("Extent is not defined in the tileset header"), this.cartographicCenter = new B(), this.zoom = 1;
  }
  calculateViewPropsTiles3D() {
    const t = this.root, {
      center: n
    } = t.boundingVolume;
    if (!n) {
      console.warn("center was not pre-calculated for the root tile"), this.cartographicCenter = new B(), this.zoom = 1;
      return;
    }
    n[0] !== 0 || n[1] !== 0 || n[2] !== 0 ? (this.cartographicCenter = new B(), W.WGS84.cartesianToCartographic(n, this.cartographicCenter)) : this.cartographicCenter = new B(0, 0, -W.WGS84.radii[0]), this.cartesianCenter = n, this.zoom = $E(t.boundingVolume, this.cartographicCenter);
  }
  _initializeStats() {
    this.stats.get(zn), this.stats.get(Br), this.stats.get(yr), this.stats.get(ta), this.stats.get(ea), this.stats.get(na), this.stats.get(sa), this.stats.get(ra), this.stats.get(ia), this.stats.get(Tr, "memory"), this.stats.get(oa);
  }
  _initializeTileHeaders(t, n) {
    const s = new jr(this, t.root, n);
    if (n && (n.children.push(s), s.depth = n.depth + 1), this.type === Rt.TILES3D) {
      const i = [];
      for (i.push(s); i.length > 0; ) {
        const o = i.pop();
        this.stats.get(zn).incrementCount();
        const c = o.header.children || [];
        for (const a of c) {
          var r;
          const h = new jr(this, a, o);
          if ((r = h.contentUrl) !== null && r !== void 0 && r.includes("?session=")) {
            const l = new URL(h.contentUrl).searchParams.get("session");
            l && (this._queryParams.session = l);
          }
          o.children.push(h), h.depth = o.depth + 1, i.push(h);
        }
      }
    }
    return s;
  }
  _initializeTraverser() {
    let t;
    switch (this.type) {
      case Rt.TILES3D:
        t = yb;
        break;
      case Rt.I3S:
        t = Eb;
        break;
      default:
        t = Ss;
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
    this.stats.get(ra).incrementCount();
    const s = n.message || n.toString(), r = t.url;
    console.error(`A 3D tile failed to load: ${t.url} ${s}`), this.options.onTileError(t, s, r);
  }
  _onTileLoad(t, n) {
    if (n) {
      if (this.type === Rt.I3S) {
        var s, r;
        const i = ((s = this.tileset) === null || s === void 0 || (r = s.nodePagesTile) === null || r === void 0 ? void 0 : r.nodesInNodePages) || 0;
        this.stats.get(zn).reset(), this.stats.get(zn).addCount(i);
      }
      t && t.content && vE(t, t.content), this.updateContentTypes(t), this._addTileToCache(t), this.options.onTileLoad(t);
    }
  }
  updateContentTypes(t) {
    if (this.type === Rt.I3S)
      switch (t.header.isDracoGeometry && (this.contentFormats.draco = !0), t.header.textureFormat) {
        case "dds":
          this.contentFormats.dds = !0;
          break;
        case "ktx2":
          this.contentFormats.ktx2 = !0;
          break;
      }
    else if (this.type === Rt.TILES3D) {
      var n;
      const {
        extensionsRemoved: s = []
      } = ((n = t.content) === null || n === void 0 ? void 0 : n.gltf) || {};
      s.includes("KHR_draco_mesh_compression") && (this.contentFormats.draco = !0), s.includes("EXT_meshopt_compression") && (this.contentFormats.meshopt = !0), s.includes("KHR_texture_basisu") && (this.contentFormats.ktx2 = !0);
    }
  }
  _onStartTileLoading() {
    this._pendingCount++, this.stats.get(Br).incrementCount();
  }
  _onEndTileLoading() {
    this._pendingCount--, this.stats.get(Br).decrementCount();
  }
  _addTileToCache(t) {
    this._cache.add(this, t, (n) => n._updateCacheStats(t));
  }
  _updateCacheStats(t) {
    this.stats.get(na).incrementCount(), this.stats.get(yr).incrementCount(), this.gpuMemoryUsageInBytes += t.gpuMemoryUsageInBytes || 0, this.stats.get(Tr).count = this.gpuMemoryUsageInBytes, this.options.memoryAdjustedScreenSpaceError && this.adjustScreenSpaceError();
  }
  _unloadTile(t) {
    this.gpuMemoryUsageInBytes -= t.gpuMemoryUsageInBytes || 0, this.stats.get(yr).decrementCount(), this.stats.get(sa).incrementCount(), this.stats.get(Tr).count = this.gpuMemoryUsageInBytes, this.options.onTileUnload(t), t.unloadContent();
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
function wb(e) {
  let t = 0;
  for (const s in e.attributes) {
    const r = e.getAttribute(s);
    t += r.count * r.itemSize * r.array.BYTES_PER_ELEMENT;
  }
  const n = e.getIndex();
  return t += n ? n.count * n.itemSize * n.array.BYTES_PER_ELEMENT : 0, t;
}
function Nu(e) {
  const n = document.createElement("canvas");
  n.width = 64, n.height = 64;
  const s = n.getContext("2d");
  s.rect(0, 0, 64, 64);
  const r = s.createLinearGradient(0, 0, 64, 64);
  for (let o = 0; o < e.length; o++) {
    const c = e[o];
    r.addColorStop(c[0], "#" + c[1].getHexString());
  }
  s.fillStyle = r, s.fill();
  const i = new Vu(n);
  return i.needsUpdate = !0, i.minFilter = Ju, i.wrapS = Di, i.wrapT = Di, i.repeat.set(2, 2), i;
}
function ca(e) {
  e.updateMatrix(), e.updateMatrixWorld(), e.matrixWorldInverse.copy(e.matrixWorld).invert();
  const t = new Wu();
  return t.setFromProjectionMatrix(new Y().multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse)), t;
}
function _b(e) {
  const t = new jn(), n = new zu(10, 5), s = new it(...e.projectPointOntoPlane([0, 0, 0])), r = new it(e.normal.x, e.normal.y, e.normal.z), i = new it().copy(s).add(r);
  n.lookAt(i), n.translate(s.x, s.y, s.z);
  const o = new ua({ color: 65535, side: ju }), c = new la(n, o), a = new Ku(r, s, 5, 16776960);
  return t.add(a), t.add(c), t;
}
function aa(e) {
  const { boundingVolume: t } = e;
  let n = 0;
  e.content && (n = Math.min(e.content.byteLength / 5e5, 1));
  const s = new M(n, 1, 0), r = new qu(1, 1, 1), i = new Y();
  t.halfAxes ? i.copy(Pu(t.halfAxes)) : t.radius && r.scale(t.radius * 2, t.radius * 2, t.radius * 2), r.applyMatrix4(i);
  const o = new Xu(r), c = new Qu(o, new Yu({ color: s }));
  return c.position.copy(new it(...t.center)), c;
}
function Pu(e) {
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
function Mb(e, t) {
  const r = 2 * Math.PI * 6378137 / 2, i = t * r / 180;
  let o = Math.log(Math.tan((90 + e) * Math.PI / 360)) / (Math.PI / 180);
  return o = o * r / 180, new Cr(i, o);
}
function Rb(e) {
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
function Uu(e) {
  return wb(e);
}
const Hu = {
  // From chroma spectral http://gka.github.io/chroma.js/
  SPECTRAL: [
    [0, new M(0.3686, 0.3098, 0.6353)],
    [0.1, new M(0.1961, 0.5333, 0.7412)],
    [0.2, new M(0.4, 0.7608, 0.6471)],
    [0.3, new M(0.6706, 0.8667, 0.6431)],
    [0.4, new M(0.902, 0.9608, 0.5961)],
    [0.5, new M(1, 1, 0.749)],
    [0.6, new M(0.9961, 0.8784, 0.5451)],
    [0.7, new M(0.9922, 0.6824, 0.3804)],
    [0.8, new M(0.9569, 0.4275, 0.2627)],
    [0.9, new M(0.8353, 0.2431, 0.3098)],
    [1, new M(0.6196, 39e-4, 0.2588)]
  ],
  PLASMA: [
    [0, new M(0.241, 0.015, 0.61)],
    [0.1, new M(0.387, 1e-3, 0.654)],
    [0.2, new M(0.524, 0.025, 0.653)],
    [0.3, new M(0.651, 0.125, 0.596)],
    [0.4, new M(0.752, 0.227, 0.513)],
    [0.5, new M(0.837, 0.329, 0.431)],
    [0.6, new M(0.907, 0.435, 0.353)],
    [0.7, new M(0.963, 0.554, 0.272)],
    [0.8, new M(0.992, 0.681, 0.195)],
    [0.9, new M(0.987, 0.822, 0.144)],
    [1, new M(0.94, 0.975, 0.131)]
  ],
  YELLOW_GREEN: [
    [0, new M(0.1647, 0.2824, 0.3451)],
    [0.1, new M(0.1338, 0.3555, 0.4227)],
    [0.2, new M(0.061, 0.4319, 0.4864)],
    [0.3, new M(0, 0.5099, 0.5319)],
    [0.4, new M(0, 0.5881, 0.5569)],
    [0.5, new M(0.137, 0.665, 0.5614)],
    [0.6, new M(0.2906, 0.7395, 0.5477)],
    [0.7, new M(0.4453, 0.8099, 0.5201)],
    [0.8, new M(0.6102, 0.8748, 0.485)],
    [0.9, new M(0.7883, 0.9323, 0.4514)],
    [1, new M(0.9804, 0.9804, 0.4314)]
  ],
  VIRIDIS: [
    [0, new M(0.267, 5e-3, 0.329)],
    [0.1, new M(0.283, 0.141, 0.458)],
    [0.2, new M(0.254, 0.265, 0.53)],
    [0.3, new M(0.207, 0.372, 0.553)],
    [0.4, new M(0.164, 0.471, 0.558)],
    [0.5, new M(0.128, 0.567, 0.551)],
    [0.6, new M(0.135, 0.659, 0.518)],
    [0.7, new M(0.267, 0.749, 0.441)],
    [0.8, new M(0.478, 0.821, 0.318)],
    [0.9, new M(0.741, 0.873, 0.15)],
    [1, new M(0.993, 0.906, 0.144)]
  ],
  INFERNO: [
    [0, new M(0.077, 0.042, 0.206)],
    [0.1, new M(0.225, 0.036, 0.388)],
    [0.2, new M(0.373, 0.074, 0.432)],
    [0.3, new M(0.522, 0.128, 0.42)],
    [0.4, new M(0.665, 0.182, 0.37)],
    [0.5, new M(0.797, 0.255, 0.287)],
    [0.6, new M(0.902, 0.364, 0.184)],
    [0.7, new M(0.969, 0.516, 0.063)],
    [0.8, new M(0.988, 0.683, 0.072)],
    [0.9, new M(0.961, 0.859, 0.298)],
    [1, new M(0.988, 0.998, 0.645)]
  ],
  GRAYSCALE: [
    [0, new M(0, 0, 0)],
    [1, new M(1, 1, 1)]
  ],
  // 16 samples of the TURBU color scheme
  // values taken from: https://gist.github.com/mikhailov-work/ee72ba4191942acecc03fe6da94fc73f
  // original file licensed under Apache-2.0
  TURBO: [
    [0, new M(0.18995, 0.07176, 0.23217)],
    [0.07, new M(0.25107, 0.25237, 0.63374)],
    [0.13, new M(0.27628, 0.42118, 0.89123)],
    [0.2, new M(0.25862, 0.57958, 0.99876)],
    [0.27, new M(0.15844, 0.73551, 0.92305)],
    [0.33, new M(0.09267, 0.86554, 0.7623)],
    [0.4, new M(0.19659, 0.94901, 0.59466)],
    [0.47, new M(0.42778, 0.99419, 0.38575)],
    [0.53, new M(0.64362, 0.98999, 0.23356)],
    [0.6, new M(0.80473, 0.92452, 0.20459)],
    [0.67, new M(0.93301, 0.81236, 0.22667)],
    [0.73, new M(0.99314, 0.67408, 0.20348)],
    [0.8, new M(0.9836, 0.49291, 0.12849)],
    [0.87, new M(0.92105, 0.31489, 0.05475)],
    [0.93, new M(0.81608, 0.18462, 0.01809)],
    [1, new M(0.66449, 0.08436, 424e-5)]
  ],
  RAINBOW: [
    [0, new M(0.278, 0, 0.714)],
    [1 / 6, new M(0, 0, 1)],
    [2 / 6, new M(0, 1, 1)],
    [3 / 6, new M(0, 1, 0)],
    [4 / 6, new M(1, 1, 0)],
    [5 / 6, new M(1, 0.64, 0)],
    [1, new M(1, 0, 0)]
  ],
  CONTOUR: [
    [0, new M(0, 0, 0)],
    [0.03, new M(0, 0, 0)],
    [0.04, new M(1, 1, 1)],
    [1, new M(1, 1, 1)]
  ]
}, Sb = `
  varying vec3 vColor;
  uniform float alpha;

  void main() {
    if (vColor == vec3(0.0, 0.0, 0.0)) {
      discard;
    } else {
      gl_FragColor = vec4( vColor, alpha);
    }
  }
`, Ib = `
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
var ku = /* @__PURE__ */ ((e) => (e[e.Intensity = 1] = "Intensity", e[e.Classification = 2] = "Classification", e[e.Elevation = 3] = "Elevation", e[e.RGB = 4] = "RGB", e[e.White = 5] = "White", e))(ku || {}), As = /* @__PURE__ */ ((e) => (e[e.FlatTexture = 1] = "FlatTexture", e[e.ShadedTexture = 2] = "ShadedTexture", e[e.ShadedNoTexture = 3] = "ShadedNoTexture", e))(As || {}), Gt = /* @__PURE__ */ ((e) => (e[e.Reset = 1] = "Reset", e[e.Mercator = 2] = "Mercator", e[e.WGS84Cartesian = 3] = "WGS84Cartesian", e))(Gt || {});
const Ob = Hu.RAINBOW, vb = typeof document < "u" ? Nu(Ob) : null, xb = Hu.GRAYSCALE, Fb = typeof document < "u" ? Nu(xb) : null, Lb = {
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
  updateTransforms: !0,
  shading: As.FlatTexture,
  transparent: !1,
  pointCloudColoring: ku.White,
  pointSize: 1,
  worker: !0,
  wireframe: !1,
  debug: !1,
  basisTranscoderPath: null,
  dracoDecoderPath: null,
  material: null,
  computeNormals: !1,
  shaderCallback: null,
  geoTransform: Gt.Reset,
  preloadTilesCount: null
};
class rw {
  /**
  * Loads a tileset of 3D Tiles according to the given {@link LoaderProps}
  * @public
  *
  * @param props - Properties for this load call {@link LoaderProps}.
  * @returns An object containing the 3D Model to be added to the scene
  * and a runtime engine to be updated every frame.
  */
  static async load(t) {
    const n = { ...Lb, ...t.options }, { url: s } = t, r = n.updateInterval, i = 5, o = {};
    if (n.cesiumIONToken) {
      o["cesium-ion"] = {
        accessToken: n.cesiumIONToken
      };
      const R = await Xh.preload(s, o);
      o.fetch = { headers: R.headers };
    }
    n.googleApiKey && (o.fetch = { headers: { "X-GOOG-API-KEY": n.googleApiKey } }), t.loadingManager && t.loadingManager.itemStart(s);
    const c = await Yr(s, qe, {
      ...o
    }), a = {}, h = {}, u = [], l = new jn(), f = new jn();
    n.debug || (f.visible = !1);
    const d = {
      pointSize: { type: "f", value: n.pointSize },
      gradient: { type: "t", value: vb },
      grayscale: { type: "t", value: Fb },
      rootCenter: { type: "vec3", value: new it() },
      rootNormal: { type: "vec3", value: new it() },
      coloring: { type: "i", value: n.pointCloudColoring },
      hideGround: { type: "b", value: !0 },
      elevationRange: { type: "vec2", value: new Cr(0, 400) },
      maxIntensity: { type: "f", value: 1 },
      intensityContrast: { type: "f", value: 1 },
      alpha: { type: "f", value: 1 }
    }, m = new Zu({
      uniforms: d,
      vertexShader: Ib,
      fragmentShader: Sb,
      transparent: n.transparent,
      vertexColors: !0
    });
    let g = null, A = null;
    const p = new sl();
    let C, T;
    n.basisTranscoderPath && (C = new il(), C.detectSupport(t.renderer), C.setTranscoderPath(n.basisTranscoderPath + "/"), C.setWorkerLimit(1), p.setKTX2Loader(C)), n.dracoDecoderPath && (T = new rl(), T.setDecoderPath(n.dracoDecoderPath + "/"), T.setWorkerLimit(n.maxConcurrency), p.setDRACOLoader(T));
    const E = new ua({ transparent: n.transparent }), b = {
      maximumMemoryUsage: n.maximumMemoryUsage,
      maximumScreenSpaceError: n.maximumScreenSpaceError,
      memoryAdjustedScreenSpaceError: n.memoryAdjustedScreenSpaceError,
      memoryCacheOverflow: n.memoryCacheOverflow,
      viewDistanceScale: n.viewDistanceScale,
      skipLevelOfDetail: n.skipLevelOfDetail,
      updateTransforms: n.updateTransforms,
      throttleRequests: n.throttleRequests,
      maxRequests: n.maxRequests,
      contentLoader: async (R) => {
        let P = null;
        switch (R.type) {
          case dr.POINTCLOUD: {
            P = Gb(R, m, n, Lt);
            break;
          }
          case dr.SCENEGRAPH:
          case dr.MESH: {
            P = await Db(p, R, E, n, Lt);
            break;
          }
        }
        if (P && (P.visible = !1, a[R.id] = P, l.add(a[R.id]), n.debug)) {
          const j = aa(R);
          f.add(j), h[R.id] = j;
        }
      },
      onTileLoad: async (R) => {
        y && (n.geoTransform == Gt.Reset && !v && (R == null ? void 0 : R.depth) <= i && Vt(R), y._frameNumber++, qt(y, a, A, g));
      },
      onTileUnload: (R) => {
        u.push(R);
      },
      onTileError: (R, P) => {
        console.error("Tile error", R.id, P);
      }
    }, y = new bb(c, {
      ...b,
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
    }), F = new Y(), x = new Y(), I = new it();
    let v = !1;
    if (y.root.boundingVolume ? (y.root.header.boundingVolume.region && (console.warn("Cannot apply a model matrix to bounding volumes of type region. Tileset stays in original geo-coordinates."), n.geoTransform = Gt.WGS84Cartesian), x.setPosition(
      y.root.boundingVolume.center[0],
      y.root.boundingVolume.center[1],
      y.root.boundingVolume.center[2]
    )) : console.warn("Bounding volume not found, no transformations applied"), n.debug) {
      const R = aa(y.root);
      f.add(R), h[y.root.id] = R;
    }
    let D = !1, N = !1;
    d.rootCenter.value.copy(I), d.rootNormal.value.copy(new it(0, 0, 1).normalize()), y.stats.get("Loader concurrency").count = n.maxConcurrency, y.stats.get("Maximum mem usage").count = n.maximumMemoryUsage;
    let G = 0, S = null, z = null;
    const se = new it(1 / 0, 1 / 0, 1 / 0);
    let $t = null;
    l.updateMatrixWorld(!0);
    const ft = new Y().copy(l.matrixWorld), Lt = new Y().copy(ft).invert();
    if ((n.geoTransform == Gt.Reset || n.geoTransform == Gt.Mercator) && (Vt(y.root), re()), n.debug && (h[y.root.id].applyMatrix4(F), f.matrixWorld.copy(l.matrixWorld)), n.geoTransform == Gt.Mercator) {
      const R = Mb(
        y.cartographicCenter[1],
        y.cartographicCenter[0]
      );
      I.set(
        R.x,
        0,
        -R.y
      ), l.position.copy(I), l.updateMatrixWorld(!0);
    } else
      n.geoTransform == Gt.WGS84Cartesian && (l.applyMatrix4(x), l.updateMatrixWorld(!0), I.copy(l.position));
    function Vt(R) {
      if (!R.boundingVolume.halfAxes)
        return;
      const P = R.boundingVolume.halfAxes, j = new Y().extractRotation(Pu(P)).premultiply(new Y().extractRotation(Lt));
      if (!new Os().setFromRotationMatrix(j).equals(new Os())) {
        v = !0;
        const wt = new it(
          x.elements[12],
          x.elements[13],
          x.elements[14]
        );
        x.extractRotation(j), x.setPosition(wt), re();
      }
    }
    function re() {
      F.copy(x).invert(), F.premultiply(ft), F.copy(ft).multiply(new Y().copy(x).invert()), y.modelMatrix = new Tt(F.toArray());
    }
    function qt(R, P, j, et) {
      if (D)
        return;
      (!$t || et.aspect != z) && ($t = new os({
        fov: et.fov / 180 * Math.PI,
        aspectRatio: et.aspect,
        near: et.near,
        far: et.far
      }).sseDenominator, z = et.aspect, n.debug && console.log("Updated sse denonimator:", $t));
      const gn = ca(et).planes.map((q) => new Nt(q.normal.toArray(), q.constant)), $u = new cn(gn), xi = new Cr();
      j.getSize(xi);
      const Fi = {
        camera: {
          position: se.toArray()
        },
        height: xi.y,
        frameNumber: R._frameNumber,
        sseDenominator: $t,
        cullingVolume: $u,
        viewport: {
          id: 0
        }
      };
      R._cache.reset(), R._traverser.traverse(R.root, Fi, R.options);
      for (const q of R.tiles)
        q.selected ? P[q.id] ? P[q.id].visible = !0 : console.error("TILE SELECTED BUT NOT LOADED!!", q.id) : P[q.id] && (P[q.id].visible = !1);
      for (; u.length > 0; ) {
        const q = u.pop();
        P[q.id] && q.contentState == at.UNLOADED && (l.remove(P[q.id]), Er(P[q.id]), delete P[q.id]), h[q.id] && (Er(h[q.id]), f.remove(h[q.id]), delete h[q.id]);
      }
      const Is = R.stats.get("Tiles Loaded").count, Li = R.stats.get("Tiles Loading").count;
      return t.onProgress && t.onProgress(
        Is,
        Is + Li
      ), t.loadingManager && !N && Li == 0 && (n.preloadTilesCount == null || Is >= n.preloadTilesCount) && (N = !0, t.loadingManager.itemEnd(t.url)), Fi;
    }
    return {
      model: l,
      runtime: {
        getTileset: () => y,
        getStats: () => y.stats,
        showTiles: (R) => {
          f.visible = R;
        },
        setWireframe: (R) => {
          n.wireframe = R, l.traverse((P) => {
            P instanceof la && (P.material.wireframe = R);
          });
        },
        setDebug: (R) => {
          n.debug = R, f.visible = R;
        },
        setShading: (R) => {
          n.shading = R;
        },
        getTileBoxes: () => f,
        setViewDistanceScale: (R) => {
          y.options.viewDistanceScale = R, y._frameNumber++, qt(y, a, A, g);
        },
        setHideGround: (R) => {
          d.hideGround.value = R;
        },
        setPointCloudColoring: (R) => {
          d.coloring.value = R;
        },
        setElevationRange: (R) => {
          d.elevationRange.value.set(R[0], R[1]);
        },
        setMaxIntensity: (R) => {
          d.maxIntensity.value = R;
        },
        setIntensityContrast: (R) => {
          d.intensityContrast.value = R;
        },
        setPointAlpha: (R) => {
          d.alpha.value = R;
        },
        getLatLongHeightFromPosition: (R) => {
          const P = y.ellipsoid.cartesianToCartographic(
            new it().copy(R).applyMatrix4(new Y().copy(F).invert()).toArray()
          );
          return {
            lat: P[1],
            long: P[0],
            height: P[2]
          };
        },
        getPositionFromLatLongHeight: (R) => {
          const P = y.ellipsoid.cartographicToCartesian([
            _r(R.long),
            _r(R.lat),
            R.height
          ]);
          return new it(...P).applyMatrix4(F);
        },
        orientToGeocoord: (R) => {
          const P = [R.long, R.lat, R.height], j = y.ellipsoid.cartographicToCartesian(P), et = new Y().fromArray(y.ellipsoid.eastNorthUpToFixedFrame(j)), wt = new Y().makeRotationFromEuler(
            new Os(Math.PI / 2, Math.PI / 2, 0)
          ), gn = new Y().copy(et).multiply(wt).invert();
          y.modelMatrix = new Tt(gn.toArray()), l.applyMatrix4(gn), l.updateMatrixWorld(!0);
        },
        getCameraFrustum: (R) => {
          const j = ca(R).planes.map((wt) => new Nt(wt.normal.toArray(), wt.constant)).map((wt) => _b(wt)), et = new jn();
          for (const wt of j)
            et.add(wt);
          return et;
        },
        update: function(R, P, j) {
          if (g = j, A = P, G += R, y && G >= r) {
            if (!ft.equals(l.matrixWorld)) {
              G = 0, ft.copy(l.matrixWorld), (n.geoTransform == Gt.Reset || n.geoTransform == Gt.Mercator) && re();
              const et = new it().setFromMatrixPosition(ft);
              d.rootCenter.value.copy(et), d.rootNormal.value.copy(new it(0, 0, 1).applyMatrix4(ft).normalize()), Lt.copy(ft).invert(), n.debug && (h[y.root.id].matrixWorld.copy(F), h[y.root.id].applyMatrix4(ft));
            }
            S == null ? S = new Y().copy(j.matrixWorld) : (!j.matrixWorld.equals(S) || j.aspect != z) && (G = 0, y._frameNumber++, j.getWorldPosition(se), S.copy(j.matrixWorld), qt(y, a, P, j));
          }
        },
        dispose: function() {
          for (D = !0, y._destroy(); l.children.length > 0; ) {
            const R = l.children[0];
            Er(R), l.remove(R);
          }
          for (; f.children.length > 0; ) {
            const R = f.children[0];
            f.remove(R), R.geometry.dispose(), R.material.dispose();
          }
          C && C.dispose(), T && T.dispose();
        }
      }
    };
  }
}
async function Db(e, t, n, s, r) {
  return new Promise((i, o) => {
    const c = new Y().makeRotationAxis(new it(1, 0, 0), Math.PI / 2), a = t.content.gltfUpAxis !== "Z", h = new Y().fromArray(t.computedTransform).premultiply(r);
    a && h.multiply(c), t.content.byteLength || (t.content.byteLength = t.content.gltfArrayBuffer.byteLength), e.parse(
      t.content.gltfArrayBuffer,
      t.contentUrl ? t.contentUrl.substr(0, t.contentUrl.lastIndexOf("/") + 1) : "",
      (u) => {
        const l = u.scenes[0];
        l.applyMatrix4(h), t.content.texturesByteLength = 0, t.content.geometriesByteLength = 0, l.traverse((f) => {
          if (f.type == "Mesh") {
            const d = f;
            t.content.geometriesByteLength += Uu(d.geometry);
            const m = d.material, g = m.map, A = Rb(g);
            A && (t.content.texturesByteLength += A), s.material ? (d.material = s.material.clone(), m.dispose()) : s.shading == As.FlatTexture && (d.material = n.clone(), m.dispose()), s.shading != As.ShadedNoTexture ? d.material.type == "ShaderMaterial" ? d.material.uniforms.map = { value: g } : d.material.map = g : (g && g.dispose(), d.material.map = null), s.shaderCallback && (d.onBeforeRender = (p, C, T, E, b, y) => {
              s.shaderCallback(p, b);
            }), d.material.wireframe = s.wireframe, s.computeNormals && d.geometry.computeVertexNormals();
          }
        }), t.content.gpuMemoryUsageInBytes = t.content.texturesByteLength + t.content.geometriesByteLength, i(l);
      },
      (u) => {
        o(new Error(`error parsing gltf in tile ${t.id}: ${u}`));
      }
    );
  });
}
function Gb(e, t, n, s) {
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
  const o = new tl();
  o.setAttribute("position", new Gi(r.points, 3));
  const c = new Y().fromArray(e.computedTransform).premultiply(s);
  r.rgba ? o.setAttribute("color", new Gi(r.rgba, 4)) : r.rgb && o.setAttribute("color", new Ni(r.rgb, 3, !0)), r.intensities && o.setAttribute(
    "intensity",
    // Handles both 16bit or 8bit intensity values
    new el(r.intensities, 1, !0)
  ), r.classifications && o.setAttribute("classification", new Ni(r.classifications, 1, !1)), e.content.geometriesByteLength = Uu(o), e.content.gpuMemoryUsageInBytes = e.content.geometriesByteLength;
  const a = new nl(o, n.material || t);
  if (r.rtc_center) {
    const h = r.rtc_center;
    c.multiply(new Y().makeTranslation(h[0], h[1], h[2]));
  }
  return a.applyMatrix4(c), a;
}
function ha(e) {
  var t, n, s, r;
  (t = e == null ? void 0 : e.uniforms) != null && t.map ? (s = (n = e == null ? void 0 : e.uniforms) == null ? void 0 : n.map.value) == null || s.dispose() : e.map && ((r = e.map) == null || r.dispose()), e.dispose();
}
function Er(e) {
  e.traverse((t) => {
    if (t.isMesh)
      if (t.geometry.dispose(), t.material.isMaterial)
        ha(t.material);
      else
        for (const n of t.material)
          ha(n);
  });
  for (let t = e.children.length - 1; t >= 0; t--) {
    const n = e.children[t];
    e.remove(n);
  }
}
export {
  Gt as GeoTransform,
  rw as Loader3DTiles,
  ku as PointCloudColoring,
  As as Shading
};
