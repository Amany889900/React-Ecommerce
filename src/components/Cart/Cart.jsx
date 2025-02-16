import { useContext } from "react"
import img2 from "./../../assets/images/grocery-banner.png"
import { CartContext } from "../../Context/CartContext"
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Cart = () => {
  // if(localStorage.getItem("tkn") == null){
  //   return <h1>RW7</h1>
  // }

  const {Products,totalPrice,Loading,updateCount,removeItem, clearCart} = useContext(CartContext);
  if(Loading){
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
    <div className='p-5 mx-auto md:w-[90%] mt-5 bg-slate-100'>
        {Products?.length == 0 ?<h1 className="text-center text-4xl text-green-700 py-5">NO DATA TO DISPLAY</h1>:
        <>
        <h1 className='font-bold text-2xl mb-3'>Shop Cart</h1>
        <h2 className='font-mono text-green-600'>Total Price: {totalPrice} EGP</h2>
        <div>
        <button onClick={clearCart} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Clear Cart</button>
        <Link to="/payment" className="focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Payment</Link>
        </div>

        <div className='parent mt-3'>
          {Products?.map(function(item,idx){
            return  <div key={idx} className='child flex flex-wrap justify-center items-center pb-3 border-b-[1px] border-slate-500 border-dotted '>
            <div className='w-1/6 p-4'>
              <img src={item.product.imageCover} className="w-full" alt="" />
            </div>

            <div className="w-4/6 p-4">
                <h2 className="text-3xl font-bold">{item.product.title}</h2>
                <h3 className="my-3 text-green-600">{item.price} EGP</h3>
                <button onClick={()=>{
                  removeItem(item.product._id)
                }} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Remove</button>
              </div>

             
              <div className='w-1/6 p-4 flex flex-wrap justify-center items-center'>
              <button onClick = {()=> updateCount(item.product._id,item.count+1)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">+</button>
              <h3 className="mx-1">{item.count}</h3>
              <button onClick = {()=> updateCount(item.product._id,item.count-1)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">-</button>
        
            </div>
          </div>
          })}
         
        </div>
        </>}
    </div>
  )
}

export default Cart