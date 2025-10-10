import express from 'express';
import { login, logout, register,sendVerifyOtp,verify,isAuthentication,sendResetOtp,resetPassword} from '../controllers/authcontroller.js';
// import { verify } from 'jsonwebtoken';
import { userAuth } from '../middleware/userAuth.js';

const  authRouter=express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-Otp',userAuth,sendVerifyOtp);
authRouter.post('/verify',userAuth,verify);
authRouter.post('/is-Auth',userAuth,isAuthentication);
authRouter.post('/send -reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword);


export default authRouter;
