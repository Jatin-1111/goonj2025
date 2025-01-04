"use client"
import React, { useState, useEffect} from 'react';
import Hero from './components/Hero';
import Gallery from './components/gallery';
import FAQ from './components/faqs';
import Preloader from './components/preloader';
import AboutSection from './components/about_home';
import Countdown from './components/countdown';
import EventsSection from './components/Events-carousel';
import GlimpseTimeline from './components/glimpse-timeline';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    months: 0,
    weeks: 0
  });

  //useEffect(() => {
  //  const timer = setTimeout(() => {
  //    setLoading(false);
  //  }, 2000);
  //  return () => clearTimeout(timer);
  //}, []);

  useEffect(() => {
    const targetDate = new Date('2025-02-19T00:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        // Calculate all time units
        const totalSeconds = Math.floor(difference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const days = Math.floor(totalHours / 24);

        // Calculate remaining units
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        setTimeLeft((prev) => {
          if (
            prev.days === days &&
            prev.hours === hours &&
            prev.minutes === minutes &&
            prev.seconds === seconds
          ) {
            return prev;
          }
          return { days, hours, minutes, seconds };
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // if (loading) {
  //   return <Preloader />;
  // }

  return (
    <main className="relative">
      <section id="hero" className="relative z-40">
        <Hero timeLeft={timeLeft}/>
      </section>

      {/* Events Carousel Section */}
      <section id="about" className="relative z-40">
        <EventsSection />
      </section>

      {/* About Section */}
      <section id="about" className="relative z-40">
        <AboutSection />
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative z-40">
        <Gallery />
      </section>

      {/* Glimpse Timeline Section */}
      <section id="timeline" className="relative z-40">
        <GlimpseTimeline />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-40">
        <FAQ />
      </section>
    </main>
  );
};

export default Home;
