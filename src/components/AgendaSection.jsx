import { useRef, useState, useEffect, Suspense } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import GradientMesh from './GradientMesh';
import AgendaCard from './AgendaCard';
import ArcadeMachineModel from './ArcadeMachineModel';

const schedule = [
    {
        day: "Viernes",
        date: "30",
        month: "Enero 2026",
        events: [
            { time: "01:00pm - 02:00pm", title: "Ingreso de Participantes", type: "default" },
            { time: "02:00pm - 04:00pm", title: "Ceremonia de Apertura", type: "workshop" },
            { time: "04:00pm - 10:00pm", title: "Desarrollo de Videojuegos", type: "highlight" },
        ]
    },
    {
        day: "Sábado",
        date: "31",
        month: "Enero 2026",
        events: [
            { time: "06:00am - 12:00pm", title: "Desarrollo de Videojuegos", type: "highlight" },
            { time: "12:00pm - 01:00pm", title: "Almuerzo", type: "jam" },
            { time: "01:00pm - 05:00pm", title: "Desarrollo de Videojuegos", type: "highlight" },
            { time: "05:00pm - 06:00pm", title: "Break", type: "jam" },
            { time: "06:00pm - 08:00pm", title: "Desarrollo de Videojuegos", type: "highlight" }
        ]
    },
    {
        day: "Domingo",
        date: "01",
        month: "Febrero 2026",
        events: [
            { time: "06:30am - 12:00pm", title: "Desarrollo de Videojuegos", type: "highlight" },
            { time: "12:00pm - 01:00pm", title: "Almuerzo", type: "jam" },
            { time: "01:30pm - 02:30pm", title: "Desarrollo de Videojuegos", type: "highlight" },
            { time: "02:30pm - 06:00pm", title: "Clausura y Showcases", type: "workshop" }
        ]
    }
];

export default function AgendaSection() {
    const sectionRef = useRef(null);

    // Track scroll progress for the ENTIRE section height
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
        layoutEffect: false
    });

    // Horizontal Scroll Logic
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Desktop: ["10%", "-55%"] (Partial view)
    // Mobile: ["100%", "-100%"] (Full slide from right to left)
    const x = useTransform(
        scrollYProgress,
        [0.15, 0.95],
        isMobile ? ["100%", "-100%"] : ["10%", "-25%"]
    );
    const opacity = useTransform(scrollYProgress, [0.95, 1], [1, 1]); // Keep visible at end

    return (
        <section ref={sectionRef} id="agenda-section" className="relative w-full h-[400vh] z-[60]">

            {/* Sticky Container */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">

                {/* Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <GradientMesh />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                    {/* 3D Model Layer - Positioned to be visible but not obstructing */}
                    <div className="absolute inset-0 z-[5] opacity-80 md:opacity-100 mix-blend-lighten">
                        <Suspense fallback={null}>
                            <ArcadeMachineModel scrollProgress={scrollYProgress} />
                        </Suspense>
                    </div>
                </div>

                {/* Content Container */}
                <motion.div style={{ opacity }} className="relative z-10 w-full flex flex-col items-center">

                    {/* Fixed Title Section */}
                    <div className="mb-12 md:mb-20 text-center px-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
                        >
                            <span className="text-emerald-400 drop-shadow-xl">Agenda</span> <span className="text-white drop-shadow-xl">Oficial</span>
                        </motion.h2>
                        <motion.p
                            style={{ opacity: useTransform(scrollYProgress, [0.1, 0.15], [0, 1]) }}
                            className="text-blue-200 mt-4 text-lg md:text-xl font-medium max-w-xl mx-auto"
                        >
                            Desliza para explorar el cronograma del evento
                        </motion.p>
                    </div>

                    {/* Horizontal Track */}
                    <motion.div
                        style={{ x }}
                        className="flex gap-8 md:gap-12 px-[10vw] w-max"
                    >
                        {schedule.map((day, i) => (
                            <AgendaCard key={i} {...day} />
                        ))}
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
