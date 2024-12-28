import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <div className="bg-[#0D0221] py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Goonj 2025</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto"/>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src="/about-image.jpg"
                alt="Goonj Festival"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-cyan-500/20 mix-blend-overlay" />
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Theme: Connecting Cultures Through Technology
            </h3>
            <p className="text-lg text-gray-300">
              Goonj 2025 celebrates the fusion of cultural heritage and technological innovation. 
              Our festival brings together students from diverse backgrounds to showcase their talents, 
              exchange ideas, and create meaningful connections.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                <h4 className="text-3xl font-bold text-orange-500 mb-2">50+</h4>
                <p className="text-gray-300">Events</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                <h4 className="text-3xl font-bold text-cyan-500 mb-2">5000+</h4>
                <p className="text-gray-300">Participants</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          {[
            {
              title: "Cultural Events",
              description: "Celebrate diversity through dance, music, and artistic performances.",
              icon: "🎭"
            },
            {
              title: "Technical Workshops",
              description: "Learn from industry experts and enhance your technical skills.",
              icon: "💻"
            },
            {
              title: "Innovation Hub",
              description: "Showcase your projects and compete with talented peers.",
              icon: "🚀"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;