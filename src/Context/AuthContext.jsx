import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
   const [token,setToken] = useState(null);
    
//    console.log(token);

  useEffect(function(){
    if(localStorage.getItem("tkn")!=null){
        setToken(localStorage.getItem("tkn"));
    }
  },[]);

  async function getAllUsers(){
    setLoading(true);
    try{
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/users");
        return data
     } catch(error){
         console.log(error,"getAllUsers error in Auth context ");
         setLoading(false);
     }
}

   return (
    <div>
        <AuthContext.Provider value={
          {
            token,
            setToken,
            getAllUsers
          }
        }>
        {children}
        </AuthContext.Provider>
        
    </div>
  )
}

export default AuthContextProvider