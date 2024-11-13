import PostCard from '../../components/PostCard/PostCard';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiLogin, mdiAccountPlus } from '@mdi/js';
import useAuth from '../../contexts/Auth/useAuth';
import usePost from '../../hooks/usePost';

function Home() {
  const [unFollowReq, setUnFollowReq] = useState({});
  const { token, user } = useAuth();

  const { posts, setPosts } = usePost(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${user?.user_id}/followers`,
    Boolean(user)
  );

  console.log(posts);
  return (
    <>
      {token ? (
        <div className={styles.home}>
          <FriendsCard
            unFollowReq={unFollowReq}
            setUnFollowReq={setUnFollowReq}
          />
          <div className={styles.posts}>
            <PostCard
            posts={posts}
            />
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
