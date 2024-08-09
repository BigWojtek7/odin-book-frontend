import { useOutletContext } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import Loader from '../../components/Loader/Loader';
function Profile() {
  const [profilePosts, setProfilePosts] = useState([]);
  const [token, , user, isLoading, setIsLoading] = useOutletContext();
  useEffect(() => {
    if (user?.user_id) {
      setIsLoading(true);

      const fetchDataForMessages = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/posts/user/${
            user.user_id
          }`;
          const headers = {
            Authorization: token,
          };
          const postsData = await getRequestWithNativeFetch(url, headers);
          console.log(postsData);
          setProfilePosts(postsData);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDataForMessages();
    }
    return () => {
      setProfilePosts([]);
    };
  }, [setIsLoading, token, user]);
  console.log(profilePosts);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.profile}>
          <UserCard />
          <div className={styles.posts}>
            {profilePosts.map((post) => (
              <PostCard
                key={post.post_id}
                id={post.post_id}
                date={post.date_format}
                author={post.full_name}
                content={post.content}
                avatarURL={user.avatar_url}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default Profile;
