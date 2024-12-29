"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const Gallery = () => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=800&auto=format&fit=crop',
      title: 'Cultural Night',
      description: 'Dance performances at the main stage',
      quote: 'A mesmerizing evening filled with incredible performances showcasing diverse cultural traditions'
    },
    {
      src: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?w=800&auto=format&fit=crop',
      title: 'Technical Exhibition',
      description: 'Students showcasing their innovations',
      quote: 'Innovative projects and breakthrough technologies demonstrated by talented young minds'
    },
    {
      src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
      title: 'Workshop Session',
      description: 'Interactive learning experience',
      quote: 'Engaging workshops that bring together experts and enthusiasts for hands-on learning'
    },
  ];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + images.length) % images.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="bg-[#0D0221] py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h2>
          <p className="text-xl text-gray-300">Past Glimpses of Goonj</p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto mt-4"/>
        </motion.div>

        {/* Animated Gallery */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Image Section */}
          <div>
            <div className="relative h-[600px] w-full">
              <AnimatePresence>
                {images.map((image, index) => (
                  <motion.div
                    key={image.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index) ? 999 : images.length + 2 - index,
                      y: isActive(index) ? [0, -40, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="rounded-3xl object-contain"
                      draggable={false}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex justify-between flex-col py-4">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-3xl font-bold text-white">
                {images[active].title}
              </h3>
              <p className="text-lg text-gray-400">
                {images[active].description}
              </p>
              <motion.p className="text-xl text-gray-300 mt-8">
                {images[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={handlePrev}
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
                className="h-12 w-12 rounded-full bg-gray-800/50 hover:bg-gray-800/70 flex items-center justify-center group/button transition-colors"
              >
                <IconArrowLeft
                  className="h-6 w-6 text-white group-hover/button:rotate-12 transition-transform duration-300"
                />
              </button>
              <button
                onClick={handleNext}
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
                className="h-12 w-12 rounded-full bg-gray-800/50 hover:bg-gray-800/70 flex items-center justify-center group/button transition-colors"
              >
                <IconArrowRight
                  className="h-6 w-6 text-white group-hover/button:-rotate-12 transition-transform duration-300"
                />
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setAutoplay(false)}
                  onMouseLeave={() => setAutoplay(true)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === active 
                      ? 'bg-orange-500 scale-125' 
                      : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;