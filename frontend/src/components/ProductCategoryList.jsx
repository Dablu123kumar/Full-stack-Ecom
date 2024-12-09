import React, { useEffect, useState } from "react";
import SummaryApi from "../common/Domaim&Api";
import { Link } from "react-router-dom";

const ProductCategoryList = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchProductCategory = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.getProductCategory.url);
    const dataResponse = await response.json();
    setLoading(false);
    setProductCategory(dataResponse.data);
  };

  useEffect(() => {
    fetchProductCategory();
  }, []);
  return (
    <div className=" container mx-auto px-4 py-3 lg:mt-3">
      <div className=" flex items-center justify-between gap-2 overflow-x-scroll scroll-bar">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div className=" h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden bg-slate-200 animate-pulse" key={'categoryLoading'+index}></div>
              );
            })
          : productCategory.map((product, index) => {
              return (
                <Link to={"/product-category-page?category=" + product.category} key={product?.category+index}>
                  <div className=" h-10 w-10 md:w-12 md:h-12 bg-slate-200 shadow-2xl rounded-full overflow-hidden  flex items-center justify-center p-2 cursor-pointer">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full  object-scale-down mix-blend-multiply hover:scale-125 transition-all  "
                    />
                  </div>
                  <p className=" text-[8px] md:text-xs  capitalize">
                    {product?.category}{" "}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default ProductCategoryList;
