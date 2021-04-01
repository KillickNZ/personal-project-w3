
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/public/style.css')
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
        })
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
    })
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})

http.listen(PORT, () => {
    console.log('listening on port 3000')
})