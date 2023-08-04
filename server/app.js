const express = require('express');

const app = express();
const port = 4000;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.get('/thumbnail/:filename', (req, res) => {
  const fileName = req.params.filename;
  const imagePath = `${__dirname}/thumbnail/${fileName}`;
  res.sendFile(imagePath);
});
