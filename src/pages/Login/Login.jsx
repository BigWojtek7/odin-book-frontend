import Input from '../../components/Form/Input/Input';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import CancelButton from '../../components/Form/Buttons/cancelButton';
import styles from './Login.module.css';

function Login() {
  return (
    <>
      <form className={styles.form}>
        <Input type="text" name="username" labelName="Username / E-mail" />
        <Input type="password" name="password" labelName="Password" />
        <SubmitButton type="submit" name="Submit" />
      </form>
      <form className={styles.form}>
        <input type="hidden" name="guest_mode" value="true" />
        <CancelButton type="submit" name="Guest Mode" />
      </form>
    </>
  );
}
export default Login;
