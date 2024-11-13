import styles from './AddPost.module.css';
import SubmitButton from '../../Form/Buttons/SubmitButton';
import Textarea from '../../Form/Textarea/Textarea';
import { useOutletContext } from 'react-router-dom';
// import { useState } from 'react';
import requestWithNativeFetch from '../../../utils/requestWithNativeFetch.js';
import { useEffect, useState } from 'react';
import useAuth from '../../../contexts/Auth/useAuth.js';
import useNotification from '../../../contexts/Notification/useNotification.js';
import useLoader from '../../../contexts/Loader/useLoader.js';

function AddPost({ avatarURL, setForceRenderPosts }) {
  const { token, user } = useAuth();

  const [createPostRes, setCreatePostRes] = useState();
  const [inputValue, setInputValue] = useState('');

  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const fetchDataForCreatePost = async () => {
  //     try {
  //       const url = `${import.meta.env.VITE_BACKEND_URL}/posts`;
  //       const headers = {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       };
  //       const data = {
  //         content: inputValue,
  //       };
  //       const createPostData = await requestWithNativeFetch(
  //         url,
  //         'POST',
  //         headers,
  //         data
  //       );

  //       setAddPostFetch(createPostData);

  //       if (createPostData.success) {
  //         setForceRenderPosts((prev) => prev + 1);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchDataForCreatePost();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loaderStart();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          content: e.target.content.value,
        }),
        method: 'post',
      };
      const createPostDate = await requestWithNativeFetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/`,
        options
      );
      setCreatePostRes(createPostDate);
      console.log(createPostDate);
      if (createPostDate.success) {
        addNotification('The post has been created', 'success');
      }
    } catch (err) {
      console.log(err.name);
    } finally {
      loaderStop();
    }
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
            isControlled={true}
            setInputValue={setInputValue}
            inputValue={inputValue}
          ></Textarea>
          <SubmitButton
            type="submit"
            name="Post"
            style={{ borderRadius: '10px' }}
          />
        </form>
      </div>
    </div>
  );
}
export default AddPost;
