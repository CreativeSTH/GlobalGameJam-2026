import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import HeroSection from './components/HeroSection';
import AgendaSection from './components/AgendaSection';
import AboutSection from './components/AboutSection';
import Navbar from './components/Navbar';
import SmartScrollButton from './components/SmartScrollButton';
import Footer from './components/Footer';

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
            <HeroSection containerRef={heroRef} scrollProgress={scrollYProgress} />

            <AboutSection />

            <AgendaSection />
            <Footer />

            <SmartScrollButton />
        </main>
    )
}



export default App
