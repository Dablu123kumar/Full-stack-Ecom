import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common/Domaim&Api";
import Context from "../context/ContextApi";
import { MdDelete } from "react-icons/md";
import DisplayINRCurrency from "../helpers/DisplayCurrency";
import { loadStripe } from "@stripe/stripe-js";
import REACT_APP_STRIPE_PUBLIC_KEY from "../stripe/Stripe";
import {Link} from 'react-router-dom'
import emptyCartImg from '../assest/emptycart.jpg'
const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);
  const fetchData = async () => {
    const response = await fetch(SummaryApi.viewCartProduct.url, {
      method: SummaryApi.viewCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    if (responseData?.success) {
      setData(responseData?.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };
  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQuantity = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQuantity = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const handlePayment = async () => {
    const stripePromise = await loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });
    const responseData = await response.json();
    if (responseData?.data?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData?.data?.id });
      fetchData()
    }
    // console.log('resonsedata',responseData?.data?.id)
  };

  const totalQuantity = data?.reduce(
    (prev, current) => prev + current.quantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className=" container mx-auto p-4">
      {data.length === 0 && (
        <div className=" flex justify-center items-center  text-lg my-3 min-h-[71vh]  ">
        {data.length === 0 && !loading && (
         <div className=" relative h-80 w-72 bg-white ">
           <img src={emptyCartImg} alt="Empty cart image" className=" h-full w-full my-2 " />
            <div className=" absolute top-0 left-0 right-0 font-bold mx-2">
               <p className=" text-center text-2xl">Empty Cart</p>
          <Link to={'/'} className="   text-green-600"> Click Here to add product to cart  </Link>
            </div>
         </div>
        )}
      </div>
      )}
       {
        data && data.length > 0 && (
      <div className="flex flex-col lg:flex-row lg:justify-between gap-10 px-4 min-h-[calc(100vh-145px)]  ">
        {/* // view product // */}
        <div className="  max-h-[calc(100vh-160px)] w-full max-w-3xl overflow-y-scroll scroll-bar">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className=" w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id}
                    className=" w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className=" w-32 h-32 bg-slate-200 px-2 py-1">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt=""
                        className=" w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className=" capitalize px-4 py-2 space-y-0.5 relative">
                      {/* // delete product // */}
                      <div
                        className=" absolute right-0 text-red-600 text-xl rounded-full cursor-pointer hover:bg-red-600 hover:text-white p-1"
                        onClick={() => deleteProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className=" text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}{" "}
                      </h2>
                      <p className=" text-slate-500">
                        {product?.productId?.category}{" "}
                      </p>
                      <div className=" flex flex-row justify-between">
                        <p className=" text-red-600 font-medium text-lg">
                          {DisplayINRCurrency(product?.productId?.sellingPrice)}{" "}
                        </p>
                        <p className=" text-slate-600 font-semibold text-lg">
                          {DisplayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}{" "}
                        </p>
                      </div>
                      <div className=" flex items-start gap-3 ">
                        <button
                          className=" flex items-center justify-center border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium rounded-full w-6 h-6"
                          onClick={() =>
                            decreaseQuantity(product?._id, product?.quantity)
                          }
                        >
                          {" "}
                          -{" "}
                        </button>
                        <span className=" font-medium">
                          {product?.quantity}{" "}
                        </span>
                        <button
                          className=" flex items-center justify-center border border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-medium rounded-full w-6 h-6"
                          onClick={() =>
                            increaseQuantity(product?._id, product?.quantity)
                          }
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {/* // total product // */}

        {data[0] && (
          <div className="  lg:mt-0 w-full max-w-sm p-4">
            {loading ? (
              <div className=" h-36 bg-slate-200 border border-e-slate-300 animate-pulse "></div>
            ) : (
              <div className=" h-36 bg-white ">
                <h2 className=" text-white bg-red-600 px-4 py-1"> Summary</h2>
                <div className=" flex items-center justify-between px-4 py-1 font-semibold text-lg text-slate-600">
                  <p>quantity</p>
                  <p> {totalQuantity} </p>
                </div>
                <div className=" flex items-center justify-between px-4 py-1 font-semibold text-lg text-slate-600">
                  <p>Total Price </p>
                  <p>{DisplayINRCurrency(totalPrice)} </p>
                </div>
                <button
                  className=" bg-blue-600 p-2 text-white w-full"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
        )}
    </div>
  );
};

export default Cart;
