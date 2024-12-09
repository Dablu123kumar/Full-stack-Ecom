import React, { useContext, useState } from 'react'
import signinIcon from '../assest/signin.gif'
import { BiHide } from "react-icons/bi";
import { IoIosEye } from "react-icons/io";
import {Link, useNavigate} from 'react-router-dom'
import SummaryApi from '../common/Domaim&Api';
import { toast } from 'react-toastify';
import Context from '../context/ContextApi';

function Login() {
    const navigate = useNavigate()
    const {fetchUserDetails} = useContext(Context)
    //  console.log(generalContext.fetchUserDetails())
    const [showPassword,setShowPassword] = useState()
    const [data,setData] = useState({
        email: "",
        password: ""
    })
    const handleInput = (e) => {
        const {name,value} = e.target
        setData((prev) => {
            return {...prev,[name]:value}
        })
    }
     const handleSubmit = async(e) => {
        e.preventDefault()
        const DataResponse = await fetch(SummaryApi.logIN.url, {
            method: SummaryApi.logIN.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json"
            } ,
            body: JSON.stringify(data)
        })
        const DataApi = await DataResponse.json()
        if(DataApi.success){
            toast.success(DataApi.message)
            navigate('/')
            fetchUserDetails()
        }
        else{
            toast.error(DataApi.message)
        }
     }
 
     
  return (
    <section id='login'>
        <div className='container mx-auto p-4'>
            <div className='bg-white p-2 py-4 w-full max-w-md mx-auto'>
                <div className=' w-16 h-16 mx-auto pt-2'>
                    <img src={signinIcon} alt="Login icons" className='rounded-full'  />
                </div>
                <form action="" className=' pt-5 flex flex-col gap-4 p-4' onSubmit={handleSubmit}>
                    <div className=' grid'>
                        <label htmlFor="">Email</label>
                        <div className='bg-sky-200  rounded-full px-4 py-2'>
                        <input
                        name='email'
                        value={data.email}
                        onChange={handleInput}
                         type="email" 
                         placeholder='Enter email' className='w-full h-full bg-transparent outline-none  ' />
                        </div>
                    </div>
                    <div className=' grid'>
                        <label htmlFor="">Password</label>
                        <div className='bg-sky-200  rounded-full flex  px-4 py-2'>
                        <input
                        value={data.password}
                        name='password'
                        onChange={handleInput}
                         type={showPassword ? "text" : "password"} placeholder='Enter password' className='w-full h-full bg-transparent outline-none ' />
                        <div className=' cursor-pointer'>
                        <span onClick={() => setShowPassword(!showPassword)} className='text-2xl' >
                            {
                                showPassword ? 
                                <BiHide/> : <IoIosEye />
                            }
                        </span>
                        </div>
                        </div>
                    </div>
                    <div className='  flex justify-between  '>
                    <div className=' flex flex-col'>
                    <button className='bg-red-600 hover:bg-red-800 text-white px-8 py-1 rounded-full hover:scale-105 transition-all'>Login</button>
                    <Link to='/forgotPassword' className='text-blue-600 text-sm font-semibold mt-1'> Forgot Password</Link>
                    </div>
                    <p> register <Link to='/signup' className='text-green-800 font-bold underline' >here?</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Login