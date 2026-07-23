import { useRef, useEffect, Component } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

/* ─── Draco decoder (for blackhole.glb which is still Draco-compressed) ─── */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
dracoLoader.preload();

/* ─── Shared GLTF loader — supports BOTH Draco + Meshopt ─── */
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.setMeshoptDecoder(MeshoptDecoder);

/* ─── In-memory cache: each model downloads only once ─── */
const modelCache = new Map();
function loadModel(path) {
  if (modelCache.has(path)) return Promise.resolve(modelCache.get(path));
  return new Promise((resolve, reject) => {
    gltfLoader.load(path, (gltf) => { modelCache.set(path, gltf); resolve(gltf); }, undefined, reject);
  });
}

/* ─── Error boundary so a broken model never crashes the page ─── */
class CanvasErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: false }; }
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? null : this.props.children; }
}

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  ModelCanvas — Advanced Animation Config                        ║
 * ║                                                                  ║
 * ║  config object supports:                                         ║
 * ║    pos:              [x, y, z]  — base position                 ║
 * ║    rot:              [x, y, z]  — base rotation (radians)       ║
 * ║    scale:            number     — uniform scale                  ║
 * ║    visible:          bool       — show/hide                      ║
 * ║    animate:          bool       — play GLB animations            ║
 * ║    speed:            number     — GLB animation speed multiplier ║
 * ║                                                                  ║
 * ║  ── Float (vertical bobbing) ──                                  ║
 * ║    float:            bool       — enable floating                ║
 * ║    floatSpeed:       number     — cycles per second (def: 0.6)   ║
 * ║    floatAmplitude:   number     — units of travel (def: 0.12)    ║
 * ║                                                                  ║
 * ║  ── Sway (subtle side-to-side roll) ──                           ║
 * ║    sway:             bool       — enable swaying                 ║
 * ║    swaySpeed:        number     — cycles per second (def: 0.4)   ║
 * ║    swayAmplitude:    number     — radians of tilt  (def: 0.04)   ║
 * ║                                                                  ║
 * ║  ── Auto-rotate (continuous Y-spin) ──                           ║
 * ║    autoRotate:       bool       — enable spinning                ║
 * ║    autoRotateSpeed:  number     — radians per second (def: 0.5)  ║
 * ║    autoRotateAxis:   'x'|'y'|'z' — axis to spin on (def: 'y')   ║
 * ║                                                                  ║
 * ║  ── Drift (slow XZ positional drift) ──                          ║
 * ║    drift:            bool       — enable positional drift        ║
 * ║    driftSpeed:       number     — cycles per second (def: 0.25)  ║
 * ║    driftAmplitude:   number     — units of XZ drift (def: 0.08)  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
function ThreeModel({ path, config, style = {}, fov = 35 }) {
  const containerRef = useRef(null);

  /* Destructure into primitives so useEffect re-runs on any change */
  const [px, py, pz]  = config.pos  ?? [0, 0, 0];
  const [rx, ry, rz]  = config.rot  ?? [0, 0, 0];
  const sc   = config.scale   ?? 1;
  const spd  = config.speed   ?? 1;
  const anim = config.animate !== false;

  /* Float */
  const doFloat   = !!config.float;
  const floatSpd  = config.floatSpeed     ?? 0.6;
  const floatAmp  = config.floatAmplitude ?? 0.12;

  /* Sway */
  const doSway    = !!config.sway;
  const swaySpd   = config.swaySpeed      ?? 0.4;
  const swayAmp   = config.swayAmplitude  ?? 0.04;

  /* Auto-rotate */
  const doSpin    = !!config.autoRotate;
  const spinSpd   = config.autoRotateSpeed ?? 0.5;
  const spinAxis  = config.autoRotateAxis  ?? 'y';

  /* Drift */
  const doDrift   = !!config.drift;
  const driftSpd  = config.driftSpeed     ?? 0.25;
  const driftAmp  = config.driftAmplitude ?? 0.08;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const w = container.clientWidth  || 600;
    const h = container.clientHeight || 600;

    /* ── Scene ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, w / h, 0.1, 100);
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(5, 8, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xaaccff, 0.4);
    fill.position.set(-4, -2, -4);
    scene.add(fill);
    const pt = new THREE.PointLight(0xffffff, 0.8);
    pt.position.set(0, 4, 2);
    scene.add(pt);

    /* ── Load model ── */
    let mixer    = null;
    let rafId    = null;
    let disposed = false;
    let wrapper  = null;  // outer Group — receives our procedural transforms
    const clock  = new THREE.Clock();
    let elapsed  = 0;

    loadModel(path).then((gltf) => {
      if (disposed) return;

      /* Outer wrapper: OUR position / rotation / scale live here */
      wrapper = new THREE.Group();
      wrapper.position.set(px, py, pz);
      wrapper.rotation.set(rx, ry, rz);
      wrapper.scale.setScalar(sc);
      scene.add(wrapper);

      /* Inner model: SkeletonUtils.clone properly remaps bones for AnimationMixer */
      const modelScene = SkeletonUtils.clone(gltf.scene);
      wrapper.add(modelScene);

      if (anim && gltf.animations?.length > 0) {
        /* Bind mixer to inner modelScene — never to wrapper */
        mixer = new THREE.AnimationMixer(modelScene);
        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.reset();
          action.setEffectiveTimeScale(1);
          action.setEffectiveWeight(1);
          action.play();
        });
      }
    }).catch((err) => {
      console.warn('[ModelCanvas] Load error:', err?.message ?? err);
    });

    /* ── Render loop with advanced animations ── */
    function animateLoop() {
      rafId = requestAnimationFrame(animateLoop);
      const delta = clock.getDelta();
      elapsed += delta;

      /* GLB embedded animation — affects INNER modelScene only */
      if (mixer) mixer.update(delta * spd);

      /* Procedural animations — applied to WRAPPER GROUP only */
      if (wrapper) {
        const floatOffset = doFloat
          ? Math.sin(elapsed * floatSpd * Math.PI * 2) * floatAmp
          : 0;

        const driftX = doDrift
          ? Math.sin(elapsed * driftSpd * Math.PI * 2) * driftAmp
          : 0;
        const driftZ = doDrift
          ? Math.sin(elapsed * driftSpd * Math.PI * 2 * 0.7) * driftAmp * 0.5
          : 0;

        wrapper.position.set(px + driftX, py + floatOffset, pz + driftZ);

        const swayOffset = doSway
          ? Math.sin(elapsed * swaySpd * Math.PI * 2) * swayAmp
          : 0;

        const spinOffset = doSpin ? elapsed * spinSpd : 0;

        wrapper.rotation.set(
          rx + (spinAxis === 'x' ? spinOffset : 0),
          ry + (spinAxis === 'y' ? spinOffset : 0),
          rz + (spinAxis === 'z' ? spinOffset : 0) + swayOffset
        );
      }

      renderer.render(scene, camera);
    }
    animateLoop();

    /* ── Resize ── */
    const onResize = () => {
      const nw = container.clientWidth  || 600;
      const nh = container.clientHeight || 600;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    /* ── Cleanup ── */
    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, px, py, pz, rx, ry, rz, sc, spd, anim,
      doFloat, floatSpd, floatAmp,
      doSway, swaySpd, swayAmp,
      doSpin, spinSpd, spinAxis,
      doDrift, driftSpd, driftAmp,
      fov]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', ...style }} />;
}

export default function ModelCanvas({ path, config, style = {}, fov = 35 }) {
  if (!config?.visible) return null;

  const isMobile = typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches;
  const activeConfig = (isMobile && config.mobile)
    ? { ...config, ...config.mobile }
    : config;

  return (
    <CanvasErrorBoundary>
      <ThreeModel path={path} config={activeConfig} style={style} fov={fov} />
    </CanvasErrorBoundary>
  );
}
