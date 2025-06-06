import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/Domaim&Api'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

function AllUser() {
    const [allUser,setAllUser] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email:'',
        name:'',
        role:'',
        _id:'',
        })
    const fetchAllusers = async  () => {
        const fetchData = await  fetch(SummaryApi.allUsers.url,{
            method:SummaryApi.allUsers.method,
            credentials:'include',
        
        })
        const dataResponse = await fetchData.json()
        if(dataResponse){
            console.log(dataResponse.data)
            setAllUser(dataResponse.data)
          
        }
        else{
            toast.error(dataResponse.message)
        }
  
        
    }

    useEffect(()=>{
           fetchAllusers()
    },[])
    //console.log('alluser',allUser.role)
   
  return (
   <div className='flex flex-col justify-arround items-center gap-3 min-h-[75.5vh] max-h-[75.5vh] bg-red-300 '>
    <div className=' relative  border border-black bg-white pb-4 w-full min-h-[calc(100vh-443px)] max-h-[calc(100vh-443px)] overflow-y-scroll scroll-bar'>
        <h1 className=' text-center font-bold bg-stone-400'>Admins </h1>
        <table className=' w-full userTable'>
            <thead>
                <tr className=' bg-black text-white'>
                <th>Sr. no</th>
                <th> Name</th>
                <th> Email</th>
                <th>Role</th>
                <th> Created Date</th>
                <th> Action</th>
                
                </tr>
            </thead>
            <tbody>
                {
                    allUser.map((el,index) => {
                        //console.log(el)
                        if(el.role == "ADMIN"){

                            return(
                                <tr key={index}  >
                                    <td>{index+1} </td>
                                    <td>{el?.name} </td>
                                    <td>{el?.email} </td>
                                    <td>{el?.role} </td>
                                    <td>{moment(el?.createdAt).format('L')} </td>
                                    <td>
                                      <button
                                       onClick={() => {
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(!openUpdateRole)
                                       }} className=' bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white '><MdEdit /></button>
                                    </td>
                                </tr>
                            )
                        }
                    })
                }

            </tbody>
        </table>

        {
            openUpdateRole && (
                <ChangeUserRole
                 onClose={() => setOpenUpdateRole(!openUpdateRole)}
                 name={updateUserDetails.name}
                 email={updateUserDetails.email}
                 role={updateUserDetails.role}
                 userId={updateUserDetails._id}
                 callFunc={fetchAllusers}
                 />
            )
        }
        
    </div>

     <div className=' relative border border-black bg-white pb-4 w-full min-h-72 overflow-y-scroll scroll-bar'>
        <h1 className=' bg-stone-400 font-bold text-center'> All User </h1>
        <table className=' w-full userTable'>
            <thead>
                <tr className=' bg-black text-white'>
                <th>Sr. no</th>
                <th> Name</th>
                <th> Email</th>
                <th>Role</th>
                <th> Created Date</th>
                <th> Action</th>
                
                </tr>
            </thead>
            <tbody>
                {
                    allUser.map((el,index) => {
                        console.log(el.role)
                        if(el.role == "USER"){

                            return(
                                <tr key={index}  >
                                    <td>{index+1} </td>
                                    <td>{el?.name} </td>
                                    <td>{el?.email} </td>
                                    <td>{el?.role} </td>
                                    <td>{moment(el?.createdAt).format('L')} </td>
                                    <td>
                                      <button
                                       onClick={() => {
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(!openUpdateRole)
                                       }} className=' bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white '><MdEdit /></button>
                                    </td>
                                </tr>
                            )
                        }
                    })
                }

            </tbody>
        </table>

        {
            openUpdateRole && (
                <ChangeUserRole
                 onClose={() => setOpenUpdateRole(!openUpdateRole)}
                 name={updateUserDetails.name}
                 email={updateUserDetails.email}
                 role={updateUserDetails.role}
                 userId={updateUserDetails._id}
                 callFunc={fetchAllusers}
                 />
            )
        }
        
    </div>
   </div>
  )
}

export default AllUser