
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three"; // Importing THREE explicitly

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y = meshRef.current.rotation.y += 0.003;
    }
  });

  const primaryColor = theme === "dark" ? "#396cd8" : "#396cd8";
  
  return (
    <Sphere args={[1.6, 64, 64]} ref={meshRef}>
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
    </Sphere>
  );
};

const Background3D: React.FC = () => {
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
