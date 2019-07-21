import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    textAlign: 'center',
    margin: '0 auto'
  }
});

export default function ProgressMobileStepper(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <MobileStepper
      variant="progress"
      steps={5}
      position="static"
      className={classes.root}
      activeStep={props.activeStep}
      nextButton={
        <Button
          size="small"
          onClick={props.handleNext}
          disabled={!!(props.activeStep === 5)}
        >
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button
          size="small"
          onClick={props.handleBack}
          disabled={!!(props.activeStep === 0)}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
