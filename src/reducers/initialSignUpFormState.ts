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
  first_name: { required: true, minLength: 3 },
  last_name: { required: true, minLength: 3 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  username: { required: true, minLength: 3 },
  password: { required: true,  minLength: 3 },
  re_password: { required: true, match: 'password' },
};
