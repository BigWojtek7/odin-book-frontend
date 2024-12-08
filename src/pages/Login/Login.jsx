import Input from '../../components/Form/Input/Input';
import styles from './Login.module.css';
import {
  initialLoginFormState,
  loginFormRules,
} from '../../reducers/initialLoginFormState';
import { useReducer, useState } from 'react';
import useAuth from '../../contexts/Auth/useAuth';
import createFormReducer from '../../utils/reducerHelpers/createFormReducer.js';
import handleInputChange from '../../utils/formHelpers/handleInputChange.js';
import Button from '../../components/Form/Button/Button.jsx';
import isFormValid from '../../utils/formHelpers/isFormValid.js';

function Login() {
  const [fetchData, setFetchData] = useState(null);
  const { token, loginAction } = useAuth();

  const loginFormReducer = createFormReducer(loginFormRules);

  const [formState, dispatch] = useReducer(
    loginFormReducer,
    initialLoginFormState
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isFormValid(formState, dispatch)) {
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

  const handleChange = (e) => {
    handleInputChange(e, dispatch);
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
              onChange={handleChange}
              error={formState.errors.username}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              value={formState.password}
              onChange={handleChange}
              error={formState.errors.password}
              autocomplete="current-password"
            />
            <Button type="submit">Log In</Button>
            {fetchData && <p>{fetchData.msg}</p>}
          </form>
          <div className={styles.demoLogin}>
            <p className={styles.demoInfo}>
              Want to test the application? Use the demo account.
            </p>
            <div className={styles.demoButton}>
              <Button
                type="submit"
                style={{ width: '100%' }}
                onClick={handleDemoLogin}
              >
                Demo User
              </Button>
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
