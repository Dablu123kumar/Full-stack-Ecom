import  { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/ProductCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common/Domaim&Api";



const ProductCategoryPage = () => {
  const [data, setData] = useState([]);
  const nvigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [filterCategoryList,setFilterCategoryList] = useState([])

  const locatino = useLocation()
  const URLSearch = new URLSearchParams(locatino.search)
  const urlCategoryListInArray = URLSearch.getAll("category") 
  const urlCategoryListObject= {}
 urlCategoryListInArray.forEach((el) => {
  urlCategoryListObject[el] = true
 })

const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)

const [sortBy,setSortBy] = useState('')

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url,{
      method: SummaryApi.filterProduct.method,
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({category:filterCategoryList})
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data);
  };

  const handleSelectCategory = (e)=>{
         const {name,value,checked} = e.target
         setSelectCategory((prev) =>{
          return{
            ...prev,[value] :checked
          }
         })
  }

  useEffect(()=>{
    fetchData()
  },[filterCategoryList])
 
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map((categoryKeyName) => {
      if(selectCategory[categoryKeyName]){
        return categoryKeyName
      }
      return null
    }).filter((el) => el)
    setFilterCategoryList(arrayOfCategory)
    //  format for url change when change on url box
    const urlFormat = arrayOfCategory.map((el,index) => {
      if((arrayOfCategory.length-1) === index){
        return `category=${el}`
      }
      return `category=${el}&&`
    })
    nvigate("/product-category-page?"+urlFormat.join(""))
    // product-category-page?category=camera&category=airpodes
  },[selectCategory])

  const handleOnchangeSortBy = (e) => {
        const {value} = e.target
        if(value === 'asc'){
          setSortBy(value)
          setData((prev) => prev.sort((a,b) => a.sellingPrice - b.sellingPrice))
        }
        if(value === 'dsc'){
          setSortBy(value)
          setData((prev) => prev.sort((a,b) => b.sellingPrice - a.sellingPrice))
        }
  }

  useEffect(()=>{},[sortBy])
  
  return (
    <div className=" container mx-auto p-4">
      {/* destop version  */}
      <div className=" w-full flex flex-col lg:flex-row   overflow-y-scroll scroll-bar">
        {/* left side  */}
        <div className=" min-w-[30%] max-w-[30%] p-2 lg:min-h-[calc(100vh-170px)] lg:max-h-[calc(100vh-170px)]   overflow-y-scroll scroll-bar ">
        <div className=" w-[60%] flex flex-row lg:flex-col justify-between  bg-white px-4">
            {/* sort by  */}
            <div className="">
            <h3 className="text-lg uppercase font-base text-slate-500 border-b border-slate-300">
              Sort by{" "}
            </h3>
            <form action="" className=" text-sm flex flex-col gap-2 py-2">
              <div className=" flex align-middle gap-2">
                <input onChange={handleOnchangeSortBy} type="radio" checked={sortBy === 'asc'} name="sortBy" value={"asc"}  />
                <label htmlFor=""> price-low to high</label>
              </div>
              <div className=" flex align-middle gap-2">
                <input onChange={handleOnchangeSortBy} type="radio" name="sortBy" checked={sortBy === 'dsc'} value={'dsc'}  />
                <label htmlFor=""> price-high to low</label>
              </div>
            </form>
          </div>
          {/* filter by  */}
          <div className="">
            <h3 className="text-lg uppercase font-base text-slate-500 border-b border-slate-300">
              Category{" "}
            </h3>
            <form  className="  text-sm min-h-16 max-h-16 lg:min-h-[calc(100vh-145px)] lg:max-h-[calc(100vh-145px) overflow-y-scroll scroll-bar flex flex-col gap-2 py-2">
              {productCategory?.map((categoryName, index) => {
                return (
                  <div key={'categoryName'+index} className=" flex align-middle gap-2 ">
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}{" "}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        </div>
        {/* right side  */}
        <div className=" min-w-[70%] max-w-[70%] ">
          <p className=" font-medium text-slate-800 text-lg my-2">Search Results :{data.length} </p>
          <div className=" max-h-[calc(100vh-188px)]  min-h-[calc(100vh-188px)] overflow-y-scroll scroll-bar">
          {
          data.length !== 0 && (
            <VerticalCard data={data} loading={loading}/>
          )
        }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryPage;
