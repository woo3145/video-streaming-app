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
