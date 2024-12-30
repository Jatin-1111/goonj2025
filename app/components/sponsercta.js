import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Globe, Network, Zap } from 'lucide-react';

const EnhancedCTA = () => {
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
      className="mt-20"
      variants={itemVariants}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-orange-900/50 overflow-hidden">
        <CardContent className="p-12 relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-32 -left-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute -bottom-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: 4
              }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10">
            {/* Floating Icons */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
              >
                <Network className="w-8 h-8 text-orange-500/40" />
              </motion.div>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <Globe className="w-8 h-8 text-cyan-500/40" />
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center mb-6 relative"
              >
                <Sparkles className="w-8 h-8 text-orange-500" />
                <div className="absolute inset-0">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }}
                    className="w-full h-full bg-orange-500/20 rounded-full blur-md"
                  />
                </div>
              </motion.div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-400 text-transparent bg-clip-text mb-4">
                Become a Sponsor
              </h2>
              <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                Join our community of innovative partners and help shape the future of technology and culture at UIET&apos;s premier festival.
              </p>

              {/* Enhanced Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button className="relative bg-gradient-to-r from-orange-500 to-cyan-500 text-white font-semibold px-8 py-6 rounded-lg group overflow-hidden">
                  {/* Button Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  
                  {/* Button Content */}
                  <div className="relative flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-white/90" />
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

export default EnhancedCTA;
