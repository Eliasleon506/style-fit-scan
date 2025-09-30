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
    color: '#9ca3af',
    roughness: 0.5,
    metalness: 0.3
  });

  const darkGrayMaterial = new THREE.MeshStandardMaterial({ 
    color: '#6b7280',
    roughness: 0.6,
    metalness: 0.2
  });

  return (
    <group ref={groupRef}>
      {/* Head - more proportional */}
      <mesh position={[0, 1.6, 0]} material={grayMaterial}>
        <sphereGeometry args={[0.22, 32, 32]} />
      </mesh>

      {/* Neck - smoother */}
      <mesh position={[0, 1.35, 0]} material={grayMaterial}>
        <capsuleGeometry args={[0.08, 0.15, 16, 16]} />
      </mesh>

      {/* Upper Torso - rounded chest */}
      <mesh position={[0, 1.1, 0]} scale={[1, 1.2, 0.8]} material={grayMaterial}>
        <sphereGeometry args={[0.25, 32, 32]} />
      </mesh>

      {/* Mid Torso */}
      <mesh position={[0, 0.8, 0]} scale={[0.9, 1, 0.7]} material={grayMaterial}>
        <sphereGeometry args={[0.24, 32, 32]} />
      </mesh>

      {/* Lower Torso/Abdomen */}
      <mesh position={[0, 0.52, 0]} scale={[0.85, 0.8, 0.65]} material={grayMaterial}>
        <sphereGeometry args={[0.22, 32, 32]} />
      </mesh>

      {/* Left Shoulder - rounded */}
      <mesh position={[-0.32, 1.15, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.1, 24, 24]} />
      </mesh>

      {/* Right Shoulder - rounded */}
      <mesh position={[0.32, 1.15, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.1, 24, 24]} />
      </mesh>

      {/* Left Upper Arm */}
      <mesh position={[-0.4, 0.88, 0]} rotation={[0, 0, 0.1]} material={grayMaterial}>
        <capsuleGeometry args={[0.07, 0.45, 16, 16]} />
      </mesh>

      {/* Left Elbow */}
      <mesh position={[-0.46, 0.6, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.075, 20, 20]} />
      </mesh>

      {/* Left Forearm */}
      <mesh position={[-0.5, 0.35, 0]} rotation={[0, 0, 0.05]} material={grayMaterial}>
        <capsuleGeometry args={[0.06, 0.4, 16, 16]} />
      </mesh>

      {/* Left Hand */}
      <mesh position={[-0.53, 0.1, 0]} scale={[0.8, 1, 0.5]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* Right Upper Arm */}
      <mesh position={[0.4, 0.88, 0]} rotation={[0, 0, -0.1]} material={grayMaterial}>
        <capsuleGeometry args={[0.07, 0.45, 16, 16]} />
      </mesh>

      {/* Right Elbow */}
      <mesh position={[0.46, 0.6, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.075, 20, 20]} />
      </mesh>

      {/* Right Forearm */}
      <mesh position={[0.5, 0.35, 0]} rotation={[0, 0, -0.05]} material={grayMaterial}>
        <capsuleGeometry args={[0.06, 0.4, 16, 16]} />
      </mesh>

      {/* Right Hand */}
      <mesh position={[0.53, 0.1, 0]} scale={[0.8, 1, 0.5]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* Pelvis/Hips - rounded */}
      <mesh position={[0, 0.28, 0]} scale={[1.1, 0.6, 0.8]} material={grayMaterial}>
        <sphereGeometry args={[0.22, 32, 32]} />
      </mesh>

      {/* Left Hip Joint */}
      <mesh position={[-0.11, 0.12, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.09, 20, 20]} />
      </mesh>

      {/* Right Hip Joint */}
      <mesh position={[0.11, 0.12, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.09, 20, 20]} />
      </mesh>

      {/* Left Thigh */}
      <mesh position={[-0.11, -0.18, 0]} material={grayMaterial}>
        <capsuleGeometry args={[0.09, 0.5, 16, 16]} />
      </mesh>

      {/* Left Knee */}
      <mesh position={[-0.11, -0.52, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.085, 20, 20]} />
      </mesh>

      {/* Left Shin */}
      <mesh position={[-0.11, -0.85, 0]} material={grayMaterial}>
        <capsuleGeometry args={[0.075, 0.55, 16, 16]} />
      </mesh>

      {/* Left Ankle */}
      <mesh position={[-0.11, -1.16, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.07, 16, 16]} />
      </mesh>

      {/* Left Foot */}
      <mesh position={[-0.11, -1.26, 0.08]} scale={[0.7, 0.5, 1.3]} material={grayMaterial}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>

      {/* Right Thigh */}
      <mesh position={[0.11, -0.18, 0]} material={grayMaterial}>
        <capsuleGeometry args={[0.09, 0.5, 16, 16]} />
      </mesh>

      {/* Right Knee */}
      <mesh position={[0.11, -0.52, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.085, 20, 20]} />
      </mesh>

      {/* Right Shin */}
      <mesh position={[0.11, -0.85, 0]} material={grayMaterial}>
        <capsuleGeometry args={[0.075, 0.55, 16, 16]} />
      </mesh>

      {/* Right Ankle */}
      <mesh position={[0.11, -1.16, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.07, 16, 16]} />
      </mesh>

      {/* Right Foot */}
      <mesh position={[0.11, -1.26, 0.08]} scale={[0.7, 0.5, 1.3]} material={grayMaterial}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>
    </group>
  );
}

export function Mannequin3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0.2, 3.2], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, -2, -5]} intensity={0.4} />
        <pointLight position={[0, 2, 2]} intensity={0.5} />
        <MannequinModel />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
