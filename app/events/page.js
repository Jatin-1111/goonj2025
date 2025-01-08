"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Music, Code, Mic, Gamepad, Trophy, InfoIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Link from 'next/link';
import Image from 'next/image';

const EventsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const events = [
        {
            id: 1,
            title: "Code Wars",
            category: "technical",
            date: "2024-12-28",
            time: "10:00 AM - 6:00 PM",
            location: "Computer Labs, UIET",
            description: "Battle it out in this intensive coding competition. Solve algorithmic challenges and compete for exciting prizes.",
            prizePool: "₹20,000",
            teamSize: "1-2 members",
            registrationFee: "₹200",
            image: "/bgIMG3.png",
            rules: [
                "Individual or team of 2 members",
                "Multiple programming languages supported",
                "Internet access will not be provided",
                "3 rounds of increasing difficulty",
                "Time limit of 3 hours per round"
            ],
            icon: Code
        },
        {
            id: 2,
            title: "Battle of Bands",
            category: "cultural",
            date: "2024-12-29",
            time: "5:00 PM - 10:00 PM",
            location: "Main Auditorium",
            description: "Showcase your musical talent! Bring your band and rock the stage with your original compositions or covers.",
            prizePool: "₹30,000",
            teamSize: "4-8 members",
            registrationFee: "₹500 per band",
            image: "/bgIMG3.png",
            rules: [
                "Minimum 4, maximum 8 members per band",
                "20 minutes performance time",
                "Both covers and originals allowed",
                "Equipment must be brought by participants",
                "Sound check 2 hours before performance"
            ],
            icon: Music
        },
        {
            id: 3,
            title: "Gaming Tournament",
            category: "gaming",
            date: "2024-12-30",
            time: "11:00 AM - 8:00 PM",
            location: "E-Sports Arena",
            description: "Compete in Valorant, CS:GO, and FIFA tournaments. Show off your gaming skills!",
            prizePool: "₹15,000",
            teamSize: "Varies by game",
            registrationFee: "₹250",
            image: "/bgIMG3.png",
            rules: [
                "Bring your own peripherals",
                "Tournament structure depends on participants",
                "Multiple game titles available",
                "Team size varies by game",
                "Fair play policy strictly enforced"
            ],
            icon: Gamepad
        }
    ];

    const categories = [
        { id: 'all', label: 'All Events', icon: Trophy },
        { id: 'technical', label: 'Technical', icon: Code },
        { id: 'cultural', label: 'Cultural', icon: Music },
        { id: 'gaming', label: 'Gaming', icon: Gamepad }
    ];

    const filteredEvents = selectedCategory === 'all'
        ? events
        : events.filter(event => event.category === selectedCategory);

    // const getCategoryColor = (category) => {
    //     switch (category) {
    //         case 'technical': return 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30';
    //         case 'cultural': return 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30';
    //         case 'gaming': return 'bg-green-500/20 text-green-400 hover:bg-green-500/30';
    //         default: return 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30';
    //     }
    // };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -10,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const heroVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#051020] text-gray-200 overflow-x-hidden">
            {/* Hero Section */}
            <motion.div
                className="relative pt-24 sm:pt-28 bg-gradient-to-b from-[#051020] via-[#091830] to-[#051020] text-white pb-12 sm:pb-16"
                initial="hidden"
                animate="visible"
                variants={heroVariants}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 mt-8 sm:mt-12">
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        GOONJ 2025 Events
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        UIET&apos;s Techno-Cultural Fest
                    </motion.p>
                    <motion.p
                        className="text-base sm:text-lg max-w-2xl mx-auto text-blue-100/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Explore the frontiers of technology through data analytics, cloud computing, cybersecurity, and more.
                    </motion.p>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative">
                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="sticky top-24 sm:top-28 z-40 bg-[#051020]/90 backdrop-blur-sm py-2 border-b border-cyan-500/20"
                >
                    <Tabs defaultValue="all" className="mb-6 sm:mb-8">
                        <TabsList className="flex justify-center w-full bg-[#071428]/50 backdrop-blur-sm">
                            {categories.map(category => (
                                <TabsTrigger
                                    key={category.id}
                                    value={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="flex items-center gap-2 data-[state=active]:bg-[#0A2540] data-[state=active]:text-cyan-400 px-3 py-2 text-sm sm:text-base relative group"
                                >
                                    <category.icon className="w-4 h-4" />
                                    {category.label}
                                    <motion.div
                                        className="absolute inset-0 border-b-2 border-cyan-500 scale-x-0 opacity-0 group-hover:opacity-100"
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </motion.div>

                {/* Events Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence mode='wait'>
                        {filteredEvents.map(event => (
                            <motion.div
                                key={event.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{
                                    opacity: 0,
                                    y: 20,
                                    transition: { duration: 0.2 }
                                }}
                                whileHover="hover"
                                layout
                            >
                                <Card className="bg-[#071428]/50 backdrop-blur-sm h-full border-cyan-500/20 hover:bg-[#0A2540]/70 transition-colors relative group">
                                    {/* Animated border */}
                                    <div className="absolute inset-0 border border-cyan-500/20 rounded-lg">
                                        <motion.div
                                            className="absolute inset-0 border-t-2 border-r-2 border-cyan-500/40 rounded-lg"
                                            animate={{
                                                pathLength: [0, 1],
                                                opacity: [0, 1],
                                            }}
                                            transition={{
                                                duration: 1,
                                                ease: "easeInOut",
                                                delay: 0.2,
                                            }}
                                        />
                                    </div>

                                    <AspectRatio ratio={16 / 9} className="bg-[#051020] relative group">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            animate={{
                                                backgroundPosition: ["0% 0%", "100% 100%"],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                            }}
                                        />
                                    </AspectRatio>

                                    <CardHeader className="pb-4 space-y-2">
                                        <div className="flex justify-between items-start gap-2">
                                            <div className="space-y-1">
                                                <CardTitle className="text-lg sm:text-xl font-bold text-cyan-50 font-mono">
                                                    {event.title}
                                                </CardTitle>
                                                <Badge className="mt-1 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30">
                                                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                                </Badge>
                                            </div>
                                            <event.icon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 flex-shrink-0" />
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="space-y-4">
                                            <CardDescription className="text-cyan-100/80 text-sm sm:text-base">
                                                {event.description}
                                            </CardDescription>

                                            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                                                {/* Event details with tech styling */}
                                                <div className="flex items-center gap-2 text-cyan-200/70">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{new Date(event.date).toLocaleDateString('en-IN', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-cyan-200/70">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{event.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-cyan-200/70">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{event.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-cyan-200/70">
                                                    <Users className="w-4 h-4" />
                                                    <span>{event.teamSize}</span>
                                                </div>
                                            </div>

                                            <Separator className="bg-cyan-800/30" />

                                            <div className="flex justify-between items-center text-xs sm:text-sm">
                                                <div className="text-cyan-200/70">
                                                    Registration Fee: {event.registrationFee}
                                                </div>
                                                <div className="font-semibold text-cyan-400">
                                                    Prize Pool: {event.prizePool}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="flex-1 border border-cyan-700/50 bg-[#071428]/50 hover:bg-[#0A2540] text-cyan-300 hover:text-cyan-200 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 group"
                                                        >
                                                            <InfoIcon className="w-4 h-4 mr-2 group-hover:text-cyan-400 transition-colors" />
                                                            Details
                                                        </Button>
                                                    </DialogTrigger>
                                                    {/* Dialog content remains the same with updated styling */}
                                                </Dialog>

                                                <Link href="/register" className="flex-1">
                                                    <Button
                                                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            Register Now
                                                            <motion.div
                                                                animate={{ x: [0, 4, 0] }}
                                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                            >
                                                                →
                                                            </motion.div>
                                                        </span>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Floating Action Button */}
            <motion.div
                className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
            >
                <Link href="/register">
                    <Button
                        size="lg"
                        className="hidden md:inline-flex bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:from-cyan-500 hover:to-blue-500 transition-all backdrop-blur-sm"
                    >
                        Register for Goonj 2025
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
};

export default EventsPage;