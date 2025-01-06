"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import ReactDOM from 'react-dom';

const EventModal = ({ isOpen, onClose, event }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                if (selectedImage) {
                    setSelectedImage(null);
                } else if (isOpen) {
                    onClose();
                }
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, selectedImage]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 300,
                duration: 0.3,
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: 20,
            transition: { duration: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-gradient-to-b from-[#0D0221]/95 via-[#150634]/95 to-[#0D0221]/95 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 overflow-y-auto"
                        onClick={onClose}
                    >
                        <div className="min-h-full flex items-center justify-center p-4">
                            <motion.div
                                className="bg-gradient-to-br from-[#0D0221] to-[#150634] rounded-xl w-full max-w-5xl relative shadow-2xl border border-cyan-400/20"
                                onClick={e => e.stopPropagation()}
                                whileHover={{ scale: 1.005 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                {/* Corner Accents */}
                                {[0, 1, 2, 3].map((i) => (
                                    <motion.div
                                        key={`corner-${i}`}
                                        className="absolute w-16 h-16"
                                        style={{
                                            top: i < 2 ? 0 : 'auto',
                                            bottom: i >= 2 ? 0 : 'auto',
                                            left: i % 2 === 0 ? 0 : 'auto',
                                            right: i % 2 === 1 ? 0 : 'auto',
                                        }}
                                    >
                                        <motion.div
                                            className="absolute w-full h-full"
                                            style={{
                                                background: `linear-gradient(${45 + i * 90}deg, ${i % 2 === 0 ? 'rgba(34,211,238,0.2)' : 'rgba(255,165,0,0.2)'}, transparent)`,
                                            }}
                                            animate={{
                                                opacity: [0.2, 0.4, 0.2],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.5,
                                            }}
                                        />
                                    </motion.div>
                                ))}

                                {/* Header */}
                                <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-gradient-to-r from-[#0D0221]/80 to-[#150634]/80 backdrop-blur-sm border-b border-cyan-400/20">
                                    <div className="flex items-center gap-2">
                                        <motion.span
                                            className="w-2 h-2 rounded-full bg-cyan-400"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 1, 0.5]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                        <span className="text-cyan-100/70 text-sm">Event Details</span>
                                    </div>
                                    <motion.button
                                        onClick={onClose}
                                        className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded-full hover:bg-cyan-400/10 group relative"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <motion.div
                                            className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100"
                                            style={{
                                                background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)"
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-cyan-300/70 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Close
                                        </span>
                                    </motion.button>
                                </div>

                                {/* Content */}
                                <div className="relative p-6 z-10">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <motion.div className="w-full md:w-1/2 space-y-4" variants={itemVariants}>
                                            <motion.div
                                                className="relative aspect-video rounded-lg overflow-hidden ring-2 ring-cyan-400/20 shadow-xl"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                <Image
                                                    src={event.image}
                                                    fill
                                                    alt={event.title}
                                                    className="object-cover"
                                                />
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-t from-[#0D0221]/80 via-transparent to-transparent after:absolute after:inset-0 after:bg-gradient-to-r after:from-cyan-400/10 after:via-orange-400/10 after:to-cyan-400/10 after:opacity-0 after:group-hover/image:opacity-100 after:transition-opacity"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                />
                                            </motion.div>

                                            <div className="grid grid-cols-4 gap-2">
                                                {event.gallery?.grid.slice(0, 4).map((item, idx) => (
                                                    <motion.div
                                                        key={item.id}
                                                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer ring-1 ring-cyan-400/20"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => setSelectedImage(item)}
                                                        transition={{ type: "spring", stiffness: 400 }}
                                                    >
                                                        <Image
                                                            src={item.image}
                                                            fill
                                                            alt={item.title}
                                                            className="object-cover"
                                                        />
                                                        <motion.div
                                                            className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-transparent opacity-0"
                                                            whileHover={{ opacity: 1 }}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {event.gallery?.highlights && (
                                                <motion.div
                                                    className="bg-cyan-400/5 rounded-lg p-4 backdrop-blur-sm border border-cyan-400/20"
                                                    variants={itemVariants}
                                                >
                                                    <h4 className="text-cyan-100 font-semibold mb-2">Event Highlights</h4>
                                                    <motion.ul className="space-y-2">
                                                        {event.gallery.highlights.map((highlight, idx) => (
                                                            <motion.li
                                                                key={idx}
                                                                className="text-cyan-100/70 text-sm flex items-center"
                                                                variants={itemVariants}
                                                                whileHover={{ x: 5 }}
                                                            >
                                                                <motion.span
                                                                    className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2"
                                                                    whileHover={{ scale: 1.5 }}
                                                                />
                                                                {highlight}
                                                            </motion.li>
                                                        ))}
                                                    </motion.ul>
                                                </motion.div>
                                            )}
                                        </motion.div>

                                        <motion.div
                                            className="w-full md:w-1/2 space-y-6"
                                            variants={itemVariants}
                                        >
                                            <motion.div className="space-y-4" variants={itemVariants}>
                                                <motion.h3
                                                    className="text-2xl font-bold text-cyan-100"
                                                    initial={{ opacity: 0, y: -20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    {event.title}
                                                </motion.h3>
                                                <motion.p
                                                    className="text-cyan-100/70 text-sm leading-relaxed border-l-2 border-cyan-400 pl-4"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                >
                                                    {event.description}
                                                </motion.p>
                                            </motion.div>

                                            <motion.div className="flex flex-col space-y-3">
                                                {[
                                                    { Icon: Calendar, label: "Date", value: event.date, color: "cyan" },
                                                    { Icon: Clock, label: "Time", value: event.time, color: "orange" },
                                                    { Icon: MapPin, label: "Venue", value: event.venue, color: "cyan" },
                                                    { Icon: Users, label: "Capacity", value: event.capacity, color: "orange" }
                                                ].map((item, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        className={`flex items-center text-${item.color === 'cyan' ? 'cyan' : 'orange'}-100/70 
                                                            bg-gradient-to-r ${item.color === 'cyan'
                                                                ? 'from-cyan-400/5 to-cyan-400/10'
                                                                : 'from-orange-400/5 to-orange-400/10'} 
                                                            p-3 rounded-lg backdrop-blur-sm border 
                                                            ${item.color === 'cyan' ? 'border-cyan-400/20' : 'border-orange-400/20'}`}
                                                        variants={itemVariants}
                                                        whileHover={{
                                                            scale: 1.02,
                                                            backgroundColor: item.color === 'cyan'
                                                                ? "rgba(34,211,238,0.1)"
                                                                : "rgba(255,165,0,0.1)"
                                                        }}
                                                    >
                                                        <item.Icon className={`w-5 h-5 mr-3 ${item.color === 'cyan' ? 'text-cyan-400' : 'text-orange-400'}`} />
                                                        <div className="flex flex-col">
                                                            <span className={`text-xs ${item.color === 'cyan' ? 'text-cyan-300/50' : 'text-orange-300/50'}`}>
                                                                {item.label}
                                                            </span>
                                                            <span className="text-sm">{item.value}</span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </motion.div>

                                            {/* Register Button */}
                                            <motion.div className="pt-4">
                                                <motion.button
                                                    className="w-full bg-gradient-to-r from-cyan-500 via-orange-500 to-cyan-500 text-white py-4 px-6 rounded-lg font-semibold relative overflow-hidden group"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    animate={{
                                                        background: [
                                                            "linear-gradient(90deg, rgb(6,182,212), rgb(255,165,0), rgb(6,182,212))",
                                                            "linear-gradient(90deg, rgb(255,165,0), rgb(6,182,212), rgb(255,165,0))",
                                                            "linear-gradient(90deg, rgb(6,182,212), rgb(255,165,0), rgb(6,182,212))"
                                                        ]
                                                    }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        ease: "linear"
                                                    }}
                                                >
                                                    <motion.span
                                                        className="absolute inset-0 bg-white/20"
                                                        initial={{ x: "-100%" }}
                                                        whileHover={{ x: "100%" }}
                                                        transition={{
                                                            type: "tween",
                                                            duration: 0.5,
                                                            ease: "easeInOut"
                                                        }}
                                                    />
                                                    Register Now
                                                    <motion.div
                                                        className="absolute inset-0 rounded-lg"
                                                        initial={{ boxShadow: "0 0 0 0 rgba(34,211,238,0)" }}
                                                        whileHover={{
                                                            boxShadow: "0 0 20px 2px rgba(34,211,238,0.3)"
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                </motion.button>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Image Preview Modal */}
                    <AnimatePresence>
                        {selectedImage && (
                            <motion.div
                                className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0D0221]/98 backdrop-blur-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedImage(null)}
                            >
                                {/* Close button for image preview */}
                                <motion.button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded-full hover:bg-cyan-400/10 group"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <motion.div
                                        className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100"
                                        style={{
                                            background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)"
                                        }}
                                    />
                                </motion.button>

                                <motion.div
                                    className="relative max-w-4xl w-full aspect-video"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{
                                        type: "spring",
                                        damping: 25,
                                        stiffness: 200
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-lg border border-cyan-400/20 overflow-hidden">
                                        <Image
                                            src={selectedImage.image}
                                            fill
                                            alt={selectedImage.title}
                                            className="object-contain"
                                        />
                                    </div>

                                    {/* Image border glow animation */}
                                    <motion.div
                                        className="absolute -inset-1 rounded-lg opacity-50"
                                        animate={{
                                            boxShadow: [
                                                "0 0 20px 2px rgba(34,211,238,0.2)",
                                                "0 0 30px 4px rgba(34,211,238,0.3)",
                                                "0 0 20px 2px rgba(34,211,238,0.2)"
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default EventModal;