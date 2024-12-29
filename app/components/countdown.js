import React, { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced Flip Digit Animation Component
const FlipDigit = ({ digit, position, total, value }) => {
  return (
    <div className="relative h-full w-1/2 flex justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${position}-${value}`}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{
            rotateX: 0,
            opacity: 1,
            transition: {
              rotateX: { duration: 0.6, ease: [0.455, 0.03, 0.515, 0.955] },
              opacity: { duration: 0.3 }
            }
          }}
          exit={{
            rotateX: 90,
            opacity: 0,
            transition: {
              rotateX: { duration: 0.6, ease: [0.455, 0.03, 0.515, 0.955] },
              opacity: { duration: 0.3 }
            }
          }}
          className="absolute w-full h-full flex items-center justify-center text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-orange-500"
        >
          {digit}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, 
                rgba(255,255,255,0.1) 0%, 
                rgba(255,255,255,0.05) 45%, 
                rgba(255,255,255,0) 50%, 
                rgba(0,0,0,0.05) 55%, 
                rgba(0,0,0,0.1) 100%)`
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Enhanced Card Background Component
const CardBackground = memo(() => (
  <>
    <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-orange-500/10 to-orange-800/10" />
    <div className="absolute inset-0 rounded-lg backdrop-blur-sm" />
    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-black/50 to-black/40" />
    <div className="absolute inset-0 rounded-lg border border-orange-500/30" />
    <div className="absolute inset-[1px] rounded-lg border border-orange-300/10" />
    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/10 to-transparent" />
  </>
));

CardBackground.displayName = 'CardBackground';

// Enhanced Flip Counter Box Component
const FlipCountdownBox = memo(({ value, label, total, index }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (currentValue !== value) {
      setIsFlipping(true);
      setPrevValue(currentValue);
      setCurrentValue(value);

      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 600); // Match the flip animation duration

      return () => clearTimeout(timer);
    }
  }, [value, currentValue]);

  const digits = String(value).padStart(2, '0').split('');

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }}
      className="flex flex-col items-center"
    >
      <div className="relative w-20 h-20 md:w-24 md:h-24 perspective-1000">
        <motion.div
          animate={{
            scale: isFlipping ? 1.05 : 1,
            boxShadow: isFlipping
              ? '0 8px 16px rgba(0,0,0,0.5)'
              : '0 4px 8px rgba(0,0,0,0.3)'
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-lg overflow-hidden"
        >
          <CardBackground />

          {/* Digits Container */}
          <div className="absolute inset-0 flex">
            {digits.map((digit, idx) => (
              <FlipDigit
                key={`${idx}-${digit}`}
                digit={digit}
                position={idx}
                total={total}
                value={currentValue}
              />
            ))}
          </div>

          {/* Center Line with Gradient */}
          <div className="absolute w-full h-[2px] top-1/2 -translate-y-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          </div>

          {/* Corner Accents */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute w-2 h-2 border-orange-500/30"
              style={{
                top: i < 2 ? 4 : 'auto',
                bottom: i < 2 ? 'auto' : 4,
                left: i % 2 === 0 ? 4 : 'auto',
                right: i % 2 === 0 ? 'auto' : 4,
                borderTop: i < 2 ? '1px solid' : 'none',
                borderBottom: i >= 2 ? '1px solid' : 'none',
                borderLeft: i % 2 === 0 ? '1px solid' : 'none',
                borderRight: i % 2 === 1 ? '1px solid' : 'none'
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Enhanced Label */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.2 }}
        className="relative mt-3"
      >
        <div className="text-sm md:text-base text-orange-300/90 uppercase tracking-wider font-medium">
          {label}
        </div>
        <motion.div
          className="absolute -bottom-px left-0 right-0 h-px"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,165,0,0.3) 50%, transparent)'
          }}
        />
      </motion.div>
    </motion.div>
  );
});

FlipCountdownBox.displayName = 'FlipCountdownBox';

// Enhanced Main Countdown Component
const Countdown = ({ timeLeft }) => {
  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" }
  ];

  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-cyan-500/10 blur-3xl" />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center p-8 rounded-xl backdrop-blur-md bg-black/20"
      >
        {timeUnits.map((unit, index) => (
          <FlipCountdownBox
            key={unit.label}
            value={unit.value}
            label={unit.label}
            total={timeUnits.length}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Countdown;