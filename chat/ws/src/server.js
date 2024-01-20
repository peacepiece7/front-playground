import http from 'http'
import { WebSocketServer } from 'ws'
import express from 'express'
import path from 'path'

const app = express()
const __dirname = path.resolve()

app.set('view engine', 'pug')
app.set('views', __dirname + '/src/views')
app.use('/public', express.static(__dirname + '/src/public'))

app.get('/', (_req, res) => res.render('home'))
app.get('/*', (_req, res) => res.redirect('/'))

/**
 * @note ws://localhost:3000, http://localhost:3000 둘다 같은 서버에 띄웠는데
 * 필요에 따라 다른 포트를 써도 됩니다.
 */

const server = http.createServer(app)
const wss = new WebSocketServer({ server })

/**
 * @description 소켓을 저장할 배열입니다.
 * 메모리에 저장하지 않기 때문에 서버가 꺼지면 데이터가 날아갑니다.
 */
const sockets = []

// * 소켓 연결
wss.on('connection', (socket) => {
  socket['nickname'] = 'Unknown'
  sockets.push(socket)
  console.log('Connected to Browser ✅')

  // * 메시지 수신
  socket.on('message', (msg) => {
    const parsedMsg = JSON.parse(msg.toString())
    switch (parsedMsg.type) {
      case 'new_message':
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${parsedMsg.payload}`)
        )
        break
      case 'nickname':
        socket['nickname'] = parsedMsg.payload
        break
    }
  })

  // * 연결 해제
  socket.on('close', () => {
    console.log('Disconnected from Browser ❌')
  })
})

server.listen(3000, () =>
  console.log(`Listening on http://localhost:3000 and ws://localhost:3000`)
)
