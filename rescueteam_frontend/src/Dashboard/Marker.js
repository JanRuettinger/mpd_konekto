import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  FaMapMarkerAlt
} from 'react-icons/fa';


const styles = theme => ({
  root: {

    position: 'absolute',
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 2
  }
});

class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
  }

  render() {
    return <div className={this.classes.root}> {this.props.text}<br/> <FaMapMarkerAlt fontSize="24"/></div>;
  }
}

export default withStyles(styles)(Marker);