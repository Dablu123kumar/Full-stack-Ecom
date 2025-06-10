import React, { useContext, useEffect, useRef, useState } from "react";
import FetchCategoryWiseProduct from "../helpers/FetchCategoryWiseProduct";
import DisplayINRCurrency from "../helpers/DisplayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddToCart from "../helpers/AddToCart";
import Context from "../context/ContextApi";

const VerticalProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const {fetchUserAddToCart} = useContext(Context)
  const handleAddToCart = async (e,id)=>{
    await AddToCart(e,id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await FetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
   
  };
  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="  container mx-auto relative px-4 my-6">
      <h2 className=" text-2xl font-semibold py-2 my-4">{heading} </h2>
      <div
        className="   flex  items-center gap-3 md:gap-4 overflow-x-scroll scroll-bar  transition-all"
        ref={scrollElement}
      >
        <button
          onClick={scrollLeft}
          className=" bg-white shadow-lg text-black rounded-full overflow-hidden  text-xl absolute left-4 hidden md:block"
        >
          {" "}
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollRight}
          className=" bg-white text-black rounded-full overflow-hidden text-xl absolute right-4  hidden md:block"
        >
          {" "}
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  className=" w-full  min-w-[290px] md:min-w[300px] max-w-[290px] md:max-w[300px]  bg-white rounded-sm shadow animate-pulse"
                  key={index}
                >
                  <div className=" bg-slate-300 h-48 flex justify-center items-center p-4 cursor-pointer  min-w-[280px] md:min-w-[125px]"></div>
                  <div className=" grid grid-rows-4 gap-2  py-2  px-4 capitalize w-full h-full ">
                    <h2 className=" bg-slate-300 w-full rounded-full"></h2>
                    <p className=" bg-slate-300  w-full rounded-full"> </p>
                    <div className="  flex gap-3 md:gap-2 md:text-sm ">
                      <p className=" w-full bg-slate-300 line-through font-light rounded-full"></p>
                      <p className=" w-full font-medium bg-slate-300 rounded-full"></p>
                    </div>
                    <div className=" flex justify-between gap-4">
                      <button className=" w-full bg-slate-300 px-2 py-4 rounded-full mt-2 text-sm "></button>
                      <button className=" w-full bg-slate-300 px-2 py-4 rounded-full mt-2 text-sm "></button>
                    </div>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
            //console.log('product',product.FLocation)
              return (
                <Link to={'/product/'+ product?._id}
                  className=" w-full  min-w-[290px] md:min-w[300px] max-w-[290px] md:max-w[300px]  bg-white rounded-sm shadow   "
                  key={index}
                >
                  <div className=" bg-slate-200 h-48 flex justify-center items-center p-4 cursor-pointer  min-w-[280px] md:min-w-[125px]">
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className=" object-scale-down h-full w-full hover:scale-125 duration-300 transition-all mix-blend-multiply "
                    />
                  </div>
                  <div className=" grid gap-2 py-2  px-4 capitalize w-full ">
                    <h2 className=" font-semibold text-base md:text-lg text-ellipsis line-clamp-1">
                      {product?.productName}{" "}
                    </h2>
                    <p className=" text-slate-500"> {product?.category} </p>
                    <div className="  flex gap-3 md:gap-2 md:text-sm">
                      <p className=" text-red-500 line-through font-light">
                        {DisplayINRCurrency(product?.price)}{" "}
                      </p>
                      <p className=" font-medium text-green-500">
                        {DisplayINRCurrency(product?.sellingPrice)}/Kg{" "}
                      </p>
                    </div>
                   
                      <button onClick={(e) => handleAddToCart(e,product?._id)} className=" bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-full mt-2 text-sm mb-2">
                        Add To Cart
                      </button>
                   
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalProductCard;
