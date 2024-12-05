export const initialPostFormState = {
  content: '',
  errors: {
    content: '',
  },
  isTouched: {
    content: false,
  },
  isValid: false,
};

export const postFormRules = {
  content: { required: true, minLength: 15 },
};
