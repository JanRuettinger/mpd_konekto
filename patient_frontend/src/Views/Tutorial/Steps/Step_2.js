//on this site the user should be explained what the process is
import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  list_container: {
    textAlign: 'left',
    display: 'inline-block'
    // ListStylePosition: 'inside'
  },
  list_item: {
    display: 'block',
    textAlign: 'left'
  }
});

class Step_2 extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Typography>
          Please provide additional information afterwards to help emergency
          providers prepare:
          <br />
          <br />
          1. Type of emergency
          <br />
          2. Are you affected yourself
          <br />
          3. More information in textbox (e.g. in which floor you are)
          <br />
          <br />
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Step_2);
