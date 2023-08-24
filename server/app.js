const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const clientDomain = process.env.CLIENT_URL;
const corsOptions = {
  origin: (origin, callback) => {
    if (origin === clientDomain || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const thumbnailRouter = require('./routes/thumbnail');
const videosRouter = require('./routes/videos');

app.use('/thumbnail', thumbnailRouter);
app.use('/videos', videosRouter);
