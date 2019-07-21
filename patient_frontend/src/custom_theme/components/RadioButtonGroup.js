import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText
} from '@material-ui/core';

import theme from '../custom_theme/theme';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  }
}));

export default function RadioButtonGroup(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  function handleChange(event) {
    if (event.target.value == 2) {
      // Modal not implemented yet
    }
    setValue(event.target.value);
    //setValue('1');
  }

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <RadioGroup
        name="person"
        className={classes.group}
        value={value}
        onChange={handleChange}
      >
        {props.children}
      </RadioGroup>
    </FormControl>
  );
}
