import React from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AppContext, API } from '../../utils';
import { Header } from '../../Layout';
import Container from '../../custom_theme/components/Container';
import SOSButton from './SOSButton';
import MiscButton from './MiscButton';
import ambulance_icon_path from '../../imgs/Ambulance-small-red.png';
import police_icon_path from '../../imgs/Police-small-blue.png';
import CONSTANTS from '../../utils/Constants';

const styles = theme => ({
  item: {
    width: '100%',
    'text-align': 'center',
    'border-radius': '5px',
    'margin-top': '10px'
  },
  icon: {
    height: '50px',
    width: '50px'
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '8px'
  }
});

class Home extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      componentType: 'all',
      cancel: false
    };
    this.handleDirectSOS = this.handleDirectSOS.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
  }

  async getLocation() {
    if (navigator.geolocation) {
      this.context.setLocation(null);
      await navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.context.setLocation(null);
      console.log('Geo Location not supported by browser');
    }
  }

  //function that retrieves the position
  showPosition(position) {
    console.log('Show Position');
    let location = {
      longitude: Math.round(position.coords.longitude * 100) / 100,
      latitude: Math.round(position.coords.latitude * 100) / 100
    };
    console.log(location);
    this.context.setLocation(location);
    // this.setState({ location: location });
  }

  async componentDidMount() {
    // check in database if user already did onboarding
    let user;
    try {
      user = await API.getUser(CONSTANTS.USER_ID);
      this.context.setFullname(user.data.fullname);
      console.log('User successfully retrieved from DB');
    } catch (error) {
      console.log('unable to retrieve user from database');
    }

    if (user) {
      // write user onboardingstatus to global state
      console.log('USer');
      console.log(user);
      this.context.setOnBoardingStatus(user.data.onBoardingStatus);
      this.context.setFullname(user.data.fullname);

      // if user onboarding === false redirect to onboarding page
      if (user.data.onBoardingStatus === false) {
        this.props.history.push('/onboarding');
      }
    } else {
      console.log('Error no user retrieved');
    }
    await this.getLocation();
  }

  handleDirectSOS() {
    this.props.history.push('/emergency_sent');
  }

  toMisc() {
    this.props.history.push('/misc_emergency');
  }

  onSubmit(type, check) {
    //   console.log('OnSubmit function called' + check + type);

    this.setState({ cancel: check });
    if (type === 'police') {
      this.setState({ componentType: 'police' });
      this.context.setEmergencyType(type);
      console.log('onSubmit: police');
    } else if (type === 'ambulance') {
      this.setState({ componentType: 'ambulance' });
      this.context.setEmergencyType(type);
      console.log('onSubmit: ambulance');
    } else if (type === 'MiscEmergency') {
      this.props.history.push('/misc_emergency');
    }
  }

  render() {
    console.log('render: ' + this.state.componentType);
    let component;
    let cancel = this.state.cancel;
    if (this.state.componentType === 'all' || cancel) {
      component = (
        <React.Fragment>
          <div className={this.classes.imageContainer}>
            <img src={ambulance_icon_path} alt="AmbulanceIcon" />{' '}
          </div>
          <div>
            <Typography align="center" variant="h6" color="primary">
              112 Rescue
            </Typography>
          </div>
          <SOSButton
            key="ambulance"
            type="ambulance"
            color="primary"
            onSubmit={(type, check) => this.onSubmit(type, check)}
            rescuetype="Rescue"
          />
          <br />
          <br />
          <div className={this.classes.imageContainer}>
            <img src={police_icon_path} alt="PoliceIcon" />{' '}
          </div>
          <div>
            <Typography align="center" variant="h6" color="secondary">
              110 Police
            </Typography>
          </div>
          <SOSButton
            key="police"
            type="police"
            color="secondary"
            onSubmit={(type, check) => this.onSubmit(type, check)}
            rescuetype="Police"
          />

          <br />
          <br />
          <br />
          <MiscButton
            key="miscEmergency"
            type="MiscEmergency"
            onSubmit={(type, check) => this.onSubmit(type, check)}
          />
        </React.Fragment>
      );
    } else if (this.state.componentType === 'ambulance') {
      component = (
        <React.Fragment>
          <div className={this.classes.imageContainer}>
            <img src={ambulance_icon_path} alt="AmbulanceIcon" />{' '}
          </div>
          <div>
            <Typography align="center" variant="h6" color="primary">
              Rescue
            </Typography>
          </div>
          <SOSButton
            key="ambulance"
            type="ambulance"
            color="primary"
            onSubmit={(type, check) => this.onSubmit(type, check)}
          />
        </React.Fragment>
      );
    } else if (this.state.componentType === 'police') {
      component = (
        <React.Fragment>
          <div className={this.classes.imageContainer}>
            <img src={police_icon_path} alt="PoliceIcon" />{' '}
          </div>
          <div>
            <Typography align="center" variant="h6" color="secondary">
              Police
            </Typography>
          </div>
          <SOSButton
            key="police"
            type="police"
            color="secondary"
            onSubmit={(type, check) => this.onSubmit(type, check)}
          />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Header title="Send out SOS" />
        <Container component="main" maxWidth="sm">
          <Grid
            container
            className={this.classes.container}
            direction="column"
            spacing={2}
          >
            <Grid
              item
              sm={12}
              className={(this.classes.item, this.classes.forwardbutton)}
            >
              {component}
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Home));

/*
          <Button
            className={this.classes.miscbutton}
            onClick={this.toMisc}
            key="miscEmergency"
            type="MiscEmergency"
            //onSubmit={(type, check) => this.onSubmit(type, check)}
          >
            Further Emergency Services
          </Button> */
