import React from 'react';
import { Typography } from '@material-ui/core';
import CheckBoxGroup from '../../custom_theme/components/CheckBoxGroup';
import CheckBox from '../../custom_theme/components/CheckBox';
import CheckBoxIcon from './CheckBoxIcon';

export default class FormEmergencyType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lifeatdanger: props.emergencyTypes.lifeatdanger,
      injury: props.emergencyTypes.injury,
      illness: props.emergencyTypes.illness,
      poisoning: props.emergencyTypes.poisoning,
      firesmoke: props.emergencyTypes.firesmoke,
      other: props.emergencyTypes.other
    };

    this.handleChange = this.handleChange.bind(this);
  }
  //somehow manage global variable set on Landingpage specifying whether police or ambulance

  handleChange(event, checked) {
    let new_state = this.state;

    switch (event.target.value) {
      case 'lifeatdanger':
        new_state['lifeatdanger'] = checked;
        break;
      case 'injury':
        new_state['injury'] = checked;
        break;
      case 'illness':
        new_state['illness'] = checked;
        break;
      case 'poisoning':
        new_state['poisoning'] = checked;
        break;
      case 'firesmoke':
        new_state['firesmoke'] = checked;
        break;
      case 'other':
        new_state['other'] = checked;
        break;
      default:
        break;
    }

    this.setState(new_state);
    this.props.handleEmergencyType(new_state);
  }

  //icon next to the buttons
  render() {
    // <AppContext.Consumer>; let component;</AppContext.Consumer>;
    return (
      <React.Fragment>
        <Typography align="center" variant="h5">
          Specify emergency type
        </Typography>
        <CheckBoxGroup  align = 'left'>
          <CheckBox
            // title="Life at danger"
            title={
              <CheckBoxIcon text="Life in Danger" type="life">
                {' '}
              </CheckBoxIcon>
            }
            onChange={this.handleChange}
            checked={this.state['lifeatdanger']}
            value="lifeatdanger"
          />
          <CheckBox
            title={
              <CheckBoxIcon text="Injury" type="injury">
                {' '}
              </CheckBoxIcon>
            }
            onChange={this.handleChange}
            checked={this.state['injury']}
            value="injury"
          />
          <CheckBox
            title={
              <CheckBoxIcon text="Illness" type="illness">
                {' '}
              </CheckBoxIcon>
            }
            onChange={this.handleChange}
            checked={this.state['illness']}
            value="illness"
          />
          <CheckBox
            title={
              <CheckBoxIcon text="Poisoning" type="poison">
                {' '}
              </CheckBoxIcon>
            }
            onChange={this.handleChange}
            checked={this.state['poisoning']}
            value="poisoning"
          />
          <CheckBox
            title={
              <CheckBoxIcon text="Fire / Smoke" type="fire">
                {' '}
              </CheckBoxIcon>
            }
            onChange={this.handleChange}
            checked={this.state['firesmoke']}
            value="firesmoke"
          />
          <CheckBox
            title={
              <CheckBoxIcon text="Other" type="other">
                {' '}
              </CheckBoxIcon>
            }
            onChange={this.handleChange}
            checked={this.state['other']}
            value="other"
          />
          
        </CheckBoxGroup>
      </React.Fragment>
    );
  }
}
