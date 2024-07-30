import Input from "../../components/Form/Input"
import Button from "../../components/Form/Button"
import styles from '../../components/Form/Form.module.css'

function Login() {
  return (
    <form className={styles.form}>
      <Input type='text' name="username" labelName= "Username" />
      <Input type='password' name="password" labelName= "Password" />
      <Button type='submit' name='Submit' />
    </form>
  )
}
export default Login