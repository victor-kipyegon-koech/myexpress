
import express, {Application}from "express";
import dotenv from "dotenv"
import { logger } from "./middleware/logger";
import { usersRoute } from "./users/users.route";
import client from "./db/db";
import { error } from "console";


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

//connect to the database,then start the server
client.connect().then(()=>{
    console.log("connected to the postgres database")
    app.listen(PORT,() =>{
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
}).catch((error)=>{
    console.log("failed to connect to the DB ",error)
    process.exit(1)
})


