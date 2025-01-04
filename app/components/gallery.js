import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const galleryItems = [
    // First Group
    {
        id: 1,
        title: "Cultural Festival",
        description: "Annual celebrations showcasing diverse traditions",
        type: "featured",
        layout: "tall"
    },
    {
        id: 2,
        title: "Tech Innovation",
        description: "Latest technological breakthroughs",
        type: "regular"
    },
    {
        id: 3,
        title: "Art Exhibition",
        description: "Contemporary art showcase",
        type: "regular"
    },
    {
        id: 4,
        title: "Music Concert",
        description: "Live performances by talented artists",
        type: "wide"
    },
    // Second Group
    {
        id: 5,
        title: "Scientific Discovery",
        description: "Groundbreaking research findings",
        type: "featured",
        layout: "wide"
    },
    {
        id: 6,
        title: "Sports Event",
        description: "Championship matches and tournaments",
        type: "regular"
    },
    {
        id: 7,
        title: "Fashion Show",
        description: "Trendsetting designs on the runway",
        type: "regular"
    },
    {
        id: 8,
        title: "Food Festival",
        description: "Culinary delights from around the world",
        type: "wide"
    },
    // Third Group
    {
        id: 9,
        title: "Dance Performance",
        description: "Elegant choreography and expression",
        type: "featured",
        layout: "tall"
    },
    {
        id: 10,
        title: "Architecture",
        description: "Innovative structural designs",
        type: "regular"
    },
    {
        id: 11,
        title: "Nature Photography",
        description: "Capturing Earth's natural beauty",
        type: "regular"
    },
    {
        id: 12,
        title: "Urban Life",
        description: "City scenes and street culture",
        type: "wide"
    }
];

const BentoGallery = () => {
    const containerRef = useRef(null);
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

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const springConfig = { stiffness: 100, damping: 30, bounce: 0 };

    const titleY = useSpring(
        useTransform(scrollYProgress, [0, 0.1, 0.25], [-50, -25, 0]),
        springConfig
    );

    const scale = useSpring(
        useTransform(scrollYProgress, [0, 0.1, 0.25], [0.8, 0.9, 1]),
        springConfig
    );

    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.1, 0.25], [0.5, 0.7, 1]),
        springConfig
    );

    const rotate = useSpring(
        useTransform(scrollYProgress, [0, 0.1, 0.25], [5, 2, 0]),
        springConfig
    );

    // Group items for the bento grid layout
    const groupedItems = galleryItems.reduce((acc, item, index) => {
        const groupIndex = Math.floor(index / 4);
        if (!acc[groupIndex]) acc[groupIndex] = [];
        acc[groupIndex].push(item);
        return acc;
    }, []);

    const getItemClasses = (type, layout) => {
        switch (type) {
            case 'featured':
                return layout === 'tall'
                    ? 'row-span-2 col-span-1 h-full'
                    : 'row-span-1 col-span-2 w-full';
            case 'wide':
                return 'col-span-2 row-span-1';
            default:
                return 'col-span-1 row-span-1';
        }
    };

    return (
        <section
            ref={containerRef}
            className="min-h-[100vh] relative overflow-hidden bg-gradient-to-b from-[#0D0221] via-[#150634] to-[#0D0221]"
        >
            {/* Enhanced Background Patterns */}
            <div className="absolute inset-0 z-0">
                {/* Tech Pattern */}
                <svg className="absolute inset-0 w-full h-full">
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

                    {/* Animated Pattern Layers */}
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

                    <motion.rect
                        width="100%"
                        height="100%"
                        fill="url(#mandalaPattern)"
                        animate={{
                            opacity: [0.15, 0.25, 0.15],
                            rotate: 360
                        }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </svg>
            </div>

            <div className="sticky top-0 py-16">
                {/* Header */}
                <motion.div
                    style={{ y: titleY }}
                    className="container mx-auto px-4 mb-12 relative z-10"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-center text-orange-50 mb-4"
                    >
                        Image <span className="text-orange-400">Gallery</span>
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100px" }}
                        transition={{ duration: 0.8 }}
                        className="h-1 bg-orange-500 mx-auto"
                    />
                </motion.div>

                {/* Gallery */}
                <motion.div
                    style={{
                        scale,
                        opacity,
                        rotateX: rotate,
                        perspective: "1000px"
                    }}
                    className="overflow-x-auto overflow-y-hidden py-10 relative z-10"
                >
                    <div className="min-w-max px-4 pb-8">
                        <motion.div className="flex gap-8">
                            {groupedItems.map((group, groupIndex) => (
                                <motion.div
                                    key={groupIndex}
                                    className="grid grid-cols-3 grid-rows-2 gap-4 w-[800px] h-[500px]"
                                    initial={{
                                        y: 50 * (groupIndex + 1),
                                        opacity: 0,
                                    }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.1 * groupIndex,
                                    }}
                                >
                                    {group.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            whileHover={{ scale: 1.02 }}
                                            className={`relative group overflow-hidden rounded-xl bg-[#1A0F1F] border border-cyan-500/20 ${getItemClasses(item.type, item.layout)}`}
                                        >
                                            <Image
                                                src="/api/placeholder/800/600"
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                                fill
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0221]/90 via-[#150634]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <h3 className="text-xl font-bold text-orange-50 mb-2">{item.title}</h3>
                                                    <p className="text-sm text-orange-100/80">{item.description}</p>
                                                </div>
                                            </div>

                                            <motion.div
                                                className="absolute inset-0 border-2 border-orange-500/0 rounded-xl transition-opacity duration-300"
                                                whileHover={{
                                                    borderColor: "rgba(255,165,0,0.2)",
                                                    boxShadow: "0 0 20px rgba(255,165,0,0.1)"
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-2 mt-8 text-orange-100/60 relative z-10"
                >
                    <p className="text-sm">Scroll horizontally</p>
                    <ArrowRight className="w-4 h-4" />
                </motion.div>
            </div>

            {/* Hide Scrollbar */}
            <style jsx global>{`
                .overflow-x-auto::-webkit-scrollbar {
                    display: none;
                }
                .overflow-x-auto {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default BentoGallery;