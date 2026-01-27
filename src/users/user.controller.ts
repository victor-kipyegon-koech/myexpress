import { Request, Response } from "express";
import { createUserService, getUserService } from "./user.service";
import { error } from "console";
import { escape } from "querystring";

export const getUser= async(req:Request,res:Response)=>{
  try {
    const allUsers =await getUserService();
    if (allUsers===null || allUsers.length ===0){
        res.status(404).json({message:"No users found"})
    } else{
        res.status(200).json(allUsers)

    }
  } catch (error:any){
    res.status(500).json({error:error.message || "failed to fetch the users"})
  }
}

export const createUser= async(req:Request,res:Response)=>{
  const {fullName,email} = req.body;
  if(!fullName || !email ){
    res.send(400).json({error:"ALL fields are required!"});
    return;
  }try {
    const newUser = await createUserService({fullName,email})
    if ( newUser=== null){
      res.status(500).json({message:"Failed ro create user"}) 
    }else{
      res.status(200).json(newUser)
    }
  } catch (error:any) {
    res.status(500).json({error:error.message || "Failed to create user"})
  }
}

export const updateUser= async(req:Request,res:Response)=>{
    const userId =req.params
    const updateUser =req.body;

    res.status(201).send(`user updated with :${updateUser.fullName}`)
}

export const deleteUser= async(req:Request,res:Response)=>{
    const userId =req.params.id
     

    res.status(201).send(`user deleted with :${userId}`)
}
