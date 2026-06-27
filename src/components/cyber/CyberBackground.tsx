"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

// ============= Floating particles =============
function ParticleField({ count = 1500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.03;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// ============= Cyber city grid (floor) =============
function CyberGrid() {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.z = (t * 1.2) % 4;
  });

  return (
    <group rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, 0]}>
      <gridHelper
        ref={ref}
        args={[60, 60, "#00f0ff", "#b026ff"]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

// ============= Floating geometric shapes =============
function FloatingShape({
  position,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.4;
    ref.current.position.y = position[1] + Math.sin(t) * 0.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        wireframe
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -5, -5]} intensity={0.8} color="#b026ff" />
      <pointLight position={[0, -3, 5]} intensity={0.5} color="#ff6a00" />

      <ParticleField count={1200} />
      <CyberGrid />

      <FloatingShape position={[-4, 2, -3]} color="#00f0ff" speed={1} />
      <FloatingShape position={[4, 1, -4]} color="#b026ff" speed={0.8} />
      <FloatingShape position={[2, -1, -2]} color="#ff6a00" speed={1.2} />
      <FloatingShape position={[-3, -2, -1]} color="#ff2ec4" speed={0.9} />
      <FloatingShape position={[0, 3, -5]} color="#00ff9c" speed={1.1} />
    </>
  );
}

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
