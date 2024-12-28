"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import EventSelectionModal from '../components/EventSelectionModal';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        college: '',
        course: '',
        year: '',
        events: [],
        referralCode: '',
        totalAmount: 0
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);


    const handleEventsSelect = (events, price) => {
        setSelectedEvents(events);
        setTotalPrice(price);
        setFormData(prev => ({
            ...prev,
            events: events,
            totalAmount: price
        }));
    };

    const courses = [
        'B.Tech - Computer Science',
        'B.Tech - Information Technology',
        'B.Tech - Electronics',
        'B.Tech - Mechanical',
        'B.Tech - Biotechnology',
        'Other'
    ];

    const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Other'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number';
        }

        if (!formData.college.trim()) {
            newErrors.college = 'College name is required';
        }

        if (!formData.course) {
            newErrors.course = 'Course is required';
        }

        if (!formData.year) {
            newErrors.year = 'Year is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        if (validateForm()) {
            try {
                // Simulating API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                setSubmitStatus('success');
                // Reset form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    college: '',
                    course: '',
                    year: '',
                    events: [],
                    referralCode: ''
                });
            } catch (error) {
                setSubmitStatus('error');
            }
        }
        setIsSubmitting(false);
    };
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-32 sm:pt-36 md:pt-40 pb-12 overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-[url('/patterns/rangoli.png')] opacity-[0.02]" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-transparent to-cyan-950/30" />
                <motion.div
                    className="fixed inset-0 pointer-events-none"
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 30%, rgba(251, 146, 60, 0.03) 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.03) 0%, transparent 50%)'
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Card className="bg-gray-900/90 backdrop-blur-sm border-2 border-orange-900/50 shadow-xl">
                    <CardHeader className="space-y-1 pb-6 sm:pb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <motion.div
                                className="w-12 h-12 bg-gradient-to-br from-orange-500 to-cyan-500 rounded-lg"
                                animate={{
                                    rotate: [0, 180],
                                    borderRadius: ["20%", "50%", "20%"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            />
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-400 text-transparent bg-clip-text">
                            Register for Goonj 2025
                            <motion.div
                                className="mt-2 h-1 mx-auto w-32 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.5 }}
                            />
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-center text-base sm:text-lg">
                            Join us in celebrating technology & culture at UIET&apos;s annual fest
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                {/* Name and Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-gray-300 font-medium">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className="w-full bg-gray-800/80 border-orange-900/50 rounded-lg p-3 text-gray-200 placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500 transition-colors"
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-300 font-medium">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                            className="bg-gray-800/80 border-orange-900/50 text-gray-200 placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500"
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Phone and College */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-gray-300 font-medium">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter your phone number"
                                            className="bg-gray-800/80 border-orange-900/50 text-gray-200 placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500"
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="college" className="text-gray-300 font-medium">College Name</Label>
                                        <Input
                                            id="college"
                                            name="college"
                                            value={formData.college}
                                            onChange={handleInputChange}
                                            placeholder="Enter your college name"
                                            className="bg-gray-800/80 border-orange-900/50 text-gray-200 placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500"
                                        />
                                        {errors.college && (
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.college}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Course and Year */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="course" className="text-gray-300 font-medium">Course</Label>
                                        <Select
                                            value={formData.course}
                                            onValueChange={(value) => handleInputChange({ target: { name: 'course', value } })}
                                        >
                                            <SelectTrigger className="w-full bg-gray-800/80 border-orange-900/50 text-gray-200">
                                                <SelectValue placeholder="Select your course" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-orange-900/50">
                                                {courses.map((course) => (
                                                    <SelectItem key={course} value={course} className="text-gray-200 hover:bg-gray-700">
                                                        {course}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.course && (
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.course}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="year" className="text-gray-300 font-medium">Year</Label>
                                        <Select
                                            value={formData.year}
                                            onValueChange={(value) => handleInputChange({ target: { name: 'year', value } })}
                                        >
                                            <SelectTrigger className="w-full bg-gray-800/80 border-orange-900/50 text-gray-200">
                                                <SelectValue placeholder="Select your year" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-orange-900/50">
                                                {years.map((year) => (
                                                    <SelectItem key={year} value={year} className="text-gray-200 hover:bg-gray-700">
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.year && (
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.year}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Event Selection Section */}
                            <div className="space-y-2">
                                <Label className="text-gray-300 font-medium">Select Events</Label>
                                <EventSelectionModal onEventsSelect={handleEventsSelect} />

                                {selectedEvents.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-4 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-900/50"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-300">Selected Events:</span>
                                            <Badge variant="secondary" className="bg-cyan-900/50 text-cyan-300">
                                                {selectedEvents.length} events
                                            </Badge>
                                        </div>

                                        <div className="space-y-2">
                                            {selectedEvents.map(event => (
                                                <div key={event.id} className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-400">{event.name}</span>
                                                    <span className="text-gray-300">₹{event.price}</span>
                                                </div>
                                            ))}
                                            <Separator className="my-2 bg-orange-900/30" />
                                            <div className="flex justify-between items-center font-medium">
                                                <span className="text-gray-300">Total Amount:</span>
                                                <span className="text-cyan-400">₹{totalPrice}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-orange-500 via-orange-400 to-cyan-500 text-white font-semibold py-3 rounded-lg hover:brightness-110 transition-all"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                                    />
                                ) : (
                                    'Register Now'
                                )}
                            </motion.button>

                            {/* Success/Error Messages */}
                            {submitStatus === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-400 flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                    Registration successful! Check your email for confirmation.
                                </motion.p>
                            )}
                            {submitStatus === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 flex items-center justify-center gap-2"
                                >
                                    <AlertCircle className="w-5 h-4" />
                                    Something went wrong. Please try again.
                                </motion.p>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Decorative Corner Elements - Inspired by Indian Patterns */}
                {/* Top Left Corner - Paisley Pattern */}
                <div className="absolute -top-4 -left-4 w-32 h-32">
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M0 0C30 0 40 10 40 40C40 70 20 80 0 80"
                                stroke="url(#paint0_linear)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M10 0C40 0 50 10 50 40C50 70 30 90 0 90"
                                stroke="url(#paint0_linear)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                            />
                            <defs>
                                <linearGradient id="paint0_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F97316" />
                                    <stop offset="1" stopColor="#06B6D4" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        <div className="w-16 h-16 border-t-2 border-l-2 border-orange-500/30 rounded-tl-3xl" />
                    </motion.div>
                </div>

                {/* Bottom Right Corner - Mandala Segment */}
                <div className="absolute -bottom-20 -right-4 w-32 h-32">
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M100 100C70 100 60 90 60 60C60 30 80 20 100 20"
                                stroke="url(#paint1_linear)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M90 100C60 100 50 90 50 60C50 30 70 10 100 10"
                                stroke="url(#paint1_linear)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                            />
                            <motion.circle
                                cx="75"
                                cy="75"
                                r="8"
                                stroke="url(#paint1_linear)"
                                strokeWidth="1"
                                fill="none"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            />
                            <defs>
                                <linearGradient id="paint1_linear" x1="100" y1="100" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#06B6D4" />
                                    <stop offset="1" stopColor="#F97316" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 1
                        }}
                    >
                        <div className="w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl ml-auto mt-auto" />
                    </motion.div>
                </div>

                {/* Top Right Accent */}
                <motion.div
                    className="absolute -top-2 -right-2 w-24 h-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.path
                            d="M100 0C85 15 80 30 85 50C90 70 95 80 100 90"
                            stroke="url(#paint2_linear)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 1 }}
                        />
                        <defs>
                            <linearGradient id="paint2_linear" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F97316" />
                                <stop offset="1" stopColor="#06B6D4" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>

                {/* Bottom Left Accent */}
                <motion.div
                    className="absolute -bottom-2 -left-2 w-24 h-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.path
                            d="M0 100C15 85 20 70 15 50C10 30 5 20 0 10"
                            stroke="url(#paint3_linear)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 1 }}
                        />
                        <defs>
                            <linearGradient id="paint3_linear" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#06B6D4" />
                                <stop offset="1" stopColor="#F97316" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default RegistrationPage;