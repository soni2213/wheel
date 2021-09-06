import React, { useEffect } from "react";

import { Checkbox, Avatar, Button, Tooltip } from "neetoui";

export default function ContactTable({
  selectedContactIds,
  setSelectedContactIds,
  checkedContactIds,
  setCheckedContactIds,
  contacts = [],
  deleteAction
}) {
  useEffect(() => {
    const contactIds = contacts
      .filter(contact => contact.inBasecamp)
      .map(contact => contact.id);

    setCheckedContactIds([...checkedContactIds, ...contactIds]);
  }, []);

  const handleContactDelete = noteId => {
    setSelectedContactIds([noteId]);
    deleteAction();
  };

  const handleContactUpdate = () => {};

  const handleCheckboxAction = (contactIds, action, contact) => {
    const index = contactIds.indexOf(contact.id);

    if (index > -1) {
      action([...contactIds.slice(0, index), ...contactIds.slice(index + 1)]);
    } else {
      action([...contactIds, contact.id]);
    }
  };

  return (
    <div className="w-full p-10">
      <table className="nui-table nui-table--checkbox nui-table--hover nui-table--actions">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedContactIds.length ===
                  contacts.map(contact => contact.id).length
                }
                onClick={() => {
                  const contactIds = contacts.map(contact => contact.id);
                  if (selectedContactIds.length === contactIds.length) {
                    setSelectedContactIds([]);
                  } else {
                    setSelectedContactIds(contactIds);
                  }
                }}
              />
            </th>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Department</th>
            <th className="text-left">Contact Number</th>
            <th className="text-left">Add to Basecamp</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>
                <Checkbox
                  checked={selectedContactIds.includes(contact.id)}
                  onClick={event => {
                    event.stopPropagation();
                    handleCheckboxAction(
                      selectedContactIds,
                      setSelectedContactIds,
                      contact
                    );
                  }}
                />
              </td>
              <td className="flex items-center space-x-4">
                <Avatar
                  size={36}
                  bgClassName="bg-indigo-200"
                  contact={{ name: contact.name }}
                />
                <p>{contact.name}</p>
              </td>
              <td>{contact.email}</td>
              <td>{contact.department}</td>
              <td>{contact.mobile}</td>
              <td>
                <div className="w-24 mx-auto">
                  <Checkbox
                    name="inBasecamp"
                    checked={checkedContactIds.includes(contact.id)}
                    onChange={event => {
                      event.stopPropagation();
                      handleCheckboxAction(
                        checkedContactIds,
                        setCheckedContactIds,
                        contact
                      );
                    }}
                  />
                </div>
              </td>
              <td>
                <div className="flex space-x-4">
                  <Tooltip content="Edit" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-pencil-line"
                      onClick={() => handleContactUpdate()}
                    />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-delete-bin-line"
                      onClick={() => handleContactDelete(contact.id)}
                    />
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
