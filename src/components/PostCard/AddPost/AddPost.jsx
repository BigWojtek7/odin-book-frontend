import styles from './AddPost.module.css';
import SubmitButton from '../../Form/Buttons/SubmitButton';
import Textarea from '../../Form/Textarea/Textarea';
import { useOutletContext } from 'react-router-dom';
// import { useState } from 'react';
import requestWithNativeFetch from '../../../utils/fetchApi.js';

function AddPost({
  avatarURL,
  setForceRenderPosts,
  addPostFetch,
  setAddPostFetch,
}) {
  const [token, , , , setIsLoading] = useOutletContext();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForCreatePost = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/posts`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        const data = {
          content: e.target.content.value,
        };
        const createPostData = await requestWithNativeFetch(
          url,
          'POST',
          headers,
          data
        );

        setAddPostFetch(createPostData);

        if (createPostData.success) {
          setForceRenderPosts((prev) => prev + 1);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForCreatePost();
  };
  return (
    <div className={styles.container}>
      <div className={styles.addPost}>
        <div>
          <img className={styles.avatar} src={avatarURL} alt="avatar" />
        </div>
        <form className={styles.postForm} onSubmit={handleSubmit}>
          <Textarea
            style={{ height: '6em' }}
            className={styles.postTextarea}
            name="content"
            placeholder="Write a post..."
          ></Textarea>
          <SubmitButton
            type="submit"
            name="Post"
            style={{ borderRadius: '10px' }}
          />
        </form>
      </div>
      <div>
        {addPostFetch &&
          addPostFetch.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
      </div>
    </div>
  );
}
export default AddPost;
