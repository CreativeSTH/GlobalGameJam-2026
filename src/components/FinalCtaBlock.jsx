import { useRef, useLayoutEffect } from 'react';
import { useTransform, motion, useMotionValueEvent } from 'framer-motion';
import gsap from 'gsap';
import Navbar from './Navbar';

export default function FinalCtaBlock({ scrollProgress }) {
    // Refs for GSAP animation
    const containerRef = useRef(null);
    const tlRef = useRef(null);

    // GSAP Setup
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            tlRef.current = gsap.timeline({ paused: true });

            const spans = gsap.utils.selector(containerRef)(".anim-text-span");

            // Animation: Move + Skew (No Opacity as requested)
            // Starts "below" and skewed, moves to natural position smoothly.
            tlRef.current.fromTo(spans,
                {
                    y: 100,
                    skewY: 10,
                    transformOrigin: "left bottom"
                },
                {
                    y: 0,
                    skewY: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power3.out"
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Trigger animation based on scroll progress
    useMotionValueEvent(scrollProgress, "change", (latest) => {
        if (!tlRef.current) return;
        // Trigger point: 0.81 (just after appearance starts)
        if (latest > 0.81) {
            tlRef.current.play();
        } else {
            tlRef.current.reverse();
        }
    });

    // Final section Animations
    // Starts exactly when "Sorprende" finishes disappearing (0.80)
    // Fades in smoothly over 8% of the massive 1000vh scroll (approx 80vh of distance)
    const opacity = useTransform(scrollProgress, [0.80, 0.88], [0, 1]);
    const y = useTransform(scrollProgress, [0.80, 0.88], [30, 0]); // Reduced movement for elegance
    const pointerEvents = useTransform(scrollProgress, (v) => v > 0.80 ? 'auto' : 'none');

    return (
        <motion.div
            style={{ opacity, y, pointerEvents }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-4 bg-black/60 backdrop-blur-sm"
            ref={containerRef}
        >
            {/* Modular Navbar is now handled in App.jsx for global sticky context */}

            {/* Date Pill (Margin Top added to clear navbar) */}
            <div className="mb-8 px-6 py-2 rounded-full border border-teal-500/30 bg-teal-950/30 text-teal-400 text-sm md:text-base font-mono tracking-widest uppercase">
                30 ENE — 01 FEB 2026
            </div>

            {/* Main Title with Gradients */}
            <div className="relative mb-2 flex flex-col items-center">
                {/* Note: In a real "reveal" effect, we would probably overflow-hidden these H1s, 
                    but just animating the spans (words) up feels very dynamic too. */}
                <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] flex flex-wrap justify-center gap-x-4">
                    <span className="anim-text-span bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent block md:inline-block">
                        Global
                    </span>
                    <span className="anim-text-span text-white block md:inline-block">
                        Game Jam
                    </span>
                </h1>
                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-2">
                    <span className="anim-text-span bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent inline-block">
                        Bogotá 2026
                    </span>
                </h1>
            </div>

            {/* Blue Strip / Tagline */}
            <div className="mt-8 mb-10 bg-blue-900/40 py-3 px-8 backdrop-blur-md max-w-2xl mx-auto">
                <p className="anim-text-span text-lg md:text-2xl text-blue-100 font-medium inline-block">
                    Crea, juega y conecta. <strong className="text-white">48 horas</strong> de pura diversión.
                </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-6 mt-4">
                <button className="px-10 py-4 bg-[#FFDD55] hover:bg-[#ffc800] text-black font-black text-xl tracking-wide rounded-lg transform hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,221,85,0.4)] uppercase">
                    Inscribirse Ahora
                </button>
                {/* Optional secondary button to match image reference mostly */}
                <button className="px-10 py-4 bg-transparent border-2 border-teal-500/50 text-teal-400 hover:bg-teal-950/50 font-bold text-xl tracking-wide rounded-lg transform hover:scale-105 transition-all uppercase">
                    Ver Agenda
                </button>
            </div>

        </motion.div>
    );
}
