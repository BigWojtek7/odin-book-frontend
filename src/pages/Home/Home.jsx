import PostCard from '../../components/PostCard/PostCard';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import styles from './Home.module.css';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';

function Home() {
  const [homePosts, setHomePosts] = useState([]);
  const [token, , user, isLoading, setIsLoading] = useOutletContext();
  useEffect(() => {
    if (user?.user_id) {
      setIsLoading(true);

      const fetchDataForMessages = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${
            user.user_id
          }/followers`;
          const headers = {
            Authorization: token,
          };
          const postsData = await getRequestWithNativeFetch(url, headers);
          console.log(postsData);
          setHomePosts(postsData);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForMessages();
    }
    return () => {
      setHomePosts([]);
    };
  }, [setIsLoading, token, user]);
  return (
    <>
      {token ? (
        <div className={styles.container}>
          <FriendsCard />

          <div className={styles.posts}>
            {homePosts.map((post) => (
              <PostCard
                id={post.post_id}
                date={post.post_date}
                author={post.author_name}
                content={post.post_content}
                avatarURL={post.avatar_url}
                key={post.post_id}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Log in first</p>
      )}
    </>
  );
}
export default Home;
