import mongoose,{Document,Schema} from "mongoose";


export interface IUser extends Document {
    _id:mongoose.Types.ObjectId,
    name:string,
    email:string,
    password:string,
    createdAt?:Date,
    updatedAt?:Date
}

const userSchema: Schema<IUser>= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true})


const User= mongoose.model<IUser>("User",userSchema)
export default User