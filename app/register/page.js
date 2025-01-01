"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle2, QrCode } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { toast } from 'react-toastify';
import EventSelectionModal from '../components/EventSelectionModal';
import { Button } from '@/components/ui/button';

// Constants for form options
const courses = [
    'B.Tech - Computer Science',
    'B.Tech - Information Technology',
    'B.Tech - Electronics',
    'B.Tech - Mechanical',
    'B.Tech - Biotechnology',
    'Other'
];

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Other'];

// Validation rules for form fields
const VALIDATION_RULES = {
    name: {
        required: true,
        message: 'Name is required'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    phone: {
        required: true,
        pattern: /^\d{10}$/,
        message: 'Please enter a valid 10-digit phone number'
    },
    college: {
        required: true,
        message: 'College name is required'
    },
    course: {
        required: true,
        message: 'Course is required'
    },
    year: {
        required: true,
        message: 'Year is required'
    },
    transactionId: {
        pattern: /^[a-zA-Z0-9-_]+$/,
        message: 'Please enter a valid transaction ID'
    }
};

// Initial form state
const INITIAL_FORM_STATE = {
    name: '',
    email: '',
    phone: '',
    college: '',
    course: '',
    year: '',
    events: [],
    transactionId: '',
    totalAmount: 0
};

const RegistrationPage = () => {
    // State management
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showQrCode, setShowQrCode] = useState(false);

    // Form validation functions
    const validateField = (name, value, rules) => {
        if (!rules) return '';
        const trimmedValue = value?.trim();

        if (rules.required && !trimmedValue) {
            return rules.message || `${name} is required`;
        }

        if (trimmedValue && rules.pattern && !rules.pattern.test(trimmedValue)) {
            return rules.message;
        }

        return '';
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate all fields based on rules
        Object.entries(VALIDATION_RULES).forEach(([field, rules]) => {
            const error = validateField(field, formData[field], rules);
            if (error) newErrors[field] = error;
        });

        // Event selection validation
        if (!selectedEvents?.length) {
            newErrors.events = 'Please select at least one event';
        }

        // Transaction validation for paid events
        if (totalPrice > 0 && !formData.transactionId) {
            newErrors.transactionId = 'Transaction ID is required for paid events';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Event handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleEventsSelect = (events, price) => {
        setSelectedEvents(events);
        setTotalPrice(price);
        setFormData(prev => ({
            ...prev,
            events,
            totalAmount: price
        }));
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        const toastId = toast.loading('Submitting registration...');

        try {
            if (!validateForm()) {
                toast.error('Please fill in all required fields correctly');
                return;
            }

            // Prepare registration data
            const registrationData = {
                ...formData,
                events: selectedEvents.map(event => ({
                    id: String(event.id),
                    name: String(event.name),
                    price: Number(event.price),
                    type: String(event.type)
                })),
                paymentStatus: formData.transactionId ? 'completed' : 'pending',
                status: 'pending',
                submittedAt: serverTimestamp(),
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            // Save to Firestore
            const registrationRef = doc(collection(db, "registrations"));
            registrationData.registrationId = registrationRef.id;
            await setDoc(registrationRef, registrationData);

            // Send confirmation email
            await sendConfirmationEmail(registrationData);

            toast.success('Registration completed successfully!');
            setFormData(INITIAL_FORM_STATE);
            setSubmitStatus('success');

        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed. Please try again.');
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            toast.dismiss(toastId);
        }
    };

    // Helper function for sending confirmation email
    const sendConfirmationEmail = async (registrationData) => {
        try {
            const response = await fetch('/api/send-registration-confirmation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registrationData),
            });

            if (!response.ok) {
                console.error('Failed to send confirmation email');
            }
        } catch (error) {
            console.error('Email sending error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-52 md:py-0 md:flex flex-col items-center justify-center">
            {/* Main registration form */}
            <Card className="w-[85vw] md:w-[40vw] mx-auto bg-gray-900/90 border-orange-900/50">
                <CardHeader>
                    <CardTitle className="text-gray-300">Register for Goonj 2025</CardTitle>
                    <CardDescription>Join us in celebrating technology & culture</CardDescription>
                </CardHeader>

                <CardContent className="p-4 sm:p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {/* Personal Details Section */}
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
                            <EventSelectionModal
                                onEventsSelect={(selectedEvents, totalPrice) => {
                                    // Handle selected events
                                    console.log(selectedEvents, totalPrice);
                                }}
                            />
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

                        {/* Payment Section */}
                        {selectedEvents.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <Separator className="my-6 bg-orange-900/30" />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400">
                                            Payment Details
                                        </Label>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                                            onClick={() => setShowQrCode(true)}
                                        >
                                            <QrCode className="w-4 h-4 mr-2" />
                                            Show QR Code
                                        </Button>
                                    </div>

                                    <div className="grid gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="transactionId" className="text-gray-300 font-medium">
                                                UPI Reference ID
                                                <span className="text-orange-400 ml-1">*</span>
                                            </Label>
                                            <Input
                                                id="transactionId"
                                                name="transactionId"
                                                value={formData.transactionId}
                                                onChange={handleInputChange}
                                                placeholder="Enter UPI Reference ID after payment"
                                                className="bg-gray-800/80 border-orange-900/50 text-gray-200 placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500"
                                            />
                                            {errors.transactionId && (
                                                <p className="text-sm text-red-400 flex items-center gap-1">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errors.transactionId}
                                                </p>
                                            )}
                                        </div>

                                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-orange-900/50">
                                            <div className="flex justify-between items-center">
                                                <div className="space-y-1">
                                                    <p className="text-gray-300 font-medium">Total Amount</p>
                                                    <p className="text-sm text-gray-400">Including all event fees</p>
                                                </div>
                                                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400">
                                                    ₹{totalPrice}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full relative overflow-hidden
                                        ${isSubmitting
                                        ? 'bg-gray-800 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-orange-500 via-orange-400 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20'
                                    }
                                        text-white transition-all duration-300
                                        `}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{
                                        opacity: isSubmitting ? 0 : 1,
                                        y: isSubmitting ? 10 : 0
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Register Now
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: isSubmitting ? 1 : 0,
                                        scale: isSubmitting ? 1 : 0.8
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                </motion.div>

                                {/* Hover effect overlay */}
                                <motion.div
                                    initial={false}
                                    whileHover={{ opacity: 1, scale: 1.05 }}
                                    className="absolute inset-0 bg-gradient-to-r from-orange-400 to-cyan-400 opacity-0 transition-opacity"
                                    style={{ mixBlendMode: 'soft-light' }}
                                />
                            </Button>
                        </motion.div>

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
        </div>
    );
};

export default RegistrationPage;