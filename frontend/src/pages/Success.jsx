import React from 'react'
import SUCCESSIMAGE from '../assest/success.svg'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className=' flex items-center justify-center flex-col h-[calc(100vh-115px)] bg-slate-200 '>
        <img src={SUCCESSIMAGE} alt="" className=' h-32 w-32' />
        <p className=' text-center text-green-600 font-bold'>Payment Successfull</p>
        <Link to={"/order"} className='px-3 py-1 border-2 border-green-600 rounded-full mt-5  text-green-600 hover:bg-green-600 hover:text-white font-medium'>See Order</Link>
        
    </div>
  )
}

export default Success