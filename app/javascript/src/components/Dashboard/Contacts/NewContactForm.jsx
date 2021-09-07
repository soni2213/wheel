import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Button, Switch, Toastr } from "neetoui";
import { Input, Select } from "neetoui/formik";

import constants from "constants/contacts";
import formInitialValues from "constants/formInitialValues";
import formValidationSchemas from "constants/formValidationSchemas";
import { useContactDispatch } from "contexts/contact";

export default function NewContactForm({
  onClose,
  checkedContactIds,
  setCheckedContactIds,
  selectedContact
}) {
  const [submitted, setSubmitted] = useState(false);
  const [checked, setSwitchCheckbox] = useState(!!selectedContact.inBasecamp);
  const contactDispatch = useContactDispatch();

  const formatOption = value => ({ label: value, value });

  selectedContact = {
    ...selectedContact,
    department: formatOption(selectedContact.department)
  };

  const handleSubmit = async values => {
    let contact = {
      ...values,
      id: selectedContact.id
        ? selectedContact.id
        : Math.floor(Math.random() * (10 - 4)) + 4, // To generate a random number for id
      department: values.department.label
    };
    try {
      setSubmitted(true);
      const type = selectedContact.id ? "UPDATE_CONTACT" : "ADD_CONTACT",
        toastVerb = selectedContact.id ? "updated" : "added";
      contactDispatch({ type, payload: { contact } });
      if (values.inBasecamp) {
        setCheckedContactIds([...checkedContactIds, contact.id]);
      }
      Toastr.success(`Contact ${toastVerb} successfully`);
      onClose();
    } catch (err) {
      logger.error(err);
    } finally {
      setSubmitted(false);
    }
  };

  const handleSwitchAction = (state, setFieldValue) => {
    setFieldValue("inBasecamp", state);
    setSwitchCheckbox(state);
  };

  let initialValues = formInitialValues.newContactform;
  if (selectedContact.id)
    initialValues = { ...initialValues, ...selectedContact };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      onSubmit={handleSubmit}
      validationSchema={formValidationSchemas.newContactform}
    >
      {({ isSubmitting, values, setFieldValue, errors }) => (
        <Form className="space-y-6">
          <Input label="Name" name="name" />
          <Input label="Email" name="email" />
          <Input label="Contact Number" name="mobile" />
          <Select
            placeholder="Select an option"
            value={values.department}
            label="Department"
            isDisabled={false}
            name="department"
            options={constants.DEPARTMENTS}
            error={errors.department}
          />
          <div className="flex justify-between">
            <label>Add to Basecamp</label>
            <Switch
              name="inBasecamp"
              onChange={() => handleSwitchAction(!checked, setFieldValue)}
              checked={checked}
            />
          </div>
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
