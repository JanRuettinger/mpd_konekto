import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Radio } from '@material-ui/core';

import theme from '../custom_theme/theme';

const useStyles = makeStyles(theme => ({
  radiobutton: {
    'border-radius': '10px',
    background: 'white',
    'margin-top': '5px',
    'padding-right': '20px',
    'text-align': 'left'
  }
}));

export default function RadioButton(props) {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={classes.radiobutton}
      name={props.name}
      value={props.value}
      control={<Radio />}
      label={props.label}
    />
  );
}
