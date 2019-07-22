import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../../utils/AppContext';

class Reset extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    this.context.setOnBoardingStatus(false);
    this.props.history.push('/');
  }

  render() {
    return <null />;
  }
}

// UserOnboarding.contextType = AppContext;

export default withRouter(Reset);
