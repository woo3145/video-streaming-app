# Node.js 기반 이미지 사용
FROM node:lts

# ffmpeg 설치
RUN apt-get update && \
    apt-get install -y ffmpeg

# 작업 디렉터리 설정
WORKDIR /app

# 패키지.json 파일 복사 및 패키지 설치
COPY package*.json ./
RUN npm install

# 프로젝트 복사
COPY . .

# encode 및 thumbnail 스크립트 실행
RUN npm run encode
RUN npm run thumbnail

# 애플리케이션 포트 설정
EXPOSE 4000

# 서버를 실행하는 명령어 설정
CMD ["npm", "start"]
