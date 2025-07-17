import { Request,Response } from "express";
import { generateFromAi } from "../libs/ai.utils";
import Recipe from "../models/recipe.model";
import { IUser } from "../models/auth.model";

interface AuthentictedRequest extends Request{
    user:IUser
}


export const generateRecipe=async(req:AuthentictedRequest,res:Response)=>{
    const {input,taste}=req.body;
    try{
        if(!input || !taste){
            res.status(400).json({message:"All fields are required"})
            return;
        }
        const aiData= await generateFromAi(input,taste)
        const newRecipe=new Recipe({
            user:req.user._id,
            input,
            taste,
            title:aiData.title,
            instruction:aiData.instruction,
            calories:aiData.calories,
            protein:aiData.protein,
            missingItems:aiData.missingItems || []
        });
        await newRecipe.save();

    res.status(200).json({ message: "Recipe generated successfully", recipe: newRecipe });
    }
    catch(error:any){
        console.error("GenerateRecipe error",error.message)
        res.status(400).json({message:"Internal server error"})
    }

}