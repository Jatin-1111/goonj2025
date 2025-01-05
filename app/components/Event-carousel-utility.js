"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import ReactDOM from 'react-dom';

const EventModal = ({ isOpen, onClose, event }) => {
    useEffect(() => {
        if (isOpen) {
            // Just prevent scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            // Restore scrolling when modal is closed
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 overflow-y-auto"
                        onClick={onClose}
                    >
                        <div className="min-h-full flex items-center justify-center p-4">
                            {/* Modal Content */}
                            <div
                                className="bg-[#2A1F3D] rounded-xl w-full max-w-5xl relative"
                                onClick={e => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="sticky top-0 z-10 flex justify-end p-4 bg-[#2A1F3D] border-b border-white/10">
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Rest of your modal content remains the same */}
                                        {/* Left side - Gallery */}
                                        <div className="w-full md:w-1/2 space-y-4">
                                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                                <Image
                                                    src={event.image}
                                                    fill
                                                    alt={event.title}
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 gap-2">
                                                {event.gallery?.grid.slice(0, 4).map((item, idx) => (
                                                    <div
                                                        key={item.id}
                                                        className="relative aspect-square rounded-lg overflow-hidden"
                                                    >
                                                        <Image
                                                            src={item.image}
                                                            fill
                                                            alt={item.title}
                                                            className="object-cover hover:scale-110 transition-transform duration-200"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            {event.gallery?.highlights && (
                                                <div className="bg-white/5 rounded-lg p-4">
                                                    <h4 className="text-white font-semibold mb-2">Event Highlights</h4>
                                                    <ul className="space-y-2">
                                                        {event.gallery.highlights.map((highlight, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="text-gray-200 text-sm flex items-center"
                                                            >
                                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2" />
                                                                {highlight}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right side - Details */}
                                        <div className="w-full md:w-1/2 space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="text-2xl font-bold text-white">
                                                    {event.title}
                                                </h3>
                                                <p className="text-gray-200 text-sm leading-relaxed border-l-2 border-orange-500 pl-4">
                                                    {event.description}
                                                </p>
                                            </div>

                                            <div className="flex flex-col space-y-3">
                                                {[
                                                    { Icon: Calendar, label: "Date", value: event.date },
                                                    { Icon: Clock, label: "Time", value: event.time },
                                                    { Icon: MapPin, label: "Venue", value: event.venue },
                                                    { Icon: Users, label: "Capacity", value: event.capacity }
                                                ].map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center text-gray-200 bg-white/5 p-3 rounded-lg"
                                                    >
                                                        <item.Icon className="w-5 h-5 mr-3 text-orange-500" />
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-gray-400">{item.label}</span>
                                                            <span className="text-sm">{item.value}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

const EventCard = ({ event, index }) => {
    const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)");
    const [showModal, setShowModal] = useState(false);

    const onMouseEnter = () => {
        setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
    };

    const onMouseLeave = () => {
        setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
    };

    return (
        <div className="relative h-screen py-40"> {/* Added fixed height and padding */}
            {/* Always visible title at bottom */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40 w-full text-center">
                <h3 className="text-xl md:text-2xl font-bold text-white bg-black/60 px-6 py-3 rounded-xl backdrop-blur-sm inline-block shadow-lg">
                    {event.title}
                </h3>
            </div>

            <div
                className="relative group/pin cursor-pointer h-full" /* Added h-full */
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div
                    style={{
                        perspective: "1000px",
                        transform: "rotateX(70deg) translateZ(0deg)",
                    }}
                    className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
                >
                    <div
                        style={{
                            transform: transform,
                        }}
                        className="absolute left-1/2 top-1/2 w-[440px] h-[600px] rounded-xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-[#2A1F3D] border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
                    >
                        <div className="relative w-full h-full"> {/* Modified to use full height */}
                            <Image
                                src={event.image}
                                fill
                                alt={event.title}
                                className="object-cover"
                                priority={index < 2}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F2E]/90 via-[#2A1F3D]/70 to-transparent" />
                        </div>
                    </div>
                </div>

                <motion.div className="pointer-events-none w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
                    <div className="w-full h-full -mt-7 flex-none inset-0">
                        <div className="absolute top-0 inset-x-0 flex justify-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowModal(true);
                                }}
                                className="pointer-events-auto relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-6 ring-1 ring-white/10 hover:ring-white/20 transition-all"
                            >
                                <span className="text-white text-sm font-medium">View Details</span>
                            </button>
                        </div>

                        <div
                            style={{
                                perspective: "1000px",
                                transform: "rotateX(70deg) translateZ(0)",
                            }}
                            className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
                        >
                            {/* Animated rings */}
                            <>
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0,
                                        x: "-50%",
                                        y: "-50%",
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0.5, 0],
                                        scale: 1,
                                        z: 0,
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        delay: 0,
                                    }}
                                    className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-orange-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
                                />
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0,
                                        x: "-50%",
                                        y: "-50%",
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0.5, 0],
                                        scale: 1,
                                        z: 0,
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        delay: 2,
                                    }}
                                    className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-orange-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
                                />
                            </>

                            {/* Light beam effect */}
                            <>
                                <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-orange-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
                                <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-orange-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
                                <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-orange-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
                                <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-orange-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
                            </>
                        </div>
                    </div>
                </motion.div>
            </div>

            <EventModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                event={event}
            />
        </div>
    );
};

export default EventCard;