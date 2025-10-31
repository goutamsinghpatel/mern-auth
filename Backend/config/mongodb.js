import mongoose from "mongoose";
const connectDb=async()=>{
//   await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`).then((res)=>{
    await mongoose.connect(`${process.env.MONGODB_URI}`).then((res)=>{
console.log("conncected database")
    })
    .catch((err)=>{
      console.log("err")
    })
 

}
export default connectDb;