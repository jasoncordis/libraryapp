const validateName = (value, field) => {
  if (!value) {
    return "Required";
  }
};
const validatePassword = (value, field, passwordValue) => {
  if (!value) {
    return "Required";
  } else if (field === "cpassword" && value !== passwordValue) {
    return "Passwords do not match.";
  }
};

export default validateName;

export { validateName, validatePassword };
