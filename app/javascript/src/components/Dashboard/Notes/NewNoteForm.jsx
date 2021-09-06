import React, { useState } from "react";

import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { Button, DateInput, Toastr, Switch } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import formInitialValues from "constants/formInitialValues";
import formValidationSchemas from "constants/formValidationSchemas";
import constants from "constants/notes";
import { useNoteDispatch } from "contexts/note";

export default function NewNoteForm({ onClose, selectedNote }) {
  const [submitted, setSubmitted] = useState(false);
  const [checked, setSwitchCheckbox] = useState(!!selectedNote.dueDate);
  const noteDispatch = useNoteDispatch();

  const formatOption = value => ({ label: value, value });

  selectedNote = {
    ...selectedNote,
    tags: formatOption(selectedNote.tags),
    contact: formatOption(selectedNote.contact),
    dueDate: selectedNote.dueDate ? new Date(selectedNote.dueDate) : ""
  };

  const handleSubmit = async values => {
    let note = {
      ...values,
      id: selectedNote.id
        ? selectedNote.id
        : Math.floor(Math.random() * (10 - 4)) + 4, // To generate a random number for id
      dueDate: values.dueDate
        ? dayjs(values.dueDate, "DD/MM/YYYY").format("MMM DD, YYYY")
        : "",
      createdDate: dayjs(new Date(), "DD/MM/YYYY").format("MMM DD, YYYY"),
      tags: values.tags.label,
      contact: values.contact.label
    };
    try {
      setSubmitted(true);
      const type = selectedNote.id ? "UPDATE_NOTE" : "ADD_NOTE",
        toastVerb = selectedNote.id ? "updated" : "added";

      noteDispatch({ type, payload: { note } });
      Toastr.success(`Note ${toastVerb} successfully`);
      onClose();
    } catch (err) {
      logger.error(err);
    } finally {
      setSubmitted(false);
    }
  };

  let initialValues = formInitialValues.newNoteform;
  if (selectedNote.id) initialValues = { ...initialValues, ...selectedNote };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      onSubmit={handleSubmit}
      validationSchema={formValidationSchemas.newNoteform}
    >
      {({ isSubmitting, values, setFieldValue, errors }) => {
        return (
          <Form className="space-y-6">
            <Input label="Note Title" name="title" />
            <Select
              placeholder="Select an option"
              value={values.tags}
              label="Tags"
              isDisabled={false}
              name="tags"
              options={constants.TAGS}
              error={errors.tags}
            />
            <Textarea label="Note Description" name="description" rows={8} />
            <Select
              placeholder="Select an option"
              value={values.contact}
              label="Assigned Contact"
              isDisabled={false}
              name="contact"
              options={constants.CONTACTS}
              error={errors.contact}
            />
            <div className="flex justify-between">
              <label className="text-gray-900">Add Due Date to Note</label>
              <Switch
                onChange={() => setSwitchCheckbox(!checked)}
                checked={checked}
              />
            </div>
            {checked && (
              <DateInput
                value={values.dueDate || undefined}
                format="DD/MM/YYYY"
                name="dueDate"
                label="Due Date"
                onChange={date => {
                  setFieldValue("dueDate", date);
                }}
              />
            )}
            <div className="nui-pane__footer nui-pane__footer--absolute">
              <Button
                onClick={onClose}
                label="Cancel"
                size="large"
                style="secondary"
              />
              <Button
                type="submit"
                label="Save changes"
                size="large"
                style="primary"
                className="ml-2"
                disabled={isSubmitting}
                loading={isSubmitting}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
