import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import CancelButton from '../../components/Form/Buttons/CancelButton';
import styles from './Login.module.css';
import {
  initialLoginFormState,
  loginFormRules,
} from '../../reducers/initialLoginFormState';
import { useReducer, useState } from 'react';
import useAuth from '../../contexts/Auth/useAuth';
import formReducer from '../../reducers/formReducer';

function Login() {
  const [fetchData, setFetchData] = useState(null);
  const { token, loginAction } = useAuth();

  const [formState, dispatch] = useReducer(
    (state, action) => formReducer(state, action, loginFormRules),
    initialLoginFormState
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'validate_all',
    });
    if (formState.isValid) {
      const data = {
        username: formState.username,
        password: formState.password,
      };

      const loginData = await loginAction(data);
      setFetchData(loginData);
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
        <>
          <form className={styles.form} onSubmit={handleLogin}>
            {' '}
            <Input
              name="username"
              label="Username / E-mail"
              value={formState.username}
              onChange={handleInputChange}
              error={formState.errors.username}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              value={formState.password}
              onChange={handleInputChange}
              error={formState.errors.password}
              autocomplete="current-password"
            />
            <SubmitButton type="submit">Log In</SubmitButton>
            {fetchData && <p>{fetchData.msg}</p>}
          </form>
          <form className={styles.form} onSubmit={handleLogin}>
            <input type="hidden" name="username" value="guest" />
            <input type="hidden" name="password" value="guest" />
            <CancelButton type="submit">Guest Mode</CancelButton>
          </form>
        </>
      ) : (
        <p>You are logged in</p>
      )}
    </>
  );
}
export default Login;
