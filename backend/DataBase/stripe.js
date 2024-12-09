import Stripe from 'stripe'

 const STRIPE_SECRET_KEY = 'sk_test_51QBKsVKujXXkbC9vqCZaZkWm1zty2aMKo7dUAiWNKRGit5RK8wSfY1g3xaBapOvqJrXsmgcNUPcyWVHegibYIMVs00lXPh5aZL'
const stripe = Stripe(STRIPE_SECRET_KEY)


export default stripe