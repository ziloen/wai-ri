


const s = {
  frag: /* glsl */`
    precision mediump float;
    #define GLSLIFY 1

    uniform vec2 u_resolution;
    uniform sampler2D u_texture;
    uniform int u_maskId;
    uniform int u_typeId;
    uniform sampler2D u_displacement;
    uniform sampler2D u_mask;
    uniform float u_tick;

    varying vec2 v_uv;

    const float PI2 = 6.283185307179586;

    const float PI = 3.141592653589793;
    const float PI2_0 = 6.28318530718;

    mat2 scale(vec2 value) {
      return mat2(value.x, 0.0, 0.0, value.y);
    }

    mat2 rotate2d(float value){
      return mat2(cos(value), -sin(value), sin(value), cos(value));
    }

    vec3 gradient1(vec2 st, float tick) {
      vec3 c1 = vec3(253.0/255.0, 142.0/255.0,  98.0/255.0);
      vec3 c2 = vec3(251.0/255.0,  83.0/255.0, 184.0/255.0);
      vec3 c3 = c2;
      vec3 c4 = vec3( 57.0/255.0,  15.0/255.0, 248.0/255.0);

      st.y = 1.0 - st.y;

      vec2 toCenter = vec2(0.55, 0.58) - st;
      float angle = atan(toCenter.y, toCenter.x) / PI;

      vec3 colorA = mix(c1, c2, smoothstep(0.0, 0.5, angle));

      st -= vec2(0.5);
      st *= scale(vec2(1.4));
      st *= rotate2d(-1.44);
      st += vec2(0.5);

      vec3 colorB = mix(c2, c3, smoothstep(0.3, 0.8, st.x));
      colorB = mix(colorB, c4, smoothstep(0.55, 1.0, st.x));

      return mix(colorA, colorB, smoothstep(0.28, 0.65, st.x));
    }

    vec3 gradient2(vec2 st, float tick) {
      vec3 c1 = vec3(1.0, 0.8, 0.2);
      vec3 c2 = vec3(0.92, 0.20, 0.14);

      st -= vec2(0.5);
      st *= scale(vec2(3.8));
      st *= rotate2d(tick * PI);
      st += vec2(0.5);

      return mix(c1, c2, st.x);
    }

    vec3 gradient3(vec2 st, float tick) {
      vec3 c1 = vec3(229.0/255.0, 255.0/255.0, 196.0/255.0);
      vec3 c2 = vec3(200.0/255.0, 255.0/255.0, 224.0/255.0);
      vec3 c3 = vec3(180.0/255.0, 255.0/255.0, 245.0/255.0);
      vec3 c4 = vec3(203.0/255.0, 223.0/255.0, 255.0/255.0);
      vec3 c5 = vec3(233.0/255.0, 201.0/255.0, 255.0/255.0);

      st -= vec2(0.5);
      st *= scale(vec2(1.2));
      st *= rotate2d(tick * (PI / 2.5));
      st += vec2(0.5);

      vec3 colorB = mix(c1, c2, smoothstep(0.0, 0.25, st.x));
      colorB = mix(colorB, c3, smoothstep(0.25, 0.5, st.x));
      colorB = mix(colorB, c4, smoothstep(0.5, 0.75, st.x));
      colorB = mix(colorB, c5, smoothstep(0.75, 1.0, st.x));

      return colorB;
    }

    vec3 gradients(int type, vec2 st, float tick) {
      if (type == 1) {
        return gradient1(st, tick);
      } else if (type == 2) {
        return gradient2(st, tick);
      } else if (type == 3) {
        return gradient3(st, tick);
      }
    }

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution;

      vec4 displacement = texture2D(u_displacement, st);

      vec2 direction = vec2(cos(displacement.r * PI2), sin(displacement.r * PI2));
      float length = displacement.g;

      vec2 newUv = v_uv;

      newUv.x += (length * 0.07) * direction.x;
      newUv.y += (length * 0.07) * direction.y;

      vec4 texture = texture2D(u_texture, newUv);
      float tick = u_tick * 0.009;

      vec3 color = gradients(u_typeId, v_uv, tick);

      texture.rgb = color + (texture.rgb * color);

      vec4 mask = texture2D(u_mask, st);

      int maskId = int(mask.r * 4.0 + mask.g * 2.0 + mask.b * 1.0);

      if (maskId == u_maskId) {
        gl_FragColor = vec4(texture.rgb, texture.a * mask.a);
      } else {
        discard;
      }
    }`,
  vert: /* glsl */`
    precision mediump float;
    #define GLSLIFY 1

    attribute vec3 a_position;
    attribute vec2 a_uv;

    uniform mat4 u_projection;
    uniform mat4 u_view;
    uniform mat4 u_world;

    varying vec2 v_uv;

    void main() {
      v_uv = a_uv;

      gl_Position = u_projection * u_view * u_world * vec4(a_position, 1);
    }`
}

const q = {
  frag: /* glsl */`
    precision mediump float;
    #define GLSLIFY 1

    uniform vec2 u_resolution;
    uniform int u_face;
    uniform int u_typeId;
    uniform sampler2D u_texture;
    uniform samplerCube u_reflection;
    uniform float u_tick;
    uniform float u_borderWidth;
    uniform float u_displacementLength;
    uniform float u_reflectionOpacity;
    uniform int u_scene;

    varying vec3 v_normal;
    varying vec3 v_center;
    varying vec3 v_point;
    varying vec2 v_uv;
    varying vec3 v_color;
    varying float v_depth;

    const float PI2 = 6.283185307179586;

    float borders(vec2 uv, float strokeWidth) {
      vec2 borderBottomLeft = smoothstep(vec2(0.0), vec2(strokeWidth), uv);

      vec2 borderTopRight = smoothstep(vec2(0.0), vec2(strokeWidth), 1.0 - uv);

      return 1.0 - borderBottomLeft.x * borderBottomLeft.y * borderTopRight.x * borderTopRight.y;
    }

    const float PI2_0 = 6.28318530718;

    vec4 radialRainbow(vec2 st, float tick) {
      vec2 toCenter = vec2(0.5) - st;
      float angle = mod((atan(toCenter.y, toCenter.x) / PI2_0) + 0.5 + sin(tick * 0.002), 1.0);

      // colors
      vec4 c1 = vec4(229.0/255.0, 255.0/255.0, 196.0/255.0, 1.0);
      vec4 c2 = vec4(200.0/255.0, 255.0/255.0, 224.0/255.0, 1.0);
      vec4 c3 = vec4(180.0/255.0, 255.0/255.0, 245.0/255.0, 1.0);
      vec4 c4 = vec4(203.0/255.0, 223.0/255.0, 255.0/255.0, 1.0);
      vec4 c5 = vec4(233.0/255.0, 201.0/255.0, 255.0/255.0, 1.0);
      // vec4 a = vec4(0.43, 0.48, 0.95, 1.0);
      // vec4 b = vec4(0.94, 0.79, 0.41, 1.0);
      // // vec4 b = vec4(0.49, 0.88, 1.00, 1.0);
      // vec4 c = vec4(0.68, 0.29, 0.68, 1.0);
      // vec4 d = vec4(0.94, 0.79, 0.41, 1.0);
      // vec4 e = vec4(0.43, 0.48, 0.95, 1.0);

      float step = 1.0 / 10.0;

      vec4 color = c1;

      color = mix(color, c2, smoothstep(step * 1.0, step * 2.0, angle));
      color = mix(color, c1, smoothstep(step * 2.0, step * 3.0, angle));
      color = mix(color, c2, smoothstep(step * 3.0, step * 4.0, angle));
      color = mix(color, c3, smoothstep(step * 4.0, step * 5.0, angle));
      color = mix(color, c4, smoothstep(step * 5.0, step * 6.0, angle));
      color = mix(color, c3, smoothstep(step * 6.0, step * 7.0, angle));
      color = mix(color, c4, smoothstep(step * 7.0, step * 8.0, angle));
      color = mix(color, c5, smoothstep(step * 8.0, step * 9.0, angle));
      color = mix(color, c1, smoothstep(step * 9.0, step * 10.0, angle));

      return color;
    }

    mat2 scale(vec2 value){
      return mat2(value.x, 0.0, 0.0, value.y);
    }

    mat2 rotate2d(float value){
      return mat2(cos(value), -sin(value), sin(value), cos(value));
    }

    vec2 rotateUV(vec2 uv, float rotation) {
      float mid = 0.5;
      return vec2(
        cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
        cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
      );
    }

    vec4 type1() {
      vec2 toCenter = v_center.xy - v_point.xy;
      float angle = (atan(toCenter.y, toCenter.x) / PI2) + 0.5;
      float displacement = borders(v_uv, u_displacementLength) + borders(v_uv, u_displacementLength * 2.143) * 0.3;

      return vec4(angle, displacement, 0.0, 1.0);
    }

    vec4 type2() {
      return vec4(v_color, 1.0);
    }

    vec4 type3() {
      vec2 st = gl_FragCoord.xy / u_resolution;

      vec4 strokeColor = radialRainbow(st, u_tick);
      float depth = clamp(smoothstep(-1.0, 1.0, v_depth), 0.6, 0.9);
      vec4 stroke = strokeColor * vec4(borders(v_uv, u_borderWidth)) * depth;

      vec4 texture;

      if (u_face == -1) {
        vec3 normal = normalize(v_normal);
        texture = textureCube(u_reflection, normalize(v_normal));

        texture.a *= u_reflectionOpacity * depth;
      }  else {
        texture = texture2D(u_texture, st);
      }

      if (stroke.a > 0.0) {
        return stroke - texture.a;
      } else {
        return texture;
      }
    }

    vec4 switchScene(int id) {
      if (id == 1) {
        return type1();
      } else if (id == 2) {
        return type2();
      } else if (id == 3) {
        return type3();
      }
    }

    void main() {
      if (u_scene == 3) {
        gl_FragColor = switchScene(u_typeId);
      } else {
        gl_FragColor = switchScene(u_scene);
      }
    }`,
  vert: /* glsl */`
  precision mediump float;
  #define GLSLIFY 1

  attribute vec3 a_position;
  attribute vec3 a_center;
  attribute vec2 a_uv;
  attribute vec3 a_color;

  uniform mat4 u_projection;
  uniform mat4 u_view;
  uniform mat4 u_world;

  varying vec3 v_normal;
  varying vec3 v_center;
  varying vec3 v_point;
  varying vec2 v_uv;
  varying vec3 v_color;
  varying float v_depth;

  void main() {
    vec4 center = u_projection * u_view * u_world * vec4(a_center, 1.0);
    vec4 position = u_projection * u_view * u_world * vec4(a_position, 1.0);

    v_normal = normalize(a_position);
    v_center = center.xyz;
    v_point = position.xyz;
    v_uv = a_uv;
    v_color = a_color;
    v_depth = (mat3(u_view) * mat3(u_world) * a_position).z;

    gl_Position = position;
  }`
}