import React, { useState, useEffect } from "react";

import EmptyContactsListImage from "images/EmptyNotesList";
import { Button, PageLoader } from "neetoui";
import { Header, SubHeader } from "neetoui/layouts";

import EmptyState from "components/Common/EmptyState";
import constants from "constants/contacts";
import { useContactState, useContactDispatch } from "contexts/contact";

import ContactTable from "./ContactTable";
import DeleteAlert from "./DeleteAlert";
import NewContactPane from "./NewContactPane";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [showNewContactPane, setShowNewContactPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [checkedContactIds, setCheckedContactIds] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const { contacts } = useContactState();
  const contactDispatch = useContactDispatch();

  useEffect(() => {
    fetchContacts();
  }, []);

  const getContactsAsync = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { contacts: constants.CONTACTS } });
      }, 1000);
    });
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await getContactsAsync();
      contactDispatch({
        type: "SET_CONTACTS",
        payload: { contacts: response.data.contacts }
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactUpdate = contact => {
    setSelectedContact(contact);
    setShowNewContactPane(true);
  };

  const handleClose = () => {
    setSelectedContactIds([]);
    setSelectedContact({});
    setShowDeleteAlert(false);
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Contacts"
        actionBlock={
          <Button
            onClick={() => {
              setSelectedContact({});
              setShowNewContactPane(true);
            }}
            label="New Contact"
            icon="ri-add-line"
          />
        }
      />
      {contacts.length ? (
        <>
          <SubHeader
            toggleFilter={() => {}}
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm("")
            }}
            deleteButtonProps={{
              onClick: () => {},
              disabled: !selectedContactIds.length
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
              count: contacts.length,
              pageNo: 1,
              pageSize: 10
            }}
          />
          <ContactTable
            selectedContactIds={selectedContactIds}
            setSelectedContactIds={setSelectedContactIds}
            checkedContactIds={checkedContactIds}
            setCheckedContactIds={setCheckedContactIds}
            contacts={contacts}
            deleteAction={() => setShowDeleteAlert(true)}
            handleContactUpdate={handleContactUpdate}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyContactsListImage}
          title="Looks like you don't have any contacts!"
          subtitle="Add your contacts to send customized emails to them."
          primaryAction={() => setShowNewContactPane(true)}
          primaryActionLabel="Add Contact"
        />
      )}
      <NewContactPane
        showPane={showNewContactPane}
        setShowPane={setShowNewContactPane}
        checkedContactIds={checkedContactIds}
        setCheckedContactIds={setCheckedContactIds}
        selectedContact={selectedContact}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedContactIds={selectedContactIds}
          onClose={() => handleClose()}
        />
      )}
    </>
  );
};

export default Contacts;
