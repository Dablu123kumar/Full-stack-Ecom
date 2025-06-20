import stripe from '../../DataBase/stripe.js'
import addToCartModel from '../../Model/cartProductModel.js'
import ordermodel from '../../Model/orderModel.js'
const endpointSecret = process.env.WEBHOOK_ENDPONIT_SECRETE

async function getLineItems(lineItems) {
    let ProductItems = []
    if(lineItems?.data?.length){
        for(let item of lineItems?.data){
            const product = await stripe?.products?.retrieve(item?.price?.product)
            const productId = product?.metadata?.productId
            const productData = {
                productId : productId,
                name: product?.name,
                price: item?.price?.unit_amount / 100,
                quantity : item?.quantity,
                images : product?.images

            }
            ProductItems.push(productData)
          
        }
    }
    return ProductItems
}

const webhook = async(req,res) =>{
    const sig = req.headers['stripe-signature'];
    const payloadString = JSON.stringify(req?.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret,
      });
    
  let event;

  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
   // Handle the event
   switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('sessoi',session)
      const lineItems = await stripe.checkout.sessions.listLineItems(session?.id)
      console.log('linedara',lineItems)
     
      const productDetails = await getLineItems(lineItems)

      const orderDetails = {
        productDetails : productDetails,
        email : session?.customer_email,
        userId :session?.metadata.userId,
        paymentDetails : {
            paymentId : session?.payment_intent ,
            payment_method_type : session?.payment_method_types,
            payment_status :session?.payment_status,
        },
        shipping_options : session?.shipping_options.map((s) => {
            return{
                ...s,shipping_amount : s?.shipping_amount / 100
            }
        }),
        totalAmount : session?.amount_total / 100
      }
      const order = await ordermodel(orderDetails)
      const saveOrder = await order.save()
      if(saveOrder?._id){
        const deleteCartItems = await addToCartModel.deleteMany({userId : session?.metadata?.userId})
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send()
}

export default webhook






// whsec_28aa825512060da2431cf07e330846ff85a2b056ad407bba22796a048eb59e83