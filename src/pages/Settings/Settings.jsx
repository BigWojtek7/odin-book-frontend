import styles from './Settings.module.css';
import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Button/SubmitButton';
import Textarea from '../../components/Form/Textarea/Textarea';
import useAuth from '../../contexts/Auth/useAuth';
import useSettings from '../../hooks/useSettings';

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

  const { user} = useAuth();
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
