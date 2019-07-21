import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormGroup, FormControl } from '@material-ui/core';

import theme from '../theme';

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

export default function CheckBoxGroup(props) {
  const classes = useStyles();
  //   const [value, setValue] = React.useState('1');

  //   function handleChange(event) {
  //     setValue(event.target.value);
  //   }

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormGroup>{props.children}</FormGroup>
    </FormControl>
  );
}
