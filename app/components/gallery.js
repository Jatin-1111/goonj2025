"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

const generateRotations = (count) => (
  Array.from({ length: count }, (_, i) => [-10, 5, -5, 10][i % 4])
);

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop',
    alt: 'Artistic mountain landscape at sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1682686581551-867e0b208bd1?w=800&auto=format&fit=crop',
    alt: 'Urban cityscape with modern architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1682687220063-4742bd7682f5?w=800&auto=format&fit=crop',
    alt: 'Ocean waves at dawn',
  },
  {
    src: 'https://images.unsplash.com/photo-1682695796497-31a44224d6d6?w=800&auto=format&fit=crop',
    alt: 'Minimalist architectural detail',
  },
  {
    src: 'https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?w=800&auto=format&fit=crop',
    alt: 'Abstract light patterns',
  }
];

const Gallery = () => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const randomRotations = React.useMemo(() => generateRotations(galleryImages.length), []);

  // GSAP Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Container parallax effect
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom top',
        scrub: 1
      },
      y: -50,
      ease: 'none'
    });
  }, [active]);

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

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#3e2c23] to-[#121212] overflow-hidden min-h-screen">
      <motion.div
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        style={{ y: translateY }}
      >
        <Image
          src="/bgIMG3.png"
          alt="Cultural Background"
          className="object-cover w-full h-full"
          fill
          priority
        />
      </motion.div>

      <motion.div
        ref={containerRef}
        className="relative z-10 min-h-screen flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='py-10'>
            <h2 className="text-4xl flex justify-center font-bold text-white mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto" />
          </div>
          <div className="relative h-[60vh] w-full max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: index === active ? 1 : 0.7,
                    scale: index === active ? 1 : 0.95,
                    rotate: index === active ? 0 : randomRotations[index],
                    zIndex: index === active ? 999 : galleryImages.length - index,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  className="absolute inset-0 origin-center"
                  drag={index === active ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) {
                      handlePrev();
                    } else if (info.offset.x < -100) {
                      handleNext();
                    }
                  }}
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

          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={handlePrev}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
              className="h-12 w-12 rounded-full bg-gray-800/50 hover:bg-gray-800/70 flex items-center justify-center group/button transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconArrowLeft
                className="h-6 w-6 text-white group-hover/button:rotate-12 transition-transform duration-300"
              />
            </motion.button>

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
                  <motion.button
                    key={index}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setAutoplay(false)}
                    onMouseLeave={() => setAutoplay(true)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === active
                      ? 'bg-orange-500'
                      : 'bg-gray-500 hover:bg-gray-400'
                      }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 1 }}
                    animate={{ scale: index === active ? 1.25 : 1 }}
                  />
                );
              })}
            </div>

            <motion.button
              onClick={handleNext}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
              className="h-12 w-12 rounded-full bg-gray-800/50 hover:bg-gray-800/70 flex items-center justify-center group/button transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconArrowRight
                className="h-6 w-6 text-white group-hover/button:-rotate-12 transition-transform duration-300"
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;