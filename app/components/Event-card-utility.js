// Sample Events Data
export const events = [
  {
      title: 'Tech Innovation Summit',
      image: '/events/tech-summit.png',
      date: '2024-04-15',
      time: '9:00 AM',
      venue: 'Main Convention Center',
      description: 'Join industry leaders and innovators for a day of cutting-edge technology discussions, demonstrations, and networking opportunities.',
      capacity: '1000 attendees',
      gallery: {
          grid: [
              { id: 1, image: '/events/tech-summit-1.png', title: 'Keynote Speech', size: 'large' },
              { id: 2, image: '/events/tech-summit-2.png', title: 'Innovation Showcase', size: 'medium' },
              { id: 3, image: '/events/tech-summit-3.png', title: 'Panel Discussion', size: 'small' },
              { id: 4, image: '/events/tech-summit-4.png', title: 'Networking Session', size: 'small' }
          ],
          highlights: [
              '25+ industry speakers',
              'Interactive tech demos',
              'Startup showcase',
              'Networking lunch included'
          ]
      }
  },
  {
      title: 'Global Food Festival',
      image: '/events/food-fest.png',
      date: '2024-04-18',
      time: '11:00 AM',
      venue: 'City Square Park',
      description: 'Experience a culinary journey around the world with dishes from over 30 countries, live cooking demonstrations, and cultural performances.',
      capacity: '5000 attendees',
      gallery: {
          grid: [
              { id: 1, image: '/events/food-fest-1.png', title: 'Chef Showcase', size: 'large' },
              { id: 2, image: '/events/food-fest-2.png', title: 'Food Stalls', size: 'medium' },
              { id: 3, image: '/events/food-fest-3.png', title: 'Cooking Demo', size: 'small' },
              { id: 4, image: '/events/food-fest-4.png', title: 'Cultural Show', size: 'small' }
          ],
          highlights: [
              '30+ international cuisines',
              'Celebrity chef appearances',
              'Live cooking competitions',
              'Cultural performances'
          ]
      }
  },
  {
      title: 'Art & Design Expo',
      image: '/events/art-expo.png',
      date: '2024-04-20',
      time: '10:00 AM',
      venue: 'Metropolitan Gallery',
      description: 'Discover contemporary art and design from emerging and established artists, featuring installations, workshops, and live demonstrations.',
      capacity: '800 attendees',
      gallery: {
          grid: [
              { id: 1, image: '/events/art-expo-1.png', title: 'Gallery Exhibition', size: 'large' },
              { id: 2, image: '/events/art-expo-2.png', title: 'Artist Workshop', size: 'medium' },
              { id: 3, image: '/events/art-expo-3.png', title: 'Live Painting', size: 'small' },
              { id: 4, image: '/events/art-expo-4.png', title: 'Installation View', size: 'small' }
          ],
          highlights: [
              '50+ artists featured',
              'Interactive workshops',
              'Live art creation',
              'Artist meet & greet'
          ]
      }
  },
  {
      title: 'Music Festival',
      image: '/events/music-fest.png',
      date: '2024-04-22',
      time: '4:00 PM',
      venue: 'Riverside Arena',
      description: 'A multi-genre music festival featuring top artists, emerging talent, and interactive music experiences across multiple stages.',
      capacity: '10000 attendees',
      gallery: {
          grid: Array(4).fill().map((_, i) => ({
              id: i + 1,
              image: `/events/music-fest-${i + 1}.png`,
              title: ['Main Stage', 'Artist Performance', 'Crowd View', 'Night Show'][i],
              size: ['large', 'medium', 'small', 'small'][i]
          })),
          highlights: [
              '20+ live performances',
              'Multiple genre stages',
              'Food and beverage village',
              'VIP experiences available'
          ]
      }
  },
  {
      title: 'Sports Championship',
      image: '/events/sports-champ.png',
      date: '2024-04-25',
      time: '1:00 PM',
      venue: 'Central Stadium',
      description: 'Elite athletes compete in multiple sports disciplines, featuring qualifying rounds, finals, and medal ceremonies.',
      capacity: '15000 attendees',
      gallery: {
          grid: Array(4).fill().map((_, i) => ({
              id: i + 1,
              image: `/events/sports-${i + 1}.png`,
              title: ['Opening Ceremony', 'Track Events', 'Swimming Finals', 'Awards'][i],
              size: ['large', 'medium', 'small', 'small'][i]
          })),
          highlights: [
              '12 sports disciplines',
              'International athletes',
              'Live broadcasting',
              'Medal ceremonies'
          ]
      }
  },
  {
      title: 'Business Summit',
      image: '/events/business-summit.png',
      date: '2024-04-28',
      time: '8:30 AM',
      venue: 'Grand Hotel Conference Center',
      description: 'Connect with industry leaders, explore business opportunities, and gain insights into future market trends.',
      capacity: '600 attendees',
      gallery: {
          grid: Array(4).fill().map((_, i) => ({
              id: i + 1,
              image: `/events/business-${i + 1}.png`,
              title: ['Keynote Session', 'Panel Discussion', 'Networking Event', 'Workshop'][i],
              size: ['large', 'medium', 'small', 'small'][i]
          })),
          highlights: [
              'Industry keynotes',
              'Networking sessions',
              'Investment opportunities',
              'Business matchmaking'
          ]
      }
  },
  {
      title: 'Fashion Week',
      image: '/events/fashion-week.png',
      date: '2024-05-01',
      time: '7:00 PM',
      venue: 'Fashion Pavilion',
      description: 'Experience the latest in fashion with runway shows, designer showcases, and industry networking events.',
      capacity: '1200 attendees',
      gallery: {
          grid: Array(4).fill().map((_, i) => ({
              id: i + 1,
              image: `/events/fashion-${i + 1}.png`,
              title: ['Runway Show', 'Designer Collection', 'Backstage Prep', 'VIP Lounge'][i],
              size: ['large', 'medium', 'small', 'small'][i]
          })),
          highlights: [
              '30+ designer shows',
              'Celebrity appearances',
              'Pop-up boutiques',
              'After-parties'
          ]
      }
  },
  {
      title: 'Gaming Convention',
      image: '/events/gaming-con.png',
      date: '2024-05-04',
      time: '10:00 AM',
      venue: 'Tech Center',
      description: 'Immerse yourself in the world of gaming with tournaments, demos, cosplay contests, and industry panels.',
      capacity: '3000 attendees',
      gallery: {
          grid: Array(4).fill().map((_, i) => ({
              id: i + 1,
              image: `/events/gaming-${i + 1}.png`,
              title: ['Tournament Arena', 'Cosplay Contest', 'VR Experience', 'Developer Panel'][i],
              size: ['large', 'medium', 'small', 'small'][i]
          })),
          highlights: [
              'Pro tournaments',
              'Game previews',
              'Cosplay competition',
              'Developer meetups'
          ]
      }
  },
  {
      title: 'Science Fair',
      image: '/events/science-fair.png',
      date: '2024-05-07',
      time: '9:00 AM',
      venue: 'Science Museum',
      description: 'Explore innovative projects, interactive exhibits, and cutting-edge research presentations from young scientists.',
      capacity: '2000 attendees',
      gallery: {
          grid: Array(4).fill().map((_, i) => ({
              id: i + 1,
              image: `/events/science-${i + 1}.png`,
              title: ['Project Display', 'Live Experiment', 'Awards Ceremony', 'Workshop'][i],
              size: ['large', 'medium', 'small', 'small'][i]
          })),
          highlights: [
              '100+ projects',
              'Live demonstrations',
              'Expert judges',
              'Innovation awards'
          ]
      }
  },
  {
      title: 'Film Festival',
      image: '/events/film-fest.png',
      date: '2024-05-10',
      time: '6:00 PM',
      venue: 'Cinema Complex',
      description: 'Celebrate independent cinema with film screenings, director Q&As, and industry workshops.',
      capacity: '1500 attendees',
      gallery: {
          grid: Array(4).fill().map((_, i) => ({
              id: i + 1,
              image: `/events/film-${i + 1}.png`,
              title: ['Premiere Night', 'Director Talk', 'Red Carpet', 'Screening Room'][i],
              size: ['large', 'medium', 'small', 'small'][i]
          })),
          highlights: [
              '50+ film screenings',
              'Director Q&As',
              'Industry panels',
              'Awards ceremony'
          ]
      }
  }
];