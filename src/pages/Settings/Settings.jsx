import styles from './Settings.module.css';
import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import Textarea from '../../components/Form/Textarea/Textarea';
function Settings() {
  return (
    <div className={styles.container}>
      <div className={styles.profilAvatar}>
        <h2 className={styles.cardHeading}>Edit Avatar:</h2>
      </div>
      <div className={styles.editProfile}>
        <h2 className={styles.cardHeading}>Edit your Profile:</h2>
        <form className={styles.form}>
          <Input type="text" name="first_name" labelName="First Name" />
          <Input type="text" name="last_name" labelName="Last Name" />
          <Input type="email" name="email" labelName="Email" />
          <Input type="text" name="username" labelName="Username" />
          <Textarea
            placeholder="A few words about you"
            name="about"
            isLabel="true"
          />
          <SubmitButton type="submit" name="Submit" />
        </form>
      </div>
      <div className={styles.editProfile}>
        <h2 className={styles.cardHeading}>Change password:</h2>
        <form className={styles.form}>
          <Input type="password" name="old_password" labelName="Old password" />
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
