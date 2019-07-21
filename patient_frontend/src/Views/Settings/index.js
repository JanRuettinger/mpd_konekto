import React from 'react';
import { Grid, Box, Typography, TextField } from '@material-ui/core';
import Button from '../../custom_theme/components/Button';
import Container from '../../custom_theme/components/Container';

import { withStyles } from '@material-ui/core/styles';
import { Header } from '../../Layout';

import CONSTANTS from '../../utils/Constants';
import API from '../../utils/API';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red'
      },
      '&:hover fieldset': {
        borderColor: 'yellow'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green'
      }
    }
  },
  layout: {
    width: '100%'
  }
})(TextField);

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  title: {
    'text-align': 'center'
  },
  textfield: {
    'margin-top': theme.spacing(1),
    'margin-bottom': theme.spacing(2)
  },
  container: {
    background: 'white',
    'padding-bottom': '20px'
  }
});

class Settings extends React.Component {
  constructor(props) {
    super(props);
    //const { classes } = props;
    this.classes = props.classes;
    this.state = {};
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeText(e) {
    console.log('text has changed.');
    const key = e.target.id;
    const value = e.target.value;
    let state_obj = {};
    state_obj[key] = value;
    this.setState(state_obj);
  }

  onSubmit(e) {
    console.log('Submit button pressed.');
    API.updateUser(this.state);
    this.props.history.push('/');
  }

  componentDidMount() {
    console.log('Component did mount.');
    API.getUser(CONSTANTS.USER_ID).then(resp => {
      const user_data = resp.data;
      this.setState(user_data);
      console.log(this.state.fullname);
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header title="Settings" BackButton="true" />
        <Container
          component="main"
          maxWidth="sm"
          className={this.classes.container}
        >
          {/* <Typography variant="h4" align="center" gutterBottom="true">
            Settings
          </Typography> */}
          <Box className={this.classes.textfield}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              alignItems="left"
              item
              xs
            >
              <Typography variant="h6">Personal Information</Typography>
              <CssTextField
                id="fullname"
                label="Fullname"
                onChange={this.onChangeText}
                value={this.state.fullname}
              />
              <CssTextField
                id="nationality"
                label="Nationality"
                onChange={this.onChangeText}
                value={this.state.nationality}
              />
              <CssTextField
                id="birthday"
                label="Birthday"
                onChange={this.onChangeText}
                value={this.state.birthday}
              />
              <CssTextField
                id="address"
                label="Home address"
                onChange={this.onChangeText}
                value={this.state.address}
              />
            </Grid>
          </Box>
          <Box className={this.classes.textfield}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              alignItems="left"
              item
              xs
            >
              <Typography variant="h6">Health information</Typography>
              <CssTextField
                id="blood_group"
                label="Blood group"
                onChange={this.onChangeText}
                value={this.state.blood_group}
              />
              <CssTextField
                id="allergies"
                label="Allergies"
                onChange={this.onChangeText}
                value={this.state.allergies}
              />
              <CssTextField
                id="medical_conditions"
                label="Medical conditions"
                onChange={this.onChangeText}
                value={this.state.medical_conditions}
              />
            </Grid>
          </Box>
          <Box className={this.classes.textfield}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              alignItems="left"
              item
              xs
            >
              <Typography variant="h6">Contact information</Typography>
              <CssTextField
                id="fullname_relative_1"
                label="Fullname relative 1"
                onChange={this.onChangeText}
                value={this.state.fullname_relative_1}
              />
              <CssTextField
                id="phone_number_relative_1"
                label="Phone number relative 1"
                onChange={this.onChangeText}
                value={this.state.phone_number_relative_1}
              />
              <CssTextField
                id="fullname_relative_2"
                label="Fullname relative 2"
                onChange={this.onChangeText}
                value={this.state.fullname_relative_2}
              />
              <CssTextField
                id="phone_number_relative_2"
                label="Phone number relative 2"
                onChange={this.onChangeText}
                value={this.state.phone_number_relative_2}
              />
            </Grid>
          </Box>
          <Box>
            <Grid
              container
              direction="column"
              justify="flex-end"
              alignItems="left"
              item
              xs
            >
              <Button
                variant="text"
                color="primary"
                // className={this.classes.button}
                onClick={this.onSubmit}
              >
                Save
              </Button>
              {/* <Button
                variant="contained"
                className={this.classes.button}
                onClick={() => {
                  this.props.history.push('/');
                }}
              >
                Cancel emergency
              </Button> */}
              {/* <br /> */}
              <Button
                variant="text"
                color="secondary"
                // className={this.classes.button}
                onClick={() => {
                  this.props.history.push('/tutorial');
                }}
              >
                Tutorial
              </Button>
              {/* <br />
              <Button
                variant="contained"
                className={this.classes.button}
                onClick={() => {
                  this.props.history.push('/Signin');
                }}
              >
                Signin
              </Button> */}
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Settings);
