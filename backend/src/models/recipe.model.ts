import mongoose,{Schema,Document,Types} from "mongoose";

export interface IRecipe extends Document{
    user:Types.ObjectId,
    _id:mongoose.Types.ObjectId,
    input:string,
    taste?:string
    title:string,
    instruction:string[],
    calories:number,
    protein:number,
    missingItems?:string[],
    createdAt:Date
}

const recipeSchema= new Schema<IRecipe>({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    input:{
        type:String,
        required:true
    },
    taste:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    instruction:[
        {
            type:String,
            required:true
        }
    ],
    calories:{
        type:Number,
        required:true
    },
    protein:{
        type:Number,
        required:true
    },
    missingItems:[
        {
            type:String
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const Recipe=mongoose.model<IRecipe>("Recipe",recipeSchema)
export default Recipe;