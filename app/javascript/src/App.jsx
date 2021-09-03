import React from "react";

import { AuthProvider } from "contexts/auth";
import { ContactProvider } from "contexts/contact";
import { NoteProvider } from "contexts/note";
import { UserProvider } from "contexts/user";

import Main from "./components/Main";

const App = props => {
  return (
    <AuthProvider>
      <UserProvider>
        <NoteProvider>
          <ContactProvider>
            <Main {...props} />
          </ContactProvider>
        </NoteProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
