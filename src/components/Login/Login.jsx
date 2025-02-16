import {useFormik} from 'formik'
import * as Yup from 'yup';
import axios from './../../../node_modules/axios/lib/axios';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useContext, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
const Login = () => {

  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const {setToken} = useContext(AuthContext);
  const user = {

  
    email:"",
    password:"",
    

  }
  

  const validYup = Yup.object().shape(
    {

     
      email:Yup.string().required("Email is Required").email("Enter a valid email"),
      password:Yup.string().required("Password is Required").matches(/^[A-Z][a-z0-9]{6,}$/,"Password must start with a capital letter ")
      
  
    }
  )

  async function signIn(values){
   setisLoading(true);
    // console.log(values);
    try{
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values);
      toast.success(data.message);
      localStorage.setItem("tkn",data.token);
      setToken(data.token);
      //login
      navigate("/");
      setisLoading(false);
    } catch(e){
      toast.error(e.response.data.message);
      setisLoading(false);
    }

    
    
  }

 

  const formik = useFormik({
    initialValues: user,
    onSubmit: signIn,
    validationSchema: validYup
  })

  return (
    <div className="py-7">
       <div className="container mx-auto">
        <h1 className="text-green-700 text-6xl font-bold text-center mb-12">Login Now</h1>
        
        <div className="w-[60%] mx-auto">
        <form onSubmit={formik.handleSubmit}>
            
      


       {/* email input */}
       <div className="relative z-0 w-full mb-7 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      </div>

      {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">Error! </span> {formik.errors.email}
     </div>:""}

      
      

      {/* password input */}
      <div className="relative z-0 w-full mb-7 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      </div>

      {formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">Error! </span> {formik.errors.password}
     </div>:""}

      

      <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoading?<i className="fa-solid fa-spin fa-spinner text-white"></i>:"Login"} 
      </button>
       <Link onClick={function(){
        navigate("/forgotPasswords")
       }} className='flex justify-end text-2xl hover:text-green-600'>Forgot password?</Link>
        </form>
        </div>
        
       </div>
    </div>
  )
}

export default Login