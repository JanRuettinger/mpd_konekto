import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppProvider } from './utils/AppContext';

import EmergencyDetails from './Views/EmergencyDetails';
import Settings from './Views/Settings';
import withRoot from './custom_theme/withRoot';
import EmergencySent from './Views/EmergencySent';
import Onboarding from './Views/Onboarding';
import Tutorial from './Views/Tutorial';
import TransmittedData from './Views/TransmittedData';
import Message from './Views/Message';
import Reset from './Views/Reset';
import Home from './Views/Home';
import Loading from './Views/Loading'
import MiscEmergency from './Views/MiscEmergency';
import API from './utils/API';
import GeoCoder from './utils/Geocoder';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setOnBoardingStatus = this.setOnBoardingStatus.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.state = {
      onBoardingStatus: false,
      location: { latitude: 47.423371, longitude: 10.99961 },
      emergencyType: null,
      emergencyDetails: null,
      affectedPersons: null,
      emergencyNote: null,
      fullname: null,
      setOnBoardingStatus: this.setOnBoardingStatus,
      setLocation: this.setLocation,
      setEmergencyType: this.setEmergencyType,
      setAffectedPersons: this.setAffectedPersons,
      setEmergencyDetails: this.setEmergencyDetails,
      setEmergencyNote: this.setEmergencyNote,
      submitEmergency: this.submitEmergency,
      setFullname: this.setFullname
    };
  }

  setOnBoardingStatus = status => {
    this.setState({ onBoardingStatus: status });
    API.updateOnboardingStatus(status);
  };

  setFullname = fullname => {
    console.log('In setFullname');
    console.log(fullname);
    this.setState({ fullname: fullname });
  };

  setEmergencyType = emergencyType => {
    this.setState({ emergencyType: emergencyType });
    // API.updateOnboardingStatus(emergencytype);
  };

  setLocation = async location => {
    console.log('In set Locaiton');
    console.log(this.state);
    await GeoCoder.reverse(
      // HACK
      // { lat: location.latitude, lon: location.longitude },
      { lat: 47.423371, lon: 10.99961 },
      (err, res) => {
        this.setState({ city: res[0].city });
        this.setState({ country: res[0].country });
      }
    );
    // HACK
    // await this.setState({ location: location });
    await this.setState({
      location: { latitude: 47.423371, longitude: 10.99961 }
    });

    console.log(this.state);
  };

  setEmergencyDetails = details => {
    console.log('In Set Emergency Details');
    this.setState({ emergencyDetails: details });
  };

  setAffectedPersons = affectedPersons => {
    console.log('In Set Affected Persons');
    console.log(affectedPersons);
    this.setState({ affectedPersons: affectedPersons });
    console.log(this.state);
  };

  setEmergencyNote = async note => {
    console.log('In Set Emergency Note');
    await this.setState({ emergencyNote: note });
    await this.updateEmergency();
  };

  submitEmergency = () => {
    // patient_id
    let data = {
      patient_id: 1,
      emergencyType: this.state.emergencyType,
      city: this.state.city,
      country: this.state.country,
      location: this.state.location
    };
    API.createEmergency(data);
  };

  updateEmergency = () => {
    console.log('Update Emergency Details');
    console.log(this.state);
    // patient_id
    let data = {
      patient_id: 1,
      emergencyType: this.state.emergencyType,
      emergencyDetails: this.state.emergencyDetails,
      affectedPersons: this.state.affectedPersons,
      emergencyNote: this.state.emergencyNote,
      city: this.state.city,
      country: this.state.country,
      location: this.state.location,
      emergencyStatus: 0
    };
    API.updateEmergency(data);
  };

  render() {
    return (
      <AppProvider value={this.state}>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/emergency_details/" component={EmergencyDetails} />
          <Route path="/settings/" component={Settings} />
          <Route path="/emergency_sent" component={EmergencySent} />
          <Route path="/tutorial" component={Tutorial} />
          <Route path="/onboarding" component={Onboarding} />
          <Route path="/reset" component={Reset} />
          <Route path="/transmitted_data" component={TransmittedData} />
          <Route path="/message" component={Message} />
          <Route path="/misc_emergency" component={MiscEmergency} />
          <Route path="/Loading" component={Loading} />
        </Router>
      </AppProvider>
    );
  }
}

export default withRoot(App);
