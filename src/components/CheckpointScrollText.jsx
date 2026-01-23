import { useTransform, motion } from 'framer-motion';

/**
 * CheckpointScrollText
 * Animates text character by character based on scroll progress.
 *
 * @param {string} text - The text to animate.
 * @param {MotionValue} scrollProgress - The scroll progress value (0-1).
 * @param {number} start - Scroll position where animation starts.
 * @param {number} end - Scroll position where animation ends.
 * @param {string} className - Class for the container.
 * @param {string} charClassName - Class for individual characters.
 */
export default function CheckpointScrollText({
    text,
    scrollProgress,
    start = 0,
    end = 1,
    className = "",
    charClassName = ""
}) {
    // Split text into characters
    const characters = text.split("");
    const totalChars = characters.length;

    return (
        <span className={`inline-block whitespace-nowrap ${className}`}>
            {characters.map((char, i) => {
                // Calculate timing for this specific character
                // We want them to cascade.
                // The entire sequence happens between 'start' and 'end'.
                // Each character takes up a portion of that time.

                const step = (end - start) / totalChars;
                // Add some overlap/width to the active window for each char
                const charStart = start + (step * i);
                const charEnd = charStart + step * 2; // Overlap factor 2x step size for smoothness

                // Clamp charEnd to not exceed 1 (optional, but good practice)
                const safeEnd = Math.min(charEnd, 1);

                return (
                    <CharItem
                        key={i}
                        char={char}
                        scrollProgress={scrollProgress}
                        range={[charStart, safeEnd]}
                        className={charClassName}
                    />
                );
            })}
        </span>
    );
}

function CharItem({ char, scrollProgress, range, className }) {
    // Map scroll progress to visual properties
    const opacity = useTransform(scrollProgress, range, [0, 1]);
    const y = useTransform(scrollProgress, range, [20, 0]);
    const filter = useTransform(scrollProgress, range, ["blur(8px)", "blur(0px)"]);
    const scale = useTransform(scrollProgress, range, [1.5, 1]);

    return (
        <motion.span
            style={{ opacity, y, filter, scale }}
            className={`inline-block ${char === " " ? "w-[0.2em]" : ""} ${className}`}
        >
            {char}
        </motion.span>
    );
}
