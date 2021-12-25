import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import PaymentForm from './paymentForm'

const PUBLIC_KEY = "pk_test_51K9b9SK25DXcjTVNCVwVjF093gU7YqWADBvVXHQRxyGS7USZLk1SUoQJfWXU2BNq395KgmQLWx7lCJvNVs2uzXdh00PgzUkdqa"

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm/>
        </Elements>
    )
}
