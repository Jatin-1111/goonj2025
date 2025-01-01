"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

/**
 * Generates rotation angles for gallery images in a wave pattern
 */
const generateRotations = (count) => (
  Array.from({ length: count }, (_, i) => [-10, 5, -5, 10][i % 4])
);

// Gallery images data
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop',
    alt: 'Artistic mountain landscape at sunset',
    caption: 'Mountain Twilight'
  },
  {
    src: 'https://images.unsplash.com/photo-1682686581551-867e0b208bd1?w=800&auto=format&fit=crop',
    alt: 'Urban cityscape with modern architecture',
    caption: 'City Perspectives'
  },
  {
    src: 'https://images.unsplash.com/photo-1682687220063-4742bd7682f5?w=800&auto=format&fit=crop',
    alt: 'Serene ocean waves at dawn',
    caption: 'Ocean Dawn'
  },
  {
    src: 'https://images.unsplash.com/photo-1682695796497-31a44224d6d6?w=800&auto=format&fit=crop',
    alt: 'Minimalist architectural detail',
    caption: 'Urban Geometry'
  },
  {
    src: 'https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?w=800&auto=format&fit=crop',
    alt: 'Abstract light patterns',
    caption: 'Light Abstract'
  }
];

const Gallery = () => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const randomRotations = React.useMemo(() => generateRotations(galleryImages.length), []);

  const handleNext = useCallback(() => {
    setActive(prev => (prev + 1) % galleryImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActive(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  return (
    <div className="relative bg-gradient-to-b from-[#3e2c23] to-[#121212] overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      >
        <Image
          src="/bgIMG3.png"
          alt="Cultural Background"
          className="object-cover w-full h-full"
          fill
          priority
        />
      </motion.div>

      {/* Gallery Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto" />
          </motion.div>

          {/* Images Container */}
          <div className="relative h-[60vh] w-full max-w-4xl mx-auto">
            <AnimatePresence>
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={false}
                  animate={{
                    opacity: index === active ? 1 : 0.7,
                    scale: index === active ? 1 : 0.95,
                    rotate: index === active ? 0 : randomRotations[index],
                    zIndex: index === active ? 999 : galleryImages.length - index,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="rounded-3xl object-contain"
                    priority={index === active}
                    draggable={false}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Previous Button */}
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

            {/* Indicators */}
            <div className="flex justify-center gap-4 mx-4">
              {galleryImages.map((_, index) => {
                const shouldShow =
                  index === active ||
                  index === active - 1 ||
                  index === active + 1 ||
                  (active === 0 && index === 2) ||
                  (active === galleryImages.length - 1 && index === galleryImages.length - 3);

                if (!shouldShow) return null;

                return (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setAutoplay(false)}
                    onMouseLeave={() => setAutoplay(true)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === active
                        ? 'bg-orange-500 scale-125'
                        : 'bg-gray-500 hover:bg-gray-400'
                      }`}
                  />
                );
              })}
            </div>

            {/* Next Button */}
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
        </div>
      </div>
    </div>
  );
};

export default Gallery;