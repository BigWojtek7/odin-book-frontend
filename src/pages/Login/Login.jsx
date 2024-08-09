import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import CancelButton from '../../components/Form/Buttons/cancelButton';
import styles from './Login.module.css';
import Loader from '../../components/Loader/Loader';

import { useState } from 'react';

import requestWithNativeFetch from '../../utils/fetchApi';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Login() {
  const [fetchData, setFetchData] = useState(null);
  const [token, setToken, , isLoading, setIsLoading] = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForLogin = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/login`;
        const headers = { 'Content-Type': 'application/json' };
        const data = {
          username: e.target.username.value,
          password: e.target.password.value,
        };
        const messagesData = await requestWithNativeFetch(
          url,
          'POST',
          headers,
          data
        );
        setFetchData(messagesData);
        setIsLoading(false);
        if (messagesData.success) {
          const dataToken = messagesData.token;
          localStorage.setItem('token', dataToken);
          setToken(dataToken);
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForLogin();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !token ? (
        <>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input type="text" name="username" labelName="Username / E-mail" />
            <Input type="password" name="password" labelName="Password" />
            <SubmitButton type="submit" name="Log In" />
            {fetchData && <p>{fetchData.msg}</p>}
          </form>
          <form className={styles.form}>
            <input type="hidden" name="guest_mode" value="true" />
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
