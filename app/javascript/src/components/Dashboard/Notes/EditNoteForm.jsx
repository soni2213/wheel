import React, { useState } from "react";

import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { Button, Select, Switch, DateInput, Toastr } from "neetoui";
import { Input, Textarea } from "neetoui/formik";

import formInitialValues from "constants/formInitialValues";
import formValidationSchemas from "constants/formValidationSchemas";
import constants from "constants/notes";
import { useNoteDispatch } from "contexts/note";

export default function EditNoteForm({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [checked, setSwitchCheckbox] = useState(false);
  const noteDispatch = useNoteDispatch();

  const handleSubmit = async values => {
    let note = {
      ...values,
      dueDate: values.dueDate
        ? dayjs(values.dueDate, "DD/MM/YYYY").format("MMM DD, YYYY")
        : "",
      createdDate: dayjs(new Date(), "DD/MM/YYYY").format("MMM DD, YYYY"),
      tags: values.tags.charAt(0).toUpperCase() + values.tags.substring(1)
    };
    try {
      setSubmitted(true);
      noteDispatch({
        type: "ADD_NOTE",
        payload: { note }
      });
      onClose();
      Toastr.success("Note added successfully");
    } catch (err) {
      logger.error(err);
    } finally {
      setSubmitted(false);
    }
  };

  const getOptions = options => {
    return options.map(opt => ({ label: opt, value: opt.toLowerCase() }));
  };

  return (
    <Formik
      initialValues={formInitialValues.newNoteform}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      onSubmit={handleSubmit}
      validationSchema={formValidationSchemas.newNoteform}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <Input label="Note Title" name="title" className="mb-6" />
          <Select
            placeholder="Select an option"
            label="Tags"
            className="mb-6"
            isDisabled={false}
            name="tags"
            onChange={tag => setFieldValue("tags", tag.value)}
            options={getOptions(constants.TAGS)}
          />
          <Textarea
            label="Note Description"
            name="description"
            rows={8}
            className="mb-6"
          />
          <Select
            placeholder="Select an option"
            label="Assigned Contact"
            className="mb-6"
            isDisabled={false}
            name="contact"
            onChange={assignee => setFieldValue("contact", assignee.value)}
            options={getOptions(constants.CONTACTS)}
          />
          <Switch
            className="mb-6"
            label="Add Due Date to Note"
            onChange={() => setSwitchCheckbox(!checked)}
            checked={checked}
          />
          {checked && (
            <DateInput
              selected={values.dueDate}
              format="DD/MM/YYYY"
              minDate={new Date()}
              value={formInitialValues.newNoteform.due_date}
              label="Due Date"
              onChange={date => setFieldValue("dueDate", date)}
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
      )}
    </Formik>
  );
}
