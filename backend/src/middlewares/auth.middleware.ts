import { NextFunction,Request,Response } from "express";
import User from "../models/auth.model";
import jwt, { JwtPayload } from 'jsonwebtoken'



export const authenticate=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const token=req.cookies.token
        if(!token){
            res.status(401).json({message:"Unauthorized access no token provided"})
            return;
        }
        const decoded=  jwt.verify(token,process.env.JWT_SECRET as string)as JwtPayload;
        if(!decoded){
            res.status(401).json({message:"Unauthorized access Invalid token"})
            return ;
        }
        const user= await User.findById(decoded.userId).select("-password")
        if(!user){
            res.status(401).json({message:"Unauthorized:user not found"})
            return;
        }
        req.user=user
        next()
    }
    catch(error:any){
        console.error("Auth Middleware Error:", error.message);
        res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}