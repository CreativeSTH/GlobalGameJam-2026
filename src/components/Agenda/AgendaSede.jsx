import { motion } from 'framer-motion';

export default function AgendaSede({ isMobile, opacity, y }) {
    return (
        <motion.div
            style={{ opacity: isMobile ? 1 : opacity, y: isMobile ? 0 : y }}
            className={`${isMobile ? 'relative mt-32 px-4' : 'absolute top-[40vh]'} w-full flex flex-col items-center justify-center pointer-events-none`}
        >
            <div className="container mx-auto max-w-6xl pointer-events-auto">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-center">
                    Nuestra <span className="text-emerald-400">Sede</span>
                </h2>

                <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 bg-black/20 backdrop-blur-md flex flex-col items-center text-center">
                    {/* Hover Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-400/20 transition-colors duration-700 pointer-events-none" />

                    <h3 className="text-3xl font-bold text-white mb-4">Centro de Gestión de Mercados, Logística y Tecnologías de la Información - SENA.</h3>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Un espacio moderno con excelente infraestructura tecnológica, ideal para el desarrollo de videojuegos y para fomentar la colaboración.
                    </p>
                    <div className="mt-8 inline-block px-6 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 font-mono text-sm tracking-widest uppercase">
                        Calle 52 N° 13 – 65, Bogotá, Colombia.
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
