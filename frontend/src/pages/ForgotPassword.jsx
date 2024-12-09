import React, {useState } from 'react'
import {Link} from 'react-router-dom'
import SummaryApi from '../common/Domaim&Api';
import { toast } from 'react-toastify';


function ForgotPassword() {
  const [email,setEmail] = useState('')

   const handleSubmit = async(e) => {
      e.preventDefault()
      const DataResponse = await fetch(SummaryApi.SendOTPEmail.url, {
          method: SummaryApi.SendOTPEmail.method,
          credentials : "include",
          headers : {
              "content-type" : "application/json"
          } ,
           body: JSON.stringify({
            email : email
           })
      })
      const DataApi = await DataResponse.json()
      //console.log(DataApi.dataotp)
      if(DataApi.success){
          toast.success(DataApi.message)
          // fetchUserDetails()
      }
      else{
          toast.error(DataApi.message)
      }
   }
  return (
    <section id='login'>
    <div className='container mx-auto p-4'>
        <div className='bg-white p-2 py-4 w-full max-w-md mx-auto'>
          <form action="" className=' pt-5 flex flex-col gap-4 p-4' onSubmit={handleSubmit}>
            <h2 className=' text-center font-bold'> Forgot Password</h2>
              <div className=' grid'>
                  <label htmlFor="">Email</label>
                  <div className='bg-sky-200  rounded-full px-4 py-2'>
                  <input
                  name='email'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                   type="email" 
                   placeholder='Enter email' className='w-full h-full bg-transparent outline-none  ' />
                  </div>
              </div>
              <div className=' flex justify-center items-center'>
                <div className=' font-semibold text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-full py-1 px-4'>
                <Link onClick={handleSubmit} > Send OTP</Link>
                </div>
              </div>
          </form>
        </div>
    </div>
</section>
  )
}

export default ForgotPassword