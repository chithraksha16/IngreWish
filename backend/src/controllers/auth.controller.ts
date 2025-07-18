import bcrypt from 'bcryptjs'
import { Request,Response } from 'express';
import User, { IUser } from '../models/auth.model';
import {genrateToken} from '../libs/utils'


export const signup = async(req:Request,res:Response):Promise<void>=>{
    const {name,email,password}=req.body;
    try{
        const existingUser= await User.findOne({email})
        if(existingUser){
        res.status(400).json("User already exists")
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
    catch(error:any){
        console.error("Signup Error:",error.message)
        res.status(500).json({ message: "Internal server error" });
    }

}



export const login=async(req:Request,res:Response):Promise<void>=>{
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
    catch(error:any){
        console.error("Login Error:",error.message)
        res.status(500).json({ message: "Internal server error" });
    }

}



export const logout=(req:Request,res:Response)=>{
    try{
        res.clearCookie('token',{
            maxAge:0,
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV !== 'development'
        } )
        res.status(200).json({message:"Logout successsfully"})
    }
    catch(error:any){
        console.error("Logout Error:",error.message)
        res.status(500).json({ message: "Internal server error" });
    }
}



export const checkAuth=(req:Request,res:Response):void=>{
    try{
        res.status(200).json(req.user)
    }   
    catch(error:any){
        console.error("Error during authentication check,",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}