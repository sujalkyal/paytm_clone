import mongoose from "mongoose";
const { Schema } = mongoose;

require('dotenv').config();

const MONGO_DB_URL = process.env.DATABASE_URL;

mongoose.connect(MONGO_DB_URL)
    .then(()=>{console.log("Connected to the database")})
    .catch((err)=>{console.log("error while connecting to the database")})

const UserSchema = new Schema({
    firstName : String , 
    lastName : String , 
    Password : Number
});

const User = mongoose.model('User',UserSchema);

export { User };