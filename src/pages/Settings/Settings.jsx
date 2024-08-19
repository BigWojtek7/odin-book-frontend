import styles from './Settings.module.css';
import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import Textarea from '../../components/Form/Textarea/Textarea';
import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import requestWithNativeFetch from '../../utils/fetchApi';
import Loader from '../../components/Loader/Loader';
import Icon from '@mdi/react';
import { mdiLogin } from '@mdi/js';

function Settings() {
  const [token, setToken, user, isLoading, setIsLoading, setUpdateUser] =
    useOutletContext();
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
    const initialFirstNameValue = user.first_name;
    setFirstNameInput(initialFirstNameValue);

    const initialLastNameValue = user.last_name;
    setLastNameInput(initialLastNameValue);

    const initialUsernameValue = user.username;
    setUsernameInput(initialUsernameValue);

    const initialEmailValue = user.e_mail;
    setLastEmailInput(initialEmailValue);

    const initialProfessionValue = user.profession;
    setProfessionInput(initialProfessionValue);

    const initialAboutValue = user.about;
    setAboutInput(initialAboutValue);
  }, [user]);

  const handleAvatarUpload = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForUploadAvatar = async () => {
      try {
        const data = new FormData();
        const file = e.target.avatar.files[0];
        data.set('file', file);
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/avatar`;
        const headers = {
          // 'Content-Type': 'multipart/form-data',
          Authorization: token,
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: data,
        });
        const responseData = await response.json();
        setUploadAvatar(responseData);
        console.log(responseData);
        if (responseData.success) {
          setUpdateUser(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForUploadAvatar();
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForChangeProfile = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
          user.user_id
        }/profile`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        const data = {
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          email: e.target.email.value,
          profession: e.target.profession.value,
          username: e.target.username.value,
        };
        const profileChangeData = await requestWithNativeFetch(
          url,
          'PATCH',
          headers,
          data
        );
        console.log(profileChangeData);
        setProfileFetch(profileChangeData);

        if (profileChangeData.success) {
          setUpdateUser(true);
          // setIsUpdated(true);
          // localStorage.removeItem('token');
          // setToken(null);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForChangeProfile();
  };

  const handleEditAbout = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForChangeAbout = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/${
          user.user_id
        }/about`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        const data = {
          about: e.target.about.value,
        };
        const aboutChangeData = await requestWithNativeFetch(
          url,
          'PATCH',
          headers,
          data
        );
        setAboutFetch(aboutChangeData);

        if (aboutChangeData.success) {
          setUpdateUser(true);
          // localStorage.removeItem('token');
          // setToken(null);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForChangeAbout();
  };

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
            <div className={styles.imgDiv}>
              <img
                className={styles.avatar}
                src={user.avatar_url}
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
                isControlled={true}
                inputValue={firstNameInput}
                setInputValue={setFirstNameInput}
              />
              <Input
                type="text"
                name="last_name"
                labelName="Last Name"
                isControlled={true}
                inputValue={lastNameInput}
                setInputValue={setLastNameInput}
              />
              <Input
                type="email"
                name="email"
                labelName="Email"
                isControlled={true}
                inputValue={emailInput}
                setInputValue={setLastEmailInput}
              />
              <Input
                type="text"
                name="username"
                labelName="Username"
                isControlled={true}
                inputValue={usernameInput}
                setInputValue={setUsernameInput}
              />
              <Input
                type="text"
                name="profession"
                labelName="Profession"
                isControlled={true}
                inputValue={professionInput}
                setInputValue={setProfessionInput}
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
