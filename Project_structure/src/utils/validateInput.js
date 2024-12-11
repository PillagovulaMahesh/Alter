// src/utils/validateInput.js

// Validate email format using a simple regex
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Validate if text input is not empty
const validateRequiredText = (text) => {
  return text && text.trim().length > 0;
};

// Validate if a password is strong (min 6 characters)
const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Combine validations into a single function (you can add more validations as needed)
const validateInput = (type, value) => {
  switch (type) {
    case 'email':
      return validateEmail(value);
    case 'text':
      return validateRequiredText(value);
    case 'password':
      return validatePassword(value);
    default:
      return false;
  }
};

export default validateInput;
