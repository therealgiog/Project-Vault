import React, { useState, useEffect } from 'react'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Pay2 from './pay2'

function Form2 () {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)

  useEffect(() => {
    async function loadStripePromise () {
      if (process.env.REACT_APP_STRIPE_KEY) {
        const promise = await loadStripe(process.env.REACT_APP_STRIPE_KEY)
        setStripePromise(() => Promise.resolve(promise))
      }
    }
    loadStripePromise()
  }, [])

  if (!stripePromise) {
    return <div>Loading...</div>
  }

  return (
    <Elements stripe={stripePromise}>
      <Pay2/>
    </Elements>
  )
}

export default Form2
