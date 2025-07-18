import express from 'express'
import {generateRecipe,saveRecipeById,getSavedRecipe,deleteRecipeSaved} from '../controllers/recipe.controller'
import { authenticate } from '../middlewares/auth.middleware';
const router=express.Router();



router.post("/recipe",authenticate,generateRecipe);

router.post("/saveRecipe/:id",authenticate,saveRecipeById);

router.get("/getSavedRecipe",authenticate,getSavedRecipe);

router.delete("/deleteRecipe/:id",authenticate,deleteRecipeSaved);

export default router