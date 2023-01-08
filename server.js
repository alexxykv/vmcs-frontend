const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
const https = require('https');

const key = fs.readFileSync(process.env.SERVER_KEY_PATH, 'utf-8');
const cert = fs.readFileSync(process.env.CERTIFICATE_PATH, 'utf-8');

const credentials = {
  key: key,
  cert: cert
};

const PORT = 443;
const BUILD_FOLDER = 'build';

const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, BUILD_FOLDER)));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, BUILD_FOLDER, 'index.html'));
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});