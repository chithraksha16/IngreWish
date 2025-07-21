import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

type User={
    authUser:string | null ,
    isCheckingAuth:boolean,
    checkAuth:()=>Promise<void>,
    signup:()=>Promise<void>,
    login:()=>Promise<void>
}

export  const useAuthStore=create<User>((set)=>({
    authUser:null,
    isCheckingAuth:true,

    checkAuth:async ()=>{
        try{
            const res=await axiosInstance.get('/auth/checkAuth')
            set({authUser:res.data})
        }
        catch(error:any){
            console.error("Error in check Auth",error.message)
        }
        finally{
            set({isCheckingAuth:false})
        }

    },

    signup:async ()=>{
        try{
            const res= await axiosInstance.post('/auth/signup')
            set(({authUser:res.data.user}))
            toast.success(res.data.message)
        }
        catch(error:any){
        console.error("Sigup failed",error.message)
        toast.error(error.response?.data?.message)
        }
        finally{
        
        }
    },
    login:async ()=>{}
}))