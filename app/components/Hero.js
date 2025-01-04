import Image from 'next/image';
import React, { useMemo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Countdown from './countdown';
import { useInView } from 'react-intersection-observer';

const Hero = ({ timeLeft }) => {
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        const generatePaths = () => {
            return Array(12).fill(null).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                return {
                    key: i,
                    d: `M100,100 
                        c${30 * Math.cos(angle)},${30 * Math.sin(angle)} 
                         ${60 * Math.cos(angle)},${60 * Math.sin(angle)} 
                         ${80 * Math.cos(angle)},${80 * Math.sin(angle)}`
                };
            });
        };
        setPaths(generatePaths());
    }, []);

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    // Pre-calculate positions for floating elements
    const floatingElements = useMemo(() => {
        // Use fixed positions instead of random
        return Array(6).fill(null).map((_, i) => ({
            left: `${(i * 20) % 100}%`,
            top: `${(i * 15 + 10) % 100}%`,
            duration: 4 + (i % 3),
            delay: i * 0.5
        }));
    }, []);

    return (
        <main className="relative py-10 bg-gradient-to-b from-[#0D0221] via-[#150634] to-[#0D0221]">
            {/* Enhanced SVG Patterns */}
            <svg className="absolute w-0 h-0 overflow-hidden">
                <defs>
                    {/* Tech Pattern - Enhanced with more circuit elements */}
                    <pattern id="circuitPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke="rgba(0,255,255,0.07)" strokeWidth="0.5">
                            <path d="M10,40 h80 M40,10 v80" />
                            <path d="M10,70 h30 M70,70 h20" />
                            <path d="M25,25 l30,30 M75,25 l-30,30" />
                            <circle cx="40" cy="40" r="2" />
                            <circle cx="10" cy="40" r="1.5" />
                            <circle cx="70" cy="70" r="1.5" />
                            <text x="65" y="35" fontSize="4" fill="rgba(0,255,255,0.07)">1010</text>
                            <text x="25" y="65" fontSize="4" fill="rgba(0,255,255,0.07)">0101</text>
                        </g>
                    </pattern>

                    {/* Cultural Pattern - Enhanced mandala */}
                    <pattern id="mandalaPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke="rgba(255,165,0,0.08)" strokeWidth="0.5">
                            <circle cx="100" cy="100" r="80" />
                            <circle cx="100" cy="100" r="60" />
                            <circle cx="100" cy="100" r="40" />
                            {paths.map((pathData) => (
                                <path key={pathData.key} d={pathData.d} />
                            ))}
                        </g>
                    </pattern>
                </defs>
            </svg>

            <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-16 md:py-24 overflow-hidden">
                {/* Enhanced Background Layers */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#1A0F1F] to-[#0D0221] opacity-60" />

                    <svg className="absolute inset-0 w-full h-full">
                        {/* Animated Tech Pattern Layer */}
                        <motion.rect
                            width="100%"
                            height="100%"
                            fill="url(#circuitPattern)"
                            animate={{
                                opacity: [0.2, 0.4, 0.2],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Enhanced Cultural Pattern Layer */}
                        <motion.g
                            style={{ transformOrigin: 'center' }}
                            animate={{
                                rotate: 360,
                                scale: [1, 1.1, 1]
                            }}
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

                        {/* Enhanced Corner Accents */}
                        {[0, 1, 2, 3].map((i) => (
                            <motion.path
                                key={`corner-${i}`}
                                d={`M${i < 2 ? 0 : '100%'},${i % 2 === 0 ? 0 : '100%'} 
                                   ${i < 2 ? 'h' : 'h-'}100 ${i % 2 === 0 ? 'v' : 'v-'}100`}
                                stroke={i % 2 === 0 ? 'rgba(255,165,0,0.2)' : 'rgba(0,255,255,0.2)'}
                                strokeWidth="1.5"
                                fill="none"
                                animate={{
                                    opacity: [0.2, 0.4, 0.2],
                                    pathLength: [0, 1, 0],
                                    strokeWidth: [1, 2, 1]
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
                    {/* Logo Animation */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        transition={{
                            duration: 1.2,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="relative group"
                    >
                        <motion.div
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(255,165,0,0.3)",
                                    "0 0 40px rgba(255,165,0,0.2)",
                                    "0 0 20px rgba(255,165,0,0.3)"
                                ]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="rounded-full"
                        >
                            <Image
                                src="/goonjlogow.png"
                                width={240}
                                height={240}
                                alt="Goonj Logo"
                                priority
                                className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Countdown section */}
                    <Countdown />

                    {/* Description */}
                    <div className="max-w-4xl space-y-8 px-4" ref={ref}>
                        <AnimatePresence>
                            {inView && (
                                <>
                                    <motion.h1
                                        initial={{ y: -50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-orange-50 tracking-tight"
                                    >
                                        What is <span className="text-orange-400">Goonj</span>?
                                    </motion.h1>

                                    <motion.p
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-center text-orange-100/90 text-lg md:text-xl lg:text-2xl leading-relaxed font-light"
                                    >
                                        Goonj is the annual Techno-Cultural fest of the University Institute of Engineering
                                        and Technology (UIET), organized by the students of the University. The spirit of
                                        the fest is to promote cultural as well as technical alacrity among the students.
                                        Moreover, the motive is to spread a zeal among students, relieving them from the
                                        stressful schedule of an engineering atmosphere.
                                    </motion.p>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Fixed Floating Tech Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        {floatingElements.map((element, i) => (
                            <motion.div
                                key={`tech-element-${i}`}
                                className="absolute"
                                style={{
                                    left: element.left,
                                    top: element.top
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.2, 0.5, 0.2]
                                }}
                                transition={{
                                    duration: element.duration,
                                    repeat: Infinity,
                                    delay: element.delay
                                }}
                            >
                                <div className="w-4 h-4 border border-cyan-400/20 rounded-full" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Hero;