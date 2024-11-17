import formReducer from './formReducer';
import validateForm from '../utils/validateForm';

vi.mock('../utils/validateForm');

describe('formReducer', () => {
  const initialState = {
    field1: '',
    field2: '',
    isTouched: { field1: false, field2: false },
  };
  const formRules = {
    /* rules definition here */
  };

  it('should handle "input_validate" action', () => {
    const action = {
      type: 'input_validate',
      field: 'field1',
      payload: 'value1',
    };
    validateForm.mockReturnValue({
      ...initialState,
      field1: 'value1',
      isTouched: { ...initialState.isTouched, field1: true },
    });

    const result = formReducer(initialState, action, formRules);

    expect(result.field1).toBe('value1');
    expect(result.isTouched.field1).toBe(true);
    expect(validateForm).toHaveBeenCalledWith(result, formRules);
  });

  it('should handle "validate_all" action', () => {
    const action = { type: 'validate_all' };
    const updatedState = {
      ...initialState,
      isTouched: { field1: true, field2: true },
    };
    validateForm.mockReturnValue(updatedState);

    const result = formReducer(initialState, action, formRules);

    expect(result.isTouched.field1).toBe(true);
    expect(result.isTouched.field2).toBe(true);
    expect(validateForm).toHaveBeenCalledWith(result, formRules);
  });

  it('should handle "reset_input_value" action', () => {
    const action = { type: 'reset_input_value', initialState };

    const result = formReducer(
      { field1: 'modified', field2: 'data' },
      action,
      formRules
    );

    expect(result).toEqual(initialState);
  });

  it('should throw error for unknown action type', () => {
    const action = { type: 'unknown_action' };

    expect(() => formReducer(initialState, action, formRules)).toThrow(
      'Unknown action: unknown_action'
    );
  });
});
