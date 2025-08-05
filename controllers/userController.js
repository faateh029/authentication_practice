import jwt from 'jsonwebtoken';
import {user} from '../models/userModel.js'
import { generateAccessToken, generateRefreshToken } from './auth/auth.js';
import bcryptjs from 'bcryptjs';

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const existUser = await user.findOne({ where: { username } });
        if (existUser) {
            return res.status(409).json({ msg: "Username already in use" });
        }

        const existEmail = await user.findOne({ where: { email } });
        if (existEmail) {
            return res.status(409).json({ msg: "Email already in use" });
        }

        const hashPass = await bcryptjs.hash(password, 10);

        const newUser = await user.create({
            username,
            email,
            password: hashPass
        });

        const { password: _, ...userData } = newUser.dataValues;

        res.status(201).json(userData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ msg: "Username and password required" });
        }

        const existUser = await user.findOne({ where: { username } });

        if (!existUser) {
            return res.status(401).json({ msg: "Invalid username or password" });
        }

        const checkPass = await bcryptjs.compare(password, existUser.password);

        if (!checkPass) {
            return res.status(401).json({ msg: "Invalid username or password" });
        }

        const accessToken = generateAccessToken(existUser.dataValues);
        const refreshToken = generateRefreshToken(existUser.dataValues);

        // Save refreshToken in DB
        await existUser.update({ refreshToken });

        // Set refreshToken in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        res.status(200).json({
            msg: "User logged in",
            userData: {
                username: existUser.username,
                accessToken: accessToken
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const refreshController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(403).json({ msg: "Refresh token not provided" });
        }

        const retUser = await user.findOne({ where: { refreshToken } });

        if (!retUser) {
            return res.status(404).json({ msg: "User with this token not found" });
        }

        jwt.verify(refreshToken, "abc", (error, decoded) => {
            if (error) {
                return res.status(403).json({ msg: "Invalid or expired refresh token" });
            }

            const accessToken = generateAccessToken(retUser.dataValues);
            return res.status(200).json({ accessToken });
        });

    } catch (err) {
        console.error("Refresh error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};
    

    
export const logoutController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(403).json({ msg: "Refresh token not provided" });
        }

        const tokenUser = await user.findOne({ where: { refreshToken } });

        if (!tokenUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Invalidate the token
        await tokenUser.update({ refreshToken: null });

        // Clear the cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        return res.status(200).json({ msg: "Logout successful" });

    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};


export const profileController =async (req,res)=>{
    return res.json("dashboard");
}