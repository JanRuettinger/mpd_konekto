import React from 'react';
import { Typography } from '@material-ui/core';

class Step_1 extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Typography>
          To explain how you use the app in case of an emergency, we guide you
          through the process.
          <br />
          1. Select whether you want to call the police (110), ambulance or fire
          service (112).
          <br />
          2. Your personal and location information will be shared with the
          respective operator.
          <br />
        </Typography>
      </React.Fragment>
    );
  }
}

export default Step_1;
