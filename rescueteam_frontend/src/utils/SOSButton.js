import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class SOSButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false
    };
    this.timerStart = this.timerStart.bind(this);
    this.timerStop = this.timerStop.bind(this);
    this.tick = this.tick.bind(this);
    this.counter = 3;
    this.counterStep = 1;
  }

  timerStart() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.setState({ timerOn: true });
  }

  timerStop() {
    clearInterval(this.timerID);
    this.counter = 3;
    this.setState({ timerOn: false });
    this.props.history.push('/');
  }

  tick() {
    this.counter = this.counter - this.counterStep;
    if (this.counter <= 0) {
      this.setState({ timerOn: false });
      this.timerStop();
      this.props.onSubmit();
      this.props.history.push('/emergency_sent');

      // transistion to next page
    } else {
      this.setState({ timerOn: true });
    }
    console.log(this.counter);
  }

  render() {
    let timerOn = this.state.timerOn;
    let button;

    if (timerOn) {
      button = (
        <div>
          You have {this.counter} seconds to cancel the emergency SOS. <br />
          <br />
          <Button size="large" color="primary" onClick={this.timerStop}>
            Press here to cancel emergency call!
          </Button>
        </div>
      );
    } else {
      button = (
        <Button className="emergencybutton" onClick={this.timerStart}>
          GET HELP NOW!
        </Button>

        // startTimer={this.timerStart}
      );
    }

    console.log(button);
    return button;
    // <Button
    //   size="large"
    //   variant="contained"
    //   color="white"
    //   onClick={props.startTimer}
    //   fullWidth
    // >
    //   HOLD FOR SOS
    // </Button>
  }
}

export default withRouter(SOSButton);
