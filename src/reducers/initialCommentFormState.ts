export const initialCommentFormState = {
  content: '',
  errors: { content: '' },
  isTouched: { content: false },
  isValid: false,
};

export const commentFormRules = {
  content: { required: true },
};
