"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { db } from '@/app/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import {
    Download,
    Filter,
    Search,
    Users,
    Calendar,
    School,
    BookOpen,
    Tag,
    CheckCircle2,
    AlertCircle,
    Clock
} from 'lucide-react';

const AdminPanel = () => {
    const [registrations, setRegistrations] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        college: '',
        course: 'all',
        year: 'all',
        eventType: 'all'
    });
    
    const [paymentStatus, setPaymentStatus] = useState('all');
    const [loading, setLoading] = useState(true);

    // Fetch data from Firebase
    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const registrationsRef = collection(db, 'registrations');
                const q = query(registrationsRef, orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRegistrations(data);
                setFilteredData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching registrations:', error);
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, []);

    // Apply filters
    const applyFilters = () => {
        let filtered = [...registrations];

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(reg =>
                reg.name.toLowerCase().includes(searchTerm) ||
                reg.email.toLowerCase().includes(searchTerm) ||
                reg.phone.includes(searchTerm) ||
                (reg.transactionId && reg.transactionId.toLowerCase().includes(searchTerm))
            );
        }

        if (filters.course && filters.course !== 'all') {
            filtered = filtered.filter(reg => reg.course === filters.course);
        }

        if (filters.year && filters.year !== 'all') {
            filtered = filtered.filter(reg => reg.year === filters.year);
        }

        if (paymentStatus !== 'all') {
            filtered = filtered.filter(reg => {
                if (paymentStatus === 'pending') return !reg.transactionId;
                if (paymentStatus === 'completed') return reg.transactionId;
                return true;
            });
        }

        setFilteredData(filtered);
    };

    // Handle filter changes
    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Export to CSV
    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'Events', 'Amount', 'Transaction ID', 'Payment Status', 'Registration Date'];
        const csvData = filteredData.map(reg => [
            reg.name,
            reg.email,
            reg.phone,
            reg.college,
            reg.course,
            reg.year,
            reg.events.map(e => e.name).join('; '),
            reg.totalAmount,
            reg.transactionId || 'Not Provided',
            reg.payment?.status || 'pending',
            new Date(reg.timestamp).toLocaleString()
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `registrations_${new Date().toISOString()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Card className="bg-gray-900/90 backdrop-blur-sm border-2 border-orange-900/50">
                    <CardHeader className="p-6">
                        <CardTitle className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-orange-500 to-cyan-500 p-2 rounded-xl">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-400 text-transparent bg-clip-text">
                                    Registration Dashboard
                                </h2>
                                <p className="text-sm md:text-base text-gray-400 mt-1">
                                    Total Registrations: {filteredData.length}
                                </p>
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
                                    className="bg-gray-800/80 border-orange-900/50 text-gray-200 placeholder:text-gray-500"
                                />
                            </div>

                            {/* Course Filter */}
                            <Select
                                value={filters.course}
                                onValueChange={(value) => handleFilterChange('course', value)}
                            >
                                <SelectTrigger className="bg-gray-800/80 border-orange-900/50 text-gray-200">
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
                                <SelectTrigger className="bg-gray-800/80 border-orange-900/50 text-gray-200">
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
                                <SelectTrigger className="bg-gray-800/80 border-orange-900/50 text-gray-200">
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
                                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                </Button>

                                <Button
                                    onClick={exportToCSV}
                                    className="flex-1 bg-cyan-500 hover:bg-cyan-600"
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
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-300 font-medium">Name</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-300 font-medium">Email</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-300 font-medium">Phone</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-300 font-medium">College</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-300 font-medium">Course</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-300 font-medium">Year</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-300 font-medium">Events</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-300 font-medium">Amount</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-300 font-medium">Transaction ID</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-300 font-medium">Status</th>
                                            <th className="whitespace-nowrap px-4 py-3 text-left text-sm text-gray-300 font-medium">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-orange-900/20">
                                        {filteredData.map((reg) => (
                                            <tr
                                                key={reg.id}
                                                className="hover:bg-gray-800/30 transition-colors"
                                            >
                                                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-200">{reg.name}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-400">{reg.email}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-400">{reg.phone}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-400">{reg.college}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-400">{reg.course}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-400">{reg.year}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-400">
                                                    <Badge variant="outline" className="bg-gray-800/50 text-gray-300">
                                                        {reg.events.length} Events
                                                    </Badge>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-cyan-400">₹{reg.totalAmount}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-400">
                                                    {reg.transactionId || '-'}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                    {getPaymentStatusBadge(reg)}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-400">
                                                    {new Date(reg.timestamp).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Loading State */}
                            {loading && (
                                <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"
                                    />
                                </div>
                            )}

                            {/* Empty State */}
                            {!loading && filteredData.length === 0 && (
                                <div className="py-12 text-center">
                                    <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                    <h3 className="text-gray-400 text-lg font-medium">No registrations found</h3>
                                    <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminPanel;