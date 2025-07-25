import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

type recipeVar={
    _id:string,
    user:string,
    input:string,
    taste:string,
    title:string,
    instruction:string[]
    calories:number,
    protein:number,
    missingItems:string[],
    createdAt:string
}

type saveRecipeVar={
    _id:string,
    user:string,
    recipe:recipeVar[],
    createdAt:string
}

const initialRecipe: recipeVar = {
  _id: "687a558db2d836a313bd0a8f",
  user: "72t8611",
  input: "chicken, onion, turmeric, powder, chilly, coconut, soya, sauce, vinegar, flour",
  taste: "spicy and creamy and rich",
  title: "Chicken Biryani with kebab",
  instruction: [
    "Marinate the chicken with spices and let it rest Cook the rice and layer it with chicken to make .",
    "Cook the rice and layer it with chicken to make biryani.",
    "Marinate the chicken with spices and let it rest.",
    "Cook the rice and layer it with chicken to make biryani.",
    "Marinate the chicken with spices and let it rest.",
    "Cook the rice and layer it with chicken to make biryani."
  ],
  calories: 123,
  protein: 24,
  missingItems: ["cardamom","saffron","ginger","garlic","seed"],
  createdAt:"2025-12-12",
};

type recipeVariable={
    recipe:recipeVar | null,
    savedRecipe:saveRecipeVar[] | null,
    setRecipe:(addrecipe:recipeVar)=>void,
    genRecipe:(input:string,taste:string)=>Promise<void>
    saveRecipe:(recipeId:string)=>Promise<void>
    getSavedRecipe:()=>Promise<void>
    deleteSavedRecipe:(savedRecipeId:string)=>Promise<void>

}

export const useRecipeStore=create<recipeVariable>((set)=>({
    recipe:initialRecipe,
    savedRecipe:null,
    setRecipe:(addrecipe)=>set({recipe:addrecipe}),

    genRecipe:async(input,taste)=>{
        try{
            const res=await axiosInstance.post('/recipe/recipe',{input,taste})
            set({recipe:res.data.recipe})
        }
        catch(error:any){
            console.error("Error generating recipe",error.message)
            toast.error(error.response?.data?.message ||"Error generating recipe")
        }
    },

    saveRecipe:async(recipeId)=>{
        try{
            const res=await axiosInstance.post(`/recipe/saveRecipe/${recipeId}`)
            console.log(res.data)
            toast.success(res.data.message)
        }
        catch(error:any){
            console.error("Error Recipe saving",error.message)
            toast.error(error.response?.data?.message ||"recipe not Saved")
        }
    },
    getSavedRecipe:async()=>{
        try{
            const res=await axiosInstance.get('/recipe/getSavedRecipe')
            set({savedRecipe:res.data})
            console.log(res.data)
        }
        catch(error:any){
            console.error("Error fetching Recipe",error.message)
        }
    },
    deleteSavedRecipe:async(savedRecipeId)=>{
        try{
            const res= await axiosInstance.delete(`/recipe/deleteRecipe/${savedRecipeId}`)
            toast.success(res.data.message)
            set((state)=>({
                savedRecipe:state.savedRecipe?.filter((item)=>item._id !== savedRecipeId)
            }))
        }
        catch(error:any){
            console.error("Error deleting Recipe")
            toast.error(error.response?.data?.message || "Recipe not deleted")
        }
    }

}))