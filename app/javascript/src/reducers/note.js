const noteReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_NOTES": {
      return {
        notes: payload.notes
      };
    }
    case "ADD_NOTE": {
      return {
        notes: [...state.notes, payload.note]
      };
    }
    case "DELETE_NOTE": {
      const notes = state.notes.filter(
        note => !payload.noteIds.includes(note.id)
      );
      return { notes };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default noteReducer;
