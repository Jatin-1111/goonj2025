import React, { memo, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Snowflake, Wind } from 'lucide-react';
import gsap from 'gsap';

const FlipDigit = ({ digit, position }) => {
  const digitRef = useRef(null);

  useEffect(() => {
    // GSAP frost effect animation
    gsap.to(digitRef.current, {
      duration: 0.5,
      filter: 'drop-shadow(0 0 8px rgba(147, 197, 253, 0.5))',
      repeat: -1,
      yoyo: true
    });
  }, []);

  const flipAnimation = {
    initial: {
      opacity: 0,
      rotateX: -80,
      filter: 'blur(8px)'
    },
    animate: {
      opacity: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        opacity: { duration: 0.3 },
        rotateX: { duration: 0.6, ease: "easeOut" },
        filter: { duration: 0.3 }
      }
    },
    exit: {
      opacity: 0,
      rotateX: 80,
      filter: 'blur(8px)',
      transition: {
        opacity: { duration: 0.3 },
        rotateX: { duration: 0.6, ease: "easeIn" },
        filter: { duration: 0.3 }
      }
    }
  };

  return (
    <div className="relative h-full w-1/2 flex justify-center overflow-hidden perspective-1000">
      <AnimatePresence mode="popLayout">
        <motion.div
          ref={digitRef}
          key={`${position}-${digit}`}
          {...flipAnimation}
          className="absolute w-full h-full flex items-center justify-center"
        >
          <span className="relative text-4xl md:text-6xl font-bold text-blue-200">
            {digit}
            <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent">
              {digit}
            </span>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const NorthIndianPattern = () => {
  const patternRef = useRef(null);

  useEffect(() => {
    // GSAP shimmer animation
    gsap.to(patternRef.current, {
      backgroundPosition: '100% 100%',
      duration: 10,
      repeat: -1,
      ease: 'none'
    });
  }, []);

  return (
    <div ref={patternRef} className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-10 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 0l16 16-16 16L0 16z' fill='%23BFDBFE' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};

const WeatherEffects = () => {
  const [snowflakes, setSnowflakes] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const createSnowflake = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 10 + 5
    });

    setSnowflakes(Array.from({ length: 10 }, createSnowflake));

    // GSAP wind effect
    gsap.to(containerRef.current, {
      '--wind-offset': '10px',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
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
};

const WindEffect = () => (
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
);

const CloudEffect = () => (
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
);

const CardBackground = memo(() => {
  const bgRef = useRef(null);

  useEffect(() => {
    // GSAP frost pulse animation
    gsap.to(bgRef.current, {
      boxShadow: '0 8px 32px rgba(191, 219, 254, 0.2), 0 0 16px rgba(147, 197, 253, 0.2)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <>
      <div
        ref={bgRef}
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md"
      />
      <NorthIndianPattern />
      <div className="absolute inset-0 rounded-lg border border-blue-300/20" />
      <WeatherEffects />

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
            className="absolute w-full h-full border border-blue-200"
            style={{
              borderRadius: '2px',
              borderWidth: i < 2 ? '2px 0 0 2px' : '0 2px 2px 0',
              opacity: 0.3
            }}
          />
        </div>
      ))}

      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-blue-500/5 to-transparent" />
    </>
  );
});

CardBackground.displayName = 'CardBackground';

const FlipCountdownBox = memo(({ value, label, index }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (currentValue !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 300);
      setCurrentValue(value);

      // GSAP frost burst animation
      gsap.to(boxRef.current, {
        boxShadow: '0 0 20px rgba(147, 197, 253, 0.4)',
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });

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
      <div ref={boxRef} className="relative w-28 h-32 md:w-32 md:h-36 group">
        <motion.div
          animate={{ scale: isFlipping ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 rounded-lg overflow-hidden"
        >
          <CardBackground />
          <div className="absolute inset-0 flex">
            {digits.map((digit, idx) => (
              <FlipDigit key={`${idx}-${digit}`} digit={digit} position={idx} />
            ))}
          </div>
          <div className="absolute w-full h-[1px] top-1/2 -translate-y-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
          </div>
        </motion.div>
      </div>
      <div className="text-base md:text-lg text-blue-300 uppercase tracking-wider font-medium">
        {label}
      </div>
    </motion.div>
  );
});

FlipCountdownBox.displayName = 'FlipCountdownBox';

const Countdown = ({ timeLeft }) => {
  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-xl relative overflow-hidden">
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
  );
};

export default Countdown;