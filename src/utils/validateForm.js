const validateForm = (state, rules) => {
  const errors = {};
  let isValid = true;
  Object.keys(rules).forEach((field) => {
    const value = state[field];
    const rule = rules[field];

    if (rule.required && !value && state.isTouched[field]) {
      errors[field] = `${
        field === 're_password' ? 'Password confirmation' : field
      } is required`;
      isValid = false;
      return {
        ...state,
        errors,
        isValid,
      };
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[
        field
      ] = `${field} must be at least ${rule.minLength} characters long`;
      isValid = false;
    }
    if (rule.match && state[field] !== state[rule.match]) {
      errors[field] = 'Passwords do not match';
      isValid = false;
    }
    if (!state.isTouched[field]) {
      isValid = false;
    }
  });
  return {
    ...state,
    errors,
    isValid,
  };
};

export default validateForm;
