import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default {
  loginForm: Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required")
  }),
  resetPasswordForm: Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required")
  }),
  signupForm: Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required")
  }),
  profileForm: Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    password: Yup.string().required("Required")
  }),
  newNoteform: Yup.object().shape({
    contact: Yup.string().required("Assignee is required"),
    description: Yup.string().required("Description is required"),
    tags: Yup.string().required("Tag is required"),
    title: Yup.string().required("Title is required")
  }),
  newContactform: Yup.object().shape({
    department: Yup.string().required("Department is required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "Contact number is not valid")
      .required("Required"),
    name: Yup.string().required("Name is required")
  })
};
