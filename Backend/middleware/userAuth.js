import  jwt  from "jsonwebtoken";

export const userAuth=async(req,res,next)=>{
const {token}=req.cookies;

if(!token){
    return res.json({succes:false,message:"not Authorized login again"})
}
try {
 const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);

 if(tokenDecode.id){
    req.userId=tokenDecode.id;   
 }
 else {
    return res.json({succes:false,message:"not Authorized login again "})
 }

 next();
    
} catch (err) {
    return res.json({succes:false,message:err.message})
    
}



}