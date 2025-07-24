import { ChefHat,Import } from "lucide-react"
import { useState } from "react"
import { useRecipeStore } from "../store/useRecipeStore"
import Badge from "./ui/Badge";
const Recipe = () => {
  const { genRecipe, recipe, saveRecipe } = useRecipeStore();

  const [formData, setFormData] = useState({
    input: "",
    taste: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const genrateRecipe = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await genRecipe(formData.input, formData.taste);
  };

  return (
    <div className="w-full min-h-screen bg-radial-[at_50%_70%] from-indigo-950 from-25% to-black pb-10">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl mt-15 bg-slate-950 backdrop-blur-2xl rounded-lg h-fit py-8 border border-gray-800 text-white">
          <div className="text-center space-y-2 py-4">
            <h1 className="text-xl">
              Recipe Generator{" "}
              <span className="inline-flex items-center">
                <ChefHat size={18} />
              </span>
            </h1>
            <p className="text-sm text-gray-500">
              Create a recipe based on your ingredients and preferences
            </p>
          </div>

          <form onSubmit={genrateRecipe}>
            <div className="flex flex-col gap-5 p-8">
              <div className="flex flex-col">
                <label className="font-mono pb-2" htmlFor="inputfield">
                  Available Ingredients?
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-black/30 border-2 border-gray-800 rounded-md resize-none pl-2 placeholder:text-sm"
                  placeholder="Eg: chicken, onion, tomato, garlic..."
                  name="input"
                  value={formData.input}
                  onChange={handleChange}
                  id="inputfield"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-mono pb-2" htmlFor="tastefield">
                  Flavor Preferences:
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-black/30 border-2 border-gray-800 rounded-md resize-none pl-2 placeholder:text-sm"
                  placeholder="Eg: spicy and bold, creamy and rich..."
                  name="taste"
                  value={formData.taste}
                  onChange={handleChange}
                  id="tastefield"
                />
              </div>
            </div>
            <div className="flex pl-11">
              <button
                type="submit"
                className="text-sm px-3 py-1 border border-l-teal-500 border-t-teal-500 border-b-purple-800 border-r-purple-800 hover:border-l-purple-800 hover:border-t-purple-800 hover:border-r-teal-500 hover:border-b-teal-500 rounded-xl"
              >
                Generate✨
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center mt-7">
        <div className="w-full max-w-2xl bg-slate-950 rounded-lg text-white p-7">
          {recipe ? (
            <div className=" space-y-4 p-5 rounded-lg">
              <div>
                <h3 className="text-center text-lg mb-4">Generated Recipe</h3>
                <p className="text-md">
                  You have ingredients: {recipe.input} and your
                  taste preference is {recipe.taste}
                </p>
                <h2 className="text-lg font-semibold sm:mt-6 mt-3">"{recipe.title}"</h2>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-teal-400 py-1">Instructions :</h3>
                {Array.isArray(recipe.instruction) && recipe.instruction.length > 0 ? (
                  <ol className="list-decimal list-inside space-y-2">
                    {recipe.instruction.map((step, idx) => (
                    <div className="inline-flex gap-1">Step<li key={idx}> {step}</li></div>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-gray-400">No instructions provided.</p>
                )}
              </div>

              <div className="flex gap-10">
                <p>Calories: <strong>{recipe.calories}kcal</strong></p>
                <p>Protein: <strong>{recipe.protein}g</strong></p>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-red-400 mb-3">Missing Ingredients:</h3>
                {Array.isArray(recipe.missingItems) && recipe.missingItems.length > 0 ? (
                  <div className="flex gap-3">
                    {recipe.missingItems.map((item, idx) => (
                    <Badge key={idx}>{item}</Badge>
                    ))}
                    
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">None 🎉</p>
                )}
              </div>
              <div className="flex justify-center mt-10">
                <button onClick={()=>saveRecipe(recipe._id)} className="text-sm border border-gray-800 px-3 py-2 rounded-md flex items-center gap-2 mt-1">
              <Import size={16} />
              Save Recipe
              </button>

              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400">Recipe not yet generated</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
