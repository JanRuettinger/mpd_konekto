import express from 'express';
import User from './User';

const UserRouter = express.Router();

UserRouter.route('/').get(function(req, res) {
  console.log('### IN USER GET ROUTE ####');
  console.log(req.query);
  User.findOne({ _id: req.query._id }, function(err, user) {
    if (user) {
      console.log(user);
      console.log('User was found and will be returned.');
      res.json(user);
    } else {
      const user = new User({ _id: 1, data: { onBoardingStatus: false } });
      console.log('User was not found and will be created from scratch.');
      user
        .save()
        .then(user => {
          res.json(
            'User was not found but created from scratch and added successfully to the database.',
          );
        })
        .catch(err => {
          res.status(400).send('unable to save to database');
        });
    }
  });
});

UserRouter.route('/create').post(function(req, res) {
  console.log('In user create route');
  console.log(req.body);
  const user = new User(req.body);
  user
    .save()
    .then(user => {
      console.log(user);
      res.json('User added successfully and relatives are informed');
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('unable to save to the database');
    });
});

UserRouter.route('/update').post(function(req, res) {
  console.log('### IN USER UPDATE ROUTE ####');
  console.log(req.body);
  User.updateOne({ _id: req.body._id }, req.body, (err, user) => {
    if (user) {
      console.log('User was updated successfully!');
      res.json('User was found and updated successfully!');
    } else {
      const user = new User(req.body);
      user
        .save()
        .then(user => {
          res.json('User was not found and thus created.');
        })
        .catch(err => {
          res.status(400).send('unable to save to database');
        });
    }
  });
});

UserRouter.route('/update/onboardingstatus').post(function(req, res) {
  console.log('### IN USER UPDATE onboardingstatus ROUTE ####');
  console.log(req.body);
  User.updateOne(
    { id: req.body.id },
    { 'data.onBoardingStatus': req.body.onBoardingStatus },
    (err, user) => {
      if (user) {
        console.log('User was updated successfully!');
        res.json('User was found and updated successfully!');
        console.log(user);
      } else {
        const user = new User(req.body);
        user
          .save()
          .then(user => {
            res.json('User was not found and thus created.');
          })
          .catch(err => {
            res.status(400).send('unable to save to database');
          });
      }
    },
  );
});

export default UserRouter;

// User.findByIdAndRemove(req.body.id);
// user
//   .save()
//   .then(user => {
//     res.json('User added successfully to the database');
//   })
//   .catch(err => {
//     res.status(400).send('unable to save to database');
//   });
