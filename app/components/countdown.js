"use client"
import React, { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Snowflake, Wind } from 'lucide-react';

const getTimeLeft = () => {
  const targetDate = new Date('February 19, 2025 00:00:00').getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    total: difference
  };
};

const FlipDigit = memo(({ digit, position }) => {
  const flipAnimation = {
    initial: {
      opacity: 0,
      transform: 'rotateX(-180deg)',
    },
    animate: {
      opacity: 1,
      transform: 'rotateX(0deg)',
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    },
    exit: {
      opacity: 0,
      transform: 'rotateX(180deg)',
      transition: {
        duration: 0.6,
        ease: "easeIn",
      }
    }
  };

  return (
    <div className="relative h-full w-1/2 flex justify-center items-center" style={{ perspective: "1000px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${position}-${digit}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={flipAnimation}
          className="absolute w-full h-full flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }}
        >
          <div className="relative text-4xl md:text-6xl font-bold">
            {/* Base number */}
            <span className="text-white">
              {digit}
            </span>

            {/* Gradient overlay */}
            <span
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #93C5FD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 10px rgba(147, 197, 253, 0.5)'
              }}
            >
              {digit}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

FlipDigit.displayName = 'FlipDigit';



const NorthIndianPattern = memo(() => (
  <motion.div
    className="absolute inset-0"
    animate={{
      backgroundPosition: ['0% 0%', '100% 100%']
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: 'linear'
    }}
  >
    <div
      className="absolute inset-0 opacity-10 bg-repeat"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 0l16 16-16 16L0 16z' fill='%23BFDBFE' fill-opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: '32px 32px'
      }}
    />
  </motion.div>
));

NorthIndianPattern.displayName = 'NorthIndianPattern';

const WeatherEffects = memo(() => {
  const [snowflakes] = useState(() =>
    Array.from({ length: 10 }, () => ({
      id: Math.random(),
      x: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 10 + 5
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {snowflakes.map((snowflake) => (
        <motion.div
          key={snowflake.id}
          className="absolute text-blue-100/30"
          initial={{ y: -20, x: `${snowflake.x}%` }}
          animate={{
            y: '120%',
            x: [`${snowflake.x}%`, `${snowflake.x + 20}%`, `${snowflake.x - 20}%`, `${snowflake.x}%`]
          }}
          transition={{
            duration: 6,
            delay: snowflake.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
        >
          <Snowflake size={snowflake.size} />
        </motion.div>
      ))}
      <WindEffect />
      <CloudEffect />
    </div>
  );
});

WeatherEffects.displayName = 'WeatherEffects';

const WindEffect = memo(() => (
  <motion.div
    className="absolute right-0 top-1/4 text-blue-200/20"
    animate={{
      x: [-50, 0],
      opacity: [0, 0.2, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
  >
    <Wind size={32} />
  </motion.div>
));

WindEffect.displayName = 'WindEffect';

const CloudEffect = memo(() => (
  <motion.div
    className="absolute left-0 top-1/3 text-blue-200/20"
    animate={{
      x: [0, 50],
      opacity: [0, 0.2, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
  >
    <Cloud size={40} />
  </motion.div>
));

CloudEffect.displayName = 'CloudEffect';

const CardBackground = memo(() => (
  <>
    {/* Darker background for better contrast */}
    <motion.div
      className="absolute inset-0 rounded-lg bg-gradient-to-br from-slate-950/98 via-slate-900/98 to-slate-950/98 backdrop-blur-md"
      animate={{
        boxShadow: [
          '0 8px 32px rgba(191, 219, 254, 0.15), 0 0 16px rgba(147, 197, 253, 0.15)',
          '0 8px 32px rgba(191, 219, 254, 0.25), 0 0 16px rgba(147, 197, 253, 0.25)'
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />

    {/* Pattern with reduced opacity */}
    <NorthIndianPattern />

    {/* Enhanced border */}
    <div className="absolute inset-0 rounded-lg border-2 border-blue-300/30" />

    {/* Weather effects with reduced opacity */}
    <div className="opacity-50">
      <WeatherEffects />
    </div>

    {/* Corner decorations with enhanced visibility */}
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
          className="absolute w-full h-full border-2 border-blue-200 opacity-40"
          style={{
            borderRadius: '2px',
            borderWidth: i < 2 ? '2px 0 0 2px' : '0 2px 2px 0'
          }}
        />
      </div>
    ))}

    {/* Enhanced gradient overlay */}
    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-blue-500/10 to-transparent" />

    {/* Additional inner shadow for depth */}
    <div className="absolute inset-0 rounded-lg shadow-inner" />
  </>
));

CardBackground.displayName = 'CardBackground';

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
      <motion.div
        animate={{ scale: isFlipping ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative w-28 h-32 md:w-32 md:h-36"
      >
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <CardBackground />

          {/* Divider line */}
          <div className="absolute w-full h-[1px] top-1/2 -translate-y-px bg-blue-400/20" />

          {/* Digits container */}
          <div className="absolute inset-0 flex items-center justify-center">
            {digits.map((digit, idx) => (
              <FlipDigit key={`${idx}-${digit}`} digit={digit} position={idx} />
            ))}
          </div>
        </div>
      </motion.div>

      <div className="text-base md:text-lg text-blue-300 uppercase tracking-wider font-medium">
        {label}
      </div>
    </motion.div>
  );
});

FlipCountdownBox.displayName = 'FlipCountdownBox';

const Countdown = memo(() => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeLeft();
      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 0
        });
        return;
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-4xl px-4"
    >
      <motion.h2
        className="text-2xl md:text-4xl text-white text-center mb-10 font-light tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-orange-300">Coming Soon</span> - February 19th, 2025
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-xl relative overflow-hidden transform-gpu">
        <div className="absolute inset-0 bg-[url('/winter-pattern.svg')] opacity-5" />
        {timeUnits.map((unit, index) => (
          <FlipCountdownBox
            key={unit.label}
            value={unit.value}
            label={unit.label}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
});

Countdown.displayName = 'Countdown';

export default Countdown;