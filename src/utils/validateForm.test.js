import validateForm from './validateForm';

describe('validateForm', () => {
  const rules = {
    username: { required: true, minLength: 3 },
    password: { required: true, minLength: 6 },
    re_password: { required: true, match: 'password' },
  };

  it('should return status as valid when all fields are valid', () => {
    const state = {
      username: 'user123',
      password: 'password123',
      re_password: 'password123',
      isTouched: { username: true, password: true, re_password: true },
    };

    const result = validateForm(state, rules);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should return an error when a required field is empty', () => {
    const state = {
      username: '',
      password: 'password123',
      re_password: 'password123',
      isTouched: { username: true, password: true, re_password: true },
    };

    const result = validateForm(state, rules);

    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe('username is required');
  });

  it('should return an error if the field does not meet the minimum length', () => {
    const state = {
      username: 'us',
      password: 'password123',
      re_password: 'password123',
      isTouched: { username: true, password: true, re_password: true },
    };

    const result = validateForm(state, rules);

    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe(
      'username must be at least 3 characters long'
    );
  });

  it('should return an error if the passwords do not match', () => {
    const state = {
      username: 'user123',
      password: 'password123',
      re_password: 'wrongpassword',
      isTouched: { username: true, password: true, re_password: true },
    };

    const result = validateForm(state, rules);

    expect(result.isValid).toBe(false);
    expect(result.errors.re_password).toBe('Passwords do not match');
  });

  it('should be incorrect when fields have not been touched', () => {
    const state = {
      username: 'user123',
      password: 'password123',
      re_password: 'password123',
      isTouched: { username: false, password: false, re_password: false },
    };

    const result = validateForm(state, rules);

    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual({});
  });
});
