import { DataTypes } from "sequelize";

const createUserModel = (sequelize) => {
    const user = sequelize.define("User", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,  // Fixed: was "autoincrement" 
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,     // Fixed: was "allownull"
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,     // Fixed: was "allownull"
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false      // Fixed: was "allownull"
        },
        refreshToken: {
            type: DataTypes.STRING,  // Fixed: should be STRING, not INTEGER
            allowNull: true          // Fixed: was "allownull"
        }
    }, {
        timestamps: false  // Fixed: moved to options object
    });
    
    return user; 
}

export default createUserModel;