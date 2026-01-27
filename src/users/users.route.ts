import { Router } from "express";
import { createUser, deleteUser, getUser, updateUser } from "./user.controller";

export const usersRoute = Router();

//GET USERS
usersRoute.get('/user',getUser )

//CREATE A USERS
usersRoute.post('/user',createUser)

//update user
usersRoute.put('/user/:id',updateUser)
//delete
usersRoute.delete('/user/:id',deleteUser)

 