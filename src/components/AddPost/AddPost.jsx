import styles from './AddPost.module.css';
import SubmitButton from '../Form/Buttons/SubmitButton';
import Textarea from '../Form/Textarea/Textarea';
import { useOutletContext } from 'react-router-dom';
// import { useState } from 'react';
import requestWithNativeFetch from '../../utils/fetchApi';
function AddPost({ avatarURL, isSent, setIsSent }) {
  const [token, , , , setIsLoading] = useOutletContext();
  console.log(isSent)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForCreateMessage = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/posts/create`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        const data = {
          content: e.target.content.value,
        };
        const createMessageData = await requestWithNativeFetch(
          url,
          'POST',
          headers,
          data
        );
        setIsLoading(false);
        console.log(createMessageData)
        if (createMessageData.success) {
          setIsSent(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForCreateMessage();
  };
  return (
    <div className={styles.addPost}>
      <div>
        <img src={avatarURL} alt="avatar" />
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
  );
}
export default AddPost;
