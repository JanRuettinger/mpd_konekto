import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Header } from '../../Layout';
import { Grid, Typography } from '@material-ui/core';
import Button from '../../custom_theme/components/Button';
import Container from '../../custom_theme/components/Container';
import GridContainer from '../../custom_theme/components/GridContainer';
import API from '../../utils/API';
import AppContext from '../../utils/AppContext';

const styles = theme => ({
  item: {
    TextAlign: 'center',
    marginTop: '10px'
  }
});

class EmergencySent extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};
    this.classes = props.classes;
    this.onSpecify = this.onSpecify.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.context);
    let data = {
      patient_id: 1,
      emergency_type: this.context.emergencyType
      //location: { latitude: 123, longitude: 123 }
      // location: 'Italy'
    };
    API.createEmergency(data);
  }

  onSpecify() {
    this.props.history.push('/emergency_details');
  }
  onCancel() {
    //window.alert('Your emergency request has been CANCELLED');
    this.props.history.push('/');
  }

  onSubmit(e) {
    // axios
    //   .post(CONST.URL + 'emergency/create', {
    //     number: 2,
    //     data: this.state.location
    //   })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   });

    this.props.history.push('/emergency_details');
  }

  render() {
    return (
      <React.Fragment>
        <Header title="SOS Sent" BackButton="false" />
        <Container component="main" maxWidth="sm">
          <GridContainer
            // className={this.classes.container}
            direction="column"
            spacing={2}
          >
            <Grid item sm={12} className={this.classes.item}>
              <Typography align="center" variant="h4">
                Emergency sent !
              </Typography>
            </Grid>
            <Grid item sm={12} className={this.classes.item}>
              <Typography align="center" variant="body1">
                Your location and personal information was transmitted. The
                rescue team has been informed.
              </Typography>
            </Grid>

            <Grid item sm={12} className={this.classes.item}>
              <Button
                variant="text"
                color="primary"
                size="medium"
                onClick={this.onSpecify}
              >
                Specify details of emergency
              </Button>
              {/* <Typography align="center">
                <br />
                Enter details regarding your emergency situation.
              </Typography> */}

              <br />
              <br />

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
          </GridContainer>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EmergencySent);
