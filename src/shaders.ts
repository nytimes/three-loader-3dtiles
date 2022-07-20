const PointCloudFS = `
  varying vec3 vColor;
  uniform float alpha;

  void main() {
    if (vColor == vec3(0.0, 0.0, 0.0)) {
      discard;
    } else {
      gl_FragColor = vec4( vColor, alpha);
    }
  }
`;
const PointCloudVS = `
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
export { PointCloudFS, PointCloudVS };
