# soketio

ws의 부가기능으로 채팅, 알림, 실시간 데이터 전송 등을 구현할 수 있다.

soket,io는 websoket의 기반으로 동작하고 있으며, ws의 기능을 확장하여 사용할 수 있게 해준다.

꽤나 장점이 많다.

- 와이 파이가 잠깐 끊겨도 다시 연결되면 이전에 연결되어 있던 정보를 유지할 수 있다.
- websocket이 안되는 브라우저에서도 사용할 수 있다. long pulling으로 대체한다.
- fire
- wall, proxy 등을 통과할 수 있다.

## adapter

in memory adaptor로 되어 있음.

# 참고

https://socket.io/docs/v4/server-api/#socket
