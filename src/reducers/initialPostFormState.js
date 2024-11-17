export const initialPostFormState = {
  title: '',
  content: '',
  errors: {
    title: '',
    content: '',
  },
  isTouched: {
    title: false,
    content: false,
  },
  isValid: false,
};

export const postFormRules = {
  title: { required: true },
  content: { required: true },
};
