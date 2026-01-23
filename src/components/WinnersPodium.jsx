import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';

// --- Types & Data ---
const winners = [
    {
        rank: 2,
        title: "Echoes of Void",
        team: "Deep Space Devs",
        image: "/games/resident.jpg",
        position: [-6.0, 0, -0.5], // Left & Back
        color: "#a855f7", // Purple
        height: 1.5,
        delay: 0.2
    },
    {
        rank: 1,
        title: "Neon Cyber Pulse",
        team: "Pixel Punks",
        image: "/games/doom.webp",
        position: [0, 0, 1], // Center & Forward (Hero)
        color: "#fbbf24", // Gold/Yellow
        height: 2.2,
        delay: 0
    },
    {
        rank: 3,
        title: "Synthed Memory",
        team: "Retro Wave",
        image: "/games/royal.webp",
        position: [6.0, 0, -0.5], // Right & Back
        color: "#3b82f6", // Blue
        height: 1.0,
        delay: 0.4
    }
];

// --- 3D Components ---

function PodiumStep({ position, height, color, children }) {
    return (
        <group position={[position[0], -2, position[2]]}>
            {/* Floating Content Anchor */}
            <group position={[0, height + 0.5, 0]}>
                {children}
            </group>
        </group>
    );
}

function WinnerCard({ rank, title, team, image, color }) {
    return (
        <Html transform position={[0, 0.5, 0]} style={{ transition: 'all 0.2s', opacity: 1, transform: 'scale(1)' }}>
            <div className={`
                glass-panel p-4 rounded-2xl flex flex-col gap-2 backdrop-blur-md border border-white/10 relative overflow-hidden group
                w-[200px] md:w-[240px] select-none pointer-events-none
                ${rank === 1 ? 'scale-105 border-yellow-500/30' : 'scale-95'}
            `}>
                {/* Image */}
                <div className="w-full h-24 md:h-32 rounded-lg overflow-hidden relative">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center font-black text-white border border-white/20 text-xs">
                        {rank}
                    </div>
                </div>

                {/* Content */}
                <div>
                    <h3 className="text-base font-black text-white leading-tight mb-1 truncate" style={{ textShadow: `0 0 10px ${color}40` }}>
                        {title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium truncate border-l-2 pl-2" style={{ borderColor: color }}>
                        {team}
                    </p>
                </div>

                {/* Rank Badge / Footer */}
                <div className="w-full h-1 mt-1 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
            </div>
        </Html>
    );
}

function Scene() {
    return (
        <group position={[0, -0.5, 0]}>
            {winners.map((winner, index) => (
                <Float key={index} speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                    <PodiumStep
                        position={winner.position}
                        height={winner.height}
                        color={winner.color}
                    >
                        <WinnerCard {...winner} />
                    </PodiumStep>
                </Float>
            ))}

            {/* Ground Reflections */}
            <ContactShadows opacity={0.5} scale={20} blur={2} far={4} resolution={256} color="#000000" />

            {/* Atmosphere Lights */}
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow shadow-mapSize={[2048, 2048]} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#2dd4bf" />
            <pointLight position={[0, 10, 5]} intensity={0.5} color="#a855f7" />
        </group>
    );
}

export default function WinnersPodium() {
    return (
        <section className="relative w-full h-screen bg-black z-[55] py-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0f18] to-black" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent opacity-50 pointer-events-none" />

            {/* Title */}
            <div className="relative z-10 text-center mb-10 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
                >
                    Ganadores <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-lg">2026</span>
                </motion.h2>
                <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
                    Los proyectos más destacados elegidos por la comunidad.
                </p>
            </div>

            {/* 3D Scene */}
            <div className="w-full h-[600px] md:h-[700px] relative z-20">
                <Canvas shadows camera={{ position: [0, 2, 14], fov: 35 }} dpr={[1, 2]}>
                    <fog attach="fog" args={['#050505', 5, 20]} />
                    <Environment preset="city" />

                    <PresentationControls
                        global
                        config={{ mass: 2, tension: 500 }}
                        snap={{ mass: 4, tension: 1500 }}
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]} // Limit vertical rotation
                        azimuth={[-Math.PI / 4, Math.PI / 4]} // Limit horizontal rotation
                    >
                        <Scene />
                    </PresentationControls>
                </Canvas>
            </div>
        </section>
    );
}
