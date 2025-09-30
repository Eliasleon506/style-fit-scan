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

  const mannequinMaterial = new THREE.MeshPhysicalMaterial({ 
    color: '#b8b8b8',
    roughness: 0.2,
    metalness: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.5
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Head - smooth egg shape */}
      <mesh position={[0, 1.2, 0]} material={mannequinMaterial}>
        <sphereGeometry args={[0.18, 32, 32]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1, 0]} material={mannequinMaterial}>
        <cylinderGeometry args={[0.06, 0.08, 0.15, 32]} />
      </mesh>

      {/* Torso - one smooth piece */}
      <mesh position={[0, 0.5, 0]} scale={[1, 1.8, 0.6]} material={mannequinMaterial}>
        <sphereGeometry args={[0.28, 32, 32]} />
      </mesh>

      {/* Hips base */}
      <mesh position={[0, -0.05, 0]} scale={[0.9, 0.5, 0.7]} material={mannequinMaterial}>
        <sphereGeometry args={[0.25, 32, 32]} />
      </mesh>

      {/* Left Arm - single smooth piece */}
      <mesh position={[-0.45, 0.6, 0]} rotation={[0, 0, 0.3]} scale={[0.5, 3, 0.5]} material={mannequinMaterial}>
        <capsuleGeometry args={[0.08, 0.8, 32, 32]} />
      </mesh>

      {/* Left Hand stub */}
      <mesh position={[-0.7, 0.1, 0]} material={mannequinMaterial}>
        <sphereGeometry args={[0.06, 32, 32]} />
      </mesh>

      {/* Right Arm - single smooth piece */}
      <mesh position={[0.45, 0.6, 0]} rotation={[0, 0, -0.3]} scale={[0.5, 3, 0.5]} material={mannequinMaterial}>
        <capsuleGeometry args={[0.08, 0.8, 32, 32]} />
      </mesh>

      {/* Right Hand stub */}
      <mesh position={[0.7, 0.1, 0]} material={mannequinMaterial}>
        <sphereGeometry args={[0.06, 32, 32]} />
      </mesh>

      {/* Left Leg - smooth single piece */}
      <mesh position={[-0.12, -0.6, 0]} scale={[0.6, 2.5, 0.6]} material={mannequinMaterial}>
        <capsuleGeometry args={[0.08, 0.5, 32, 32]} />
      </mesh>

      {/* Left Foot platform */}
      <mesh position={[-0.12, -1.35, 0.06]} rotation={[-0.2, 0, 0]} material={mannequinMaterial}>
        <boxGeometry args={[0.12, 0.05, 0.18]} />
      </mesh>

      {/* Right Leg - smooth single piece */}
      <mesh position={[0.12, -0.6, 0]} scale={[0.6, 2.5, 0.6]} material={mannequinMaterial}>
        <capsuleGeometry args={[0.08, 0.5, 32, 32]} />
      </mesh>

      {/* Right Foot platform */}
      <mesh position={[0.12, -1.35, 0.06]} rotation={[-0.2, 0, 0]} material={mannequinMaterial}>
        <boxGeometry args={[0.12, 0.05, 0.18]} />
      </mesh>

      {/* Abstract chest detail lines */}
      <mesh position={[0, 0.7, 0.17]} material={new THREE.MeshPhysicalMaterial({ 
        color: '#d0d0d0',
        roughness: 0.1,
        metalness: 0.9
      })}>
        <boxGeometry args={[0.3, 0.01, 0.01]} />
      </mesh>

      <mesh position={[0, 0.6, 0.17]} material={new THREE.MeshPhysicalMaterial({ 
        color: '#d0d0d0',
        roughness: 0.1,
        metalness: 0.9
      })}>
        <boxGeometry args={[0.25, 0.01, 0.01]} />
      </mesh>
    </group>
  );
}

export function Mannequin3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0.5, 3], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-3, -2, -5]} intensity={0.3} />
        <spotLight position={[0, 5, 0]} intensity={0.8} angle={0.6} penumbra={1} />
        <MannequinModel />
      </Canvas>
    </div>
  );
}
