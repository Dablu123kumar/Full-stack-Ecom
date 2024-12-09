import  { useState } from 'react'
import signinIcon from '../assest/signin.gif'
import { BiHide } from "react-icons/bi";
import { IoIosEye } from "react-icons/io";
import { Link, useNavigate} from 'react-router-dom'
import ImageToBase64 from '../helpers/ImageToBase64';
import SummaryApi from '../common/Domaim&Api';
import { toast } from 'react-toastify';


function Signup() {
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState()
    const [showConfirmPassword,setShowConfirmPassword] = useState()
    const [data,setData] = useState({
        profilePic:"",
        name:"",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const handleInput = (e) => {
        const {name,value} = e.target
        setData((prev) => {
            return {...prev,[name]:value}
        })
    }
     const handleSubmit = async(e) => {
        e.preventDefault();
        if(data.password === data.confirmPassword){
            const userData = await fetch(SummaryApi.signUP.url,{
                method:SummaryApi.signUP.method,
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(data)
            })
            const dataApi = await userData.json()
            if(dataApi.success){
                toast.success(dataApi.message)
                navigate('/login')
            }
             else{
                toast.error(dataApi.message)
             }
        
            //  console.log(dataApi)
            
        }
        else{
            toast.error("Password and Confirm Password does not match")
            
        }
        
     }
     const handleUploadPic = async (e) => {
        const file = e.target.files[0]
        const imagePic = await ImageToBase64(file)
        console.log(imagePic)
        setData((prev) => {
            return {...prev,profilePic:imagePic}
        })
     }
  return (
    <section id='signup'>
    <div className='container mx-auto p-4'>
        <div className='bg-white  py-2 w-full max-w-md mx-auto'>
            <div className=' w-16 h-16 mx-auto overflow-hidden rounded-full  relative'>
               <div>
               <img src={ data.profilePic || signinIcon} alt="Login icons" height={100} width={100} />
               </div>
               <form action="">
               <label >
                <input type="file" hidden onChange={handleUploadPic} />
               {
                data.profilePic ? data.profilePic : 
                <div className=' absolute text-xs bg-opacity-80 text-center pb-4 pt-2 bg-slate-200 cursor-pointer -bottom-4 w-full' >Upload Photo</div>
               }
               </label>
               </form>
            </div>
            <form action="" className=' pt-5 flex flex-col gap-3 px-4 py-2 ' onSubmit={handleSubmit}>
                <div className=' grid'>
                    <label htmlFor="">Name</label>
                    <div className='bg-sky-200  rounded-full px-4 py-2'>
                    <input
                    name='name'
                    value={data.name}
                    onChange={handleInput}
                    required
                    minLength={5 }
                    
                     type="text" 
                     placeholder='Enter name' className='w-full h-full bg-transparent outline-none  ' />
                    </div>
                </div>
                <div className=' grid'>
                    <label htmlFor="">Email</label>
                    <div className='bg-sky-200  rounded-full px-4 py-2'>
                    <input
                    name='email'
                    value={data.email}
                    onChange={handleInput}
                    required
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
                    required
                    minLength={8}
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
                <div className=' grid'>
                    <label htmlFor=""> Confirm Password</label>
                    <div className='bg-sky-200  rounded-full flex  px-4 py-2'>
                    <input
                    value={data.confirmPassword}
                    name='confirmPassword'
                    onChange={handleInput}
                    required
                    minLength={8}
                     type={showConfirmPassword ? "text" : "password"} placeholder='Enter confirm password' className='w-full h-full bg-transparent outline-none ' />
                    <div className=' cursor-pointer'>
                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='text-2xl' >
                        {
                            showConfirmPassword ? 
                            <BiHide/> : <IoIosEye />
                        }
                    </span>
                    </div>
                    </div>
                </div>
                <div className='  flex justify-between  '>
                <div className=' flex flex-col'>
                <button className='bg-red-600 hover:bg-red-800 text-white px-8 py-1 rounded-full hover:scale-105 transition-all'>SignUP</button>
                </div>
                <p className='font-semibold  '> Login <Link to='/login' className='text-green-800 underline font-bold' >here?</Link></p>
                </div>
            </form>
        </div>
    </div>
</section>
)
}

export default Signup