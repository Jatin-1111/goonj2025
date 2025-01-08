"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Diamond, Award, Medal } from 'lucide-react';
import Image from 'next/image';
import SponserCTA from '../components/sponsercta';


const SponsorPage = () => {
    const [hoveredTier, setHoveredTier] = useState(null);

    const sponsorTiers = [
        {
            title: "Diamond Sponsors",
            icon: Diamond,
            description: "Our premier partners leading innovation",
            perks: ["Premium logo placement", "VIP access", "Custom booth"],
            color: "from-blue-400 to-purple-400",
            sponsors: [
                { name: "TechCorp India", type: "Title Sponsor", logo: "/api/placeholder/200/100" },
                { name: "InnovateHub", type: "Platform Sponsor", logo: "/api/placeholder/200/100" }
            ]
        },
        {
            title: "Gold Sponsors",
            icon: Award,
            description: "Key supporters of our vision",
            perks: ["Featured placement", "Event passes", "Booth space"],
            color: "from-amber-400 to-yellow-400",
            sponsors: [
                { name: "CloudTech Solutions", type: "Cloud Partner", logo: "/api/placeholder/180/90" },
                { name: "Digital Dreams", type: "Digital Partner", logo: "/api/placeholder/180/90" }
            ]
        },
        {
            title: "Silver Sponsors",
            icon: Medal,
            description: "Valuable contributors to success",
            perks: ["Logo display", "Event access", "Recognition"],
            color: "from-gray-400 to-slate-400",
            sponsors: [
                { name: "StartUp Valley", type: "Startup Partner", logo: "/api/placeholder/160/80" },
                { name: "EduTech Pro", type: "Education Partner", logo: "/api/placeholder/160/80" }
            ]
        }
    ];

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

    return (
        <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-44 overflow-x-hidden min-h-screen flex justify-center items-center relative">
            {/* SVG Background Pattern */}
            <div className="fixed inset-0 pointer-events-none opacity-30">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="2" fill="url(#dotGradient)">
                                <animate
                                    attributeName="opacity"
                                    values="0.3;0.7;0.3"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </pattern>
                        <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Enhanced Header Section */}
                <motion.div
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <motion.div
                        className="w-20 h-20 mx-auto mb-8 relative"
                        whileHover={{ scale: 1.1 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-orange-500 to-cyan-500 rounded-2xl"
                            animate={{
                                rotate: [0, 180],
                                borderRadius: ["20%", "50%", "20%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <motion.div
                            className="absolute inset-1 bg-gray-950 rounded-2xl"
                            animate={{
                                rotate: [180, 0],
                                borderRadius: ["20%", "50%", "20%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <Diamond className="absolute inset-0 m-auto w-10 h-10 text-orange-500" />
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-400 text-transparent bg-clip-text mb-6">
                        Our Sponsors
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
                        Meet the visionary partners who make Goonj 2025 possible through their generous support
                    </p>
                </motion.div>

                {/* Enhanced Sponsors Grid */}
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
                                    <tier.icon className="w-6 h-6 text-gray-900" />
                                </motion.div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-200">{tier.title}</h2>
                                    <p className="text-gray-400 mt-1">{tier.description}</p>
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
                                        <Card className="bg-gray-900/90 backdrop-blur-sm border-2 border-orange-900/50 overflow-hidden">
                                            <CardContent className="p-8">
                                                <div className="flex flex-col items-center text-center">
                                                    <div className="mb-6 relative">
                                                        <Image
                                                            src={sponsor.logo}
                                                            alt={`${sponsor.name} logo`}
                                                            fill
                                                            className="rounded-lg transition-all duration-300 group-hover:brightness-110"
                                                        />
                                                        <motion.div
                                                            className={`absolute inset-0 bg-gradient-to-r ${tier.color} rounded-lg opacity-0 group-hover:opacity-20`}
                                                            initial={false}
                                                            animate={hoveredTier === tier.title ? { scale: [1, 1.02] } : { scale: 1 }}
                                                            transition={{ duration: 0.5, repeat: hoveredTier === tier.title ? Infinity : 0, repeatType: "reverse" }}
                                                        />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-gray-200 mb-3">
                                                        {sponsor.name}
                                                    </h3>
                                                    <Badge
                                                        variant="secondary"
                                                        className={`bg-gradient-to-r ${tier.color} text-gray-900 font-semibold`}
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

                {/* Enhanced CTA Section */}
                <SponserCTA />
            </motion.div>
        </div>
    );
};

export default SponsorPage;