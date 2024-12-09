import React from 'react'
import { Link } from 'react-router-dom'
import FAILEDIMAGE from '../assest/failed.jpg'
const Cancel = () => {
  return (
    <div className=' flex items-center justify-center flex-col h-[calc(100vh-115px)] bg-slate-200 '>
    <img src={FAILEDIMAGE} alt="" className=' h-32 w-32' />
    <p className=' text-center text-red-600 font-bold'>Payment Failed!</p>
    <Link to={"/cart"} className='px-3 py-1 border-2 border-red-600 rounded-full mt-5  text-red-600 hover:bg-red-600 hover:text-white font-medium'>Go To Cart</Link>
    
</div>
  )
}

export default Cancel