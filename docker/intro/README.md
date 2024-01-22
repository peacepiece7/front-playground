# Docker-example

컨테이너를 사용하여 응용프로그램을 더 쉽게 만들고 배포하고 실행할 수 있도록 설계된 도구이고

컨테이너 기반의 오픈소스 가상화 플랫폼이며 생태계이다.

https://learn.microsoft.com/ko-kr/windows/wsl/install

https://velog.io/@taegyeong0225/docker-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0...An-unexpected-error-occurred

#

C:\Windows\System32>wsl --install
Ubuntu이(가) 이미 설치되어 있습니다.
Ubuntu을(를) 시작하는 중...
Installing, this may take a few minutes...
WslRegisterDistribution failed with error: 0x80370102
Please enable the Virtual Machine Platform Windows feature and ensure virtualization is enabled in the BIOS.
For information please visit https://aka.ms/enablevirtualization
Press any key to continue...
작업을 완료했습니다.

https://velog.io/@jaylnne/WSL-Error-0x80370102-%ED%95%B4%EA%B2%B0

# docker의 흐름

docker client CLI -> docker server daemon(이미지, 컨테이너 실행 등 모든 작업)

다음 명령어의 흐름 이해하기

```
docker run hello-world
```

1. 로컬에 hello-world 이미가 있다.
   1.1 실행
2. 로컬에 hello-world 이미가 없다.
   2.1 docker hub에서 이미지 바당옴
   2.2 로컬에 이미지 캐시
   2.3 실행

# docker 이미지

컨테이너 실행에 필요한 파일과 설정값등을 포함하고 있는 것을 말한다.

이미지는 두가지가 필요함

1. 실행 명령어
2. 파일 스냅샷\*

\*스냅샷 : 디렉터리, 파일을 복사해둔 것

예를들어 카카오톡 이미지를 만든다면

docker run kakaotalk 이라는 명령어와

카카오톡 파일 스냅샷을 가지고 있어야 한다.

# 이미지로 컨테이너 만들기

컨테이너란 이미지 파일을 실행한 상태라고 볼 수 있다.

OS에 영향을 받지 않고 실행할 수 있는 격리된 공간을 제공해준다.

다음과 같은 흐름으로 컨테이너를 만들 수 있다.

1. docker run hello-world
2. 커널은 이미지를 실행하는데 필요한 RAM, CPU 등 자원을 할당하고
   하드 디스크에 hello-world 이미지를 저장한다. 이 공간을 컨테이너라고 한다.
3. hello-world 실행 파일을 컨테이너에서 실행한다.

# 도커 이미지 직접 만들기

도커 이미지는 컨테이너를 만들기위한 설정, 종속성을 가지고 있는 소프트웨어 패키지이다.

직접 만들어서 업로드하거나. 다른 사람이 만든 이미지를 내려받아 사용할 수 있다.

```
docker create <image name>
```

## 도커 이미지 만드는 방법

1. 도커 파일 작성 (도커 이미지 설정 파일)
2. 도커 클라이언트 (도커 파일에 명령어가 도커 클라이언트로 전달)
3. 도커 서버 (도커 클라이언트에 전달된 모든 중요한 작업을 실행)
4. 이미지 생성

## 도커 파일 만들기

- 베이지 이미지 작성
  - 베이스 이미지란? OS 라고 생각하면 된다. window, Linux 등
- 추가적으로 필요한 파일 명령어로 명시
  - 베이지 이미지 위에 쌓임(레이어 캐싱이라고 함)
- 컨테이너 시작 시 실행 명령어 명시

dockerfile 참고

### 빌드하기

docker build ./

임시 컨테이너 생성 alpine을 사용한 베이스 레이어를 생성 -> dockerfile에 명시된 명령어를 실행 -> 새로운 레이어 생성 -> 이미지 생성 -> 임시 컨테이너 삭제

빌드하면 다음 문구가 뜸

```
=> => writing image sha256:a0d57e7c9ce66cf562647ebe214c108fb4944745a2701b476f6d5480f31a4163                                                                                                                                0.0s
```

이미지를 실행하려면 다음 커맨드 실행
`docker run a0d57e7`
