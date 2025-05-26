import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPannel from "../pages/AdminPannel";
import AllUser from "../pages/AllUser";
import AllProducts from "../pages/AllProducts";
import ProductCategoryPage from "../pages/ProductCategoryPage";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import AllOrders from "../pages/AllOrders";
import UpdatePassword from "../pages/UpdatePassword";
import FarmerPannel from "../pages/FarmerPannelPage";
import AllFarmers from "../pages/AllFarmers";


const router  = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children : [
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/forgotPassword',
                element:<ForgotPassword/>
            },
            {
                path:'/reset-password/:id/:token',
                element:<UpdatePassword/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
            {
                path:'/product-category-page',
                element:<ProductCategoryPage/>
            },
            {
                path:'/product/:id',
                element:<ProductDetails/>
            },
            {
                path:'/cart',
                element:<Cart/>
            },
            {
                path:'/success',
                element:<Success/>
            },
            {
                path:'/cancel',
                element:<Cancel/>
            },
            {
                path:'/search',
                element:<SearchProduct/>
            },
            {
                path:'/order',
                element:<OrderPage/>
            },
          

            {
                path:'/admin-panel',
                element:<AdminPannel/>,
                children:[
                    {
                        path:'all-users',
                        element:<AllUser/>
                    },
                    {
                        path:'all-farmers',
                        element:<AllFarmers/>
                    },
                    {
                        path:'all-product',
                        element:<AllProducts/>
                    },
                    {
                        path:'all-order',
                        element:<AllOrders/>
                    },
                ]
            },
            {
                path: '/farmer-pannel',
                element: <FarmerPannel/>,
                children: [
                    {
                        path:'all-product',
                        element:<AllProducts/>
                    },
                ]
            }
           

        ]
    },
    
])

export default router;