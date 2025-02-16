import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';


const Payment = () => {
    const {cartId,setNumOfItems,setProducts,setTotalPrice} = useContext(CartContext);
    const [phone,setPhone] = useState("");
    const [details,setDetails] = useState("");
    const [city,setCity] = useState("");
    const [loading,setLoading] = useState(false);
    async function cashOrder(){
        setLoading(true);
        const x ={
            shippingAddress:{
                details:details,
                phone:phone,
                city:city
            }
            
        }
        
        try{
          const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,x,{
            headers:{
                token:localStorage.getItem("tkn")
            }
          });
        setNumOfItems(0);
        setTotalPrice(0);
        setProducts([]);
        setLoading(false);
        }catch(error){
        console.log(error);
        setLoading(false);
        }
    }

    async function onlineOrder(){
       
        const x ={
            shippingAddress:{
                details:details,
                phone:phone,
                city:city
            }
            
        }
        
        try{
          const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,x,{
            headers:{
                token:localStorage.getItem("tkn")
            },
            params:{
                url:"http://localhost:5173"
            }
          });
        window.open(data.session.url);
        
        }catch(error){
        console.log(error);
        setLoading(false);
        }
    }
  return (
    <div className='py-10 md:w-[60%] mx-auto px-5'>
       {/* details input */}
      <div className="relative z-0 w-full mb-7 group">
      <input onChange={(e)=>setDetails(e.target.value)} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
      </div>
       
       {/* phone input */}
      <div className="relative z-0 w-full mb-7 group">
      <input onChange={(e)=>setPhone(e.target.value)} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
      </div>

       {/* city input */}
       <div className="relative z-0 w-full mb-7 group">
      <input onChange={(e)=>setCity(e.target.value)} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
      </div>

      <button onClick={cashOrder} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {loading? <i className='fa-solid fa-spin fa-spinner text-white '></i>:"Cash Payment"}
      </button>

      <button onClick={onlineOrder} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {loading? <i className='fa-solid fa-spin fa-spinner text-white '></i>:"Online Payment"}
      </button>
    </div>
  )
}

export default Payment