import styles from './PostCard.module.css';
import Post from './Post/Post';
import Comment from './Comment/Comment';
import AddComment from '../AddComment/AddComment';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';

function PostCard() {
  const [posts, setPosts] = useState([]);
  // const [deleteRes, setDeleteRes] = useState({});
  const [token, , user, isLoading, setIsLoading] = useOutletContext();
  console.log(user);
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
          console.log(postsData)
          setPosts(postsData);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForMessages();
    }
    return () => {
      setPosts([]);
    };
  }, [setIsLoading, token, user]);
  
  return (
    <>
      <div className={styles.postCard}>
        <Post />
        <AddComment />
        <Comment />
      </div>
    </>
  );
}
export default PostCard;
