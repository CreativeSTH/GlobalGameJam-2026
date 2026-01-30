import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import HeroScrollCanvas from './components/HeroScrollCanvas';
import AgendaSection from './components/AgendaSection';
import QueEsSection from './components/QueEsSection';
import Navbar from './components/Navbar';
import SmartScrollButton from './components/SmartScrollButton';
import SponsorsSection from './components/SponsorsSection';
import Footer from './components/Footer';

import ProjectsShowcase from './components/ProjectsShowcase';
import WinnersPodium from './components/WinnersPodium';



function App() {
    // Shared Ref pattern: We create the ref here, pass it to Hero to attach,
    // and pass it to Navbar to track.
    const heroRef = useRef(null);

    // Centralized Scroll Tracking for the Hero Section
    // This ensures Navbar and Hero content are perfectly synced
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end end"]
    });

    return (
        <main className="bg-black min-h-screen text-white">
            <Navbar heroRef={heroRef} scrollProgress={scrollYProgress} />

            {/* Hero attaches the ref to its container */}
            <HeroScrollCanvas containerRef={heroRef} scrollProgress={scrollYProgress} />

            <QueEsSection />
            {/* <ProjectsShowcase />
            <WinnersPodium /> */}

            <AgendaSection />
            <SponsorsSection />
            <Footer />

            <SmartScrollButton />
        </main>
    )
}



export default App
