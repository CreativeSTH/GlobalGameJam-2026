import { useTransform, motion } from 'framer-motion';
import { useScrollFrame } from '../hooks/useScrollFrame';
import FinalCtaBlock from './FinalCtaBlock';
import CheckpointScrollText from './CheckpointScrollText';

// TextItem now only handles the EXIT phase (and container positioning)
// The children (CheckpointScrollText) handle the ENTRY phase.
function TextItem({ range, children, scrollProgress }) {
    const [start, peak, end] = range;

    // Exit transforms (Peak -> End)
    // When scroll is before peak, these values clamp to keyframe 0 (no effect).
    const opacity = useTransform(scrollProgress, [peak, end], [1, 0]);
    const scale = useTransform(scrollProgress, [peak, end], [1, 1.2]);
    const filter = useTransform(scrollProgress, [peak, end], ["blur(0px)", "blur(10px)"]);
    const y = useTransform(scrollProgress, [peak, end], [0, -50]);

    // Safety: Hide completely when far out of range to prevent overlap issues?
    // Using pointerEvents to disable interaction when faded.
    const pointerEvents = useTransform(scrollProgress, (v) => (v >= start && v < end) ? 'auto' : 'none');

    return (
        <motion.div
            style={{ opacity, scale, filter, y, pointerEvents }}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-40 text-center px-4"
        >
            {children}
        </motion.div>
    );
}

// Handles the entry animation of the Tagline container (background box)
function Tagline({ text, scrollProgress, start, end, className }) {
    // Animate container entry
    const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
    const y = useTransform(scrollProgress, [start, end], [20, 0]);
    const scale = useTransform(scrollProgress, [start, end], [0.9, 1]);

    return (
        <motion.div
            style={{ opacity, y, scale }}
            className={className}
        >
            <CheckpointScrollText
                text={text}
                scrollProgress={scrollProgress}
                start={start}
                end={end}
                className="text-white/90"
                charClassName="text-white/90"
            />
        </motion.div>
    );
}

export default function TextOverlay({ scrollProgress: externalProgress }) {
    const { scrollProgress: globalProgress } = useScrollFrame();

    // Prefer external progress (from Hero section) over global (whole page)
    const scrollProgress = externalProgress || globalProgress;

    // Styles
    const h1Base = "text-6xl md:text-[8rem] lg:text-[10rem] font-black uppercase leading-[0.9] mb-2 drop-shadow-2xl flex flex-col md:block";
    const spanGreen = "bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent inline-block";
    const spanWhite = "text-white inline-block";
    const pStyle = "text-sm md:text-3xl font-bold uppercase tracking-tight text-white/90 leading-tight w-[90%] md:max-w-5xl mx-auto bg-blue-900/40 py-2 md:py-4 px-4 md:px-8 backdrop-blur-md mt-0 shadow-lg";

    return (
        <>
            {/* 1. CREA MUNDOS 
                Range: 0 -> 0.15 (Entry) -> 0.20 (Pause) -> 0.30 (Exit)
            */}
            <TextItem range={[0, 0.20, 0.30]} scrollProgress={scrollProgress}>
                <h1 className={h1Base}>
                    <CheckpointScrollText
                        text="CREA"
                        scrollProgress={scrollProgress}
                        start={0.02} end={0.10}
                        className={spanGreen}
                        charClassName={spanGreen}
                    />
                    {' '}
                    <CheckpointScrollText
                        text="MUNDOS"
                        scrollProgress={scrollProgress}
                        start={0.05} end={0.15}
                        className={spanWhite}
                        charClassName={spanWhite}
                    />
                </h1>
                {/* 
                   Tagline also animates in.
                   We'll give it a simpler fade-in using CheckpointScrollText or just opacity? 
                   Let's use CheckpointScrollText for consistency but tight range.
                */}
                <Tagline
                    text="colabora y vive la experiencia"
                    scrollProgress={scrollProgress}
                    start={0.08} end={0.15}
                    className={pStyle}
                />
            </TextItem>

            {/* 2. EN SOLO 3 DÍAS 
                Range: 0.30 -> 0.45 (Entry) -> 0.50 (Pause) -> 0.60 (Exit)
            */}
            <TextItem range={[0.30, 0.50, 0.60]} scrollProgress={scrollProgress}>
                <div className="flex flex-col items-center">
                    <h1 className={h1Base}>
                        <CheckpointScrollText
                            text="EN SOLO"
                            scrollProgress={scrollProgress}
                            start={0.32} end={0.40}
                            className={spanWhite}
                            charClassName={spanWhite}
                        />
                        {' '}
                        <CheckpointScrollText
                            text="3 DÍAS"
                            scrollProgress={scrollProgress}
                            start={0.35} end={0.45}
                            className={spanGreen}
                            charClassName={spanGreen}
                        />
                    </h1>
                    <Tagline
                        text="de diversión pura, imaginación y pasión"
                        scrollProgress={scrollProgress}
                        start={0.38} end={0.45}
                        className={pStyle}
                    />
                </div>
            </TextItem>

            {/* 3. SORPRENDE 
                Range: 0.60 -> 0.70 (Entry) -> 0.75 (Pause) -> 0.85 (Exit)
            */}
            <TextItem range={[0.60, 0.75, 0.85]} scrollProgress={scrollProgress}>
                <h1 className={h1Base}>
                    <CheckpointScrollText
                        text="SORPRENDE"
                        scrollProgress={scrollProgress}
                        start={0.62} end={0.70}
                        className={spanGreen}
                        charClassName={spanGreen}
                    />
                </h1>
                <Tagline
                    text="un tema, una idea y creatividad infinita"
                    scrollProgress={scrollProgress}
                    start={0.65} end={0.70}
                    className={pStyle}
                />
            </TextItem>

            {/* 4. FINAL FIXED BLOCK */}
            <FinalCtaBlock scrollProgress={scrollProgress} />
        </>
    );
}
