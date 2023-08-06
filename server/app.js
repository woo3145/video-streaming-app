const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const videos = require('./videos.json');

const app = express();
const port = 4000;

const clientDomain = '';
const corsOptions = {
  origin: (origin, callback) => {
    if (origin === clientDomain || !origin) {
      callback(null, true);
    } else {
      callback(null, true);
      // callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.get('/thumbnail/:filename', (req, res) => {
  const fileName = req.params.filename;
  const imagePath = `${__dirname}/thumbnail/${fileName}`;
  res.sendFile(imagePath);
});

app.get('/videos/:quality/:videoId', (req, res) => {
  const quality = req.params.quality;
  const videoId = parseInt(req.params.videoId, 10);

  const videoInfo = videos.find((video) => video.id === videoId);

  if (!videoInfo) {
    return res.status(404).send('Not Found');
  }

  const videoPath = path.join(__dirname, 'videos', quality, videoInfo.src);
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  console.log(range);
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    console.log(parts);
  }
});
