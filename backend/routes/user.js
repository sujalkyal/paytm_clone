const express = require("express");
const zod = require('zod');
const { JWT_SECRET } = require("../config");
const {User} = require("../db");
const jwt = require('jsonwebtoken')
const { authMiddleware } = require("./middleware");

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateBodySchema = zod.object({
	password: zod.string().optional(),
	firstName: zod.string().optional(),
	lastName: zod.string().optional(),
});

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

    
	/// ----- Create new account ------

    await Account.create({
        userId: new_user._id,
        balance: 1 + Math.random() * 10000
    })
    
    /// -----  ------

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

router.put("/", authMiddleware, async (req, res) => {
	// Validate the request body
	const parseResult = updateBodySchema.safeParse(req.body);
	if (!parseResult.success) {
		return res.status(400).json({
			message: "Error while updating information",
		});
	}

	// Filter out undefined fields
	const updates = {};
	if (req.body.password !== undefined) updates.password = req.body.password;
	if (req.body.firstName !== undefined) updates.firstName = req.body.firstName;
	if (req.body.lastName !== undefined) updates.lastName = req.body.lastName;

	// Check if there are any fields to update
	if (Object.keys(updates).length === 0) {
		return res.status(400).json({
			message: "No valid fields provided for update",
		});
	}

	// Update the user in the database
	try {
		await User.updateOne({ _id: req.userId }, updates);
		res.json({
			message: "Updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Error while updating user information",
		});
	}
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;