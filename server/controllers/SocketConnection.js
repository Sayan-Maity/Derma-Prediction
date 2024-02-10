// socket.js
const socketIO = require('socket.io');

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: '*',
      methods: 'GET,POST',
    },
  });

  io.on('connection', (socket) => {
    socket.emit('userID', socket.id);

    socket.on('disconnect', () => {
      socket.broadcast.emit('callEnded');
    });

    socket.on('callUser', (data) => {
      io.to(data.to).emit('userCalling', data);
    });

    socket.on('answerCall', (data) => {
      io.to(data.to).emit('callAccepted', data);
    });

    socket.on('rejectCall', ({ to, from }) => {
      console.log(from);
      io.to(to).emit('callRejected', { to, from });
    });
  });
};
