import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Preloader = () => {
  // Add client-side only rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return null during SSR
  if (!isClient) {
    return null;
  }

  const svgDefinitions = (
    <svg width="0" height="0">
      <defs>
        {/* Paisley Pattern */}
        <pattern id="paisleyPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="rgba(255,165,0,0.1)" strokeWidth="0.5">
            <path d="M25,50 Q40,20 50,50 T75,50 Q60,80 50,50" />
            <circle cx="50" cy="50" r="5" />
            <path d="M45,45 Q50,40 55,45 T50,55" />
          </g>
        </pattern>

        {/* Rangoli Pattern */}
        <pattern id="rangoliPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="rgba(0,255,255,0.1)" strokeWidth="0.5">
            <circle cx="60" cy="60" r="50" />
            <path d="M60,10 L60,110 M10,60 L110,60" />
            <path d="M24,24 L96,96 M24,96 L96,24" />
            <circle cx="60" cy="60" r="30" />
            <path d="M60,30 Q90,60 60,90 Q30,60 60,30" />
          </g>
        </pattern>

        {/* Lotus Pattern */}
        <pattern id="lotusPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="rgba(255,165,0,0.15)" strokeWidth="0.5">
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
              <path
                key={angle}
                d={`M40,40 Q${40 + 20 * Math.cos(angle * Math.PI / 180)},${40 + 20 * Math.sin(angle * Math.PI / 180)} 40,${40 + 30}`}
                transform={`rotate(${angle} 40 40)`}
              />
            ))}
            <circle cx="40" cy="40" r="5" />
          </g>
        </pattern>

        {/* Decorative Temple Arch */}
        <path id="templeArch" d="M0,100 Q50,0 100,100" />

        {/* Om Symbol */}
        <path id="omSymbol" d="M20,50 C30,30 50,30 50,50 C50,70 30,70 30,50 M50,50 C60,50 60,70 50,70 M55,70 L65,80" />
      </defs>
    </svg>
  );

  // Move array generations outside JSX to avoid regeneration
  const cornerMandalas = [0, 1, 2, 3];
  const sacredGeometryAngles = [0, 60, 120, 180, 240, 300];
  const cornerPositions = [[50, 50], [250, 50], [50, 250], [250, 250]];
  const loadingDots = Array(5).fill(null);

  return (
    <div className="fixed inset-0 bg-[#0D0221] flex items-center justify-center z-50 overflow-hidden">
      {/* Enhanced SVG Definitions */}
      {svgDefinitions}

      {/* Background Layers */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <circle cx="50%" cy="50%" r="200" fill="url(#rangoliPattern)" />
          </motion.g>
        </svg>
      </div>

      {/* Decorative Corner Mandalas */}
      {cornerMandalas.map((index) => {
        const rotation = index * 90;
        return (
          <svg
            key={`mandala-${index}`}
            className="absolute w-32 h-32"
            style={{
              top: index < 2 ? '0' : 'auto',
              bottom: index >= 2 ? '0' : 'auto',
              left: index % 2 === 0 ? '0' : 'auto',
              right: index % 2 === 1 ? '0' : 'auto',
            }}
            viewBox="0 0 200 200"
          >
            <motion.g
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <path
                d="M0,0 A200,200 0 0,1 200,200 L0,200 Z"
                fill="url(#lotusPattern)"
                transform={`rotate(${rotation} 100 100)`}
              />
            </motion.g>
          </svg>
        );
      })}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Frame */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          <Image
            src="/goonjlogow.png"
            alt="Goonj Logo"
            width={150}
            height={150}
            className="relative z-10"
            priority // Add priority to ensure early loading
          />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-devanagari">गूँज</span> २०२५
        </motion.h2>

        {/* Loading Bar */}
        <div className="relative w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          {loadingDots.map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/50"
              style={{ left: `${i * 25}%` }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <div className="mt-6 text-center">
          <motion.div
            className="text-white/60"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="font-devanagari text-lg">कृपया प्रतीक्षा करें...</div>
            <div className="text-sm mt-1">Setting up the cultural extravaganza</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;