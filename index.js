const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let timelineIdCounter = 1;
const timelines = [require('./testTimeline.js')];
const users = require('./testUsers.js');

const getTimestamp = require('./getTimestamp.js');

const PORT = process.env.PORT || 3000;

const userHasAccessToTimeline = user => timeline => {
  const [headUpdate] = timeline;
  const [timelineId, [text, author, timestamp], otherMembers] = headUpdate;
  const allMembers = otherMembers.concat([author]);
  return allMembers.includes(user.username);
};

// TODO: Refactor this DRY-violating smell
const timelineIsAccessibleToUser = timeline => user => {
  const [headUpdate] = timeline;
  const [timelineId, [text, author, timestamp], otherMembers] = headUpdate;
  const allMembers = otherMembers.concat([author]);
  return allMembers.includes(user.username);
};

app.use(express.static('./react-app/build'));

app.get('/', (req, res) => {
  res.sendFile('/react-app/build/index.html');
});

http.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});

io.on('connection', (socket) => {
  socket.on('login', ({ username, password }) => {
    const user = users.find(({ username: usersUsername, password: actualPassword }) =>
      username === usersUsername && password === actualPassword
    );
    if (user) {
      if (!user.sockets.includes(socket)) {
        user.sockets.push(socket);
      }
      socket.emit('timelines', timelines.filter(userHasAccessToTimeline(user)));
      socket.emit('username', user.username);
    } else {
      socket.emit('invalid field');
    }
  });

  socket.on('sign up', ({ username, password }) => {
    if (
      users.find(({ username: takenUsername }) => username === takenUsername) ||
      ('string' !== typeof username) ||
      ('string' !== typeof password) ||
      username.length === 0 ||
      username.length > 16 ||
      !(/^[a-zA-Z]*$/.test(username)) ||
      password.length === 0 ||
      password.length > 32
    ) {
      socket.emit('invalid field');
      return;
    }

    const user = {
      username,
      password,
      sockets: [socket]
    };

    users.push(user);

    socket.emit('username', user.username);
  });

  socket.on('disconnect', () => {
    const user = users.find(user => user.sockets.includes(socket));
    if (user) {
      const i = user.sockets.indexOf(socket);
      if (i > -1) {
        user.sockets.splice(i, 1);
      }
    }
  });

  socket.on('new timeline', ([text, otherMembers]) => { // TODO: Notify members they are part of new thread
    const user = users.find(user => user.sockets.includes(socket));

    if (
      !user ||
      !(otherMembers instanceof Array) ||
      otherMembers.length === 0 ||
      otherMembers.find(name => !users.find(({ username }) => name === username)) || // If any members are non-existent
      'string' !== typeof text ||
      text.length === 0
    ) {
      socket.emit('invalid field');
      return;
    }

    const rootComment = [text, user.username, getTimestamp()];
    const headUpdate = [timelineIdCounter, rootComment, otherMembers];
    const timeline = [headUpdate];

    timelines.push(timeline);

    const usersToBeAlerted = users.filter(timelineIsAccessibleToUser(timeline));
    const socketsToEmitTo = usersToBeAlerted.reduce((arr, user) => arr.concat(user.sockets), []);

    for (let socket of socketsToEmitTo) {
      socket.emit('new timeline', timeline);
    }

    timelineIdCounter = timelineIdCounter + 1;
  });

  socket.on('new update', ([timelineId, parentId, text]) => {
    const timeline = timelines.find(timeline => timelineId === timeline[0][0]);
    const user = users.find(user => user.sockets.includes(socket));

    if (
      !timeline ||
      !user ||
      !userHasAccessToTimeline(user)(timeline) ||
      !(parentId in timeline)
    ) {
      socket.emit('invalid field');
      return;
    }

    const update = [parentId, [text, user.username, getTimestamp()]];

    timeline.push(update);

    const usersToBeAlerted = users.filter(timelineIsAccessibleToUser(timeline));
    const socketsToEmitTo = usersToBeAlerted.reduce((arr, user) => arr.concat(user.sockets), []);

    for (let socket of socketsToEmitTo) {
      socket.emit('new update', [timelineId, update]);
    }
  });

  socket.on('delete timeline', ([timelineId, text]) => {
    const user = users.find(user => user.sockets.includes(socket));
    const timeline = timelines.find(timeline => timelineId === timeline[0][0]);

    if (
      !user ||
      !timeline ||
      !timeline[0][1][1] === user.username ||
      !timeline[0][1][0] === text
    ) {
      socket.emit('invalid field');
      return;
    }

    timelines.splice(timelines.indexOf(timeline), 1);
    socket.emit('delete timeline', timelineId);
  });
});
