import SummaryApi from "../common/Domaim&Api"
import {toast} from 'react-toastify'

const AddToCart =async (e,id) => {
       e?.stopPropagation()
       e?.preventDefault()
       const response = await fetch(SummaryApi.addToCartProduct.url,{
              method:SummaryApi.addToCartProduct.method,
              credentials:'include',
              headers:{
                     'content-type':'application/json'
              },
              body:JSON.stringify({productId : id})
       })
       const responseData = await response.json()
       if(responseData.success){
              toast.success(responseData.message)
       }
       else{
              toast.error(responseData.message)
       }

       return responseData
}

export default AddToCart