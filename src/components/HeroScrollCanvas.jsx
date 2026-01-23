import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { useImageSequence } from '../hooks/useImageSequence';
import { useCanvasRenderer } from '../hooks/useCanvasRenderer';
import LoadingIndicator from './LoadingIndicator';
import TextOverlay from './TextOverlay';
import ScrollIndicator from './ScrollIndicator';
import ChapterMarkers from './ChapterMarkers';

export default function HeroScrollCanvas({ containerRef }) {
    const { images, isLoading, progress } = useImageSequence({
        frameCount: 192,
        fileNamePrefix: 'frame_',
        path: '/frames'
    });

    // Use the SHARED ref passed from App (so Navbar can also track this element)
    // We track scroll progress ONLY for this specific 1500vh section
    const { scrollYProgress: sectionProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const canvasRef = useRef(null);

    // Use local sectionProgress for canvas updates
    useCanvasRenderer(canvasRef, images, sectionProgress, !isLoading);

    return (
        // Attach passed ref to the outer container
        <div ref={containerRef} className="relative w-full" style={{ height: '1500vh' }}>
            <LoadingIndicator progress={progress} isLoading={isLoading} />
            <ScrollIndicator isLoading={isLoading} scrollProgress={sectionProgress} />

            {/* Chapter Markers for Navigation */}
            <ChapterMarkers scrollProgress={sectionProgress} />

            {/* Pass local sectionProgress to TextOverlay */}
            <TextOverlay scrollProgress={sectionProgress} />

            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                />
                {/* Persistent Global Overlay */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none hero-canvas-overlay" />
            </div>
        </div>
    );
}
