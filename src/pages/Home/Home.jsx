import Posts from '../../components/Post/Post';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <FriendsCard />
      <div className={styles.posts}>
        <Posts />
        <Posts />
      </div>
    </div>
  );
}
export default Home;
