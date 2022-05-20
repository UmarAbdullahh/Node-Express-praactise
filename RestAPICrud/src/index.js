import express from 'express'
const app=express()
const port=process.env.PORT || 4000
app.get('/',(req,res)=>{
    res.send('heelo world')
})
app.listen(port,()=>{
    console.log(`listening to the port at ${port}`)
})
