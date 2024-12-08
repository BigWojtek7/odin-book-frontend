import Input from '../../components/Form/Input/Input';
import styles from './SignUp.module.css';
import { useState } from 'react';

import { useReducer } from 'react';

import useAuth from '../../contexts/Auth/useAuth';
import {
  initialSignUpFormState,
  signUpFormRules,
} from '../../reducers/initialSignUpFormState';
import handleInputChange from '../../utils/formHelpers/handleInputChange';
import Button from '../../components/Form/Button/Button';
import createFormReducer from '../../utils/reducerHelpers/createFormReducer';
import isFormValid from '../../utils/formHelpers/isFormValid';

function SignUp() {
  const [fetchData, setFetchData] = useState(null);
  const { token, signUpAction } = useAuth();

  const signUpFormReducer = createFormReducer(signUpFormRules);

  const [formState, dispatch] = useReducer(
    signUpFormReducer,
    initialSignUpFormState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid(formState, dispatch)) {
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

  const handleChange = (e) => {
    handleInputChange(e, dispatch);
  };

  return (
    <>
      {!token ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            name="first_name"
            label="First Name"
            inputValue={formState.first_name}
            onChange={handleChange}
            error={formState.errors.first_name}
          />
          <Input
            name="last_name"
            label="Last Name"
            inputValue={formState.last_name}
            onChange={handleChange}
            error={formState.errors.last_name}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            inputValue={formState.email}
            onChange={handleChange}
            error={formState.errors.email}
          />
          <Input
            name="username"
            label="Username"
            inputValue={formState.username}
            onChange={handleChange}
            error={formState.errors.username}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            inputValue={formState.password}
            onChange={handleChange}
            error={formState.errors.password}
          />
          <Input
            type="password"
            name="re_password"
            label="Reenter Password"
            inputValue={formState.re_password}
            onChange={handleChange}
            error={formState.errors.re_password}
          />
          <Button type="submit">Sign Up</Button>
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
