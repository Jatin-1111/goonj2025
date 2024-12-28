import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

const EventsSection = () => {
    const controls = useAnimation();

    const events = [
        { title: 'Bhangra Wars', image: '/newEvents/bhangra wars.jpg' },
        { title: 'Cultural Night', image: '/events/cultural.png' },
        { title: 'Robotics Challenge', image: '/events/robotics.png' },
        { title: 'Hackathon', image: '/events/hackathon.png' },
        { title: 'Tech Talk', image: '/events/techtalk.png' },
        { title: 'Coding Contest', image: '/events/coding.png' },
        { title: 'Cultural Night', image: '/events/cultural.png' },
        { title: 'Robotics Challenge', image: '/events/robotics.png' },
        { title: 'Hackathon', image: '/events/hackathon.png' },
        { title: 'Tech Talk', image: '/events/techtalk.png' },
    ];

    useEffect(() => {
        controls.start({
            x: -50 * events.length,
            transition: {
                duration: 20,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
            },
        });
    }, [controls, events.length]);

    const handleHoverStart = () => controls.stop();
    const handleHoverEnd = () => {
        controls.start({
            x: -50 * events.length,
            transition: {
                duration: 20,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
            },
        });
    };

    return (
        <div className="bg-[#1A0F2E] py-10 h-[90vh] flex flex-col justify-center w-full">
            {/* Mandala-inspired Background Pattern */}
            <motion.div 
                className="absolute inset-0"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 30%, rgba(255, 123, 0, 0.08) 0%, transparent 50%)', // Saffron
                        'radial-gradient(circle at 80% 70%, rgba(0, 200, 83, 0.08) 0%, transparent 50%)' // Green
                    ]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
            
            {/* Circuit Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('/circuit-pattern.png')] bg-repeat" />

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
                    {/* Decorative Line with Rangoli-inspired Design */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-20 bg-gradient-to-r from-orange-500 to-transparent" />
                        <div className="text-orange-500 text-2xl">❈</div>
                        <div className="h-px w-20 bg-gradient-to-l from-orange-500 to-transparent" />
                    </div>
                </motion.div>
            </div>
            
            <div className="w-full py-4 mx-auto overflow-hidden relative z-10">
                <motion.div
                    className="carousel-container relative"
                    onMouseEnter={handleHoverStart}
                    onMouseLeave={handleHoverEnd}
                    animate={controls}
                    initial={{ x: 0 }}
                >
                    <motion.div
                        className="flex gap-6 md:gap-8"
                        style={{
                            width: `${events.length * 100}%`,
                        }}
                    >
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                className="relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[440px] group"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "tween", duration: 0.3 }}
                            >
                                <div className="bg-[#2A1F3D] rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-orange-500/30">
                                    {/* Decorative Border */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/20 rounded-xl transition-all duration-300" />
                                    
                                    <div className="relative h-[50vh] w-full">
                                        <Image
                                            src={event.image}
                                            fill
                                            alt={event.title}
                                            className="object-cover"
                                            priority={index < 2}
                                        />
                                        {/* Card Glow Effect with Indian Color Palette */}
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
                                        {/* Overlay on hover with Paisley-inspired pattern */}
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
                                        {/* Card Bottom Gradient with Indian Color Palette */}
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