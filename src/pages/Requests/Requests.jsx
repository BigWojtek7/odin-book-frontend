
import styles from './Requests.module.css';
import Friend from '../../components/FriendsCard/Friend';
import Button from '../../components/Form/Button';
function Requests() {
  return (
    <div className={styles.container}>
      <div className={styles.sideCard}>
        <h2 className={styles.sideHeading}>Following Requests:</h2>
        <div className={styles.usersCard}>
          <Friend />
          <Button type="Submit" name="Confirm" />
          <Button type="Submit" name="Delete" />
        </div>
        <div className={styles.usersCard}>
          <Friend />
          <Button type="Submit" name="Confirm" />
          <Button type="Submit" name="Delete" />
        </div>
        <div className={styles.usersCard}>
          <Friend />
          <Button type="Submit" name="Confirm" />
          <Button type="Submit" name="Delete" />
        </div>
      </div>
      <div className={styles.sideCard}>
        <h2 className={styles.sideHeading}>People you may know:</h2>
        <div className={styles.usersCard}>
          <Friend />
          <Button type="Submit" name="Confirm" />
          <Button type="Submit" name="Delete" />
        </div>
        <div className={styles.usersCard}>
          <Friend />
          <Button type="Submit" name="Confirm" />
          <Button type="Submit" name="Delete" />
        </div>
        <div className={styles.usersCard}>
          <Friend />
          <Button type="Submit" name="Confirm" />
          <Button type="Submit" name="Delete" />
        </div>
      </div>
    </div>
  );
}
export default Requests;
