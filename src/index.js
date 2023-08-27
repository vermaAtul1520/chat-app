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
io.on('connection',()=>{
    console.log("New websocket connection!")
})
server.listen(port, () => {
    console.log(`Server is on port ${port}`)
})