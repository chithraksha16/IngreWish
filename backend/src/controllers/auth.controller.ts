import bcrypt from 'bcryptjs'
import { Request,Response } from 'express';
import User from '../models/auth.model';
import {genrateToken} from '../libs/utils'


type SignupBody={
    name:string,
    email:string,
    password:string
}

type LoginBody={
    email:string,
    password:string
}

export const signup = async(req:Request<{},{},SignupBody>,res:Response):Promise<void>=>{
    const {name,email,password}=req.body;
    try{
        const existingUser= await User.findOne({email})
        if(existingUser){
        res.status(400).json({message:"User already exists"})
        return ;
        }
        if(password.length < 6){
            res.status(400).json({message:"Password length must be 6 or more"})
            return ;
        }
        const salt= await bcrypt.genSalt(10)
        const hashPas= await bcrypt.hash(password,salt)

        const newUser= new User({
            name,
            email,
            password:hashPas
        })
        
        if(newUser){
        await newUser.save()
        await genrateToken(newUser._id,res)
        }
        res.status(201).json({message:"user created Successfully!",
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email
            },
    
        })
    }
    catch(error){
        console.error("Signup Error:",error)
        res.status(500).json({ message: "Internal server error" });
    }

}



export const login=async(req:Request<{},{},LoginBody>,res:Response):Promise<void>=>{
    const {email,password}=req.body
    try{
        const user= await User.findOne({email})
        if(!user){
            res.status(400).json({message:"User does not exists"})
            return;
        }
        const comparePass= await bcrypt.compare(password,user.password)
        if(!comparePass){
            res.status(400).json({message:"Invalid password"});
            return ;
        }
        await genrateToken(user._id,res)
        res.status(200).json({message:"User logged in",
            user:{
                id:user._id,
                email:user.email,
                name:user.name
            }
        })
    }
    catch(error){
        console.error("Login Error:",error)
        res.status(500).json({ message: "Internal server error" });
    }

}



export const logout=(req:Request,res:Response)=>{
    try{
        res.clearCookie('token',{
            maxAge:0,
            httpOnly:true,
            sameSite:'none',
            secure:true
        } )
        res.status(200).json({message:"Logout successsfully"})
    }
    catch(error){
        console.error("Logout Error:",error)
        res.status(500).json({ message: "Internal server error" });
    }
}



export const checkAuth=(req:Request,res:Response):void=>{
    try{
        if (!req.user) {
        res.status(401).json({ message: "Not authenticated" });
        return; 
    }

        res.status(200).json(req.user)
    }   
    catch(error){
        console.error("Error during authentication check,",error);
        res.status(500).json({message:"Internal server error"});
    }
}