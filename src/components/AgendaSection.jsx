import { useRef, Suspense } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

import GradientMesh from './GradientMesh';
import ArcadeMachineModel from './ArcadeMachineModel';

// Sub-components
import AgendaSchedule from './Agenda/AgendaSchedule';
import AgendaSede from './Agenda/AgendaSede';
import AgendaSponsors from './Agenda/AgendaSponsors';

export default function AgendaSection() {
    const sectionRef = useRef(null);

    // Scroll tracking
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
        layoutEffect: false
    });

    // Mobile Detection
    const isMobile = useMobile();

    // Desktop Animations (driven by scroll)
    const x = useTransform(
        scrollYProgress,
        [0.1, 0.4],
        ["10%", "-25%"]
    );
    const agendaOpacity = useTransform(scrollYProgress, [0.4, 0.45], [1, 0]);

    // Sede Animations
    const sedeOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
    const sedeY = useTransform(scrollYProgress, [0.45, 0.6, 0.9], [100, 0, -500]);

    // Sponsors Animations
    const sponsorsOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
    const sponsorsY = useTransform(scrollYProgress, [0.75, 0.9], [100, 0]);

    return (
        <section
            ref={sectionRef}
            id="agenda-section"
            className={`relative w-full z-[60] ${isMobile ? 'min-h-screen h-auto bg-black pb-20' : 'h-[600vh]'}`}
        >

            {/* Sticky Container - Logic Split */}
            <div className={`${isMobile ? 'relative w-full flex flex-col' : 'sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center'}`}>

                {/* Background */}
                <div className={`absolute inset-0 z-0 pointer-events-none ${isMobile ? 'h-full' : ''}`}>
                    {/* Inner Sticky Container for Mobile to keep 3D Viewport correct */}
                    <div className={`${isMobile ? 'sticky top-0 h-screen w-full overflow-hidden' : 'w-full h-full relative'}`}>
                        <GradientMesh />
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                        {/* 3D Model Layer - Positioned to be visible but not obstructing */}
                        <div className="absolute inset-0 z-[5] opacity-80 md:opacity-100 mix-blend-lighten">
                            <Suspense fallback={null}>
                                <ArcadeMachineModel scrollProgress={scrollYProgress} isMobile={isMobile} />
                            </Suspense>
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full flex flex-col items-center">

                    <AgendaSchedule
                        isMobile={isMobile}
                        scrollX={x}
                        opacity={agendaOpacity}
                    />

                    <AgendaSede
                        isMobile={isMobile}
                        opacity={sedeOpacity}
                        y={sedeY}
                    />

                    <AgendaSponsors
                        isMobile={isMobile}
                        opacity={sponsorsOpacity}
                        y={sponsorsY}
                    />

                </div>
            </div >
        </section >);
}
