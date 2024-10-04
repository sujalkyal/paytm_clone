import mongoose from "mongoose";
const { Schema } = mongoose;

require('dotenv').config();

const MONGO_DB_URL = process.env.DATABASE_URL;

mongoose.connect(MONGO_DB_URL)
    .then(()=>{console.log("Connected to the database")})
    .catch((err)=>{console.log("error while connecting to the database")})

const UserSchema = new Schema({
    firstName : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    Password : {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 20
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = { User };