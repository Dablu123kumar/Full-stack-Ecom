import React, { useContext, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import SummaryApi from '../common/Domaim&Api';
import { toast } from 'react-toastify';
import Context from '../context/ContextApi';

function UpdatePassword({email}) {
  const navigate =useNavigate()
 const {id, token} = useParams()
 const domainUrl = SummaryApi.ResetPassword.url
  const [showPassword,setShowPassword] = useState()
  const [password,setPassword] = useState()
  const [cpassword,setCpassword] = useState() 
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(password === cpassword){
        const userData = await fetch(`${domainUrl}/${id}/${token}`,{
            method:SummaryApi.ResetPassword.method,
            credentials : 'include',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                password :password,
                cpassword : cpassword
            })
        })
        const dataApi = await userData.json()
        //console.log(dataApi)
        if(dataApi.success){
            toast.success(dataApi.message)
             navigate('/login')
        }
         else{
            toast.error(dataApi.message)
         } 
    }
    else{
        toast.error("Password and Confirm Password does not match")
    } 
 }
//  console.log(data)
//    const handleSubmit = async(e) => {
//       e.preventDefault()
//       const DataResponse = await fetch(SummaryApi.ResetPassword.url, {
//           method: SummaryApi.ResetPassword.method,
//           credentials : "include",
//           headers : {
//               "content-type" : "application/json"
//           } ,
//           body: JSON.stringify(data)
//       })
//       const DataApi = await DataResponse.json()
//       if(DataApi.success){
//           toast.success(DataApi.message)
//           navigate('/login')
//           fetchUserDetails()
//       }
//       else{
//           toast.error(DataApi.message)
//       }
//    }
  return (
    <section id='login'>
    <div className='container mx-auto p-4'>
        <div className='bg-white p-2 py-4 w-full max-w-md mx-auto'>
            <form action="" className=' pt-5 flex flex-col gap-4 p-4' onSubmit={handleSubmit}>
              <h2 className=' text-center font-bold'> Update Password</h2>
                <div className=' grid'>
                    <label htmlFor="">New Password</label>
                    <div className='bg-sky-200  rounded-full px-4 py-2'>
                    <input
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                     type="password" 
                     placeholder='Enter new password' className='w-full h-full bg-transparent outline-none  ' />
                    </div>
                </div>
                <div className=' grid'>
                    <label htmlFor="">Confirm Password</label>
                    <div className='bg-sky-200  rounded-full px-4 py-2'>
                    <input
                    name='Cpassword'
                    onChange={(e) => setCpassword(e.target.value)}
                     type="password" 
                     placeholder='Enter confirm password' className='w-full h-full bg-transparent outline-none  ' />
                    </div>
                </div>
                <div className=' flex items-center justify-center'>
                <div className='  text-green-600 font-semibold border-2 border-green-500 hover:bg-green-600 hover:text-white  rounded-full py-1 px-4'>
                <Link onClick={handleSubmit}>Submit</Link>
                </div>
                </div>
            </form>
        </div>
    </div>
</section>
  )
}
export default UpdatePassword