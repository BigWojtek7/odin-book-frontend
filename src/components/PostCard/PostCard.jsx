import styles from './PostCard.module.css';
import Icon from '@mdi/react';
import { mdiThumbUp, mdiMessage } from '@mdi/js';
import Comment from '../Comment/Comment';
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
      <div className={styles.post}>
        <div className={styles.postInfo}>
          <img src="https://i.pravatar.cc/45" alt="avatar" />
          <div>
            <p className={styles.name}>James Smith</p>
            <p className={styles.date}>3 min ago</p>
          </div>
        </div>
        <p className={styles.postContent}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
          voluptate cum vero, similique qui ipsum nostrum nesciunt delectus
          illum possimus vel nihil, iusto rem veritatis assumenda debitis sint
          sunt enim.
        </p>
        <hr />
        <ul className={styles.listIcons}>
          <li className={styles.listItem}>
            <Icon path={mdiThumbUp} size={1} />
            Like
          </li>
          <li className={styles.listItem}>
            <Icon path={mdiMessage} size={1} />
            Comment
          </li>
        </ul>
        <hr />
        <AddComment />
        <Comment />
      </div>
    </>
  );
}
export default PostCard;
