import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import gsap from 'gsap';

// Register GSAP plugins on client-side only to avoid SSR issues
if (typeof window !== 'undefined') {
  gsap.registerPlugin();
}

// Sample gallery images data
// In production, this would typically come from an API or CMS
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop',
    alt: 'Artistic mountain landscape at sunset'
  },
  {
    src: 'https://images.unsplash.com/photo-1682686581551-867e0b208bd1?w=800&auto=format&fit=crop',
    alt: 'Urban cityscape with modern architecture'
  },
  {
    src: 'https://images.unsplash.com/photo-1682695796497-31a44224d6d6?w=800&auto=format&fit=crop',
    alt: 'Minimalist architectural detail'
  },
  {
    src: 'https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?w=800&auto=format&fit=crop',
    alt: 'Abstract light patterns'
  }
];

// Helper function to generate rotation values for the card stack effect
// Creates an alternating pattern of rotations for visual interest
const generateRotation = (index) => [-6, -3, 0, 3, 6][index % 5];

const Gallery = () => {
  // State management
  const [active, setActive] = useState(0);              // Currently active slide index
  const [autoplay, setAutoplay] = useState(true);       // Autoplay toggle
  const [isDragging, setIsDragging] = useState(false);  // Track drag state
  const [startX, setStartX] = useState(0);              // Starting X position for drag

  // Refs for DOM manipulation
  const containerRef = useRef(null);                    // Container element reference
  const slideRefs = useRef([]);                         // Array of slide element references

  // Animate cards when transitioning between slides
  const animateCards = useCallback((direction = 1) => {
    const timeline = gsap.timeline();
    const nextIndex = (active + direction + galleryImages.length) % galleryImages.length;

    // Animate each card in the stack
    galleryImages.forEach((_, index) => {
      const element = slideRefs.current[index];
      const isActive = index === active;
      const isNext = index === nextIndex;
      // Calculate z-index to ensure proper stacking order
      const zIndex = isNext ? 999 : galleryImages.length - Math.abs(index - nextIndex);

      // Animate position and appearance of each card
      timeline.to(element, {
        opacity: isNext ? 1 : 0.7,           // Active card is fully opaque
        scale: isNext ? 1 : 0.95,            // Active card is full size
        rotation: isNext ? 0 : generateRotation(index), // Apply rotation for stack effect
        zIndex,
        duration: 0.6,
        ease: 'power2.inOut'
      }, 0);
    });

    // Update active slide after animation
    timeline.then(() => setActive(nextIndex));
  }, [active]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    animateCards(1);
  }, [animateCards]);

  const handlePrev = useCallback(() => {
    animateCards(-1);
  }, [animateCards]);

  // Touch and mouse event handlers for drag functionality
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0].clientX);
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;

    const endX = e.clientX || e.changedTouches?.[0].clientX;
    const deltaX = endX - startX;

    // Trigger slide change if drag distance is sufficient
    if (Math.abs(deltaX) > 100) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    setIsDragging(false);
  };

  // Initialize card positions and properties on mount
  useEffect(() => {
    galleryImages.forEach((_, index) => {
      const element = slideRefs.current[index];
      const isActive = index === active;
      const zIndex = isActive ? 999 : galleryImages.length - Math.abs(index - active);

      gsap.set(element, {
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.95,
        rotation: isActive ? 0 : generateRotation(index),
        zIndex
      });
    });
  }, []);

  // Handle autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval); // Cleanup on unmount or autoplay change
  }, [autoplay, handleNext]);

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Header */}
          <div className="py-10">
            <h2 className="text-4xl flex justify-center font-bold text-white mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto" />
          </div>

          {/* Gallery Container */}
          <div ref={containerRef} className="relative h-[60vh] w-full max-w-4xl mx-auto">
            {/* Image Cards */}
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
                    className="object-cover"
                    priority={index === active}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
              className="h-12 w-12 rounded-full bg-gray-800/50 hover:bg-gray-800/70 flex items-center justify-center group transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setAutoplay(!autoplay)}
              className="h-12 w-12 rounded-full bg-gray-800/50 hover:bg-gray-800/70 flex items-center justify-center transition-colors"
            >
              {autoplay ?
                <Pause className="h-6 w-6 text-white" /> :
                <Play className="h-6 w-6 text-white" />
              }
            </button>

            {/* Next Button */}
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