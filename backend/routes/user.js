const express = require("express");
const zod = require('zod');
import { JWT_SECRET } from "../config";
import {User} from "../db";
const jwt = require('jsonwebtoken')

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: Zod.string()
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signup",async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: body.username
    })

    if(user._id){
        return res.status(411).json({
            message: "Invalid Email / Email already exists"
        })
    }

    const new_user = await User.create(body);

    const token = jwt.sign({
        userId: new_user._id
    },JWT_SECRET)

    return res.status(200).json({
        message: "User created successfully",
        token: token
    })
});

router.post('/signin',async (req,res)=>{
    const body = req.body;

    const {success} = signinSchema.safeParse(body);

    if(!success){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const my_user = await User.findOne({
        username: body.username,
        password: body.password
    })

    if(!my_user._id){
        return res.status(411).json({
            message: "Invalid username/password"
        })
    }

    const token = jwt.sign({userId: body.username }, JWT_SECRET);
    res.status(200).json({
        token: token
    })
})

module.exports = router;