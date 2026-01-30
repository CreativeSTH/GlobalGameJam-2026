import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GradientMesh from './GradientMesh';

const sponsors = [
    { name: "Sponsor 1", logo: "https://placehold.co/200x100/10b981/ffffff?text=Sponsor+1" },
    { name: "Sponsor 2", logo: "https://placehold.co/200x100/8b5cf6/ffffff?text=Sponsor+2" },
    { name: "Sponsor 3", logo: "https://placehold.co/200x100/3b82f6/ffffff?text=Sponsor+3" },
    { name: "Sponsor 4", logo: "https://placehold.co/200x100/f59e0b/ffffff?text=Sponsor+4" },
];

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
                className="relative z-10 container mx-auto px-4 text-center max-w-6xl"
            >
                {/* Venue Section */}
                <div className="mb-24">
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

                        <h3 className="text-3xl font-bold text-white mb-4">Universidad El Bosque</h3>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            El Hub de Innovación y Tecnología será el epicentro de la creatividad.
                            Un espacio diseñado para inspirar y conectar a los desarrolladores.
                        </p>
                        <div className="mt-8 inline-block px-6 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 font-mono text-sm tracking-widest uppercase">
                            Bogotá, Colombia
                        </div>
                    </motion.div>
                </div>

                {/* Sponsors Section */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12"
                    >
                        Patrocinadores
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sponsors.map((sponsor, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-panel p-8 rounded-3xl border border-white/5 flex items-center justify-center hover:border-purple-500/30 transition-all duration-500 group relative overflow-hidden h-40"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="text-white/50 group-hover:text-white transition-colors font-bold z-10">
                                    {sponsor.name}
                                </span>
                                {/* Placeholder for Logo Image */}
                                {/* <img src={sponsor.logo} alt={sponsor.name} className="max-w-[80%] max-h-[80%] opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" /> */}
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-16 text-gray-400 text-lg"
                    >
                        ¿Interesado en patrocinar? <a href="#" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/50">Contáctanos</a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
