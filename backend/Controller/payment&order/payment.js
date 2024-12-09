import UserModel from "../../Model/UserModel.js";
import Stripe from "stripe";
const payment = async(req,res)=>{
    try {
        const {cartItems} = req?.body; 
        console.log('cartitems',cartItems)        
         const user = await UserModel.findOne({_id : req?.userId })
        const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
        const params = {
              submit_type :'pay',
              mode :'payment',
              payment_method_types : ['card'],
              billing_address_collection : 'auto',
              shipping_options : [
                {
                    shipping_rate : 'shr_1QBwZZKujXXkbC9vtpRvAVEr'
                }
              ],
              customer_email:user?.email,
              metadata :{userId : req?.userId},
              line_items : cartItems.map((item) =>{
                return{
                    price_data :{
                        currency :'inr',
                        product_data : {
                            name : item?.productId?. productName,
                            images : item?.productId?.productImage,
                            metadata: { id: item.productId._id.toString()} 
                        },
                        unit_amount : item?.productId?.sellingPrice * 100,

                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1,
                    },
                    quantity : item?.quantity
                }
              }),
              success_url : `${process.env.FRONTEND_URL}/success` ,
              cancel_url : `${process.env.FRONTEND_URL}/cancel`,

        }
        const session = await stripe.checkout.sessions.create(params)
        res.status(303).json({
            data:session,
            message : "ok",
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            success:false
        })
    }
}

export default payment