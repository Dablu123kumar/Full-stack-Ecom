
import React from 'react'
import SummaryApi from '../common/Domaim&Api'

const FetchCategoryWiseProduct = async (category) => {
  const response = await fetch(SummaryApi.CategoryWiseProduct.url,{
    method:SummaryApi.CategoryWiseProduct.method,
    headers:{
        'content-type':'application/json',
    },
    body:JSON.stringify({
        // category:category
        category:category
    })
  })
  const dataResponse = await response.json()
  return dataResponse
}

export default FetchCategoryWiseProduct