import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Navbar/>
 
    <Outlet/>

    <footer className="mt-7 p-6 text-center text-4xl">
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="#" class="hover:underline">Ecommerce™</a>. All Rights Reserved.</span>
    </footer>
    </>
  )
}

export default Layout