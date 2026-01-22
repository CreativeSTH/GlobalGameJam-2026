import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useScrollFrame } from '../hooks/useScrollFrame';
import { useMotionValueEvent } from 'framer-motion';
import FinalCtaBlock from './FinalCtaBlock';

function TextItem({ range, children, scrollProgress }) {
    const [start, peak, end] = range;
    const containerRef = useRef(null);
    const tlRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Create a timeline that will be scrubbed by scrollProgress
            tlRef.current = gsap.timeline({ paused: true });

            // Animation: Blur reveal + Scale up + Fade in
            // "Incredible" style: Start blurred, spaced out, and small. End sharp and normal.
            const q = gsap.utils.selector(containerRef);

            // Entry (Start -> Peak)
            tlRef.current
                .fromTo(containerRef.current,
                    { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
                    { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
                )
                // Exit (Peak -> End)
                .to(containerRef.current,
                    { opacity: 0, scale: 1.1, filter: "blur(5px)", y: -50, duration: 1, ease: "power2.in" }
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useMotionValueEvent(scrollProgress, "change", (latest) => {
        if (!tlRef.current) return;

        // Map global scroll (latest) to local range [start, end]
        // We want the whole timeline (entry + exit) to play across [start, end]
        // Entry is first half, Exit is second half roughly?
        // Let's rely on the timeline's duration structure. 
        // Total duration = 2. range = end - start.

        // Normalize 'latest' to 0-1 within [start, end]
        let norm = (latest - start) / (end - start);

        // Clamp
        norm = Math.min(Math.max(norm, 0), 1);

        tlRef.current.progress(norm);
    });

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none flex flex-col items-center justify-center z-40 text-center px-4 opacity-0"
        >
            {children}
        </div>
    );
}

export default function TextOverlay() {
    const { scrollProgress } = useScrollFrame();

    // Updated Styles to match FinalCtaBlock
    // H1: Inter Black, Tighter, Uppercase. Base style for container.
    const h1Base = "text-6xl md:text-[8rem] lg:text-[10rem] font-black uppercase  leading-[0.9] mb-2 drop-shadow-2xl";
    // Green Gradient Span
    const spanGreen = "bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent inline-block";
    // White Span
    const spanWhite = "text-white inline-block";

    // P: Homogenized to match the "tagline" feel but kept impactful. 
    // Reduced top margin (mt-6 -> mt-0) to bring it closer to H1 as requested.
    const pStyle = "text-xl md:text-3xl font-bold uppercase tracking-tight text-white/90 leading-tight max-w-5xl mx-auto bg-blue-900/40 py-4 px-8 backdrop-blur-md mt-0 shadow-lg";

    return (
        <>
            {/* 1. CREA MUNDOS */}
            <TextItem range={[0, 0.15, 0.25]} scrollProgress={scrollProgress}>
                <h1 className={h1Base}>
                    <span className={spanGreen}>CREA</span>{' '}
                    <span className={spanWhite}>MUNDOS</span>
                </h1>
                <p className={pStyle}>colabora y vive la experiencia</p>
            </TextItem>

            {/* 2. EN SOLO 3 DÍAS */}
            <TextItem range={[0.30, 0.45, 0.55]} scrollProgress={scrollProgress}>
                <div className="flex flex-col items-center">
                    <h1 className={h1Base}>
                        <span className={spanWhite}>EN SOLO</span>{' '}
                        <span className={spanGreen}>3 DÍAS</span>
                    </h1>
                    <p className={pStyle}>de diversión pura, imaginación y pasión</p>
                </div>
            </TextItem>

            {/* 3. SORPRENDE */}
            <TextItem range={[0.60, 0.70, 0.80]} scrollProgress={scrollProgress}>
                <h1 className={h1Base}>
                    <span className={spanGreen}>SORPRENDE</span>
                </h1>
                <p className={pStyle}>un tema, una idea y creatividad infinita</p>
            </TextItem>

            {/* 4. FINAL FIXED BLOCK */}
            <FinalCtaBlock scrollProgress={scrollProgress} />
        </>
    );
}
