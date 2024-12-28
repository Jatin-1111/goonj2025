import React, { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Single Digit Flip Animation Component
const FlipDigit = ({ digit, key }) => {
  return (
    <div className="relative h-full w-1/2 flex justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={key}
          initial={{ rotateX: -90, position: "absolute" }}
          animate={{ rotateX: 0 }}
          exit={{ rotateX: 90 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="w-full h-full flex items-center justify-center"
        >
          {digit}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Flip Counter Box Component
const FlipCountdownBox = memo(({ value, label }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (currentValue !== value) {
      setPrevValue(currentValue);
      setCurrentValue(value);
    }
  }, [value, currentValue]);

  const digits = String(value).padStart(2, '0').split('');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        {/* Main counter card */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg border border-orange-500/20 overflow-hidden perspective-1000">
          {/* Top half static background */}
          <div className="absolute inset-0 h-1/2 bg-white/5" />
          
          {/* Digits container */}
          <div className="absolute inset-0 flex">
            {digits.map((digit, index) => (
              <FlipDigit 
                key={`${index}-${digit}-${value}`} 
                digit={digit} 
              />
            ))}
          </div>

          {/* Center line */}
          <div className="absolute w-full h-px top-1/2 bg-orange-500/20" />
          
          {/* Flip shadow overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
      
      {/* Label */}
      <div className="text-sm md:text-base text-white/80 uppercase tracking-wider mt-2">
        {label}
      </div>
    </div>
  );
});

FlipCountdownBox.displayName = 'FlipCountdownBox';

// Main Countdown Component
const Countdown = ({ timeLeft }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 justify-items-center p-8 rounded-xl backdrop-blur-md bg-black/10">
      <FlipCountdownBox value={timeLeft.months} label="Months" />
      <FlipCountdownBox value={timeLeft.weeks} label="Weeks" />
      <FlipCountdownBox value={timeLeft.days} label="Days" />
      <FlipCountdownBox value={timeLeft.hours} label="Hours" />
      <FlipCountdownBox value={timeLeft.minutes} label="Minutes" />
      <FlipCountdownBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;