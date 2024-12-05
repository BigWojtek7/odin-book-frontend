import PostCard from '../../components/PostCard/PostCard';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import styles from './Home.module.css';
import useAuth from '../../contexts/Auth/useAuth';
import usePosts from '../../hooks/usePosts';

function Home() {
  const { user } = useAuth();

  const { posts, setPosts } = usePosts(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${user?.user_id}/followers`,
    Boolean(user)
  );

  const handleDeletePost = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post_id !== deletedPostId)
    );
  };

  const onDeletePostsByFollower = (followerId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.author_id !== followerId)
    );
  };

  return (
    <div className={styles.home}>
      <div className={styles.friendsCard}>
        <FriendsCard onDeletePostsByFollower={onDeletePostsByFollower} />
      </div>
      <div className={styles.posts}>
        <PostCard posts={posts} onDelete={handleDeletePost} />
      </div>
    </div>
  );
}
export default Home;
