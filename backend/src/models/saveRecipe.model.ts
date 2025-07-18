import mongoose,{Schema,Types,Document,model} from "mongoose";


interface ISaveRecipe extends Document{
    _id:Types.ObjectId,
    user:Types.ObjectId
    recipe:Types.ObjectId
}


const saveRecipeSchema=new Schema<ISaveRecipe>({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    recipe:{
        type:Schema.Types.ObjectId,
        ref:'Recipe',
        required:true
    }
},{timestamps:true})

const SaveRecipe=model<ISaveRecipe>("SaveRecipe",saveRecipeSchema)
export default  SaveRecipe