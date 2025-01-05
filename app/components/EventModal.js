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

export default EventModal;