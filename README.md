# 동영상 스트리밍 앱

이 앱은 공유된 동영상을 3가지 해상도로 스트리밍 할 수 있으며, 익명 댓글과 동영상 위에 텍스트가 흘러가는 "익명 구름" 기능을 제공합니다.

## 🎸 Live Demo URL

https://woo3145-videos.netlify.app

## 💻 주요기능

### Client

- 동영상 스트리밍: 사용자가 S3에 직접 동영상을 업로드하면, 앱에서 해당 동영상을 3가지(720p, 640p, 320p) 고정 비트레이트 방식으로 동영상을 스트리밍 할 수 있습니다.
- 익명 댓글
- 익명 구름: 동영상 위에 텍스트가 흘러가는 기능입니다.
- 커스텀 비디오 플레이어: 3가지 화질을 선택할 수 있으며, "구름" 기능을 켜고 끌 수 있습니다.

### Server

- lambda 함수가 배포되면서 생성된 S3에 videos/ 폴더를 생성하고 비디오를 업로드하면 다음과 같은 동작이 수행됩니다.

  - encodedVideos/ 폴더에 3가지 해상도(720p, 640p, 320p)로 인코딩하여 저장합니다. (sample_720p.mp4, sample_640p.mp4, sample_320p.mp4)
  - thumanails/ 폴더에 비디오의 첫 프레임을 추출하여 jpg 파일로 저장합니다.
    (sample_thumbnail.0000000.jpg)

- 해당 S3에 비디오 목록에 대한 videos.json 파일을 추가하면 클라이언트에서 비디오를 조회할 수 있습니다.

  ```json
  [
    {
      "id": 1, // 클라이언트에서 id를 key로 댓글과 구름이 생성됨
      "title": "클라이언트에 표시 할 비디오 제목",
      "src": "sample.mp4" // 파일명
    }
  ]
  ```

## 📚 Teck Stack

- 클라이언트: Typescript, React, Firebase, TailwindCSS
- 서버: Serverless, Lambda, MediaConvert, S3

- 서버(legacy): Express, FFmpeg

## 🚀 실행 방법

[클라이언트 문서](./client/README.md)

[서버 문서(serverless)](./serverless/README.md)

[서버 문서(legacy)](./server/README.md)

## 📝 포스팅

[Tailwind CSS 재사용성과 가독성 높이기](https://woo3145.netlify.app/posts/5-how-to-clean-tailwind)

[serverless + typescript를 사용하여 AWS Lambda 배포하기](https://woo3145.netlify.app/posts/6-deploy-lambda-using-serverless)

[AWS Lambda로 동영상 인코딩 및 썸네일 추출하기](https://woo3145.netlify.app/posts/7-encoding-with-lambda)

[Node.js의 Stream과 웹서비스에서 활용](https://woo3145.netlify.app/posts/4-stream-in-nodejs) (Express 서버(legacy)에서 사용)
