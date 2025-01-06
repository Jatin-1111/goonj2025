"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventCard from './EventCard';
import { events } from './Event-card-utility';
import { useInView } from 'react-intersection-observer';

const NavigationButton = ({ direction, onClick, isDisabled }) => (
    <motion.button
        onClick={onClick}
        className={`group p-4 rounded-xl backdrop-blur-sm transition-all duration-300 pointer-events-auto border
            ${isDisabled
                ? 'bg-black/10 border-cyan-400/20'
                : 'bg-black/20 border-cyan-400/30 hover:border-cyan-400/50'}`}
        whileHover={!isDisabled ? { scale: 1.1 } : {}}
        whileTap={!isDisabled ? { scale: 0.95 } : {}}
    >
        <div className="relative w-8 h-8 flex items-center justify-center">
            {direction === 'prev' ? (
                <>
                    <motion.div
                        className={`absolute w-6 h-px ${isDisabled ? 'bg-cyan-400/30' : 'bg-cyan-400'} rotate-45 origin-left`}
                        whileHover={{ width: '1.75rem' }}
                    />
                    <motion.div
                        className={`absolute w-6 h-px ${isDisabled ? 'bg-cyan-400/30' : 'bg-cyan-400'} -rotate-45 origin-left`}
                        whileHover={{ width: '1.75rem' }}
                    />
                </>
            ) : (
                <>
                    <motion.div
                        className={`absolute w-6 h-px ${isDisabled ? 'bg-cyan-400/30' : 'bg-cyan-400'} rotate-45 origin-right`}
                        whileHover={{ width: '1.75rem' }}
                    />
                    <motion.div
                        className={`absolute w-6 h-px ${isDisabled ? 'bg-cyan-400/30' : 'bg-cyan-400'} -rotate-45 origin-right`}
                        whileHover={{ width: '1.75rem' }}
                    />
                </>
            )}
            <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at center, ${isDisabled ? 'rgba(34,211,238,0.1)' : 'rgba(34,211,238,0.2)'} 0%, transparent 70%)`
                }}
                transition={{ duration: 0.3 }}
            />
        </div>
    </motion.button>
);

const TechPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
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
        </defs>
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
    </svg>
);

const FloatingElements = () => {
    const floatingElements = useMemo(() => {
        return Array(6).fill(null).map((_, i) => ({
            left: `${(i * 20) % 100}%`,
            top: `${(i * 15 + 10) % 100}%`,
            duration: 4 + (i % 3),
            delay: i * 0.5
        }));
    }, []);

    return (
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
    );
};

const MobileView = ({ events }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
    };

    return (
        <div className="relative w-full h-[70vh] flex items-center">
            <div className="w-full overflow-hidden">
                <motion.div
                    className="flex"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{
                        opacity: 1,
                        x: `${-currentIndex * 100}%`
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}
                >
                    {events.map((event, index) => (
                        <motion.div
                            key={`${event.title}-${index}`}
                            className="w-full flex-shrink-0"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{
                                scale: index === currentIndex ? 1 : 0.95,
                                opacity: index === currentIndex ? 1 : 0.5
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4">
                                <EventCard
                                    event={event}
                                    index={index}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute inset-x-4 flex items-center justify-between pointer-events-none">
                <NavigationButton
                    direction="prev"
                    onClick={prevSlide}
                />
                <NavigationButton
                    direction="next"
                    onClick={nextSlide}
                />
            </div>
        </div>
    );
};

const DesktopView = ({ events }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [eventsPerView, setEventsPerView] = useState(3);
    const [slideWidth, setSlideWidth] = useState(0);

    useEffect(() => {
        const updateView = () => {
            const width = window.innerWidth;
            if (width >= 1536) { // 2xl
                setEventsPerView(4);
                setSlideWidth(25);
            } else if (width >= 1280) { // xl
                setEventsPerView(3);
                setSlideWidth(33.333);
            } else {
                setEventsPerView(2);
                setSlideWidth(50);
            }
        };

        updateView();
        window.addEventListener('resize', updateView);
        return () => window.removeEventListener('resize', updateView);
    }, []);

    const nextSlide = () => {
        setCurrentIndex(prev => {
            const nextIndex = prev + eventsPerView;
            // If we would exceed the length, go back to start
            if (nextIndex >= events.length) {
                return 0;
            }
            // If we're near the end but not quite there
            if (nextIndex > events.length - eventsPerView) {
                return events.length - eventsPerView;
            }
            return nextIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex(prev => {
            // If at start, go to last possible starting position
            if (prev === 0) {
                return Math.max(0, events.length - eventsPerView);
            }
            return Math.max(0, prev - eventsPerView);
        });
    };

    // Create a duplicate array of items for smooth infinite scroll
    const displayEvents = [...events];

    return (
        <div className="relative w-full h-[80vh] flex items-center">
            <div className="w-[95%] mx-auto overflow-hidden">
                <motion.div
                    className="flex gap-6 xl:gap-8"
                    initial={{ x: 0 }}
                    animate={{
                        x: `${-(currentIndex * slideWidth)}%`
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20
                    }}
                >
                    {displayEvents.map((event, index) => (
                        <motion.div
                            key={`${event.title}-${index}`}
                            className="w-full flex-shrink-0"
                            style={{
                                width: `${slideWidth}%`,
                                paddingRight: index === events.length - 1 ? 0 : '24px'
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.3
                            }}
                        >
                            <EventCard
                                event={event}
                                index={index}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute inset-x-4 flex items-center justify-between pointer-events-none">
                <NavigationButton
                    direction="prev"
                    onClick={prevSlide}
                />
                <NavigationButton
                    direction="next"
                    onClick={nextSlide}
                />
            </div>
        </div>
    );
};

// MobileView and DesktopView components remain largely the same, just updated with the new theme classes

const EventsSection = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative flex flex-col justify-center min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0D0221] via-[#150634] to-[#0D0221]">
            {/* Background Elements */}
            <TechPattern />
            <FloatingElements />

            {/* Corner Accents */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
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

            {/* Header Section */}
            <div className="container mx-auto px-4 mb-8 sm:mb-12 relative z-10" ref={ref}>
                <AnimatePresence>
                    {inView && (
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.h2
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
                                animate={{
                                    textShadow: [
                                        "0 0 8px rgba(34,211,238,0.3)",
                                        "0 0 16px rgba(34,211,238,0.3)",
                                        "0 0 8px rgba(34,211,238,0.3)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Past Events
                            </motion.h2>
                            <div className="flex items-center justify-center gap-2 sm:gap-4">
                                <motion.div
                                    className="h-px w-12 sm:w-20 bg-gradient-to-r from-cyan-400 to-transparent"
                                    animate={{ scaleX: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.div
                                    className="text-cyan-400 text-xl sm:text-2xl"
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    ❈
                                </motion.div>
                                <motion.div
                                    className="h-px w-12 sm:w-20 bg-gradient-to-l from-cyan-400 to-transparent"
                                    animate={{ scaleX: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Events Display */}
            {isMobile ? (
                <MobileView events={events} />
            ) : (
                <DesktopView events={events} />
            )}
        </div>
    );
};

export default EventsSection;