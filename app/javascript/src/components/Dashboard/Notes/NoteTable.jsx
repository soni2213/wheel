import React from "react";

import { Checkbox, Badge, Avatar, Button, Tooltip } from "neetoui";

const getTagColor = tag => {
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
  deleteAction
}) {
  const performDelete = noteId => {
    setSelectedNoteIds([noteId]);
    deleteAction();
  };

  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedNoteIds.length === notes.map(note => note.id).length
                }
                onClick={() => {
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
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr
              key={note.id}
              className={"cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedNoteIds.includes(note.id)}
                  onClick={event => {
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
                <div className="flex flex-row items-center justify-start text-gray-900">
                  {note.title}
                </div>
              </td>
              <td>{note.description}</td>
              <td>
                {note.tags.map((tag, index) => (
                  <Badge color={getTagColor(tag)} key={index}>
                    {tag}
                  </Badge>
                ))}
              </td>
              <td>{note.created_at}</td>
              <td>{note.due_date || "--"}</td>
              <td>
                <Avatar size={36} contact={{ name: note.assignee_name }} />
              </td>
              <td>
                <Tooltip content="Edit" position="bottom">
                  <Button style="icon" icon="ri-pencil-line" />
                </Tooltip>
              </td>
              <td>
                <Tooltip content="Delete" position="bottom">
                  <Button
                    style="icon"
                    icon="ri-delete-bin-line"
                    onClick={() => performDelete(note.id)}
                  />
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
