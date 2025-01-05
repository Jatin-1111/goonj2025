import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Timeline = ({ timelineEvents }) => {
  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      {timelineEvents.map((event, index) => (
        <li key={event.year}>
          <div className="timeline-middle mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            className={`${index % 2 === 0 ? "timeline-start mb-10 md:text-end" : "timeline-end md:mb-10"} w-max`}
          >
            <TimelineEvent key={event.year} {...event} position={index} />
          </div>
          {index !== timelineEvents.length - 1 && <hr />}
        </li>
      ))}
    </ul>
  );
};

const TimelineEvent = ({
  year,
  title,
  description,
  highlights,
  achievements,
  icon: Icon,
  position,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className={`flex ${position % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`w-full p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 
          hover:bg-white/10 transition-all duration-300 
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
          {position % 2 === 0 ? (
            <>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`${position % 2 === 0 ? "md:mr-auto" : "md:ml-auto"} max-md:order-2 flex items-center space-x-2 text-cyan-500 hover:text-cyan-400 transition-colors mt-4`}
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
            </>
          ) : (
            <>
              <span className="h-min max-md:order-1">{year}</span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`${position % 2 === 0 ? "md:mr-auto" : "md:ml-auto"} max-md:order-2 flex items-center space-x-2 text-cyan-500 hover:text-cyan-400 transition-colors mt-4`}
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
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline;
