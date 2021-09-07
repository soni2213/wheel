import React from "react";

import { Pane } from "neetoui";

import NewContactForm from "./NewContactForm";

export default function NewContactPane({
  showPane,
  setShowPane,
  checkedContactIds,
  setCheckedContactIds,
  selectedContact
}) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Add Contact" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <NewContactForm
          onClose={onClose}
          checkedContactIds={checkedContactIds}
          setCheckedContactIds={setCheckedContactIds}
          selectedContact={selectedContact}
        />
      </div>
    </Pane>
  );
}
