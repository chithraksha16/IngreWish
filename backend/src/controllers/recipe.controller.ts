import  { IUser } from "../models/auth.model";
import {Request,Response} from 'express'
import Recipe from "../models/recipe.model";
import {generateFromAi} from '../libs/ai.utils'


interface AuthenticatedRequest extends Request{
    user:IUser
}


export const saveRecipe=async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    const {input,taste, title,instruction,calories,protein,missingItems}=req.body
    try{
    const userId=req.user._id
    if(!userId){
        res.status(400).json({message:"Unthorized no user found"})
        return;
    }

    const newRecipe=new Recipe({
        user:userId,
        input,
        taste,
        title,
        instruction,
        calories,
        protein,
        missingItems
    })

    await newRecipe.save()

    res.status(200).json({message:"Recipe saved Successful",recipe:newRecipe})
    }
    catch(error:any){
        console.error("Recipe saving Error:",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}





 export const getUserRecipe=async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    try{
        const userId=req.user._id
        const recipe= await Recipe.find({user:userId}).sort({createdAt:-1})
        res.status(200).json(recipe)
    }
    catch(error:any){
        console.error("Feteching recipe error",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const deleteRecipe=async(req:Request,res:Response):Promise<void>=>{
    try{
        const recipeId=req.params.id;
        const recipe= await Recipe.findByIdAndDelete(recipeId)
        if (!recipe) {
        res.status(404).json({ message: "Recipe not found" });
        return;
        }
        res.status(200).json({message:"Recipe Deleted"})
    }
    catch(error:any){
        console.error("Recipe deleting error",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}



export const generateRecipe=async(req:AuthenticatedRequest,res:Response)=>{
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