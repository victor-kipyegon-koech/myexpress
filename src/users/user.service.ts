import { Query } from "pg";
import client from "../db/db";
import { user } from "../types/types";
 


//Get all users
export const getUserService =async():Promise<user[] | null> =>{
  const Query =` SELECT * FROM userTable`
  const results= await client.query(Query)
  return results.rows
}

export const getUserByIdService = async (userId:number):Promise<user | null>=>{
    const query =`SELECT * FROM userTable WHERE userId =$1`
    const results = await client.query(query,[userId])
    return results.rows[0] || null
}