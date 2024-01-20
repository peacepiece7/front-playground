# Zoom clone using NodeJs, WebRTC and Websockets.

# WebSocket

di-directional communication between client and server

# WS

[Node.js WebSocket library](https://www.npmjs.com/package/ws)

Websocket의 프로토콜을 구현한 라이브러리이다.

Node.js를 사용해서 websocket을 구현한다면 ws를 사용할 수 있고

대부분 Node.js socket 통신 관련 라이브러리는 내부적으로 ws를 사용한다.

[RFC6455](https://www.rfc-editor.org/rfc/rfc6455.html)
[MDN WebSocket](https://developer.mozilla.org/ko/docs/Web/API/WebSocket/WebSocket)
[MDN WebSocket API](https://developer.mozilla.org/ko/docs/Web/API/WebSocket)

## websocket 알아두면 좋은 것

### HTTP 방식으로 실시간성 보장

다음은 HTTP 프로토콜 기반으로 실시간성을 보장하기 위한 통신 방식으로

패킷 자체가 websocket에 비해 크다.

1. pulling

   - client가 일정한 주기로 server에 요청을 보내는 방식
   - 서버에서 보낼 데이터가 없어도 클라이언트는 알 수 없기 떄문에 오버헤드 발생
   - 월드컵 경기처럼 트래픽이 몰리는 경우 네이버에서 폴링 방식으로 스트리밍 하는 것을 본 적이 있다.

2. long polling

   - client가 server에 요청을 보내고, server가 응답을 보낼 때까지 대기하는 방식
   - 서버에서 보낼 데이터가 있을 경우만 전송할 수 있음
   - pulling과 비슷한 경우에 사용할 수 있다. 주식 시장에서 사용하는 것을 본 적이 있다.

3. HTTP Streaming
   - client가 server에 요청을 보내고, server가 응답을 보낸 후, 연결을 끊지 않고 계속 유지하는 방식
   - 클라이언트에서 서버로 요청을 보내는데 어려움이 있다.
   - 동영상 스트리밍에 사용된다.

## websocket 참고자료

https://www.npmjs.com/package/ws

https://hudi.blog/websocket-with-nodejs/
