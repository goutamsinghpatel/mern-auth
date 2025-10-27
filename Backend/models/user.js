import mongoose from "mongoose";
const schema=mongoose.Schema;
const userSchema= new schema({
    name:{
        type:String,
        require:true,
        
        
    },
     email:{
        type:String,
        require:true,
        unique:true,
        
    },
    password:{
        type:String,
        require:true,
       
        
    },
    verifyOtp:{
        type:String,
        default:'',
    },
     verifyOtpExpireAt:{
        type:Number,
        default:0,
    },
     isAcountVerified:{
        type:Boolean,
        default:false,
    },
     resetOtp:{
        type:String,
        default:'',
    },
     resetOtpExpireAt:{
        type:Number,
        default:0,
    }
})
const userModel=  mongoose .models.user ||mongoose.model("authUser",userSchema);
export default userModel;