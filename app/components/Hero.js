import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import EventsSection from './Infinitecarousel';

const Hero = ({ timeLeft, CountdownBox }) => {
    return (
        <main className="relative bg-[#0D0221] py-16">
            {/* SVG Definitions */}
            <svg className="hidden">
                <defs>
                    {/* Circuit Board Pattern */}
                    <pattern id="circuitPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke="rgba(0,255,255,0.1)" strokeWidth="0.5">
                            <path d="M10,50 h80 M50,10 v80" />
                            <circle cx="50" cy="50" r="3" />
                            <circle cx="10" cy="50" r="2" />
                            <circle cx="90" cy="50" r="2" />
                            <circle cx="50" cy="10" r="2" />
                            <circle cx="50" cy="90" r="2" />
                        </g>
                    </pattern>

                    {/* Mandala Pattern */}
                    <pattern id="mandalaPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke="rgba(255,165,0,0.1)" strokeWidth="0.5">
                            <circle cx="100" cy="100" r="80" />
                            <circle cx="100" cy="100" r="60" />
                            <circle cx="100" cy="100" r="40" />
                            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                                <path
                                    key={angle}
                                    d={`M100,100 l${80 * Math.cos(angle * Math.PI / 180)},${80 * Math.sin(angle * Math.PI / 180)}`}
                                />
                            ))}
                        </g>
                    </pattern>

                    {/* Sanskrit Symbol Pattern */}
                    <pattern id="sanskritPattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke="rgba(255,165,0,0.08)" strokeWidth="0.5">
                            <path d="M75,40 c10,-10 30,-10 30,10 c0,20 -20,20 -20,0" /> {/* Om symbol */}
                            <circle cx="75" cy="75" r="30" />
                            <path d="M45,75 h60 M75,45 v60" />
                        </g>
                    </pattern>
                </defs>
            </svg>

            <section className="relative flex flex-col justify-center items-center min-h-screen px-4 overflow-hidden">
                {/* Enhanced Background Elements */}
                <div className="absolute inset-0">
                    {/* Base Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#1A0F1F] to-[#0D0221] opacity-50" />

                    {/* Cultural-Tech Background */}
                    <svg className="absolute inset-0 w-full h-full">
                        {/* Circuit Layer */}
                        <motion.rect
                            width="100%"
                            height="100%"
                            fill="url(#circuitPattern)"
                            animate={{
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Mandala Layer */}
                        <motion.g
                            animate={{
                                rotate: 360
                            }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {[0, 1, 2, 3].map((i) => (
                                <rect
                                    key={`mandala-${i}`}
                                    x={`${i * 25}%`}
                                    y="0"
                                    width="50%"
                                    height="100%"
                                    fill="url(#mandalaPattern)"
                                    opacity="0.3"
                                />
                            ))}
                        </motion.g>

                        {/* Sanskrit Symbols Layer */}
                        <motion.g
                            animate={{
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            {[0, 1, 2].map((i) => (
                                <rect
                                    key={`sanskrit-${i}`}
                                    x="0"
                                    y={`${i * 33.33}%`}
                                    width="100%"
                                    height="33.33%"
                                    fill="url(#sanskritPattern)"
                                />
                            ))}
                        </motion.g>

                        {/* Decorative Corner Elements */}
                        {[0, 1, 2, 3].map((i) => (
                            <motion.path
                                key={`corner-${i}`}
                                d={`M${i < 2 ? 0 : '100%'},${i % 2 === 0 ? 0 : '100%'} h50 v50`}
                                stroke={i % 2 === 0 ? 'rgba(255,165,0,0.3)' : 'rgba(0,255,255,0.3)'}
                                strokeWidth="2"
                                fill="none"
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                    pathLength: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.5
                                }}
                            />
                        ))}
                    </svg>

                    {/* Animated Gradient Overlay */}
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
                    {/* Logo Section */}
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
                            {/* Enhanced Logo Glow */}
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

                    {/* Rest of the content remains the same */}
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
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 justify-items-center p-6 rounded-xl backdrop-blur-sm bg-black/20">
                            <CountdownBox value={timeLeft.months} label="Months" />
                            <CountdownBox value={timeLeft.weeks} label="Weeks" />
                            <CountdownBox value={timeLeft.days} label="Days" />
                            <CountdownBox value={timeLeft.hours} label="Hours" />
                            <CountdownBox value={timeLeft.minutes} label="Minutes" />
                            <CountdownBox value={timeLeft.seconds} label="Seconds" />
                        </div>
                    </motion.div>

                    {/* Title and Description */}
                    <div className="max-w-4xl space-y-6">
                        {/* Title */}
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

                        {/* Description */}
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
            </section>

            <section className="relative">
                <EventsSection />
            </section>
        </main>
    );
};

export default Hero;