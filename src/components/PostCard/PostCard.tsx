import styles from './PostCard.module.css';
import Post from './Post/Post';
import Comments from './Comment/Comments';
import { useRef } from 'react';
import useAuth from '../../contexts/Auth/useAuth';
import useModal from '../../contexts/Modal/useModal';
import useNotification from '../../contexts/Notification/useNotification';
import useLoader from '../../contexts/Loader/useLoader';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';

function PostCard({ posts, onDelete }) {
  const inputRef = useRef([]);

  const { token } = useAuth();

  const { openModal, closeModal } = useModal();
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

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
          onDelete(postId);
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

  return (
    <>
      {posts?.map((post, index) => (
        <div className={styles.postCard} key={post.post_id}>
          <Post
            date={post.post_date}
            postId={post.post_id}
            author={post.author_name}
            authorId={post.author_id}
            content={post.post_content}
            avatarURL={post.avatar_url}
            inputRef={inputRef}
            inputRefIndex={index}
            handleDelete={handleDeletePost}
          />
          <Comments
            postId={post.post_id}
            textareaRef={(el) => (inputRef.current[index] = el)}
          />
        </div>
      ))}
    </>
  );
}
export default PostCard;
