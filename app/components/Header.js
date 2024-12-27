"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Header = () => {
    const [hidden, setHidden] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { scrollY } = useScroll()



    // Handle scroll direction for header hide/show
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous && latest > 150) {
            setHidden(true)
            setMobileMenuOpen(false) // Close mobile menu on scroll
        } else {
            setHidden(false)
        }
    })

    // Enhanced logo variants with rotation and shadow
    const logoVariants = {
        initial: {
            scale: 0,
            opacity: 0,
            y: 50,
            rotateY: 180
        },
        animate: {
            scale: 1,
            opacity: 1,
            y: 0,
            rotateY: 0,
            transition: {
                duration: 0.7,
                type: "spring",
                stiffness: 200,
                damping: 10,
                mass: 0.8
            }
        },
        hover: {
            scale: 1.15,
            rotateY: [0, 360],
            filter: [
                "brightness(1) drop-shadow(0 0 0.5rem rgba(255,255,255,0.2))",
                "brightness(1.3) drop-shadow(0 0 1rem rgba(255,215,0,0.5))",
                "brightness(1) drop-shadow(0 0 0.5rem rgba(255,255,255,0.2))"
            ],
            transition: {
                duration: 1.5,
                rotateY: {
                    duration: 1.5,
                    ease: "easeInOut"
                },
                filter: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                },
                scale: {
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300
                }
            }
        },
        tap: {
            scale: 0.9,
            rotateZ: [-10, 10, -10, 0],
            transition: {
                duration: 0.3,
                rotateZ: {
                    duration: 0.5,
                    ease: "easeInOut"
                }
            }
        },
        bounce: {
            y: [-10, 0],
            transition: {
                y: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }
            }
        }
    }

    // Enhanced navigation items with more dynamic animations
    const navItemVariants = {
        initial: { y: -20, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 200
            }
        },
        hover: {
            scale: 1.1,
            color: "#FFD700",
            textShadow: "0 0 8px rgba(255,215,0,0.5)",
            transition: {
                duration: 0.2,
                type: "spring",
                stiffness: 300
            }
        }
    }

    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    // Header slide animation for scroll
    const headerVariants = {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        },
        hidden: {
            y: "-100%",
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    }

    // Mobile menu variants
    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.1
            }
        }
    }
    const menuItemVariants = {
        closed: { x: 20, opacity: 0 },
        open: { x: 0, opacity: 1 }
    }

    const NavItems = ({ className = "", itemClassName = "" }) => (
        <>
            {['About US', 'Events', 'Star Night'].map((item, index) => (
                <motion.li
                    key={item}
                    className={`cursor-pointer text-lg relative ${itemClassName}`}
                    variants={navItemVariants}
                    whileHover="hover"
                    custom={index}
                >
                    {item}
                    <motion.div
                        className="absolute -bottom-2 left-0 w-full h-0.5 bg-yellow-400"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.li>
            ))}
        </>
    )

    return (
        <motion.div
            className='fixed w-full h-[10vh] bg-black/90 backdrop-blur-sm z-50'
            variants={headerVariants}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
        >
            <nav className='flex justify-between items-center h-full px-4 max-w-7xl mx-auto relative'>
                {/* Left Logo - Hidden on mobile */}
                <motion.div
                    variants={logoVariants}
                    initial="initial"
                    animate={["animate", "bounce"]}
                    whileHover="hover"
                    whileTap="tap"
                    className="relative w-16 h-16 md:w-20 md:h-20 hidden md:block"
                >
                    <Image
                        src={"/UIET_logo.png"}
                        fill
                        style={{ objectFit: "contain" }}
                        alt='UIET Logo'
                        className="relative z-10"
                    />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                            borderRadius: ["50%", "40%", "50%"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>

                {/* Desktop Navigation */}
                <motion.ul
                    className='hidden lg:flex gap-8 xl:gap-20 text-white'
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <NavItems />
                </motion.ul>

                {/* Center Logo - Visible on all screens */}
                <motion.div
                    variants={logoVariants}
                    initial="initial"
                    animate={["animate", "bounce"]}
                    whileHover="hover"
                    whileTap="tap"
                    className="relative w-20 h-20 md:w-24 md:h-24"  // Slightly larger on mobile
                >
                    <Image
                        src={"/goonj.jpg"}
                        fill
                        style={{ objectFit: "contain" }}
                        alt='Goonj Logo'
                        className="relative z-10"
                    />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                            borderRadius: ["50%", "40%", "50%"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>

                {/* Desktop Secondary Navigation */}
                <motion.ul
                    className='hidden lg:flex gap-8 xl:gap-20 text-white'
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                >
                    {['Info', 'Contact', 'Sponsers'].map((item, index) => (
                        <motion.li
                            key={item}
                            className='cursor-pointer text-lg relative'
                            variants={navItemVariants}
                            whileHover="hover"
                            custom={index}
                        >
                            {item}
                            <motion.div
                                className="absolute -bottom-2 left-0 w-full h-0.5 bg-yellow-400"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.li>
                    ))}
                </motion.ul>

                {/* Right Logo - Hidden on mobile */}
                <motion.div
                    variants={logoVariants}
                    initial="initial"
                    animate={["animate", "bounce"]}
                    whileHover="hover"
                    whileTap="tap"
                    className="relative w-16 h-16 md:w-20 md:h-20 hidden md:block"
                >
                    <Image
                        src={"/pu-logo.png"}
                        fill
                        style={{ objectFit: "contain" }}
                        alt='PU Logo'
                        className="relative z-10"
                    />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                            borderRadius: ["50%", "40%", "50%"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>

                {/* Mobile Menu Button - Positioned absolutely */}
                <motion.button
                    className="lg:hidden text-white p-2 absolute right-4"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="absolute top-full right-0 w-full sm:w-80 bg-black/95 backdrop-blur-lg rounded-b-xl p-6"
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <motion.ul className="flex flex-col gap-6 text-white text-lg">
                                {['About US', 'Events', 'Star Night', 'Info', 'Contact', 'Sponsers'].map((item) => (
                                    <motion.li
                                        key={item}
                                        variants={menuItemVariants}
                                        className="border-b border-white/10 pb-2"
                                        whileHover={{ x: 10, color: "#FFD700" }}
                                    >
                                        {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.div>
    )
}

export default Header