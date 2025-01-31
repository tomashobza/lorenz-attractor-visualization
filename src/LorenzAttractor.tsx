import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function LorenzParticles() {
  const pointsRef = useRef();

  // Lorenz parameters
  const SIGMA = 10;
  const RHO = 28;
  const BETA = 8 / 3;
  const DT = 0.005;
  const NUM_PARTICLES = 5000;

  const positions = useMemo(() => {
    const pos = new Float32Array(NUM_PARTICLES * 3);
    for (let i = 0; i < NUM_PARTICLES; i++) {
      // Initialize near the attractor's typical starting region
      pos[i * 3] = 1 + (Math.random() - 0.5) * 0.1;
      pos[i * 3 + 1] = 1 + (Math.random() - 0.5) * 0.1;
      pos[i * 3 + 2] = 20 + (Math.random() - 0.5) * 0.1;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(NUM_PARTICLES * 3);
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const t = i / NUM_PARTICLES;
      // Create a blue to purple gradient
      cols[i * 3] = 0.5 + 0.5 * Math.sin(t * 6.28); // R
      cols[i * 3 + 1] = 0.2; // G
      cols[i * 3 + 2] = 1; // B
    }
    return cols;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Lorenz equations
      const dx = SIGMA * (y - x);
      const dy = x * (RHO - z) - y;
      const dz = x * y - BETA * z;

      positions[i3] += dx * DT;
      positions[i3 + 1] += dy * DT;
      positions[i3 + 2] += dz * DT;

      // Reset particle if it goes too far
      if (
        Math.abs(positions[i3]) > 50 ||
        Math.abs(positions[i3 + 1]) > 50 ||
        Math.abs(positions[i3 + 2]) > 50
      ) {
        positions[i3] = 1 + (Math.random() - 0.5) * 0.1;
        positions[i3 + 1] = 1 + (Math.random() - 0.5) * 0.1;
        positions[i3 + 2] = 20 + (Math.random() - 0.5) * 0.1;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={[0, 0, -20]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NUM_PARTICLES}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={NUM_PARTICLES}
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
}

export default function LorenzAttractor() {
  return (
    <div className="w-full h-96 border border-gray-300">
      <Canvas
        camera={{
          position: [50, -50, 30], // Changed camera angle
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
        {/* <axesHelper args={[5]} /> */}
      </Canvas>
    </div>
  );
}
