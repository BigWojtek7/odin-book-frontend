import styles from './Settings.module.css';
import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import Textarea from '../../components/Form/Textarea/Textarea';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import Icon from '@mdi/react';
import { mdiLogin } from '@mdi/js';
import useAuth from '../../contexts/Auth/useAuth';
import useLoader from '../../contexts/Loader/useLoader';
import useNotification from '../../contexts/Notification/useNotification';
import useModal from '../../contexts/Modal/useModal';

function Settings() {
  const { token, user, refreshUser } = useAuth();

  const { start: loaderStart, stop: loaderStop } = useLoader();
  const { addNotification } = useNotification();
  const { openModal, closeModal } = useModal();

  const [passwordFetch, setPasswordFetch] = useState(null);
  const [profileFetch, setProfileFetch] = useState(null);
  const [aboutFetch, setAboutFetch] = useState(null);

  const [uploadAvatar, setUploadAvatar] = useState();

  const [isUpdated, setIsUpdated] = useState(false);

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState();

  const [usernameInput, setUsernameInput] = useState();

  const [emailInput, setLastEmailInput] = useState();
  const [professionInput, setProfessionInput] = useState();
  const [aboutInput, setAboutInput] = useState();

  useEffect(() => {
    const initialFirstNameValue = user?.first_name;
    setFirstNameInput(initialFirstNameValue);

    const initialLastNameValue = user?.last_name;
    setLastNameInput(initialLastNameValue);

    const initialUsernameValue = user?.username;
    setUsernameInput(initialUsernameValue);

    const initialEmailValue = user?.e_mail;
    setLastEmailInput(initialEmailValue);

    const initialProfessionValue = user?.profession;
    setProfessionInput(initialProfessionValue);

    const initialAboutValue = user?.about;
    setAboutInput(initialAboutValue);
  }, [user]);

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    try {
      loaderStart();
      const data = new FormData();
      const file = e.target.avatar.files[0];
      data.set('file', file);

      const url = `${import.meta.env.VITE_BACKEND_URL}/users/avatar`;
      const options = {
        method: 'POST',
        headers: { Authorization: token },
        body: data,
      };

      const responseData = await requestWithNativeFetch(url, options);
      setUploadAvatar(responseData);

      if (responseData.success) {
        refreshUser();
      }
    } catch (err) {
      console.log(err);
    } finally {
      loaderStop();
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      loaderStart();
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
        user.user_id
      }/profile`;
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          email: e.target.email.value,
          profession: e.target.profession.value,
          username: e.target.username.value,
        }),
      };

      const profileChangeData = await requestWithNativeFetch(url, options);
      setProfileFetch(profileChangeData);

      if (profileChangeData.success) {
        refreshUser();
      }
    } catch (err) {
      console.log(err);
    } finally {
      loaderStop();
    }
  };

  const handleEditAbout = async (e) => {
    e.preventDefault();
    try {
      loaderStart();
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
        user.user_id
      }/about`;
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ about: e.target.about.value }),
      };

      const aboutChangeData = await requestWithNativeFetch(url, options);
      setAboutFetch(aboutChangeData);

      if (aboutChangeData.success) {
        refreshUser();
      }
    } catch (err) {
      console.log(err);
    } finally {
      loaderStop();
    }
  };

  const handleEditPassword = async (e) => {
    e.preventDefault();
    try {
      loaderStart();
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
        user.user_id
      }/password`;
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          old_password: e.target.old_password.value,
          new_password: e.target.password.value,
          re_new_password: e.target.re_password.value,
        }),
      };

      const passwordChangeData = await requestWithNativeFetch(url, options);
      setPasswordFetch(passwordChangeData);

      if (passwordChangeData.success) {
        refreshUser();
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
      loaderStop();
    }
  };
  return (
    <>
      {!isUpdated ? (
        <div className={styles.settings}>
          <div className={styles.avatarSection}>
            <h2 className={styles.cardHeading}>Edit Avatar:</h2>
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatar}
                src={user?.avatar_url}
                alt="avatar"
              />
            </div>
            <form
              className={styles.form}
              onSubmit={handleAvatarUpload}
              encType="multipart/form-data"
            >
              <input type="file" className={styles.inputFile} name="avatar" />
              <SubmitButton type="submit" name="Submit" />
              {uploadAvatar && (
                <p className={styles.uploadRes}>{uploadAvatar.msg}</p>
              )}
            </form>
            <div className={styles.editAbout}>
              <h2>Edit About:</h2>
              <form className={styles.form} onSubmit={handleEditAbout}>
                <Textarea
                  placeholder="A few words about you"
                  name="about"
                  isControlled={true}
                  style={{ height: '6em', backgroundColor: 'var(--nav-bg)' }}
                  inputValue={aboutInput}
                  setInputValue={setAboutInput}
                />
                <SubmitButton type="submit" name="Submit" />
                {aboutFetch &&
                  aboutFetch.msg.map((err, index) => (
                    <p key={index}>{err.msg}</p>
                  ))}
              </form>
            </div>
          </div>
          <div className={styles.editProfile}>
            <h2 className={styles.cardHeading}>Edit your Profile:</h2>
            <form className={styles.form} onSubmit={handleEditProfile}>
              <Input
                type="text"
                name="first_name"
                labelName="First Name"
                inputValue={firstNameInput}
                setInputValue={(e) => setFirstNameInput(e.target.value)}
              />
              <Input
                type="text"
                name="last_name"
                labelName="Last Name"
                inputValue={lastNameInput}
                setInputValue={(e) => setLastNameInput(e.target.value)}
              />
              <Input
                type="email"
                name="email"
                labelName="Email"
                inputValue={emailInput}
                setInputValue={(e) => setLastEmailInput(e.target.value)}
              />
              <Input
                type="text"
                name="username"
                labelName="Username"
                inputValue={usernameInput}
                setInputValue={(e) => setUsernameInput(e.target.value)}
              />
              <Input
                type="text"
                name="profession"
                labelName="Profession"
                inputValue={professionInput}
                setInputValue={(e) => setProfessionInput(e.target.value)}
              />
              <SubmitButton type="submit" name="Submit" />
              {profileFetch &&
                profileFetch.msg.map((err, index) => (
                  <p key={index}>{err.msg}</p>
                ))}
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
          <p>{passwordFetch?.msg || profileFetch?.msg}</p>
          <Link to="/login">
            <Icon path={mdiLogin} size={5} color="var(--icon-clr"></Icon>
          </Link>
        </div>
      )}
    </>
  );
}
export default Settings;
