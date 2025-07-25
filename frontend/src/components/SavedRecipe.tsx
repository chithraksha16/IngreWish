import { useEffect } from "react";
import { useRecipeStore } from "../store/useRecipeStore";

const SavedRecipe = () => {
  const { getSavedRecipe, savedRecipe, deleteSavedRecipe } = useRecipeStore();

  useEffect(() => {
    getSavedRecipe();
  }, [getSavedRecipe]);



  
  console.log(savedRecipe)

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-indigo-950 to-black pb-10">
      <div className="pt-10">
        <h2 className="text-center text-lg font-semibold text-white">
          Saved Recipes
        </h2>
      </div>

      <div className="flex flex-col items-center gap-4 mt-6">
        {savedRecipe && savedRecipe.length > 0 ? (
          savedRecipe.flatMap((save) =>
            save.recipe.map((rec) => (
              <div
                key={rec._id}
                className="w-full max-w-4xl bg-white/10 text-white p-8 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-bold">{rec.title}</h3>

              <div className="py-2">
              <h3 className="text-lg text-teal-700 font-semibold">Instruction</h3>
              <ol className="list-decimal list-inside text-sm space-y-2" >
              {rec.instruction.map((instr,idx)=>(
                <li key={idx}>{instr}</li>
              ))}
              </ol>
              </div>

              <div className="flex gap-5 py-5 font-mono">
                <p>Calories:<strong>{rec.calories}</strong>kcal</p>
                <p>Protein:<strong>{rec.protein}</strong>g</p>
              </div>

              <div>
                <h3 className="text-lg text-red-400">Missing Item</h3>
                <ul className="flex text-xs gap-2 list-disc list-inside flex-wrap" >
                {rec.missingItems.map((item,idx)=>(
                  <li key={idx}>{item}</li> 
                ))
                }
                </ul>
              </div>
              <div className="flex justify-center py-5">
                <button onClick={()=>deleteSavedRecipe(save._id)} className="px-4 py-1 text-sm border border-gray-700 text-white hover:text-red-500 rounded-lg" >Delete</button>
              </div>
              </div>

            ))
          )
        ) : (
          <p className="text-white text-center">No saved recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default SavedRecipe;
