import Input from '../../components/Form/Input';
import Button from '../../components/Form/Buttons/SubmitButton';
import styles from '../../components/Form/Form.module.css';

function SignUp() {
  return (
    <form className={styles.form}>
      <Input type="text" name="first_name" labelName="First Name" />
      <Input type="text" name="last_name" labelName="Last Name" />
      <Input type="email" name="email" labelName="Email" />
      <Input type="text" name="username" labelName="Username" />
      <Input type="password" name="password" labelName="Password" />
      <Input type="password" name="re_password" labelName="Reenter Password" />
      <Button type="submit" name="Submit" />
    </form>
  );
}
export default SignUp;
