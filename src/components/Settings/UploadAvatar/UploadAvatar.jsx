import useAuth from '../../../contexts/Auth/useAuth';
import Button from '../../Form/Button/Button';
import styles from '../SettingsSharedCSS.module.css';
function UploadAvatar({ handleAvatarUpload, uploadAvatar }) {
  const { user } = useAuth();
  return (
    <div className={styles.uploadAvatar}>
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
        <Button type="submit">Submit</Button>
        {uploadAvatar && <p className={styles.uploadRes}>{uploadAvatar.msg}</p>}
      </form>
    </div>
  );
}
export default UploadAvatar;
