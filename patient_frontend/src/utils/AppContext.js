import React from 'react';

const AppContext = React.createContext(true);

const AppProvider = AppContext.Provider;
const AppConsumer = AppContext.Consumer;

export { AppProvider, AppConsumer };
export default AppContext;
