
import { ChefHat } from "lucide-react"
const Recipe = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-radial-[at_50%_70%] from-indigo-950 from-25% to-black ">
        <div className="flex justify-center">
        <div className="w-full max-w-2xl mt-15 bg-slate-950 backdrop-blur-2xl rounded-lg h-fit py-8 border border-gray-800 text-white">
          <div className="text-center space-y-2 py-4">
            <h1 className="text-xl">Recipe Generator <span className="inline-flex items-center"><ChefHat size={18} /></span></h1>
            <p className="text-sm text-gray-500">Create a recipes based on your ingredients and preferences</p>
          </div>

          <form action="">
          <div className="flex flex-col gap-5 p-8">
            <div className="flex flex-col">
              <label className="font-mono pb-2" htmlFor="inputfield">Available Ingredients?</label>
              <textarea 
              rows={3}
              className=" w-full bg-black/30 border-2 border-gray-800 rounded-md resize-none pl-2 placeholder:text-sm"
              placeholder="Eg: chicken onion tomato garlic cumin.. etc"
              name="" id="inputfield"/>
            </div>
            <div className="flex flex-col">
              <label className="font-mono pb-2"  htmlFor="tastefield">Flavor Preferences:</label>
              <textarea
              rows={3}
              className=" w-full bg-black/30 border-2 border-gray-800  rounded-md resize-none pl-2 placeholder:text-sm"
              placeholder="Eg: spicy and bold, creamy and rich.."
              name="" id="tastefield"/>
            </div>
          </div>
          <div className="flex pl-11">
            <button 
            className=" text-sm px-3 py-1 border  border-l-teal-500 border-t-teal-500 border-b-purple-800 border-r-purple-800 hover:border-l-purple-800 hover:border-t-purple-800 hover:border-r-teal-500 hover:border-b-teal-500  rounded-xl">
            Generate✨</button>
          </div>
          </form>
        </div>
        </div>

        <div className="flex justify-center mt-7">
        <div className="w-full max-w-2xl bg-slate-950 rounded-lg text-white p-7">
          <p className="text-center">Recipe not yet generated</p>
        
        </div>
        </div>
      
      </div>
    </>
  )
}

export default Recipe
