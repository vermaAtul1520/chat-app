const path=require('path')
const http=require('http')
const express=require('express');
const socketio=require('socket.io')

const Filter = require('bad-words')
const filter = new Filter();

// add all voulger word here which is blocking
filter.addWords('maaderchood','bsdik','gandu');


const app=express();
const server=http.createServer(app)
const io=socketio(server);

const port=process.env.port || 3000
const publicDirectory=path.join(__dirname,'../public')

app.use(express.static(publicDirectory))

// This function called when new user or instance connected with server

let count=0;

io.on('connection',(socket)=>{
    console.log("Your welcome in group")

    socket.emit('chat message','Welcome!!')
    socket.broadcast.emit('chat message','New user Joined chat room!!')
    socket.on('chat message', (msg,acknowledgement) => {
        if(filter.isProfane(msg)){
            io.emit('chat message', 'This msg can not shown its having voulger content');
            acknowledgement('You are not allowed to use such language')
        }else{
            io.emit('chat message', msg);
            acknowledgement('Delivered')
        }
    });

    socket.on('sendLocation',(coords,acknowledgement)=>{
        io.emit('sendLocation',`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`);
        acknowledgement('Location Shared');
    })

    // socket.emit('countUpdated',count)

    // socket.on('increment',()=>{
    //     count++;
     //   // socket.emit('countUpdated',count)
    //     io.emit('countUpdated',count)
    // })

    socket.on('disconnect',()=>{
        io.emit('chat message', 'A user has left the meeting!!');
    })
})

server.listen(port, () => {
    console.log(`Server is on port ${port}`)
})