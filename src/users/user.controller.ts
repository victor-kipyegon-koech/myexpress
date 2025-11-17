import { Request, Response } from "express";
import { getUserService } from "./user.service";
import { error } from "console";

export const getUser= async(req:Request,res:Response)=>{
  try {
    const allUsers =await getUserService();
    if (allUsers===null || allUsers.length ===0){
        res.status(404).json({message:"No users found"})
    } else{
        res.status(200).json(allUsers)

    }
  } catch (error:any){
    res.status(500).json({error:error.message})
  }
}

export const createUser=(req:Request,res:Response)=>{
    const newUser =req.body;

    res.status(201).send(`user created with :${newUser.fullName}`)
}

export const updateUser=(req:Request,res:Response)=>{
    const userId =req.params
    const updateUser =req.body;

    res.status(201).send(`user updated with :${updateUser.fullName}`)
}

export const deleteUser=(req:Request,res:Response)=>{
    const userId =req.params.id
     

    res.status(201).send(`user deleted with :${userId}`)
}
