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

    const handleHoverStart = () => {
        controls.stop();
    };

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
        <div className="bg-black py-10 h-[90vh] flex flex-col justify-center">
            <div className="container mx-auto px-4 mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-8">
                    Upcoming Events
                </h2>
            </div>
            
            <div className="w-full max-w-[95vw] h-[100vh] py-4 mx-auto overflow-hidden">
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
                                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30">
                                    <div className="relative h-[50vh] w-full">
                                        <Image
                                            src={event.image}
                                            fill
                                            alt={event.title}
                                            className="object-cover"
                                            priority={index < 2}
                                        />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                                            <button
                                                className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:scale-105 shadow-lg"
                                                onClick={() => console.log(`Exploring ${event.title}`)}
                                            >
                                                Explore Now
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl md:text-2xl font-bold text-white text-center group-hover:text-blue-400 transition-colors duration-300">
                                            {event.title}
                                        </h3>
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
