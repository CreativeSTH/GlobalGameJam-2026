import { motion } from 'framer-motion';
import AgendaCard from '../AgendaCard';
import { scheduleData } from '../../data/agenda';

export default function AgendaSchedule({ isMobile, scrollX, opacity }) {
    return (
        <div className="relative z-10 w-full flex flex-col items-center">
            {/* Fixed Title Section */}
            <motion.div
                style={{ opacity: isMobile ? 1 : opacity }}
                className={`mb-8 md:mb-20 text-center px-4 ${isMobile ? 'pt-32' : ''}`}
            >
                <motion.h2
                    initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
                >
                    <span className="text-emerald-400 drop-shadow-xl">Agenda</span> <span className="text-white drop-shadow-xl">Oficial</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-blue-200 mt-4 text-lg md:text-xl font-medium max-w-xl mx-auto"
                >
                    {isMobile ? "Explora el cronograma del evento" : "Desliza para explorar el cronograma del evento"}
                </motion.p>
            </motion.div>

            {/* Schedule Track */}
            {isMobile ? (
                <div className="w-full flex flex-col gap-8 px-4 pb-12 items-center">
                    {scheduleData.map((day, i) => (
                        <motion.div
                            key={i}
                            className="w-full max-w-md"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-10%" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <AgendaCard {...day} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    style={{ x: scrollX, opacity }}
                    className="flex gap-8 md:gap-12 px-[10vw] w-max"
                >
                    {scheduleData.map((day, i) => (
                        <AgendaCard key={i} {...day} />
                    ))}
                </motion.div>
            )}
        </div>
    );
}
