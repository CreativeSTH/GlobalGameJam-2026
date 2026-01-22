import { useState, useEffect, useRef } from 'react';

export function useImageSequence({ frameCount, fileNamePrefix, path = '/src/assets/frames' }) {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const loadImages = async () => {
            const loadedImages = [];
            let loadedCount = 0;

            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                // Format: frame_000.png, frame_001.png, etc.
                const frameNumber = i.toString().padStart(3, '0');
                img.src = `${path}/${fileNamePrefix}${frameNumber}.png`; // Note: Using PNG as discussed

                await new Promise((resolve, reject) => {
                    img.onload = () => {
                        loadedCount++;
                        if (isMounted) setProgress((loadedCount / frameCount) * 100);
                        resolve();
                    };
                    img.onerror = (e) => {
                        console.error(`Failed to load frame ${i}`, e);
                        // Continue even if one fails, or reject? Let's continue.
                        resolve();
                    };
                });
                loadedImages.push(img);
            }

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
