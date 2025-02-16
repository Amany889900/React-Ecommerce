import { useQuery } from "react-query";
import img2 from "./../../assets/images/grocery-banner.png"
import axios from "axios";
import { FallingLines } from 'react-loader-spinner'; 
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from './../../../node_modules/react-hot-toast/src/index';

const ProductDetails = () => {

    const {addProductToCart} = useContext(CartContext);
    const {id} = useParams();

    const [loading,setLoading] = useState(false);
   async function AddToCart(){
    setLoading(true);
      const data = await addProductToCart(id);
     
      if(data.status == "success"){
        toast.success(data.message);
        setLoading(false);
      }else{
        toast.error("error");
        setLoading(false);
      }
    }
    
   

   const {data, isLoading} = useQuery(`productDetails${id}`,getProductsDetails)

    async function getProductsDetails(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
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
    <div className="md:w-[80%]  mx-auto">
      <div className="flex flex-wrap justify-center items-center">
        <div className="md:w-1/3 p-5">
          <div>
            <img src={data.data.data.imageCover} className="w-full" alt="" />
          </div>
          </div>

          <div className="md:w-2/3 p-5">

         <div>
           <h1 className="text-3xl font-bold mb-3">{data.data.data.title}</h1>
           <p className="mb-3">{data.data.data.description}</p>
           <h3 className="mb-3">{data.data.data.category.name}</h3>

           <div className="mt-3 mb-3 flex flex-wrap justify-between items-center">

     <div>
       <h2>{data.data.data.price} EGP</h2>
     </div>

     <div>
       <i className="fa-solid fa-star text-yellow-500"></i> {data.data.data.ratingsAverage}
     </div>

   </div>
         </div>
        
          
          <button onClick={AddToCart} className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
     {loading?<i className="fa-solid fa-spin fa-spinner text-white"></i>:"Add to Cart"} 
      </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails