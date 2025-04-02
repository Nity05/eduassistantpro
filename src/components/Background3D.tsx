
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

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
      </Canvas>
    </div>
  );
};

export default Background3D;
