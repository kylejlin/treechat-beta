const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);
const PORT = process.env.PORT || 3000;

app.use(express.static('./react-app/build'));

app.get('/', (req, res) => {
  res.sendFile('/react-app/build/index.html');
});

server.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
