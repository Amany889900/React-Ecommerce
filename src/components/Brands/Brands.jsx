import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { FallingLines } from 'react-loader-spinner'; 
import axios from "axios";


const Brands = () => {

  const {data,isLoading} = useQuery("brands",getAllBrands)

  async function getAllBrands(){
      return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
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
    <div className="flex flex-wrap justify-center items-center">
    {data?.data.data.map(function(brand, idx){return  <div key ={idx} className="w-full sm:w-full md:w-1/3 lg:w-1/4 p-4">
    
    <div className="bg-slate-100 p-3">
    <Link to={`/brandDetails/${brand._id}`}>
     <img src={brand.image} className = "w-full h-[300px]" alt="" />
  
     <h3 className="mt-3 text-black-700 text-center font-bold text-2xl">{brand.name}</h3>
     
     {/* <h3 className="mt-3">{product.title.split(" ").slice(0,2).join(" ")}</h3>
     <div className="mt-3 mb-3 flex flex-wrap justify-between items-center">
  
       <div>
         <h2>{product.price} EGP</h2>
       </div>
  
       <div>
         <i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}
       </div>
  
     </div> */}
     </Link>
     {/* <button onClick={function(){AddToCart(product.id)}} className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
       Add to Cart
        </button>
        <button onClick={function(){AddToWishlist(product.id);
          clicked=1;
        }} className='flex justify-end w-full'><i className="fa-solid fa-heart text-2xl"></i></button> */}
    </div>
   
    
   </div> })}
  </div>
  )
}

export default Brands