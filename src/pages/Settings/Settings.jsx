import styles from './Settings.module.css';
import useSettings from '../../hooks/useSettings';
import EditProfile from '../../components/Settings/EditProfile/EditProfile';
import EditPassword from '../../components/Settings/EditPassword/EditPassword';
import EditAbout from '../../components/Settings/EditAbout/EditAbout';
import UploadAvatar from '../../components/Settings/UploadAvatar/UploadAvatar';

function Settings() {
  const {
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
    handleProfileInput,
    handleAboutInput,
    handlePasswordInput,
  } = useSettings();

  return (
    <div className={styles.settings}>
      <div className={styles.firstColumn}>
        <UploadAvatar
          handleAvatarUpload={handleAvatarUpload}
          uploadAvatar={uploadAvatar}
        />
        <EditAbout
          aboutState={aboutState}
          handleEditAbout={handleEditAbout}
          handleAboutInput={handleAboutInput}
          aboutFetch={aboutFetch}
        />
      </div>
      <EditProfile
        profileState={profileState}
        handleProfileInput={handleProfileInput}
        handleEditProfile={handleEditProfile}
        profileFetch={profileFetch}
      />
      <EditPassword
        passwordState={passwordState}
        handleEditPassword={handleEditPassword}
        handlePasswordInput={handlePasswordInput}
        passwordFetch={passwordFetch}
      />
    </div>
  );
}
export default Settings;
