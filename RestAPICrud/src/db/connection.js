import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/restapi',{
    useNewUrlParser:true,
    //  useVisitedTopology:true,
    // useFindAndModify:true
}).then(()=>{
    console.log('connection successful')
}).catch((err)=>{
    console.log(`error :${err}`)
})