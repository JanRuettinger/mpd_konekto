import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
//import ConfigurationIcon from '@material-ui/svgIcons/Configuration';
import ArrowBack from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appbar: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main
  },
  menuButton: {
    marginRight: theme.spacing(1),
    color: '#000'
  },
  title: {
    flexGrow: 1,
    // fontFamily: "'Abel', sans-serif",
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.pxToRem(20)
  },
  toolbar: {
    width: '100%'
  }
}));

function MyAppBar(props) {
  const classes = useStyles(); //React HOOK API => looks nice

  let backbutton = null;

  if (props.BackButton === 'true') {
    backbutton = (
      <IconButton edge="start" className={classes.menuButton} color="black">
        <ArrowBack onClick={() => props.history.goBack()} />
      </IconButton>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          {backbutton}
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(MyAppBar);
