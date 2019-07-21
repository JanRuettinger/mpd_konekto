import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import Button from '../../custom_theme/components/Button';

import { withStyles } from '@material-ui/core/styles';
import { Header } from '../../Layout';
import MesButton from './MesButton';
import Container from '../../custom_theme/components/Container';
import AppContext from '../../utils/AppContext';
import API from '../../utils/API';
import CONSTANTS from '../../utils/Constants';
import socketIOClient from 'socket.io-client';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  root: {
    display: 'flex',
    direction: 'column',
    width: '100%',
    height: '100%'
  },
  title: {
    'text-align': 'center'
  },
  buttonsBox: {
    'margin-top': theme.spacing(0),
    'margin-bottom': theme.spacing(0),
    'margin-left': '20px',
    'margin-right': '20px',
    height: '500px'
  },
  textField: {
    'border-radius': '10px',
    background: 'white',
    'margin-top': '10px',
    'margin-bottom': '5px',
    alignContent: 'center',
    width: '100%',
    height: '100px'
  },
  messagesContainer: {
    height: '50%',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)'
  },
  textBox: {
    backgroundColor: theme.palette.primary.main,
    padding: '7px',
    borderRadius: '20px',
    borderTopRightRadius: '2px',
    margin: '10px',
    fontSize: '15px',
    color:'white'
  },

  textBoxRescue: {
    backgroundColor: '#D3D3D3	',
    padding: '7px',
    'border-radius': '20px',
    borderTopLeftRadius: '2px',
    margin: '10px',
    fontSize: '15px'
  },
  emptyContainer: {
    height: '100px',
    width: '100%'
  },
  paper: {
    position: 'relative',
    backgroundColor: '#01796F',
    //   border: "2px solid #000",
    padding: theme.spacing(2, 4, 4),
    outline: 'none',
    marginTop: '180px',
    marginLeft: '30px',
    marginRight: '30px',
    'border-radius': '20px',
    color: 'white',
  }
});

class Message extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);

    this.classes = props.classes;
    this.state = {
      id: 'false', // keeps id of which button has been pressed to send the corresponding message
      sendMessage: 'false',
      buttonPressed: 'false',
      showMessage: <div className={this.classes.emptyContainer} /> // output message state
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getMessageBox = this.getMessageBox.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    setTimeout(()=>  this.setState({ showModal: true }), 3000);
     console.log('handleopen called  ');
   }
   handleClose() {
     console.log('closing-modal');
     this.setState({ showModal: false });
   }
 




  async componentDidMount() {
    let from = 1; // hardcoded patient_id
    let to = 1000; //harcoded
    API.getChat(to, from).then(data => {
      console.log(data);
      this.setState({ messages: data });
    });

    const socket = socketIOClient(CONSTANTS.SOCKETURL);
    socket.on('emergency_status_change', data =>
     this.handleOpen());
    socket.on('message', data => this.getNewMessages());
    await this.getNewMessages();


  }

  getNewMessages() {
    console.log('In getNewMessages');
    // let to = this.state.patient_id;
    API.getChat(CONSTANTS.TO, CONSTANTS.FROM)
      .then(data => {
        console.log('Received data in getChat: ');
        console.log(data);
       setTimeout(()=> this.setState({ messages: data })  ,2000 ) ;
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChangeText(e) {
    console.log('text has changed.');
    const key = e.target.id;
    const value = e.target.value;
    let state_obj = {};
    state_obj[key] = value;
    this.setState(state_obj);
    this.setState({ sendCustomMessage: 'true' });
    console.log(this.state.text);
  }

  sendMessage(Message) {
    API.createMessage(CONSTANTS.FROM, Message, CONSTANTS.TO);
  }
  async onSubmit(id) {
    this.setState({ id: id, buttonPressed: 'true' });
    let message = '';
    let from = 1; // hardcoded patient_id
    let to = 1000; //harcoded
    // eslint-disable-next-line default-case
    switch (id) {
      case 'Custom':
        message = this.state.SMS;
        this.setState({ SMS: '' });
        break;
      case 'Arrival':
        message = 'When will you arrive?';
        break;
      case 'Food':
        message = 'Please bring food for me';
        break;
      case 'Defibrillator':
        message = 'Please bring a Defibrillator';
        break;
      case 'Medication':
        message = 'Please bring Medication for me';
        break;
      case 'Water':
        message = 'Please bring Water for me';
        break;
      case 'Helicopter':
        message = 'You need a helicopter to get to my location  ';
        break;
      case 'Rope':
        message = 'You will need rope to reach my location';
        break;
      case 'Dangerous':
        message = 'Path to my location is dangerous';
        break;
      default:
        return;
    }

    await API.createMessage(from, message, (to = 1000)).then(res => {
      console.log('Message was sucessfully transmitted');
    });
    API.getChat(to, from).then(data => {
      console.log(data);
      this.setState({ messages: data });
    });
  }

  getMessageBox() {
    let messages = this.state.messages;

    let Messages = null;
    if (messages) {
      Messages = messages.map(msg => {
        console.log(msg);

        return (
          <Grid
            key={msg._id}
            id="first message container"
            container
            display="flex"
            direction="row"
            justify={msg.to === CONSTANTS.FROM ? 'flex-start' : 'flex-end'}
            // alignItems="center"
            height="100%"
          >
            <Grid style={{ width: '70%' }} item>
              <div
                className={
                  msg.to === CONSTANTS.FROM
                    ? this.classes.textBoxRescue
                    : this.classes.textBox
                }
              >
                {msg.message}
              </div>
            </Grid>
          </Grid>
        );
      });
    }
    return Messages;
  }

  render() {
    let sendButton;

    if (this.state.sendCustomMessage === 'true') {
      sendButton = (
        <MesButton
          id="Custom"
          variant="contained"
          onClick={() => {
            this.onSubmit('Custom');
          }}
          text="Send"
        />
      );
    } else {
      switch (this.state.id) {
        case 'Bring':
          sendButton = (
            <React.Fragment>
              <MesButton
                id="Food"
                variant="contained"
                onClick={() => {
                  this.onSubmit('Food');
                }}
                text="Food"
              />
              <MesButton
                id="Defibrillator"
                variant="contained"
                onClick={() => {
                  this.onSubmit('Defibrillator');
                }}
                text="Defibrillator"
              />
              <MesButton
                id="Medication"
                variant="contained"
                onClick={() => {
                  this.onSubmit('Medication');
                }}
                text="Medication"
              />
              <MesButton
                id="Water"
                variant="contained"
                onClick={() => {
                  this.onSubmit('Water');
                }}
                text="Water"
              />{' '}
            </React.Fragment>
          );
          break;
        case 'Location':
          sendButton = (
            <React.Fragment>
              <MesButton
                id="Helicopter"
                variant="contained"
                onClick={() => {
                  this.onSubmit('Helicopter');
                }}
                text="Need a Helicopter"
              />
              <MesButton
                id="Rope"
                variant="contained"
                onClick={() => {
                  this.onSubmit('Rope');
                }}
                text="Need a Rope"
              />
              <MesButton
                id="Dangerous"
                variant="contained"
                onClick={() => {
                  this.onSubmit('Dangerous');
                }}
                text="Dangerous path conditions"
              />
            </React.Fragment>
          );

          break;

        default:
          sendButton = (
            <React.Fragment>
              <MesButton
                id="Arrival"
                variant="contained"
                onClick={() => {
                  this.onSubmit('Arrival');
                }}
                text="Ask about arrival time"
              />
              <MesButton
                id="Bring"
                variant="contained"
                onClick={() => {
                  this.onSubmit('Bring');
                }}
                text="Ask for something to bring"
              />
              <MesButton
                id="Location"
                variant="contained"
                onClick={() => {
                  this.onSubmit('Location');
                }}
                text="Inform them about the location"
              />
            </React.Fragment>
          );
          break;
      }
    }

    return (
      <React.Fragment>
        <Header title="Chat with Emergency Team" BackButton="true" />
        
        <Container>
        <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.showModal}
              onClose={this.handleClose}
              //className={this.classes.modal}
            >
              <div className={this.classes.paper}>
                <h3 align="center" id="modal-title">
                The emergency rescue team has been dispatched
                </h3>
                <h4 align="center" id="modal-subtitle" >
                  Message from rescue team:
                </h4>
                <p
                  id="simple-modal-description"
                  style={{
                    backgroundColor: 'white',
                    padding: '10px',
                    'border-radius': '10px',
                  //  boxShadow: '1px 2px 4px grey',
                    //border: '1px solid #000',
                    color: 'black'
                  }}
                >
                  Dear {this.context.fullname}, {<br />}
                  We are on our way to help you, please stay calm and do not
                  change your location.
                  {<br />}
                  Alpine Rescue
                </p>
                <Button
                  onClick={this.handleClose}
                  variant="text"
                color="secondary"
                size="medium"              
                  style={{ backgroundColor: 'grey', color: 'white',fontWeight:'normal' }}
                >
                  close
                </Button>
              </div>
            </Modal>
          <div
            id="Main messages container"
            className={this.classes.messagesContainer}
          >
            {this.getMessageBox()}
          </div>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            height="100%"
          >

            <TextField
              className={this.classes.textField}
              id="SMS"
              placeholder="Choose template message from below or type here"
              multiline
              onChange={this.onChangeText}
              inputProps={{ style: { fontSize: 17 } }} // font size of input text
              InputLabelProps={{ style: { fontSize: 17 } }} // font size of input label
              value={this.state.SMS}
            />
            {sendButton}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Message);
