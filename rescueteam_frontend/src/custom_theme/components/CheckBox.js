import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox } from '@material-ui/core';

import theme from '../theme';

const useStyles = makeStyles(theme => ({
  checkBox: {
    'border-radius': '10px',
    background: 'white',
    'margin-top': '5px',
    'padding-right': '20px',
    'text-align': 'left',
    width: '100%'
  }
}));

export default function CheckBox(props) {
  const classes = useStyles();
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.checked}
          onChange={props.onChange}
          value={props.value}
        />
      }
      label={props.title}
      className={classes.checkBox}
    />
  );
}
