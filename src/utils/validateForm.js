const fieldLabels = {
  email: 'Email',
  password: 'Password',
  re_password: 'Password confirmation',
  first_name: 'First name',
  last_name: 'Last name',
  current_password: 'Current password',
  new_password: 'New password',
  confirm_password: 'Confirm password',
};

const validateForm = (state, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((field) => {
    const value = state[field];
    const rule = rules[field];
    const fieldLabel = fieldLabels[field] || field;

    if (!state.isTouched[field]) {
      isValid = false;
      return;
    }

    if (rule.required && !value) {
      errors[field] = `${fieldLabel} is required`;
      isValid = false;
      return;
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[
        field
      ] = `${fieldLabel} must be at least ${rule.minLength} characters long`;
      isValid = false;
      return;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = `${fieldLabel} is invalid`;
      isValid = false;
      return;
    }

    if (rule.match && value !== state[rule.match]) {
      errors[field] = 'Passwords do not match';
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
