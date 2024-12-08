import formReducer from '../../reducers/formReducer';

const createFormReducer = (formRules) => {
  return (state, action) => formReducer(state, action, formRules);
};

export default createFormReducer;
