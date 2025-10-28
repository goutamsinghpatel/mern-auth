import express  from  "express";
import cors from 'cors';
// cors from connected frontend and backend
import  'dotenv/config';
import cookieParser from "cookie-parser";
// import mongoose file
import connectDb from "./config/mongodb.js";
// authRoutes
import authRouter from "./Routes/authRouter.js";
import userRouter from "./Routes/userRoutes.js";
const app=express();
const port=process.env.PORT || 4000
connectDb();


  
// all the request pass using json  
app.use(express.json())
// for the cookies 
app.use(cookieParser());
// we send cookies in resopones
const allwordOrigin=['https://goutam-mern-auth.netlify.app']
app.use(cors({origin: "https://mern-auth-a448.vercel.app",credentials:true}));
// here origin:allwordOrigin is the frontend url 
// apit end point 

app.get("/",async(req,res)=>{
    

    res.send(`server Startede in port ${port}`);
})
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);




// start server
app.listen(port,()=>{
    console.log("server Started")
})
