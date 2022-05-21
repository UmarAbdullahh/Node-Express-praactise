import express from 'express'
const app=express()
import {router} from './routes/router.js'
import bodyParser from 'body-parser'
import { errorHandler } from './middleware/error_handler.js'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const port=process.env.PORT || 4000
app.use(router)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`listening to the port at ${port}`)
})
