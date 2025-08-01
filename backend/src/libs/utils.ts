import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { Types } from 'mongoose'

export const genrateToken=async(userId:Types.ObjectId,res:Response):Promise<string>=>{
    const jwtToken=jwt.sign({userId:userId.toString()},process.env.JWT_SECRET as string,{expiresIn:'7d'})

    res.cookie('token',jwtToken,{
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge:7 * 24 * 60 * 60 * 1000
    })
    return jwtToken

}