import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Container, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppContext from '../../utils/AppContext';
import Steps from './Steps';
import { Header } from '../../Layout';
import ProgressiveMobileStepper from './ProgressiveMobileStepper';
import logo_path from '../../imgs/android_logo_small.png';

const styles = theme => ({
  container: {
    alignItems: 'center',
    height: '60%',
    border: 'black',
    'border-width': 'medium',
    'margin-top': '50px',
    background: 'rgba(255, 255, 255, 0.8)',
    'border-radius': '20px'
  },
  item: {
    width: '100%',
    'text-align': 'center',
    'border-radius': '5px',
    'margin-top': '5px',
    'justify-content': 'center'
  },
  container2: {
    border: 'black',
    'border-width': 'medium',
    'margin-top': '30px'
  },
  picture: { display: 'block', margin: '0 auto' },
  box: { width: '230px' }
});
class UserOnboarding extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = { tutorialProgress: 0 };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
  }

  componentDidMount() {
    // if (this.context.onBoardingStatus === true) {
    //   // onboarding already done, redirect to /
    //   this.props.history.push('/');
    // }
    this.setState({ tutorialProgress: 0 });
  }

  handleSkip(e) {
    //this.setState({ onBoardingStatus: true });
    // this.context.setOnBoardingStatus(true);
    this.props.history.push('/');
  }

  handleNext(e) {
    this.setState({ tutorialProgress: this.state.tutorialProgress + 1 });
  }

  handleBack(e) {
    this.setState({ tutorialProgress: this.state.tutorialProgress - 1 });
  }
  render() {
    let component;
    console.log(this.state);

    // if (this.context.onBoardingStatus === true) {
    //   this.setState({ tutorialProgress: 0 });
    //   this.props.history.push('/');
    // }

    if (this.state.tutorialProgress === 0) {
      component = <Steps.Step_0 />;
    } else if (this.state.tutorialProgress === 1) {
      component = <Steps.Step_1 />;
    } else if (this.state.tutorialProgress === 2) {
      component = <Steps.Step_2 />;
    } else if (this.state.tutorialProgress === 3) {
      component = <Steps.Step_3 />;
    } else if (this.state.tutorialProgress === 4) {
      this.props.history.push('/');
    }

    return (
      <React.Fragment>
        <Header title="Learn how to send SOS" />
        <Container component="main" maxWidth="sm">
          <Grid
            container
            className={this.classes.container}
            direction="column"
            spacing={2}
          >
            <Grid item sm={12} className={this.classes.item}>
              <img src={logo_path} alt="Logo" />
            </Grid>
            <Grid item sm={12} className={this.classes.item}>
              {component}
            </Grid>
          </Grid>
          <Grid
            container
            className={this.classes.container2}
            direction="column"
            spacing={2}
          >
            <Grid item sm={12} className={this.classes.item}>
              <ProgressiveMobileStepper
                handleNext={this.handleNext}
                handleBack={this.handleBack}
                activeStep={this.state.tutorialProgress}
              />
              <br />
              <Button size="large" color="primary" onClick={this.handleSkip}>
                Skip Tutorial
              </Button>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(UserOnboarding));
