import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../../custom_theme/components/Button';
//import { connect } from 'react-redux';

class MiscButton extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      timerOn: false,
      type: props.type
    };
    this.timerStart = this.timerStart.bind(this);
    this.timerStop = this.timerStop.bind(this);
    this.tick = this.tick.bind(this);
    this.counter = 3;
    this.counterStep = 1;
  }

  timerStart() {
    //this.timerID = setInterval(() => this.tick(), 1000);
    //this.setState({ timerOn: true });
    this.props.onSubmit(this.props.type, false);
  }

  timerStop() {
    clearInterval(this.timerID);
    this.counter = 3;
    this.setState({ timerOn: false });
    this.props.history.push('/');
    console.log('INSIDE timer STOP' + this.props.type + true);
    this.props.onSubmit(this.props.type, true);
  }

  tick() {
    this.counter = this.counter - this.counterStep;
    if (this.counter <= 0) {
      this.setState({ timerOn: false });
      this.timerStop();
      this.props.onSubmit(this.props.cancel);
      this.props.history.push('/emergency_sent');
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
          <br />
          <p textAlign="center">
            {' '}
            You have {this.counter} seconds to cancel the emergency SOS.{' '}
          </p>
          <br />
          <Button
            size="large"
            color="primary"
            variant="text"
            onClick={this.timerStop}
          >
            Cancel emergency
          </Button>
        </div>
      );
    } else {
      button = (
        <Button
          size="medium"
          style={{ color: 'white', backgroundColor: 'grey' }}
          variant="text"
          onClick={this.timerStart}
        >
          Further Emergency Services
        </Button>
      );
    }
    return button;
  }
}

export default withRouter(MiscButton);
// export default withStyles(styles)(SOSButton);
//export default withStyles(withRouter(SOSButton));
//<Button className="emergencybutton" onClick={this.timerStart}>
