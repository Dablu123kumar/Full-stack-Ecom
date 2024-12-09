import React, { useContext, useState } from "react";
// import Logo from "./Logo";
import Logo from "../assest/logo2.png";
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/Domaim&Api";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/UserSlice";
import ROLE from "../common/Role";
import Context from "../context/ContextApi";


function Header() {
  const user = useSelector((state) => state?.user?.user);
  //console.log('userrole',user.role)
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState();
  const context = useContext(Context)
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll('q')
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/')
    } else {
      toast.error(data.message);
    }
  };

  const handleSearch = (e)=>{
          const {value} = e.target
          setSearch(value)
          if(value){
            navigate(`/search?q=${value}`)
          }
          else{
            navigate('/search')
          }
  }

  return (
    <header className="shadow-md bg-white fixed z-40 w-full">
      <div className=" h-full container mx-auto flex items-center justify-between px-4 lg:px-1">
        <div className="  lg:h-20 lg:w-40 h-16 w-32">
          <Link to="/">
            
            <img src={Logo} alt="Logo"  className=" h-full w-full object-scale-down mix-blend-multiply" />
          </Link>
        </div>
        <div className=" hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
          onChange={handleSearch}
          value={search}
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none bg-inherit "
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer">
            <IoSearch />
          </div>
        </div>

        <div className=" flex items-center gap-7">
          <div className="relative  flex justify-center ">
            {
              user?._id && (
              <div
              onClick={() => setMenuDisplay(!menuDisplay)}
              className="text-3xl cursor-pointer h-10 w-10"
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt={user?.name}
                  className=" h-full w-full rounded-full"
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
              )
            }
            {menuDisplay && (
              <div className=" absolute bg-white bottom-0 top-11 h-fit p-2  rounded-lg shadow-lg hidden md:flex">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="/admin-panel/all-product"
                      className=" whitespace-nowrap hover:bg-slate-200 p-2 "
                      onClick={() => setMenuDisplay(!menuDisplay)}
                    >
                      Admin Panel
                    </Link>
                  )}
                 
                  {user?.role === ROLE.FARMER && (
                    <Link
                      to="/farmer-pannel/all-product"
                      className=" whitespace-nowrap hover:bg-slate-200 p-2 "
                      onClick={() => setMenuDisplay(!menuDisplay)}
                    >
                      Farmer Panel
                    </Link>
                  )}
               
                   <Link to={'/order'} className=" whitespace-nowrap hover:bg-slate-200 p-2 " onClick={() => setMenuDisplay(!menuDisplay)}>Order</Link>
                </nav>
              </div>
            )}
          </div>
          {
            user?._id && (
              <Link to={'/cart'} className="text-2xl cursor-pointer relative border  border-gray-900 rounded-full p-1">
              <span>
                <FaShoppingCart />
              </span>
              <div className=" bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full absolute -top-1 -right-2">
                <p className="text-sm">{context?.cartProductCount} </p>
              </div>
            </Link>
            )
          }
         
          <div>
            {user?._id ? (
              <button
                className=" px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-800 "
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className=" px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-800 "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
