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

  const handleDemoLogin = async () => {
    const demoCredentials = { username: 'guest', password: 'guest' };

    await loginAction(demoCredentials);
  };

  const handleInputChange = (e) => {
    dispatch({
      type: 'input_validate',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <div className={styles.login}>
      {!token ? (
        <>
          <form className={styles.form} onSubmit={handleLogin}>
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
          <div className={styles.demoLogin}>
            <p className={styles.demoInfo}>
              Want to test the application? Use the demo account.
            </p>
            <div className={styles.demoButton}>
              <CancelButton
                type="submit"
                style={{ width: '100%' }}
                onClick={handleDemoLogin}
              >
                Demo User
              </CancelButton>
            </div>
          </div>
        </>
      ) : (
        <p>You are logged in</p>
      )}
    </div>
  );
}
export default Login;
