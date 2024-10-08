import Input from '../../components/Form/Input/Input';
import Button from '../../components/Form/Buttons/SubmitButton';
import styles from './SignUp.module.css';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import requestWithNativeFetch from '../../utils/fetchApi';
import Loader from '../../components/Loader/Loader';

import { useReducer } from 'react';
import formReducer from './reducer/formReducer';
import initialFormState from './reducer/initialFormState';

function SignUp() {
  const [fetchData, setFetchData] = useState(null);
  const [token, setToken, , isLoading, setIsLoading] = useOutletContext();

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

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
          first_name: formState.first_name,
          last_name: formState.last_name,
          email: formState.email,
          username: formState.username,
          password: formState.password,
          re_password: formState.re_password,
        };
        const createUserData = await requestWithNativeFetch(
          url,
          'POST',
          headers,
          data
        );
        setFetchData(createUserData);
        console.log(createUserData)

        if (createUserData.success) {
          const dataToken = createUserData.token;
          localStorage.setItem('token', dataToken);
          setToken(dataToken);
          dispatch({ type: 'reset' });
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

  const handleInputChange = (e) => {
    dispatch({
      type: 'handle input change',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  console.log(formState);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !token ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="text"
            name="first_name"
            labelName="First Name"
            inputValue={formState.first_name}
            setInputValue={(e) => handleInputChange(e)}
          />
          <Input
            type="text"
            name="last_name"
            labelName="Last Name"
            inputValue={formState.last_name}
            setInputValue={(e) => handleInputChange(e)}
          />
          <Input
            type="email"
            name="email"
            labelName="Email"
            inputValue={formState.email}
            setInputValue={(e) => handleInputChange(e)}
          />
          <Input
            type="text"
            name="username"
            labelName="Username"
            inputValue={formState.username}
            setInputValue={(e) => handleInputChange(e)}
          />
          <Input
            type="password"
            name="password"
            labelName="Password"
            inputValue={formState.password}
            setInputValue={(e) => handleInputChange(e)}
          />
          <Input
            type="password"
            name="re_password"
            labelName="Reenter Password"
            inputValue={formState.re_password}
            setInputValue={(e) => handleInputChange(e)}
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
