import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Clock, Cpu, MapPin, Radio, Zap } from 'lucide-react';

const EventTimeline = () => {
  const events = [
    {
      date: 'Day 1 - February 19, 2025',
      events: [
        {
          time: '09:00 AM',
          title: 'Opening Ceremony',
          description: 'Inauguration of Goonj 2025 with traditional lamp lighting',
          location: 'Main Auditorium',
          highlights: ['Welcome address', 'Cultural performance', 'Keynote speech']
        },
        {
          time: '11:00 AM',
          title: 'Technical Symposium',
          description: 'Series of technical talks by industry experts',
          location: 'Seminar Hall',
          highlights: ['AI in Industry', 'Future of Web3', 'Cloud Computing Trends']
        },
        {
          time: '02:00 PM',
          title: 'Hackathon Kickoff',
          description: '24-hour coding challenge begins',
          location: 'Computer Labs',
          highlights: ['Team formation', 'Problem statement release', 'Mentorship sessions']
        },
        {
          time: '06:00 PM',
          title: 'Cultural Evening',
          description: 'Music and dance performances',
          location: 'Open Air Theatre',
          highlights: ['Classical performances', 'Band performances', 'Dance shows']
        }
      ]
    },
    {
      date: 'Day 2 - February 20, 2025',
      events: [
        {
          time: '10:00 AM',
          title: 'Technical Workshops',
          description: 'Parallel workshops on emerging technologies',
          location: 'Workshop Halls',
          highlights: ['IoT Workshop', 'Mobile App Development', 'Machine Learning']
        },
        {
          time: '02:00 PM',
          title: 'Hackathon Continues',
          description: 'Ongoing development and mentorship',
          location: 'Computer Labs',
          highlights: ['Progress review', 'Expert guidance', 'Development sprint']
        },
        {
          time: '04:00 PM',
          title: 'Gaming Tournament',
          description: 'E-sports and gaming competitions',
          location: 'Gaming Arena',
          highlights: ['CSGO Tournament', 'Valorant matches', 'FIFA championship']
        },
        {
          time: '07:00 PM',
          title: 'Star Night',
          description: 'Celebrity performance and entertainment',
          location: 'Main Ground',
          highlights: ['Celebrity performance', 'DJ night', 'Light show']
        }
      ]
    },
    {
      date: 'Day 3 - February 21, 2025',
      events: [
        {
          time: '10:00 AM',
          title: 'Hackathon Final Presentations',
          description: 'Teams present their solutions',
          location: 'Main Auditorium',
          highlights: ['Project demonstrations', 'Jury evaluation', 'Winner selection']
        },
        {
          time: '02:00 PM',
          title: 'Innovation Exhibition',
          description: 'Showcase of student projects and startups',
          location: 'Exhibition Hall',
          highlights: ['Project demos', 'Startup pitches', 'Networking session']
        },
        {
          time: '05:00 PM',
          title: 'Prize Distribution',
          description: 'Awards ceremony for all competitions',
          location: 'Main Auditorium',
          highlights: ['Technical awards', 'Cultural awards', 'Special recognition']
        },
        {
          time: '07:00 PM',
          title: 'Closing Ceremony',
          description: 'Grand finale of Goonj 2025',
          location: 'Open Air Theatre',
          highlights: ['Closing address', 'Highlights showcase', 'Vote of thanks']
        }
      ]
    }
  ];

  // Circuit line animation component
  const CircuitLine = ({ className = "" }) => (
    <div className={`absolute ${className}`}>
      <motion.div
        className="h-px bg-yellow-500/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-yellow-500/50 absolute -right-1 -top-1"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
  );

  return (
    <div className="bg-[#1a1a2e] py-40 relative overflow-hidden">
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid grid-cols-12 gap-4">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-yellow-500/20"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                delay: i * 0.01,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      {/* Power Flow Effect */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(0, 191, 255, 0.05) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title with Electrical Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-32 h-32 rounded-full bg-yellow-500/5"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative">
            <Zap className="inline-block w-8 h-8 mr-2 text-yellow-500" />
            Event Timeline
          </h2>
          <p className="text-xl text-yellow-100/80">Powering Innovation and Technology</p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 via-blue-500 to-yellow-500 mx-auto mt-4"/>
        </motion.div>

        {/* Timeline Content */}
        <div className="space-y-12">
          {events.map((day, dayIndex) => (
            <motion.div
              key={dayIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: dayIndex * 0.2 }}
              className="relative"
            >
              {/* Circuit connections between days */}
              <CircuitLine className="left-0 right-0 top-16" />
              
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-yellow-500 mb-8 relative inline-block"
                whileHover={{ x: 10 }}
              >
                <Battery className="inline-block w-6 h-6 mr-2" />
                {day.date}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500/30" />
              </motion.h3>

              <div className="grid gap-6">
                {day.events.map((event, eventIndex) => (
                  <motion.div
                    key={eventIndex}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: eventIndex * 0.1 }}
                    className="bg-blue-900/10 backdrop-blur-sm rounded-lg p-6 hover:bg-blue-900/20 transition-colors border border-yellow-500/20 relative"
                  >
                    {/* Circuit node decorations */}
                    <div className="absolute -left-2 top-1/2 w-4 h-4 rounded-full border-2 border-yellow-500/50 transform -translate-y-1/2" />
                    
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="md:w-1/4">
                        <div className="flex items-center text-yellow-500 mb-2">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-blue-400">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <div className="md:w-3/4">
                        <h4 className="text-xl font-semibold text-yellow-100 mb-2 flex items-center">
                          <Radio className="w-5 h-5 mr-2 text-yellow-500" />
                          {event.title}
                        </h4>
                        <p className="text-blue-100/80 mb-4">
                          {event.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {event.highlights.map((highlight, index) => (
                            <span
                              key={index}
                              className="text-sm bg-yellow-500/10 text-yellow-400 rounded-full px-3 py-1 border border-yellow-500/20"
                            >
                              <Cpu className="w-3 h-3 inline-block mr-1" />
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Button with Electrical Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <button className="bg-gradient-to-r from-yellow-500 to-blue-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center mx-auto">
            <Zap className="w-5 h-5 mr-2" />
            Download Schedule
          </button>
        </motion.div>
      </div>

      {/* Electrical-themed Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64">
        <motion.div
          className="absolute inset-0 border-r-2 border-b-2 border-yellow-500/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </div>
      <div className="absolute top-0 left-0 w-64 h-64">
        <motion.div
          className="absolute inset-0 border-l-2 border-t-2 border-blue-500/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 2,
          }}
        />
      </div>
    </div>
  );
};

export default EventTimeline;