import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";


type AuthUser = {
    _id: string;
    name: string;
    email: string;
};

type AuthResponse = {
  user: AuthUser;
  message: string;
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
            const res=await axiosInstance.get<AuthUser>("/auth/check")
            set({authUser:res.data})
        }
        catch(error:unknown){
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }

    },

    signup:async (name,email,password)=>{
        try{
            const res= await axiosInstance.post<AuthResponse>("/auth/signup",{name,email,password})
            set(({authUser:res.data.user}))
            toast.success(res.data.message)
        }
        catch(error:unknown){
        const err= error as{response?:{data?:{message?:string}}}
        set({authUser:null})
        toast.error(err.response?.data?.message || "Signup Error")
        }
    },

    login:async (email,password)=>{
        try{
            const res=await axiosInstance.post<AuthResponse>('/auth/login',{email,password})
            set({authUser:res.data.user})
            toast.success(res.data.message)
        }
        catch(error:unknown){
            const err= error as{response?:{data?:{message?:string}}}
            toast.error(err.response?.data?.message || "Login error")
            set({authUser:null})
        }
    },
    logout:async()=>{
    try{
        await axiosInstance.post('auth/logout')
        set({authUser:null})
        toast.success("Logout successful")
    }
    catch(error:unknown){
        toast.error("Logout error")
    }

    }
}))