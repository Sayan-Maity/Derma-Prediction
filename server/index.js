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
const configureSocketIO = require('./controllers/SocketConnection');

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", allRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const httpServer = require('http').createServer(app);
configureSocketIO(httpServer);

app.get('/', (req, res) => {
  res.send('Server is running');
});

conn().then(() => {
  httpServer.listen(PORT, () => console.log('Server is running at port ' + PORT));
});
