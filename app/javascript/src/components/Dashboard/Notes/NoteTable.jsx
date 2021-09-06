import React from "react";

import { Checkbox, Badge, Avatar, Button, Tooltip } from "neetoui";

const renderTagColor = tag => {
  switch (tag) {
    case "Internal":
      return "blue";
    case "Agile Workflow":
      return "green";
    case "Bug":
      return "red";
    default:
      return "gray";
  }
};

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
  deleteAction,
  handleNoteUpdate
}) {
  const handleNoteDelete = noteId => {
    setSelectedNoteIds([noteId]);
    deleteAction();
  };

  return (
    <div className="w-full p-10">
      <table className="nui-table nui-table--checkbox nui-table--hover nui-table--actions">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedNoteIds.length === notes.map(note => note.id).length
                }
                onChange={() => {
                  const noteIds = notes.map(note => note.id);
                  if (selectedNoteIds.length === noteIds.length) {
                    setSelectedNoteIds([]);
                  } else {
                    setSelectedNoteIds(noteIds);
                  }
                }}
              />
            </th>
            <th className="text-left">Title</th>
            <th className="text-left">Description</th>
            <th className="text-left">Tags</th>
            <th className="text-left">Created Date</th>
            <th className="text-left">Due Date</th>
            <th className="text-left">Contact</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note.id}>
              <td>
                <Checkbox
                  checked={selectedNoteIds.includes(note.id)}
                  onChange={event => {
                    event.stopPropagation();
                    const index = selectedNoteIds.indexOf(note.id);

                    if (index > -1) {
                      setSelectedNoteIds([
                        ...selectedNoteIds.slice(0, index),
                        ...selectedNoteIds.slice(index + 1)
                      ]);
                    } else {
                      setSelectedNoteIds([...selectedNoteIds, note.id]);
                    }
                  }}
                />
              </td>
              <td>
                <Button
                  label={note.title}
                  style="link"
                  onClick={() => handleNoteUpdate(note)}
                ></Button>
              </td>
              <td className="truncate max-w-0">{note.description}</td>
              <td>
                <Badge color={renderTagColor(note.tags)}>{note.tags}</Badge>
              </td>
              <td>{note.createdDate}</td>
              <td>{note.dueDate || "--"}</td>
              <td>
                <Avatar
                  size={36}
                  bgClassName="bg-indigo-200"
                  contact={{ name: note.contact }}
                />
              </td>
              <td>
                <div className="flex">
                  <Tooltip className="px-4" content="Edit" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-pencil-line"
                      onClick={() => handleNoteUpdate(note)}
                    />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-delete-bin-line"
                      onClick={() => handleNoteDelete(note.id)}
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
