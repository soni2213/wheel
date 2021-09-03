const contactReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_CONTACTS": {
      return {
        contacts: payload.contacts
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default contactReducer;
