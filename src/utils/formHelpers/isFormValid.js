const isFormValid = (formState, dispatch) => {
  dispatch({
    type: 'validate_all',
  });
  return formState.isValid;
};

export default isFormValid;