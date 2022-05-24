import passport from 'passport'
import passportLocal from 'passport-local'
const localStrategy=passportLocal.Strategy
import passportJwt from 'passport-jwt'
const JWTStrategy=passportJwt.Strategy
const ExtractJWT=passportJwt.ExtractJwt
import {User} from '../db/models/signup.js'

// export async function authenticate(req,res){ //simple authentication
//     try{
//    const data= await User.findOne({email:req.body.email})
//             if(req.body.password==data.password){
//                 res.json({status:"success", message: "user found!!!", data:{user: data}})
//             }
//             else{
//                 res.json({status:"error", message: "invalid password!!!", data:null})
//             }
//     }catch(err) {
//         res.json({status:"error", message: "invalid email!!!", data:null})
//     }
// }

// ***Using passport***

export function initializingPassport(passport){
    passport.use('login',new localStrategy({
        "usernameField":"email",
        "passwordField":"password"
    },async (email,password,done)=>{
        try{
            const user=await User.findOne({email:email})

            if(!user) return done(null,false,{ message : 'user not found'})
            const validate=await user.isValidPassword(password);
            if(!validate) return done(null,false,{ message : 'Wrong Password'})
            return done(null,user,{ message : 'Logged In Successfully'})
        }
        catch(err){
            return done(err,false)
        }   
    })
    )
    passport.serializeUser(function(user,done){
        done(null,user.id)
    })
    passport.deserializeUser(async function(id,done){
        try{
            const user=await User.findById(id)
                done(null,user)
        }
        catch(err){
            done(err,false)
        }
    }) // jwt strategy for jwt authorization
    let opts = {}
opts.jwtFromRequest = ExtractJWT.fromUrlQueryParameter('secret_token')
opts.secretOrKey = 'top_secret';
passport.use(new JWTStrategy(opts,async(token, done)=> {
    try{
        return done(null,token.user)
    }catch(err){
        done(err)
    }
    })
)
}



