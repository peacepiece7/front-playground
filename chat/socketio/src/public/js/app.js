// * Room 입장 전
const welcomeDiv = document.getElementById('welcome')
const roomForm = document.querySelector('#room-form')
// * Room 입장 후
const roomDiv = document.getElementById('room')
const msgForm = document.getElementById('msg-form')

roomDiv.hidden = true

const socket = io()

let roomName = ''
// * Room 입장
roomForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const roomInput = roomForm.querySelector('input#room-name')
  const nickInput = roomForm.querySelector('input#nickname')
  socket.emit('enter_room', roomInput.value, nickInput.value, () => {
    roomDiv.hidden = false
    welcomeDiv.hidden = true
    roomName = roomInput.value
    fetchTitle(`Room ${roomInput.value}`)
    roomInput.value = ''
  })
})

// * Message 송수신
msgForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = msgForm.querySelector('input')
  // 자신이 보낸 메시지는 자신에게 수신되지 않기 때문에 다음과 같이 추가해 줘야 합니다.
  socket.emit('new_message', roomName, input.value, () => {
    addMsg(`YOU : ${input.value}`)
    input.value = ''
  })
})

socket.on('welcome', (name) => {
  addMsg(`User ${name} joined`)
})

socket.on('room_change', fetchRoomList)

socket.on('new_message', addMsg)

socket.on('bye', (name) => {
  addMsg(`User ${name} left ㅠㅠ`)
})

socket.on('user_count', (roomName, count) => {
  fetchTitle(`Room ${roomName} (${count})`)
})

/**
 *
 *
 *
 *
 */
function fetchTitle(title) {
  const roomTitle = room.querySelector('h3#room-title')
  roomTitle.innerText = `Room ${title}`
}

function addMsg(msg) {
  const ul = roomDiv.querySelector('ul')
  const li = document.createElement('li')
  li.innerText = msg
  ul.appendChild(li)
}

function fetchRoomList(rooms) {
  const roomList = document.getElementById('room-list')
  roomList.innerHTML = ''
  if (rooms.length === 0) {
    return
  }
  rooms.forEach((room) => {
    const li = document.createElement('li')
    li.innerText = room
    roomList.appendChild(li)
  })
}
