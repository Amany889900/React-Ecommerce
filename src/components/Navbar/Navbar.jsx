import React, { useContext } from 'react'
import logoImg from './../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'
const Navbar = () => {
   const {numOfItems} = useContext(CartContext);
  const {token,setToken} = useContext(AuthContext);
  const navigate = useNavigate();
  function logOut(){
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/login");
  }
    return (
    <nav className='p-4 bg-gray-100 text-center'>
     <div className="container mx-auto p-2">
        <div className='flex flex-wrap flex-col md:flex-row justify-between'>
            <div className='flex flex-wrap flex-col md:flex-row justify-between'>
                <img src={logoImg} alt="" className='w-[120px] text-center m-auto' />
                <ul className='flex flex-wrap flex-col md:flex-row justify-between'>
                  
                    {token?<>
                        <li className='mx-2 my-2 md:my-0'>
                        <NavLink to="/">Home</NavLink>
                    </li>
                                     
                    

                    <li className='mx-2 my-2 md:my-0'>
                        <NavLink to="/brands">Brands</NavLink>
                    </li>

                    <li className='mx-2 my-2 md:my-0'>
                        <NavLink to="/category">Category</NavLink>
                    </li>
                    <li className='mx-2 my-2 md:my-0 relative'>
                        <NavLink to="/cart">Cart
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-4">{numOfItems}</div>
                        </NavLink>
                    </li>

                    <li className='mx-2 my-2 md:my-0 relative'>
                        <NavLink to="/allorders">All Orders
                        
                        </NavLink>
                    </li>

                    <li className='mx-2 my-2 md:my-0 relative'>
                        <NavLink to="/wishlist">Wishlist
                        
                        </NavLink>
                    </li>
                    </>:""}
                    
                </ul>
            </div>

            <div className='flex flex-wrap flex-col md:flex-row justify-between'>
                <div>

                <i className='fa-brands fa-facebook-f ml-1'></i>
                <i className='fa-brands fa-facebook-f ml-1'></i>
                <i className='fa-brands fa-facebook-f ml-1'></i>
                <i className='fa-brands fa-facebook-f ml-1'></i>
                
                </div>
             

             <ul className='flex flex-wrap flex-col md:flex-row justify-between'>
                  
                    {token?<>
                        <li className='mx-2 my-2 md:my-0'>
                        
                    </li>
                    </>:<>
                    <li className='mx-2 my-2 md:my-0'>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                                     
                    <li className='mx-2 my-2 md:my-0'>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                    
                    </>}

                
                </ul>
             
            </div>
        </div>
     </div>
    </nav>
  )
}

export default Navbar

// plugins => tailwind