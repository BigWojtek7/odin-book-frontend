const handleInputChange = (e, dispatch) => {
  const name = e.target.name;
  const value = e.target.value;

  dispatch({
    type: 'input_validate',
    field: name,
    payload: value,
  });
};

export default handleInputChange;
