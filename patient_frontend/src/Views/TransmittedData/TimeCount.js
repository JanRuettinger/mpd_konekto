import React, { Component } from 'react';

class TimeCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false
    };
    this.timerStart = this.timerStart.bind(this);
    this.timerStop = this.timerStop.bind(this);
    this.tick = this.tick.bind(this);
    this.time = this.time.bind(this);
    this.minutesPlus36 = this.minutesPlus36.bind(this);
    this.hoursPlus36 = this.hoursPlus36.bind(this);
    this.counterMinutes = 36;
    this.currentTime = 45;
    this.counterSeconds = 0;
    this.counterStep = 1;
    this.classes = props.classes;
  }

  timerStart() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.setState({ timerOn: true });
  }

  time() {
    var today = new Date();

    var hours = today.getHours();
    var minutes = today.getMinutes();

    var text = ':';
    var hoursPlus = this.hoursPlus36(hours, minutes);
    var minutesPlus = this.minutesPlus36(minutes);
    if (this.minutesPlus36(minutes) < 10) {
      minutesPlus = '0' + String(this.minutesPlus36(minutes));
    }
    var newDate = hoursPlus + text + minutesPlus;
    // console.log(newDate);
    this.setState({ currentTime: newDate });
  }

  minutesPlus36(minutes) {
    return (minutes + 36) % 60;
  }
  hoursPlus36(hours, minutes) {
    if (minutes + 36 > 59) return hours + 1;
    else return hours;
  }

  timerStop() {
    clearInterval(this.timerID);
    this.setState({ timerOn: false });
  }

  tick() {
    if (this.counterSeconds === 0) {
      this.counterMinutes = this.counterMinutes - this.counterStep;
      this.counterSeconds = 59;
      this.setState({
        counterMinutes: this.counterMinutes,
        counterSeconds: this.counterSeconds
      });
    } else {
      this.counterSeconds = this.counterSeconds - this.counterStep;
      this.setState({
        counterSeconds: this.counterSeconds
      });
    }

    if (this.counterMinutes <= 0 && this.counterSeconds <= 0) {
      this.setState({ timerOn: false });
      this.timerStop();
    } else {
      this.setState({ timerOn: true });
    }
    //console.log('counterMinutes: ' + this.counterMinutes)
  }

  componentDidMount() {
    this.timerStart();
    this.time();
    //this.setState({currentTime: {currentTime()}});
  }

  render() {
    // console.log(this.state.currentTime);
    // console.log(this.state.counterMinutes);
    return (
      <React.Fragment>
       {/* <span>The emergency team arrives at: </span>
       <span style={{color:"blue", fontWeight:'bold'}}> {this.state.currentTime} pm</span> */}

        <br />
        <span>   {"Time until rescue team arrival:  " }</span>

        <span style={{color:"blue", fontWeight:'bold'}}> {this.state.counterMinutes} minutes </span>
      </React.Fragment>
    );
  }
}

export default TimeCount;
