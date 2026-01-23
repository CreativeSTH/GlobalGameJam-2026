import { useRef } from 'react';
import HeroScrollCanvas from './components/HeroScrollCanvas';
import AgendaSection from './components/AgendaSection';
import QueEsSection from './components/QueEsSection';
import Navbar from './components/Navbar';
import SmartScrollButton from './components/SmartScrollButton';

import ProjectsShowcase from './components/ProjectsShowcase';

function App() {
    // Shared Ref pattern: We create the ref here, pass it to Hero to attach,
    // and pass it to Navbar to track.
    const heroRef = useRef(null);

    return (
        <main className="bg-black min-h-screen text-white">
            <Navbar heroRef={heroRef} />

            {/* Hero attaches the ref to its container */}
            <HeroScrollCanvas containerRef={heroRef} />

            <QueEsSection />
            <ProjectsShowcase />
            <AgendaSection />

            <SmartScrollButton />
        </main>
    )
}

export default App
