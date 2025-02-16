import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const {token} = useContext(AuthContext);
    const [Products,setProducts] = useState([]);
    const [numOfItems,setNumOfItems] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [Loading,setLoading] = useState(false);

    const [cartId,setCartId] = useState(null);

    async function addProductToCart(id){
        try{
           const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
            {
                productId: id
                
            },
            {
               headers:{
                token:localStorage.getItem("tkn")
               }
            }
           );
           getUserCart();
           return data
        } catch(error){
            console.log(error,"error from add product to cart context");
        }
    }

    async function getUserCart(){
        setLoading(true);
        try{
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
                headers:{
                    token:localStorage.getItem("tkn")
                }
            });
            setNumOfItems(data.numOfCartItems);
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
            setLoading(false);
            setCartId(data?.data?._id);
            return data
         } catch(error){
             console.log(error,"getAllCart context ");
             setLoading(false);
         }
    }
    useEffect(function(){
        if(token !== null){
            getUserCart();
           }
    },[token]);

    async function updateCount(id,count){
        try{
 const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    count:count
 },
{
    headers:{
        token:localStorage.getItem("tkn") 
    }
});
setNumOfItems(data.numOfCartItems);
setProducts(data.data.products);
setTotalPrice(data.data.totalCartPrice);
        }catch(error){
            console.log(error,"error from updateCount in context");
        }
    }

    async function removeItem(id){
        try{
          const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers:{
                token:localStorage.getItem("tkn")
            }
          });
          setNumOfItems(data.numOfCartItems);
          setProducts(data.data.products);
          setTotalPrice(data.data.totalCartPrice);
        }catch(error){
            console.log(error,"error from removeItem in context");
        }
    }

    async function clearCart(){
        try {
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                 
                headers:{
                   token:localStorage.getItem("tkn")
                }
                 
            }
                );
                setNumOfItems(data.numOfCartItems);
          setProducts([]);
          setTotalPrice(data.data.totalCartPrice);
        } catch (error) {
            console.log(error,"error from clear cart in context");
            
        }
    }
  return (
 <CartContext.Provider value={
    {addProductToCart,
        numOfItems,
        totalPrice,
        Products,
        Loading,
        updateCount,
        removeItem,
        clearCart,
        cartId,
        setNumOfItems,
        setProducts,
        setTotalPrice
    }
 }>
    {children}
 </CartContext.Provider>
  )
}

export default CartContextProvider