import React, { Component } from 'react';
import { Grid, Container, Typography } from '@material-ui/core';
import {
  FaFire,
  FaHeartbeat,
  FaThermometerFull,
  FaEllipsisH,
  FaFlask,
  FaUserInjured,
  FaUserFriends,
  FaUserPlus
} from 'react-icons/fa';

class IconText extends Component {
  state = {};
  render() {
    let icon;

    switch (this.props.type) {
      case 'life':
        icon = <FaHeartbeat style={{ fontSize: '20px' }} />;
        break;
      case 'injury':
        icon = <FaUserInjured style={{ fontSize: '20px' }} />;
        break;
      case 'illness':
        icon = <FaThermometerFull style={{ fontSize: '20px' }} />;
        break;
      case 'poison':
        icon = <FaFlask style={{ fontSize: '20px' }} />;
        break;
      case 'fire':
        icon = <FaFire style={{ fontSize: '20px' }} />;
        break;
      case 'other':
        icon = <FaEllipsisH style={{ fontSize: '20px' }} />;
        break;

      case 'meAffected':
        icon = <FaUserInjured style={{ fontSize: '20px' }} />;
        break;
      case 'anotherPerson':
        icon = <FaUserPlus style={{ fontSize: '20px' }} />;
        break;
      case 'meAndAnother':
        icon = <FaUserFriends style={{ fontSize: '20px' }} />;
        break;

      default:
        icon = <FaHeartbeat style={{ fontSize: '20px' }} />;
        break;
    }

    return (
      <Container>
        <Grid
          container
          spacing={2}
          display="flex"
          direction="row "
          justifyContent="space-between"
          wrap="nowrap"
          alignItems="center"
        >
          <Grid item>
            {icon}
            {/* {console.log(icon)} */}
          </Grid>

          <Grid item>
            <Typography variant="subtitle1" style={{ width: '140%'}}> {this.props.text}</Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default IconText;
