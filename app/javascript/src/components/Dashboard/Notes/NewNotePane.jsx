import React from "react";

import { Pane } from "neetoui";

import NewNoteForm from "./NewNoteForm";

export default function NewNotePane({ showPane, setShowPane, selectedNote }) {
  const onClose = () => setShowPane(false);
  const title = selectedNote.id ? "Update Note" : "Add Note";
  return (
    <Pane title={title} isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <NewNoteForm onClose={onClose} selectedNote={selectedNote} />
      </div>
    </Pane>
  );
}
