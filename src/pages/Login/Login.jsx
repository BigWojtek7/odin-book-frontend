import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import CancelButton from '../../components/Form/Buttons/CancelButton';
import styles from './Login.module.css';
import { useState } from 'react';
import useAuth from '../../contexts/Auth/useAuth';

function Login() {
  const [fetchData, setFetchData] = useState(null);
  const { token, loginAction } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const loginData = await loginAction(data);
    setFetchData(loginData);
  };

  return (
    <>
      {!token ? (
        <>
          <form className={styles.form} onSubmit={handleLogin}>
            <Input type="text" name="username" labelName="Username / E-mail" />
            <Input type="password" name="password" labelName="Password" />
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
