
import express, {Application}from "express";
import dotenv from "dotenv"
import { logger } from "./middleware/logger";
import { usersRoute } from "./users/users.route";


dotenv.config();
const app:Application = express()

//basic middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger)


const PORT =process.env.PORT || 5000

//DEFAULT ROUTE
app.get('/',(req,res)=>{
    res.send('Welcome to Express + Typescript');
})
//import route
app.use("/api",usersRoute)
app.listen(PORT,() =>{
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
})