import { motion, useTransform } from 'framer-motion';

export default function ScrollIndicator({ isLoading, scrollProgress }) {
    // Fade out immediately as user starts scrolling (0% -> 5%)
    const opacity = useTransform(scrollProgress, [0, 0.05], [1, 0]);
    // Slide down slightly while fading out
    const y = useTransform(scrollProgress, [0, 0.05], [0, 20]);

    if (isLoading) return null;

    return (
        <motion.div
            style={{ opacity, y }}
            className="fixed bottom-12 left-0 w-full z-50 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
        >
            {/* Mouse Icon - Scaled Up for better visibility */}
            <div className="w-10 h-16 border-[3px] border-white rounded-full flex justify-center p-2 mb-4 shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                <motion.div
                    className="w-1.5 h-3 bg-teal-400 rounded-full"
                    animate={{
                        y: [0, 18, 0],
                        opacity: [1, 0, 1] // Fade out at bottom of scroll
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Text Hint - Larger and clearer */}
            <p className="text-white text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-center pl-1">
                Scroll Para Iniciar
            </p>

            {/* Chevron pointing down */}
            <motion.div
                className="mt-3 text-teal-400"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </motion.div>
        </motion.div>
    );
}
