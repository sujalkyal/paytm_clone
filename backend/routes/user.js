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

router.post("/signup",(req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = User.findOne({
        username: body.username
    })

    if(user._id){
        return res.status(411).json({
            message: "Invalid Email / Email already exists"
        })
    }

    const new_user = User.create(body);

    const token = jwt.sign({
        userId: new_user._id
    },JWT_SECRET)

    return res.status(200).json({
        message: "User created successfully",
        token: token
    })
});

module.exports = router;