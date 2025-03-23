import mongoose from "mongoose"
import User from "../models/user.model.js";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res, next )=>{
   
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name,email,password} = req.body;

        const existingUser = await User.findOne({email})
        
        if(existingUser){
            const error = new Error('User already exists with this email');
            error.statusCode = 400;
            throw error;
        }
        
        // Hash password
        const sold = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,sold);

        const newUsers = await User.create([{name,email,password:hashedPassword}],{session});

        const token = jwt.sign({userId: newUsers[0]._id},JWT_SECRET,{expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction()

        session.endSession();

        res.status(201).json({
            success: true,
            data: newUsers[0],
            token
        })

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error)
    }


}
export const login = async (req, res, next) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        console.log(user)
        if(!user){
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id},JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data:{
                user,
                token
            }
        })
    } catch (error) {
        next(error)

    }

}
export const logout = async (req, res, next) => {
    res.send({title: "Logout", message: "Logout a user"})
}