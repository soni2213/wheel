import React, { useState } from "react";

import { Checkbox, Avatar, Button, Tooltip } from "neetoui";

export default function ContactTable({
  selectedContactIds,
  setSelectedContactIds,
  contacts = [],
  deleteAction
}) {
  const [checkedContactIds, setCheckedContactIds] = useState([]);
  const performDelete = contactId => {
    setSelectedContactIds([contactId]);
    deleteAction();
  };

  const performEdit = () => {};

  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox">
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
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr
              key={contact.id}
              className={"cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedContactIds.includes(contact.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedContactIds.indexOf(contact.id);

                    if (index > -1) {
                      setSelectedContactIds([
                        ...selectedContactIds.slice(0, index),
                        ...selectedContactIds.slice(index + 1)
                      ]);
                    } else {
                      setSelectedContactIds([
                        ...selectedContactIds,
                        contact.id
                      ]);
                    }
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
                <Checkbox
                  name="inBaseCamp"
                  checked={checkedContactIds.includes(contact.id)}
                  onChange={event => {
                    event.stopPropagation();
                    const index = checkedContactIds.indexOf(contact.id);

                    if (index > -1) {
                      setCheckedContactIds([
                        ...checkedContactIds.slice(0, index),
                        ...checkedContactIds.slice(index + 1)
                      ]);
                    } else {
                      setCheckedContactIds([...checkedContactIds, contact.id]);
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex">
                  <Tooltip className="px-4" content="Edit" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-pencil-line"
                      onClick={() => performEdit()}
                    />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-delete-bin-line"
                      onClick={() => performDelete(contact.id)}
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
