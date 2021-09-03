import React from "react";

import PropTypes from "prop-types";

import contactReducer from "reducers/contact";

const ContactStateContext = React.createContext();
const ContactDispatchContext = React.createContext();
const initialState = { contacts: [] };

const ContactProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(contactReducer, initialState);
  return (
    <ContactStateContext.Provider value={state}>
      <ContactDispatchContext.Provider value={dispatch}>
        {children}
      </ContactDispatchContext.Provider>
    </ContactStateContext.Provider>
  );
};

const useContactState = () => {
  const context = React.useContext(ContactStateContext);
  if (context === undefined) {
    throw new Error("useContactState must be used within a ContactProvider");
  }
  return context;
};

const useContactDispatch = () => {
  const context = React.useContext(ContactDispatchContext);
  if (context === undefined) {
    throw new Error("useContactDispatch must be used within a ContactProvider");
  }
  return context;
};

const useContact = () => {
  return [useContactState(), useContactDispatch()];
};

ContactProvider.propTypes = {
  children: PropTypes.node
};

export { ContactProvider, useContactState, useContactDispatch, useContact };
