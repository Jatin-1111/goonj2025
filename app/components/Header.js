"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Cpu, Code, Radio, Zap, Cog, TestTube } from 'lucide-react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const headerRef = useRef(null)
    const mobileMenuRef = useRef(null)
    const { scrollY } = useScroll()
    const isDevelopment = process.env.NEXT_PUBLIC_ENV === "development"
    const pathname = usePathname()

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    // Effect to handle clicking outside of mobile menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!mobileMenuOpen) return;

            const menuButton = document.querySelector('[aria-label="Toggle menu"]');

            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                menuButton &&
                !menuButton.contains(event.target)
            ) {
                setMobileMenuOpen(false);
            }
        };

        // Add event listener when menu is open
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    // Branch-specific icon animations
    const iconVariants = {
        cse: {
            animate: {
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }
            }
        },
        it: {
            animate: {
                y: [-5, 5],
                scale: [1, 1.1, 1],
                transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    yoyo: true
                }
            }
        },
        ece: {
            animate: {
                scale: [1, 1.2, 1],
                opacity: [1, 0.6, 1],
                transition: {
                    duration: 1.8,
                    repeat: Infinity
                }
            }
        },
        electrical: {
            animate: {
                scale: [1, 1.15, 1],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
                transition: {
                    duration: 1.2,
                    repeat: Infinity
                }
            }
        },
        mechanical: {
            animate: {
                rotate: [0, 180],
                scale: [1, 1.1, 1],
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }
        },
        biotech: {
            animate: {
                scale: [1, 1.2, 1],
                y: [-3, 3],
                transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    yoyo: true
                }
            }
        }
    }

    // Navigation items with branch-specific hover effects
    const navItems = [
        {
            label: 'About Us',
            href: '/about',
            icon: Cpu,
            branch: 'cse',
        },
        {
            label: 'Events',
            href: '/events',
            icon: Code,
            branch: 'it',
        },
        {
            label: 'Star Night',
            href: '/star-night',
            icon: Radio,
            branch: 'ece',
        },
        {
            label: 'Info',
            href: '/info',
            icon: Zap,
            branch: 'electrical',
        },
        {
            label: 'Contact',
            href: '/contact',
            icon: Cog,
            branch: 'mechanical',
        },
        {
            label: 'Sponsors',
            href: '/sponsors',
            icon: TestTube,
            branch: 'biotech',
        }
    ]

    // Enhanced NavItem component with branch-specific animations
    const NavItem = ({ item }) => {
        const [isHovered, setIsHovered] = useState(false)
        const itemRef = useRef(null)
        const IconComponent = item.icon

        useEffect(() => {
            if (isHovered) {
                const ctx = gsap.context(() => {
                    // Branch-specific GSAP animations
                    switch (item.branch) {
                        case 'cse':
                            gsap.to(itemRef.current, {
                                boxShadow: '0 0 15px #00ff00',
                                duration: 0.3
                            })
                            break
                        case 'it':
                            gsap.to(itemRef.current, {
                                boxShadow: '0 0 15px #0066ff',
                                duration: 0.3
                            })
                            break
                        case 'ece':
                            gsap.to(itemRef.current, {
                                boxShadow: '0 0 15px #ff3300',
                                duration: 0.3
                            })
                            break
                        case 'electrical':
                            gsap.to(itemRef.current, {
                                boxShadow: '0 0 15px #ffff00',
                                duration: 0.3
                            })
                            break
                        case 'mechanical':
                            gsap.to(itemRef.current, {
                                boxShadow: '0 0 15px #cc33ff',
                                duration: 0.3
                            })
                            break
                        case 'biotech':
                            gsap.to(itemRef.current, {
                                boxShadow: '0 0 15px #00ffcc',
                                duration: 0.3
                            })
                            break
                    }
                }, itemRef)

                return () => ctx.revert()
            }
        }, [isHovered, item.branch])

        return (
            <motion.div
                ref={itemRef}
                className="relative group cursor-pointer rounded-lg p-2"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={() => setMobileMenuOpen(false)}
            >
                <Link href={item.href}>
                    <div className="flex items-center gap-2">
                        <motion.div
                            variants={iconVariants[item.branch]}
                            animate={isHovered ? "animate" : ""}
                        >
                            <IconComponent className="w-5 h-5 text-orange-50" />
                        </motion.div>
                        <span className="text-orange-50 text-lg font-sanskrit">
                            {item.label}
                        </span>
                    </div>
                </Link>
            </motion.div>
        )
    }

    // Rest of your existing components (Logo, MenuButton) remain the same
    const Logo = ({ src, alt, className }) => {
        const [isHovered, setIsHovered] = useState(false)

        const glowVariants = {
            rest: {
                scale: 0.8,
                opacity: 0,
                filter: "blur(8px)"
            },
            hover: {
                scale: [1.2, 1.5, 1.2],
                opacity: [0.4, 0.6, 0.4],
                filter: "blur(15px)",
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }
        }

        const imageVariants = {
            rest: {
                scale: 1,
                rotate: 0
            },
            hover: {
                scale: 1.1,
                rotate: [0, 5, -5, 0],
                transition: {
                    rotate: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    scale: {
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 10
                    }
                }
            }
        }

        return (
            <motion.div
                className={`relative ${className}`}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                initial="rest"
                animate={isHovered ? "hover" : "rest"}
            >
                <motion.div
                    className="relative z-10 w-full h-full"
                    variants={imageVariants}
                >
                    <Image
                        src={src}
                        fill
                        style={{ objectFit: "contain" }}
                        alt={alt}
                        priority
                        sizes="(max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                    />
                </motion.div>

                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-yellow-500/30 to-orange-500/30 rounded-full"
                    variants={glowVariants}
                />

                <AnimatePresence>
                    {isHovered && (
                        <>
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-orange-400/40 rounded-full"
                                    initial={{
                                        scale: 0,
                                        x: "-50%",
                                        y: "-50%",
                                        opacity: 0
                                    }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        x: [0, (i % 2 ? 50 : -50) * Math.random()],
                                        y: [-20, -100 * Math.random()],
                                        opacity: [0, 1, 0],
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 1 + Math.random(),
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                    style={{
                                        left: "50%",
                                        top: "50%"
                                    }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
        )
    }

    const MenuButton = ({ isOpen, onClick }) => (
        <motion.button
            className="lg:hidden relative text-orange-50 p-2"
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
        >
            <motion.div
                className="absolute inset-0 bg-orange-500/20 rounded-full"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
    );

    return (
        <motion.header
            ref={headerRef}
            className="fixed w-full z-50 h-24 sm:h-28"
        >
            <motion.div className={`absolute inset-0 ${isDevelopment ? "bg-blue-700" : "bg-[#1A0F1F]/90"} backdrop-blur-sm`}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#2D1810]/50 via-transparent to-[#1F2937]/50" />
            </motion.div>

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

                <div className="hidden lg:flex gap-6">
                    {navItems.slice(0, 3).map(item => (
                        <NavItem key={item.label} item={item} />
                    ))}
                </div>

                <Link href="/">
                    <Logo
                        src="/goonj.jpg"
                        alt="Goonj Logo"
                        className="w-16 h-16 sm:w-20 sm:h-20"
                    />
                </Link>

                <div className="hidden lg:flex gap-6">
                    {navItems.slice(3).map(item => (
                        <NavItem key={item.label} item={item} />
                    ))}
                </div>

                <div className="hidden md:block">
                    <Link href="https://puchd.ac.in/">
                        <Logo
                            src="/pu-logo.png"
                            alt="PU Logo"
                            className="w-12 h-12 sm:w-16 sm:h-16"
                        />
                    </Link>
                </div>

                <MenuButton
                    isOpen={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        ref={mobileMenuRef}  // Add the ref here
                        className="lg:hidden absolute top-full left-0 right-0 bg-[#1A0F1F]/95 backdrop-blur-lg shadow-lg"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 200
                        }}
                    >
                        <motion.div
                            className="flex flex-col px-4 py-4 space-y-4"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: {
                                    transition: { staggerChildren: 0.1 }
                                },
                                closed: {
                                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                                }
                            }}
                        >
                            {navItems.map(item => (
                                <motion.div
                                    key={item.label}
                                    variants={{
                                        open: { x: 0, opacity: 1 },
                                        closed: { x: -20, opacity: 0 }
                                    }}
                                >
                                    <NavItem item={item} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header >
    )
}

export default Header