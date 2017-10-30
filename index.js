const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/react-app/build/index.html');
});

server.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
