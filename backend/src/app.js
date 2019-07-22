import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import DB from './db';
import http from 'http';
import io from 'socket.io';
import EmergencyRouter from './EmergencyRouter';
import UserRouter from './UserRouter';
import UtilityRouter from './UtilityRouter';
import MessageRouter from './MessageRouter';

const app = express();
const PORT = 9000;

const http_server = http.Server(app);
export const io_server = io(http_server);

http_server.listen(PORT, function() {
  console.log('Example app listening on port' + PORT + '!');
});

io_server.set('origins', '*:*');
io_server.on('connection', () => {
  console.log('a user is connected');
});

var retryTime = 1;

var connectWithRetry = () => {
  return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, err => {
    if (err) {
      retryTime *= retryTime;
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('DB connection successfull');
    }
  });
};
connectWithRetry();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/emergency', EmergencyRouter);
app.use('/user', UserRouter);
app.use('/utility', UtilityRouter);
app.use('/message', MessageRouter);

app.get('/', function(req, res) {
  res.send('Server is online.');
});
