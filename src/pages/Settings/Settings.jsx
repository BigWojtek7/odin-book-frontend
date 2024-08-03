import styles from './Settings.module.css';
import Input from '../../components/Form/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import stylesForm from '../../components/Form/Form.module.css';
function Settings() {
  return (
    <div className={styles.container}>
      <div className={styles.profilAvatar}>
        <h2 className={styles.cardHeading}>Edit Avatar:</h2>
      </div>
      <div className={styles.editProfile}>
        <h2 className={styles.cardHeading}>Edit your Profile:</h2>
        <form className={stylesForm.form}>
          <Input type="text" name="first_name" labelName="First Name" />
          <Input type="text" name="last_name" labelName="Last Name" />
          <Input type="email" name="email" labelName="Email" />
          <Input type="text" name="username" labelName="Username" />
          <SubmitButton type="submit" name="Submit" />
        </form>
      </div>
      <div className={styles.editProfile}>
        <h2 className={styles.cardHeading}>Change password:</h2>
        <form className={stylesForm.form}>
          <Input type="password" name="password" labelName="Old password" />
          <Input type="password" name="password" labelName="Password" />
          <Input
            type="password"
            name="re_password"
            labelName="Reenter Password"
          />
          <SubmitButton type="submit" name="Submit" />
        </form>
      </div>
    </div>
  );
}
export default Settings;
