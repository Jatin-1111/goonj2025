"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import gsap from 'gsap';

// Safe GSAP registration
if (typeof window !== 'undefined') {
  gsap.registerPlugin();
}

// Update gallery images to use local paths instead of external URLs
const galleryImages = [
  {
    src: '/gallery/image1.jpg',
    alt: 'Artistic mountain landscape at sunset'
  },
  {
    src: '/gallery/image2.jpg',
    alt: 'Urban cityscape with modern architecture'
  },
  {
    src: '/gallery/image3.jpg',
    alt: 'Minimalist architectural detail'
  },
  {
    src: '/gallery/image4.jpg',
    alt: 'Abstract light patterns'
  }
];

const generateRotation = (index) => [-6, -3, 0, 3, 6][index % 5];

const Gallery = () => {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const animationRef = useRef(null);

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  const animateCards = useCallback((direction = 1) => {
    if (!mounted) return;

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const timeline = gsap.timeline();
    const nextIndex = (active + direction + galleryImages.length) % galleryImages.length;

    galleryImages.forEach((_, index) => {
      const element = slideRefs.current[index];
      if (!element) return;

      const isActive = index === active;
      const isNext = index === nextIndex;
      const zIndex = isNext ? 999 : galleryImages.length - Math.abs(index - nextIndex);

      timeline.to(element, {
        opacity: isNext ? 1 : 0.7,
        scale: isNext ? 1 : 0.95,
        rotation: isNext ? 0 : generateRotation(index),
        zIndex,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          if (isNext) {
            setActive(nextIndex);
          }
        }
      }, 0);
    });

    animationRef.current = timeline;
  }, [active, mounted]);

  const handleNext = useCallback(() => {
    if (isDragging) return;
    animateCards(1);
  }, [animateCards, isDragging]);

  const handlePrev = useCallback(() => {
    if (isDragging) return;
    animateCards(-1);
  }, [animateCards, isDragging]);

  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0));
  }, []);

  const handleDragEnd = useCallback((e) => {
    if (!isDragging) return;

    const endX = e.clientX || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0);
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 100) {
      deltaX > 0 ? handlePrev() : handleNext();
    }

    setIsDragging(false);
  }, [isDragging, startX, handleNext, handlePrev]);

  // Initialize cards
  useEffect(() => {
    if (!mounted) return;

    galleryImages.forEach((_, index) => {
      const element = slideRefs.current[index];
      if (!element) return;

      const isActive = index === active;
      const zIndex = isActive ? 999 : galleryImages.length - Math.abs(index - active);

      gsap.set(element, {
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.95,
        rotation: isActive ? 0 : generateRotation(index),
        zIndex
      });
    });
  }, [mounted, active]);

  // Autoplay handler
  useEffect(() => {
    if (!autoplay || !mounted) return;
    
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext, mounted]);

  // Early return while not mounted
  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950" />;
  }

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-10">
            <h2 className="text-4xl flex justify-center font-bold text-white mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto" />
          </div>

          <div 
            ref={containerRef} 
            className="relative h-[60vh] w-full max-w-4xl mx-auto"
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                ref={el => slideRefs.current[index] = el}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
              >
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-cover"
                    priority={index === active}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
              className="h-12 w-12 rounded-full bg-gray-800/50 hover:bg-gray-800/70 flex items-center justify-center group transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
            </button>

            <button
              onClick={() => setAutoplay(!autoplay)}
              className="h-12 w-12 rounded-full bg-gray-800/50 hover:bg-gray-800/70 flex items-center justify-center transition-colors"
            >
              {autoplay ? 
                <Pause className="h-6 w-6 text-white" /> : 
                <Play className="h-6 w-6 text-white" />
              }
            </button>

            <button
              onClick={handleNext}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
              className="h-12 w-12 rounded-full bg-gray-800/50 hover:bg-gray-800/70 flex items-center justify-center group transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white group-hover:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;