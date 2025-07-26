import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

type recipeVar={
    _id:string,
    user:string,
    input:string,
    taste:string,
    title:string,
    instruction:string[],
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

type MessageResponse = {
    message: string;
};

type recipeVariable={
    isRecipeLoading:boolean,
    recipe:recipeVar | null,
    savedRecipe:saveRecipeVar[] | null,
    genRecipe:(input:string,taste:string)=>Promise<void>
    saveRecipe:(recipeId:string)=>Promise<void>
    getSavedRecipe:()=>Promise<void>
    deleteSavedRecipe:(savedRecipeId:string)=>Promise<void>

}

export const useRecipeStore=create<recipeVariable>((set)=>({
    isRecipeLoading:false,
    recipe:null,
    savedRecipe:null,

    genRecipe:async(input,taste)=>{
        set({isRecipeLoading:true})
        try{
            const res=await axiosInstance.post<{recipe:recipeVar}>('/recipe/recipe',{input,taste})
            set({recipe:res.data.recipe})
        }
        catch(error:unknown){
            const err=error as {response?:{data?:{message?:string}}}
            toast.error(err.response?.data?.message ||"Error generating recipe")
        }
        finally{
            set({isRecipeLoading:false})
        }
    },

    saveRecipe:async(recipeId)=>{
        try{
            const res=await axiosInstance.post<MessageResponse>(`/recipe/saveRecipe/${recipeId}`)
            toast.success(res.data.message)
        }
        catch(error:unknown){
            const err=error as {response?:{data?:{message?:string}}}
            toast.error(err.response?.data?.message ||"recipe not Saved")
        }
    },
    getSavedRecipe:async()=>{
        try{
            const res=await axiosInstance.get<saveRecipeVar[]>('/recipe/getSavedRecipe')
            set({savedRecipe:res.data})
        }
        catch(error:unknown){
        toast.error("Failed to load saved recipes");
        }
    },
    deleteSavedRecipe:async(savedRecipeId)=>{
        try{
            const res= await axiosInstance.delete<MessageResponse>(`/recipe/deleteRecipe/${savedRecipeId}`)
            toast.success(res.data.message)
            set((state)=>({
                savedRecipe:state.savedRecipe?.filter((item)=>item._id !== savedRecipeId)
            }))
        }
        catch(error:unknown){
            const err=error as {response?:{data?:{message?:string}}}
            toast.error(err.response?.data?.message || "Recipe not deleted")
        }
    }

}))