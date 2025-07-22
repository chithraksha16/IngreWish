import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";


type AuthUser = {
    id: string;
    name: string;
    email: string;
};

type User={
    authUser:AuthUser | null ,
    isCheckingAuth:boolean,
    checkAuth:()=>Promise<void>,
    signup:(name:string,email:string,password:string)=>Promise<void>,
    login:(email:string,password:string)=>Promise<void>
    logout:()=>Promise<void>
}

export  const useAuthStore=create<User>((set)=>({
    authUser:null,
    isCheckingAuth:true,

    checkAuth:async ()=>{
        try{
            const res=await axiosInstance.get("/auth/check")
            set({authUser:res.data})
        }
        catch(error:any){
            console.error("Error in check Auth",error.message)
        }
        finally{
            set({isCheckingAuth:false})
        }

    },

    signup:async (name,email,password)=>{
        try{
            const res= await axiosInstance.post("/auth/signup",{name,email,password})
            set(({authUser:res.data.user}))
            toast.success(res.data.message)
        }
        catch(error:any){
        console.error("Sigup failed",error.message)
        set({authUser:null})
        toast.error(error.response?.data?.message || "Signup Error")
        }
    },

    login:async (email,password)=>{
        try{
            const res=await axiosInstance.post('/auth/login',{email,password})
            set({authUser:res.data.user})
            toast.success(res.data.message)
        }
        catch(error:any){
            toast.error(error.response?.data?.message || "Login error")
            set({authUser:null})
        }
    },
    logout:async()=>{
    try{
        await axiosInstance.post('auth/logout')
        set({authUser:null})
        toast.success("Logout successful")
    }
    catch(error:any){
        toast.error("Logout error")
    }

    }
}))