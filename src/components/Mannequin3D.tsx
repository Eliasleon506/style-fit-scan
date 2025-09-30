import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function MannequinModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  const grayMaterial = new THREE.MeshStandardMaterial({ 
    color: '#808080',
    roughness: 0.7,
    metalness: 0.1
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 1.4, 0]} material={grayMaterial}>
        <sphereGeometry args={[0.25, 32, 32]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.1, 0]} material={grayMaterial}>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 16]} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.6, 0]} material={grayMaterial}>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
      </mesh>

      {/* Left Arm Upper */}
      <mesh position={[-0.35, 0.8, 0]} rotation={[0, 0, 0.3]} material={grayMaterial}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
      </mesh>

      {/* Left Arm Lower */}
      <mesh position={[-0.55, 0.4, 0]} rotation={[0, 0, 0.2]} material={grayMaterial}>
        <cylinderGeometry args={[0.07, 0.07, 0.5, 16]} />
      </mesh>

      {/* Right Arm Upper */}
      <mesh position={[0.35, 0.8, 0]} rotation={[0, 0, -0.3]} material={grayMaterial}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
      </mesh>

      {/* Right Arm Lower */}
      <mesh position={[0.55, 0.4, 0]} rotation={[0, 0, -0.2]} material={grayMaterial}>
        <cylinderGeometry args={[0.07, 0.07, 0.5, 16]} />
      </mesh>

      {/* Pelvis */}
      <mesh position={[0, 0.05, 0]} material={grayMaterial}>
        <boxGeometry args={[0.4, 0.2, 0.25]} />
      </mesh>

      {/* Left Leg Upper */}
      <mesh position={[-0.12, -0.35, 0]} material={grayMaterial}>
        <cylinderGeometry args={[0.1, 0.09, 0.6, 16]} />
      </mesh>

      {/* Left Leg Lower */}
      <mesh position={[-0.12, -0.9, 0]} material={grayMaterial}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
      </mesh>

      {/* Right Leg Upper */}
      <mesh position={[0.12, -0.35, 0]} material={grayMaterial}>
        <cylinderGeometry args={[0.1, 0.09, 0.6, 16]} />
      </mesh>

      {/* Right Leg Lower */}
      <mesh position={[0.12, -0.9, 0]} material={grayMaterial}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
      </mesh>
    </group>
  );
}

export function Mannequin3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0.5, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <MannequinModel />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
