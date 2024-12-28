"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Header = () => {
    const [hidden, setHidden] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { scrollY } = useScroll()

    const primaryNavItems = [
        { label: 'About Us', href: '/about' },
        { label: 'Events', href: '/events' },
        { label: 'Star Night', href: '/star-night' }
    ];

    const secondaryNavItems = [
        { label: 'Info', href: '/info' },
        { label: 'Contact', href: '/contact' },
        { label: 'Sponsors', href: '/sponsors' }
    ];

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous && latest > 150) {
            setHidden(true)
            setMobileMenuOpen(false)
        } else {
            setHidden(false)
        }
    })

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
                "brightness(1) drop-shadow(0 0 0.5rem rgba(255,123,0,0.2))",
                "brightness(1.3) drop-shadow(0 0 1rem rgba(0,128,0,0.5))",
                "brightness(1) drop-shadow(0 0 0.5rem rgba(255,123,0,0.2))"
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
                }
            }
        }
    }

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
            color: "#FF7B00",
            textShadow: "0 0 8px rgba(255,123,0,0.5)",
            transition: {
                duration: 0.2,
                type: "spring",
                stiffness: 300
            }
        }
    }

    const headerVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
    }

    const NavItems = ({ items, className = "", itemClassName = "" }) => (
        <>
            {items.map((item, index) => (
                <Link href={item.href} key={item.label}>
                    <motion.li
                        className={`cursor-pointer relative ${itemClassName} text-base sm:text-lg font-sanskrit`}
                        variants={navItemVariants}
                        whileHover="hover"
                        custom={index}
                    >
                        {item.label}
                        <motion.div
                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    </motion.li>
                </Link>
            ))}
        </>
    )

    const Logo = ({ src, alt, className }) => (
        <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className={`relative ${className}`}
        >
            <Image
                src={src}
                fill
                style={{ objectFit: "contain" }}
                alt={alt}
                className="relative z-10"
                sizes="(max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
            />
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-green-600/30 rounded-full blur-lg"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
        </motion.div>
    )

    return (
        <motion.header
            className="fixed w-full bg-[#1A0F1F]/90 backdrop-blur-sm z-50 h-24 sm:h-28"
            variants={headerVariants}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.3 }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2D1810]/50 via-transparent to-[#1F2937]/50" />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-green-500 to-orange-500" />
                <div className="absolute top-1 left-0 w-full h-px bg-gradient-to-r from-orange-300/20 via-green-300/20 to-orange-300/20" />
                <motion.div
                    className="absolute top-2 left-4 w-4 h-4 rounded-full bg-orange-500/30"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                />
                <motion.div
                    className="absolute top-2 right-4 w-4 h-4 rounded-full bg-green-500/30"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1,
                    }}
                />
            </div>

            <nav className="relative flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full max-w-7xl mx-auto">
                <div className="hidden md:block">
                    <Link href="https://uiet.puchd.ac.in/">
                        <Logo
                            src="/UIET_logo.png"
                            alt="UIET Logo"
                            className="w-12 h-12 sm:w-16 sm:h-16"
                        />
                    </Link>
                </div>

                <motion.ul
                    className="hidden lg:flex gap-4 xl:gap-8 text-orange-50"
                    initial="initial"
                    animate="animate"
                >
                    <NavItems items={primaryNavItems} />
                </motion.ul>
                <Link href="/">
                    <Logo
                        src="/goonj.jpg"
                        alt="Goonj Logo"
                        className="w-16 h-16 sm:w-20 sm:h-20"
                    />
                </Link>
                <motion.ul
                    className="hidden lg:flex gap-4 xl:gap-8 text-orange-50"
                    initial="initial"
                    animate="animate"
                >
                    <NavItems items={secondaryNavItems} />
                </motion.ul>

                <div className="hidden md:block">
                    <Link href="https://puchd.ac.in/">
                        <Logo
                            src="/pu-logo.png"
                            alt="PU Logo"
                            className="w-12 h-12 sm:w-16 sm:h-16"
                        />
                    </Link>
                </div>

                <motion.button
                    className="lg:hidden text-orange-50 p-2"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="lg:hidden absolute top-full left-0 right-0 bg-[#1A0F1F]/95 backdrop-blur-lg shadow-lg"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.ul
                            className="flex flex-col px-4 py-4 space-y-4 text-orange-50"
                            initial="initial"
                            animate="animate"
                            variants={{
                                animate: {
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                        >
                            {[...primaryNavItems, ...secondaryNavItems].map((item) => (
                                <Link href={item.href} key={item.label}>
                                    <motion.li
                                        variants={navItemVariants}
                                        className="border-b border-orange-900/30 pb-2"
                                        whileHover={{ x: 10, color: "#FF7B00" }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </motion.li>
                                </Link>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

export default Header