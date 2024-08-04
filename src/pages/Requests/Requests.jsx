import styles from './Requests.module.css';
import Friend from '../../components/FriendsCard/Friend';
import SubmitButton from '../../components/Form/Buttons/SubmitButton';
import CancelButton from '../../components/Form/Buttons/cancelButton';
function Requests() {
  return (
    <div className={styles.container}>
      <div className={styles.sideCard}>
        <h2 className={styles.sideHeading}>Following Requests:</h2>
        <div className={styles.usersCard}>
          <Friend/>
          <form className={styles.form}>
            <input type="hidden" name="confirm_friend" value="34657" />
            <SubmitButton
              type="submit"
              name="Confirm"
              style={{
                fontSize: '1rem',
                marginLeft: '0.5em',
                borderRadius: '10px',
              }}
            />
          </form>
          <form className={styles.form}>
            <input type="hidden" name="delete_request" value="34657" />
            <CancelButton
              type="submit"
              name="Delete"
              style={{
                fontSize: '1rem',
                marginLeft: '0.5em',
                borderRadius: '10px',
              }}
            />
          </form>
        </div>
        <div className={styles.usersCard}>
          <Friend />
          <form className={styles.form}>
            <input type="hidden" name="confirm_friend" value="34657" />
            <SubmitButton
              type="submit"
              name="Confirm"
              style={{
                fontSize: '1rem',
                marginLeft: '0.5em',
                borderRadius: '10px',
              }}
            />
          </form>
          <form className={styles.form}>
            <input type="hidden" name="delete_request" value="34657" />
            <CancelButton
              type="submit"
              name="Delete"
              style={{
                fontSize: '1rem',
                marginLeft: '0.5em',
                borderRadius: '10px',
              }}
            />
          </form>
        </div>{' '}
        <div className={styles.usersCard}>
          <Friend />
          <form className={styles.form}>
            <input type="hidden" name="confirm_friend" value="34657" />
            <SubmitButton
              type="submit"
              name="Confirm"
              style={{
                fontSize: '1rem',
                marginLeft: '0.5em',
                borderRadius: '10px',
              }}
            />
          </form>
          <form className={styles.form}>
            <input type="hidden" name="delete_request" value="34657" />
            <CancelButton
              type="submit"
              name="Delete"
              style={{
                fontSize: '1rem',
                marginLeft: '0.5em',
                borderRadius: '10px',
              }}
            />
          </form>
        </div>
      </div>
      <div className={styles.sideCard}>
        <h2 className={styles.sideHeading}>Users you may know:</h2>
        <div className={styles.usersCard}>
          <Friend />
          <SubmitButton
            type="submit"
            name="Confirm"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
          <CancelButton
            type="submit"
            name="Delete"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
        </div>
        <div className={styles.usersCard}>
          <Friend />
          <SubmitButton
            type="submit"
            name="Confirm"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
          <CancelButton
            type="submit"
            name="Delete"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
        </div>{' '}
        <div className={styles.usersCard}>
          <Friend />
          <SubmitButton
            type="submit"
            name="Confirm"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
          <CancelButton
            type="submit"
            name="Delete"
            style={{
              fontSize: '1rem',
              marginLeft: '0.5em',
              borderRadius: '10px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default Requests;
