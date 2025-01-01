"use client"
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Code, Music, Gamepad, Trophy, Sparkles } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';

const EVENTS_DATA = {
    technical: [
        {
            id: 'tech1',
            name: 'Code Wars',
            price: 200,
            description: 'Competitive coding challenge',
            icon: Code,
            color: 'text-cyan-400'
        },
        {
            id: 'tech2',
            name: 'Hackathon',
            price: 500,
            description: '24-hour coding marathon',
            icon: Code,
            color: 'text-cyan-400'
        }
    ],
    cultural: [
        {
            id: 'cult1',
            name: 'Battle of Bands',
            price: 1000,
            description: 'Live band competition',
            icon: Music,
            color: 'text-orange-400'
        }
    ],
    gaming: [
        {
            id: 'game1',
            name: 'Valorant',
            price: 250,
            description: '5v5 tactical shooter',
            icon: Gamepad,
            color: 'text-emerald-400'
        }
    ]
};

const CATEGORIES = [
    { id: 'technical', label: 'Technical', icon: Code, color: 'from-cyan-500/20' },
    { id: 'cultural', label: 'Cultural', icon: Music, color: 'from-orange-500/20' },
    { id: 'gaming', label: 'Gaming', icon: Gamepad, color: 'from-emerald-500/20' }
];

const EventCard = ({ event, selected, onToggle }) => {
    const Icon = event.icon;

    return (
        <div
            onClick={onToggle}
            className={`
                p-4 rounded-lg border transition-all duration-200 cursor-pointer
                ${selected
                    ? 'border-cyan-500/50 bg-gradient-to-br from-cyan-950/50 to-gray-950'
                    : 'border-gray-800 bg-gray-950/50 hover:border-gray-700 hover:bg-gray-900/10'
                }
            `}
        >
            <div className="flex items-start gap-3">
                <Checkbox
                    id={event.id}
                    checked={selected}
                    onCheckedChange={onToggle}
                    className="mt-1 border-gray-700 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                    onClick={e => e.stopPropagation()}
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${event.color}`} />
                        <Label className="font-medium text-gray-200">
                            {event.name}
                        </Label>
                        <Badge
                            variant="secondary"
                            className={`ml-auto ${selected ? 'bg-cyan-900/50 text-cyan-100' : 'bg-gray-800 text-gray-300'}`}
                        >
                            ₹{event.price}
                        </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{event.description}</p>
                </div>
            </div>
        </div>
    );
};

const EventSelectionModal = ({ onEventsSelect }) => {
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('technical');

    const handleEventToggle = (event) => {
        setSelectedEvents(prev => {
            const isSelected = prev.find(e => e.id === event.id);
            return isSelected
                ? prev.filter(e => e.id !== event.id)
                : [...prev, event];
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

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full bg-gray-950 border-gray-800 hover:bg-gray-900 hover:border-cyan-900/50 hover:text-gray-200 text-white"
                >
                    <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
                    Select Events
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] bg-gray-950 border-gray-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
                        Select Your Events
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Choose the events you would like to participate in during the fest.
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                    <TabsList className="grid grid-cols-3 gap-4 bg-gray-900 p-1 border border-gray-800">
                        {CATEGORIES.map(({ id, label, icon: Icon, color }) => (
                            <TabsTrigger
                                key={id}
                                value={id}
                                className={`
                                    flex items-center gap-2 data-[state=active]:bg-gradient-to-r 
                                    data-[state=active]:${color} data-[state=active]:to-transparent
                                    text-white data-[state=active]:text-[#000]
                                `}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <ScrollArea className="h-[400px] mt-4 pr-4">
                        {CATEGORIES.map(({ id }) => (
                            <TabsContent key={id} value={id} className="space-y-3">
                                {EVENTS_DATA[id].map(event => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        selected={selectedEvents.some(e => e.id === event.id)}
                                        onToggle={() => handleEventToggle(event)}
                                    />
                                ))}
                            </TabsContent>
                        ))}
                    </ScrollArea>
                </Tabs>

                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg border border-gray-800">
                        <div>
                            <p className="flex items-center gap-2 text-gray-200">
                                <Trophy className="w-4 h-4 text-cyan-400" />
                                Selected: {selectedEvents.length}
                            </p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
                                ₹{totalPrice}
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={handleConfirm}
                        disabled={selectedEvents.length === 0}
                        className={`
                            w-full transition-all duration-200
                            ${selectedEvents.length === 0
                                ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white'
                            }
                        `}
                    >
                        {selectedEvents.length === 0
                            ? 'Select Events to Continue'
                            : 'Confirm Selection'
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EventSelectionModal;