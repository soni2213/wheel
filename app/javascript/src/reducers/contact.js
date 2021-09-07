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
    case "UPDATE_CONTACT": {
      const updatedContact = state.contacts.find(
        contact => contact.id === payload.contact.id
      );
      const index = state.contacts.indexOf(updatedContact);
      const contacts = [
        ...state.contacts.slice(0, index),
        payload.contact,
        ...state.contacts.slice(index + 1)
      ];

      return { contacts };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default contactReducer;
