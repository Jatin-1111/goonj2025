"use client"
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Microscope, TestTube, Dna } from 'lucide-react';
import Image from 'next/image';
import SponserCTA from '../components/sponsercta';

const SponsorPage = () => {
    const [hoveredTier, setHoveredTier] = useState(null);

    const sponsorTiers = [
        {
            title: "Platinum Partners",
            icon: Dna,
            description: "Leading innovators in biotechnology",
            perks: ["Premier lab naming rights", "Research collaboration", "Innovation showcase"],
            color: "from-blue-400 to-indigo-400",
            sponsors: [
                { name: "BioGen Labs", type: "Research Partner", logo: "/api/placeholder/200/100" },
                { name: "LifeScience Pro", type: "Innovation Partner", logo: "/api/placeholder/200/100" }
            ]
        },
        {
            title: "Research Allies",
            icon: Microscope,
            description: "Key supporters of scientific advancement",
            perks: ["Lab space branding", "Research access", "Exhibition space"],
            color: "from-indigo-400 to-purple-400",
            sponsors: [
                { name: "CellTech Solutions", type: "Cell Research Partner", logo: "/api/placeholder/180/90" },
                { name: "GenomicsDirect", type: "Genomics Partner", logo: "/api/placeholder/180/90" }
            ]
        },
        {
            title: "Innovation Partners",
            icon: TestTube,
            description: "Catalysts of biotechnology progress",
            perks: ["Brand visibility", "Event presence", "Network access"],
            color: "from-purple-400 to-pink-400",
            sponsors: [
                { name: "BioStartup Hub", type: "Startup Partner", logo: "/api/placeholder/160/80" },
                { name: "LabTech Pro", type: "Equipment Partner", logo: "/api/placeholder/160/80" }
            ]
        }
    ];

    // DNA Helix Animation Component
    const DNAHelix = () => (
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-full"
                    style={{ top: `${i * 20}%` }}
                    animate={{
                        x: [-100, 100, -100],
                        rotateX: [0, 180, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "linear"
                    }}
                >
                    <div className="flex justify-around">
                        {Array.from({ length: 5 }).map((_, j) => (
                            <motion.div
                                key={j}
                                className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.7, 0.3]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    delay: j * 0.5
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const ScrollingHelix = () => {
        const [moleculePositions, setMoleculePositions] = useState([]);
        const { scrollYProgress } = useScroll();

        // Create smooth rotation animation linked to scroll
        const rotation = useTransform(scrollYProgress, [0, 1], [0, 720]);
        const smoothRotation = useSpring(rotation, { stiffness: 100, damping: 30 });

        useEffect(() => {
            // Generate positions for DNA molecules
            const positions = Array.from({ length: 20 }, (_, index) => ({
                left: Math.sin(index * 0.5) * 50 + 50,
                delay: index * 0.2,
                id: index,
            }));
            setMoleculePositions(positions);
        }, []);

        return (
            <div className="fixed inset-0 pointer-events-none">
                {/* Left Helix Strand */}
                <div className="absolute left-0 top-0 h-full w-1/6">
                    {moleculePositions.map((pos) => (
                        <motion.div
                            key={`left-${pos.id}`}
                            className="absolute w-4 h-4"
                            style={{
                                top: `${(pos.id * 5)}%`,
                                left: `${pos.left}%`,
                            }}
                            animate={{
                                x: [-20, 20, -20],
                                rotate: smoothRotation
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    duration: 3,
                                    delay: pos.delay,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <motion.div
                                className="w-full h-full rounded-full bg-gradient-to-r from-emerald-400/40 to-teal-400/40"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: pos.delay
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Right Helix Strand */}
                <div className="absolute right-0 top-0 h-full w-1/6">
                    {moleculePositions.map((pos) => (
                        <motion.div
                            key={`right-${pos.id}`}
                            className="absolute w-4 h-4"
                            style={{
                                top: `${(pos.id * 5)}%`,
                                right: `${pos.left}%`,
                            }}
                            animate={{
                                x: [20, -20, 20],
                                rotate: smoothRotation
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    duration: 3,
                                    delay: pos.delay,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <motion.div
                                className="w-full h-full rounded-full bg-gradient-to-r from-blue-400/40 to-purple-400/40"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: pos.delay
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Connecting Lines */}
                {moleculePositions.map((pos) => (
                    <motion.div
                        key={`connector-${pos.id}`}
                        className="absolute left-0 w-full h-px"
                        style={{
                            top: `${(pos.id * 5)}%`,
                        }}
                        animate={{
                            background: [
                                "linear-gradient(90deg, rgba(96, 165, 250, 0.2) 0%, transparent 30%, transparent 70%, rgba(147, 51, 234, 0.2) 100%)",
                                "linear-gradient(90deg, rgba(96, 165, 250, 0.4) 0%, transparent 30%, transparent 70%, rgba(147, 51, 234, 0.4) 100%)",
                                "linear-gradient(90deg, rgba(96, 165, 250, 0.2) 0%, transparent 30%, transparent 70%, rgba(147, 51, 234, 0.2) 100%)"
                            ],
                            rotate: smoothRotation
                        }}
                        transition={{
                            background: {
                                duration: 2,
                                repeat: Infinity,
                                delay: pos.delay
                            }
                        }}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="bg-gradient-to-b from-gray-950 via-emerald-950 to-gray-950 py-44 overflow-x-hidden min-h-screen flex justify-center items-center relative">
            {/* DNA Helix Background */}
            <DNAHelix />

            {/* Scrolling Helix Animation */}
            <ScrollingHelix />

            {/* Molecular Pattern Background */}
            <div className="fixed inset-0 pointer-events-none opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="molecularPattern" width="50" height="50" patternUnits="userSpaceOnUse">
                            <circle cx="25" cy="25" r="1" fill="url(#bioGradient)">
                                <animate
                                    attributeName="r"
                                    values="1;3;1"
                                    dur="4s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                            <path d="M25 25 L40 40" stroke="url(#bioGradient)" strokeWidth="0.5">
                                <animate
                                    attributeName="stroke-opacity"
                                    values="0.3;0.7;0.3"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </path>
                        </pattern>
                        <linearGradient id="bioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#molecularPattern)" />
                </svg>
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section */}
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <motion.div
                        className="w-20 h-20 mx-auto mb-8 relative"
                        whileHover={{ scale: 1.1 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full"
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <Dna className="absolute inset-0 m-auto w-10 h-10 text-gray-950" />
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-transparent bg-clip-text mb-6">
                        Our Sponsors
                    </h1>
                    <p className="text-emerald-200/80 text-xl max-w-2xl mx-auto mb-8">
                        Partnering with leaders in biotechnology to drive innovation and research
                    </p>
                </motion.div>

                {/* Sponsors Grid */}
                <div className="space-y-16">
                    {sponsorTiers.map((tier, index) => (
                        <motion.div
                            key={tier.title}
                            variants={itemVariants}
                            onHoverStart={() => setHoveredTier(tier.title)}
                            onHoverEnd={() => setHoveredTier(null)}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <motion.div
                                    className={`p-3 rounded-xl bg-gradient-to-br ${tier.color}`}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <tier.icon className="w-6 h-6 text-gray-950" />
                                </motion.div>
                                <div>
                                    <h2 className="text-3xl font-bold text-emerald-100">{tier.title}</h2>
                                    <p className="text-emerald-200/70 mt-1">{tier.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {tier.sponsors.map((sponsor, sIndex) => (
                                    <motion.div
                                        key={sponsor.name}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.03 }}
                                        className="group"
                                    >
                                        <Card className="bg-indigo-950/50 backdrop-blur-sm border-2 border-blue-500/20 overflow-hidden">
                                            <CardContent className="p-8">
                                                <div className="flex flex-col items-center text-center">
                                                    <div className="mb-6 relative w-full h-32">
                                                        <Image
                                                            src={sponsor.logo}
                                                            alt={`${sponsor.name} logo`}
                                                            fill
                                                            className="rounded-lg object-contain transition-all duration-300 group-hover:brightness-110"
                                                        />
                                                        <motion.div
                                                            className={`absolute inset-0 bg-gradient-to-r ${tier.color} rounded-lg opacity-0 group-hover:opacity-20`}
                                                            initial={false}
                                                            animate={hoveredTier === tier.title ? { scale: [1, 1.02] } : { scale: 1 }}
                                                            transition={{ duration: 0.5, repeat: hoveredTier === tier.title ? Infinity : 0, repeatType: "reverse" }}
                                                        />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-indigo-100 mb-3">
                                                        {sponsor.name}
                                                    </h3>
                                                    <Badge
                                                        variant="secondary"
                                                        className={`bg-gradient-to-r ${tier.color} text-blue-200/80 font-semibold`}
                                                    >
                                                        {sponsor.type}
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <SponserCTA />
            </motion.div>
        </div>
    );
};

export default SponsorPage;