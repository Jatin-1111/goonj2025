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
    // ... [Previous state management code remains the same]
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
        <div className="min-h-screen bg-[#0D0221] pt-32 sm:pt-36 md:pt-40 pb-12 overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-b from-[#0D0221] via-[#1A0F1F] to-[#0D0221] opacity-50" />
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-[#FFA500]/5 mix-blend-overlay" />
                <motion.div
                    className="fixed inset-0 pointer-events-none"
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 30%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)'
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
                <Card className="bg-black/20 backdrop-blur-sm border border-orange-500/20 shadow-xl">
                    <CardHeader className="space-y-1 pb-6 sm:pb-8">
                        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-orange-50">
                            Register for Goonj 2025
                            <motion.div
                                className="mt-2 h-1 mx-auto w-32 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.5 }}
                            />
                        </CardTitle>
                        <CardDescription className="text-white/80 text-center text-base sm:text-lg">
                            Fill in your details to participate in UIET&apos;s annual techno-cultural fest
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Input fields styling updated */}
                            <div className="space-y-4">
                                {/* Name and Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-white">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className="w-full bg-white/10 backdrop-blur-sm rounded-lg border border-orange-500/20 p-3 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                  {/* Email Field */}
                                  <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-200">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                            className={`bg-[#1A1B23] border-gray-700 text-white placeholder:text-gray-500 ${errors.email ? 'border-red-500' : 'focus:border-blue-500'}`}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Phone and College */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Phone Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-gray-200">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter your phone number"
                                            className={`bg-[#1A1B23] border-gray-700 text-white placeholder:text-gray-500 ${errors.phone ? 'border-red-500' : 'focus:border-blue-500'}`}
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* College Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="college" className="text-gray-200">College Name</Label>
                                        <Input
                                            id="college"
                                            name="college"
                                            value={formData.college}
                                            onChange={handleInputChange}
                                            placeholder="Enter your college name"
                                            className={`bg-[#1A1B23] border-gray-700 text-white placeholder:text-gray-500 ${errors.college ? 'border-red-500' : 'focus:border-blue-500'}`}
                                        />
                                        {errors.college && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.college}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Course and Year */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Course Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="course" className="text-gray-200">Course</Label>
                                        <Select
                                            value={formData.course}
                                            onValueChange={(value) => handleInputChange({ target: { name: 'course', value } })}
                                        >
                                            <SelectTrigger className={`w-full bg-[#1A1B23] border-gray-700 text-white ${errors.course ? 'border-red-500' : 'focus:border-blue-500'}`}>
                                                <SelectValue placeholder="Select your course" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1A1B23] border-gray-700">
                                                {courses.map((course) => (
                                                    <SelectItem key={course} value={course} className="text-white hover:bg-blue-500/10">
                                                        {course}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.course && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.course}
                                            </p>
                                        )}
                                    </div>

                                    {/* Year Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="year" className="text-gray-200">Year</Label>
                                        <Select
                                            value={formData.year}
                                            onValueChange={(value) => handleInputChange({ target: { name: 'year', value } })}
                                        >
                                            <SelectTrigger className={`w-full bg-[#1A1B23] border-gray-700 text-white ${errors.year ? 'border-red-500' : 'focus:border-blue-500'}`}>
                                                <SelectValue placeholder="Select your year" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1A1B23] border-gray-700">
                                                {years.map((year) => (
                                                    <SelectItem key={year} value={year} className="text-white hover:bg-blue-500/10">
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.year && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.year}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Event Selection Section */}
                            <div className="space-y-2">
                                <Label className="text-white">Select Events</Label>
                                <EventSelectionModal onEventsSelect={handleEventsSelect} />

                                {selectedEvents.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-orange-500/20"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-white/80">Selected Events:</span>
                                            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300">
                                                {selectedEvents.length} events
                                            </Badge>
                                        </div>

                                        {/* ... [Event list with updated styling] */}
                                    </motion.div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white font-semibold py-3 rounded-lg hover:brightness-110 transition-all"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                ) : (
                                    'Register Now'
                                )}
                            </motion.button>

                            {/* ... [Success/Error messages with updated styling] */}
                        </form>
                    </CardContent>
                </Card>

                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-20 h-20">
                    <motion.div
                        className="absolute inset-0 border-t-2 border-l-2 border-orange-500/30"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    />
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20">
                    <motion.div
                        className="absolute inset-0 border-b-2 border-r-2 border-cyan-500/30"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1,
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default RegistrationPage;