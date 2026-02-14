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

import { useMobile } from '../hooks/useMobile';

export default function WinnersPodium() {
    const isMobile = useMobile();

    // Sort winners by rank for mobile view (1st, 2nd, 3rd)
    const mobileWinners = [...winners].sort((a, b) => a.rank - b.rank);

    return (
        <section className="relative w-full min-h-screen bg-black z-[55] py-20 overflow-hidden flex flex-col items-center">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0f18] to-black" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent opacity-50 pointer-events-none" />

            {/* Title */}
            <div className="relative z-10 text-center mb-10 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-7xl font-black uppercase tracking-tighter"
                >
                    Ganadores <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-lg">2026</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    className="text-gray-400 mt-4 text-lg max-w-xl mx-auto"
                >
                    Los proyectos más destacados elegidos por la comunidad.
                </motion.p>
            </div>

            {/* Content Switcher */}
            {isMobile ? (
                // --- Mobile View: Vertical List ---
                <div className="relative z-20 w-full flex flex-col items-center gap-8 px-4 pb-12">
                    {mobileWinners.map((winner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-10%" }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                            className={`
                                glass-panel p-4 rounded-2xl flex flex-col gap-4 backdrop-blur-md border relative overflow-hidden group w-full max-w-md
                                ${winner.rank === 1 ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-white/10 bg-white/5'}
                            `}
                        >
                            {/* Image */}
                            <div className="w-full h-48 rounded-xl overflow-hidden relative">
                                <img src={winner.image} alt={winner.title} className="w-full h-full object-cover" />
                                <div className={`
                                    absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center font-black text-white border text-lg shadow-lg
                                    ${winner.rank === 1 ? 'bg-yellow-500/80 border-yellow-300' : 'bg-black/60 border-white/20'}
                                `}>
                                    #{winner.rank}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="text-center">
                                <h3 className="text-2xl font-black text-white leading-tight mb-2" style={{ textShadow: `0 0 15px ${winner.color}60` }}>
                                    {winner.title}
                                </h3>
                                <p className="text-sm text-gray-300 font-medium uppercase tracking-widest border-t border-white/10 pt-2 inline-block" style={{ color: winner.color }}>
                                    {winner.team}
                                </p>
                            </div>

                            {/* Rank Decorator */}
                            <div className="absolute bottom-0 left-0 w-full h-1" style={{ background: winner.color, boxShadow: `0 0 15px ${winner.color}` }} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                // --- Desktop View: 3D Scene ---
                <div className="relative w-full flex flex-col items-center">
                    <div className="w-full h-[600px] md:h-[700px] relative z-20 cursor-grab active:cursor-grabbing">
                        <Canvas shadows camera={{ position: [0, 2, 14], fov: 35 }} dpr={[1, 2]}>
                            <fog attach="fog" args={['#050505', 5, 20]} />
                            <Environment preset="city" />

                            <PresentationControls
                                global
                                config={{ mass: 2, tension: 500 }}
                                snap={{ mass: 4, tension: 1500 }}
                                rotation={[0, 0, 0]}
                                polar={[-Math.PI / 4, Math.PI / 4]}
                                azimuth={[-Math.PI / 4, Math.PI / 4]}
                            >
                                <Scene />
                            </PresentationControls>
                        </Canvas>
                    </div>

                    {/* Interaction Hint */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-4 z-30 pointer-events-none"
                    >
                        <div className="glass-panel px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl flex items-center gap-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                            <div className="relative flex items-center justify-center w-8 h-8">
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                                <div className="relative bg-black/50 rounded-full p-1.5 border border-emerald-500/30">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-emerald-400">
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        <path d="M8 12h8" />
                                        <path d="M12 8v8" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 font-mono uppercase tracking-widest">Explora en 3D</span>
                                <span className="text-sm font-bold text-white tracking-wide">Click & Arrastra</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
