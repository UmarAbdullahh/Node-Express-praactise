import express from "express"
export const router=express.Router()
import {User} from '../db/models/signup.js'
import '../db/connection.js'
import {authenticate} from '../middleware/authentication.js'
import {authorize} from '../middleware/authorization.js'

router.get('/',(req,res)=>{
    res.send('from router')
})
router.post('/users',authorize(["Admin"]),async(req,res)=>{ //signup
   try{
       const user=new User(req.body)
       const result=await user.save()
       res.status(201).send(result)
   }
   catch(err){
       res.status(400).send(err)
   }
})
router.get('/users',authorize(["Admin","User"]),async(req,res)=>{
    try{
    const data=await User.find()
    res.send(data)
    }catch(err){
        res.status(400).send(err)
    }
})
router.get('/users/:id',authorize(["Admin"]),async(req,res)=>{
    try{
    const data=await User.findById(req.params.id)
    res.send(data)
    } catch(err){
        res.status(400).send(err)
    }
})
router.patch('/users/:id',authorize(["Admin"]),async(req,res)=>{
    try{
    await User.findByIdAndUpdate(req.params.id,req.body)
    res.status(201).send("user updated")
    }
    catch(err){
        res.status(400).send(err)
    }
})
router.delete('/users/:id',authorize(["Admin"]),async(req,res)=>{
   try{
    await User.findByIdAndDelete(req.params.id)
    res.status(201).send("user deleted")
   }catch(err){
    res.status(400).send(err)
   }
})

router.post('/login',authenticate) //login authentication


