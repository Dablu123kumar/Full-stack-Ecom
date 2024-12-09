import React, { useState } from 'react'
import ROLE from '../common/Role'
import { IoMdCloseCircleOutline } from "react-icons/io";
import SummaryApi from '../common/Domaim&Api';
import { toast } from 'react-toastify';



function ChangeUserRole({name,email,role,onClose,userId,callFunc}) {
    const [userRole,setUserRole] = useState(role)
    const handleSelectRole = (e) => {
        setUserRole(e.target.value)
        // console.log(e.target.value)
    }
    const updateUserRole =async () => {
       const fetchResponse = await fetch(SummaryApi.updateUser.url,{
        method:SummaryApi.updateUser.method,
        credentials:'include',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            userId:userId,
            role:userRole
        })
       })

       const responseData = await fetchResponse.json()
       if(responseData.success){
        toast.success(responseData.message)
        onClose()
        callFunc()
        
       }
    //    console.log('response data',responseData)
    }
  return (
    <div className=' fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-90'>
        <div className=' bg-white shadow-md p-4 w-full max-w-sm'>

            <button className=' block ml-auto text-2xl font-bold' onClick={onClose}>
            <IoMdCloseCircleOutline />
            </button>
            <h1 className=' pb-3 font-medium'>Change User Role</h1>
            <p>Name : {name}</p>
            <p>Email : {email}</p>
             <div className=' flex  justify-between items-center my-2'>
             <p>Role : </p>
            <select  className=' border px-4 py-1' value={userRole} onChange={handleSelectRole}>
                {
                    Object.values(ROLE).map(el => {
                        return (
                            <option value={el} key={el}>{el} </option>
                        )
                    })
                }  
            </select>
             </div>
             <div className=' w-fit mx-auto py-1 px-3 rounded-full bg-red-500 text-white  mt-4 hover:bg-red-700' >
                <button onClick={updateUserRole}>Update Role</button>
             </div>
        </div>
    </div>
  )
}

export default ChangeUserRole