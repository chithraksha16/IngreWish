import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

type recipeVar={
    id:string,
    user:string,
    input:string,
    taste:string,
    title:string,
    instruction:string[]
    calories:number,
    protein:number,
    missingItems:string[],
    createdAt:Date
}

const initialRecipe: recipeVar = {
  id: "89yyy1",
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
  createdAt: new Date("2025-12-12"),
};

type recipeVariable={
    recipe:recipeVar | null
    setRecipe:(addrecipe:recipeVar)=>void,
    genRecipe:(input:string,taste:string)=>Promise<void>

}

export const useRecipeStore=create<recipeVariable>((set)=>({
    recipe:initialRecipe,
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
    }

}))