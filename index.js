const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () =>{
    console.log(`server running on port ${port}`)
})

app.get('/', (req, res) =>{
    res.sendFile(
        __dirname + "/public/index.html"
    );
});

//Creating namespaces
const tech = io.of('/tech')

tech.on("connection", (socket) => {
    console.log("User is connected");
    // socket.emit('message', {manny: 'hey there, how are you?'})
    socket.on('message', (msg) =>{
        console.log(`message ${msg}`);
        tech.emit('message', msg)
    });
    socket.on('disconnect', ()=>{
        console.log('User disconnected')
        tech.emit('message', 'User has been disconneted');
    })
});