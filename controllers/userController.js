//import {user} from '../db/dbConnection.js'
import {user} from '../models/userModel.js'
import { generateAccessToken, generateRefreshToken } from './auth/auth.js';
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
export const loginController = async(req,res)=>{
    const {username,email,password} = req.body;
    const existUser = await user.findOne({where:{username:username}});
    console.log(existUser);
    const accessToken = generateAccessToken(existUser.dataValues);
        const refreshToken = generateRefreshToken(existUser.dataValues);
    if(!existUser){
        return res.status(400).json({msg:"username incorrect"});
    }else{
        const checkPass = await bcryptjs.compare(password, existUser.password);
        if(!checkPass){
            return res.status(500).json({msg:"Credentials invalid"})
       }
       await existUser.update({refreshToken:refreshToken})
       res.cookie("refreshToken", refreshToken , {httpOnly:true , secure:true});
        res.status(200).json({msg:"user logged in" 
            , userData:{ 
                username:existUser.dataValues.username , 
                refreshToken:refreshToken,
                accessToken:accessToken}
            });
    }

}
