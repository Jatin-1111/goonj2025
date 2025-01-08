import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

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

  return (
    <div className="bg-[#0D0221] py-40 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(255, 165, 0, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.05) 0%, transparent 50%)'
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
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Event Timeline
          </h2>
          <p className="text-xl text-gray-300">Three Days of Innovation and Culture</p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto mt-4"/>
        </motion.div>

        {/* EventTimeline Content */}
        <div className="space-y-12">
          {events.map((day, dayIndex) => (
            <motion.div
              key={dayIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: dayIndex * 0.2 }}
            >
              {/* Day Header */}
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-orange-500 mb-8 relative inline-block"
                whileHover={{ x: 10 }}
              >
                {day.date}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500/30" />
              </motion.h3>

              {/* Day Events */}
              <div className="grid gap-6">
                {day.events.map((event, eventIndex) => (
                  <motion.div
                    key={eventIndex}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: eventIndex * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Time and Location */}
                      <div className="md:w-1/4">
                        <div className="flex items-center text-cyan-500 mb-2">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="md:w-3/4">
                        <h4 className="text-xl font-semibold text-white mb-2">
                          {event.title}
                        </h4>
                        <p className="text-gray-300 mb-4">
                          {event.description}
                        </p>
                        
                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {event.highlights.map((highlight, index) => (
                            <span
                              key={index}
                              className="text-sm bg-orange-500/10 text-orange-500 rounded-full px-3 py-1"
                            >
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

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <button className="bg-gradient-to-r from-orange-500 to-cyan-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
            Download Schedule
          </button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64">
        <motion.div
          className="absolute inset-0 border-r-2 border-b-2 border-orange-500/20"
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
          className="absolute inset-0 border-l-2 border-t-2 border-cyan-500/20"
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