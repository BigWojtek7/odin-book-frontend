import PostCard from '../../components/PostCard/PostCard';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Profile.module.css';
function Profile() {
  return (
    <div className={styles.profile}>
      <UserCard />
      <div className={styles.posts}>
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}
export default Profile;
