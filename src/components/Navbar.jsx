import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform } from 'framer-motion';

export default function Navbar({ scrollProgress }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // Visibility sync with FinalCtaBlock (starts at 0.80 after "Sorprende" exit)
    // Only apply if scrollProgress prop is provided. If used elsewhere without it, default to visible.
    const opacity = scrollProgress ? useTransform(scrollProgress, [0.80, 0.88], [0, 1]) : 1;
    const pointerEvents = scrollProgress ? useTransform(scrollProgress, (v) => v > 0.80 ? 'auto' : 'none') : 'auto';

    // Detect scroll for Sticky state
    useEffect(() => {
        const handleScroll = () => {
            const agenda = document.getElementById('agenda-section');
            if (agenda) {
                const rect = agenda.getBoundingClientRect();
                // Sticky trigger slightly before agenda reaches top to animate smoothly
                setIsSticky(rect.top <= 100);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        },
        sticky: {
            width: '100%',
            maxWidth: '100%',
            borderRadius: '0px',
            top: '0px',
            border: '0px solid rgba(255,255,255,0)',
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };

    return (
        <>
            <motion.nav
                style={{ opacity, pointerEvents }}
                initial="floating"
                animate={isSticky ? "sticky" : "floating"}
                variants={navVariants}
                className="fixed left-1/2 -translate-x-1/2 bg-[#0f1523]/90 backdrop-blur-md px-6 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-2xl z-[100]"
            >
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-teal-400 font-black text-xl tracking-tighter">GGJ</span>
                    <span className="text-white font-bold text-xl tracking-tight">BOGOTÁ</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {['¿Qué es?', 'Agenda', 'Sede'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`} className="text-gray-300 hover:text-teal-400 font-medium text-sm uppercase tracking-wide transition-colors">
                            {item}
                        </a>
                    ))}
                </div>

                {/* Desktop CTA */}
                <button className="hidden md:block bg-[#FFDD55] hover:bg-[#ffc800] text-black font-black text-sm uppercase tracking-wider px-6 py-2.5 rounded-full transition-transform hover:scale-105">
                    Inscribirse
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
                        className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[#0f1523] border border-white/10 rounded-2xl p-6 shadow-2xl md:hidden z-[90] flex flex-col gap-4 items-center"
                    >
                        {['¿Qué es?', 'Agenda', 'Sede'].map((item) => (
                            <a key={item} href="#" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-teal-400 font-bold text-lg uppercase tracking-wide py-2">
                                {item}
                            </a>
                        ))}
                        <div className="w-full h-px bg-white/10 my-2" />
                        <button className="w-full bg-[#FFDD55] hover:bg-[#ffc800] text-black font-black text-sm uppercase tracking-wider px-6 py-3 rounded-xl">
                            Inscribirse
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
