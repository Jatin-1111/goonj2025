import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: '/gallery/image1.jpg',
      title: 'Cultural Night',
      description: 'Dance performances at the main stage'
    },
    {
      src: '/gallery/image2.jpg',
      title: 'Technical Exhibition',
      description: 'Students showcasing their innovations'
    },
    {
      src: '/gallery/image3.jpg',
      title: 'Workshop Session',
      description: 'Interactive learning experience'
    },
    // Add more images as needed
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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

        {/* Gallery Carousel */}
        <div className="relative">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[600px] w-full rounded-xl overflow-hidden"
          >
            <Image
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].title}
              fill
              className="object-cover"
            />
            
            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                {images[currentImageIndex].title}
              </h3>
              <p className="text-gray-200">
                {images[currentImageIndex].description}
              </p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-colors"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-colors"
            >
              →
            </button>
          </motion.div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-orange-500' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Grid Gallery Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative h-40 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;