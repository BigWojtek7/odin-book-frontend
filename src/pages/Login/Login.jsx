import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import CancelButton from '../../components/Form/Buttons/cancelButton';
import styles from './Login.module.css';
import Loader from '../../components/Loader/Loader';

import { useState } from 'react';

import requestWithNativeFetch from '../../utils/fetchApi';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useAuth from '../../contexts/Auth/useAuth';

function Login() {
  const [fetchData, setFetchData] = useState(null);
  const { token, loginAction } = useAuth();
  // const [token, setToken, , isLoading, setIsLoading] = useOutletContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const loginData = await loginAction(data);
    setFetchData(loginData);

    //     if (messagesData.success) {
    //       const dataToken = messagesData.token;
    //       localStorage.setItem('token', dataToken);
    //       setToken(dataToken);
    //       navigate('/');
    //     }

    // fetchDataForLogin();
  };

  return (
    <>
      {!token ? (
        <>
          <form className={styles.form} onSubmit={handleLogin}>
            <Input type="text" name="username" labelName="Username / E-mail" />
            <Input type="password" name="password" labelName="Password" />
            <SubmitButton type="submit" name="Log In" />
            {fetchData && <p>{fetchData.msg}</p>}
          </form>
          <form className={styles.form} onSubmit={handleLogin}>
            <input type="hidden" name="username" value="guest" />
            <input type="hidden" name="password" value="guest" />
            <CancelButton type="submit" name="Guest Mode" />
          </form>
        </>
      ) : (
        <p>You are logged in</p>
      )}
    </>
  );
}
export default Login;
