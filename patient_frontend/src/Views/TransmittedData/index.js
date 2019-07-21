import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Header } from '../../Layout';
import { Grid, Typography } from '@material-ui/core';
import Button from '../../custom_theme/components/Button';
import Container from '../../custom_theme/components/Container';
import TimeCount from './TimeCount';
import AppContext from '../../utils/AppContext';
import CONSTANTS from '../../utils/Constants';
import Modal from '@material-ui/core/Modal';
import socketIOClient from 'socket.io-client';

import {
  FaMapMarkedAlt,
  FaUser,
  FaAmbulance,
  FaFileAlt
  // FaBold
} from 'react-icons/fa';

const styles = theme => ({
  container: {
    //alignItems: 'center',
    background: 'white',
    border: 'black',
    'border-width': 'medium',
    'margin-top': '10px',
    'border-radius': '20px',
    display:'flex'
  },
  subcontainer: {
    alignItems: 'center',
    flexGrow: 1,
    width: '95%',
    padding: 10,
    background: 'white',
    border: 'black',
    'border-width': 'medium',
    'margin-top': '10px',
    'margin-left': '3px',
    'margin-right': '3px',
    'margin-bottom': '10px',
    'border-radius': '20px'
  },
  finalConatiner: {
    background: 'white',
    display: 'flex'
  },
  modal: {
    backgroundColor: '#50C878',
    margin: '20px'
  },
  paper: {
    position: 'relative',
    backgroundColor: '#01796F',
    //   border: "2px solid #000",
    padding: theme.spacing(2, 4, 4),
    outline: 'none',
    marginTop: '180px',
    marginLeft: '30px',
    marginRight: '30px',
    'border-radius': '20px',
    color: 'white',
   
  }
});

class EmergencySent extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { showModal: false, emergency_status_changed: false };
    this.classes = props.classes;
    this.onChat = this.onChat.bind(this);
    this.onCancel = this.onCancel.bind(this);
    // this.showPosition = this.showPosition.bind(this);
    // this.getLocation = this.getLocation.bind(this);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen() {
   setTimeout(()=>  this.setState({ showModal: true }), 3000);
    console.log('handleopen called  ');
  }
  handleClose() {
    console.log('closing-modal');
    this.setState({ showModal: false });
  }

  onChat() {
    this.props.history.push('/message');
  }

  onCancel() {
    window.alert('Your emergency request has been CANCELLED');
    this.props.history.push('/');
  }

  // getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(this.showPosition);
  //     console.log('Location determined');
  //   } else {
  //     console.log('Geo Location not supported by browser');
  //   }
  // }

  //function that retrieves the position
  // showPosition(position) {
  //   console.log('Show Position');
  //   let location = {
  //     longitude: Math.round(position.coords.longitude * 100) / 100,
  //     latitude: Math.round(position.coords.latitude * 100) / 100
  //   };
  //   console.log(location);
  //   this.setState({ location: location });
  // }

  componentDidMount() {
    // setTimeout(() => this.handleOpen(), 10000);
    console.log('Component summary mounted');
    const socket = socketIOClient(CONSTANTS.SOCKETURL);
    socket.on('emergency_status_change', data =>
     this.handleOpen());
  }
  // componentWillMount() {
  //   this.getLocation();
  // }

  render() {
    // var smallFont = {
    //   fontSize: '20px'
    // };
    var redFont = {
      color: 'red'
    };
    
    // var whiteFont = {
    //   color: 'white',
    //   textAlign: 'center'
    // };

    // let location_display;
    // if (this.state.location) {
    //   location_display = (
    //     <span>
    //       Lat:{this.state.location.longitude}, Long:{' '}
    //       {this.state.location.latitude}
    //     </span>
    //   );
    // }

    if(this.state.showModal=== true)
                {this.time= <TimeCount />
               }
    console.log('Context: ' + JSON.stringify(this.context.location));

    return (
      <React.Fragment>
        <Header title="Transmitted Data" BackButton="true" />
        <Container component="main" maxWidth="xs">
          <Grid
            container
            // className={this.classes.container}
            direction="row"
            // spacing={2}
          >
            <Grid item sm={12} align="center">
              <Typography align="center" variant="h5">
                Transmitted Emergency Data
              </Typography>
              <br />
            </Grid>
             <Grid item sm={12}>
              {this.time}

            </Grid>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.showModal}
              onClose={this.handleClose}
              //className={this.classes.modal}
            >
              <div className={this.classes.paper}>
                <h3 align="center" id="modal-title">
                The emergency rescue team has been dispatched
                </h3>
                <h4 align="center" id="modal-subtitle" >
                  Message from rescue team:
                </h4>
                <p
                  id="simple-modal-description"
                  style={{
                    backgroundColor: 'white',
                    padding: '10px',
                    'border-radius': '10px',
                  //  boxShadow: '1px 2px 4px grey',
                    //border: '1px solid #000',
                    color: 'black'
                  }}
                >
                  Dear {this.context.fullname}, {<br />}
                  We are on our way to help you, please stay calm and do not
                  change your location.
                  {<br />}
                  Alpine Rescue
                </p>
                <Button
                  onClick={this.handleClose}
                  variant="text"
                color="secondary"
                size="medium"              
                  style={{ backgroundColor: 'grey', color: 'white',fontWeight:'normal' }}
                >
                  close
                </Button>
              </div>
            </Modal>

            <Grid
              container
              className={this.classes.container}
              direction="column"
              spacing={2}
            >
              <Grid
                container
                className={this.classes.subcontainer}
                direction="column"
                spacing={2}
              >
                <Grid
                  container
                  className={this.classes.container}
                  direction="row"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item xs={6}>
                    <Grid
                      container
                      className={this.classes.finalConatiner}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item xs={3}>
                        <FaUser style={{ fontSize: '20px' }} />
                      </Grid>
                      <Grid item xs={9}>
                        <span style={{ fontWeight: 'bold' }}>Who?</span>
                        <br />
                        <span style={redFont}>{this.context.fullname}</span>
                        <br />
                        {this.context.affectedPersons}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={6}>
                    <Grid
                      container
                      className={this.classes.finalConatiner}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"                    >
                      <Grid item xs={3}>
                        <FaAmbulance style={{ fontSize: '24px' }} />{' '}
                      </Grid>
                      <Grid item xs={9}>
                        <span style={{ fontWeight: 'bold' }}>What?</span> <br />
                        <span style={redFont}>
                          {' '}
                          {this.context.emergencyDetails}
                        </span>
                        <br /> {this.context.emergencyNote}
                        {/* I cannot move [...] */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  className={this.classes.container}
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                >
                  <Grid item xs={6}>
                    <Grid
                      container
                      className={this.classes.finalConatiner}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item xs={3}>
                        <FaMapMarkedAlt style={{ fontSize: '20px' }} />{' '}
                      </Grid>
                      <Grid item xs={9}>
                        <span style={{ fontWeight: 'bold' }}> Where?</span>
                        <br />
                        <span style={redFont}>GPS Location</span>
                        <br />
                        <span>
                          Lat: {this.context.location.latitude} Long:{' '}
                          {this.context.location.longitude}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid
                      container
                      className={this.classes.finalConatiner}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item xs={3}>
                        <FaFileAlt style={{ fontSize: '20px' }} />{' '}
                      </Grid>
                      <Grid item xs={9}>
                        <span style={{ fontWeight: 'bold' }}>
                          {' '}
                          Medical Info?
                        </span>
                        <br />
                        <span style={redFont}>Medical Passport</span>

                        <br />
                        {this.context.fullname}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <br />
              </Grid>
            </Grid>
            <br />
            <br />
            {/*           //Old style
            <Grid item xs={6}>
              <span style={smallFont}>Who?</span>
              <br />
              <span style={redFont}>{this.context.fullname}</span>
              <br />
              {this.context.affectedPersons}
            </Grid>
            <Grid item xs={6}>
              <span style={smallFont}>What?</span>
              <br />
              {this.context.emergencyDetails}
              <br /> {this.context.emergencyNote}
              <br /> <br />
            </Grid>
            <Grid item xs={6}>
              <span style={smallFont}> Where?</span>
              <br />
              <span style={redFont}>
                GPS data
                {/* Lat: {this.context.location.latitude} Long:
                {this.context.location.longitude} */}

            <Grid item>
              <Button
                size="medium"
                variant="text"
                color="primary"
                onClick={this.onChat}
              >
                Chat with Rescue Team
              </Button>

              <Button
                variant="text"
                color="secondary"
                size="medium"
                style={{ backgroundColor: 'grey', color: 'white' }}
                onClick={this.onCancel}
              >
                Cancel Emergency
              </Button>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(EmergencySent);
