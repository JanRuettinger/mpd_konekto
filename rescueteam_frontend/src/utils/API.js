// utils/API.js

import axios from 'axios';
import CONSTANTS from './Constants';

function getUser() {
  return axios
    .get(CONSTANTS.URL + 'user/', {
      params: { _id: 1 }
    })
    .then(res => {
      return res.data;
      // console.log(res);
      // console.log(res.data);
    });
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

function updateEmergency(id, data) {
  axios
    .post(CONSTANTS.URL + 'emergency/update', {
      _id: id,
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

async function createEmergency(emergency) {
  axios
    .post(CONSTANTS.URL + 'emergency/create', emergency)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

async function createUser(user) {
  axios
    .post(CONSTANTS.URL + 'user/create', user)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

async function getSeed() {
  await axios.get(CONSTANTS.URL + 'utility/seed').then(res => {
    return res.data;
  });
}

async function getChat(to, from) {
  let result;
  await axios
    .get(CONSTANTS.URL + 'message/chat', {
      params: { to: to, from: from }
    })
    .then(res => {
      // console.log(res);
      result = res.data;
    })
    .catch(err => {
      console.log(err);
    });
  return result;
}

async function getEmergencies() {
  let result;
  await axios
    .get(CONSTANTS.URL + 'emergency/all')
    .then(response => {
      result = response.data;
    })
    .catch(async error => {
      result = error;
    });
  return result;
}

function createMessage(from, to, message) {
  axios
    .post(CONSTANTS.URL + 'message/create', {
      from: from,
      to: to, // patient_id
      message: message
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log('Error in create message' + err);
      return err;
    });
}

export default {
  getUser,
  getEmergency,
  getSeed,
  createUser,
  createEmergency,
  updateOnboardingStatus,
  updateUser,
  updateEmergency,
  getChat,
  createMessage,
  getEmergencies
};

// axios.create({
//   baseURL: CONSTANTS.URL,
//   responseType: 'json'
// });
