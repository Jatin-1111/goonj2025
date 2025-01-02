import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EventsSection = () => {
    const [duplicatedEvents, setDuplicatedEvents] = useState([]);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef(null);
    const controls = useAnimationControls();
    const currentPositionRef = useRef(-containerWidth);
    const animationDuration = 30;

    const events = [
        { title: 'Bhangra Wars', image: '/newEvents/bhangra wars.jpg' },
        { title: 'Cultural Night', image: '/events/cultural.png' },
        { title: 'Robotics Challenge', image: '/events/robotics.png' },
        { title: 'Hackathon', image: '/events/hackathon.png' },
        { title: 'Tech Talk', image: '/events/techtalk.png' },
        { title: 'Coding Contest', image: '/events/coding.png' },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        const tripleEvents = [...events, ...events, ...events];
        setDuplicatedEvents(tripleEvents);

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startAnimation = (startPosition = -containerWidth, immediate = false) => {
        currentPositionRef.current = startPosition;
        const endPosition = -containerWidth * 2;
        const distance = Math.abs(endPosition - startPosition);
        const fullDistance = containerWidth;
        const remainingDuration = immediate ? animationDuration : (distance / fullDistance) * animationDuration;

        controls.start({
            x: endPosition,
            transition: {
                duration: remainingDuration,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
                from: startPosition,
                onUpdate: (latest) => {
                    currentPositionRef.current = latest;
                },
            }
        });
    };

    useEffect(() => {
        if (!containerWidth) return;
        startAnimation(-containerWidth, true);
    }, [containerWidth]);

    const handleHoverStart = () => {
        controls.stop();
    };

    const handleHoverEnd = () => {
        startAnimation(currentPositionRef.current);
    };

    const handleNavigation = (direction) => {
        controls.stop();
        
        const itemWidth = containerWidth / events.length;
        const newPosition = direction === 'next' 
            ? currentPositionRef.current - itemWidth 
            : currentPositionRef.current + itemWidth;
        
        currentPositionRef.current = newPosition;

        controls.start({
            x: newPosition,
            transition: { 
                duration: 0.5, 
                ease: 'easeInOut',
                onComplete: () => {
                    startAnimation(newPosition);
                }
            }
        });
    };

    return (
        <div className="relative bg-[#1A0F2E] py-10 flex flex-col justify-center w-full overflow-hidden">
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
                    <motion.div className="flex gap-6 md:gap-8">
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
                                                repeat: Infinity,
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

            <div className="flex justify-center gap-6 mt-8">
                <motion.button
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2A1F3D] text-white hover:bg-orange-500 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigation('prev')}
                >
                    <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2A1F3D] text-white hover:bg-orange-500 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigation('next')}
                >
                    <ChevronRight className="w-6 h-6" />
                </motion.button>
            </div>
        </div>
    );
};

export default EventsSection;