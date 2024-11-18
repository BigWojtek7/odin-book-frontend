import styles from './Settings.module.css';
import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import Textarea from '../../components/Form/Textarea/Textarea';
import { useEffect, useReducer, useState } from 'react';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import useAuth from '../../contexts/Auth/useAuth';
import useLoader from '../../contexts/Loader/useLoader';
import useNotification from '../../contexts/Notification/useNotification';
import useModal from '../../contexts/Modal/useModal';
import formReducer from '../../reducers/formReducer';
import {
  initialProfileFormState,
  profileFormRules,
  initialAboutFormState,
  aboutFormRules,
  initialPasswordFormState,
  passwordFormRules,
} from '../../reducers/initialSettingsFormState';

function Settings() {
  const { token, user, refreshUser } = useAuth();

  const { start: loaderStart, stop: loaderStop } = useLoader();
  const { addNotification } = useNotification();
  const { openModal, closeModal } = useModal();

  const [passwordFetch, setPasswordFetch] = useState(null);
  const [profileFetch, setProfileFetch] = useState(null);
  const [aboutFetch, setAboutFetch] = useState(null);

  const [uploadAvatar, setUploadAvatar] = useState();

  const [profileState, dispatchProfile] = useReducer(
    (state, action) => formReducer(state, action, profileFormRules),
    initialProfileFormState
  );

  const [aboutState, dispatchAbout] = useReducer(
    (state, action) => formReducer(state, action, aboutFormRules),
    initialAboutFormState
  );

  const [passwordState, dispatchPassword] = useReducer(
    (state, action) => formReducer(state, action, passwordFormRules),
    initialPasswordFormState
  );

  useEffect(() => {
    if (user) {
      dispatchProfile({
        type: 'initialize',
        payload: {
          first_name: user?.first_name,
          last_name: user?.last_name,
          username: user?.username,
          email: user?.e_mail,
          profession: user?.profession,
        },
      });
      dispatchProfile({
        type: 'validate_all',
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      dispatchAbout({
        type: 'initialize',
        payload: {
          about: user?.about,
        },
      });
      dispatchAbout({
        type: 'validate_all',
      });
    }
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
      dispatchProfile({
        type: 'validate_all',
      });
      console.log(profileState.isValid);
      if (profileState.isValid) {
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
            first_name: profileState.first_name,
            last_name: profileState.last_name,
            email: profileState.email,
            profession: profileState.profession,
            username: profileState.username,
          }),
        };

        const profileChangeData = await requestWithNativeFetch(url, options);
        setProfileFetch(profileChangeData);

        if (profileChangeData.success) {
          refreshUser();
          addNotification('You profile has been updated', 'success');
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      loaderStop();
    }
  };

  const handleEditAbout = async (e) => {
    e.preventDefault();
    dispatchAbout({
      type: 'validate_all',
    });

    if (aboutState.isValid) {
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
          body: JSON.stringify({ about: aboutState.about }),
        };

        const aboutChangeData = await requestWithNativeFetch(url, options);
        setAboutFetch(aboutChangeData);

        if (aboutChangeData.success) {
          refreshUser();
          addNotification('Your about section has been updated', 'success');
        }
      } catch (err) {
        console.log(err);
      } finally {
        loaderStop();
      }
    }
  };

  const handleEditPassword = (e) => {
    e.preventDefault();
    openModal('Do you really want to change password', async () => {
      dispatchPassword({
        type: 'validate_all',
      });
      if (aboutState.isValid) {
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
              current_password: passwordState.current_password,
              new_password: passwordState.new_password,
              confirm_password: passwordState.confirm_password,
            }),
          };

          const passwordChangeData = await requestWithNativeFetch(url, options);
          setPasswordFetch(passwordChangeData);

          if (passwordChangeData.success) {
            addNotification('Your password has been updated', 'success');
          }
        } catch (err) {
          console.log(err);
        } finally {
          loaderStop();
          closeModal();
        }
      }
    });
  };

  const handleProfileInput = (e) => {
    dispatchProfile({
      type: 'input_validate',
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const handleAboutInput = (e) => {
    dispatchAbout({
      type: 'input_validate',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handlePasswordInput = (e) => {
    dispatchPassword({
      type: 'input_validate',
      field: e.target.name,
      payload: e.target.value,
    });
  };
  return (
    <div className={styles.settings}>
      <div className={styles.avatarSection}>
        <h2 className={styles.cardHeading}>Edit Avatar:</h2>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={user?.avatar_url} alt="avatar" />
        </div>
        <form
          className={styles.form}
          onSubmit={handleAvatarUpload}
          encType="multipart/form-data"
        >
          <input type="file" className={styles.inputFile} name="avatar" />
          <SubmitButton type="submit">Submit</SubmitButton>
          {uploadAvatar && (
            <p className={styles.uploadRes}>{uploadAvatar.msg}</p>
          )}
        </form>
        <div className={styles.editAbout}>
          <h2>Edit About:</h2>
          <form className={styles.form} onSubmit={handleEditAbout}>
            <Textarea
              name="about"
              style={{ height: '6em', backgroundColor: 'var(--nav-bg)' }}
              value={aboutState.about}
              onChange={handleAboutInput}
              error={aboutState.errors.about}
            />
            <SubmitButton type="submit">Submit</SubmitButton>
            {aboutFetch &&
              aboutFetch.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
          </form>
        </div>
      </div>
      <div className={styles.editProfile}>
        <h2 className={styles.cardHeading}>Edit your Profile:</h2>
        <form className={styles.form} onSubmit={handleEditProfile}>
          <Input
            name="first_name"
            label="First Name"
            value={profileState.first_name}
            onChange={handleProfileInput}
            error={profileState.errors.first_name}
          />
          <Input
            name="last_name"
            label="Last Name"
            value={profileState.last_name}
            onChange={handleProfileInput}
            error={profileState.errors.last_name}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            value={profileState.email}
            onChange={handleProfileInput}
            error={profileState.errors.email}
          />
          <Input
            name="username"
            label="Username"
            value={profileState.username}
            onChange={handleProfileInput}
            error={profileState.errors.username}
          />
          <Input
            name="profession"
            label="Profession"
            value={profileState.profession}
            onChange={handleProfileInput}
            error={profileState.errors.profession}
          />
          <SubmitButton type="submit">Submit</SubmitButton>
          {profileFetch &&
            profileFetch.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
        </form>
      </div>
      <div className={styles.editProfile}>
        <h2 className={styles.cardHeading}>Change password:</h2>
        <form className={styles.form} onSubmit={handleEditPassword}>
          <Input
            type="password"
            name="current_password"
            label="Current password"
            value={passwordState.current_password}
            onChange={handlePasswordInput}
            error={passwordState.errors.current_password}
          />
          <Input
            type="password"
            name="new_password"
            label="New password"
            value={passwordState.new_password}
            onChange={handlePasswordInput}
            error={passwordState.errors.new_password}
          />
          <Input
            type="password"
            name="confirm_password"
            label="Confirm new Password"
            value={passwordState.confirm_password}
            onChange={handlePasswordInput}
            error={passwordState.errors.confirm_password}
          />
          <SubmitButton type="submit">Submit</SubmitButton>
          {passwordFetch &&
            passwordFetch.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
        </form>
      </div>
    </div>
  );
}
export default Settings;
