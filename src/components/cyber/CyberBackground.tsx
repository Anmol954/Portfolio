"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

// ─── Mouse tracking for particle reactivity ──────────────────────────────────
const mousePos = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mousePos.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mousePos.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });
}

// ─── Floating particles that subtly drift toward cursor ───────────────────────
function ParticleField({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    // Smooth mouse tracking
    targetX.current += (mousePos.x - targetX.current) * 0.02;
    targetY.current += (mousePos.y - targetY.current) * 0.02;

    // Gentle rotation + subtle mouse drift
    ref.current.rotation.y = t * 0.025 + targetX.current * 0.08;
    ref.current.rotation.x = Math.sin(t * 0.08) * 0.08 + targetY.current * 0.06;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.038}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

// ─── Secondary subtle purple particle layer ───────────────────────────────────
function PurpleParticles({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = -t * 0.015;
    ref.current.rotation.z = Math.cos(t * 0.05) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#b026ff"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
      />
    </Points>
  );
}

// ─── Cyber city grid (floor) ──────────────────────────────────────────────────
function CyberGrid() {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.z = (t * 1.0) % 4;
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

// ─── Floating geometric shapes ────────────────────────────────────────────────
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
    ref.current.rotation.x = t * 0.25;
    ref.current.rotation.y = t * 0.35;
    // Smooth floating bob
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.4;
    // Subtle mouse parallax
    ref.current.position.x = position[0] + mousePos.x * 0.15;
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        wireframe
      />
    </mesh>
  );
}

// ─── Ambient pulsing ring ─────────────────────────────────────────────────────
function AmbientRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const scale = 1 + Math.sin(t * 0.5) * 0.06;
    ref.current.scale.setScalar(scale);
    ref.current.rotation.z = t * 0.04;
    (ref.current.material as THREE.MeshStandardMaterial).opacity =
      0.12 + Math.sin(t * 0.7) * 0.05;
  });

  return (
    <mesh ref={ref} position={[0, 0, -6]}>
      <torusGeometry args={[5, 0.02, 8, 60]} />
      <meshStandardMaterial
        color="#00f0ff"
        emissive="#00f0ff"
        emissiveIntensity={1}
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[-10, -5, -5]} intensity={0.9} color="#b026ff" />
      <pointLight position={[0, -3, 5]} intensity={0.5} color="#ff6a00" />

      <ParticleField count={1200} />
      <PurpleParticles count={350} />
      <CyberGrid />
      <AmbientRing />

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
