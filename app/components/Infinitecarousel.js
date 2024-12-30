import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';

const CulturalBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Enhanced SVG Background */}
            <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    {/* Enhanced Paisley Pattern */}
                    <pattern id="paisleyPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M25,50 Q40,20 50,50 T75,50 Q60,80 50,50" fill="none" stroke="rgba(255,165,0,0.15)" strokeWidth="2" />
                        <path d="M20,45 Q35,15 45,45 T70,45 Q55,75 45,45" fill="none" stroke="rgba(255,140,0,0.12)" strokeWidth="1.5" />
                        <circle cx="50" cy="50" r="5" fill="none" stroke="rgba(255,140,0,0.1)" />
                    </pattern>

                    {/* Enhanced Mandala Pattern */}
                    <pattern id="mandalaPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,123,0,0.1)" strokeWidth="1" />
                        <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,123,0,0.08)" strokeWidth="1" />
                        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,123,0,0.06)" strokeWidth="1" />
                        <path d="M60,100 L140,100 M100,60 L100,140" stroke="rgba(255,123,0,0.1)" strokeWidth="1" />
                        <path d="M70,70 L130,130 M70,130 L130,70" stroke="rgba(255,123,0,0.08)" strokeWidth="1" />
                    </pattern>

                    {/* Enhanced Cultural Symbols Pattern */}
                    <pattern id="symbolsPattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                        <path d="M75,25 L125,75 L75,125 L25,75 Z" fill="none" stroke="rgba(255,140,0,0.1)" strokeWidth="1" />
                        <circle cx="75" cy="75" r="15" fill="none" stroke="rgba(255,123,0,0.08)" strokeWidth="1" />
                        <path d="M75,60 L75,90 M60,75 L90,75" stroke="rgba(255,123,0,0.1)" strokeWidth="1" />
                    </pattern>

                    {/* New Temple Pattern */}
                    <pattern id="templePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M50,20 L80,50 L50,80 L20,50 Z" fill="none" stroke="rgba(255,165,0,0.1)" strokeWidth="1" />
                        <path d="M50,30 L65,50 L50,70 L35,50 Z" fill="none" stroke="rgba(255,165,0,0.08)" strokeWidth="1" />
                    </pattern>

                    {/* New Lotus Pattern */}
                    <pattern id="lotusPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                        <path d="M60,30 Q80,50 60,70 Q40,50 60,30" fill="none" stroke="rgba(255,165,0,0.1)" strokeWidth="1" />
                        <path d="M30,60 Q50,80 70,60 Q50,40 30,60" fill="none" stroke="rgba(255,165,0,0.1)" strokeWidth="1" />
                        <path d="M60,40 Q70,60 60,80 Q50,60 60,40" fill="none" stroke="rgba(255,165,0,0.08)" strokeWidth="1" />
                    </pattern>
                </defs>

                {/* Background Layers */}
                <rect width="100%" height="100%" fill="#1A0F2E" />
                <rect width="100%" height="100%" fill="url(#paisleyPattern)" opacity="0.3" />
                <rect width="100%" height="100%" fill="url(#mandalaPattern)" opacity="0.2" />
                <rect width="100%" height="100%" fill="url(#symbolsPattern)" opacity="0.25" />
                <rect width="100%" height="100%" fill="url(#templePattern)" opacity="0.2" />
                <rect width="100%" height="100%" fill="url(#lotusPattern)" opacity="0.15" />
            </svg>

            {/* Enhanced Animated Gradients */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        'linear-gradient(45deg, rgba(255,123,0,0.03) 0%, transparent 70%)',
                        'linear-gradient(45deg, rgba(255,165,0,0.05) 0%, transparent 70%)',
                        'linear-gradient(45deg, rgba(255,123,0,0.03) 0%, transparent 70%)'
                    ]
                }}
                transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse"
                }}
            />

            {/* Enhanced Border Elements */}
            <div className="absolute top-0 left-0 w-full h-32">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse"
                    }}
                >
                    <svg width="100%" height="100%">
                        <pattern id="borderPattern" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                            <path d="M0,10 L20,0 L40,10 L20,20 Z" fill="none" stroke="rgba(255,165,0,0.1)" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#borderPattern)" />
                    </svg>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent" />
                <motion.div
                    className="absolute inset-0 rotate-180"
                    animate={{
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: 1.5
                    }}
                >
                    <svg width="100%" height="100%">
                        <rect width="100%" height="100%" fill="url(#borderPattern)" />
                    </svg>
                </motion.div>
            </div>

            {/* Enhanced Side Elements */}
            <div className="absolute left-0 top-0 h-full w-32">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent" />
                <motion.div 
                    className="absolute inset-0"
                    animate={{
                        x: [-10, 0, -10]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse"
                    }}
                >
                    <svg height="100%" width="100%">
                        <pattern id="sidePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="3" fill="none" stroke="rgba(255,165,0,0.1)" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#sidePattern)" />
                    </svg>
                </motion.div>
            </div>

            <div className="absolute right-0 top-0 h-full w-32">
                <div className="absolute inset-0 bg-gradient-to-l from-orange-500/5 to-transparent" />
                <motion.div 
                    className="absolute inset-0"
                    animate={{
                        x: [10, 0, 10]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: 3
                    }}
                >
                    <svg height="100%" width="100%">
                        <rect width="100%" height="100%" fill="url(#sidePattern)" />
                    </svg>
                </motion.div>
            </div>

            {/* Enhanced Floating Elements */}
            {/* Top Left Mandala */}
            <motion.div
                className="absolute top-20 left-20"
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, 360],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 8,
                    rotate: {
                        duration: 20,
                    },
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse"
                }}
            >
                <svg width="120" height="120" viewBox="0 0 100 100">
                    <path
                        d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10"
                        fill="none"
                        stroke="rgba(255,165,0,0.2)"
                        strokeWidth="1"
                    />
                    <path
                        d="M50,20 C65,20 80,35 80,50 C80,65 65,80 50,80 C35,80 20,65 20,50 C20,35 35,20 50,20"
                        fill="none"
                        stroke="rgba(255,165,0,0.15)"
                        strokeWidth="0.5"
                    />
                </svg>
            </motion.div>

            {/* Bottom Right Lotus */}
            <motion.div
                className="absolute bottom-20 right-20"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, -360],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 8,
                    rotate: {
                        duration: 20,
                    },
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 4
                }}
            >
                <svg width="120" height="120" viewBox="0 0 100 100">
                    <path
                        d="M20,50 Q50,20 80,50 Q50,80 20,50"
                        fill="none"
                        stroke="rgba(255,165,0,0.2)"
                        strokeWidth="1"
                    />
                    <path
                        d="M30,50 Q50,30 70,50 Q50,70 30,50"
                        fill="none"
                        stroke="rgba(255,165,0,0.15)"
                        strokeWidth="0.5"
                    />
                </svg>
            </motion.div>

            {/* Center Decorative Element */}
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse"
                }}
            >
                <svg width="200" height="200" viewBox="0 0 100 100">
                    <g stroke="rgba(255,165,0,0.1)" fill="none">
                        <circle cx="50" cy="50" r="45" />
                        <circle cx="50" cy="50" r="35" />
                        <circle cx="50" cy="50" r="25" />
                        <path d="M20,50 H80 M50,20 V80" />
                        <path d="M29.3,29.3 L70.7,70.7 M29.3,70.7 L70.7,29.3" />
                    </g>
                </svg>
            </motion.div>
        </div>
    );
};

const EventsSection = () => {
    const [duplicatedEvents, setDuplicatedEvents] = useState([]);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef(null);
    const controls = useAnimationControls();

    const events = [
        { title: 'Bhangra Wars', image: '/newEvents/bhangra wars.jpg' },
        { title: 'Cultural Night', image: '/events/cultural.png' },
        { title: 'Robotics Challenge', image: '/events/robotics.png' },
        { title: 'Hackathon', image: '/events/hackathon.png' },
        { title: 'Tech Talk', image: '/events/techtalk.png' },
        { title: 'Coding Contest', image: '/events/coding.png' },
    ];

    // Calculate sizes and duplicate events for smooth infinite scroll
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        // Create three sets of events for smooth infinite scroll
        const tripleEvents = [...events, ...events, ...events];
        setDuplicatedEvents(tripleEvents);

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initialize and manage the animation
    useEffect(() => {
        if (!containerWidth) return;

        const startAnimation = () => {
            controls.start({
                x: -containerWidth * 2,
                transition: {
                    duration: 30,
                    ease: 'linear',
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'loop',
                    repeatDelay: 0,
                    from: -containerWidth,
                }
            });
        };

        startAnimation();
    }, [containerWidth, controls]);

    const handleHoverStart = () => {
        controls.stop();
    };

    const handleHoverEnd = () => {
        // Restart the animation from the current position
        controls.start({
            x: -containerWidth * 2,
            transition: {
                duration: 30,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
                repeatDelay: 0,
            }
        });
    };

    return (
        <div className="relative bg-[#1A0F2E] py-10 h-[100vh] flex flex-col justify-center w-full overflow-hidden">
            {/* Add the Cultural Background Component */}
            <CulturalBackground />

            <div className="container mx-auto px-4 mb-12 relative z-10">
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                        Upcoming Events
                    </h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-20 bg-gradient-to-r from-orange-500 to-transparent" />
                        <div className="text-orange-500 text-2xl">❈</div>
                        <div className="h-px w-20 bg-gradient-to-l from-orange-500 to-transparent" />
                    </div>
                </motion.div>
            </div>

            <div
                ref={containerRef}
                className="w-full py-4 mx-auto overflow-hidden relative z-10"
            >
                <motion.div
                    className="carousel-container relative"
                    onMouseEnter={handleHoverStart}
                    onMouseLeave={handleHoverEnd}
                    animate={controls}
                    initial={{ x: -containerWidth }}
                >
                    <motion.div
                        className="flex gap-6 md:gap-8 overflow-y-scroll"
                    >
                        {duplicatedEvents.map((event, index) => (
                            <motion.div
                                key={`${event.title}-${index}`}
                                className="relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[440px] group"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "tween", duration: 0.3 }}
                            >
                                <div className="bg-[#2A1F3D] rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-orange-500/30">
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/20 rounded-xl transition-all duration-300" />

                                    <div className="relative h-[50vh] w-full">
                                        <Image
                                            src={event.image}
                                            fill
                                            alt={event.title}
                                            className="object-cover"
                                            priority={index < 2}
                                        />
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            animate={{
                                                background: [
                                                    'linear-gradient(45deg, rgba(255, 123, 0, 0.1) 0%, transparent 100%)',
                                                    'linear-gradient(45deg, rgba(0, 200, 83, 0.1) 0%, transparent 100%)'
                                                ]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                repeatType: "reverse"
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F2E]/90 via-[#2A1F3D]/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                                            <motion.button
                                                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:scale-105 shadow-lg"
                                                whileHover={{
                                                    boxShadow: '0 0 20px rgba(255, 123, 0, 0.5)'
                                                }}
                                                onClick={() => console.log(`Exploring ${event.title}`)}
                                            >
                                                Explore Now
                                            </motion.button>
                                        </div>
                                    </div>
                                    <div className="p-6 relative">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-200 text-center group-hover:text-orange-400 transition-colors duration-300">
                                            {event.title}
                                        </h3>
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default EventsSection;
