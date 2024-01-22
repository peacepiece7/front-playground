# 도커파일 설명

FROM

- 어떤 이미지를 기반으로 할 것인지 설정
- EX) `node:16-alpine`
  WORKDIR

- 작업 디렉토리 설정

COPY

- 파일 복사, <FROM> <TO>로 작성
- EX) COPY package.json ./
- EX) CPOY ./ ./

RUN

- 컨테이너 내부에서 명령어를 실행할 때 사용
- EX) RUN npm install

CMD

- 컨테이너가 시작되었을 때 실행할 명령어를 설정
- EX) CMD ["npm", "run", "start"]

# 리액트 이미지 실행

`docker build ./'

`docker run aazxc` 명령어 입력시 실행 잘 된다.

# localhost에 접근이 안되는 이유

이는 컨테이 내부 포트와 컨테이너가 올려져 있는 호스트의 포트를 연결해줘야 하기 때문이다.

이를 포트 매핑이라한다.

`docker run -p 3000:3000 aazxc` 이렇게 작성해줘야 한다.

## vite 포트 매핑 이슈

https://velog.io/@goeun23/vitedocker-%EC%84%9C%EB%B2%84-%EB%9D%84%EC%9A%B0%EA%B8%B0

# 요약

docker 설치

dockerfile 작성

docker build ./

docker run -p <내부 포트>:<외부 포트> <이미지 파일 이름>
