import Post from '../../components/Post/Post';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Profile.module.css';
function Profile() {
  return (
    <div className={styles.profile}>
      <UserCard />
      <div className={styles.posts}>
        <Post />
        <Post />
      </div>
    </div>
  );
}
export default Profile;
