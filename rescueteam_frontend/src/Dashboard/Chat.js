import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input, Grid,Box, Button, Typography } from '@material-ui/core';
import CONSTANTS from '../utils/Constants';

const styles = theme => ({
  chatcontainer: {
    borderColor: '#D3D3D3',
    borderWidth: '3px',
    borderRadius: '10px',
    height: '60vh',
    width: '100%',
    padding: '20px',
    'overflow-y': 'auto'
  },
  chatbox: {
    marginTop: '25px',
    marginBottom: '10px'
  },
  message_send: {
    borderWidth: '0px',
    backgroundColor: theme.palette.primary.main,
    padding: '7px',
    borderRadius: '20px',
    borderTopRightRadius: '2px',
    margin: '10px',
    fontSize: '15px',
    width: '70%',
    display: 'flex',
    color: 'white'
  },
  message_received: {
    borderWidth: '0px',
    backgroundColor: '#D3D3D3	',
    padding: '7px',
    'border-radius': '20px',
    borderTopLeftRadius: '2px',
    margin: '10px',
    fontSize: '15px',
    width: '70%'
  },
  input: {
    width: '100%',
   fontWeight:'normal' 
  },
  chatinput: {
    bottom: 0
  },
  send_button: { margin: 'auto', marginTop: '5px' }
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      messages: []
    };
  }

  render() {
    console.log('In render: chat.js');
    console.log(this.props.messages);
    console.log('###');
    let messages = this.props.messages;
    let Messages = null;
    if (messages) {
      Messages = messages.map(msg => {
        if (msg.from == CONSTANTS.FROM) {
          return (
            <Grid
            container 
            flex
            justify="flex-end">
              <Box
                className={this.classes.message_send}
                justifyContent="center"
                border={1}
              >
                <Typography>{msg.message}</Typography>
              </Box>
            </Grid>
          );
        } else {
          return (
            <Grid
            container 
            flex
            justify="flex-start"
            >
              <Box
              item
                className={this.classes.message_received}
                alignItems="center"
                border={1}
              >
                <Typography>{msg.message}</Typography>
              </Box>
            </Grid>
          );
        }
      });
    }

    return (
      <Grid container>
        <Box border={1} className={this.classes.chatcontainer}>
          <Grid item sm={12}>
            <Typography align="center" variant="h4">
              Chat
            </Typography>
            <hr />
          </Grid>
          <Grid item sm={12} className={this.classes.chatbox}>
            {Messages}
          </Grid>

          <Grid item className={this.classes.chatinput}>
            <Input
              placeholder="Your message"
              className={this.classes.input}
              inputProps={{
                'aria-label': 'Description'
              }}
              onChange={this.props.handleInputChange}
              value={this.props.inputText}
              
            />
            <Button
              align="center"
              className={this.classes.send_button}
              // onClick={this.props.onSubmit}
              onClick={async () => {
                await this.props.onSubmit();
                await this.props.handleInputChange({
                  target: { value: '' }
                });
                await this.props.getNewMessages();
              }}
            >
              Send
            </Button>
          </Grid>
        </Box>
      </Grid>
    );
  }
}

export default withStyles(styles)(Chat);
