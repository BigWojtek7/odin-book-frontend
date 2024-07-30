import styles from './Form.module.css'
function FormLogin() {
  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" required />
      </div>
      <button>Submit</button>
    </form>
  );
}
export default FormLogin;
