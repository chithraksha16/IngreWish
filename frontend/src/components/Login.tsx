import {motion} from 'framer-motion'
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
const Login = () => {

  type formVariable={
    email:string,
    password:string
  }

  const {login}=useAuthStore();
  const [formData,setFormData]=useState<formVariable>({
    email:"",
    password:""
  })


  const handleChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
    const {name,value}=e.target;

    setFormData(prev=>({
      ...prev,
      [name]:value
    }))
  }


  const handleSubmit=async(e:React.FormEvent):Promise<void>=>{
    e.preventDefault();
    await login(formData.email,formData.password)
    setFormData({
      email:'',
      password:''
    })

  }

  return (
    <>
      <div className="w-full h-screen bg-radial-[at_40%_10%] from-indigo-950 from-5% to-black flex justify-center items-center text-white">
      <motion.div
      initial={{opacity:0, y:70}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.5}}
      className="bg-transparent border-white/30 backdrop-blur-2xl  shadow-md w-full max-w-sm mx-3 p-10 rounded-sm">
      <div className="flex flex-col justify-center items-center space-y-2 pb-2">
        <h1 className="sm:text-xl text-lg font-bold">Welcome back!</h1>
        <h3 className="sm:text-sm text-xs text-gray-500">Login to your account</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
          <label htmlFor="emailInput">Email:</label>
          <input
          className="w-full h-8 rounded-md border border-white focus:outline focus:outline-blue-400 px-2"
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          id="emailInput" />
          </div>
          <div className="flex flex-col gap-2">
          <label htmlFor="passwordInput">Password:</label>
          <input 
          className="w-full border h-8 rounded-md border-white focus:outline focus:outline-blue-400 px-2 "
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          id="passwordInput" />

          <p className='text-xs text-gray-400'>don't have account? <Link to={'/signup'}><span className='text-blue-500'>signup</span></Link></p>
          </div>
          <button 
          className="w-full border border-white/5 rounded-md bg-linear-to-bl from-indigo-800 to-black hover:bg-linear-to-tr hover:from-indigo-800 hover:to-black   py-1"
          type="submit">Login</button>
        </div>
      </form>
      </motion.div>
      </div>
    </>
  )
}

export default Login
