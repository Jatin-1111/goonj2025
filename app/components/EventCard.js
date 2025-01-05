"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from 'next/dynamic';

const EventModal = dynamic(() => import('./EventModal'), {
    ssr: false
})

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
                                <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-orange-500 translate-y-[20px] w-px h-40 group-hover/pin:h-40 blur-[2px]" />
                                <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-orange-500 translate-y-[14px] w-px h-40 group-hover/pin:h-40" />
                                <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-orange-600 translate-y-[14px] w-[4px] h-[6px] rounded-full z-40 blur-[3px]" />
                                <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-orange-300 translate-y-[14px] w-[2px] h-[6px] rounded-full z-40" />
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