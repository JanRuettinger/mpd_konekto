//on this site the user should be explained what the process is
import React from 'react';
import { Typography } from '@material-ui/core';

export default class ExplanationAboutProcess3 extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Typography>
          Then you see a summary and have the possibility to chat with incoming
          emergency teams.
          <br />
          <br />
          <br />
          Enter your personal information on the next screen.
          <br />
          <br />
          <br />
        </Typography>
      </React.Fragment>
    );
  }
}
