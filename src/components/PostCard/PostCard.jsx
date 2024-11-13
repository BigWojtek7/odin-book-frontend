import styles from './PostCard.module.css';
import Post from './Post/Post';
import Comment from './Comment/Comment';
import AddComment from './AddComment/AddComment';
import { useEffect, useRef, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import Modal from '../Modal/Modal';
import useAuth from '../../contexts/Auth/useAuth';
import useModal from '../../contexts/Modal/useModal';
import useNotification from '../../contexts/Notification/useNotification';
import useLoader from '../../contexts/Loader/useLoader';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';

function PostCard({ posts, onDelete }) {
  const [deleteCommentRes, setDeleteCommentRes] = useState({});

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);

  const [forceRenderComments, setForceRenderComments] = useState(0);
  const [deletePostRes, setDeletePostRes] = useState({});

  const inputRef = useRef([]);

  const { token } = useAuth();

  const { openModal, closeModal } = useModal();
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

  const [profilePosts, setProfilePosts] = useState([]);
  const [commentId, setCommentId] = useState();
  const [deletePostId, setDeletePostId] = useState();

  // useEffect(() => {
  //   if (profileUser?.user_id) {
  //     const fetchDataForPosts = async () => {
  //       try {
  //         const headers = {
  //           Authorization: token,
  //         };
  //         const postsData = await getRequestWithNativeFetch(fetchUrl, headers);
  //         console.log(postsData);
  //         setProfilePosts(postsData);
  //       } catch (err) {
  //         console.log(err);
  //       } finally {
  //       }
  //     };
  //     fetchDataForPosts();
  //   }
  //   return () => {
  //     setProfilePosts([]);
  //   };
  // }, [token, forceRenderPosts, deletePostRes, fetchUrl, profileUser?.user_id]);

  // const handleDeletePost = (postId) => {
  //   const fetchDataForDeletePost = async () => {
  //     try {
  //       const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`;
  //       const headers = { Authorization: token };
  //       const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
  //       setDeletePostRes(deleteData);

  //       if (deleteData.success) {
  //         setDeletePostRes(deleteData);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setShowPostModal(false);
  //     }
  //   };
  //   fetchDataForDeletePost();
  // };

  const handleDeleteComment = (commentId) => {
    const fetchDataForDelete = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/posts/comments/${commentId}`;
        const headers = { Authorization: token };
        const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
        setDeleteCommentRes(deleteData);

        if (deleteData.success) {
          setDeleteCommentRes(deleteData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setShowCommentModal(false);
      }
    };
    fetchDataForDelete();
  };

  const handleDeletePost = (postId) => {
    console.log(postId)
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
          <AddComment
            setForceRenderComments={setForceRenderComments}
            postId={post.post_id}
            textareaRef={(el) => (inputRef.current[index] = el)}
          />
          <Comment
            postId={post.post_id}
            forceRenderComments={forceRenderComments}
            setShowModal={setShowCommentModal}
            setCommentId={setCommentId}
            deleteCommentRes={deleteCommentRes}
          />
        </div>
      ))}
      <Modal
        isShow={showCommentModal}
        onRequestSubmit={() => handleDeleteComment(commentId)}
        onRequestClose={() => setShowCommentModal((prev) => !prev)}
      >
        Are you sure to delete this comment ?
      </Modal>
      <Modal
        isShow={showPostModal}
        onRequestSubmit={() => handleDeletePost(deletePostId)}
        onRequestClose={() => setShowPostModal((prev) => !prev)}
      >
        Are you sure to delete this post ?
      </Modal>
      <Modal
        isShow={showLikeModal}
        onRequestClose={() => setShowLikeModal((prev) => !prev)}
        title="Warning"
      >
        You already liked this post!
      </Modal>
    </>
  );
}
export default PostCard;
