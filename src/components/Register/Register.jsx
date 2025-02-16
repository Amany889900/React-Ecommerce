import {useFormik} from 'formik'
import * as Yup from 'yup';
import axios from './../../../node_modules/axios/lib/axios';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useState} from "react";
import { useNavigate } from 'react-router-dom';
const Register = () => {

  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  const user = {

    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""

  }
  

  const validYup = Yup.object().shape(
    {

      name:Yup.string().required("Name is Required").min(3, "min chars 3").max(15, "max chars 15"),
      email:Yup.string().required("Email is Required").email("Enter a valid email"),
      password:Yup.string().required("Password is Required").matches(/^[A-Z][a-z0-9]{6,}$/,"Password must start with a capital letter "),
      rePassword:Yup.string().required("Re-Password is Required").oneOf([Yup.ref("password")],"Re-Password does not match original one"),
      phone:Yup.string().required("Phone is Required").matches(/^01[0125][0-9]{8}$/,"Enter an Egyptian number")
  
    }
  )

  async function signUp(values){
   setisLoading(true);
    // console.log(values);
    try{
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values);
      toast.success(data.message);
      //login
      navigate("/login");
      setisLoading(false);
    } catch(e){
      toast.error(e.response.data.message);
      setisLoading(false);
    }

    
    
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: signUp,
    validationSchema: validYup
  })

  return (
    <div className="py-7">
       <div className="container mx-auto">
        <h1 className="text-green-700 text-6xl font-bold text-center mb-12">Register Now</h1>
        
        <div className="w-[60%] mx-auto">
        <form onSubmit={formik.handleSubmit}>
            {/* name input */}
      <div className="relative z-0 w-full mb-7 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
      </div>
      
      {formik.errors.name && formik.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">Error! </span> {formik.errors.name}
     </div>:""}
      


       {/* email input */}
       <div className="relative z-0 w-full mb-7 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      </div>

      {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">Error! </span> {formik.errors.email}
     </div>:""}

      
      {/* phone input */}
      <div className="relative z-0 w-full mb-7 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
      </div>

      {formik.errors.phone && formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">Error! </span> {formik.errors.phone}
     </div>:""}

      {/* password input */}
      <div className="relative z-0 w-full mb-7 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      </div>

      {formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">Error! </span> {formik.errors.password}
     </div>:""}

      {/* rePassword input */}
      <div className="relative z-0 w-full mb-7 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RePassword</label>
      </div>

      {formik.errors.rePassword && formik.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">Error! </span> {formik.errors.rePassword}
     </div>:""}

      <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoading?<i className="fa-solid fa-spin fa-spinner text-white"></i>:"Register"} 
      </button>

        </form>
        </div>
        
       </div>
    </div>
  )
}

export default Register