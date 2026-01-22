import React, { useRef } from 'react';
import { useScrollFrame } from '../hooks/useScrollFrame';
import { useImageSequence } from '../hooks/useImageSequence';
import { useCanvasRenderer } from '../hooks/useCanvasRenderer';
import LoadingIndicator from './LoadingIndicator';
import TextOverlay from './TextOverlay';
import ScrollIndicator from './ScrollIndicator';

export default function HeroScrollCanvas() {
    const { images, isLoading, progress } = useImageSequence({
        frameCount: 192,
        fileNamePrefix: 'frame_',
        path: '/frames'
    });

    const { scrollProgress } = useScrollFrame();
    const canvasRef = useRef(null);

    useCanvasRenderer(canvasRef, images, scrollProgress, !isLoading);

    return (
        <>
            <LoadingIndicator progress={progress} isLoading={isLoading} />
            <ScrollIndicator isLoading={isLoading} scrollProgress={scrollProgress} />
            <TextOverlay />

            <div className="relative w-full" style={{ height: '1000vh' }}>
                <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
                    <canvas
                        ref={canvasRef}
                        className="block w-full h-full"
                    />
                    {/* Persistent Global Overlay */}
                    <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                </div>
            </div>
        </>
    );
}
