import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';

/**
 * Animated GLB model — auto-spins on Y axis at configurable speed.
 */
function GLBModel({ path, config }) {
  const { scene } = useGLTF(path);
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current && config.speed > 0) {
      ref.current.rotation.y += delta * config.speed;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
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
  if (!config?.visible) return null;

  return (
    <div
      style={{
        pointerEvents: 'none',
        ...style,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-4, -2, -4]} intensity={0.4} color="#22e5bb" />
        <pointLight position={[0, 4, 2]} intensity={0.8} color="#38bdf8" />
        <Suspense fallback={null}>
          <GLBModel path={path} config={config} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload all models
useGLTF.preload('/model_glb/ship.glb');
useGLTF.preload('/model_glb/man.glb');
useGLTF.preload('/model_glb/blackhole.glb');
