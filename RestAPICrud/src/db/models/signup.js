import mongoose from 'mongoose'
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
})
export const User=mongoose.model('User',userSchema)