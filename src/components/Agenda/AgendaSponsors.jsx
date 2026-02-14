import { motion } from 'framer-motion';
import { sponsorsData } from '../../data/sponsors';

export default function AgendaSponsors({ isMobile, opacity, y }) {
    // Duplicate for infinite carousel loop
    const carouselSponsors = [...sponsorsData, ...sponsorsData];

    return (
        <motion.div
            style={{ opacity: isMobile ? 1 : opacity, y: isMobile ? 0 : y }}
            className={`${isMobile ? 'relative mt-32 mb-20' : 'absolute top-[45vh]'} w-full flex flex-col items-center justify-center pointer-events-none`}
        >
            <div className="w-full pointer-events-auto">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center container mx-auto px-4">
                    Patrocinadores
                </h2>
                <div className="relative w-full overflow-hidden mask-image-linear-to-r">
                    <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

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
                                className="glass-panel w-[280px] h-[160px] p-6 rounded-3xl border border-white/5 flex items-center justify-center hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden flex-shrink-0 bg-black/40 backdrop-blur-md"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Logo Image with Grayscale Filter */}
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    style={{ transform: `scale(${sponsor.scale || 1})` }}
                                    className="max-w-[80%] max-h-[80%] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="mt-16 text-gray-400 text-lg text-centerContainer mx-auto px-4 text-center"
                >
                    ¿Interesado en patrocinar? <a href="#" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/50">Contáctanos</a>
                </motion.div>
            </div>
        </motion.div>
    );
}
