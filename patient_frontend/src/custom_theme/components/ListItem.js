import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class ListItem extends Component {
  state = {};

  handleChange = event => {
    this.props.onCheck(this.props.emergencyType.id);
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Checkbox
            value={this.props.emergencyType.text}
            onChange={this.handleChange}
          />
          {this.props.emergencyType.text}{' '}
        </div>{' '}
      </React.Fragment>
    );
  }
}

export default ListItem;
