import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { Points, BufferGeometry, PointsMaterial } from "three";

type PointsRef = Points<BufferGeometry, PointsMaterial>;

interface LorenzConfig {
  SIGMA: number;
  RHO: number;
  BETA: number;
  DT: number;
  NUM_PARTICLES: number;
  BOUNDS: number;
}

const CONFIG: LorenzConfig = {
  SIGMA: 10,
  RHO: 28,
  BETA: 8 / 3,
  DT: 0.005,
  NUM_PARTICLES: 5000,
  BOUNDS: 50,
} as const;

const LorenzParticles: React.FC = () => {
  const pointsRef = useRef<PointsRef>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(CONFIG.NUM_PARTICLES * 3);
    for (let i = 0; i < CONFIG.NUM_PARTICLES; i++) {
      const i3 = i * 3;
      pos[i3] = 1 + (Math.random() - 0.5) * 0.1;
      pos[i3 + 1] = 1 + (Math.random() - 0.5) * 0.1;
      pos[i3 + 2] = 20 + (Math.random() - 0.5) * 0.1;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(CONFIG.NUM_PARTICLES * 3);
    for (let i = 0; i < CONFIG.NUM_PARTICLES; i++) {
      const i3 = i * 3;
      const t = i / CONFIG.NUM_PARTICLES;
      cols[i3] = 0.5 + 0.5 * Math.sin(t * 6.28);
      cols[i3 + 1] = 0.2;
      cols[i3 + 2] = 1;
    }
    return cols;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const positionAttribute = geometry.attributes
      .position as THREE.BufferAttribute;
    const positions = positionAttribute.array as Float32Array;

    for (let i = 0; i < CONFIG.NUM_PARTICLES; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Lorenz equations
      const dx = CONFIG.SIGMA * (y - x);
      const dy = x * (CONFIG.RHO - z) - y;
      const dz = x * y - CONFIG.BETA * z;

      positions[i3] += dx * CONFIG.DT;
      positions[i3 + 1] += dy * CONFIG.DT;
      positions[i3 + 2] += dz * CONFIG.DT;

      // Reset particle if it goes too far
      if (
        Math.abs(positions[i3]) > CONFIG.BOUNDS ||
        Math.abs(positions[i3 + 1]) > CONFIG.BOUNDS ||
        Math.abs(positions[i3 + 2]) > CONFIG.BOUNDS
      ) {
        positions[i3] = 1 + (Math.random() - 0.5) * 0.1;
        positions[i3 + 1] = 1 + (Math.random() - 0.5) * 0.1;
        positions[i3 + 2] = 20 + (Math.random() - 0.5) * 0.1;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <group position={[0, 0, -20]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={CONFIG.NUM_PARTICLES}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={CONFIG.NUM_PARTICLES}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          vertexColors
          transparent
          opacity={1}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

interface LorenzAttractorProps {
  className?: string;
}

const LorenzAttractor: React.FC<LorenzAttractorProps> = ({
  className = "w-full h-full",
}) => {
  return (
    <div className={className}>
      <Canvas
        camera={{
          position: [50, -50, 30],
          fov: 60,
          near: 0.1,
          far: 1000,
          up: [0, 0, 1],
        }}
      >
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <LorenzParticles />
        <OrbitControls makeDefault autoRotate />
      </Canvas>
    </div>
  );
};

export default LorenzAttractor;
