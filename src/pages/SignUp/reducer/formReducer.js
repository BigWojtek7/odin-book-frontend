import initialFormState from './initialFormState';

function formReducer(state, action) {
  switch (action.type) {
    case 'handle input change': {
      return {
        ...state,
        [action.field]: action.payload,
      };
    }
    case 'reset': {
      return (state = initialFormState);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default formReducer;
