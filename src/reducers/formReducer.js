import validateForm from '../utils/validateForm';

function formReducer(state, action, formRules) {
  switch (action.type) {
    case 'input_validate': {
      const updatedState = {
        ...state,
        [action.field]: action.payload,
        isTouched: { ...state.isTouched, [action.field]: true },
      };
      return validateForm(updatedState, formRules);
    }
    case 'validate_all': {
      const updatedState = {
        ...state,
        isTouched: Object.keys(state.isTouched).reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {}),
      };
      return validateForm(updatedState, formRules);
    }

    case 'reset_input_value': {
      return action.initialState;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default formReducer;
