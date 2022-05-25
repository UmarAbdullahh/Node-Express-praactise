import express from 'express'
import _ from 'lodash'
const app=express()
import http from 'http'
const server=http.createServer(app)
import {Server} from 'socket.io'
const io=new Server(server)
import {router} from './routes/router.js'
import bodyParser from 'body-parser'
import { errorHandler } from './middleware/error_handler.js'
import passport from 'passport'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const port=process.env.PORT || 4000
app.use('/',router)
app.use(errorHandler)
app.set('view engine','hbs')





let users = {};
io.on('connection',(socket)=>{
    console.log('connected....')
    let userId = socket.handshake.query.userId;
        socket.on('chat message', (msg) => {
            socket.broadcast.emit('chat message', msg);// everyone except self
            // io.emit() //every one
          });
    if (!users[userId]) users[userId] = [];
  users[userId].push(socket.id);
  io.emit("online", userId);
  console.log(userId, "Is Online!", socket.id);
  socket.on('disconnect', (reason) => {
    _.remove(users[userId], (u) => u === socket.id);
    if (users[userId].length === 0) { 
      io.emit("offline", userId);
      delete users[userId];
    }
    socket.disconnect(); 
    console.log(userId, "Is Offline!", socket.id);
  });
})
server.listen(port,()=>{
    console.log(`listening to the port at ${port}`)
})
