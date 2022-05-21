export function authorize(permissions){
    return (req,res,next)=>{
        const userRole=req.body.role
        console.log(userRole)
        if(permissions.includes(userRole)){
            next()
            // res.json({status:"success", message: "authorized"})
           
        }
        else{
            res.status(401).json({status:"error", message: "you do not have permission"})
        }

    }
} 
