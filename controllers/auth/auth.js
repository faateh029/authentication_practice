import jwt from 'jsonwebtoken';

export const generateAccessToken = (user)=>{
    const token = jwt.sign({username:user.username} , "abc" , {expiresIn:"15min"})
    return token;
}

export const generateRefreshToken = (user)=>{
    const token = jwt.sign({username:user.username} , "abc" , {expiresIn:"7days"})
    return token;
}