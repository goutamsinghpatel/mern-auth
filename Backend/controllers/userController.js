import userModel from "../models/user.js";

export const getUserData=async(req,res)=>{

   try{
    const {userId}=req;

    const user=await userModel.findById(userId);
    if (!user){
        return res.json({success:false,message:"user not found  "})
    }
    res.json({success:true,
userDate:{
    userName:user.userName,
     isAcountVerified:user.isAcountVerified,
}
    
    });
    


   }
   catch(err){
res.json({success:false,message:err.message});
   }

}

