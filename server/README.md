### 서버

#### 동영상 넣기 && 썸네일 생성

**사전에 ffmpeg 설치 및 scripts/thumbnail.js의 ffprobe 위치 설정 필수**

1. videos내부의 high, medium, low 폴더에 각 해상도의 동영상 넣기
2. 동영상 정보를 videos.json 파일에 입력

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

3. npm run thumbnail 실행

4. thumnbnail/thumbnail-{videos.id}.jpg 로 생성됨

#### 고민할거

- 동영상 스트리밍 서버와 일반 API서버를 한서버에서 운영할 것인가?

- 어떤 방식으로 적응형 비트레이트 스트리밍을 구현 할 것인가?

- videos 폴더에 동영상 하나만 넣고 ffmpeg로 low, medium, high 품질 동영상 생성하기
