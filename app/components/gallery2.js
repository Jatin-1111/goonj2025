"use client"
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const GalleryParallax = () => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]), 
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]), 
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]), 
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), 
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]), 
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]), 
    springConfig
  );

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

  const images = [
    {
      src: '/api/placeholder/800/600',
      title: 'Gallery Image 1'
    },
    {
      src: '/api/placeholder/800/600',
      title: 'Gallery Image 2'
    },
    {
      src: '/api/placeholder/800/600',
      title: 'Gallery Image 3'
    },
    {
      src: '/api/placeholder/800/600',
      title: 'Gallery Image 4'
    },
    {
      src: '/api/placeholder/800/600',
      title: 'Gallery Image 5'
    }
  ];

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div
      ref={ref}
      className="min-h-[300vh] py-40 bg-[#0D0221] relative overflow-hidden antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
      
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Gallery
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto mt-2 sm:mt-4"/>
        </motion.div>

        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
          className="flex flex-col gap-20"
        >
          {/* Featured Image Carousel */}
          <div className="flex flex-col items-center justify-center mb-20">
            <div className="relative w-full aspect-[16/9] max-w-4xl mx-auto">
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
                      opacity: index === active ? 1 : 0,
                      scale: index === active ? 1 : 0.95,
                      z: index === active ? 0 : -100,
                      rotate: index === active ? 0 : randomRotateY(),
                      zIndex: index === active ? 999 : images.length + 2 - index,
                      y: index === active ? [0, -20, 0] : 0,
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
                      className="rounded-xl sm:rounded-2xl md:rounded-3xl object-cover"
                      priority={index === active}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 md:mt-8">
              <button
                onClick={handlePrev}
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-gray-800/50 hover:bg-gray-800/70 flex items-center justify-center group/button transition-colors"
              >
                <IconArrowLeft
                  className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white group-hover/button:rotate-12 transition-transform duration-300"
                />
              </button>

              {/* Dots Navigation */}
              <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mx-2 sm:mx-3 md:mx-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setAutoplay(false)}
                    onMouseLeave={() => setAutoplay(true)}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
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
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-gray-800/50 hover:bg-gray-800/70 flex items-center justify-center group/button transition-colors"
              >
                <IconArrowRight
                  className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white group-hover/button:-rotate-12 transition-transform duration-300"
                />
              </button>
            </div>
          </div>

          {/* Parallax Image Rows */}
          <motion.div 
            className="flex flex-row-reverse space-x-reverse space-x-20"
            style={{ x: translateX }}
          >
            {images.map((image) => (
              <ParallaxCard key={image.title} image={image} />
            ))}
          </motion.div>

          <motion.div 
            className="flex flex-row space-x-20"
            style={{ x: translateXReverse }}
          >
            {images.map((image) => (
              <ParallaxCard key={image.title} image={image} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const ParallaxCard = ({ image }) => {
  return (
    <motion.div
      whileHover={{ y: -20 }}
      className="group relative h-96 w-96 flex-shrink-0"
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl">
        <Image
          src={image.src}
          alt={image.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {image.title}
        </h3>
      </div>
    </motion.div>
  );
};

export default GalleryParallax;