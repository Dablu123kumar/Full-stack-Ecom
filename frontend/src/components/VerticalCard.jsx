import React, { useContext } from "react";
import ScrollTop from "../helpers/ScrollTop";
import DisplayINRCurrency from "../helpers/DisplayCurrency";
import { Link } from "react-router-dom";
import Context from "../context/ContextApi";
import AddToCart from "../helpers/AddToCart";

const VerticalCard = ({loading,data = []}) => {
  const loadingList = new Array(13).fill(null);
  const {fetchUserAddToCart} = useContext(Context)
  const handleAddToCart = async (e,id)=>{
    await AddToCart(e,id)
    fetchUserAddToCart()
  }
  return (
    <div>
      <div className="w-full flex flex-wrap justify-center md:justify-between  items-center md:gap-5 ">
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  className=" w-full  min-w-[290px] md:min-w[250px] max-w-[290px] md:max-w[250px]  bg-white rounded-sm shadow animate-pulse"
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
              return (
                <Link
                  to={"/product/" + product?._id}
                  className=" min-w-[280px] md:min-w[300px] max-w-[290px] md:max-w[310px]  bg-white rounded-md overflow-hidden shadow mb-4   "
                  key={index}
                  onClick={ScrollTop}
                >
                  <div className=" bg-slate-200 h-48 flex justify-center items-center p-4 cursor-pointer  min-w-[280px] md:min-w-[125px]">
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className=" object-scale-down h-full hover:scale-125 duration-300 transition-all mix-blend-multiply "
                    />
                  </div>
                  <div className=" grid gap-2 py-2  px-4 capitalize w-full  ">
                    <h2 className=" font-semibold text-base md:text-lg text-ellipsis line-clamp-1">
                      {product?.productName}{" "}
                    </h2>
                    <p className=" text-slate-500"> {product?.category} </p>
                    <div className="  flex gap-3 md:gap-2 md:text-sm">
                      <p className=" text-slate-500 line-through font-light">
                        {DisplayINRCurrency(product?.price)}{" "}
                      </p>
                      <p className=" font-medium text-red-500">
                        {DisplayINRCurrency(product?.sellingPrice)}{" "}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product?._id)}
                      className=" bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-full mt-2 text-sm mb-2"
                    >
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

export default VerticalCard;
