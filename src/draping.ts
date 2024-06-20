/** A Three.JS implementation of:
 * Real-time Screen-space Geometry Draping for 3D Digital Terrain Models
 * Trapp and Döllner, 2019
 * https://ieeexplore.ieee.org/abstract/document/8811991
 */
import {
    Vector2,
    Scene,
    Object3D,
    ShaderMaterial,
    MeshBasicMaterial,
    WebGLRenderTarget,
    NearestFilter,
    WebGLRenderer,
    DoubleSide,
    FloatType,
    RGBAFormat,
    NormalBlending,
    Blending
} from 'three'

import type { Viewport } from './types';

let target: WebGLRenderTarget | null = null;
let targetRenderer: WebGLRenderer | null = null;
let targetScene: Scene | null = null;
let targetModel: Object3D | null = null;    

interface DrapingShaderOptions {
    /** Minimum terrain height when searching for a matching vertex to the GEOJson overlay. Default: `0` */
    minHeight: number,
    /** Maximum terrain height when searching for a matching vertex to the GEOJson overlay. Default: `300` */
    maxHeight: number,
    /** Number of samples to average around the render target cordinate when draping the GEOJson overlay. Default: `4` */
    samples: number,
    /** Number of pixels to step toward each sample when averaging the samples. Default: 4.0 */
    sampleStep: number,
    /** Opacity of the draped colors. Default: `0.5` */
    opacity: number,
    /** Blending algoritum of the draped colors. Default: `THREE.NormalBlending` */
    blendingType: Blending
}

const defaultShaderOptions: DrapingShaderOptions = {
    minHeight: 0,
    maxHeight: 300,
    samples: 4,
    sampleStep: 4.0,
    opacity: 0.5,
    blendingType: NormalBlending
}

function setup(
    viewport: Viewport,
    model: Object3D, 
    renderer: WebGLRenderer,
    shaderOptions: DrapingShaderOptions = defaultShaderOptions
) {
    if ( target ) {
        target.dispose();
    }

    if (!targetRenderer) {
        targetRenderer = renderer;
    }

    const options = { ...defaultShaderOptions, ...shaderOptions };

    target = new WebGLRenderTarget(viewport.width * viewport.devicePixelRatio, viewport.height * viewport.devicePixelRatio);
    target.texture.minFilter = NearestFilter;
    target.texture.magFilter = NearestFilter;
    target.stencilBuffer = false;
    target.texture.format = RGBAFormat;
    target.texture.type  = FloatType;

    targetRenderer.setPixelRatio(devicePixelRatio);
    targetRenderer.setSize(viewport.width, viewport.height);
    targetRenderer.setRenderTarget(target);

    targetScene = new Scene();
    targetScene.overrideMaterial = positionShaderMaterial;
    targetModel = model;

    drapingMaterial.uniforms.tPosition.value = target.texture;
    drapingMaterial.uniforms.minHeight.value = options.minHeight;
    drapingMaterial.uniforms.maxHeight.value = options.maxHeight;
    drapingMaterial.uniforms.samples.value = options.samples;
    drapingMaterial.uniforms.sampleStep.value = options.sampleStep;
    drapingMaterial.uniforms.opacity.value = options.opacity;
    drapingMaterial.blending = options.blendingType;
}
function resizeRenderTarget(viewport: Viewport) {
    target.setSize(viewport.width * viewport.devicePixelRatio, viewport.height * viewport.devicePixelRatio);
    targetRenderer.setPixelRatio(devicePixelRatio);
    targetRenderer.setSize(viewport.width, viewport.height);
}

function update(camera) {
    if (targetRenderer) {
        const oldParent = targetModel.parent;
        targetScene.add(targetModel);
        targetRenderer.setRenderTarget(target);
        targetRenderer.render(targetScene, camera);
        if (oldParent) {
            oldParent.add(targetModel);
        }
        targetRenderer.setRenderTarget(null);
    }
}

// For syntax highlighting
const glsl = (x:any) => x.toString();

const positionShaderMaterial = new ShaderMaterial({
    vertexShader: glsl`
        varying vec3 vPosition;
        void main() {
            vPosition =  (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: glsl`
        varying vec3 vPosition;
        void main() {
            gl_FragColor = vec4(vPosition, 1.0);
        }
    `,
    side: DoubleSide
});

const drapingVertexShader = glsl`
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
`;

const drapingFragmentShader = glsl`
    varying vec3 vColor;
    uniform float opacity;

    void main() {
        gl_FragColor = vec4(vColor, opacity);
    }
`;

const drapingMaterial = new ShaderMaterial( {
        vertexShader: drapingVertexShader,
        fragmentShader: drapingFragmentShader,
        uniforms: {
            tPosition: { value: null },
            minHeight: { value: 0.0 },
            maxHeight: { value: 300.0 },
            opacity: { value: 0.5 },
            samples: { value: 4 },
            sampleStep: { value: 4.0 }
        },
        vertexColors: true,
        transparent: true,
        depthTest: false,
        blending: NormalBlending
});

export { target, setup, resizeRenderTarget, update, drapingMaterial, DrapingShaderOptions }