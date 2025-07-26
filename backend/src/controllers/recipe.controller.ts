import {Request,Response} from 'express'
import Recipe from "../models/recipe.model";
import {generateFromAi} from '../libs/ai.utils'
import SaveRecipe from "../models/saveRecipe.model";

type RecipeBody={
    input:string,
    taste:string
}

export const generateRecipe=async(req:Request<{},{},RecipeBody>,res:Response)=>{
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
    catch(error){
        console.error("GenerateRecipe error",error)
        res.status(400).json({message:"Internal server error"})
    }

}

export const saveRecipeById=async(req:Request,res:Response):Promise<void>=>{
    try{
        const recipeId=req.params.id
        if(!recipeId){
            res.status(400).json({message:"Recipe ID  required"});
            return;
        }
        if (!req.user?._id) {
        res.status(401).json({ message: "Unauthorized: No user found" });
        return;
        }
        const saveRecipe= await SaveRecipe.findOne({user:req.user._id,recipe:recipeId})
        if(saveRecipe){
            res.status(400).json({message:"Recipe already saved"})
            return;
        }

        const newRecipeSave= new SaveRecipe({
            user:req.user._id,
            recipe:recipeId
        })
        
        await newRecipeSave.save()

        res.status(201).json({message:"Recipe Saved",saveRecipe:newRecipeSave})
    }
    catch(error){
        console.error("Saving Recipe Error",error)
        res.status(500).json({message:"Internal server error"})
    }
}


export const getSavedRecipe=async(req:Request,res:Response):Promise<void>=>{
    try{
        const userId=req.user._id
        const getSavedRecipe= await SaveRecipe.find({user:userId}).sort({createdAt:-1})
        .populate("recipe")
        res.status(200).json(getSavedRecipe)
    }
    catch(error){
        console.error("Fectching saved recipe error",error);
        res.status(500).json({message:"Internal server error"})
    }

}

export const deleteRecipeSaved=async(req:Request,res:Response):Promise<void>=>{
    const savedRecipeId=req.params.id
    try{
        const savedRecipe= await SaveRecipe.findById(savedRecipeId)
        if(!savedRecipe){
            res.status(404).json({message:"Recipe not found"})
            return;
        }
        if(req.user._id.toString() !== savedRecipe.user.toString()){
            res.status(403).json({message:"You are not allowed to delete"})
            return;
        }
        await savedRecipe.deleteOne();
        res.status(200).json({message:"Recipe Deleted"})
    }
    catch(error){
        console.error("Deleting error",error)
        res.status(500).json({message:"Internal server error"})
    }
}