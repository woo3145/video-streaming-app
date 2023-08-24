const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// 인코딩 후 저장될 폴더 경로
const encodingDir = path.resolve(__dirname, '../encodedVideos');
if (!fs.existsSync(encodingDir)) {
  fs.mkdirSync(encodingDir);
  fs.mkdirSync(path.join(encodingDir, 'high'));
  fs.mkdirSync(path.join(encodingDir, 'medium'));
  fs.mkdirSync(path.join(encodingDir, 'low'));
}

// 인코딩 설정
const encodingProfiles = [
  { name: 'low', width: 320 },
  { name: 'medium', width: 640 },
  { name: 'high', width: 720 },
];

// videos.json 파일 로드
const videosPath = path.resolve(__dirname, '../videos.json');
const videos = require(videosPath);

videos.forEach((video) => {
  const videoPath = path.join(__dirname, `../videos/${video.src}`);
  const videoId = video.id;

  // 각각의 인코딩 프로필에 대해 인코딩 수행
  encodingProfiles.forEach(({ name, width }) => {
    const outputFile = video.src;
    const outputPath = path.join(encodingDir, name, outputFile);

    // 이미 인코딩된 영상 파일이 있으면 건너뜀
    if (fs.existsSync(outputPath)) {
      console.log(`Encoded video ${outputFile} already exists.`);
      return;
    }

    // 인코딩 수행
    ffmpeg(videoPath)
      .outputOptions(`-vf scale=${width}:-2`)
      .output(outputPath)
      .on('end', () => {
        console.log(`Video ${outputFile} encoded.`);
      })
      .on('error', (err) => {
        console.error(
          `Error encoding video ${videoId} to ${name} profile: ${err.message}`
        );
      })
      .run();
  });
});
