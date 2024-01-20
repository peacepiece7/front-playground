import http from 'http'
import { Server } from 'socket.io'
import express from 'express'
import path from 'path'
import { instrument } from '@socket.io/admin-ui'

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
const httpServer = http.createServer(app)

/**
 * @note {@link http://localhost:3000/socket.io/socket.io.js }로 접속하면 socket.io에서 제공하는 JS 코드를 볼 수 있습니다.
 *
 * 해당 정보를 클라이언트에 전송하면 다양한 socket.io 기능을 쓸 수 있게 됩니다.
 *
 * socket,io를 사용하는 모든 HTML 파일에 아래 예제 코드를 추가해야합니다.
 * @example
 * <script src="/socket.io/socket.io.js" />
 */
const wsServer = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
})

instrument(wsServer, {
  auth: false,
})

wsServer.on('connection', (socket) => {
  wsServer.emit('room_change', publicRooms())

  socket.on('enter_room', (room, nick, done) => {
    socket['nickname'] = nick ?? 'Unknown'
    socket.join(room)
    done()
    socket.to(room).emit('welcome', socket['nickname'])
    wsServer.to(room).emit('user_count', room, countUser(room))
    wsServer.emit('room_change', publicRooms())
  })

  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit('bye', socket['nickname'])
      wsServer.to(room).emit('user_count', room, countUser(room) - 1)
    })
  })

  socket.on('disconnect', () => {
    wsServer.emit('room_change', publicRooms())
    // wsServer.to(room).emit('user_count', room, countUser(room))
  })

  socket.on('new_message', (room, msg, done) => {
    socket.to(room).emit('new_message', `${socket.nickname}: ${msg}`)
    done()
  })
})

httpServer.listen(3000, () =>
  console.log(`Listening on http://localhost:3000 and ws://localhost:3000`)
)

// sids에는 개인방, rooms에는 개인방,공개방 모두 들어있음
function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer
  const publicRooms = []
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key)
    }
  })
  return publicRooms
}

function countUser(room) {
  return wsServer.sockets.adapter.rooms.get(room)?.size ?? 0
}
