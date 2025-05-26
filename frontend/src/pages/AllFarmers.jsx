import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/Domaim&Api'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

function AllFarmers() {
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
            //console.log(dataResponse.data)
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
    <div className=' relative bg-white pb-4 h-[calc(100vh-143px)] overflow-y-scroll scroll-bar'>
        <h1 className=' bg-stone-300 text-center font-bold'>-- Farmers --</h1>
        <table className=' w-full userTable'>
            <thead>
                <tr className=' bg-black text-white'>
                <th>Sr. no</th>
                <th> Name</th>
                <th> Email</th>
                <th>Role</th>
                <th>Id</th>
                <th> Created Date</th>
                <th> Action</th>
                
                </tr>
            </thead>
            <tbody>
                {
                    allUser.map((el,index) => {
                        //console.log(el.role)
                        if(el.role == "FARMER"){

                            return(
                                <tr key={index}  >
                                    <td>{index+1} </td>
                                    <td>{el?.name} </td>
                                    <td>{el?.email} </td>
                                    <td>{el?.role} </td>
                                    <td>{el?._id} </td>
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
  )
}

export default AllFarmers