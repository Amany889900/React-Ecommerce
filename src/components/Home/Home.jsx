import axios from 'axios/unsafe/axios.js';
import React, { useContext, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'; 
import Category from './../Category/Category';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link, useParams } from 'react-router-dom';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { AuthContext } from "../../Context/AuthContext";

const MyComponent = () => {
  return (
    <div>
      <FallingLines
        color="blue"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};



const Home = () => {
  // if(localStorage.getItem("tkn") == null){
  //   return <h1>RW7</h1>
  // }
  const {token} = useContext(AuthContext);
  const {addProductToCart} = useContext(CartContext);
  const {addProductToWishlist,removeItem,wishProducts} = useContext(WishlistContext);


  const [addedProducts, setAddedProducts] = useState(wishProducts);

  // useEffect(() => {
  //   setAddedProducts(wishProducts);
  // }, []);
    const [loading,setLoading] = useState(false);
   async function AddToCart(id){
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
  
   async function AddToWishlist(id){
    setLoading(true);
      const data = await addProductToWishlist(id);
     
      if(data.status == "success"){
        setAddedProducts((prev) => ({
          ...prev,
          [id]: !addedProducts[id], // Toggle the state for the clicked product
        }));
    
        if (!addedProducts[id]) {
          toast.success(data.message);
          setLoading(false);
        } else {
          toast.success("Item Removed from wishlist");
          removeItem(id);
          setLoading(false);
        }
      } else {
        toast.error("error");
        setLoading(false);
      }
    }
    
   
 
  async function getAllProduct(){
    
    return await axios.get(" https://ecommerce.routemisr.com/api/v1/products");
     
  }

  const {isLoading,error,data,isFetching,refetch} = useQuery("products",getAllProduct,{
    // refetchOnMount:false,
    // enabled:false
  });

  // console.log(x);

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
    <>
   {/* <button onClick={refetch} className='bg-red-300 w-full'>fetch</button> */}
   <div className="md:w-[90%] mx-auto">
  <HomeSlider/>
  <CategorySlider/>
<div className="flex flex-wrap justify-center items-center">
  {data?.data.data.map(function(product, idx){return  <div key ={idx} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-4">
  
  <div className="bg-slate-100 p-3">
  <Link to={`/productDetails/${product.id}`}>
   <img src={product.imageCover} className = "w-full" alt="" />

   <h3 className="mt-3 text-green-700">{product.category.name}</h3>
   
   <h3 className="mt-3">{product.title.split(" ").slice(0,2).join(" ")}</h3>
   <div className="mt-3 mb-3 flex flex-wrap justify-between items-center">

     <div>
       <h2>{product.price} EGP</h2>
     </div>

     <div>
       <i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}
     </div>

   </div>
   </Link>
   <button onClick={function(){AddToCart(product.id)}} className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
     Add to Cart
      </button>
      <button onClick={function(){AddToWishlist(product.id);
      }} className='flex justify-end w-full'><i className={`fa-solid fa-heart text-2xl ${addedProducts[product.id] ? "text-red-700" : ""}`}></i></button>
  </div>
 
  
 </div> })}
</div>

</div>  
    
   
   
    
    </>
  )
}

export default Home