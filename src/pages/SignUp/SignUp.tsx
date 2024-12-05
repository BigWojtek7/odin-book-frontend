import Input from '../../components/Form/Input/Input';
import styles from './SignUp.module.css';
import { useState } from 'react';

import { useReducer } from 'react';

import useAuth from '../../contexts/Auth/useAuth';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import formReducer from '../../reducers/formReducer';
import {
  initialSignUpFormState,
  signUpFormRules,
} from '../../reducers/initialSignUpFormState';

function SignUp() {
  const [fetchData, setFetchData] = useState(null);
  const { token, signUpAction } = useAuth();

  const [formState, dispatch] = useReducer(
    (state, action) => formReducer(state, action, signUpFormRules),
    initialSignUpFormState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'validate_all' });

    if (formState.isValid) {
      const data = {
        first_name: formState.first_name,
        last_name: formState.last_name,
        email: formState.email,
        username: formState.username,
        password: formState.password,
        re_password: formState.re_password,
      };

      const signUpData = await signUpAction(data);
      setFetchData(signUpData);
    }
  };

  const handleInputChange = (e) => {
    dispatch({
      type: 'input_validate',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <>
      {!token ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            name="first_name"
            label="First Name"
            inputValue={formState.first_name}
            onChange={handleInputChange}
            error={formState.errors.first_name}
          />
          <Input
            name="last_name"
            label="Last Name"
            inputValue={formState.last_name}
            onChange={handleInputChange}
            error={formState.errors.last_name}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            inputValue={formState.email}
            onChange={handleInputChange}
            error={formState.errors.email}
          />
          <Input
            name="username"
            label="Username"
            inputValue={formState.username}
            onChange={handleInputChange}
            error={formState.errors.username}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            inputValue={formState.password}
            onChange={handleInputChange}
            error={formState.errors.password}
          />
          <Input
            type="password"
            name="re_password"
            label="Reenter Password"
            inputValue={formState.re_password}
            onChange={handleInputChange}
            error={formState.errors.re_password}
          />
          <SubmitButton type="submit">Sign Up</SubmitButton>
          {!fetchData?.success &&
            fetchData?.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
        </form>
      ) : (
        <p>You are logged in</p>
      )}
    </>
  );
}
export default SignUp;
