import {User} from '../db/models/signup.js'
export async function authenticate(req,res){
    try{
   const data= await User.findOne({email:req.body.email})
            if(req.body.password==data.password){
                res.json({status:"success", message: "user found!!!", data:{user: data}})
            }
            else{
                res.json({status:"error", message: "invalid password!!!", data:null})
            }
    }catch(err) {
        res.json({status:"error", message: "invalid email!!!", data:null})
    }
}