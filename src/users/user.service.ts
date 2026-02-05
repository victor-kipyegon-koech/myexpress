import { Query } from "pg";
import client from "../db/db";
import { user, userCreateRequest } from "../types/types";
 


//Get all users
export const getUserService =async():Promise<user[] | null> =>{
  const Query =` SELECT * FROM public."userTable"`
  const results= await client.query(Query)
  return results.rows
}

export  const getUserByIdService = async (userId:number):Promise<user | null>=>{
    const query =`SELECT * FROM  public. "userTable" WHERE userId =$1`
    const results = await client.query(query,[userId])
    return results.rows[0] || null
}
export const createUserService = async(user:userCreateRequest)=>{
  const query =`INSERT INTO public."userTable"("fullName","email") VALUES
($1,$2)RETURNING *`;
const values = [user.fullName,user.email];
const results = await client.query(query,values);
return results .rows[0] || null 

}
export const updateUserService = async(userid:number,user:userCreateRequest)=>{
 const query =` UPDATE public."userTable"
           SET"fullName =$1."email" =$2 WHERE "userid" =$3 RETURNING * `
  const values= [user.fullName,user.email,userid];
  const results = await client.query(query,values);
  return results.rows[0] || null;           
             
}
export const deleteUserservice = async (userid:number):Promise<boolean> =>{
const query =`DELETE FROM public."userTable" WHERE "userid" = $1`;
const results = await client.query(query,[userid]);
return (results.rowCount ?? 0)>0; //returns true if a row was deleted
}