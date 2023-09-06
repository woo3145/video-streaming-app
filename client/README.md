# Client

## 💻 주요기능

- 동영상 스트리밍: 사용자가 S3에 직접 동영상을 업로드하면, 앱에서 해당 동영상을 3가지(720p, 640p, 320p) 고정 비트레이트로 동영상을 스트리밍 할 수 있습니다.
  - [1.1.0 추가]: hls가 지원되는 브라우저에서 적응형 스트리밍을 지원합니다. (auto)
- 익명 댓글
- 익명 구름: 동영상 위에 텍스트가 흘러가는 기능입니다.
- 커스텀 비디오 플레이어: 3가지 화질을 선택할 수 있으며, "구름" 기능을 켜고 끌 수 있습니다.
  - [1.1.0 추가]: hls가 지원되는 브라우저에서 auto 옵션을 선택할 수 있습니다.

### ⚙️ 환경 설정 (.env 파일)

```env
// your firebase configuration
REACT_APP_FIREBASE_APIKEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECTID=
REACT_APP_FIREBASE_STORAGEBUCKET=
REACT_APP_FIREBASE_MESSAGINGSENDERID=
REACT_APP_FIREBASE_APPID=

REACT_APP_RESOURCE_URL=동영상이 위치한 S3 또는 CloudFront URL
```

## 🚀 실행방법

1. 패키지를 설치합니다.

```cs
$ npm install
```

2. .env 파일을 설정합니다.

3. 앱을 실행하거나 배포합니다.

```cs
$ npm start // 로컬에서 실행
$ npm run build // 배포용 빌드 실행
```

### ☁️ 구름 댓글 개선사항

#### 1. 미리 구름을 그려놓은 긴 DOM를 만들어서 시점에 맞게 translateX를 설정하는 방법 (legacy)

- 미리 모든 구름들을 그린 컴포넌트를 생성하여 동영상 시점에 맞게 translateX로 이동
- n초 간격으로 댓글 시작 시점이 오른쪽에서 생성되어 왼쪽 끝에 닿아야함

1. 동영상 width,height를 기준으로 CloudCommentOverlay의 크기를 결정(아마 width: videoWidth \* (videoDuration / n))
2. CloudCommentOverlay는 현재 재생시점으로 translateX를 구하여 댓글이 흐르도록 구현
3. 각 CloudComment들은 left로 100% \* (구름 출현시간/동영상 총 플레이타임) + 동영상 width 을 가짐

currentTime을 requestAniamtionFrame으로 업데이트 간격을 늘려 부드러운 애니메이션이 되도록 보완

- 장점

  - 댓글이 엄청 많아도 계산을 한번만 하면된다.
  - 상호작용 기능이 있을경우 추가하기 편하다. (흘러가는 댓글 클릭해서 추가작업 등)

- 단점

  - **긴 동영상이면 overlayWidth값이 너무 커진다.** <- 이 문제로 Canvas 방식으로 변경함
  - 브라우저가 requestAniamtionFrame으로 굉장히 빠르게 업데이트 되는 변수에 맞춰 dom을 조작해야해서 렌더링 성능에 부담이 간다.
  - 새로운 기능을 추가하기 힘들다.
    - ex. 위로 흐르는 댓글, 제자리에서 몇초간 보였다 사라지는 댓글
  - 브라우저마다 dom을 렌더링 하는 방식이 조금씩 달라서 의도치 않게 동작할 수 있다.

#### 2. Canvas를 이용하여 구름을 그리는 방법 (improved)

캔버스를 하나 그리고 currentTime가 변경 될 때마다 댓글들을 루프하며 캔버스 초기화, 그리기 반복하기

- 최적화

  - visibleClouds를 미리 계산해서 반복 수 줄이기
  - 캔버스 컨텍스트에서 상대적으로 높은 비용이 발생하는 스타일 변경(fillStyle, font) 최소화 하기

- 장점

  - 동영상 길이가 길어져도 동작에 영향을 끼치지 않는다.
  - dom을 직접 조작하지 않고 canvas의 비트맵 기반의 처리를 하기 때문에 렌더링 성능이 향상된다.
  - 브라우저가 달라도 canvas는 표준화된 동작을 하기 때문에 일관성 있게 동작한다.

- 단점

  - 댓글이 너무 많아질경우 렌더링 성능이 저하된다. (클러스터 방식 등으로 추가 최적화 가능)
  - 흘러가는 댓글과 상호작용 하는 기능을 추가하기 힘들다. (굳이 떠올려보면 일시정지 될 때 canvas상태를 그대로 본뜬 dom을 생성해서 이벤트 추가?)
