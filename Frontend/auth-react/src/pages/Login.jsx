import { useContext, useState } from "react"
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from 'axios';
import { toast } from "react-toastify";

export default function Login(){
    const [state,setState]=useState("signUp");
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
  
    const {backendUrl,setIsLoggedin,getUserData}=useContext(AppContent)
    const login=()=>{
        setState('login');
    }
    const signUp=()=> setState("signUp");
    const handleFormSubmit=async(event)=>{
       
try {
    event.preventDefault();
    axios.defaults.withCredentials=true;
    // here cookies come  and also we can check that cookies
    if(state==='signUp'){
     const   {data}=   await axios.post(backendUrl +'/api/auth/register',{name,email,password})
   if (data.success){
    setIsLoggedin(true);
    getUserData();
    navigate('/'); 
   }else{
   toast.error(data.message);
   }
    }
    else {
          const   {data}=   await axios.post(backendUrl +'/api/auth/login',{email,password})
   if (data.success){
    setIsLoggedin(true);
    getUserData();
    navigate('/'); 
   }else{
   toast.error(data.message);
   }


    }
    
} catch (error) {
    toast.error(error.message);
    
}

    }

    return(
        <>
<div className="flex  items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from blue-200 to-purple-400 ">
             <img onClick={()=>navigate("/")} src={assets.logo} alt="" className="absolute left-5 sm:left-20 top-5 w-28  sm:w-32 cursor-pointer"/>
              <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                <h2 className="text-3xl font-semibold text-white text-center mb-3">{state==='signUp' ?"create  Account":'Login  '}</h2>
                <p className="text-center text-sm mb-6 ">{state==='signUp' ?"create your Account":'Login to your account '}</p>
                <form onSubmit={handleFormSubmit}>
                  {state==="signUp" &&  ( <>  <div className="mb-4 flex items-center  gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.person_icon}  alt=""/>
                        <input className="bg-transparent outline-none   text-amber-100"type="text" placeholder="Full Name" onChange={e=>setName(e.target.value)} value={name}  required/>

                    </div></>)}
                       <div className="mb-4 flex items-center  gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.mail_icon}  alt=""/>
                        <input onChange={e=>setEmail(e.target.value)} value={email}  className="bg-transparent outline-none   text-amber-100"type="email" placeholder="Email-id" required/>
 
                    </div>
                       <div className="mb-4 flex items-center  gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.lock_icon}  alt=""/>
                        <input  onChange={e=>setPassword(e.target.value)} value={password}  className="bg-transparent outline-none   text-amber-100"type="password" placeholder="password" required/>
                    </div>
                    <p onClick={()=>navigate("/reset-password")} className=" mb-4 text-indigo-500 cursor-pointer">Forgot password</p>
                    <button className="w-full cursor-pointer  py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">{state}</button>

                </form>
                {state==="signUp"? ( <p className="text-gray-400 text-center text-xs mt-4">already have an acount? {' '}
                     <span onClick={login} className="text-blue-400 cursor-pointer underline ">Login here  </span></p>
)
 :  <p className="text-gray-400 text-center text-xs mt-4">don`t have an acount? {' '} 
 <span onClick={signUp} className="text-blue-400 cursor-pointer underline ">signUp </span></p>
}

              </div>
    </div>     
        </>
    )
}