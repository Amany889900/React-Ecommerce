import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

const  WishlistContextProvider = ({children}) => {
    const {token} = useContext(AuthContext);
    const [wishProducts,setWishProducts] = useState({});
    // const [numOfItems,setNumOfItems] = useState(0);
    // const [totalPrice,setTotalPrice] = useState(0);
    const [Loading,setLoading] = useState(false);

    const [wishlistId,setWishlistId] = useState(null);

    async function getUserWishlist(){
        setLoading(true);
        try{
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
                headers:{
                    token:localStorage.getItem("tkn")
                }
            });
            // setNumOfItems(data.numOfCartItems);
            setWishProducts(data.data);
            // setTotalPrice(data.data.totalCartPrice);
            setLoading(false);
            setWishlistId(data?.data?._id);
            return data
         } catch(error){
             console.log(error,"getAllWishlist context ");
             setLoading(false);
         }
    }

    useEffect(function(){
        if(token !== null){
            getUserWishlist();
           }
    },[token]);

    async function addProductToWishlist(id){
        try{
           const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
            {
                productId: id
                
            },
            {
               headers:{
                token:localStorage.getItem("tkn")
               }
            }
           );
           getUserWishlist();
           return data
        } catch(error){
            console.log(error,"error from add product to wishlist context");
        }
    }

   
//     async function updateCount(id,count){
//         try{
//  const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
//     count:count
//  },
// {
//     headers:{
//         token:localStorage.getItem("tkn") 
//     }
// });
// setNumOfItems(data.numOfCartItems);
// setProducts(data.data.products);
// setTotalPrice(data.data.totalCartPrice);
//         }catch(error){
//             console.log(error,"error from updateCount in context");
//         }
//     }

    async function removeItem(id){
        try{
          const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers:{
                token:localStorage.getItem("tkn")
            }
          });
        //   setNumOfItems(data.numOfCartItems);
          setWishProducts(data.data);
        //   setTotalPrice(data.data.totalCartPrice);
        }catch(error){
            console.log(error,"error from removeItem in wishlist context");
        }
    }

    // async function clearCart(){
    //     try {
    //         const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                 
    //             headers:{
    //                token:localStorage.getItem("tkn")
    //             }
                 
    //         }
    //             );
    //             setNumOfItems(data.numOfCartItems);
    //       setProducts([]);
    //       setTotalPrice(data.data.totalCartPrice);
    //     } catch (error) {
    //         console.log(error,"error from clear cart in context");
            
    //     }
    // }
  return (
 <WishlistContext.Provider value={
    {addProductToWishlist,
        // numOfItems,
        // totalPrice,
        wishProducts,
        Loading,
        // updateCount,
        removeItem,
        // clearCart,
        wishlistId,
        // setNumOfItems,
        setWishProducts,
        getUserWishlist
        // setTotalPrice
    }
 }>
    {children}
 </WishlistContext.Provider>
  )
}

export default WishlistContextProvider