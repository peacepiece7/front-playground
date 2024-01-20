const ul = document.querySelector('ul')
const msgForm = document.querySelector('form#message')
const nickForm = document.querySelector('form#nickname')

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener('open', () => {
  console.log('Connected to Server ✅')
})

socket.addEventListener('message', async (res) => {
  MessageUI.createLiWith(res.data).appendTo(ul)
  console.log('New message : ', res.data)
})

socket.addEventListener('close', () => {
  console.log('Disconnected from Server ❌')
})

/**
 * @description 서버로 메시지를 전송합니다.
 */
msgForm.addEventListener('submit', (event) => {
  event.preventDefault()
  socket.send(makeMessage('new_message', msgForm.querySelector('input').value))
})

/**
 * @description 서버로 닉네임을 전송합니다.
 */
nickForm.addEventListener('submit', (event) => {
  event.preventDefault()
  socket.send(makeMessage('nickname', nickForm.querySelector('input').value))
})

/**
 * @description UI에 메시지를 추가하는 클래스입니다.
 */
class MessageUI {
  static createLiWith(text) {
    const li = document.createElement('li')
    li.innerText = text
    this.li = li
    return this
  }

  static appendTo(parent) {
    parent.appendChild(this.li)
  }
}

function makeMessage(type, payload) {
  const msg = { type, payload }
  return JSON.stringify(msg)
}
