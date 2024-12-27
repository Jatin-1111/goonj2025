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
        <div className="min-h-screen bg-[#0A0A0F] pt-32 sm:pt-36 md:pt-40 pb-12 overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#121420] to-[#0A0A0F] opacity-50" />
            <motion.div
                className="fixed inset-0 pointer-events-none"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.08) 0%, transparent 50%)'
                    ]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            {/* Main Content */}
            <motion.div
                className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Card className="bg-[#121420]/50 backdrop-blur-sm border-gray-800 shadow-xl">
                    <CardHeader className="space-y-1 pb-6 sm:pb-8">
                        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Register for Goonj 2025
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-center text-base sm:text-lg">
                            Fill in your details to participate in UIET&apos;s annual techno-cultural fest
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information Section */}
                            <div className="space-y-4">
                                {/* Name and Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Name Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className={`bg-[#1A1B23] border-gray-700 text-white placeholder:text-gray-500 ${errors.name ? 'border-red-500' : 'focus:border-blue-500'}`}
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
                                <Label className="text-gray-200">Select Events</Label>
                                <EventSelectionModal onEventsSelect={handleEventsSelect} />

                                {selectedEvents.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-4 rounded-lg bg-[#1A1B23] border border-gray-700"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-300">Selected Events:</span>
                                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
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
                                            <Separator className="my-2 bg-gray-800" />
                                            <div className="flex justify-between items-center font-medium">
                                                <span className="text-gray-300">Total Amount:</span>
                                                <span className="text-white">₹{totalPrice}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-6"
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
                            </Button>

                            {/* Success/Error Messages */}
                            {submitStatus === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-500 flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                    Registration successful! Check your email for confirmation.
                                </motion.p>
                            )}
                            {submitStatus === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 flex items-center justify-center gap-2"
                                >
                                    <AlertCircle className="w-5 h-5" />
                                    Something went wrong. Please try again.
                                </motion.p>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default RegistrationPage;