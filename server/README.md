### 서버

#### 동영상 넣기 && 썸네일 생성

**사전에 ffmpeg 설치 및 env 설정 필수**

```
.env // 예시
FFPROBE_PATH=/opt/homebrew/Cellar/ffmpeg/6.0/bin/ffprobe
PORT=4000
CLIENT_URL=http://localhost:3000
```

1. videos/ 폴더 내부에 업로드 할 영상 넣기
2. 동영상 정보를 videos.json 파일에 입력 (**파일명과 src가 일치해야함**)

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

#### 고민할거

- [x] 동영상 스트리밍 서버와 일반 API서버를 한서버에서 운영할 것인가?
      댓글과 구름은 클라이언트에서 firebase를 통해 처리함으로 백앤드에서 관리할 API가 거의 없음(동영상 목록 불러오기등)
- 어떤 방식으로 적응형 비트레이트 스트리밍을 구현 할 것인가?

- [x] videos 폴더에 동영상 하나만 넣고 ffmpeg로 low, medium, high 품질 동영상 생성하기

## 개선할점

1. 현재 도커로 배포중인데 비디오를 추가할 시 도커 이미지를 다시 구운 후 배포해야함

express 서버로 동영상을 스트리밍 하지 않고 다음 방법중 하나로 서버리스 전환

#### AWS의 Lambda + MediaConvert + S3 + CloudFront 를 사용

- 2023.8월 프리티어 기준 월간 1TB 전송 및 요청 1000만건 무료 (CloudFront)
- CDN을 사용하여 네트워크에 데이터를 캐싱하여 동영상 전송 성능이 향상됨

- [ ] Lambda + MediaConvert 서비스를 사용하여 S3의 videos/ 가 추가되면 트리거로 인코딩 및 썸네일 추출
- [ ] videos의 목록이 저장된 videos.json 파일을 s3에서 관리
- [ ] S3의 정적파일을 CloudFront로 배포 (videos.json, encodedVideos/_, thumbnails/_)
- [ ] 클라이언트에서 기존에 동영상 및 썸네일을 요청하던 서버 => CloudFront 요청으로 변경
- [ ] 비디오 목록도 CloudFront서버에서 가져오기 (비디오와 변경사항을 s3에서 한번에 수정하기 위해 firestore 사용 안함)

#### Firebase의 Storage + Functions 을 사용

- 장점 - Firestore로 댓글과 구름을 구현하고 있어서 Firebase내에서 모두 관리할 수 있음.

- 단점 - Storage의 다운로드 용량이 일일 1GB 밖에 안되서 동영상 스트리밍 앱으론 부적절
