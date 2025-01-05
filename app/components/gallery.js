import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimationFrame } from 'framer-motion';
import { ArrowRight, Pause, Play } from 'lucide-react';
import Image from 'next/image';

const galleryItems = [
    // Your original items array...
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
    const scrollRef = useRef(null);
    const [paths, setPaths] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [duplicateSets, setDuplicateSets] = useState(2);
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
    const [userScrolling, setUserScrolling] = useState(false);
    const scrollTimeout = useRef(null);
    const lastScrollPosition = useRef(0);
    const lastTime = useRef(performance.now());
    const scrollVelocity = useRef(2); // Controls auto-scroll speed

    // Generate duplicate items with unique keys
    const generateDuplicateItems = (numSets) => {
        return Array.from({ length: numSets }, (_, setIndex) =>
            galleryItems.map(item => ({
                ...item,
                id: `${item.id}-${setIndex}`,
            }))
        ).flat();
    };

    const [displayItems, setDisplayItems] = useState(generateDuplicateItems(duplicateSets));

    // Handle user scroll end detection with smooth transition
    const handleScrollEnd = () => {
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
        scrollTimeout.current = setTimeout(() => {
            setUserScrolling(false);
            lastScrollPosition.current = scrollRef.current?.scrollLeft || 0;
        }, 200);
    };

    // Handle scroll events
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            const currentPosition = scrollContainer.scrollLeft;
            setScrollPosition(currentPosition);

            // Detect user scrolling
            if (Math.abs(currentPosition - lastScrollPosition.current) > 1) {
                setUserScrolling(true);
                handleScrollEnd();
            }

            lastScrollPosition.current = currentPosition;
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    // Optimized smooth auto-scroll animation
    useAnimationFrame(() => {
        if (scrollRef.current && autoScrollEnabled && !isDragging && !isHovering && !userScrolling) {
            const scrollContainer = scrollRef.current;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const scrollThreshold = maxScroll * 0.7;

            // Use a constant velocity for smoother motion
            const scrollSpeed = 3; // Increased speed
            let newPosition = scrollPosition + scrollSpeed;

            // Add new content before reaching the end
            if (newPosition > scrollThreshold) {
                setDuplicateSets(prev => prev + 1);
                setDisplayItems(generateDuplicateItems(duplicateSets + 1));
            }

            // Use requestAnimationFrame for smoother scrolling
            requestAnimationFrame(() => {
                if (scrollContainer) {
                    scrollContainer.scrollLeft = newPosition;
                    setScrollPosition(newPosition);
                    lastScrollPosition.current = newPosition;
                }
            });
        }
    });

    // Group items for the bento grid layout
    const groupedItems = displayItems.reduce((acc, item, index) => {
        const groupIndex = Math.floor(index / 4);
        if (!acc[groupIndex]) acc[groupIndex] = [];
        acc[groupIndex].push(item);
        return acc;
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
            className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0D0221] via-[#150634] to-[#0D0221]"
        >
            {/* Background patterns and header remain the same... */}
            <div className="sticky top-0 py-16">
                <motion.div
                    style={{ y: titleY }}
                    className="container mx-auto px-4 mb-12 relative z-10"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-center text-orange-50 mb-4"
                    >
                        Past <span className="text-orange-400">Glimpses</span>
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
                    ref={scrollRef}
                    style={{
                        scale,
                        opacity,
                        rotateX: rotate,
                        perspective: "1000px"
                    }}
                    className="overflow-x-auto overflow-y-hidden py-10 relative z-10 cursor-grab active:cursor-grabbing"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
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
                    <p className="text-sm">
                        {autoScrollEnabled ?
                            "Scroll Horizontally" :
                            "Manual scroll mode - Click resume for auto-scroll"
                        }
                    </p>
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