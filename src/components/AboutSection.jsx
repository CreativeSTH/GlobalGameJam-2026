import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import GradientMesh from './GradientMesh';

export default function AboutSection() {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the cursor
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Track mouse relative to viewport
            mouseX.set(e.clientX - 150); // Center offset (300px width / 2)
            mouseY.set(e.clientY - 150); // Center offset
        };

        if (isHovered) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isHovered, mouseX, mouseY]);

    return (
        <section
            ref={containerRef}
            id="about-section"
            className="relative w-full min-h-screen bg-black text-white py-32 px-4 z-[55] cursor-none" // Hide default cursor
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Custom Glow Cursor */}
            <motion.div
                className="fixed pointer-events-none z-[60] mix-blend-screen"
                style={{
                    left: 0,
                    top: 0,
                    x: cursorX,
                    y: cursorY,
                    opacity: isHovered ? 1 : 0,
                }}
            >
                <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-teal-500/30 to-purple-500/30 blur-[80px]" />
            </motion.div>

            {/* Fondo con GradientMesh */}
            <div className="absolute inset-0 z-0">
                <GradientMesh />
            </div>

            {/* Overlay para oscurecer/dar textura */}
            <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

            {/* Efectos tipo ::before y ::after para bordes/transiciones suaves */}


            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12"
                >
                    ¿Qué es <span className="text-teal-400 block mt-2">Global Game Jam?</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <p className="text-xl md:text-1xl text-gray-300 leading-relaxed max-w-5xl mx-auto text-center">
                        <strong className="text-white">The Global Game Jam</strong> acoge directamente a 40.000 creadores de juegos cada año en 100+ países y nosotros celebramos la edición número 15 de este evento con nuestra sede en Bogotá, Colombia.
                    </p>
                    <p className="text-xl md:text-1xl text-gray-300 leading-relaxed max-w-5xl mx-auto 
              text-center md:text-center md:hyphens-auto">
                        GGJ ha sido un punto de partida para cientos de miles de desarrolladores de juegos en todo el mundo que han construido carreras exitosas y sostenibles en el desarrollo de juegos, han lanzado estudios y han creado juegos galardonados. A lo largo del año, trabajamos para apoyar a nuestra comunidad de bloqueadores a través de la participación comunitaria, bloqueos de socios y más.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mt-5 text-left">
                        {/* Card 1: Colaboración */}
                        <div className="glass-panel p-8 rounded-[2.5rem] flex flex-col gap-6 backdrop-blur-3xl border border-white/5 relative overflow-hidden group hover:border-teal-500/30 transition-colors">
                            {/* Hover Glow Effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-400/30 transition-colors duration-700 pointer-events-none" />

                            <h3 className="text-3xl font-black text-teal-400 mb-2 relative z-10">Colaboración</h3>
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                            <p className="text-gray-300 font-medium leading-relaxed relative z-10">
                                No es una competencia. Es un espacio para aprender, experimentar y conocer gente apasionada.
                            </p>
                        </div>

                        {/* Card 2: Innovación */}
                        <div className="glass-panel p-8 rounded-[2.5rem] flex flex-col gap-6 backdrop-blur-3xl border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                            {/* Hover Glow Effect (Purple variant for variety or keep teal?) - Let's keep teal for consistency or maybe purple for innovation */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-400/30 transition-colors duration-700 pointer-events-none" />

                            <h3 className="text-3xl font-black text-purple-400 mb-2 relative z-10">Innovación</h3>
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                            <p className="text-gray-300 font-medium leading-relaxed relative z-10">
                                Prueba nuevas ideas, usa nuevas tecnologías. El fracaso es parte del proceso de aprendizaje.
                            </p>
                        </div>

                        {/* Card 3: Comunidad */}
                        <div className="glass-panel p-8 rounded-[2.5rem] flex flex-col gap-6 backdrop-blur-3xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-400/30 transition-colors duration-700 pointer-events-none" />

                            <h3 className="text-3xl font-black text-blue-400 mb-2 relative z-10">Comunidad</h3>
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                            <p className="text-gray-300 font-medium leading-relaxed relative z-10">
                                Únete a la red global de creadores. Tu juego será jugado por nuestra red de amigos.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
