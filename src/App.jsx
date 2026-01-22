import HeroScrollCanvas from './components/HeroScrollCanvas';
import AgendaSection from './components/AgendaSection';
import Navbar from './components/Navbar';
import { useScrollFrame } from './hooks/useScrollFrame';

function App() {
    const { scrollProgress } = useScrollFrame();

    return (
        <main className="bg-black min-h-screen text-white">
            <Navbar scrollProgress={scrollProgress} />
            <HeroScrollCanvas />
            <AgendaSection />
        </main>
    )
}

export default App
