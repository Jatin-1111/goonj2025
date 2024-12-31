import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import Countdown from './countdown';

const Hero = ({ timeLeft }) => {
    return (
        <main className="relative bg-[#0D0221] min-h-screen">
            {/* SVG Patterns */}
            <svg className="absolute w-0 h-0 overflow-hidden">
                <defs>
                    {/* Tech Pattern */}
                    <pattern id="circuitPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke="rgba(0,255,255,0.07)" strokeWidth="0.5">
                            <path d="M10,40 h80 M40,10 v80" />
                            <path d="M10,70 h30 M70,70 h20" />
                            <circle cx="40" cy="40" r="2" />
                            <circle cx="10" cy="40" r="1.5" />
                            <text x="65" y="35" fontSize="4" fill="rgba(0,255,255,0.07)">1010</text>
                        </g>
                    </pattern>

                    {/* Cultural Pattern */}
                    <pattern id="mandalaPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke="rgba(255,165,0,0.08)" strokeWidth="0.5">
                            <circle cx="100" cy="100" r="80" />
                            <circle cx="100" cy="100" r="60" />
                            {/* Lotus petals */}
                            {[...Array(8)].map((_, i) => {
                                const angle = (i * 45 * Math.PI) / 180;
                                return (
                                    <path
                                        key={i}
                                        d={`M100,100 
                                           c${30 * Math.cos(angle)},${30 * Math.sin(angle)} 
                                            ${60 * Math.cos(angle)},${60 * Math.sin(angle)} 
                                            ${80 * Math.cos(angle)},${80 * Math.sin(angle)}`}
                                    />
                                );
                            })}
                        </g>
                    </pattern>
                </defs>
            </svg>

            <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-16 md:py-24 overflow-hidden">
                {/* Background Layers */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#1A0F1F] to-[#0D0221] opacity-60" />

                    <svg className="absolute inset-0 w-full h-full">
                        {/* Tech Pattern Layer */}
                        <motion.rect
                            width="100%"
                            height="100%"
                            fill="url(#circuitPattern)"
                            animate={{
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Cultural Pattern Layer */}
                        <motion.g
                            style={{ transformOrigin: 'center' }}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 40,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <rect
                                width="100%"
                                height="100%"
                                fill="url(#mandalaPattern)"
                                opacity="0.25"
                            />
                        </motion.g>

                        {/* Corner Accents */}
                        {[0, 1, 2, 3].map((i) => (
                            <motion.path
                                key={`corner-${i}`}
                                d={`M${i < 2 ? 0 : '100%'},${i % 2 === 0 ? 0 : '100%'} ${i < 2 ? 'h' : 'h-'}80 ${i % 2 === 0 ? 'v' : 'v-'}80`}
                                stroke={i % 2 === 0 ? 'rgba(255,165,0,0.2)' : 'rgba(0,255,255,0.2)'}
                                strokeWidth="1.5"
                                fill="none"
                                animate={{
                                    opacity: [0.2, 0.4, 0.2],
                                    pathLength: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    delay: i * 0.7
                                }}
                            />
                        ))}
                    </svg>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-16 w-full max-w-6xl mx-auto mt-8">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        className="relative"
                    >
                        <Image
                            src="/goonjlogow.png"
                            width={240}
                            height={240}
                            alt="Goonj Logo"
                            priority
                            className="relative z-10"
                        />
                    </motion.div>

                    {/* Countdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="w-full max-w-4xl px-4"
                    >
                        <motion.h2
                            className="text-2xl md:text-4xl text-white text-center mb-10 font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Coming Soon - February 19th, 2025
                        </motion.h2>
                        <Countdown timeLeft={timeLeft} />
                    </motion.div>

                    {/* Description */}
                    <div className="max-w-4xl space-y-8 px-4">
                        <motion.h1
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-orange-50"
                        >
                            What is Goonj?
                        </motion.h1>

                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.4 }}
                            className="text-center text-orange-100/90 text-lg md:text-xl lg:text-2xl leading-relaxed font-light"
                        >
                            Goonj is the annual Techno-Cultural fest of the University Institute of Engineering and Technology (UIET), organized by the students of the University. The spirit of the fest is to promote cultural as well as technical alacrity among the students. Moreover, the motive is to spread a zeal among students, relieving them from the stressful schedule of an engineering atmosphere.
                        </motion.p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Hero;