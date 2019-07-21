import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
  SvgIcon
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
          <Link component={RouterLink} to="/settings">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="default"
              aria-label="Menu"
            >
              {/* <ConfigurationIcon />*/}
              <SvgIcon
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
              </SvgIcon>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(MyAppBar);
