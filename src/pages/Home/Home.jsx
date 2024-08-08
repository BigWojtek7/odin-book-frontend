import PostCard from '../../components/PostCard/PostCard';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <FriendsCard />
      <div className={styles.posts}>
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}
export default Home;
