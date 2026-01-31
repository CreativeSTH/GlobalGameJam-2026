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

const sponsors = [
    { name: "Global Game Jam", logo: "/sponsors/ggj.png", scale: 1.5 },
    { name: "SENA", logo: "/sponsors/sena.svg" },
    { name: "CreativeSTH", logo: "/sponsors/creativesth.svg" },
    { name: "Unity", logo: "/sponsors/unity.svg" },
    { name: "Epic Games", logo: "/sponsors/epic.png" },
    { name: "Andrea Riaño", logo: "/sponsors/andreaRiano.png", scale: 1.5 },
    { name: "Codevco", logo: "/sponsors/codevco.png" },
];
// Duplicate for infinite loop
const carouselSponsors = [...sponsors, ...sponsors];

export default function AgendaSection() {
    const sectionRef = useRef(null);

    // Scroll tracking
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

    // Horizontal Scroll
    const x = useTransform(
        scrollYProgress,
        [0.1, 0.4],
        isMobile ? ["100%", "-100%"] : ["10%", "-25%"]
    );
    const agendaOpacity = useTransform(scrollYProgress, [0.4, 0.45], [1, 0]);

    // Sede Animations
    const sedeOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
    const sedeY = useTransform(scrollYProgress, [0.45, 0.6, 0.9], [100, 0, -500]);

    // Sponsors Animations
    const sponsorsOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
    const sponsorsY = useTransform(scrollYProgress, [0.75, 0.9], [100, 0]);

    return (
        <section ref={sectionRef} id="agenda-section" className="relative w-full h-[600vh] z-[60]">

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
                <div className="relative z-10 w-full flex flex-col items-center">

                    {/* Fixed Title Section */}
                    <motion.div style={{ opacity: agendaOpacity }} className="mb-12 md:mb-20 text-center px-4">
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
                    </motion.div>

                    {/* Horizontal Track */}
                    <motion.div
                        style={{ x, opacity: agendaOpacity }}
                        className="flex gap-8 md:gap-12 px-[10vw] w-max"
                    >
                        {schedule.map((day, i) => (
                            <AgendaCard key={i} {...day} />
                        ))}
                    </motion.div>

                    {/* Sede Section */}
                    <motion.div
                        style={{ opacity: sedeOpacity, y: sedeY }}
                        className="absolute top-[40vh] w-full flex flex-col items-center justify-center pointer-events-none"
                    >
                        {/* Enable pointer events for the content card */}
                        <div className="container mx-auto px-4 max-w-6xl pointer-events-auto">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-center">
                                Nuestra <span className="text-emerald-400">Sede</span>
                            </h2>

                            <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 bg-black/20 backdrop-blur-md flex flex-col items-center text-center">
                                {/* Hover Glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-400/20 transition-colors duration-700 pointer-events-none" />

                                <h3 className="text-3xl font-bold text-white mb-4">Centro de Gestión de Mercados, Logística y Tecnologías de la Información - SENA.</h3>
                                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                    Un espacio moderno con excelente infraestructura tecnológica, ideal para el desarrollo de videojuegos y para fomentar la colaboración.
                                </p>
                                <div className="mt-8 inline-block px-6 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 font-mono text-sm tracking-widest uppercase">
                                    Calle 52 N° 13 – 65, Bogotá, Colombia.
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sponsors Section */}
                    <motion.div
                        style={{ opacity: sponsorsOpacity, y: sponsorsY }}
                        className="absolute top-[55vh] w-full flex flex-col items-center justify-center pointer-events-none"
                    >
                        <div className="w-full pointer-events-auto">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center container mx-auto px-4">
                                Patrocinadores
                            </h2>
                            <div className="relative w-full overflow-hidden mask-image-linear-to-r">
                                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

                                <motion.div
                                    className="flex gap-8 w-max px-8"
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{
                                        repeat: Infinity,
                                        ease: "linear",
                                        duration: 30,
                                    }}
                                >
                                    {carouselSponsors.map((sponsor, index) => (
                                        <motion.div
                                            key={index}
                                            className="glass-panel w-[280px] h-[160px] p-6 rounded-3xl border border-white/5 flex items-center justify-center hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden flex-shrink-0 bg-black/40 backdrop-blur-md"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Logo Image with Grayscale Filter */}
                                            <img
                                                src={sponsor.logo}
                                                alt={sponsor.name}
                                                style={{ transform: `scale(${sponsor.scale || 1})` }}
                                                className="max-w-[80%] max-h-[80%] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            <motion.div
                                className="mt-16 text-gray-400 text-lg text-centerContainer mx-auto px-4 text-center"
                            >
                                ¿Interesado en patrocinar? <a href="#" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/50">Contáctanos</a>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div >
        </section >
    );
}
