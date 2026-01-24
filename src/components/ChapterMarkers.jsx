import { motion, useTransform } from 'framer-motion';

const chapters = [
    { id: 1, label: "CREA", start: 0.10, end: 0.35 },
    { id: 2, label: "3 DÍAS", start: 0.35, end: 0.65 },
    { id: 3, label: "SORPRENDE", start: 0.65, end: 0.82 },
    { id: 4, label: "GLOBAL", start: 0.82, end: 1.0 }
];

function Marker({ section, index, scrollProgress }) {
    // Fill logic:
    // When scroll is BEFORE start: 0%
    // When scroll is AT start: 0%
    // When scroll is AT end: 100%
    // When scroll is AFTER end: 100%
    // For the LAST item, it fills from its start to 1.0

    // We want the "filling" to be continuous.
    // If I'm at 0.5 (middle of section 2), section 1 bar should be full, section 2 bar should be 50% full.

    // Transform range: [start, end] -> [0, 1]
    const fillScale = useTransform(scrollProgress, [section.start, section.end], [0, 1]);

    // Opacity/Active State
    // Active if within range [start, end]
    const activeOpacity = useTransform(scrollProgress,
        [section.start - 0.05, section.start, section.end, section.end + 0.05],
        [0.3, 1, 1, 0.3]
    );

    const scrollToSection = () => {
        // Calculate pixel position
        // Hero is 800vh
        const h = window.innerHeight;
        const targetY = h * 8 * section.start + (h * 0.5); // Add a bit of offset to center it? 
        // Better: target purely section.start * 8 * h
        window.scrollTo({ top: h * 8 * section.start, behavior: 'smooth' });

    };

    return (
        <div
            className="group flex items-center gap-4 cursor-pointer relative py-2"
            onClick={scrollToSection}
        >
            {/* Label (Hidden by default, shown on hover or active on desktop) */}
            <motion.span
                style={{ opacity: activeOpacity }}
                className="hidden md:block text-[10px] font-bold tracking-widest text-teal-400 opacity-30 group-hover:opacity-100 transition-opacity whitespace-nowrap text-right w-20"
            >
                {section.label}
            </motion.span>

            {/* Bar/Dot Container */}
            {/* Mobile: w-3 h-3 circle. Desktop: w-12 h-1 bar (hover h-2) */}
            <div className="relative overflow-hidden transition-all duration-300
                            w-3 h-3 rounded-full bg-white/20
                            md:w-12 md:h-1 md:bg-white/10 md:group-hover:h-2">
                {/* Fill Bar */}
                <motion.div
                    style={{ scaleX: fillScale }}
                    className="absolute top-0 left-0 bottom-0 w-full bg-teal-400 origin-left"
                />
            </div>
        </div>
    );
}

export default function ChapterMarkers({ scrollProgress }) {
    // Only visible during hero section? 
    // Or at least, fill logic depends on it.
    // We can fade out the whole container if scrollProgress > 0.95 (Agenda start)
    const containerOpacity = useTransform(scrollProgress, [0.95, 0.98], [1, 0]);
    const pointerEvents = useTransform(scrollProgress, (v) => v > 0.95 ? 'none' : 'auto');

    return (
        <motion.div
            style={{ opacity: containerOpacity, pointerEvents }}
            className="fixed z-[80] flex flex-row md:flex-col gap-4 items-center md:items-end 
                       bottom-6 left-1/2 -translate-x-1/2 
                       md:bottom-auto md:left-auto md:translate-x-0 md:top-1/2 md:-translate-y-1/2 md:right-8"
        >
            {chapters.map((chapter, i) => (
                <Marker
                    key={chapter.id}
                    section={chapter}
                    index={i}
                    scrollProgress={scrollProgress}
                />
            ))}
        </motion.div>
    );
}
