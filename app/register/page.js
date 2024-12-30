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
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QrCode, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import Image from 'next/image';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        college: '',
        course: '',
        year: '',
        events: [],
        transactionId: '',
        totalAmount: 0
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showQrCode, setShowQrCode] = useState(false);

    const courses = [
        'B.Tech - Computer Science',
        'B.Tech - Information Technology',
        'B.Tech - Electronics',
        'B.Tech - Mechanical',
        'B.Tech - Biotechnology',
        'Other'
    ];
    const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Other'];

    const validateField = (name, value, rules) => {
        if (!rules) return '';

        const trimmedValue = value?.trim();

        if (rules.required && !trimmedValue) {
            return rules.message || `${name} is required`;
        }

        if (trimmedValue) {
            if (rules.pattern && !rules.pattern.test(trimmedValue)) {
                return rules.message;
            }
            if (rules.invalidValues?.includes(trimmedValue)) {
                return rules.message;
            }
        }

        return '';
    };

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
        if (totalPrice > 0) {
            const transactionError = validateField(
                'transactionId',
                formData.transactionId,
                VALIDATION_RULES.transactionId
            );
            if (transactionError) newErrors.transactionId = transactionError;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for the changed field
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

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            college: '',
            course: '',
            year: '',
            events: [],
            transactionId: '',
            totalAmount: 0
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) {
            toast.warning('Form submission in progress...', {
                duration: 2000,
                position: 'top-center'
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        const toastSubmitting = toast.loading('Submitting registration...', {
            position: 'top-center'
        });

        try {
            if (!validateForm()) {
                toast.dismiss(toastSubmitting);
                toast.error('Please fill in all required fields correctly', {
                    duration: 3000,
                    position: 'top-center'
                });
                setIsSubmitting(false);
                return;
            }

            const registrationData = {
                name: formData.name?.trim() || null,
                email: formData.email?.trim().toLowerCase() || null,
                phone: formData.phone?.trim() || null,
                college: formData.college?.trim() || null,
                course: formData.course?.trim() || null,
                year: formData.year?.trim() || null,
                events: selectedEvents.map(event => ({
                    id: String(event.id || ''),
                    name: String(event.name || ''),
                    price: Number(event.price || 0),
                    type: String(event.type || 'general')
                })),
                totalAmount: Number(totalPrice || 0),
                transactionId: formData.transactionId?.trim() || null,
                paymentStatus: formData.transactionId?.trim() ? 'completed' : 'pending',
                status: 'pending',
                submittedAt: serverTimestamp(),
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            const registrationRef = doc(collection(db, "registrations"));
            registrationData.registrationId = registrationRef.id;

            // Save to database
            await setDoc(registrationRef, registrationData);

            // Send confirmation email with registration details
            try {
                const emailResponse = await fetch('/api/send-registration-confirmation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: registrationData.email,
                        name: registrationData.name,
                        registrationId: registrationData.registrationId,
                        events: registrationData.events,
                        totalAmount: registrationData.totalAmount,
                        paymentStatus: registrationData.paymentStatus
                    }),
                });

                if (!emailResponse.ok) {
                    console.error('Failed to send confirmation email');
                    // Don't show error to user since registration was successful
                }
            } catch (emailError) {
                console.error('Email sending error:', emailError);
                // Don't fail the registration if email fails
            }

            setSubmitStatus('success');
            toast.dismiss(toastSubmitting);
            toast.success('Registration completed successfully! Check your email for confirmation.', {
                duration: 5000,
                position: 'top-center'
            });

            resetForm();

        } catch (error) {
            console.error('Registration error:', error);
            setSubmitStatus('error');

            toast.dismiss(toastSubmitting);

            if (error.code === 'permission-denied') {
                toast.error('Permission denied. Please check your authorization or try logging in again.', {
                    duration: 4000,
                    position: 'top-center'
                });
            } else if (error.code === 'network-error') {
                toast.error('Network error. Please check your internet connection and try again.', {
                    duration: 4000,
                    position: 'top-center'
                });
            } else {
                toast.error(error.message || 'An error occurred during registration. Please try again.', {
                    duration: 4000,
                    position: 'top-center'
                });
            }

        } finally {
            setIsSubmitting(false);
        }
    };

    const PaymentQrDialog = ({ isOpen, onClose, totalPrice }) => {
        const [paymentCopied, setPaymentCopied] = useState(false);
        const PAYMENT_ID = "goonj2025@okpunjab"; // Replace with your actual GPay ID

        const copyPaymentId = () => {
            navigator.clipboard.writeText(PAYMENT_ID);
            setPaymentCopied(true);
            setTimeout(() => setPaymentCopied(false), 2000);
        };

        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="bg-gray-900/95 border-2 border-orange-900/50">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400">
                            Complete Payment
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 p-4">
                        <div className="p-4 bg-white rounded-lg mx-auto max-w-[280px] aspect-square">
                            <Image
                                fill
                                src="/qr-code.png" // Add your QR code image
                                alt="Payment QR Code"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="space-y-3">
                            <p className="text-gray-400 text-sm">Or pay using UPI ID:</p>
                            <div className="flex items-center gap-2 bg-gray-800/80 p-3 rounded-lg border border-orange-900/50">
                                <span className="text-gray-200 flex-1 font-mono">{PAYMENT_ID}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-gray-700"
                                    onClick={copyPaymentId}
                                >
                                    {paymentCopied ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-lg font-medium">
                                <span className="text-gray-300">Amount to Pay:</span>
                                <span className="text-cyan-400">₹{totalPrice}</span>
                            </div>
                            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                                <p className="text-orange-400 text-sm">
                                    Important: After completing the payment, enter the UPI Reference ID in the registration form to confirm your registration.
                                </p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
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
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-44 overflow-hidden">
            <motion.div
                className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Main Card */}
                <Card className="bg-gray-900/90 backdrop-blur-sm border-2 border-orange-900/50 shadow-xl relative z-10">
                    <CardHeader className="space-y-1 p-6 sm:p-8">
                        <div className="flex items-center justify-center mb-4">
                            <motion.div
                                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-cyan-500 rounded-lg"
                                animate={{
                                    rotate: [0, 180],
                                    borderRadius: ["20%", "50%", "20%"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse"
                                }}
                            />
                        </div>
                        <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-400 text-transparent bg-clip-text">
                            Register for Goonj 2025
                            <motion.div
                                className="mt-2 h-1 mx-auto w-24 sm:w-32 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.5 }}
                            />
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-center text-sm sm:text-base lg:text-lg">
                            Join us in celebrating technology & culture at UIET&apos;s annual fest
                        </CardDescription>
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
                                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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

                {/* Payment QR Dialog */}
                <PaymentQrDialog
                    isOpen={showQrCode}
                    onClose={() => setShowQrCode(false)}
                    totalPrice={totalPrice}
                />

                {/* Decorative Corner Elements - Inspired by Indian Patterns */}
                {/* Top Left Corner - Paisley Pattern */}
                <div className="absolute -top-4 -left-4 w-24 sm:w-32 h-24 sm:h-32 pointer-events-none">
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
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse"
                        }}
                    >
                        <div className="w-16 h-16 border-t-2 border-l-2 border-orange-500/30 rounded-tl-3xl" />
                    </motion.div>
                </div>

                {/* Bottom Right Corner - Mandala Segment */}
                <div className="absolute -bottom-16 -right-4 w-24 sm:w-32 h-24 sm:h-32 pointer-events-none">
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
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            delay: 1
                        }}
                    >
                        <div className="w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl ml-auto mt-auto" />
                    </motion.div>
                </div>

                {/* Top Right Accent */}
                <motion.div
                    className="absolute -top-2 -right-2 w-20 sm:w-24 h-20 sm:h-24 pointer-events-none"
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
                    className="absolute -bottom-2 -left-2 w-20 sm:w-24 h-20 sm:h-24 pointer-events-none"
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
        </div >
    );
};

export default RegistrationPage;
