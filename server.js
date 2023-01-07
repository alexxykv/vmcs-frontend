const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;
const BUILD_FOLDER = 'build';

app.use(express.static(path.join(__dirname, BUILD_FOLDER)));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, BUILD_FOLDER, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});