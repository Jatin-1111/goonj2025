"use client"
import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const EventsSection = () => {
    const [duplicatedEvents, setDuplicatedEvents] = useState([]);
    const [containerWidth, setContainerWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const controls = useAnimationControls();
    const currentPositionRef = useRef(-containerWidth);
    const animationDuration = 30;
    const headerRef = useRef(null);
    const dividerLeftRef = useRef(null);
    const dividerRightRef = useRef(null);
    const symbolRef = useRef(null);

    const events = [
        { title: 'Bhangra Wars', image: '/newEvents/bhangra wars.jpg' },
        { title: 'Cultural Night', image: '/events/cultural.png' },
        { title: 'Robotics Challenge', image: '/events/robotics.png' },
        { title: 'Hackathon', image: '/events/hackathon.png' },
        { title: 'Tech Talk', image: '/events/techtalk.png' },
        { title: 'Coding Contest', image: '/events/coding.png' },
        { title: 'Bhangra Wars', image: '/newEvents/bhangra wars.jpg' },
        { title: 'Cultural Night', image: '/events/cultural.png' },
        { title: 'Robotics Challenge', image: '/events/robotics.png' },
        { title: 'Hackathon', image: '/events/hackathon.png' },
        { title: 'Tech Talk', image: '/events/techtalk.png' },
        { title: 'Coding Contest', image: '/events/coding.png' },
    ];

    useEffect(() => {
        // GSAP animation for the dividers
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: headerRef.current,
                start: 'top center',
                toggleActions: 'play none none reverse'
            }
        });

        timeline
            .from(dividerLeftRef.current, {
                width: 0,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            })
            .from(dividerRightRef.current, {
                width: 0,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            }, '-=0.8')
            .from(symbolRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
            }, '-=0.5');

        // Start the Framer Motion sequence
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        });

        return () => {
            if (timeline.scrollTrigger) {
                timeline.scrollTrigger.kill();
            }
        };
    }, [controls]);

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.6, 0.01, -0.05, 0.95]
            }
        })
    };

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

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === events.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? events.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative bg-[#1A0F2E] flex flex-col justify-center min-h-screen w-full overflow-hidden">
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

            {/* Desktop View (md and above) */}
            <div className="hidden md:block">
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
                                                <Link href={'/register'}>
                                                    <motion.button
                                                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:scale-105 shadow-lg"
                                                        whileHover={{
                                                            boxShadow: '0 0 20px rgba(255, 123, 0, 0.5)'
                                                        }}
                                                    >
                                                        Explore Now
                                                    </motion.button>
                                                </Link>
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

            {/* Mobile View (smaller than md) */}
            <div className="md:hidden relative w-full max-w-screen-xl mx-auto px-4">
                <div className="relative">
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative h-[400px] w-full max-w-lg mx-auto">
                            <Image
                                src={events[currentIndex].image}
                                fill
                                alt={events[currentIndex].title}
                                className="object-cover rounded-xl"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F2E]/90 via-[#2A1F3D]/70 to-transparent rounded-xl">
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-2xl font-bold text-white text-center mb-4">
                                        {events[currentIndex].title}
                                    </h3>
                                    <Link href="/register" className="block w-full">
                                        <motion.button
                                            className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Explore Now
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Mobile Navigation Buttons */}
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 transform -translate-x-2"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 transform translate-x-2"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Mobile Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        {events.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
                                    ? 'bg-orange-500 w-4'
                                    : 'bg-gray-400 hover:bg-orange-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsSection;