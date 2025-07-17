import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connectDB=async():Promise<void>=>{
    const uri=process.env.MONGO_URI
    if(!uri){
        throw new Error("NOT setted MONGO_URI in env")
    }
    await mongoose.connect(uri,{
        dbName:"IngreWish"
    }).then(()=>{console.log("Database connected")})
    .catch((error:any)=>{
    console.error("DB connection failed",error)
    })
    
}