import PostCard from '../../components/PostCard/PostCard';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import styles from './Home.module.css';
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import Icon from '@mdi/react';
import { mdiLogin, mdiAccountPlus } from '@mdi/js';
import Loader from '../../components/Loader/Loader';

function Home() {
  const [homePosts, setHomePosts] = useState([]);
  const [unFollowReq, setUnFollowReq] = useState({});
  const [token, , user, isLoading, setIsLoading] = useOutletContext();
  useEffect(() => {
    if (token && user?.user_id) {
      setIsLoading(true);

      const fetchDataForPosts = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${
            user.user_id
          }/followers`;
          const headers = {
            Authorization: token,
          };
          const postsData = await getRequestWithNativeFetch(url, headers);

          setHomePosts(postsData);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDataForPosts();
    }
    return () => {
      setHomePosts([]);
    };
  }, [setIsLoading, token, user, unFollowReq]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {token ? (
            <div className={styles.home}>
              <FriendsCard
                unFollowReq={unFollowReq}
                setUnFollowReq={setUnFollowReq}
              />
              <div className={styles.posts}>
                <PostCard
                  fetchUrl={`${import.meta.env.VITE_BACKEND_URL}/posts/${
                    user.user_id
                  }/followers`}
                  profileUser={user.user_id}
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
                <Icon
                  path={mdiAccountPlus}
                  size={5}
                  color="var(--btn-clr)"
                ></Icon>
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default Home;
