import { useEffect, useRef } from 'react';
import { useMotionValueEvent } from 'framer-motion';

export function useCanvasRenderer(canvasRef, images, scrollProgress, isLoaded) {
    const frameIndexRef = useRef(0);
    const contextRef = useRef(null);

    // Initial Setup and Resize Handling
    useEffect(() => {
        if (!canvasRef.current || !isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no transparency if background is opaque
        contextRef.current = ctx;

        const renderFrame = (index) => {
            const img = images[index];
            if (!img || !ctx) return;

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            // Draw image covering the canvas (object-fit: cover)
            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawWidth = canvasWidth;
                drawHeight = canvasWidth / imgRatio;
                offsetX = 0;
                offsetY = (canvasHeight - drawHeight) / 2;
            } else {
                drawWidth = canvasHeight * imgRatio;
                drawHeight = canvasHeight;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = 0;
            }

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        const handleResize = () => {
            // Handle DPI
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(1, 1); // We are handling scaling manually with drawImage logic usually, 
            // but strictly standard is:
            // Actually, for full control, it's often better to set internal res to window size * dpr
            // and CSS size to window size.
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            // Re-draw current frame
            renderFrame(frameIndexRef.current);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial sizing

        // Draw first frame
        renderFrame(0);

        // Expose render function for scroll listener
        contextRef.current.renderFrame = renderFrame;

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isLoaded, images]);

    // Scroll Listener driven rendering (No React State)
    useMotionValueEvent(scrollProgress, "change", (latest) => {
        if (!isLoaded || !images.length || !contextRef.current?.renderFrame) return;

        const totalFrames = images.length;
        // Map 0 -> 0.85 of scroll to 0 -> totalFrames
        // This ensures video finishes playing before the very end, leaving a static buffer for the final CTA.
        const SEQUENCE_END_POINT = 0.85;
        const mappedProgress = Math.min(latest / SEQUENCE_END_POINT, 1);

        const index = Math.floor(mappedProgress * (totalFrames - 1));
        const clampedIndex = Math.min(Math.max(index, 0), totalFrames - 1);

        if (clampedIndex !== frameIndexRef.current) {
            frameIndexRef.current = clampedIndex;
            // Use requestAnimationFrame for smoothness? 
            // Or draw immediately to keep in sync with scroll?
            // Usually sync is better for scroll-driven unless logic is heavy.
            // Drawing an image is fast.
            requestAnimationFrame(() => {
                contextRef.current.renderFrame(clampedIndex);
            });
        }
    });

    return {};
}
