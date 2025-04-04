
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Math shapes component (pyramids, cubes, cones, etc.)
const MathShapes = ({ count = 75 }) => {
  const shapes = useRef<THREE.Group>(null);
  const [particles] = useState(() => {
    const items = [];
    const shapeTypes = ['cube', 'tetrahedron', 'cone', 'octahedron', 'icosahedron'];
    const colors = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#6E59A5'];
    
    for (let i = 0; i < count; i++) {
      const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 0.1 + Math.random() * 0.2;
      const position = [
        (Math.random() - 0.5) * 15, // x
        (Math.random() - 0.5) * 15, // y
        (Math.random() - 0.5) * 15  // z
      ];
      const rotation = [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ];
      const speed = 0.005 + Math.random() * 0.01;
      const rotSpeed = 0.005 + Math.random() * 0.01;
      
      items.push({
        shapeType,
        color,
        size,
        position,
        rotation,
        speed,
        rotSpeed
      });
    }
    
    return items;
  });
  
  useFrame((state) => {
    if (!shapes.current) return;
    
    // Update each shape
    shapes.current.children.forEach((shape, i) => {
      // Move shape downward
      shape.position.y -= particles[i].speed;
      
      // Rotate shape
      shape.rotation.x += particles[i].rotSpeed;
      shape.rotation.y += particles[i].rotSpeed * 0.8;
      
      // Reset position when shape reaches bottom
      if (shape.position.y < -7) {
        shape.position.y = 7;
        // Random horizontal position when respawning
        shape.position.x = (Math.random() - 0.5) * 15;
        shape.position.z = (Math.random() - 0.5) * 15;
      }
    });
  });
  
  return (
    <group ref={shapes}>
      {particles.map((particle, i) => {
        let geometry;
        
        switch(particle.shapeType) {
          case 'cube':
            geometry = <boxGeometry args={[particle.size, particle.size, particle.size]} />;
            break;
          case 'tetrahedron':
            geometry = <tetrahedronGeometry args={[particle.size, 0]} />;
            break;
          case 'cone':
            geometry = <coneGeometry args={[particle.size * 0.6, particle.size, 8]} />;
            break;
          case 'octahedron':
            geometry = <octahedronGeometry args={[particle.size * 0.8, 0]} />;
            break;
          case 'icosahedron':
            geometry = <icosahedronGeometry args={[particle.size * 0.7, 0]} />;
            break;
          default:
            geometry = <boxGeometry args={[particle.size, particle.size, particle.size]} />;
        }
        
        return (
          <mesh 
            key={i}
            position={[particle.position[0], particle.position[1], particle.position[2]]}
            rotation={[particle.rotation[0], particle.rotation[1], particle.rotation[2]]}
          >
            {geometry}
            <meshStandardMaterial 
              color={particle.color} 
              emissive={particle.color} 
              emissiveIntensity={0.4}
              transparent 
              opacity={0.8} 
            />
          </mesh>
        );
      })}
    </group>
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
    <div className="fixed inset-0 -z-10 opacity-70">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <MathShapes />
      </Canvas>
    </div>
  );
};

export default Background3D;
