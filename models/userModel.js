import { DataTypes } from "sequelize";

const createUserModel = (sequelize)=>{
    const user = sequelize.define("User" , {
        "user_id":{
            type:DataTypes.INTEGER,
            autoincrement:true,
            primaryKey:true
        },
        "username":{
            type:DataTypes.STRING,
            allownull:false,
            unique:true
        },
        "email":{
            type:DataTypes.STRING,
            allownull:false,
            unique:true,
            validate:{isEmail:true}
        },
        "password":{
            type:DataTypes.STRING,
            allownull:false,
            
        },
        refreshToken:{
            type:DataTypes.INTEGER,
            allownull:true
        }
    })
    return user; 
}

export default createUserModel;