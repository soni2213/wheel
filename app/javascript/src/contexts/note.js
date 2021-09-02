import React from "react";

import PropTypes from "prop-types";

import noteReducer from "reducers/note";

const NoteStateContext = React.createContext();
const NoteDispatchContext = React.createContext();
const initialState = { notes: [] };

const NoteProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(noteReducer, initialState);
  return (
    <NoteStateContext.Provider value={state}>
      <NoteDispatchContext.Provider value={dispatch}>
        {children}
      </NoteDispatchContext.Provider>
    </NoteStateContext.Provider>
  );
};

const useNoteState = () => {
  const context = React.useContext(NoteStateContext);
  if (context === undefined) {
    throw new Error("useNoteState must be used within a NoteProvider");
  }
  return context;
};

const useNoteDispatch = () => {
  const context = React.useContext(NoteDispatchContext);
  if (context === undefined) {
    throw new Error("useNoteDispatch must be used within a NoteProvider");
  }
  return context;
};

const useNote = () => {
  return [useNoteState(), useNoteDispatch()];
};

NoteProvider.propTypes = {
  children: PropTypes.node
};

export { NoteProvider, useNoteState, useNoteDispatch, useNote };
