const contactReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_CONTACTS": {
      return {
        contacts: payload.contacts
      };
    }
    case "ADD_CONTACT": {
      return {
        contacts: [...state.contacts, payload.contact]
      };
    }
    case "DELETE_CONTACT": {
      const contacts = state.contacts.filter(
        contact => !payload.contactIds.includes(contact.id)
      );
      return { contacts };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default contactReducer;
