import {motion} from 'motion/react'
const Onboard = () => {
  return (
    <div className=" w-full h-screen bg-radial-[at_50%_90%] from-indigo-900 from-20% to-black pt-14 flex items-center justify-center">
        <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.5,type:"spring", stiffness:300}}
        className=" flex items-center justify-center flex-col space-y-3">
            <h1 className=" px-4  text-4xl sm:text-5xl w-full text-center font-bold text-white">Welcome to IngreWish</h1>
            <p className="text-white px-4 w-full tex-sm sm:w-2xl text-center">Discover personalized recipes with IngreWish, an AI-powered app that creates meals based on your ingredients, mood, and flavor preferences.</p>
            <div className="pt-8 flex gap-4">
                <button className="text-sm px-4 py-1 text-white bg-purple-600 rounded">Get Started</button>

                <button className="text-sm px-4 py-1 text-white border rounded">Signup</button>
            </div>
        </motion.div>
    </div>
  )
}

export default Onboard
