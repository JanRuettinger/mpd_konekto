import React from 'react';
import {withRouter } from 'react-router-dom';
import withRoot from '../custom_theme/withRoot';
import { Header } from '../Layout';
import { Typography, Grid, Container } from '@material-ui/core';
import API from '../utils/API';

class Dashboard extends React.Component {

  componentDidMount() {
    // get all Emergencies
    console.log('Component did mount');
    API.getSeed();
    this.props.history.push('/');
  }

  render() {
    return (
      <React.Fragment>
        <Header title="Seed" />

        <Container component="main">
          <Grid container direction="column" spacing={2}>
            <Grid item lg={12}>
              <br />
              <Typography align="center" variant="h3">
                Seed
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(withRoot(Dashboard));
