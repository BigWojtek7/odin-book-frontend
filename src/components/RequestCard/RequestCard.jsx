import styles from './Request.module.css';
import Friend from '../FriendsCard/Friend';
import Button from '../Form/Button';
function RequestCard() {
  return (
    <div className={styles.container}>
      <div className={styles.followRequest}>
        <Friend />
        <Button type="Submit" name="Confirm" />
        <Button type="Submit" name="Delete" />
      </div>
      <div className={styles.followRequest}>
        <Friend />
        <Button type="Submit" name="Confirm" />
        <Button type="Submit" name="Delete" />
      </div>
      <div className={styles.followRequest}>
        <Friend />
        <Button type="Submit" name="Confirm" />
        <Button type="Submit" name="Delete" />
      </div>
    </div>
  );
}
export default RequestCard;
