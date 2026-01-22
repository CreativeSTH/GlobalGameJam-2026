import { useScroll } from 'framer-motion';

export function useScrollFrame() {
    const { scrollYProgress } = useScroll();
    return { scrollProgress: scrollYProgress };
}
