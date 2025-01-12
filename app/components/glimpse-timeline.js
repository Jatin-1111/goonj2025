"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { CircuitBoard, Cpu, QrCode, Hexagon, ChevronDown } from "lucide-react";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const TimelineEvent = ({
  year,
  title,
  description,
  highlights,
  achievements,
  icon: Icon,
  position,
  isExpanded,
  setIsExpanded,
}) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: position % 2 === 0 ? -50 : 50,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 2,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={`flex`}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`w-full p-4 md:p-6 bg-[#0D0221] rounded-lg border border-white 
          transition-all duration-300 
          ease-out hover:shadow-lg hover:shadow-cyan-500/10`}
      >
        <div className="mb-2">
          <div className="flex items-center space-x-4 group">
            {Icon && (
              <div className="p-2 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300">
                <Icon className="text-orange-500 w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300" />
              </div>
            )}
            <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-orange-500 transition-colors duration-300">
              {title}
            </h3>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-4 overflow-hidden max-w-md max-lg:max-w-xs max-md:max-w-md max-sm:max-w-xs"
            >
              <p className="text-sm md:text-base text-gray-300 leading-relaxed text-left text-pretty">
                {description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Highlights Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-base md:text-lg font-semibold text-cyan-500 mb-3 flex items-center">
                    <span className="w-1 h-4 bg-cyan-500 rounded mr-2"></span>
                    Key Highlights
                  </h4>
                  <ul className="space-y-3">
                    {highlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center space-x-2 group"
                      >
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></span>
                        <span className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-left text-wrap">
                          {highlight}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Achievements Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-base md:text-lg font-semibold text-purple-500 mb-3 flex items-center text-left">
                    <span className="w-1 h-4 md:h-8 lg:h-4 bg-purple-500 rounded mr-2"></span>
                    Major Achievements
                  </h4>
                  <ul className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center space-x-2 group"
                      >
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></span>
                        <span className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-left text-wrap">
                          {achievement}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-row justify-between items-baseline">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`max-md:order-2 flex items-center space-x-2 text-cyan-500 hover:text-cyan-400 transition-colors mt-4`}
          >
            <span className="text-sm md:text-base">
              {isExpanded ? "Collapse" : "Explore"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
          <span className="h-min max-md:order-1">{year}</span>
        </div>
      </motion.div>
    </div>
  );
};

const GlimpseTimeline = () => {
  const ref = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const timelineEvents = [
    {
      year: 2020,
      title: "Digital Inception",
      description:
        "In the wake of global challenges, Goonj emerged as a beacon of digital innovation, transforming the traditional tech fest into a virtual experience that connected minds across boundaries.",
      highlights: [
        "First fully online tech fest",
        "100+ virtual participants",
        "Innovative digital networking platforms",
      ],
      achievements: [
        "Developed proprietary virtual event platform",
        "Successful international collaborations",
        "Recognized for digital innovation",
      ],
      icon: QrCode,
    },
    {
      year: 2021,
      title: "Hybrid Revolution",
      description:
        "Breaking barriers between physical and digital realms, we pioneered a hybrid event model that redefined technological and cultural engagement.",
      highlights: [
        "Hybrid event format introduced",
        "International speaker series",
        "Expanded digital infrastructure",
      ],
      achievements: [
        "Implemented AR/VR technologies",
        "Expanded global participant base",
        "Developed adaptive event technologies",
      ],
      icon: CircuitBoard,
    },
    {
      year: 2022,
      title: "Tech Cultural Fusion",
      description:
        "A transformative year where cutting-edge technology met traditional cultural narratives, creating a unique ecosystem of innovation and heritage.",
      highlights: [
        "AI-powered cultural workshops",
        "500+ participants",
        "Innovative tech competitions",
      ],
      achievements: [
        "Launched AI-driven cultural insights platform",
        "Created cross-cultural tech initiatives",
        "Expanded international partnerships",
      ],
      icon: Cpu,
    },
    {
      year: 2023,
      title: "Global Connected",
      description:
        "Reaching unprecedented heights with global collaborations, groundbreaking technological showcases, and a vision that transcends traditional boundaries.",
      highlights: [
        "International university partnerships",
        "Advanced AR/VR experiences",
        "Sustainability tech innovations",
      ],
      achievements: [
        "Global innovation summit",
        "Sustainable technology showcase",
        "Quantum computing workshops",
      ],
      icon: Hexagon,
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
    const animation = gsap.to(".box", {
      duration: 2,
      ease: "none",
      motionPath: {
        path: ".path",
        align: ".path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      scrollTrigger: {
        trigger: ".start-trigger",
        start: "top center+=10%",
        endTrigger: ".end-trigger",
        end: "bottom center+=10%",
        markers: false, // Markers that show where the animation starts and ends
        scrub: 1,
      },
    });
    gsap.delayedCall(3, () => ScrollTrigger.refresh());
    setInterval(() => {
      setProgress(animation.progress());
    }, 1000);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[#0D0221] py-16 md:py-36 relative overflow-hidden"
    >
      {/* Background hover ball following mouse */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-indigo-900/10 animate-[pulse_10s_infinite]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,...')] opacity-5"></div>
      </div>
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 max-sm:w-full max-sm:px-4">
        {(() => {
          if (progress > 0.01 && progress < 0.125) {
            return (
              <TimelineEvent
                {...timelineEvents[0]}
                postion={0}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            );
          } else if (progress >= 0.125 && progress < 0.25) {
            return (
              <TimelineEvent
                {...timelineEvents[1]}
                postion={1}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            );
          } else if (progress >= 0.25 && progress < 0.375) {
            return (
              <TimelineEvent
                {...timelineEvents[2]}
                postion={2}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            );
          } else if (progress >= 0.375 && progress < 0.5) {
            return (
              <TimelineEvent
                {...timelineEvents[3]}
                postion={3}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            );
          } else if (progress >= 0.5 && progress < 0.625) {
            return (
              <TimelineEvent
                {...timelineEvents[4]}
                postion={4}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            );
          } else if (progress >= 0.625 && progress < 0.75) {
            return (
              <TimelineEvent
                {...timelineEvents[5]}
                postion={5}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            );
          } else if (progress >= 0.75 && progress < 0.875) {
            return (
              <TimelineEvent
                {...timelineEvents[6]}
                postion={6}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            );
          } else if (progress >= 0.875 && progress < 1) {
            return (
              <TimelineEvent
                {...timelineEvents[7]}
                postion={7}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            );
          }
        })()}
      </div>
      <div
        className="max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 mx-auto"
        ref={ref}
      >
        {/* Section Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4"
          >
            Our Journey Through Years
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300"
          >
            The Evolution of DigitalDharma
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-16 md:w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto mt-4"
          />
        </motion.div>
        <div className="md:w-[80%] mx-auto">
          <div className="start-trigger" />
          <svg
            viewBox="0 -1 40 161"
            height="100%"
            width="100%"
            preserveAspectRatio="false"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="path stroke-white stroke-[0.1]"
              fill="none"
              d={`M 0 0 
                L 40 20 
                L 0 40 
                L 40 60 
                L 0 80
                L 40 100
                L 0 120
                L 40 140
                L 0 160`}
            />
            <rect
              className="box"
              width="5"
              height="5"
              x="5"
              y="5"
              fill="blue"
            />
          </svg>
          <div className="end-trigger" />
        </div>
      </div>
    </div>
  );
};

export default GlimpseTimeline;
