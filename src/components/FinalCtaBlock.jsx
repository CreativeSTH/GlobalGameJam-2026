import { useTransform, motion } from 'framer-motion';
import CheckpointScrollText from './CheckpointScrollText';

export default function FinalCtaBlock({ scrollProgress }) {

    // Final section Animations
    // Starts exactly when "Sorprende" finishes disappearing (0.80)
    // Fades in smoothly over 8% of the massive 1000vh scroll
    // Remains visible until covered by next section (Curtain Effect)
    const opacity = useTransform(scrollProgress, [0.80, 0.88], [0, 1]);
    const y = useTransform(scrollProgress, [0.80, 0.88], [30, 0]); // Reduced movement for elegance
    const pointerEvents = useTransform(scrollProgress, (v) => (v > 0.80) ? 'auto' : 'none');

    return (
        <motion.div
            style={{ opacity, y, pointerEvents }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-4 bg-black/60 backdrop-blur-sm final-cta-overlay"
        >
            {/* Modular Navbar is now handled in App.jsx for global sticky context */}

            {/* Date Pill (Margin Top added to clear navbar) */}
            <div className="mb-8 px-6 py-2 rounded-full border border-teal-500/30 bg-teal-950/30 text-teal-400 text-sm md:text-base font-mono tracking-widest uppercase">
                30 ENE — 01 FEB 2026
            </div>

            {/* Main Title with Gradients */}
            <div className="relative mb-2 flex flex-col items-center">
                <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] flex flex-wrap justify-center gap-x-4">
                    <CheckpointScrollText
                        text="Global"
                        scrollProgress={scrollProgress}
                        start={0.81}
                        end={0.85}
                        className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent block md:inline-block"
                        charClassName="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent"
                    />
                    <CheckpointScrollText
                        text="Game Jam"
                        scrollProgress={scrollProgress}
                        start={0.82}
                        end={0.86}
                        className="text-white block md:inline-block"
                        charClassName="text-white"
                    />
                </h1>
                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-2">
                    <CheckpointScrollText
                        text="Bogotá 2026"
                        scrollProgress={scrollProgress}
                        start={0.83}
                        end={0.88}
                        className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent inline-block"
                        charClassName="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent"
                    />
                </h1>
            </div>

            {/* Blue Strip / Tagline */}
            <div className="mt-8 mb-10 bg-blue-900/40 py-3 px-8 backdrop-blur-md  max-w-2xl mx-auto">
                <p className="anim-text-span text-lg md:text-2xl text-blue-100 font-medium inline-block">
                    Crea, juega y conecta. <strong className="text-white">48 horas</strong> de pura diversión.
                </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-6 mt-4">
                <button className="px-10 py-4 bg-[#FFDD55] hover:bg-[#ffc800] text-black font-black text-xl tracking-wide rounded-full transform hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,221,85,0.4)] uppercase">
                    Inscribirse Ahora
                </button>
                {/* Optional secondary button to match image reference mostly */}
                <button className="px-10 py-4 bg-transparent border-2 border-teal-500/50 text-teal-400 hover:bg-teal-950/50 font-bold text-xl tracking-wide rounded-full transform hover:scale-105 transition-all uppercase">
                    Ver Agenda
                </button>
            </div>

        </motion.div>
    );
}
