import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import theme from '../custom_theme/theme';
import API from '../utils/API';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    fontSize: '10px'
  },
  item: {
    padding: 0
  }
}));

const options_long = [
  'Emergency Request unaswered',
  'Emergency Team dispatched'
];

const options_short = ['unaswered', 'team dispatched'];

export default function SimpleListMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setAnchorEl(null);
    let new_emergency = props.emergency.data;
    new_emergency['emergencyStatus'] = index;
    API.updateEmergency(props.emergency._id, new_emergency);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const rightToggleStyle = {
    padding: '0px',
    textAlign: 'center',
    margin: 0,
    backgroundColor: props.selected ? theme.palette.primary.main : null
  };

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-label="Device settings"
        className={classes.item}
      >
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="When device is locked"
          onClick={handleClickListItem}
          className={classes.item}
        >
          <ListItemText
            primary={options_short[props.emergency.data.emergencyStatus]}
            style={rightToggleStyle}
            // secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options_long.map((option, index) => (
          <MenuItem
            key={option}
            // disabled={index === 0}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
