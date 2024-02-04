const express = require('express');
var app = express();
const conn = require('./DB');
const dotenv = require("dotenv");
dotenv.config()
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require("body-parser");
const allRoutes = require("./routes/AllRoutes");
const authRoutes = require("./routes/AuthRoutes");
const userRoutes = require("./routes/UserRoutes");

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", allRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
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

app.get('/', (req, res) => {
  res.send('Server is running');
});

conn().then(() => {
  // app.listen(process.env.PORT, () => {
  //   console.log("Server is running on port: " + process.env.PORT);
  // });
  httpServer.listen(PORT, () => console.log('Server is running at port ' + PORT));
});
