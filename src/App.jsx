import React from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Category from './components/Category/Category'
import Brands from './components/Brands/Brands'
import Error from './components/Error/Error'
import Layout from './components/Layout/Layout'
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';
import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import Payment from './components/Payment/Payment'
import AllOrders from './components/AllOrders/AllOrders'
import Wishlist from './components/Wishlist/Wishlist'
import WishlistContextProvider, { WishlistContext } from './Context/WishlistContext'
import CategoryDetails from './components/CategoryDetails/CategoryDetails'
import BrandDetails from './components/BrandDetails/BrandDetails'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode'

const App = () => {
  const x = new QueryClient();
const router = createHashRouter([
  {path:"", element: <Layout/>, children: [
  {path:"/", element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path:"/cart", element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {path:"/productDetails/:id", element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path:"/categoryDetails/:_id", element:<CategoryDetails/>},
  {path:"/brandDetails/:_id", element:<BrandDetails/>},
  {path:"/forgotPasswords", element:<ForgetPassword/>},
  {path:"/verifyResetCode", element:<VerifyResetCode/>},
  {path:"/login", element:<Login/>},
  {path:"/register", element:<Register/>},
  {path:"/category", element:<ProtectedRoute><Category/></ProtectedRoute>},
  {path:"/brands", element:<ProtectedRoute><Brands/></ProtectedRoute>},
  {path:"/payment", element:<ProtectedRoute><Payment/></ProtectedRoute>},
  {path:"/allorders", element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
  {path:"/wishlist", element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
  {path:"*", element:<Error/>},
]}
])
  return (
    <>
    <QueryClientProvider client={x} >
    <AuthContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
    <Toaster/>
    <RouterProvider router={router} />
    </WishlistContextProvider>
    </CartContextProvider>
    </AuthContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App