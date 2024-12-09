import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const DisplayImage = ({ imagUrl, onClose }) => {
  return (
    <div className=" fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center" >
      <div className=" bg-white shadow-lg rounded p-2">
      <div className='text-2xl hover:text-red-600 cursor-pointer w-fit ml-auto'>
         <IoMdCloseCircleOutline onClick={onClose} />
        </div>
        <div className=" flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
          <img src={imagUrl} alt="" className=" w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
