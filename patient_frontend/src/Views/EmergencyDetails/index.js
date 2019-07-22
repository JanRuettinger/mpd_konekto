import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Header } from '../../Layout';
import FormPersonType from './FormPersonType';
import FormEmergencyType from './FormEmergencyType';
import Textbox from './Textbox';
import ProgressiveMobileStepper from './ProgressiveMobileStepper';
import AppContext from '../../utils/AppContext';
import Button from '../../custom_theme/components/Button';
import Container from '../../custom_theme/components/Container';
import GridContainer from '../../custom_theme/components/GridContainer';

const styles = theme => ({
  // container: {
  //   alignItems: 'center',
  //   height: '60%',
  //   border: 'black',
  //   'border-width': 'medium',
  //   'margin-top': '50px',
  //   background: 'rgba(255, 255, 255, 0.8)',
  //   'border-radius': '20px'
  // },
  // item: {
  //   width: '100%',
  //   'text-align': 'center',
  //   'border-radius': '5px',
  //   'margin-top': '5px',
  //   'justify-content': 'center'
  // },
  // container2: {
  //   border: 'black',
  //   'border-width': 'medium',
  //   'margin-top': '30px'
  // },
  // picture: { display: 'block', margin: '0 auto' },
  // box: { width: '230px' },
  // button: {
  //   width: '80%'
  // }
});

class SOS extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      componentType: 'type_of_emergency', //type_of_person //texbox

      meAffected: false,
      anotherPerson: false,
      lifeatdanger: false,
      injury: false,
      illness: false,
      poisoning: false,
      firesmoke: false,
      other: false,
      emergencyNote: '',

      activeStep: 0
    };
    this.classes = props.classes;
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleEmergencyType = this.handleEmergencyType.bind(this);
    this.handleAffectedPeople = this.handleAffectedPeople.bind(this);
    this.handleEmergencyNote = this.handleEmergencyNote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleFinished = this.handleFinished.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onCancel() {
    // window.alert('Your emergency request has been CANCELLED');
    this.props.history.push('/');
  }

  showSettings(event) {
    event.preventDefault();
  }

  handleNext(e) {
    if (this.state.componentType === 'type_of_emergency') {
      this.setState({ componentType: 'type_of_person' });
    } else if (this.state.componentType === 'type_of_person')
      this.setState({ componentType: 'textbox' });
    else if (this.state.componentType === 'textbox') {
      this.props.history.push('/loading');
      //   var audio = new Audio(soundfile);
      // setTimeout( () => audio.play(), 1000);
    }
    this.setState({ activeStep: this.state.activeStep + 1 });
  }

  handleBack(e) {
    if (this.state.componentType === 'textbox') {
      this.setState({ componentType: 'type_of_person' });
    } else if (this.state.componentType === 'type_of_person') {
      this.setState({ componentType: 'type_of_emergency' });
    } else if (this.state.componentType === 'type_of_emergency') {
      this.props.history.push('/emergency_sent');
    }
    this.setState({ activeStep: this.state.activeStep - 1 });
  }

  handleEmergencyType(new_emergency_state) {
    console.log('In handleEmergencyType');
    console.log(this.state);
    console.log(new_emergency_state);
    this.setState(new_emergency_state);
  }

  handleAffectedPeople(new_affected_people_state) {
    console.log('In handleAffectedPeople');
    console.log(new_affected_people_state);
    this.setState(new_affected_people_state);
    console.log(this.state);
  }

  async handleEmergencyNote(new_emergency_note_state) {
    console.log('In handleEmergencyNote');
    await this.setState(new_emergency_note_state);
    await this.handleFinished();
  }
  handleFinished() {
    // transmit emergency details data

    let data = '';

    if (this.state.meAffected === true) {
      data += 'Caller';
    }
    if (this.state.anotherPerson === true) {
      data += ' & another person';
    }
    this.context.setAffectedPersons(data);

    data = '';

    if (this.state.injury === true) {
      data += 'Injury ';
    }
    if (this.state.lifeatdanger === true) {
      if (data === '') {
        data += 'Life is at danger';
      } else {
        data += ', Life is at danger';
      }
    }
    if (this.state.poisoning === true) {
      if (data ==='') {
        data += 'Person might be poisoned';
      } else {
        data += ', Person might be poisoned';
      }
    }
    if (this.state.firesmoke === true) {
      if (data === '') {
        data += 'Fire is involved';
      } else {
        data += ', fire is involved';
      }
    }
    this.context.setEmergencyDetails(data);
    this.context.setEmergencyNote(this.state.emergencyNote);
    this.props.history.push('/loading');
    // var audio = new Audio(soundfile);
    // setTimeout(() => audio.play(), 500);
  }

  onSubmit(e) {
    console.log('in OnSubmit');
  }

  render() {
    let component;

    if (this.state.componentType === 'type_of_emergency') {
      component = (
        <FormEmergencyType
          handleComponentType={this.handleComponentType}
          handleEmergencyType={this.handleEmergencyType}
          emergencyTypes={this.state}
        />
      );
    } else if (this.state.componentType === 'type_of_person') {
      component = (
        <FormPersonType
          handleComponentType={this.handleComponentType}
          handleAffectedPeople={this.handleAffectedPeople}
          personTypes={this.state}
        />
      );
    } else if (this.state.componentType === 'textbox') {
      component = <Textbox handleEmergencyNote={this.handleEmergencyNote} />;
    }

    return (
      <React.Fragment>
        <Header title="Specify Emergency" BackButton="true" />
        <Container component="main" maxWidth="sm">
          <GridContainer
            container
            // className={this.classes.container}
            direction="column"
            spacing={2}
          >
            <Grid item sm={12} className={this.classes.item}>
              {component}
            </Grid>
          </GridContainer>
          <Grid
            container
            // className={this.classes.container2}
            direction="column"
            spacing={2}
          >
            <Grid item sm={12} className={this.classes.item}>
              <ProgressiveMobileStepper
                handleNext={this.handleNext}
                handleBack={this.handleBack}
                handleFinished={this.handleFinished}
                activeStep={this.state.activeStep}
              />
              <Button
                // className={this.classes.button}
                variant="text"
                color="secondary"
                size="medium"
                style={{ backgroundColor: 'grey', color: 'white' }}
                onClick={this.onCancel}
              >
                Cancel Emergency
              </Button>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
export default withRouter(withStyles(styles)(SOS));
