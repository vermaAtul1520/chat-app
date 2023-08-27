const path=require('path')
const http=require('http')
const express=require('express');
const socketio=require('socket.io')

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
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('sendLocation',(coords,acknowledgement)=>{
        socket.broadcast.emit('chat message',`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`);
        acknowledgement('Delivered');
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