import React, { useState } from "react";

import { Alert, Toastr } from "neetoui";

import { useContactDispatch } from "contexts/contact";

export default function DeleteAlert({ onClose, selectedContactIds }) {
  const [deleting, setDeleting] = useState(false);
  const contactDispatch = useContactDispatch();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      contactDispatch({
        type: "DELETE_CONTACT",
        payload: { contactIds: selectedContactIds }
      });
      onClose();
      Toastr.success("Contact deleted successfully");
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
      title="Delete Contact"
      message="Are you sure you want to delete the contact? All of your data will be permanently removed from our database forever.
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
