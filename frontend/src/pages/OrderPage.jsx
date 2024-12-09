import React, { useEffect, useState } from "react";
import SummaryApi from "../common/Domaim&Api";
import moment from "moment";
import DisplayINRCurrency from "../helpers/DisplayCurrency";

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();
    setData(responseData?.data);
    console.log("order list", responseData.data);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <div className=" w-full h-[calc(100vh-132px)] overflow-y-scroll scroll-bar p-1 mt-5">
      {!data[0] && <p className=" text-center font-bold mt-10">No Order Available</p>}
      <div>
        {data?.map((item, index) => {
          return (
            <div key={item.userId + index} className=" p-4">
              <p className=" font-medium text-lg text-end">
                {" "}
                {moment(item?.createdAt).format("l")}
              </p>
              <div className=" border rounded-sm ">
                <div className=" flex flex-col  lg:flex-row justify-between ">
                  <div className=" grid gap-2">
                    {item?.productDetails?.map((product, index) => {
                      return (
                        <div
                          key={product.productId + index}
                          className=" flex gap-3 "
                        >
                          <img
                            src={product?.images[0]}
                            alt=""
                            className=" w-28 h-28 object-scale-down p-2  mix-blend-multiply  "
                          />
                          <div className=" pt-4 lg:pt-1">
                            <div className=" font-medium text-lg text-ellipsis line-clamp-1">
                              {" "}
                              {product?.name}{" "}
                            </div>
                            <div className=" flex items-center gap-5 mt-1">
                              <div className=" text-red-600">
                                {" "}
                                {DisplayINRCurrency(product?.price)}{" "}
                              </div>
                              <p> Qty : {product.quantity} </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className=" flex flex-col gap-2 min-w-[320px] mt-2">
                    <div>
                      <div>Payment Details :-</div>
                      <p>
                        Payment method :{" "}
                        {item?.paymentDetails?.payment_method_type[0]}{" "}
                      </p>
                      <p>
                        Payment status : {item?.paymentDetails?.payment_status}{" "}
                      </p>
                    </div>
                    <div>
                      <div>Shipping Details</div>
                      {item?.shipping_options.map((shipping,index) => {
                        return (
                          <div>
                            Shipping Amount : {shipping?.shipping_amount}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className=" font-semibold ml-auto w-fit lg:text-lg my-2">Total Amount : {item.totalAmount}</div>
              </div >
             
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
