import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import EventsSection from './Infinitecarousel';

const Hero = ({ timeLeft }) => {
    const CountdownBox = ({ value, label }) => (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
        >
            <motion.div
                className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-orange-500/20"
                whileHover={{ scale: 1.05 }}
            >
                <motion.span
                    className="text-3xl md:text-4xl font-bold text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    {String(value).padStart(2, '0')}
                </motion.span>
            </motion.div>
            <div className="text-sm md:text-base text-white/80 uppercase tracking-wider mt-2">{label}</div>
        </motion.div>
    );

    return (
        <main className="relative bg-[#0D0221]">
            <section className="relative flex flex-col justify-center items-center min-h-screen px-4 overflow-hidden">
                {/* Background elements remain the same */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#1A0F1F] to-[#0D0221] opacity-50" />
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[#FFA500]/5 mix-blend-overlay" />
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                'radial-gradient(circle at 20% 30%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)',
                                'radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)'
                            ]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-12 mt-16">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <motion.div
                            className="relative"
                            whileHover={{
                                scale: 1.05,
                                filter: "brightness(1.2)"
                            }}
                        >
                            <Image
                                src="/goonjlogow.png"
                                width={200}
                                height={200}
                                alt="Goonj Logo"
                                className="relative z-10"
                            />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-cyan-500/30 to-orange-500/30 rounded-full blur-xl -z-10"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                    borderRadius: ["50%", "40%", "50%"]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Countdown Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="w-full max-w-4xl"
                    >
                        <motion.h2 
                            className="text-2xl md:text-3xl text-white text-center mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Coming Soon - February 19th, 2025
                        </motion.h2>
                        <motion.div 
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 justify-items-center p-6 rounded-xl backdrop-blur-sm bg-black/20"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <CountdownBox value={timeLeft.months} label="Months" />
                            <CountdownBox value={timeLeft.weeks} label="Weeks" />
                            <CountdownBox value={timeLeft.days} label="Days" />
                            <CountdownBox value={timeLeft.hours} label="Hours" />
                            <CountdownBox value={timeLeft.minutes} label="Minutes" />
                            <CountdownBox value={timeLeft.seconds} label="Seconds" />
                        </motion.div>
                    </motion.div>

                    {/* Title and Description */}
                    <div className="max-w-4xl space-y-6">
                        <motion.h1
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-orange-50 relative"
                        >
                            What is Goonj?
                            <motion.div
                                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                            />
                        </motion.h1>

                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.4, duration: 1 }}
                            className="text-center text-orange-100/90 text-lg md:text-xl lg:text-2xl leading-relaxed"
                        >
                            Goonj is the annual Techno-Cultural fest of the University Institute of Engineering and Technology (UIET), organized by the students of the University. The spirit of the fest is to promote cultural as well as technical alacrity among the students. Moreover, the motive is to spread a zeal among students, relieving them from the stressful schedule of an engineering atmosphere.
                        </motion.p>
                    </div>
                </div>

                {/* Decorative Corner Elements remain the same */}
                <div className="absolute top-0 left-0 w-20 h-20">
                    <motion.div
                        className="absolute inset-0 border-t-2 border-l-2 border-orange-500/30"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    />
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20">
                    <motion.div
                        className="absolute inset-0 border-b-2 border-r-2 border-cyan-500/30"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1,
                        }}
                    />
                </div>
            </section>

            <section className="relative">
                <EventsSection />
            </section>
        </main>
    );
};

export default Hero;