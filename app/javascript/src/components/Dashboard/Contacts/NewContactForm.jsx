import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Button, Select, Switch, Toastr } from "neetoui";
import { Input } from "neetoui/formik";

import constants from "constants/contacts";
import formInitialValues from "constants/formInitialValues";
import formValidationSchemas from "constants/formValidationSchemas";
import { useContactDispatch } from "contexts/contact";

export default function NewContactForm({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [checked, setSwitchCheckbox] = useState(false);
  const contactDispatch = useContactDispatch();

  const handleSubmit = async values => {
    let contact = {
      ...values,
      id: Math.floor(Math.random() * (10 - 4)) + 4 // To generate a random number for id
    };
    try {
      setSubmitted(true);
      contactDispatch({
        type: "ADD_CONTACT",
        payload: { contact }
      });
      onClose();
      Toastr.success("Contact added successfully");
    } catch (err) {
      logger.error(err);
    } finally {
      setSubmitted(false);
    }
  };

  const transformTagOptions = options => {
    return options.map(opt => ({ label: opt, value: opt.toLowerCase() }));
  };

  const handleSwitchAction = (state, setFieldValue) => {
    setFieldValue("inBasecamp", state);
    setSwitchCheckbox(state);
  };

  return (
    <Formik
      initialValues={formInitialValues.newContactform}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      onSubmit={handleSubmit}
      validationSchema={formValidationSchemas.newContactform}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <Input label="Name" name="name" className="mb-6" />
          <Input label="Email" name="email" className="mb-6" />
          <Input label="Contact Number" name="mobile" className="mb-6" />
          <Select
            placeholder="Select an option"
            label="Department"
            className="mb-6"
            isDisabled={false}
            name="department"
            onChange={department =>
              setFieldValue("department", department.value)
            }
            options={transformTagOptions(constants.DEPARTMENTS)}
          />
          <Switch
            className="mb-6"
            label="Add to Basecamp"
            name="inBasecamp"
            onChange={() => handleSwitchAction(!checked, setFieldValue)}
            checked={checked}
          />
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
