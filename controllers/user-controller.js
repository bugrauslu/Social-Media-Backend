/** @format */

import User from "../model/User";
import bcrypt from "bcryptjs";

//ALLUSER
export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if (!users) {
        return res.status(404).json({message: "no user found"});
    }
    return res.status(200).json({users});
};

//SIGNUP
export const signup = async (req, res, next) => {
    const {name, email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if (existingUser) {
        return res.status(400).json({message: "User Already Exist! Login Instead"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[],
    });

    try {
        user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({user});
};

//LOGIN
export const login = async (req, res, next) => {
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if (!existingUser) {
        return res.status(404).json({message: "couldnt Find User by this Email"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({message: "Incorrect Password"});
    }
    return res.status(200).json({message: "Login Successfull"});
};
