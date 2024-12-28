"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Diamond, Award, Medal, ExternalLink } from 'lucide-react';

const SponsorPage = () => {
    const sponsorTiers = [
        {
            title: "Diamond Sponsors",
            icon: Diamond,
            sponsors: [
                { name: "TechCorp India", type: "Title Sponsor", logo: "/api/placeholder/200/100" },
                { name: "InnovateHub", type: "Platform Sponsor", logo: "/api/placeholder/200/100" }
            ]
        },
        {
            title: "Gold Sponsors",
            icon: Award,
            sponsors: [
                { name: "CloudTech Solutions", type: "Cloud Partner", logo: "/api/placeholder/180/90" },
                { name: "Digital Dreams", type: "Digital Partner", logo: "/api/placeholder/180/90" }
            ]
        },
        {
            title: "Silver Sponsors",
            icon: Medal,
            sponsors: [
                { name: "StartUp Valley", type: "Startup Partner", logo: "/api/placeholder/160/80" },
                { name: "EduTech Pro", type: "Education Partner", logo: "/api/placeholder/160/80" }
            ]
        }
    ];

    const containerVariants = {
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
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-32 sm:pt-36 md:pt-40 pb-12 overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-[url('/patterns/rangoli.png')] opacity-[0.02]" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-transparent to-cyan-950/30" />
                <motion.div
                    className="fixed inset-0 pointer-events-none"
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 30%, rgba(251, 146, 60, 0.03) 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.03) 0%, transparent 50%)'
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.div
                        className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-cyan-500 rounded-2xl"
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
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-400 text-transparent bg-clip-text mb-4">
                        Our Sponsors
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Meet the visionary partners who make Goonj 2025 possible through their generous support
                    </p>
                </div>

                {/* Sponsors Grid */}
                <div className="space-y-12">
                    {sponsorTiers.map((tier, index) => (
                        <motion.div
                            key={tier.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <tier.icon className="w-6 h-6 text-orange-500" />
                                <h2 className="text-2xl font-semibold text-gray-200">{tier.title}</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {tier.sponsors.map((sponsor, sIndex) => (
                                    <motion.div
                                        key={sponsor.name}
                                        whileHover={{ scale: 1.02 }}
                                        className="group"
                                    >
                                        <Card className="bg-gray-900/90 backdrop-blur-sm border-2 border-orange-900/50 overflow-hidden">
                                            <CardContent className="p-6">
                                                <div className="flex flex-col items-center text-center">
                                                    <div className="mb-4 relative">
                                                        <img
                                                            src={sponsor.logo}
                                                            alt={`${sponsor.name} logo`}
                                                            className="rounded-lg transition-all duration-300 group-hover:brightness-110"
                                                        />
                                                        <motion.div
                                                            className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-cyan-500/10 rounded-lg"
                                                            initial={{ opacity: 0 }}
                                                            whileHover={{ opacity: 1 }}
                                                        />
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-gray-200 mb-2">
                                                        {sponsor.name}
                                                    </h3>
                                                    <Badge variant="secondary" className="bg-cyan-900/50 text-cyan-300">
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

                {/* Become a Sponsor CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-orange-900/50">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold text-gray-200 mb-4">
                                Become a Sponsor
                            </h2>
                            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                                Join our community of innovative partners and help shape the future of technology and culture at UIET premier festival.
                            </p>
                            <Button
                                className="bg-gradient-to-r from-orange-500 to-cyan-500 text-white font-semibold px-8 py-6 rounded-lg hover:brightness-110 transition-all"
                            >
                                <span className="mr-2">Get Sponsorship Details</span>
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SponsorPage;