import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import withRoot from './custom_theme/withRoot';
import { AppProvider } from './utils/AppContext';
import Dashboard from './Dashboard';
import Seed from './Seed';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setOnBoardingStatus = this.setOnBoardingStatus.bind(this);
    this.state = {
      onBoardingStatus: false,
      setOnBoardingStatus: this.setOnBoardingStatus
    };
  }
  // const onBoarding = { onBoardingDone: false };

  setOnBoardingStatus = status => {
    this.setState({ onBoardingStatus: status });
  };

  render() {
    return (
      <AppProvider value={this.state}>
        <Router>
          <Route path="/" exact component={Dashboard} />
          <Route path="/seed" exact component={Seed} />
        </Router>
      </AppProvider>
    );
  }
}

// //Managing States
// export const StateContext = createContext();
// export const StatePersonType = ({ reducer, initialState, children }) => (
//   <StateContext.Provider value={useReducer(reducer, initialState)}>
//     {children}
//   </StateContext.Provider>
// );
// export const useStateValue = () => useContext(StateContext);

export default withRoot(App);

/*To be implemented:
- add HorizontalNonLinearStepWithErrpr
- add stateManagement as follows:
--FirstUse
--Settings
--FormPersonType
--FormEmergencyType
--EmergencySent
--PeopleAffected
--AffectedState
--AffectedStateOther
--Summary
--Chat

- copy the grid layout design in the return function and remove it from components
- adjust all components
  */
