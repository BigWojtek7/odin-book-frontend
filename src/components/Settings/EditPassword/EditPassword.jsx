import Button from '../../Form/Button/Button';
import Input from '../../Form/Input/Input';
import styles from '../SettingsSharedCSS.module.css';

function EditPassword({
  passwordState,
  handleEditPassword,
  handlePasswordInput,
  passwordFetch,
}) {
  return (
    <div className={styles.editPassword}>
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
        <Button type="submit">Submit</Button>
        {passwordFetch &&
          passwordFetch.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
      </form>
    </div>
  );
}
export default EditPassword;
