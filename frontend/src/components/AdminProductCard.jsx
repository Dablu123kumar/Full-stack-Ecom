import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import DisplayINRCurrency from "../helpers/DisplayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className=" bg-white p-4 rounded group ">
      <div className=" w-36 h-48 ">
        <div className=" w-full h-32  flex justify-center items-center">
        <img
          src={data.productImage[0]}
          alt=""
          className=" mx-auto h-full object-fill"
        />
        </div>
        <h1 className=" text-ellipsis line-clamp-2 ">{data.productName}</h1>
        <div className=" flex justify-between items-center ">
          <p className=" font-semibold">
            {DisplayINRCurrency(data.sellingPrice)}
          </p>
          <div
            className=" w-fit ml-auto  p-1   bg-green-200 rounded-full text-black hover:bg-green-600 hover:text-white  cursor-pointer hidden group-hover:block"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
