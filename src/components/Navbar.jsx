import { useState } from 'react';
import { motion, AnimatePresence, useTransform } from 'framer-motion';

export default function Navbar({ heroRef, scrollProgress }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Visibility sync with FinalCtaBlock (starts exactly at 0.80)
    // Matches FinalCtaBlock opacity range [0.80, 0.88] perfectly.
    const opacity = useTransform(scrollProgress, [0.80, 0.88], [0, 1]);
    const pointerEvents = useTransform(scrollProgress, (v) => v > 0.80 ? 'auto' : 'none');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Animation variants
    const navVariants = {
        floating: {
            width: '95%',
            maxWidth: '1152px',
            borderRadius: '9999px',
            top: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };

    return (
        <>
            <motion.nav
                style={{ opacity, pointerEvents }}
                initial="floating"
                animate="floating"
                variants={navVariants}
                className="fixed left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#32656500] via-[#2a3249]/50 to-[#0f1523]/70 backdrop-blur-2xl backdrop-saturate-150 px-6 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] z-[100]"
            >
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-teal-400 font-black text-xl tracking-tighter drop-shadow-sm">GGJ</span>
                    <span className="text-white font-bold text-xl tracking-tight drop-shadow-sm">BOGOTÁ</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { label: '¿Qué es?', target: 'que-es-section', offsetRatio: 0 },
                        { label: 'Agenda', target: 'agenda-section', offsetRatio: 0 },
                        { label: 'Sede', target: 'agenda-section', offsetRatio: 0.55 }, // Sede appears mid-scroll
                    ].map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                const element = document.getElementById(item.target);
                                if (!element) return;

                                const targetPosition = element.offsetTop + (element.offsetHeight * item.offsetRatio);
                                const startPosition = window.scrollY;
                                const distance = targetPosition - startPosition;
                                const duration = 2000; // 2 seconds slow scroll
                                let startTime = null;

                                function animation(currentTime) {
                                    if (startTime === null) startTime = currentTime;
                                    const timeElapsed = currentTime - startTime;

                                    // Ease In Out Quad
                                    const ease = (t, b, c, d) => {
                                        t /= d / 2;
                                        if (t < 1) return c / 2 * t * t + b;
                                        t--;
                                        return -c / 2 * (t * (t - 2) - 1) + b;
                                    };

                                    const run = ease(timeElapsed, startPosition, distance, duration);
                                    window.scrollTo(0, run);

                                    if (timeElapsed < duration) requestAnimationFrame(animation);
                                }

                                requestAnimationFrame(animation);
                            }}
                            className="text-gray-200 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors relative group bg-transparent border-none cursor-pointer"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full" />
                        </button>
                    ))}
                </div>

                {/* Desktop CTA */}
                <button className="hidden md:block bg-[#FFDD55] hover:bg-[#ffc800] text-black font-black text-sm uppercase tracking-wider px-6 py-2.5 rounded-full transition-transform hover:scale-105 shadow-lg shadow-yellow-500/20">
                    Ver Evento en Vivo
                </button>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white p-2 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <div className="w-6 flex flex-col items-end gap-1.5">
                        <motion.span
                            animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                            className="w-full h-0.5 bg-white block origin-center transition-transform"
                        />
                        <motion.span
                            animate={{ opacity: isMenuOpen ? 0 : 1 }}
                            className="w-3/4 h-0.5 bg-teal-400 block transition-opacity"
                        />
                        <motion.span
                            animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                            className="w-full h-0.5 bg-white block origin-center transition-transform"
                        />
                    </div>
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-24 inset-x-0 mx-auto w-[90%] max-w-sm bg-gradient-to-br from-[#1a233b]/90 to-[#0f1523]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] md:hidden z-[90] flex flex-col gap-4 items-center"
                    >
                        {[
                            { label: '¿Qué es?', target: 'que-es-section', offsetRatio: 0 },
                            { label: 'Agenda', target: 'agenda-section', offsetRatio: 0 },
                            { label: 'Sede', target: 'agenda-section', offsetRatio: 0.55 },
                        ].map((item) => (
                            <button
                                key={item.label}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    const element = document.getElementById(item.target);
                                    if (!element) return;

                                    const targetPosition = element.offsetTop + (element.offsetHeight * item.offsetRatio);
                                    const startPosition = window.scrollY;
                                    const distance = targetPosition - startPosition;
                                    const duration = 2000;
                                    let startTime = null;

                                    function animation(currentTime) {
                                        if (startTime === null) startTime = currentTime;
                                        const timeElapsed = currentTime - startTime;
                                        const ease = (t, b, c, d) => {
                                            t /= d / 2;
                                            if (t < 1) return c / 2 * t * t + b;
                                            t--;
                                            return -c / 2 * (t * (t - 2) - 1) + b;
                                        };
                                        const run = ease(timeElapsed, startPosition, distance, duration);
                                        window.scrollTo(0, run);
                                        if (timeElapsed < duration) requestAnimationFrame(animation);
                                    }
                                    requestAnimationFrame(animation);
                                }}
                                className="text-gray-100 hover:text-teal-400 font-bold text-lg uppercase tracking-wide py-2 bg-transparent border-none cursor-pointer"
                            >
                                {item.label}
                            </button>
                        ))}
                        <div className="w-full h-px bg-white/10 my-2" />
                        <button className="w-full bg-[#FFDD55] hover:bg-[#ffc800] text-black font-black text-sm uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-yellow-500/20">
                            Ver Evento en Vivo
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
