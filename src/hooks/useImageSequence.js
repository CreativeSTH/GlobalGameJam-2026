import { useState, useEffect, useRef } from 'react';

export function useImageSequence({ frameCount, fileNamePrefix, path = '/src/assets/frames' }) {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const loadImages = async () => {
            console.log("useImageSequence: Starting batched loadImages", { frameCount, path });

            const loadedImages = new Array(frameCount).fill(null);
            let loadedCount = 0;
            let nextIndex = 0;
            const CONCURRENCY_LIMIT = 5;

            const loadNext = async () => {
                if (!isMounted) return;

                // Get the next index to load atomically
                const i = nextIndex++;
                if (i >= frameCount) return;

                const frameNumber = i.toString().padStart(3, '0');
                const src = `${path}/${fileNamePrefix}${frameNumber}.webp`;

                try {
                    const img = new Image();
                    await new Promise((resolve) => {
                        img.onload = () => resolve(img);
                        img.onerror = (e) => {
                            console.error(`Failed to load frame ${i}`, e);
                            resolve(null);
                        };
                        img.src = src;
                    });

                    if (isMounted) {
                        loadedImages[i] = img;
                        loadedCount++;

                        // Update progress frequently (every 1% or at least every 5 frames)
                        if (loadedCount % 5 === 0 || loadedCount === frameCount) {
                            setProgress((loadedCount / frameCount) * 100);
                        }
                    }
                } catch (err) {
                    console.error("Unexpected error in loadNext", err);
                }

                // Recursively load the next one
                await loadNext();
            };

            // Start initial batch of workers
            const workers = [];
            for (let i = 0; i < Math.min(CONCURRENCY_LIMIT, frameCount); i++) {
                workers.push(loadNext());
            }

            // Wait for all workers to finish
            await Promise.all(workers);

            if (isMounted) {
                setImages(loadedImages);
                setIsLoading(false);
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, [frameCount, fileNamePrefix, path]);

    return { images, isLoading, progress };
}
