Pwentk
======
Pwentk은 높은 성능과 자유도를 추구하는 블록코딩 플랫폼입니다.  
Pwentk은 아직 개발중이며 대부분의 기능은 완성되지 않았습니다.  
<https://pwen.tk/example>에서 현재까지 개발된 부분을 볼 수 있습니다.

## 개발환경 구축

### Node.js(와 NPM) 설치
<https://nodejs.org/>

### 의존성 모듈 설치
Pwentk의 개발에 필요한 모듈을 설치해야합니다.  
아래 명령어를, 사용하고 있는 CLI(Windows CMD, Bash 등) 에 입력해주세요.
```sh
npm install
```

### 개발 서버 열기
```sh
npm run serve
```
의존성 설치를 완료하고 명령어를 입력하면
<http://localhost:8080/>에서 실시간으로 변경사항을 확인할 수 있습니다.  
(주의: ./src/ 이하의 스크립트에만 적용됩니다. [example 에디터](http://localhost:8080/example/) 페이지의 HTML 파일 등을 수정했을 때에는 변경사항이 실시간으로 바뀌지 않으니 새로고침을 해주세요.)

### 스크립트 빌드하기
Pwentk에서는 모듈 시스템을 위해 여러 파일(모듈)을 합쳐주는 [Webpack](https://webpack.js.org/)과, 구버전의 브라우저를 지원하기 위해 [Babel](https://babeljs.io/) 트랜스파일러를 사용하고 있습니다.  
개발이 끝나면 아래 명령어를 입력하여 스크립트를 빌드할 수 있습니다.
```sh
npm run build
```
(개발 서버에서는 직접 빌드하지 않아도 빌드된 파일을 실시간으로 사용할 수 있습니다.  
빌드가 끝나면 일반 환경에서도 똑같이 사용할 수 있습니다.)