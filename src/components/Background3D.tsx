
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Snow particles component
const SnowParticles = ({ count = 500 }) => {
  const mesh = useRef<THREE.Points>(null);
  const [particles] = useState(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Positions spread across the scene
      positions[i * 3] = (Math.random() - 0.5) * 15;      // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;  // z
      
      // Random fall speeds
      speeds[i] = 0.02 + Math.random() * 0.03;
    }
    
    return { positions, speeds };
  });
  
  useFrame(() => {
    if (!mesh.current) return;
    
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Move snow downward
      positions[i * 3 + 1] -= particles.speeds[i];
      
      // Reset position when snow reaches bottom
      if (positions[i * 3 + 1] < -7) {
        positions[i * 3 + 1] = 7;
        // Random horizontal position when respawning
        positions[i * 3] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      }
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.003;
    }
  });

  const primaryColor = theme === "dark" ? "#396cd8" : "#396cd8";
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <MeshDistortMaterial
        color={primaryColor}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={0.2}
        opacity={0.15}
        transparent={true}
      />
    </mesh>
  );
};

const Background3D: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  // Fix hydration issues by only rendering on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 opacity-90">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <AnimatedSphere />
        <SnowParticles />
      </Canvas>
    </div>
  );
};

export default Background3D;
