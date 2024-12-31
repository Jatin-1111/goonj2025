import React, { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FlipDigit - Renders a single flipping digit with animation
 * @param {Object} props
 * @param {string|number} props.digit - The digit to display
 * @param {number} props.position - Position index of the digit
 */
const FlipDigit = ({ digit, position }) => {
  const flipAnimation = {
    initial: { 
      opacity: 0,
      rotateX: -80
    },
    animate: { 
      opacity: 1,
      rotateX: 0,
      transition: {
        opacity: { duration: 0.2 },
        rotateX: { duration: 0.4, ease: "easeOut" }
      }
    },
    exit: {
      opacity: 0,
      rotateX: 80,
      transition: {
        opacity: { duration: 0.2 },
        rotateX: { duration: 0.4, ease: "easeIn" }
      }
    }
  };

  return (
    <div className="relative h-full w-1/2 flex justify-center overflow-hidden perspective-1000">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${position}-${digit}`}
          {...flipAnimation}
          className="absolute w-full h-full flex items-center justify-center"
        >
          <span className="relative text-4xl md:text-6xl font-bold text-emerald-300">
            {digit}
            <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-teal-200 to-transparent bg-clip-text text-transparent">
              {digit}
            </span>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/**
 * ModernPattern - Renders a decorative background pattern
 */
const ModernPattern = () => (
  <div className="absolute inset-0">
    <div 
      className="absolute inset-0 opacity-5 bg-repeat" 
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 0l16 16-16 16L0 16z' fill='%2322D3EE' fill-opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: '32px 32px'
      }} 
    />
  </div>
);

/**
 * CardBackground - Renders the styling elements for the countdown card
 */
const CardBackground = memo(() => (
  <>
    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md" />
    <ModernPattern />
    <div className="absolute inset-0 rounded-lg border border-cyan-500/20" />
    
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className="absolute w-5 h-5"
        style={{
          top: i < 2 ? -1 : 'auto',
          bottom: i >= 2 ? -1 : 'auto',
          left: i % 2 === 0 ? -1 : 'auto',
          right: i % 2 === 1 ? -1 : 'auto',
        }}
      >
        <div
          className="absolute w-full h-full border border-cyan-400"
          style={{
            borderRadius: '2px',
            borderWidth: i < 2 ? '2px 0 0 2px' : '0 2px 2px 0',
            opacity: 0.3
          }}
        />
      </div>
    ))}
    
    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-cyan-500/5 to-transparent" />
  </>
));

CardBackground.displayName = 'CardBackground';

/**
 * FlipCountdownBox - Renders a single countdown unit (days/hours/minutes/seconds)
 * @param {Object} props
 * @param {number} props.value - The numeric value to display
 * @param {string} props.label - The label for the unit (e.g., "Days")
 * @param {number} props.index - The position index for animation timing
 */
const FlipCountdownBox = memo(({ value, label, index }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (currentValue !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 300);
      setCurrentValue(value);
      return () => clearTimeout(timer);
    }
  }, [value, currentValue]);

  const digits = String(value).padStart(2, '0').split('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative w-28 h-32 md:w-32 md:h-36 group">
        <motion.div
          animate={{ scale: isFlipping ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 16px rgba(6, 182, 212, 0.1)',
          }}
        >
          <CardBackground />
          <div className="absolute inset-0 flex">
            {digits.map((digit, idx) => (
              <FlipDigit key={`${idx}-${digit}`} digit={digit} position={idx} />
            ))}
          </div>
          <div className="absolute w-full h-[1px] top-1/2 -translate-y-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </div>
        </motion.div>
      </div>
      <div className="text-base md:text-lg text-cyan-400 uppercase tracking-wider font-medium">
        {label}
      </div>
    </motion.div>
  );
});

FlipCountdownBox.displayName = 'FlipCountdownBox';

/**
 * Countdown - Main component that displays a flip countdown timer
 * @param {Object} props
 * @param {Object} props.timeLeft - Object containing days, hours, minutes, and seconds
 */
const Countdown = ({ timeLeft }) => {
  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-xl">
      {timeUnits.map((unit, index) => (
        <FlipCountdownBox
          key={unit.label}
          value={unit.value}
          label={unit.label}
          index={index}
        />
      ))}
    </div>
  );
};

export default Countdown;