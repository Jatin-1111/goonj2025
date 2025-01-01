import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Globe, Network, Zap } from 'lucide-react';

const SponserCTA = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      className="mt-8 md:mt-16 lg:mt-20"
      variants={itemVariants}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-orange-900/50 overflow-hidden">
        <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12 relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-16 sm:-top-24 md:-top-32 -left-16 sm:-left-24 md:-left-32 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-orange-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute -bottom-16 sm:-bottom-24 md:-bottom-32 -right-16 sm:-right-24 md:-right-32 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                delay: 4
              }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10">
            {/* Floating Icons - Hidden on mobile */}
            <div className="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Network className="w-6 h-6 md:w-8 md:h-8 text-orange-500/40" />
              </motion.div>
            </div>
            <div className="hidden md:block absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-cyan-500/40" />
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center mb-4 md:mb-6 relative"
              >
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
                <div className="absolute inset-0">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-full h-full bg-orange-500/20 rounded-full blur-md"
                  />
                </div>
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-400 text-transparent bg-clip-text mb-3 md:mb-4">
                Become a Sponsor
              </h2>
              <p className="text-gray-400 mb-6 md:mb-8 text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4 sm:px-6">
                Join our community of innovative partners and help shape the future of technology and culture at UIET&apos;s premier festival.
              </p>

              {/* Enhanced Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button className="relative bg-gradient-to-r from-orange-500 to-cyan-500 text-white font-semibold px-4 sm:px-6 md:px-8 py-4 md:py-6 rounded-lg group overflow-hidden">
                  {/* Button Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  {/* Button Content */}
                  <div className="relative flex items-center text-sm sm:text-base">
                    <Zap className="w-4 h-4 mr-2 text-white/90 hidden sm:inline" />
                    <span className="mr-2">Get Sponsorship Details</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SponserCTA;