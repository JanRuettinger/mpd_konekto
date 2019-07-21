import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Header } from '../../Layout';
import { Grid, Container, Button } from '@material-ui/core';

import DoctorIcon from '../../imgs/DoctorIcon.png';
import MaritimeIcon from '../../imgs/MaritimeIcon.png';
import PoisonIcon from '../../imgs/PoisonIcon.png';
import PoliceIcon from '../../imgs/PoliceIcon.png';


const styles = theme => ({
  container: {
    alignItems: 'center',
    // background: 'white',
    border: 'black',
    'border-width': 'medium',
    'margin-top': '80px',
    'margin-bottom': '80px',
    background: 'rgba(255, 255, 255, 0.8)',
    'border-radius': '20px'
  },
  invisible: {
    alignItems: 'left',
    //flexGrow: 1,
    width: '100%',
    padding: 1,
    background: 'transparent',
    direction: 'row'
  },
  subcontainer: {
    alignItems: 'center',
    flexGrow: 1,
    width: '95%',
    padding: 10,
    background: 'transparent',
    border: 'black',
    'border-width': 'medium',
    'margin-top': '10px',
    'margin-left': '3px',
    'margin-right': '3pgitx',
    'margin-bottom': '10px',
    'border-radius': '20px'
  },
  item: {
    //background: 'red',
    width: '80%',
    //background: 'white',
    'text-align': 'center',
    'border-radius': '5px',
    display: 'flex',
    'margin-top': '10px',
    float: 'right'
  },
  label: {
    background: 'white'
  },
  icon: {
    height: '50px',
    width: '50px'
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    float: 'left'
  }
});

class MiscEmergency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.classes = props.classes;
    this.onSpecify = this.onSpecify.bind(this);
  }

  onSpecify() {
    this.props.history.push('/emergency_details');
  }

  onBack() {
    this.props.history.push('/');
  }

  render() {
    return (
      <React.Fragment>
        <Header title="Emergency" BackButton="true" />
        <Container component="main" maxWidth="sm">
          <br />
          <Grid
            container
            className={this.classes.container}
            direction="column"
            spacing={2}
          >
            <Grid className={this.classes.subcontainer}>
              <div className={this.classes.imageContainer}>
                <img src={DoctorIcon} alt="AmbulanceIcon" />{' '}
              </div>
              <Button
                item
                className={this.classes.item}
                variant="contained"
                color="primary"
                onClick={this.onSpecify}
              >
                Medical emergency Service
              </Button>
            </Grid>
            <Grid className={this.classes.subcontainer}>
              <div className={this.classes.imageContainer}>
                <img src={PoliceIcon} alt="AmbulanceIcon" />{' '}
              </div>
              <Button
                item
                className={this.classes.item}
                variant="contained"
                color="primary"
                onClick={this.onSpecify}
              >
                Federal Police
              </Button>{' '}
            </Grid>
            <Grid className={this.classes.subcontainer}>
              <div className={this.classes.imageContainer}>
                <img src={PoisonIcon} alt="AmbulanceIcon" />{' '}
              </div>
              <Button
                item
                className={this.classes.item}
                variant="contained"
                color="primary"
                onClick={this.onSpecify}
              >
                Poison Information
              </Button>
            </Grid>
            <Grid className={this.classes.subcontainer}>
              <div className={this.classes.imageContainer}>
                <img src={MaritimeIcon} alt="AmbulanceIcon" />{' '}
              </div>
              <Button
                item
                className={this.classes.item}
                variant="contained"
                color="primary"
                onClick={this.onSpecify}
              >
                Maritime rescue
              </Button>
            </Grid>
            <br />
            <br />
            <br />
            <br />
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MiscEmergency);

/*
            <br />
            <Grid className={this.classes.subcontainer}>
              <Button
                item
                className={this.classes.item}
                variant="outlined"
                color="primary"
                onClick={this.onBack}
              >
                Back
              </Button>

            </Grid>
              */