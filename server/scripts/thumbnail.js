const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// 사용자 컴퓨터에 설치된 ffmpeg의 ffprobe위치
ffmpeg.setFfprobePath('/opt/homebrew/Cellar/ffmpeg/6.0/bin/ffprobe');

const thumbnailDir = path.resolve(__dirname, '../thumbnail');
if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir);
}

const videosPath = path.resolve(__dirname, '../videos.json');
const videos = require(videosPath);

videos.forEach((video, index) => {
  const videoPath = path.join(__dirname, `../videos/high/${video.src}`);
  const thumbnailName = `thumbnail-${video.id}.jpg`;

  // 이미 추출 된 썸네일은 건너뜀
  if (fs.existsSync(path.resolve(thumbnailDir + `/${thumbnailName}`))) {
    return;
  }

  // 썸네일 추출
  ffmpeg(videoPath)
    .screenshots({
      count: 1,
      filename: thumbnailName,
      folder: thumbnailDir,
      size: '370x240',
    })
    .on('end', () => {
      console.log(`Thumbnail ${thumbnailName} extracted`);
    })
    .on('error', (err) => {
      console.log(
        `Error extracting thumbnail from ${videoPath}: ${err.message}`
      );
    });
});
