import { Request, Response, Router } from "express";

export const usersRoute = Router();

//GET USERS
usersRoute.get('/user', (req:Request,res:Response)=>{
    res.send("users route is working")
})

//CREATE A USERS
usersRoute.post('/user',(req:Request,res:Response)=>{
    const newUser =req.body;

    res.status(201).send(`user created with :${newUser.fullName}`)
})

//update user
usersRoute.put('/user/:id',(req:Request,res:Response)=>{
    const userId =req.params
    const updateUser =req.body;

    res.status(201).send(`user updated with :${updateUser.fullName}`)
})

//delete
usersRoute.delete('/user/:id',(req:Request,res:Response)=>{
    const userId =req.params.id
     

    res.status(201).send(`user deleted with :${userId}`)
})

