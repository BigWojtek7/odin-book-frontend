import styles from './Settings.module.css';
import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import Textarea from '../../components/Form/Textarea/Textarea';
import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import requestWithNativeFetch from '../../utils/fetchApi';
import Loader from '../../components/Loader/Loader';
import Icon from '@mdi/react';
import { mdiLogin } from '@mdi/js';

function Settings() {
  const [token, setToken, user, isLoading, setIsLoading] = useOutletContext();
  const [passwordFetch, setPasswordFetch] = useState(null);

  const [isUpdated, setIsUpdated] = useState(false);

  const handleEditPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForChangePassword = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
          user.user_id
        }/password`;
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
      ) : !isUpdated ? (
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
              {passwordFetch &&
                passwordFetch.msg.map((err, index) => (
                  <p key={index}>{err.msg}</p>
                ))}
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.profileEdited}>
          <p>{passwordFetch?.msg}</p>
          <Link className={styles.login} to="/login">
            <Icon path={mdiLogin} size={5} color="#84cc16"></Icon>
          </Link>
        </div>
      )}
    </>
  );
}
export default Settings;
