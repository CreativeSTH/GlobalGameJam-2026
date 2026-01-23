import { motion } from 'framer-motion';

export default function AgendaCard({ day, date, month, events }) {
    return (
        <div className="glass-panel min-w-[350px] md:min-w-[420px] p-6 md:p-8 rounded-[2.5rem] flex flex-col gap-6 backdrop-blur-3xl border border-white/5 relative overflow-hidden group">
            {/* Hover Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-400/30 transition-colors duration-700 pointer-events-none" />

            {/* Header */}
            <div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1 relative z-10">
                    {day} <span className="text-teal-400">{date}</span>
                </h3>
                <p className="text-lg text-gray-400 font-medium uppercase tracking-widest">{month}</p>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Events List */}
            <div className="flex flex-col gap-4">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className={`
                            relative overflow-hidden p-4 rounded-2xl border border-white/5 
                            transition-all duration-300 hover:scale-[1.02] hover:border-white/10
                            ${getEventColor(event.type)}
                        `}
                    >
                        <div className="flex items-start gap-4 relatie z-10">
                            <span className="font-mono text-sm font-bold opacity-80 pt-1">{event.time}</span>
                            <span className="font-bold text-lg leading-tight">{event.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function getEventColor(type) {
    switch (type) {
        case 'highlight':
            // Red/Pinkish for Keynotes or Important events
            return "bg-rose-950/30 text-rose-100 hover:bg-rose-900/40 border-rose-500/20";
        case 'workshop':
            // Yellow/Gold for Workshops/Learning
            return "bg-yellow-950/30 text-yellow-100 hover:bg-yellow-900/40 border-yellow-500/20";
        case 'jam':
            // Emerald/Teal for Jamming
            return "bg-teal-950/30 text-teal-100 hover:bg-teal-900/40 border-teal-500/20";
        default:
            // Neutral/Blue for Registration/Misc
            return "bg-slate-800/40 text-slate-200 hover:bg-slate-700/50 border-slate-500/20";
    }
}
