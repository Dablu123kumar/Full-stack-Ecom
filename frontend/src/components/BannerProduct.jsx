import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/banner1.jpg";
import image2 from "../assest/banner/banner4.jpg";
import image3 from "../assest/banner/banner5.jpg";
import image4 from "../assest/banner/banner6.jpg";
import image5 from "../assest/banner/banner7.jpg";
import image6 from "../assest/banner/banner8.jpg";
import image7 from "../assest/banner/banner2.jpg";
import image8 from "../assest/banner/banner3.jpg";
import image9 from "../assest/banner/banner9.jpg";
import image10 from "../assest/banner/banner10.jpg";
import image11 from "../assest/banner/banner11.jpg";
import image13 from "../assest/banner/banner12.jpg";
import image14 from "../assest/banner/banner14.jpg";
import image15 from "../assest/banner/banner15.jpg";
import image16 from "../assest/banner/banner16.jpg";
import image17 from "../assest/banner/banner17.jpg";
import image18 from "../assest/banner/banner18.jpg";
import image19 from "../assest/banner/bannerf1.png";
import image20 from "../assest/banner/bannerf2.png";
import image21 from "../assest/banner/bannerf3.png";
import image22 from "../assest/banner/bannerf4.png";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image19,image20,image21,image22,image13,image9,image10,image11,image14,image15,image16,image17,image18,];

  const mobileImages = [image19,image20,image21,image22,image1,image2,image3,image4,image5,image6,image7,image8,image4];
  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };
  const PreviousImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className=" container mx-auto px-4 ">
      <div className=" h-52 md:h-72 w-full bg-slate-200 rounded overflow-hidden relative">
        <div className=" absolute z-10 w-full top-1/2 md:flex justify-between items-center hidden px-1 ">
          <button
            onClick={PreviousImage}
            className=" bg-white shadow-lg text-black rounded-full overflow-hidden  text-2xl"
          >
            {" "}
            <FaAngleLeft />
          </button>
          <button
            onClick={nextImage}
            className=" bg-white text-black rounded-full overflow-hidden text-2xl"
          >
            {" "}
            <FaAngleRight />
          </button>
        </div>
        {/* destop and tablate version img */}
        <div className=" hidden md:flex w-full h-full ">
          {desktopImages.map((imageURL, index) => {
            return (
              <div
                className=" w-full h-full min-w-full min-h-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} alt="" className=" w-full h-full" />
              </div>
            );
          })}
        </div>
        {/* for mobile version img  */}
        <div className=" flex w-full h-full md:hidden ">
          {mobileImages.map((imageURL, index) => {
            return (
              <div
                className=" w-full h-full min-w-full min-h-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={imageURL}
                  alt=""
                  className=" w-full h-full object-cover "
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
