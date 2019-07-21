import React from 'react';
import { Typography } from '@material-ui/core';

export default class Step_0 extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {};
  }
  render() {
    return (
      <Typography>
        Welcome to Konekto
        <br />
        <br />
        Konekto allows you to report an emergency anywhere you go.
        <br />
        <br />
        It relies on satellite connection, so that help is in reach anywhere you
        go!
        <br />
        <br />
        <br />
      </Typography>
    );
  }
}
