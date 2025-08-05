import { DataTypes , Model} from "sequelize";
import { sequelize } from "../db/dbConnection.js";
export class user extends Model{};

       user.init({
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
        sequelize,
        modelName:"user",
        tableName:"Users",
        timestamps: false  // Fixed: moved to options object
    });
    
   