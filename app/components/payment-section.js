"use client"
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertCircle, QrCode } from 'lucide-react';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Default props to prevent undefined errors
const defaultProps = {
    selectedEvents: [],
    totalPrice: 0,
    formData: {},
    handleInputChange: () => { },
    errors: {},
    setShowQrCode: () => { }
};

// Stripe Payment Form Component
const StripePaymentForm = ({ amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setPaymentError(null);

        try {
            // Create payment intent on your server
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount }),
            });

            const { clientSecret } = await response.json();

            // Confirm the payment
            const result = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-confirmation`,
                },
            });

            if (result.error) {
                setPaymentError(result.error.message);
            } else {
                onSuccess(result.paymentIntent.id);
            }
        } catch (error) {
            setPaymentError('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            {paymentError && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {paymentError}
                </p>
            )}
            <Button
                type="submit"
                disabled={isProcessing || !stripe}
                className="w-full bg-gradient-to-r from-orange-500 to-cyan-500"
            >
                {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
            </Button>
        </form>
    );
};

// Main Payment Section Component
const PaymentSection = (props) => {
    // Merge default props with provided props
    const {
        selectedEvents = defaultProps.selectedEvents,
        totalPrice = defaultProps.totalPrice,
        formData = defaultProps.formData,
        handleInputChange = defaultProps.handleInputChange,
        errors = defaultProps.errors,
        setShowQrCode = defaultProps.setShowQrCode
    } = props;

    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [clientSecret, setClientSecret] = useState(null);

    // Initialize Stripe client secret when switching to card payment
    useEffect(() => {
        const initializeStripe = async () => {
            if (paymentMethod === 'card' && totalPrice > 0 && !clientSecret) {
                try {
                    const response = await fetch('/api/create-payment-intent', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ amount: totalPrice }),
                    });
                    const data = await response.json();
                    setClientSecret(data.clientSecret);
                } catch (error) {
                    console.error('Error initializing Stripe:', error);
                }
            }
        };

        initializeStripe();
    }, [paymentMethod, totalPrice, clientSecret]);

    const stripeOptions = {
        clientSecret,
        appearance: {
            theme: 'night',
            variables: {
                colorPrimary: '#0891b2',
                colorBackground: '#111827',
                colorText: '#e5e7eb',
                colorDanger: '#ef4444',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            },
        },
    };

    const handleStripeSuccess = (paymentIntentId) => {
        handleInputChange({
            target: {
                name: 'transactionId',
                value: paymentIntentId
            }
        });
    };

    // Add null check for selectedEvents
    if (!Array.isArray(selectedEvents)) {
        return null; // or return a loading state
    }

    return (
        <>
            {selectedEvents.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <Separator className="my-6 bg-orange-900/30" />

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Label className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400">
                                Payment Details
                            </Label>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                                    onClick={() => setShowQrCode(true)}
                                >
                                    <QrCode className="w-4 h-4 mr-2" />
                                    UPI QR Code
                                </Button>
                            </div>
                        </div>

                        <Tabs defaultValue="upi" className="w-full" onValueChange={setPaymentMethod}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="upi">UPI Payment</TabsTrigger>
                                <TabsTrigger value="card">Card Payment</TabsTrigger>
                            </TabsList>

                            <TabsContent value="upi" className="space-y-4">
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
                            </TabsContent>

                            <TabsContent value="card" className="space-y-4">
                                {clientSecret && (
                                    <Elements stripe={stripePromise} options={stripeOptions}>
                                        <StripePaymentForm
                                            amount={totalPrice}
                                            onSuccess={handleStripeSuccess}
                                        />
                                    </Elements>
                                )}
                            </TabsContent>
                        </Tabs>

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
                </motion.div>
            )}
        </>
    );
};

// Add PropTypes for better type checking (optional)
PaymentSection.defaultProps = defaultProps;

export default PaymentSection;