"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Music, Gamepad, Trophy, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

// Event data structure
const eventsData = {
    technical: [
        { id: 'tech1', name: 'Code Wars', price: 200, description: 'Competitive coding challenge' },
        { id: 'tech2', name: 'Hackathon', price: 500, description: '24-hour coding marathon' },
        { id: 'tech3', name: 'Tech Quiz', price: 100, description: 'Technical knowledge quiz' },
        { id: 'tech4', name: 'Robo Race', price: 300, description: 'Robot racing competition' }
    ],
    cultural: [
        { id: 'cult1', name: 'Battle of Bands', price: 1000, description: 'Live band competition' },
        { id: 'cult2', name: 'Dance Competition', price: 400, description: 'Group dance competition' },
        { id: 'cult3', name: 'Fashion Show', price: 600, description: 'Fashion and style showcase' },
        { id: 'cult4', name: 'Singing Contest', price: 300, description: 'Solo singing competition' }
    ],
    gaming: [
        { id: 'game1', name: 'Valorant', price: 250, description: '5v5 tactical shooter' },
        { id: 'game2', name: 'FIFA Tournament', price: 200, description: 'Football gaming tournament' },
        { id: 'game3', name: 'BGMI', price: 150, description: 'Battle royale competition' }
    ]
};

const EventSelectionModal = ({ onEventsSelect }) => {
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('technical');

    const handleEventToggle = (event) => {
        setSelectedEvents(prev => {
            const isSelected = prev.find(e => e.id === event.id);
            if (isSelected) {
                return prev.filter(e => e.id !== event.id);
            } else {
                return [...prev, event];
            }
        });
    };

    useEffect(() => {
        const newTotal = selectedEvents.reduce((sum, event) => sum + event.price, 0);
        setTotalPrice(newTotal);
    }, [selectedEvents]);

    const handleConfirm = () => {
        onEventsSelect(selectedEvents, totalPrice);
        setIsOpen(false);
    };

    const EventCard = ({ event, selected }) => {
        const getIconByCategory = (id) => {
            if (id.startsWith('tech')) return <Code className="w-4 h-4 text-blue-400" />;
            if (id.startsWith('cult')) return <Music className="w-4 h-4 text-purple-400" />;
            return <Gamepad className="w-4 h-4 text-green-400" />;
        };

        return (
            <motion.div
                onClick={() => handleEventToggle(event)}
                className={`relative p-5 rounded-xl border cursor-pointer select-none
                    ${selected
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-700 bg-[#1A1B23]/80'
                    } 
                    transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/5`
                }
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                layout
            >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Selection indicator */}
                <div
                    className={`absolute right-0 top-0 w-8 h-8 transform translate-x-2 -translate-y-2 
                        ${selected ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                        transition-all duration-300`}
                >
                    <div className="absolute inset-0 bg-blue-500 rounded-full" />
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="absolute inset-0 w-full h-full text-white p-2"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <motion.path
                            d="M20 6L9 17l-5-5"
                            initial={false}
                            animate={selected ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </svg>
                </div>

                <div className="relative z-10">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                            <Checkbox
                                id={event.id}
                                checked={selected}
                                onCheckedChange={() => handleEventToggle(event)}
                                className="mt-1 border-gray-600 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                                onClick={(e) => e.stopPropagation()} // Prevent card click when clicking checkbox
                            />
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    {getIconByCategory(event.id)}
                                    <Label
                                        htmlFor={event.id}
                                        className="text-base font-medium text-white group-hover:text-blue-400 transition-colors"
                                        onClick={(e) => e.stopPropagation()} // Prevent card click when clicking label
                                    >
                                        {event.name}
                                    </Label>
                                </div>
                                <p className="text-sm text-gray-400">{event.description}</p>
                            </div>
                        </div>
                        <Badge
                            variant="secondary"
                            className={`${selected
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-blue-500/10 text-blue-400'
                                } transition-colors ml-4 flex-shrink-0`}
                        >
                            ₹{event.price}
                        </Badge>
                    </div>
                </div>

                {/* Selection ripple effect */}
                <AnimatePresence>
                    {selected && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-blue-400/20 rounded-xl"
                            transition={{ duration: 0.5 }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    const categories = [
        { id: 'technical', label: 'Technical', icon: Code, color: 'from-blue-400' },
        { id: 'cultural', label: 'Cultural', icon: Music, color: 'from-purple-400' },
        { id: 'gaming', label: 'Gaming', icon: Gamepad, color: 'from-green-400' }
    ];

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full bg-[#1A1B23]/80 border-gray-700 text-white hover:bg-[#1A1B23] hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                    <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                    Select Events
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] bg-[#121420]/95 border-gray-800 backdrop-blur-xl shadow-2xl">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        Select Your Events
                    </DialogTitle>
                    <p className="text-sm text-gray-400">Choose from our exciting lineup of events</p>
                </DialogHeader>

                <Tabs
                    defaultValue="technical"
                    className="w-full"
                    value={activeCategory}
                    onValueChange={setActiveCategory}
                >
                    <TabsList className="w-full bg-[#1A1B23]/80 border border-gray-800 rounded-lg p-1">
                        {categories.map(({ id, label, icon: Icon, color }) => (
                            <TabsTrigger
                                key={id}
                                value={id}
                                className={`flex items-center gap-2 py-2.5 px-4 rounded-md data-[state=active]:bg-gradient-to-r ${color} data-[state=active]:to-transparent data-[state=active]:border-blue-500/50 transition-all duration-300`}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <ScrollArea className="h-[400px] mt-6 pr-4">
                        <AnimatePresence mode="wait">
                            {categories.map(({ id }) => (
                                <TabsContent
                                    key={id}
                                    value={id}
                                    className="space-y-3 mt-0"
                                >
                                    {eventsData[id].map(event => (
                                        <EventCard
                                            key={event.id}
                                            event={event}
                                            selected={selectedEvents.some(e => e.id === event.id)}
                                        />
                                    ))}
                                </TabsContent>
                            ))}
                        </AnimatePresence>
                    </ScrollArea>
                </Tabs>

                <Separator className="bg-gray-800/50" />

                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center bg-[#1A1B23]/50 rounded-lg p-4">
                        <div>
                            <p className="text-white font-medium flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-blue-400" />
                                Selected Events:
                                <span className="text-blue-400 font-semibold">
                                    {selectedEvents.length}
                                </span>
                            </p>
                            <p className="text-sm text-gray-400">Total Amount:</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                ₹{totalPrice}
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={handleConfirm}
                        disabled={selectedEvents.length === 0}
                        className={`w-full py-6 text-lg font-semibold shadow-lg transition-all duration-300 
                            ${selectedEvents.length === 0
                                ? 'bg-gray-700 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-xl hover:shadow-blue-500/20'
                            }`}
                    >
                        {selectedEvents.length === 0 ? 'Select Events to Continue' : 'Confirm Selection'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EventSelectionModal;