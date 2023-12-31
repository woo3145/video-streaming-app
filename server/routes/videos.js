const express = require('express');
const path = require('path');
const fs = require('fs');
const videos = require('../videos.json');

const router = express.Router();

// 비디오 목록 불러오기
router.get('/', (req, res) => {
  res.send(videos);
});

// 비디오 스트리밍
router.get('/:quality/:videoId', (req, res) => {
  const quality = req.params.quality;
  const videoId = parseInt(req.params.videoId, 10);

  const videoInfo = videos.find((video) => video.id === videoId);

  if (!videoInfo) {
    return res.status(404).send('Not Found');
  }

  const videoPath = path.join(
    __dirname,
    '../encodedVideos',
    quality,
    videoInfo.src
  );
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  // 브라우저의 video 태그가 네트워크 상태 및 동영상 크기에 따라 range범위를 자동으로 조절함
  // 보통 첫 요청에 0부터 끝까지 요청하고, 추가요청이 있으면 해당부분만 받아옴(ex. 건너뛰기 시 현재 재생중인 부분 - (끝 or 일정 크기) )
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    // 스트림 생성 후 http 응답에 연결
    const chunksize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head); // 206 Partial Content status code
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

module.exports = router;
