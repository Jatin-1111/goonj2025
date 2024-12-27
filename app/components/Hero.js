import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import EventsSection from './Infinitecarousel';

const Hero = () => {
    return (
        <>
            <div className="hero-container relative bg-black flex flex-col justify-center items-center h-[70vh] px-4">

                {/* Animated Logo */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-6"
                >
                    <Image
                        src="/goonjlogow.png"
                        width={200}
                        height={200}
                        alt="Goonj Logo"
                        className="animate-bounce"
                    />
                </motion.div>

                {/* Animated Title */}
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-4"
                >
                    What is Goonj?
                </motion.h1>

                {/* Animated Paragraph */}
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-center text-white text-lg md:text-xl lg:text-2xl w-full sm:w-[90%] md:w-[70%] lg:w-[50%] leading-relaxed"
                >
                    Goonj is the annual Techno-Cultural fest of the University Institute of Engineering and Technology (UIET), organized by the students of the University. The spirit of the fest is to promote cultural as well as technical alacrity among the students. Moreover, the motive is to spread a zeal among students, relieving them from the stressful schedule of an engineering atmosphere.
                </motion.p>
            </div>

            {/* Event Section */}
            <EventsSection />
        </>
    );
};

export default Hero;
