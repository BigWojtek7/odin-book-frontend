import styles from './PostCard.module.css';
import Post from './Post/Post';
import Comment from './Comment/Comment';
import AddComment from './AddComment/AddComment';
import { useEffect, useRef, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import { useOutletContext } from 'react-router-dom';
import Modal from '../Modal/Modal';
import requestWithNativeFetch from '../../utils/fetchApi';

function PostCard({ forceRenderPosts, fetchUrl }) {
  const [deleteCommentRes, setDeleteCommentRes] = useState({});

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);

  const [forceRenderComments, setForceRenderComments] = useState(0);
  const [deletePostRes, setDeletePostRes] = useState({});

  const inputRef = useRef([]);
  const [addCommentFetch, setAddCommentFetch] = useState(null);

  const [token, , user, , setIsLoading] = useOutletContext();

  const [profilePosts, setProfilePosts] = useState([]);
  const [commentId, setCommentId] = useState();
  const [deletePostId, setDeletePostId] = useState();

  useEffect(() => {
    setIsLoading(false);
    if (user.user_id) {
      const fetchDataForPosts = async () => {
        try {
          const headers = {
            Authorization: token,
          };
          const postsData = await getRequestWithNativeFetch(fetchUrl, headers);

          setProfilePosts(postsData);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading;
        }
      };
      fetchDataForPosts();
    }
    return () => {
      setProfilePosts([]);
    };
  }, [
    setIsLoading,
    token,
    forceRenderPosts,
    deletePostRes,
    fetchUrl,
    user.user_id,
  ]);

  const handleDeletePost = (postId) => {
    setIsLoading(true);
    const fetchDataForDeletePost = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`;
        const headers = { Authorization: token };
        const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
        setDeletePostRes(deleteData);

        if (deleteData.success) {
          setDeletePostRes(deleteData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        setShowPostModal(false);
      }
    };
    fetchDataForDeletePost();
  };

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

  return (
    <>
      {profilePosts.map((post, index) => (
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
            setShowPostModal={setShowPostModal}
            setShowLikeModal={setShowLikeModal}
            setDeletePostId={setDeletePostId}
          />
          <AddComment
            setForceRenderComments={setForceRenderComments}
            postId={post.post_id}
            textareaRef={(el) => (inputRef.current[index] = el)}
            addCommentFetch={addCommentFetch}
            setAddCommentFetch={setAddCommentFetch}
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
