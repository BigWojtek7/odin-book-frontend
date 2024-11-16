import PostCard from '../../components/PostCard/PostCard';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiLogin, mdiAccountPlus } from '@mdi/js';
import useAuth from '../../contexts/Auth/useAuth';
import usePosts from '../../hooks/usePosts';

function Home() {
  const { token, user } = useAuth();

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
    <>
      {token ? (
        <div className={styles.home}>
          <FriendsCard onDeletePostsByFollower={onDeletePostsByFollower} />
          <div className={styles.posts}>
            <PostCard posts={posts} onDelete={handleDeletePost} />
          </div>
        </div>
      ) : (
        <div className={styles.welcomeMessage}>
          <h1>Welcome to Odin Book</h1>
          <Link className={styles.login} to="/login">
            <Icon path={mdiLogin} size={5} color="var(--input-bd)"></Icon>
          </Link>
          <Link className={styles.signUp} to="/sign-up">
            <Icon path={mdiAccountPlus} size={5} color="var(--btn-clr)"></Icon>
          </Link>
        </div>
      )}
    </>
  );
}
export default Home;
