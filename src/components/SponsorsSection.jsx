import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GradientMesh from './GradientMesh';

const sponsors = [
    { name: "Global Game Jam", logo: "/sponsors/ggj.png" },
    { name: "SENA", logo: "/sponsors/sena.svg" },
    { name: "CreativeSTH", logo: "/sponsors/creativesth.svg" },
    { name: "Unity", logo: "/sponsors/unity.svg" },
    { name: "Epic Games", logo: "/sponsors/epic.png" },
    { name: "Proximamente", logo: "https://placehold.co/200x100/333333/ffffff?text=?" }, // Placeholder 1
    { name: "Proximamente", logo: "https://placehold.co/200x100/333333/ffffff?text=?" }, // Placeholder 2
];

// Duplicate the list to create a seamless infinite loop
const carouselSponsors = [...sponsors, ...sponsors];

export default function SponsorsSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={sectionRef} className="relative z-[60] w-full min-h-screen py-32 overflow-hidden flex flex-col justify-center items-center">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <GradientMesh />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                {/* Glow & Grid Effects */}
                <div className="hero-canvas-overlay absolute inset-0 pointer-events-none z-[1]" />
            </div>

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 w-full text-center"
            >
                {/* Venue Section (Container constrained) */}
                <div className="mb-24 container mx-auto px-4 max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8"
                    >
                        Nuestra <span className="text-emerald-400">Sede</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500"
                    >
                        {/* Hover Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-400/20 transition-colors duration-700 pointer-events-none" />

                        <h3 className="text-3xl font-bold text-white mb-4">Centro de Gestión de Mercados, Logística y Tecnologías de la Información - SENA.</h3>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Un espacio moderno con excelente infraestructura tecnológica, ideal para el desarrollo de videojuegos y para fomentar la colaboración.
                        </p>
                        <div className="mt-8 inline-block px-6 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 font-mono text-sm tracking-widest uppercase">
                            Calle 52 N° 13 – 65, Bogotá, Colombia.
                        </div>
                    </motion.div>
                </div>

                {/* Sponsors Carousel Section (Full width for Marquee) */}
                <div className="w-full">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 container mx-auto px-4"
                    >
                        Patrocinadores
                    </motion.h2>

                    {/* Masked Container for Gradient Edges */}
                    <div className="relative w-full overflow-hidden mask-image-linear-to-r">
                        {/* Gradient Masks for edges */}
                        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

                        {/* Marquee Track */}
                        <motion.div
                            className="flex gap-8 w-max px-8"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 30,
                            }}
                        >
                            {carouselSponsors.map((sponsor, index) => (
                                <motion.div
                                    key={index}
                                    className="glass-panel w-[280px] h-[160px] p-6 rounded-3xl border border-white/5 flex items-center justify-center hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden flex-shrink-0"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Logo Image with Grayscale Filter */}
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="max-w-[80%] max-h-[80%]  group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-16 text-gray-400 text-lg container mx-auto px-4"
                    >
                        ¿Interesado en patrocinar? <a href="#" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/50">Contáctanos</a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
