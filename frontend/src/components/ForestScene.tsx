import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating dust motes / light particles
function DustParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 320;

  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      speeds[i] = 0.08 + Math.random() * 0.14;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, offsets };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const baseY = positions[i * 3 + 1];
      const baseX = positions[i * 3 + 0];
      pos.setY(i, baseY + Math.sin(t * speeds[i] + offsets[i]) * 0.6);
      pos.setX(i, baseX + Math.cos(t * speeds[i] * 0.7 + offsets[i]) * 0.3);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color="#e8c97a"
        size={0.055}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Larger golden light-ray orbs drifting slowly
function LightOrbs() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 60;

  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      speeds[i] = 0.04 + Math.random() * 0.06;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, offsets };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const baseY = positions[i * 3 + 1];
      const baseX = positions[i * 3 + 0];
      pos.setY(i, baseY + Math.sin(t * speeds[i] + offsets[i]) * 1.2);
      pos.setX(i, baseX + Math.cos(t * speeds[i] * 0.5 + offsets[i]) * 0.5);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color="#f5d87a"
        size={0.18}
        transparent
        opacity={0.22}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// A single swaying tree trunk + canopy silhouette
function TreeSilhouette({
  x,
  z,
  scale,
  swayOffset,
}: {
  x: number;
  z: number;
  scale: number;
  swayOffset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(t * 0.4 + swayOffset) * 0.018;
  });

  // Trunk
  const trunkGeo = useMemo(() => new THREE.CylinderGeometry(0.08, 0.14, 2.2, 6), []);
  const trunkMat = useMemo(
    () => new THREE.MeshLambertMaterial({ color: '#4a2e12' }),
    []
  );

  // Canopy layers (3 overlapping ellipses)
  const canopyGeos = useMemo(
    () => [
      new THREE.SphereGeometry(1.1, 8, 6),
      new THREE.SphereGeometry(0.9, 8, 6),
      new THREE.SphereGeometry(0.75, 8, 6),
    ],
    []
  );
  const canopyColors = ['#1e4020', '#2d5a27', '#3a6b32'];

  return (
    <group ref={groupRef} position={[x, -3.5 * scale, z]} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh geometry={trunkGeo} material={trunkMat} position={[0, 1.1, 0]} />
      {/* Canopy layers */}
      <mesh position={[0, 3.2, 0]}>
        <primitive object={canopyGeos[0]} />
        <meshLambertMaterial color={canopyColors[0]} transparent opacity={0.92} />
      </mesh>
      <mesh position={[-0.3, 3.8, 0.1]}>
        <primitive object={canopyGeos[1]} />
        <meshLambertMaterial color={canopyColors[1]} transparent opacity={0.88} />
      </mesh>
      <mesh position={[0.25, 4.2, -0.1]}>
        <primitive object={canopyGeos[2]} />
        <meshLambertMaterial color={canopyColors[2]} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

// Foreground fern/bush shapes
function FoliageBush({
  x,
  y,
  z,
  scale,
  swayOffset,
}: {
  x: number;
  y: number;
  z: number;
  scale: number;
  swayOffset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(t * 0.6 + swayOffset) * 0.025;
  });

  const colors = ['#2d5a27', '#3a6b32', '#4a7c59', '#1e4020'];

  return (
    <group ref={groupRef} position={[x, y, z]} scale={[scale, scale, scale]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 0.35,
            Math.sin((i / 4) * Math.PI * 2) * 0.2 + 0.2,
            0,
          ]}
        >
          <sphereGeometry args={[0.55 + i * 0.08, 7, 5]} />
          <meshLambertMaterial color={colors[i % colors.length]} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Animated dappled light shafts (thin vertical planes)
function LightShafts() {
  const groupRef = useRef<THREE.Group>(null);

  const shafts = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        x: -10 + i * 3.2 + (Math.random() - 0.5) * 1.5,
        z: -4 - Math.random() * 3,
        width: 0.18 + Math.random() * 0.22,
        height: 14 + Math.random() * 4,
        opacity: 0.04 + Math.random() * 0.06,
        speed: 0.3 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const shaft = shafts[i];
      if (shaft) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshBasicMaterial).opacity =
            shaft.opacity * (0.7 + 0.3 * Math.sin(t * shaft.speed + shaft.offset));
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {shafts.map((shaft, i) => (
        <mesh key={i} position={[shaft.x, 0, shaft.z]} rotation={[0, 0, 0]}>
          <planeGeometry args={[shaft.width, shaft.height]} />
          <meshBasicMaterial
            color="#f0d060"
            transparent
            opacity={shaft.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Ground plane with earthy gradient feel
function ForestFloor() {
  return (
    <mesh position={[0, -5.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 20]} />
      <meshLambertMaterial color="#2a1a0a" />
    </mesh>
  );
}

// Background gradient sky plane
function SkyPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // Subtle breathing opacity
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.92 + 0.04 * Math.sin(t * 0.2);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -9]}>
      <planeGeometry args={[50, 30]} />
      <meshBasicMaterial color="#0d2010" transparent opacity={0.92} depthWrite={false} />
    </mesh>
  );
}

// Scene composition
function ForestSceneContent() {
  const trees = useMemo(
    () => [
      { x: -11, z: -6, scale: 1.4, swayOffset: 0 },
      { x: -6.5, z: -5, scale: 1.1, swayOffset: 1.2 },
      { x: -2, z: -7, scale: 1.6, swayOffset: 2.4 },
      { x: 3, z: -5.5, scale: 1.2, swayOffset: 0.8 },
      { x: 7.5, z: -6.5, scale: 1.5, swayOffset: 1.9 },
      { x: 12, z: -5, scale: 1.0, swayOffset: 3.1 },
      { x: -14, z: -4, scale: 0.9, swayOffset: 0.5 },
      { x: 15, z: -4, scale: 1.0, swayOffset: 2.0 },
    ],
    []
  );

  const bushes = useMemo(
    () => [
      { x: -13, y: -4.8, z: -1, scale: 1.1, swayOffset: 0.3 },
      { x: -8, y: -4.6, z: -0.5, scale: 0.9, swayOffset: 1.5 },
      { x: -4, y: -4.7, z: -1.2, scale: 1.3, swayOffset: 2.2 },
      { x: 0.5, y: -4.5, z: -0.8, scale: 0.8, swayOffset: 0.9 },
      { x: 5, y: -4.8, z: -1.0, scale: 1.2, swayOffset: 1.7 },
      { x: 9, y: -4.6, z: -0.6, scale: 1.0, swayOffset: 3.0 },
      { x: 13, y: -4.7, z: -1.1, scale: 0.85, swayOffset: 0.6 },
      { x: -10, y: -4.4, z: 0.5, scale: 0.7, swayOffset: 2.8 },
      { x: 2, y: -4.3, z: 0.8, scale: 0.75, swayOffset: 1.1 },
      { x: 11, y: -4.5, z: 0.4, scale: 0.65, swayOffset: 2.3 },
    ],
    []
  );

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.35} color="#a8c890" />
      <directionalLight
        position={[5, 10, 3]}
        intensity={0.7}
        color="#f0e0a0"
      />
      <pointLight position={[-4, 6, 2]} intensity={0.4} color="#d4b060" distance={20} />
      <pointLight position={[6, 4, 1]} intensity={0.3} color="#90c878" distance={18} />

      {/* Background */}
      <SkyPlane />

      {/* Light shafts */}
      <LightShafts />

      {/* Trees */}
      {trees.map((tree, i) => (
        <TreeSilhouette key={i} {...tree} />
      ))}

      {/* Foreground bushes */}
      {bushes.map((bush, i) => (
        <FoliageBush key={i} {...bush} />
      ))}

      {/* Ground */}
      <ForestFloor />

      {/* Particles */}
      <DustParticles />
      <LightOrbs />
    </>
  );
}

export default function ForestScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.5]}
    >
      <ForestSceneContent />
    </Canvas>
  );
}
