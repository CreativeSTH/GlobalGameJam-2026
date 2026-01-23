import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SmartScrollButton() {
    const [state, setState] = useState('hidden'); // 'hidden', 'toTop', 'toCTA'

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            const h = window.innerHeight;
            const heroHeight = h * 15; // 1500vh roughly

            // Where the CTA is located (approx 83% of hero section which starts at 0)
            // But wait, Hero is 1500vh tall. 
            // The animation runs from 0% to 100% of that height.
            // CTA appears at 0.81 -> 0.81 * 1500vh = 1215vh.
            const ctaPosition = h * 12.15;

            // Logic:
            // 1. If we are deep down (past the hero/CTA zone), show "Back to CTA"
            // Let's say past 1350vh.
            if (y > h * 13.5) {
                setState('toCTA');
            }
            // 2. If we are in the zone between start and end of hero, show "Back to Top"
            // But mostly we care about being AT the CTA.
            // If we are significantly scrolled (e.g. > 100vh) but not yet past the CTA zone significantly?
            // User said "estando en FinalCtaBlock".
            else if (y > h * 1) {
                setState('toTop');
            }
            // 3. If at top
            else {
                setState('hidden');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToCTA = () => {
        const h = window.innerHeight;
        // Target roughly 84% of Hero (where CTA is fully visible and nice)
        window.scrollTo({ top: h * 12.6, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {state !== 'hidden' && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={state === 'toCTA' ? scrollToCTA : scrollToTop}
                    className="fixed bottom-8 right-8 z-[110] p-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-md group"
                    style={{
                        background: state === 'toCTA'
                            ? 'linear-gradient(135deg, rgba(255, 221, 85, 0.2), rgba(255, 221, 85, 0.1))'
                            : 'linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(45, 212, 191, 0.1))'
                    }}
                >
                    {/* Icons */}
                    {state === 'toCTA' ? (
                        // Arrow pointing UP but maybe specialized? Or just Up arrow with label?
                        // User said "Subir al home" (implying going up to CTA).
                        <div className="flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFDD55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 19V5" />
                                <path d="m5 12 7-7 7 7" />
                            </svg>
                            <span className="text-[10px] font-bold text-[#FFDD55] uppercase tracking-wider">CTA</span>
                        </div>
                    ) : (
                        // Arrow pointing UP to Top
                        <div className="flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 19V5" />
                                <path d="m5 12 7-7 7 7" />
                                <path d="M5 5h14" />
                            </svg>
                            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">Inicio</span>
                        </div>
                    )}
                </motion.button>
            )}
        </AnimatePresence>
    );
}
