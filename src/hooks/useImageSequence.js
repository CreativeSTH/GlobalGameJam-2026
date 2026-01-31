import { useState, useEffect, useRef } from 'react';

export function useImageSequence({ frameCount, fileNamePrefix, path = '/src/assets/frames' }) {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const loadImages = async () => {
            const promises = [];
            let loadedCount = 0;

            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, '0');
                img.src = `${path}/${fileNamePrefix}${frameNumber}.webp`;

                const p = new Promise((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        if (isMounted) setProgress((loadedCount / frameCount) * 100);
                        resolve(img);
                    };
                    img.onerror = (e) => {
                        console.error(`Failed to load frame ${i}`, e);
                        resolve(img); // Resolve anyway to keep alignment (or handle error)
                    };
                });
                promises.push(p);
            }

            const loadedImages = await Promise.all(promises);

            if (isMounted) {
                // Ensure correct order (Promise.all preserves order of input promises)
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
