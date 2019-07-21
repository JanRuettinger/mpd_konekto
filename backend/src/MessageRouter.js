import express from 'express';
import Emergency from './Emergency';
import User from './User';
import Message from './Message';
import mongoose from 'mongoose';
import { io_server } from './app';

const MessageRouter = express.Router();

MessageRouter.get('/all', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

MessageRouter.post('/create', (req, res) => {
  console.log(req.body);
  let message = new Message(req.body);
  message.save(err => {
    if (err) {
      console.log(err);
      res.status(500).send('error in message router');
    } else {
      io_server.emit('message', req.body);
      res.send('Message successfully created');
    }
  });
});

MessageRouter.get('/chat', (req, res) => {
  // let messages_to = json.stringify(Message.find({ to: req.body.to}))
  // let messages_from = json.stringify(Message.find({from: req.body.from}))

  console.log(req.query);
  Message.find()
    .or([
      { to: req.query.to, from: req.query.from },
      { to: req.query.from, from: req.query.to },
      // { from: req.query.to },
      // { to: req.query.from },
    ])
    .sort('timestamp')
    .then(messages => {
      console.log('Messages');
      console.log(messages);
      res.send(messages);
    })
    .catch(error => {
      res.status(500).send('error in message route /chat');
    });
});

export default MessageRouter;
