import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Button, Select, Switch } from "neetoui";
import { Input, Textarea } from "neetoui/formik";

import notesApi from "apis/notes";
import formInitialValues from "constants/formInitialValues";
import formValidationSchemas from "constants/formValidationSchemas";
import constants from "constants/notes";

export default function NewNoteForm({ onClose, refetch }) {
  const [submitted, setSubmitted] = useState(false);
  const [checked, setSwitchCheckbox] = useState(false);

  const handleSubmit = async values => {
    try {
      setSubmitted(true);
      await notesApi.create(values);
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <Formik
      initialValues={formInitialValues.newNoteform}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      onSubmit={handleSubmit}
      validationSchema={formValidationSchemas.newNoteform}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input label="Note Title" name="title" className="mb-6" />
          <Select
            label="Tags"
            className="mb-6"
            defaultValue={constants.TAGS[0]}
            placeholder="Select an Option"
            isDisabled={false}
            isClearable={true}
            isSearchable={true}
            name="tags"
            options={constants.TAGS}
          />
          <Textarea
            label="Note Description"
            name="description"
            rows={8}
            className="mb-6"
          />
          <Select
            label="Assigned Contact"
            className="mb-6"
            defaultValue={constants.CONTACTS[0]}
            placeholder="Select an Option"
            isDisabled={false}
            isClearable={true}
            isSearchable={true}
            name="assignee"
            options={constants.CONTACTS}
          />
          <div className="p-4">
            <Switch
              label="Add Due Date to Note"
              onChange={() => setSwitchCheckbox(!checked)}
              checked={checked}
            />
          </div>
          {checked && (
            <Input label="Due Date" name="due_date" className="mb-6" />
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
              label="Submit"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
