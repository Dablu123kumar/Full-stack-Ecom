import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import SummaryApi from '../common/Domaim&Api'
import AdminProductCard from '../components/AdminProductCard'

function AllProducts() {
    const [openUploadProduct,setOpenUploadProduct] =useState(false)
    const [allProduct,setAllProduct] = useState([])
    const fetchAllProduct = async() =>{
      const response = await fetch(SummaryApi.allProduct.url)
      const dataResponse = await response.json()
      setAllProduct(dataResponse?.data || [])
    }
    useEffect(()=>{
        fetchAllProduct()
    },[])
  return (
    <div>
        <div className=' bg-white py-2 px-4  flex justify-between items-center'>
            <h2 className=' font-semibold text-lg'>All Products</h2>
            <button onClick={() => setOpenUploadProduct(!openUploadProduct)} className=' border border-red-700 hover:bg-red-600 hover:text-white transition-all py-1 px-4 rounded-full'>Upload Product</button>
        </div>


        <div className=' flex items-center  flex-wrap gap-5 py-3  h-[calc(100vh-192px)] overflow-y-scroll scroll-bar'>
          {/* all products*/}
          {
            allProduct.map((product,index) => {
              return(
                <AdminProductCard data={product} key={index+'allProduct'} fetchData={fetchAllProduct}/>
             
              )
            })
          }
        </div>

        {/* upload products */}
        {
            openUploadProduct && <UploadProducts onClose ={() => setOpenUploadProduct(!openUploadProduct)} fetchData={fetchAllProduct}/>
        }
    </div>
  )
}

export default AllProducts