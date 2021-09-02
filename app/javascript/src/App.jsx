import React from "react";

import { AuthProvider } from "contexts/auth";
import { NoteProvider } from "contexts/note";
import { UserProvider } from "contexts/user";

import Main from "./components/Main";

const App = props => {
  return (
    <AuthProvider>
      <UserProvider>
        <NoteProvider>
          <Main {...props} />
        </NoteProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
