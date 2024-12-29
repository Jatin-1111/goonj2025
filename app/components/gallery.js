"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const Gallery = () => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.5 end", "0.5 0.5"]
  });

  const springConfig = { stiffness: 400, damping: 40, bounce: 0 };

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [0.5, 1]), 
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 1], [200, 0]), 
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.85, 1]), 
    springConfig
  );

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=800&auto=format&fit=crop',
      alt: 'Gallery image 1'
    },
    {
      src: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?w=800&auto=format&fit=crop',
      alt: 'Gallery image 2'
    },
    {
      src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
      alt: 'Gallery image 3'
    }
  ];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + images.length) % images.length);
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
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#0D0221] relative overflow-hidden"
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto"/>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center justify-center"
            style={{
              opacity,
              translateY,
              scale,
            }}
          >
            <div className="relative h-[60vh] w-full max-w-4xl mx-auto">
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
                      opacity: index === active ? 1 : 0.7,
                      scale: index === active ? 1 : 0.95,
                      z: index === active ? 0 : -100,
                      rotate: index === active ? 0 : randomRotateY(),
                      zIndex: index === active ? 999 : images.length + 2 - index,
                      y: index === active ? [0, -40, 0] : 0,
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
                      alt={image.alt}
                      fill
                      className="rounded-3xl object-contain"
                      draggable={false}
                      priority={index === active}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
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

              <div className="flex justify-center gap-4 mx-4">
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;