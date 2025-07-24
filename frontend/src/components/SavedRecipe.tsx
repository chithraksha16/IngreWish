import { useEffect } from "react";
import { useRecipeStore } from "../store/useRecipeStore";

const SavedRecipe = () => {
  const { getSavedRecipe, savedRecipe } = useRecipeStore();

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
                className="w-full max-w-2xl bg-white/10 text-white p-4 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-bold">{rec.title}</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Taste: {rec.taste}
                </p>
                <p className="text-sm">{rec.input}</p>
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
