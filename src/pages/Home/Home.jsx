import PostCard from '../../components/PostCard/PostCard';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiLogin, mdiAccountPlus } from '@mdi/js';
import useAuth from '../../contexts/Auth/useAuth';
import usePosts from '../../hooks/usePosts';
import useModal from '../../contexts/Modal/useModal';
import useNotification from '../../contexts/Notification/useNotification';
import useLoader from '../../contexts/Loader/useLoader';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';

function Home() {
  const [unFollowReq, setUnFollowReq] = useState({});
  const { token, user } = useAuth();

  const { openModal, closeModal } = useModal();
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

  const { posts, setPosts } = usePosts(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${user?.user_id}/followers`,
    Boolean(user)
  );

  const handleDeletePost = (postId) => {
    openModal('Do you really want to delete this post?', async () => {
      try {
        loaderStart();
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          method: 'delete',
        };
        const deletePostData = await requestWithNativeFetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
          options
        );
        if (deletePostData.success) {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.post_id !== Number(postId))
          );
          addNotification('The post has been deleted', 'success');
        }
      } catch (err) {
        console.log(err);
      } finally {
        loaderStop();
        closeModal();
      }
    });
  };

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
