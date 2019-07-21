import React, { createContext, useContext, useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { Typography, Grid, Container } from '@material-ui/core';
import withRoot from '../custom_theme/withRoot';
import { AppProvider } from '../utils/AppContext';
import { GridContainer } from '../custom_theme/components/GridContainer';
import { Header } from '../Layout';
import EmergencyTable from './EmergencyTable';
import SimpleMap from './SimpleMap';
import Chat from './Chat';
import API from '../utils/API';
import CONSTANTS from '../utils/Constants';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emergencies: null,
      selectedID: 0,
      inputText: '',
      messages: null
    };
    this.setSelectedID = this.setSelectedID.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getNewMessages = this.getNewMessages.bind(this);
  }

  async componentDidMount() {
    // get all Emergencies
    console.log('In component did mount: index.js');

    await API.getEmergencies()
      .then(async emergencies => {
        if (emergencies) {
          let patient_id = emergencies[this.state.selectedID].data.patient_id;
          await this.setState({
            emergencies: emergencies,
            patient_id: patient_id
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    const socket = socketIOClient(CONSTANTS.SOCKETURL);
    socket.on('message', data => this.getNewMessages());
    await this.getNewMessages();
  }

  handleInputChange(event) {
    console.log('In input change');
    this.setState({ inputText: event.target.value });
  }

  sendMessage() {
    console.log('In message send');
    let patient_id = this.state.emergencies[this.state.selectedID].data
      .patient_id;

    let message = this.state.inputText;
    API.createMessage(CONSTANTS.FROM, patient_id, message);
    this.setState({ inputText: '' });
  }

  getNewMessages() {
    console.log('In getNewMessages');
    let to = this.state.patient_id;
    console.log('to: ' + to);
    API.getChat(to, CONSTANTS.FROM)
      .then(data => {
        console.log('Received data in getChat: ');
        console.log(data);
        this.setState({ messages: data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  setSelectedID = async id => {
    console.log('IN click event');
    console.log('SelectID: ' + id);
    let patient_id = this.state.emergencies[id].data.patient_id;
    await this.setState({ selectedID: id, patient_id: patient_id });
    await this.getNewMessages();
  };

  render() {
    let emergencies = this.state.emergencies;
    let map;
    let emergencytable;
    if (emergencies) {
      let emergency = this.state.emergencies[this.state.selectedID];
      console.log('Emergency:' + JSON.stringify(emergency));
      let location = emergency.data.location;
      let fullname = emergency.data.fullname;
      map = (
        <SimpleMap
          center={{ lat: location.latitude, lng: location.longitude }}
          name={fullname}
        />
      );
      emergencytable = (
        <EmergencyTable
          emergencies={this.state.emergencies}
          selectedID={this.state.selectedID}
          setSelectedID={this.setSelectedID}
        />
      );
    } else {
      map = <SimpleMap />;
    }

    return (
      <React.Fragment>
        <Header title="Emergency Center Dashboard" />

        <Container component="main">
          <Grid container direction="row" spacing={2}>
            <Grid item sm={12}>
              <br />
              <Typography align="center" variant="h3">
                Overview of Emergencies
              </Typography>
              <br />
              {emergencytable}
            </Grid>
            <Grid item sm={6}>
              {map}
            </Grid>
            <Grid item sm={6}>
              <Chat
                handleInputChange={this.handleInputChange}
                onSubmit={this.sendMessage}
                inputText={this.state.inputText}
                ID={this.state.selectedID}
                patient_id={this.state.patient_id}
                messages={this.state.messages}
                getNewMessages={this.getNewMessages}
              />
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRoot(Dashboard);
