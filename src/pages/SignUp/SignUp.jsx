import Input from '../../components/Form/Input/Input';
import Button from '../../components/Form/Buttons/SubmitButton';
import styles from './SignUp.module.css';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import requestWithNativeFetch from '../../utils/fetchApi';
import Loader from '../../components/Loader/Loader';

function SignUp() {
  const [fetchData, setFetchData] = useState(null);
  const [token, setToken, , isLoading, setIsLoading] = useOutletContext();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForCreateUser = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/sign-up`;
        const headers = {
          'Content-Type': 'application/json',
        };
        const data = {
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          email: e.target.email.value,
          username: e.target.username.value,
          password: e.target.password.value,
          re_password: e.target.re_password.value,
        };
        const createUserData = await requestWithNativeFetch(
          url,
          'POST',
          headers,
          data
        );
        setFetchData(createUserData);

        if (createUserData.success) {
          const dataToken = createUserData.token;
          localStorage.setItem('token', dataToken);
          setToken(dataToken);
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForCreateUser();
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !token ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input type="text" name="first_name" labelName="First Name" />
          <Input type="text" name="last_name" labelName="Last Name" />
          <Input type="email" name="email" labelName="Email" />
          <Input type="text" name="username" labelName="Username" />
          <Input type="password" name="password" labelName="Password" />
          <Input
            type="password"
            name="re_password"
            labelName="Reenter Password"
          />
          <Button type="submit" name="Sign Up" />
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
