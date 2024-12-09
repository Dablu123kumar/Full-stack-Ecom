import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import productCategory from "../helpers/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../helpers/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common/Domaim&Api";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose, productData,fetchData }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await UploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    console.log("image index", index);
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  //   uploadProduct
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await Response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData()
    } else {
      toast.error(responseData?.message);
    }
  };
  return (
    <div className=" fixed w-full h-full left-0 right-0 top-7 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-40 ">
      <div className=" bg-white py-2 px-4 rounded w-full max-w-2xl h-full max-h-[70%] overflow-hidden">
        <div className=" flex justify-between items-center pb-3">
          <h2 className=" font-bold text-lg">Update Product</h2>
          <div className="text-2xl hover:text-red-600 cursor-pointer">
            <IoMdCloseCircleOutline onClick={onClose} />
          </div>
        </div>

        <form
          className=" grid p-4 gap-3 overflow-scroll  h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label for="productName">Product Name : </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            value={data.productName}
            onChange={handleOnchange}
            className=" py-2 px-6 bg-slate-100 rounded-full "
            required
          />
          <label for="brandName">Brand Name : </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter brand name"
            value={data.brandName}
            onChange={handleOnchange}
            className=" py-2 px-6 bg-slate-100 rounded-full "
            required
          />
          <label for="category">Category : </label>
          <select
            required
            value={data.category}
            onChange={handleOnchange}
            name="category"
            className=" py-2 px-6 bg-slate-100 rounded-full"
          >
            <option value={""}>Select Category </option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}{" "}
                </option>
              );
            })}
          </select>
          <label for="productImage">productImage : </label>
          <label htmlFor="uploadImageInput">
            <div className=" py-2 px-6 bg-slate-100 rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className=" text-slate-500 flex justify-center items-center flex-col gap-2 ">
                <FaCloudUploadAlt className=" text-4xl" />
                <p className=" text-sm">Upload Product Image </p>
                <input
                  type="file"
                  name="uploadImageInput"
                  id="uploadImageInput"
                  hidden
                  onChange={handleUploadProductImage}
                />
              </div>
            </div>
          </label>
          <div className=" flex justify-start items-center flex-wrap gap-5">
            {data?.productImage[0] ? (
              data.productImage.map((el, index) => {
                return (
                  <div className=" relative group  h-20 w-24 p-2">
                    <img
                      src={el}
                      alt=""
                      className=" h-full w-full  cursor-pointer object-scale-down"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className=" absolute hidden group-hover:block bottom-0 right-0 p-1 text-white bg-red-500 rounded-full  cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className=" text-red-600 text-xs"> Please Upload Image</p>
            )}
          </div>

          <label for="price">Price : </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            value={data.price}
            onChange={handleOnchange}
            className=" py-2 px-6 bg-slate-100 rounded-full "
            required
          />
          <label for="sellingPrice">SellingPrice : </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter selling Price"
            value={data.sellingPrice}
            onChange={handleOnchange}
            className=" py-2 px-6 bg-slate-100 rounded-full "
            required
          />
          <label for="description">Description : </label>
          <textarea
            name="description"
            id="description"
            value={data.description}
            rows={3}
            className=" h-20 bg-slate-100 resize-none p-1"
            placeholder="Enter product description"
            onChange={handleOnchange}
            required
          ></textarea>

          <button className=" px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-800">
            Update Product
          </button>
        </form>
      </div>

      {/* display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imagUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
