export default function AgendaSection() {
    return (
        <section id="agenda-section" className="relative w-full bg-[#0a0f18] text-white py-32 px-4 z-[60]">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-center mb-16 bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
                    Agenda Oficial
                </h2>

                <div className="grid gap-8">
                    {[1, 2, 3].map((day) => (
                        <div key={day} className="border-l-4 border-teal-500/50 pl-8 py-4 bg-white/5 rounded-r-xl backdrop-blur-sm">
                            <h3 className="text-3xl font-bold mb-2">DÍA {day}</h3>
                            <p className="text-gray-400">Actividades, talleres y desarrollo intensivo de videojuegos. Próximamente el cronograma detallado.</p>
                        </div>
                    ))}
                </div>

                <div className="h-[50vh]"></div> {/* Spacer to allow scrolling */}
            </div>
        </section>
    );
}
