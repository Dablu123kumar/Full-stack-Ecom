import Stripe from 'stripe'

 const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY 
const stripe = Stripe(STRIPE_SECRET_KEY)


export default stripe