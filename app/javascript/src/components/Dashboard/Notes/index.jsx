import React, { useState, useEffect } from "react";

import EmptyNotesListImage from "images/EmptyNotesList";
import { Button, PageLoader } from "neetoui";
import { Header, SubHeader } from "neetoui/layouts";

import EmptyState from "components/Common/EmptyState";
import constants from "constants/notes";
import { useNoteState, useNoteDispatch } from "contexts/note";

import DeleteAlert from "./DeleteAlert";
import NewNotePane from "./NewNotePane";
import NoteTable from "./NoteTable";

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const [showNewNotePane, setShowNewNotePane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});
  const { notes } = useNoteState();
  const noteDispatch = useNoteDispatch();

  useEffect(() => {
    fetchNotes();
  }, []);

  const getNotes = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { notes: constants.NOTES } });
      }, 1000);
    });
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getNotes();
      noteDispatch({
        type: "SET_NOTES",
        payload: { notes: response.data.notes }
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNoteUpdate = note => {
    setSelectedNote(note);
    setShowNewNotePane(true);
  };

  const handleClose = () => {
    setSelectedNoteIds([]);
    setSelectedNote({});
    setShowDeleteAlert(false);
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Notes"
        actionBlock={
          <Button
            onClick={() => {
              setSelectedNote({});
              setShowNewNotePane(true);
            }}
            label="New Note"
            icon="ri-add-line"
          />
        }
      />
      {notes.length ? (
        <>
          <SubHeader
            toggleFilter={() => {}}
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm("")
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedNoteIds.length
            }}
            sortProps={{
              options: constants.SORT_BY_OPTIONS,
              onClick: () => {},
              sortBy: {
                column: constants.SORT_BY_OPTIONS[0].value,
                direction: "desc"
              }
            }}
            paginationProps={{
              count: notes.length,
              pageNo: 1,
              pageSize: 10
            }}
          />
          <NoteTable
            selectedNoteIds={selectedNoteIds}
            setSelectedNoteIds={setSelectedNoteIds}
            notes={notes}
            deleteAction={() => setShowDeleteAlert(true)}
            handleNoteUpdate={handleNoteUpdate}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any notes!"
          subtitle="Add your notes to send customized emails to them."
          primaryAction={() => setShowNewNotePane(true)}
          primaryActionLabel="Add Note"
        />
      )}
      <NewNotePane
        showPane={showNewNotePane}
        setShowPane={setShowNewNotePane}
        selectedNote={selectedNote}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedNoteIds={selectedNoteIds}
          onClose={() => handleClose()}
        />
      )}
    </>
  );
};

export default Notes;
