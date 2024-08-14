import styles from './Settings.module.css';
import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import Textarea from '../../components/Form/Textarea/Textarea';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import requestWithNativeFetch from '../../utils/fetchApi';
import Loader from '../../components/Loader/Loader';

function Settings() {
  const [token, setToken, user, isLoading, setIsLoading] = useOutletContext();
  const [passwordFetch, setPasswordFetch] = useState(null);

  const [isUpdated, setIsUpdated] = useState(false);

  const handleEditPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForChangePassword = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/${user._id}/password`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        const data = {
          old_password: e.target.old_password.value,
          new_password: e.target.password.value,
          re_new_password: e.target.re_password.value,
        };
        const passwordChangeData = await requestWithNativeFetch(
          url,
          'PATCH',
          headers,
          data
        );
        setPasswordFetch(passwordChangeData);

        if (passwordChangeData.success) {
          setIsUpdated(true);
          localStorage.removeItem('token');
          setToken(null);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForChangePassword();
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.profilAvatar}>
            <h2 className={styles.cardHeading}>Edit Avatar:</h2>
          </div>
          <div className={styles.editProfile}>
            <h2 className={styles.cardHeading}>Edit your Profile:</h2>
            <form className={styles.form}>
              <Input type="text" name="first_name" labelName="First Name" />
              <Input type="text" name="last_name" labelName="Last Name" />
              <Input type="email" name="email" labelName="Email" />
              <Input type="text" name="username" labelName="Username" />
              <Textarea
                placeholder="A few words about you"
                name="about"
                isLabel="true"
              />
              <SubmitButton type="submit" name="Submit" />
            </form>
          </div>
          <div className={styles.editProfile}>
            <h2 className={styles.cardHeading}>Change password:</h2>
            <form className={styles.form} onSubmit={handleEditPassword}>
              <Input
                type="password"
                name="old_password"
                labelName="Old password"
              />
              <Input type="password" name="password" labelName="Password" />
              <Input
                type="password"
                name="re_password"
                labelName="Reenter Password"
              />
              <SubmitButton type="submit" name="Submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default Settings;
