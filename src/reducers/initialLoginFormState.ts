export const initialLoginFormState = {
  username: '',
  password: '',
  errors: {
    username: '',
    password: '',
  },
  isTouched: {
    username: false,
    password: false,
  },
  isValid: false,
};

export const loginFormRules = {
  username: { required: true },
  password: { required: true },
};
