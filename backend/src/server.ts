import express,{Express} from 'express'
import dotenv from 'dotenv'
import { connectDB } from './libs/db';
import authRouter from  './routes/auth.routes'
import cookieParser from 'cookie-parser';


dotenv.config();
const app:Express=express();
const PORT:string | number=process.env.PORT || 3000;


app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)


const startServer=async():Promise<void>=>{
    try{
    await connectDB()
    app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
    });
    }
    catch(error:any){
        console.error("failed in starting server and db connection",error.message)
        process.exit(1);
    }
}

startServer();

