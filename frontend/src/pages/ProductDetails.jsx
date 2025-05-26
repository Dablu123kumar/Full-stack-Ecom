import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common/Domaim&Api";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import DisplayINRCurrency from "../helpers/DisplayCurrency";
import VerticalProductCard from "../components/VerticalProductCard";
import DisplayCategoryWiseProduct from "../components/DisplayCategoryWisePriduct";
import AddToCart from "../helpers/AddToCart";
import Context from "../context/ContextApi";
import DisplayImage from "../components/DisplayImage";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    FLocation: "",
    cirtificate: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomCordinateImage, setZoomCordinateImage] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const [openFullScreenCirtificate, setOpenFullScreenCirtificate] =
    useState(false);
  const [fullScreenCirtificate, setFullScreenCirtificate] = useState("");
  const navigate = useNavigate();
  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.ProductDetails.url, {
      method: SummaryApi.ProductDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse.data);
    setActiveImage(dataResponse.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);
  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      // console.log("cordinate", left, top, width, height);
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomCordinateImage({
        x,
        y,
      });
    },
    [zoomCordinateImage]
  );
  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchUserAddToCart();
  };
  const handleByProduct = () => {
    navigate("/cart");
  };

  return (
    <div className=" container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4 overflow-y-scroll scroll-bar mt-5">
        {/* //// product Image //// */}
        <div className=" h-96 flex flex-col md:items-center sm:items-center lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 rounded-md  relative py-4">
            <img
              src={activeImage}
              alt=""
              className=" h-full w-full object-scale-down mix-blend-multiply rounded-md cursor-move"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {/* // product zoom // */}
            {zoomImage && (
              <div className=" hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-2 -right-[520px] top-0 rounded-md overflow-hidden ">
                <div
                  className=" h-[400px] w-[500px]  bg-slate-100 rounded-md mix-blend-multiply scale-125  flex items-center justify-center "
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomCordinateImage.x * 100}%  ${
                      zoomCordinateImage.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className=" lg:h-full">
            {loading ? (
              <div className=" flex  gap-2 lg:flex-col overflow-scroll scroll-bar md:h-24 lg:h-full ">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className=" flex md:items-center h-20 w-20 bg-slate-300 rounded animate-pulse"
                      key={"loadingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className=" flex gap-2 lg:flex-col overflow-scroll scroll-bar h-full">
                {data?.productImage?.map((imageURL, index) => {
                  return (
                    <div
                      className=" h-20 w-20 bg-slate-300 rounded p-1 "
                      key={imageURL}
                    >
                      <img
                        src={imageURL}
                        alt=""
                        className=" w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imageURL)}
                        onClick={() => handleMouseEnterProduct(imageURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* //// product Details //// */}
        {loading ? (
          <div className=" flex flex-col  space-y-2 w-full animate-pulse">
            <p className="  bg-slate-300  py-2 px-2 rounded-full w-full"></p>
            <h2 className=" bg-slate-300  w-full rounded-full py-3 px-2 "></h2>
            <p className=" bg-slate-300 w-full rounded-full py-3 px-2"> </p>
            <div className=" bg-slate-300 w-full rounded-full py-3 px-2"></div>
            <div className=" flex items-center gap-4">
              <p className=" bg-slate-300 w-full rounded-full py-3 px-2"></p>
              <p className=" bg-slate-300 w-full rounded-full py-3 px-2"></p>
            </div>
            <div className=" flex justify-between items-center gap-3">
              <button className=" bg-slate-300 w-full rounded-full py-3 px-2"></button>
              <button className=" bg-slate-300 w-full rounded-full py-3 px-2"></button>
            </div>
            <div className="">
              <p className=" bg-slate-300 w-full rounded-full py-3 px-2 my-4"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:items-start  md:items-center  md:justify-center">
            <div className=" capitalize space-y-1 ">
              <p className=" font-medium bg-red-200 text-red-700 py-1 px-2 rounded-full w-fit">
                {data?.brandName}{" "}
              </p>
              <h2 className=" text-2xl lg:text-3xl font-medium ">
                {data?.productName}{" "}
              </h2>
              <p className=" text-slate-400">{data?.category} </p>
              <div className=" text-red-600 flex items-center gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <div className=" flex items-center gap-4 text-xl lg:text-2xl">
                <p className=" font-medium text-green-600">
                  {DisplayINRCurrency(data?.sellingPrice)}{" "}
                </p>
                <p className=" text-red-600 line-through">
                  {DisplayINRCurrency(data?.price)}{" "}
                </p>
              </div>
              <div className=" h-full md:max-w-64 flex justify-between items-center gap-3">
                <button
                  className=" border border-red-600 bg-white text-red-600 hover:bg-red-700 hover:text-white font-semibold px-2 py-1 rounded-full mt-2 text-sm"
                  onClick={handleByProduct}
                >
                  Buy Now
                </button>
                <button
                  className="  bg-red-600 hover:bg-white hover:text-red-600 border hover:border-red-600 text-white font-medium  px-2 py-1 rounded-full mt-2 text-sm "
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add To Cart
                </button>
              </div>
              <div className="">
                <p className=" text-slate-600 font-medium my-4">
                  Description :
                </p>
                <p>{data?.description} </p>
              </div>
              {data.FLocation && (
                <div>
                  <p className=" text-slate-600 font-medium my-4">Location :</p>
                  <p>{data?.FLocation} </p>
                </div>
              )}
              {data?.cirtificate[0] &&
                data?.cirtificate.map((el, index) => {
                  return (
                    <div
                      key={el._id + index}
                      className="relative group h-10 w-10 object-scale-down"
                    >
                      <img
                        src={el}
                        alt=""
                        className=" h-[100%] w-[100%] bg-slate-100 cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenCirtificate(true);
                          setFullScreenCirtificate(el);
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      {data.category && (
        <DisplayCategoryWiseProduct
          category={data?.category}
          heading={" Recommended Product"}
        />
      )}

       {/* display Cirtificate full screen */}
        {
            openFullScreenCirtificate && ( 
            <DisplayImage onClose={()=>setOpenFullScreenCirtificate(false)} imagUrl={fullScreenCirtificate}/>
        )
        }
    </div>
  );
};

export default ProductDetails;
