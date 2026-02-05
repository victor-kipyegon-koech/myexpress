import { Request, Response } from "express";
import { createUserService, deleteUserservice, getUserService, updateUserService } from "./user.service";
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
    res.status(400).json({error:"ALL fields are required!"});
    return;
  }try {
    const newUser = await createUserService({fullName,email})
    if ( newUser=== null){
      res.status(500).json({message:"Failed to create user"}) 
    }else{
      res.status(200).json(newUser)
    }
  } catch (error:any) {
    res.status(500).json({error:error.message || "Failed to create user"})
  }
}

export const updateUser= async(req:Request,res:Response)=>{
      const userId =parseInt(req.params.id);
      const {fullName,email} = req.body;

      if(isNaN(userId)){
        res.status(400).json({error:"Invalid user ID "});
        return;
      }
      try {
        const updatedUser =await updateUserService(userId,{fullName,email})
      if(updateUser === null){ 
        res.status(400).json({message:"failed to update user"})
      return;
      }else{
        res.status(200).json(updateUser)
      }
       
}catch(error:any){
   res.status(401).json({error:error.message || "Failed to update"})
      }
      }  


export const deleteUser= async(req:Request,res:Response)=>{
    const userId =parseInt(req.params.id)
     if(isNaN(userId)){
      res.status(400).json({error:"Invalid user ID"});
      return;
     }
     try {
      const deletedUser=await deleteUserservice(userId)
      if(deletedUser){
        res.status(200).json({message:"user deleted successfully"});
      }else{
        res.status(404).json ({message:"user not found"})
      }
     } catch (error:any) {
      res.status(500).json({error:error.message || "Failed to delete user"});
      
     }

     
}
