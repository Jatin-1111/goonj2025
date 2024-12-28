"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '@/app/firebase';
import { collection, query, getDocs, orderBy, where, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import {
    Download, Filter, Users, CheckCircle2, Clock,
    AlertCircle, Trash2
} from 'lucide-react';

// SVG Patterns Component for Technology Elements
const TechPatterns = () => (
    <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg className="w-full h-full">
            <defs>
                <pattern id="circuitPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    {/* Main Circuit Lines */}
                    <path d="M10 50h80M50 10v80" stroke="currentColor" strokeWidth="0.5" fill="none" />

                    {/* Circuit Nodes */}
                    <circle cx="50" cy="50" r="2" fill="currentColor" />
                    <circle cx="10" cy="50" r="1.5" fill="currentColor" />
                    <circle cx="90" cy="50" r="1.5" fill="currentColor" />
                    <circle cx="50" cy="10" r="1.5" fill="currentColor" />
                    <circle cx="50" cy="90" r="1.5" fill="currentColor" />

                    {/* Additional Circuit Details */}
                    <path d="M50 50l30 30M50 50l-30 -30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <path d="M10 10h20M70 90h20" stroke="currentColor" strokeWidth="0.5" fill="none" />

                    {/* Circuit Components */}
                    <rect x="45" y="70" width="10" height="5" stroke="currentColor" fill="none" />
                    <circle cx="30" cy="70" r="3" stroke="currentColor" fill="none" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuitPattern)" className="text-orange-400" />
        </svg>
    </div>
);

// Cultural Design Elements Component
const CulturalPatterns = () => (
    <div className="absolute inset-0 overflow-hidden opacity-15 mix-blend-overlay">
        <svg className="w-full h-full">
            <defs>
                <pattern id="mandalaPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                    {/* Main Mandala Circles */}
                    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />

                    {/* Radial Lines */}
                    {[...Array(12)].map((_, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        const x2 = 100 + 80 * Math.cos(angle);
                        const y2 = 100 + 80 * Math.sin(angle);
                        return (
                            <path
                                key={i}
                                d={`M100 100L${x2} ${y2}`}
                                stroke="currentColor"
                                strokeWidth="0.5"
                                fill="none"
                            />
                        );
                    })}

                    {/* Decorative Elements */}
                    {[...Array(8)].map((_, i) => {
                        const angle = (i * 45 * Math.PI) / 180;
                        const x = 100 + 60 * Math.cos(angle);
                        const y = 100 + 60 * Math.sin(angle);
                        return (
                            <path
                                key={`petal-${i}`}
                                d={`M100 100 Q${x} ${y} ${x + 20} ${y + 20}`}
                                stroke="currentColor"
                                strokeWidth="0.3"
                                fill="none"
                            />
                        );
                    })}

                    {/* Central Design */}
                    <path
                        d="M90 100c0-5 10-5 10-0s-10 5-10 0"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="none"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mandalaPattern)" className="text-cyan-400" />
        </svg>
    </div>
);

const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm, registrationDetails }) => (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="bg-gray-900 border border-red-500/30">
            <AlertDialogHeader>
                <AlertDialogTitle className="text-red-400">Confirm Deletion</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                    Are you sure you want to delete the registration for <span className="text-gray-200">{registrationDetails?.name}</span>?
                    <br />
                    <span className="text-red-400 text-sm mt-2 block">This action cannot be undone.</span>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700">
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    onClick={onConfirm}
                    className="bg-red-600 text-white hover:bg-red-700"
                >
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);

const AdminPanel = () => {


    const [registrations, setRegistrations] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        college: '',
        course: 'all',
        year: 'all',
    });
    const [paymentStatus, setPaymentStatus] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteDialogState, setDeleteDialogState] = useState({
        isOpen: false,
        registrationToDelete: null
    });

    const handleDeleteClick = (registration) => {
        setDeleteDialogState({
            isOpen: true,
            registrationToDelete: registration
        });
    };

    // Function to close delete dialog
    const handleCloseDeleteDialog = () => {
        setDeleteDialogState({
            isOpen: false,
            registrationToDelete: null
        });
    };

    // Function to perform deletion
    const handleConfirmDelete = async () => {
        const { registrationToDelete } = deleteDialogState;
        if (!registrationToDelete) return;

        try {
            // Delete from Firestore
            await deleteDoc(doc(db, 'registrations', registrationToDelete.id));

            // Update local state
            setRegistrations(prev => prev.filter(reg => reg.id !== registrationToDelete.id));
            setFilteredData(prev => prev.filter(reg => reg.id !== registrationToDelete.id));

            toast.success('Registration deleted successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Error deleting registration:', error);
            toast.error(`Error deleting registration: ${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            handleCloseDeleteDialog();
        }
    };

    // Fetch data from Firebase with error handling and loading states
    const fetchRegistrations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const registrationsRef = collection(db, 'registrations');
            let q = query(registrationsRef, orderBy('createdAt', 'desc'));

            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate?.() || new Date(),
                    updatedAt: data.updatedAt?.toDate?.() || new Date(),
                };
            });

            setRegistrations(data);
            setFilteredData(data);
            toast.success(`Successfully loaded ${data.length} registrations`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Error fetching registrations:', error);
            setError(error.message);
            toast.error(`Error loading data: ${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchRegistrations();
    }, [fetchRegistrations]);

    // Enhanced filter functionality
    const applyFilters = useCallback(() => {
        let filtered = [...registrations];

        // Search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(reg =>
                reg.name?.toLowerCase().includes(searchTerm) ||
                reg.email?.toLowerCase().includes(searchTerm) ||
                reg.phone?.includes(searchTerm) ||
                reg.transactionId?.toLowerCase().includes(searchTerm)
            );
        }

        // Course filter
        if (filters.course !== 'all') {
            filtered = filtered.filter(reg => reg.course === filters.course);
        }

        // Year filter
        if (filters.year !== 'all') {
            filtered = filtered.filter(reg => reg.year === filters.year);
        }

        // Payment status filter
        if (paymentStatus !== 'all') {
            filtered = filtered.filter(reg => {
                if (paymentStatus === 'pending') return !reg.transactionId;
                if (paymentStatus === 'completed') return !!reg.transactionId;
                return true;
            });
        }

        setFilteredData(filtered);
    }, [registrations, filters, paymentStatus]);

    // Apply filters whenever filter state changes
    useEffect(() => {
        applyFilters();
    }, [filters, paymentStatus, applyFilters]);

    // Enhanced export functionality with error handling
    const exportToCSV = useCallback(() => {
        try {
            const headers = ['Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'Events', 'Amount', 'Transaction ID', 'Payment Status', 'Registration Date'];

            const csvData = filteredData.map(reg => {
                const events = Array.isArray(reg.events) ? reg.events.map(e => e.name).join('; ') : '';
                const date = reg.createdAt instanceof Date ? reg.createdAt.toLocaleString() : 'N/A';

                return [
                    reg.name || '',
                    reg.email || '',
                    reg.phone || '',
                    reg.college || '',
                    reg.course || '',
                    reg.year || '',
                    events,
                    reg.totalAmount || 0,
                    reg.transactionId || 'Not Provided',
                    reg.transactionId ? 'Completed' : 'Pending',
                    date
                ].map(field => `"${String(field).replace(/"/g, '""')}"`)
            });

            const csvContent = [
                headers.join(','),
                ...csvData.map(row => row.join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `registrations_${new Date().toISOString()}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast.success(`Successfully exported ${filteredData.length} records to CSV`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Export error:', error);
            toast.error(`Export failed: ${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [filteredData, toast]);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getPaymentStatusBadge = (registration) => {
        if (!registration.transactionId) {
            return (
                <Badge variant="destructive" className="bg-red-900/50 text-red-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Pending
                </Badge>
            );
        }
        return (
            <Badge variant="success" className="bg-green-900/50 text-green-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Completed
            </Badge>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-40">
            <div className="fixed inset-0">
                <TechPatterns />
                <CulturalPatterns />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 flex items-center gap-2"
                    >
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </motion.div>
                )}


                <Card className="bg-gray-900/90 backdrop-blur-sm border-2 border-orange-900/50 relative overflow-hidden">
                    {/* Header Section */}
                    <CardHeader className="p-6 relative">
                        <CardTitle className="flex items-center gap-3">
                            <motion.div
                                className="bg-gradient-to-br from-orange-500 to-cyan-500 p-2 rounded-xl relative overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-cyan-300/20 animate-pulse" />
                                <Users className="w-8 h-8 text-white relative z-10" />
                            </motion.div>
                            <div>
                                <motion.h2
                                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-300 via-orange-200 to-cyan-300 text-transparent bg-clip-text"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    Registration Dashboard
                                </motion.h2>
                                <motion.p
                                    className="text-sm md:text-base text-gray-300 mt-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Total Registrations: {filteredData.length}
                                </motion.p>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="px-6 pb-6">
                        {/* Filters Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
                            {/* Search Input */}
                            <div className="lg:col-span-2">
                                <Input
                                    placeholder="Search by name, email, phone, transaction ID..."
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                    className="bg-gray-800/80 border-orange-900/50 text-gray-100 placeholder:text-gray-400"
                                />
                            </div>

                            {/* Course Filter */}
                            <Select
                                value={filters.course}
                                onValueChange={(value) => handleFilterChange('course', value)}
                            >
                                <SelectTrigger className="bg-gray-800/80 border-orange-900/50 text-gray-100">
                                    <SelectValue placeholder="Filter by Course" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-orange-900/50">
                                    <SelectItem value="all">All Courses</SelectItem>
                                    <SelectItem value="B.Tech - Computer Science">Computer Science</SelectItem>
                                    <SelectItem value="B.Tech - Information Technology">Information Technology</SelectItem>
                                    <SelectItem value="B.Tech - Electronics">Electronics</SelectItem>
                                    <SelectItem value="B.Tech - Mechanical">Mechanical</SelectItem>
                                    <SelectItem value="B.Tech - Biotechnology">Biotechnology</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Year Filter */}
                            <Select
                                value={filters.year}
                                onValueChange={(value) => handleFilterChange('year', value)}
                            >
                                <SelectTrigger className="bg-gray-800/80 border-orange-900/50 text-gray-100">
                                    <SelectValue placeholder="Filter by Year" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-orange-900/50">
                                    <SelectItem value="all">All Years</SelectItem>
                                    <SelectItem value="1st Year">1st Year</SelectItem>
                                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                                    <SelectItem value="4th Year">4th Year</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Payment Status Filter */}
                            <Select
                                value={paymentStatus}
                                onValueChange={(value) => {
                                    setPaymentStatus(value);
                                    applyFilters();
                                }}
                            >
                                <SelectTrigger className="bg-gray-800/80 border-orange-900/50 text-gray-100">
                                    <SelectValue placeholder="Payment Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-orange-900/50">
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    onClick={applyFilters}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                </Button>

                                <Button
                                    onClick={exportToCSV}
                                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Export
                                </Button>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="relative overflow-hidden rounded-lg border border-orange-900/50">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-800/50">
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">Actions</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">Name</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">Email</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">Phone</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">College</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">Course</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">Year</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">Events</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">Amount</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">Transaction ID</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">Status</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-200 font-medium">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-orange-900/20">
                                        {filteredData.map((reg) => (
                                            <motion.tr
                                                key={reg.id}
                                                className="hover:bg-gray-800/30 transition-colors"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ type: "spring", stiffness: 100 }}
                                            >
                                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(reg)}
                                                        className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-100">{reg.name}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-300">{reg.email}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-300">{reg.phone}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-300">{reg.college}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-300">{reg.course}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-300">{reg.year}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-300">
                                                    <Badge variant="outline" className="bg-gray-800/50 text-gray-200 border-orange-500/30">
                                                        {reg.events.length} Events
                                                    </Badge>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-cyan-300">₹{reg.totalAmount}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-300">
                                                    {reg.transactionId || '-'}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                    {getPaymentStatusBadge(reg)}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-300">
                                                    {new Date(reg.createdAt).toLocaleDateString()}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Loading State */}
                            {loading && (
                                <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-8 h-8 border-2 border-orange-300 border-t-transparent rounded-full"
                                    />
                                </div>
                            )}

                            {/* Empty State */}
                            {!loading && filteredData.length === 0 && (
                                <div className="py-12 text-center">
                                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-gray-300 text-lg font-medium">No registrations found</h3>
                                    <p className="text-gray-400 mt-2">Try adjusting your filters</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <DeleteConfirmationDialog
                isOpen={deleteDialogState.isOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
                registrationDetails={deleteDialogState.registrationToDelete}
            />
        </div>
    );
};

export default AdminPanel;