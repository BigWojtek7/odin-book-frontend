export const initialSignUpFormState = {
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  password: '',
  re_password: '',
  errors: {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    re_password: '',
  },
  isTouched: {
    first_name: false,
    last_name: false,
    email: false,
    username: false,
    password: false,
    re_password: false,
  },
  isValid: false,
};

export const signUpFormRules = {
  first_name: { required: true },
  last_name: { required: true },
  email: { required: true },
  username: { required: true },
  password: { required: true },
  re_password: { required: true, match: 'password' },
};
