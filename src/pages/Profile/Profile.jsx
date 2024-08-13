import { useOutletContext } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import AddPost from '../../components/AddPost/AddPost';
import Loader from '../../components/Loader/Loader';
import requestWithNativeFetch from '../../utils/fetchApi';
function Profile() {
  const [profilePosts, setProfilePosts] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [deleteRes, setDeleteRes] = useState({});
  const [token, , user, isLoading, setIsLoading] = useOutletContext();
  useEffect(() => {
    if (user?.user_id) {
      setIsLoading(true);

      const fetchDataForPosts = async () => {
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
      fetchDataForPosts();
    }
    return () => {
      setProfilePosts([]);
    };
  }, [setIsLoading, token, user, isSent]);

  const handleDelete = (e, postId) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForDelete = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`;
        const headers = { Authorization: token };
        const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
        setDeleteRes(deleteData);

        if (deleteData.success) {
          setDeleteRes(deleteData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForDelete();
  };
  console.log(profilePosts);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.profile}>
          <UserCard />
          <div className={styles.posts}>
            <AddPost
              avatarURL={user.avatar_url}
              isSent={isSent}
              setIsSent={setIsSent}
            />
            {profilePosts.map((post) => (
              <PostCard
                postId={post.post_id}
                date={post.post_date}
                author={post.author_name}
                content={post.post_content}
                avatarURL={post.avatar_url}
                postLikes={post.post_likes}
                
                key={post.post_id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default Profile;
