import React, { useState } from 'react'
import useSubScriptionHook from '../../hooks/subscriptionHook';
import { Elements } from '@stripe/react-stripe-js';
import PaymentModal from '../PaymentModall/paymentModal';
import { loadStripe } from '@stripe/stripe-js';

const PaymentElement = ({clientSecretKey, isLoading}: any) => {
    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const options: any = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        // Fully customizable with appearance API.
        appearance: {
            /*...*/
        },
    };

    const stripePromise = loadStripe('pk_test_51IKM7hKrEzRlezT44edQI6nHYdUuUrgXSBInusN0qN8989ptaY9wstDhl5JJBmvjrY40EYq0hpZXvitpXhQSa42800pjJv1pbF');

    return (
        <div>
            {(clientSecretKey && !isLoading) ? (
                <Elements stripe={stripePromise} options={options}>
                    <PaymentModal isOpen={isOpen} closeModal={closeModal} />
                </Elements>
            ) : (
                <div className="flex text-secondary text-center  " style={{ marginTop: '100px', justifyContent: 'center' }}>
                    Loading....
                </div>
            )}
        </div>
    )
}

export default PaymentElement