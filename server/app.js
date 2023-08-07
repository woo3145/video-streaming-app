const express = require('express');
const cors = require('cors');

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

const thumbnailRouter = require('./routes/thumbnail');
const videosRouter = require('./routes/videos');

app.use('/thumbnail', thumbnailRouter);
app.use('/videos', videosRouter);
