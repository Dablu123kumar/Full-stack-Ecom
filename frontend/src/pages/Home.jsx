import React from 'react'
import ProductCategoryList from '../components/ProductCategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalProductCard from '../components/VerticalProductCard'

function Home() {
  return (
    <div>
      <ProductCategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"citrus"} heading={" Fruits"}/>
      <HorizontalCardProduct category={"berries"} heading={" Fruits"}/>
      <HorizontalCardProduct category={"pome"} heading={"Fruits"}/>
      <VerticalProductCard category={"root"} heading={" Root Vegitables"}/> 
      <VerticalProductCard category={"propical"} heading={" Tropical Fruits"}/> 
      <VerticalProductCard category={"melons"} heading={" Melons"}/> 
      <VerticalProductCard category={"fruit"} heading={" Fruit vegitables"}/> 
      <VerticalProductCard category={"leaf"} heading={" Leaf vegitables"}/> 
      <VerticalProductCard category={"flower"} heading={" Flower vegitables"}/> 
      <VerticalProductCard category={"pod"} heading={" POD vegitables"}/> 
      <VerticalProductCard category={"grain"} heading={" Grain vegitables"}/> 
      <VerticalProductCard category={"bulb"} heading={" Bulb vegitables"}/> 
      <VerticalProductCard category={"root"} heading={" Root Vegitables"}/> 
      <VerticalProductCard category={"propical"} heading={" Tropical Fruits"}/> 
      <VerticalProductCard category={"melons"} heading={" Melons"}/> 
      <VerticalProductCard category={"fruit"} heading={" Fruit vegitables"}/> 
      <VerticalProductCard category={"leaf"} heading={" Leaf vegitables"}/> 
      <VerticalProductCard category={"flower"} heading={" Flower vegitables"}/> 
      <VerticalProductCard category={"pod"} heading={" POD vegitables"}/> 
      <VerticalProductCard category={"grain"} heading={" Grain vegitables"}/> 
      <VerticalProductCard category={"bulb"} heading={" Bulb vegitables"}/> 
      {/* <VerticalProductCard category={"stem"} heading={" Leaf vegitables"}/>  */}
      <VerticalProductCard category={"legumes"} heading={" Legumes vegitables"}/> 
      
    </div>
  )
}

export default Home