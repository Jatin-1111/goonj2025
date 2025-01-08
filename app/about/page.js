"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutUs = () => {
    const sections = [
        {
            id: 'uiet',
            title: 'About UIET',
            image: '/UIET_logo.png',
            description: `University Institute of Engineering and Technology (UIET) is a premier engineering institute, established in 2002 as part of Panjab University. 
            It has emerged as a leading center for engineering education in North India, offering various undergraduate and postgraduate programs in engineering and technology.
            The institute focuses on holistic development through technical education, research opportunities, and vibrant campus life.`,
            stats: [
                { label: 'Students', value: '2500+' },
                { label: 'Faculty Members', value: '100+' },
                { label: 'Research Papers', value: '1000+' },
                { label: 'Courses', value: '12+' }
            ]
        },
        {
            id: 'pu',
            title: 'About Panjab University',
            image: '/pu-logo.png',
            description: `Panjab University is one of India's oldest universities, established in 1882. Located in Chandigarh, it has earned reputation for excellence in higher education and research.
            The university has produced numerous distinguished alumni who have made significant contributions in various fields including science, arts, politics, and industry.
            It continues to be a symbol of academic excellence and cultural heritage.`,
            stats: [
                { label: 'World Ranking', value: 'Top 1000' },
                { label: 'Departments', value: '78+' },
                { label: 'Students', value: '15000+' },
                { label: 'Research Centers', value: '15+' }
            ]
        },
        {
            id: 'goonj',
            title: 'About Goonj',
            image: '/goonj.jpg',
            description: `Goonj is UIET's flagship annual techno-cultural festival that brings together talent, creativity, and innovation. 
            It serves as a platform for students to showcase their technical prowess and cultural talents through various competitions, workshops, and performances.
            The festival embodies the spirit of engineering and artistry, fostering a vibrant community of future innovators and leaders.`,
            stats: [
                { label: 'Events', value: '50+' },
                { label: 'Participants', value: '5000+' },
                { label: 'Prize Pool', value: '₹2L+' },
                { label: 'Workshops', value: '10+' }
            ]
        }
    ];

   // GSAP-like animation variants
   const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smoother motion
        }
    }
};

// ScrollTrigger-like intersection observer animation
const useScrollAnimation = (threshold = 0.1) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const elementRef = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [threshold]);

    return [elementRef, isVisible];
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

// Enhanced Binary rain effect component with GSAP-like animations
const BinaryRain = () => {
    const characters = Array.from({ length: 50 }).map(() => ({
        id: Math.random(),
        x: Math.random() * 100,
        speed: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        fontSize: Math.random() * 16 + 12
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {characters.map((char) => (
                <motion.div
                    key={char.id}
                    className="absolute text-green-500 font-mono"
                    style={{
                        left: `${char.x}%`,
                        fontSize: `${char.fontSize}px`,
                        textShadow: '0 0 8px rgba(74, 222, 128, 0.5)'
                    }}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{
                        y: ['-5vh', '105vh'],
                        opacity: [0, 0.7, 0]
                    }}
                    transition={{
                        y: {
                            duration: char.speed,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: char.delay
                        },
                        opacity: {
                            duration: char.speed,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: char.delay,
                            times: [0, 0.1, 1]
                        }
                    }}
                >
                    {Math.random() > 0.5 ? '1' : '0'}
                </motion.div>
            ))}
        </div>
    );
};

return (
    <div className="bg-[#1A0F2E] overflow-hidden">
        {/* CS-themed Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-b from-[#1A0F2E] via-[#2A1F3D] to-[#1A0F2E] opacity-50" />
        
        {/* Circuit Board Pattern */}
        <div className="fixed inset-0 bg-[url('/circuit-pattern.png')] bg-repeat opacity-5" />
        
        {/* Binary Rain Effect */}
        <BinaryRain />
        
        {/* Dynamic Circuit Glow */}
        <motion.div
            className="fixed inset-0 pointer-events-none"
            animate={{
                background: [
                    'radial-gradient(circle at 20% 30%, rgba(72, 187, 120, 0.08) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 70%, rgba(66, 153, 225, 0.08) 0%, transparent 50%)'
                ]
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
            }}
        />

        {/* Main Content */}
        <motion.div 
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="pt-32 sm:pt-36 md:pt-40 pb-8 sm:pb-12 md:pb-16">
                {/* Title with Tech styling */}
                <motion.div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-50 relative inline-block font-mono"
                        variants={fadeInUpVariants}
                    >
                        {"<AboutUs />"}
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500" />
                    </motion.h1>
                    
                    {/* Code-inspired decorative elements */}
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="h-px w-20 bg-gradient-to-r from-green-500 to-transparent" />
                        <div className="text-green-500 font-mono">{"{...}"}</div>
                        <div className="h-px w-20 bg-gradient-to-l from-green-500 to-transparent" />
                    </div>
                </motion.div>

                <div className="space-y-16 sm:space-y-20 md:space-y-24">
                    {sections.map((section, index) => (
                        <motion.section
                            key={section.id}
                            className="relative backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-green-500/10"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.8 }
                                }
                            }}
                        >
                            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
                                {/* Image with tech glow effect */}
                                <motion.div
                                    className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 relative group"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="relative aspect-square">
                                        <Image
                                            src={section.image}
                                            fill
                                            priority
                                            alt={section.title}
                                            className="object-contain relative z-10"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-xl"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 180, 360],
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                            }}
                                        />
                                    </div>
                                </motion.div>

                                {/* Content with tech styling */}
                                <div className="w-full lg:w-2/3">
                                    <motion.h2
                                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-50 mb-4 sm:mb-6 font-mono"
                                        variants={fadeInUpVariants}
                                    >
                                        {`function ${section.title}() {`}
                                    </motion.h2>
                                    <motion.p
                                        className="text-base sm:text-lg text-orange-100/80 leading-relaxed mb-6 sm:mb-8"
                                        variants={fadeInUpVariants}
                                    >
                                        {section.description}
                                    </motion.p>

                                    {/* Stats with tech styling */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                                        {section.stats.map((stat, statIndex) => (
                                            <motion.div
                                                key={statIndex}
                                                className="bg-[#2A1F3D]/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg text-center border border-green-500/10 hover:border-green-500/30 transition-colors"
                                                whileHover={{
                                                    scale: 1.05,
                                                    transition: { type: "spring", stiffness: 400 }
                                                }}
                                            >
                                                <motion.h3 
                                                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 font-mono"
                                                >
                                                    {stat.value}
                                                </motion.h3>
                                                <p className="text-xs sm:text-sm md:text-base text-green-200/70">
                                                    {stat.label}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Code-inspired separator */}
                            {index !== sections.length - 1 && (
                                <motion.div 
                                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full h-px"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(72, 187, 120, 0.2), transparent)'
                                    }}
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    whileInView={{ scaleX: 1, opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ once: true }}
                                />
                            )}
                        </motion.section>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
);
};

export default AboutUs;