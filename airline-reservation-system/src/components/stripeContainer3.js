import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import PaymentForm3 from './paymentForm3'

const PUBLIC_KEY = "pk_test_51K9b9SK25DXcjTVNCVwVjF093gU7YqWADBvVXHQRxyGS7USZLk1SUoQJfWXU2BNq395KgmQLWx7lCJvNVs2uzXdh00PgzUkdqa"

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer3() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm3/>
        </Elements>
    )
}
