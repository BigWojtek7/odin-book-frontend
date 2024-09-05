import styles from './PostCard.module.css';
import Post from './Post/Post';
import Comment from './Comment/Comment';
import AddComment from './AddComment/AddComment';
import { useEffect, useRef, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import { useOutletContext, useParams } from 'react-router-dom';
import Modal from '../Modal/Modal';
import requestWithNativeFetch from '../../utils/fetchApi';

function PostCard({
  forceRenderPosts,
  fetchUrl,
}) {
  const [deleteCommentRes, setDeleteCommentRes] = useState({});

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);


  const [forceRenderComments, setForceRenderComments] = useState(0);
  const [deletePostRes, setDeletePostRes] = useState({});

  const commentTextarea = useRef(null);
  const [addCommentFetch, setAddCommentFetch] = useState(null);

  const [token, , user, isLoading, setIsLoading] = useOutletContext();

  const [profilePosts, setProfilePosts] = useState([]);
  const [commentId, setCommentId] = useState();
  const [deletePostId, setDeletePostId] = useState();


  useEffect(() => {
    if (user.user_id) {
      const fetchDataForPosts = async () => {
        try {
          // const url = `${import.meta.env.VITE_BACKEND_URL}/posts/user/${
          //   profileUser.user_id
          // }`;
          const headers = {
            Authorization: token,
          };
          const postsData = await getRequestWithNativeFetch(fetchUrl, headers);
          console.log(postsData)
          setProfilePosts(postsData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForPosts();
    }
    return () => {
      setProfilePosts([]);
    };
  }, [setIsLoading, token, forceRenderPosts, deletePostRes, fetchUrl, user.user_id]);

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
      }
    };
    fetchDataForDeletePost();
  };
  console.log(profilePosts);
  const handleDeleteComment = (commentId) => {
    // e.preventDefault();
    // const commentId = e.currentTarget.value;
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
      {profilePosts.map((post) => (
        <div className={styles.postCard} key={post.post_id}>
          <Post
            date={post.post_date}
            postId={post.post_id}
            author={post.author_name}
            authorId={post.author_id}
            content={post.post_content}
            avatarURL={post.avatar_url}
            inputRef={commentTextarea}
            setShowPostModal={setShowPostModal}
            setDeletePostId={setDeletePostId}
          />
          <AddComment
            setForceRenderComments={setForceRenderComments}
            postId={post.post_id}
            textareaRef={commentTextarea}
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
        Are you sure to delete comment ?
      </Modal>
      <Modal
        isShow={showPostModal}
        onRequestSubmit={() => handleDeletePost(deletePostId)}
        onRequestClose={() => setShowPostModal((prev) => !prev)}
      >
        Are you sure to delete post ?
      </Modal>
    </>
  );
}
export default PostCard;
