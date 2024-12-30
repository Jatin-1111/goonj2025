import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
//import EventsSection from './Infinitecarousel';
import Countdown from './countdown';

const Hero = ({ timeLeft }) => {
    return (
        <main className="relative bg-[#0D0221] min-h-screen">
            {/* SVG Definitions - Enhanced with more patterns */}
            <svg className="absolute w-0 h-0 overflow-hidden">
                <defs>
                    {/* Circuit Board Pattern - Enhanced with more elements */}
                    <pattern id="circuitPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke="rgba(0,255,255,0.07)" strokeWidth="0.5">
                            <path d="M10,40 h80 M40,10 v80" />
                            <path d="M10,70 h30 M70,70 h20" />
                            <path d="M70,30 h20 M10,30 h30" />
                            <circle cx="40" cy="40" r="2" />
                            <circle cx="10" cy="40" r="1.5" />
                            <circle cx="90" cy="40" r="1.5" />
                            <circle cx="40" cy="10" r="1.5" />
                            <circle cx="40" cy="90" r="1.5" />
                            {/* Binary representation */}
                            <text x="65" y="35" fontSize="4" fill="rgba(0,255,255,0.07)">1010</text>
                            <text x="20" y="75" fontSize="4" fill="rgba(0,255,255,0.07)">0101</text>
                        </g>
                    </pattern>

                    {/* Code Pattern - New addition */}
                    <pattern id="codePattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                        <g fill="rgba(0,255,255,0.05)">
                            <text x="10" y="20" fontSize="6">function()</text>
                            <text x="20" y="40" fontSize="6">{'{return}'}</text>
                            <text x="10" y="60" fontSize="6">while(true)</text>
                            <text x="20" y="80" fontSize="6">if(dev)</text>
                            <path d="M5,10 h20 M5,30 h30" stroke="rgba(0,255,255,0.05)" strokeWidth="0.5" />
                        </g>
                    </pattern>

                    {/* Mandala Pattern - Enhanced with more cultural elements */}
                    <pattern id="mandalaPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke="rgba(255,165,0,0.08)" strokeWidth="0.5">
                            <circle cx="100" cy="100" r="80" />
                            <circle cx="100" cy="100" r="60" />
                            <circle cx="100" cy="100" r="40" />
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
                            {/* Om symbol simplified */}
                            <path d="M90,70 c5,-5 15,-5 15,5 c0,10 -10,10 -10,0" />
                        </g>
                    </pattern>

                    {/* Sanskrit Pattern - Enhanced with more elements */}
                    <pattern id="sanskritPattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke="rgba(255,165,0,0.06)" strokeWidth="0.5">
                            {/* Devanagari-inspired elements */}
                            <path d="M75,45 c10,-10 30,-10 30,10 c0,20 -20,20 -20,0" />
                            <path d="M60,75 c-10,0 -10,20 0,20 h30" />
                            <circle cx="75" cy="75" r="30" />
                            <path d="M45,75 h60 M75,45 v60" />
                            {/* Decorative elements */}
                            <path d="M30,30 h15 M105,30 h15" />
                            <path d="M30,120 h15 M105,120 h15" />
                        </g>
                    </pattern>

                    {/* Network Pattern - New addition */}
                    <pattern id="networkPattern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
                        <g stroke="rgba(0,255,255,0.06)" strokeWidth="0.5">
                            {[...Array(4)].map((_, i) => (
                                <g key={i}>
                                    <circle cx={40 + i * 40} cy="80" r="3" fill="rgba(0,255,255,0.04)" />
                                    <line x1={40 + i * 40} y1="80" x2={80 + i * 40} y2="80" />
                                    <line x1={40 + i * 40} y1="80" x2={60 + i * 40} y2="60" />
                                    <line x1={40 + i * 40} y1="80" x2={60 + i * 40} y2="100" />
                                </g>
                            ))}
                        </g>
                    </pattern>
                </defs>
            </svg>

            {/* Rest of the component remains the same until the background elements section */}
            <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#1A0F1F] to-[#0D0221] opacity-60" />

                    <svg className="absolute inset-0 w-full h-full">
                        {/* Original layers */}
                        <motion.rect
                            width="100%"
                            height="100%"
                            fill="url(#circuitPattern)"
                            animate={{
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut"
                            }}
                        />

                        {/* New Code Pattern Layer */}
                        <motion.rect
                            width="100%"
                            height="100%"
                            fill="url(#codePattern)"
                            animate={{
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Network Pattern Layer */}
                        <motion.rect
                            width="100%"
                            height="100%"
                            fill="url(#networkPattern)"
                            animate={{
                                opacity: [0.15, 0.25, 0.15]
                            }}
                            transition={{
                                duration: 10,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Enhanced Mandala Layer */}
                        <motion.g
                            style={{
                                transformOrigin: 'center center',
                                transformBox: 'fill-box'
                            }}
                            animate={{
                                rotate: 360
                            }}
                            transition={{
                                duration: 40,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear"
                            }}
                        >
                            {[0, 1].map((i) => (
                                <rect
                                    key={`mandala-${i}`}
                                    x={`${i * 50}%`}
                                    y="0"
                                    width="100%"
                                    height="100%"
                                    fill="url(#mandalaPattern)"
                                    opacity="0.25"
                                />
                            ))}
                        </motion.g>

                        {/* Sanskrit Layer - Adjusted spacing */}
                        <motion.g
                            animate={{
                                opacity: [0.15, 0.3, 0.15]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
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

                        {/* Corner Elements - Enhanced positioning */}
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
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.7
                                }}
                            />
                        ))}
                    </svg>

                    {/* Gradient Overlay - Smoother transition */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                'radial-gradient(circle at 30% 20%, rgba(255, 165, 0, 0.08) 0%, transparent 60%)',
                                'radial-gradient(circle at 70% 80%, rgba(0, 255, 255, 0.08) 0%, transparent 60%)'
                            ]
                        }}
                        transition={{
                            duration: 12,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse"
                        }}
                    />
                </div>

                {/* Main Content - Improved spacing */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-16 w-full max-w-6xl mx-auto mt-8">
                    {/* Logo Section - Enhanced glow effect */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
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
                                width={240}
                                height={240}
                                alt="Goonj Logo"
                                className="relative z-10"
                                priority
                            />
                            {/* Logo Glow - Enhanced effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-orange-500/25 via-cyan-500/25 to-orange-500/25 rounded-full blur-2xl -z-10"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                    borderRadius: ["50%", "45%", "50%"]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Updated Countdown Section */}
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

                    {/* Content Section - Enhanced typography */}
                    <div className="max-w-4xl space-y-8 px-4">
                        <motion.h1
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-orange-50 relative"
                        >
                            What is Goonj?
                            <motion.div
                                className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                            />
                        </motion.h1>

                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.4, duration: 1 }}
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
