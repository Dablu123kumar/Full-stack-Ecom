import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/Role";

function AdminPannel() {
  const user = useSelector((state) => state?.user?.user);

  const navigate = useNavigate()
  useEffect(() => {
    if(user?.role !== ROLE.ADMIN){
        navigate('/')
    }
  },[user])
  return (
    <div className=" min-h-[calc(100vh-135px)] max-h-[calc(100vh-135px)] md:flex hidden mt-5">
      <aside className=" bg-white min-h-full w-full max-w-60 customShadow">
        <div className=" h-32  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer flex justify-center   ">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className=" h-16 w-16 rounded-full "
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className=" capitalize text-lg font-semibold">{user?.name} </p>
          <p className=" text-sm font-light"> {user?.role} </p>
        </div>
        {/* ////navigation  */}
        <div>
          <nav className=" flex flex-col p-3">
            <Link
              to={"all-users"}
              className=" px-2 py-1 hover:bg-slate-200 rounded-lg"
            >
              All Users
            </Link>
            <Link
              to={"all-farmers"}
              className=" px-2 py-1 hover:bg-slate-200 rounded-lg"
            >
              All Farmers
            </Link>
            <Link
              to={"all-product"}
              className=" px-2 py-1 hover:bg-slate-200 rounded-lg"
            >
              All Products
            </Link>
            <Link to={'all-order'} className=" px-2 py-1 hover:bg-slate-200 rounded-lg">All Orders</Link>
          </nav>
        </div>
      </aside>
      <main className=" w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPannel;
