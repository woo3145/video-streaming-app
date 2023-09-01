# Server (Legacy)

해당 폴더는 serverless 방식으로 전환되어 더이상 사용되지 않습니다.

## 💻 주요 기능

스크립트로 인코딩과 썸네일 추출을 하고 추출된 컨텐츠를 클라이언트에 전달 및 스트리밍 해줍니다.

- 프로젝트의 videos/ 폴더에 동영상을 넣고 videos.json에 동영상 정보를 입력한 후 "npm run thumbnail && npm run encode" 명령어로 스크립트를 실행하면 다음과 같은 동작이 수행됩니다.

  - encodedVideos/ 폴더에 3가지 해상도(720p, 640p, 320p)로 인코딩하여 저장합니다. (/high/sample.mp4, /medium/sample.mp4, /low/sample.mp4)
  - thumanail/ 폴더에 비디오의 첫 프레임을 추출하여 jpg 파일로 저장합니다.
    (sample_thumbnail.jpg)

- GET /videos - videos.json 파일을 클라이언트에 전달합니다.
- GET /thumbnail/:filename - 썸네일을 클라이언트에 전달합니다.
- GET /videos/:quality/:videoId - quality와 videoId로 알맞은 동영상을 찾아 스트리밍 합니다. (range 요청 처리)

### ⚙️ 환경 설정 (.env 파일)

```env
 // 예시
FFPROBE_PATH=/opt/homebrew/Cellar/ffmpeg/6.0/bin/ffprobe
PORT=4000
CLIENT_URL=http://localhost:3000
```

## 🚀 실행방법

**사전에 ffmpeg 설치 필수**

1. 패키지를 설치합니다.

```cs
$ npm install
```

2. videos/ 폴더 내부에 업로드 할 영상 넣기
3. 동영상 정보를 videos.json 파일에 입력 (**파일명과 src가 일치해야함**)

```
[
    {
        "id": 1,
        "title": "비디오 제목",
        "src": "sample-1.mp4"
    },
    ...
]
```

3. npm run thumbnail && npm run encode 실행

4. 결과

   - thumnbnail/thumbnail-{videos.id}.jpg
   - encodedVideos/high/{video.src} (720p)
   - encodedVideos/medium/{video.src} (640p)
   - encodedVideos/low/{video.src} (320p)

5. 배포 및 실행

```cs
$ npm start // 로컬에서 실행
$ npm run build // 배포용 빌드 실행
```

```cs
// 도커 이미지 생성
$ docker-buildx build -t hello:0.1 .
// m1칩 일경우 --platform 추가
$ docker-buildx build --platform linux/amd64 -t hello:0.1 .
```

## ⚡️ 개선할점

1. 인코딩과 썸네일 추출 프로세스 자동화 필요
2. 비디오가 추가 시마다 도커 이미지를 다시 구워야함
3. 비디오와 도커를 함께 구워야함
4. 비디오를 제공하는 서비스임으로 CDN과 같은 서비스를 사용하는것이 바람직함

express 서버로 동영상을 스트리밍 하지 않고 다음 방법중 하나로 서버리스 전환

#### AWS의 Lambda + MediaConvert + S3 + CloudFront 를 사용

- 2023.8월 프리티어 기준 월간 1TB 전송 및 요청 1000만건 무료 (CloudFront)
- CDN을 사용하여 네트워크에 데이터를 캐싱하여 동영상 전송 성능이 향상됨

- [x] Lambda + MediaConvert 서비스를 사용하여 S3의 videos/ 가 추가되면 트리거로 인코딩 및 썸네일 추출
- [x] videos의 목록이 저장된 videos.json 파일을 s3에서 관리
- [x] S3의 정적파일을 CloudFront로 배포 (videos.json, encodedVideos/_, thumbnails/_)
- [x] 클라이언트에서 기존에 동영상 및 썸네일을 요청하던 서버 => CloudFront 요청으로 변경
- [x] 비디오 목록도 CloudFront서버에서 가져오기 (비디오와 변경사항을 s3에서 한번에 수정하기 위해 firestore 사용 안함)

#### Firebase의 Storage + Functions 을 사용

- 장점 - Firestore로 댓글과 구름을 구현하고 있어서 Firebase내에서 모두 관리할 수 있음.

- 단점 - Storage의 다운로드 용량이 일일 1GB 밖에 안되서 동영상 스트리밍 앱으론 부적절
