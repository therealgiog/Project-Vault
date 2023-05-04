import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Pay2 from './pay2'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY as string)

const Form2: React.FC =  () => {
  return (
    <Elements stripe={stripePromise}>
      <Pay2/>
    </Elements>
  )
}

export default Form2