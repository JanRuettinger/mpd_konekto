// utils/API.js

import axios from 'axios';
import CONSTANTS from './Constants';

async function getUser(id) {
  let result;
  await axios
    .get(CONSTANTS.URL + 'user/', {
      params: { _id: id }
    })
    .then(res => {
      console.log('In user get api call');
      console.log(res);
      result = res.data;
      // console.log(res);
      // console.log(res.data);
    })
    .catch(error => {
      console.log(error);
    });
  return result;
}

function updateUser(data) {
  axios
    .post(CONSTANTS.URL + 'user/update', {
      _id: 1,
      data: data
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

function updateOnboardingStatus(status) {
  return axios
    .post(CONSTANTS.URL + 'user/update/onboardingstatus', {
      _id: 1,
      onBoardingStatus: status
    })
    .then(res => {
      return res.data;
    });
}

async function getEmergency() {
  await axios
    .get(CONSTANTS.URL + 'emergency/', {
      params: { _id: 1 }
    })
    .then(res => {
      return res.data;
      // console.log(res);
      // console.log(res.data);
    });
}

function createEmergency(data) {
  axios
    .post(CONSTANTS.URL + 'emergency/create', {
      _id: 1,
      data: data
    })
    .then(res => {
      // console.log(res);
      // console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

function createMessage(from, message, to) {
  // console.log('from' + from);
  // console.log('to' + to);
  // console.log('message' + message);
  return axios
    .post(CONSTANTS.URL + 'message/create', {
      from: from,
      to: to, // patient_id
      message: message
    })
    .then(res => {
      console.log('Message has been sent successfully');
    })
    .catch(err => {
      console.log(err);
    });
}

function updateEmergency(data) {
  axios
    .post(CONSTANTS.URL + 'emergency/update', {
      _id: 1,
      data: data
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

async function getChat(to, from) {
  let result;
  await axios
    .get(CONSTANTS.URL + 'message/chat', {
      params: { to: to, from: from }
    })
    .then(res => {
      console.log(res);
      result = res.data;
    })
    .catch(err => {
      console.log(err);
    });
  return result;
}

// async function createEmergency() {
//   await axios
//     .post(CONSTANTS.URL + 'emergency/create', {
//       id: 1,
//       data: this.state
//     })
//     .then(res => {
//       // console.log(res);
//       // console.log(res.data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

export default {
  getUser,
  getEmergency,
  createEmergency,
  createMessage,
  updateOnboardingStatus,
  updateUser,
  updateEmergency,
  getChat
};

// axios.create({
//   baseURL: CONSTANTS.URL,
//   responseType: 'json'
// });
