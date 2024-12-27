"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Hero from './components/Hero'

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-02-19T00:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const CountdownBox = ({ value, label }) => (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center p-4 md:p-6"
    >
      <motion.div
        className="text-4xl md:text-6xl font-bold text-white mb-2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="text-sm md:text-base text-white/80 uppercase tracking-wider">{label}</div>
    </motion.div>
  );

  return (
    <>
      <div className="bg-black min-h-screen w-full relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80 z-10" />

        {/* Animated Particles */}
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="stars" />
        </motion.div>

        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/bgIMG3.png"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-center animate-subtle-zoom"
            sizes="100vw"
            style={{
              filter: 'brightness(0.8) contrast(1.1)'
            }}
          />
        </div>

        {/* Countdown Overlay */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center top-[630px] md:top-[750px] md:left-32">
          <motion.h2
            className="text-2xl md:text-4xl text-white mb-8 text-center px-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Coming Soon - February 19th, 2025
          </motion.h2>

          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-8 p-4 rounded-xl backdrop-blur-sm bg-black/30"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <CountdownBox value={timeLeft.days} label="Days" />
            <CountdownBox value={timeLeft.hours} label="Hours" />
            <CountdownBox value={timeLeft.minutes} label="Minutes" />
            <CountdownBox value={timeLeft.seconds} label="Seconds" />
          </motion.div>
        </div>
        <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                .stars {
                    background-image: 
                        radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                        radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0,0,0,0)),
                        radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0,0,0,0)),
                        radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)),
                        radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0)),
                        radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0,0,0,0));
                    background-repeat: repeat;
                    background-size: 200px 200px;
                    animation: float 3s ease-in-out infinite;
                    width: 100%;
                    height: 100%;
                }

                @keyframes subtle-zoom {
                    from {
                        transform: scale(1);
                    }
                    to {
                        transform: scale(1.05);
                    }
                }

                .animate-subtle-zoom {
                    animation: subtle-zoom 20s ease-in-out infinite alternate;
                }
            `}</style>
      </div>
      <div className="realtive z-40 w-full bottom-0">
        <Hero />
      </div>
    </>
  )
}

export default Home