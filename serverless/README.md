# Serverless

## 💻 주요기능

- lambda 함수가 배포되면서 생성된 S3의 videos/ 폴더를 생성하고 비디오를 업로드하면 다음과 같은 동작이 수행됩니다.

  - encodedVideos/ 폴더에 3가지 해상도(720p, 640p, 320p)로 인코딩하여 저장합니다. (sample_720p.mp4, sample_640p.mp4, sample_320p.mp4)
  - thumanails/ 폴더에 비디오의 첫 프레임을 추출하여 jpg 파일로 저장합니다.
    (sample_thumbnail.0000000.jpg)
  - [1.1.0 추가] encodedVideos/ 폴더에 3가지 해상도(720p, 640p, 320p) 옵션을 가진 hls 파일로 인코딩하여 저장합니다. (sample.m3u8)

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

### ⚙️ 환경 설정 (.env 파일)

```env
ENDPOINT_MEDIA_CONVERT= AWS -> mediaConvert -> 계정 -> API EndPoint 복사
MEDIA_CONVERT_IAM_ROLE= AWS -> IAM -> 생성된 Role -> ARN 복사
```

### 🚀 실행 방법

0. MediaConvert의 작업 템플릿을 생성합니다.
   [AWS Lambda로 동영상 인코딩 및 썸네일 추출하기](https://woo3145.netlify.app/posts/7-encoding-with-lambda)

1. 패키지를 설치합니다.

```cs
$ npm install
```

2. serverless.ts에서 환경변수를 주석처리하고 초기 배포합니다.

```ts
environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    //   ENDPOINT_MEDIA_CONVERT: '${param:ENDPOINT_MEDIA_CONVERT}',
    //   MEDIA_CONVERT_IAM_ROLE: '${param:MEDIA_CONVERT_IAM_ROLE}',
},
```

```cs
$ serverless deploy
```

3. 생성된 AWS 자원으로 .env 파일을 설정합니다.

4. 생성된 IAM 에 추가 권한을 설정합니다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["{생성된 S3의 ARN}"]
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": ["{생성된 S3의 ARN}/*"]
    },
    {
      "Effect": "Allow",
      "Action": ["mediaconvert:CreateJob"],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["iam:PassRole"],
      "Resource": "*"
    }
  ]
}
```

5. IAM의 신뢰 관계를 수정합니다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": ["mediaconvert.amazonaws.com", "lambda.amazonaws.com"]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

6. 주석을 제거하고 환경 변수와 함께 앱을 배포합니다.

```ts
// serverless.ts
environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      ENDPOINT_MEDIA_CONVERT: '${param:ENDPOINT_MEDIA_CONVERT}',
      MEDIA_CONVERT_IAM_ROLE: '${param:MEDIA_CONVERT_IAM_ROLE}',
},
```

```cs
$ serverless deploy --param="ENDPOINT_MEDIA_CONVERT=환경변수" --param="MEDIA_CONVERT_IAM_ROLE=환경변수"
```

7. S3에 파일을 업로드 합니다.

- videos/ : 동영상 업로드
- videos.json : 동영상 목록을 담은 JSON 파일
  ```json
  [
    {
      "id": 1, // 클라이언트에서 id를 key로 댓글과 구름이 생성됨
      "title": "클라이언트에 표시 할 비디오 제목",
      "src": "sample.mp4" // 파일명
    },
    ...
  ]
  ```
