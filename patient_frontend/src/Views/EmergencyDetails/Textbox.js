import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import Button from '../../custom_theme/components/Button';
import AppContext from '../../utils/AppContext';

// const styles = theme => ({
//   item: {
//     width: '80%',
//     'text-align': 'center',
//     'border-radius': '5px',
//     'margin-top': '10px',
//     alignItems: 'center'
//   },
//   label: {
//     background: 'white'
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     alignItems: 'center',
//     padding: '20px'
//   },
//   dense: {
//     marginTop: 16
//   },
//   menu: {
//     width: 200
//   }
// });

export default class Textbox extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      textfielddefault: 'e.g., exact position, number of people affected...',
      textFieldValue: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }
  onClick() {
    this.setState({ textfielddefault: '' });
  }

  onSubmit(e) {
    this.props.handleEmergencyNote({
      emergencyNote: this.state.textFieldValue
    });
  }

  handleTextFieldChange(e) {
    this.setState({
      textFieldValue: e.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <Typography align="center" variant="h5">
          Add further description
        </Typography>

        <TextField
          id="emergency-text"
          label="Emergency Message (optional)"
          placeholder={this.state.textfielddefault}
          fullWidth
          margin="normal"
          multiline
          rows="8"
          variant="filled"
          value={this.state.textFieldValue}
          onChange={this.handleTextFieldChange}
          InputLabelProps={{
            shrink: true
          }}
        />
        <Button
          size="medium"
          variant="text"
          color="primary"
          onClick={this.onSubmit}
        >
          Send Details
        </Button>
      </React.Fragment>
    );
  }
}
