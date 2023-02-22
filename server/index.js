import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

// const io = io(http, {
//   cors: { origin: '*' },
// })
io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('message', (message) => {
    console.log(message)
    io.emit('message', `${socket.id.substr(0, 2)} said {message}`)
  })
})

server.listen(3000, () => {
  console.log('💬 Listening on *:3000')
})
