import React from 'react';
import { Typography } from '@material-ui/core';
import CheckBoxGroup from '../../custom_theme/components/CheckBoxGroup';
import CheckBox from '../../custom_theme/components/CheckBox';
import { withStyles } from '@material-ui/core/styles';
import CheckBoxIcon from './CheckBoxIcon';

const styles = theme => ({
  container: {
    alignItems: 'center',
    // background: 'white',
    border: 'black',
    'border-width': 'medium',
    'margin-top': '80px',
    background: 'rgba(255, 255, 255, 0.8)',
    'border-radius': '20px'
  },
  item: {
    // background: 'red',
    width: '100%',
    //background: 'white',
    'text-align': 'center',
    'border-radius': '5px',
    'margin-top': '10px'
  },
  sosbutton: {
    background: 'red',
    'text-align': 'center',
    'margin-top': '30px',
    height: '40%',
    width: '100%'
  },
  heading:
  {
    margin:'10px',
    fontWeight:'bold',
    fontSize:'26px'
  }
});

class FormPersonType extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      meAffected: props.personTypes.meAffected,
      anotherPerson: props.personTypes.anotherPerson
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, checked) {
    let new_state = this.state;
    switch (event.target.value) {
      case 'meAffected':
        new_state['meAffected'] = checked;
        break;
      case 'anotherPerson':
        new_state['anotherPerson'] = checked;
        break;
      // case 'meAndAnother':
      //   new_state['meAndAnother'] = checked;
      //   break;
      default:
        break;
    }
    this.setState(new_state);
    this.props.handleAffectedPeople(new_state);
  }

  render() {
    return (
      <React.Fragment>
        <Typography align="center" variant="h5">Who is affected?</Typography>
        <CheckBoxGroup align = 'left'>
          <CheckBox
            value="meAffected"
            title= {<CheckBoxIcon text='I am affected' type='meAffected'> </CheckBoxIcon>}
            onChange={this.handleChange}
            checked={this.state['meAffected']}
          />
          <CheckBox
            value="anotherPerson"
            title= {<CheckBoxIcon text='Another person is affected' type='anotherPerson'> </CheckBoxIcon>}
            onChange={this.handleChange}
            checked={this.state['anotherPerson']}
          />

          {/* <CheckBox
            value="meAndAnother"
            title= {<CheckBoxIcon text='Me and another person are affected' type='meAndAnother'> </CheckBoxIcon>}
            onChange={this.handleChange}
            checked={this.state['meAndAnother']}
          /> */}
        </CheckBoxGroup>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FormPersonType);
