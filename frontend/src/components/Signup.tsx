import { motion } from "framer-motion"
import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Link } from "react-router-dom"
const Signup = () => {

  const {signup}=useAuthStore();



  type formVariable={
    name:string,
    email:string,
    password:string
  }

  const [formData,setFormData]=useState<formVariable>({
    name:"",
    email:"",
    password:""
  })

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target

    setFormData(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit=async(e:React.FormEvent):Promise<void>=>{
    e.preventDefault();

    await signup(formData.name,formData.email,formData.password)
    setFormData({
      name:'',
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
        <h1 className="sm:text-xl text-lg font-bold">Create a account</h1>
        <h3 className="sm:text-sm text-xs text-gray-500">Get started with free account</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
          <label htmlFor="nameInput">Name:</label>
          <input
          className="w-full border h-8 rounded-md border-white focus:outline focus:outline-blue-400 px-2"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          id="nameInput" />
          </div>
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

          <p className='text-xs text-gray-400'>already have account? <Link to={'/login'}><span className='text-blue-500'>login</span></Link></p>
          </div>
          <button 
          className="w-full border border-white/5 rounded-md bg-linear-to-bl from-indigo-800 to-black hover:bg-linear-to-tr hover:from-indigo-800 hover:to-black   py-1"
          type="submit">Signup</button>
        </div>
      </form>
      </motion.div>
      </div>
    </>
  
  )
}

export default Signup
