//import {user} from '../db/dbConnection.js'
import {user} from '../models/userModel.js'
import bcryptjs from 'bcryptjs';
export const registerController = async (req,res)=>{
    const {username , email , password} = req.body;
    const existUser = await user.findOne({where:{username:username}})
    if(existUser!=null){
        return res.status(409).json({msg:"User already present"});
    } 
    const hashPass= await bcryptjs.hash(password , 10);
    const returnedUser  = await user.create({
        username:username ,
        email:email,
        password:hashPass
    })
     res.status(201).json(returnedUser);
}
