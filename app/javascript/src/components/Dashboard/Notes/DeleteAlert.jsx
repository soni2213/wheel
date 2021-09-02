import React, { useState } from "react";

import { Alert, Toastr } from "neetoui";

import { useNoteDispatch } from "contexts/note";

export default function DeleteAlert({ onClose, selectedNoteIds }) {
  const [deleting, setDeleting] = useState(false);
  const noteDispatch = useNoteDispatch();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      noteDispatch({
        type: "DELETE_NOTE",
        payload: { noteIds: selectedNoteIds }
      });
      onClose();
      Toastr.success("Note deleted successfully");
    } catch (error) {
      logger.error(error);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Alert
      isOpen
      hideConfirmation
      title="Delete Note"
      message="Are you sure you want to delete the note? All of your data will be permanently removed from our database forever.
               This action cannot be undone."
      onClose={onClose}
      submitButtonProps={{
        style: "danger",
        label: "Delete",
        loading: deleting,
        onClick: handleDelete
      }}
    />
  );
}
