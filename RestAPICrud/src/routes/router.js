import express from "express"
export const router=express.Router()
import jwt from "jsonwebtoken"
import expressSession from 'express-session'
import  passport from "passport"
import {User} from '../db/models/signup.js'
import '../db/connection.js'
import {authorize} from '../middleware/authorization.js'
// import {authenticate} from '../middleware/authentication.js'
import {initializingPassport} from '../middleware/authentication.js'
initializingPassport(passport)
router.use(expressSession({
        secret:'secret',
        resave:false,
        saveUninitialized:false}))
router.use(passport.initialize())
router.use(passport.session())



router.get('/',(req,res)=>{
    res.send('from router')
})
router.post('/users',async(req,res)=>{ //signup
   try{
       const user=new User(req.body)
       const result=await user.save()
       res.status(201).send(result)
   }
   catch(err){
       res.status(400).send(err)
   }
})
router.get('/users',passport.authenticate('jwt', { session : false }),async(req,res)=>{
    try{
    const data=await User.find()
    res.send(data)
    }catch(err){
        res.status(400).send(err)
    }
})
router.get('/users/:id',async(req,res)=>{
    try{
    const data=await User.findById(req.params.id)
    res.send(data)
    } catch(err){
        res.status(400).send(err)
    }
})
router.patch('/users/:id',async(req,res)=>{
    try{
    await User.findByIdAndUpdate(req.params.id,req.body)
    res.status(201).send("user updated")
    }
    catch(err){
        res.status(400).send(err)
    }
})
router.delete('/users/:id',async(req,res)=>{
   try{
    await User.findByIdAndDelete(req.params.id)
    res.status(201).send("user deleted")
   }catch(err){
    res.status(400).send(err)
   }
})

router.post('/login',async(req,res,next)=>{
    passport.authenticate('login',async(err,user,info)=>{   //login authentication passport
        try{
            if(err || !user){
                const error=new Error('an error occured')
                return next(error)
            }
            req.login(user,{session:false},async(error)=>{
                if(error) return next(error)
                const body={_id:user._id,email:user.email};
                const token=jwt.sign({user:body},'top_secret')
                res.json({token})
            });
        }catch(err){
            return next(err)

        }
    })(req,res,next)
}) 

router.get('/profile', passport.authenticate('jwt',{session:false}),(req, res, next) => {
    //We'll just send back the user details and the token
    res.json({
      message : 'You made it to the secure route',
      user : req.user,
      token : req.query.secret_token
    })
  });

router.use('*', (req, res) => {
    res.status(404).json({
      success: 'false',
      message: 'Page not found',
      error: {
        statusCode: 404,
        message: 'You reached a route that is not defined on this server',
      },
    })
  })


