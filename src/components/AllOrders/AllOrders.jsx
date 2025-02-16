import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import {jwtDecode} from 'jwt-decode';
import { useQuery } from "react-query";

const AllOrders = () => {
   const {id} = jwtDecode(localStorage.getItem("tkn"));
  

   const {isLoading,data} = useQuery("allOrders",getAllOrders)

   async function getAllOrders(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
   }

   if(isLoading){
       return <div className="h-screen flex flex-wrap justify-center items-center bg-green-700">
       <FallingLines
     color="#fff"
     width="100"
     visible={true}
     ariaLabel="falling-circles-loading"
     />
       </div> 
     }
  return (
    <div className="py-10 px-5 md:w-[80%] mx-auto">
        {data?.data.map(function(order,idx){return <div key={idx} className="p-6 mb-3 bg-slate-200">
            <h2>total Order Price: {order.totalOrderPrice} EGP</h2>
            <h2>payment Method Type: {order.paymentMethodType} EGP</h2>
           
           <div className="flex flex-wrap justify-center items-center">
           {order.cartItems?.map(function(item,idx){return <div key={idx} className="p-2 w-1/6">
            <img src={item.product.imageCover} className="w-full" alt="" />
           </div>})}
           </div>
       
        </div>})}
    </div>
  )
}

export default AllOrders