import React from 'react';

const GradientMesh = () => {
    return (
        <div className="gradient-bg">
            <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className="gradients-container">
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>
            </div>

            {/* Visual Unity Overlays (Matches Hero Section) */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none z-10" />
            <div className="absolute inset-0 mesh-overlay pointer-events-none z-20" />

            {/* Top and Bottom Fades for Seamless Transitions */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-[25] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[25] pointer-events-none" />
        </div>
    );
};

export default GradientMesh;
