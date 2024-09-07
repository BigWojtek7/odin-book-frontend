function formReducer(state, action) {
  switch (action.type) {
    case 'handle input text': {
      return {
        ...state,
        [action.field]: action.payload,
      };
    }
  }
}

export default formReducer;
