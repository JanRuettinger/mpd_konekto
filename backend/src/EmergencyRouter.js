import express from 'express';
import Emergency from './Emergency';
import TwilioClient from './twilio';
import User from './User';
import { io_server } from './app';

const EmergencyRouter = express.Router();

const CLASS_PHONE_NUMBERS = {
  Jan: '+4917642057041‬',
  // Alex: '+4917695815231‬',
  Max: '+4917682576646‬',
  Chrissi: '+491702138131',
  Micha: '+4917656843172',
  Alex: '+4917629867863',
  Moritz: '+4917634351463',
  // JD: '+4917655561608',
  Jana: '+491742164773 ',
  Jannik: '+4915777730436',
  Luisa: '+491738818554',
  Lukas: '+491744031572',
  // Max: '+4915202744899',
  Carla: '+4915737949204',
  Chris: '+4915789251505',
  // Jen: '+491705070108',
  Lysander: '+491708434048',
  Klaudia: '+4917623960839',
};

const CA_PHONE_NUMBERS = {
  Chrissi: '+491702138131',
  Micha: '+4917656843172',
};

const CALLER_ID = 'Konekto';
const TEAM_AIRBUS_PHONE_NUMBERS = {};

async function getAllEmergencies(id = 1) {
  try {
    const newEmergencies = await Emergency.find();
    // console.log(newEmergencies);
    return newEmergencies;
  } catch (error) {
    console(error);
  }
}

async function getUser(_id = 1) {
  try {
    const newUser = await User.findOne({ _id: _id });
    // console.log(newUser);
    return newUser;
  } catch (error) {
    console(error);
  }
}

async function getEmergency(id) {
  try {
    const newEmergency = await Emergency.findOne({ _id: id });
    // console.log(newUser);
    return newEmergency;
  } catch (error) {
    console(error);
  }
}

function generate_text(data) {
  return `Hi ${data.name_receiver}, ${data.name_patient} had an accident! (Test message)`;
}

function sent_single_sms(receiver_number, from, data) {
  var SMS_Text = generate_text(data);

  TwilioClient.messages
    .create({
      body: SMS_Text,
      to: receiver_number, // Text this number
      from: from, // From a valid
    })
    .then(message => console.log('SMS sent successfully!'));
}

async function sent_group_sms(to_group, from, emergency_data) {
  let receiver;
  var user = await getUser();
  console.log(user.data.fullname);
  let data;
  Object.keys(to_group).forEach(function(key) {
    receiver_number = to_group[key];
    data = { name_receiver: key, name_patient: user.data.fullname };
    sent_single_sms(receiver_number, CALLER_ID, data);
  });
}

async function sent_sms_to_emergency_contact(CALLER_ID, emergency_data) {
  console.log('In sent emregncy contact');
  var user = await getUser();
  console.log(user);
  if (user.data.phone_number_relative_1) {
    let receiver_name = user.data.fullname_relative_1;
    let receiver_number = user.data.phone_number_relative_1;
    let sms_data = { name_receiver: receiver_name, name_patient: user.data.fullname };
    sent_single_sms(receiver_number, CALLER_ID, sms_data);
  }

  if (user.data.phone_number_relative_2) {
    let receiver_name = user.data.fullname_relative_2;
    let receiver_number = user.data.phone_number_relative_2;
    let sms_data = { name_receiver: receiver_name, name_patient: user.data.fullname };
    sent_single_sms(receiver_number, CALLER_ID, sms_data);
  }
}

// find emergency
async function updateEmergency(id, body) {
  let result;
  await Emergency.updateOne({ _id: id }, body, (err, emergency) => {
    if (emergency) {
      result = 1;
    } else {
      result = 0;
    }
  });
  return result;
}

EmergencyRouter.route('/create').post(async function(req, res) {
  console.log('In emergency create route');

  // check if emergency already exists
  const emergency = await Emergency.findOne({ _id: req.body._id });
  if (emergency) {
    // emergency already exists => update it
    req.body.data['location'] = { latitude: 47.423371, longitude: 10.99961 };
    const result = await updateEmergency(req.body._id, req.body);
    if (result) {
      console.log('Emergency was updated successfully');
      res.send('Emergency already existed and was updated');
    } else {
      res.send('Emergency already existed but was not updated');
    }
  } else {
    const emergency = new Emergency(req.body);
    emergency
      .save()
      .then(emergency => {
        // console.log(emergency);
        // sent_group_sms(CLASS_PHONE_NUMBERS, CALLER_ID, emergency.data);
        // sent_sms_to_emergency_contact(CALLER_ID, emergency.data);
        res.json('Emergency was created successfully and relatives are informed');
      })
      .catch(err => {
        console.log(err);
        res.status(400).send('Emergency was not created.');
      });
  }
});

EmergencyRouter.route('/update').post(async function(req, res) {
  console.log('In emergency update route');
  console.log(req.body);
  // check if emergency already exists

  let old_emergency = await getEmergency(req.body._id);
  // const emergency = Emergency.findOne({ _id: req.body_id });
  console.log(old_emergency);

  if (old_emergency) {
    if (
      req.body.data.emergencyStatus &&
      old_emergency.data.emergencyStatus != req.body.data.emergencyStatus
    ) {
      // status has changed => display modal
      io_server.emit('emergency_status_change', req.body);
      console.log('status updates was distributed to all clients');
    }
    req.body.data['location'] = { latitude: 47.423371, longitude: 10.99961 };
    req.body.data['city'] = 'Zugspitze';
    req.body.data['country'] = 'Germany';
    const result = updateEmergency(req.body._id, req.body);
    if (result) {
      res.send('Emergency was updated successfully');
    } else {
      res.send('Emergency was found but not updated successfully');
    }
  } else {
    res.send("Emergency was not found and thus couldn't be updated");
  }
});

EmergencyRouter.route('/all').get(async function(req, res) {
  console.log('In emergency get all route');
  const emergencies = await getAllEmergencies();
  if (emergencies) {
    console.log('Emergencies found in database');
    // console.log(emergencies);
    var arrayLength = emergencies.length;
    for (var i = 0; i < arrayLength; i++) {
      let user = await getUser(emergencies[i].data.patient_id);
      // console.log(emergencies[i]);
      emergencies[i].data.fullname = user.data.fullname;
      //Do something
    }
    return res.json(emergencies);
  }
  return res.status(400).send('unable to retrieve emergencies from database');
});

export default EmergencyRouter;
