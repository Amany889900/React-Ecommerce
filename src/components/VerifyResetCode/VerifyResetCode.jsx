import {useFormik} from 'formik'
import * as Yup from 'yup';
import axios from './../../../node_modules/axios/lib/axios';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useContext, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
const VerifyResetCode = () => {

  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
//   const {setToken} = useContext(AuthContext);
  const user = {

  
    resetCode:"",

  }
  

  const validYup = Yup.object().shape(
    {

     
        resetCode: Yup.string()
    .matches(/^\d{6}$/, "Reset code must be exactly 6 digits") // Adjust length if needed
    .required("Reset code is required"),
     
      
  
    }
  )

  async function verify(values){
   setisLoading(true);
    // console.log(values);
    try{
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values);
      toast.success(data.message);
      //login
      navigate("/resetPassword");
      setisLoading(false);
    } catch(e){
      toast.error(e.response.data.message);
      setisLoading(false);
    }

    
    
  }

 

  const formik = useFormik({
    initialValues: user,
    onSubmit: verify,
    validationSchema: validYup
  })

  return (
    <div className="py-7">
       <div className="container mx-auto">
        <h1 className="text-green-700 text-6xl font-bold text-center mb-12">Password Reset</h1>
        
        <div className="w-[60%] mx-auto">
        <form onSubmit={formik.handleSubmit}>
            
      


       {/* resetCode input */}
       <div className="relative z-0 w-full mb-7 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="resetCode" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">resetCode</label>
      </div>

      {formik.errors.resetCode && formik.touched.resetCode?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">Error! </span> {formik.errors.resetCode}
     </div>:""}

      
      

     

     

      <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoading?<i className="fa-solid fa-spin fa-spinner text-white"></i>:"Verify"} 
      </button>
       
        </form>
        </div>
        
       </div>
    </div>
  )
}

export default VerifyResetCode