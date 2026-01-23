import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import GradientMesh from './GradientMesh';


const projects = [
    {
        title: "Neon Cyber Pulse",
        team: "Pixel Punks",
        image: "/games/halo.jpg", // Teal/Cyberpunk
    },
    {
        title: "Echoes of Void",
        team: "Deep Space Devs",
        image: "/games/godOfWar.jpg", // Purple
    },
    {
        title: "Glitch Runner 2026",
        team: "Null Reference",
        image: "/games/rigi.jpg", // Pink
    },
    {
        title: "Quantum Loop",
        team: "Schrödinger's Cats",
        image: "/games/royal.webp", // Blue
    },
    {
        title: "Synthed Memory",
        team: "Retro Wave",
        image: "/games/resident.jpg", // Amber
    },
    {
        title: "Data Heist",
        team: "Binary Bandits",
        image: "/games/doom.webp", // Teal
    }
];

function ProjectCard({ title, team, image }) {
    return (
        <div className="glass-panel min-w-[320px] md:min-w-[400px] p-6 rounded-[2rem] flex flex-col gap-4 backdrop-blur-3xl border border-white/5 relative overflow-hidden group hover:border-teal-500/30 transition-all duration-300">
            {/* Image Container */}
            <div className="w-full h-48 md:h-56 rounded-xl overflow-hidden relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 relative z-10">
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-teal-400 transition-colors">
                    {title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 font-medium tracking-wide border-l-2 border-teal-500/50 pl-3">
                    {team}
                </p>
            </div>

            {/* Action Button */}
            <a
                href="#"
                className="mt-2 w-full py-3 md:py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-center uppercase tracking-wider hover:bg-teal-500 hover:text-black hover:border-teal-500 transition-all duration-300 shadow-lg shadow-black/20"
            >
                Jugar en Itch.io
            </a>

            {/* Hover Glow */}
            <div className="absolute top-1/2 left-1/2 w-full h-full bg-teal-500/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
}

export default function ProjectsShowcase() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Right to Left Scroll Interaction
    // Starts off-screen right (50%) and moves to left (-50%)
    const x = useTransform(scrollYProgress, [0.1, 0.9], ["50%", "-55%"]);

    return (
        <section ref={sectionRef} className="relative w-full h-[300vh] z-[55]">
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center bg-black">

                {/* Background with GradientMesh */}
                <div className="absolute inset-0 z-0">
                    <GradientMesh />
                </div>

                {/* Overlays for texture and transitions */}
                <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col justify-center h-full">
                    {/* Fixed Title */}
                    <div className="container mx-auto px-4 mb-12 md:mb-20 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
                        >
                            Proyectos <span className="text-emerald-400">Participantes</span>
                        </motion.h2>
                        <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
                            Explora los increíbles juegos creados durante el evento.
                        </p>
                    </div>

                    {/* Horizontal Scroll Track */}
                    <motion.div
                        style={{ x }}
                        className="flex gap-8 px-4 md:px-12 w-max items-center"
                    >
                        {projects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
