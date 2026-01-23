import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function Model({ scrollProgress, ...props }) {
    const { scene } = useGLTF('/3d/headphones.glb');
    const group = useRef();

    useFrame((state) => {
        // Basic rotation animation
        if (group.current) {
            // Continuous slow floating rotation
            group.current.rotation.y = state.clock.getElapsedTime() * 0.2;

            // If scrollProgress is provided (it might be a MotionValue or number), 
            // we can add extra rotation logic here. For now keeping it simple & ambient.
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={scene} />
        </group>
    );
}

export default function HeadphonesModel({ className = "w-full h-full" }) {
    return (
        <div className={className}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Model scale={[10, 10, 10]} /> {/* Ajustar escala según el modelo real, empezando con algo visible */}
                </Float>

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}

useGLTF.preload('/3d/headphones.glb');
