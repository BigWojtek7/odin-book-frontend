import { useEffect, useReducer, useState } from 'react';
import useAuth from '../contexts/Auth/useAuth';
import useLoader from '../contexts/Loader/useLoader';
import useModal from '../contexts/Modal/useModal';
import useNotification from '../contexts/Notification/useNotification';
import formReducer from '../reducers/formReducer';
import {
  aboutFormRules,
  initialAboutFormState,
  initialPasswordFormState,
  initialProfileFormState,
  passwordFormRules,
  profileFormRules,
} from '../reducers/initialSettingsFormState';
import requestWithNativeFetch from '../utils/requestWithNativeFetch';
import handleInputChange from '../utils/formHelpers/handleInputChange';
import isFormValid from '../utils/formHelpers/isFormValid';

function useSettings() {
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
    }
  }, [user]);

  const handleAvatarUpload = (e) => {
    e.preventDefault();
    openModal('Do you really want to change your avatar?', async () => {
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
          addNotification('Your avatar has been updated', 'success');
        }
      } catch (err) {
        console.log(err);
        addNotification('An error occurred. Please try again.', 'error');
      } finally {
        loaderStop();
        closeModal();
      }
    });
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    if (isFormValid(profileState, dispatchProfile)) {
      openModal('Do you really want to change your profile ?', async () => {
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
            addNotification('Your profile has been updated', 'success');
          }
        } catch (err) {
          console.log(err);
          addNotification('An error occurred. Please try again.', 'error');
        } finally {
          loaderStop();
          closeModal();
        }
      });
    }
  };

  const handleEditAbout = (e) => {
    e.preventDefault();
    if (isFormValid(aboutState, dispatchAbout)) {
      openModal(
        'Do you really want to change your about section ?',
        async () => {
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
            addNotification('An error occurred. Please try again.', 'error');
          } finally {
            loaderStop();
            closeModal();
          }
        }
      );
    }
  };

  const handleEditPassword = (e) => {
    e.preventDefault();

    if (isFormValid(passwordState, dispatchPassword)) {
      openModal('Do you really want to change password', async () => {
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
          addNotification('An error occurred. Please try again.', 'error');
        } finally {
          loaderStop();
          closeModal();
        }
      });
    }
  };

  const handleChange = (e, dispatchName) => {
    switch (dispatchName) {
      case 'profile':
        handleInputChange(e, dispatchProfile);
        break;
      case 'password':
        handleInputChange(e, dispatchPassword);
        break;
      case 'about':
        handleInputChange(e, dispatchAbout);
        break;
      default:
        console.log(`Sorry, we are out of ${dispatchName}.`);
    }
  };

  return {
    profileState,
    aboutState,
    passwordState,
    passwordFetch,
    profileFetch,
    aboutFetch,
    uploadAvatar,
    handleAvatarUpload,
    handleEditProfile,
    handleEditAbout,
    handleEditPassword,
    handleChange,
  };
}

export default useSettings;
