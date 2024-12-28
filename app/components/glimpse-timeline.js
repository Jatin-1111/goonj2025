"use client";
import React, { useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { 
  CircuitBoard, 
  Cpu, 
  QrCode, 
  Hexagon 
} from 'lucide-react';

const TimelineEvent = ({ year, title, description, highlights, achievements, icon: Icon, position }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`relative w-full flex ${
        position % 2 === 0 ? 'justify-start' : 'justify-end'
      }`}
    >
      <motion.div 
        className={`w-[45%] p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 
          ${position % 2 === 0 ? 'mr-auto' : 'ml-auto'}
        `}
        initial={{ opacity: 0, x: position % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            {Icon && <Icon className="text-orange-500" size={32} />}
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Explore'}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">{description}</p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Highlights Section */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-500 mb-2">
                  Key Highlights
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements Section */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-500 mb-2">
                  Major Achievements
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const EventTimeline = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const timelineEvents = [
    {
      year: 2020,
      title: "Digital Inception",
      description: "In the wake of global challenges, Goonj emerged as a beacon of digital innovation, transforming the traditional tech fest into a virtual experience that connected minds across boundaries.",
      highlights: [
        "First fully online tech fest",
        "100+ virtual participants",
        "Innovative digital networking platforms"
      ],
      achievements: [
        "Developed proprietary virtual event platform",
        "Successful international collaborations",
        "Recognized for digital innovation"
      ],
      icon: QrCode
    },
    {
      year: 2021,
      title: "Hybrid Revolution",
      description: "Breaking barriers between physical and digital realms, we pioneered a hybrid event model that redefined technological and cultural engagement.",
      highlights: [
        "Hybrid event format introduced",
        "International speaker series",
        "Expanded digital infrastructure"
      ],
      achievements: [
        "Implemented AR/VR technologies",
        "Expanded global participant base",
        "Developed adaptive event technologies"
      ],
      icon: CircuitBoard
    },
    {
      year: 2022,
      title: "Tech Cultural Fusion",
      description: "A transformative year where cutting-edge technology met traditional cultural narratives, creating a unique ecosystem of innovation and heritage.",
      highlights: [
        "AI-powered cultural workshops",
        "500+ participants",
        "Innovative tech competitions"
      ],
      achievements: [
        "Launched AI-driven cultural insights platform",
        "Created cross-cultural tech initiatives",
        "Expanded international partnerships"
      ],
      icon: Cpu
    },
    {
      year: 2023,
      title: "Global Connected",
      description: "Reaching unprecedented heights with global collaborations, groundbreaking technological showcases, and a vision that transcends traditional boundaries.",
      highlights: [
        "International university partnerships",
        "Advanced AR/VR experiences",
        "Sustainability tech innovations"
      ],
      achievements: [
        "Global innovation summit",
        "Sustainable technology showcase",
        "Quantum computing workshops"
      ],
      icon: Hexagon
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="bg-[#0D0221] py-36 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-indigo-900/10 animate-[pulse_10s_infinite]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Journey Through Years
          </h2>
          <p className="text-xl text-gray-300">The Evolution of DigitalDharma</p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto mt-4"/>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line with Scroll-Driven Growth */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-cyan-500/50 h-full origin-top"
            style={{ 
              scaleY: scrollYProgress,
            }}
          />

          {/* Years Markers */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
            {timelineEvents.map((event, index) => {
              const markerOpacity = 
                0.2 + (scrollYProgress.get() >= ((index + 0.5) / timelineEvents.length) ? 0.8 : 0);
              
              return (
                <motion.div 
                  key={event.year}
                  className="absolute w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ 
                    top: `${(index + 0.5) * (100 / (timelineEvents.length))}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: `rgba(34, 211, 238, ${markerOpacity})`, // Cyan with dynamic opacity
                    boxShadow: `0 0 ${20 * markerOpacity}px rgba(34, 211, 238, ${markerOpacity})` // Glow effect
                  }}
                >
                  <span className="text-white font-bold text-sm">{event.year}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline Events */}
          <div className="space-y-16 pt-8 pb-16">
            {timelineEvents.map((event, index) => (
              <TimelineEvent 
                key={event.year} 
                {...event}
                position={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTimeline;