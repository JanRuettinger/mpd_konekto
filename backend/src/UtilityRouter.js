import express from 'express';
import mongoose from 'mongoose';
import User from './User';
import Emergency from './Emergency';
import Message from './Message';
import { users as users_seed, emergencies as emergencies_seed } from './seed_data';

const UtilityRouter = express.Router();

function createUser(user_data) {
  let user = new User(user_data);
  user
    .save()
    .then(user => {
      //res.json('User was created successfully.');
      console.log('User was created successuflly');
    })
    .catch(err => {
      //res.status(400).send('unable to save to database');
    });
}

function createEmergency(emergency_data) {
  let emergency = new Emergency(emergency_data);
  emergency
    .save()
    .then(user => {
      // res.json('Emergency was created successfully.');
    })
    .catch(err => {
      // res.status(400).send('unable to save to database');
    });
}

UtilityRouter.route('/seed').get(async function(req, res) {
  console.log('In seed');
  // delete old data
  await User.remove({});
  await Emergency.remove({});
  await Message.remove({});

  // seed data
  emergencies_seed.map(createEmergency);
  users_seed.map(createUser);
});

UtilityRouter.route('/clearmsg').get(async function(req, res) {
  console.log('In clear');
  // delete old data
  await Message.remove({});
});

export default UtilityRouter;
