export const initialProfileFormState = {
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  profession: '',
  errors: {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    profession: '',
  },
  isTouched: {
    first_name: false,
    last_name: false,
    email: false,
    username: false,
    profession: false,
  },
  isValid: false,
};

export const profileFormRules = {
  first_name: { required: true },
  last_name: { required: true },
  email: { required: true }, //pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  username: { required: true },
  profession: { required: false },
};

export const initialAboutFormState = {
  about: '',
  errors: {
    about: '',
  },
  isTouched: {
    about: false,
  },
  isValid: false,
};

export const aboutFormRules = {
  about: { required: true },
};

export const initialPasswordFormState = {
  current_password: '',
  new_password: '',
  confirm_password: '',
  errors: {
    current_password: '',
    new_password: '',
    confirm_password: '',
  },
  isTouched: {
    current_password: false,
    new_password: false,
    confirm_password: false,
  },
  isValid: false,
};

export const passwordFormRules = {
  current_password: { required: true },
  new_password: { required: true },
  confirm_password: { required: true, match: 'new_password' },
};
