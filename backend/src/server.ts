import express,{Express,Request,Response} from 'express'
import dotenv from 'dotenv'
import { connectDB } from './libs/db';
import authRouter from  './routes/auth.routes'
import recipeRouter from './routes/recipe.route'
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();
const app:Express=express();
const PORT:number=parseInt(process.env.PORT || "3000",10);


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


app.use('/api/auth',authRouter)
app.use('/api/recipe',recipeRouter)


app.get("/test-cookie", (req:Request, res:Response) => {
  console.log("Cookies:", req.cookies); // Should log { token: "..." }
res.json({ cookies: req.cookies });
});


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

