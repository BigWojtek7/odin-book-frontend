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
    handleChange,
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
          handleAboutInput={(e) => handleChange(e, 'about')}
          aboutFetch={aboutFetch}
        />
      </div>
      <EditProfile
        profileState={profileState}
        handleProfileInput={(e) => handleChange(e, 'profile')}
        handleEditProfile={handleEditProfile}
        profileFetch={profileFetch}
      />
      <EditPassword
        passwordState={passwordState}
        handleEditPassword={handleEditPassword}
        handlePasswordInput={(e) => handleChange(e, 'password')}
        passwordFetch={passwordFetch}
      />
    </div>
  );
}
export default Settings;
