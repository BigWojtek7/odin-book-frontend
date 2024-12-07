import Button from '../../Form/Button/Button';
import Input from '../../Form/Input/Input';
import styles from '../SettingsSharedCSS.module.css';

function EditProfile({
  profileState,
  handleProfileInput,
  handleEditProfile,
  profileFetch,
}) {
  return (
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
        <Button type="submit">Submit</Button>
        {profileFetch &&
          profileFetch.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
      </form>
    </div>
  );
}
export default EditProfile;
