import bcrypt from 'bcryptjs'
// this use to hashing over password ;
import jwt  from 'jsonwebtoken'
import transporter from '../config/Nodemailer.js';

import {EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE} from '../config/emailTemplet.js';

import userModel from '../models/user.js';

export const  register=async(req,res)=>{
  
    let {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.json({success:false,message:"missing details"})
    }
    try{ 

         const existingUser=await userModel.findOne({email});
      if (existingUser){
        return res.json({succes:false,message:"somthing Wrong"})
      }

        // here it give the hashing of this password
 const hashpassword=await  bcrypt.hash(password,10)
 const user=new userModel({name,email,password:hashpassword});
  await user.save();
//   basicaly here we are use jwt for cookie and autheration and  here that id take uquick item in data base so we give it it 
  const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
//   here the expirein remove the awt token and afet 7 d it come and login ;
res.cookie('token',token,
    {httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:process.env.NODE_ENV==='production'?'none':'strict',
    maxAge:7*24*60*60*1000,

});
// send welcome email sender nodemailer 
const mailOption={
  from:process.env.SENDER_EMAIL,
  to:email,
  subject:'wel come to  banna',
  text:`welcome to banna  website .your acount  has been  created with email id :${email}  `
}
 await transporter.sendMail(mailOption) .then((res)=>{
  console.log("send mail")

 }).
 catch((err)=>{
console.log(err.message)
 })
return res.json({success:true});


    }
    catch(err){
 res.json({success:false,message:err.message})
    }
}


// login

export const login=async(req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    return res.json({success:false,message:"email and password are required"})
  }
  try{
const user=await userModel.findOne({email});

if(!user){
      return res.json({success:false,message:"invalid email"})

}

const isMatch=await bcrypt.compare(password,user.password);

if(!isMatch){
        return res.json({success:false,message:"invalid password"})

}
 const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
//   here the expirein remove the awt token and afet 7 d it come and login ;
res.cookie('token',token,
    {httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:process.env.NODE_ENV==='production'?'none':'strict',
    maxAge:7*24*60*60*1000,

});

return res.json({success:true});




  }
  catch(err){
   res.json({success:false,message:err.message})

  }

}
// logout

export const logout=async(req,res)=>{
try{
 res.clearCookie('token',{httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:process.env.NODE_ENV==='production'?'none':'strict',
    maxAge:7*24*60*60*100,

})
return res.json({success:true,message:"Logged out"})

}
catch(err){
return   res.json({success:false,message:err.message});

}

}
//send verification otp to the user  

export const sendVerifyOtp=async(req,res)=>{

  try{
    const {userId}=req;
     const user=await userModel.findById(userId);
   if(user.isAcountVerified){
    return res.json({success:false,message:"account Alredy   verified"});
   }
  //  here otp ready and save in database;
 const otp= String(Math.floor( 100000+Math.random()*900000));
user.verifyOtp=otp;
user.verifyOtpExpireAt=Date.now()+24*60*60*1000;
await user.save();
// send opt to email;
const mailOption={
  from:process.env.SENDER_EMAIL,
  to:user.email,
  subject:'Account  Verification otp ',
  // text:`your otp   is ${otp} .verify you account  using this otp `,
  html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
}
 await transporter.sendMail(mailOption) .then((res)=>{
  console.log("send otp")

 }).
 catch((err)=>{
console.log(err.message)
 })
 return res.json({success:true,message:"Verification Otp send on email"}); 

}
  catch(err){
    return res.json({success:false,message:err.message});
 
  }
   


}

// VerifyEmail  using the otp

export const verify=async(req,res)=>{
     const {Otp}=req.body;
     const {userId}=req;
     if(!userId || !Otp){
      return res.json({success:false,message:'missing detailes'})
     }
 try {

const user=await userModel.findById(userId);
if(!user){
  return res.json({success:false,message:"user not found  "});
}
if(user.verifyOtp==='' ||user.verifyOtp!==Otp){
  return  res.json({success:false,message:"invalid otp "})
}
if (user. verifyOtpExpireAt < Date.now()){
  return res.json({success:false,message:"otp expired"});
}

user.isAcountVerified=true; 
user.verifyOtp='';
user.verifyOtpExpireAt=0; 
await user.save();
return res.json({success:true,message:" Email verify successfully"});
  
 } catch (err) {
  return res.json({success:false,message:err.message});
  
 }

}

// check  if user  is authentication 
export  const isAuthentication=async(req,res)=>{
  try {
    return res.json({success:true,message:"you are authenticated"});
    
  } catch (err) {
    res.json({success:false,message:err.message});
    
  }

}
// send  password  reset  otp 

export  const sendResetOtp=async(req,res)=>{
  const {email}=req.body;
  if(!email){
    return res.json({success:false,message:"Email is required"})
  }
  try {
    const user=await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"user not found "})
    }
     const otp= String(Math.floor( 100000+Math.random()*900000));
user.resetOtp=otp;
user.resetOtpExpireAt=Date.now()+15*60*1000;
// 15 minuts 
await user.save();
// send opt to email;
const mailOption={
  from:process.env.SENDER_EMAIL,
  to:user.email,
  subject:'password reset  otp ',
  // text:`your otp   is ${otp} .reset you password using this otp `,
  html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
}
 await transporter.sendMail(mailOption) .then((res)=>{
  console.log("send  reset otp")

 }).
 catch((err)=>{
console.log(err.message)
 })
 return res.json({success:true,message:"reset  Otp send on email"}); 
  
} catch (err) {
    res.json({success:false,message:err.message})
    
  }


}

// reset user password
export const resetPassword=async(req,res)=>{
  const {email,Otp,newPassword}=req.body
  if (!email || !Otp || !newPassword){
    return res.json({success:false,message:"missing details"})
  }
  try {
    const user=await userModel.findOne({email});
    if (!user){
      return res.json({success:false,message:"user not found  "})
    }
    if(user.resetOtp==='' || user.resetOtp!==Otp){
      return res.json({success:false,message:"invailid Otp"});
    }
    if (user.resetOtpExpireAt<Date.now()){
      return res.json({success:false,message:"otp expired"});
    }

    const hashedPassword=await bcrypt.hash(newPassword,10);
    user.password=hashedPassword;
    user.resetOtp='';
    user.resetOtpExpireAt=0;
    await user.save();
    return res.json({success:true,message:"password has been succesfully reset"});
    
  } catch (err) {
    return res.json({success:false,message:err.message});
    
  }
}

