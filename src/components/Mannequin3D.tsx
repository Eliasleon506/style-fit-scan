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
    color: '#888888',
    roughness: 0.6,
    metalness: 0.2
  });

  const darkGrayMaterial = new THREE.MeshStandardMaterial({ 
    color: '#666666',
    roughness: 0.7,
    metalness: 0.1
  });

  return (
    <group ref={groupRef}>
      {/* Head - more detailed */}
      <mesh position={[0, 1.5, 0]} material={grayMaterial}>
        <sphereGeometry args={[0.28, 32, 32]} />
      </mesh>

      {/* Facial feature marker */}
      <mesh position={[0, 1.5, 0.25]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.05, 16, 16]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.15, 0]} material={grayMaterial}>
        <cylinderGeometry args={[0.11, 0.13, 0.25, 16]} />
      </mesh>

      {/* Upper Chest */}
      <mesh position={[0, 0.85, 0]} material={grayMaterial}>
        <boxGeometry args={[0.55, 0.35, 0.28]} />
      </mesh>

      {/* Mid Torso */}
      <mesh position={[0, 0.5, 0]} material={grayMaterial}>
        <boxGeometry args={[0.48, 0.3, 0.26]} />
      </mesh>

      {/* Lower Torso */}
      <mesh position={[0, 0.2, 0]} material={grayMaterial}>
        <boxGeometry args={[0.45, 0.25, 0.24]} />
      </mesh>

      {/* Left Shoulder */}
      <mesh position={[-0.28, 0.9, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>

      {/* Right Shoulder */}
      <mesh position={[0.28, 0.9, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>

      {/* Left Arm Upper */}
      <mesh position={[-0.38, 0.65, 0]} rotation={[0, 0, 0.2]} material={grayMaterial}>
        <cylinderGeometry args={[0.09, 0.08, 0.45, 16]} />
      </mesh>

      {/* Left Elbow */}
      <mesh position={[-0.48, 0.4, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>

      {/* Left Arm Lower */}
      <mesh position={[-0.56, 0.15, 0]} rotation={[0, 0, 0.15]} material={grayMaterial}>
        <cylinderGeometry args={[0.07, 0.06, 0.45, 16]} />
      </mesh>

      {/* Left Hand */}
      <mesh position={[-0.62, -0.1, 0]} material={darkGrayMaterial}>
        <boxGeometry args={[0.08, 0.12, 0.05]} />
      </mesh>

      {/* Right Arm Upper */}
      <mesh position={[0.38, 0.65, 0]} rotation={[0, 0, -0.2]} material={grayMaterial}>
        <cylinderGeometry args={[0.09, 0.08, 0.45, 16]} />
      </mesh>

      {/* Right Elbow */}
      <mesh position={[0.48, 0.4, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>

      {/* Right Arm Lower */}
      <mesh position={[0.56, 0.15, 0]} rotation={[0, 0, -0.15]} material={grayMaterial}>
        <cylinderGeometry args={[0.07, 0.06, 0.45, 16]} />
      </mesh>

      {/* Right Hand */}
      <mesh position={[0.62, -0.1, 0]} material={darkGrayMaterial}>
        <boxGeometry args={[0.08, 0.12, 0.05]} />
      </mesh>

      {/* Pelvis/Hips */}
      <mesh position={[0, 0, 0]} material={grayMaterial}>
        <boxGeometry args={[0.42, 0.22, 0.26]} />
      </mesh>

      {/* Left Hip Joint */}
      <mesh position={[-0.13, -0.08, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>

      {/* Right Hip Joint */}
      <mesh position={[0.13, -0.08, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>

      {/* Left Leg Upper (Thigh) */}
      <mesh position={[-0.13, -0.42, 0]} material={grayMaterial}>
        <cylinderGeometry args={[0.11, 0.1, 0.65, 16]} />
      </mesh>

      {/* Left Knee */}
      <mesh position={[-0.13, -0.75, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>

      {/* Left Leg Lower (Shin) */}
      <mesh position={[-0.13, -1.05, 0]} material={grayMaterial}>
        <cylinderGeometry args={[0.09, 0.08, 0.55, 16]} />
      </mesh>

      {/* Left Foot */}
      <mesh position={[-0.13, -1.35, 0.08]} material={darkGrayMaterial}>
        <boxGeometry args={[0.12, 0.08, 0.22]} />
      </mesh>

      {/* Right Leg Upper (Thigh) */}
      <mesh position={[0.13, -0.42, 0]} material={grayMaterial}>
        <cylinderGeometry args={[0.11, 0.1, 0.65, 16]} />
      </mesh>

      {/* Right Knee */}
      <mesh position={[0.13, -0.75, 0]} material={darkGrayMaterial}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>

      {/* Right Leg Lower (Shin) */}
      <mesh position={[0.13, -1.05, 0]} material={grayMaterial}>
        <cylinderGeometry args={[0.09, 0.08, 0.55, 16]} />
      </mesh>

      {/* Right Foot */}
      <mesh position={[0.13, -1.35, 0.08]} material={darkGrayMaterial}>
        <boxGeometry args={[0.12, 0.08, 0.22]} />
      </mesh>

      {/* Spine detail */}
      <mesh position={[0, 0.55, -0.12]} material={darkGrayMaterial}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
      </mesh>
    </group>
  );
}

export function Mannequin3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0.3, 3.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <MannequinModel />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
