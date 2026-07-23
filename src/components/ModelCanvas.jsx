import { useRef, Suspense, Component, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

/* ─── Error boundary so a broken model never blacks out the page ─── */
class CanvasErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: false }; }
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (this.state.error) return null; // silent fail — model just disappears
    return this.props.children;
  }
}

/**
 * Animated GLB model — handles auto-spin and embedded GLB animations.
 */
function GLBModel({ path, config }) {
  const { scene, animations } = useGLTF(path);

  // SkeletonUtils.clone properly deep-clones skinned meshes with their
  // bone references intact — unlike scene.clone() which breaks the skeleton
  // that useAnimations binds its AnimationMixer to.
  const clonedScene = useRef(null);
  if (!clonedScene.current) {
    clonedScene.current = SkeletonUtils.clone(scene);
  }

  const ref = useRef();
  const { actions } = useAnimations(animations, ref);

  // Handle built-in GLB animations (like walking/floating)
  useEffect(() => {
    if (!actions) return;
    const names = Object.keys(actions);
    if (names.length === 0) return;

    // Play / stop ALL tracks so multi-clip models work correctly
    names.forEach((name) => {
      if (config.animate !== false) {
        actions[name].reset().play();
      } else {
        actions[name].stop();
      }
    });

    return () => {
      // Cleanup: stop all on unmount or when animate flag changes
      names.forEach((name) => actions[name]?.stop());
    };
  }, [actions, config.animate]);

  // Handle custom Y-axis auto-rotation
  useFrame((_, delta) => {
    if (ref.current && config.autoRotate !== false && config.speed > 0) {
      ref.current.rotation.y += delta * config.speed;
    }
  });

  return (
    <primitive
      ref={ref}
      object={clonedScene.current}
      position={config.pos}
      rotation={config.rot}
      scale={config.scale}
    />
  );
}

/**
 * Renders a single GLB inside a transparent Canvas overlay.
 *
 * Props:
 *   path   — public path to .glb
 *   config — { pos, rot, scale, speed, visible }
 *   style  — inline style for the wrapper div (position, size, etc.)
 *   fov    — camera field of view (default 40)
 */
export default function ModelCanvas({ path, config, style = {}, fov = 40 }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  if (!config?.visible) return null;
  
  // Merge mobile overrides if they exist
  const activeConfig = { ...config, ...(isMobile && config.mobile ? config.mobile : {}) };

  return (
    <CanvasErrorBoundary>
      <div
        style={{
          pointerEvents: activeConfig.interactable ? 'auto' : 'none',
          ...style,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: isMobile ? fov + 10 : fov }}
          dpr={[1, 1.5]} // Limit pixel ratio to 1.5 to save RAM/GPU on mobile
          gl={{ alpha: true, antialias: !isMobile, powerPreference: 'low-power' }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0); // fully transparent background
          }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.6} color="#ffffff" />
          <directionalLight position={[-4, -2, -4]} intensity={0.4} color="#aaccff" />
          <pointLight position={[0, 4, 2]} intensity={0.8} color="#ffffff" />
          <Suspense fallback={null}>
            <GLBModel path={path} config={activeConfig} />
          </Suspense>
          {activeConfig.interactable && (
            <OrbitControls enableZoom={false} enablePan={false} />
          )}
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
